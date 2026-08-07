import { getLocale, getTranslations } from 'next-intl/server';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Section';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/locales';
import { cta, navigation } from '@/content/site';

/** 404 페이지 — 마스터 문서 18.5 */
export default async function NotFound() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('NotFound');
  const nav = navigation[locale];

  return (
    <section className="hero-gradient relative overflow-hidden py-[160px]">
      <div aria-hidden="true" className="grid-overlay pointer-events-none absolute inset-0 opacity-50" />

      <Container className="relative">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="font-display text-label uppercase tracking-[0.16em] text-accent">{t('eyebrow')}</p>
          <h1 className="mt-5 text-h1 text-ink-primary-dark">{t('title')}</h1>
          <p className="mt-6 text-body-l text-ink-secondary-dark">{t('description')}</p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/">{t('goHome')}</Button>
            <Button href={cta[locale].secondary.href} variant="secondary" withArrow>
              {cta[locale].secondary.label}
            </Button>
          </div>

          <ul className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link className="text-small text-ink-secondary-dark underline-offset-4 hover:text-accent hover:underline" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
