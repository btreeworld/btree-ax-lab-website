import { NextResponse } from 'next/server';

import { sendAdminNotification, sendCustomerAcknowledgement } from '@/lib/email';
import { contactSchema } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * 문의 폼 백엔드 — 마스터 문서 17장
 * 1) 서버 측 재검증  2) 스팸·봇 방지  3) 관리자 알림  4) 고객 접수 확인
 * 민감한 오류정보는 응답에 노출하지 않는다.
 */

/** 간단한 in-memory rate limit. 다중 인스턴스 배포 시 외부 저장소로 교체한다. */
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

  if (isRateLimited(clientKey(request))) {
    return NextResponse.json(
      { ok: false, message: '요청이 많습니다. 잠시 후 다시 시도해 주세요.' },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: '잘못된 요청입니다.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: '입력값을 확인해 주세요.',
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

  const receivedAt = new Date().toISOString();

  try {
    const [adminResult] = await Promise.all([
      sendAdminNotification(data, receivedAt),
      sendCustomerAcknowledgement(data),
    ]);

    if (adminResult === 'failed') {
      return NextResponse.json(
        { ok: false, message: '전송 중 문제가 발생했습니다.' },
        { status: 502 },
      );
    }

    if (adminResult === 'skipped') {
      // 이메일 환경변수 미설정 — 개발/프리뷰 환경. 개인정보 전체는 로그에 남기지 않는다.
      console.warn('[contact] email not configured. received inquiry from', data.company);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[contact] unexpected error', error instanceof Error ? error.message : 'unknown');
    return NextResponse.json({ ok: false, message: '전송 중 문제가 발생했습니다.' }, { status: 500 });
  }
}
