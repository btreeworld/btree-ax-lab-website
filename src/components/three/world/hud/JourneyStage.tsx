'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

import { mobileStageOpacity, stageOpacity } from '@/lib/journey';
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
  mobile = false,
  mobilePlacement = 'bottom',
  children,
}: {
  index: number;
  progress: JourneyProgress;
  align?: 'left' | 'right' | 'center';
  mobile?: boolean;
  mobilePlacement?: 'center' | 'bottom';
  children: ReactNode;
}) {
  const elRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    return progress.subscribe((t) => {
      const opacity = mobile ? mobileStageOpacity(t, index) : stageOpacity(t, index);
      el.style.opacity = String(opacity);
      el.style.transform = `translateY(${(1 - opacity) * 18}px)`;
      if (contentRef.current) contentRef.current.style.pointerEvents = opacity > 0.4 ? 'auto' : 'none';
    });
  }, [progress, index, mobile]);

  // Tailwind의 JIT 클래스 추출에 기대지 않고 인라인 스타일로 직접 지정한다 — 동적 삼항
  // 클래스 조합이 프로덕션 빌드에서 정렬을 적용하지 않는 문제가 있어(원인 미확정), 정렬처럼
  // prop으로 갈리는 값은 스타일 객체로 처리하는 편이 안전하다.
  const alignItems = align === 'right' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start';
  const textAlign = align === 'right' ? 'right' : align === 'center' ? 'center' : 'left';

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 top-0 z-10 flex h-[100svh] flex-col px-6 sm:h-screen sm:px-12 ${
        mobile && mobilePlacement === 'bottom' ? 'justify-end pb-24' : 'justify-center'
      }`}
      ref={elRef}
      style={{ alignItems, opacity: 0, willChange: 'opacity, transform' }}
    >
      {/* 가독성 스크림 — 데스크톱은 텍스트와 3D가 좌우로 나뉘지만, 세로 화면에서는 둘이
          정면으로 겹쳐 본문이 지오메트리 위에서 읽히지 않는다. 텍스트 뒤쪽에만 아주 옅은
          수직 그라디언트를 깔아 대비를 확보하고, 넓은 화면에서는 불필요하므로 끈다. */}
      <div
        aria-hidden
        className="absolute inset-0 sm:hidden"
        style={{
          background:
            mobile && mobilePlacement === 'bottom'
              ? 'linear-gradient(to bottom, transparent 0%, transparent 32%, rgba(7,17,31,0.42) 52%, rgba(7,17,31,0.96) 78%, rgba(7,17,31,0.98) 100%)'
              : 'linear-gradient(to bottom, rgba(7,17,31,0.18) 0%, rgba(7,17,31,0.32) 24%, rgba(7,17,31,0.34) 76%, rgba(7,17,31,0.12) 100%)',
        }}
      />

      {/* 측정폭(measure): 대제목이 text-h2(최대 38px)라 max-w-xl(576px)에서는 한 줄에
          한글 15자 남짓밖에 안 들어가 제목이 과도하게 여러 줄로 쪼개졌다. 42rem으로 넓혀
          제목은 시원하게, 본문 문단은 각자 max-w로 따로 좁혀 가독 폭을 유지한다. */}
      <div className="relative max-w-2xl" ref={contentRef} style={{ pointerEvents: 'none', textAlign }}>
        {children}
      </div>
    </div>
  );
}
