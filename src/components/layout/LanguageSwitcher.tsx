'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';
import { locales } from '@/i18n/locales';

/**
 * 언어 전환 — 현재 페이지 경로를 유지한 채 locale만 바꾼다.
 * 새 언어를 추가하려면 src/i18n/locales.ts 의 locales 배열에 코드만 추가하면 자동 반영된다.
 */
export function LanguageSwitcher({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const t = useTranslations('LanguageSwitcher');
  const pathname = usePathname();
  const activeLocale = useLocale();

  return (
    <nav aria-label={t('label')} className="flex items-center gap-1">
      {locales.map((locale) => {
        const active = locale === activeLocale;
        return (
          <Link
            aria-current={active ? 'true' : undefined}
            className={
              tone === 'dark'
                ? `min-h-[36px] rounded-button px-2.5 text-[13px] font-semibold uppercase tracking-wide transition-colors ${
                    active ? 'text-accent' : 'text-ink-secondary-dark hover:text-ink-primary-dark'
                  }`
                : `min-h-[36px] rounded-button px-2.5 text-[13px] font-semibold uppercase tracking-wide transition-colors ${
                    active ? 'text-accent-deep' : 'text-ink-secondary-light hover:text-ink-primary-light'
                  }`
            }
            href={pathname}
            key={locale}
            locale={locale}
          >
            {locale}
          </Link>
        );
      })}
    </nav>
  );
}
