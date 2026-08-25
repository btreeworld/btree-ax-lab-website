import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { ContactForm } from '@/components/forms/ContactForm';
import { JsonLd } from '@/components/layout/JsonLd';
import { PageHero } from '@/components/sections/PageHero';
import { VisualNarrative } from '@/components/sections/VisualNarrative';
import { Icon } from '@/components/ui/Icon';
import { Section } from '@/components/ui/Section';
import { contactCopy } from '@/content/contact';
import { pricingPlans } from '@/content/pricing';
import { freeConsultationScope } from '@/content/services';
import { legalInfo, navLabel } from '@/content/site';
import { locales, type Locale } from '@/i18n/locales';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const copy = contactCopy[l];
  return buildMetadata({ locale: l, title: copy.heroTitle.join(' '), description: copy.helper.join(' '), path: '/contact' });
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ service?: string; industry?: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(locales, rawLocale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const query = await searchParams;
  const t = await getTranslations({ locale, namespace: 'Common' });
  const copy = contactCopy[locale];
  const freeScope = freeConsultationScope[locale];
  const plans = pricingPlans[locale];
  const legal = legalInfo[locale];

  const breadcrumb = [
    { name: t('home'), path: '/' },
    { name: navLabel(locale, '/contact'), path: '/contact' },
  ];

  return (
    <>
      <PageHero breadcrumb={breadcrumb} description={copy.helper} eyebrow="CONTACT" title={copy.heroTitle} />

      <VisualNarrative
        description={locale === 'ko' ? '문의 내용을 바탕으로 현장 조건을 확인하고, 필요한 경우 진단·설계·PoC 중 가장 작은 검증 단위부터 제안합니다.' : 'We review your field conditions and propose the smallest useful validation step across diagnosis, design, or PoC.'}
        diagramVariant="flow"
        eyebrow="WHAT HAPPENS NEXT"
        image="/images/visuals/contact-digital-twin-discovery-v3.webp"
        imageAlt={locale === 'ko' ? '고객 현장의 3D 디지털트윈과 통합관제 화면을 함께 보며 AI 적용 구간과 PoC 범위를 논의하는 첫 상담' : 'An initial consultation using a 3D digital twin and integrated control view to identify AI opportunities and PoC scope'}
        points={locale === 'ko' ? [
          { title: '문의 접수', description: '현장과 해결하려는 문제를 간단히 알려주세요.', icon: 'advisory' },
          { title: '조건 확인', description: '데이터·설비·공간·기존 소프트웨어와 운영 조건을 확인합니다.', icon: 'search' },
          { title: '범위 제안', description: 'AI 응용·통합관제·디지털트윈 중 필요한 산출물과 검증 범위를 제안합니다.', icon: 'blueprint' },
          { title: '착수 판단', description: '비용과 일정 확인 후 다음 단계를 결정합니다.', icon: 'check' },
        ] : [
          { title: 'Inquiry', description: 'Tell us briefly about the field and the problem to solve.', icon: 'advisory' },
          { title: 'Condition review', description: 'Review data, equipment, space, existing software, and operating constraints.', icon: 'search' },
          { title: 'Scope proposal', description: 'Define the needed AI app, control platform, digital twin, and validation scope.', icon: 'blueprint' },
          { title: 'Start decision', description: 'Choose the next step after confirming cost and schedule.', icon: 'check' },
        ]}
        title={locale === 'ko' ? '문의 후 진행 과정을 미리 확인하세요' : 'See what happens after your inquiry'}
      />

      <Section tone="light">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7 xl:col-span-8">
            <ContactForm defaultIndustry={query.industry ?? ''} defaultService={query.service ?? ''} />
          </div>

          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="flex flex-col gap-5 lg:sticky lg:top-28">
              <div className="rounded-card border border-line-light bg-surface-white p-6">
                <h2 className="text-h4 text-ink-primary-light">{freeScope.title}</h2>
                <p className="mt-3 text-small text-ink-secondary-light">{freeScope.description}</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {freeScope.included.map((item) => (
                    <li className="flex items-start gap-2.5 text-body text-ink-primary-light" key={item}>
                      <span aria-hidden="true" className="mt-1 text-accent-deep">
                        <Icon className="h-4 w-4" name="check" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-line-light pt-4 text-[13px] text-ink-secondary-light">{freeScope.excludedNote}</p>
              </div>

              <div className="rounded-card border border-line-light bg-surface-white p-6">
                <h2 className="text-h4 text-ink-primary-light">{copy.startingPricesLabel}</h2>
                <dl className="mt-4 flex flex-col gap-3">
                  {plans.map((plan) => (
                    <div className="flex items-baseline justify-between gap-4" key={plan.name}>
                      <dt className="text-body text-ink-secondary-light">{plan.name}</dt>
                      <dd className="text-body font-semibold text-ink-primary-light">{plan.price}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-card border border-line-light bg-surface-white p-6">
                <h2 className="text-h4 text-ink-primary-light">{copy.directContactLabel}</h2>
                <dl className="mt-4 flex flex-col gap-2 text-body">
                  <div className="flex gap-2">
                    <dt className="text-ink-secondary-light">{legal.email.label}</dt>
                    <dd className={legal.email.status === 'placeholder' ? 'text-state-warning' : ''}>{legal.email.value}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <JsonLd data={breadcrumbJsonLd(locale, breadcrumb)} />
    </>
  );
}
