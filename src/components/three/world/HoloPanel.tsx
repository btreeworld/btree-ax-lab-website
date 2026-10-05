'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { SceneLabel } from '@/components/three/SceneLabel';
import { useDutyCyclePulse } from '@/components/three/primitives';
import { threeColors } from '@/lib/three-tokens';

/**
 * 인월드 홀로그래픽 대시보드 패널 — HeroScene의 트윈 패널(막대 그래프 + 알림 점)을 재사용
 * 가능한 형태로 일반화했다. EDGE/PLATFORM/TWIN/OPERATOR가 전부 이 패널을 쓴다
 * (계획서: 새 프리미티브는 최소화, 기존 시각 언어 재사용).
 */
export function HoloPanel({
  position,
  rotation,
  width = 1.5,
  height = 0.95,
  barCount = 3,
  label,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
  barCount?: number;
  label?: string;
}) {
  const alertRef = useRef<THREE.MeshBasicMaterial>(null);
  const intensity = useDutyCyclePulse(700, 4200, 1200);

  useFrame(() => {
    if (alertRef.current) alertRef.current.opacity = 0.35 + intensity.current * 0.65;
  });

  const bars = Array.from({ length: barCount }, (_, i) => i);

  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[width, height, 0.03]} />
        <meshBasicMaterial color={threeColors.bgElevated} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[width * 0.92, height * 0.86, 0.01]} />
        <meshBasicMaterial color={0x0d2031} />
      </mesh>

      {bars.map((i) => (
        <mesh key={i} position={[-width * 0.1, height * 0.26 - i * height * 0.18, 0.03]}>
          <boxGeometry args={[width * (0.62 - i * 0.13), height * 0.06, 0.01]} />
          <meshBasicMaterial color={threeColors.accent} opacity={0.55 - i * 0.06} transparent />
        </mesh>
      ))}

      <mesh position={[width * 0.36, height * 0.32, 0.03]}>
        <icosahedronGeometry args={[height * 0.05, 0]} />
        <meshBasicMaterial color={threeColors.warning} opacity={0.4} ref={alertRef} transparent />
      </mesh>

      {label ? (
        // distanceFactor: drei Html은 기본적으로 항상 같은 화면 크기로 그려져(원근 없음) 멀리 있는
        // 패널 라벨도 가까운 것처럼 또렷하게 보이는 문제가 있었다 — 카메라 거리에 비례해 실제로
        // 작아지게 해서 다른 스테이션의 3D 지오메트리와 같은 원근 규칙을 따르게 한다.
        <SceneLabel center distanceFactor={8} position={[0, height / 2 + 0.16, 0]} style={{ pointerEvents: 'none' }}>
          <span className="whitespace-nowrap rounded-badge border border-accent/40 bg-bg-primary/90 px-2 py-0.5 text-[10px] font-medium text-accent">
            {label}
          </span>
        </SceneLabel>
      ) : null}
    </group>
  );
}
