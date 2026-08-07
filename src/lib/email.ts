import { serviceOptions } from '@/content/contact';
import type { Locale } from '@/i18n/locales';
import type { ContactInput } from '@/lib/validation';

/**
 * 문의 이메일 전송 — 마스터 문서 17장
 *
 * 외부 SDK 의존 없이 Resend 호환 HTTP API를 호출한다.
 * EMAIL_API_KEY가 없으면 전송을 건너뛰고 'skipped'를 반환한다.
 * (개발·프리뷰 환경에서 폼 자체는 정상 동작해야 하므로 실패로 처리하지 않는다.)
 *
 * 관리자 알림은 항상 한국어로 발송한다(내부 운영자 기준). 고객 접수 확인 메일은
 * 고객이 문의를 작성한 언어(locale)로 발송한다.
 */

const EMAIL_ENDPOINT = 'https://api.resend.com/emails';

export type EmailResult = 'sent' | 'skipped' | 'failed';

function serviceLabel(value: string, locale: Locale): string {
  return serviceOptions[locale].find((option) => option.value === value)?.label ?? value;
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildAdminHtml(data: ContactInput, receivedAt: string): string {
  const rows: Array<[string, string]> = [
    ['접수일시', receivedAt],
    ['접수 언어', data.locale],
    ['회사명', data.company],
    ['담당자명', data.name],
    ['이메일', data.email],
    ['연락처', data.phone],
    ['산업 분야', data.industry],
    ['희망 서비스', serviceLabel(data.service, data.locale)],
    ['회사 웹사이트', data.website || '-'],
    ['현장 지역', data.region || '-'],
    ['기존 장비·시스템', data.existingSystem || '-'],
    ['예상 예산', data.budget || '-'],
    ['희망 시작 시기', data.timeline || '-'],
    ['정부지원사업 연계', data.governmentProgram ? '희망' : '-'],
    ['해결하려는 문제', data.problem],
  ];

  const body = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:6px 12px 6px 0;color:#53647a;white-space:nowrap;vertical-align:top">${escapeHtml(
          label,
        )}</th><td style="padding:6px 0;color:#132238">${escapeHtml(value).replace(/\n/g, '<br>')}</td></tr>`,
    )
    .join('');

  return `<div style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.7">
<h2 style="margin:0 0 16px">BTREE AX LAB — 신규 상담 문의</h2>
<table style="border-collapse:collapse">${body}</table>
</div>`;
}

const customerEmailCopy: Record<Locale, { subject: string; greeting: (name: string) => string; body1: string; body2: string; sign: string }> = {
  ko: {
    subject: '[BTREE AX LAB] 문의가 접수되었습니다',
    greeting: (name) => `${name}님, 문의가 정상적으로 접수되었습니다.`,
    body1: '보내주신 내용을 검토한 뒤 영업일 기준 1~2일 내에 입력하신 연락처로 안내드리겠습니다.',
    body2: '무료 상담은 서비스 적합성 확인을 위한 30분 미팅이며, 상세 기술설계는 유료 서비스로 진행합니다.',
    sign: 'BTREE AX LAB · 주식회사 비트리',
  },
  en: {
    subject: '[BTREE AX LAB] Your inquiry has been received',
    greeting: (name) => `Hi ${name}, thanks — your inquiry has been received.`,
    body1: "We'll review your message and follow up within 1-2 business days using the contact details you provided.",
    body2: 'The free consultation is a 30-minute meeting to confirm service fit; detailed technical design is part of the paid service.',
    sign: 'BTREE AX LAB · BTREE Inc.',
  },
};

function buildCustomerHtml(data: ContactInput): string {
  const copy = customerEmailCopy[data.locale];
  return `<div style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.7">
<p>${escapeHtml(copy.greeting(data.name))}</p>
<p>${escapeHtml(copy.body1)}</p>
<p style="color:#53647a">${escapeHtml(copy.body2)}</p>
<hr style="border:none;border-top:1px solid #dde5ed;margin:20px 0">
<p style="color:#53647a">${escapeHtml(copy.sign)}</p>
</div>`;
}

async function send(payload: Record<string, unknown>): Promise<EmailResult> {
  const apiKey = process.env.EMAIL_API_KEY;
  if (!apiKey) return 'skipped';

  try {
    const response = await fetch(EMAIL_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // 민감한 오류정보는 사용자에게 노출하지 않는다 (17.1-8). 서버 로그에만 상태코드를 남긴다.
      console.error('[email] provider responded with status', response.status);
      return 'failed';
    }

    return 'sent';
  } catch (error) {
    console.error('[email] request failed', error instanceof Error ? error.message : 'unknown');
    return 'failed';
  }
}

/** 관리자 알림 메일 (항상 한국어) */
export async function sendAdminNotification(data: ContactInput, receivedAt: string): Promise<EmailResult> {
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!to || !from) return 'skipped';

  return send({
    from,
    to: [to],
    reply_to: data.email,
    subject: `[문의] ${data.company} — ${serviceLabel(data.service, 'ko')}`,
    html: buildAdminHtml(data, receivedAt),
  });
}

/** 고객 접수 확인 메일 (문의 작성 언어) */
export async function sendCustomerAcknowledgement(data: ContactInput): Promise<EmailResult> {
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!from) return 'skipped';

  return send({
    from,
    to: [data.email],
    subject: customerEmailCopy[data.locale].subject,
    html: buildCustomerHtml(data),
  });
}
