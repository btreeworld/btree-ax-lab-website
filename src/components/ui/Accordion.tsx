'use client';

import type { ReactNode } from 'react';

import { trackEvent, type AnalyticsEvent } from '@/lib/analytics';

/**
 * 아코디언 — 마스터 문서 20장(accordion ARIA) / 15.2(JS 실패 시에도 정보 노출)
 * native <details>/<summary> 를 사용해 JavaScript 없이도 열고 닫을 수 있게 한다.
 */
export function Accordion({
  summary,
  children,
  tone = 'dark',
  event,
  eventLabel,
  defaultOpen = false,
}: {
  summary: string;
  children: ReactNode;
  tone?: 'dark' | 'light';
  event?: AnalyticsEvent;
  eventLabel?: string;
  defaultOpen?: boolean;
}) {
  const dark = tone === 'dark';

  return (
    <details
      className={`group border-b ${dark ? 'border-line-dark' : 'border-line-light'}`}
      onToggle={(e) => {
        if (event && (e.currentTarget as HTMLDetailsElement).open) {
          trackEvent(event, { cta_label: eventLabel ?? summary });
        }
      }}
      open={defaultOpen}
    >
      <summary
        className={`flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-5 text-[17px] font-semibold marker:content-none ${
          dark ? 'text-ink-primary-dark' : 'text-ink-primary-light'
        }`}
      >
        <span>{summary}</span>
        <span
          aria-hidden="true"
          className={`relative h-5 w-5 shrink-0 ${dark ? 'text-accent' : 'text-accent-deep'}`}
        >
          <span className="absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 bg-current" />
          <span className="absolute left-1/2 top-0 h-5 w-0.5 -translate-x-1/2 bg-current transition-transform duration-200 group-open:rotate-90 group-open:opacity-0" />
        </span>
      </summary>
      <div
        className={`pb-6 pr-10 text-body ${dark ? 'text-ink-secondary-dark' : 'text-ink-secondary-light'}`}
      >
        {children}
      </div>
    </details>
  );
}
