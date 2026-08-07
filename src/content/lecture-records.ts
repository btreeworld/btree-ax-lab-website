/** 강의·교육 이력 — 마스터 문서 12.8 */
import type { Locale } from '@/i18n/locales';
import type { LectureRecord } from '@/types';

export const lectureRecords: Record<Locale, LectureRecord[]> = {
  ko: [
    { year: '2026', course: 'AI-900 Microsoft 인증 교육', organization: '군산대학교', featured: true },
    { year: '2025', course: '스마트팜 교육', organization: '대전팜·제주대학교', featured: true },
    { year: '2025', course: 'Unreal Engine 강의', organization: '경복대학교 겸임교수', featured: true },
    { year: '2013–2015, 2019–2021', course: '프로그래밍·해킹방어·침입탐지', organization: '우석대학교 시간강사', featured: true },
    { year: '2009', course: '컴퓨터비전·인공지능 특강', organization: '군산대학교', featured: true },
    { year: '2010–2011', course: '대학생활 특강·멘토링', organization: '군산대학교' },
    { year: '2008', course: '리눅스 기반 프로그래밍 집중교육', organization: '군산대학교' },
    { year: '2007', course: '웹디자인·개발 교육', organization: '서천여자정보고등학교' },
    { year: '2006', course: '과학영재교육 컴퓨터정보공학 전담강의', organization: '군산대학교' },
  ],
  en: [
    { year: '2026', course: 'AI-900 Microsoft Certification Training', organization: 'Kunsan National University', featured: true },
    { year: '2025', course: 'Smart Farm Education', organization: 'Daejeon Farm · Jeju National University', featured: true },
    { year: '2025', course: 'Unreal Engine Lectures', organization: 'Kyungbok University (Adjunct Professor)', featured: true },
    { year: '2013–2015, 2019–2021', course: 'Programming, Hacking Defense & Intrusion Detection', organization: 'Woosuk University (Adjunct Lecturer)', featured: true },
    { year: '2009', course: 'Computer Vision & AI Special Lecture', organization: 'Kunsan National University', featured: true },
    { year: '2010–2011', course: 'Campus Life Lectures & Mentoring', organization: 'Kunsan National University' },
    { year: '2008', course: 'Intensive Linux-based Programming Training', organization: 'Kunsan National University' },
    { year: '2007', course: 'Web Design & Development Education', organization: 'Seocheon Girls Information High School' },
    { year: '2006', course: 'Dedicated CS Lectures for Gifted Science Education', organization: 'Kunsan National University' },
  ],
};

export const lectureSummary: Record<Locale, string> = {
  ko: '대학과 산업 현장에서 인공지능, 컴퓨터비전, 정보보안, 프로그래밍, Unreal Engine과 스마트팜 기술을 교육해 왔습니다.',
  en: 'He has taught AI, computer vision, information security, programming, Unreal Engine, and smart farm technology at universities and in industry.',
};

/**
 * 콘텐츠 융합·시각화 이력 — 마스터 문서 12.9
 * 산업 고객이 혼란스러워하지 않도록 보조 아코디언에만 배치한다.
 */
export const mediaConvergenceRecords: Record<Locale, Array<{ year: string; title: string }>> = {
  ko: [
    { year: '2025', title: '유휴공간 스마트팜 구축을 위한 디지털트윈 사전 시각화' },
    { year: '2024', title: '반려식물 홀로그램 콘텐츠' },
    { year: '2022', title: '익산 미륵사지 유물 홀로그램·홀로렌즈 건축 시각화' },
    { year: '2021', title: '인터랙티브 홀로그램·Virtual Production·메타버스 교육' },
    { year: '2020', title: '생태환경 홀로그램' },
    { year: '2019', title: '인터랙티브 뮤지컬·미디어가든 공간 기획' },
    { year: '2018', title: '미디어파사드 연출·지역영화제작 지원' },
    { year: '2017', title: '스마트시티 홀로그램·도킹텍프로젝트협동조합 공동설립' },
  ],
  en: [
    { year: '2025', title: 'Digital Twin Pre-visualization for a Smart Farm Build on Idle Space' },
    { year: '2024', title: 'Companion Plant Hologram Content' },
    { year: '2022', title: 'Hologram & HoloLens Architectural Visualization of Iksan Mireuksa Temple Site Artifacts' },
    { year: '2021', title: 'Interactive Hologram, Virtual Production & Metaverse Education' },
    { year: '2020', title: 'Ecological Environment Hologram' },
    { year: '2019', title: 'Interactive Musical & Media Garden Space Planning' },
    { year: '2018', title: 'Media Façade Direction & Local Film Production Support' },
    { year: '2017', title: 'Smart City Hologram; Co-founded Dockingtech Project Cooperative' },
  ],
};

export const mediaConvergenceIntro: Record<Locale, string> = {
  ko: '복잡한 정보를 공간과 시각언어로 구현해 온 경험입니다. 디지털트윈의 공간 시각화와 운영 화면 설계에 활용합니다.',
  en: 'Experience translating complex information into spatial and visual language — applied to digital twin space visualization and operating-screen design.',
};
