'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * IntersectionObserver 기반 뷰포트 근접 감지.
 * Architecture 3D 씬처럼 페이지 하단부에 위치한 무거운 컴포넌트를
 * 뷰포트 근처에 오기 전까지 마운트하지 않고, 벗어나면 다시 언마운트해
 * GPU/CPU 사용을 절약하기 위한 용도(마스터 문서 21장 성능 기준).
 *
 * rootMargin 을 넉넉히 잡아 스크롤이 섹션에 도달하기 "직전"에 미리 로드를 시작한다.
 *
 * 콜백 ref(`setRef`)로 노드를 받는다 — 이 훅을 쓰는 컴포넌트들은 `canMount3D` 같은
 * 비동기 게이트가 true가 된 "다음" 렌더에서야 실제로 DOM에 mount되는 경우가 많다.
 * 일반 `useRef` + `useEffect(..., [rootMargin])` 조합은 최초 렌더(노드가 아직 없어
 * `ref.current`가 null) 시점에 단 한 번만 실행되고, `rootMargin`은 바뀌지 않는 문자열이라
 * 노드가 실제로 mount된 뒤에도 effect가 다시 실행되지 않아 observer가 영영 생성되지
 * 않는다. 콜백 ref로 노드가 붙는 순간을 직접 감지해 이 문제를 없앤다.
 */
export function useInViewport<T extends Element>(
  rootMargin = '200px 0px',
): [(node: T | null) => void, boolean, React.RefObject<T | null>] {
  const ref = useRef<T | null>(null);
  const [nodeVersion, setNodeVersion] = useState(0);
  const [inViewport, setInViewport] = useState(false);

  const setRef = useCallback((node: T | null) => {
    ref.current = node;
    setNodeVersion((value) => value + 1);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInViewport(entry.isIntersecting);
      },
      { rootMargin, threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, nodeVersion]);

  return [setRef, inViewport, ref];
}
