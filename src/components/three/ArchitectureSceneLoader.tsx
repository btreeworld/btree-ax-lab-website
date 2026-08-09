'use client';

import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

import type { ArchitectureLayer } from '@/content/home';
import { useCanMount3D } from '@/hooks/useCanMount3D';
import { useInViewport } from '@/hooks/useInViewport';

/**
 * 아키텍처 3D 씬 로더 — 'use client' 경계에서 dynamic(ssr:false)를 소유한다.
 * ArchitectureSection.tsx(async Server Component)는 이미 렌더된 폴백(`fallback`)을
 * children/prop 형태로 넘겨주기만 하고, 실제 3D-대-폴백 분기는 여기서 처리한다.
 *
 * - `canMount3D` 는 마운트 시점에 한 번 결정되고 이후 바뀌지 않으므로(뷰포트 폭 변경 시 제외),
 *   "3D냐 폴백이냐"를 계속 오가며 레이아웃이 흔들리는 일이 없다.
 * - `inViewport` 는 오직 Canvas 렌더 루프를 실제로 마운트/언마운트할지만 결정한다
 *   (컨테이너 높이는 항상 고정이라 이 토글은 레이아웃에 영향을 주지 않는다) — 이게
 *   섹션이 화면 밖에 있을 때 GPU/CPU를 아끼는 실질적인 성능 레버다.
 */
const ArchitectureScene = dynamic(() => import('@/components/three/ArchitectureScene').then((m) => m.ArchitectureScene), {
  ssr: false,
  loading: () => null,
});

export function ArchitectureSceneLoader({ layers, fallback }: { layers: ArchitectureLayer[]; fallback: ReactNode }) {
  const canMount = useCanMount3D();
  const [setContainerRef, inViewport, containerRef] = useInViewport<HTMLDivElement>('250px 0px');

  if (!canMount) return <>{fallback}</>;

  return (
    <div className="relative h-[480px] overflow-hidden rounded-panel border border-line-dark bg-bg-elevated/30 md:h-[560px]" ref={setContainerRef}>
      {inViewport ? <ArchitectureScene containerRef={containerRef} layers={layers} /> : null}
    </div>
  );
}
