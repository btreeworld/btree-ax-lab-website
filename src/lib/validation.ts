import { z } from 'zod';

import { budgetOptions, industryOptions, serviceOptions, timelineOptions } from '@/content/contact';

const industryValues: readonly string[] = industryOptions;
const serviceValues: string[] = serviceOptions.map((option) => option.value);
const budgetValues: readonly string[] = budgetOptions;
const timelineValues: readonly string[] = timelineOptions;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `${max}자 이내로 입력해 주세요.`)
    .optional()
    .or(z.literal(''));

/**
 * 문의 폼 스키마 — 마스터 문서 13.3 Form Fields
 * 클라이언트와 서버(API Route)에서 동일한 스키마로 검증한다 (17.1).
 */
export const contactSchema = z.object({
  company: z.string().trim().min(1, '회사명을 입력해 주세요.').max(100),
  name: z.string().trim().min(1, '담당자명을 입력해 주세요.').max(50),
  email: z
    .string()
    .trim()
    .min(1, '이메일을 입력해 주세요.')
    .email('이메일 형식을 확인해 주세요.')
    .max(200),
  phone: z
    .string()
    .trim()
    .min(1, '연락처를 입력해 주세요.')
    .max(30)
    .regex(/^[0-9+\-\s()]+$/, '숫자와 - + ( ) 만 입력할 수 있습니다.'),
  industry: z.string().refine((value) => industryValues.includes(value), {
    message: '산업 분야를 선택해 주세요.',
  }),
  service: z.string().refine((value) => serviceValues.includes(value), {
    message: '희망 서비스를 선택해 주세요.',
  }),
  problem: z
    .string()
    .trim()
    .min(10, '해결하려는 문제를 10자 이상 입력해 주세요.')
    .max(2000, '2000자 이내로 입력해 주세요.'),
  consent: z.boolean().refine((value) => value === true, {
    message: '개인정보 수집·이용에 동의해 주세요.',
  }),

  // 선택 항목
  website: optionalText(200),
  region: optionalText(100),
  existingSystem: optionalText(1000),
  budget: z
    .string()
    .refine((value) => value === '' || budgetValues.includes(value), {
      message: '예상 예산을 다시 선택해 주세요.',
    })
    .optional()
    .or(z.literal('')),
  timeline: z
    .string()
    .refine((value) => value === '' || timelineValues.includes(value), {
      message: '희망 시작 시기를 다시 선택해 주세요.',
    })
    .optional()
    .or(z.literal('')),
  governmentProgram: z.boolean().optional(),

  /**
   * 스팸·봇 방지용 honeypot — 마스터 문서 17.2.
   * 사람에게는 보이지 않는 필드이므로 값이 있으면 봇으로 판단한다.
   */
  hp: z.string().max(0, '요청을 처리할 수 없습니다.').optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const contactDefaultValues: ContactInput = {
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
