import { FieldVisual } from '@/components/diagrams/FieldVisual';
import { Button } from '@/components/ui/Button';
import { Container, Eyebrow } from '@/components/ui/Section';
import { hero } from '@/content/home';
import { cta } from '@/content/site';

/**
 * Section 01 — Hero (마스터 문서 7.1)
 * 방문자가 5초 안에 대상·문제·해결 방식·다음 행동을 이해하도록 구성한다.
 */
export function HeroSection() {
  return (
    <section className="hero-gradient relative overflow-hidden pb-[80px] pt-[112px] md:pb-[120px] md:pt-[152px]">
      <div aria-hidden="true" className="grid-overlay pointer-events-none absolute inset-0 opacity-60" />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow>{hero.eyebrow}</Eyebrow>

            <h1 className="mt-5 max-w-headline text-display-l text-ink-primary-dark">
              {hero.headline.map((line, index) => (
                <span className="block" key={line}>
                  {index === hero.headline.length - 1 ? (
                    <span className="bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>

            <p className="mt-6 max-w-[600px] text-body-l text-ink-secondary-dark">
              {hero.description.map((line) => (
                <span className="block" key={line}>
                  {line}
                </span>
              ))}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                event="cta_ax_diagnosis_click"
                eventPayload={{ section: 'hero' }}
                href={cta.primary.href}
              >
                {cta.primary.label}
              </Button>
              <Button href={cta.services.href} variant="secondary" withArrow>
                {cta.services.label}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            {/* 모바일에서는 그래픽을 단순화해 숨기고 정보는 아래 Trust Strip 으로 전달한다. */}
            <div className="hidden sm:block">
              <FieldVisual className="mx-auto h-auto w-full max-w-[520px]" />
            </div>
          </div>
        </div>

        {/* Trust Strip — 검증된 사실만 사용한다 (7.1) */}
        <ul className="mt-14 grid gap-px overflow-hidden rounded-card border border-line-dark bg-white/5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {hero.trustStrip.map((item) => (
            <li
              className="flex min-h-[76px] items-center gap-3 bg-bg-primary/80 px-5 py-4 text-small text-ink-secondary-dark"
              key={item}
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
