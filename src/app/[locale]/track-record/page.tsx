import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { JsonLd } from '@/components/layout/JsonLd';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { PageHero } from '@/components/sections/PageHero';
import { RepresentativePhoto } from '@/components/sections/RepresentativeSection';
import { VisualNarrative } from '@/components/sections/VisualNarrative';
import { Accordion } from '@/components/ui/Accordion';
import { Badge, PlaceholderNote } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { MetricValue } from '@/components/ui/MetricValue';
import { Container, Section, SectionHeader } from '@/components/ui/Section';
import { businessRecordNotice, businessRecords, businessTagLabel, getFeaturedBusinessRecords } from '@/content/business-records';
import { consultingRecords, consultingSummary } from '@/content/consulting-records';
import { lectureRecords, lectureSummary, mediaConvergenceIntro, mediaConvergenceRecords } from '@/content/lecture-records';
import {
  additionalRndDisclosurePolicy,
  nationalRndRecords,
  officialRoleLabel,
  rndDetailPendingLabel,
  rndSummary,
} from '@/content/national-rnd';
import { representative, trackRecordPageCopy } from '@/content/representative-profile';
import { researchRecords, researchSummary } from '@/content/research-records';
import { cta, navLabel } from '@/content/site';
import { locales, type Locale } from '@/i18n/locales';
import { stagger } from '@/lib/motion';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const copy = trackRecordPageCopy[l];
  return buildMetadata({
    locale: l,
    title: l === 'ko' ? '백성은 대표 | 국가 R&D·AI·디지털트윈 수행이력' : 'Baek Seongeun | National R&D, AI & Digital Twin Track Record',
    description: copy.heroDescription,
    path: '/track-record',
  });
}

export default async function TrackRecordPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(locales, rawLocale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Common' });
  const copy = trackRecordPageCopy[locale];
  const rep = representative[locale];
  const ctaContent = cta[locale];
  const rndRecords = nationalRndRecords[locale];
  const featuredBusiness = getFeaturedBusinessRecords(locale);
  const allBusiness = businessRecords[locale];
  const research = researchRecords[locale];
  const consulting = consultingRecords[locale];
  const lectures = lectureRecords[locale];
  const mediaRecords = mediaConvergenceRecords[locale];
  const tags = businessTagLabel[locale];
  const roleLabel = officialRoleLabel[locale];

  const breadcrumb = [
    { name: t('home'), path: '/' },
    { name: navLabel(locale, '/track-record'), path: '/track-record' },
  ];

  const sectionNav = [
    { id: 'profile', label: copy.sectionNav.profile },
    { id: 'national-rnd', label: copy.sectionNav.nationalRnd },
    { id: 'projects', label: copy.sectionNav.projects },
    { id: 'research', label: copy.sectionNav.research },
    { id: 'consulting', label: copy.sectionNav.consulting },
    { id: 'lectures', label: copy.sectionNav.lectures },
  ];

  return (
    <>
      <PageHero breadcrumb={breadcrumb} description={copy.heroDescription} eyebrow={copy.heroEyebrow} progress title={copy.heroTitle}>
        <Button event="cta_project_consulting_click" eventPayload={{ section: 'track-record-hero' }} href={ctaContent.secondary.href}>
          {ctaContent.secondary.label}
        </Button>
      </PageHero>

      <VisualNarrative
        description={locale === 'ko' ? '연구·사업·컨설팅 이력은 서로 분리된 목록이 아니라, 현장 데이터를 이해하고 시스템으로 구현해 운영까지 연결해 온 하나의 축적 과정입니다.' : 'Research, business, and consulting records form one accumulated path from understanding field data to implementation and operation.'}
        diagramVariant="timeline"
        eyebrow="EXPERIENCE MAP"
        image="/images/visuals/track-record-software-evolution-v3.webp"
        imageAlt={locale === 'ko' ? '지능형 CCTV, 스마트시티 시각화, AIoT 관제, 농촌 3D 디지털트윈, 로봇 비전의 기술 발전 과정을 검토하는 팀' : 'A team reviewing the evolution from intelligent CCTV and smart-city visualization to AIoT control, rural 3D digital twins, and robotic vision'}
        points={locale === 'ko' ? [
          { title: '국가 R&D', description: 'AI·디지털트윈·콘텐츠 기술을 연구 과제로 검증했습니다.', icon: 'flask' },
          { title: '산업 프로젝트', description: '제조·안전·농업 현장의 문제를 시스템으로 구현했습니다.', icon: 'briefcase' },
          { title: '연구와 지식', description: '논문·저서·강의로 기술을 구조화하고 전달했습니다.', icon: 'graduation' },
          { title: '실행 책임', description: '기획부터 PoC, 운영 협의까지 연결해 왔습니다.', icon: 'check' },
        ] : [
          { title: 'National R&D', description: 'Validated AI, digital twin, and content technologies through research.', icon: 'flask' },
          { title: 'Industry projects', description: 'Implemented systems for manufacturing, safety, and agriculture.', icon: 'briefcase' },
          { title: 'Research knowledge', description: 'Structured and shared knowledge through papers, books, and lectures.', icon: 'graduation' },
          { title: 'Delivery ownership', description: 'Connected planning, PoC, and operational coordination.', icon: 'check' },
        ]}
        title={locale === 'ko' ? '연구에서 현장 운영까지 이어진 경험의 지도' : 'An experience map from research to field operations'}
      />

      {/* 섹션 내비게이션 */}
      <div className="sticky top-16 z-40 border-y border-line-dark bg-bg-primary/95 backdrop-blur-md lg:top-[76px]">
        <Container>
          <nav aria-label={copy.heroEyebrow}>
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
            <SectionHeader eyebrow="PROFILE" id="profile-title" title={`${rep.name} | ${rep.title}`} />
            <p className="text-[15px] font-semibold text-accent">{rep.role}</p>
            <p className="mt-4 text-body-l text-ink-secondary-dark">{rep.detailIntro}</p>

            <dl className="mt-8 grid grid-cols-2 gap-px overflow-clip rounded-card border border-line-dark bg-white/5 lg:grid-cols-4">
              {rep.trustMetrics.map((metric) => (
                <div className="bg-bg-primary px-4 py-5" key={metric.label}>
                  <dt className="sr-only">{metric.label}</dt>
                  <dd>
                    <MetricValue className="block font-display text-h3 text-accent" countTo={metric.countTo} value={metric.value} />
                    <span className="mt-2 block text-[13px] leading-snug text-ink-secondary-dark">{metric.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* 학력 · 경력 */}
        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="flex items-center gap-2.5 text-h4 text-ink-primary-dark">
              <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-button bg-accent-soft text-accent">
                <Icon className="h-4 w-4" name="graduation" />
              </span>
              {copy.educationLabel}
            </h3>
            <ul className="mt-5 flex flex-col gap-4">
              {rep.education.map((item) => (
                <li className="border-b border-line-dark pb-4" key={`${item.institution}-${item.period}`}>
                  <p className="text-small text-ink-secondary-dark/70">{item.period}</p>
                  <p className="mt-1 text-body text-ink-primary-dark">
                    {item.institution} · {item.major}
                  </p>
                  <p className="mt-1 text-small text-ink-secondary-dark">
                    {item.status}
                    {item.statusNote ? <span className="ml-2 text-state-warning">({item.statusNote})</span> : null}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="flex items-center gap-2.5 text-h4 text-ink-primary-dark">
              <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-button bg-accent-soft text-accent">
                <Icon className="h-4 w-4" name="briefcase" />
              </span>
              {copy.careerLabel}
            </h3>
            <ul className="mt-5 flex flex-col gap-4">
              {rep.career.map((item) => (
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
            <h3 className="text-h4 text-ink-primary-dark">{copy.coreSkillsIt}</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {rep.coreSkills.it.map((skill) => (
                <li key={skill}>
                  <Badge tone="neutral">{skill}</Badge>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-h4 text-ink-primary-dark">{copy.coreSkillsContent}</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {rep.coreSkills.content.map((skill) => (
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
          description={copy.nationalRndSourceLine(rndSummary.source[locale], rndSummary.issuedAt)}
          eyebrow={copy.nationalRndEyebrow}
          id="rnd-title"
          title={copy.nationalRndTitle}
        />

        <dl className="grid grid-cols-2 gap-px overflow-clip rounded-card border border-line-dark bg-white/5 lg:grid-cols-4">
          {[
            // count-up은 NTIS 원자료 수치(9·2·7)에만 — 프로그램 수(5)는 자체 묶음이라 정적 표시.
            { value: `${rndSummary.annualParticipationRecords}`, label: copy.nationalRndMetrics.annual, countTo: rndSummary.annualParticipationRecords },
            { value: `${rndSummary.principalInvestigatorRecords}`, label: copy.nationalRndMetrics.pi, countTo: rndSummary.principalInvestigatorRecords },
            { value: `${rndSummary.researcherRecords}`, label: copy.nationalRndMetrics.researcher, countTo: rndSummary.researcherRecords },
            { value: `${rndSummary.uniqueProgramsDisplayed}`, label: copy.nationalRndMetrics.programs, countTo: undefined },
          ].map((metric) => (
            <div className="bg-bg-secondary px-4 py-5" key={metric.label}>
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <MetricValue className="block font-display text-h3 text-accent" countTo={metric.countTo} value={metric.value} />
                <span className="mt-2 block text-[13px] leading-snug text-ink-secondary-dark">{metric.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-10 flex flex-col gap-5">
          {rndRecords.map((record) => (
            <li className="rounded-card border border-line-dark bg-bg-elevated/50 p-6 md:p-7" key={record.slug}>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={record.officialRole === '연구책임자' ? 'accent' : 'neutral'}>{roleLabel[record.officialRole]}</Badge>
                <Badge tone="neutral">{record.period}</Badge>
              </div>

              <h3 className="mt-4 text-h4 text-ink-primary-dark">{record.projectName}</h3>
              <p className="mt-3 text-body text-ink-secondary-dark">{record.description}</p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {record.field.map((field) => (
                  <li className="rounded-badge border border-line-dark px-3 py-1 text-[13px] text-ink-secondary-dark" key={field}>
                    {field}
                  </li>
                ))}
              </ul>

              {record.responsibilities.length === 0 && record.outputs.length === 0 ? (
                <p className="mt-4 text-small text-state-warning">{rndDetailPendingLabel[locale]}</p>
              ) : null}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <PlaceholderNote>{additionalRndDisclosurePolicy[locale]}</PlaceholderNote>
        </div>
      </Section>

      {/* 주요 프로젝트 */}
      <Section ariaLabelledby="projects-title" id="projects" tone="dark">
        <SectionHeader description={copy.projectsDescription} eyebrow={copy.projectsEyebrow} id="projects-title" title={copy.projectsTitle} />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredBusiness.map((record, index) => (
            <article
              className="reveal card-hover card-hover--static flex h-full flex-col rounded-card border border-line-dark bg-bg-elevated/50 p-6"
              key={`${record.year}-${record.title}`}
              style={stagger(index, 3)}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-display text-h4 text-accent">{record.year}</span>
                {record.tags.map((tag) => (
                  <Badge key={tag} tone="neutral">
                    {tags[tag]}
                  </Badge>
                ))}
              </div>
              <h3 className="mt-3 text-h4 text-ink-primary-dark">{record.title}</h3>
              {record.role ? <p className="mt-2 text-small text-accent">{record.role}</p> : null}
              {record.description ? <p className="mt-3 text-body text-ink-secondary-dark">{record.description}</p> : null}
              {record.field ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {record.field.map((field) => (
                    <li className="rounded-badge border border-line-dark px-3 py-1 text-[13px] text-ink-secondary-dark" key={field}>
                      {field}
                    </li>
                  ))}
                </ul>
              ) : null}
              {record.note ? <p className="mt-auto pt-4 text-[13px] text-state-warning">※ {record.note}</p> : null}
            </article>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-h4 text-ink-primary-dark">{copy.fullTimelineLabel}</h3>
          <ol className="mt-6 border-t border-line-dark">
            {allBusiness.map((record) => (
              <li className="flex flex-col gap-1 border-b border-line-dark py-4 sm:flex-row sm:items-baseline sm:gap-6" key={`${record.year}-${record.title}-timeline`}>
                <span className="w-16 shrink-0 font-display text-small font-bold text-accent">{record.year}</span>
                <span className="flex-1 text-body text-ink-primary-dark">{record.title}</span>
                <span className="flex shrink-0 flex-wrap gap-1.5">
                  {record.tags.map((tag) => (
                    <Badge key={tag} tone="neutral">
                      {tags[tag]}
                    </Badge>
                  ))}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6">
          <PlaceholderNote>{businessRecordNotice[locale]}</PlaceholderNote>
        </div>
      </Section>

      {/* 연구개발 */}
      <Section ariaLabelledby="research-title" id="research" tone="dark-alt">
        <SectionHeader description={researchSummary[locale]} eyebrow={copy.researchEyebrow} id="research-title" title={copy.researchTitle} />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="text-h4 text-ink-primary-dark">{copy.researchCoreLabel}</h3>
            <ul className="mt-5 border-t border-line-dark">
              {research
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
            <h3 className="text-h4 text-ink-primary-dark">{copy.researchFoundationLabel}</h3>
            <ul className="mt-5 border-t border-line-dark">
              {research
                .filter((record) => record.group === 'foundation')
                .map((record) => (
                  <li className="border-b border-line-dark py-4" key={`${record.year}-${record.topic}`}>
                    <p className="font-display text-small font-bold text-ink-secondary-dark">{record.year}</p>
                    <p className="mt-1 text-body text-ink-primary-dark">{record.topic}</p>
                    <p className="mt-1 text-small text-ink-secondary-dark">{record.detail}</p>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* 기술 진화 타임라인 — 마스터 문서 12.10 */}
        <div className="mt-14">
          <h3 className="text-h4 text-ink-primary-dark">{copy.evolutionTimelineLabel}</h3>
          <ol className="connector-x relative mt-9 grid gap-4 md:grid-cols-5 md:before:absolute md:before:inset-x-0 md:before:-top-3 md:before:h-px md:before:bg-accent/40">
            {rep.evolutionTimeline.map((item, index) => (
              <li
                className="reveal relative rounded-card border border-line-dark bg-bg-elevated/50 p-5 md:before:absolute md:before:-top-[15px] md:before:left-5 md:before:h-[7px] md:before:w-[7px] md:before:rounded-full md:before:bg-accent"
                key={item.period}
                style={stagger(index, 5)}
              >
                <p className="font-display text-small font-bold text-accent">{item.period}</p>
                <p className="mt-3 text-small text-ink-secondary-dark">{item.summary}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 border-l-2 border-accent pl-5 text-body-l text-ink-primary-dark">
            {rep.evolutionClosing.map((line) => (
              <span className="block" key={line}>
                {line}
              </span>
            ))}
          </p>
        </div>
      </Section>

      {/* 기술자문 */}
      <Section ariaLabelledby="consulting-title" id="consulting" tone="dark">
        <SectionHeader description={consultingSummary[locale]} eyebrow={copy.consultingEyebrow} id="consulting-title" title={copy.consultingTitle} />

        <ul className="border-t border-line-dark">
          {consulting.map((record) => (
            <li className="flex flex-col gap-1 border-b border-line-dark py-4 sm:flex-row sm:items-baseline sm:gap-6" key={`${record.period}-${record.field}`}>
              <span className="w-32 shrink-0 font-display text-small font-bold text-accent">{record.period}</span>
              <span className="w-48 shrink-0 text-body text-ink-primary-dark">{record.field}</span>
              <span className="flex-1 text-body text-ink-secondary-dark">
                {record.detail}
                {record.note ? <span className="ml-2 text-[13px] text-state-warning">({record.note})</span> : null}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 교육·강의 */}
      <Section ariaLabelledby="lectures-title" id="lectures" tone="dark-alt">
        <SectionHeader description={lectureSummary[locale]} eyebrow={copy.lecturesEyebrow} id="lectures-title" title={copy.lecturesTitle} />

        <ul className="border-t border-line-dark">
          {lectures.map((record) => (
            <li className="flex flex-col gap-1 border-b border-line-dark py-4 sm:flex-row sm:items-baseline sm:gap-6" key={`${record.year}-${record.course}`}>
              <span className={`w-40 shrink-0 font-display text-small font-bold ${record.featured ? 'text-accent' : 'text-ink-secondary-dark'}`}>{record.year}</span>
              <span className="flex-1 text-body text-ink-primary-dark">{record.course}</span>
              <span className="shrink-0 text-small text-ink-secondary-dark">{record.organization}</span>
            </li>
          ))}
        </ul>

        {/* 콘텐츠 융합·시각화 이력 — 보조 아코디언 (마스터 문서 12.9) */}
        <div className="mt-12 border-t border-line-dark">
          <Accordion summary={copy.mediaConvergenceAccordionLabel}>
            <p className="mb-4">{mediaConvergenceIntro[locale]}</p>
            <ul className="flex flex-col gap-2">
              {mediaRecords.map((record) => (
                <li className="flex gap-4" key={record.title}>
                  <span className="w-16 shrink-0 font-display text-small font-bold text-ink-secondary-dark">{record.year}</span>
                  <span>{record.title}</span>
                </li>
              ))}
            </ul>
          </Accordion>
        </div>
      </Section>

      <FinalCtaSection section="track-record-final-cta" />

      <JsonLd data={breadcrumbJsonLd(locale, breadcrumb)} />
    </>
  );
}
