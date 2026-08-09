'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';

import { useJourneyAudio } from '@/components/three/world/audio/useJourneyAudio';
import { CameraRig } from '@/components/three/world/CameraRig';
import { JourneyHud } from '@/components/three/world/hud/JourneyHud';
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
import type { JourneyQuality } from '@/components/three/world/useJourneyQuality';
import { JOURNEY_SCROLL_VH, WAYPOINTS } from '@/lib/journey';
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
          camera={{ position: WAYPOINTS[0].cameraPosition, fov: 50 }}
          dpr={dpr}
          frameloop="always"
          gl={{ alpha: false, antialias: quality === 'full' }}
        >
          <color args={[threeColors.bgPrimary]} attach="background" />
          <fog args={[threeColors.fog, 14, 55]} attach="fog" />
          <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => quality === 'full' && setDpr(1.5)} />

          <CameraRig progressRef={progress.ref} />
          <Terrain />
          <PointCloudScan progressRef={progress.ref} />
          <FieldStation />
          <GapStation />
          <EdgeStation />
          <PlatformStation />
          <TwinStation />
          <OperatorStation />

          {quality === 'full' ? (
            <EffectComposer>
              <Bloom intensity={0.35} luminanceSmoothing={0.9} luminanceThreshold={0.25} mipmapBlur />
              <Vignette darkness={0.55} offset={0.28} />
            </EffectComposer>
          ) : null}
        </Canvas>
      </div>

      <JourneyHud progress={progress} />
      <SoundToggle enabled={audio.enabled} onToggle={audio.toggle} />

      {/* 스크롤 길이 전용 스페이서 — 자체 콘텐츠 없음 */}
      <div aria-hidden style={{ height: `${JOURNEY_SCROLL_VH}vh` }} />
    </div>
  );
}
