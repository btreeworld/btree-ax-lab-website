import { Section, SectionHeader } from '@/components/ui/Section';
import { processSteps } from '@/content/home';
import type { ProcessStep } from '@/types';

/**
 * Section 04 — Process (마스터 문서 7.4)
 * 데스크톱: 수평 프로세스 라인 / 모바일: 수직 타임라인
 * 연결선의 데이터 흐름 애니메이션은 prefers-reduced-motion 에서 정지한다.
 */
export function ProcessSection({
  steps = processSteps,
  title = '불확실성을 줄이는 4단계',
  description,
  tone = 'dark',
}: {
  steps?: ProcessStep[];
  title?: string;
  description?: string;
  tone?: 'dark' | 'light';
}) {
  const dark = tone === 'dark';

  return (
    <Section ariaLabelledby="process-title" id="process" tone={dark ? 'dark' : 'light'}>
      <SectionHeader
        description={description}
        eyebrow="PROCESS"
        id="process-title"
        title={title}
        tone={tone}
      />

      <ol className="relative grid gap-8 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
        {/* 데스크톱 연결선 — 정보 전달용이 아니므로 장식 처리 */}
        <li
          aria-hidden="true"
          className={`pointer-events-none absolute left-0 right-0 top-[26px] hidden h-px xl:block ${
            dark ? 'bg-line-dark' : 'bg-line-light'
          }`}
        />

        {steps.map((step, index) => (
          <li className="relative" key={step.step}>
            <div className="flex items-center gap-4">
              <span
                className={`relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border font-display text-[15px] font-bold ${
                  dark
                    ? 'border-accent/40 bg-bg-primary text-accent'
                    : 'border-accent-deep/30 bg-surface-light text-accent-deep'
                }`}
              >
                {step.step}
              </span>
              <span
                className={`text-label uppercase tracking-[0.14em] ${
                  dark ? 'text-ink-secondary-dark/70' : 'text-ink-secondary-light/70'
                }`}
              >
                {step.labelEn}
              </span>
              {index < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className={`hidden h-px flex-1 md:block xl:hidden ${
                    dark ? 'bg-line-dark' : 'bg-line-light'
                  }`}
                />
              ) : null}
            </div>

            <h3
              className={`mt-5 text-h4 ${dark ? 'text-ink-primary-dark' : 'text-ink-primary-light'}`}
            >
              {step.labelKo}
            </h3>
            <p
              className={`mt-3 text-body ${
                dark ? 'text-ink-secondary-dark' : 'text-ink-secondary-light'
              }`}
            >
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
