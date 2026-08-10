'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { EdgedMesh, useDutyCyclePulse } from '@/components/three/primitives';
import { cloneWithRepeat, getPanelTexture } from '@/components/three/world/materials';
import { threeColors } from '@/lib/three-tokens';

/**
 * PLATFORM 스테이션 소품 — architectureLayers[2].nodes 4개에 1:1로 대응시킨다.
 *
 *  · 통합 API   → GatewayRing   (여러 유입을 하나의 링으로 통과시킴)
 *  · 데이터 저장 → DatabaseStack (원반을 겹친 보편적 DB 실루엣)
 *  · 규칙 엔진   → RuleEngine    (하나의 입력을 조건에 따라 여러 출구로 분기)
 *  · 권한관리   → AccessGate    (스캔 빔이 오르내리는 통제 게이트)
 *
 * ServerRack은 이 4개를 받쳐주는 인프라 배경으로 뒤쪽에 배치한다.
 */

function StatusLed({ position, phaseOffsetMs = 0, color = threeColors.accentHover, size = 0.016 }: { position: [number, number, number]; phaseOffsetMs?: number; color?: number; size?: number }) {
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const intensity = useDutyCyclePulse(400, 2400, phaseOffsetMs);

  useFrame(() => {
    if (materialRef.current) materialRef.current.opacity = 0.2 + intensity.current * 0.8;
  });

  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 6, 6]} />
      <meshBasicMaterial color={color} opacity={0.3} ref={materialRef} transparent />
    </mesh>
  );
}

/** 통합 API — 데이터 스트림이 통과하는 관문 링. 링이 천천히 자전해 "살아있는 관문"이 된다. */
export function GatewayRing({
  position,
  radius = 0.62,
  rotation,
}: {
  position: [number, number, number];
  radius?: number;
  rotation?: [number, number, number];
}) {
  const ringRef = useRef<THREE.Mesh>(null);
  const ringGeometry = useMemo(() => new THREE.TorusGeometry(radius, 0.045, 8, 24), [radius]);
  const strutGeometry = useMemo(() => new THREE.BoxGeometry(0.05, 0.05, radius * 0.9), [radius]);

  useFrame((_, delta) => {
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.22;
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh ref={ringRef}>
        <primitive attach="geometry" object={ringGeometry} />
        {/* 발광 관문 — emissive를 쓰면 후처리 Bloom이 실제로 번져 "빛나는 링"이 된다 */}
        <meshStandardMaterial color={0x061a1c} emissive={threeColors.accent} emissiveIntensity={1.5} roughness={0.9} />
      </mesh>

      {/* 지지 스트럿 — 링이 공중에 떠 있지 않고 설비의 일부임을 보여준다 */}
      {[0, Math.PI / 2].map((angle) => (
        <mesh key={angle} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]} rotation={[0, 0, angle]}>
          <primitive attach="geometry" object={strutGeometry} />
          <meshStandardMaterial color={threeColors.structure} metalness={0.65} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

/** 데이터 저장 — 원반을 겹친 형태는 데이터베이스를 나타내는 가장 널리 통용되는 기호다. */
export function DatabaseStack({
  position,
  radius = 0.42,
  discs = 3,
}: {
  position: [number, number, number];
  radius?: number;
  discs?: number;
}) {
  const discGeometry = useMemo(() => new THREE.CylinderGeometry(radius, radius, 0.16, 14), [radius]);
  const discYs = useMemo(() => Array.from({ length: discs }, (_, i) => 0.1 + i * 0.24), [discs]);

  return (
    <group position={position}>
      {discYs.map((y, i) => (
        <group key={y}>
          <EdgedMesh geometry={discGeometry} position={[0, y, 0]} />
          <StatusLed phaseOffsetMs={i * 600} position={[radius * 0.72, y + 0.02, radius * 0.72]} />
        </group>
      ))}
    </group>
  );
}

/**
 * 규칙 엔진 — 하나의 입력이 하우징 안의 판별체(팔면체)를 거쳐 3개의 출구로 갈라진다.
 * "조건에 따라 흐름이 나뉜다"는 규칙 엔진의 본질을 구조로 보여준다.
 */
export function RuleEngine({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const housingGeometry = useMemo(() => new THREE.BoxGeometry(0.78, 0.62, 0.62), []);
  const coreGeometry = useMemo(() => new THREE.OctahedronGeometry(0.19, 0), []);
  const chuteGeometry = useMemo(() => new THREE.BoxGeometry(0.42, 0.09, 0.09), []);

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.6;
      coreRef.current.rotation.x += delta * 0.25;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* 하우징 — 내부가 보이도록 반투명 */}
      <mesh position={[0, 0.31, 0]}>
        <primitive attach="geometry" object={housingGeometry} />
        <meshBasicMaterial color={threeColors.structure} opacity={0.3} side={THREE.DoubleSide} transparent />
      </mesh>

      {/* 판별체 */}
      <mesh position={[0, 0.31, 0]} ref={coreRef}>
        <primitive attach="geometry" object={coreGeometry} />
        <meshStandardMaterial color={0x08202a} emissive={threeColors.accentHover} emissiveIntensity={1.3} roughness={0.9} />
      </mesh>

      {/* 분기 출구 3개 */}
      {[0.22, 0, -0.22].map((dy, i) => (
        <mesh key={dy} position={[0.6, 0.31 + dy, 0]} rotation={[0, 0, dy * 0.6]}>
          <primitive attach="geometry" object={chuteGeometry} />
          <meshBasicMaterial color={threeColors.accentDeep} opacity={0.75 - i * 0.12} transparent />
        </mesh>
      ))}
    </group>
  );
}

/** 권한관리 — 통제 게이트. 스캔 빔이 위아래로 훑으며 "검문 중"임을 보여준다. */
export function AccessGate({
  position,
  rotation,
  width = 1.0,
  height = 1.1,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
}) {
  const beamRef = useRef<THREE.Mesh>(null);
  const postGeometry = useMemo(() => new THREE.BoxGeometry(0.1, height, 0.14), [height]);
  const lintelGeometry = useMemo(() => new THREE.BoxGeometry(width + 0.1, 0.11, 0.14), [width]);
  const beamGeometry = useMemo(() => new THREE.PlaneGeometry(width - 0.06, 0.05), [width]);

  useFrame((state) => {
    if (beamRef.current) {
      const t = (Math.sin(state.clock.elapsedTime * 1.3) + 1) / 2;
      beamRef.current.position.y = 0.12 + t * (height - 0.24);
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <EdgedMesh geometry={postGeometry} position={[-width / 2, height / 2, 0]} />
      <EdgedMesh geometry={postGeometry} position={[width / 2, height / 2, 0]} />
      <EdgedMesh geometry={lintelGeometry} position={[0, height + 0.055, 0]} />

      {/* 스캔 빔 */}
      <mesh position={[0, 0.12, 0]} ref={beamRef}>
        <primitive attach="geometry" object={beamGeometry} />
        <meshBasicMaterial color={threeColors.accent} depthWrite={false} opacity={0.5} side={THREE.DoubleSide} transparent />
      </mesh>

      <StatusLed phaseOffsetMs={0} position={[-width / 2, height + 0.055, 0.08]} />
      <StatusLed phaseOffsetMs={1200} position={[width / 2, height + 0.055, 0.08]} />
    </group>
  );
}

/** 서버 랙 — 블레이드 슬롯과 점멸 LED. 플랫폼 계층의 물리적 기반을 배경으로 깔아준다. */
export function ServerRack({
  position,
  rotation,
  height = 1.9,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  height?: number;
}) {
  const cabinetGeometry = useMemo(() => new THREE.BoxGeometry(0.72, height, 0.6), [height]);
  const bladeGeometry = useMemo(() => new THREE.BoxGeometry(0.6, 0.085, 0.02), []);
  const panelMap = useMemo(() => cloneWithRepeat(getPanelTexture(), 1, Math.round(height)), [height]);

  const bladeYs = useMemo(() => {
    const count = 8;
    return Array.from({ length: count }, (_, i) => height * 0.14 + i * (height * 0.72) / (count - 1));
  }, [height]);

  return (
    <group position={position} rotation={rotation}>
      <EdgedMesh geometry={cabinetGeometry} map={panelMap} metalness={0.7} position={[0, height / 2, 0]} roughness={0.45} />

      {bladeYs.map((y, i) => (
        <group key={y}>
          <mesh position={[0, y, 0.301]}>
            <primitive attach="geometry" object={bladeGeometry} />
            <meshBasicMaterial color={threeColors.bgPrimary} />
          </mesh>
          <StatusLed
            color={i % 3 === 0 ? threeColors.warning : threeColors.accentHover}
            phaseOffsetMs={i * 320}
            position={[0.24, y, 0.313]}
            size={0.013}
          />
        </group>
      ))}
    </group>
  );
}
