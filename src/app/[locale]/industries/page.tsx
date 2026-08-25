import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { JsonLd } from '@/components/layout/JsonLd';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { PageHero } from '@/components/sections/PageHero';
import { VisualNarrative } from '@/components/sections/VisualNarrative';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Section, SectionHeader } from '@/components/ui/Section';
import { industries, industriesPageCopy } from '@/content/industries';
import { navLabel } from '@/content/site';
import { locales, type Locale } from '@/i18n/locales';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const copy = industriesPageCopy[l];
  return buildMetadata({ locale: l, title: copy.heroTitle, description: copy.heroDescription, path: '/industries' });
}

export default async function IndustriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(locales, rawLocale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Common' });
  const copy = industriesPageCopy[locale];
  const industryList = industries[locale];

  const breadcrumb = [
    { name: t('home'), path: '/' },
    { name: navLabel(locale, '/industries'), path: '/industries' },
  ];

  return (
    <>
      <PageHero breadcrumb={breadcrumb} description={copy.heroDescription} eyebrow={copy.heroEyebrow} title={copy.heroTitle} />

      <VisualNarrative
        description={locale === 'ko' ? '산업은 달라도 핵심은 같습니다. 현장을 감지하고, 가까운 곳에서 판단하고, 운영 가능한 정보로 바꾸는 것입니다.' : 'Different industries share the same core: sense the field, decide close to it, and turn signals into operable information.'}
        diagramVariant="hub"
        eyebrow="APPLICATION LANDSCAPE"
        image="/images/visuals/industries-digital-twin-map-v3.webp"
        imageAlt={locale === 'ko' ? '제조, 안전, 시설, 물류, 스마트농업 공간이 하나의 3D 디지털트윈과 통합관제 플랫폼에 연결된 산업단지' : 'An industrial district where manufacturing, safety, facilities, logistics, and smart agriculture connect to one 3D digital twin and control platform'}
        points={locale === 'ko' ? [
          { title: '스마트 제조', description: '검사·이상탐지·설비 상태를 실시간으로 연결합니다.', icon: 'factory' },
          { title: '산업 안전', description: '위험 행동과 환경 신호를 현장에서 빠르게 판단합니다.', icon: 'shield' },
          { title: '스마트팜', description: '생육·기후·설비 데이터를 하나의 운영 흐름으로 만듭니다.', icon: 'leaf' },
          { title: '공통 디지털트윈·관제 코어', description: '산업별 공간·설비·AI 이벤트를 하나의 3D 운영 모델과 통합관제 소프트웨어에서 관리합니다.', icon: 'twin' },
        ] : [
          { title: 'Smart manufacturing', description: 'Connect inspection, anomalies, and equipment health in real time.', icon: 'factory' },
          { title: 'Industrial safety', description: 'Detect risky behavior and environmental signals at the edge.', icon: 'shield' },
          { title: 'Smart farming', description: 'Unify crop, climate, and equipment data into one workflow.', icon: 'leaf' },
          { title: 'Shared twin & control core', description: 'Manage spatial, equipment, and AI events in one 3D operating model and control application.', icon: 'twin' },
        ]}
        priority
        title={locale === 'ko' ? '제조·안전·농업을 연결하는 하나의 AX 원리' : 'One AX principle across manufacturing, safety, and agriculture'}
      />

      {industryList.map((industry, index) => (
        <Section ariaLabelledby={`${industry.slug}-title`} id={industry.slug} key={industry.slug} tone={index % 2 === 0 ? 'dark' : 'dark-alt'}>
          <SectionHeader eyebrow={industry.name} id={`${industry.slug}-title`} title={industry.headline} />

          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h3 className="text-label uppercase tracking-[0.1em] text-ink-secondary-dark/70">{copy.problemsLabel}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {industry.problems.map((problem) => (
                  <li className="flex items-start gap-3 rounded-button border border-line-dark bg-bg-elevated/40 px-4 py-3 text-body text-ink-secondary-dark" key={problem}>
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-state-warning" />
                    {problem}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <h3 className="text-label uppercase tracking-[0.1em] text-ink-secondary-dark/70">{copy.capabilitiesLabel}</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {industry.capabilities.map((capability) => (
                  <li className="flex items-start gap-2.5 text-body text-ink-primary-dark" key={capability}>
                    <span aria-hidden="true" className="mt-1 text-accent">
                      <Icon className="h-4 w-4" name="check" />
                    </span>
                    {capability}
                  </li>
                ))}
              </ul>

              {industry.caution ? (
                <p className="mt-6 rounded-button border border-state-warning/40 bg-state-warning/10 px-4 py-3 text-small text-state-warning">
                  {industry.caution}
                </p>
              ) : null}

              <div className="mt-8">
                <Button event="cta_ax_diagnosis_click" eventPayload={{ section: 'industries', industry: industry.slug }} href={`/contact?industry=${industry.slug}`}>
                  {industry.ctaLabel}
                </Button>
              </div>
            </div>
          </div>
        </Section>
      ))}

      <FinalCtaSection section="industries-final-cta" />

      <JsonLd data={breadcrumbJsonLd(locale, breadcrumb)} />
    </>
  );
}
