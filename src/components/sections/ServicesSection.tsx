import { getLocale } from 'next-intl/server';

import { ServiceCard } from '@/components/cards/ServiceCard';
import { Section, SectionHeader } from '@/components/ui/Section';
import { TextLink } from '@/components/ui/TextLink';
import { homeSectionCopy } from '@/content/home';
import { homeServiceSlugs, services } from '@/content/services';
import type { Locale } from '@/i18n/locales';
import { stagger } from '@/lib/motion';

/** Section 03 — Core Services (마스터 문서 7.3) */
export async function ServicesSection() {
  const locale = (await getLocale()) as Locale;
  const copy = homeSectionCopy[locale].services;
  const homeServices = homeServiceSlugs
    .map((slug) => services[locale].find((service) => service.slug === slug))
    .filter((service): service is (typeof services)[Locale][number] => Boolean(service));

  return (
    <Section ariaLabelledby="services-title" id="services" tone="light">
      <SectionHeader
        action={
          <TextLink href="/services" tone="light">
            {copy.comparisonLink}
          </TextLink>
        }
        description={copy.description}
        eyebrow={copy.eyebrow}
        id="services-title"
        title={copy.title}
        tone="light"
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {homeServices.map((service, index) => (
          <div className="reveal h-full" key={service.slug} style={stagger(index, 4)}>
            <ServiceCard service={service} tone="light" />
          </div>
        ))}
      </div>
    </Section>
  );
}
