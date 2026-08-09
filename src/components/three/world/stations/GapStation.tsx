'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

import { PulsingNode } from '@/components/three/primitives';
import { GAP_LAYOUT } from '@/lib/journey';
import { threeColors } from '@/lib/three-tokens';

const FRAGMENT_COUNT = 6;

/**
 * GAP 스테이션 — FIELD에서 나온 스트림이 끊겨 표류하는 파편들.
 * 점선(끊긴 연결)만 있고 실선(온전한 연결)은 없다 — PLATFORM의 정렬된 실선과 대비시켜
 * "연결되지 않음"을 도형 자체로 말하게 한다.
 */
export function GapStation() {
  const groupRef = useRef<THREE.Group>(null);

  const fragments = useMemo(() => {
    const [cx, cy, cz] = GAP_LAYOUT.center;
    const [sx, sy, sz] = GAP_LAYOUT.spread;
    return Array.from({ length: FRAGMENT_COUNT }, (_, i) => ({
      position: [cx + (Math.random() - 0.5) * sx, cy + (Math.random() - 0.5) * sy, cz + (Math.random() - 0.5) * sz] as [
        number,
        number,
        number,
      ],
      phase: i * 260,
      driftSeed: Math.random() * Math.PI * 2,
    }));
  }, []);

  // 끊긴 연결 — 일부 쌍만 점선으로 잇는다(전부 잇지 않는 것 자체가 "단절"의 표현).
  const brokenLinks = useMemo(
    () => [
      [fragments[0].position, fragments[2].position],
      [fragments[1].position, fragments[3].position],
      [fragments[3].position, fragments[5].position],
    ],
    [fragments],
  );

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;
    group.children.forEach((child, i) => {
      const f = fragments[i];
      if (!f) return;
      child.position.y = f.position[1] + Math.sin(state.clock.elapsedTime * 0.5 + f.driftSeed) * 0.18;
      child.rotation.x += 0.002;
      child.rotation.y += 0.0015;
    });
  });

  return (
    <group>
      <group ref={groupRef}>
        {fragments.map((f, i) => (
          <PulsingNode
            color={threeColors.error}
            key={i}
            phaseOffsetMs={f.phase}
            position={f.position}
            radius={0.1}
          />
        ))}
      </group>

      {brokenLinks.map((points, i) => (
        <Line color={threeColors.error} dashed dashScale={3} gapSize={2.4} key={i} lineWidth={1} points={points} transparent opacity={0.3} />
      ))}
    </group>
  );
}
