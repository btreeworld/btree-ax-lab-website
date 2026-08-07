/** 기술자문 이력 — 마스터 문서 12.7 */
import type { Locale } from '@/i18n/locales';
import type { ConsultingRecord } from '@/types';

export const consultingRecords: Record<Locale, ConsultingRecord[]> = {
  ko: [
    { period: '2024–현재', field: 'AI 기업', detail: '연구개발지원사업 분야 컨설팅' },
    { period: '2024–현재', field: '스마트팜 기업', detail: '스마트팜 교육·IT 기술 컨설팅' },
    { period: '2022–현재', field: '바이오 로봇 기업', detail: '로봇 기술·소프트웨어 개발 컨설팅' },
    { period: '2024–2025', field: 'S/W 기술자문', detail: '국가연구개발사업 감사 기술자문', note: '공식 기관명 확인 후 표기' },
    { period: '2022', field: '전주 스마트시티 리빙랩', detail: '스마트주차 KPI 달성지표 설계·컨설팅' },
    { period: '2012', field: '지능형 방범 컨설팅', detail: 'CCTV 기반 지능형 보안시스템 컨설팅', note: '기관명 확인 후 표기' },
  ],
  en: [
    { period: '2024–Present', field: 'AI Company', detail: 'Consulting on R&D support programs' },
    { period: '2024–Present', field: 'Smart Farm Company', detail: 'Smart farm education and IT consulting' },
    { period: '2022–Present', field: 'Bio-robotics Company', detail: 'Robotics technology and software development consulting' },
    { period: '2024–2025', field: 'S/W Technical Advisory', detail: 'Technical advisory for a national R&D program audit', note: 'Official institution name pending confirmation' },
    { period: '2022', field: 'Jeonju Smart City Living Lab', detail: 'Design and consulting on smart parking KPI achievement metrics' },
    { period: '2012', field: 'Intelligent Security Consulting', detail: 'Consulting on a CCTV-based intelligent security system', note: 'Institution name pending confirmation' },
  ],
};

export const consultingSummary: Record<Locale, string> = {
  ko: '기업 연구개발, 스마트팜, 바이오 로봇과 스마트시티 분야에서 기술구조, 소프트웨어 개발, 성능지표와 R&D 수행체계를 자문해 왔습니다.',
  en: 'He has advised companies in R&D, smart farms, bio-robotics, and smart city fields on technical architecture, software development, performance metrics, and R&D execution frameworks.',
};
