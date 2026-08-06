/**
 * 분석 이벤트 — 마스터 문서 19장
 * GA4 가 로드되지 않은 환경에서도 오류 없이 동작해야 한다.
 */

export const analyticsEvents = [
  'cta_ax_diagnosis_click',
  'cta_project_consulting_click',
  'service_card_click',
  'industry_card_click',
  'case_card_click',
  'track_record_filter',
  'track_record_detail_open',
  'representative_profile_view',
  'pricing_view',
  'contact_form_start',
  'contact_form_error',
  'contact_form_submit',
  'contact_form_success',
  'phone_click',
  'email_click',
  'file_download',
  'faq_open',
  'scroll_50',
  'scroll_90',
] as const;

export type AnalyticsEvent = (typeof analyticsEvents)[number];

/** 19.2 이벤트 속성 */
export type AnalyticsPayload = {
  page_path?: string;
  section?: string;
  cta_label?: string;
  service_type?: string;
  industry?: string;
  device_type?: string;
  [key: string]: string | number | boolean | undefined;
};

type GtagWindow = Window & {
  gtag?: (command: 'event', name: string, params?: Record<string, unknown>) => void;
  dataLayer?: unknown[];
};

export function trackEvent(event: AnalyticsEvent, payload: AnalyticsPayload = {}): void {
  if (typeof window === 'undefined') return;

  const win = window as GtagWindow;
  const params: AnalyticsPayload = {
    page_path: payload.page_path ?? window.location.pathname,
    device_type: payload.device_type ?? (window.innerWidth < 768 ? 'mobile' : 'desktop'),
    ...payload,
  };

  if (typeof win.gtag === 'function') {
    win.gtag('event', event, params);
    return;
  }

  // GA4 미설정 환경에서는 dataLayer 에만 push 하고 조용히 넘어간다.
  if (Array.isArray(win.dataLayer)) {
    win.dataLayer.push({ event, ...params });
  }
}

/** CTA 라벨로 어떤 전환 이벤트를 보낼지 결정한다 (마스터 문서 1.3 전환 행동 통일). */
export function ctaEventFor(label: string): AnalyticsEvent {
  return label.includes('진단') ? 'cta_ax_diagnosis_click' : 'cta_project_consulting_click';
}
