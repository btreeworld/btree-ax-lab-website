/**
 * 가격 — 마스터 문서 7.9 / 4.2 / 10장
 * ⚠️ 마스터 문서 28장 기준 "AX 진단 최종 가격"은 확정 필요 상태다.
 *    priceStatus: 'placeholder' 가 남아 있는 항목은 오픈 전 확정한다.
 */
import type { PricingPlan, ProcessStep } from '@/types';

export const pricingPlans: PricingPlan[] = [
  {
    name: '원격 AX 진단',
    description: '현장 방문 없이 자료와 인터뷰 기반으로 적용 가능성을 검토합니다.',
    features: ['사전 인터뷰', '자료 분석', '적용 가능성 검토', '개념 구성도', '단계별 권고안'],
    price: '99만원부터',
    priceStatus: 'placeholder',
  },
  {
    name: '현장 AX 진단',
    description: '현장을 직접 확인하고 우선순위 Use Case와 도입 로드맵까지 정리합니다.',
    features: ['현장 방문', '설비·업무 분석', '우선순위 Use Case', '도입 로드맵', 'PoC 범위·예산'],
    price: '198만원부터',
    priceStatus: 'placeholder',
    highlighted: true,
  },
  {
    name: '구축 설계',
    description: '개발팀이 그대로 사용할 수 있는 요구사항과 아키텍처를 만듭니다.',
    features: ['요구사항', '시스템 아키텍처', '장비·개발 범위', '성능지표', '일정·예산'],
    price: '490만원부터',
    priceStatus: 'placeholder',
  },
];

export const pricingNote = [
  '부가세, 출장비와 별도 장비비는 프로젝트 범위에 따라 추가됩니다.',
  '정확한 견적은 사전 적합성 확인 후 안내합니다.',
] as const;

/** 10.2 전체 절차 */
export const processDetail: ProcessStep[] = [
  {
    step: '00',
    labelEn: 'Fit Check',
    labelKo: '적합성 확인',
    description:
      '30분 온라인 미팅으로 현재 문제와 목표를 확인하고, 유료 서비스 적합성과 권장 상품·견적을 안내합니다.',
  },
  {
    step: '01',
    labelEn: 'Contract',
    labelKo: '계약·선결제',
    description:
      '범위·산출물·일정을 합의하고 계약서에 서명한 뒤 진단비 또는 착수금 결제로 일정을 확정합니다.',
  },
  {
    step: '02',
    labelEn: 'Analysis',
    labelKo: '자료·현장 분석',
    description: '인터뷰, 자료 검토, 현장 조사와 기존 시스템 확인을 진행합니다.',
  },
  {
    step: '03',
    labelEn: 'Design',
    labelKo: '설계·검토',
    description: '문제 정의, 대안 비교, 아키텍처, 예산·일정, 성능지표를 정리합니다.',
  },
  {
    step: '04',
    labelEn: 'Delivery',
    labelKo: '결과 전달',
    description: '결과보고서를 전달하고 온라인 또는 대면 설명, 질의응답, 후속 단계 견적을 제공합니다.',
  },
  {
    step: '05',
    labelEn: 'Scale',
    labelKo: 'PoC·고도화',
    description:
      '선택사항이며 별도 계약으로 진행합니다. 구현과 검증을 거쳐 본 구축 여부를 결정합니다.',
  },
];

/** 10.3 환불·일정 원칙 — 법률 검토 후 최종 반영 */
export const refundPolicyDraft = {
  status: 'placeholder' as const,
  notice: '아래는 초안이며 법률 검토 후 최종 반영합니다. 상세 기준은 개별 계약서가 우선합니다.',
  items: [
    '일정 확정 전 취소: 결제수수료와 이미 발생한 실비를 제외하고 환불 가능',
    '일정 확정 후 착수 전 취소: 계약서 기준',
    '자료 검토 또는 인터뷰 시작 후: 수행된 업무를 제외하고 정산',
    '고객의 자료 지연으로 일정이 변경될 수 있음',
    '출장 취소로 발생한 교통·숙박 비용은 실비 처리',
  ],
} as const;
