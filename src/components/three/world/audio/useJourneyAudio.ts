'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import type { JourneyProgress } from '@/components/three/world/useJourneyProgress';
import { WAYPOINTS, stationProgress } from '@/lib/journey';

/**
 * 절차적 WebAudio 사운드 레이어 — 외부 음원 없이 OscillatorNode로 전부 합성한다(라이선스
 * 문제 없음, 페이로드 0). 기본 OFF: 브라우저 autoplay 정책상 사용자 제스처 없이는 재생이
 * 불가능하기도 하고, igloo.inc도 실제로 "Sound: Off"로 시작한다(레퍼런스 확인).
 *
 * AudioContext는 토글을 처음 누르는 순간(진짜 사용자 제스처) 생성한다 — 미리 만들어두면
 * suspended 상태로 남아 소리가 안 나는 브라우저가 많다.
 */
export function useJourneyAudio(progress: JourneyProgress) {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);
  const lastStationRef = useRef(-1);

  const ensureContext = useCallback(() => {
    if (ctxRef.current) return ctxRef.current;
    if (typeof window === 'undefined') return null;

    const AudioContextCtor = window.AudioContext;
    if (!AudioContextCtor) return null;
    const ctx = new AudioContextCtor();

    // 앰비언트 드론 — 살짝 어긋난 두 저음 사인파를 로우패스에 통과시켜 은은한 허밍을 만든다.
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 420;

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0; // 토글 ON 시 서서히 올라간다
    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    [55, 82.4].forEach((freq) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const oscGain = ctx.createGain();
      oscGain.gain.value = 0.5;
      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start();
    });

    ctxRef.current = ctx;
    droneGainRef.current = masterGain;
    return ctx;
  }, []);

  const playChime = useCallback((stationIndex: number) => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    const now = ctx.currentTime;
    const baseFreq = 220 + stationIndex * 18;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.18);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.55);
  }, []);

  // 스테이지 진입 감지 — 진행률이 어느 스테이션의 "플래토"(정중앙 근처)에 들어올 때만 1회 울린다.
  useEffect(() => {
    if (!enabled) return;

    return progress.subscribe((t) => {
      let nearest = 0;
      let best = Infinity;
      WAYPOINTS.forEach((_, i) => {
        const d = Math.abs(t - stationProgress(i));
        if (d < best) {
          best = d;
          nearest = i;
        }
      });
      if (nearest !== lastStationRef.current && best < 0.02) {
        lastStationRef.current = nearest;
        playChime(nearest);
      }
    });
  }, [enabled, progress, playChime]);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      const ctx = next ? ensureContext() : ctxRef.current;
      if (!ctx || !droneGainRef.current) return next;

      if (next) {
        ctx.resume();
        droneGainRef.current.gain.setTargetAtTime(0.05, ctx.currentTime, 0.6);
      } else {
        droneGainRef.current.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
      }
      return next;
    });
  }, [ensureContext]);

  useEffect(() => {
    return () => {
      ctxRef.current?.close();
    };
  }, []);

  return { enabled, toggle };
}
