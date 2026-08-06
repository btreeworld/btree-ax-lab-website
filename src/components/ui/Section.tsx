import type { ReactNode } from 'react';

import { cn } from '@/components/ui/cn';

/** 컨테이너 — max-width 1240px (마스터 문서 13.4) */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('container-page', className)}>{children}</div>;
}

type Tone = 'dark' | 'dark-alt' | 'light';

const toneClass: Record<Tone, string> = {
  dark: 'section-dark',
  'dark-alt': 'section-dark-alt',
  light: 'section-light',
};

/** 섹션 — 어두운 배경과 밝은 콘텐츠 구간의 리듬을 만든다 (13.1 디자인 원칙 4) */
export function Section({
  children,
  tone = 'dark',
  compact = false,
  id,
  className,
  ariaLabelledby,
}: {
  children: ReactNode;
  tone?: Tone;
  compact?: boolean;
  id?: string;
  className?: string;
  ariaLabelledby?: string;
}) {
  return (
    <section
      aria-labelledby={ariaLabelledby}
      className={cn(
        toneClass[tone],
        compact ? 'py-section-y-compact' : 'py-section-y',
        'scroll-mt-24',
        className,
      )}
      id={id}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({
  children,
  tone = 'dark',
  className,
}: {
  children: ReactNode;
  tone?: 'dark' | 'light';
  className?: string;
}) {
  return (
    <p
      className={cn(
        'text-label uppercase tracking-[0.16em]',
        tone === 'dark' ? 'text-accent' : 'text-accent-deep',
        className,
      )}
    >
      {children}
    </p>
  );
}

/**
 * 섹션 헤더 — 제목과 콘텐츠 간격 48px(desktop) / 32px(mobile)
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  tone = 'dark',
  id,
  align = 'left',
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: 'dark' | 'light';
  id?: string;
  align?: 'left' | 'center';
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        'mb-8 flex flex-col gap-4 md:mb-12',
        align === 'center' && 'items-center text-center',
        Boolean(action) && 'md:flex-row md:items-end md:justify-between',
      )}
    >
      <div className={cn('flex flex-col gap-4', align === 'center' && 'items-center')}>
        {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
        <h2
          className={cn(
            'max-w-headline text-h2',
            tone === 'dark' ? 'text-ink-primary-dark' : 'text-ink-primary-light',
          )}
          id={id}
        >
          {title}
        </h2>
        {description ? (
          <div
            className={cn(
              'max-w-[760px] text-body-l',
              tone === 'dark' ? 'text-ink-secondary-dark' : 'text-ink-secondary-light',
            )}
          >
            {description}
          </div>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
