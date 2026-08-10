'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { threeColors } from '@/lib/three-tokens';

/**
 * 두 점 사이를 상시 흐르는 다중 입자 스트림 — primitives.tsx의 TravelingPacket(단발성 이벤트
 * 패킷)과 달리 "항상 흐르는 파이프"를 표현한다. PLATFORM 레인, TWIN 라이브 피드에 쓴다.
 * 인스턴싱을 써서 개수를 늘려도 드로우콜은 하나다.
 */
export function DataStream({
  from,
  to,
  count = 14,
  color = threeColors.accent,
  speed = 0.6,
  size = 0.035,
}: {
  from: [number, number, number];
  to: [number, number, number];
  count?: number;
  color?: number;
  speed?: number;
  size?: number;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const offsets = useMemo(() => Array.from({ length: count }, (_, i) => i / count), [count]);
  const start = useMemo(() => new THREE.Vector3(...from), [from]);
  const end = useMemo(() => new THREE.Vector3(...to), [to]);
  const curve = useMemo(() => new THREE.LineCurve3(start, end), [start, end]);
  const orientation = useMemo(() => {
    const direction = end.clone().sub(start).normalize();
    return new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction);
  }, [start, end]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const t0 = state.clock.elapsedTime * speed;
    for (let i = 0; i < offsets.length; i++) {
      const t = (offsets[i] + t0) % 1;
      dummy.position.lerpVectors(start, end, t);
      const fade = Math.sin(t * Math.PI); // 양 끝에서 작아지고 중간에서 커진다
      dummy.quaternion.copy(orientation);
      dummy.scale.setScalar(0.58 + fade * 0.48);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <mesh>
        <tubeGeometry args={[curve, 1, size * 0.16, 5, false]} />
        <meshBasicMaterial color={color} opacity={0.22} transparent />
      </mesh>
      <instancedMesh args={[undefined, undefined, count]} ref={meshRef}>
        <boxGeometry args={[size * 0.55, size * 0.55, size * 4.2]} />
        <meshBasicMaterial color={color} opacity={0.88} transparent />
      </instancedMesh>
    </group>
  );
}
