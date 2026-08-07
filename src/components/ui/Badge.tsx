import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

import { cn } from '@/components/ui/cn';

/**
 * 배지 — 마스터 문서 13.6 상태 배지
 * 색상에만 의존하지 않도록 항상 텍스트 라벨을 함께 표시한다 (20장 접근성).
 */
const tones = {
  accent: 'bg-accent-soft text-accent border-accent/30',
  neutral: 'border-line-dark bg-white/5 text-ink-secondary-dark',
  'neutral-light': 'border-line-light bg-white text-ink-secondary-light',
  warning: 'border-state-warning/40 bg-state-warning/10 text-state-warning',
} as const;

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-badge border px-3 py-1 text-label',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** 검증 전 콘텐츠를 명시하는 주석 — 마스터 문서 23장 콘텐츠 신뢰성 정책 */
export async function PlaceholderNote({ children }: { children: ReactNode }) {
  const t = await getTranslations('Common');
  return (
    <p className="text-small text-ink-secondary-dark/80">
      <span aria-hidden="true">※ </span>
      <span className="sr-only">{t('note')}</span>
      {children}
    </p>
  );
}
