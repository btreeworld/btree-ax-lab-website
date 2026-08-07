import type { Metadata, Viewport } from 'next';
import { hasLocale } from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import '@/app/globals.css';

import { Analytics } from '@/components/layout/Analytics';
import { JsonLd } from '@/components/layout/JsonLd';
import { ScrollTracker } from '@/components/layout/ScrollTracker';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { site } from '@/content/site';
import { locales, type Locale } from '@/i18n/locales';
import { routing } from '@/i18n/routing';
import { organizationJsonLd } from '@/lib/seo';

const metadataCopy: Record<Locale, { title: string; description: string }> = {
  ko: {
    title: '산업 현장 AX·디지털트윈 설계 및 PoC | BTREE AX LAB',
    description:
      '제조·산업안전·스마트팜·시설 운영 현장을 진단하고 Edge AI, 센서 데이터와 디지털트윈을 연결한 시스템 설계와 PoC 실증을 제공합니다.',
  },
  en: {
    title: 'Industrial AX & Digital Twin Design + PoC | BTREE AX LAB',
    description:
      'We diagnose manufacturing, industrial safety, smart farm, and facility operations, then deliver system designs and PoC validation connecting Edge AI, sensor data, and digital twins.',
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (hasLocale(locales, rawLocale) ? rawLocale : routing.defaultLocale) as Locale;
  const { title, description } = metadataCopy[locale];

  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s | ${site.brand}` },
    description,
    applicationName: site.brand,
    keywords: [
      '산업 AX 컨설팅',
      '산업 AI 구축',
      '디지털트윈 설계',
      'Edge AI 구축',
      '산업안전 AI',
      'CCTV AI 관제',
      '스마트팜 디지털트윈',
      'AI PoC',
      '제조업 AI 도입',
      '정부과제 기술기획',
    ],
    authors: [{ name: site.legalName[locale] }],
    creator: site.legalName[locale],
    alternates: {
      canonical: locale === routing.defaultLocale ? '/' : `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, l === routing.defaultLocale ? '/' : `/${l}`])),
    },
    openGraph: {
      type: 'website',
      locale: site.locales[locale],
      siteName: site.brand,
      title,
      description,
      url: site.url,
    },
    // 스테이징에서는 SITE_NOINDEX=true 로 색인을 막는다 (마스터 문서 18.5).
    robots:
      process.env.SITE_NOINDEX === 'true' ? { index: false, follow: false } : { index: true, follow: true },
    icons: { icon: '/favicon.svg' },
    manifest: '/site.webmanifest',
  };
}

export const viewport: Viewport = {
  themeColor: '#07111F',
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(locales, rawLocale)) notFound();
  const locale = rawLocale as Locale;

  // 정적 렌더링 최적화 — next-intl 권장 패턴.
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Header' });

  return (
    <html lang={locale}>
      <body>
        {/* Skip to content — 마스터 문서 20장 */}
        <a
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-button focus:bg-accent focus:px-5 focus:py-3 focus:text-[15px] focus:font-semibold focus:text-[#062028]"
          href="#main"
        >
          {t('skipToContent')}
        </a>

        <NextIntlClientProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <ScrollTracker />
        </NextIntlClientProvider>

        <Analytics />
        <JsonLd data={organizationJsonLd(locale)} />
      </body>
    </html>
  );
}
