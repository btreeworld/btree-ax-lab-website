'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { EdgedMesh, useDutyCyclePulse } from '@/components/three/primitives';
import { threeColors } from '@/lib/three-tokens';

/**
 * GAP("THE GAP") 스테이션 소품 — problemSection 4개 카드를 형태로 번역한다.
 *
 *  · 기존 설비와 연결이 걱정됩니다     → SeveredCable (잘린 케이블, 닿지 않는 두 끝)
 *  · 무엇부터 해야 할지 모릅니다        → IsolatedSilo (봉인된 채 흩어진 사일로)
 *  · 컨설팅과 개발이 분리되어 있습니다 → BrokenBridge (중간이 무너진 다리)
 *
 * 색은 error(붉은색)를 기조로 써서, EDGE 이후의 청록 계열(정상 연결)과 대비시킨다.
 */

/** 불규칙하게 튀는 스파크 — 끊긴 지점이 "죽어 있지 않고 문제를 내고 있음"을 보여준다. */
function Spark({ position, phaseOffsetMs = 0 }: { position: [number, number, number]; phaseOffsetMs?: number }) {
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const intensity = useDutyCyclePulse(180, 1900, phaseOffsetMs);

  useFrame(() => {
    if (materialRef.current) materialRef.current.opacity = intensity.current * 0.9;
  });

  return (
    <mesh position={position}>
      <sphereGeometry args={[0.035, 6, 6]} />
      <meshBasicMaterial color={threeColors.warning} opacity={0} ref={materialRef} transparent />
    </mesh>
  );
}

/** 잘린 단면에서 삐져나온 심선 다발. */
function FrayedStrands({ direction }: { direction: 1 | -1 }) {
  const strandGeometry = useMemo(() => new THREE.CylinderGeometry(0.007, 0.005, 0.16, 4), []);
  const strands = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        return {
          position: [direction * 0.08, Math.cos(angle) * 0.028, Math.sin(angle) * 0.028] as [number, number, number],
          rotation: [Math.sin(angle) * 0.5, 0, direction * (Math.PI / 2 - 0.35 + Math.cos(angle) * 0.3)] as [number, number, number],
        };
      }),
    [direction],
  );

  return (
    <group>
      {strands.map((s, i) => (
        <mesh key={i} position={s.position} rotation={s.rotation}>
          <primitive attach="geometry" object={strandGeometry} />
          <meshBasicMaterial color={threeColors.error} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * 잘린 케이블 — 두 끝이 서로를 향하지만 명확한 간격을 두고 닿지 않는다.
 * "연결하고 싶지만 연결되지 않는다"는 상태를 도형만으로 말한다.
 */
export function SeveredCable({
  position,
  rotation,
  gap = 0.7,
  cableLength = 1.3,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  gap?: number;
  cableLength?: number;
}) {
  const cableGeometry = useMemo(() => new THREE.CylinderGeometry(0.05, 0.05, cableLength, 8), [cableLength]);
  const connectorGeometry = useMemo(() => new THREE.BoxGeometry(0.13, 0.13, 0.11), []);

  const halfGap = gap / 2;
  const cableCenter = halfGap + cableLength / 2;

  return (
    <group position={position} rotation={rotation}>
      {/* 왼쪽 구간 */}
      <group position={[-cableCenter, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <primitive attach="geometry" object={cableGeometry} />
          <meshStandardMaterial color={threeColors.structure} metalness={0.5} roughness={0.62} />
        </mesh>
        <EdgedMesh geometry={connectorGeometry} position={[-cableLength / 2, 0, 0]} />
      </group>
      <group position={[-halfGap, 0, 0]}>
        <FrayedStrands direction={1} />
      </group>
      <Spark phaseOffsetMs={0} position={[-halfGap + 0.13, 0, 0]} />

      {/* 오른쪽 구간 */}
      <group position={[cableCenter, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <primitive attach="geometry" object={cableGeometry} />
          <meshStandardMaterial color={threeColors.structure} metalness={0.5} roughness={0.62} />
        </mesh>
        <EdgedMesh geometry={connectorGeometry} position={[cableLength / 2, 0, 0]} />
      </group>
      <group position={[halfGap, 0, 0]}>
        <FrayedStrands direction={-1} />
      </group>
      <Spark phaseOffsetMs={950} position={[halfGap - 0.13, 0, 0]} />
    </group>
  );
}

/**
 * 봉인된 데이터 사일로 — 뚜껑이 덮이고 밴드로 묶여 어떤 포트도 없는 원통.
 * 여러 개를 서로 떨어뜨려 배치하면 "데이터가 각자 갇혀 있다"가 그대로 읽힌다.
 */
export function IsolatedSilo({
  position,
  height = 0.72,
  radius = 0.28,
}: {
  position: [number, number, number];
  height?: number;
  radius?: number;
}) {
  const bodyGeometry = useMemo(() => new THREE.CylinderGeometry(radius, radius, height, 10), [radius, height]);
  const capGeometry = useMemo(() => new THREE.CylinderGeometry(radius * 1.12, radius * 1.12, 0.06, 10), [radius]);
  const bandGeometry = useMemo(() => new THREE.TorusGeometry(radius * 1.02, 0.014, 5, 14), [radius]);

  return (
    <group position={position}>
      <EdgedMesh geometry={bodyGeometry} position={[0, height / 2, 0]} />

      {/* 밀봉 뚜껑 */}
      <mesh position={[0, height + 0.03, 0]}>
        <primitive attach="geometry" object={capGeometry} />
        <meshBasicMaterial color={threeColors.error} opacity={0.55} transparent />
      </mesh>

      {/* 결속 밴드 2줄 */}
      {[height * 0.32, height * 0.68].map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <primitive attach="geometry" object={bandGeometry} />
          <meshBasicMaterial color={threeColors.error} opacity={0.42} transparent />
        </mesh>
      ))}
    </group>
  );
}

/**
 * 무너진 다리 — 양쪽 상판은 멀쩡한데 중간 경간이 사라졌다.
 * "보고서(왼쪽)와 실제 구현(오른쪽) 사이의 간극"을 문자 그대로 보여준다.
 */
export function BrokenBridge({
  position,
  rotation,
  span = 1.5,
  gap = 1.0,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  span?: number;
  gap?: number;
}) {
  const deckGeometry = useMemo(() => new THREE.BoxGeometry(span, 0.09, 0.7), [span]);
  const pillarGeometry = useMemo(() => new THREE.BoxGeometry(0.14, 1.0, 0.14), []);
  const rubbleGeometry = useMemo(() => new THREE.BoxGeometry(0.12, 0.09, 0.7), []);

  const deckX = gap / 2 + span / 2;

  return (
    <group position={position} rotation={rotation}>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * deckX, 0, 0]}>
          <EdgedMesh geometry={deckGeometry} />
          <EdgedMesh geometry={pillarGeometry} position={[side * (span / 2 - 0.2), -0.55, 0.22]} />
          <EdgedMesh geometry={pillarGeometry} position={[side * (span / 2 - 0.2), -0.55, -0.22]} />

          {/* 파단면 — 계단식으로 부서진 상판 조각 */}
          <mesh position={[-side * (span / 2 + 0.06), -0.045, 0]}>
            <primitive attach="geometry" object={rubbleGeometry} />
            <meshBasicMaterial color={threeColors.error} opacity={0.5} transparent />
          </mesh>
        </group>
      ))}

      <Spark phaseOffsetMs={400} position={[-gap / 2 + 0.05, 0.02, 0.2]} />
      <Spark phaseOffsetMs={1400} position={[gap / 2 - 0.05, 0.02, -0.2]} />
    </group>
  );
}
