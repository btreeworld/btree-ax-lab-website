'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { EdgedMesh } from '@/components/three/primitives';
import { threeColors } from '@/lib/three-tokens';

/**
 * TWIN 스테이션 소품 — 홀로그램 투사대.
 *
 * TwinStation은 FIELD의 축소 복제본을 보여주는데, 그 복제본이 그냥 공중에 떠 있으면
 * "또 다른 현장"으로 오해된다. 아래에 투사대와 광추(light cone)를 깔아주면 비로소
 * "이것은 실물이 아니라 투사된 사본"이라는 의미가 성립한다 — 즉 디지털트윈이라는
 * 카피가 형태로 증명된다.
 */
export function HoloPedestal({
  position,
  baseRadius = 1.05,
  coneHeight = 2.4,
  topRadius = 2.0,
}: {
  position: [number, number, number];
  baseRadius?: number;
  coneHeight?: number;
  topRadius?: number;
}) {
  const scanRef = useRef<THREE.Mesh>(null);

  const baseGeometry = useMemo(() => new THREE.CylinderGeometry(baseRadius * 0.86, baseRadius, 0.16, 12), [baseRadius]);
  const emitterGeometry = useMemo(() => new THREE.TorusGeometry(baseRadius * 0.72, 0.03, 6, 20), [baseRadius]);
  // 위로 갈수록 넓어지는 열린 원뿔대 — ConeGeometry는 반지름이 하나뿐이라 Cylinder로 만든다.
  const coneGeometry = useMemo(
    () => new THREE.CylinderGeometry(topRadius, baseRadius * 0.72, coneHeight, 14, 1, true),
    [topRadius, baseRadius, coneHeight],
  );
  const scanGeometry = useMemo(() => new THREE.TorusGeometry(1, 0.012, 5, 20), []);

  useFrame((state) => {
    const scan = scanRef.current;
    if (!scan) return;
    // 광추를 따라 위로 훑고 올라가며, 높이에 맞춰 반지름도 넓어진다.
    const t = (state.clock.elapsedTime * 0.32) % 1;
    scan.position.y = 0.16 + t * coneHeight;
    const radius = baseRadius * 0.72 + (topRadius - baseRadius * 0.72) * t;
    scan.scale.setScalar(radius);
    (scan.material as THREE.MeshBasicMaterial).opacity = 0.5 * (1 - t);
  });

  return (
    <group position={position}>
      <EdgedMesh geometry={baseGeometry} position={[0, 0.08, 0]} />

      {/* 이미터 링 */}
      <mesh position={[0, 0.17, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <primitive attach="geometry" object={emitterGeometry} />
        <meshBasicMaterial color={threeColors.accent} opacity={0.85} transparent />
      </mesh>

      {/* 광추 — 아주 옅게. 이 안에 트윈 복제본이 놓인다.
          BackSide만 그린다: DoubleSide로 하면 앞·뒷면이 겹쳐 불투명도가 두 배로 쌓여
          속이 비치는 광추가 아니라 불투명한 깔때기처럼 보였다(실측 확인). 뒷벽만 남기면
          내부의 복제본이 가려지지 않으면서 부피감은 그대로 유지된다. */}
      <mesh position={[0, 0.17 + coneHeight / 2, 0]}>
        <primitive attach="geometry" object={coneGeometry} />
        <meshBasicMaterial
          color={threeColors.accent}
          depthWrite={false}
          opacity={0.05}
          side={THREE.BackSide}
          transparent
        />
      </mesh>

      {/* 상승 스캔 링 */}
      <mesh position={[0, 0.16, 0]} ref={scanRef} rotation={[Math.PI / 2, 0, 0]}>
        <primitive attach="geometry" object={scanGeometry} />
        <meshBasicMaterial color={threeColors.accentHover} depthWrite={false} opacity={0.5} transparent />
      </mesh>
    </group>
  );
}
