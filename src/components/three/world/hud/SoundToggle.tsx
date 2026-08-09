'use client';

import { useLocale } from 'next-intl';

import type { Locale } from '@/i18n/locales';

const LABEL: Record<Locale, { sound: string; on: string; off: string }> = {
  ko: { sound: '사운드', on: 'On', off: 'Off' },
  en: { sound: 'Sound', on: 'On', off: 'Off' },
};

/** 고정 사운드 토글 — igloo.inc 레퍼런스와 같은 좌하단 위치, 기본 OFF. */
export function SoundToggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  const locale = useLocale() as Locale;
  const t = LABEL[locale];

  return (
    <button
      aria-pressed={enabled}
      className="fixed bottom-6 left-6 z-20 flex items-center gap-2 rounded-badge border border-line-dark/60 bg-bg-primary/70 px-3 py-2 text-small text-ink-secondary-dark backdrop-blur-sm transition hover:text-ink-primary-dark"
      onClick={onToggle}
      type="button"
    >
      <span aria-hidden className="text-accent">
        {enabled ? '♪' : '×'}
      </span>
      {t.sound} {enabled ? t.on : t.off}
    </button>
  );
}
