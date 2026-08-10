'use client';

import { BrokenBridge, IsolatedSilo, SeveredCable } from '@/components/three/world/props/GapProps';
import { GAP_LAYOUT } from '@/lib/journey';

/**
 * GAP 스테이션 — problemSection 4개 카드를 각각 형태로 번역한 소품들을 배치한다.
 * 이 구간에만 붉은색(error)을 쓰고, 이어지는 EDGE부터는 청록 계열로 돌아와
 * "문제 → 해결"의 색 전환이 스크롤과 함께 읽히게 한다.
 *
 * 배치 기준: 카메라는 [-8, 5, 5]에서 [0, 2.6, -1]을 내려다본다. 주인공인 잘린 케이블은
 * 시선이 꽂히는 지점에 두고, 길이 방향을 시선과 직교하게(회전 Y≈-0.9) 눕혀야 "끊어진 간격"이
 * 정면으로 보인다 — 시선과 나란히 두면 원근에 눌려 그냥 막대처럼 보인다.
 */
export function GapStation() {
  const [cx, cy, cz] = GAP_LAYOUT.center;

  return (
    <group>
      {/* 기존 설비와 연결이 걱정됩니다 — 닿지 않는 두 케이블 끝(이 스테이션의 주인공) */}
      <SeveredCable cableLength={1.9} gap={1.15} position={[cx, cy, cz]} rotation={[0, -0.9, 0.05]} />

      {/* 컨설팅과 개발이 분리되어 있습니다 — 중간 경간이 무너진 다리 */}
      <BrokenBridge gap={1.3} position={[cx + 2.2, cy - 1.5, cz - 2.4]} rotation={[0, -0.9, 0]} span={1.7} />

      {/* 무엇부터 해야 할지 모릅니다 — 서로 연결되지 않은 채 봉인된 사일로들(지면 위) */}
      <IsolatedSilo position={[cx - 1.6, 0, cz + 1.4]} />
      <IsolatedSilo height={0.56} position={[cx - 0.5, 0, cz + 2.6]} radius={0.23} />
      <IsolatedSilo height={0.84} position={[cx - 2.9, 0, cz + 2.2]} radius={0.3} />
    </group>
  );
}
