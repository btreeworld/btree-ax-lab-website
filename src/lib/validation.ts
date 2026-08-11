import { z } from 'zod';

import { budgetOptions, industryOptions, serviceOptions, timelineOptions } from '@/content/contact';
import { locales, type Locale } from '@/i18n/locales';

/** service의 value는 locale에 상관없이 동일하므로 기본 locale 목록에서 추출한다. */
const serviceValues: string[] = serviceOptions.ko.map((option) => option.value);

const messages: Record<
  Locale,
  {
    company: string;
    name: string;
    email: string;
    emailFormat: string;
    phone: string;
    phoneFormat: string;
    industry: string;
    service: string;
    problemMin: string;
    problemMax: string;
    consent: string;
    budget: string;
    timeline: string;
    maxLength: (max: number) => string;
  }
> = {
  ko: {
    company: '회사명을 입력해 주세요.',
    name: '담당자명을 입력해 주세요.',
    email: '이메일을 입력해 주세요.',
    emailFormat: '이메일 형식을 확인해 주세요.',
    phone: '연락처를 입력해 주세요.',
    phoneFormat: '숫자와 - + ( ) 만 입력할 수 있습니다.',
    industry: '산업 분야를 선택해 주세요.',
    service: '희망 서비스를 선택해 주세요.',
    problemMin: '해결하려는 문제를 10자 이상 입력해 주세요.',
    problemMax: '2000자 이내로 입력해 주세요.',
    consent: '개인정보 수집·이용에 동의해 주세요.',
    budget: '예상 예산을 다시 선택해 주세요.',
    timeline: '희망 시작 시기를 다시 선택해 주세요.',
    maxLength: (max) => `${max}자 이내로 입력해 주세요.`,
  },
  en: {
    company: 'Please enter your company name.',
    name: 'Please enter a contact name.',
    email: 'Please enter your email.',
    emailFormat: 'Please check the email format.',
    phone: 'Please enter a phone number.',
    phoneFormat: 'Only digits and - + ( ) are allowed.',
    industry: 'Please select an industry.',
    service: 'Please select a service.',
    problemMin: 'Please enter at least 10 characters describing the problem.',
    problemMax: 'Please keep it under 2000 characters.',
    consent: 'Please agree to the collection and use of personal information.',
    budget: 'Please re-select an estimated budget.',
    timeline: 'Please re-select a desired start time.',
    maxLength: (max) => `Please keep it under ${max} characters.`,
  },
};

/**
 * 문의 폼 스키마 — 마스터 문서 13.3 Form Fields
 * industry/budget/timeline은 화면에 표시된 언어의 라벨을 그대로 값으로 저장하므로,
 * 어느 locale에서 제출했는지에 따라 검증 기준 목록과 오류 메시지가 달라진다.
 */
export function buildContactSchema(locale: Locale) {
  const industryValues = industryOptions[locale];
  const budgetValues = budgetOptions[locale];
  const timelineValues = timelineOptions[locale];
  const m = messages[locale];

  const optionalText = (max: number) =>
    z.string().trim().max(max, m.maxLength(max)).optional().or(z.literal(''));

  return z.object({
    locale: z.enum(locales),
    company: z.string().trim().min(1, m.company).max(100),
    name: z.string().trim().min(1, m.name).max(50),
    email: z.string().trim().min(1, m.email).email(m.emailFormat).max(200),
    phone: z.string().trim().min(1, m.phone).max(30).regex(/^[0-9+\-\s()]+$/, m.phoneFormat),
    industry: z.string().refine((value) => industryValues.includes(value), { message: m.industry }),
    service: z.string().refine((value) => serviceValues.includes(value), { message: m.service }),
    problem: z.string().trim().min(10, m.problemMin).max(2000, m.problemMax),
    consent: z.boolean().refine((value) => value === true, { message: m.consent }),

    // 선택 항목
    website: optionalText(200),
    region: optionalText(100),
    existingSystem: optionalText(1000),
    budget: z
      .string()
      .refine((value) => value === '' || budgetValues.includes(value), { message: m.budget })
      .optional()
      .or(z.literal('')),
    timeline: z
      .string()
      .refine((value) => value === '' || timelineValues.includes(value), { message: m.timeline })
      .optional()
      .or(z.literal('')),
    governmentProgram: z.boolean().optional(),

    /**
     * 스팸·봇 방지용 honeypot — 마스터 문서 17.2.
     * 사람에게는 보이지 않는 필드이므로 값이 있으면 봇으로 판단한다. 여기서 값을 거부하면
     * 라우트 핸들러의 "조용히 성공 응답" 처리에 도달하지 못하고 400으로 막혀버리므로,
     * 검증은 통과시키고 판단은 route.ts의 `if (data.hp)`에 맡긴다.
     */
    hp: z.string().optional(),
  });
}

export type ContactInput = z.infer<ReturnType<typeof buildContactSchema>>;

export function contactDefaultValues(locale: Locale): ContactInput {
  return {
    locale,
    company: '',
    name: '',
    email: '',
    phone: '',
    industry: '',
    service: '',
    problem: '',
    consent: false,
    website: '',
    region: '',
    existingSystem: '',
    budget: '',
    timeline: '',
    governmentProgram: false,
    hp: '',
  };
}
