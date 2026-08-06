import type { Metadata } from 'next';

import { JsonLd } from '@/components/layout/JsonLd';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { PageHero } from '@/components/sections/PageHero';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Section, SectionHeader } from '@/components/ui/Section';
import { industries } from '@/content/industries';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '제조·산업안전·스마트팜·시설 운영 AX 적용 분야',
  description:
    '제조 스마트팩토리, 산업안전 CCTV 관제, 스마트팜, 시설 운영 현장별 문제와 제공 가능한 AI·디지털트윈 영역을 정리했습니다.',
  path: '/industries',
});

const breadcrumb = [
  { name: '홈', path: '/' },
  { name: '적용 산업', path: '/industries' },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        breadcrumb={breadcrumb}
        description="같은 기술이라도 현장의 운영방식과 기존 설비에 따라 필요한 구성이 달라집니다."
        eyebrow="INDUSTRIES"
        title="기술이 아니라 현장의 운영방식에 맞춥니다"
      />

      {industries.map((industry, index) => (
        <Section
          ariaLabelledby={`${industry.slug}-title`}
          id={industry.slug}
          key={industry.slug}
          tone={index % 2 === 0 ? 'dark' : 'dark-alt'}
        >
          <SectionHeader
            eyebrow={industry.name}
            id={`${industry.slug}-title`}
            title={industry.headline}
          />

          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h3 className="text-label uppercase tracking-[0.1em] text-ink-secondary-dark/70">
                현장에서 자주 나타나는 문제
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {industry.problems.map((problem) => (
                  <li
                    className="flex items-start gap-3 rounded-button border border-line-dark bg-bg-elevated/40 px-4 py-3 text-body text-ink-secondary-dark"
                    key={problem}
                  >
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-state-warning" />
                    {problem}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <h3 className="text-label uppercase tracking-[0.1em] text-ink-secondary-dark/70">
                제공 가능 영역
              </h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {industry.capabilities.map((capability) => (
                  <li className="flex items-start gap-2.5 text-body text-ink-primary-dark" key={capability}>
                    <span aria-hidden="true" className="mt-1 text-accent">
                      <Icon className="h-4 w-4" name="check" />
                    </span>
                    {capability}
                  </li>
                ))}
              </ul>

              {industry.caution ? (
                <p className="mt-6 rounded-button border border-state-warning/40 bg-state-warning/10 px-4 py-3 text-small text-state-warning">
                  {industry.caution}
                </p>
              ) : null}

              <div className="mt-8">
                <Button
                  event="cta_ax_diagnosis_click"
                  eventPayload={{ section: 'industries', industry: industry.slug }}
                  href={`/contact?industry=${industry.slug}`}
                >
                  {industry.ctaLabel}
                </Button>
              </div>
            </div>
          </div>
        </Section>
      ))}

      <FinalCtaSection section="industries-final-cta" />

      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
    </>
  );
}
