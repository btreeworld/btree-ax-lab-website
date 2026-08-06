import type { Metadata } from 'next';

import { JsonLd } from '@/components/layout/JsonLd';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { PageHero } from '@/components/sections/PageHero';
import { RepresentativePhoto } from '@/components/sections/RepresentativeSection';
import { Accordion } from '@/components/ui/Accordion';
import { Badge, PlaceholderNote } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Container, Section, SectionHeader } from '@/components/ui/Section';
import { businessRecords, businessRecordNotice, featuredBusinessRecords } from '@/content/business-records';
import { consultingRecords, consultingSummary } from '@/content/consulting-records';
import {
  lectureRecords,
  lectureSummary,
  mediaConvergenceIntro,
  mediaConvergenceRecords,
} from '@/content/lecture-records';
import {
  additionalRndDisclosurePolicy,
  nationalRndRecords,
  rndDetailPendingLabel,
  rndSummary,
  rndSummaryNote,
} from '@/content/national-rnd';
import { representative } from '@/content/representative-profile';
import { researchRecords, researchSummary } from '@/content/research-records';
import { cta } from '@/content/site';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '백성은 대표 | 국가 R&D·AI·디지털트윈 수행이력',
  description:
    '영상처리·인공지능 연구에서 시작해 지능형 영상보안, 스마트시티, AIoT, 디지털트윈, 스마트팜과 바이오 로봇까지 확장해 온 수행 이력을 공개 가능한 범위에서 소개합니다.',
  path: '/track-record',
});

const breadcrumb = [
  { name: '홈', path: '/' },
  { name: '대표 및 수행이력', path: '/track-record' },
];

/** 정보 탭 — JavaScript 없이도 이동 가능하도록 앵커 링크로 구성한다 (마스터 문서 12.1) */
const sectionNav = [
  { id: 'profile', label: '대표 프로필' },
  { id: 'national-rnd', label: '국가 R&D' },
  { id: 'projects', label: '주요 프로젝트' },
  { id: 'research', label: '연구개발' },
  { id: 'consulting', label: '기술자문' },
  { id: 'lectures', label: '교육·강의' },
];

export default function TrackRecordPage() {
  return (
    <>
      <PageHero
        breadcrumb={breadcrumb}
        description="영상처리·인공지능 연구를 시작으로 지능형 영상보안, 스마트시티, AIoT, 디지털트윈, 스마트팜과 바이오 로봇 분야까지 확장해 온 백성은 대표의 수행 이력을 공개 가능한 범위에서 소개합니다."
        eyebrow="REPRESENTATIVE · NATIONAL R&D · PROJECT TRACK RECORD"
        title={['연구에서 현장 구축까지', '직접 연결해 온 기술 이력']}
      >
        <Button
          event="cta_project_consulting_click"
          eventPayload={{ section: 'track-record-hero' }}
          href={cta.secondary.href}
        >
          {cta.secondary.label}
        </Button>
      </PageHero>

      {/* 섹션 내비게이션 */}
      <div className="sticky top-16 z-40 border-y border-line-dark bg-bg-primary/95 backdrop-blur-md lg:top-[76px]">
        <Container>
          <nav aria-label="수행이력 섹션">
            <ul className="flex gap-1 overflow-x-auto py-2">
              {sectionNav.map((item) => (
                <li key={item.id}>
                  <a
                    className="inline-flex min-h-[44px] items-center whitespace-nowrap rounded-button px-4 text-small font-medium text-ink-secondary-dark transition-colors hover:bg-white/5 hover:text-accent"
                    href={`#${item.id}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>

      {/* 대표 프로필 */}
      <Section ariaLabelledby="profile-title" id="profile" tone="dark">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <RepresentativePhoto />
          </div>

          <div className="lg:col-span-8">
            <SectionHeader
              eyebrow="PROFILE"
              id="profile-title"
              title={`${representative.name} | ${representative.title}`}
            />
            <p className="text-[15px] font-semibold text-accent">{representative.role}</p>
            <p className="mt-4 text-body-l text-ink-secondary-dark">{representative.detailIntro}</p>

            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line-dark bg-white/5 lg:grid-cols-4">
              {representative.trustMetrics.map((metric) => (
                <div className="bg-bg-primary px-4 py-5" key={metric.label}>
                  <dt className="sr-only">{metric.label}</dt>
                  <dd>
                    <span className="block font-display text-h3 text-accent">{metric.value}</span>
                    <span className="mt-2 block text-[13px] leading-snug text-ink-secondary-dark">
                      {metric.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* 학력 · 경력 */}
        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="text-h4 text-ink-primary-dark">학력</h3>
            <ul className="mt-5 flex flex-col gap-4">
              {representative.education.map((item) => (
                <li className="border-b border-line-dark pb-4" key={`${item.institution}-${item.period}`}>
                  <p className="text-small text-ink-secondary-dark/70">{item.period}</p>
                  <p className="mt-1 text-body text-ink-primary-dark">
                    {item.institution} · {item.major}
                  </p>
                  <p className="mt-1 text-small text-ink-secondary-dark">
                    {item.status}
                    {item.statusNote ? (
                      <span className="ml-2 text-state-warning">({item.statusNote})</span>
                    ) : null}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-h4 text-ink-primary-dark">주요 경력</h3>
            <ul className="mt-5 flex flex-col gap-4">
              {representative.career.map((item) => (
                <li className="border-b border-line-dark pb-4" key={`${item.organization}-${item.period}`}>
                  <p className="text-small text-ink-secondary-dark/70">{item.period}</p>
                  <p className="mt-1 text-body text-ink-primary-dark">
                    {item.organization} · {item.position}
                  </p>
                  <p className="mt-1 text-small text-ink-secondary-dark">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 핵심 기술분야 */}
        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="text-h4 text-ink-primary-dark">핵심 기술분야 — IT·AX</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {representative.coreSkills.it.map((skill) => (
                <li key={skill}>
                  <Badge tone="neutral">{skill}</Badge>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-h4 text-ink-primary-dark">핵심 기술분야 — 콘텐츠·시각화</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {representative.coreSkills.content.map((skill) => (
                <li key={skill}>
                  <Badge tone="neutral">{skill}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 국가 R&D */}
      <Section ariaLabelledby="rnd-title" id="national-rnd" tone="dark-alt">
        <SectionHeader
          eyebrow="NATIONAL R&D"
          id="rnd-title"
          title="국가 R&D 참여이력"
          description={`${rndSummary.source} (발급일 ${rndSummary.issuedAt}) 기준입니다.`}
        />

        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line-dark bg-white/5 lg:grid-cols-4">
          {[
            { value: `${rndSummary.annualParticipationRecords}건`, label: '참여과제 기록(연차별)' },
            { value: `${rndSummary.principalInvestigatorRecords}건`, label: '연구책임자 기록' },
            { value: `${rndSummary.researcherRecords}건`, label: '참여연구원 기록' },
            { value: `${rndSummary.uniqueProgramsDisplayed}개`, label: '대표 프로그램(그룹화)' },
          ].map((metric) => (
            <div className="bg-bg-secondary px-4 py-5" key={metric.label}>
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <span className="block font-display text-h3 text-accent">{metric.value}</span>
                <span className="mt-2 block text-[13px] leading-snug text-ink-secondary-dark">
                  {metric.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-4">
          <PlaceholderNote>{rndSummaryNote}</PlaceholderNote>
        </div>

        <ul className="mt-10 flex flex-col gap-5">
          {nationalRndRecords.map((record) => (
            <li
              className="rounded-card border border-line-dark bg-bg-elevated/50 p-6 md:p-7"
              key={record.slug}
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={record.officialRole === '연구책임자' ? 'accent' : 'neutral'}>
                  {record.officialRole}
                </Badge>
                <Badge tone="neutral">{record.period}</Badge>
                <Badge tone="neutral">NTIS 연차 기록 {record.annualRecords}건</Badge>
              </div>

              <h3 className="mt-4 text-h4 text-ink-primary-dark">{record.projectName}</h3>
              <p className="mt-3 text-body text-ink-secondary-dark">{record.description}</p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {record.field.map((field) => (
                  <li
                    className="rounded-badge border border-line-dark px-3 py-1 text-[13px] text-ink-secondary-dark"
                    key={field}
                  >
                    {field}
                  </li>
                ))}
              </ul>

              {record.responsibilities.length === 0 && record.outputs.length === 0 ? (
                <p className="mt-4 text-small text-state-warning">{rndDetailPendingLabel}</p>
              ) : null}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <PlaceholderNote>{additionalRndDisclosurePolicy}</PlaceholderNote>
        </div>
      </Section>

      {/* 주요 프로젝트 */}
      <Section ariaLabelledby="projects-title" id="projects" tone="dark">
        <SectionHeader
          eyebrow="PROJECTS"
          id="projects-title"
          title="주요 IT 프로젝트 및 사업이력"
          description="대표 프로젝트를 먼저 표시하고, 전체 이력은 아래 타임라인에서 확인할 수 있습니다."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredBusinessRecords.map((record) => (
            <article
              className="flex h-full flex-col rounded-card border border-line-dark bg-bg-elevated/50 p-6"
              key={`${record.year}-${record.title}`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-display text-h4 text-accent">{record.year}</span>
                {record.tags.map((tag) => (
                  <Badge key={tag} tone="neutral">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h3 className="mt-3 text-h4 text-ink-primary-dark">{record.title}</h3>
              {record.role ? (
                <p className="mt-2 text-small text-accent">{record.role}</p>
              ) : null}
              {record.description ? (
                <p className="mt-3 text-body text-ink-secondary-dark">{record.description}</p>
              ) : null}
              {record.field ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {record.field.map((field) => (
                    <li
                      className="rounded-badge border border-line-dark px-3 py-1 text-[13px] text-ink-secondary-dark"
                      key={field}
                    >
                      {field}
                    </li>
                  ))}
                </ul>
              ) : null}
              {record.note ? (
                <p className="mt-auto pt-4 text-[13px] text-state-warning">※ {record.note}</p>
              ) : null}
            </article>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-h4 text-ink-primary-dark">전체 타임라인</h3>
          <ol className="mt-6 border-t border-line-dark">
            {businessRecords.map((record) => (
              <li
                className="flex flex-col gap-1 border-b border-line-dark py-4 sm:flex-row sm:items-baseline sm:gap-6"
                key={`${record.year}-${record.title}-timeline`}
              >
                <span className="w-16 shrink-0 font-display text-small font-bold text-accent">
                  {record.year}
                </span>
                <span className="flex-1 text-body text-ink-primary-dark">{record.title}</span>
                <span className="flex shrink-0 flex-wrap gap-1.5">
                  {record.tags.map((tag) => (
                    <Badge key={tag} tone="neutral">
                      {tag}
                    </Badge>
                  ))}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6">
          <PlaceholderNote>{businessRecordNotice}</PlaceholderNote>
        </div>
      </Section>

      {/* 연구개발 */}
      <Section ariaLabelledby="research-title" id="research" tone="dark-alt">
        <SectionHeader
          description={researchSummary}
          eyebrow="RESEARCH"
          id="research-title"
          title="연구 수행 이력"
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="text-h4 text-ink-primary-dark">핵심 연구 — 현재 사업과 직접 연결</h3>
            <ul className="mt-5 border-t border-line-dark">
              {researchRecords
                .filter((record) => record.group === 'core')
                .map((record) => (
                  <li className="border-b border-line-dark py-4" key={`${record.year}-${record.topic}`}>
                    <p className="font-display text-small font-bold text-accent">{record.year}</p>
                    <p className="mt-1 text-body text-ink-primary-dark">{record.topic}</p>
                    <p className="mt-1 text-small text-ink-secondary-dark">{record.detail}</p>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h3 className="text-h4 text-ink-primary-dark">기초 연구 — 기술 기반</h3>
            <ul className="mt-5 border-t border-line-dark">
              {researchRecords
                .filter((record) => record.group === 'foundation')
                .map((record) => (
                  <li className="border-b border-line-dark py-4" key={`${record.year}-${record.topic}`}>
                    <p className="font-display text-small font-bold text-ink-secondary-dark">
                      {record.year}
                    </p>
                    <p className="mt-1 text-body text-ink-primary-dark">{record.topic}</p>
                    <p className="mt-1 text-small text-ink-secondary-dark">{record.detail}</p>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* 기술 진화 타임라인 — 마스터 문서 12.10 */}
        <div className="mt-14">
          <h3 className="text-h4 text-ink-primary-dark">기술 진화 타임라인</h3>
          <ol className="mt-6 grid gap-4 md:grid-cols-5">
            {representative.evolutionTimeline.map((item) => (
              <li
                className="rounded-card border border-line-dark bg-bg-elevated/50 p-5"
                key={item.period}
              >
                <p className="font-display text-small font-bold text-accent">{item.period}</p>
                <p className="mt-3 text-small text-ink-secondary-dark">{item.summary}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 border-l-2 border-accent pl-5 text-body-l text-ink-primary-dark">
            {representative.evolutionClosing.map((line) => (
              <span className="block" key={line}>
                {line}
              </span>
            ))}
          </p>
        </div>
      </Section>

      {/* 기술자문 */}
      <Section ariaLabelledby="consulting-title" id="consulting" tone="dark">
        <SectionHeader
          description={consultingSummary}
          eyebrow="ADVISORY"
          id="consulting-title"
          title="기술자문 이력"
        />

        <ul className="border-t border-line-dark">
          {consultingRecords.map((record) => (
            <li
              className="flex flex-col gap-1 border-b border-line-dark py-4 sm:flex-row sm:items-baseline sm:gap-6"
              key={`${record.period}-${record.field}`}
            >
              <span className="w-32 shrink-0 font-display text-small font-bold text-accent">
                {record.period}
              </span>
              <span className="w-48 shrink-0 text-body text-ink-primary-dark">{record.field}</span>
              <span className="flex-1 text-body text-ink-secondary-dark">
                {record.detail}
                {record.note ? (
                  <span className="ml-2 text-[13px] text-state-warning">({record.note})</span>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 교육·강의 */}
      <Section ariaLabelledby="lectures-title" id="lectures" tone="dark-alt">
        <SectionHeader
          description={lectureSummary}
          eyebrow="LECTURES"
          id="lectures-title"
          title="강의·교육 이력"
        />

        <ul className="border-t border-line-dark">
          {lectureRecords.map((record) => (
            <li
              className="flex flex-col gap-1 border-b border-line-dark py-4 sm:flex-row sm:items-baseline sm:gap-6"
              key={`${record.year}-${record.course}`}
            >
              <span
                className={`w-40 shrink-0 font-display text-small font-bold ${
                  record.featured ? 'text-accent' : 'text-ink-secondary-dark'
                }`}
              >
                {record.year}
              </span>
              <span className="flex-1 text-body text-ink-primary-dark">{record.course}</span>
              <span className="shrink-0 text-small text-ink-secondary-dark">{record.organization}</span>
            </li>
          ))}
        </ul>

        {/* 콘텐츠 융합·시각화 이력 — 보조 아코디언 (마스터 문서 12.9) */}
        <div className="mt-12 border-t border-line-dark">
          <Accordion summary="콘텐츠 융합 및 시각화 이력">
            <p className="mb-4">{mediaConvergenceIntro}</p>
            <ul className="flex flex-col gap-2">
              {mediaConvergenceRecords.map((record) => (
                <li className="flex gap-4" key={record.title}>
                  <span className="w-16 shrink-0 font-display text-small font-bold text-ink-secondary-dark">
                    {record.year}
                  </span>
                  <span>{record.title}</span>
                </li>
              ))}
            </ul>
          </Accordion>
        </div>
      </Section>

      <FinalCtaSection section="track-record-final-cta" />

      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
    </>
  );
}
