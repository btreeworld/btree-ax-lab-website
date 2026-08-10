import Image from 'next/image';

import { Icon, type IconName } from '@/components/ui/Icon';
import { Section, SectionHeader } from '@/components/ui/Section';

type VisualPoint = {
  title: string;
  description: string;
  icon?: IconName;
};

export function VisualNarrative({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  points,
  tone = 'dark',
  priority = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  points: readonly VisualPoint[];
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
            className="object-cover transition-transform duration-700 hover:scale-[1.015]"
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 1240px"
            src={image}
          />
        </div>

        <figcaption className="grid gap-px border-t border-line-dark bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point, index) => (
            <div className="bg-bg-secondary px-5 py-5 md:px-6" key={point.title}>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/35 bg-accent-soft text-[12px] font-semibold text-accent">
                  {point.icon ? <Icon className="h-4 w-4" name={point.icon} /> : String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-body font-semibold text-ink-primary-dark">{point.title}</h3>
              </div>
              <p className="mt-3 text-small text-ink-secondary-dark">{point.description}</p>
            </div>
          ))}
        </figcaption>
      </figure>
    </Section>
  );
}
