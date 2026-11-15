"use client";

import { useEffect } from "react";
import { CinematicSceneData } from "./types";

interface VideoPreloaderProps {
  scenes: CinematicSceneData[];
  activeIndex: number;
}

export default function VideoPreloader({ scenes, activeIndex }: VideoPreloaderProps) {
  useEffect(() => {
    // Intelligent prefetching: active + next 2 scenes
    const indicesToPreload = [
      activeIndex,
      (activeIndex + 1) % scenes.length,
      (activeIndex + 2) % scenes.length,
    ];

    indicesToPreload.forEach((idx) => {
      const scene = scenes[idx];
      if (!scene?.videoSrc) return;

      // Check if already preloaded
      const existing = document.querySelector(`link[href="${scene.videoSrc}"]`);
      if (!existing) {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.as = "video";
        link.href = scene.videoSrc;
        document.head.appendChild(link);
      }
    });
  }, [scenes, activeIndex]);

  return null;
}

