import type { Metadata } from 'next';

import { JsonLd } from '@/components/layout/JsonLd';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { PageHero } from '@/components/sections/PageHero';
import { RepresentativePhoto } from '@/components/sections/RepresentativeSection';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Section, SectionHeader } from '@/components/ui/Section';
import { about } from '@/content/about';
import { representative } from '@/content/representative-profile';
import { site } from '@/content/site';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '회사소개',
  description:
    'BTREE AX LAB은 주식회사 비트리가 운영하는 산업 현장 AX·Edge AI·디지털트윈 전문 브랜드입니다. 브랜드 관계와 일하는 원칙을 소개합니다.',
  path: '/about',
});

const breadcrumb = [
  { name: '홈', path: '/' },
  { name: '회사 소개', path: '/about' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb={breadcrumb}
        eyebrow="ABOUT"
        title={about.heroTitle}
      />

      {/* 법인과 브랜드의 관계 — 마스터 문서 2.1 / 11.0 */}
      <Section ariaLabelledby="brand-relation-title" tone="dark">
        <SectionHeader id="brand-relation-title" title="법인과 브랜드의 관계" />

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-card border border-line-dark bg-bg-elevated/50 p-6 md:p-7">
            <Badge tone="neutral">법적 회사명</Badge>
            <p className="mt-4 text-h4 text-ink-primary-dark">
              {site.legalName} / {site.legalNameEn}
            </p>
            <p className="mt-3 text-body text-ink-secondary-dark">
              계약, 견적, 개인정보처리 등 법적 주체입니다.
            </p>
          </div>
          <div className="rounded-card border border-accent/30 bg-accent-soft p-6 md:p-7">
            <Badge tone="accent">전문 서비스 브랜드</Badge>
            <p className="mt-4 text-h4 text-ink-primary-dark">{site.brand}</p>
            <p className="mt-3 text-body text-ink-primary-dark/80">
              산업 현장 AX·디지털트윈 서비스를 제공하는 브랜드입니다.
            </p>
          </div>
          <div className="rounded-card border border-line-dark bg-bg-elevated/50 p-6 md:p-7">
            <Badge tone="neutral">설명 문구</Badge>
            <p className="mt-4 text-h4 text-accent">{site.tagline}</p>
            <p className="mt-3 text-body text-ink-secondary-dark">{site.sloganKo}</p>
          </div>
        </div>

        <div className="mt-8 max-w-[820px]">
          {about.intro.map((line) => (
            <p className="mt-3 text-body-l text-ink-secondary-dark" key={line}>
              {line}
            </p>
          ))}
        </div>
      </Section>

      {/* Mission & Working Principles */}
      <Section ariaLabelledby="mission-title" tone="light">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="MISSION"
              id="mission-title"
              title={about.mission}
              tone="light"
            />
          </div>
          <div className="lg:col-span-7">
            <h3 className="text-label uppercase tracking-[0.1em] text-ink-secondary-light">
              Working Principles
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {about.principles.map((principle) => (
                <li className="flex items-start gap-3 text-body-l text-ink-primary-light" key={principle}>
                  <span aria-hidden="true" className="mt-1.5 text-accent-deep">
                    <Icon className="h-5 w-5" name="check" />
                  </span>
                  {principle}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 경쟁 포지션 */}
      <Section ariaLabelledby="positioning-title" tone="dark-alt">
        <SectionHeader
          description="컨설팅 회사와 개발 회사 사이에서 어떤 역할을 하는지 명확히 구분합니다."
          id="positioning-title"
          title={about.positioning.title}
        />

        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <caption className="sr-only">유형별 일반적 한계와 BTREE AX LAB의 차이</caption>
            <thead>
              <tr className="border-b border-line-dark">
                <th className="py-4 pr-4 text-label uppercase tracking-[0.1em] text-ink-secondary-dark" scope="col">
                  유형
                </th>
                <th className="py-4 pr-4 text-label uppercase tracking-[0.1em] text-ink-secondary-dark" scope="col">
                  일반적 한계
                </th>
                <th className="py-4 text-label uppercase tracking-[0.1em] text-accent" scope="col">
                  BTREE AX LAB의 차이
                </th>
              </tr>
            </thead>
            <tbody>
              {about.positioning.rows.map((row) => (
                <tr className="border-b border-line-dark" key={row.type}>
                  <th className="py-4 pr-4 align-top text-body font-semibold text-ink-primary-dark" scope="row">
                    {row.type}
                  </th>
                  <td className="py-4 pr-4 align-top text-body text-ink-secondary-dark">
                    {row.limitation}
                  </td>
                  <td className="py-4 align-top text-body text-ink-primary-dark">{row.difference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 대표 프로필 */}
      <Section ariaLabelledby="about-representative-title" tone="dark">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <RepresentativePhoto />
          </div>
          <div className="lg:col-span-8">
            <SectionHeader
              eyebrow="REPRESENTATIVE"
              id="about-representative-title"
              title={`${representative.name} | ${representative.title}`}
            />
            <p className="text-[15px] font-semibold text-accent">{representative.role}</p>
            <p className="mt-4 text-body-l text-ink-secondary-dark">{representative.detailIntro}</p>

            <h3 className="mt-8 text-label uppercase tracking-[0.1em] text-ink-secondary-dark/70">
              전문분야
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {representative.expertiseTags.map((tag) => (
                <li key={tag}>
                  <Badge tone="neutral">{tag}</Badge>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button href="/track-record" variant="secondary" withArrow>
                국가 R&D·프로젝트 수행이력 전체 보기
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <FinalCtaSection section="about-final-cta" />

      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
    </>
  );
}
