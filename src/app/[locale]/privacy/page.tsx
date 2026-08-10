import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { PageHero } from '@/components/sections/PageHero';
import { PlaceholderNote } from '@/components/ui/Badge';
import { Section } from '@/components/ui/Section';
import { legalNotice, privacyPolicy } from '@/content/legal';
import { legalInfo, navLabel } from '@/content/site';
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
    title: l === 'ko' ? '개인정보처리방침' : 'Privacy Policy',
    description:
      l === 'ko'
        ? '주식회사 비트리가 운영하는 BTREE AX LAB 웹사이트의 개인정보 수집·이용·보관 정책입니다.'
        : "BTREE Inc.'s policy for collecting, using, and retaining personal information on the BTREE AX LAB website.",
    path: '/privacy',
  });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(locales, rawLocale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Common' });
  const policy = privacyPolicy[locale];
  const legal = legalInfo[locale];

  return (
    <>
      <PageHero
        breadcrumb={[
          { name: t('home'), path: '/' },
          { name: navLabel(locale, '/privacy'), path: '/privacy' },
        ]}
        title={locale === 'ko' ? '개인정보처리방침' : 'Privacy Policy'}
      />

      <Section tone="dark">
        <div className="max-w-[820px]">
          <div className="mb-10 rounded-button border border-state-warning/40 bg-state-warning/10 px-5 py-4">
            <p className="text-small text-state-warning">{legalNotice[locale]}</p>
          </div>

          <dl className="mb-10 flex flex-col gap-2 text-body">
            <div className="flex gap-3">
              <dt className="text-ink-secondary-dark">{legal.company.label}</dt>
              <dd className="text-ink-primary-dark">{legal.company.value}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-ink-secondary-dark">{locale === 'ko' ? '시행일' : 'Effective date'}</dt>
              <dd className={policy.effectiveDate.startsWith('[') ? 'text-state-warning' : 'text-ink-primary-dark'}>
                {policy.effectiveDate}
              </dd>
            </div>
          </dl>

          {policy.sections.map((section) => (
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
            {locale === 'ko'
              ? '대괄호로 표시된 항목은 사업자 정보와 위탁 현황이 확정된 뒤 입력합니다.'
              : 'Items in brackets will be filled in once business registration and outsourcing details are confirmed.'}
          </PlaceholderNote>
        </div>
      </Section>
    </>
  );
}
