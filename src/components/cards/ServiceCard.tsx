import { getTranslations } from 'next-intl/server';

import { Icon, type IconName } from '@/components/ui/Icon';
import { TextLink } from '@/components/ui/TextLink';
import type { Service } from '@/types';

/** 서비스 카드 — 마스터 문서 13.6 / 7.3 (단계 번호·서비스명·설명·결과물 3개·시작 가격·상세보기) */

const serviceIcons: Record<string, IconName> = {
  'ax-diagnosis': 'search',
  'system-design': 'blueprint',
  poc: 'flask',
  advisory: 'advisory',
  'rnd-planning': 'twin',
};

export async function ServiceCard({ service, tone = 'dark' }: { service: Service; tone?: 'dark' | 'light' }) {
  const t = await getTranslations('Cards');
  const dark = tone === 'dark';
  const deliverables = service.deliverables.slice(0, 3);

  return (
    <article
      className={
        dark
          ? 'flex h-full flex-col rounded-card border border-line-dark bg-bg-elevated/60 p-6 transition-colors hover:border-accent/40 md:p-7'
          : 'flex h-full flex-col rounded-card border border-line-light bg-surface-white p-6 transition-colors hover:border-accent-deep/40 md:p-7'
      }
      id={service.slug}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`font-display text-small font-bold ${dark ? 'text-accent' : 'text-accent-deep'}`}
        >
          STEP {service.step}
        </span>
        <span className={dark ? 'text-accent' : 'text-accent-deep'}>
          <Icon name={serviceIcons[service.slug] ?? 'blueprint'} />
        </span>
      </div>

      <h3
        className={`mt-4 text-h4 ${dark ? 'text-ink-primary-dark' : 'text-ink-primary-light'}`}
      >
        {service.name}
      </h3>
      <p
        className={`mt-3 text-body ${dark ? 'text-ink-secondary-dark' : 'text-ink-secondary-light'}`}
      >
        {service.summary}
      </p>

      <div className="mt-6">
        <h4
          className={`text-label uppercase tracking-[0.1em] ${
            dark ? 'text-ink-secondary-dark/70' : 'text-ink-secondary-light/70'
          }`}
        >
          {t('deliverables')}
        </h4>
        <ul className="mt-3 flex flex-col gap-2">
          {deliverables.map((item) => (
            <li
              className={`flex items-start gap-2 text-small ${
                dark ? 'text-ink-secondary-dark' : 'text-ink-secondary-light'
              }`}
              key={item}
            >
              <span
                aria-hidden="true"
                className={`mt-2 h-1 w-1 shrink-0 rounded-full ${dark ? 'bg-accent' : 'bg-accent-deep'}`}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`mt-auto border-t pt-5 ${dark ? 'border-line-dark' : 'border-line-light'}`}
      >
        {service.startingPrice ? (
          <p
            className={`text-[15px] font-semibold ${
              dark ? 'text-ink-primary-dark' : 'text-ink-primary-light'
            }`}
          >
            {service.startingPrice}
          </p>
        ) : null}
        {service.caution ? (
          <p
            className={`mt-2 text-[13px] ${
              dark ? 'text-ink-secondary-dark/80' : 'text-ink-secondary-light/80'
            }`}
          >
            {service.caution}
          </p>
        ) : null}
        <TextLink
          className="mt-3"
          event="service_card_click"
          eventPayload={{ service_type: service.slug, section: 'services' }}
          href={`/services#${service.slug}`}
          tone={tone}
        >
          {t('viewDetails', { name: service.name })}
        </TextLink>
      </div>
    </article>
  );
}
