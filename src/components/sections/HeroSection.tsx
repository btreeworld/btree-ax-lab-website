import { getLocale } from 'next-intl/server';

import { FieldVisual } from '@/components/diagrams/FieldVisual';
import { Button } from '@/components/ui/Button';
import { Container, Eyebrow } from '@/components/ui/Section';
import { hero } from '@/content/home';
import { cta } from '@/content/site';
import type { Locale } from '@/i18n/locales';

/**
 * Section 01 — Hero (마스터 문서 7.1)
 * 방문자가 5초 안에 대상·문제·해결 방식·다음 행동을 이해하도록 구성한다.
 */
export async function HeroSection() {
  const locale = (await getLocale()) as Locale;
  const copy = hero[locale];
  const ctaContent = cta[locale];

  return (
    <section className="hero-gradient relative overflow-hidden pb-[80px] pt-[112px] md:pb-[120px] md:pt-[152px]">
      <div aria-hidden="true" className="grid-overlay pointer-events-none absolute inset-0 opacity-60" />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow>{copy.eyebrow}</Eyebrow>

            <h1 className="mt-5 max-w-headline text-display-l text-ink-primary-dark">
              {copy.headline.map((line, index) => (
                <span className="block" key={line}>
                  {index === copy.headline.length - 1 ? (
                    <span className="bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>

            <p className="mt-6 max-w-[600px] text-body-l text-ink-secondary-dark">
              {copy.description.map((line) => (
                <span className="block" key={line}>
                  {line}
                </span>
              ))}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button event="cta_ax_diagnosis_click" eventPayload={{ section: 'hero' }} href={ctaContent.primary.href}>
                {ctaContent.primary.label}
              </Button>
              <Button href={ctaContent.services.href} variant="secondary" withArrow>
                {ctaContent.services.label}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            {/* 모바일에서는 그래픽을 단순화해 숨기고 정보는 아래 Trust Strip 으로 전달한다. */}
            <div className="hidden sm:block">
              <FieldVisual className="mx-auto h-auto w-full max-w-[520px]" locale={locale} />
            </div>
          </div>
        </div>

        {/* Trust Strip — 검증된 사실만 사용한다 (7.1) */}
        <ul className="mt-14 grid gap-px overflow-hidden rounded-card border border-line-dark bg-white/5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {copy.trustStrip.map((item) => (
            <li className="flex min-h-[76px] items-center gap-3 bg-bg-primary/80 px-5 py-4 text-small text-ink-secondary-dark" key={item}>
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
