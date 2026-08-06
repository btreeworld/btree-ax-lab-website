import type { Metadata } from 'next';

import { PageHero } from '@/components/sections/PageHero';
import { PlaceholderNote } from '@/components/ui/Badge';
import { Section } from '@/components/ui/Section';
import { legalNotice, termsOfService } from '@/content/legal';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '이용약관',
  description: 'BTREE AX LAB 웹사이트의 정보 제공과 문의 접수 서비스 이용 조건입니다.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { name: '홈', path: '/' },
          { name: '이용약관', path: '/terms' },
        ]}
        title="이용약관"
      />

      <Section tone="dark">
        <div className="max-w-[820px]">
          <div className="mb-10 rounded-button border border-state-warning/40 bg-state-warning/10 px-5 py-4">
            <p className="text-small text-state-warning">{legalNotice}</p>
          </div>

          <p className="mb-10 text-body text-ink-secondary-dark">
            시행일: <span className="text-state-warning">{termsOfService.effectiveDate}</span>
          </p>

          {termsOfService.sections.map((section) => (
            <section className="mb-10" key={section.title}>
              <h2 className="text-h4 text-ink-primary-dark">{section.title}</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {section.body.map((line) => (
                  <li className="text-body text-ink-secondary-dark" key={line}>
                    {line}
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <PlaceholderNote>계약 관련 세부 조건은 개별 계약서가 우선합니다.</PlaceholderNote>
        </div>
      </Section>
    </>
  );
}
