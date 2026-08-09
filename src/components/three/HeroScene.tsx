'use client';

import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import { Beam, EdgedMesh, PulsingNode, TravelingPacket, useDutyCyclePulse } from '@/components/three/primitives';
import { threeColors } from '@/lib/three-tokens';

/**
 * Hero 3D 씬 — 마스터 문서 7.1 Visual Direction 을 3D로 재해석.
 * 공장·온실·카메라·센서 노드가 연결된 로우폴리 다이오라마.
 * 카메라 → Edge → 디지털트윈으로 이동하는 패킷이 실제 데이터 파이프라인을 시연한다.
 *
 * 절차적 프리미티브(Box/Cone/Icosahedron)만 사용 — 스톡 3D 에셋이나 인간형 로봇·지구본 없음
 * (마스터 문서 7.1 금지 규정 준수).
 *
 * Canvas는 alpha:false + 배경색 채움으로 아래에 깔린 SVG 폴백을 완전히 가린다
 * (둘을 동시에 겹쳐 보여주지 않는다 — alpha:true였을 때 SVG 텍스트가 비쳐 보이는 문제가 있었다).
 * 조명 계산 비용을 피하기 위해 전 구간 MeshBasicMaterial만 사용하고, 저폴리 형태감은
 * 실제 조명 대신 얇은 엣지 와이어프레임 오버레이로 표현한다.
 */

type NodeId = 'camera' | 'edge' | 'twin';

const NODE_POSITIONS: Record<NodeId, [number, number, number]> = {
  camera: [-1.7, 0.55, 0.55],
  edge: [0, -0.05, 1.25],
  twin: [0, 1.35, -0.15],
};

export function HeroScene({ labels }: { labels: Record<NodeId, string> }) {
  const [activeNode, setActiveNode] = useState<NodeId | null>(null);

  const factoryGeometry = useMemo(() => new THREE.BoxGeometry(1.1, 0.75, 0.85), []);
  const greenhouseBodyGeometry = useMemo(() => new THREE.BoxGeometry(1.05, 0.55, 0.75), []);
  const greenhouseRoofGeometry = useMemo(() => new THREE.ConeGeometry(0.72, 0.4, 4), []);

  function selectNode(node: NodeId) {
    return (event: { stopPropagation: () => void }) => {
      event.stopPropagation();
      setActiveNode(node);
    };
  }

  return (
    <Canvas camera={{ position: [4.2, 2.6, 5], fov: 32 }} dpr={[1, 1.5]} frameloop="demand" gl={{ antialias: true, alpha: false }}>
      <color args={[threeColors.bgPrimary]} attach="background" />

      {/* 공장 블록 */}
      <EdgedMesh geometry={factoryGeometry} position={[-1.6, -0.35, 0.35]} />

      {/* 온실 블록 (본체 + 지붕) */}
      <group position={[1.6, -0.35, -0.35]}>
        <EdgedMesh geometry={greenhouseBodyGeometry} />
        <EdgedMesh geometry={greenhouseRoofGeometry} position={[0, 0.5, 0]} rotation={[0, Math.PI / 4, 0]} />
      </group>

      {/* 디지털트윈 패널 — 원본 SVG 의 대시보드 스케치를 3D 패널로 재해석 */}
      <group position={NODE_POSITIONS.twin}>
        <mesh onClick={selectNode('twin')}>
          <boxGeometry args={[1.5, 0.95, 0.04]} />
          <meshBasicMaterial color={threeColors.bgElevated} />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[1.4, 0.86, 0.01]} />
          <meshBasicMaterial color={0x0d2031} />
        </mesh>
        {[0.22, 0.02, -0.18].map((y, index) => (
          <mesh key={y} position={[-0.15 + index * 0.05, y, 0.04]}>
            <boxGeometry args={[0.9 - index * 0.15, 0.06, 0.01]} />
            <meshBasicMaterial color={threeColors.accent} opacity={0.5} transparent />
          </mesh>
        ))}
        <AlertDot />
      </group>

      {/* 현장 노드 — 카메라(공장) · 센서(온실) */}
      <PulsingNode onClick={selectNode('camera')} phaseOffsetMs={0} position={NODE_POSITIONS.camera} />
      <PulsingNode phaseOffsetMs={250} position={[-1.95, 0.35, 0.05]} />
      <PulsingNode phaseOffsetMs={500} position={[1.55, 0.32, -0.05]} />
      <PulsingNode phaseOffsetMs={750} position={[1.25, 0.38, -0.6]} />

      {/* Edge 노드 — 현장과 트윈 사이의 판단 지점 */}
      <PulsingNode
        color={threeColors.accentDeep}
        onClick={selectNode('edge')}
        phaseOffsetMs={1000}
        position={NODE_POSITIONS.edge}
        radius={0.24}
      />

      {/* 연결선 */}
      <Beam from={NODE_POSITIONS.camera} to={NODE_POSITIONS.edge} />
      <Beam from={[1.55, 0.32, -0.05]} to={NODE_POSITIONS.edge} />
      <Beam from={NODE_POSITIONS.edge} to={NODE_POSITIONS.twin} />

      {/* 파이프라인 시연 — 카메라 → Edge → 디지털트윈 */}
      <TravelingPacket waypoints={[NODE_POSITIONS.camera, NODE_POSITIONS.edge, NODE_POSITIONS.twin]} />

      {activeNode ? (
        <Html position={NODE_POSITIONS[activeNode]} style={{ pointerEvents: 'none' }} zIndexRange={[10, 0]}>
          <span className="-translate-x-1/2 -translate-y-[140%] whitespace-nowrap rounded-badge border border-accent/40 bg-bg-primary/95 px-3 py-1.5 text-[12px] font-semibold text-accent shadow-lg">
            {labels[activeNode]}
          </span>
        </Html>
      ) : null}

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.6}
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={Math.PI / 4}
        onStart={() => setActiveNode(null)}
        target={[0, 0.35, 0]}
      />
    </Canvas>
  );
}

/** 트윈 패널의 알림 점 — 패킷 도착 타이밍과 얼추 맞춘 자체 듀티사이클로 깜빡인다. */
function AlertDot() {
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const intensity = useDutyCyclePulse(700, 5000, 1900);

  useFrame(() => {
    if (materialRef.current) materialRef.current.opacity = 0.4 + intensity.current * 0.6;
  });

  return (
    <mesh position={[0.62, 0.32, 0.05]}>
      <icosahedronGeometry args={[0.05, 0]} />
      <meshBasicMaterial color={threeColors.warning} opacity={0.4} ref={materialRef} transparent />
    </mesh>
  );
}
