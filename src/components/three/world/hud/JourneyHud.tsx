'use client';

import type { ReactNode } from 'react';
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
 *
 * ── 타이포그래피 원칙 ──
 *  1. 임의 크기(text-3xl 등) 대신 프로젝트 타입 스케일(text-h2/body-l/small)을 쓴다.
 *     스케일 토큰에는 한글에 맞춰 조정된 line-height가 이미 들어 있다(tailwind.config.ts).
 *  2. content의 배열(headline/description)은 `.join(' ')`으로 합치지 않는다 — 그 배열은
 *     작성자가 의도한 줄바꿈 지점이다. 합치면 긴 한 덩어리가 되어 엉뚱한 곳에서 꺾인다.
 *  3. 제목은 `text-balance`(줄 길이 균등), 본문은 `text-pretty`(외톨이 단어 방지).
 *  4. "제목 — 설명" 한 줄 나열 대신 제목/설명을 위아래로 분리한다. em 대시가 줄 끝에
 *     걸리면서 생기던 어색한 꺾임이 사라지고 위계도 또렷해진다.
 */

/** 제목과 설명을 위아래로 분리한 항목 — 대시로 잇지 않아 줄바꿈이 깨지지 않는다. */
function TitledItem({
  title,
  description,
  hideDescriptionOnMobile = false,
}: {
  title: string;
  description: string;
  hideDescriptionOnMobile?: boolean;
}) {
  return (
    <li>
      <p className="text-balance font-semibold text-ink-primary-dark">{title}</p>
      <p
        className={`mt-1 text-pretty text-small leading-relaxed text-ink-secondary-dark ${
          hideDescriptionOnMobile ? 'hidden sm:block' : ''
        }`}
      >
        {description}
      </p>
    </li>
  );
}

/** 스테이지 제목 — 타입 스케일 + balance + 한글 대제목용 미세 자간 조정. */
function StageTitle({ children, tone = 'primary' }: { children: ReactNode; tone?: 'primary' | 'secondary' | 'accent' }) {
  const color =
    tone === 'accent' ? 'text-accent' : tone === 'secondary' ? 'text-ink-secondary-dark' : 'text-ink-primary-dark';
  return <p className={`text-balance font-display text-h2 tracking-[-0.015em] ${color}`}>{children}</p>;
}

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
        <h1 className="mt-5 font-display text-display-l tracking-[-0.02em] text-ink-primary-dark">BTREE AX LAB</h1>
        <p className="mt-5 text-pretty text-body-l text-ink-secondary-dark">{h.scrollPrompt}</p>
      </JourneyStage>

      {/* 01 FIELD */}
      <JourneyStage index={1} progress={progress}>
        <Eyebrow>01 · FIELD</Eyebrow>
        <h2 className="mt-4 text-balance font-display text-h2 tracking-[-0.015em] text-ink-primary-dark">
          {h.headline[0]}
        </h2>
        <StageTitle tone="accent">{h.headline[1]}</StageTitle>
        {/* 대제목과 달리 산문 본문은 배열을 이어 붙인다. content의 줄 나눔은 원래 섹션형
            레이아웃의 측정폭에 맞춘 것이라, HUD의 다른 폭에서 그대로 강제하면 "…smart farm, and /
            facility operations," 처럼 중간에 짧은 조각 줄이 생긴다. 한 문단으로 흘리고
            text-pretty로 마지막 줄 외톨이만 막는 편이 훨씬 고르게 떨어진다. */}
        <p className="mt-5 max-w-[32rem] text-pretty text-body leading-relaxed text-ink-secondary-dark">
          {h.description.join(' ')}
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1.5 text-small text-ink-secondary-dark">
          {h.trustStrip.map((item) => (
            <li key={item}>· {item}</li>
          ))}
        </ul>
      </JourneyStage>

      {/* 02 THE GAP — 4개 항목으로 가장 조밀한 스테이지라, 모바일에서는 제목만 노출한다
          (설명은 DOM에 그대로 남아 크롤러·폴백에서는 전문이 읽힌다). */}
      <JourneyStage align="right" index={2} progress={progress}>
        <Eyebrow className="text-state-error">02 · THE GAP</Eyebrow>
        <h2 className="mt-4 text-balance font-display text-h2 tracking-[-0.015em] text-ink-primary-dark">
          {problem.titleLines[0]}
        </h2>
        <StageTitle tone="secondary">{problem.titleLines[1]}</StageTitle>
        <ul className="mt-6 max-w-[34rem] space-y-3.5">
          {problem.cards.map((card) => (
            <TitledItem description={card.description} hideDescriptionOnMobile key={card.title} title={card.title} />
          ))}
        </ul>
      </JourneyStage>

      {/* 03 EDGE */}
      <JourneyStage index={3} progress={progress}>
        <Eyebrow>03 · EDGE</Eyebrow>
        <h2 className="mt-4 text-balance font-display text-h2 tracking-[-0.015em] text-ink-primary-dark">
          {layers[1].description}
        </h2>
        <ul className="mt-6 max-w-[34rem] space-y-3.5">
          {diffs.map((d) => (
            <TitledItem description={d.description} key={d.title} title={d.title} />
          ))}
        </ul>
      </JourneyStage>

      {/* 04 PLATFORM */}
      <JourneyStage align="right" index={4} progress={progress}>
        <Eyebrow>04 · PLATFORM</Eyebrow>
        <h2 className="mt-4 text-balance font-display text-h2 tracking-[-0.015em] text-ink-primary-dark">
          {svc.title}
        </h2>
        <p className="mt-5 max-w-[32rem] text-pretty text-body leading-relaxed text-ink-secondary-dark">
          {svc.description}
        </p>
        <ul className="mt-6 flex flex-wrap justify-end gap-x-5 gap-y-1.5 text-small text-ink-secondary-dark">
          {layers[2].nodes.map((node) => (
            <li key={node}>· {node}</li>
          ))}
        </ul>
      </JourneyStage>

      {/* 05 TWIN */}
      <JourneyStage index={5} progress={progress}>
        <Eyebrow>05 · DIGITAL TWIN</Eyebrow>
        <h2 className="mt-4 text-balance font-display text-h2 tracking-[-0.015em] text-ink-primary-dark">
          {layers[3].description}
        </h2>
        <ul className="mt-6 max-w-[34rem] space-y-3.5">
          {topCases.map((c) => (
            <TitledItem description={c.problem} key={c.title} title={c.title} />
          ))}
        </ul>
      </JourneyStage>

      {/* 06 OPERATOR */}
      <JourneyStage align="right" index={6} progress={progress}>
        <Eyebrow>06 · OPERATOR</Eyebrow>
        <h2 className="mt-4 font-display text-h2 tracking-[-0.015em] text-ink-primary-dark">{rep.name}</h2>
        <p className="mt-1 text-body text-ink-secondary-dark">{rep.title}</p>
        <p className="mt-5 max-w-[32rem] text-pretty text-body leading-relaxed text-ink-secondary-dark">
          {rep.homeIntro}
        </p>
        <p className="mt-5 text-small font-semibold tracking-wide text-accent">
          {startingPlan.name} · {startingPlan.price}
        </p>
      </JourneyStage>

      {/* 07 CONTACT */}
      <JourneyStage align="center" index={7} progress={progress}>
        <Eyebrow>{finalCtaCopy.eyebrow}</Eyebrow>
        {/* headline도 작성자가 두 줄로 끊어 둔 카피 */}
        <h2 className="mt-4 font-display text-h2 tracking-[-0.015em] text-ink-primary-dark">
          {finalCtaCopy.headline.map((line) => (
            <span className="block text-balance" key={line}>
              {line}
            </span>
          ))}
        </h2>
        {/* 가운데 정렬 2줄짜리 짧은 문단은 pretty(외톨이만 방지)보다 balance(줄 길이 균등)가
            낫다 — pretty로는 "…방식과 다음 / 단계를 안내합니다."처럼 한쪽으로 쏠린다. */}
        <p className="mx-auto mt-5 max-w-[32rem] text-balance text-body leading-relaxed text-ink-secondary-dark">
          {finalCtaCopy.description}
        </p>
        <a
          className="mt-7 inline-flex items-center rounded-badge bg-accent px-6 py-3 font-semibold text-bg-primary transition hover:bg-accent-hover"
          href={ctaCopy.primary.href}
        >
          {ctaCopy.primary.label}
        </a>
      </JourneyStage>
    </>
  );
}
