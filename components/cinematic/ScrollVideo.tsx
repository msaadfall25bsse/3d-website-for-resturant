"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface ScrollVideoProps {
  videoSrc: string;
  fallbackSrc?: string;
  posterSrc: string;
  progress: number; // 0 to 1 within this scene
  isActive: boolean;
  isUpcoming: boolean;
  opacity: number;
  scale?: number;
  onDurationLoaded?: (dur: number) => void;
}

export default function ScrollVideo({
  videoSrc,
  fallbackSrc,
  posterSrc,
  progress,
  isActive,
  isUpcoming,
  opacity,
  scale = 1,
  onDurationLoaded,
}: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const rAFRef = useRef<number | null>(null);
  const lastTargetTime = useRef<number>(0);

  // Synchronize video.currentTime via requestAnimationFrame
  const syncPlayhead = useCallback(
    (targetProgress: number) => {
      const vid = videoRef.current;
      if (!vid || hasError) return;

      const dur = duration || vid.duration;
      if (!dur || isNaN(dur) || dur <= 0) return;

      // Map progress [0, 1] to target time in video, clamping to valid range
      const targetTime = Math.min(
        Math.max(targetProgress * dur, 0),
        Math.max(dur - 0.05, 0)
      );

      // Throttling: only update if delta is meaningful (> 0.03s) to prevent decoder lag
      if (Math.abs(vid.currentTime - targetTime) > 0.03) {
        lastTargetTime.current = targetTime;
        if ("fastSeek" in vid && typeof (vid as unknown as { fastSeek: (t: number) => void }).fastSeek === "function") {
          try {
            (vid as unknown as { fastSeek: (t: number) => void }).fastSeek(targetTime);
          } catch {
            vid.currentTime = targetTime;
          }
        } else {
          vid.currentTime = targetTime;
        }
      }
    },
    [duration, hasError]
  );

  // Sync on progress change when active
  useEffect(() => {
    if (!isActive && !isUpcoming) return;

    if (rAFRef.current) {
      cancelAnimationFrame(rAFRef.current);
    }

    rAFRef.current = requestAnimationFrame(() => {
      syncPlayhead(progress);
    });

    return () => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    };
  }, [progress, isActive, isUpcoming, syncPlayhead]);

  // Keep video paused while scrubbing
  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.pause();
    }
  }, []);

  const handleLoadedMetadata = () => {
    const vid = videoRef.current;
    if (vid && vid.duration && !isNaN(vid.duration)) {
      setDuration(vid.duration);
      if (onDurationLoaded) onDurationLoaded(vid.duration);
    }
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden will-change-transform will-change-opacity"
      style={{
        opacity,
        transform: `scale(${scale})`,
        transition: "opacity 0.4s ease-out, transform 0.3s ease-out",
        pointerEvents: opacity > 0.5 ? "auto" : "none",
        zIndex: isActive ? 10 : isUpcoming ? 9 : 1,
      }}
    >
      {/* Fallback Poster Background in case video buffers or errors */}
      {posterSrc && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-700 pointer-events-none"
          style={{
            backgroundImage: `url(${posterSrc})`,
            opacity: hasError || !duration ? 1 : 0,
            zIndex: 1,
          }}
        />
      )}

      {/* HTML5 Video Layer */}
      <video
        ref={videoRef}
        playsInline
        muted
        loop={false}
        preload={isActive || isUpcoming ? "auto" : "metadata"}
        poster={posterSrc}
        onLoadedMetadata={handleLoadedMetadata}
        onError={handleError}
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.06]"
      >
        <source src={videoSrc} type="video/mp4" />
        {fallbackSrc && <source src={fallbackSrc} type="video/mp4" />}
      </video>
    </div>
  );
}
