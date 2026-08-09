import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { JsonLd } from '@/components/layout/JsonLd';
import { ArchitectureSection } from '@/components/sections/ArchitectureSection';
import { CasesSection } from '@/components/sections/CasesSection';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { IndustriesSection } from '@/components/sections/IndustriesSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { RepresentativeSection } from '@/components/sections/RepresentativeSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { WhyBtreeSection } from '@/components/sections/WhyBtreeSection';
import { locales, type Locale } from '@/i18n/locales';
import { serviceJsonLd } from '@/lib/seo';

/**
 * 홈 페이지 — 마스터 문서 7장
 * 섹션 순서는 문서의 Section 01~12를 따르되, FAQ(Section 11)는 텍스트 감축을 위해
 * 홈에서 제외했다 — 컴포넌트·콘텐츠(FaqSection, content/faq.ts)는 삭제하지 않고 보존한다
 * (재사용 가능성 보존, 사용자 확인: "불필요한 내용들은 모두 삭제해도 좋아").
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(locales, rawLocale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <ProblemSection />
      <ServicesSection />
      <ProcessSection />
      <IndustriesSection />
      <WhyBtreeSection />
      <ArchitectureSection />
      <CasesSection />
      <PricingSection />
      <RepresentativeSection />
      <FinalCtaSection section="home-final-cta" />

      <JsonLd data={serviceJsonLd(locale)} />
    </>
  );
}
