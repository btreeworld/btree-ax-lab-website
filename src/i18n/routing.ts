import { defineRouting } from 'next-intl/routing';

import { defaultLocale, locales } from '@/i18n/locales';

/**
 * localePrefix 'as-needed' — 기본 언어(ko)는 접두사 없이(`/services`),
 * 나머지 언어는 접두사와 함께(`/en/services`) 노출한다.
 * 기존에 색인된 한국어 URL 구조를 그대로 유지하기 위한 선택이다.
 */
export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});
