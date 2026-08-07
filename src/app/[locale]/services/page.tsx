import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { JsonLd } from '@/components/layout/JsonLd';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { PageHero } from '@/components/sections/PageHero';
import { Badge, PlaceholderNote } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Section, SectionHeader } from '@/components/ui/Section';
import { freeConsultationScope, serviceComparison, services, servicesPageCopy } from '@/content/services';
import { navLabel } from '@/content/site';
import { locales, type Locale } from '@/i18n/locales';
import { breadcrumbJsonLd, buildMetadata, serviceJsonLd } from '@/lib/seo';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const copy = servicesPageCopy[l];
  return buildMetadata({ locale: l, title: copy.heroTitle, description: copy.heroDescription, path: '/services' });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(locales, rawLocale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Common' });
  const copy = servicesPageCopy[locale];
  const comparison = serviceComparison[locale];
  const serviceList = services[locale];
  const freeScope = freeConsultationScope[locale];

  const breadcrumb = [
    { name: t('home'), path: '/' },
    { name: navLabel(locale, '/services'), path: '/services' },
  ];

  return (
    <>
      <PageHero breadcrumb={breadcrumb} description={copy.heroDescription} eyebrow={copy.heroEyebrow} title={copy.heroTitle} />

      {/* 서비스 비교표 — 마스터 문서 8.2 */}
      <Section ariaLabelledby="comparison-title" tone="light">
        <SectionHeader description={copy.comparisonDescription} id="comparison-title" title={copy.comparisonTitle} tone="light" />

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <caption className="sr-only">{copy.comparisonCaption}</caption>
            <thead>
              <tr className="border-b border-line-light">
                <th className="py-4 pr-4 text-label uppercase tracking-[0.1em] text-ink-secondary-light" scope="col" />
                {comparison.columns.map((column) => (
                  <th className="py-4 pr-4 text-h4 text-ink-primary-light" key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr className="border-b border-line-light" key={row.label}>
                  <th className="py-4 pr-4 align-top text-small font-semibold text-ink-secondary-light" scope="row">
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
          <PlaceholderNote>{copy.comparisonPriceNote}</PlaceholderNote>
        </div>
      </Section>

      {/* 서비스 상세 */}
      <Section ariaLabelledby="service-detail-title" tone="dark">
        <SectionHeader description={copy.detailDescription} id="service-detail-title" title={copy.detailTitle} />

        <div className="flex flex-col gap-6">
          {serviceList.map((service) => (
            <article className="rounded-card border border-line-dark bg-bg-elevated/50 p-6 md:p-9" id={service.slug} key={service.slug}>
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

                  {service.startingPrice ? <p className="mt-6 text-h4 text-ink-primary-dark">{service.startingPrice}</p> : null}
                  {service.duration ? <p className="mt-1 text-small text-ink-secondary-dark">{service.duration}</p> : null}
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
                    <h4 className="text-label uppercase tracking-[0.1em] text-ink-secondary-dark/70">{copy.deliverablesLabel}</h4>
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
                    <h4 className="text-label uppercase tracking-[0.1em] text-ink-secondary-dark/70">{copy.suitableForLabel}</h4>
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
        <SectionHeader description={freeScope.description} id="free-scope-title" title={freeScope.title} />

        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-card border border-accent/30 bg-accent-soft p-6 md:p-7">
            <h3 className="text-h4 text-ink-primary-dark">{copy.freeIncludedTitle}</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {freeScope.included.map((item) => (
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
            <h3 className="text-h4 text-ink-primary-dark">{copy.freeExcludedTitle}</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {freeScope.excluded.map((item) => (
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

      <JsonLd data={[...serviceJsonLd(locale), breadcrumbJsonLd(locale, breadcrumb)]} />
    </>
  );
}
