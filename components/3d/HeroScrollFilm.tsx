"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 200;

export default function HeroScrollFilm() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);

  const [loadPercent, setLoadPercent] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    if (!canvasRef.current || !trackRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isAlive = true;

    // Resize canvas to physical device pixels
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      drawFrame(currentFrameRef.current);
    };

    // Fast contain-fit drawing on canvas
    const drawFrame = (index: number) => {
      currentFrameRef.current = index;
      const img = imagesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      ctx.fillStyle = "#080706";
      ctx.fillRect(0, 0, cw, ch);

      // Scale to cover the screen seamlessly
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    // Preload all 200 frames
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    const EAGER_THRESHOLD = 15; // Fast start as soon as first 15 frames are in

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const num = String(i).padStart(4, "0");
      img.src = `/frames/frame_${num}.webp`;

      img.onload = () => {
        if (!isAlive) return;
        loadedCount++;
        setLoadPercent(Math.round((loadedCount / TOTAL_FRAMES) * 100));

        if (loadedCount === 1) {
          resizeCanvas();
          drawFrame(0);
        }
        if (loadedCount >= EAGER_THRESHOLD && !isReady) {
          setIsReady(true);
        }
      };

      images.push(img);
    }
    imagesRef.current = images;

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // GSAP ScrollTrigger to scrub frames strictly with scroll
    const trigger = ScrollTrigger.create({
      trigger: trackRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        if (!isAlive) return;
        const p = self.progress;
        setScrollProgress(p);

        // Map scroll fraction [0, 1] to frame index [0, 199]
        const targetFrame = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.floor(p * (TOTAL_FRAMES - 1)))
        );

        drawFrame(targetFrame);
      },
    });

    return () => {
      isAlive = false;
      window.removeEventListener("resize", resizeCanvas);
      trigger.kill();
    };
  }, [isReady]);

  return (
    <div ref={trackRef} className="relative w-full h-[650vh]">
      {/* Sticky Fullscreen Scrubber Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#080706]">
        {/* The Frame Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block z-10"
        />

        {/* Radial Edge Vignette so the video frames blend seamlessly into #080706 */}
        <div className="absolute inset-0 pointer-events-none z-20 vignette-radial" />
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#080706] to-transparent pointer-events-none z-20" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#080706] to-transparent pointer-events-none z-20" />

        {/* ── LOADER (ONLY DISPLAYED BRIEFLY FOR INITIAL FRAMES) ── */}
        {!isReady && (
          <div className="absolute inset-0 z-50 bg-[#080706] flex flex-col items-center justify-center gap-4 text-[#f5f2ec]">
            <div className="w-3 h-3 rounded-full bg-[#e5a93c] animate-ping" />
            <span className="font-bold tracking-[0.3em] uppercase text-xs text-[#e5a93c]">
              NOIR & EMBER
            </span>
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#e5a93c] transition-all duration-200"
                style={{ width: `${Math.max(10, loadPercent)}%` }}
              />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
              Loading Cinematic Frames ({loadPercent}%)
            </span>
          </div>
        )}

        {/* ── CHAPTER CAPTIONS (TIED DIRECTLY TO SCROLL PROGRESS) ── */}

        {/* CHAPTER 1: HERO BURGER FLOATING (Progress 0.00 to 0.22) */}
        <div
          className={`absolute inset-x-0 top-[28%] md:top-[30%] flex flex-col items-center text-center px-6 pointer-events-none z-30 transition-all duration-700 ${
            scrollProgress < 0.22
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-8"
          }`}
        >
          <span className="text-[11px] md:text-xs tracking-[0.45em] uppercase text-[#e5a93c] mb-3 font-semibold">
            Artisanal Haute-Burger Studio
          </span>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#f5f2ec] max-w-4xl leading-[1.02]">
            CRAFTED TO <span className="text-[#e5a93c] text-gold-glow">PERFECTION.</span>
          </h1>
          <p className="mt-4 text-xs md:text-base text-[#f5f2ec]/75 max-w-lg font-light leading-relaxed">
            Where 45-day dry-aged Miyazaki Wagyu meets 650°C white oak charcoal fire.
          </p>

          <div className="mt-8 flex items-center gap-4 pointer-events-auto">
            <a
              href="#interactive-menu"
              className="px-8 py-3.5 rounded-full bg-[#e5a93c] text-[#080706] text-xs uppercase tracking-widest font-bold hover:bg-[#f5c46b] transition-all transform hover:scale-105 shadow-[0_0_25px_rgba(229,169,60,0.35)]"
            >
              Explore Menu
            </a>
            <a
              href="#cinematic-craft"
              className="px-8 py-3.5 rounded-full border border-[#e5a93c]/40 text-[#f5f2ec] text-xs uppercase tracking-widest font-medium hover:border-[#e5a93c] hover:bg-[#e5a93c]/10 transition-all backdrop-blur-xs"
            >
              Watch Craft Videos
            </a>
          </div>

          <div className="mt-12 flex flex-col items-center gap-2 text-[#f5f2ec]/50 text-[10px] tracking-[0.3em] uppercase animate-pulse">
            <span>Scroll down to deconstruct</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-[#e5a93c] to-transparent" />
          </div>
        </div>

        {/* CHAPTER 2: BURGER EXPLOSION (Progress 0.22 to 0.48) */}
        <div
          className={`absolute left-6 md:left-16 top-1/2 -translate-y-1/2 max-w-md pointer-events-none z-30 transition-all duration-700 ${
            scrollProgress >= 0.22 && scrollProgress < 0.48
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-10"
          }`}
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#e5a93c] font-semibold">
            Act II — Deconstruction
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#f5f2ec] mt-2">
            THE ARCHITECTURE OF <span className="text-[#e5a93c]">FLAVOR.</span>
          </h2>
          <p className="mt-3 text-xs md:text-sm text-[#f5f2ec]/75 leading-relaxed font-light">
            Every element exists in deliberate equilibrium. Seven isolated layers engineered to release umami in orchestrated sequence.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-black/60 border border-[#e5a93c]/30 text-[10px] text-[#e5a93c] tracking-wider uppercase backdrop-blur-md">
              Scroll Driven Disassembly
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] text-white/70 tracking-wider uppercase backdrop-blur-md">
              7 Precision Layers
            </span>
          </div>
        </div>

        {/* CHAPTER 3: REASSEMBLY (Progress 0.48 to 0.72) */}
        <div
          className={`absolute left-6 md:left-16 bottom-[18%] max-w-md pointer-events-none z-30 transition-all duration-700 ${
            scrollProgress >= 0.48 && scrollProgress < 0.72
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#e5a93c] font-semibold">
            Act III — Harmonic Fusion
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#f5f2ec] mt-2">
            REASSEMBLED AS <span className="text-[#e5a93c]">ONE.</span>
          </h2>
          <p className="mt-3 text-xs md:text-sm text-[#f5f2ec]/75 leading-relaxed font-light">
            All elements snap back into locked unity. The heat fuses aged Gruyère into marbled Wagyu beef, sealing bone marrow jus into the toasted brioche cushion.
          </p>
        </div>

        {/* CHAPTER 4: PACKAGING BOX EXPERIENCE (Progress 0.72 to 1.00) */}
        <div
          className={`absolute inset-x-0 bottom-[18%] flex flex-col items-center text-center px-6 pointer-events-none z-30 transition-all duration-700 ${
            scrollProgress >= 0.72
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#e5a93c] font-semibold">
            Act IV — Packaging Prestige
          </span>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-[#f5f2ec] mt-2 max-w-2xl">
            THE LUXURY <span className="text-[#e5a93c]">UNBOXING.</span>
          </h2>
          <p className="mt-3 text-xs md:text-sm text-[#f5f2ec]/75 max-w-md leading-relaxed font-light">
            The bespoke matte black octagonal box opens, receives the burger, and softly seals with gold foil precision for 45-minute temperature retention.
          </p>
          <div className="mt-6 pointer-events-auto flex items-center gap-4">
            <a
              href="#interactive-menu"
              className="px-8 py-3.5 rounded-full bg-[#e5a93c] text-[#080706] text-xs uppercase tracking-widest font-bold hover:bg-[#f5c46b] transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(229,169,60,0.35)]"
            >
              Order For Delivery
            </a>
          </div>
        </div>

        {/* Right Scroll Progress Indicator */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-30 pointer-events-none">
          {[
            { label: "Floating", min: 0, max: 0.22 },
            { label: "Explosion", min: 0.22, max: 0.48 },
            { label: "Reassemble", min: 0.48, max: 0.72 },
            { label: "Packaging", min: 0.72, max: 1.0 },
          ].map((ch, idx) => {
            const active = scrollProgress >= ch.min && scrollProgress < ch.max;
            return (
              <div key={idx} className="flex items-center gap-2">
                <span
                  className={`text-[9px] uppercase tracking-widest font-mono transition-opacity duration-300 hidden md:inline ${
                    active ? "text-[#e5a93c] opacity-100" : "text-white/20 opacity-0"
                  }`}
                >
                  {ch.label}
                </span>
                <div
                  className={`w-1.5 rounded-full transition-all duration-300 ${
                    active
                      ? "h-8 bg-[#e5a93c] shadow-[0_0_12px_#e5a93c]"
                      : "h-1.5 bg-white/20"
                  }`}
                />
              </div>
            );
          })}
          <span className="text-[9px] text-[#e5a93c] tracking-widest font-mono mt-1">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
