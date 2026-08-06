import { Accordion } from '@/components/ui/Accordion';
import { Section, SectionHeader } from '@/components/ui/Section';
import { faqs } from '@/content/faq';

/** Section 11 — FAQ (마스터 문서 7.11) */
export function FaqSection() {
  return (
    <Section ariaLabelledby="faq-title" id="faq" tone="dark-alt">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <SectionHeader
            description="상담 전에 가장 많이 받는 질문을 정리했습니다."
            eyebrow="FAQ"
            id="faq-title"
            title="자주 묻는 질문"
          />
        </div>

        <div className="lg:col-span-8">
          <div className="border-t border-line-dark">
            {faqs.map((faq, index) => (
              <Accordion
                defaultOpen={index === 0}
                event="faq_open"
                key={faq.question}
                summary={faq.question}
              >
                {faq.answer}
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
