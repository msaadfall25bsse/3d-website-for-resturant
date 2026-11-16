"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CINEMATIC_SCENES } from "./types";
import CinematicScene from "./CinematicScene";
import SceneProgress from "./SceneProgress";
import SceneNavigation from "./SceneNavigation";
import VideoPreloader from "./VideoPreloader";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollExperience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [sceneProgress, setSceneProgress] = useState<number>(0);
  const [globalProgress, setGlobalProgress] = useState<number>(0);

  // Synchronize with GSAP ScrollTrigger
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.25, // Responsive yet silky smooth scrubbing
      onUpdate: (self) => {
        const p = self.progress; // 0 to 1
        setGlobalProgress(p);

        const total = CINEMATIC_SCENES.length;
        const scaled = p * total;
        const curIdx = Math.min(Math.floor(scaled), total - 1);
        const subProg = Math.min(Math.max(scaled - curIdx, 0), 1);

        setActiveIndex(curIdx);
        setSceneProgress(subProg);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  // Smooth programmatic scroll to a specific scene with Lenis support
  const scrollToScene = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const scrollDistance = track.offsetHeight - window.innerHeight;
    const targetScroll =
      scrollTop + (index / CINEMATIC_SCENES.length) * scrollDistance + 10;

    const winWithLenis = window as unknown as { lenis?: { scrollTo: (target: number) => void } };
    if (winWithLenis.lenis && typeof winWithLenis.lenis.scrollTo === "function") {
      winWithLenis.lenis.scrollTo(targetScroll);
    } else {
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  }, []);

  const handlePrevScene = useCallback(() => {
    if (activeIndex > 0) {
      scrollToScene(activeIndex - 1);
    }
  }, [activeIndex, scrollToScene]);

  const handleNextScene = useCallback(() => {
    if (activeIndex < CINEMATIC_SCENES.length - 1) {
      scrollToScene(activeIndex + 1);
    }
  }, [activeIndex, scrollToScene]);

  const handleReplay = useCallback(() => {
    scrollToScene(0);
  }, [scrollToScene]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const isInView = rect.top <= 100 && rect.bottom >= window.innerHeight;
      if (!isInView) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        handleNextScene();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        handlePrevScene();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNextScene, handlePrevScene]);

  return (
    <div
      ref={trackRef}
      className="relative w-full bg-[#080706]"
      style={{
        // 140vh per scene across 8 scenes = 1120vh total scroll distance
        height: `${CINEMATIC_SCENES.length * 140}vh`,
      }}
    >
      {/* ── INTELLIGENT RESOURCE PRELOADER ── */}
      <VideoPreloader scenes={CINEMATIC_SCENES} activeIndex={activeIndex} />

      {/* ── FULL-SCREEN STICKY PINNED STAGE ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#080706] flex items-center justify-center select-none">
        {/* Render all 8 layered cinematic scenes */}
        {CINEMATIC_SCENES.map((scene, idx) => (
          <CinematicScene
            key={scene.id}
            scene={scene}
            index={idx}
            activeIndex={activeIndex}
            sceneProgress={sceneProgress}
          />
        ))}

        {/* ── INTERACTIVE TIMELINE PROGRESS & DOTS ── */}
        <SceneProgress
          scenes={CINEMATIC_SCENES}
          activeIndex={activeIndex}
          globalProgress={globalProgress}
          onSelectScene={scrollToScene}
        />

        {/* ── FLOATING BOTTOM HUD NAVIGATION & CONTROLS ── */}
        <SceneNavigation
          activeIndex={activeIndex}
          totalScenes={CINEMATIC_SCENES.length}
          onPrevScene={handlePrevScene}
          onNextScene={handleNextScene}
          onReplay={handleReplay}
        />
      </div>
    </div>
  );
}
