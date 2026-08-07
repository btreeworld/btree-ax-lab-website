import { getLocale } from 'next-intl/server';

import { Button } from '@/components/ui/Button';
import { Container, Eyebrow } from '@/components/ui/Section';
import { finalCta } from '@/content/home';
import { cta } from '@/content/site';
import type { Locale } from '@/i18n/locales';

/** Section 12 — Final CTA (마스터 문서 7.12) */
export async function FinalCtaSection({ section = 'final-cta' }: { section?: string }) {
  const locale = (await getLocale()) as Locale;
  const copy = finalCta[locale];
  const ctaContent = cta[locale];

  return (
    <section className="hero-gradient relative overflow-hidden py-section-y" id="final-cta">
      <div aria-hidden="true" className="grid-overlay pointer-events-none absolute inset-0 opacity-50" />

      <Container className="relative">
        <div className="mx-auto max-w-[760px] text-center">
          <Eyebrow className="justify-center">{copy.eyebrow}</Eyebrow>

          <h2 className="mt-5 text-h1 text-ink-primary-dark">
            {copy.headline.map((line, index) => (
              <span className="block" key={line}>
                {index === copy.headline.length - 1 ? <span className="text-accent">{line}</span> : line}
              </span>
            ))}
          </h2>

          <p className="mt-6 text-body-l text-ink-secondary-dark">{copy.description}</p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button event="cta_ax_diagnosis_click" eventPayload={{ section }} href={ctaContent.primary.href}>
              {ctaContent.primary.label}
            </Button>
            <Button event="cta_project_consulting_click" eventPayload={{ section }} href={ctaContent.secondary.href} variant="secondary">
              {ctaContent.secondary.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
