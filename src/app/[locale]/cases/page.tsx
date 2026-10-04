import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { CaseCard } from '@/components/cards/CaseCard';
import { JsonLd } from '@/components/layout/JsonLd';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { PageHero } from '@/components/sections/PageHero';
import { VisualNarrative } from '@/components/sections/VisualNarrative';
import { Badge, PlaceholderNote } from '@/components/ui/Badge';
import { Section, SectionHeader } from '@/components/ui/Section';
import { caseStatusLabel, cases, casesNotice, casesPageCopy } from '@/content/cases';
import { navLabel } from '@/content/site';
import { locales, type Locale } from '@/i18n/locales';
import { stagger } from '@/lib/motion';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const copy = casesPageCopy[l];
  return buildMetadata({ locale: l, title: copy.heroTitle, description: copy.heroDescription, path: '/cases' });
}

export default async function CasesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(locales, rawLocale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Common' });
  const copy = casesPageCopy[locale];

  const breadcrumb = [
    { name: t('home'), path: '/' },
    { name: navLabel(locale, '/cases'), path: '/cases' },
  ];

  return (
    <>
      <PageHero breadcrumb={breadcrumb} description={copy.heroDescription} eyebrow={copy.heroEyebrow} title={copy.heroTitle} />

      <VisualNarrative
        description={locale === 'ko' ? '사례는 기술 이름보다 어떤 현장 신호를 수집했고, 어디에서 판단했으며, 운영에 어떤 결과를 남겼는지로 읽어야 합니다.' : 'A useful case study shows which field signals were captured, where decisions were made, and what operational evidence remained.'}
        diagramVariant="flow"
        eyebrow="PROVEN SYSTEMS"
        image="/images/visuals/cases-ai-software-portfolio-v3.webp"
        imageAlt={locale === 'ko' ? '산업안전 영상 AI, 스마트팜 디지털트윈, 3D 물류 시뮬레이션, 로봇 비전 소프트웨어 사례를 함께 검토하는 연구팀' : 'A research team reviewing industrial safety vision AI, a smart-farm digital twin, 3D logistics simulation, and robotic vision software'}
        points={locale === 'ko' ? [
          { title: '현장 조건', description: '설비·네트워크·보안 제약을 먼저 정의합니다.', icon: 'blueprint' },
          { title: '판단 근거', description: '센서와 영상에서 실제로 검증 가능한 신호를 찾습니다.', icon: 'camera' },
          { title: 'PoC 결과', description: '정확도뿐 아니라 응답시간과 운영 가능성을 함께 봅니다.', icon: 'flask' },
          { title: '운영 소프트웨어', description: '통합관제·3D 시각화·시뮬레이션·원격 조치까지 결과를 이어갑니다.', icon: 'twin' },
        ] : [
          { title: 'Field conditions', description: 'Define equipment, network, and security constraints first.', icon: 'blueprint' },
          { title: 'Decision evidence', description: 'Find signals that can be validated from sensors and video.', icon: 'camera' },
          { title: 'PoC outcome', description: 'Assess latency and operability alongside model accuracy.', icon: 'flask' },
          { title: 'Operations software', description: 'Connect results to control rooms, 3D views, simulations, and remote action.', icon: 'twin' },
        ]}
        priority
        title={locale === 'ko' ? '기술 데모가 아니라 운영 가능한 증거를 만듭니다' : 'Evidence for operation, not just a technology demo'}
      />

      <Section ariaLabelledby="case-list-title" tone="dark">
        <SectionHeader description={copy.listDescription} id="case-list-title" title={copy.listTitle} />

        <ul aria-label={copy.listTitle} className="mb-8 flex flex-wrap gap-2">
          {Object.values(caseStatusLabel[locale]).map((label) => (
            <li key={label}>
              <Badge tone="neutral">{label}</Badge>
            </li>
          ))}
        </ul>

        <div className="grid gap-5 lg:grid-cols-3">
          {cases[locale].map((caseStudy, index) => (
            <div className="reveal h-full" key={caseStudy.slug} style={stagger(index, 3)}>
              <CaseCard caseStudy={caseStudy} />
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-2">
          <PlaceholderNote>{casesNotice[locale]}</PlaceholderNote>
          <PlaceholderNote>{copy.secondNotice}</PlaceholderNote>
        </div>
      </Section>

      <FinalCtaSection section="cases-final-cta" />

      <JsonLd data={breadcrumbJsonLd(locale, breadcrumb)} />
    </>
  );
}
