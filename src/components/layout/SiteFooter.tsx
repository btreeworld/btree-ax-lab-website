import { getLocale, getTranslations } from 'next-intl/server';

import { Logo } from '@/components/layout/Logo';
import { Container } from '@/components/ui/Section';
import { disclaimers, footerNav, legalInfo, site } from '@/content/site';
import type { Locale } from '@/i18n/locales';
import { Link } from '@/i18n/navigation';

/** 푸터 — 마스터 문서 6.2 */
export async function SiteFooter() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('Footer');
  const year = new Date().getFullYear();
  const legal = legalInfo[locale];
  const legalRows = Object.values(legal);
  const nav = footerNav[locale];

  return (
    <footer className="border-t border-line-dark bg-bg-secondary">
      <Container className="py-14 md:py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-[360px] text-small text-ink-secondary-dark">{site.brandRelation[locale]}</p>
            <p className="mt-4 text-label uppercase tracking-[0.16em] text-accent">{site.tagline}</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            {Object.entries(nav).map(([key, group]) => (
              <nav aria-label={group.title} key={key}>
                <h2 className="text-label uppercase tracking-[0.12em] text-ink-primary-dark">{group.title}</h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        className="inline-block py-1 text-small text-ink-secondary-dark transition-colors hover:text-accent"
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-line-dark pt-8">
          <h2 className="text-label uppercase tracking-[0.12em] text-ink-primary-dark">{t('companyInfoTitle')}</h2>
          <dl className="mt-4 grid gap-x-8 gap-y-2 text-small text-ink-secondary-dark sm:grid-cols-2 lg:grid-cols-3">
            {legalRows.map((row) => (
              <div className="flex gap-2" key={row.label}>
                <dt className="shrink-0 text-ink-secondary-dark/70">{row.label}</dt>
                <dd className={row.status === 'placeholder' ? 'text-state-warning' : undefined}>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-8 border-t border-line-dark pt-8">
          <h2 className="sr-only">{t('disclaimerTitle')}</h2>
          <ul className="flex flex-col gap-1.5 text-[13px] leading-relaxed text-ink-secondary-dark/70">
            {disclaimers[locale].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-line-dark pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-small text-ink-secondary-dark/70">{t('copyright', { year, legalName: legal.company.value })}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.legal.links.map((link) => (
              <li key={link.href}>
                <Link className="text-small text-ink-secondary-dark transition-colors hover:text-accent" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
