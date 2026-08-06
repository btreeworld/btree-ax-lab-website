import { Badge } from '@/components/ui/Badge';
import { caseStatusLabel, outcomeNotDisclosedLabel, outcomePendingLabel } from '@/content/cases';
import type { CaseStudy } from '@/types';

/**
 * 사례 카드 — 마스터 문서 13.6 / 7.8
 * 실제 구축과 적용 예시를 배지로 시각적으로 구분하고, 검증되지 않은 결과는 수치 대신 상태를 표시한다.
 */
export function CaseCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const outcomeText =
    caseStudy.outcomeStatus === 'verified'
      ? null
      : caseStudy.outcomeStatus === 'pending'
        ? outcomePendingLabel
        : outcomeNotDisclosedLabel;

  return (
    <article
      className="flex h-full flex-col rounded-card border border-line-dark bg-bg-elevated/50 p-6 md:p-7"
      id={caseStudy.slug}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={caseStudy.status === 'actual' ? 'accent' : 'neutral'}>
          {caseStatusLabel[caseStudy.status]}
        </Badge>
        <Badge tone="neutral">{caseStudy.industry}</Badge>
      </div>

      <h3 className="mt-5 text-h4 text-ink-primary-dark">{caseStudy.title}</h3>

      <dl className="mt-5 flex flex-col gap-4 text-body">
        <div>
          <dt className="text-label uppercase tracking-[0.1em] text-ink-secondary-dark/70">문제</dt>
          <dd className="mt-1.5 text-ink-secondary-dark">{caseStudy.problem}</dd>
        </div>
        <div>
          <dt className="text-label uppercase tracking-[0.1em] text-ink-secondary-dark/70">접근</dt>
          <dd className="mt-1.5 text-ink-secondary-dark">{caseStudy.approach}</dd>
        </div>
        <div>
          <dt className="text-label uppercase tracking-[0.1em] text-ink-secondary-dark/70">
            기술 구성
          </dt>
          <dd className="mt-2">
            <ul className="flex flex-wrap gap-2">
              {caseStudy.architecture.map((item) => (
                <li
                  className="rounded-badge border border-line-dark px-3 py-1 text-[13px] text-ink-primary-dark"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>

      <div className="mt-auto border-t border-line-dark pt-5">
        <p className="text-label uppercase tracking-[0.1em] text-ink-secondary-dark/70">결과</p>
        {caseStudy.outcomes?.length ? (
          <ul className="mt-2 flex flex-col gap-1.5">
            {caseStudy.outcomes.map((outcome) => (
              <li className="text-small text-ink-secondary-dark" key={outcome}>
                {outcome}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-small text-state-warning">{outcomeText}</p>
        )}
      </div>
    </article>
  );
}
