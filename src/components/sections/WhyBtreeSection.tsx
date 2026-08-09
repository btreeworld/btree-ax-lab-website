import { getLocale } from 'next-intl/server';

import { Icon } from '@/components/ui/Icon';
import { Section, SectionHeader } from '@/components/ui/Section';
import { differentiators, homeSectionCopy } from '@/content/home';
import type { Locale } from '@/i18n/locales';

/** Section 06 — Why BTREE (마스터 문서 7.6) */
export async function WhyBtreeSection() {
  const locale = (await getLocale()) as Locale;
  const copy = homeSectionCopy[locale].why;

  return (
    <Section ariaLabelledby="why-title" id="why" tone="light">
      <SectionHeader description={copy.description} eyebrow={copy.eyebrow} id="why-title" title={copy.title} tone="light" />

      <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-3">
        {differentiators[locale].map((item, index) => (
          <li className="flex gap-4" key={item.title}>
            <span
              aria-hidden="true"
              className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-deep"
            >
              <Icon className="h-5 w-5" name="check" />
            </span>
            <div>
              <h3 className="text-h4 text-ink-primary-light">
                <span className="mr-2 font-display text-small text-accent-deep">{String(index + 1).padStart(2, '0')}</span>
                {item.title}
              </h3>
              <p className="mt-2 text-body text-ink-secondary-light">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
