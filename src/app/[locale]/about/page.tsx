import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { JsonLd } from '@/components/layout/JsonLd';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { PageHero } from '@/components/sections/PageHero';
import { RepresentativePhoto } from '@/components/sections/RepresentativeSection';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Section, SectionHeader } from '@/components/ui/Section';
import { about, aboutPageCopy } from '@/content/about';
import { representative } from '@/content/representative-profile';
import { navLabel, site } from '@/content/site';
import { locales, type Locale } from '@/i18n/locales';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

/** valueProps / positioning.rows 는 항목 순서가 고정되어 있어 인덱스로 아이콘을 매핑한다. */
const valuePropIcons: IconName[] = ['search', 'flask', 'twin', 'check', 'advisory'];
const positioningIcons: IconName[] = ['advisory', 'blueprint', 'sensor', 'database', 'flask'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const content = about[l];
  return buildMetadata({
    locale: l,
    title: l === 'ko' ? '회사소개' : 'About',
    description: content.intro.join(' '),
    path: '/about',
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(locales, rawLocale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Common' });
  const content = about[locale];
  const copy = aboutPageCopy[locale];
  const rep = representative[locale];

  const breadcrumb = [
    { name: t('home'), path: '/' },
    { name: navLabel(locale, '/about'), path: '/about' },
  ];

  return (
    <>
      <PageHero breadcrumb={breadcrumb} eyebrow="ABOUT" title={content.heroTitle} />

      {/* 법인과 브랜드의 관계 — 마스터 문서 2.1 / 11.0 */}
      <Section ariaLabelledby="brand-relation-title" tone="dark">
        <SectionHeader id="brand-relation-title" title={copy.brandRelationTitle} />

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-card border border-line-dark bg-bg-elevated/50 p-6 md:p-7">
            <Badge tone="neutral">{copy.legalNameBadge}</Badge>
            <p className="mt-4 text-h4 text-ink-primary-dark">
              {locale === 'ko' ? `${site.legalName.ko} / ${site.legalNameEn}` : site.legalName.en}
            </p>
            <p className="mt-3 text-body text-ink-secondary-dark">{copy.legalNameCaption}</p>
          </div>
          <div className="rounded-card border border-accent/30 bg-accent-soft p-6 md:p-7">
            <Badge tone="accent">{copy.brandBadge}</Badge>
            <p className="mt-4 text-h4 text-ink-primary-dark">{site.brand}</p>
            <p className="mt-3 text-body text-ink-primary-dark/80">{copy.brandCaption}</p>
          </div>
          <div className="rounded-card border border-line-dark bg-bg-elevated/50 p-6 md:p-7">
            <Badge tone="neutral">{copy.taglineBadge}</Badge>
            <p className="mt-4 text-h4 text-accent">{site.tagline}</p>
            <p className="mt-3 text-body text-ink-secondary-dark">{locale === 'ko' ? site.sloganKo : site.sloganEn}</p>
          </div>
        </div>

        <div className="mt-8 max-w-[820px]">
          {content.intro.map((line) => (
            <p className="mt-3 text-body-l text-ink-secondary-dark" key={line}>
              {line}
            </p>
          ))}
        </div>
      </Section>

      {/* 핵심 가치 제안 — 마스터 문서 2.3. 아이콘으로 한눈에 훑을 수 있도록 구성한다. */}
      <Section ariaLabelledby="value-props-title" tone="light">
        <SectionHeader eyebrow={copy.valuePropsEyebrow} id="value-props-title" title={copy.valuePropsTitle} tone="light" />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {content.valueProps.map((item, index) => (
            <li className="rounded-card border border-line-light bg-surface-white p-6" key={item.title}>
              <span className="flex h-11 w-11 items-center justify-center rounded-button bg-accent-soft text-accent-deep">
                <Icon className="h-5 w-5" name={valuePropIcons[index % valuePropIcons.length]} />
              </span>
              <h3 className="mt-4 text-h4 text-ink-primary-light">{item.title}</h3>
              <p className="mt-2 text-small text-ink-secondary-light">{item.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Mission & Working Principles */}
      <Section ariaLabelledby="mission-title" tone="light">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow={copy.missionEyebrow} id="mission-title" title={content.mission} tone="light" />
          </div>
          <div className="lg:col-span-7">
            <h3 className="text-label uppercase tracking-[0.1em] text-ink-secondary-light">{copy.workingPrinciplesLabel}</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {content.principles.map((principle) => (
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
        <SectionHeader description={copy.positioningDescription} id="positioning-title" title={content.positioning.title} />

        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <caption className="sr-only">{content.positioning.title}</caption>
            <thead>
              <tr className="border-b border-line-dark">
                <th className="py-4 pr-4 text-label uppercase tracking-[0.1em] text-ink-secondary-dark" scope="col">
                  {copy.positioningColumns[0]}
                </th>
                <th className="py-4 pr-4 text-label uppercase tracking-[0.1em] text-ink-secondary-dark" scope="col">
                  {copy.positioningColumns[1]}
                </th>
                <th className="py-4 text-label uppercase tracking-[0.1em] text-accent" scope="col">
                  {copy.positioningColumns[2]}
                </th>
              </tr>
            </thead>
            <tbody>
              {content.positioning.rows.map((row, index) => (
                <tr className="border-b border-line-dark" key={row.type}>
                  <th className="py-4 pr-4 align-top text-body font-semibold text-ink-primary-dark" scope="row">
                    <span className="flex items-center gap-2.5">
                      <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-button bg-white/5 text-ink-secondary-dark">
                        <Icon className="h-4 w-4" name={positioningIcons[index % positioningIcons.length]} />
                      </span>
                      {row.type}
                    </span>
                  </th>
                  <td className="py-4 pr-4 align-top text-body text-ink-secondary-dark">{row.limitation}</td>
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
            <SectionHeader eyebrow={copy.representativeEyebrow} id="about-representative-title" title={`${rep.name} | ${rep.title}`} />
            <p className="text-[15px] font-semibold text-accent">{rep.role}</p>
            <p className="mt-4 text-body-l text-ink-secondary-dark">{rep.detailIntro}</p>

            <h3 className="mt-8 text-label uppercase tracking-[0.1em] text-ink-secondary-dark/70">{copy.expertiseLabel}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {rep.expertiseTags.map((tag) => (
                <li key={tag}>
                  <Badge tone="neutral">{tag}</Badge>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button href="/track-record" variant="secondary" withArrow>
                {copy.viewTrackRecordCta}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <FinalCtaSection section="about-final-cta" />

      <JsonLd data={breadcrumbJsonLd(locale, breadcrumb)} />
    </>
  );
}
