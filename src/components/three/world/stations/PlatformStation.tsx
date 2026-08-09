'use client';

import { Beam } from '@/components/three/primitives';
import { DataStream } from '@/components/three/world/DataStream';
import { PLATFORM_LAYOUT } from '@/lib/journey';
import { threeColors } from '@/lib/three-tokens';

/**
 * PLATFORM 스테이션 — 여러 현장의 스트림이 정렬된 레인으로 통합된다.
 * EDGE의 단일 코어(수렴)와 대비되게, 여기는 나란한 다중 레인(병렬 처리)으로 표현한다.
 * 각 레인 중앙의 다이아몬드 게이트는 "규칙 엔진·권한관리"를 통과한다는 뜻.
 */
export function PlatformStation() {
  const { laneCount, laneLength, laneSpacing, centerZ } = PLATFORM_LAYOUT;
  const half = (laneCount - 1) / 2;
  const startZ = centerZ + laneLength / 2;
  const endZ = centerZ - laneLength / 2;

  return (
    <group>
      {Array.from({ length: laneCount }, (_, i) => {
        const x = (i - half) * laneSpacing;
        const from: [number, number, number] = [x, 1.6, startZ];
        const to: [number, number, number] = [x, 1.6, endZ];

        return (
          <group key={i}>
            <Beam from={from} opacity={0.16} to={to} />
            <DataStream count={9} from={from} speed={0.5 + i * 0.05} to={to} />
            <mesh position={[x, 1.6, centerZ]}>
              <ringGeometry args={[0.4, 0.46, 4]} />
              <meshBasicMaterial color={threeColors.structure} opacity={0.8} transparent />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
