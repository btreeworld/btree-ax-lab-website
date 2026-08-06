'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { trackEvent } from '@/lib/analytics';

/** scroll_50 / scroll_90 이벤트 — 마스터 문서 19.1 */
export function ScrollTracker() {
  const pathname = usePathname();
  const fired = useRef<Set<number>>(new Set());

  useEffect(() => {
    fired.current = new Set();

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const depth = (window.scrollY / scrollable) * 100;

      if (depth >= 50 && !fired.current.has(50)) {
        fired.current.add(50);
        trackEvent('scroll_50', { page_path: pathname });
      }
      if (depth >= 90 && !fired.current.has(90)) {
        fired.current.add(90);
        trackEvent('scroll_90', { page_path: pathname });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  return null;
}
