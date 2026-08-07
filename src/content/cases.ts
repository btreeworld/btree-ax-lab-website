/**
 * 프로젝트 사례 — 마스터 문서 7.8
 *
 * ⚠️ 사례 사용 원칙
 *  - 실제 고객명과 수치를 확인하기 전에는 "프로젝트 경험 / 대표 수행 분야 / 적용 예시 / 익명 사례"로 표기한다.
 *  - "고객 성공사례" 표현은 고객 승인과 결과 데이터가 있을 때만 사용한다.
 *  - outcomes 가 검증되기 전까지 outcomeStatus는 'pending'을 유지하고 수치를 만들지 않는다.
 */
import type { Locale } from '@/i18n/locales';
import type { CaseStatus, CaseStudy } from '@/types';

export const caseStatusLabel: Record<Locale, Record<CaseStatus, string>> = {
  ko: {
    actual: '실제 구축',
    poc: 'PoC',
    design: '설계',
    research: '연구개발',
    example: '적용 예시',
  },
  en: {
    actual: 'Deployed',
    poc: 'PoC',
    design: 'Design',
    research: 'R&D',
    example: 'Example',
  },
};

export const cases: Record<Locale, CaseStudy[]> = {
  ko: [
    {
      slug: 'edge-ai-safety-control',
      title: 'Edge AI 기반 산업안전 통합관제 설계',
      status: 'design',
      industry: '산업안전·관제',
      problem: '다채널 CCTV를 사람이 지속적으로 감시하기 어렵습니다.',
      approach:
        '전 채널을 동시에 분석하는 대신 위험도가 높은 채널을 선택해 AI로 분석하고, 이벤트 발생 시에만 경보를 보내며 시스템 부하를 함께 모니터링하는 구조로 설계했습니다.',
      architecture: ['CCTV', 'Edge AI', '관제 UI', 'Telegram·음성 알림'],
      outcomeStatus: 'pending',
    },
    {
      slug: 'smart-farm-digital-twin',
      title: '스마트팜 환경 데이터 디지털트윈',
      status: 'design',
      industry: '스마트팜·농업',
      problem: '온습도·조도·관수 데이터가 분리되어 운영 판단이 어렵습니다.',
      approach:
        '공급사별로 흩어진 센서를 하나의 수집 계층으로 통합하고, 작물별 기준값을 설정해 이상알림과 시각화까지 연결했습니다.',
      architecture: ['센서', 'Gateway', '데이터 플랫폼', 'Dashboard'],
      outcomeStatus: 'pending',
    },
    {
      slug: 'national-rnd-ax-planning',
      title: '정부 R&D용 AX 시스템 기술기획',
      status: 'research',
      industry: '연구개발·정부과제',
      problem: '복합 기술을 평가 가능한 개발계획과 성능지표로 구조화해야 했습니다.',
      approach:
        '요구사항, 시스템 구조, 정량지표와 공인시험 계획을 함께 설계해 평가자가 검증할 수 있는 형태로 정리했습니다.',
      architecture: ['요구사항 정의', '시스템 구조', '정량 성능지표', '공인시험 계획'],
      outcomeStatus: 'not-disclosed',
    },
  ],
  en: [
    {
      slug: 'edge-ai-safety-control',
      title: 'Edge AI Industrial Safety Monitoring System — Design',
      status: 'design',
      industry: 'Industrial Safety & Monitoring',
      problem: 'Continuous human monitoring across many CCTV channels was not practical.',
      approach:
        'Instead of analyzing every channel at once, we selected the highest-risk channels for AI analysis, alerted only on real events, and monitored system load alongside detection.',
      architecture: ['CCTV', 'Edge AI', 'Monitoring UI', 'Telegram / voice alerts'],
      outcomeStatus: 'pending',
    },
    {
      slug: 'smart-farm-digital-twin',
      title: 'Smart Farm Environmental Data Digital Twin',
      status: 'design',
      industry: 'Smart Farm & Agriculture',
      problem: 'Temperature, humidity, light, and irrigation data were siloed, making operating decisions difficult.',
      approach:
        'We unified sensors scattered across suppliers into a single collection layer, set crop-specific thresholds, and connected anomaly alerts through to visualization.',
      architecture: ['Sensors', 'Gateway', 'Data platform', 'Dashboard'],
      outcomeStatus: 'pending',
    },
    {
      slug: 'national-rnd-ax-planning',
      title: 'Technical Planning for a Government R&D AX System',
      status: 'research',
      industry: 'R&D / Government Programs',
      problem: 'Complex technology needed to be structured into an evaluable development plan and performance metrics.',
      approach:
        'We designed requirements, system structure, quantitative metrics, and a certified test plan together so evaluators could verify the work directly.',
      architecture: ['Requirements definition', 'System structure', 'Quantitative metrics', 'Certified test plan'],
      outcomeStatus: 'not-disclosed',
    },
  ],
};

/** 결과 미검증 사례에 표시하는 문구 — 임의의 수치를 만들지 않는다. */
export const outcomePendingLabel: Record<Locale, string> = {
  ko: '검증된 결과 데이터 확보 후 공개 예정',
  en: 'To be published once verified results are available',
};
export const outcomeNotDisclosedLabel: Record<Locale, string> = {
  ko: '고객·기관 정책에 따라 비공개',
  en: 'Not disclosed per client/agency policy',
};

type CasesPageCopy = { heroEyebrow: string; heroTitle: string; heroDescription: string; listTitle: string; listDescription: string; secondNotice: string };

export const casesPageCopy: Record<Locale, CasesPageCopy> = {
  ko: {
    heroEyebrow: 'PROJECT EXPERIENCE',
    heroTitle: '기술이 아니라 문제 해결 과정으로 보여드립니다',
    heroDescription: '완성된 제품이 아니라, 문제를 어떻게 구조화하고 검증했는지를 기준으로 정리했습니다.',
    listTitle: '대표 수행 분야',
    listDescription: '상태 배지로 실제 구축, PoC, 설계, 연구개발, 적용 예시를 구분해 표시합니다.',
    secondNotice: '고객명, 로고, 성능 수치는 고객 승인과 증빙이 확보된 경우에만 공개합니다. 국방·보안 관련 프로젝트는 비보안 개요만 표시합니다.',
  },
  en: {
    heroEyebrow: 'PROJECT EXPERIENCE',
    heroTitle: 'We show the process of solving a problem, not just the technology',
    heroDescription: 'Organized around how the problem was structured and validated, not just the finished product.',
    listTitle: 'Representative Work',
    listDescription: 'Status badges distinguish deployed work, PoC, design, R&D, and illustrative examples.',
    secondNotice: 'Client names, logos, and performance figures are disclosed only with client approval and supporting evidence. Defense/security projects show non-sensitive overviews only.',
  },
};

export const casesNotice: Record<Locale, string> = {
  ko: '아래 항목은 고객명과 성과 수치가 확인되기 전까지 "대표 수행 분야"로 표기합니다. 검증된 결과만 공개합니다.',
  en: 'Until client names and result figures are confirmed, these are labeled as representative work areas. Only verified results are published.',
};
