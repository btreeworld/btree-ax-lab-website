/** 문의·유료 진단 신청 — 마스터 문서 13장 */
import type { Locale } from '@/i18n/locales';

type ContactCopy = {
  heroTitle: string[];
  helper: string[];
  submitLabel: string;
  successTitle: string;
  successMessage: string;
  errorMessage: string;
  consentLabel: string;
  consentDetail: string;
  startingPricesLabel: string;
  directContactLabel: string;
};

export const contactCopy: Record<Locale, ContactCopy> = {
  ko: {
    heroTitle: ['현장의 문제를 알려주십시오', '적합한 진단 방식부터 안내하겠습니다'],
    helper: [
      '상담 요청 내용을 검토한 뒤 영업일 기준 1~2일 내 회신합니다.',
      '무료 상담은 서비스 적합성 확인을 위한 30분 미팅이며, 상세 기술설계는 유료 서비스로 진행합니다.',
    ],
    submitLabel: '진단 상담 요청하기',
    successTitle: '문의가 정상적으로 접수되었습니다.',
    successMessage: '보내주신 내용을 검토한 뒤 입력하신 연락처로 안내드리겠습니다.',
    errorMessage: '전송 중 문제가 발생했습니다. 잠시 후 다시 시도하거나 대표 이메일로 문의해 주세요.',
    consentLabel: '개인정보 수집·이용에 동의합니다. (필수)',
    consentDetail:
      '문의 응대와 상담 진행을 위해 회사명, 담당자명, 이메일, 연락처와 문의 내용을 수집합니다. 자세한 내용은 개인정보처리방침을 확인해 주세요.',
    startingPricesLabel: '시작 가격',
    directContactLabel: '직접 연락',
  },
  en: {
    heroTitle: ['Tell us about your problem', "We'll recommend the right diagnosis approach"],
    helper: [
      "We review inquiries and reply within 1-2 business days.",
      'The free consultation is a 30-minute meeting to confirm service fit; detailed technical design is part of the paid service.',
    ],
    submitLabel: 'Request a Diagnosis Consultation',
    successTitle: 'Your inquiry has been received.',
    successMessage: "We'll review your message and follow up using the contact details you provided.",
    errorMessage: 'Something went wrong while sending. Please try again shortly or email us directly.',
    consentLabel: 'I agree to the collection and use of my personal information. (Required)',
    consentDetail:
      'We collect your company name, contact name, email, phone number, and inquiry details to respond to your request. See our privacy policy for details.',
    startingPricesLabel: 'Starting Prices',
    directContactLabel: 'Direct Contact',
  },
};

export const industryOptions: Record<Locale, string[]> = {
  ko: ['제조·스마트팩토리', '산업안전·CCTV 관제', '스마트팜·농업', '시설·공간 운영', '로봇·자동화', '연구개발·정부과제', '기타'],
  en: [
    'Manufacturing & Smart Factory',
    'Industrial Safety & CCTV Monitoring',
    'Smart Farm & Agriculture',
    'Facility & Space Operations',
    'Robotics & Automation',
    'R&D / Government Programs',
    'Other',
  ],
};

export const serviceOptions: Record<Locale, Array<{ value: string; label: string }>> = {
  ko: [
    { value: 'ax-diagnosis-remote', label: '원격 AX 진단' },
    { value: 'ax-diagnosis', label: '현장 AX 진단' },
    { value: 'system-design', label: '구축 설계' },
    { value: 'poc', label: 'PoC 실증' },
    { value: 'advisory', label: '월간 기술자문' },
    { value: 'rnd-planning', label: '정부과제 기술기획' },
    { value: 'undecided', label: '어떤 서비스가 필요한지 모르겠음' },
  ],
  en: [
    { value: 'ax-diagnosis-remote', label: 'Remote AX Diagnosis' },
    { value: 'ax-diagnosis', label: 'On-site AX Diagnosis' },
    { value: 'system-design', label: 'System Design' },
    { value: 'poc', label: 'PoC Validation' },
    { value: 'advisory', label: 'Monthly Advisory' },
    { value: 'rnd-planning', label: 'Government R&D Planning' },
    { value: 'undecided', label: "I'm not sure which service I need" },
  ],
};

export const budgetOptions: Record<Locale, string[]> = {
  ko: ['100만원 미만', '100만~500만원', '500만~1,500만원', '1,500만~5,000만원', '5,000만원 이상', '미정'],
  en: [
    'Under KRW 1M',
    'KRW 1M–5M',
    'KRW 5M–15M',
    'KRW 15M–50M',
    'Over KRW 50M',
    'Undecided',
  ],
};

export const timelineOptions: Record<Locale, string[]> = {
  ko: ['가능한 한 빨리', '1개월 이내', '1~3개월', '3~6개월', '6개월 이후', '미정'],
  en: ['As soon as possible', 'Within 1 month', '1-3 months', '3-6 months', 'After 6 months', 'Undecided'],
};

/**
 * MVP 운영 원칙 — 마스터 문서 16.3
 * 첨부파일은 초기 운영에서 제외하고, 필요한 경우 접수 후 안전한 경로로 별도 수집한다.
 */
export const attachmentPolicy: Record<Locale, string> = {
  ko: '첨부가 필요한 자료는 문의 접수 후 안내드리는 안전한 경로로 별도 전달해 주세요.',
  en: "If you need to share files, we'll send you a secure way to do so after your inquiry is received.",
};
