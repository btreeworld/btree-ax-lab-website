/**
 * Hero 비주얼 — 마스터 문서 7.1 Visual Direction
 * 공장·온실·카메라·센서 노드가 한 화면에서 연결되는 선형 다이어그램.
 * 3D 지구본·AI 두뇌·휴머노이드 로봇 이미지를 사용하지 않는다.
 * 장식 그래픽이므로 aria-hidden 처리하고, 정보는 본문 텍스트로 전달한다.
 */
export function FieldVisual({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      role="presentation"
      viewBox="0 0 520 440"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="fv-panel" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#123049" stopOpacity="0.55" />
          <stop offset="1" stopColor="#0A1A2B" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="fv-line" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#2AD4D9" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#2AD4D9" stopOpacity="0.75" />
          <stop offset="1" stopColor="#2AD4D9" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* 배경 그리드 */}
      <g stroke="#2AD4D9" strokeOpacity="0.07">
        {Array.from({ length: 9 }, (_, index) => (
          <line key={`h${index}`} x1="20" x2="500" y1={40 + index * 45} y2={40 + index * 45} />
        ))}
        {Array.from({ length: 11 }, (_, index) => (
          <line key={`v${index}`} x1={20 + index * 48} x2={20 + index * 48} y1="40" y2="400" />
        ))}
      </g>

      {/* 계층 패널 */}
      <g>
        <rect fill="url(#fv-panel)" height="86" rx="14" stroke="#2AD4D9" strokeOpacity="0.22" width="460" x="30" y="52" />
        <rect fill="url(#fv-panel)" height="86" rx="14" stroke="#2AD4D9" strokeOpacity="0.22" width="460" x="30" y="178" />
        <rect fill="url(#fv-panel)" height="86" rx="14" stroke="#2AD4D9" strokeOpacity="0.22" width="460" x="30" y="304" />
      </g>

      {/* 계층 라벨 */}
      <g fill="#2AD4D9" fontFamily="var(--font-display)" fontSize="11" fontWeight="600" letterSpacing="2">
        <text x="46" y="44">FIELD</text>
        <text x="46" y="170">EDGE</text>
        <text x="46" y="296">DIGITAL TWIN</text>
      </g>

      {/* FIELD — 카메라 / 센서 / 설비 */}
      <g stroke="#8FE6E9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6">
        {/* 카메라 */}
        <g transform="translate(66 78)">
          <path d="M2 6h20a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H2a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z" />
          <circle cx="12" cy="15" r="5" />
          <path d="M6 6 8 1h8l2 5" />
        </g>
        {/* 공장 */}
        <g transform="translate(180 76)">
          <path d="M0 28V12l9 5.5V12l9 5.5V4h11v24z" />
          <path d="M5 24h.01M13 24h.01M22 24h.01" />
        </g>
        {/* 온실 */}
        <g transform="translate(290 78)">
          <path d="M0 26V11L13 2l13 9v15z" />
          <path d="M13 2v24M0 15h26" />
        </g>
        {/* 센서 */}
        <g transform="translate(400 80)">
          <circle cx="12" cy="12" r="3" />
          <path d="M6.5 6.5a7.8 7.8 0 0 0 0 11M17.5 17.5a7.8 7.8 0 0 0 0-11" />
          <path d="M12 15v9" />
        </g>
      </g>

      {/* 연결선: FIELD → EDGE */}
      <g stroke="url(#fv-line)" strokeWidth="1.4">
        <path d="M78 118v34a12 12 0 0 0 12 12h60" />
        <path d="M194 118v46h-44" />
        <path d="M303 118v46h44" />
        <path d="M412 118v34a12 12 0 0 1-12 12h-53" />
      </g>

      {/* EDGE — 추론 노드 */}
      <g>
        <rect fill="#0E2438" height="44" rx="10" stroke="#2AD4D9" strokeOpacity="0.45" width="128" x="86" y="199" />
        <rect fill="#0E2438" height="44" rx="10" stroke="#2AD4D9" strokeOpacity="0.45" width="128" x="306" y="199" />
        <text fill="#CFE9EB" fontFamily="var(--font-sans)" fontSize="12" x="106" y="226">
          AI 추론 · 이벤트
        </text>
        <text fill="#CFE9EB" fontFamily="var(--font-sans)" fontSize="12" x="326" y="226">
          수집 · 로컬 저장
        </text>
      </g>

      {/* 연결선: EDGE → DIGITAL TWIN */}
      <g stroke="url(#fv-line)" strokeWidth="1.4">
        <path d="M150 243v30a12 12 0 0 0 12 12h88" />
        <path d="M370 243v30a12 12 0 0 1-12 12h-88" />
      </g>

      {/* DIGITAL TWIN — 운영 화면 */}
      <g>
        <rect fill="#0E2438" height="60" rx="10" stroke="#2AD4D9" strokeOpacity="0.5" width="300" x="110" y="317" />
        <g stroke="#2AD4D9" strokeOpacity="0.55" strokeWidth="1.4">
          <path d="M126 361v-16M142 361v-26M158 361v-9M174 361v-21" />
        </g>
        <g stroke="#8FE6E9" strokeLinecap="round" strokeWidth="1.4">
          <path d="M200 333h94M200 345h72M200 357h56" />
        </g>
        {/* CSS 애니메이션을 사용해 prefers-reduced-motion 설정을 따르도록 한다. */}
        <circle className="animate-node-pulse" cx="384" cy="336" fill="#2AD4D9" r="4" />
        <text fill="#8FA9BF" fontFamily="var(--font-sans)" fontSize="10" x="358" y="360">
          ALERT
        </text>
      </g>
    </svg>
  );
}
