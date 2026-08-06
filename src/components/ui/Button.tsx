'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/components/ui/cn';
import { trackEvent, type AnalyticsEvent, type AnalyticsPayload } from '@/lib/analytics';

/**
 * 버튼 — 마스터 문서 13.5
 * Primary: accent 배경 + 어두운 텍스트, 높이 52px, hover 시 밝기 증가 + 2px 상승
 * Secondary: 투명 배경 + 1px border
 * 최소 44×44px 터치 영역과 focus ring 을 항상 유지한다 (20장).
 */

const base =
  'inline-flex min-h-[52px] items-center justify-center gap-2 rounded-button px-6 text-[15px] font-semibold ' +
  'transition-[transform,background-color,border-color,color] duration-200 ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3';

const variants = {
  primary:
    'bg-accent text-[#062028] hover:bg-accent-hover hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-accent',
  secondary:
    'border border-line-dark bg-transparent text-ink-primary-dark hover:border-accent hover:text-accent focus-visible:outline-accent',
  'secondary-light':
    'border border-line-light bg-transparent text-ink-primary-light hover:border-accent-deep hover:text-accent-deep focus-visible:outline-accent-deep',
} as const;

export type ButtonVariant = keyof typeof variants;

type Props = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  event?: AnalyticsEvent;
  eventPayload?: AnalyticsPayload;
  fullWidth?: boolean;
  withArrow?: boolean;
};

export function Button({
  href,
  children,
  variant = 'primary',
  className,
  event,
  eventPayload,
  fullWidth,
  withArrow,
}: Props) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

  const handleClick = () => {
    if (event) {
      trackEvent(event, { cta_label: typeof children === 'string' ? children : undefined, ...eventPayload });
    }
  };

  const classes = cn(base, variants[variant], fullWidth && 'w-full', className);

  const content = (
    <>
      {children}
      {withArrow ? (
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      ) : null}
    </>
  );

  if (isExternal) {
    return (
      <a className={cn(classes, 'group')} href={href} onClick={handleClick}>
        {content}
      </a>
    );
  }

  return (
    <Link className={cn(classes, 'group')} href={href} onClick={handleClick}>
      {content}
    </Link>
  );
}
