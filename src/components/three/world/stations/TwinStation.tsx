'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useLocale } from 'next-intl';
import * as THREE from 'three';

import { PulsingNode } from '@/components/three/primitives';
import { DataStream } from '@/components/three/world/DataStream';
import { HoloPanel } from '@/components/three/world/HoloPanel';
import { Factory, Greenhouse } from '@/components/three/world/props/FieldProps';
import { HoloPedestal } from '@/components/three/world/props/TwinProps';
import { architectureLayers } from '@/content/home';
import type { Locale } from '@/i18n/locales';
import { TWIN_LAYOUT } from '@/lib/journey';
import { threeColors } from '@/lib/three-tokens';

/**
 * TWIN 스테이션 — 여정의 클라이맥스.
 *
 * FIELD와 **완전히 같은 컴포넌트**(Factory/Greenhouse)를 축소해서 투사대 위에 띄운다.
 * 다른 모양의 건물을 놓으면 "또 다른 현장"으로 보이지만, 같은 컴포넌트를 쓰면
 * "아까 그 현장의 사본"이라는 게 형태로 증명된다 — 디지털트윈 카피의 시각적 근거.
 * 홀로그램답게 천천히 자전한다.
 */
export function TwinStation() {
  const locale = useLocale() as Locale;
  const twinNodes = architectureLayers[locale][3].nodes;
  const replicaRef = useRef<THREE.Group>(null);

  const { replicaCenter, panel } = TWIN_LAYOUT;
  const [rx, , rz] = replicaCenter;

  // 투사대 위로 띄우는 높이 — HoloPedestal의 광추 안에 들어가도록.
  // TWIN 카메라는 [11,10,-26]에서 15유닛쯤 떨어져 내려다보므로, 여정의 클라이맥스가
  // 또렷하게 읽히려면 복제본과 투사대를 다른 스테이션보다 크게 잡아야 한다.
  // 카메라 시선이 y=2.5를 향하므로 복제본을 그 높이까지 띄운다 — 바닥 가까이 두면
  // 위에서 내려다보는 각도가 되어 톱니 지붕·아치 같은 실루엣이 뭉개진다.
  const floatY = 2.2;
  const scale = 0.7;

  useFrame((_, delta) => {
    if (replicaRef.current) replicaRef.current.rotation.y += delta * 0.12;
  });

  return (
    <group>
      <HoloPedestal baseRadius={1.4} coneHeight={4.2} position={replicaCenter} topRadius={3.2} />

      {/* 투사된 사본 — FIELD와 동일한 프롭을 축소 배치 */}
      <group position={[rx, floatY, rz]} ref={replicaRef} scale={scale}>
        <Factory position={[-2.4, 0, 0.6]} />
        <Greenhouse length={2.4} position={[2.8, 0, -0.6]} radius={1.2} />

        {/* 트윈 위에서 뜨는 상태·경보 표시 */}
        <PulsingNode color={threeColors.accentHover} phaseOffsetMs={0} position={[-2.4, 3.0, 0.6]} radius={0.16} />
        <PulsingNode color={threeColors.warning} phaseOffsetMs={700} position={[2.8, 2.0, -0.6]} radius={0.14} />
      </group>

      {/* 트윈 → 대시보드 패널로 흐르는 실시간 피드 */}
      <DataStream color={threeColors.accentHover} count={10} from={[rx, floatY + 1.4, rz]} speed={0.5} to={panel.center} />

      {/* 패널 방위각은 TWIN 카메라 웨이포인트([11,10,-26])를 향하도록 계산했다:
          atan2(11-5.4, -26-(-30.5)) ≈ 0.9rad. 기존 -PI/6은 카메라와 거의 직각이라
          패널이 옆면(얇은 판)으로만 보였다. */}
      <HoloPanel
        barCount={4}
        height={1.35}
        label={`${twinNodes[0]} · ${twinNodes[1]}`}
        position={panel.center}
        rotation={[0, 0.9, 0]}
        width={2.1}
      />
    </group>
  );
}
