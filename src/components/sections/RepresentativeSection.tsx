import Image from 'next/image';

import { Button } from '@/components/ui/Button';
import { PlaceholderNote } from '@/components/ui/Badge';
import { Eyebrow, Section } from '@/components/ui/Section';
import { representative } from '@/content/representative-profile';
import { cta } from '@/content/site';

/**
 * Section 10 — Representative & Evidence of Execution (마스터 문서 7.10)
 * 개인 브랜딩이 아니라 "누가 직접 진단·설계하고 기술적 책임을 지는가"에 답하는 신뢰 증거 영역이다.
 */
export function RepresentativeSection() {
  return (
    <Section ariaLabelledby="representative-title" id="representative" tone="dark">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* 좌측 5 columns — 대표 사진 */}
        <div className="lg:col-span-5">
          <RepresentativePhoto />
        </div>

        {/* 우측 7 columns — 직함, 소개, 검증 수치, 핵심 이력, CTA */}
        <div className="lg:col-span-7">
          <Eyebrow>WHO DESIGNS YOUR SYSTEM</Eyebrow>

          <h2 className="mt-5 text-h2 text-ink-primary-dark" id="representative-title">
            {representative.sectionTitle.map((line) => (
              <span className="block" key={line}>
                {line}
              </span>
            ))}
          </h2>

          <p className="mt-6 text-[15px] font-semibold text-accent">
            {representative.name} | {representative.title} · AX Architect
          </p>

          <p className="mt-4 text-body text-ink-secondary-dark">{representative.homeIntro}</p>

          {/* Trust Metrics — 검증된 지표만 표시 */}
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line-dark bg-white/5 lg:grid-cols-4">
            {representative.trustMetrics.map((metric) => (
              <div className="bg-bg-primary px-4 py-5" key={metric.label}>
                <dt className="sr-only">{metric.label}</dt>
                <dd>
                  <span className="block font-display text-h3 text-accent">{metric.value}</span>
                  <span className="mt-2 block text-[13px] leading-snug text-ink-secondary-dark">
                    {metric.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-4">
            <PlaceholderNote>{representative.trustMetricsNote}</PlaceholderNote>
          </div>

          <ul className="mt-8 flex flex-col gap-2.5">
            {representative.homeHighlights.map((item) => (
              <li className="flex items-start gap-3 text-body text-ink-secondary-dark" key={item}>
                <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/track-record" withArrow>
              백성은 대표와 수행이력 보기
            </Button>
            <Button
              event="cta_project_consulting_click"
              eventPayload={{ section: 'representative' }}
              href={cta.secondary.href}
              variant="secondary"
            >
              {cta.secondary.label}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

/**
 * 대표 사진 — 마스터 문서 11.6
 * 고해상도 원본 확보 전까지 placeholder 를 유지한다. AI 생성 인물 이미지로 대체하지 않는다.
 * public/images/baek-seongeun-profile.webp 를 추가한 뒤
 * content/representative-profile.ts 의 photo.status 를 'verified' 로 변경하면 실제 사진이 노출된다.
 */
export function RepresentativePhoto({ className }: { className?: string }) {
  const { photo, name, title } = representative;

  if (photo.status !== 'placeholder') {
    return (
      <Image
        alt={photo.alt}
        className={className ?? 'w-full rounded-panel object-cover'}
        height={1000}
        priority={false}
        sizes="(max-width: 1024px) 100vw, 40vw"
        src={photo.src}
        width={800}
      />
    );
  }

  return (
    <figure className={className}>
      <div className="relative flex aspect-[4/5] w-full flex-col items-center justify-center overflow-hidden rounded-panel border border-line-dark bg-bg-elevated/60">
        <div aria-hidden="true" className="grid-overlay absolute inset-0 opacity-50" />
        <svg
          aria-hidden="true"
          className="relative h-16 w-16 text-accent/40"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="8.5" r="4" />
          <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
        </svg>
        <p className="relative mt-5 px-6 text-center text-small text-ink-secondary-dark">
          {name} {title}
          <br />
          공식 프로필 사진 영역
        </p>
      </div>
      <figcaption className="mt-3 text-[13px] text-state-warning">
        <span aria-hidden="true">※ </span>
        {photo.note}
      </figcaption>
    </figure>
  );
}
