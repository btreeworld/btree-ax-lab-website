'use client';

import { Grid } from '@react-three/drei';

import { threeColors } from '@/lib/three-tokens';

/**
 * 절차적 그리드 지면 — 외부 3D 에셋 없이 "디지털트윈 안"이라는 느낌을 지탱하는 핵심 장치.
 * drei의 무한 그리드 셰이더를 그대로 쓴다(자체 지오메트리 롤 없음, GPU 비용 사실상 0).
 */
export function Terrain() {
  return (
    <Grid
      cellColor={threeColors.groundGrid}
      cellSize={1}
      cellThickness={0.6}
      fadeDistance={70}
      fadeStrength={1.4}
      followCamera={false}
      infiniteGrid
      position={[0, 0, 0]}
      sectionColor={threeColors.accentDeep}
      sectionSize={6}
      sectionThickness={1}
    />
  );
}
