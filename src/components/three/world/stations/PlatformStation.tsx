'use client';

import { DataStream } from '@/components/three/world/DataStream';
import { AccessGate, DatabaseStack, GatewayRing, RuleEngine, ServerRack } from '@/components/three/world/props/PlatformProps';
import { ShadowBlob } from '@/components/three/world/props/ShadowBlob';
import { PLATFORM_LAYOUT } from '@/lib/journey';
import { threeColors } from '@/lib/three-tokens';

/**
 * PLATFORM 스테이션 — architectureLayers[2].nodes 4개를 각각 대응 설비로 세운다.
 * 카메라가 -Z 방향으로 통과하므로, 데이터가 실제로 지나가는 순서대로 Z축에 늘어놓는다:
 * 통합 API(관문) → 규칙 엔진(분기) → 권한관리(검문) → 데이터 저장(적재).
 */
export function PlatformStation() {
  const { centerZ } = PLATFORM_LAYOUT;

  const gatewayZ = centerZ + 2.6;
  const ruleZ = centerZ + 0.4;
  const accessZ = centerZ - 1.8;
  const dbZ = centerZ - 4.0;

  return (
    <group>
      {/* 통합 API — 스트림이 통과하는 관문 링 */}
      <GatewayRing position={[0, 1.7, gatewayZ]} radius={0.72} />

      {/* 규칙 엔진 — 조건에 따라 흐름을 나눈다 */}
      <RuleEngine position={[-0.35, 1.05, ruleZ]} rotation={[0, 0.3, 0]} />

      {/* 권한관리 — 스캔 빔이 오르내리는 통제 게이트 */}
      <AccessGate position={[0.2, 0.55, accessZ]} />

      {/* 데이터 저장 — 원반 스택 */}
      <DatabaseStack position={[-0.9, 0.55, dbZ]} />
      <DatabaseStack discs={2} position={[0.75, 0.55, dbZ - 0.9]} radius={0.34} />

      {/* 접지 그림자 */}
      <ShadowBlob opacity={0.7} position={[-0.9, 0, dbZ]} radius={1.1} />
      <ShadowBlob opacity={0.6} position={[0.75, 0, dbZ - 0.9]} radius={0.9} />
      <ShadowBlob opacity={0.7} position={[-0.35, 0, ruleZ]} radius={1.0} />
      <ShadowBlob opacity={0.8} position={[-3.4, 0, centerZ + 1.2]} radius={1.1} />
      <ShadowBlob opacity={0.8} position={[-3.9, 0, centerZ - 1.6]} radius={1.0} />
      <ShadowBlob opacity={0.8} position={[3.5, 0, centerZ - 0.4]} radius={1.1} />

      {/* 인프라 배경 — 양옆으로 늘어선 서버 랙 */}
      <ServerRack position={[-3.4, 0, centerZ + 1.2]} rotation={[0, 0.42, 0]} />
      <ServerRack height={1.6} position={[-3.9, 0, centerZ - 1.6]} rotation={[0, 0.42, 0]} />
      <ServerRack position={[3.5, 0, centerZ - 0.4]} rotation={[0, -0.42, 0]} />

      {/* 각 설비를 잇는 데이터 흐름 */}
      <DataStream color={threeColors.accent} count={10} from={[0, 1.7, gatewayZ + 2.4]} speed={0.55} to={[0, 1.7, gatewayZ]} />
      <DataStream color={threeColors.accent} count={8} from={[0, 1.7, gatewayZ]} speed={0.5} to={[-0.35, 1.35, ruleZ]} />
      <DataStream color={threeColors.accentHover} count={7} from={[-0.35, 1.35, ruleZ]} speed={0.5} to={[0.2, 1.2, accessZ]} />
      <DataStream color={threeColors.accentHover} count={7} from={[0.2, 1.2, accessZ]} speed={0.45} to={[-0.9, 1.0, dbZ]} />
    </group>
  );
}
