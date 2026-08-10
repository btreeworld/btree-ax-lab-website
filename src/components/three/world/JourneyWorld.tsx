'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';

import { useJourneyAudio } from '@/components/three/world/audio/useJourneyAudio';
import { CameraRig } from '@/components/three/world/CameraRig';
import { JourneyHud } from '@/components/three/world/hud/JourneyHud';
import { IndustrialEffects } from '@/components/three/world/IndustrialEffects';
import { MobileJourneyScene } from '@/components/three/world/MobileJourneyScene';
import { SoundToggle } from '@/components/three/world/hud/SoundToggle';
import { PointCloudScan } from '@/components/three/world/PointCloudScan';
import { EdgeStation } from '@/components/three/world/stations/EdgeStation';
import { FieldStation } from '@/components/three/world/stations/FieldStation';
import { GapStation } from '@/components/three/world/stations/GapStation';
import { OperatorStation } from '@/components/three/world/stations/OperatorStation';
import { PlatformStation } from '@/components/three/world/stations/PlatformStation';
import { TwinStation } from '@/components/three/world/stations/TwinStation';
import { Terrain } from '@/components/three/world/Terrain';
import { useJourneyProgress } from '@/components/three/world/useJourneyProgress';
import { WorldLighting } from '@/components/three/world/WorldLighting';
import type { JourneyQuality } from '@/components/three/world/useJourneyQuality';
import { JOURNEY_SCROLL_VH, MOBILE_JOURNEY_SCROLL_VH, MOBILE_WAYPOINTS, WAYPOINTS } from '@/lib/journey';
import { threeColors } from '@/lib/three-tokens';

/**
 * 홈 3D 월드 본체. 캔버스는 `fixed`로 전체 뷰포트에 고정하고, 스크롤 길이는 별도 스페이서
 * div가 만든다 — drei `<ScrollControls>`를 안 쓰는 이유는 계획서 "스크롤·카메라" 절 참조
 * (자체 스크롤 컨테이너를 소유해 HTML 오버레이/SEO를 해치기 때문).
 *
 * frameloop="always" — 데스크톱 사이트의 다른 3D 씬(Hero/Architecture)은 demand+invalidate를
 * 쓰지만, 이 월드는 스크롤 중 매 프레임 카메라가 움직이므로 demand 모드의 이점이 없다.
 * 대신 PerformanceMonitor로 실측 FPS가 떨어지면 dpr을 낮춰 대응한다.
 */
export function JourneyWorld({ quality }: { quality: JourneyQuality }) {
  const progress = useJourneyProgress();
  const audio = useJourneyAudio(progress);
  const [dpr, setDpr] = useState<number>(quality === 'lite' ? 1 : 1.5);

  return (
    <div className="relative">
      <div aria-hidden className="fixed inset-0 z-0">
        <Canvas
          /* fov는 수직 화각이라, 세로로 긴 모바일 화면에서는 수평 화각이 크게 좁아져
             공장·온실처럼 옆으로 퍼진 설비가 화면 밖으로 잘려 나간다. lite(모바일)에서는
             화각을 넓혀 같은 카메라 경로로도 스테이션 전체가 프레임에 들어오게 한다. */
          camera={{ position: quality === 'lite' ? MOBILE_WAYPOINTS[0].cameraPosition : WAYPOINTS[0].cameraPosition, fov: quality === 'lite' ? 58 : 50 }}
          dpr={dpr}
          frameloop="always"
          gl={{ alpha: false, antialias: quality === 'full' }}
        >
          <color args={[threeColors.bgPrimary]} attach="background" />
          {/* 안개 범위를 좁게 잡는다 — 스테이션들이 Z축을 따라 늘어서 있어서, 멀리 잡으면
              FIELD에서 EDGE·PLATFORM·OPERATOR 설비가 한꺼번에 보여 화면이 어지러워진다.
              한 번에 한 스테이션에 집중되도록 30 유닛 근처에서 배경에 녹아들게 한다. */}
          <fog args={[threeColors.fog, 9, 32]} attach="fog" />
          <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => quality === 'full' && setDpr(1.5)} />

          <CameraRig progressRef={progress.ref} quality={quality} />
          <WorldLighting quality={quality} />
          <Terrain />
          <IndustrialEffects quality={quality} />
          {quality === 'full' ? (
            <>
              <PointCloudScan progressRef={progress.ref} />
              <FieldStation />
              <GapStation />
              <EdgeStation />
              <PlatformStation />
              <TwinStation />
              <OperatorStation />
            </>
          ) : (
            <MobileJourneyScene />
          )}

          {quality === 'full' ? (
            <EffectComposer>
              <Bloom intensity={0.42} luminanceSmoothing={0.92} luminanceThreshold={0.3} mipmapBlur />
              <Vignette darkness={0.55} offset={0.28} />
            </EffectComposer>
          ) : null}
        </Canvas>
      </div>

      <JourneyHud progress={progress} quality={quality} />
      <SoundToggle enabled={audio.enabled} onToggle={audio.toggle} />

      {/* 스크롤 길이 전용 스페이서 — 자체 콘텐츠 없음 */}
      <div aria-hidden data-journey-spacer style={{ height: `${quality === 'lite' ? MOBILE_JOURNEY_SCROLL_VH : JOURNEY_SCROLL_VH}vh` }} />
    </div>
  );
}
