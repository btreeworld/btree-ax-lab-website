import { getLocale, getTranslations } from 'next-intl/server';

import { Badge } from '@/components/ui/Badge';
import { cn } from '@/components/ui/cn';
import { caseStatusLabel, outcomeNotDisclosedLabel, outcomePendingLabel } from '@/content/cases';
import type { Locale } from '@/i18n/locales';
import type { CaseStudy } from '@/types';

/**
 * 사례 카드 — 마스터 문서 13.6 / 7.8
 * 실제 구축과 적용 예시를 배지로 시각적으로 구분하고, 검증되지 않은 결과는 수치 대신 상태를 표시한다.
 *
 * `compact` — 홈 페이지 전용. 문제/접근 설명을 2줄로 잘라 텍스트 분량을 줄인다.
 * 전문은 `/cases` 전용 페이지(compact 미지정)에서 그대로 유지된다.
 */
export async function CaseCard({ caseStudy, compact = false }: { caseStudy: CaseStudy; compact?: boolean }) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('Cards');

  const outcomeText =
    caseStudy.outcomeStatus === 'verified'
      ? null
      : caseStudy.outcomeStatus === 'pending'
        ? outcomePendingLabel[locale]
        : outcomeNotDisclosedLabel[locale];

  return (
    <article className="flex h-full flex-col rounded-card border border-line-dark bg-bg-elevated/50 p-6 md:p-7" id={caseStudy.slug}>
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={caseStudy.status === 'actual' ? 'accent' : 'neutral'}>{caseStatusLabel[locale][caseStudy.status]}</Badge>
        <Badge tone="neutral">{caseStudy.industry}</Badge>
      </div>

      <h3 className="mt-5 text-h4 text-ink-primary-dark">{caseStudy.title}</h3>

      <dl className="mt-5 flex flex-col gap-4 text-body">
        <div>
          <dt className="text-label uppercase tracking-[0.1em] text-ink-secondary-dark/70">{t('problem')}</dt>
          <dd className={cn('mt-1.5 text-ink-secondary-dark', compact && 'line-clamp-2')}>{caseStudy.problem}</dd>
        </div>
        <div>
          <dt className="text-label uppercase tracking-[0.1em] text-ink-secondary-dark/70">{t('approach')}</dt>
          <dd className={cn('mt-1.5 text-ink-secondary-dark', compact && 'line-clamp-2')}>{caseStudy.approach}</dd>
        </div>
        <div>
          <dt className="text-label uppercase tracking-[0.1em] text-ink-secondary-dark/70">{t('architecture')}</dt>
          <dd className="mt-2">
            <ul className="flex flex-wrap gap-2">
              {(compact ? caseStudy.architecture.slice(0, 3) : caseStudy.architecture).map((item) => (
                <li className="rounded-badge border border-line-dark px-3 py-1 text-[13px] text-ink-primary-dark" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>

      {compact ? null : (
        <div className="mt-auto border-t border-line-dark pt-5">
          <p className="text-label uppercase tracking-[0.1em] text-ink-secondary-dark/70">{t('result')}</p>
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
      )}
    </article>
  );
}
