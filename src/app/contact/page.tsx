import type { Metadata } from 'next';

import { JsonLd } from '@/components/layout/JsonLd';
import { ContactForm } from '@/components/forms/ContactForm';
import { PageHero } from '@/components/sections/PageHero';
import { Icon } from '@/components/ui/Icon';
import { Section } from '@/components/ui/Section';
import { contactCopy } from '@/content/contact';
import { pricingPlans } from '@/content/pricing';
import { freeConsultationScope } from '@/content/services';
import { legalInfo } from '@/content/site';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '유료 AX 진단 신청 · 프로젝트 상담 요청',
  description:
    '현재 문제와 기존 설비를 알려주시면 가장 적합한 진단 방식과 다음 단계를 안내합니다. 영업일 기준 1~2일 내 회신합니다.',
  path: '/contact',
});

const breadcrumb = [
  { name: '홈', path: '/' },
  { name: '문의·진단 신청', path: '/contact' },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; industry?: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      <PageHero
        breadcrumb={breadcrumb}
        description={contactCopy.helper}
        eyebrow="CONTACT"
        title={contactCopy.heroTitle}
      />

      <Section tone="light">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7 xl:col-span-8">
            <ContactForm defaultIndustry={params.industry ?? ''} defaultService={params.service ?? ''} />
          </div>

          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="flex flex-col gap-5 lg:sticky lg:top-28">
              <div className="rounded-card border border-line-light bg-surface-white p-6">
                <h2 className="text-h4 text-ink-primary-light">무료 상담에서 확인하는 것</h2>
                <p className="mt-3 text-small text-ink-secondary-light">
                  {freeConsultationScope.description}
                </p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {freeConsultationScope.included.map((item) => (
                    <li className="flex items-start gap-2.5 text-body text-ink-primary-light" key={item}>
                      <span aria-hidden="true" className="mt-1 text-accent-deep">
                        <Icon className="h-4 w-4" name="check" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-line-light pt-4 text-[13px] text-ink-secondary-light">
                  상세 아키텍처, 장비 목록, 사업계획서와 구현 방법은 유료 서비스 범위입니다.
                </p>
              </div>

              <div className="rounded-card border border-line-light bg-surface-white p-6">
                <h2 className="text-h4 text-ink-primary-light">시작 가격</h2>
                <dl className="mt-4 flex flex-col gap-3">
                  {pricingPlans.map((plan) => (
                    <div className="flex items-baseline justify-between gap-4" key={plan.name}>
                      <dt className="text-body text-ink-secondary-light">{plan.name}</dt>
                      <dd className="text-body font-semibold text-ink-primary-light">{plan.price}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 border-t border-line-light pt-4 text-[13px] text-ink-secondary-light">
                  부가세, 출장비와 별도 장비비는 프로젝트 범위에 따라 추가됩니다.
                </p>
              </div>

              <div className="rounded-card border border-line-light bg-surface-white p-6">
                <h2 className="text-h4 text-ink-primary-light">직접 연락</h2>
                <dl className="mt-4 flex flex-col gap-2 text-body">
                  <div className="flex gap-2">
                    <dt className="text-ink-secondary-light">{legalInfo.email.label}</dt>
                    <dd className={legalInfo.email.status === 'placeholder' ? 'text-state-warning' : ''}>
                      {legalInfo.email.value}
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-ink-secondary-light">{legalInfo.phone.label}</dt>
                    <dd className={legalInfo.phone.status === 'placeholder' ? 'text-state-warning' : ''}>
                      {legalInfo.phone.value}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
    </>
  );
}
