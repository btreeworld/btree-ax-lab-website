import Link from 'next/link';

import { site } from '@/content/site';

/**
 * 로고 — 마스터 문서 6.1
 * 헤더에는 BTREE AX LAB 을 우선 노출하고 보조 문구로 by BTREE Inc. 를 함께 표기한다.
 * 워드마크 이미지 제작 전까지 타이포그래피 기반 로고를 사용한다 (28장: 로고 제작 필요).
 */
export function Logo({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const textColor = tone === 'dark' ? 'text-ink-primary-dark' : 'text-ink-primary-light';
  const subColor = tone === 'dark' ? 'text-ink-secondary-dark' : 'text-ink-secondary-light';

  return (
    <Link
      aria-label={`${site.brand} 홈으로 이동`}
      className="flex items-center gap-3 rounded-button py-1"
      href="/"
    >
      <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center">
        <svg
          className="h-9 w-9"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path className="text-accent" d="M18 5v9m0 0-8 5m8-5 8 5m-16 0v7m16-7v7" />
          <circle className="text-accent" cx="18" cy="4.6" fill="currentColor" r="2.2" stroke="none" />
          <circle className="text-accent/70" cx="10" cy="19.4" fill="currentColor" r="2" stroke="none" />
          <circle className="text-accent/70" cx="26" cy="19.4" fill="currentColor" r="2" stroke="none" />
          <circle className="text-accent/40" cx="10" cy="27" fill="currentColor" r="1.7" stroke="none" />
          <circle className="text-accent/40" cx="26" cy="27" fill="currentColor" r="1.7" stroke="none" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[17px] font-bold tracking-tight ${textColor}`}>
          {site.brand}
        </span>
        <span className={`mt-1 text-[11px] font-medium tracking-wide ${subColor}`}>{site.byline}</span>
      </span>
    </Link>
  );
}
