import { getLocale } from 'next-intl/server';

import { ArchitectureDiagram } from '@/components/diagrams/ArchitectureDiagram';
import { Section, SectionHeader } from '@/components/ui/Section';
import { architectureSection } from '@/content/home';
import type { Locale } from '@/i18n/locales';

/** Section 07 — Architecture Visual (마스터 문서 7.7) */
export async function ArchitectureSection() {
  const locale = (await getLocale()) as Locale;
  const copy = architectureSection[locale];

  return (
    <Section ariaLabelledby="architecture-title" id="architecture" tone="dark">
      <SectionHeader
        description={copy.description.map((line) => (
          <span className="block" key={line}>
            {line}
          </span>
        ))}
        eyebrow="ARCHITECTURE"
        id="architecture-title"
        title={copy.title}
      />

      <ArchitectureDiagram />
    </Section>
  );
}
