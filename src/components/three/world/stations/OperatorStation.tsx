'use client';

import { useMemo } from 'react';
import { useLocale } from 'next-intl';
import * as THREE from 'three';

import { EdgedMesh } from '@/components/three/primitives';
import { HoloPanel } from '@/components/three/world/HoloPanel';
import { pricingPlans } from '@/content/pricing';
import type { Locale } from '@/i18n/locales';
import { OPERATOR_LAYOUT } from '@/lib/journey';

/**
 * OPERATOR 스테이션 — 여정의 화자가 실제로 앉는 콘솔. 데스크 + 스크린 실루엣만으로
 * "사람이 이 시스템을 운영한다"는 걸 암시한다(구상적인 인물 모델 없음 — 마스터 문서
 * 13.9의 휴머노이드 로봇 금지와 같은 이유로, 실루엣 이상으로 구체화하지 않는다).
 */
export function OperatorStation() {
  const locale = useLocale() as Locale;
  const startingPlan = pricingPlans[locale][0];
  const { deskCenter, panel } = OPERATOR_LAYOUT;
  const [dx, , dz] = deskCenter;

  const deskGeometry = useMemo(() => new THREE.BoxGeometry(2.4, 0.08, 1.0), []);
  const screenGeometry = useMemo(() => new THREE.BoxGeometry(1.6, 0.9, 0.04), []);

  return (
    <group>
      <EdgedMesh geometry={deskGeometry} position={[dx, 0.75, dz]} />
      <EdgedMesh geometry={screenGeometry} position={[dx, 1.55, dz - 0.4]} rotation={[-0.08, 0, 0]} />
      <HoloPanel
        label={`${startingPlan.name} · ${startingPlan.price}`}
        position={panel.center}
        rotation={[0, -Math.PI / 8, 0]}
        width={1.5}
      />
    </group>
  );
}
