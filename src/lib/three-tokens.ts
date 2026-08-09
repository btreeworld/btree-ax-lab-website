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
  error: 0xef6b6b, // --color-error — GAP 스테이션의 끊긴 스트림 표시에 사용

  /** ---- 홈 3D 월드("디지털트윈 안으로") 전용 팔레트 — globals.css 토큰 없음 ---- */
  /** 부팅 시퀀스의 포인트클라우드 기본색. accent보다 채도를 낮춰 장시간 응시해도 피로하지 않게 했다. */
  pointCloud: 0x3f8fa8,
  /** 지면 그리드 라인 — bgPrimary 위에서 거의 보이지 않을 정도로 은은하게 */
  groundGrid: 0x1c3348,
  /** 홀로그래픽 패널(인월드 대시보드) 프레임 */
  holoFrame: 0x2ad4d9,
  /** 안개 색 — bgPrimary와 동일해야 지평선이 배경에 자연스럽게 녹아든다 */
  fog: 0x07111f,
} as const;

/** Hero/아키텍처 씬에서 공유하는 마운트 기준 — Tailwind 기본 breakpoint(sm=640px)와 동일하게 맞춘다. */
export const THREE_MIN_VIEWPORT_WIDTH = 640;

/** 듀티사이클 펄스 타이밍 — frameloop="demand" 에서 유휴 구간을 실제로 확보하기 위한 기준값. */
export const PULSE_DURATION_MS = 600;
export const PULSE_INTERVAL_MS = 3400;
export const PACKET_TRAVEL_INTERVAL_MS = 5000;
export const PACKET_TRAVEL_DURATION_MS = 1400;
