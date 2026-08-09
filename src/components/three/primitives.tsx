'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import { PACKET_TRAVEL_DURATION_MS, PACKET_TRAVEL_INTERVAL_MS, PULSE_DURATION_MS, PULSE_INTERVAL_MS, threeColors } from '@/lib/three-tokens';

/**
 * 공용 3D 프리미티브 — Hero/아키텍처 씬이 함께 사용한다.
 *
 * 성능 원칙(계획서 "아키텍처 원칙" 5번):
 *  - `frameloop="demand"` 를 실제로 유효하게 만들기 위해, "무한 사인파" 대신
 *    듀티사이클(정해진 시간에만 애니메이션하고 나머지는 정지) 방식으로 구현한다.
 *  - useFrame 자체는 프레임이 실제로 그려질 때만 실행되므로, 언제 다음 프레임을
 *    그려야 하는지는 setTimeout/requestAnimationFrame 기반의 별도 타이머가
 *    `invalidate()` 를 호출해 알려준다 — React state 를 쓰지 않아 리렌더 없이 동작.
 */

/** 듀티사이클 펄스 강도(0~1)를 ref 로 반환한다. 렌더링 없이 useFrame 에서 직접 읽어 쓴다. */
export function useDutyCyclePulse(
  durationMs = PULSE_DURATION_MS,
  intervalMs = PULSE_INTERVAL_MS,
  phaseOffsetMs = 0,
) {
  const intensity = useRef(0);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    let rafId: number | null = null;
    let intervalId: number | null = null;

    function runPulse() {
      const start = performance.now();

      function tick(now: number) {
        const elapsed = now - start;
        if (elapsed >= durationMs) {
          intensity.current = 0;
          invalidate();
          rafId = null;
          return;
        }
        // 0 → 1 → 0 로 부드럽게 숨쉬는 곡선.
        intensity.current = Math.sin((elapsed / durationMs) * Math.PI);
        invalidate();
        rafId = requestAnimationFrame(tick);
      }

      rafId = requestAnimationFrame(tick);
    }

    const startTimeout = window.setTimeout(() => {
      runPulse();
      intervalId = window.setInterval(runPulse, intervalMs);
    }, phaseOffsetMs);

    return () => {
      window.clearTimeout(startTimeout);
      if (intervalId !== null) window.clearInterval(intervalId);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [durationMs, intervalMs, phaseOffsetMs, invalidate]);

  return intensity;
}

type PulsingNodeProps = {
  position: [number, number, number];
  radius?: number;
  color?: number;
  phaseOffsetMs?: number;
  onClick?: (event: { stopPropagation: () => void }) => void;
};

/** 듀티사이클로 맥동하는 노드(카메라·센서 등 현장 장비를 상징). */
export function PulsingNode({ position, radius = 0.16, color = threeColors.accent, phaseOffsetMs = 0, onClick }: PulsingNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const intensity = useDutyCyclePulse(PULSE_DURATION_MS, PULSE_INTERVAL_MS, phaseOffsetMs);
  const baseColor = useRef(new THREE.Color(color)).current;
  const hotColor = useRef(new THREE.Color(threeColors.accentHover)).current;
  const mixed = useRef(new THREE.Color()).current;

  useFrame(() => {
    const t = intensity.current;
    if (meshRef.current) meshRef.current.scale.setScalar(1 + t * 0.4);
    if (materialRef.current) {
      mixed.copy(baseColor).lerp(hotColor, t);
      materialRef.current.color.copy(mixed);
      materialRef.current.opacity = 0.7 + t * 0.3;
    }
  });

  return (
    <mesh onClick={onClick} position={position} ref={meshRef}>
      <icosahedronGeometry args={[radius, 0]} />
      <meshBasicMaterial color={color} opacity={0.75} ref={materialRef} transparent />
    </mesh>
  );
}

/**
 * 조명 없이도 저폴리 형태가 또렷하게 보이도록, 채워진 메시 위에 얇은 엣지 와이어프레임을 겹친다.
 * 두 메시가 같은 geometry를 공유해 메모리 비용이 늘지 않는다. (Hero/FIELD 스테이션 공용 — HeroScene.tsx
 * 원본에서 이 파일로 이동, MeshBasicMaterial만 쓰는 조명 없는 구조물 표현 방식은 그대로 유지.)
 */
export function EdgedMesh({
  geometry,
  color = threeColors.structure,
  position,
  rotation,
}: {
  geometry: THREE.BufferGeometry;
  color?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  return (
    <group position={position} rotation={rotation}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color={color} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={threeColors.accent} opacity={0.45} transparent />
      </lineSegments>
    </group>
  );
}

/** 두 지점을 잇는 얇은 발광 라인 — 정적이라 프레임 비용이 거의 없다. */
export function Beam({ from, to, color = threeColors.accent, opacity = 0.35 }: { from: [number, number, number]; to: [number, number, number]; color?: number; opacity?: number }) {
  const points = [new THREE.Vector3(...from), new THREE.Vector3(...to)];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity }))} />
  );
}

type TravelingPacketProps = {
  waypoints: Array<[number, number, number]>;
  color?: number;
  radius?: number;
  onLegArrive?: (legIndex: number) => void;
  startDelayMs?: number;
};

/** 카메라→Edge→트윈처럼 여러 구간을 순서대로 이동하는 발광 패킷. 파이프라인을 텍스트 없이 시연한다. */
export function TravelingPacket({ waypoints, color = threeColors.accentHover, radius = 0.07, onLegArrive, startDelayMs = 800 }: TravelingPacketProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const visibleRef = useRef(false);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    if (waypoints.length < 2) return;

    let rafId: number | null = null;
    let intervalId: number | null = null;
    let initialTimeout: number | null = null;

    function runJourney() {
      const totalLegs = waypoints.length - 1;
      let leg = 0;
      visibleRef.current = true;

      function runLeg() {
        const start = performance.now();
        const from = waypoints[leg];
        const to = waypoints[leg + 1];
        const legDuration = PACKET_TRAVEL_DURATION_MS / totalLegs;

        function tick(now: number) {
          const elapsed = now - start;
          const t = Math.min(elapsed / legDuration, 1);
          if (meshRef.current) {
            meshRef.current.position.set(
              from[0] + (to[0] - from[0]) * t,
              from[1] + (to[1] - from[1]) * t,
              from[2] + (to[2] - from[2]) * t,
            );
          }
          invalidate();

          if (t < 1) {
            rafId = requestAnimationFrame(tick);
            return;
          }

          onLegArrive?.(leg);
          leg += 1;
          if (leg < totalLegs) {
            runLeg();
          } else {
            visibleRef.current = false;
            invalidate();
          }
        }

        rafId = requestAnimationFrame(tick);
      }

      runLeg();
    }

    initialTimeout = window.setTimeout(() => {
      runJourney();
      intervalId = window.setInterval(runJourney, PACKET_TRAVEL_INTERVAL_MS);
    }, startDelayMs);

    return () => {
      if (initialTimeout !== null) window.clearTimeout(initialTimeout);
      if (intervalId !== null) window.clearInterval(intervalId);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invalidate, onLegArrive, startDelayMs]);

  useFrame(() => {
    if (materialRef.current) {
      const target = visibleRef.current ? 0.95 : 0;
      materialRef.current.opacity += (target - materialRef.current.opacity) * 0.3;
    }
  });

  return (
    <mesh position={waypoints[0]} ref={meshRef}>
      <sphereGeometry args={[radius, 10, 10]} />
      <meshBasicMaterial color={color} opacity={0} ref={materialRef} transparent />
    </mesh>
  );
}
