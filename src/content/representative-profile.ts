/**
 * 대표 프로필 — 마스터 문서 7.10 / 12.3 / 12.11
 *
 * ⚠️ 공개 금지 정보 (마스터 문서 0.1 / 12.12)
 *    생년월일, 나이, 개인 휴대전화는 이 데이터에 포함하지 않는다.
 * ⚠️ 확정 필요
 *    - 건양대학교 박사과정 학적 상태(재학·수료·졸업)는 학적증명서로 확정한다.
 *    - 대표 사진은 고해상도 원본 확보 전까지 placeholder 를 유지한다. AI 생성 인물로 대체하지 않는다.
 */

export const representative = {
  name: '백성은',
  title: '주식회사 비트리 대표이사',
  role: 'AX Architect / AI·Digital Twin R&D Lead',
  field: 'ICT 융복합',
  contactPolicy: '회사 대표 이메일 사용',

  photo: {
    src: '/images/baek-seongeun-profile.webp',
    alt: '주식회사 비트리 백성은 대표이사',
    status: 'placeholder' as const,
    note: '고해상도 원본 프로필 사진 확보 후 교체 필요 (마스터 문서 11.6)',
  },

  /** 7.10 — 홈페이지용 확정 초안 */
  homeIntro:
    '2005년 영상처리·인공지능 연구를 시작해 지능형 영상보안, 스마트시티·IoT 관제, 디지털트윈, 스마트팜, 바이오 로봇과 의료 AI 분야의 기술개발을 수행해 왔습니다. 국립군산대학교에서 컴퓨터정보공학 학사와 영상처리·인공지능 석사를 취득했으며, 건양대학교 의료인공지능 박사과정을 이수하고 있습니다. 현장의 카메라·센서·설비 데이터를 Edge AI와 디지털트윈 운영화면으로 연결하는 통합 아키텍처를 직접 설계합니다.',

  /**
   * 학적 상태 확정 후 homeIntro 의 마지막 학력 문장을 아래 중 하나로 교체한다.
   * (마스터 문서 7.10 "학적 상태에 따른 마지막 문장 교체")
   */
  academicStatusOptions: [
    '건양대학교 의료인공지능 박사과정에 재학 중입니다.',
    '건양대학교 의료인공지능 박사과정을 수료했습니다.',
    '건양대학교 의료인공지능 박사학위를 취득했습니다.',
  ],

  /** 12.3 — 상세 페이지용 소개 */
  detailIntro:
    '백성은 대표는 영상처리·인공지능을 기반으로 지능형 영상보안, 스마트시티 관제, IoT·AIoT, 디지털트윈, 스마트팜과 로봇 자동화 시스템을 연구하고 개발해 온 기술사업가입니다. 2005년 자연어처리 응용 연구를 시작으로 영상 검색·인식, 저전력 무선 영상센서, 객체추적, 지능형 통합관제와 클라우드 영상분석 시스템을 개발했습니다. 이후 스마트시티 시각화, 농촌 디지털트윈, 스마트수산양식 AIoT, 바이오 로봇과 의료영상 AI 연구로 기술영역을 확장했습니다. 현재 BTREE AX LAB에서 현장 진단, 시스템 아키텍처, PoC 실증과 국가 R&D 기술기획을 직접 수행합니다.',

  sectionTitle: ['20년간 축적한 영상처리·AI 연구를', '산업 현장의 실행 가능한 시스템으로'],

  /** 7.10 Trust Metrics — 검증된 지표만 표시한다. */
  trustMetrics: [
    { value: '2005–', label: '영상처리·AI 연구개발' },
    { value: '9건', label: 'NTIS 국가R&D 참여기록' },
    { value: '2건', label: '국가R&D 연구책임자 기록' },
    { value: '2007–2026', label: '산업·공공 IT 프로젝트 이력' },
  ],

  trustMetricsNote:
    '국가R&D 참여기록은 2025년 7월 14일 발급 NTIS 자료 기준이며, 동일 과제의 연차별 기록을 포함합니다.',

  /** 홈에서는 4~5개만 노출한다 (마스터 문서 7.10 "검증된 핵심 이력"). */
  homeHighlights: [
    '국립군산대학교 영상처리·인공지능 석사',
    '주식회사 비트리 대표이사, AI·디지털트윈 소프트웨어 개발',
    '농촌 디지털트윈 플랫폼 개발 및 3차원 데이터 구축 PM',
    '스마트수산양식 통합 AIoT 국가R&D 연구책임자',
    'AI 기반 동물실험·종양분석 로봇 연구개발 참여',
  ],

  allHighlights: [
    '국립군산대학교 영상처리·인공지능 석사',
    '주식회사 비트리 대표이사, AI·디지털트윈 소프트웨어 개발',
    '농촌 디지털트윈 플랫폼 개발 및 3차원 데이터 구축 PM',
    '스마트수산양식 통합 AIoT 국가R&D 연구책임자',
    'AI 기반 동물실험·종양분석 로봇 연구개발 참여',
    '스마트시티·지능형 영상보안·통합관제 시스템 개발',
    '스마트팜·바이오 로봇·AI 기업 기술자문',
    '대학 AI·정보보안·Unreal Engine·스마트팜 교육',
  ],

  expertiseTags: [
    'Industrial AI',
    'Edge AI',
    'Digital Twin',
    'AIoT',
    'Computer Vision',
    'Smart Farm',
    'Robotics',
    'Technology Planning',
  ],

  education: [
    {
      period: '2023.03–현재',
      institution: '건양대학교',
      major: '의료인공지능',
      status: '박사과정',
      statusNote: '학적 상태(재학·수료·졸업) 확정 필요',
    },
    {
      period: '2006.02–2009.08',
      institution: '국립군산대학교',
      major: '영상처리·인공지능',
      status: '석사',
      statusNote: undefined as string | undefined,
    },
    {
      period: '1999.03–2006.02',
      institution: '국립군산대학교',
      major: '컴퓨터정보공학',
      status: '학사',
      statusNote: undefined as string | undefined,
    },
  ],

  career: [
    {
      period: '2019.10–현재',
      organization: '주식회사 비트리',
      position: '대표이사',
      detail: '소프트웨어 개발, 디지털트윈, AI',
    },
    {
      period: '2021.09–2024.12',
      organization: '주식회사 플라스바이오',
      position: '기술자문·기술이사',
      detail: '인공지능 소프트웨어 개발 자문',
    },
    {
      period: '2017.11–현재',
      organization: '도킹텍프로젝트협동조합',
      position: '상임이사',
      detail: '영상·미디어 콘텐츠 개발 및 제작',
    },
    {
      period: '2022.10–2023.12',
      organization: '주식회사 액티부키',
      position: '디지털트윈 PM',
      detail: '농촌 디지털트윈 사업 총괄',
    },
    {
      period: '2010.04–2019.12',
      organization: '주식회사 고백기술',
      position: '융복합연구소 기술이사',
      detail: '머신러닝 연구, 소프트웨어 개발',
    },
  ],

  coreSkills: {
    it: [
      '영상보안시스템·정보보안·통합관제',
      '스마트시티 플랫폼·디지털트윈',
      'IoT·AIoT 통합',
      '스마트팜·스마트수산양식',
      '머신러닝·컴퓨터비전 응용',
      '데이터 분석',
      '로봇 소프트웨어·자동화',
    ],
    content: [
      '융복합 미디어 콘텐츠 기획·연출·제작',
      '미디어파사드·홀로그램·디지털사이니지',
      'VR360·Unreal Engine',
      '공간 사전 시각화·Virtual Production',
    ],
  },

  /** 12.10 대표 기술 진화 타임라인 */
  evolutionTimeline: [
    { period: '2005–2008', summary: 'NLP · 영상 검색 · 영상인식 · 무선 영상센서' },
    { period: '2009–2017', summary: 'CCTV 객체추적 · 지능형 통합관제 · 영상보안 · 클라우드 영상분석' },
    { period: '2018–2021', summary: '스마트시티 시각화 · IoT 통합관제 · 바이오 로봇 AI' },
    { period: '2022–2024', summary: '스마트수산양식 AIoT · 농촌 디지털트윈 · 로봇 자동분석' },
    { period: '2025–2026', summary: '의료영상 멀티모달 AI · 스마트팜 공간재생 · 통합관제 시뮬레이터' },
  ],

  evolutionClosing: [
    '기술 분야는 변화했지만 핵심은 일관됩니다.',
    '현장의 영상과 센서 데이터를 수집하고, 인공지능으로 판단하며, 운영자가 사용할 수 있는 시스템으로 시각화합니다.',
  ],

  /** 데이터에 절대 포함하지 않는 필드 — 마스터 문서 12.11 privateFields */
  privateFields: ['birthDate', 'age', 'mobilePhone'] as const,
} as const;
