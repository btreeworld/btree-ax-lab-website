import type { CSSProperties } from 'react';

/**
 * 스크롤 진입 stagger — motion.css의 `.reveal`이 읽는 `--i`를 설정한다.
 * 같은 행의 카드만 어긋나게 하려고 열 수로 나눈 나머지를 쓴다(다음 행은 다시 0부터).
 */
export function stagger(index: number, columns: number): CSSProperties {
  return { '--i': index % columns } as CSSProperties;
}

/**
 * count-up 표시값 분리 — '9건'과 countTo 9에서 접미사 '건'을 떼어 낸다.
 * 표시 문자열이 countTo로 시작하지 않으면 예외를 던진다. 검증된 원문 값과 다른 숫자가
 * 카운터에 들어가는 것을 빌드 단계에서 막기 위해서다(마스터 문서 13.9: 검증된 지표에만).
 */
export function splitCountValue(value: string, countTo: number): { suffix: string } {
  const prefix = String(countTo);
  if (!value.startsWith(prefix)) {
    throw new Error(`count-up 값 불일치: "${value}"는 ${countTo}로 시작해야 합니다.`);
  }
  return { suffix: value.slice(prefix.length) };
}
