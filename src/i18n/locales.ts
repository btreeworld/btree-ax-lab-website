/**
 * 지원 언어 정의 — 마스터 문서 0장 "주요 언어: 한국어 우선, 보조 언어: 영어·중국어 확장 가능"
 * 새 언어를 추가할 때는 이 배열에 코드만 추가하고, content/* 의 각 locale record와
 * messages/{locale}.json 을 채우면 된다.
 */
export const locales = ['ko', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ko';

export const localeLabels: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
