'use client';

import { useMemo } from 'react';

import { getShadowBlobTexture } from '@/components/three/world/materials';

/**
 * 접지 그림자 — 지면에 깔리는 방사형 그라디언트 평면.
 *
 * 실제 섀도우맵(directionalLight.castShadow)을 쓰지 않는 이유: 월드가 Z축으로 60유닛 넘게
 * 뻗어 있어 하나의 섀도우 카메라로 전 구간을 덮으려면 해상도를 크게 잡아야 하고, 그러면
 * 프레임 비용이 급증한다. 반면 물체가 "떠 있는" 인상을 없애는 데는 발밑의 어두운 얼룩
 * 하나면 충분하다 — 비용은 드로우콜 1개, 텍스처는 전 인스턴스가 공유한다.
 *
 * polygonOffset: 지면(Terrain 그리드)과 같은 높이라 z-fighting이 생기므로 살짝 앞으로 당긴다.
 */
export function ShadowBlob({
  position,
  radius = 1,
  opacity = 1,
}: {
  position: [number, number, number];
  radius?: number;
  opacity?: number;
}) {
  const texture = useMemo(() => getShadowBlobTexture(), []);

  return (
    <mesh position={[position[0], position[1] + 0.012, position[2]]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[radius * 2, radius * 2]} />
      <meshBasicMaterial
        depthWrite={false}
        map={texture}
        opacity={opacity}
        polygonOffset
        polygonOffsetFactor={-2}
        transparent
      />
    </mesh>
  );
}
