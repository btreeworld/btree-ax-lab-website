'use client';

import { useLocale } from 'next-intl';

import { JourneyStage } from '@/components/three/world/hud/JourneyStage';
import type { JourneyProgress } from '@/components/three/world/useJourneyProgress';
import { Eyebrow } from '@/components/ui/Section';
import { cta } from '@/content/site';
import { cases } from '@/content/cases';
import { architectureLayers, differentiators, finalCta, hero, homeSectionCopy, problemSection } from '@/content/home';
import { pricingPlans } from '@/content/pricing';
import { representative } from '@/content/representative-profile';
import type { Locale } from '@/i18n/locales';

/**
 * 8개 스테이지 HUD — 기존 섹션형 홈(HeroSection/ProblemSection/...)이 쓰던 것과 동일한
 * content/*.ts 데이터를 그대로 소비한다. 새 카피를 쓰지 않는다(계획서 "재사용" 원칙).
 *
 * Server Component 슬롯 패턴을 쓰지 않은 이유: content/*.ts는 next-intl의 서버 전용
 * getTranslations가 아니라 순수 locale-keyed 데이터 객체라, 클라이언트 컴포넌트에서
 * useLocale()로 직접 읽어도 서버 컴포넌트일 때와 동일하게 초기 HTML에 포함된다
 * (JourneyExperience가 dynamic(ssr:false)로 감싸는 건 3D World뿐 — HUD는 일반 SSR).
 */
export function JourneyHud({ progress }: { progress: JourneyProgress }) {
  const locale = useLocale() as Locale;
  const h = hero[locale];
  const problem = problemSection[locale];
  const diffs = differentiators[locale];
  const layers = architectureLayers[locale];
  const svc = homeSectionCopy[locale].services;
  const rep = representative[locale];
  const finalCtaCopy = finalCta[locale];
  const ctaCopy = cta[locale];
  const topCases = cases[locale].slice(0, 2);
  const startingPlan = pricingPlans[locale][0];

  return (
    <>
      {/* 00 BOOT */}
      <JourneyStage align="center" index={0} progress={progress}>
        <Eyebrow>INDUSTRIAL AI · EDGE AI · DIGITAL TWIN</Eyebrow>
        <h1 className="mt-4 font-display text-4xl font-bold text-ink-primary-dark sm:text-6xl">BTREE AX LAB</h1>
        <p className="mt-4 text-body text-ink-secondary-dark">{h.scrollPrompt}</p>
      </JourneyStage>

      {/* 01 FIELD */}
      <JourneyStage index={1} progress={progress}>
        <Eyebrow>01 · FIELD</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold text-ink-primary-dark sm:text-4xl">{h.headline[0]}</h2>
        <p className="text-3xl font-bold text-accent sm:text-4xl">{h.headline[1]}</p>
        <p className="mt-4 max-w-md text-body text-ink-secondary-dark">{h.description.join(' ')}</p>
        <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-small text-ink-secondary-dark">
          {h.trustStrip.map((item) => (
            <li key={item}>· {item}</li>
          ))}
        </ul>
      </JourneyStage>

      {/* 02 THE GAP */}
      <JourneyStage align="right" index={2} progress={progress}>
        <Eyebrow className="text-state-error">02 · THE GAP</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold text-ink-primary-dark sm:text-4xl">{problem.titleLines[0]}</h2>
        <p className="text-3xl font-bold text-ink-secondary-dark sm:text-4xl">{problem.titleLines[1]}</p>
        <ul className="mt-6 space-y-2 text-body text-ink-secondary-dark">
          {problem.cards.map((card) => (
            <li key={card.title}>
              <span className="text-ink-primary-dark">{card.title}</span> — {card.description}
            </li>
          ))}
        </ul>
      </JourneyStage>

      {/* 03 EDGE */}
      <JourneyStage index={3} progress={progress}>
        <Eyebrow>03 · EDGE</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold text-ink-primary-dark sm:text-4xl">{layers[1].description}</h2>
        <ul className="mt-6 space-y-3 text-body text-ink-secondary-dark">
          {diffs.map((d) => (
            <li key={d.title}>
              <span className="text-ink-primary-dark">{d.title}</span> — {d.description}
            </li>
          ))}
        </ul>
      </JourneyStage>

      {/* 04 PLATFORM */}
      <JourneyStage align="right" index={4} progress={progress}>
        <Eyebrow>04 · PLATFORM</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold text-ink-primary-dark sm:text-4xl">{svc.title}</h2>
        <p className="mt-4 max-w-md text-body text-ink-secondary-dark">{svc.description}</p>
        <ul className="mt-6 space-y-1 text-small text-ink-secondary-dark">
          {layers[2].nodes.map((node) => (
            <li key={node}>· {node}</li>
          ))}
        </ul>
      </JourneyStage>

      {/* 05 TWIN */}
      <JourneyStage index={5} progress={progress}>
        <Eyebrow>05 · DIGITAL TWIN</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold text-ink-primary-dark sm:text-4xl">{layers[3].description}</h2>
        <ul className="mt-6 space-y-2 text-body text-ink-secondary-dark">
          {topCases.map((c) => (
            <li key={c.title}>
              <span className="text-ink-primary-dark">{c.title}</span> — {c.problem}
            </li>
          ))}
        </ul>
      </JourneyStage>

      {/* 06 OPERATOR */}
      <JourneyStage align="right" index={6} progress={progress}>
        <Eyebrow>06 · OPERATOR</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold text-ink-primary-dark sm:text-4xl">{rep.name}</h2>
        <p className="text-body text-ink-secondary-dark">{rep.title}</p>
        <p className="mt-3 max-w-md text-body text-ink-secondary-dark">{rep.homeIntro}</p>
        <p className="mt-4 text-small text-accent">
          {startingPlan.name} · {startingPlan.price}
        </p>
      </JourneyStage>

      {/* 07 CONTACT */}
      <JourneyStage align="center" index={7} progress={progress}>
        <Eyebrow>{finalCtaCopy.eyebrow}</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold text-ink-primary-dark sm:text-4xl">{finalCtaCopy.headline.join(' ')}</h2>
        <p className="mt-4 max-w-md text-body text-ink-secondary-dark">{finalCtaCopy.description}</p>
        <a
          className="mt-6 inline-flex items-center rounded-badge bg-accent px-6 py-3 font-semibold text-bg-primary"
          href={ctaCopy.primary.href}
        >
          {ctaCopy.primary.label}
        </a>
      </JourneyStage>
    </>
  );
}
