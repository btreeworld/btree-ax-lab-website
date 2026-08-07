import { getTranslations } from 'next-intl/server';

import { Container, Eyebrow } from '@/components/ui/Section';
import { Link } from '@/i18n/navigation';

/** 하위 페이지 공통 Hero + Breadcrumb (마스터 문서 15.1 Breadcrumb / 18.4) */
export async function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  children,
}: {
  eyebrow?: string;
  title: readonly string[] | string;
  description?: readonly string[] | string;
  breadcrumb: ReadonlyArray<{ name: string; path: string }>;
  children?: React.ReactNode;
}) {
  const t = await getTranslations('Common');
  const titleLines = Array.isArray(title) ? title : [title];
  const descriptionLines = Array.isArray(description) ? description : description ? [description] : [];

  return (
    <section className="hero-gradient relative overflow-hidden pb-16 pt-[112px] md:pb-20 md:pt-[152px]">
      <div aria-hidden="true" className="grid-overlay pointer-events-none absolute inset-0 opacity-50" />

      <Container className="relative">
        <nav aria-label={t('breadcrumbLabel')}>
          <ol className="flex flex-wrap items-center gap-2 text-small text-ink-secondary-dark">
            {breadcrumb.map((item, index) => (
              <li className="flex items-center gap-2" key={item.path}>
                {index > 0 ? (
                  <span aria-hidden="true" className="text-ink-secondary-dark/50">
                    /
                  </span>
                ) : null}
                {index === breadcrumb.length - 1 ? (
                  <span aria-current="page" className="text-ink-primary-dark">
                    {item.name}
                  </span>
                ) : (
                  <Link className="transition-colors hover:text-accent" href={item.path}>
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {eyebrow ? <Eyebrow className="mt-8">{eyebrow}</Eyebrow> : null}

        <h1 className="mt-5 max-w-headline text-h1 text-ink-primary-dark">
          {titleLines.map((line) => (
            <span className="block" key={line}>
              {line}
            </span>
          ))}
        </h1>

        {descriptionLines.length ? (
          <p className="mt-6 max-w-[720px] text-body-l text-ink-secondary-dark">
            {descriptionLines.map((line) => (
              <span className="block" key={line}>
                {line}
              </span>
            ))}
          </p>
        ) : null}

        {children ? <div className="mt-9">{children}</div> : null}
      </Container>
    </section>
  );
}
