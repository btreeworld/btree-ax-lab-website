'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useLocale } from 'next-intl';
import * as THREE from 'three';

import { HoloPanel } from '@/components/three/world/HoloPanel';
import { DataStream } from '@/components/three/world/DataStream';
import { architectureLayers } from '@/content/home';
import type { Locale } from '@/i18n/locales';
import { EDGE_LAYOUT } from '@/lib/journey';
import { threeColors } from '@/lib/three-tokens';

/**
 * EDGE 스테이션 — 원시 스트림이 분류된 이벤트로 바뀌는 추론 코어.
 * GAP의 붉은 무질서한 점선과 대비되게, 여기서부터는 실선 스트림(DataStream)과
 * 또렷한 청록 회전체로 "정리됨"을 표현한다.
 */
export function EdgeStation() {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const locale = useLocale() as Locale;
  const edgeNodes = architectureLayers[locale][1].nodes; // ['데이터 수집', 'AI 추론', '이벤트 판단', '로컬 저장']

  const { center, radius } = EDGE_LAYOUT.core;
  const [cx, cy, cz] = center;

  useFrame((state, delta) => {
    if (coreRef.current) coreRef.current.rotation.y += delta * 0.25;
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.4;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
    }
  });

  return (
    <group>
      {/* 추론 코어 */}
      <mesh position={center} ref={coreRef}>
        <icosahedronGeometry args={[radius, 1]} />
        <meshBasicMaterial color={threeColors.accentDeep} opacity={0.85} transparent wireframe />
      </mesh>
      <mesh position={center} ref={ringRef}>
        <torusGeometry args={[radius * 1.4, 0.012, 8, 48]} />
        <meshBasicMaterial color={threeColors.accent} opacity={0.5} transparent />
      </mesh>

      {/* 원시 스트림 유입(FIELD 방향, +Z) → 코어 → 분류된 이벤트 유출(PLATFORM 방향, -Z) */}
      <DataStream color={threeColors.textSecondaryDark} count={10} from={[cx, cy - 0.2, cz + 5.5]} speed={0.5} to={[cx, cy, cz + radius]} />
      <DataStream color={threeColors.accent} count={8} from={[cx, cy, cz - radius]} speed={0.7} to={[cx, cy + 0.3, cz - 5.5]} />

      <HoloPanel label={`${edgeNodes[1]} · ${edgeNodes[2]}`} position={EDGE_LAYOUT.panel.center} rotation={[0, Math.PI / 7, 0]} width={1.3} />
    </group>
  );
}
