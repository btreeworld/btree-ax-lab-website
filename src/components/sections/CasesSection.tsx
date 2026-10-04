import { getLocale } from 'next-intl/server';

import { CaseCard } from '@/components/cards/CaseCard';
import { PlaceholderNote } from '@/components/ui/Badge';
import { Section, SectionHeader } from '@/components/ui/Section';
import { cases, casesNotice } from '@/content/cases';
import { homeSectionCopy } from '@/content/home';
import type { Locale } from '@/i18n/locales';
import { stagger } from '@/lib/motion';

/** Section 08 — Cases (마스터 문서 7.8) */
export async function CasesSection() {
  const locale = (await getLocale()) as Locale;
  const copy = homeSectionCopy[locale].cases;

  return (
    <Section ariaLabelledby="cases-title" id="cases" tone="dark-alt">
      <SectionHeader description={copy.description} eyebrow={copy.eyebrow} id="cases-title" title={copy.title} />

      <div className="grid gap-5 lg:grid-cols-3">
        {cases[locale].map((caseStudy, index) => (
          <div className="reveal h-full" key={caseStudy.slug} style={stagger(index, 3)}>
            <CaseCard caseStudy={caseStudy} compact />
          </div>
        ))}
      </div>

      <div className="mt-8">
        <PlaceholderNote>{casesNotice[locale]}</PlaceholderNote>
      </div>
    </Section>
  );
}
