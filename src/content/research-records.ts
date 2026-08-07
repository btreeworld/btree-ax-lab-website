/** 연구 수행 이력 — 마스터 문서 12.6 */
import type { Locale } from '@/i18n/locales';
import type { ResearchRecord } from '@/types';

export const researchRecords: Record<Locale, ResearchRecord[]> = {
  ko: [
    { year: '2025', topic: 'FUNDUS·OCT 멀티모달 AI 모델', detail: '의료용 안구 이미지 기반 질병진단 AI', group: 'core' },
    { year: '2024', topic: '종양 사이즈 인식 및 로봇 자동분석', detail: '비임상시험 종양 인식 AI·로봇 시스템', group: 'core' },
    { year: '2024', topic: '스마트수산양식 AIoT', detail: '인공지능·IoT 연계 수산양식 시스템', group: 'core' },
    { year: '2023', topic: 'AI 기반 동물실험 자동화', detail: '혈관 인식 기반 로봇 자동채혈 연구', group: 'core' },
    { year: '2022', topic: '스마트 수산양식 IoT 환경', detail: '양식 환경 센서·IoT 구축 연구', group: 'core' },
    { year: '2021', topic: '컴퓨터비전 기반 비임상시험 로봇 제어', detail: 'AI 인지와 로봇 제어 연계', group: 'core' },
    { year: '2020', topic: '생태환경보존 콘텐츠', detail: '생태환경 홀로그램 콘텐츠', group: 'core' },
    { year: '2016', topic: '방송콘텐츠 장면 단위 토픽 생성', detail: '한국전자정보통신연구원 위탁 연구', group: 'core' },
    { year: '2008', topic: '시각장애인 실내 지각 보조기술', detail: '무선 임베디드·공간인식 영상센서', group: 'foundation' },
    { year: '2007', topic: '저전력 무선 영상 객체 인식 전송센서', detail: 'C328 카메라·IEEE 802.15.4 Zigbee', group: 'foundation' },
    { year: '2007', topic: '영상 감성 인식 프로토타입', detail: 'Image Scale Map·공감각 DB·클러스터링', group: 'foundation' },
    { year: '2006', topic: 'Video Image Indexing & Retrieval', detail: 'Scene·Shot 분석과 검색 알고리즘', group: 'foundation' },
    { year: '2005', topic: '교육시스템 자연어처리 응용', detail: '시소러스·형태소 분석', group: 'foundation' },
  ],
  en: [
    { year: '2025', topic: 'FUNDUS/OCT Multimodal AI Model', detail: 'AI for disease diagnosis from ophthalmic images', group: 'core' },
    { year: '2024', topic: 'Tumor Size Recognition & Robotic Auto-analysis', detail: 'AI and robotic system for preclinical tumor recognition', group: 'core' },
    { year: '2024', topic: 'Smart Aquaculture AIoT', detail: 'AI- and IoT-linked aquaculture system', group: 'core' },
    { year: '2023', topic: 'AI-based Animal Testing Automation', detail: 'Robotic automated blood-draw research based on vessel recognition', group: 'core' },
    { year: '2022', topic: 'Smart Aquaculture IoT Environment', detail: 'Sensor and IoT infrastructure research for aquaculture environments', group: 'core' },
    { year: '2021', topic: 'Computer-vision-based Robotic Control for Preclinical Trials', detail: 'Linking AI perception with robotic control', group: 'core' },
    { year: '2020', topic: 'Ecological Conservation Content', detail: 'Hologram content on ecological preservation', group: 'core' },
    { year: '2016', topic: 'Scene-level Topic Generation for Broadcast Content', detail: 'Commissioned research for ETRI', group: 'core' },
    { year: '2008', topic: 'Indoor Perception Aid for the Visually Impaired', detail: 'Wireless embedded, spatial-recognition video sensors', group: 'foundation' },
    { year: '2007', topic: 'Low-power Wireless Video Object-recognition Sensor', detail: 'C328 camera, IEEE 802.15.4 Zigbee', group: 'foundation' },
    { year: '2007', topic: 'Video-based Emotion Recognition Prototype', detail: 'Image scale map, synesthesia DB, clustering', group: 'foundation' },
    { year: '2006', topic: 'Video Image Indexing & Retrieval', detail: 'Scene/shot analysis and search algorithms', group: 'foundation' },
    { year: '2005', topic: 'Applied NLP for Educational Systems', detail: 'Thesaurus and morphological analysis', group: 'foundation' },
  ],
};

export const researchSummary: Record<Locale, string> = {
  ko: '백성은 대표의 연구 이력은 영상처리와 컴퓨터비전에서 출발해 무선 센서, 지능형 관제, AIoT, 로봇 자동화와 의료영상 AI로 확장되었습니다. BTREE AX LAB은 이 기술의 축적을 산업 현장의 데이터 수집, Edge 판단과 디지털트윈 운영으로 연결합니다.',
  en: "Baek Seongeun's research began in video processing and computer vision, then expanded into wireless sensors, intelligent monitoring, AIoT, robotic automation, and medical imaging AI. BTREE AX LAB channels that accumulated experience into field data collection, Edge-level judgment, and digital twin operations.",
};
