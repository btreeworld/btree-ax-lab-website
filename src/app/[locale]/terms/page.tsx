import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { PageHero } from '@/components/sections/PageHero';
import { PlaceholderNote } from '@/components/ui/Badge';
import { Section } from '@/components/ui/Section';
import { legalNotice, termsOfService } from '@/content/legal';
import { navLabel } from '@/content/site';
import { locales, type Locale } from '@/i18n/locales';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  return buildMetadata({
    locale: l,
    title: l === 'ko' ? '이용약관' : 'Terms of Service',
    description:
      l === 'ko'
        ? 'BTREE AX LAB 웹사이트의 정보 제공과 문의 접수 서비스 이용 조건입니다.'
        : 'Terms of use for the information and inquiry-intake service on the BTREE AX LAB website.',
    path: '/terms',
  });
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(locales, rawLocale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Common' });
  const terms = termsOfService[locale];

  return (
    <>
      <PageHero
        breadcrumb={[
          { name: t('home'), path: '/' },
          { name: navLabel(locale, '/terms'), path: '/terms' },
        ]}
        title={locale === 'ko' ? '이용약관' : 'Terms of Service'}
      />

      <Section tone="dark">
        <div className="max-w-[820px]">
          <div className="mb-10 rounded-button border border-state-warning/40 bg-state-warning/10 px-5 py-4">
            <p className="text-small text-state-warning">{legalNotice[locale]}</p>
          </div>

          <p className="mb-10 text-body text-ink-secondary-dark">
            {locale === 'ko' ? '시행일' : 'Effective date'}: <span className="text-state-warning">{terms.effectiveDate}</span>
          </p>

          {terms.sections.map((section) => (
            <section className="mb-10" key={section.title}>
              <h2 className="text-h4 text-ink-primary-dark">{section.title}</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {section.body.map((line) => (
                  <li className="text-body text-ink-secondary-dark" key={line}>
                    {line}
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <PlaceholderNote>
            {locale === 'ko' ? '계약 관련 세부 조건은 개별 계약서가 우선합니다.' : 'The individual contract governs specific terms.'}
          </PlaceholderNote>
        </div>
      </Section>
    </>
  );
}
