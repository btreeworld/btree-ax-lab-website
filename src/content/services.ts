/**
 * 서비스 상품 — 마스터 문서 4장 / 7.3 / 8장
 * 가격은 마스터 문서 28장 기준 "확정 필요" 상태이므로 priceStatus 로 관리한다.
 */
import type { Service } from '@/types';

export const services: Service[] = [
  {
    slug: 'ax-diagnosis',
    step: '01',
    name: '산업 현장 AX 진단',
    summary:
      '현장 문제와 기존 설비를 분석해 AI·디지털트윈 도입의 우선순위와 실행 경로를 제시합니다.',
    description:
      '사전 인터뷰와 현장 또는 원격 업무 분석을 통해 기존 설비·데이터·네트워크 현황을 검토하고, 우선순위 Use Case와 개념 시스템 구성도, 단계별 도입 로드맵을 정리합니다.',
    deliverables: [
      'AX 진단보고서',
      '우선순위 매트릭스',
      '개념 아키텍처',
      '단계별 추진 로드맵',
      '후속 설계 견적',
    ],
    suitableFor: [
      'AI 도입 필요성은 있으나 시작점을 모르는 경우',
      '기존 설비·데이터 활용 가능성을 먼저 확인하고 싶은 경우',
      '투자 규모와 순서를 판단해야 하는 경우',
    ],
    startingPrice: '원격 99만원 / 현장 198만원부터',
    priceStatus: 'placeholder',
    duration: '범위에 따라 협의',
    ctaLabel: '유료 AX 진단 신청',
    ctaHref: '/contact?service=ax-diagnosis',
  },
  {
    slug: 'system-design',
    step: '02',
    name: 'AX·디지털트윈 구축 설계',
    summary:
      '아이디어를 개발 가능한 요구사항, 시스템 아키텍처, 예산과 검증계획으로 구체화합니다.',
    description:
      '요구사항 정의부터 Edge·Cloud 구성, 카메라·센서·게이트웨이 구성, 데이터 흐름, AI 추론 구조, 디지털트윈 화면 구조, 보안·권한, 성능지표와 시험·실증 계획, WBS·예산까지 개발팀이 그대로 사용할 수 있는 수준으로 설계합니다.',
    deliverables: [
      '요구사항정의서',
      '시스템 아키텍처',
      '데이터 흐름도',
      '화면·기능 정의',
      '장비 및 개발 범위',
      '검증 계획',
      '구현 로드맵',
    ],
    suitableFor: [
      '도입 방향은 정해졌으나 구현 명세가 없는 경우',
      '외주 개발 발주 전 요구사항을 확정해야 하는 경우',
      '예산과 일정 근거가 필요한 경우',
    ],
    startingPrice: '프로젝트 범위에 따라 490만원부터',
    priceStatus: 'placeholder',
    ctaLabel: '구축 설계 상담 요청',
    ctaHref: '/contact?service=system-design',
  },
  {
    slug: 'poc',
    step: '03',
    name: 'PoC 실증',
    summary:
      '대규모 투자 전에 핵심 기능을 작은 현장에서 구현하고 성능과 운영 가능성을 검증합니다.',
    description:
      'CCTV 1~4채널 위험상황 탐지, 센서 데이터 통합 대시보드, Jetson 기반 Edge AI 추론, 텔레그램·이메일·음성 경보, 디지털트윈 시각화 등 핵심 기능을 실제 동작하는 형태로 구현하고 성능지표를 측정합니다.',
    deliverables: [
      '실행 가능한 PoC 시스템',
      '설치·운영 문서',
      '실증 결과보고서',
      '성능지표 측정 결과',
      '본 구축 권고안',
      '확장 예산과 일정',
    ],
    suitableFor: [
      '본 구축 전에 기술·비용·성과를 검증해야 하는 경우',
      '내부 의사결정을 위한 근거가 필요한 경우',
      '정부지원사업 실증 구간이 필요한 경우',
    ],
    startingPrice: 'PoC 범위에 따라 1,500만원부터',
    priceStatus: 'placeholder',
    ctaLabel: 'PoC 범위 상담 요청',
    ctaHref: '/contact?service=poc',
  },
  {
    slug: 'advisory',
    step: '04',
    name: '월간 기술자문',
    summary:
      '전담 기술책임자를 채용하기 전에 필요한 만큼 AX·AI·디지털트윈 전문가를 활용하십시오.',
    description:
      '정기 기술회의, 시스템 구조 검토, 신규 기능 우선순위 판단, 외주개발사 산출물 검토, AI 성능·데이터 이슈 분석, 정부과제 기술기획 검토와 월간 액션 리포트를 제공합니다.',
    deliverables: [
      '정기 기술회의',
      '시스템 구조 검토 의견',
      '외주 산출물 검토 결과',
      '월간 액션 리포트',
    ],
    suitableFor: [
      '기술 의사결정을 검토할 내부 인력이 부족한 경우',
      '외주 개발 품질을 관리해야 하는 경우',
      '지속적인 기술 파트너가 필요한 경우',
    ],
    startingPrice: '기술자문 월 150만원 / 운영지원 월 250만원부터',
    priceStatus: 'placeholder',
    duration: '최소 계약기간 3개월',
    ctaLabel: '기술자문 상담 요청',
    ctaHref: '/contact?service=advisory',
  },
  {
    slug: 'rnd-planning',
    step: '05',
    name: '정부과제 기술기획 및 실증설계',
    summary: '문서대행이 아니라, 평가 가능한 시스템 구조와 성능지표를 설계합니다.',
    description:
      '기술개발 목표 구체화, 기술 아키텍처, 연구개발 항목, 정량 성능지표, 시험·공인검증 계획, 개발일정·WBS, 연구비 산정 지원, 발표평가 기술자료와 선정 후 기술 PM 역할을 수행합니다.',
    deliverables: [
      '기술개발 목표·연구개발 항목',
      '기술 아키텍처',
      '정량 성능지표',
      '시험·공인검증 계획',
      '개발일정·WBS',
    ],
    suitableFor: [
      '정부 R&D 과제 기술 파트가 필요한 경우',
      '평가 가능한 성능지표 설계가 필요한 경우',
      '컨소시엄 기술 파트너를 찾는 경우',
    ],
    caution:
      '과제 선정은 보장하지 않으며, 사업 공고와 고객의 자격요건에 따라 참여 가능성이 달라질 수 있습니다.',
    ctaLabel: '정부과제 기술기획 문의',
    ctaHref: '/contact?service=rnd-planning',
  },
];

/** 홈 Section 03 에는 대표 4개 서비스만 노출한다 (마스터 문서 7.3). */
export const homeServiceSlugs = ['ax-diagnosis', 'system-design', 'poc', 'advisory'] as const;

/** 8.2 서비스 비교표 */
export const serviceComparison = {
  columns: ['AX 진단', '구축 설계', 'PoC 실증', '기술자문'],
  rows: [
    { label: '적합한 단계', values: ['시작 전', '방향 확정 후', '투자 전 검증', '진행·운영 중'] },
    {
      label: '핵심 질문',
      values: ['무엇을 해야 하나', '어떻게 만들 것인가', '실제로 되는가', '다음 판단은 무엇인가'],
    },
    {
      label: '주요 산출물',
      values: ['진단보고서', '요구사항·아키텍처', '실행 시스템·결과보고', '월간 액션리포트'],
    },
    { label: '시작 가격', values: ['99만원', '490만원', '1,500만원', '월 150만원'] },
    { label: '결제 구조', values: ['100% 선결제', '단계별 선결제', '장비비 선납', '월 선납'] },
  ],
} as const;

/** 4.1 무료 상담의 범위 */
export const freeConsultationScope = {
  title: '무료 상담의 범위',
  description: '무료 상담은 "구매 적합성 확인"에 한정합니다.',
  included: [
    '고객 문제와 목표 확인',
    '서비스 적합 여부 판단',
    '예상 진행 방식 안내',
    '유료 진단 범위와 견적 안내',
  ],
  excluded: ['상세 아키텍처', '장비 목록', '사업계획서', '구현 방법'],
} as const;
