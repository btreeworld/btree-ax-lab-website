'use client';

import dynamic from 'next/dynamic';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

import { architectureLayers } from '@/content/home';
import { useCanMount3D } from '@/hooks/useCanMount3D';
import type { Locale } from '@/i18n/locales';

/**
 * Hero 3D 씬 로더 — 반드시 'use client' 경계에서 dynamic(ssr:false)를 호출해야 한다.
 * HeroSection.tsx는 async Server Component라 그 안에서 직접 호출하면 Next 15 빌드가 실패한다.
 *
 * 로드 지연 전략: requestIdleCallback(폴백 setTimeout)으로 청크 fetch 자체를 늦춰
 * 초기 페인트(LCP 후보인 헤드라인 텍스트)와 경합하지 않도록 한다.
 */
const HeroScene = dynamic(() => import('@/components/three/HeroScene').then((m) => m.HeroScene), {
  ssr: false,
  loading: () => null,
});

export function HeroSceneLoader() {
  const locale = useLocale() as Locale;
  const canMount = useCanMount3D();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!canMount) {
      setReady(false);
      return;
    }

    const win = window as Window & { requestIdleCallback?: (cb: () => void) => number; cancelIdleCallback?: (id: number) => void };
    if (typeof win.requestIdleCallback === 'function') {
      const id = win.requestIdleCallback(() => setReady(true));
      return () => win.cancelIdleCallback?.(id);
    }

    const timeout = window.setTimeout(() => setReady(true), 300);
    return () => window.clearTimeout(timeout);
  }, [canMount]);

  if (!ready) return null;

  const layers = architectureLayers[locale];
  const labels = {
    camera: layers.find((layer) => layer.id === 'field')?.label ?? 'FIELD',
    edge: layers.find((layer) => layer.id === 'edge')?.label ?? 'EDGE',
    twin: layers.find((layer) => layer.id === 'twin')?.label ?? 'DIGITAL TWIN',
  };

  return (
    <div aria-hidden="true" className="absolute inset-0 animate-fade-up">
      <HeroScene labels={labels} />
    </div>
  );
}
