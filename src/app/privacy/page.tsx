import type { Metadata } from 'next';

import { PageHero } from '@/components/sections/PageHero';
import { PlaceholderNote } from '@/components/ui/Badge';
import { Section } from '@/components/ui/Section';
import { legalNotice, privacyPolicy } from '@/content/legal';
import { legalInfo } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '개인정보처리방침',
  description: '주식회사 비트리가 운영하는 BTREE AX LAB 웹사이트의 개인정보 수집·이용·보관 정책입니다.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { name: '홈', path: '/' },
          { name: '개인정보처리방침', path: '/privacy' },
        ]}
        title="개인정보처리방침"
      />

      <Section tone="dark">
        <div className="max-w-[820px]">
          <div className="mb-10 rounded-button border border-state-warning/40 bg-state-warning/10 px-5 py-4">
            <p className="text-small text-state-warning">{legalNotice}</p>
          </div>

          <dl className="mb-10 flex flex-col gap-2 text-body">
            <div className="flex gap-3">
              <dt className="text-ink-secondary-dark">사업자</dt>
              <dd className="text-ink-primary-dark">{legalInfo.company.value}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-ink-secondary-dark">시행일</dt>
              <dd className="text-state-warning">{privacyPolicy.effectiveDate}</dd>
            </div>
          </dl>

          {privacyPolicy.sections.map((section) => (
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

          <PlaceholderNote>
            대괄호로 표시된 항목은 사업자 정보와 위탁 현황이 확정된 뒤 입력합니다.
          </PlaceholderNote>
        </div>
      </Section>
    </>
  );
}
