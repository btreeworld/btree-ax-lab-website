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
import { JourneyExperience } from '@/components/three/world/JourneyExperience';
import { locales, type Locale } from '@/i18n/locales';
import { serviceJsonLd } from '@/lib/seo';

/**
 * 홈 페이지 — "디지털트윈 안으로" 3D 월드 (계획서: shiny-finding-whistle.md)
 *
 * `<JourneyExperience>`의 `fallback`으로 넘기는 아래 섹션형 마크업이 이 페이지의 진짜 SSR
 * 콘텐츠다 — `useJourneyQuality()`는 서버에서 항상 null이라, 초기 HTML은 검색엔진·리듀스드모션·
 * WebGL 미지원 사용자 모두에게 이 fallback 그대로 나간다. 3D 월드는 하이드레이션 후 조건을
 * 만족하는 클라이언트에서만 이를 대체한다. 섹션 순서는 마스터 문서 7장 Section 01~12를 따르되,
 * FAQ(Section 11)는 텍스트 감축을 위해 제외했다 — 컴포넌트·콘텐츠(FaqSection, content/faq.ts)는
 * 삭제하지 않고 보존한다(사용자 확인: "불필요한 내용들은 모두 삭제해도 좋아").
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(locales, rawLocale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  return (
    <>
      <JourneyExperience
        fallback={
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
          </>
        }
      />

      <JsonLd data={serviceJsonLd(locale)} />
    </>
  );
}
