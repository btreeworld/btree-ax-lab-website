/**
 * WebGL 지원 여부 — 여러 3D 마운트 게이트(useCanMount3D, useJourneyQuality)가 공유한다.
 * 사파리 사설모드·사내 보안정책 등으로 컨텍스트 생성이 막힌 환경 대비.
 */
let cachedWebglSupport: boolean | null = null;

export function supportsWebGL(): boolean {
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
