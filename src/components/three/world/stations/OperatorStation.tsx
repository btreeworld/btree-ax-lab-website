'use client';

import { useLocale } from 'next-intl';

import { HoloPanel } from '@/components/three/world/HoloPanel';
import { ControlConsole } from '@/components/three/world/props/OperatorProps';
import { ShadowBlob } from '@/components/three/world/props/ShadowBlob';
import { pricingPlans } from '@/content/pricing';
import type { Locale } from '@/i18n/locales';
import { OPERATOR_LAYOUT } from '@/lib/journey';

/**
 * OPERATOR 스테이션 — "운영자가 실제로 사용하는 화면과 알림" 카피가 닿는 자리.
 * 3면 곡면 모니터와 빈 의자로 된 관제 콘솔을 놓아, 앞 구간에서 만든 데이터가
 * 최종적으로 사람의 판단으로 연결되는 지점임을 보여준다.
 */
export function OperatorStation() {
  const locale = useLocale() as Locale;
  const startingPlan = pricingPlans[locale][0];
  const { deskCenter, panel } = OPERATOR_LAYOUT;

  return (
    <group>
      <ShadowBlob position={[deskCenter[0], 0, deskCenter[2] + 0.3]} radius={2.4} />
      <ControlConsole position={deskCenter} rotation={[0, 0.18, 0]} />

      {/* 방위각은 OPERATOR 카메라([2.5,2.4,-38]) 기준: atan2(2.5-(-2.6), -38-(-42.5)) ≈ 0.85rad */}
      <HoloPanel
        label={`${startingPlan.name} · ${startingPlan.price}`}
        position={panel.center}
        rotation={[0, 0.85, 0]}
        width={1.4}
      />
    </group>
  );
}
