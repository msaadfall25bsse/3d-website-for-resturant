"use client";

import React from "react";
import { CinematicSceneData } from "./types";

interface SceneProgressProps {
  scenes: CinematicSceneData[];
  activeIndex: number;
  globalProgress: number; // 0 to 1
  onSelectScene: (index: number) => void;
}

export default function SceneProgress({
  scenes,
  activeIndex,
  globalProgress,
  onSelectScene,
}: SceneProgressProps) {
  const currentScene = scenes[activeIndex] || scenes[0];
  const progressPercent = Math.min(Math.max(globalProgress * 100, 0), 100);

  return (
    <>
      {/* ── TOP SLIM GOLDEN PROGRESS BAR ── */}
      <div className="fixed top-0 inset-x-0 h-[3px] bg-white/10 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#e5a93c] via-[#f5c46b] to-[#e5a93c] transition-all duration-300 ease-out shadow-[0_0_12px_#e5a93c]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* ── RIGHT-SIDE VERTICAL SCENE TRACKER ── */}
      <div className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3">
        {scenes.map((s, i) => {
          const isCur = i === activeIndex;
          const isPast = i < activeIndex;

          return (
            <button
              key={s.id}
              onClick={() => onSelectScene(i)}
              className="group relative flex items-center justify-end p-1 transition-all focus:outline-none cursor-pointer"
              aria-label={`Jump to Stage ${s.stepNum}: ${s.title}`}
            >
              {/* Tooltip on Hover */}
              <div className="absolute right-7 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap bg-black/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#e5a93c]/30 shadow-2xl translate-x-2 group-hover:translate-x-0 flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-[#e5a93c]">
                  {s.stepNum}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span className="text-[10px] font-semibold tracking-wider text-[#f5f2ec] uppercase">
                  {s.badge}
                </span>
              </div>

              {/* Progress Indicator Dot / Pill */}
              <div
                className={`transition-all duration-300 rounded-full ${
                  isCur
                    ? "w-2.5 h-8 bg-[#e5a93c] shadow-[0_0_18px_#e5a93c] scale-110"
                    : isPast
                    ? "w-1.5 h-1.5 bg-[#e5a93c]/60 hover:bg-[#e5a93c]"
                    : "w-1.5 h-1.5 bg-white/25 hover:bg-white/60"
                }`}
              />
            </button>
          );
        })}

        {/* Counter Display */}
        <span className="text-[10px] font-mono font-bold text-[#e5a93c] tracking-widest mt-1">
          {currentScene.stepNum}/08
        </span>
      </div>
    </>
  );
}

