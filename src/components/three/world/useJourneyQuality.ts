'use client';

import { useLayoutEffect, useEffect, useState } from 'react';

import { supportsWebGL } from '@/lib/webgl';

export type JourneyQuality = 'full' | 'lite';

/** lite 임계값 — 이 폭 미만이면 입자 수·후처리를 줄인 경량 모드로 마운트한다(차단 아님). */
const LITE_VIEWPORT_WIDTH = 820;

/**
 * `useLayoutEffect`는 서버에서 아무 일도 하지 않아 경고를 띄운다 — 클라이언트에서만 실제
 * layout effect로 동작하고 서버에서는 `useEffect`(no-op)로 대체하는 표준 우회.
 */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * 홈 3D 월드 마운트 게이트. `useCanMount3D`와 달리 좁은 뷰포트를 차단하지 않고
 * `'lite'` 품질로 격하시킨다 — 사용자 결정: "모바일도 경량 3D 제공"(폴백 아님).
 *
 * null 을 반환하는 경우만 마운트하지 않는다:
 *  - `prefers-reduced-motion: reduce`
 *  - WebGL 컨텍스트 생성 실패
 *
 * 서버 렌더링에서는 항상 null 을 반환해, 리듀스드모션/미지원 사용자와 동일하게
 * 기존 섹션형 사이트가 먼저(그리고 유일하게) 그려지도록 한다.
 *
 * `useEffect`가 아니라 `useLayoutEffect`를 쓰는 이유: Hero/Architecture 3D 씬은 고정
 * 종횡비 박스 안에서만 SVG↔Canvas를 바꿔치기해 주변 레이아웃이 전혀 흔들리지 않지만,
 * 이 훅은 페이지 전체를 fallback(수천 px 섹션형 사이트) ↔ JourneyWorld(스페이서+고정
 * 캔버스)로 통째로 바꿔치기한다. `useEffect`는 브라우저가 fallback을 이미 페인트한
 * "다음" 틱에 실행돼 실제로 화면에 fallback이 한 번 그려졌다가 다시 그려지는 프레임이
 * 생기고, 그 사이 새로 마운트되는 fixed 요소들과 겹치며 큰 CLS를 유발했다(실측 2.00).
 * `useLayoutEffect`는 커밋 직후·페인트 직전에 동기적으로 실행되므로, WebGL 판정이
 * 끝나는 결과가 fallback과 같은 프레임에 반영되어 별도의 가시적 스왑 프레임이 생기지
 * 않는다(서버가 이미 그려 보낸 첫 프레임 자체는 막을 수 없지만, 그 이후의 추가 스왑
 * 프레임을 제거해 실측 CLS를 크게 낮춘다).
 */
export function useJourneyQuality(): JourneyQuality | null {
  const [quality, setQuality] = useState<JourneyQuality | null>(null);

  useIsomorphicLayoutEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    function evaluate() {
      if (reducedMotionQuery.matches) {
        setQuality(null);
        return;
      }
      if (!supportsWebGL()) {
        setQuality(null);
        return;
      }
      setQuality(window.innerWidth < LITE_VIEWPORT_WIDTH ? 'lite' : 'full');
    }

    evaluate();

    window.addEventListener('resize', evaluate);
    reducedMotionQuery.addEventListener('change', evaluate);

    return () => {
      window.removeEventListener('resize', evaluate);
      reducedMotionQuery.removeEventListener('change', evaluate);
    };
  }, []);

  return quality;
}
