import Image from 'next/image';

import { Icon, type IconName } from '@/components/ui/Icon';
import { Section, SectionHeader } from '@/components/ui/Section';

type VisualPoint = {
  title: string;
  description: string;
  icon?: IconName;
};

type DiagramVariant = 'flow' | 'matrix' | 'architecture' | 'hub' | 'gates' | 'timeline';

function PointIcon({ point, index, size = 'md' }: { point: VisualPoint; index: number; size?: 'md' | 'lg' }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full border border-accent/35 bg-accent-soft text-accent ${
        size === 'lg' ? 'h-12 w-12' : 'h-9 w-9'
      }`}
    >
      {point.icon ? (
        <Icon className={size === 'lg' ? 'h-5 w-5' : 'h-[18px] w-[18px]'} name={point.icon} />
      ) : (
        <span className="font-display text-[12px] font-bold">{String(index + 1).padStart(2, '0')}</span>
      )}
    </span>
  );
}

function PointText({ point, index }: { point: VisualPoint; index: number }) {
  return (
    <div>
      <p className="font-display text-[11px] font-bold tracking-[0.14em] text-accent/70">
        {String(index + 1).padStart(2, '0')}
      </p>
      <h3 className="mt-0.5 text-body font-semibold text-ink-primary-dark">{point.title}</h3>
    </div>
  );
}

function VisualDiagram({ points, variant }: { points: readonly VisualPoint[]; variant: DiagramVariant }) {
  if (variant === 'architecture') {
    return (
      <ol className="flex flex-col gap-2">
        {points.map((point, index) => (
          <li
            className="grid gap-3 rounded-button border border-line-dark bg-bg-elevated/70 p-4 sm:grid-cols-[44px_180px_1fr] sm:items-center sm:gap-4 md:px-5"
            key={point.title}
          >
            <PointIcon index={index} point={point} />
            <PointText index={index} point={point} />
            <p className="text-small text-ink-secondary-dark sm:border-l sm:border-line-dark sm:pl-5">{point.description}</p>
          </li>
        ))}
      </ol>
    );
  }

  if (variant === 'hub') {
    return (
      <ol className="grid gap-3 sm:grid-cols-3">
        {points.map((point, index) => {
          const isCore = index === points.length - 1;
          return (
            <li
              className={
                isCore
                  ? 'rounded-button border border-accent/35 bg-accent-soft p-5 sm:col-span-3'
                  : 'rounded-button border border-line-dark bg-bg-elevated/70 p-5'
              }
              key={point.title}
            >
              <div className={isCore ? 'flex flex-col gap-4 sm:flex-row sm:items-center' : ''}>
                <div className="flex items-center gap-3">
                  <PointIcon index={index} point={point} size={isCore ? 'lg' : 'md'} />
                  <PointText index={index} point={point} />
                </div>
                <p className={`text-small text-ink-secondary-dark ${isCore ? 'sm:ml-auto sm:max-w-[560px]' : 'mt-3'}`}>
                  {point.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    );
  }

  if (variant === 'matrix') {
    return (
      <ol className="grid gap-3 sm:grid-cols-2">
        {points.map((point, index) => (
          <li className="flex gap-4 rounded-button border border-line-dark bg-bg-elevated/70 p-5 md:p-6" key={point.title}>
            <PointIcon index={index} point={point} size="lg" />
            <div>
              <PointText index={index} point={point} />
              <p className="mt-3 text-small text-ink-secondary-dark">{point.description}</p>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  if (variant === 'timeline') {
    return (
      <ol className="relative grid gap-4 lg:grid-cols-4 lg:before:absolute lg:before:left-[12.5%] lg:before:right-[12.5%] lg:before:top-[22px] lg:before:h-px lg:before:bg-accent/35">
        {points.map((point, index) => (
          <li className="relative pt-1 text-center" key={point.title}>
            <div className="relative z-10 mx-auto w-fit bg-bg-secondary px-2">
              <PointIcon index={index} point={point} />
            </div>
            <div className="mt-3 rounded-button border border-line-dark bg-bg-elevated/70 p-5 text-left">
              <PointText index={index} point={point} />
              <p className="mt-3 text-small text-ink-secondary-dark">{point.description}</p>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {points.map((point, index) => (
        <li
          className={`relative rounded-button bg-bg-elevated/70 p-5 ${
            variant === 'gates' ? 'border border-line-dark border-t-2 border-t-accent/55' : 'border border-line-dark'
          } lg:after:absolute lg:after:-right-[13px] lg:after:top-9 lg:after:h-px lg:after:w-3 lg:after:bg-accent/50 lg:last:after:hidden`}
          key={point.title}
        >
          <div className="flex items-center gap-3">
            <PointIcon index={index} point={point} />
            <PointText index={index} point={point} />
          </div>
          <p className="mt-3 text-small text-ink-secondary-dark">{point.description}</p>
        </li>
      ))}
    </ol>
  );
}

export function VisualNarrative({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  points,
  diagramVariant = 'flow',
  tone = 'dark',
  priority = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  points: readonly VisualPoint[];
  diagramVariant?: DiagramVariant;
  tone?: 'dark' | 'dark-alt';
  priority?: boolean;
}) {
  return (
    <Section ariaLabelledby={`${eyebrow.toLowerCase().replaceAll(' ', '-')}-visual-title`} compact tone={tone}>
      <SectionHeader
        description={description}
        eyebrow={eyebrow}
        id={`${eyebrow.toLowerCase().replaceAll(' ', '-')}-visual-title`}
        title={title}
      />

      <figure className="overflow-hidden rounded-card border border-line-dark bg-bg-elevated shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
        <div className="relative aspect-[16/9] overflow-hidden md:aspect-[2.15/1]">
          <Image
            alt={imageAlt}
            className="object-cover transition-transform duration-700 hover:scale-[1.01]"
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 1240px"
            src={image}
          />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg-secondary/70 to-transparent" />
        </div>

        <figcaption className="border-t border-line-dark bg-bg-secondary p-4 md:p-6">
          <VisualDiagram points={points} variant={diagramVariant} />
        </figcaption>
      </figure>
    </Section>
  );
}
