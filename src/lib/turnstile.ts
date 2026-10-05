/**
 * Turnstile 사이트키 — NEXT_PUBLIC_ 값은 `next build` 시점에 번들에 인라인된다.
 * 클라이언트(위젯 렌더링 여부)와 서버(토큰 요구 여부)가 반드시 같은 빌드 값을 보도록
 * 이 한 곳에서 읽는다. 런타임에만 넣은 값은 클라이언트에 들어가지 않으므로, 서버가 런타임
 * 시크릿만 보고 토큰을 요구하면 위젯 없이 모든 제출이 거부된다(실제 발생한 장애).
 */
export const turnstileSiteKey: string | undefined = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || undefined;
