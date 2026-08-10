import type { Metadata } from 'next';

import { faqs } from '@/content/faq';
import { services } from '@/content/services';
import { legalInfo, site } from '@/content/site';
import { locales, type Locale } from '@/i18n/locales';
import { routing } from '@/i18n/routing';

function localizedPath(path: string, locale: Locale): string {
  const clean = path === '/' ? '' : path;
  return locale === routing.defaultLocale ? path || '/' : `/${locale}${clean || ''}` || `/${locale}`;
}

/** 18.2 / 18.3 — 페이지 metadata 생성기 */
export function buildMetadata({
  locale,
  title,
  description,
  path = '/',
  noIndex = false,
}: {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const url = new URL(localizedPath(path, locale), site.url).toString();

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        locales.map((l) => [l, new URL(localizedPath(path, l), site.url).toString()]),
      ),
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: site.brand,
      locale: site.locales[locale],
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: site.brand }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}

/**
 * 18.4 Structured Data
 * 허위 rating, review, award, foundingDate는 추가하지 않는다.
 */
export function organizationJsonLd(locale: Locale) {
  const legal = legalInfo[locale];
  const hasEmail = !legal.email.value.startsWith('[');

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.legalName[locale],
    alternateName: site.brand,
    legalName: site.legalName[locale],
    url: site.url,
    description: site.brandRelation[locale],
    slogan: locale === 'ko' ? site.sloganKo : site.sloganEn,
    // 대표 전화는 노출하지 않기로 했으므로(legalInfo에 phone 필드 없음) telephone 필드도 넣지 않는다.
    ...(hasEmail
      ? {
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'sales',
            areaServed: 'KR',
            availableLanguage: locales,
            email: legal.email.value,
          },
        }
      : {}),
  };
}

export function serviceJsonLd(locale: Locale) {
  return services[locale].map((service) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.summary,
    serviceType: service.name,
    provider: { '@type': 'Organization', name: site.legalName[locale], url: site.url },
    areaServed: 'KR',
    url: new URL(`${localizedPath('/services', locale)}#${service.slug}`, site.url).toString(),
  }));
}

/** FAQPage는 실제 페이지에 FAQ가 보일 때만 사용한다. */
export function faqJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs[locale].map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function breadcrumbJsonLd(locale: Locale, items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(localizedPath(item.path, locale), site.url).toString(),
    })),
  };
}
