import { CaseCard } from '@/components/cards/CaseCard';
import { PlaceholderNote } from '@/components/ui/Badge';
import { Section, SectionHeader } from '@/components/ui/Section';
import { cases, casesNotice } from '@/content/cases';

/** Section 08 — Cases (마스터 문서 7.8) */
export function CasesSection() {
  return (
    <Section ariaLabelledby="cases-title" id="cases" tone="dark-alt">
      <SectionHeader
        description="완성된 제품이 아니라, 문제를 어떻게 구조화하고 검증했는지를 기준으로 정리했습니다."
        eyebrow="PROJECT EXPERIENCE"
        id="cases-title"
        title="기술이 아니라 문제 해결 과정으로 보여드립니다"
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {cases.map((caseStudy) => (
          <CaseCard caseStudy={caseStudy} key={caseStudy.slug} />
        ))}
      </div>

      <div className="mt-8">
        <PlaceholderNote>{casesNotice}</PlaceholderNote>
      </div>
    </Section>
  );
}
