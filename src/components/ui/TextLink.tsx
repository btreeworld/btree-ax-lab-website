'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/components/ui/cn';
import { trackEvent, type AnalyticsEvent, type AnalyticsPayload } from '@/lib/analytics';

/**
 * 텍스트 링크 — 마스터 문서 13.5
 * 문구 + 오른쪽 화살표, hover 시 화살표 이동. 링크 목적이 문맥 없이도 이해되도록 작성한다.
 */
export function TextLink({
  href,
  children,
  tone = 'dark',
  className,
  event,
  eventPayload,
}: {
  href: string;
  children: ReactNode;
  tone?: 'dark' | 'light';
  className?: string;
  event?: AnalyticsEvent;
  eventPayload?: AnalyticsPayload;
}) {
  return (
    <Link
      className={cn(
        'group inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-semibold underline-offset-4 hover:underline',
        tone === 'dark' ? 'text-accent' : 'text-accent-deep',
        className,
      )}
      href={href}
      onClick={() => {
        if (event) trackEvent(event, eventPayload);
      }}
    >
      {children}
      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
