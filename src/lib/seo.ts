import type { Metadata } from 'next';

import { faqs } from '@/content/faq';
import { services } from '@/content/services';
import { legalInfo, site } from '@/content/site';

/** 18.2 / 18.3 — 페이지 metadata 생성기 */
export function buildMetadata({
  title,
  description,
  path = '/',
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const url = new URL(path, site.url).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: site.brand,
      locale: site.locale,
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
 * 허위 rating, review, award, foundingDate 는 추가하지 않는다.
 */
export function organizationJsonLd() {
  const hasEmail = !legalInfo.email.value.startsWith('[');
  const hasPhone = !legalInfo.phone.value.startsWith('[');

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.legalName,
    alternateName: site.brand,
    legalName: site.legalName,
    url: site.url,
    description: site.brandRelation,
    slogan: site.sloganKo,
    ...(hasEmail || hasPhone
      ? {
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'sales',
            areaServed: 'KR',
            availableLanguage: ['ko'],
            ...(hasEmail ? { email: legalInfo.email.value } : {}),
            ...(hasPhone ? { telephone: legalInfo.phone.value } : {}),
          },
        }
      : {}),
  };
}

export function serviceJsonLd() {
  return services.map((service) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.summary,
    serviceType: service.name,
    provider: { '@type': 'Organization', name: site.legalName, url: site.url },
    areaServed: 'KR',
    url: new URL(`/services#${service.slug}`, site.url).toString(),
  }));
}

/** FAQPage 는 실제 페이지에 FAQ 가 보일 때만 사용한다. */
export function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, site.url).toString(),
    })),
  };
}
