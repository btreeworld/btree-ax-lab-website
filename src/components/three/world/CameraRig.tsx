'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import { WAYPOINTS } from '@/lib/journey';

/**
 * 카메라를 스플라인 위에서 스크롤 진행률에 따라 이동시킨다.
 *
 * `getPoint(t)`(제어점 인덱스 기준 균일 파라미터)를 쓴다 — `getPointAt(t)`(호길이 재파라미터화)를
 * 쓰면 웨이포인트 간 거리가 다를 때 t=i/(n-1) 지점이 실제 제어점과 어긋나, HUD 스테이지 전환과
 * 카메라 위치가 미묘하게 안 맞게 된다. journey.ts의 STATION_SPAN 계산과 반드시 짝을 맞춘다.
 *
 * position/lookAt 두 커브를 분리한 이유: 위치 이동 경로와 시선 방향을 독립적으로 설계해야
 * "지나가면서 본다"가 아니라 "다가가며 응시한다" 같은 연출이 가능하다.
 */
export function CameraRig({ progressRef }: { progressRef: React.RefObject<number> }) {
  const { camera } = useThree();

  const positionCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        WAYPOINTS.map((w) => new THREE.Vector3(...w.cameraPosition)),
        false,
        'catmullrom',
        0.5,
      ),
    [],
  );
  const lookAtCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        WAYPOINTS.map((w) => new THREE.Vector3(...w.lookAt)),
        false,
        'catmullrom',
        0.5,
      ),
    [],
  );

  const targetPosition = useRef(new THREE.Vector3(...WAYPOINTS[0].cameraPosition));
  const targetLookAt = useRef(new THREE.Vector3(...WAYPOINTS[0].lookAt));
  const currentLookAt = useRef(new THREE.Vector3(...WAYPOINTS[0].lookAt));

  useFrame((_, delta) => {
    const t = progressRef.current ?? 0;
    positionCurve.getPoint(t, targetPosition.current);
    lookAtCurve.getPoint(t, targetLookAt.current);

    // 프레임레이트 독립적인 지수 감쇠 — delta가 튀어도(탭 전환 등) 갑자기 튕기지 않는다.
    const damp = 1 - Math.exp(-5 * delta);
    camera.position.lerp(targetPosition.current, damp);
    currentLookAt.current.lerp(targetLookAt.current, damp);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
