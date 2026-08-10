'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { EdgedMesh, useDutyCyclePulse } from '@/components/three/primitives';
import { cloneWithRepeat, getPanelTexture } from '@/components/three/world/materials';
import { threeColors } from '@/lib/three-tokens';

/**
 * EDGE 스테이션 소품 — "엣지에서 판단합니다" 카피에 대응.
 *
 *  · EdgeGateway     → 방열핀·안테나·포트를 갖춘 실제 엣지 게이트웨이 장비
 *  · InferenceLattice → 층을 따라 신호가 전파되는 추론 격자
 *
 * 추론 표현에 뇌·두뇌 형태를 쓰지 않는다(마스터 문서 13.9 금지 조항). 대신 "층을 통과하며
 * 원시 입력이 분류된 출력이 된다"는 연산 구조 자체를 격자와 전파로 보여준다.
 */

function StatusLed({ position, phaseOffsetMs = 0, color = threeColors.accentHover, size = 0.02 }: { position: [number, number, number]; phaseOffsetMs?: number; color?: number; size?: number }) {
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const intensity = useDutyCyclePulse(420, 2200, phaseOffsetMs);

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
 * 엣지 게이트웨이 — 랙 마운트형 소형 장비.
 * 방열핀(상단 반복 리브)·안테나·전면 포트열이 "현장에 설치되는 연산 장비"임을 즉시 읽히게 한다.
 */
export function EdgeGateway({
  position,
  rotation,
  width = 1.1,
  height = 0.3,
  depth = 0.72,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
  depth?: number;
}) {
  const chassisGeometry = useMemo(() => new THREE.BoxGeometry(width, height, depth), [width, height, depth]);
  const finGeometry = useMemo(() => new THREE.BoxGeometry(width * 0.82, 0.075, 0.022), [width]);
  const antennaGeometry = useMemo(() => new THREE.CylinderGeometry(0.011, 0.014, 0.42, 6), []);
  const portGeometry = useMemo(() => new THREE.BoxGeometry(0.058, 0.042, 0.018), []);
  const footGeometry = useMemo(() => new THREE.BoxGeometry(0.07, 0.05, 0.07), []);

  const finZs = useMemo(() => Array.from({ length: 7 }, (_, i) => -depth * 0.3 + i * (depth * 0.6) / 6), [depth]);
  const portXs = useMemo(() => Array.from({ length: 4 }, (_, i) => -width * 0.28 + i * 0.085), [width]);
  const panelMap = useMemo(() => cloneWithRepeat(getPanelTexture(), 1, 1), []);

  return (
    <group position={position} rotation={rotation}>
      {/* 랙 마운트 장비는 도장 금속이라 반사가 또렷한 편 — roughness를 낮춰 하이라이트를 살린다 */}
      <EdgedMesh geometry={chassisGeometry} map={panelMap} metalness={0.72} position={[0, height / 2, 0]} roughness={0.38} />

      {/* 방열핀 */}
      {finZs.map((z) => (
        <mesh key={z} position={[0, height + 0.036, z]}>
          <primitive attach="geometry" object={finGeometry} />
          <meshStandardMaterial color={threeColors.structure} metalness={0.7} roughness={0.42} />
        </mesh>
      ))}

      {/* 안테나 2본 */}
      {[-width * 0.42, width * 0.42].map((x, i) => (
        <group key={x} position={[x, height, -depth * 0.34]}>
          <mesh position={[0, 0.21, 0]} rotation={[0, 0, i === 0 ? 0.16 : -0.16]}>
            <primitive attach="geometry" object={antennaGeometry} />
            <meshStandardMaterial color={threeColors.structure} metalness={0.7} roughness={0.42} />
          </mesh>
          <mesh position={[i === 0 ? 0.07 : -0.07, 0.42, 0]}>
            <sphereGeometry args={[0.022, 6, 6]} />
            <meshBasicMaterial color={threeColors.accentHover} />
          </mesh>
        </group>
      ))}

      {/* 전면 포트열 + 상태 LED */}
      {portXs.map((x) => (
        <mesh key={x} position={[x, height * 0.45, depth / 2 + 0.005]}>
          <primitive attach="geometry" object={portGeometry} />
          <meshBasicMaterial color={threeColors.bgPrimary} />
        </mesh>
      ))}
      <StatusLed phaseOffsetMs={0} position={[width * 0.36, height * 0.45, depth / 2 + 0.012]} />
      <StatusLed phaseOffsetMs={800} position={[width * 0.42, height * 0.45, depth / 2 + 0.012]} color={threeColors.warning} />

      {/* 설치 발 */}
      {[
        [-width * 0.4, -depth * 0.32],
        [width * 0.4, -depth * 0.32],
        [-width * 0.4, depth * 0.32],
        [width * 0.4, depth * 0.32],
      ].map(([x, z]) => (
        <mesh key={`${x}:${z}`} position={[x, 0.025, z]}>
          <primitive attach="geometry" object={footGeometry} />
          <meshBasicMaterial color={threeColors.bgElevated} />
        </mesh>
      ))}
    </group>
  );
}

const LAYERS = 3;
const GRID = 3;

/**
 * 추론 격자 — 3개 층(3×3 노드)을 Z축으로 배치하고, 신호가 층에서 층으로 순차 전파된다.
 * 카메라가 EDGE 구간에서 이 격자들을 통과해 지나가므로 "추론 내부를 통과한다"는 체험이 된다.
 *
 * 연결선은 층마다 개별 Line 객체를 만들면 드로우콜이 수십 개로 늘어나므로,
 * 전체 연결을 하나의 BufferGeometry(LineSegments)로 합쳐 드로우콜 1개로 그린다.
 */
export function InferenceLattice({
  position,
  spread = 0.42,
  layerGap = 0.62,
}: {
  position: [number, number, number];
  spread?: number;
  layerGap?: number;
}) {
  const nodeRefs = useRef<Array<THREE.Mesh | null>>([]);

  const nodes = useMemo(() => {
    const result: Array<{ layer: number; position: [number, number, number] }> = [];
    for (let l = 0; l < LAYERS; l++) {
      for (let i = 0; i < GRID; i++) {
        for (let j = 0; j < GRID; j++) {
          result.push({
            layer: l,
            position: [
              (i - (GRID - 1) / 2) * spread,
              (j - (GRID - 1) / 2) * spread,
              (l - (LAYERS - 1) / 2) * layerGap,
            ],
          });
        }
      }
    }
    return result;
  }, [spread, layerGap]);

  // 층간 희소 연결 — 완전연결(9×9)은 선이 너무 많아 형태를 오히려 뭉갠다.
  const linkGeometry = useMemo(() => {
    const perLayer = GRID * GRID;
    const points: number[] = [];

    for (let l = 0; l < LAYERS - 1; l++) {
      for (let n = 0; n < perLayer; n++) {
        const from = nodes[l * perLayer + n].position;
        for (let k = 0; k < 2; k++) {
          const target = (n * 2 + k * 3 + 1) % perLayer;
          const to = nodes[(l + 1) * perLayer + target].position;
          points.push(from[0], from[1], from[2], to[0], to[1], to[2]);
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    return geometry;
  }, [nodes]);

  useFrame((state) => {
    // 1.1초에 한 층씩 앞으로 전파.
    const activeLayer = Math.floor((state.clock.elapsedTime / 1.1) % LAYERS);

    nodes.forEach((node, index) => {
      const mesh = nodeRefs.current[index];
      if (!mesh) return;
      const isActive = node.layer === activeLayer;
      const material = mesh.material as THREE.MeshBasicMaterial;
      const targetScale = isActive ? 1.7 : 1;
      const targetOpacity = isActive ? 1 : 0.32;
      mesh.scale.setScalar(THREE.MathUtils.lerp(mesh.scale.x, targetScale, 0.14));
      material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, 0.14);
    });
  });

  return (
    <group position={position}>
      <lineSegments geometry={linkGeometry}>
        <lineBasicMaterial color={threeColors.accentDeep} opacity={0.3} transparent />
      </lineSegments>

      {nodes.map((node, index) => (
        <mesh
          key={index}
          position={node.position}
          ref={(mesh) => {
            nodeRefs.current[index] = mesh;
          }}
        >
          <sphereGeometry args={[0.036, 7, 7]} />
          <meshBasicMaterial color={threeColors.accentHover} opacity={0.32} transparent />
        </mesh>
      ))}
    </group>
  );
}
