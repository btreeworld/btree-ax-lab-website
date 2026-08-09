'use client';

import { useEffect, useState } from 'react';

import { THREE_MIN_VIEWPORT_WIDTH } from '@/lib/three-tokens';

/**
 * 3D 씬 마운트 가능 여부 — 마스터 문서 13.9(과도한 3D·모션 제한)와
 * 접근성 요구(20장, prefers-reduced-motion)를 함께 만족시키기 위한 게이트.
 *
 * 아래 조건을 모두 만족해야 true:
 *  - `prefers-reduced-motion: reduce` 가 아님
 *  - 뷰포트 폭이 Tailwind `sm` 이상 (기존 FieldVisual 의 `hidden sm:block` 기준과 동일)
 *  - WebGL 컨텍스트를 실제로 만들 수 있음(사파리 사설모드, 사내 보안정책 등으로 비활성화된 경우 대비)
 *
 * 서버 렌더링에서는 항상 false 를 반환해 SVG 폴백이 먼저 그려지도록 한다.
 */
export function useCanMount3D(): boolean {
  const [canMount, setCanMount] = useState(false);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    function evaluate() {
      if (reducedMotionQuery.matches) {
        setCanMount(false);
        return;
      }
      if (window.innerWidth < THREE_MIN_VIEWPORT_WIDTH) {
        setCanMount(false);
        return;
      }
      setCanMount(supportsWebGL());
    }

    evaluate();

    window.addEventListener('resize', evaluate);
    reducedMotionQuery.addEventListener('change', evaluate);

    return () => {
      window.removeEventListener('resize', evaluate);
      reducedMotionQuery.removeEventListener('change', evaluate);
    };
  }, []);

  return canMount;
}

let cachedWebglSupport: boolean | null = null;

function supportsWebGL(): boolean {
  if (cachedWebglSupport !== null) return cachedWebglSupport;

  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    cachedWebglSupport = Boolean(gl);
  } catch {
    cachedWebglSupport = false;
  }

  return cachedWebglSupport;
}
