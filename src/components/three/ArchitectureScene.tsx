'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { DoubleSide } from 'three';
import type * as THREE from 'three';

import { SceneLabel } from '@/components/three/SceneLabel';
import type { ArchitectureLayer } from '@/content/home';
import { threeColors } from '@/lib/three-tokens';

/**
 * 아키텍처 3D 씬 — 마스터 문서 7.7.
 * FIELD → EDGE → PLATFORM → DIGITAL TWIN 4개 레이어를 깊이(Z) 방향으로 배치하고,
 * 스크롤에 맞춰 카메라가 레이어 사이를 통과한다. `<ScrollControls>` 는 페이지 네이티브
 * 스크롤과 충돌해 쓰지 않고, 컨테이너의 실제 위치를 직접 읽어 진행률을 계산한다.
 */

const LAYER_Z = [0, -2.7, -5.4, -8.1];
const CAMERA_START_Z = 2.6;
const CAMERA_END_Z = -9.4;

export function ArchitectureScene({
  layers,
  containerRef,
}: {
  layers: ArchitectureLayer[];
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [activeLayer, setActiveLayer] = useState(-1);

  return (
    <Canvas camera={{ position: [0.6, 0.35, CAMERA_START_Z], fov: 45 }} dpr={[1, 1.5]} frameloop="demand" gl={{ antialias: true, alpha: true }}>
      <hemisphereLight args={[0x2a4a63, 0x07111f, 0.9]} />

      <ScrollDolly containerRef={containerRef} onActiveLayerChange={setActiveLayer} />

      {layers.map((layer, index) => (
        <LayerPlane key={layer.id} layer={layer} z={LAYER_Z[index] ?? 0} />
      ))}

      {activeLayer >= 0 && layers[activeLayer] ? (
        <SceneLabel center position={[0, 1.25, LAYER_Z[activeLayer]]} style={{ pointerEvents: 'none' }}>
          <div className="w-[240px] rounded-card border border-accent/30 bg-bg-primary/95 px-4 py-3 text-center shadow-xl">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-accent">{layers[activeLayer].label}</p>
            <p className="mt-1 text-[13px] leading-snug text-ink-secondary-dark">{layers[activeLayer].description}</p>
          </div>
        </SceneLabel>
      ) : null}
    </Canvas>
  );
}

/** 컨테이너의 실제 화면 위치를 읽어 스크롤 진행률을 계산하고 카메라를 이동시킨다. */
function ScrollDolly({
  containerRef,
  onActiveLayerChange,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  onActiveLayerChange: (index: number) => void;
}) {
  const camera = useThree((state) => state.camera);
  const invalidate = useThree((state) => state.invalidate);
  const targetZ = useRef(CAMERA_START_Z);
  const lastActiveLayer = useRef(-1);

  useEffect(() => {
    function computeProgress() {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = (vh - rect.top) / (vh + rect.height);
      const progress = Math.min(Math.max(raw, 0), 1);
      targetZ.current = CAMERA_START_Z + (CAMERA_END_Z - CAMERA_START_Z) * progress;
      invalidate();
    }

    computeProgress();

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        computeProgress();
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [containerRef, invalidate]);

  useFrame(() => {
    const diff = targetZ.current - camera.position.z;
    camera.position.z += diff * 0.15;
    camera.position.x = Math.sin((camera.position.z / (CAMERA_END_Z - CAMERA_START_Z)) * Math.PI) * 0.35;
    camera.lookAt(0, 0.15, camera.position.z - 4);

    // 남은 거리가 있으면 다음 프레임도 예약해 부드럽게 안착시킨다(듀티사이클 원칙과 동일).
    if (Math.abs(diff) > 0.002) invalidate();

    let nearestIndex = 0;
    let nearestDist = Infinity;
    LAYER_Z.forEach((z, index) => {
      const dist = Math.abs(camera.position.z - z);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearestIndex = index;
      }
    });
    const focused = nearestDist < 1.5 ? nearestIndex : -1;
    if (focused !== lastActiveLayer.current) {
      lastActiveLayer.current = focused;
      onActiveLayerChange(focused);
    }
  });

  return null;
}

function LayerPlane({ layer, z }: { layer: ArchitectureLayer; z: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const camera = useThree((state) => state.camera);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  useFrame(() => {
    const dist = Math.abs(camera.position.z - z);
    const focus = Math.max(0, 1 - dist / 2.6);
    if (materialRef.current) materialRef.current.opacity = 0.12 + focus * 0.32;
    if (meshRef.current) meshRef.current.scale.setScalar(1 + focus * 0.04);
  });

  const nodes = layer.nodes.slice(0, 5);
  const spread = 2.6;

  return (
    <group position={[0, 0, z]}>
      <mesh ref={meshRef}>
        <planeGeometry args={[3.6, 2]} />
        <meshBasicMaterial color={threeColors.accent} opacity={0.15} ref={materialRef} side={DoubleSide} transparent />
      </mesh>

      {nodes.map((node, index) => {
        const x = nodes.length > 1 ? -spread / 2 + (spread / (nodes.length - 1)) * index : 0;
        const isHovered = hoveredNode === index;

        return (
          <group key={node} position={[x, -0.15, 0.08]}>
            <mesh
              onClick={(event) => {
                event.stopPropagation();
                setHoveredNode((value) => (value === index ? null : index));
              }}
              onPointerOut={() => setHoveredNode((value) => (value === index ? null : value))}
              onPointerOver={(event) => {
                event.stopPropagation();
                setHoveredNode(index);
              }}
            >
              <icosahedronGeometry args={[0.09, 0]} />
              <meshBasicMaterial color={threeColors.accentHover} />
            </mesh>
            {isHovered ? (
              <SceneLabel center style={{ pointerEvents: 'none' }}>
                <span className="whitespace-nowrap rounded-badge border border-accent/40 bg-bg-primary/95 px-2.5 py-1 text-[11px] font-medium text-accent shadow-lg">
                  {node}
                </span>
              </SceneLabel>
            ) : null}
          </group>
        );
      })}
    </group>
  );
}
