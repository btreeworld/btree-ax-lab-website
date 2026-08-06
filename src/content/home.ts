/**
 * 홈 페이지 카피 — 마스터 문서 7장 "홈 페이지 상세 명세"
 * 섹션 순서: Hero → Problem → Services → Process → Industries → Why → Architecture
 *            → Cases → Pricing → Representative → FAQ → Final CTA
 */
import type { ProcessStep } from '@/types';

/** 7.1 Section 01 — Hero */
export const hero = {
  eyebrow: 'INDUSTRIAL AI · EDGE AI · DIGITAL TWIN',
  headline: ['산업 현장의 문제를', 'AI와 디지털트윈으로 설계하고 검증합니다.'],
  description: [
    '제조·산업안전·스마트팜·시설 운영 현장을 진단하고,',
    '기존 설비와 데이터를 활용한 실행 가능한 시스템 설계와 PoC를 제공합니다.',
  ],
  /** 검증된 사실만 사용한다. 연차·프로젝트 수·고객사 로고는 근거 확인 전까지 표시하지 않는다. */
  trustStrip: [
    'AI·AIoT·디지털트윈 기술 경험',
    '현장 진단부터 PoC까지',
    'Edge 기반 데이터 처리',
    '정부과제 기술기획 지원',
  ],
} as const;

/** 7.2 Section 02 — Problem Statement */
export const problemSection = {
  titleLines: ['AI 도입이 어려운 이유는 기술이 아니라', '문제와 범위가 정의되지 않았기 때문입니다.'],
  cards: [
    {
      title: '무엇부터 해야 할지 모릅니다',
      description:
        'AI, 센서, 로봇, 디지털트윈 중 우리 현장에 무엇이 필요한지 판단하기 어렵습니다.',
    },
    {
      title: '기존 설비와 연결이 걱정됩니다',
      description:
        '오래된 장비와 분리된 데이터를 새로운 시스템에 어떻게 연결할지 불확실합니다.',
    },
    {
      title: '비용과 성과를 예측하기 어렵습니다',
      description: '전체 구축비는 큰데 실제 효과와 성능을 미리 확인하기 어렵습니다.',
    },
    {
      title: '컨설팅과 개발이 분리되어 있습니다',
      description:
        '보고서와 실제 구현 사이의 간극 때문에 프로젝트가 지연되거나 방향을 잃습니다.',
    },
  ],
  closing: [
    'BTREE AX LAB은 큰 시스템을 먼저 판매하지 않습니다.',
    '현장을 진단하고, 구축 가능한 구조를 설계하고, 작은 실증으로 검증합니다.',
  ],
} as const;

/** 7.4 Section 04 — Process */
export const processSteps: ProcessStep[] = [
  {
    step: '01',
    labelEn: 'Diagnose',
    labelKo: '현장 진단',
    description: '업무, 설비, 데이터와 위험요인을 분석해 해결해야 할 문제를 정의합니다.',
  },
  {
    step: '02',
    labelEn: 'Design',
    labelKo: '시스템 설계',
    description: '요구사항, 아키텍처, 장비, 예산, 일정과 성능지표를 구체화합니다.',
  },
  {
    step: '03',
    labelEn: 'Validate',
    labelKo: 'PoC 실증',
    description: '작은 범위에서 핵심 기능을 구현하고 정확도와 운영 가능성을 검증합니다.',
  },
  {
    step: '04',
    labelEn: 'Scale',
    labelKo: '확장·운영',
    description: '검증 결과를 기반으로 본 구축, 고도화 또는 지속적인 기술자문을 진행합니다.',
  },
];

/** 7.6 Section 06 — Why BTREE */
export const differentiators = [
  {
    title: '현장을 먼저 봅니다',
    description: '기술을 정하기 전에 현재 업무와 설비, 실제 운영자의 문제를 확인합니다.',
  },
  {
    title: '구현 가능한 수준으로 설계합니다',
    description:
      '발표용 개념이 아니라 개발팀이 사용할 수 있는 요구사항과 아키텍처를 만듭니다.',
  },
  {
    title: 'Edge와 현장 제약을 고려합니다',
    description:
      '네트워크, 개인정보, 응답속도와 기존 설비를 고려해 Cloud와 Edge를 조합합니다.',
  },
  {
    title: '검증기준을 먼저 정합니다',
    description:
      '정확도, 지연시간, 탐지 범위 등 프로젝트 성공 기준을 설계 단계에서 합의합니다.',
  },
  {
    title: '다양한 기술을 통합합니다',
    description:
      'AI 모델, 카메라, 센서, 게이트웨이, 알림과 디지털트윈을 하나의 흐름으로 연결합니다.',
  },
  {
    title: '단계적으로 투자합니다',
    description: '진단과 PoC를 통해 위험을 확인한 뒤 본 구축 여부를 결정할 수 있습니다.',
  },
] as const;

/** 7.7 Section 07 — Architecture Visual */
export const architectureLayers = [
  {
    id: 'field',
    label: 'FIELD',
    labelKo: '현장',
    nodes: ['카메라', '센서', 'PLC', '로봇', '환경제어기'],
    description: '현장에 이미 설치된 장비와 신규 센서에서 원천 데이터를 확보합니다.',
  },
  {
    id: 'edge',
    label: 'EDGE',
    labelKo: '엣지',
    nodes: ['데이터 수집', 'AI 추론', '이벤트 판단', '로컬 저장'],
    description:
      '네트워크와 개인정보 제약을 고려해 현장 내부에서 추론과 1차 판단을 수행합니다.',
  },
  {
    id: 'platform',
    label: 'PLATFORM',
    labelKo: '플랫폼',
    nodes: ['통합 API', '데이터 저장', '규칙 엔진', '권한관리'],
    description: '여러 현장과 장비의 데이터를 하나의 규칙과 권한 체계로 통합합니다.',
  },
  {
    id: 'twin',
    label: 'DIGITAL TWIN',
    labelKo: '디지털트윈',
    nodes: ['현황 시각화', '이상 알림', '이력 분석', '운영 의사결정'],
    description: '운영자가 실제로 사용하는 화면과 알림으로 데이터를 의사결정에 연결합니다.',
  },
] as const;

export const architectureSection = {
  title: '현장 데이터가 의사결정으로 연결되는 구조',
  description: [
    '특정 플랫폼이나 장비를 먼저 강요하지 않습니다.',
    '고객의 기존 환경과 목표에 맞춰 필요한 기술 조합을 설계합니다.',
  ],
} as const;

/** 7.12 Section 12 — Final CTA */
export const finalCta = {
  eyebrow: 'START WITH DIAGNOSIS',
  headline: ['큰 시스템을 결정하기 전에', '현장의 가능성부터 확인하십시오.'],
  description: '현재 문제와 기존 설비를 알려주시면 가장 적합한 진단 방식과 다음 단계를 안내합니다.',
} as const;
