"use client";

import React from "react";
import { CinematicSceneData } from "./types";
import ScrollVideo from "./ScrollVideo";
import SceneText from "./SceneText";

interface CinematicSceneProps {
  scene: CinematicSceneData;
  index: number;
  activeIndex: number;
  sceneProgress: number; // 0 to 1
  onDurationLoaded?: (dur: number) => void;
}

export default function CinematicScene({
  scene,
  index,
  activeIndex,
  sceneProgress,
  onDurationLoaded,
}: CinematicSceneProps) {
  const isActive = index === activeIndex;
  const isUpcoming = index === activeIndex + 1;
  const isPrevious = index < activeIndex;

  let opacity = 0;
  let scale = 1;
  let zIndex = 1;

  if (isActive) {
    if (sceneProgress > 0.85 && index < 7) {
      // Fade out slightly as next scene crossfades in
      opacity = 1 - (sceneProgress - 0.85) / 0.15 * 0.35;
    } else {
      opacity = 1;
    }
    // Cinematic subtle camera push-in
    scale = 1 + sceneProgress * 0.04;
    zIndex = 10;
  } else if (isUpcoming && sceneProgress > 0.82) {
    // Smooth anticipatory crossfade into next scene
    const fadeT = (sceneProgress - 0.82) / 0.18;
    opacity = Math.min(Math.max(fadeT, 0), 1);
    scale = 1.05 - (1 - opacity) * 0.05;
    zIndex = 12;
  } else if (isPrevious) {
    opacity = 0;
    scale = 0.96;
    zIndex = 1;
  }

  // Only render active, upcoming, or immediate previous scene to save resources
  const isRelevant = Math.abs(index - activeIndex) <= 1;
  if (!isRelevant && opacity === 0) return null;

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden will-change-transform will-change-opacity select-none"
      style={{
        zIndex,
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      {/* ── BACKGROUND VIDEO SCRUBBER ── */}
      <ScrollVideo
        videoSrc={scene.videoSrc}
        fallbackSrc={scene.fallbackSrc}
        posterSrc={scene.posterSrc}
        progress={isActive ? sceneProgress : isUpcoming ? 0 : 1}
        isActive={isActive}
        isUpcoming={isUpcoming}
        opacity={opacity}
        scale={scale}
        onDurationLoaded={onDurationLoaded}
      />

      {/* ── CINEMATIC VIGNETTE & LIGHT GRADIENTS ── */}
      <div
        className="absolute inset-0 pointer-events-none vignette-radial transition-opacity duration-500"
        style={{ zIndex: 15, opacity: opacity * 0.95 }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#080706] via-transparent to-[#080706]/75 pointer-events-none"
        style={{ zIndex: 15, opacity: opacity }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none"
        style={{ zIndex: 15, opacity: opacity }}
      />

      {/* Ambient Color Flare in corner */}
      {scene.ambientColor && (
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[120px] pointer-events-none transition-opacity duration-700"
          style={{
            backgroundColor: scene.ambientColor,
            opacity: isActive ? 0.12 : 0,
            zIndex: 16,
          }}
        />
      )}

      {/* ── SYNCHRONIZED TYPOGRAPHY OVERLAY ── */}
      <SceneText
        scene={scene}
        progress={sceneProgress}
        isActive={isActive}
      />
    </div>
  );
}

