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
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const durationRef = useRef<number>(10); // default to 10s if not loaded yet
  const rAFRef = useRef<number | null>(null);
  const isSeekingRef = useRef<boolean>(false);

  // Directly load and read metadata
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const onMeta = () => {
      if (vid.duration && !isNaN(vid.duration) && vid.duration > 0) {
        durationRef.current = vid.duration;
        setIsVideoReady(true);
        if (onDurationLoaded) onDurationLoaded(vid.duration);
      }
    };

    const onCanPlay = () => {
      setIsVideoReady(true);
    };

    const onError = () => {
      // If primary src fails, try fallback
      if (fallbackSrc && vid.src !== fallbackSrc) {
        vid.src = fallbackSrc;
        vid.load();
      } else {
        setHasError(true);
      }
    };

    vid.addEventListener("loadedmetadata", onMeta);
    vid.addEventListener("canplay", onCanPlay);
    vid.addEventListener("error", onError);

    // If already has metadata
    if (vid.readyState >= 1 && vid.duration) {
      onMeta();
    }

    return () => {
      vid.removeEventListener("loadedmetadata", onMeta);
      vid.removeEventListener("canplay", onCanPlay);
      vid.removeEventListener("error", onError);
    };
  }, [videoSrc, fallbackSrc, onDurationLoaded]);

  // Synchronize playhead accurately with scroll progress
  const syncPlayhead = useCallback((targetProgress: number) => {
    const vid = videoRef.current;
    if (!vid) return;

    const dur = durationRef.current || vid.duration || 10;
    const targetTime = Math.min(
      Math.max(targetProgress * dur, 0),
      Math.max(dur - 0.05, 0)
    );

    // Delta threshold: only seek if difference is meaningful to prevent decoder lock
    const diff = Math.abs(vid.currentTime - targetTime);
    if (diff > 0.02 && !isSeekingRef.current) {
      isSeekingRef.current = true;
      vid.currentTime = targetTime;
      // Release seek lock on seeked
      const onSeeked = () => {
        isSeekingRef.current = false;
        vid.removeEventListener("seeked", onSeeked);
      };
      vid.addEventListener("seeked", onSeeked, { once: true });
    }
  }, []);

  // Update on progress changes
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

  // Ensure video stays paused for frame-accurate scrubbing
  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.pause();
    }
  }, []);

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden will-change-transform will-change-opacity"
      style={{
        opacity,
        transform: `scale(${scale})`,
        transition: "opacity 0.4s ease-out, transform 0.35s ease-out",
        pointerEvents: opacity > 0.5 ? "auto" : "none",
        zIndex: isActive ? 10 : isUpcoming ? 9 : 1,
      }}
    >
      {/* Direct HTML5 Video with source attached directly on tag */}
      <video
        ref={videoRef}
        src={videoSrc}
        playsInline
        muted
        loop={false}
        preload={isActive || isUpcoming ? "auto" : "metadata"}
        poster={posterSrc}
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.06]"
      />

      {/* Fallback Poster Background only if error occurs or video not ready */}
      {posterSrc && (
        <div
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-500 pointer-events-none ${
            hasError || !isVideoReady ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${posterSrc})`,
            zIndex: 2,
          }}
        />
      )}
    </div>
  );
}
