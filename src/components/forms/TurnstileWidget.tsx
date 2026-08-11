'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      remove: (widgetId: string) => void;
    };
  }
}

/**
 * Cloudflare Turnstile 위젯 — 문의 폼의 봇 방지 2차 방어선(1차는 honeypot).
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY가 없으면 ContactForm이 이 컴포넌트를 아예 렌더링하지
 * 않으므로, 사이트키를 발급하기 전까지는 기존과 동일하게 동작한다.
 */
export function TurnstileWidget({
  siteKey,
  onVerify,
  onExpire,
}: {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpire: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // 매 렌더의 최신 콜백을 ref에만 반영한다 — effect 의존성에 넣으면 부모가 인라인 함수를
  // 넘길 때마다 위젯이 제거·재생성되는 루프가 생긴다.
  onVerifyRef.current = onVerify;
  onExpireRef.current = onExpire;

  useEffect(() => {
    if (!scriptLoaded || !containerRef.current || !window.turnstile || widgetIdRef.current) return;

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: (token: string) => onVerifyRef.current(token),
      'expired-callback': () => onExpireRef.current(),
      'error-callback': () => onExpireRef.current(),
    });

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [scriptLoaded, siteKey]);

  return (
    <>
      <Script onLoad={() => setScriptLoaded(true)} src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
      <div ref={containerRef} />
    </>
  );
}
