import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Section, SectionHeader } from '@/components/ui/Section';
import { pricingNote, pricingPlans } from '@/content/pricing';
import { cta } from '@/content/site';

/** Section 09 — Pricing Preview (마스터 문서 7.9) */
export function PricingSection() {
  return (
    <Section ariaLabelledby="pricing-title" id="pricing" tone="light">
      <SectionHeader
        description="전체 구축을 먼저 결정하지 않아도 됩니다. 필요한 단계의 서비스부터 시작할 수 있습니다."
        eyebrow="PRICING"
        id="pricing-title"
        title="필요한 단계부터 시작하십시오"
        tone="light"
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <article
            className={`flex h-full flex-col rounded-card border p-6 md:p-8 ${
              plan.highlighted
                ? 'border-accent-deep bg-surface-white shadow-[0_0_0_1px_var(--color-accent-deep)]'
                : 'border-line-light bg-surface-white'
            }`}
            key={plan.name}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-h4 text-ink-primary-light">{plan.name}</h3>
              {plan.highlighted ? <Badge tone="neutral-light">권장</Badge> : null}
            </div>

            <p className="mt-3 text-small text-ink-secondary-light">{plan.description}</p>

            <ul className="mt-6 flex flex-col gap-3">
              {plan.features.map((feature) => (
                <li className="flex items-start gap-2.5 text-body text-ink-primary-light" key={feature}>
                  <span aria-hidden="true" className="mt-1 text-accent-deep">
                    <Icon className="h-4 w-4" name="check" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <p className="text-h3 text-ink-primary-light">{plan.price}</p>
              <p className="mt-1 text-small text-ink-secondary-light">부가세 별도</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-6 rounded-card border border-line-light bg-surface-white p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          {pricingNote.map((line) => (
            <p className="text-small text-ink-secondary-light" key={line}>
              {line}
            </p>
          ))}
        </div>
        <Button
          className="shrink-0"
          event="cta_ax_diagnosis_click"
          eventPayload={{ section: 'pricing' }}
          href={cta.primary.href}
        >
          {cta.primary.label}
        </Button>
      </div>
    </Section>
  );
}
