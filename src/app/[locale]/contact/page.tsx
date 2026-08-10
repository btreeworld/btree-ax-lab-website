import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { ContactForm } from '@/components/forms/ContactForm';
import { JsonLd } from '@/components/layout/JsonLd';
import { PageHero } from '@/components/sections/PageHero';
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
