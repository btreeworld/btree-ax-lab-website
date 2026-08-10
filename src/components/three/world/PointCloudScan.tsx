'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { FIELD_LAYOUT, stationProgress } from '@/lib/journey';
import { threeColors } from '@/lib/three-tokens';

const POINT_COUNT = 2600;
const BOOT_END = stationProgress(1); // FIELD 웨이포인트 지점에서 완전히 수렴
const FADE_OUT_END = BOOT_END + stationProgress(1) * 0.7; // 그 직후 걷힌다

/**
 * 점들이 수렴할 목표 좌표 — FieldStation의 **실제 실루엣**을 따라간다.
 * 공장은 박스 모서리, 온실은 아치 곡선을 샘플링한다. 예전에는 둘 다 박스 모서리로 찍었는데,
 * 온실이 아치 프롭으로 바뀌면서 수렴한 점군이 실제 온실과 어긋난 상자형 케이지로 보였다.
 */
function sampleFieldSilhouette(count: number, target: Float32Array) {
  const factory = FIELD_LAYOUT.factory;
  const [gx, , gz] = FIELD_LAYOUT.greenhouse.center;
  const greenhouseRadius = 1.2; // FieldStation의 Greenhouse radius와 동일
  const greenhouseLength = 2.4; // FieldStation의 Greenhouse length와 동일

  for (let i = 0; i < count; i++) {
    const idx = i * 3;

    if (i % 2 === 0) {
      // ── 공장: 박스 12개 모서리
      const [cx, cy, cz] = factory.center;
      const [sx, sy, sz] = factory.size;
      const hx = sx / 2;
      const hy = sy / 2;
      const hz = sz / 2;

      const edge = Math.floor(Math.random() * 12);
      const u = Math.random() * 2 - 1;
      let x = 0;
      let y = 0;
      let z = 0;
      if (edge < 4) {
        x = u * hx;
        y = edge < 2 ? -hy : hy;
        z = edge % 2 === 0 ? -hz : hz;
      } else if (edge < 8) {
        z = u * hz;
        y = edge < 6 ? -hy : hy;
        x = edge % 2 === 0 ? -hx : hx;
      } else {
        y = u * hy;
        x = edge % 2 === 0 ? -hx : hx;
        z = edge < 10 ? -hz : hz;
      }

      target[idx] = cx + x;
      target[idx + 1] = cy + hy + y; // center.y=0을 바닥으로 취급
      target[idx + 2] = cz + z;
    } else {
      // ── 온실: 반원 아치 + 바닥 모서리
      const alongZ = (Math.random() - 0.5) * greenhouseLength;
      if (Math.random() < 0.78) {
        const theta = Math.random() * Math.PI; // 0..π → 위쪽 반원
        target[idx] = gx + Math.cos(theta) * greenhouseRadius;
        target[idx + 1] = Math.sin(theta) * greenhouseRadius;
        target[idx + 2] = gz + alongZ;
      } else {
        target[idx] = gx + (Math.random() < 0.5 ? -greenhouseRadius : greenhouseRadius);
        target[idx + 1] = 0.02;
        target[idx + 2] = gz + alongZ;
      }
    }
  }
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
}

/**
 * 부팅 시퀀스: 흩어진 점들이 FIELD 스테이션의 건물 윤곽(FIELD_LAYOUT, FieldStation과 좌표 공유)으로
 * 수렴했다가, 실제 건물 지오메트리가 자리를 잡으면 다시 흩어지며 페이드아웃한다.
 */
export function PointCloudScan({ progressRef }: { progressRef: React.RefObject<number> }) {
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const { positions, scatter, target } = useMemo(() => {
    const scatterArr = new Float32Array(POINT_COUNT * 3);
    for (let i = 0; i < POINT_COUNT; i++) {
      const idx = i * 3;
      scatterArr[idx] = (Math.random() - 0.5) * 34;
      scatterArr[idx + 1] = Math.random() * 22 + 1;
      scatterArr[idx + 2] = (Math.random() - 0.5) * 30 + 8;
    }

    const targetArr = new Float32Array(POINT_COUNT * 3);
    sampleFieldSilhouette(POINT_COUNT, targetArr);

    return { positions: scatterArr.slice(), scatter: scatterArr, target: targetArr };
  }, []);

  useFrame(() => {
    const geometry = geometryRef.current;
    const material = materialRef.current;
    if (!geometry || !material) return;

    const t = progressRef.current ?? 0;
    const converge = smoothstep(0, BOOT_END, t);
    const fadeOut = t <= BOOT_END ? 1 : 1 - smoothstep(BOOT_END, FADE_OUT_END, t);

    if (fadeOut <= 0.001 && material.opacity <= 0.001) return; // 완전히 사라진 뒤엔 계산 스킵

    for (let i = 0; i < positions.length; i++) {
      positions[i] = scatter[i] + (target[i] - scatter[i]) * converge;
    }
    geometry.attributes.position.needsUpdate = true;
    material.opacity = 0.85 * fadeOut;
  });

  return (
    <points>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" count={POINT_COUNT} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color={threeColors.pointCloud}
        depthWrite={false}
        opacity={0.85}
        ref={materialRef}
        size={0.09}
        sizeAttenuation
        transparent
      />
    </points>
  );
}
