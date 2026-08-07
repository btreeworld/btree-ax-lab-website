import type { ReactElement } from 'react';

/**
 * 아이콘 — 마스터 문서 13.7
 * 선 굵기 1.75px 의 단순 선형 아이콘 한 세트만 사용한다.
 * 장식용이므로 aria-hidden 처리하고, 아이콘 단독 버튼에는 별도 레이블을 제공한다.
 */
export type IconName =
  | 'search'
  | 'blueprint'
  | 'flask'
  | 'advisory'
  | 'camera'
  | 'sensor'
  | 'edge'
  | 'database'
  | 'twin'
  | 'alert'
  | 'robot'
  | 'factory'
  | 'shield'
  | 'leaf'
  | 'building'
  | 'check'
  | 'graduation'
  | 'briefcase';

const paths: Record<IconName, ReactElement> = {
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  blueprint: (
    <>
      <rect height="15" rx="1.5" width="17" x="3.5" y="4.5" />
      <path d="M3.5 9.5h17M9 9.5v10M14.5 4.5v15" />
    </>
  ),
  flask: (
    <>
      <path d="M9.5 3.5v6L4.7 18a1.6 1.6 0 0 0 1.4 2.5h11.8a1.6 1.6 0 0 0 1.4-2.5l-4.8-8.5v-6" />
      <path d="M8 3.5h8M7.6 14.5h8.8" />
    </>
  ),
  advisory: (
    <>
      <path d="M20.5 15.5a2 2 0 0 1-2 2H8l-4.5 3.5v-14a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
      <path d="M8.5 8.5h7M8.5 12h4.5" />
    </>
  ),
  camera: (
    <>
      <path d="M3.5 8.5A2 2 0 0 1 5.5 6.5h2l1.5-2h6l1.5 2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" />
      <circle cx="12" cy="12.5" r="3.2" />
    </>
  ),
  sensor: (
    <>
      <circle cx="12" cy="12" r="2.2" />
      <path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 16.2a6 6 0 0 0 0-8.4M4.9 4.9a10 10 0 0 0 0 14.2M19.1 19.1a10 10 0 0 0 0-14.2" />
    </>
  ),
  edge: (
    <>
      <rect height="11" rx="1.6" width="15" x="4.5" y="6.5" />
      <path d="M8 10.5h8M8 13.5h5M2.5 12h2M19.5 12h2M12 3.5v3M12 17.5v3" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6.5" rx="7.5" ry="3" />
      <path d="M4.5 6.5v11c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-11" />
      <path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
    </>
  ),
  twin: (
    <>
      <path d="m12 3.5 8 4.5v8l-8 4.5-8-4.5v-8z" />
      <path d="M12 12.5 20 8M12 12.5 4 8M12 12.5v8" />
    </>
  ),
  alert: (
    <>
      <path d="M12 4.5a5.5 5.5 0 0 0-5.5 5.5c0 4-1.5 5.5-1.5 5.5h14s-1.5-1.5-1.5-5.5A5.5 5.5 0 0 0 12 4.5" />
      <path d="M10.3 19a2 2 0 0 0 3.4 0" />
    </>
  ),
  robot: (
    <>
      <rect height="10" rx="2" width="14" x="5" y="8.5" />
      <path d="M12 4.5v4M9 12.5h.01M15 12.5h.01M9.5 16h5" />
    </>
  ),
  factory: (
    <>
      <path d="M3.5 20.5v-9l5.5 3.5v-3.5l5.5 3.5V6.5h6v14z" />
      <path d="M7 17.5h.01M12 17.5h.01M17.5 17.5h.01" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 5 6.2v5.3c0 4.4 2.9 8 7 9.5 4.1-1.5 7-5.1 7-9.5V6.2z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4.5c0 8-4.6 12-9.5 12A5.5 5.5 0 0 1 5 11c0-4.5 5-6.5 15-6.5" />
      <path d="M4.5 20.5c1.5-5 5-9 11-11.5" />
    </>
  ),
  building: (
    <>
      <rect height="17" rx="1.5" width="12" x="6" y="3.5" />
      <path d="M9.5 8h2M14 8h.5M9.5 12h2M14 12h.5M10.5 20.5v-3.5h3v3.5" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  graduation: (
    <>
      <path d="m12 4.5 9 4.5-9 4.5-9-4.5z" />
      <path d="M7 11v5c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-5M20.5 9.5v6" />
    </>
  ),
  briefcase: (
    <>
      <rect height="12" rx="1.6" width="18" x="3" y="8" />
      <path d="M8.5 8V6a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 6v2M3 13.5h18" />
    </>
  ),
};

export function Icon({
  name,
  className = 'h-6 w-6',
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths[name]}
    </svg>
  );
}
