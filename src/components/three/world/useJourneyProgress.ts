'use client';

import { useEffect, useRef } from 'react';

export type ProgressListener = (progress: number) => void;

export type JourneyProgress = {
  /** 항상 최신값을 담는 mutable ref. useFrame 등 매 프레임 읽기 전용 소비자용. */
  ref: React.RefObject<number>;
  /** DOM을 직접 건드리는 소비자(HUD)를 등록한다. React state를 쓰지 않아 재렌더가 없다. */
  subscribe: (listener: ProgressListener) => () => void;
};

/**
 * 네이티브 스크롤 → 0..1 진행률.
 *
 * React state로 만들지 않는 이유: 스크롤은 프레임마다(최대 60Hz) 값이 바뀌는데, 이걸 useState로
 * 흘리면 카메라 리그·8개 HUD 스테이지 전부가 매 프레임 재렌더된다. 대신 ref + 구독자 콜백 패턴으로
 * "값은 항상 최신, React 트리는 리렌더 없음"을 만든다. Canvas 내부(별도 리액트 리컨실러) 소비자는
 * ref를 prop으로 받아 useFrame에서 직접 읽고, HUD(DOM) 소비자는 subscribe로 등록해 스타일을 직접 쓴다.
 */
export function useJourneyProgress(): JourneyProgress {
  const progressRef = useRef(0);
  const listenersRef = useRef<Set<ProgressListener>>(new Set());

  useEffect(() => {
    let rafId: number | null = null;

    // 여정 스페이서가 페이지의 유일한 스크롤 콘텐츠이므로, 문서 전체 스크롤 가능 거리를
    // 그대로 진행률의 분모로 쓴다 — vh를 따로 하드코딩해 스페이서 실측 높이와 어긋날 일이 없다.
    function computeAndNotify() {
      rafId = null;
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const next = Math.min(Math.max(window.scrollY / max, 0), 1);
      progressRef.current = next;
      listenersRef.current.forEach((listener) => listener(next));
    }

    function onScroll() {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(computeAndNotify);
    }

    computeAndNotify();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  function subscribe(listener: ProgressListener) {
    listenersRef.current.add(listener);
    listener(progressRef.current);
    return () => {
      listenersRef.current.delete(listener);
    };
  }

  return { ref: progressRef, subscribe };
}
