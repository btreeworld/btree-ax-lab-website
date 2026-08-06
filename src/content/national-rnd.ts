/**
 * 국가 R&D 참여이력 — 마스터 문서 12.4
 *
 * 표시 규칙
 *  - 요약은 NTIS 기준 9건(연차별 기록), 연구책임자 2건, 참여연구원 7건.
 *  - 상세 화면은 9개 연차기록을 5개 대표 프로그램으로 그룹화한다.
 *  - NTIS 참여율과 총연구비는 기본 사용자 화면에 표시하지 않는다.
 *  - 공식 역할과 참여기관 유형을 임의로 확대·변경하지 않는다.
 */
import type { NationalRndRecord } from '@/types';

export const rndSummary = {
  source: 'NTIS 국가R&D 참여과제 발급자료',
  issuedAt: '2025-07-14',
  annualParticipationRecords: 9,
  principalInvestigatorRecords: 2,
  researcherRecords: 7,
  uniqueProgramsDisplayed: 5,
  note: '동일 다년도 과제의 연차별 기록 포함',
} as const;

export const rndSummaryNote =
  'NTIS 발급자료(2025-07-14) 기준 참여기록 9건은 동일한 다년도 과제의 연차별 기록을 포함하며, 아래에서는 5개 대표 프로그램으로 그룹화해 표시합니다. 참여율과 과제 총연구비는 개인·회사 배정액으로 오해될 수 있어 표시하지 않습니다.';

export const nationalRndRecords: NationalRndRecord[] = [
  {
    slug: 'aquaculture-aiot',
    period: '2023–2024',
    projectName: '순환여과식 수산양식 통합 AIoT 시스템 개발',
    organization: '주식회사 비트리',
    officialRole: '연구책임자',
    annualRecords: 2,
    field: ['스마트수산양식', 'AIoT', '환경 데이터 통합'],
    description:
      '순환여과식 양식 환경의 센서와 운영 데이터를 수집하고, AI 및 IoT 시스템과 연결하는 통합 시스템 연구개발.',
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
    description:
      '비임상시험의 종양 관련 연구에 활용되는 영상 인공지능과 로봇 자동분석 시스템 연구개발.',
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
    description:
      '비임상시험 과정에서 동물 혈관을 인식하고 로봇 자동채혈·제어로 연결하는 인공지능 연구.',
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
    description:
      'CCTV 영상 기반 객체 인식과 이벤트 관제를 통합한 지능형 보안관제 솔루션 연구개발.',
    responsibilities: [],
    outputs: [],
    evidenceLevel: 'B',
    disclosure: 'public',
    sourceId: 'S2',
    publishStatus: 'verify',
  },
];

/** 담당 세부기술·성과가 비어 있는 항목에 표시할 문구 (임의로 채우지 않는다) */
export const rndDetailPendingLabel = '담당 세부기술·성과는 협약서·결과보고서 확인 후 공개합니다.';

/**
 * 12.4 "추가 과제 공개 원칙"
 * 2025–2026 과제·사업은 NTIS 발급자료에 포함되지 않았으므로 국가 R&D 로 단정하지 않고
 * business-records.ts 의 프로젝트·연구개발 이력에 배치한다.
 */
export const additionalRndDisclosurePolicy =
  '2025년 7월 14일 이후의 과제·사업은 NTIS 발급자료에 포함되지 않아 국가 R&D로 표기하지 않고 프로젝트·연구개발 이력으로 분류합니다. 협약서 또는 최신 NTIS 자료가 확보되면 이동합니다.';
