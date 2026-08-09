/**
 * 홈 페이지 카피 — 마스터 문서 7장 "홈 페이지 상세 명세"
 * 섹션 순서: Hero → Problem → Services → Process → Industries → Why → Architecture
 *            → Cases → Pricing → Representative → FAQ → Final CTA
 */
import type { Locale } from '@/i18n/locales';
import type { ProcessStep } from '@/types';

type HeroContent = {
  eyebrow: string;
  headline: string[];
  description: string[];
  trustStrip: string[];
  /** 홈 3D 월드 BOOT 스테이지의 스크롤 유도 문구 — 섹션형 폴백에서는 쓰지 않는다. */
  scrollPrompt: string;
};

/** 7.1 Section 01 — Hero */
export const hero: Record<Locale, HeroContent> = {
  ko: {
    eyebrow: 'INDUSTRIAL AI · EDGE AI · DIGITAL TWIN',
    headline: ['산업 현장의 문제를', 'AI와 디지털트윈으로 설계하고 검증합니다.'],
    description: [
      '제조·산업안전·스마트팜·시설 운영 현장을 진단하고,',
      '기존 설비와 데이터를 활용한 실행 가능한 시스템 설계와 PoC를 제공합니다.',
    ],
    trustStrip: [
      'AI·AIoT·디지털트윈 기술 경험',
      '현장 진단부터 PoC까지',
      'Edge 기반 데이터 처리',
      '정부과제 기술기획 지원',
    ],
    scrollPrompt: '스크롤하여 현장으로 들어갑니다.',
  },
  en: {
    eyebrow: 'INDUSTRIAL AI · EDGE AI · DIGITAL TWIN',
    headline: ['We design and validate', 'industrial problems with AI and digital twins.'],
    description: [
      'We diagnose manufacturing, industrial safety, smart farm, and facility operations,',
      'then deliver buildable system designs and PoCs that use your existing equipment and data.',
    ],
    trustStrip: [
      'AI, AIoT & digital twin experience',
      'From field diagnosis to PoC',
      'Edge-based data processing',
      'Government R&D planning support',
    ],
    scrollPrompt: 'Scroll to enter the field.',
  },
};

type ProblemContent = {
  titleLines: [string, string];
  cards: Array<{ title: string; description: string }>;
  closing: string[];
};

/** 7.2 Section 02 — Problem Statement */
export const problemSection: Record<Locale, ProblemContent> = {
  ko: {
    titleLines: ['AI 도입이 어려운 이유는 기술이 아니라', '문제와 범위가 정의되지 않았기 때문입니다.'],
    cards: [
      {
        title: '무엇부터 해야 할지 모릅니다',
        description: 'AI·센서·로봇 중 우리 현장에 무엇이 필요한지 판단하기 어렵습니다.',
      },
      {
        title: '기존 설비와 연결이 걱정됩니다',
        description: '오래된 장비와 분리된 데이터를 어떻게 연결할지 불확실합니다.',
      },
      {
        title: '비용과 성과를 예측하기 어렵습니다',
        description: '구축비는 큰데 실제 효과를 미리 확인하기 어렵습니다.',
      },
      {
        title: '컨설팅과 개발이 분리되어 있습니다',
        description: '보고서와 실제 구현 사이의 간극으로 프로젝트가 지연됩니다.',
      },
    ],
    closing: [
      'BTREE AX LAB은 큰 시스템을 먼저 판매하지 않습니다.',
      '현장을 진단하고, 구축 가능한 구조를 설계하고, 작은 실증으로 검증합니다.',
    ],
  },
  en: {
    titleLines: [
      "AI adoption is hard not because of technology,",
      'but because the problem and scope were never defined.',
    ],
    cards: [
      {
        title: 'Where do we even start?',
        description: "Hard to judge whether AI, sensors, or robotics fit your site.",
      },
      {
        title: 'Will it connect to existing equipment?',
        description: "Unclear how to connect aging, siloed equipment to a new system.",
      },
      {
        title: 'Cost and outcomes are hard to predict',
        description: 'Builds are expensive and the real impact is hard to confirm early.',
      },
      {
        title: 'Consulting and development are disconnected',
        description: 'The report-to-build gap delays projects and derails direction.',
      },
    ],
    closing: [
      "BTREE AX LAB doesn't sell large systems first.",
      'We diagnose the site, design a buildable structure, and validate it with a small PoC.',
    ],
  },
};

/** 7.4 Section 04 — Process */
export const processSteps: Record<Locale, ProcessStep[]> = {
  ko: [
    {
      step: '01',
      labelEn: 'DIAGNOSE',
      label: '현장 진단',
      description: '업무, 설비, 데이터와 위험요인을 분석해 해결해야 할 문제를 정의합니다.',
    },
    {
      step: '02',
      labelEn: 'DESIGN',
      label: '시스템 설계',
      description: '요구사항, 아키텍처, 장비, 예산, 일정과 성능지표를 구체화합니다.',
    },
    {
      step: '03',
      labelEn: 'VALIDATE',
      label: 'PoC 실증',
      description: '작은 범위에서 핵심 기능을 구현하고 정확도와 운영 가능성을 검증합니다.',
    },
    {
      step: '04',
      labelEn: 'SCALE',
      label: '확장·운영',
      description: '검증 결과를 기반으로 본 구축, 고도화 또는 지속적인 기술자문을 진행합니다.',
    },
  ],
  en: [
    {
      step: '01',
      labelEn: 'DIAGNOSE',
      label: 'Diagnose',
      description: 'We analyze operations, equipment, data, and risk factors to define the problem to solve.',
    },
    {
      step: '02',
      labelEn: 'DESIGN',
      label: 'Design',
      description: 'We detail requirements, architecture, equipment, budget, schedule, and performance metrics.',
    },
    {
      step: '03',
      labelEn: 'VALIDATE',
      label: 'Validate',
      description: 'We build core functions at small scale and validate accuracy and operational feasibility.',
    },
    {
      step: '04',
      labelEn: 'SCALE',
      label: 'Scale',
      description: 'Based on validated results, we move to full build-out, expansion, or ongoing advisory.',
    },
  ],
};

type Differentiator = { title: string; description: string };

/**
 * 7.6 Section 06 — Why BTREE
 * 원래 6개 중 AI·Edge·디지털트윈 기술 역량이 가장 잘 드러나는 3개만 홈에 노출한다
 * (사용자 피드백: 기술적 장점이 텍스트에 묻혀 드러나지 않음 — 3D 아키텍처 씬이 나머지를 시연으로 대체).
 */
export const differentiators: Record<Locale, Differentiator[]> = {
  ko: [
    {
      title: '구현 가능한 수준으로 설계합니다',
      description: '발표용 개념이 아니라 개발팀이 사용할 수 있는 요구사항과 아키텍처를 만듭니다.',
    },
    {
      title: 'Edge와 현장 제약을 고려합니다',
      description: '네트워크, 개인정보, 응답속도와 기존 설비를 고려해 Cloud와 Edge를 조합합니다.',
    },
    {
      title: '다양한 기술을 통합합니다',
      description: 'AI 모델, 카메라, 센서, 게이트웨이, 알림과 디지털트윈을 하나의 흐름으로 연결합니다.',
    },
  ],
  en: [
    {
      title: 'We design at an implementable level',
      description: 'Not slideware — requirements and architecture your development team can actually use.',
    },
    {
      title: 'We account for Edge and site constraints',
      description: 'We combine Cloud and Edge based on network, privacy, latency, and existing equipment.',
    },
    {
      title: 'We integrate diverse technologies',
      description: 'AI models, cameras, sensors, gateways, alerts, and digital twins connected into one flow.',
    },
  ],
};

export type ArchitectureLayer = {
  id: string;
  /** 항상 대문자 영단어 — 두 언어 화면에서 동일하게 노출된다 (예: FIELD). */
  label: string;
  /** 현재 locale로 번역된 부제 (예: '현장' / 'Field'). */
  sublabel: string;
  nodes: string[];
  description: string;
};

/** 7.7 Section 07 — Architecture Visual */
export const architectureLayers: Record<Locale, ArchitectureLayer[]> = {
  ko: [
    {
      id: 'field',
      label: 'FIELD',
      sublabel: '현장',
      nodes: ['카메라', '센서', 'PLC', '로봇', '환경제어기'],
      description: '현장에 이미 설치된 장비와 신규 센서에서 원천 데이터를 확보합니다.',
    },
    {
      id: 'edge',
      label: 'EDGE',
      sublabel: '엣지',
      nodes: ['데이터 수집', 'AI 추론', '이벤트 판단', '로컬 저장'],
      description: '네트워크와 개인정보 제약을 고려해 현장 내부에서 추론과 1차 판단을 수행합니다.',
    },
    {
      id: 'platform',
      label: 'PLATFORM',
      sublabel: '플랫폼',
      nodes: ['통합 API', '데이터 저장', '규칙 엔진', '권한관리'],
      description: '여러 현장과 장비의 데이터를 하나의 규칙과 권한 체계로 통합합니다.',
    },
    {
      id: 'twin',
      label: 'DIGITAL TWIN',
      sublabel: '디지털트윈',
      nodes: ['현황 시각화', '이상 알림', '이력 분석', '운영 의사결정'],
      description: '운영자가 실제로 사용하는 화면과 알림으로 데이터를 의사결정에 연결합니다.',
    },
  ],
  en: [
    {
      id: 'field',
      label: 'FIELD',
      sublabel: 'Field',
      nodes: ['Cameras', 'Sensors', 'PLCs', 'Robots', 'Environment controllers'],
      description: 'Raw data is captured from equipment already on site plus any new sensors added.',
    },
    {
      id: 'edge',
      label: 'EDGE',
      sublabel: 'Edge',
      nodes: ['Data collection', 'AI inference', 'Event judgment', 'Local storage'],
      description: 'Inference and first-pass judgment happen on site, respecting network and privacy constraints.',
    },
    {
      id: 'platform',
      label: 'PLATFORM',
      sublabel: 'Platform',
      nodes: ['Unified API', 'Data storage', 'Rules engine', 'Access control'],
      description: 'Data from multiple sites and devices is unified under one rules and permissions layer.',
    },
    {
      id: 'twin',
      label: 'DIGITAL TWIN',
      sublabel: 'Digital Twin',
      nodes: ['Status visualization', 'Anomaly alerts', 'History analysis', 'Operational decisions'],
      description: 'Data reaches decision-making through the screens and alerts operators actually use.',
    },
  ],
};

type ArchitectureSectionContent = { title: string; description: string[] };

export const architectureSection: Record<Locale, ArchitectureSectionContent> = {
  ko: {
    title: '현장 데이터가 의사결정으로 연결되는 구조',
    description: ['드래그로 회전하고 스크롤해 직접 확인해 보십시오.'],
  },
  en: {
    title: 'A structure that connects field data to decisions',
    description: ['Drag to rotate, scroll to move through it.'],
  },
};

type SectionCopy = { eyebrow?: string; title: string; description?: string };

/** 홈 페이지 전용 섹션 컴포넌트(Services/Process/Industries/Why/Cases/FAQ)의 헤더 카피 */
export const homeSectionCopy: Record<
  Locale,
  {
    services: SectionCopy & { comparisonLink: string };
    process: SectionCopy;
    industries: SectionCopy;
    why: SectionCopy;
    cases: SectionCopy;
    faq: SectionCopy;
  }
> = {
  ko: {
    services: {
      eyebrow: 'SERVICES',
      title: '현장 진단부터 실증과 운영까지',
      description: '필요한 단계만 선택하고, 검증된 결과로 다음 단계를 확장하십시오.',
      comparisonLink: '전체 서비스 비교표 보기',
    },
    process: {
      eyebrow: 'PROCESS',
      title: '불확실성을 줄이는 4단계',
      description: '각 단계는 독립적으로 계약할 수 있고, 이전 단계의 결과를 근거로 다음 단계를 결정합니다.',
    },
    industries: {
      eyebrow: 'INDUSTRIES',
      title: '기술이 아니라 현장의 운영방식에 맞춥니다',
      description: '같은 기술도 현장 운영방식과 설비에 따라 필요한 구성이 달라집니다.',
    },
    why: {
      eyebrow: 'WHY BTREE AX LAB',
      title: '보고서와 개발 사이를 연결합니다',
      description: '컨설팅 보고서에서 멈추지도, 요구사항 없이 개발부터 시작하지도 않습니다.',
    },
    cases: {
      eyebrow: 'PROJECT EXPERIENCE',
      title: '기술이 아니라 문제 해결 과정으로 보여드립니다',
      description: '완성된 제품이 아니라 문제를 해결한 과정을 기준으로 정리했습니다.',
    },
    faq: {
      eyebrow: 'FAQ',
      title: '자주 묻는 질문',
      description: '상담 전에 가장 많이 받는 질문을 정리했습니다.',
    },
  },
  en: {
    services: {
      eyebrow: 'SERVICES',
      title: 'From field diagnosis to validation and operations',
      description: 'Choose only the stage you need, and expand based on verified results.',
      comparisonLink: 'View the Full Service Comparison',
    },
    process: {
      eyebrow: 'PROCESS',
      title: 'Four stages that reduce uncertainty',
      description: 'Each stage can be contracted independently, and the next stage is decided based on the previous one\'s results.',
    },
    industries: {
      eyebrow: 'INDUSTRIES',
      title: "We fit the site's way of operating, not the other way around",
      description: 'The same technology needs a different setup depending on operations and equipment.',
    },
    why: {
      eyebrow: 'WHY BTREE AX LAB',
      title: 'We connect the report to the build',
      description: "We don't stop at a consulting report, and we don't start development without requirements.",
    },
    cases: {
      eyebrow: 'PROJECT EXPERIENCE',
      title: 'We show the process of solving a problem, not just the technology',
      description: 'Organized around how each problem was solved, not the finished product.',
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Frequently Asked Questions',
      description: "The questions we hear most often before a consultation.",
    },
  },
};

type FinalCtaContent = { eyebrow: string; headline: string[]; description: string };

/** 7.12 Section 12 — Final CTA */
export const finalCta: Record<Locale, FinalCtaContent> = {
  ko: {
    eyebrow: 'START WITH DIAGNOSIS',
    headline: ['큰 시스템을 결정하기 전에', '현장의 가능성부터 확인하십시오.'],
    description: '현재 문제와 기존 설비를 알려주시면 가장 적합한 진단 방식과 다음 단계를 안내합니다.',
  },
  en: {
    eyebrow: 'START WITH DIAGNOSIS',
    headline: ['Before committing to a large system,', 'confirm what your site can actually do.'],
    description: 'Tell us your current problem and existing equipment, and we’ll recommend the right diagnosis path and next steps.',
  },
};
