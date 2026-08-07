import { getLocale } from 'next-intl/server';

import { Section, SectionHeader } from '@/components/ui/Section';
import { homeSectionCopy, processSteps } from '@/content/home';
import type { Locale } from '@/i18n/locales';

/**
 * Section 04 — Process (마스터 문서 7.4)
 * 데스크톱: 수평 프로세스 라인 / 모바일: 수직 타임라인
 * 연결선의 데이터 흐름 애니메이션은 prefers-reduced-motion 에서 정지한다.
 * 홈 페이지 전용 컴포넌트다 (진행 절차 페이지는 자체 타임라인 UI를 사용한다).
 */
export async function ProcessSection() {
  const locale = (await getLocale()) as Locale;
  const copy = homeSectionCopy[locale].process;
  const steps = processSteps[locale];

  return (
    <Section ariaLabelledby="process-title" id="process" tone="dark">
      <SectionHeader description={copy.description} eyebrow={copy.eyebrow} id="process-title" title={copy.title} />

      <ol className="relative grid gap-8 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
        {/* 데스크톱 연결선 — 정보 전달용이 아니므로 장식 처리 */}
        <li aria-hidden="true" className="pointer-events-none absolute left-0 right-0 top-[26px] hidden h-px bg-line-dark xl:block" />

        {steps.map((step, index) => (
          <li className="relative" key={step.step}>
            <div className="flex items-center gap-4">
              <span className="relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-accent/40 bg-bg-primary font-display text-[15px] font-bold text-accent">
                {step.step}
              </span>
              <span className="text-label uppercase tracking-[0.14em] text-ink-secondary-dark/70">{step.labelEn}</span>
              {index < steps.length - 1 ? (
                <span aria-hidden="true" className="hidden h-px flex-1 bg-line-dark md:block xl:hidden" />
              ) : null}
            </div>

            <h3 className="mt-5 text-h4 text-ink-primary-dark">{step.label}</h3>
            <p className="mt-3 text-body text-ink-secondary-dark">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
