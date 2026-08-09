'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

import { stageOpacity } from '@/lib/journey';
import type { JourneyProgress } from '@/components/three/world/useJourneyProgress';

/**
 * 스테이지 하나의 불투명도/패럴랙스를 진행률에 맞춰 직접(ref) 갱신한다 — React state를 쓰지 않아
 * 스크롤 중 재렌더가 없다(useJourneyProgress.ts의 설계 원칙과 동일).
 *
 * children은 항상 실제 텍스트 노드로 DOM에 존재한다 — opacity만 0일 뿐 마운트/언마운트되지
 * 않으므로 검색엔진 크롤러는 8개 스테이지 전문을 모두 읽는다.
 */
export function JourneyStage({
  index,
  progress,
  align = 'left',
  children,
}: {
  index: number;
  progress: JourneyProgress;
  align?: 'left' | 'right' | 'center';
  children: ReactNode;
}) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    return progress.subscribe((t) => {
      const opacity = stageOpacity(t, index);
      el.style.opacity = String(opacity);
      el.style.transform = `translateY(${(1 - opacity) * 18}px)`;
      el.style.pointerEvents = opacity > 0.4 ? 'auto' : 'none';
    });
  }, [progress, index]);

  // Tailwind의 JIT 클래스 추출에 기대지 않고 인라인 스타일로 직접 지정한다 — 동적 삼항
  // 클래스 조합이 프로덕션 빌드에서 정렬을 적용하지 않는 문제가 있어(원인 미확정), 정렬처럼
  // prop으로 갈리는 값은 스타일 객체로 처리하는 편이 안전하다.
  const alignItems = align === 'right' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start';
  const textAlign = align === 'right' ? 'right' : align === 'center' ? 'center' : 'left';

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-10 flex h-screen flex-col justify-center px-6 sm:px-12"
      ref={elRef}
      style={{ alignItems, opacity: 0, willChange: 'opacity, transform' }}
    >
      <div className="max-w-xl" style={{ textAlign }}>
        {children}
      </div>
    </div>
  );
}
