'use client';

import { useEffect, useState } from 'react';
import type { ComponentType, ReactNode } from 'react';

import { useJourneyQuality } from '@/components/three/world/useJourneyQuality';
import type { JourneyQuality } from '@/components/three/world/useJourneyQuality';

type JourneyWorldProps = { quality: JourneyQuality };

/**
 * `next/dynamic(..., { ssr: false })` 를 의도적으로 쓰지 않는다.
 *
 * 처음에는 dynamic()을 썼는데, 실측 CLS가 2.00으로 나왔다. PerformanceObserver로
 * layout-shift의 sources를 직접 찍어보니 원인은 <FOOTER>가 (0,0,0,0) ↔ (0,0,풀사이즈)
 * 사이를 두 번 오가는 것이었고, 더 파보니 그 순간 <main> 안에 실제로는 스크립트 태그 하나만
 * 남아 사실상 비어 있었다(rAF 샘플링으로 main.innerHTML을 직접 추적해 확인).
 *
 * `dynamic(ssr:false)`는 내부적으로 React.lazy + Suspense로 구현된다. 청크를 직접
 * `import()`로 미리 받아두고 "준비됨" 상태만 지역 변수로 들고 있어도(이전 버전), React.lazy
 * 자신의 import() 호출은 캐시된 모듈이라도 최소 한 틱(microtask)을 더 기다려야 resolve되고,
 * 그 한 틱 동안 Suspense가 자기 폴백(커스텀 loading을 안 주면 기본값은 사실상 빈 화면)을
 * 렌더한다 — 이게 fallback(수천 px)이 사라지고 JourneyWorld가 아직 없는 빈 프레임이 실제로
 * 페인트되는 진짜 이유였다.
 *
 * 해결책: Suspense 경로를 아예 안 거친다. `import()`로 받아온 컴포넌트 "함수 자체"를
 * useState에 저장해 뒀다가 직접 렌더한다 — React.lazy도, Suspense도 없으므로 청크가 준비된
 * 그 렌더에서 바로 최종 결과가 나온다. SSR 안전성은 그대로 유지된다: 이 import()는
 * `useEffect` 안에서만 실행되므로 서버에서는 절대 실행되지 않고, quality가 non-null이 될
 * 때까지는 fallback만 렌더되어 리듀스드모션/미지원 사용자·크롤러는 이전과 동일하다.
 */
let journeyWorldPromise: Promise<ComponentType<JourneyWorldProps>> | null = null;
function loadJourneyWorld() {
  if (!journeyWorldPromise) {
    journeyWorldPromise = import('@/components/three/world/JourneyWorld').then((m) => m.JourneyWorld);
  }
  return journeyWorldPromise;
}

if (typeof window !== 'undefined') {
  void loadJourneyWorld();
}

/**
 * 홈 3D 월드 진입점.
 *
 * `fallback`은 page.tsx(Server Component)가 넘겨주는, 지금까지의 섹션형 홈 전체
 * (HeroSection~FinalCtaSection)다. SSR 시점엔 `useJourneyQuality()`가 항상 null이므로
 * 초기 HTML은 언제나 이 fallback으로 렌더된다 — 검색엔진·리듀스드모션·WebGL 미지원
 * 사용자 모두 동일하게 완전한 텍스트 홈페이지를 받는다. 청크가 로드되어 `WorldComponent`가
 * 채워지기 전까지는 quality가 정해졌어도 계속 fallback을 유지한다.
 */
export function JourneyExperience({ fallback }: { fallback: ReactNode }) {
  const quality = useJourneyQuality();
  const [WorldComponent, setWorldComponent] = useState<ComponentType<JourneyWorldProps> | null>(null);

  useEffect(() => {
    if (quality === null) return;
    let cancelled = false;
    loadJourneyWorld().then((Comp) => {
      if (!cancelled) setWorldComponent(() => Comp);
    });
    return () => {
      cancelled = true;
    };
  }, [quality]);

  if (quality === null || !WorldComponent) return <>{fallback}</>;
  return <WorldComponent quality={quality} />;
}
