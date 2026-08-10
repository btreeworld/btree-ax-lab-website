'use client';

import { Environment, Lightformer } from '@react-three/drei';

import type { JourneyQuality } from '@/components/three/world/useJourneyQuality';
import { threeColors } from '@/lib/three-tokens';

/**
 * 월드 조명 리그.
 *
 * 3점 조명의 축약형(키 + 필 + 림)에 절차적 환경맵을 더한다.
 *
 * 환경맵을 왜 넣는가: MeshStandardMaterial의 metalness는 "무엇을 반사하는가"로 표현된다.
 * 반사할 환경이 없으면 금속이 그냥 어두운 무광 덩어리가 되어, 조명을 넣어도 재질 구분이
 * 안 생긴다. drei `<Environment>`에 `<Lightformer>` 자식을 주면 외부 HDRI 파일 없이
 * 코드만으로 큐브맵을 구워낸다 — 에셋 파이프라인 없음이라는 이 프로젝트의 제약을 지키면서
 * 금속·유리에 반사 하이라이트를 만들어 준다. `frames={1}`로 최초 1회만 굽는다.
 *
 * lite(모바일)에서는 환경맵 굽기와 림라이트를 생략하고 키+필만 남긴다.
 */
export function WorldLighting({ quality }: { quality: JourneyQuality }) {
  const isFull = quality === 'full';

  return (
    <>
      {/* 필 — 하늘/바닥 두 방향의 은은한 기저광. 완전한 암부가 생기지 않게 바닥을 들어올린다.
          어두운 씬이라 필을 인색하게 주면 카메라 반대편 면이 배경과 붙어 실루엣이 사라진다. */}
      <hemisphereLight args={[0x4d91ae, 0x070b12, isFull ? 1.18 : 1.45]} />
      <ambientLight intensity={isFull ? 0.28 : 0.34} />

      {/* 키 — 카메라가 대체로 -Z를 보므로 좌상단 앞쪽에서 넣는다. */}
      <directionalLight color={0xdff3ff} intensity={isFull ? 1.75 : 2.1} position={[6, 9, 8]} />

      {/* 림 — 반대편에서 청록으로 실루엣 가장자리를 훑어 배경과 분리시킨다. */}
      {isFull ? <directionalLight color={threeColors.accent} intensity={1.05} position={[-8, 4, -10]} /> : null}

      {isFull ? (
        <Environment frames={1} resolution={128}>
          {/* 상단 대형 소프트박스 — 넓은 면에 완만한 그라디언트를 만든다. */}
          <Lightformer form="rect" intensity={1.4} position={[0, 8, 2]} rotation={[-Math.PI / 2, 0, 0]} scale={[14, 14, 1]} />
          {/* 측면 스트립 — 금속 모서리에 길쭉한 하이라이트를 남긴다. */}
          <Lightformer
            color="#9fe6ff"
            form="rect"
            intensity={1.1}
            position={[-7, 3, -4]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[10, 3, 1]}
          />
          <Lightformer
            color="#2ad4d9"
            form="rect"
            intensity={0.9}
            position={[7, 2.5, -6]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[10, 2.4, 1]}
          />
        </Environment>
      ) : null}
    </>
  );
}
