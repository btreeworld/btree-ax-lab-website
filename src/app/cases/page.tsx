import type { Metadata } from 'next';

import { JsonLd } from '@/components/layout/JsonLd';
import { CaseCard } from '@/components/cards/CaseCard';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { PageHero } from '@/components/sections/PageHero';
import { Badge, PlaceholderNote } from '@/components/ui/Badge';
import { Section, SectionHeader } from '@/components/ui/Section';
import { caseStatusLabel, cases, casesNotice } from '@/content/cases';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '프로젝트 사례 · 대표 수행 분야',
  description:
    'Edge AI 산업안전 관제, 스마트팜 디지털트윈, 정부 R&D 기술기획 등 문제 정의부터 검증까지의 수행 과정을 공개 가능한 범위에서 소개합니다.',
  path: '/cases',
});

const breadcrumb = [
  { name: '홈', path: '/' },
  { name: '프로젝트 사례', path: '/cases' },
];

export default function CasesPage() {
  return (
    <>
      <PageHero
        breadcrumb={breadcrumb}
        description="완성된 제품이 아니라, 문제를 어떻게 구조화하고 검증했는지를 기준으로 정리했습니다."
        eyebrow="PROJECT EXPERIENCE"
        title="기술이 아니라 문제 해결 과정으로 보여드립니다"
      />

      <Section ariaLabelledby="case-list-title" tone="dark">
        <SectionHeader
          description="상태 배지로 실제 구축, PoC, 설계, 연구개발, 적용 예시를 구분해 표시합니다."
          id="case-list-title"
          title="대표 수행 분야"
        />

        <ul aria-label="사례 상태 구분" className="mb-8 flex flex-wrap gap-2">
          {Object.values(caseStatusLabel).map((label) => (
            <li key={label}>
              <Badge tone="neutral">{label}</Badge>
            </li>
          ))}
        </ul>

        <div className="grid gap-5 lg:grid-cols-3">
          {cases.map((caseStudy) => (
            <CaseCard caseStudy={caseStudy} key={caseStudy.slug} />
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-2">
          <PlaceholderNote>{casesNotice}</PlaceholderNote>
          <PlaceholderNote>
            고객명, 로고, 성능 수치는 고객 승인과 증빙이 확보된 경우에만 공개합니다. 국방·보안 관련
            프로젝트는 비보안 개요만 표시합니다.
          </PlaceholderNote>
        </div>
      </Section>

      <FinalCtaSection section="cases-final-cta" />

      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
    </>
  );
}
