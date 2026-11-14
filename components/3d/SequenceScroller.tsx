"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { useCart } from "@/components/cart/CartContext";

interface StepData {
  step: string;
  number: number;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  videoSrc: string;
  fallbackSrc: string;
}

const SEQUENCE_STEPS: StepData[] = [
  {
    step: "01",
    number: 1,
    badge: "Open-Fire Sear",
    title: "BINCHOTAN CHARCOAL SEAR",
    subtitle: "650°C Kishu White Oak • Sizzling A5 Japanese Wagyu Patty",
    description: "Hand-ground A5 BMS 11 Wagyu patty kissed by white oak coals, rendering deep intramuscular fat into pure umami nectar.",
    videoSrc: "/videos/step-1.mp4",
    fallbackSrc: "/videos/add%20video%20combination%20in%20the%20scrolling%20this%20sequence/video%20number%201%20add.mp4",
  },
  {
    step: "02",
    number: 2,
    badge: "Caramelization",
    title: "THE ROARING FLAME",
    subtitle: "Rendered Marbling • Deep Mahogany Crust Forming",
    description: "Intense open flame creates the quintessential Maillard reaction, sealing moisture within a blistered, caramelized crust.",
    videoSrc: "/videos/step-2.mp4",
    fallbackSrc: "/videos/add%20video%20combination%20in%20the%20scrolling%20this%20sequence/video%20number%202%20add.mp4",
  },
  {
    step: "03",
    number: 3,
    badge: "Haute Drizzle",
    title: "PÉRIGORD TRUFFLE EMULSION",
    subtitle: "Black Winter Truffle Reduction • Roasted Bone Marrow Infusion",
    description: "Velvety hand-crafted reduction of Périgord black truffle gently drizzled over sizzling caramelized wagyu.",
    videoSrc: "/videos/step-3.mp4",
    fallbackSrc: "/videos/add%20video%20combination%20in%20the%20scrolling%20this%20sequence/video%20number%203%20add.mp4",
  },
  {
    step: "04",
    number: 4,
    badge: "Alpine Melt",
    title: "MOLTEN AGED GRUYÈRE",
    subtitle: "24-Month Cave Reserve • Torch-Blistered Creamy Fondue",
    description: "Swiss Alpine Gruyère, melted to a silky molten cascade that drapes and envelops every ridge of the patty.",
    videoSrc: "/videos/step-4.mp4",
    fallbackSrc: "/videos/add%20video%20combination%20in%20the%20scrolling%20this%20sequence/video%20number%204%20add.mp4",
  },
  {
    step: "05",
    number: 5,
    badge: "Zero-Gravity View",
    title: "EXPLODED ARCHITECTURE",
    subtitle: "All 7 Artisanal Layers Suspended in Zero-Gravity",
    description: "Every ingredient deconstructed in mid-air: Wagyu patty, Gruyère, truffle aioli, crisp heirloom greens, and brioche.",
    videoSrc: "/videos/step-5.mp4",
    fallbackSrc: "/videos/add%20video%20combination%20in%20the%20scrolling%20this%20sequence/video%20number%205%20add.mp4",
  },
  {
    step: "06",
    number: 6,
    badge: "The Royal Crown",
    title: "THE WAGYU ICON",
    subtitle: "Gold-Leaf Glazed Brioche Crown • Chiaroscuro Studio Light",
    description: "The golden Hokkaido milk brioche crown descends, toasted with clarified wagyu tallow and crowned with edible 24K leaf.",
    videoSrc: "/videos/step-6.mp4",
    fallbackSrc: "/videos/add%20video%20combination%20in%20the%20scrolling%20this%20sequence/video%20number%206%20add.mp4",
  },
  {
    step: "07",
    number: 7,
    badge: "Harmonic Lock",
    title: "THE REASSEMBLY LOCK",
    subtitle: "All 7 Elements Descend & Seal as One Unified Masterpiece",
    description: "Precision culinary mechanics: the floating components seamlessly compress into the final, mouthwatering burger.",
    videoSrc: "/videos/step-7.mp4",
    fallbackSrc: "/videos/add%20video%20combination%20in%20the%20scrolling%20this%20sequence/video%20number%207%20add.mp4",
  },
  {
    step: "08",
    number: 8,
    badge: "Luxury Delivery",
    title: "BESPOKE PACKAGING SEALED",
    subtitle: "Matte Black Vault • Thermal Gold Velvet Lining • Ready to Serve",
    description: "The completed burger is enclosed inside our signature thermal octagonal case, locked to preserve 65°C core warmth.",
    videoSrc: "/videos/step-8.mp4",
    fallbackSrc: "/videos/add%20video%20combination%20in%20the%20scrolling%20this%20sequence/video%20number%208%20add.mp4",
  },
];

export default function SequenceScroller() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const touchStartY = useRef<number | null>(null);
  const scrollCooldown = useRef<boolean>(false);
  const deltaAccumulator = useRef<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const { setIsCartOpen } = useCart();

  // Switch to specific step with smooth video crossfade
  const goToStep = useCallback(
    (index: number) => {
      if (index === activeStep || index < 0 || index >= SEQUENCE_STEPS.length) return;
      if (scrollCooldown.current) return;

      scrollCooldown.current = true;
      setIsTransitioning(true);

      const nextVid = videoRefs.current[index];
      if (nextVid) {
        nextVid.currentTime = 0;
        nextVid.play().catch(() => {});
      }

      setActiveStep(index);

      // Smooth step lock duration to prevent accidental skipping
      setTimeout(() => {
        // Pause previously playing videos to save performance
        videoRefs.current.forEach((vid, i) => {
          if (vid && i !== index) {
            vid.pause();
          }
        });
        setIsTransitioning(false);
        scrollCooldown.current = false;
        deltaAccumulator.current = 0;
      }, 550);
    },
    [activeStep]
  );

  const nextStep = useCallback(() => {
    if (activeStep < SEQUENCE_STEPS.length - 1) {
      goToStep(activeStep + 1);
    }
  }, [activeStep, goToStep]);

  const prevStep = useCallback(() => {
    if (activeStep > 0) {
      goToStep(activeStep - 1);
    }
  }, [activeStep, goToStep]);

  // Handle Wheel Scroll Event without moving the page (page stays 100% stable!)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Prevent default page scroll so the screen remains 100% stable
      e.preventDefault();

      if (scrollCooldown.current) return;

      deltaAccumulator.current += e.deltaY;
      const THRESHOLD = 40; // responsive yet controlled

      if (deltaAccumulator.current > THRESHOLD) {
        deltaAccumulator.current = 0;
        if (activeStep < SEQUENCE_STEPS.length - 1) {
          nextStep();
        }
      } else if (deltaAccumulator.current < -THRESHOLD) {
        deltaAccumulator.current = 0;
        if (activeStep > 0) {
          prevStep();
        }
      }
    };

    // Handle Keyboard Navigation (Arrows & Page keys)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        nextStep();
      } else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        prevStep();
      }
    };

    // Handle Touch Gestures for mobile/touchpads
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY.current === null || scrollCooldown.current) return;
      const currentY = e.touches[0].clientY;
      const diff = touchStartY.current - currentY;

      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          nextStep();
        } else {
          prevStep();
        }
        touchStartY.current = null;
      }
    };

    const handleTouchEnd = () => {
      touchStartY.current = null;
    };

    // Attach non-passive wheel listener to window to lock page scroll
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeStep, nextStep, prevStep]);

  // Ensure current active video is playing on mount
  useEffect(() => {
    const curVid = videoRefs.current[activeStep];
    if (curVid) {
      curVid.play().catch(() => {});
    }
  }, [activeStep]);

  // Synthetic ambient kitchen ember/sizzle sound
  const initAmbientAudio = useCallback(() => {
    if (audioContextRef.current) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new AudioCtx();
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime);

      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.969 * b2 + white * 0.153852;
        b3 = 0.8665 * b3 + white * 0.3104856;
        b4 = 0.55 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.016898;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 650;
      filter.Q.value = 1.3;

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      whiteNoise.start();

      audioContextRef.current = ctx;
      gainNodeRef.current = gain;
    } catch {
      // AudioContext fallback
    }
  }, []);

  const toggleSound = () => {
    initAmbientAudio();
    if (!audioContextRef.current || !gainNodeRef.current) return;

    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }

    if (isMuted) {
      gainNodeRef.current.gain.setTargetAtTime(
        0.08,
        audioContextRef.current.currentTime,
        0.3
      );
      setIsMuted(false);
    } else {
      gainNodeRef.current.gain.setTargetAtTime(
        0,
        audioContextRef.current.currentTime,
        0.3
      );
      setIsMuted(true);
    }
  };

  const currentData = SEQUENCE_STEPS[activeStep];
  const progressPercent = ((activeStep + 1) / SEQUENCE_STEPS.length) * 100;

  return (
    <div className="relative w-full h-full min-h-screen max-h-screen overflow-hidden bg-[#080706] select-none">
      {/* ── TOP SLIM PROGRESS BAR ── */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-white/10 z-50">
        <div
          className="h-full bg-gradient-to-r from-[#e5a93c] via-[#ffaa40] to-[#e5a93c] transition-all duration-500 ease-out shadow-[0_0_12px_#e5a93c]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* ── 8 LAYERED BACKGROUND VIDEOS (STATIONARY FULL-VIEWPORT STAGE) ── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#080706]">
        {SEQUENCE_STEPS.map((step, idx) => {
          const isActive = idx === activeStep;

          return (
            <div
              key={step.step}
              className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out ${
                isActive
                  ? "opacity-100 scale-100 z-10"
                  : "opacity-0 scale-105 pointer-events-none z-0"
              }`}
            >
              <video
                ref={(el) => {
                  videoRefs.current[idx] = el;
                }}
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05]"
              >
                <source src={step.videoSrc} type="video/mp4" />
                <source src={step.fallbackSrc} type="video/mp4" />
              </video>
            </div>
          );
        })}

        {/* ── CINEMATIC LUXURY SHADOW & VIGNETTE OVERLAYS ── */}
        <div className="absolute inset-0 pointer-events-none vignette-radial z-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-transparent to-[#080706]/80 pointer-events-none z-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none z-20" />
        <div className="absolute inset-0 bg-black/25 pointer-events-none z-20" />
      </div>

      {/* ── DYNAMIC HUD TEXT OVERLAY (SYNCS WITH EACH VIDEO) ── */}
      <div className="absolute top-20 md:top-24 inset-x-0 mx-auto text-center z-30 pointer-events-none px-6 max-w-4xl flex flex-col items-center">
        {/* Stage Badge with Pulsing Live Indicator */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-[#e5a93c]/35 shadow-[0_0_20px_rgba(229,169,60,0.15)] mb-3 transition-transform duration-300">
          <span className="w-2 h-2 rounded-full bg-[#e5a93c] animate-pulse shadow-[0_0_8px_#e5a93c]" />
          <span className="text-[11px] md:text-xs font-mono font-bold tracking-[0.28em] text-[#e5a93c] uppercase">
            STAGE {currentData.step} OF 08 • {currentData.badge}
          </span>
        </div>

        {/* Huge Luxury Title */}
        <h1
          key={`title-${currentData.step}`}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#f5f2ec] uppercase drop-shadow-[0_4px_35px_rgba(0,0,0,0.98)] transition-all duration-500 ease-out animate-fade-in"
        >
          {currentData.title}
        </h1>

        {/* Subtitle with Gold Tint */}
        <p
          key={`sub-${currentData.step}`}
          className="mt-2 text-xs sm:text-sm md:text-base text-[#e5a93c] font-semibold tracking-[0.2em] uppercase drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)] max-w-2xl animate-fade-in"
        >
          {currentData.subtitle}
        </p>

        {/* Evocative Culinary Description */}
        <p
          key={`desc-${currentData.step}`}
          className="mt-2 text-xs md:text-sm text-white/70 max-w-xl font-light tracking-wide leading-relaxed drop-shadow-md hidden sm:block animate-fade-in"
        >
          {currentData.description}
        </p>
      </div>

      {/* ── RIGHT-SIDE STEP PROGRESSION DOTS (CLICKABLE TO JUMP DIRECTLY) ── */}
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3">
        {SEQUENCE_STEPS.map((s, i) => {
          const isCur = i === activeStep;
          return (
            <button
              key={s.step}
              onClick={() => goToStep(i)}
              className="group relative flex items-center justify-end p-1 transition-all focus:outline-none"
              aria-label={`Jump to stage ${s.step}: ${s.title}`}
            >
              {/* Tooltip on hover */}
              <span className="absolute right-7 text-[10px] font-mono tracking-widest text-[#e5a93c] uppercase opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap bg-black/90 px-2.5 py-1 rounded-md border border-[#e5a93c]/30 shadow-xl pointer-events-none translate-x-2 group-hover:translate-x-0">
                {s.step} • {s.badge}
              </span>

              {/* Progress Indicator Bar/Dot */}
              <div
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isCur
                    ? "w-2.5 h-9 bg-[#e5a93c] shadow-[0_0_18px_#e5a93c] scale-110"
                    : i < activeStep
                    ? "w-2 h-2 bg-[#e5a93c]/60 hover:bg-[#e5a93c]"
                    : "w-2 h-2 bg-white/20 hover:bg-white/50"
                }`}
              />
            </button>
          );
        })}
        <span className="text-[10px] font-mono font-bold text-[#e5a93c] tracking-widest mt-1">
          {currentData.step}/08
        </span>
      </div>

      {/* ── LEFT STEP CONTROLS (PREV / NEXT CHEVRONS) ── */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col gap-3">
        <button
          onClick={prevStep}
          disabled={activeStep === 0}
          className={`p-2.5 rounded-full border transition-all ${
            activeStep === 0
              ? "border-white/5 text-white/20 cursor-not-allowed"
              : "border-white/15 bg-black/40 text-white/80 hover:text-[#e5a93c] hover:border-[#e5a93c] hover:bg-black/80 hover:scale-110 shadow-lg"
          }`}
          aria-label="Previous Video Stage"
        >
          <ChevronUp size={18} />
        </button>

        <button
          onClick={nextStep}
          disabled={activeStep === SEQUENCE_STEPS.length - 1}
          className={`p-2.5 rounded-full border transition-all ${
            activeStep === SEQUENCE_STEPS.length - 1
              ? "border-white/5 text-white/20 cursor-not-allowed"
              : "border-white/15 bg-black/40 text-white/80 hover:text-[#e5a93c] hover:border-[#e5a93c] hover:bg-black/80 hover:scale-110 shadow-lg"
          }`}
          aria-label="Next Video Stage"
        >
          <ChevronDown size={18} />
        </button>
      </div>

      {/* ── BOTTOM HUD CONTROLS & FINAL PACKAGING BANNER ── */}
      <div className="absolute bottom-6 md:bottom-8 inset-x-0 px-6 md:px-12 flex items-center justify-between z-40 pointer-events-auto">
        {/* Left: Sound Toggle Button */}
        <button
          onClick={toggleSound}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 hover:border-[#e5a93c] text-white/80 hover:text-[#e5a93c] text-xs font-mono transition-all shadow-lg hover:scale-105"
          aria-label="Toggle Sound"
        >
          {isMuted ? (
            <VolumeX size={15} />
          ) : (
            <Volume2 size={15} className="text-[#e5a93c] animate-pulse" />
          )}
          <span className="text-[10px] tracking-wider uppercase hidden sm:inline font-semibold">
            {isMuted ? "Sound Off" : "Ambient Flame"}
          </span>
        </button>

        {/* Center: Scroll Cue for Steps 1-7 OR Final Packaging Order Banner for Step 8 */}
        {activeStep < 7 ? (
          <div className="flex flex-col items-center gap-1.5 text-center text-white/70 select-none">
            <span className="text-[10px] md:text-[11px] font-mono tracking-[0.3em] uppercase text-[#e5a93c] font-bold">
              Scroll Or Click To Advance • Step {currentData.step}/08
            </span>
            <div className="w-5 h-8 rounded-full border-2 border-[#e5a93c]/50 flex items-start justify-center p-1 shadow-[0_0_10px_rgba(229,169,60,0.2)]">
              <div className="w-1.5 h-2 rounded-full bg-[#e5a93c] animate-bounce" />
            </div>
          </div>
        ) : (
          /* Step 8 Final Packaging Ready Banner */
          <div className="flex items-center gap-3 bg-black/85 backdrop-blur-2xl border border-[#e5a93c]/60 p-2 sm:p-2.5 rounded-2xl shadow-[0_0_45px_rgba(229,169,60,0.35)] animate-fade-in">
            <button
              onClick={() => goToStep(0)}
              className="p-2.5 rounded-xl border border-white/20 text-white/70 hover:text-[#e5a93c] hover:border-[#e5a93c] transition-all"
              title="Replay from Step 01"
            >
              <RotateCcw size={15} />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#e5a93c] text-[#080706] font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-[#f6c268] transition-all shadow-[0_0_25px_rgba(229,169,60,0.5)] hover:scale-105"
            >
              <ShoppingBag size={15} />
              <span>Order Packed Burger</span>
            </button>
            <Link
              href="/menu"
              className="px-4 py-2.5 rounded-xl border border-white/20 hover:border-[#e5a93c] text-[#f5f2ec] font-semibold text-xs uppercase tracking-widest flex items-center gap-1.5 hover:bg-white/10 transition-all hidden sm:flex"
            >
              <span>Explore Menu</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* Right: Stage Counter & Quick Menu Link */}
        <div className="flex items-center gap-3">
          <Link
            href="/menu"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 hover:border-[#e5a93c] text-[11px] font-mono uppercase tracking-widest text-[#e5a93c] hover:text-white transition-all shadow-lg"
          >
            <span>Full Menu</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
