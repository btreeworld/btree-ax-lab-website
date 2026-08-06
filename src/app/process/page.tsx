import type { Metadata } from 'next';

import { JsonLd } from '@/components/layout/JsonLd';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { PageHero } from '@/components/sections/PageHero';
import { PricingSection } from '@/components/sections/PricingSection';
import { PlaceholderNote } from '@/components/ui/Badge';
import { Section, SectionHeader } from '@/components/ui/Section';
import { processDetail, refundPolicyDraft } from '@/content/pricing';
import { freeConsultationScope } from '@/content/services';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '진행 절차 · 가격',
  description:
    '적합성 확인부터 계약, 현장 분석, 설계, 결과 전달, PoC까지의 진행 절차와 서비스별 시작 가격을 안내합니다.',
  path: '/process',
});

const breadcrumb = [
  { name: '홈', path: '/' },
  { name: '진행 절차', path: '/process' },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        breadcrumb={breadcrumb}
        description="큰 계약을 먼저 결정하지 않아도 됩니다. 범위를 정하고, 비용을 예측한 뒤 작게 검증합니다."
        eyebrow="PROCESS & PRICING"
        title="범위를 먼저 정하고, 비용을 예측하고, 작게 검증합니다"
      />

      {/* 전체 절차 — 마스터 문서 10.2 */}
      <Section ariaLabelledby="process-detail-title" tone="dark">
        <SectionHeader
          description="문의부터 PoC까지 각 단계에서 무엇이 진행되는지 미리 확인할 수 있습니다."
          id="process-detail-title"
          title="전체 진행 절차"
        />

        <ol className="relative flex flex-col gap-0 border-l border-line-dark pl-8 md:pl-10">
          {processDetail.map((step) => (
            <li className="relative pb-10 last:pb-0" key={step.step}>
              <span
                aria-hidden="true"
                className="absolute -left-[41px] top-1 flex h-8 w-8 items-center justify-center rounded-full border border-accent/40 bg-bg-primary font-display text-[12px] font-bold text-accent md:-left-[49px]"
              >
                {step.step}
              </span>
              <p className="text-label uppercase tracking-[0.14em] text-ink-secondary-dark/70">
                {step.labelEn}
              </p>
              <h3 className="mt-2 text-h4 text-ink-primary-dark">{step.labelKo}</h3>
              <p className="mt-2 max-w-[720px] text-body text-ink-secondary-dark">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 무료 상담 범위 */}
      <Section ariaLabelledby="free-scope-process-title" compact tone="dark-alt">
        <SectionHeader
          description={freeConsultationScope.description}
          id="free-scope-process-title"
          title={freeConsultationScope.title}
        />

        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-card border border-accent/30 bg-accent-soft p-6 md:p-7">
            <h3 className="text-h4 text-ink-primary-dark">포함</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {freeConsultationScope.included.map((item) => (
                <li className="text-body text-ink-primary-dark" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card border border-line-dark bg-bg-elevated/50 p-6 md:p-7">
            <h3 className="text-h4 text-ink-primary-dark">미포함 (유료 서비스 범위)</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {freeConsultationScope.excluded.map((item) => (
                <li className="text-body text-ink-secondary-dark" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <PricingSection />

      {/* 환불·일정 원칙 — 법률 검토 후 최종 반영 */}
      <Section ariaLabelledby="refund-title" compact tone="dark">
        <SectionHeader id="refund-title" title="환불·일정 원칙" />

        <ul className="flex flex-col gap-3">
          {refundPolicyDraft.items.map((item) => (
            <li
              className="flex items-start gap-3 rounded-button border border-line-dark bg-bg-elevated/40 px-5 py-4 text-body text-ink-secondary-dark"
              key={item}
            >
              <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <PlaceholderNote>{refundPolicyDraft.notice}</PlaceholderNote>
        </div>
      </Section>

      <FinalCtaSection section="process-final-cta" />

      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
    </>
  );
}
