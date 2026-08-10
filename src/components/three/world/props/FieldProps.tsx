'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { EdgedMesh, useDutyCyclePulse } from '@/components/three/primitives';
import { cloneWithRepeat, getCorrugationTexture, getPanelTexture } from '@/components/three/world/materials';
import { threeColors } from '@/lib/three-tokens';

/**
 * FIELD 스테이션 소품 — "제조·산업안전·스마트팜·시설 운영 현장" 카피가 곧바로 읽히도록
 * 실제 산업 설비의 실루엣을 절차적으로 만든다.
 *
 * 설계 원칙:
 *  - 조명 없음(MeshBasicMaterial) + EdgedMesh 엣지 와이어프레임이라는 기존 시각 언어 유지.
 *  - 실루엣만으로 정체를 알 수 있어야 한다 — 톱니 지붕=공장, 아치 터널=온실, 뷰 콘=카메라.
 *  - 원통은 세그먼트를 6~10으로 낮춘다. EdgesGeometry가 기본 1° 임계각이라 고세그먼트
 *    원통에서는 옆면 전체가 선으로 뒤덮여 지저분해지고 드로우콜도 커진다.
 */

const EDGE_COLOR = threeColors.accent;

/** 작은 발광점 — 후처리 Bloom(luminanceThreshold 0.25)이 잡아내 "켜져 있음"을 표현한다. */
function Glow({ position, size = 0.03, color = threeColors.accentHover }: { position: [number, number, number]; size?: number; color?: number }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 6, 6]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

/** 깜빡이는 상태 LED — 장비가 "살아서 동작 중"임을 보여준다. */
function StatusLed({ position, phaseOffsetMs = 0, color = threeColors.accentHover, size = 0.022 }: { position: [number, number, number]; phaseOffsetMs?: number; color?: number; size?: number }) {
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const intensity = useDutyCyclePulse(500, 2600, phaseOffsetMs);

  useFrame(() => {
    if (materialRef.current) materialRef.current.opacity = 0.25 + intensity.current * 0.75;
  });

  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 6, 6]} />
      <meshBasicMaterial color={color} opacity={0.3} ref={materialRef} transparent />
    </mesh>
  );
}

/**
 * 공장동 — 톱니 지붕(sawtooth roof)이 공장을 나타내는 가장 보편적인 실루엣이라
 * 단순 박스 대신 이 프로파일을 압출해서 만든다. 굴뚝 2기와 출입구를 덧붙인다.
 */
export function Factory({
  position,
  width = 3.6,
  height = 1.7,
  depth = 2.8,
}: {
  position: [number, number, number];
  width?: number;
  height?: number;
  depth?: number;
}) {
  const hallGeometry = useMemo(() => new THREE.BoxGeometry(width, height, depth), [width, height, depth]);

  const roofGeometry = useMemo(() => {
    const teeth = 4;
    const toothWidth = width / teeth;
    const toothHeight = 0.42;

    // 톱니 프로파일: 수직 상승(채광창면) → 완만한 하강을 반복한다.
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    for (let i = 0; i < teeth; i++) {
      const x0 = i * toothWidth;
      shape.lineTo(x0, toothHeight);
      shape.lineTo(x0 + toothWidth, 0);
    }
    shape.lineTo(width, -0.06);
    shape.lineTo(0, -0.06);
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false });
    geometry.translate(-width / 2, 0, -depth / 2);
    return geometry;
  }, [width, depth]);

  const stackGeometry = useMemo(() => new THREE.CylinderGeometry(0.11, 0.14, 1.15, 8), []);
  const doorGeometry = useMemo(() => new THREE.BoxGeometry(0.72, 0.62, 0.04), []);

  // 외벽 골판 — 큰 평면이 단색이면 조명을 넣어도 여전히 밋밋하다. 세로 줄무늬가 들어가면
  // 면 안에서도 밝기가 변해 금속 외장처럼 읽힌다.
  const wallMap = useMemo(() => cloneWithRepeat(getCorrugationTexture(), Math.round(width * 2), 2), [width]);

  return (
    <group position={position}>
      <EdgedMesh geometry={hallGeometry} map={wallMap} metalness={0.5} position={[0, height / 2, 0]} roughness={0.72} />
      <EdgedMesh geometry={roofGeometry} metalness={0.6} position={[0, height, 0]} roughness={0.55} />

      {/* 굴뚝 — 공장이라는 판독을 결정적으로 만든다 */}
      <EdgedMesh geometry={stackGeometry} position={[-width * 0.34, height + 0.95, -depth * 0.28]} />
      <EdgedMesh geometry={stackGeometry} position={[-width * 0.34 + 0.42, height + 0.82, -depth * 0.28]} />

      {/* 출입구(적재 도어) — 정면 판별용 */}
      <mesh position={[width * 0.2, 0.31, depth / 2 + 0.01]}>
        <primitive attach="geometry" object={doorGeometry} />
        <meshBasicMaterial color={threeColors.bgElevated} />
      </mesh>

      <StatusLed phaseOffsetMs={0} position={[-width * 0.34, height + 1.56, -depth * 0.28]} color={threeColors.warning} />
    </group>
  );
}

/**
 * 온실(비닐하우스) — 반원통 아치 터널이 스마트팜을 나타내는 표준 실루엣이다.
 * 아치 리브와 내부 재배 베드를 넣어 "농업 시설"이라는 판독을 강화한다.
 */
export function Greenhouse({
  position,
  radius = 0.85,
  length = 2.6,
}: {
  position: [number, number, number];
  radius?: number;
  length?: number;
}) {
  // 반원통: thetaStart=-90°, thetaLength=180° → z≥0 절반. rotation X=-90°로 축을 Z로 눕히면 위쪽 돔이 된다.
  const shellGeometry = useMemo(
    () => new THREE.CylinderGeometry(radius, radius, length, 10, 1, true, -Math.PI / 2, Math.PI),
    [radius, length],
  );
  const ribGeometry = useMemo(() => new THREE.TorusGeometry(radius, 0.02, 5, 14, Math.PI), [radius]);
  const endWallGeometry = useMemo(() => new THREE.CircleGeometry(radius, 12, 0, Math.PI), [radius]);
  const bedGeometry = useMemo(() => new THREE.BoxGeometry(0.3, 0.1, length * 0.82), [length]);

  const ribPositions = useMemo(() => {
    const count = 4;
    return Array.from({ length: count }, (_, i) => -length / 2 + (length / (count - 1)) * i);
  }, [length]);

  return (
    <group position={position}>
      {/* 아치 쉘 — 반투명으로 내부가 비쳐 "온실"임이 드러난다 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <primitive attach="geometry" object={shellGeometry} />
        {/* 온실 외피는 유리 — roughness를 낮춰 환경맵 반사가 맺히게 하면 "판유리"로 읽힌다 */}
        <meshStandardMaterial
          color={threeColors.structure}
          metalness={0.1}
          opacity={0.34}
          roughness={0.14}
          side={THREE.DoubleSide}
          transparent
        />
      </mesh>

      {/* 아치 리브 */}
      {ribPositions.map((z) => (
        <mesh key={z} position={[0, 0, z]}>
          <primitive attach="geometry" object={ribGeometry} />
          <meshBasicMaterial color={EDGE_COLOR} opacity={0.55} transparent />
        </mesh>
      ))}

      {/* 양쪽 끝벽 */}
      {[length / 2, -length / 2].map((z) => (
        <mesh key={z} position={[0, 0, z]}>
          <primitive attach="geometry" object={endWallGeometry} />
          <meshBasicMaterial color={threeColors.bgElevated} opacity={0.55} side={THREE.DoubleSide} transparent />
        </mesh>
      ))}

      {/* 내부 재배 베드 2열 */}
      <mesh position={[-radius * 0.42, 0.05, 0]}>
        <primitive attach="geometry" object={bedGeometry} />
        <meshBasicMaterial color={threeColors.accentDeep} opacity={0.8} transparent />
      </mesh>
      <mesh position={[radius * 0.42, 0.05, 0]}>
        <primitive attach="geometry" object={bedGeometry} />
        <meshBasicMaterial color={threeColors.accentDeep} opacity={0.8} transparent />
      </mesh>
    </group>
  );
}

/**
 * CCTV 카메라 — 폴·암·바디·렌즈에 더해 **시야 콘**을 그린다.
 * 이 시야 콘이 "이 장비는 무언가를 감시한다"는 의미를 결정적으로 전달한다(산업안전·관제 카피와 직결).
 */
export function CctvCamera({
  position,
  rotation,
  poleHeight = 1.5,
  showViewCone = true,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  poleHeight?: number;
  showViewCone?: boolean;
}) {
  const poleGeometry = useMemo(() => new THREE.CylinderGeometry(0.028, 0.036, poleHeight, 6), [poleHeight]);
  const armGeometry = useMemo(() => new THREE.BoxGeometry(0.3, 0.04, 0.04), []);
  const bodyGeometry = useMemo(() => new THREE.BoxGeometry(0.24, 0.12, 0.13), []);
  const lensGeometry = useMemo(() => new THREE.CylinderGeometry(0.045, 0.052, 0.07, 8), []);
  const coneGeometry = useMemo(() => new THREE.ConeGeometry(0.42, 1.5, 4, 1, true), []);

  const headY = poleHeight;
  const bodyX = 0.24;

  return (
    <group position={position} rotation={rotation}>
      <EdgedMesh geometry={poleGeometry} position={[0, poleHeight / 2, 0]} />
      <EdgedMesh geometry={armGeometry} position={[0.14, headY, 0]} />
      <EdgedMesh geometry={bodyGeometry} position={[bodyX, headY - 0.04, 0]} />

      {/* 렌즈 — +X 방향을 향한다 */}
      <mesh position={[bodyX + 0.15, headY - 0.04, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <primitive attach="geometry" object={lensGeometry} />
        <meshBasicMaterial color={threeColors.bgPrimary} />
      </mesh>
      <Glow position={[bodyX + 0.19, headY - 0.04, 0]} size={0.026} />
      <StatusLed phaseOffsetMs={300} position={[bodyX - 0.09, headY + 0.02, 0.07]} color={threeColors.error} size={0.016} />

      {/* 시야 콘 — 아주 옅게. 카메라가 "보고 있는 영역"을 나타낸다. */}
      {showViewCone ? (
        <mesh position={[bodyX + 0.88, headY - 0.22, 0]} rotation={[0, 0, -Math.PI / 2 - 0.18]}>
          <primitive attach="geometry" object={coneGeometry} />
          <meshBasicMaterial color={threeColors.accent} depthWrite={false} opacity={0.07} side={THREE.DoubleSide} transparent />
        </mesh>
      ) : null}
    </group>
  );
}

/**
 * 환경 센서 폴 — 실제 기상·환경 센서의 특징인 방사차폐판(겹겹이 쌓인 원반)을 재현한다.
 * 스마트팜 카피의 "온도·습도·조도·CO₂" 수집 지점을 나타낸다.
 */
export function SensorPost({ position, poleHeight = 1.1 }: { position: [number, number, number]; poleHeight?: number }) {
  const poleGeometry = useMemo(() => new THREE.CylinderGeometry(0.022, 0.028, poleHeight, 6), [poleHeight]);
  const shieldGeometry = useMemo(() => new THREE.CylinderGeometry(0.1, 0.12, 0.022, 8), []);
  const headGeometry = useMemo(() => new THREE.BoxGeometry(0.11, 0.1, 0.09), []);

  const shieldYs = [0, 0.045, 0.09, 0.135];

  return (
    <group position={position}>
      <EdgedMesh geometry={poleGeometry} position={[0, poleHeight / 2, 0]} />

      {/* 방사차폐판 스택 */}
      {shieldYs.map((dy) => (
        <mesh key={dy} position={[0, poleHeight - 0.02 - dy, 0]}>
          <primitive attach="geometry" object={shieldGeometry} />
          <meshStandardMaterial color={threeColors.structure} metalness={0.6} roughness={0.5} />
        </mesh>
      ))}

      <EdgedMesh geometry={headGeometry} position={[0, poleHeight + 0.12, 0]} />
      <StatusLed phaseOffsetMs={700} position={[0, poleHeight + 0.19, 0.03]} />
    </group>
  );
}

/**
 * 산업용 로봇 암 — architectureLayers의 '로봇' 노드에 대응.
 * 관절이 천천히 움직여 "가동 중인 설비"임을 보여준다. 인간형이 아닌 매니퓰레이터라
 * 마스터 문서 13.9(휴머노이드 로봇 금지)와 충돌하지 않는다.
 */
export function RobotArm({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const shoulderRef = useRef<THREE.Group>(null);
  const elbowRef = useRef<THREE.Group>(null);

  const baseGeometry = useMemo(() => new THREE.CylinderGeometry(0.17, 0.21, 0.1, 8), []);
  const columnGeometry = useMemo(() => new THREE.CylinderGeometry(0.075, 0.085, 0.26, 6), []);
  const jointGeometry = useMemo(() => new THREE.IcosahedronGeometry(0.085, 0), []);
  const upperArmGeometry = useMemo(() => new THREE.BoxGeometry(0.52, 0.088, 0.088), []);
  const forearmGeometry = useMemo(() => new THREE.BoxGeometry(0.4, 0.07, 0.07), []);
  const gripperGeometry = useMemo(() => new THREE.BoxGeometry(0.05, 0.13, 0.03), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (shoulderRef.current) shoulderRef.current.rotation.z = -0.5 + Math.sin(t * 0.35) * 0.28;
    if (elbowRef.current) elbowRef.current.rotation.z = 0.85 + Math.sin(t * 0.35 + 1.1) * 0.35;
  });

  return (
    <group position={position} scale={scale}>
      <EdgedMesh geometry={baseGeometry} position={[0, 0.05, 0]} />
      <EdgedMesh geometry={columnGeometry} position={[0, 0.23, 0]} />

      <group position={[0, 0.36, 0]} ref={shoulderRef}>
        <mesh>
          <primitive attach="geometry" object={jointGeometry} />
          <meshStandardMaterial color={threeColors.accentDeep} metalness={0.55} roughness={0.4} />
        </mesh>
        <EdgedMesh geometry={upperArmGeometry} position={[0.26, 0, 0]} />

        <group position={[0.52, 0, 0]} ref={elbowRef}>
          <mesh>
            <primitive attach="geometry" object={jointGeometry} />
            <meshStandardMaterial color={threeColors.accentDeep} metalness={0.55} roughness={0.4} />
          </mesh>
          <EdgedMesh geometry={forearmGeometry} position={[0.2, 0, 0]} />

          {/* 그리퍼 — 두 갈래 집게 */}
          <EdgedMesh geometry={gripperGeometry} position={[0.42, 0.05, 0]} />
          <EdgedMesh geometry={gripperGeometry} position={[0.42, -0.05, 0]} />
          <Glow position={[0.47, 0, 0]} size={0.022} />
        </group>
      </group>
    </group>
  );
}

/**
 * PLC 제어반 — 문 분할선·환기 슬롯·상태 LED 열로 "제어 캐비닛"임을 드러낸다.
 * '기존 설비와 연결' 카피에서 연결 대상이 되는 레거시 장비를 대표한다.
 */
export function PlcCabinet({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  const bodyGeometry = useMemo(() => new THREE.BoxGeometry(0.44, 0.72, 0.3), []);
  const ventGeometry = useMemo(() => new THREE.BoxGeometry(0.26, 0.018, 0.01), []);
  const doorLineGeometry = useMemo(() => new THREE.BoxGeometry(0.008, 0.66, 0.01), []);
  const panelMap = useMemo(() => cloneWithRepeat(getPanelTexture(), 1, 1), []);

  return (
    <group position={position} rotation={rotation}>
      <EdgedMesh geometry={bodyGeometry} map={panelMap} metalness={0.68} position={[0, 0.36, 0]} roughness={0.5} />

      {/* 문 분할선 */}
      <mesh position={[0, 0.36, 0.151]}>
        <primitive attach="geometry" object={doorLineGeometry} />
        <meshBasicMaterial color={threeColors.bgPrimary} />
      </mesh>

      {/* 환기 슬롯 */}
      {[0.62, 0.585, 0.55].map((y) => (
        <mesh key={y} position={[0, y, 0.151]}>
          <primitive attach="geometry" object={ventGeometry} />
          <meshBasicMaterial color={threeColors.bgPrimary} />
        </mesh>
      ))}

      {/* 상태 LED 열 */}
      <StatusLed phaseOffsetMs={0} position={[-0.14, 0.44, 0.152]} size={0.017} />
      <StatusLed phaseOffsetMs={900} position={[-0.08, 0.44, 0.152]} color={threeColors.warning} size={0.017} />
      <StatusLed phaseOffsetMs={1800} position={[-0.02, 0.44, 0.152]} size={0.017} />
    </group>
  );
}
