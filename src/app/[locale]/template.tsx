'use client';

import { ViewTransition, type ReactNode } from 'react';

import { usePathname } from '@/i18n/navigation';

/**
 * 페이지 전환 — React <ViewTransition>(19.3 stable) + Next 16 라우터.
 * 레이아웃은 내비게이션 사이에 유지되어 enter/exit가 일어나지 않으므로, 매 이동마다 다시
 * 마운트되는 template에 둔다. 애니메이션은 motion.css의 `.page-enter`/`.page-exit`.
 *
 * - 홈은 전환에서 뺀다. 홈은 섹션형 폴백을 먼저 렌더한 뒤 다음 렌더에서 3D 월드로 바꾸므로,
 *   진입 스냅샷이 폴백을 잡아 애니메이션한 직후 3D로 바뀌며 번쩍인다(실측 ~150ms).
 * - 단일 div로 감싸 섹션별로 따로 캡처되지 않게 한다.
 * - 이 div에는 transform·filter·contain을 주지 않는다 — 홈의 고정 WebGL 캔버스와 HUD가
 *   이 div를 기준으로 배치되면 깨진다.
 * - default="none": 페이지 안에서 일어나는 일반 업데이트(폼 입력 등)는 전환하지 않는다.
 */
export default function Template({ children }: { children: ReactNode }) {
  const isHome = usePathname() === '/';

  return (
    <ViewTransition default="none" enter={isHome ? 'none' : 'page-enter'} exit={isHome ? 'none' : 'page-exit'}>
      <div>{children}</div>
    </ViewTransition>
  );
}
