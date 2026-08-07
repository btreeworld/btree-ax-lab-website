import { getLocale } from 'next-intl/server';

import { IndustryCard } from '@/components/cards/IndustryCard';
import { Section, SectionHeader } from '@/components/ui/Section';
import { homeSectionCopy } from '@/content/home';
import { industries } from '@/content/industries';
import type { Locale } from '@/i18n/locales';

/** Section 05 — Industries (마스터 문서 7.5) */
export async function IndustriesSection() {
  const locale = (await getLocale()) as Locale;
  const copy = homeSectionCopy[locale].industries;

  return (
    <Section ariaLabelledby="industries-title" id="industries" tone="dark-alt">
      <SectionHeader description={copy.description} eyebrow={copy.eyebrow} id="industries-title" title={copy.title} />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {industries[locale].map((industry) => (
          <IndustryCard industry={industry} key={industry.slug} />
        ))}
      </div>
    </Section>
  );
}
