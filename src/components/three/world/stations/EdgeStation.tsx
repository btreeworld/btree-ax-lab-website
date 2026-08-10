'use client';

import { useLocale } from 'next-intl';

import { DataStream } from '@/components/three/world/DataStream';
import { HoloPanel } from '@/components/three/world/HoloPanel';
import { EdgeGateway, InferenceLattice } from '@/components/three/world/props/EdgeProps';
import { architectureLayers } from '@/content/home';
import type { Locale } from '@/i18n/locales';
import { EDGE_LAYOUT } from '@/lib/journey';
import { threeColors } from '@/lib/three-tokens';

/**
 * EDGE 스테이션 — "엣지에서 판단합니다".
 *
 * 실제 엣지 게이트웨이 장비를 놓고, 그 위 공간에 추론 격자를 띄운다. 카메라가 이 구간을
 * 통과하며 격자 사이를 지나가므로 "장비 안에서 벌어지는 연산을 통과한다"는 체험이 된다.
 * 유입되는 원시 스트림은 무채색, 유출되는 스트림은 청록 — 색만으로 "분류됨"을 보여준다.
 */
export function EdgeStation() {
  const locale = useLocale() as Locale;
  const edgeNodes = architectureLayers[locale][1].nodes;

  const { center } = EDGE_LAYOUT.core;
  const [cx, cy, cz] = center;

  return (
    <group>
      {/* 엣지 게이트웨이 장비 — 지면에 설치된 실물 */}
      <EdgeGateway position={[cx, cy - 1.05, cz]} rotation={[0, 0.22, 0]} />

      {/* 추론 격자 — 장비 위 공간에서 층을 따라 신호가 전파된다 */}
      <InferenceLattice layerGap={0.92} position={[cx, cy + 0.15, cz]} />

      {/* 원시 스트림 유입(FIELD 방향) → 분류된 이벤트 유출(PLATFORM 방향).
          유입 스트림은 X로 크게 비켜 놓는다 — 카메라가 z≈-4를 지나므로 cx 정중앙에 두면
          입자가 렌즈를 스치며 화면을 덮는 거대한 덩어리로 보인다. */}
      <DataStream color={threeColors.textSecondaryDark} count={10} from={[cx - 3.4, cy - 0.2, cz + 5.5]} speed={0.5} to={[cx - 0.5, cy, cz + 0.9]} />
      <DataStream color={threeColors.accent} count={8} from={[cx, cy, cz - 1]} speed={0.7} to={[cx, cy + 0.3, cz - 5.5]} />

      {/* 방위각은 EDGE 카메라([0.8,1.9,-4]) 기준: atan2(0.8-2.4, -4-(-9.5)) ≈ -0.28rad */}
      <HoloPanel label={`${edgeNodes[1]} · ${edgeNodes[2]}`} position={EDGE_LAYOUT.panel.center} rotation={[0, -0.28, 0]} width={1.3} />
    </group>
  );
}
