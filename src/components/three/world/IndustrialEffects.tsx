'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import type { JourneyQuality } from '@/components/three/world/useJourneyQuality';
import { threeColors } from '@/lib/three-tokens';

function StructuralFrame({ z }: { z: number }) {
  return (
    <group position={[0, 0, z]}>
      {[-5.2, 5.2].map((x) => (
        <mesh key={x} position={[x, 2.55, 0]}>
          <boxGeometry args={[0.09, 5.1, 0.09]} />
          <meshStandardMaterial color={0x1b3446} metalness={0.9} roughness={0.3} />
        </mesh>
      ))}
      <mesh position={[0, 5.05, 0]}>
        <boxGeometry args={[10.5, 0.09, 0.09]} />
        <meshStandardMaterial color={0x31566a} metalness={0.92} roughness={0.24} />
      </mesh>
      <mesh position={[0, 4.96, 0]}>
        <boxGeometry args={[5.8, 0.018, 0.018]} />
        <meshBasicMaterial color={threeColors.accent} opacity={0.22} transparent />
      </mesh>
    </group>
  );
}

function EdgeScan() {
  const scanRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!scanRef.current) return;
    const cycle = (state.clock.elapsedTime * 0.34) % 1;
    scanRef.current.position.y = 0.25 + cycle * 3.2;
    const material = scanRef.current.material as THREE.MeshBasicMaterial;
    material.opacity = Math.sin(cycle * Math.PI) * 0.08;
  });
  return (
    <mesh position={[0, 0.25, -9]} ref={scanRef} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[1.45, 48]} />
      <meshBasicMaterial color={threeColors.accent} depthWrite={false} opacity={0} side={THREE.DoubleSide} transparent />
    </mesh>
  );
}

function AnomalyPulse() {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ringRef.current) return;
    const cycle = (state.clock.elapsedTime * 0.42) % 1;
    ringRef.current.scale.setScalar(0.6 + cycle * 2.8);
    const material = ringRef.current.material as THREE.MeshBasicMaterial;
    material.opacity = (1 - cycle) * 0.62;
  });
  return (
    <mesh position={[0, 0.03, -1]} ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.38, 0.43, 48]} />
      <meshBasicMaterial color={threeColors.warning} depthWrite={false} opacity={0.5} transparent />
    </mesh>
  );
}

export function IndustrialEffects({ quality }: { quality: JourneyQuality }) {
  return (
    <group>
      {quality === 'full' ? [-4, -14, -25, -36, -46].map((z) => <StructuralFrame key={z} z={z} />) : null}
      <EdgeScan />
      <AnomalyPulse />
      <pointLight color={threeColors.warning} distance={5} intensity={1.1} position={[0, 1.4, -1]} />
      <pointLight color={threeColors.accent} distance={7} intensity={1.2} position={[0, 2.2, -9]} />
    </group>
  );
}
