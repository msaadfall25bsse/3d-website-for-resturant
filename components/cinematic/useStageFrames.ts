"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type Frame =
  | { kind: "bitmap"; img: ImageBitmap }
  | { kind: "element"; img: HTMLImageElement; url: string };

async function decodeBlob(blob: Blob): Promise<Frame> {
  try {
    const img = await createImageBitmap(blob);
    return { kind: "bitmap", img };
  } catch {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.decoding = "async";
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("img decode failed"));
      img.src = url;
    });
    return { kind: "element", img, url };
  }
}

function releaseFrame(f: Frame) {
  if (f.kind === "bitmap") f.img.close();
  else URL.revokeObjectURL(f.url);
}

/**
 * Loads a WebP frame sequence for a stage and handles canvas painting with cover-fit.
 * Implements sliding window decoding to maintain high performance and low memory.
 */
export function useStageFrames(stageNumber: number, frameCount = 60) {
  const blobs = useRef<(Blob | null)[]>(new Array(frameCount).fill(null));
  const frames = useRef<Map<number, Frame>>(new Map());
  const decoding = useRef<Set<number>>(new Set());
  const [isReady, setIsReady] = useState(false);
  const pattern = `/frames/stage-${stageNumber}/frame_%03d.webp`;

  const getUrl = useCallback((index: number) => {
    return pattern.replace("%03d", String(index + 1).padStart(3, "0"));
  }, [pattern]);

  // Decode a specific frame index
  const decode = useCallback(async (i: number) => {
    if (i < 0 || i >= frameCount) return;
    if (frames.current.has(i) || decoding.current.has(i)) return;

    decoding.current.add(i);
    try {
      let b = blobs.current[i];
      if (!b) {
        const res = await fetch(getUrl(i));
        if (res.ok) {
          b = await res.blob();
          blobs.current[i] = b;
        }
      }
      if (b) {
        const f = await decodeBlob(b);
        frames.current.set(i, f);
      }
    } catch {
      // transient decode error
    } finally {
      decoding.current.delete(i);
    }
  }, [frameCount, getUrl]);

  // Preload initial frames (first 10 frames) on mount
  useEffect(() => {
    let alive = true;

    async function init() {
      try {
        // Eagerly fetch and decode frame 0 so stage is immediately painted
        const firstUrl = getUrl(0);
        const res = await fetch(firstUrl);
        if (res.ok && alive) {
          const b = await res.blob();
          blobs.current[0] = b;
          const f = await decodeBlob(b);
          if (alive) {
            frames.current.set(0, f);
            setIsReady(true);
          } else {
            releaseFrame(f);
            return;
          }
        }

        // Prefetch first 15 frames
        const eagerCount = Math.min(15, frameCount);
        for (let i = 1; i < eagerCount; i++) {
          if (!alive) break;
          decode(i);
        }

        // Background preload remaining frames lazily
        setTimeout(() => {
          if (!alive) return;
          for (let i = eagerCount; i < frameCount; i++) {
            if (!alive) break;
            const idx = i;
            fetch(getUrl(idx))
              .then(r => r.ok ? r.blob() : null)
              .then(b => {
                if (alive && b) blobs.current[idx] = b;
              })
              .catch(() => {});
          }
        }, 800);
      } catch {
        // Fallback
      }
    }

    init();

    return () => {
      alive = false;
      frames.current.forEach(releaseFrame);
      frames.current.clear();
      blobs.current = new Array(frameCount).fill(null);
    };
  }, [frameCount, getUrl, decode]);

  // Draw frame on canvas with cover sizing
  const draw = useCallback((canvas: HTMLCanvasElement | null, progress: number) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Calculate clamped frame index
    const p = Math.max(0, Math.min(1, progress));
    const targetIdx = Math.min(Math.floor(p * (frameCount - 1)), frameCount - 1);

    // Keep decoding sliding window around target
    for (let offset = -3; offset <= 6; offset++) {
      const nearby = targetIdx + offset;
      if (nearby >= 0 && nearby < frameCount && !frames.current.has(nearby)) {
        decode(nearby);
      }
    }

    // Free frames far from target to prevent memory bloat
    if (frames.current.size > 25) {
      for (const [idx, frame] of frames.current) {
        if (Math.abs(idx - targetIdx) > 12 && idx !== 0) {
          releaseFrame(frame);
          frames.current.delete(idx);
        }
      }
    }

    // Find nearest decoded frame
    let frameToDraw: Frame | undefined = frames.current.get(targetIdx);
    if (!frameToDraw) {
      // Find closest decoded frame
      let minDiff = Infinity;
      for (const [idx, f] of frames.current) {
        const diff = Math.abs(idx - targetIdx);
        if (diff < minDiff) {
          minDiff = diff;
          frameToDraw = f;
        }
      }
    }

    if (!frameToDraw) return;

    const img = frameToDraw.img;
    const cw = canvas.width;
    const ch = canvas.height;
    if (cw === 0 || ch === 0) return;

    const iw = "width" in img ? img.width : (img as HTMLImageElement).naturalWidth;
    const ih = "height" in img ? img.height : (img as HTMLImageElement).naturalHeight;
    if (!iw || !ih) return;

    // Cover math: scale to fill canvas while preserving aspect ratio
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.drawImage(img, sx, sy, sw, sh);
  }, [frameCount, decode]);

  return { isReady, draw };
}
