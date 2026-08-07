/**
 * 콘텐츠 모델 — 마스터 문서 15.3 Content Model
 * 모든 카피는 src/content 의 데이터 객체로 관리하고 컴포넌트에 하드코딩하지 않는다.
 */

/** 사실 확인 상태 — 마스터 문서 22.1 콘텐츠 신뢰성 정책 */
export type FactStatus =
  | 'verified' // 문서·계약·시험성적서 등으로 확인
  | 'client-approved' // 고객 공개 승인 완료
  | 'internal' // 내부 확인만 완료
  | 'placeholder' // 교체 필요
  | 'do-not-publish'; // 공개 금지

export type Service = {
  slug: string;
  step: string;
  name: string;
  summary: string;
  description: string;
  deliverables: string[];
  suitableFor: string[];
  startingPrice?: string;
  priceStatus?: FactStatus;
  duration?: string;
  /** 보장할 수 없는 범위에 대한 주의 문구 — 마스터 문서 21.2 */
  caution?: string;
  ctaLabel: string;
  ctaHref: string;
};

export type Industry = {
  slug: string;
  name: string;
  headline: string;
  problems: string[];
  capabilities: string[];
  caution?: string;
  ctaLabel: string;
};

/** 사례 상태 배지 — 13.6 상태 배지 */
export type CaseStatus = 'actual' | 'poc' | 'design' | 'research' | 'example';

export type CaseStudy = {
  slug: string;
  title: string;
  status: CaseStatus;
  industry: string;
  problem: string;
  approach: string;
  architecture: string[];
  outcomes?: string[];
  outcomeStatus: 'verified' | 'pending' | 'not-disclosed';
  thumbnail?: string;
};

export type NationalRndRecord = {
  slug: string;
  period: string;
  projectName: string;
  programName?: string;
  agency?: string;
  organization: string;
  officialRole: '연구책임자' | '참여연구원';
  /** NTIS 에 등록된 연차별 기록 수 */
  annualRecords: number;
  field: string[];
  description: string;
  responsibilities: string[];
  outputs: string[];
  outcomes?: string[];
  evidenceLevel: 'A' | 'B' | 'C';
  disclosure: 'public' | 'anonymized' | 'private';
  sourceId: 'S1' | 'S2' | 'agreement' | 'result-report';
  publishStatus: 'ready' | 'verify' | 'private';
};

export type BusinessRecord = {
  year: number;
  title: string;
  role?: string;
  field?: string[];
  description?: string;
  tags: Array<'사업' | '구축' | '연구' | '제품' | 'PM'>;
  featured?: boolean;
  evidenceLevel: 'A' | 'B' | 'C';
  note?: string;
};

export type ResearchRecord = {
  year: string;
  topic: string;
  detail: string;
  group: 'core' | 'foundation';
};

export type ConsultingRecord = {
  period: string;
  field: string;
  detail: string;
  note?: string;
};

export type LectureRecord = {
  year: string;
  course: string;
  organization: string;
  featured?: boolean;
};

export type PricingPlan = {
  name: string;
  description: string;
  features: string[];
  price: string;
  priceNote?: string;
  priceStatus: FactStatus;
  highlighted?: boolean;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ProcessStep = {
  step: string;
  /** 항상 대문자 영단어로 표기하는 보조 라벨 — 두 언어 화면에서 동일하게 노출된다 (예: DIAGNOSE). */
  labelEn: string;
  /** 현재 locale로 번역된 주 제목 (예: '현장 진단' / 'Diagnose'). */
  label: string;
  description: string;
};
