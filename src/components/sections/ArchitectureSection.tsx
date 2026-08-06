import { ArchitectureDiagram } from '@/components/diagrams/ArchitectureDiagram';
import { Section, SectionHeader } from '@/components/ui/Section';
import { architectureSection } from '@/content/home';

/** Section 07 — Architecture Visual (마스터 문서 7.7) */
export function ArchitectureSection() {
  return (
    <Section ariaLabelledby="architecture-title" id="architecture" tone="dark">
      <SectionHeader
        description={architectureSection.description.map((line) => (
          <span className="block" key={line}>
            {line}
          </span>
        ))}
        eyebrow="ARCHITECTURE"
        id="architecture-title"
        title={architectureSection.title}
      />

      <ArchitectureDiagram />
    </Section>
  );
}
