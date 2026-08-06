import { ServiceCard } from '@/components/cards/ServiceCard';
import { Section, SectionHeader } from '@/components/ui/Section';
import { TextLink } from '@/components/ui/TextLink';
import { homeServiceSlugs, services } from '@/content/services';

/** Section 03 — Core Services (마스터 문서 7.3) */
export function ServicesSection() {
  const homeServices = homeServiceSlugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is (typeof services)[number] => Boolean(service));

  return (
    <Section ariaLabelledby="services-title" id="services" tone="light">
      <SectionHeader
        action={<TextLink href="/services" tone="light">전체 서비스 비교표 보기</TextLink>}
        description="현재 단계에 필요한 서비스만 선택하고, 검증된 결과를 기반으로 다음 단계로 확장할 수 있습니다."
        eyebrow="SERVICES"
        id="services-title"
        title="현장 진단부터 실증과 운영까지"
        tone="light"
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {homeServices.map((service) => (
          <ServiceCard key={service.slug} service={service} tone="light" />
        ))}
      </div>
    </Section>
  );
}
