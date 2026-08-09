import { getLocale } from 'next-intl/server';

import { ArchitectureDiagram } from '@/components/diagrams/ArchitectureDiagram';
import { ArchitectureSceneLoader } from '@/components/three/ArchitectureSceneLoader';
import { Section, SectionHeader } from '@/components/ui/Section';
import { architectureLayers, architectureSection } from '@/content/home';
import type { Locale } from '@/i18n/locales';

/**
 * Section 07 — Architecture Visual (마스터 문서 7.7)
 * 3D 가능 기기: 스크롤 연동 씬(깊이 방향 레이어 통과 + 노드 호버 라벨).
 * 폴백(모션축소·모바일·WebGL 미지원): 기존 카드 다이어그램 — Server Component라
 * 여기서 미리 렌더링해 Client Component(ArchitectureSceneLoader)에 children으로 넘긴다.
 */
export async function ArchitectureSection() {
  const locale = (await getLocale()) as Locale;
  const copy = architectureSection[locale];
  const layers = architectureLayers[locale];

  return (
    <Section ariaLabelledby="architecture-title" id="architecture" tone="dark">
      <SectionHeader
        description={copy.description.map((line) => (
          <span className="block" key={line}>
            {line}
          </span>
        ))}
        eyebrow="ARCHITECTURE"
        id="architecture-title"
        title={copy.title}
      />

      <ArchitectureSceneLoader fallback={<ArchitectureDiagram />} layers={layers} />
    </Section>
  );
}
