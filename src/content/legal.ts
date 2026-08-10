/**
 * 개인정보처리방침 · 이용약관 초안 — 마스터 문서 22장
 *
 * ⚠️ 법무 검토 전 초안이다. 게시 전 반드시 전문가 검토를 거친다.
 *    시행일(2019-11-01)과 개인정보 보호책임자(성명·연락처)는 2026-08 대표 확인으로 확정했다.
 *    보유 기간(3장)과 위탁업체 목록(5장)은 여전히 대괄호 placeholder이며 별도 확인이 필요하다.
 */
import type { Locale } from '@/i18n/locales';

type LegalSection = { title: string; body: string[] };
type LegalDoc = { effectiveDate: string; sections: LegalSection[] };

export const legalNotice: Record<Locale, string> = {
  ko: '아래 내용은 법무 검토 전 초안입니다. 실제 서비스 오픈 전 전문가 검토를 거쳐 확정합니다.',
  en: 'The content below is a draft pending legal review, and will be finalized by a professional review before launch.',
};

export const privacyPolicy: Record<Locale, LegalDoc> = {
  ko: {
    effectiveDate: '2019년 11월 1일',
    sections: [
      {
        title: '1. 수집하는 개인정보 항목',
        body: [
          '필수: 회사명, 담당자명, 이메일, 연락처, 산업 분야, 희망 서비스, 문의 내용',
          '선택: 회사 웹사이트, 현장 지역, 기존 장비·시스템, 예상 예산, 희망 시작 시기, 정부지원사업 연계 여부',
          '자동 수집: 접속 로그, 쿠키, 서비스 이용 기록(분석 도구 사용 시)',
        ],
      },
      {
        title: '2. 개인정보의 수집 및 이용 목적',
        body: ['문의 내용 확인 및 상담 응대', '서비스 적합성 검토와 견적 안내', '계약 체결 및 이행에 필요한 연락', '서비스 개선을 위한 통계 분석'],
      },
      {
        title: '3. 개인정보의 보유 및 이용 기간',
        body: [
          '문의 응대 목적 달성 후 지체 없이 파기합니다. 다만 관련 법령에서 정한 기간 동안 보관해야 하는 정보는 해당 기간 동안 보관합니다.',
          '보유 기간: [확정 필요 — 예: 문의 접수일로부터 3년]',
        ],
      },
      {
        title: '4. 개인정보의 제3자 제공',
        body: ['회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.', '다만 이용자가 사전에 동의한 경우 또는 법령의 규정에 의한 경우는 예외로 합니다.'],
      },
      {
        title: '5. 개인정보 처리 위탁',
        body: ['회사는 서비스 운영을 위해 아래 업무를 위탁할 수 있습니다.', '[위탁업체 및 위탁 업무 내용 확정 필요 — 예: 이메일 발송, 웹사이트 호스팅, 분석 도구]'],
      },
      {
        title: '6. 개인정보의 파기 절차 및 방법',
        body: ['보유 기간이 경과하거나 처리 목적이 달성된 경우 지체 없이 파기합니다.', '전자적 파일 형태는 복구할 수 없는 방법으로 삭제하고, 출력물은 분쇄하거나 소각합니다.'],
      },
      {
        title: '7. 이용자의 권리와 행사 방법',
        body: ['이용자는 언제든지 자신의 개인정보에 대한 열람, 정정, 삭제, 처리정지를 요구할 수 있습니다.', '요청은 아래 개인정보 보호책임자 연락처로 접수할 수 있으며, 회사는 지체 없이 조치합니다.'],
      },
      {
        title: '8. 개인정보 보호책임자',
        body: ['성명: 백성은', '연락처: back@btreeworld.net', '이용자는 개인정보 보호와 관련한 문의를 위 연락처로 접수할 수 있습니다.'],
      },
      {
        title: '9. 쿠키 및 분석 도구',
        body: ['회사는 서비스 개선을 위해 웹 분석 도구를 사용할 수 있습니다.', '이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있으며, 이 경우 일부 기능이 제한될 수 있습니다.'],
      },
      {
        title: '10. 개인정보의 안전성 확보 조치',
        body: ['개인정보 접근 권한 최소화 및 접근 통제', '전송 구간 암호화(HTTPS) 적용', '개인정보 취급자 교육'],
      },
      {
        title: '11. 개인정보처리방침의 변경',
        body: ['법령이나 서비스 변경에 따라 내용이 추가·삭제·수정될 수 있으며, 변경 시 웹사이트를 통해 고지합니다.'],
      },
    ],
  },
  en: {
    effectiveDate: 'November 1, 2019',
    sections: [
      {
        title: '1. Personal Information We Collect',
        body: [
          'Required: company name, contact name, email, phone number, industry, service of interest, inquiry details',
          'Optional: company website, site location, existing equipment/systems, estimated budget, desired start time, government program interest',
          'Automatically collected: access logs, cookies, service usage records (when analytics tools are used)',
        ],
      },
      {
        title: '2. Purpose of Collection and Use',
        body: [
          'Confirming inquiry content and responding to consultations',
          'Reviewing service fit and providing quotes',
          'Communication necessary for contract execution and performance',
          'Statistical analysis for service improvement',
        ],
      },
      {
        title: '3. Retention Period',
        body: [
          'Information is destroyed without delay once the purpose of the inquiry response is fulfilled, except where retention is required by applicable law.',
          'Retention period: [to be confirmed — e.g., 3 years from the date of inquiry]',
        ],
      },
      {
        title: '4. Disclosure to Third Parties',
        body: [
          'The company does not disclose personal information to third parties as a rule.',
          'Exceptions apply where the user has given prior consent or where required by law.',
        ],
      },
      {
        title: '5. Outsourcing of Processing',
        body: [
          'The company may outsource the following operations to support the service.',
          '[Vendors and outsourced tasks to be confirmed — e.g., email delivery, website hosting, analytics tools]',
        ],
      },
      {
        title: '6. Destruction Procedure and Method',
        body: [
          'Information is destroyed without delay once the retention period has elapsed or the processing purpose has been achieved.',
          'Electronic files are deleted by an unrecoverable method; printed materials are shredded or incinerated.',
        ],
      },
      {
        title: "7. User Rights and How to Exercise Them",
        body: [
          'Users may request access, correction, deletion, or suspension of processing of their personal information at any time.',
          'Requests can be submitted to the Data Protection Officer contact below, and the company will act without delay.',
        ],
      },
      {
        title: '8. Data Protection Officer',
        body: ['Name: Baek Seongeun', 'Contact: back@btreeworld.net', 'Inquiries related to data protection can be directed to the contact above.'],
      },
      {
        title: '9. Cookies and Analytics Tools',
        body: [
          'The company may use web analytics tools to improve the service.',
          'Users may decline cookie storage through browser settings, which may limit some features.',
        ],
      },
      {
        title: '10. Security Measures',
        body: ['Minimizing and controlling access to personal data', 'Encrypting data in transit (HTTPS)', 'Training staff who handle personal data'],
      },
      {
        title: '11. Changes to This Policy',
        body: ['This policy may be updated to reflect changes in law or the service, and changes will be announced on the website.'],
      },
    ],
  },
};

export const termsOfService: Record<Locale, LegalDoc> = {
  ko: {
    effectiveDate: '2019년 11월 1일',
    sections: [
      {
        title: '제1조 (목적)',
        body: ['본 약관은 주식회사 비트리(이하 "회사")가 운영하는 BTREE AX LAB 웹사이트에서 제공하는 정보와 문의 접수 서비스의 이용 조건과 절차를 규정합니다.'],
      },
      {
        title: '제2조 (웹사이트 정보의 성격)',
        body: [
          '웹사이트에 게시된 서비스 설명, 가격, 산출물 목록은 일반적인 안내이며 개별 계약의 내용은 별도의 계약서에 따릅니다.',
          '게시된 시작 가격은 프로젝트 범위, 현장 조건, 출장 여부에 따라 변경될 수 있습니다.',
        ],
      },
      {
        title: '제3조 (문의 접수)',
        body: ['문의 접수는 계약의 청약이나 승낙을 의미하지 않습니다.', '회사는 문의 내용을 검토한 뒤 서비스 적합성에 따라 상담 진행 여부를 안내할 수 있습니다.'],
      },
      {
        title: '제4조 (기술 성능에 관한 고지)',
        body: [
          'AI 탐지 정확도, 응답 속도 등 기술 성능은 카메라 위치, 조도, 해상도, 대상 행동, 학습 데이터와 현장 조건에 따라 달라집니다.',
          '구체적인 성능 목표와 검증 기준은 진단·설계 단계에서 협의하여 계약서에 반영합니다.',
        ],
      },
      {
        title: '제5조 (정부지원사업 관련 고지)',
        body: ['회사는 정부지원사업의 기술기획과 실증설계를 지원하나, 과제 선정이나 자금 확보를 보장하지 않습니다.'],
      },
      {
        title: '제6조 (지식재산권)',
        body: ['웹사이트에 게시된 콘텐츠의 저작권은 회사에 있습니다.', '용역 산출물의 권리 귀속과 사용 범위는 개별 계약서에 따릅니다.'],
      },
      {
        title: '제7조 (책임의 제한)',
        body: [
          '회사는 웹사이트 정보의 정확성을 위해 노력하나, 정보 이용으로 발생한 의사결정의 결과에 대해서는 책임을 지지 않습니다.',
          '외부 플랫폼·장비의 정책 변경과 공급 상황에 따라 제공 범위가 달라질 수 있습니다.',
        ],
      },
      {
        title: '제8조 (약관의 변경)',
        body: ['회사는 필요한 경우 약관을 변경할 수 있으며, 변경 시 웹사이트를 통해 공지합니다.'],
      },
    ],
  },
  en: {
    effectiveDate: 'November 1, 2019',
    sections: [
      {
        title: 'Article 1 (Purpose)',
        body: [
          'These terms govern the conditions and procedures for using the information and inquiry-intake service provided on the BTREE AX LAB website, operated by BTREE Inc. (the "Company").',
        ],
      },
      {
        title: 'Article 2 (Nature of Website Information)',
        body: [
          'Service descriptions, prices, and deliverable lists on the website are general guidance; individual contracts govern the actual terms.',
          'Published starting prices may change based on project scope, site conditions, and travel requirements.',
        ],
      },
      {
        title: 'Article 3 (Inquiry Intake)',
        body: [
          'Submitting an inquiry does not constitute an offer or acceptance of a contract.',
          'The Company may review the inquiry and advise on whether to proceed with a consultation based on service fit.',
        ],
      },
      {
        title: 'Article 4 (Notice on Technical Performance)',
        body: [
          'Technical performance such as AI detection accuracy and response time varies with camera placement, lighting, resolution, subject behavior, training data, and site conditions.',
          'Specific performance targets and validation criteria are agreed upon during diagnosis/design and reflected in the contract.',
        ],
      },
      {
        title: 'Article 5 (Notice on Government Support Programs)',
        body: ['The Company supports technical planning and validation design for government support programs but does not guarantee program selection or funding.'],
      },
      {
        title: 'Article 6 (Intellectual Property)',
        body: ['Copyright in content published on the website belongs to the Company.', 'Ownership and usage rights for service deliverables follow the individual contract.'],
      },
      {
        title: 'Article 7 (Limitation of Liability)',
        body: [
          'The Company strives for accuracy in website information but is not liable for decisions made based on that information.',
          'The scope of service may vary due to changes in the policies or availability of external platforms and equipment.',
        ],
      },
      {
        title: 'Article 8 (Changes to These Terms)',
        body: ['The Company may amend these terms as necessary and will announce changes on the website.'],
      },
    ],
  },
};
