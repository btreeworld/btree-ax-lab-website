import { Icon, type IconName } from '@/components/ui/Icon';
import { TextLink } from '@/components/ui/TextLink';
import { industryCardCapabilityLimit } from '@/content/industries';
import type { Industry } from '@/types';

/** 산업 카드 — 마스터 문서 13.6 / 7.5 */

const industryIcons: Record<string, IconName> = {
  manufacturing: 'factory',
  safety: 'shield',
  'smart-farm': 'leaf',
  facility: 'building',
};

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <article
      className="card-hover flex h-full flex-col rounded-card border border-line-dark bg-bg-elevated/50 p-6 md:p-7"
      id={industry.slug}
    >
      <span className="text-accent">
        <Icon className="h-7 w-7" name={industryIcons[industry.slug] ?? 'factory'} />
      </span>

      <h3 className="mt-5 text-h4 text-ink-primary-dark">{industry.name}</h3>
      <p className="mt-3 text-body text-ink-secondary-dark">{industry.problems[0]}</p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {industry.capabilities.slice(0, industryCardCapabilityLimit).map((item) => (
          <li
            className="rounded-badge border border-line-dark px-3 py-1 text-[13px] text-ink-secondary-dark"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <TextLink
          event="industry_card_click"
          eventPayload={{ industry: industry.slug, section: 'industries' }}
          href={`/industries#${industry.slug}`}
        >
          {industry.ctaLabel}
        </TextLink>
      </div>
    </article>
  );
}
