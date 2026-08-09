'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

import { Beam, EdgedMesh, PulsingNode } from '@/components/three/primitives';
import { FIELD_LAYOUT } from '@/lib/journey';
import { threeColors } from '@/lib/three-tokens';

/**
 * FIELD 스테이션 — 공장동·온실과 그 위에서 맥동하는 현장 장비(카메라·센서).
 * 좌표는 PointCloudScan이 수렴하는 지점과 FIELD_LAYOUT을 공유한다 — 부팅 시퀀스에서
 * 흩어진 점이 정확히 이 건물의 윤곽으로 모이는 것처럼 보이게 하기 위함.
 */
export function FieldStation() {
  const factoryGeometry = useMemo(
    () => new THREE.BoxGeometry(...FIELD_LAYOUT.factory.size),
    [],
  );
  const greenhouseBodyGeometry = useMemo(
    () => new THREE.BoxGeometry(FIELD_LAYOUT.greenhouse.size[0], FIELD_LAYOUT.greenhouse.size[1] * 0.75, FIELD_LAYOUT.greenhouse.size[2]),
    [],
  );
  const greenhouseRoofGeometry = useMemo(
    () => new THREE.ConeGeometry(FIELD_LAYOUT.greenhouse.size[0] * 0.72, FIELD_LAYOUT.greenhouse.size[1] * 0.5, 4),
    [],
  );

  const [fx, , fz] = FIELD_LAYOUT.factory.center;
  const factoryY = FIELD_LAYOUT.factory.size[1] / 2;
  const [gx, , gz] = FIELD_LAYOUT.greenhouse.center;
  const greenhouseBodyY = (FIELD_LAYOUT.greenhouse.size[1] * 0.75) / 2;
  const greenhouseRoofY = FIELD_LAYOUT.greenhouse.size[1] * 0.75 + (FIELD_LAYOUT.greenhouse.size[1] * 0.5) / 2;

  const camNode: [number, number, number] = [fx + 1.2, factoryY * 2 + 0.4, fz - 0.6];
  const sensNode: [number, number, number] = [gx - 0.9, greenhouseBodyY * 2 + 0.3, gz + 0.5];

  return (
    <group>
      <EdgedMesh geometry={factoryGeometry} position={[fx, factoryY, fz]} />
      <group position={[gx, 0, gz]}>
        <EdgedMesh geometry={greenhouseBodyGeometry} position={[0, greenhouseBodyY, 0]} />
        <EdgedMesh
          color={threeColors.structure}
          geometry={greenhouseRoofGeometry}
          position={[0, greenhouseRoofY, 0]}
          rotation={[0, Math.PI / 4, 0]}
        />
      </group>

      {/* 현장 장비 — 맥동하며 데이터를 방출하는 노드 */}
      <PulsingNode phaseOffsetMs={0} position={camNode} />
      <PulsingNode phaseOffsetMs={400} position={sensNode} />
      <PulsingNode color={threeColors.accentDeep} phaseOffsetMs={800} position={[fx - 1.4, factoryY * 2 + 0.2, fz + 1]} radius={0.13} />

      <Beam from={camNode} to={sensNode} opacity={0.22} />
    </group>
  );
}
