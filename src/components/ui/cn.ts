/** 조건부 className 결합 유틸 (외부 의존성 없이 유지) */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}
