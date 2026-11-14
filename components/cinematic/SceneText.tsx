"use client";

import React from "react";
import { CinematicSceneData } from "./types";
import { Sparkles, ArrowDown } from "lucide-react";

interface SceneTextProps {
  scene: CinematicSceneData;
  progress: number; // 0 to 1
  isActive: boolean;
}

export default function SceneText({ scene, progress, isActive }: SceneTextProps) {
  // Compute smooth enter, hold, and exit curves
  // Enter phase: 0.00 -> 0.15
  // Hold phase:  0.15 -> 0.82
  // Exit phase:  0.82 -> 1.00
  let opacity = 0;
  let translateY = 20;

  if (isActive) {
    if (progress < 0.15) {
      const t = progress / 0.15;
      opacity = Math.min(Math.max(t, 0), 1);
      translateY = (1 - opacity) * 25;
    } else if (progress <= 0.82) {
      opacity = 1;
      translateY = 0;
    } else {
      const t = (1 - progress) / 0.18;
      opacity = Math.min(Math.max(t, 0), 1);
      translateY = -(1 - opacity) * 20;
    }
  }

  // Split title into words for typographic hierarchy
  const titleWords = scene.title.split(" ");
  const isCenter = scene.alignment === "center";
  const isRight = scene.alignment === "right";

  return (
    <div
      className={`absolute z-30 pointer-events-none transition-all duration-300 ease-out will-change-transform ${
        isCenter
          ? "top-20 sm:top-24 inset-x-0 mx-auto px-6 max-w-4xl text-center flex flex-col items-center"
          : isRight
          ? "top-1/2 -translate-y-1/2 right-6 sm:right-16 md:right-24 max-w-lg md:max-w-xl text-left"
          : "top-1/2 -translate-y-1/2 left-6 sm:left-16 md:left-24 max-w-lg md:max-w-xl text-left"
      }`}
      style={{
        opacity,
        transform: isCenter
          ? `translateY(${translateY}px)`
          : `translateY(calc(-50% + ${translateY}px))`,
      }}
    >
      {/* Luxury Glassmorphism Container for Side Panels */}
      <div
        className={`${
          !isCenter
            ? "glass-panel-glow p-6 sm:p-8 md:p-10 rounded-3xl border border-[#e5a93c]/25 shadow-[0_0_50px_rgba(0,0,0,0.85)]"
            : ""
        }`}
      >
        {/* Stage Badge with Pulsing Live Indicator */}
        <div
          className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-[#e5a93c]/35 shadow-[0_0_20px_rgba(229,169,60,0.15)] mb-3.5 ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#e5a93c] animate-pulse shadow-[0_0_8px_#e5a93c]" />
          <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.28em] text-[#e5a93c] uppercase">
            STAGE {scene.stepNum} OF 08 • {scene.badge}
          </span>
        </div>

        {/* Main Display Headline with Staggered Word Presentation */}
        <h2
          className={`font-black tracking-tight text-[#f5f2ec] leading-[1.04] uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] ${
            isCenter
              ? "text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
              : "text-2xl sm:text-4xl md:text-5xl"
          }`}
        >
          {titleWords.map((word, i) => (
            <span key={i} className="inline-block mr-2 sm:mr-3">
              {word}
            </span>
          ))}
          <span className="text-[#e5a93c] text-gold-glow block sm:inline">
            {scene.titleHighlight}
          </span>
        </h2>

        {/* Sensory Culinary Subtitle */}
        <p className="mt-2 text-xs sm:text-sm font-semibold tracking-[0.18em] text-[#e5a93c] uppercase drop-shadow-md">
          {scene.subtitle}
        </p>

        {/* Evocative Description Paragraph */}
        <p className="mt-3.5 text-xs sm:text-sm text-white/75 font-light leading-relaxed max-w-xl">
          {scene.description}
        </p>

        {/* Micro-Specs Grid */}
        {scene.specs && scene.specs.length > 0 && (
          <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-3 gap-3 text-[11px]">
            {scene.specs.map((s, idx) => (
              <div key={idx} className="space-y-0.5">
                <span className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest block font-medium">
                  {s.label}
                </span>
                <span className="text-[#f5f2ec] font-semibold block leading-tight text-xs sm:text-sm">
                  {s.val}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Scroll Cue on Stage 01 */}
        {scene.stepNum === "01" && (
          <div className="mt-6 flex items-center gap-2 text-[#e5a93c] text-[11px] font-mono tracking-widest uppercase animate-pulse">
            <ArrowDown size={14} />
            <span>Scroll down to ignite culinary progression</span>
          </div>
        )}
      </div>
    </div>
  );
}
