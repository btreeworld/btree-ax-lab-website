/** 회사소개 — 마스터 문서 11장 */
import type { Locale } from '@/i18n/locales';

type AboutContent = {
  heroTitle: string[];
  intro: string[];
  mission: string;
  principles: string[];
  positioning: {
    title: string;
    rows: Array<{ type: string; limitation: string; difference: string }>;
  };
  valueProps: Array<{ title: string; description: string }>;
};

type AboutPageCopy = {
  brandRelationTitle: string;
  legalNameBadge: string;
  legalNameCaption: string;
  brandBadge: string;
  brandCaption: string;
  taglineBadge: string;
  missionEyebrow: string;
  workingPrinciplesLabel: string;
  positioningColumns: [string, string, string];
  positioningDescription: string;
  representativeEyebrow: string;
  expertiseLabel: string;
  viewTrackRecordCta: string;
  valuePropsEyebrow: string;
  valuePropsTitle: string;
};

export const aboutPageCopy: Record<Locale, AboutPageCopy> = {
  ko: {
    brandRelationTitle: '법인과 브랜드의 관계',
    legalNameBadge: '법적 회사명',
    legalNameCaption: '계약, 견적, 개인정보처리 등 법적 주체입니다.',
    brandBadge: '전문 서비스 브랜드',
    brandCaption: '산업 현장 AX·디지털트윈 서비스를 제공하는 브랜드입니다.',
    taglineBadge: '설명 문구',
    missionEyebrow: 'MISSION',
    workingPrinciplesLabel: 'Working Principles',
    positioningColumns: ['유형', '일반적 한계', 'BTREE AX LAB의 차이'],
    positioningDescription: '컨설팅 회사와 개발 회사 사이에서 어떤 역할을 하는지 명확히 구분합니다.',
    representativeEyebrow: 'REPRESENTATIVE',
    expertiseLabel: '전문분야',
    viewTrackRecordCta: '국가 R&D·프로젝트 수행이력 전체 보기',
    valuePropsEyebrow: 'WHY IT WORKS',
    valuePropsTitle: '다섯 가지 핵심 가치',
  },
  en: {
    brandRelationTitle: 'How the Company and Brand Relate',
    legalNameBadge: 'Legal Entity',
    legalNameCaption: 'The legal party for contracts, quotes, and data processing.',
    brandBadge: 'Specialist Service Brand',
    brandCaption: 'The brand delivering industrial AX and digital twin services.',
    taglineBadge: 'Tagline',
    missionEyebrow: 'MISSION',
    workingPrinciplesLabel: 'Working Principles',
    positioningColumns: ['Type', 'Common Limitation', 'The BTREE AX LAB Difference'],
    positioningDescription: 'A clear line between what a consulting firm and a development shop each do — and where we fit.',
    representativeEyebrow: 'REPRESENTATIVE',
    expertiseLabel: 'Areas of Expertise',
    viewTrackRecordCta: 'View Full National R&D & Project Track Record',
    valuePropsEyebrow: 'WHY IT WORKS',
    valuePropsTitle: 'Five Core Value Propositions',
  },
};

export const about: Record<Locale, AboutContent> = {
  ko: {
    heroTitle: ['현장의 복잡한 문제를', '실행 가능한 기술 구조로 바꿉니다'],
    intro: [
      '주식회사 비트리는 AI, AIoT, 디지털트윈, 로봇, 스마트팜과 영상관제 분야의 기술을 연구하고 개발해 온 기술기업입니다.',
      'BTREE AX LAB은 이러한 경험을 산업 현장의 진단, 시스템 설계와 실증 서비스로 구조화한 전문 브랜드입니다.',
    ],
    mission: '현장과 기술 사이의 간극을 줄여, 실패 위험이 낮고 검증 가능한 AX 도입을 만든다.',
    principles: [
      '문제를 기술보다 먼저 정의한다.',
      '기존 설비와 현실적인 제약을 존중한다.',
      '고객이 이해할 수 있는 구조로 설명한다.',
      '검증되지 않은 성능을 약속하지 않는다.',
      '작은 성공을 확인한 뒤 확장한다.',
      '고객의 데이터와 운영정보를 안전하게 다룬다.',
    ],
    positioning: {
      title: '컨설팅과 개발 사이에서 어떤 역할을 하는가',
      rows: [
        { type: '컨설팅 회사', limitation: '보고서에서 끝날 수 있음', difference: '실제 아키텍처·PoC까지 연결' },
        { type: '외주 개발사', limitation: '요구사항이 불명확하면 실패 위험', difference: '진단과 설계부터 시작' },
        { type: '장비 판매사', limitation: '특정 장비 판매 중심', difference: '현장 문제와 기존 설비 중심' },
        { type: '플랫폼 공급사', limitation: '자사 플랫폼에 고객을 맞춤', difference: '필요한 기술을 조합해 설계' },
        { type: '정부과제 대행사', limitation: '문서작성 중심', difference: '성능지표·실증·시스템 구조 중심' },
      ],
    },
    valueProps: [
      { title: '현장 중심', description: '기술보다 먼저 업무와 위험 요인을 분석합니다.' },
      { title: '단계적 투자', description: '진단과 소규모 실증으로 구축 실패 위험을 낮춥니다.' },
      { title: '통합 설계', description: 'AI, 카메라, 센서, Edge 장비, 플랫폼을 하나의 구조로 연결합니다.' },
      { title: '검증 가능성', description: '성능지표와 시험계획을 설계 단계부터 정의합니다.' },
      { title: '실행 연결', description: '보고서에 그치지 않고 개발·실증·운영까지 이어갑니다.' },
    ],
  },
  en: {
    heroTitle: ['We turn complex field problems', 'into buildable technical structures'],
    intro: [
      'BTREE Inc. is a technology company that has researched and developed AI, AIoT, digital twin, robotics, smart farm, and video monitoring technology.',
      'BTREE AX LAB is a specialist brand that structures that experience into industrial diagnosis, system design, and validation services.',
    ],
    mission: 'Close the gap between the field and technology to make AX adoption low-risk and verifiable.',
    principles: [
      'Define the problem before the technology.',
      'Respect existing equipment and real-world constraints.',
      'Explain in a structure customers can understand.',
      'Never promise unverified performance.',
      'Confirm small wins before scaling.',
      "Handle customer data and operations information securely.",
    ],
    positioning: {
      title: 'Where we sit between consulting and development',
      rows: [
        { type: 'Consulting firms', limitation: 'Can stop at a report', difference: 'We carry through to real architecture and PoC' },
        { type: 'Outsourced developers', limitation: 'Risk of failure when requirements are unclear', difference: 'We start with diagnosis and design' },
        { type: 'Equipment vendors', limitation: 'Focused on selling specific hardware', difference: 'Focused on the problem and existing equipment' },
        { type: 'Platform vendors', limitation: 'Fit the customer to their platform', difference: 'We design by combining the technologies needed' },
        { type: 'Government-program agencies', limitation: 'Focused on paperwork', difference: 'Focused on metrics, validation, and system structure' },
      ],
    },
    valueProps: [
      { title: 'Field-first', description: 'We analyze operations and risk factors before technology.' },
      { title: 'Staged investment', description: 'Diagnosis and small-scale PoC lower the risk of a failed build.' },
      { title: 'Integrated design', description: 'AI, cameras, sensors, edge devices, and platforms connected as one structure.' },
      { title: 'Verifiable', description: 'Performance metrics and test plans are defined from the design stage.' },
      { title: 'Carried through', description: "We don't stop at a report — we follow through to development, validation, and operations." },
    ],
  },
};
