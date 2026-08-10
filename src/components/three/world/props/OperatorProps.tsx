'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { EdgedMesh, useDutyCyclePulse } from '@/components/three/primitives';
import { threeColors } from '@/lib/three-tokens';

/**
 * OPERATOR 스테이션 소품 — 관제 콘솔.
 *
 * "운영자가 실제로 사용하는 화면과 알림" 카피에 대응한다. 곡면으로 배치한 3면 모니터와
 * 빈 의자로 "사람이 앉아 운영하는 자리"를 나타내되, 인물 모델은 만들지 않는다
 * (마스터 문서 13.9 휴머노이드 금지와 같은 이유 — 빈 의자가 오히려 초대의 의미를 준다).
 */

/** 모니터 화면 안의 대시보드 막대 — 화면이 켜져 있고 데이터가 흐른다는 표시. */
function ScreenContent({ width, height, phaseOffsetMs }: { width: number; height: number; phaseOffsetMs: number }) {
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const intensity = useDutyCyclePulse(600, 3000, phaseOffsetMs);

  useFrame(() => {
    if (materialRef.current) materialRef.current.opacity = 0.45 + intensity.current * 0.55;
  });

  const bars = [0.62, 0.44, 0.72, 0.32];

  return (
    <group position={[0, 0, 0.023]}>
      {bars.map((w, i) => (
        <mesh key={i} position={[-width * 0.12, height * 0.26 - i * height * 0.16, 0]}>
          <boxGeometry args={[width * w, height * 0.07, 0.004]} />
          {/* 모니터 안의 막대는 화면 픽셀이므로 emissive — 주변 조명과 무관하게 스스로 빛난다 */}
          <meshStandardMaterial
            color={0x03161c}
            emissive={threeColors.accent}
            emissiveIntensity={1.1 - i * 0.16}
            roughness={1}
          />
        </mesh>
      ))}
      {/* 알림 점 — 카피의 "알림"에 대응 */}
      <mesh position={[width * 0.34, height * 0.3, 0]}>
        <sphereGeometry args={[height * 0.05, 6, 6]} />
        <meshBasicMaterial color={threeColors.warning} opacity={0.5} ref={materialRef} transparent />
      </mesh>
    </group>
  );
}

export function ControlConsole({
  position,
  rotation,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  const deskTopGeometry = useMemo(() => new THREE.BoxGeometry(2.5, 0.07, 0.92), []);
  const deskPanelGeometry = useMemo(() => new THREE.BoxGeometry(2.5, 0.46, 0.06), []);
  const legGeometry = useMemo(() => new THREE.BoxGeometry(0.08, 0.72, 0.08), []);
  const monitorGeometry = useMemo(() => new THREE.BoxGeometry(0.82, 0.5, 0.04), []);
  const standGeometry = useMemo(() => new THREE.BoxGeometry(0.07, 0.22, 0.07), []);
  const keyboardGeometry = useMemo(() => new THREE.BoxGeometry(0.62, 0.02, 0.2), []);

  const seatGeometry = useMemo(() => new THREE.BoxGeometry(0.44, 0.07, 0.44), []);
  const backGeometry = useMemo(() => new THREE.BoxGeometry(0.44, 0.5, 0.06), []);
  const chairPostGeometry = useMemo(() => new THREE.CylinderGeometry(0.045, 0.045, 0.32, 6), []);
  const chairFootGeometry = useMemo(() => new THREE.BoxGeometry(0.44, 0.04, 0.06), []);

  const deskY = 0.76;

  // 3면 곡면 배치 — 가운데는 정면, 양옆은 안쪽으로 살짝 돌린다.
  const monitors: Array<{ position: [number, number, number]; rotation: [number, number, number] }> = [
    { position: [-0.86, deskY + 0.4, -0.24], rotation: [0, 0.42, 0] },
    { position: [0, deskY + 0.44, -0.34], rotation: [0, 0, 0] },
    { position: [0.86, deskY + 0.4, -0.24], rotation: [0, -0.42, 0] },
  ];

  return (
    <group position={position} rotation={rotation}>
      {/* 책상 */}
      <EdgedMesh geometry={deskTopGeometry} position={[0, deskY, 0]} />
      <EdgedMesh geometry={deskPanelGeometry} position={[0, deskY - 0.26, -0.42]} />
      {[-1.15, 1.15].map((x) => (
        <EdgedMesh geometry={legGeometry} key={x} position={[x, 0.36, 0.36]} />
      ))}

      {/* 모니터 3면 */}
      {monitors.map((m, i) => (
        <group key={i} position={m.position} rotation={m.rotation}>
          <EdgedMesh geometry={monitorGeometry} />
          <ScreenContent height={0.5} phaseOffsetMs={i * 800} width={0.82} />
          <EdgedMesh geometry={standGeometry} position={[0, -0.36, 0]} />
        </group>
      ))}

      {/* 키보드 */}
      <mesh position={[0, deskY + 0.045, 0.22]}>
        <primitive attach="geometry" object={keyboardGeometry} />
        <meshStandardMaterial color={threeColors.bgElevated} metalness={0.4} roughness={0.7} />
      </mesh>

      {/* 빈 의자 */}
      <group position={[0, 0, 0.95]}>
        <EdgedMesh geometry={seatGeometry} position={[0, 0.46, 0]} />
        <EdgedMesh geometry={backGeometry} position={[0, 0.74, 0.19]} rotation={[0.16, 0, 0]} />
        <EdgedMesh geometry={chairPostGeometry} position={[0, 0.27, 0]} />
        {[0, Math.PI / 2.5, -Math.PI / 2.5].map((angle) => (
          <mesh key={angle} position={[0, 0.1, 0]} rotation={[0, angle, 0]}>
            <primitive attach="geometry" object={chairFootGeometry} />
            <meshStandardMaterial color={threeColors.structure} metalness={0.6} roughness={0.55} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
