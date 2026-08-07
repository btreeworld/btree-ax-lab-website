import { getLocale } from 'next-intl/server';

import { Section } from '@/components/ui/Section';
import { problemSection } from '@/content/home';
import type { Locale } from '@/i18n/locales';

/** Section 02 — Problem Statement (마스터 문서 7.2) */
export async function ProblemSection() {
  const locale = (await getLocale()) as Locale;
  const copy = problemSection[locale];

  return (
    <Section ariaLabelledby="problem-title" id="problem" tone="dark-alt">
      <h2 className="max-w-headline text-h2 text-ink-primary-dark" id="problem-title">
        <span className="block text-ink-secondary-dark">{copy.titleLines[0]}</span>
        <span className="block">{copy.titleLines[1]}</span>
      </h2>

      <ul className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2">
        {copy.cards.map((card, index) => (
          <li className="rounded-card border border-line-dark bg-bg-elevated/60 p-6 md:p-7" key={card.title}>
            <span aria-hidden="true" className="font-display text-small font-bold text-accent">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-3 text-h4 text-ink-primary-dark">{card.title}</h3>
            <p className="mt-3 text-body text-ink-secondary-dark">{card.description}</p>
          </li>
        ))}
      </ul>

      <p className="mt-10 border-l-2 border-accent pl-5 text-body-l text-ink-primary-dark md:mt-12">
        {copy.closing.map((line) => (
          <span className="block" key={line}>
            {line}
          </span>
        ))}
      </p>
    </Section>
  );
}
