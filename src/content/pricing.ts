/**
 * 가격 — 마스터 문서 7.9 / 4.2 / 10장
 *
 * 2026-08 대표 확인으로 최종 확정(priceStatus: 'verified'). 책정 근거:
 * 1인 전문가 체제 부티크 컨설팅사 기준으로, 진입장벽을 낮춘 저가 상담(원격 99만원)에서
 * 시작해 현장 진단(198만원 — 원격의 정확히 2배, 단순한 심리적 앵커) → 구축 설계(490만원부터)
 * → 실제 구현이 들어가는 PoC(1,500만원부터)로 이어지는 단계별 퍼널 구조를 유지했다.
 * 국내 시니어 프리랜서/1인 컨설턴트 일당(50~150만원)과 중소 SI PoC 관행가(수천만원대)
 * 사이에서, "큰 시스템을 먼저 팔지 않는다"는 브랜드 포지셔닝에 맞춰 낮은 쪽에 앵커링했다.
 * 이 분석은 실측 시장조사가 아니라 일반적인 시세 감각에 기반한 판단이므로, 실제 원가·마진
 * 구조와 맞는지는 오픈 전 대표가 한 번 더 검토할 것을 권한다.
 */
import type { Locale } from '@/i18n/locales';
import type { PricingPlan, ProcessStep } from '@/types';

export const pricingPlans: Record<Locale, PricingPlan[]> = {
  ko: [
    {
      name: '원격 AX 진단',
      description: '현장 방문 없이 자료와 인터뷰 기반으로 적용 가능성을 검토합니다.',
      features: ['사전 인터뷰', '자료 분석', '적용 가능성 검토', '개념 구성도', '단계별 권고안'],
      price: '99만원부터',
      priceStatus: 'verified',
    },
    {
      name: '현장 AX 진단',
      description: '현장을 직접 확인하고 우선순위 Use Case와 도입 로드맵까지 정리합니다.',
      features: ['현장 방문', '설비·업무 분석', '우선순위 Use Case', '도입 로드맵', 'PoC 범위·예산'],
      price: '198만원부터',
      priceStatus: 'verified',
      highlighted: true,
    },
    {
      name: '구축 설계',
      description: '개발팀이 그대로 사용할 수 있는 요구사항과 아키텍처를 만듭니다.',
      features: ['요구사항', '시스템 아키텍처', '장비·개발 범위', '성능지표', '일정·예산'],
      price: '490만원부터',
      priceStatus: 'verified',
    },
  ],
  en: [
    {
      name: 'Remote AX Diagnosis',
      description: 'We assess feasibility from documents and interviews, without a site visit.',
      features: ['Pre-interview', 'Document analysis', 'Feasibility review', 'Concept diagram', 'Phased recommendations'],
      price: 'From KRW 990K',
      priceStatus: 'verified',
    },
    {
      name: 'On-site AX Diagnosis',
      description: 'We visit the site and produce priority use cases and an adoption roadmap.',
      features: ['Site visit', 'Equipment & operations analysis', 'Priority use cases', 'Adoption roadmap', 'PoC scope & budget'],
      price: 'From KRW 1.98M',
      priceStatus: 'verified',
      highlighted: true,
    },
    {
      name: 'System Design',
      description: 'Requirements and architecture your development team can use directly.',
      features: ['Requirements', 'System architecture', 'Equipment & dev scope', 'Performance metrics', 'Schedule & budget'],
      price: 'From KRW 4.9M',
      priceStatus: 'verified',
    },
  ],
};

/** PricingSection 컴포넌트 헤더 카피 — 홈/진행절차 페이지에서 공유한다. */
export const pricingSectionCopy: Record<Locale, { eyebrow: string; title: string; description: string; highlightedBadge: string; vatNote: string }> = {
  ko: {
    eyebrow: 'PRICING',
    title: '필요한 단계부터 시작하십시오',
    description: '전체 구축을 먼저 결정하지 않아도 됩니다. 필요한 단계의 서비스부터 시작할 수 있습니다.',
    highlightedBadge: '권장',
    vatNote: '부가세 별도',
  },
  en: {
    eyebrow: 'PRICING',
    title: 'Start with the stage you need',
    description: "You don't have to commit to the full build first. Start with the service for your current stage.",
    highlightedBadge: 'Recommended',
    vatNote: 'VAT excluded',
  },
};

export const pricingNote: Record<Locale, string[]> = {
  ko: [
    '부가세, 출장비와 별도 장비비는 프로젝트 범위에 따라 추가됩니다.',
    '정확한 견적은 사전 적합성 확인 후 안내합니다.',
  ],
  en: [
    'VAT, travel expenses, and equipment costs are added depending on project scope.',
    'An exact quote is provided after the initial fit check.',
  ],
};

/** 10.2 전체 절차 */
export const processDetail: Record<Locale, ProcessStep[]> = {
  ko: [
    {
      step: '00',
      labelEn: 'Fit Check',
      label: '적합성 확인',
      description:
        '30분 온라인 미팅으로 현재 문제와 목표를 확인하고, 유료 서비스 적합성과 권장 상품·견적을 안내합니다.',
    },
    {
      step: '01',
      labelEn: 'Contract',
      label: '계약·선결제',
      description: '범위·산출물·일정을 합의하고 계약서에 서명한 뒤 진단비 또는 착수금 결제로 일정을 확정합니다.',
    },
    {
      step: '02',
      labelEn: 'Analysis',
      label: '자료·현장 분석',
      description: '인터뷰, 자료 검토, 현장 조사와 기존 시스템 확인을 진행합니다.',
    },
    {
      step: '03',
      labelEn: 'Design',
      label: '설계·검토',
      description: '문제 정의, 대안 비교, 아키텍처, 예산·일정, 성능지표를 정리합니다.',
    },
    {
      step: '04',
      labelEn: 'Delivery',
      label: '결과 전달',
      description: '결과보고서를 전달하고 온라인 또는 대면 설명, 질의응답, 후속 단계 견적을 제공합니다.',
    },
    {
      step: '05',
      labelEn: 'Scale',
      label: 'PoC·고도화',
      description: '선택사항이며 별도 계약으로 진행합니다. 구현과 검증을 거쳐 본 구축 여부를 결정합니다.',
    },
  ],
  en: [
    {
      step: '00',
      labelEn: 'Fit Check',
      label: 'Fit Check',
      description:
        'A 30-minute online meeting to confirm your problem and goals, then we outline fit for paid services and a recommended plan and quote.',
    },
    {
      step: '01',
      labelEn: 'Contract',
      label: 'Contract',
      description: 'We agree on scope, deliverables, and schedule, sign the contract, and confirm the schedule upon payment.',
    },
    {
      step: '02',
      labelEn: 'Analysis',
      label: 'Analysis',
      description: 'We conduct interviews, review documents, visit the site, and review existing systems.',
    },
    {
      step: '03',
      labelEn: 'Design',
      label: 'Design',
      description: 'We define the problem, compare alternatives, and produce architecture, budget/schedule, and performance metrics.',
    },
    {
      step: '04',
      labelEn: 'Delivery',
      label: 'Delivery',
      description: 'We deliver the results report with an online or in-person walkthrough, Q&A, and a quote for the next stage.',
    },
    {
      step: '05',
      labelEn: 'Scale',
      label: 'PoC & Scale-up',
      description: 'Optional, under a separate contract. Implementation and validation inform the full-build decision.',
    },
  ],
};

type RefundPolicy = { status: 'placeholder'; notice: string; items: string[] };

type ProcessPageCopy = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  detailTitle: string;
  detailDescription: string;
  freeScopeTitle: string;
  freeIncludedTitle: string;
  freeExcludedTitle: string;
  refundTitle: string;
};

export const processPageCopy: Record<Locale, ProcessPageCopy> = {
  ko: {
    heroEyebrow: 'PROCESS & PRICING',
    heroTitle: '범위를 먼저 정하고, 비용을 예측하고, 작게 검증합니다',
    heroDescription: '큰 계약을 먼저 결정하지 않아도 됩니다. 범위를 정하고, 비용을 예측한 뒤 작게 검증합니다.',
    detailTitle: '전체 진행 절차',
    detailDescription: '문의부터 PoC까지 각 단계에서 무엇이 진행되는지 미리 확인할 수 있습니다.',
    freeScopeTitle: '무료 상담의 범위',
    freeIncludedTitle: '포함',
    freeExcludedTitle: '미포함 (유료 서비스 범위)',
    refundTitle: '환불·일정 원칙',
  },
  en: {
    heroEyebrow: 'PROCESS & PRICING',
    heroTitle: 'Define scope, estimate cost, and validate at small scale first',
    heroDescription: "You don't have to commit to a large contract up front. Define scope, estimate cost, then validate small.",
    detailTitle: 'Full Process',
    detailDescription: 'See what happens at each stage, from inquiry through PoC.',
    freeScopeTitle: 'What the Free Consultation Covers',
    freeIncludedTitle: 'Included',
    freeExcludedTitle: 'Not included (paid service)',
    refundTitle: 'Refund & Scheduling Policy',
  },
};

/** 10.3 환불·일정 원칙 — 법률 검토 후 최종 반영 */
export const refundPolicyDraft: Record<Locale, RefundPolicy> = {
  ko: {
    status: 'placeholder',
    notice: '아래는 초안이며 법률 검토 후 최종 반영합니다. 상세 기준은 개별 계약서가 우선합니다.',
    items: [
      '일정 확정 전 취소: 결제수수료와 이미 발생한 실비를 제외하고 환불 가능',
      '일정 확정 후 착수 전 취소: 계약서 기준',
      '자료 검토 또는 인터뷰 시작 후: 수행된 업무를 제외하고 정산',
      '고객의 자료 지연으로 일정이 변경될 수 있음',
      '출장 취소로 발생한 교통·숙박 비용은 실비 처리',
    ],
  },
  en: {
    status: 'placeholder',
    notice: 'This is a draft pending legal review. The individual contract takes precedence over the details below.',
    items: [
      'Cancellation before schedule confirmation: refundable minus payment fees and incurred costs',
      'Cancellation after schedule confirmation but before start: per contract terms',
      'After document review or interviews have begun: settled minus work already performed',
      'Schedule may change due to delays in client-provided materials',
      'Travel/lodging costs from a cancelled site visit are billed at cost',
    ],
  },
};
