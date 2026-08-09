/**
 * three.js 는 CSS 변수를 직접 읽을 수 없으므로, src/app/globals.css 의 색상 토큰을
 * hex literal 로 미러링한다. globals.css 의 :root 블록이 바뀌면 이 파일도 함께 갱신할 것.
 *
 * 매핑 원본: src/app/globals.css :root
 */
export const threeColors = {
  bgPrimary: 0x07111f, // --color-bg-primary — Canvas 배경(SVG 폴백을 완전히 가리는 용도)으로도 사용
  bgElevated: 0x112238, // --color-bg-elevated
  /** 공장·온실 같은 "구조물" 메시 전용 — bgElevated는 배경과 거의 구분되지 않아, 어두운 배경 위에서도
   *  실루엣이 또렷하게 보이도록 한 단계 밝힌 값을 별도로 둔다. globals.css 토큰이 아닌 3D 전용 값. */
  structure: 0x27435e,
  accent: 0x2ad4d9, // --color-accent
  accentHover: 0x5ce4e7, // --color-accent-hover
  accentDeep: 0x076c7d, // --color-accent-deep
  textSecondaryDark: 0xa8b7c9, // --color-text-secondary-dark
  borderDark: 0xffffff, // --color-border-dark 의 base color (opacity 는 머티리얼에서 별도 조절)
  warning: 0xf2b84b, // --color-warning
} as const;

/** Hero/아키텍처 씬에서 공유하는 마운트 기준 — Tailwind 기본 breakpoint(sm=640px)와 동일하게 맞춘다. */
export const THREE_MIN_VIEWPORT_WIDTH = 640;

/** 듀티사이클 펄스 타이밍 — frameloop="demand" 에서 유휴 구간을 실제로 확보하기 위한 기준값. */
export const PULSE_DURATION_MS = 600;
export const PULSE_INTERVAL_MS = 3400;
export const PACKET_TRAVEL_INTERVAL_MS = 5000;
export const PACKET_TRAVEL_DURATION_MS = 1400;
