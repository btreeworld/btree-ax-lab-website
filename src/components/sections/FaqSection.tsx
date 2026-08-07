import { getLocale } from 'next-intl/server';

import { Accordion } from '@/components/ui/Accordion';
import { Section, SectionHeader } from '@/components/ui/Section';
import { faqs } from '@/content/faq';
import { homeSectionCopy } from '@/content/home';
import type { Locale } from '@/i18n/locales';

/** Section 11 — FAQ (마스터 문서 7.11) */
export async function FaqSection() {
  const locale = (await getLocale()) as Locale;
  const copy = homeSectionCopy[locale].faq;

  return (
    <Section ariaLabelledby="faq-title" id="faq" tone="dark-alt">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <SectionHeader description={copy.description} eyebrow={copy.eyebrow} id="faq-title" title={copy.title} />
        </div>

        <div className="lg:col-span-8">
          <div className="border-t border-line-dark">
            {faqs[locale].map((faq, index) => (
              <Accordion defaultOpen={index === 0} event="faq_open" key={faq.question} summary={faq.question}>
                {faq.answer}
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
