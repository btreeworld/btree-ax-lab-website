import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { JsonLd } from '@/components/layout/JsonLd';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { PageHero } from '@/components/sections/PageHero';
import { PricingSection } from '@/components/sections/PricingSection';
import { PlaceholderNote } from '@/components/ui/Badge';
import { Section, SectionHeader } from '@/components/ui/Section';
import { processDetail, processPageCopy, refundPolicyDraft } from '@/content/pricing';
import { freeConsultationScope } from '@/content/services';
import { navLabel } from '@/content/site';
import { locales, type Locale } from '@/i18n/locales';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const copy = processPageCopy[l];
  return buildMetadata({ locale: l, title: copy.heroTitle, description: copy.heroDescription, path: '/process' });
}

export default async function ProcessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(locales, rawLocale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Common' });
  const copy = processPageCopy[locale];
  const steps = processDetail[locale];
  const freeScope = freeConsultationScope[locale];
  const refund = refundPolicyDraft[locale];

  const breadcrumb = [
    { name: t('home'), path: '/' },
    { name: navLabel(locale, '/process'), path: '/process' },
  ];

  return (
    <>
      <PageHero breadcrumb={breadcrumb} description={copy.heroDescription} eyebrow={copy.heroEyebrow} title={copy.heroTitle} />

      {/* 전체 절차 — 마스터 문서 10.2 */}
      <Section ariaLabelledby="process-detail-title" tone="dark">
        <SectionHeader description={copy.detailDescription} id="process-detail-title" title={copy.detailTitle} />

        <ol className="relative flex flex-col gap-0 border-l border-line-dark pl-8 md:pl-10">
          {steps.map((step) => (
            <li className="relative pb-10 last:pb-0" key={step.step}>
              <span className="absolute -left-[41px] top-1 flex h-8 w-8 items-center justify-center rounded-full border border-accent/40 bg-bg-primary font-display text-[12px] font-bold text-accent md:-left-[49px]">
                {step.step}
              </span>
              <p className="text-label uppercase tracking-[0.14em] text-ink-secondary-dark/70">{step.labelEn}</p>
              <h3 className="mt-2 text-h4 text-ink-primary-dark">{step.label}</h3>
              <p className="mt-2 max-w-[720px] text-body text-ink-secondary-dark">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 무료 상담 범위 */}
      <Section ariaLabelledby="free-scope-process-title" compact tone="dark-alt">
        <SectionHeader description={freeScope.description} id="free-scope-process-title" title={copy.freeScopeTitle} />

        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-card border border-accent/30 bg-accent-soft p-6 md:p-7">
            <h3 className="text-h4 text-ink-primary-dark">{copy.freeIncludedTitle}</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {freeScope.included.map((item) => (
                <li className="text-body text-ink-primary-dark" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card border border-line-dark bg-bg-elevated/50 p-6 md:p-7">
            <h3 className="text-h4 text-ink-primary-dark">{copy.freeExcludedTitle}</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {freeScope.excluded.map((item) => (
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
        <SectionHeader id="refund-title" title={copy.refundTitle} />

        <ul className="flex flex-col gap-3">
          {refund.items.map((item) => (
            <li className="flex items-start gap-3 rounded-button border border-line-dark bg-bg-elevated/40 px-5 py-4 text-body text-ink-secondary-dark" key={item}>
              <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <PlaceholderNote>{refund.notice}</PlaceholderNote>
        </div>
      </Section>

      <FinalCtaSection section="process-final-cta" />

      <JsonLd data={breadcrumbJsonLd(locale, breadcrumb)} />
    </>
  );
}
