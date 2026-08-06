import { JsonLd } from '@/components/layout/JsonLd';
import { ArchitectureSection } from '@/components/sections/ArchitectureSection';
import { CasesSection } from '@/components/sections/CasesSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { IndustriesSection } from '@/components/sections/IndustriesSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { RepresentativeSection } from '@/components/sections/RepresentativeSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { WhyBtreeSection } from '@/components/sections/WhyBtreeSection';
import { faqJsonLd, serviceJsonLd } from '@/lib/seo';

/**
 * 홈 페이지 — 마스터 문서 7장
 * 섹션 순서는 문서의 Section 01~12 를 그대로 따른다.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <ServicesSection />
      <ProcessSection description="각 단계는 독립적으로 계약할 수 있고, 이전 단계의 결과를 근거로 다음 단계를 결정합니다." />
      <IndustriesSection />
      <WhyBtreeSection />
      <ArchitectureSection />
      <CasesSection />
      <PricingSection />
      <RepresentativeSection />
      <FaqSection />
      <FinalCtaSection section="home-final-cta" />

      {/* FAQ 는 실제 화면에 노출되므로 FAQPage 구조화 데이터를 함께 제공한다 (18.4). */}
      <JsonLd data={[...serviceJsonLd(), faqJsonLd()]} />
    </>
  );
}
