import type { CSSProperties } from 'react';

import { cn } from '@/components/ui/cn';
import { splitCountValue } from '@/lib/motion';

/**
 * 지표 값 — countTo가 있으면 스크롤에 맞춰 0부터 세어 올라간다(motion.css `.count-up`).
 * 시각 카운터는 aria-hidden이고, 원래 텍스트는 그대로 DOM에 남아 스크린리더와
 * 스크롤 타임라인 미지원·모션 감소 환경에서 표시된다.
 */
export function MetricValue({ value, countTo, className }: { value: string; countTo?: number; className?: string }) {
  if (countTo === undefined) {
    return <span className={className}>{value}</span>;
  }

  const { suffix } = splitCountValue(value, countTo);

  return (
    <span className={cn('count-up', className)} style={{ '--to': countTo } as CSSProperties}>
      <span aria-hidden="true" className="count-up__visual">
        {suffix}
      </span>
      <span className="count-up__text">{value}</span>
    </span>
  );
}
