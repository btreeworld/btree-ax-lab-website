/**
 * 국가 R&D 참여이력 — 마스터 문서 12.4
 *
 * 표시 규칙
 *  - 요약은 NTIS 기준 9건(연차별 기록), 연구책임자 2건, 참여연구원 7건.
 *  - 상세 화면은 9개 연차기록을 5개 대표 프로그램으로 그룹화한다.
 *  - NTIS 참여율과 총연구비는 기본 사용자 화면에 표시하지 않는다.
 *  - 공식 역할과 참여기관 유형을 임의로 확대·변경하지 않는다.
 */
import type { Locale } from '@/i18n/locales';
import type { NationalRndRecord } from '@/types';

export const rndSummary = {
  source: { ko: 'NTIS 국가R&D 참여과제 발급자료', en: 'NTIS National R&D Participation Record' } satisfies Record<Locale, string>,
  issuedAt: '2025-07-14',
  annualParticipationRecords: 9,
  principalInvestigatorRecords: 2,
  researcherRecords: 7,
  uniqueProgramsDisplayed: 5,
} as const;

export const rndSummaryNote: Record<Locale, string> = {
  ko: 'NTIS 발급자료(2025-07-14) 기준 참여기록 9건은 동일한 다년도 과제의 연차별 기록을 포함하며, 아래에서는 5개 대표 프로그램으로 그룹화해 표시합니다. 참여율과 과제 총연구비는 개인·회사 배정액으로 오해될 수 있어 표시하지 않습니다.',
  en: 'The 9 participation records in the NTIS document (issued 2025-07-14) include per-year records of the same multi-year programs, grouped below into 5 representative programs. Participation rate and total program budget are omitted, as they could be misread as an individual or company allocation.',
};

export const nationalRndRecords: Record<Locale, NationalRndRecord[]> = {
  ko: [
    {
      slug: 'aquaculture-aiot',
      period: '2023–2024',
      projectName: '순환여과식 수산양식 통합 AIoT 시스템 개발',
      organization: '주식회사 비트리',
      officialRole: '연구책임자',
      annualRecords: 2,
      field: ['스마트수산양식', 'AIoT', '환경 데이터 통합'],
      description: '순환여과식 양식 환경의 센서와 운영 데이터를 수집하고, AI 및 IoT 시스템과 연결하는 통합 시스템 연구개발.',
      responsibilities: [],
      outputs: [],
      evidenceLevel: 'B',
      disclosure: 'public',
      sourceId: 'S2',
      publishStatus: 'verify',
    },
    {
      slug: 'tumor-robot-analysis',
      period: '2024',
      projectName: '인공지능기반 종양 사이즈 인식 및 로봇 자동 분석 시스템 개발',
      organization: '주식회사 비트리',
      officialRole: '참여연구원',
      annualRecords: 1,
      field: ['컴퓨터비전', '바이오 로봇', '자동 분석'],
      description: '비임상시험의 종양 관련 연구에 활용되는 영상 인공지능과 로봇 자동분석 시스템 연구개발.',
      responsibilities: [],
      outputs: [],
      evidenceLevel: 'B',
      disclosure: 'public',
      sourceId: 'S2',
      publishStatus: 'verify',
    },
    {
      slug: 'animal-test-automation',
      period: '2021–2023',
      projectName: 'AI기반 동물실험 자동화 솔루션 개발',
      organization: '주식회사 비트리',
      officialRole: '참여연구원',
      annualRecords: 3,
      field: ['컴퓨터비전', '혈관 인식', '바이오 로봇 제어'],
      description: '비임상시험 과정에서 동물 혈관을 인식하고 로봇 자동채혈·제어로 연결하는 인공지능 연구.',
      responsibilities: [],
      outputs: [],
      evidenceLevel: 'B',
      disclosure: 'public',
      sourceId: 'S2',
      publishStatus: 'verify',
    },
    {
      slug: 'parallel-video-security',
      period: '2015–2017',
      projectName: '고속병렬처리기반 다기능 영상보안솔루션 구축',
      organization: '주식회사 고백기술',
      officialRole: '참여연구원',
      annualRecords: 2,
      field: ['영상보안', '고속병렬처리', '영상분석'],
      description: '다기능 영상보안 분석을 위한 고속병렬처리 기반 솔루션 연구개발.',
      responsibilities: [],
      outputs: [],
      evidenceLevel: 'B',
      disclosure: 'public',
      sourceId: 'S2',
      publishStatus: 'verify',
    },
    {
      slug: 'sara-integrated-cctv',
      period: '2012–2013',
      projectName: '지능형통합영상관제솔루션(SARA) 개발',
      organization: '주식회사 고백기술',
      officialRole: '참여연구원',
      annualRecords: 1,
      field: ['지능형 CCTV', '통합관제', '영상분석'],
      description: 'CCTV 영상 기반 객체 인식과 이벤트 관제를 통합한 지능형 보안관제 솔루션 연구개발.',
      responsibilities: [],
      outputs: [],
      evidenceLevel: 'B',
      disclosure: 'public',
      sourceId: 'S2',
      publishStatus: 'verify',
    },
  ],
  en: [
    {
      slug: 'aquaculture-aiot',
      period: '2023–2024',
      projectName: 'Integrated AIoT System for Recirculating Aquaculture',
      organization: 'BTREE Inc.',
      officialRole: '연구책임자',
      annualRecords: 2,
      field: ['Smart Aquaculture', 'AIoT', 'Environmental Data Integration'],
      description: 'R&D on an integrated system that collects sensor and operational data from recirculating aquaculture environments and connects it to AI and IoT systems.',
      responsibilities: [],
      outputs: [],
      evidenceLevel: 'B',
      disclosure: 'public',
      sourceId: 'S2',
      publishStatus: 'verify',
    },
    {
      slug: 'tumor-robot-analysis',
      period: '2024',
      projectName: 'AI-based Tumor Size Recognition and Robotic Auto-Analysis System',
      organization: 'BTREE Inc.',
      officialRole: '참여연구원',
      annualRecords: 1,
      field: ['Computer Vision', 'Bio-robotics', 'Automated Analysis'],
      description: 'R&D on visual AI and robotic auto-analysis systems used in preclinical tumor research.',
      responsibilities: [],
      outputs: [],
      evidenceLevel: 'B',
      disclosure: 'public',
      sourceId: 'S2',
      publishStatus: 'verify',
    },
    {
      slug: 'animal-test-automation',
      period: '2021–2023',
      projectName: 'AI-based Animal Testing Automation Solution',
      organization: 'BTREE Inc.',
      officialRole: '참여연구원',
      annualRecords: 3,
      field: ['Computer Vision', 'Vessel Recognition', 'Bio-robotic Control'],
      description: 'AI research to recognize animal blood vessels during preclinical trials and connect that to robotic automated blood-draw and control.',
      responsibilities: [],
      outputs: [],
      evidenceLevel: 'B',
      disclosure: 'public',
      sourceId: 'S2',
      publishStatus: 'verify',
    },
    {
      slug: 'parallel-video-security',
      period: '2015–2017',
      projectName: 'Multi-function Video Security Solution Based on High-speed Parallel Processing',
      organization: 'Gobaek Technology Co., Ltd.',
      officialRole: '참여연구원',
      annualRecords: 2,
      field: ['Video Security', 'High-speed Parallel Processing', 'Video Analysis'],
      description: 'R&D on a high-speed parallel processing solution for multi-function video security analysis.',
      responsibilities: [],
      outputs: [],
      evidenceLevel: 'B',
      disclosure: 'public',
      sourceId: 'S2',
      publishStatus: 'verify',
    },
    {
      slug: 'sara-integrated-cctv',
      period: '2012–2013',
      projectName: 'Intelligent Integrated Video Monitoring Solution (SARA)',
      organization: 'Gobaek Technology Co., Ltd.',
      officialRole: '참여연구원',
      annualRecords: 1,
      field: ['Intelligent CCTV', 'Integrated Monitoring', 'Video Analysis'],
      description: 'R&D on an intelligent security monitoring solution integrating CCTV-based object recognition and event control.',
      responsibilities: [],
      outputs: [],
      evidenceLevel: 'B',
      disclosure: 'public',
      sourceId: 'S2',
      publishStatus: 'verify',
    },
  ],
};

/** officialRole 표시용 라벨 (원본 데이터는 한국어 공식 역할값을 그대로 유지) */
export const officialRoleLabel: Record<Locale, Record<'연구책임자' | '참여연구원', string>> = {
  ko: { 연구책임자: '연구책임자', 참여연구원: '참여연구원' },
  en: { 연구책임자: 'Principal Investigator', 참여연구원: 'Research Participant' },
};

/** 담당 세부기술·성과가 비어 있는 항목에 표시할 문구 (임의로 채우지 않는다) */
export const rndDetailPendingLabel: Record<Locale, string> = {
  ko: '담당 세부기술·성과는 협약서·결과보고서 확인 후 공개합니다.',
  en: 'Detailed responsibilities and outcomes will be published after confirmation against the agreement and result report.',
};

/**
 * 12.4 "추가 과제 공개 원칙"
 * 2025–2026 과제·사업은 NTIS 발급자료에 포함되지 않았으므로 국가 R&D로 단정하지 않고
 * business-records.ts의 프로젝트·연구개발 이력에 배치한다.
 */
export const additionalRndDisclosurePolicy: Record<Locale, string> = {
  ko: '2025년 7월 14일 이후의 과제·사업은 NTIS 발급자료에 포함되지 않아 국가 R&D로 표기하지 않고 프로젝트·연구개발 이력으로 분류합니다. 협약서 또는 최신 NTIS 자료가 확보되면 이동합니다.',
  en: 'Programs after July 14, 2025 are not covered by the NTIS record, so they are not labeled national R&D and are classified under project/R&D history instead. They will move here once an agreement or an updated NTIS record is available.',
};
