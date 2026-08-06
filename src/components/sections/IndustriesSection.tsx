import { IndustryCard } from '@/components/cards/IndustryCard';
import { Section, SectionHeader } from '@/components/ui/Section';
import { industries } from '@/content/industries';

/** Section 05 — Industries (마스터 문서 7.5) */
export function IndustriesSection() {
  return (
    <Section ariaLabelledby="industries-title" id="industries" tone="dark-alt">
      <SectionHeader
        description="같은 기술이라도 현장의 운영방식, 기존 설비, 인력 구조에 따라 필요한 구성이 달라집니다."
        eyebrow="INDUSTRIES"
        id="industries-title"
        title="기술이 아니라 현장의 운영방식에 맞춥니다"
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {industries.map((industry) => (
          <IndustryCard industry={industry} key={industry.slug} />
        ))}
      </div>
    </Section>
  );
}
