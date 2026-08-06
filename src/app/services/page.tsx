import type { Metadata } from 'next';

import { JsonLd } from '@/components/layout/JsonLd';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { PageHero } from '@/components/sections/PageHero';
import { Badge, PlaceholderNote } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Section, SectionHeader } from '@/components/ui/Section';
import {
  freeConsultationScope,
  serviceComparison,
  services,
} from '@/content/services';
import { breadcrumbJsonLd, buildMetadata, serviceJsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '산업 현장 AX 진단·구축 설계·PoC 실증',
  description:
    '문제 정의가 필요한 단계부터 PoC와 운영 고도화까지, 각 단계의 불확실성을 줄이는 AX 서비스를 제공합니다.',
  path: '/services',
});

const breadcrumb = [
  { name: '홈', path: '/' },
  { name: '서비스', path: '/services' },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumb={breadcrumb}
        description="문제 정의가 필요한 단계부터 PoC와 운영 고도화까지, 각 단계의 불확실성을 줄이는 서비스를 제공합니다."
        eyebrow="SERVICES"
        title="현장의 현재 단계에 맞는 AX 서비스를 선택하십시오"
      />

      {/* 서비스 비교표 — 마스터 문서 8.2 */}
      <Section ariaLabelledby="comparison-title" tone="light">
        <SectionHeader
          description="같은 문제라도 지금 어느 단계에 있는지에 따라 필요한 서비스가 다릅니다."
          id="comparison-title"
          title="서비스 비교"
          tone="light"
        />

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <caption className="sr-only">
              AX 진단, 구축 설계, PoC 실증, 기술자문의 적합한 단계와 산출물, 시작 가격 비교
            </caption>
            <thead>
              <tr className="border-b border-line-light">
                <th className="py-4 pr-4 text-label uppercase tracking-[0.1em] text-ink-secondary-light" scope="col">
                  구분
                </th>
                {serviceComparison.columns.map((column) => (
                  <th className="py-4 pr-4 text-h4 text-ink-primary-light" key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {serviceComparison.rows.map((row) => (
                <tr className="border-b border-line-light" key={row.label}>
                  <th
                    className="py-4 pr-4 align-top text-small font-semibold text-ink-secondary-light"
                    scope="row"
                  >
                    {row.label}
                  </th>
                  {row.values.map((value, index) => (
                    <td className="py-4 pr-4 align-top text-body text-ink-primary-light" key={`${row.label}-${index}`}>
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <PlaceholderNote>
            표기된 시작 가격은 최종 확정 전 기준안입니다. 정확한 견적은 사전 적합성 확인 후 안내합니다.
          </PlaceholderNote>
        </div>
      </Section>

      {/* 서비스 상세 */}
      <Section ariaLabelledby="service-detail-title" tone="dark">
        <SectionHeader
          description="각 서비스의 제공 범위와 산출물입니다. 필요한 단계만 선택해 계약할 수 있습니다."
          id="service-detail-title"
          title="서비스 상세"
        />

        <div className="flex flex-col gap-6">
          {services.map((service) => (
            <article
              className="rounded-card border border-line-dark bg-bg-elevated/50 p-6 md:p-9"
              id={service.slug}
              key={service.slug}
            >
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-3">
                    <Badge tone="accent">STEP {service.step}</Badge>
                    <span className="text-accent">
                      <Icon className="h-5 w-5" name="blueprint" />
                    </span>
                  </div>
                  <h3 className="mt-4 text-h3 text-ink-primary-dark">{service.name}</h3>
                  <p className="mt-4 text-body-l text-ink-secondary-dark">{service.summary}</p>
                  <p className="mt-4 text-body text-ink-secondary-dark">{service.description}</p>

                  {service.startingPrice ? (
                    <p className="mt-6 text-h4 text-ink-primary-dark">{service.startingPrice}</p>
                  ) : null}
                  {service.duration ? (
                    <p className="mt-1 text-small text-ink-secondary-dark">{service.duration}</p>
                  ) : null}
                  {service.caution ? (
                    <p className="mt-4 rounded-button border border-state-warning/40 bg-state-warning/10 px-4 py-3 text-small text-state-warning">
                      {service.caution}
                    </p>
                  ) : null}

                  <div className="mt-7">
                    <Button
                      event={service.slug === 'ax-diagnosis' ? 'cta_ax_diagnosis_click' : 'cta_project_consulting_click'}
                      eventPayload={{ section: 'services-detail', service_type: service.slug }}
                      href={service.ctaHref}
                    >
                      {service.ctaLabel}
                    </Button>
                  </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
                  <div>
                    <h4 className="text-label uppercase tracking-[0.1em] text-ink-secondary-dark/70">
                      결과물
                    </h4>
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {service.deliverables.map((item) => (
                        <li className="flex items-start gap-2.5 text-body text-ink-secondary-dark" key={item}>
                          <span aria-hidden="true" className="mt-1 text-accent">
                            <Icon className="h-4 w-4" name="check" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-label uppercase tracking-[0.1em] text-ink-secondary-dark/70">
                      이런 경우에 적합합니다
                    </h4>
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {service.suitableFor.map((item) => (
                        <li className="flex items-start gap-2.5 text-body text-ink-secondary-dark" key={item}>
                          <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* 무료 상담 범위 — 마스터 문서 4.1 */}
      <Section ariaLabelledby="free-scope-title" compact tone="dark-alt">
        <SectionHeader
          description={freeConsultationScope.description}
          id="free-scope-title"
          title={freeConsultationScope.title}
        />

        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-card border border-accent/30 bg-accent-soft p-6 md:p-7">
            <h3 className="text-h4 text-ink-primary-dark">무료 상담에 포함됩니다</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {freeConsultationScope.included.map((item) => (
                <li className="flex items-start gap-2.5 text-body text-ink-primary-dark" key={item}>
                  <span aria-hidden="true" className="mt-1 text-accent">
                    <Icon className="h-4 w-4" name="check" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-card border border-line-dark bg-bg-elevated/50 p-6 md:p-7">
            <h3 className="text-h4 text-ink-primary-dark">유료 서비스 범위입니다</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {freeConsultationScope.excluded.map((item) => (
                <li className="flex items-start gap-2.5 text-body text-ink-secondary-dark" key={item}>
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-secondary-dark" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <FinalCtaSection section="services-final-cta" />

      <JsonLd data={[...serviceJsonLd(), breadcrumbJsonLd(breadcrumb)]} />
    </>
  );
}
