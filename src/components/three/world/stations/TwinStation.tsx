'use client';

import { useMemo } from 'react';
import { useLocale } from 'next-intl';
import * as THREE from 'three';

import { EdgedMesh, PulsingNode } from '@/components/three/primitives';
import { DataStream } from '@/components/three/world/DataStream';
import { HoloPanel } from '@/components/three/world/HoloPanel';
import { architectureLayers } from '@/content/home';
import type { Locale } from '@/i18n/locales';
import { TWIN_LAYOUT } from '@/lib/journey';
import { threeColors } from '@/lib/three-tokens';

/**
 * TWIN 스테이션 — 여정의 클라이맥스. FIELD를 그대로 축소 복제한 "진짜 쌍둥이"를 보여준다
 * (FieldStation과 같은 지오메트리 조합, 축척만 다름 — "디지털트윈"이라는 컨셉을 문자 그대로
 * 반복해서 증명한다). 대형 홀로 패널이 그 옆에서 실시간 상태를 보여준다.
 */
export function TwinStation() {
  const locale = useLocale() as Locale;
  const twinNodes = architectureLayers[locale][3].nodes; // ['현황 시각화', '이상 알림', ...]
  const { replicaCenter, replicaScale: s, panel } = TWIN_LAYOUT;
  const [rx, ry, rz] = replicaCenter;

  const factoryGeometry = useMemo(() => new THREE.BoxGeometry(3.6 * s, 2.2 * s, 2.8 * s), [s]);
  const greenhouseBodyGeometry = useMemo(() => new THREE.BoxGeometry(2.6 * s, 1.6 * 0.75 * s, 2.2 * s), [s]);
  const greenhouseRoofGeometry = useMemo(() => new THREE.ConeGeometry(2.6 * s * 0.72, 1.6 * 0.5 * s, 4), [s]);

  const factoryY = (2.2 * s) / 2;
  const factoryPos: [number, number, number] = [rx - 2.4 * s, factoryY, rz + 1.2 * s];

  const greenhouseBodyY = (1.6 * 0.75 * s) / 2;
  const greenhouseRoofY = 1.6 * 0.75 * s + (1.6 * 0.5 * s) / 2;
  const greenhousePos: [number, number, number] = [rx + 2.8 * s, 0, rz - 0.5 * s];

  return (
    <group>
      <EdgedMesh geometry={factoryGeometry} position={factoryPos} />
      <group position={greenhousePos}>
        <EdgedMesh geometry={greenhouseBodyGeometry} position={[0, greenhouseBodyY, 0]} />
        <EdgedMesh geometry={greenhouseRoofGeometry} position={[0, greenhouseRoofY, 0]} rotation={[0, Math.PI / 4, 0]} />
      </group>

      {/* 라이브 상태를 알리는 노드 — 실제 현장(FieldStation)에서 만들어진 신호가 여기 반영된다는 뜻 */}
      <PulsingNode color={threeColors.accentHover} phaseOffsetMs={0} position={[factoryPos[0], factoryY * 2 + 0.15, factoryPos[2]]} radius={0.08} />
      <PulsingNode color={threeColors.warning} phaseOffsetMs={600} position={[greenhousePos[0], greenhouseBodyY * 2 + 0.1, greenhousePos[2]]} radius={0.07} />

      <DataStream color={threeColors.accentHover} count={10} from={[rx, ry + 1.2, rz]} speed={0.5} to={panel.center} />

      <HoloPanel
        barCount={4}
        label={`${twinNodes[0]} · ${twinNodes[1]}`}
        position={panel.center}
        rotation={[0, -Math.PI / 6, 0]}
        width={2.1}
        height={1.35}
      />
    </group>
  );
}
