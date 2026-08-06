/**
 * 주요 IT 프로젝트 및 사업이력 — 마스터 문서 12.5
 *
 * 공개 전 검증 (12.5)
 *  - "출시 / 완료 / 구축" 표현은 납품서·계약서·제품자료 확인 필요 → evidenceLevel 로 관리
 *  - 기관명 공개 가능 여부 확인 전에는 산업과 수행범위만 표시
 *  - 군수·보안 프로젝트는 고객명·시설·성능·운용정보를 공개하지 않는다
 */
import type { BusinessRecord } from '@/types';

export const businessRecords: BusinessRecord[] = [
  {
    year: 2026,
    title: '군수창고 통합 관제 및 시뮬레이터 솔루션 개발',
    field: ['통합관제', '시뮬레이터', '디지털트윈'],
    description: '보안 검토 후 비보안 개요만 표시합니다.',
    tags: ['사업', '구축'],
    featured: true,
    evidenceLevel: 'C',
    note: '보안 검토 필요 — 고객명·시설·운용정보 비공개',
  },
  {
    year: 2025,
    title: '유휴공간 스마트팜 재생 서비스',
    field: ['스마트팜', '공간재생', '환경 데이터'],
    description:
      '유휴공간을 스마트팜 운영공간으로 전환하기 위한 기술·운영 서비스와 디지털 사전 시각화.',
    tags: ['사업'],
    featured: true,
    evidenceLevel: 'B',
  },
  {
    year: 2024,
    title: '디지털트윈 기반 공간 사전 시각화 비즈니스',
    field: ['디지털트윈', '공간 시각화'],
    description: '구축 전에 공간·시설·동선을 3차원으로 검토하는 사전 시각화 서비스.',
    tags: ['사업', '제품'],
    featured: true,
    evidenceLevel: 'B',
  },
  {
    year: 2023,
    title: '농촌 디지털트윈 플랫폼 개발 및 3차원 데이터 구축',
    role: '디지털트윈 PM / 사업 총괄',
    field: ['농촌', '3D 데이터', '운영 플랫폼'],
    tags: ['구축', 'PM'],
    featured: true,
    evidenceLevel: 'B',
  },
  {
    year: 2022,
    title: '흰다리새우 수산양식 스마트 IoT HUB 개발',
    field: ['스마트수산양식', 'IoT HUB', '환경 데이터'],
    tags: ['연구', '구축'],
    featured: true,
    evidenceLevel: 'B',
  },
  {
    year: 2021,
    title: '지능형 통합 IoT 관제 시스템 개발',
    field: ['IoT 통합', '관제', '데이터 시각화'],
    tags: ['구축'],
    featured: true,
    evidenceLevel: 'B',
  },
  {
    year: 2022,
    title: '우석대학교 정보보안 해킹 실습 방어관제 시스템 구축',
    tags: ['구축'],
    evidenceLevel: 'B',
  },
  {
    year: 2020,
    title: '주식회사 비트리 창업',
    tags: ['사업'],
    evidenceLevel: 'C',
    note: '설립연도는 법인등기부 기준으로 확정 필요 (경력표 2019.10과 불일치)',
  },
  {
    year: 2018,
    title: '대구 스마트시티 수성의료지구 실증사업 시각화 플랫폼 개발 및 시스템 구축',
    tags: ['구축'],
    evidenceLevel: 'B',
  },
  {
    year: 2016,
    title: '부산 스마트시티 스쿨존 영상분석 시스템 및 시각화 모니터링 개발',
    tags: ['구축'],
    evidenceLevel: 'B',
  },
  {
    year: 2015,
    title: '지능형 주차관제 APRS 개발·차량방범시스템 고도화',
    role: 'PM',
    tags: ['제품', 'PM'],
    evidenceLevel: 'B',
  },
  {
    year: 2015,
    title: '클라우드 중앙집중형 영상분석시스템 연구개발',
    tags: ['연구'],
    evidenceLevel: 'B',
  },
  {
    year: 2014,
    title: 'CCTV 지능형 객체추적 보안시스템 연구개발',
    tags: ['연구'],
    evidenceLevel: 'B',
  },
  { year: 2013, title: '무선 정보보안 시스템 개발 및 연구', tags: ['연구'], evidenceLevel: 'B' },
  { year: 2013, title: '지능형 방범 분야 컨설팅', tags: ['사업'], evidenceLevel: 'C' },
  { year: 2013, title: '불법 주정차 단속 시스템 개발·출시', tags: ['제품'], evidenceLevel: 'C' },
  { year: 2013, title: '고성능 HPC 시스템 개발·출시', tags: ['제품'], evidenceLevel: 'C' },
  {
    year: 2012,
    title: '한국생산기술연구원 웨어러블컴퓨팅 위탁 연구개발',
    tags: ['연구'],
    evidenceLevel: 'C',
    note: '기관명 공개 가능 여부 확인 필요',
  },
  {
    year: 2011,
    title: '지능형 통합보안관제시스템 SARA 개발·출시',
    tags: ['제품'],
    evidenceLevel: 'C',
  },
  {
    year: 2011,
    title: '차량이동 추적 및 방범시스템 IVSS 개발·출시',
    tags: ['제품'],
    evidenceLevel: 'C',
  },
  {
    year: 2010,
    title: '단일 CCTV 기반 자동 객체추적 시스템 CYCLOPS 개발',
    tags: ['제품'],
    evidenceLevel: 'C',
  },
  { year: 2009, title: '불법 주정차 단속 시스템 개발', tags: ['제품'], evidenceLevel: 'C' },
  {
    year: 2008,
    title: 'Face Detection & Tracking, Smile & Eye Blink Detection 개발',
    tags: ['연구'],
    evidenceLevel: 'C',
  },
  { year: 2007, title: '품질분임조경진대회 심사 시스템 개발', tags: ['구축'], evidenceLevel: 'C' },
];

export const featuredBusinessRecords = businessRecords.filter((record) => record.featured);

export const businessRecordFilters = ['전체', '사업', '구축', '연구', '제품', 'PM'] as const;

export const businessRecordNotice =
  '기관명과 성과 수치는 계약·납품 자료로 확인된 범위에서만 공개합니다. 국방·보안 관련 프로젝트는 비보안 개요만 표시합니다.';
