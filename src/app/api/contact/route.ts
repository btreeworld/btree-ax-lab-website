import { NextResponse } from 'next/server';

import { defaultLocale, isLocale, type Locale } from '@/i18n/locales';
import { sendAdminNotification, sendCustomerAcknowledgement } from '@/lib/email';
import { turnstileSiteKey } from '@/lib/turnstile';
import { buildContactSchema } from '@/lib/validation';

/**
 * 실제 배포 파이프라인은 next-on-pages가 아니라 OpenNext(@opennextjs/cloudflare)다 — 이미
 * 앱 전체를 Workers 런타임(Node 호환)으로 번들링하므로, 라우트에 별도로 edge 런타임을
 * 선언하면 "OpenNext requires edge runtime function to be defined in a separate function"
 * 오류로 빌드가 실패한다. 기본(nodejs) 런타임을 그대로 둔다.
 */
export const dynamic = 'force-dynamic';

/**
 * 문의 폼 백엔드 — 마스터 문서 17장
 * 1) 서버 측 재검증  2) 스팸·봇 방지  3) 관리자 알림  4) 고객 접수 확인
 * 민감한 오류정보는 응답에 노출하지 않는다.
 */

const routeMessages: Record<
  Locale,
  { rateLimited: string; badRequest: string; invalidInput: string; sendFailed: string; verificationFailed: string }
> = {
  ko: {
    rateLimited: '요청이 많습니다. 잠시 후 다시 시도해 주세요.',
    badRequest: '잘못된 요청입니다.',
    invalidInput: '입력값을 확인해 주세요.',
    sendFailed: '전송 중 문제가 발생했습니다.',
    verificationFailed: '보안 확인에 실패했습니다. 새로고침 후 다시 시도해 주세요.',
  },
  en: {
    rateLimited: 'Too many requests. Please try again shortly.',
    badRequest: 'Invalid request.',
    invalidInput: 'Please check your input.',
    sendFailed: 'A problem occurred while sending. Please try again.',
    verificationFailed: 'Security verification failed. Please refresh and try again.',
  },
};

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/**
 * 사이트키(빌드 시 인라인)와 시크릿(런타임)이 둘 다 있을 때만 토큰을 요구한다. 사이트키가 빌드에
 * 없으면 클라이언트가 위젯을 렌더링하지 못해 토큰을 보낼 수 없으므로, 그 상태에서 검증을 강제하면
 * 모든 문의가 거부된다. 그 경우는 설정 누락으로 로그만 남기고 honeypot·rate limit에 맡긴다.
 */
async function verifyTurnstile(token: unknown, remoteIp: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!turnstileSiteKey) {
    console.warn('[contact] TURNSTILE_SECRET_KEY is set but NEXT_PUBLIC_TURNSTILE_SITE_KEY was not available at build time — skipping verification');
    return true;
  }
  if (typeof token !== 'string' || !token) return false;

  try {
    const form = new FormData();
    form.append('secret', secret);
    form.append('response', token);
    if (remoteIp !== 'unknown') form.append('remoteip', remoteIp);

    const result = await fetch(TURNSTILE_VERIFY_URL, { method: 'POST', body: form });
    const outcome = (await result.json()) as { success?: boolean };
    return outcome.success === true;
  } catch (error) {
    console.error('[contact] turnstile verification request failed', error instanceof Error ? error.message : 'unknown');
    return false;
  }
}

/**
 * 간단한 in-memory rate limit. Cloudflare Workers는 아이솔레이트가 요청마다 흩어질 수 있어
 * 이 Map이 완전한 방어선이 되지 못한다 — 봇 방지의 1차 방어선은 honeypot이고, 이건 보조 수단이다.
 */
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(key) ?? []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS);

  if (timestamps.length >= RATE_LIMIT_MAX) {
    requestLog.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(key, timestamps);

  // 오래된 항목 정리
  if (requestLog.size > 1000) {
    for (const [logKey, times] of requestLog) {
      if (times.every((time) => now - time >= RATE_LIMIT_WINDOW_MS)) requestLog.delete(logKey);
    }
  }

  return false;
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

export async function POST(request: Request) {
  // CSRF 완화 — 동일 출처 요청만 허용한다.
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: routeMessages[defaultLocale].badRequest }, { status: 400 });
  }

  const rawLocale =
    typeof payload === 'object' && payload !== null && 'locale' in payload
      ? String((payload as { locale: unknown }).locale)
      : '';
  const requestLocale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const m = routeMessages[requestLocale];

  if (isRateLimited(clientKey(request))) {
    return NextResponse.json({ ok: false, message: m.rateLimited }, { status: 429 });
  }

  const parsed = buildContactSchema(requestLocale).safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: m.invalidInput,
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // honeypot 에 값이 있으면 봇으로 판단하고 조용히 성공 응답을 반환한다.
  if (data.hp) {
    return NextResponse.json({ ok: true });
  }

  const turnstileToken = typeof payload === 'object' && payload !== null && 'turnstileToken' in payload
    ? (payload as { turnstileToken: unknown }).turnstileToken
    : undefined;
  const turnstileOk = await verifyTurnstile(turnstileToken, clientKey(request));
  if (!turnstileOk) {
    return NextResponse.json({ ok: false, message: m.verificationFailed }, { status: 400 });
  }

  const receivedAt = new Date().toISOString();

  try {
    const [adminResult] = await Promise.all([
      sendAdminNotification(data, receivedAt),
      sendCustomerAcknowledgement(data),
    ]);

    if (adminResult === 'failed') {
      return NextResponse.json({ ok: false, message: m.sendFailed }, { status: 502 });
    }

    if (adminResult === 'skipped') {
      if (process.env.NODE_ENV === 'production') {
        // 프로덕션에서 이메일 환경변수가 없다는 것은 설정 누락이다 — 문의를 조용히
        // 삼키는 대신 실패로 처리해서 고객이 재시도하거나 다른 경로로 연락하게 한다.
        console.error('[contact] email not configured in production. inquiry dropped for', data.company);
        return NextResponse.json({ ok: false, message: m.sendFailed }, { status: 500 });
      }
      // 개발/프리뷰 환경 — 폼 자체는 정상 동작해야 하므로 실패로 처리하지 않는다.
      console.warn('[contact] email not configured. received inquiry from', data.company);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[contact] unexpected error', error instanceof Error ? error.message : 'unknown');
    return NextResponse.json({ ok: false, message: m.sendFailed }, { status: 500 });
  }
}
