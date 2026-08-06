import { Icon } from '@/components/ui/Icon';
import { Section, SectionHeader } from '@/components/ui/Section';
import { differentiators } from '@/content/home';

/** Section 06 — Why BTREE (마스터 문서 7.6) */
export function WhyBtreeSection() {
  return (
    <Section ariaLabelledby="why-title" id="why" tone="light">
      <SectionHeader
        description="컨설팅 보고서에서 멈추지도, 요구사항 없이 개발부터 시작하지도 않습니다."
        eyebrow="WHY BTREE AX LAB"
        id="why-title"
        title="보고서와 개발 사이를 연결합니다"
        tone="light"
      />

      <ul className="grid gap-x-10 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
        {differentiators.map((item, index) => (
          <li className="flex gap-4" key={item.title}>
            <span
              aria-hidden="true"
              className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-deep"
            >
              <Icon className="h-5 w-5" name="check" />
            </span>
            <div>
              <h3 className="text-h4 text-ink-primary-light">
                <span className="mr-2 font-display text-small text-accent-deep">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {item.title}
              </h3>
              <p className="mt-2 text-body text-ink-secondary-light">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
