/**
 * 대표 프로필 — 마스터 문서 7.10 / 12.3 / 12.11
 *
 * ⚠️ 공개 금지 정보 (마스터 문서 0.1 / 12.12)
 *    생년월일, 나이, 개인 휴대전화는 이 데이터에 포함하지 않는다.
 * ⚠️ 확정 필요
 *    - 건양대학교 박사과정 학적 상태(재학·수료·졸업)는 학적증명서로 확정한다. 확정 전까지는
 *      '박사과정' 표기를 유지한다 (마스터 문서 7.10 "학적 상태에 따른 마지막 문장 교체" 참조).
 */
import type { Locale } from '@/i18n/locales';

export const representativePhoto: { src: string; status: 'verified' | 'placeholder'; alt: Record<Locale, string> } = {
  src: '/images/baek-seongeun-profile.webp',
  status: 'verified',
  alt: { ko: '주식회사 비트리 백성은 대표이사', en: 'Baek Seongeun, CEO of BTREE Inc.' },
};

type EducationItem = { period: string; institution: string; major: string; status: string; statusNote?: string };
type CareerItem = { period: string; organization: string; position: string; detail: string };
type EvolutionItem = { period: string; summary: string };

type RepresentativeContent = {
  name: string;
  title: string;
  role: string;
  field: string;
  contactPolicy: string;
  homeIntro: string;
  academicStatusOptions: string[];
  detailIntro: string;
  sectionTitle: string[];
  trustMetrics: Array<{ value: string; label: string }>;
  trustMetricsNote: string;
  homeHighlights: string[];
  allHighlights: string[];
  expertiseTags: string[];
  education: EducationItem[];
  career: CareerItem[];
  coreSkills: { it: string[]; content: string[] };
  evolutionTimeline: EvolutionItem[];
  evolutionClosing: string[];
  viewTrackRecordCta: string;
  photoPlaceholderCaption: string;
};

type TrackRecordPageCopy = {
  heroEyebrow: string;
  heroTitle: string[];
  heroDescription: string;
  sectionNav: { profile: string; nationalRnd: string; projects: string; research: string; consulting: string; lectures: string };
  educationLabel: string;
  careerLabel: string;
  coreSkillsIt: string;
  coreSkillsContent: string;
  nationalRndEyebrow: string;
  nationalRndTitle: string;
  nationalRndSourceLine: (source: string, issuedAt: string) => string;
  nationalRndMetrics: { annual: string; pi: string; researcher: string; programs: string };
  projectsEyebrow: string;
  projectsTitle: string;
  projectsDescription: string;
  fullTimelineLabel: string;
  researchEyebrow: string;
  researchTitle: string;
  researchCoreLabel: string;
  researchFoundationLabel: string;
  evolutionTimelineLabel: string;
  consultingEyebrow: string;
  consultingTitle: string;
  lecturesEyebrow: string;
  lecturesTitle: string;
  mediaConvergenceAccordionLabel: string;
};

export const trackRecordPageCopy: Record<Locale, TrackRecordPageCopy> = {
  ko: {
    heroEyebrow: 'REPRESENTATIVE · NATIONAL R&D · PROJECT TRACK RECORD',
    heroTitle: ['연구에서 현장 구축까지', '직접 연결해 온 기술 이력'],
    heroDescription:
      '영상처리·인공지능 연구를 시작으로 지능형 영상보안, 스마트시티, AIoT, 디지털트윈, 스마트팜과 바이오 로봇 분야까지 확장해 온 백성은 대표의 수행 이력을 공개 가능한 범위에서 소개합니다.',
    sectionNav: { profile: '대표 프로필', nationalRnd: '국가 R&D', projects: '주요 프로젝트', research: '연구개발', consulting: '기술자문', lectures: '교육·강의' },
    educationLabel: '학력',
    careerLabel: '주요 경력',
    coreSkillsIt: '핵심 기술분야 — IT·AX',
    coreSkillsContent: '핵심 기술분야 — 콘텐츠·시각화',
    nationalRndEyebrow: 'NATIONAL R&D',
    nationalRndTitle: '국가 R&D 참여이력',
    nationalRndSourceLine: (source, issuedAt) => `${source} (발급일 ${issuedAt}) 기준입니다.`,
    nationalRndMetrics: { annual: '참여과제 기록(연차별)', pi: '연구책임자 기록', researcher: '참여연구원 기록', programs: '대표 프로그램(그룹화)' },
    projectsEyebrow: 'PROJECTS',
    projectsTitle: '주요 IT 프로젝트 및 사업이력',
    projectsDescription: '대표 프로젝트를 먼저 표시하고, 전체 이력은 아래 타임라인에서 확인할 수 있습니다.',
    fullTimelineLabel: '전체 타임라인',
    researchEyebrow: 'RESEARCH',
    researchTitle: '연구 수행 이력',
    researchCoreLabel: '핵심 연구 — 현재 사업과 직접 연결',
    researchFoundationLabel: '기초 연구 — 기술 기반',
    evolutionTimelineLabel: '기술 진화 타임라인',
    consultingEyebrow: 'ADVISORY',
    consultingTitle: '기술자문 이력',
    lecturesEyebrow: 'LECTURES',
    lecturesTitle: '강의·교육 이력',
    mediaConvergenceAccordionLabel: '콘텐츠 융합 및 시각화 이력',
  },
  en: {
    heroEyebrow: 'REPRESENTATIVE · NATIONAL R&D · PROJECT TRACK RECORD',
    heroTitle: ['From research to field deployment,', 'a technical history built by one hand'],
    heroDescription:
      'Starting with video processing and AI research, Baek Seongeun expanded into intelligent video security, smart cities, AIoT, digital twins, smart farms, and bio-robotics. His track record is presented here to the extent it can be publicly disclosed.',
    sectionNav: { profile: 'Profile', nationalRnd: 'National R&D', projects: 'Projects', research: 'Research', consulting: 'Advisory', lectures: 'Teaching' },
    educationLabel: 'Education',
    careerLabel: 'Career',
    coreSkillsIt: 'Core Skills — IT & AX',
    coreSkillsContent: 'Core Skills — Content & Visualization',
    nationalRndEyebrow: 'NATIONAL R&D',
    nationalRndTitle: 'National R&D Participation',
    nationalRndSourceLine: (source, issuedAt) => `Based on ${source} (issued ${issuedAt}).`,
    nationalRndMetrics: { annual: 'Participation records (per year)', pi: 'Principal investigator records', researcher: 'Research participant records', programs: 'Representative programs (grouped)' },
    projectsEyebrow: 'PROJECTS',
    projectsTitle: 'Major IT Projects & Business History',
    projectsDescription: 'Featured projects are shown first; the full history is in the timeline below.',
    fullTimelineLabel: 'Full Timeline',
    researchEyebrow: 'RESEARCH',
    researchTitle: 'Research History',
    researchCoreLabel: 'Core Research — Directly Connected to Current Business',
    researchFoundationLabel: 'Foundational Research',
    evolutionTimelineLabel: 'Technology Evolution Timeline',
    consultingEyebrow: 'ADVISORY',
    consultingTitle: 'Advisory History',
    lecturesEyebrow: 'LECTURES',
    lecturesTitle: 'Teaching & Education History',
    mediaConvergenceAccordionLabel: 'Media Convergence & Visualization History',
  },
};

export const representative: Record<Locale, RepresentativeContent> = {
  ko: {
    name: '백성은',
    title: '주식회사 비트리 대표이사',
    role: 'AX Architect / AI·Digital Twin R&D Lead',
    field: 'ICT 융복합',
    contactPolicy: '회사 대표 이메일 사용',
    homeIntro: '2005년부터 영상처리·AI를 연구하며 디지털트윈·Edge AI 통합 아키텍처를 직접 설계합니다.',
    academicStatusOptions: [
      '건양대학교 의료인공지능 박사과정에 재학 중입니다.',
      '건양대학교 의료인공지능 박사과정을 수료했습니다.',
      '건양대학교 의료인공지능 박사학위를 취득했습니다.',
    ],
    detailIntro:
      '백성은 대표는 영상처리·인공지능을 기반으로 지능형 영상보안, 스마트시티 관제, IoT·AIoT, 디지털트윈, 스마트팜과 로봇 자동화 시스템을 연구하고 개발해 온 기술사업가입니다. 2005년 자연어처리 응용 연구를 시작으로 영상 검색·인식, 저전력 무선 영상센서, 객체추적, 지능형 통합관제와 클라우드 영상분석 시스템을 개발했습니다. 이후 스마트시티 시각화, 농촌 디지털트윈, 스마트수산양식 AIoT, 바이오 로봇과 의료영상 AI 연구로 기술영역을 확장했습니다. 현재 BTREE AX LAB에서 현장 진단, 시스템 아키텍처, PoC 실증과 국가 R&D 기술기획을 직접 수행합니다.',
    sectionTitle: ['20년간 축적한 영상처리·AI 연구를', '산업 현장의 실행 가능한 시스템으로'],
    trustMetrics: [
      { value: '2005–', label: '영상처리·AI 연구개발' },
      { value: '9건', label: 'NTIS 국가R&D 참여기록' },
      { value: '2건', label: '국가R&D 연구책임자 기록' },
      { value: '2007–2026', label: '산업·공공 IT 프로젝트 이력' },
    ],
    trustMetricsNote: '국가R&D 참여기록은 2025년 7월 14일 발급 NTIS 자료 기준이며, 동일 과제의 연차별 기록을 포함합니다.',
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
    expertiseTags: ['Industrial AI', 'Edge AI', 'Digital Twin', 'AIoT', 'Computer Vision', 'Smart Farm', 'Robotics', 'Technology Planning'],
    education: [
      {
        period: '2023.03–현재',
        institution: '건양대학교',
        major: '의료인공지능',
        status: '박사과정',
        statusNote: '학적 상태 확정 필요',
      },
      { period: '2006.02–2009.08', institution: '국립군산대학교', major: '영상처리·인공지능', status: '석사' },
      { period: '1999.03–2006.02', institution: '국립군산대학교', major: '컴퓨터정보공학', status: '학사' },
    ],
    career: [
      { period: '2019.10–현재', organization: '주식회사 비트리', position: '대표이사', detail: '소프트웨어 개발, 디지털트윈, AI' },
      { period: '2021.09–2024.12', organization: '주식회사 플라스바이오', position: '기술자문·기술이사', detail: '인공지능 소프트웨어 개발 자문' },
      { period: '2017.11–현재', organization: '도킹텍프로젝트협동조합', position: '상임이사', detail: '영상·미디어 콘텐츠 개발 및 제작' },
      { period: '2022.10–2023.12', organization: '주식회사 액티부키', position: '디지털트윈 PM', detail: '농촌 디지털트윈 사업 총괄' },
      { period: '2010.04–2019.12', organization: '주식회사 고백기술', position: '융복합연구소 기술이사', detail: '머신러닝 연구, 소프트웨어 개발' },
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
      content: ['융복합 미디어 콘텐츠 기획·연출·제작', '미디어파사드·홀로그램·디지털사이니지', 'VR360·Unreal Engine', '공간 사전 시각화·Virtual Production'],
    },
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
    viewTrackRecordCta: '백성은 대표와 수행이력 보기',
    photoPlaceholderCaption: '공식 프로필 사진 영역',
  },
  en: {
    name: 'Baek Seongeun',
    title: 'CEO, BTREE Inc.',
    role: 'AX Architect / AI & Digital Twin R&D Lead',
    field: 'ICT Convergence',
    contactPolicy: 'Uses the company contact email',
    homeIntro: 'Researching video processing and AI since 2005, he personally designs digital twin and Edge AI integration architecture.',
    academicStatusOptions: [
      'He is currently enrolled in the Ph.D. program in Medical AI at Konyang University.',
      'He has completed coursework for the Ph.D. program in Medical AI at Konyang University.',
      'He holds a Ph.D. in Medical AI from Konyang University.',
    ],
    detailIntro:
      'Baek Seongeun is a technology entrepreneur who has researched and developed intelligent video security, smart city monitoring, IoT/AIoT, digital twins, smart farms, and robotic automation systems built on video processing and AI. Starting with applied NLP research in 2005, he developed video search and recognition, low-power wireless video sensors, object tracking, integrated intelligent monitoring, and cloud video analysis systems. He later expanded into smart city visualization, rural digital twins, smart aquaculture AIoT, bio-robotics, and medical imaging AI. At BTREE AX LAB, he personally leads field diagnosis, system architecture, PoC validation, and government R&D technical planning.',
    sectionTitle: ['Two decades of video processing and AI research,', 'turned into working systems for the industrial field'],
    trustMetrics: [
      { value: '2005–', label: 'Video processing & AI R&D' },
      { value: '9', label: 'NTIS national R&D participation records' },
      { value: '2', label: 'National R&D principal investigator records' },
      { value: '2007–2026', label: 'Industrial & public IT project history' },
    ],
    trustMetricsNote:
      'National R&D participation figures are based on the NTIS record issued July 14, 2025, and include per-year records of the same multi-year programs.',
    homeHighlights: [
      "M.S. in Video Processing & AI, Kunsan National University",
      'CEO, BTREE Inc. — AI and digital twin software development',
      'PM for rural digital twin platform development and 3D data capture',
      'Principal investigator, national R&D on integrated smart aquaculture AIoT',
      'Contributor to AI-based animal testing and tumor-analysis robotics R&D',
    ],
    allHighlights: [
      "M.S. in Video Processing & AI, Kunsan National University",
      'CEO, BTREE Inc. — AI and digital twin software development',
      'PM for rural digital twin platform development and 3D data capture',
      'Principal investigator, national R&D on integrated smart aquaculture AIoT',
      'Contributor to AI-based animal testing and tumor-analysis robotics R&D',
      'Developed smart city, intelligent video security, and integrated monitoring systems',
      'Technical advisor to smart farm, bio-robotics, and AI companies',
      'Taught AI, information security, Unreal Engine, and smart farm technology at universities',
    ],
    expertiseTags: ['Industrial AI', 'Edge AI', 'Digital Twin', 'AIoT', 'Computer Vision', 'Smart Farm', 'Robotics', 'Technology Planning'],
    education: [
      {
        period: '2023.03–Present',
        institution: 'Konyang University',
        major: 'Medical AI',
        status: 'Ph.D. program',
        statusNote: 'Enrollment status to be confirmed',
      },
      { period: '2006.02–2009.08', institution: 'Kunsan National University', major: 'Video Processing & AI', status: 'M.S.' },
      { period: '1999.03–2006.02', institution: 'Kunsan National University', major: 'Computer Information Engineering', status: 'B.S.' },
    ],
    career: [
      { period: '2019.10–Present', organization: 'BTREE Inc.', position: 'CEO', detail: 'Software development, digital twins, AI' },
      { period: '2021.09–2024.12', organization: 'Plasbio Co., Ltd.', position: 'Technical Advisor / CTO', detail: 'AI software development advisory' },
      { period: '2017.11–Present', organization: 'Dockingtech Project Cooperative', position: 'Executive Director', detail: 'Video and media content development and production' },
      { period: '2022.10–2023.12', organization: 'Actibuki Co., Ltd.', position: 'Digital Twin PM', detail: 'Led the rural digital twin program' },
      { period: '2010.04–2019.12', organization: 'Gobaek Technology Co., Ltd.', position: 'CTO, Convergence Research Lab', detail: 'Machine learning research, software development' },
    ],
    coreSkills: {
      it: [
        'Video security systems, information security, integrated monitoring',
        'Smart city platforms & digital twins',
        'IoT / AIoT integration',
        'Smart farm & smart aquaculture',
        'Applied machine learning & computer vision',
        'Data analysis',
        'Robotics software & automation',
      ],
      content: [
        'Converged media content planning, direction & production',
        'Media façades, holograms, digital signage',
        'VR360 & Unreal Engine',
        'Pre-visualization for spaces & virtual production',
      ],
    },
    evolutionTimeline: [
      { period: '2005–2008', summary: 'NLP · video search · video recognition · wireless video sensors' },
      { period: '2009–2017', summary: 'CCTV object tracking · intelligent integrated monitoring · video security · cloud video analysis' },
      { period: '2018–2021', summary: 'Smart city visualization · IoT integrated monitoring · bio-robotics AI' },
      { period: '2022–2024', summary: 'Smart aquaculture AIoT · rural digital twin · robotic auto-analysis' },
      { period: '2025–2026', summary: 'Multimodal medical imaging AI · smart farm space regeneration · monitoring simulator' },
    ],
    evolutionClosing: [
      'The technology domains changed, but the core has stayed consistent:',
      'collect field video and sensor data, judge it with AI, and visualize it in a system operators can actually use.',
    ],
    viewTrackRecordCta: 'View Founder & Track Record',
    photoPlaceholderCaption: 'Official profile photo area',
  },
};
