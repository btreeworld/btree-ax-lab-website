import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { CaseCard } from '@/components/cards/CaseCard';
import { JsonLd } from '@/components/layout/JsonLd';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { PageHero } from '@/components/sections/PageHero';
import { Badge, PlaceholderNote } from '@/components/ui/Badge';
import { Section, SectionHeader } from '@/components/ui/Section';
import { caseStatusLabel, cases, casesNotice, casesPageCopy } from '@/content/cases';
import { navLabel } from '@/content/site';
import { locales, type Locale } from '@/i18n/locales';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const copy = casesPageCopy[l];
  return buildMetadata({ locale: l, title: copy.heroTitle, description: copy.heroDescription, path: '/cases' });
}

export default async function CasesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(locales, rawLocale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Common' });
  const copy = casesPageCopy[locale];

  const breadcrumb = [
    { name: t('home'), path: '/' },
    { name: navLabel(locale, '/cases'), path: '/cases' },
  ];

  return (
    <>
      <PageHero breadcrumb={breadcrumb} description={copy.heroDescription} eyebrow={copy.heroEyebrow} title={copy.heroTitle} />

      <Section ariaLabelledby="case-list-title" tone="dark">
        <SectionHeader description={copy.listDescription} id="case-list-title" title={copy.listTitle} />

        <ul aria-label={copy.listTitle} className="mb-8 flex flex-wrap gap-2">
          {Object.values(caseStatusLabel[locale]).map((label) => (
            <li key={label}>
              <Badge tone="neutral">{label}</Badge>
            </li>
          ))}
        </ul>

        <div className="grid gap-5 lg:grid-cols-3">
          {cases[locale].map((caseStudy) => (
            <CaseCard caseStudy={caseStudy} key={caseStudy.slug} />
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-2">
          <PlaceholderNote>{casesNotice[locale]}</PlaceholderNote>
          <PlaceholderNote>{copy.secondNotice}</PlaceholderNote>
        </div>
      </Section>

      <FinalCtaSection section="cases-final-cta" />

      <JsonLd data={breadcrumbJsonLd(locale, breadcrumb)} />
    </>
  );
}
