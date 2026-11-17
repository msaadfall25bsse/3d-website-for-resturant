"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  Volume2,
  VolumeX,
  ArrowRight,
  ShoppingBag,
  RotateCcw,
  ArrowDown,
} from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { useStageFrames } from "./useStageFrames";

gsap.registerPlugin(ScrollTrigger);

interface MicroSpec {
  label: string;
  val: string;
}

interface SceneItem {
  id: string;
  stageNum: number;
  stepNum: string;
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  description: string;
  posterSrc: string;
  specs: MicroSpec[];
  alignment: "left" | "right" | "center";
  accentColor: string;
}

const SCENES: SceneItem[] = [
  {
    id: "stage-01",
    stageNum: 1,
    stepNum: "01",
    badge: "Open-Fire Sear",
    title: "BINCHOTAN CHARCOAL",
    titleHighlight: "SEAR.",
    subtitle: "650°C Kishu White Oak • Sizzling A5 Japanese Wagyu",
    description:
      "Hand-ground A5 BMS 11 Wagyu patty kisses red-hot cast iron over glowing Kishu binchotan coals, rendering dense intramuscular marbling into pure savory nectar.",
    posterSrc: "/thumbnails/step_1.jpg",
    specs: [
      { label: "Binchotan Heat", val: "650°C White Oak" },
      { label: "Wagyu Cut", val: "A5 BMS 11 Chuck" },
      { label: "Sear Time", val: "90 Seconds Flat" },
    ],
    alignment: "left",
    accentColor: "#ff5722",
  },
  {
    id: "stage-02",
    stageNum: 2,
    stepNum: "02",
    badge: "Caramelization",
    title: "THE ROARING",
    titleHighlight: "FLAME.",
    subtitle: "Rendered Marbling • Deep Mahogany Crust Forming",
    description:
      "Intense open flame ignites rendering wagyu fat, creating the quintessential Maillard reaction and locking juiciness within a glass-crisp mahogany bark.",
    posterSrc: "/thumbnails/step_2.jpg",
    specs: [
      { label: "Maillard Temp", val: "180°C Caramel" },
      { label: "Bark Contrast", val: "Deep Mahogany" },
      { label: "Internal Core", val: "54°C Medium-Rare" },
    ],
    alignment: "right",
    accentColor: "#ff7700",
  },
  {
    id: "stage-03",
    stageNum: 3,
    stepNum: "03",
    badge: "Haute Drizzle",
    title: "PÉRIGORD BLACK",
    titleHighlight: "TRUFFLE JUS.",
    subtitle: "Black Winter Truffle • Roasted Bone Marrow Reduction",
    description:
      "A silver culinary spoon releases an 18-hour reduction of black winter diamonds, roasted marrow jus, and 12-year Modena balsamic in a velvety spiral drizzle.",
    posterSrc: "/thumbnails/step_3.jpg",
    specs: [
      { label: "Truffle Origin", val: "Périgord, France" },
      { label: "Reduction", val: "18-Hour Simmer" },
      { label: "Viscosity", val: "Silk Velvet Glaze" },
    ],
    alignment: "left",
    accentColor: "#e5a93c",
  },
  {
    id: "stage-04",
    stageNum: 4,
    stepNum: "04",
    badge: "Alpine Dairy Craft",
    title: "MOLTEN CAVE-AGED",
    titleHighlight: "GRUYÈRE.",
    subtitle: "24-Month Cave Reserve • Torch-Blistered Velvety Fondue",
    description:
      "Thick cuts of raw-milk Swiss Gruyère cascade luxuriously over the seared patty, blistering into amber bubbles under open flame to release toasted-nut umami.",
    posterSrc: "/thumbnails/step_4.jpg",
    specs: [
      { label: "Aged Period", val: "24-Month Cave" },
      { label: "Melt Point", val: "72°C Molten" },
      { label: "Canton Origin", val: "Fribourg, Swiss" },
    ],
    alignment: "right",
    accentColor: "#f3b134",
  },
  {
    id: "stage-05",
    stageNum: 5,
    stepNum: "05",
    badge: "Zero-Gravity View",
    title: "EXPLODED ZERO-GRAVITY",
    titleHighlight: "ARCHITECTURE.",
    subtitle: "All 7 Artisanal Layers Suspended in Mid-Air Equilibrium",
    description:
      "Every single ingredient suspends in mid-air with millimeter precision: toasted cushion, wagyu patty, molten Gruyère, smoked tomato, frisée, truffle jus, and brioche crown.",
    posterSrc: "/thumbnails/step_5.jpg",
    specs: [
      { label: "Layer Count", val: "7 Separated Tiers" },
      { label: "Perspective", val: "True 3D Exploded" },
      { label: "Equilibrium", val: "Zero-Gravity Hold" },
    ],
    alignment: "left",
    accentColor: "#4a7c26",
  },
  {
    id: "stage-06",
    stageNum: 6,
    stepNum: "06",
    badge: "The Royal Crown",
    title: "THE WAGYU ICON &",
    titleHighlight: "BRIOCHE CROWN.",
    subtitle: "Gold-Leaf Glazed Brioche • Chiaroscuro Studio Radiance",
    description:
      "The golden Hokkaido milk brioche crown descends gracefully, double-toasted with clarified wagyu tallow and kissed by edible 24K gold leaf.",
    posterSrc: "/thumbnails/step_6.jpg",
    specs: [
      { label: "Brioche Rise", val: "36-Hour Sourdough" },
      { label: "Glaze Finish", val: "24K Edible Gold" },
      { label: "Weight", val: "380g Completed" },
    ],
    alignment: "center",
    accentColor: "#f5c46b",
  },
  {
    id: "stage-07",
    stageNum: 7,
    stepNum: "07",
    badge: "Harmonic Lock",
    title: "THE REASSEMBLY",
    titleHighlight: "LOCK.",
    subtitle: "All 7 Culinary Elements Harmonize into One Unified Masterpiece",
    description:
      "Fluid magnetic culinary physics: all floating layers compress and lock together with a succulent, juicy bounce, sending a micro-puff of aromatic steam outward.",
    posterSrc: "/thumbnails/step_7.jpg",
    specs: [
      { label: "Structure", val: "Seamless Fusion" },
      { label: "Sealing Layer", val: "Marrow Cushion" },
      { label: "Mouthfeel", val: "Crisp & Melt Texture" },
    ],
    alignment: "right",
    accentColor: "#e5a93c",
  },
  {
    id: "stage-08",
    stageNum: 8,
    stepNum: "08",
    badge: "Delivery Prestige",
    title: "OCTAGONAL PACKAGING",
    titleHighlight: "SEALED.",
    subtitle: "Matte Black Vault • Thermal Gold Velvet • Ready to Serve",
    description:
      "The assembled burger docks into our bespoke matte black octagonal presentation vault. The magnetic lid softly closes with gold-foil seals, locking core warmth at 65°C.",
    posterSrc: "/thumbnails/step_8.jpg",
    specs: [
      { label: "Case Vault", val: "Matte Octagonal" },
      { label: "Cradle", val: "Thermal Gold Velvet" },
      { label: "Heat Retention", val: "45 Mins at 60°C" },
    ],
    alignment: "center",
    accentColor: "#e5a93c",
  },
];

// Single Pinned Stage Section with Canvas Frame Scrubber
function StageSection({
  scene,
  index,
  onInView,
}: {
  scene: SceneItem;
  index: number;
  onInView: (idx: number) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);

  const { isReady, draw } = useStageFrames(scene.stageNum, 60);

  // Resize canvas to match display size exactly
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
    }
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // Initial draw when ready
  useEffect(() => {
    if (isReady && canvasRef.current) {
      draw(canvasRef.current, progress);
    }
  }, [isReady, progress, draw]);

  // ScrollTrigger Setup
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    let currentProgress = 0;
    let targetProgress = 0;
    let animId = 0;

    // Smooth render loop (lerp interpolation)
    const renderLoop = () => {
      currentProgress += (targetProgress - currentProgress) * 0.22;
      draw(canvas, currentProgress);
      animId = requestAnimationFrame(renderLoop);
    };
    animId = requestAnimationFrame(renderLoop);

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.2, // Buttery smooth response to scroll wheel & touch
      onEnter: () => onInView(index),
      onEnterBack: () => onInView(index),
      onUpdate: (self) => {
        targetProgress = self.progress;
        setProgress(self.progress);
      },
    });

    return () => {
      cancelAnimationFrame(animId);
      trigger.kill();
    };
  }, [index, onInView, draw]);

  const isCenter = scene.alignment === "center";
  const isRight = scene.alignment === "right";

  // Typography transitions: enters at start, stays stable, fades out gracefully near stage exit
  const textOpacity =
    progress < 0.1
      ? Math.max(0, progress / 0.1)
      : progress > 0.88
      ? Math.max(0, (1 - progress) / 0.12)
      : 1;

  const textTranslateY =
    progress < 0.1
      ? (1 - textOpacity) * 24
      : progress > 0.88
      ? -((1 - textOpacity) * 20)
      : 0;

  return (
    <section
      ref={sectionRef}
      id={scene.id}
      className="relative w-full bg-[#080706]"
      style={{
        // 300vh track height: gives ample, comfortable scroll space for smooth 60-frame playback
        height: "300vh",
      }}
    >
      {/* ── PINNED FULL-SCREEN VIEWPORT ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#080706] select-none">
        {/* Full-Screen Canvas Scrubbed Frame Animation */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.92] contrast-[1.05]"
        />

        {/* Cinematic Radial Vignette & Contrast Overlays */}
        <div className="absolute inset-0 pointer-events-none vignette-radial" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-transparent to-[#080706]/75 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />

        {/* Ambient Color Aura Glow */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[130px] pointer-events-none opacity-20"
          style={{ backgroundColor: scene.accentColor }}
        />

        {/* Synchronized Typography Overlay */}
        <div
          className={`absolute z-30 pointer-events-none transition-all duration-150 ease-out will-change-transform ${
            isCenter
              ? "top-20 sm:top-24 inset-x-0 mx-auto px-6 max-w-4xl text-center flex flex-col items-center"
              : isRight
              ? "top-1/2 -translate-y-1/2 right-6 sm:right-16 md:right-24 max-w-lg md:max-w-xl text-left"
              : "top-1/2 -translate-y-1/2 left-6 sm:left-16 md:left-24 max-w-lg md:max-w-xl text-left"
          }`}
          style={{
            opacity: textOpacity,
            transform: isCenter
              ? `translateY(${textTranslateY}px)`
              : `translateY(calc(-50% + ${textTranslateY}px))`,
          }}
        >
          <div
            className={`${
              !isCenter
                ? "glass-panel-glow p-6 sm:p-8 md:p-10 rounded-3xl border border-[#e5a93c]/25 shadow-[0_0_50px_rgba(0,0,0,0.85)]"
                : ""
            }`}
          >
            {/* Stage Badge with Pulsing Gold Dot */}
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

            {/* Main Headline */}
            <h2
              className={`font-black tracking-tight text-[#f5f2ec] leading-[1.04] uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] ${
                isCenter
                  ? "text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
                  : "text-2xl sm:text-4xl md:text-5xl"
              }`}
            >
              {scene.title}{" "}
              <span className="text-[#e5a93c] text-gold-glow block sm:inline">
                {scene.titleHighlight}
              </span>
            </h2>

            {/* Subtitle */}
            <p className="mt-2 text-xs sm:text-sm font-semibold tracking-[0.18em] text-[#e5a93c] uppercase drop-shadow-md">
              {scene.subtitle}
            </p>

            {/* Culinary Description */}
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
                <span>Scroll with mouse wheel or touch to advance video</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Master Scroller coordinating all 8 sequential pinned sections
export default function CinematicJourneyScroller() {
  const [activeStage, setActiveStage] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const { setIsCartOpen } = useCart();

  // Ambient kitchen sizzle/ember sound generator
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
      gainNodeRef.current.gain.setTargetAtTime(0.08, audioContextRef.current.currentTime, 0.3);
      setIsMuted(false);
    } else {
      gainNodeRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.3);
      setIsMuted(true);
    }
  };

  // Smooth scroll to specific section
  const scrollToStage = useCallback((index: number) => {
    const el = document.getElementById(SCENES[index].id);
    if (!el) return;

    const winWithLenis = window as unknown as { lenis?: { scrollTo: (target: HTMLElement | number) => void } };
    if (winWithLenis.lenis && typeof winWithLenis.lenis.scrollTo === "function") {
      winWithLenis.lenis.scrollTo(el);
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleInView = useCallback((index: number) => {
    setActiveStage(index);
  }, []);

  return (
    <div className="relative w-full bg-[#080706]">
      {/* ── TOP SLIM GOLD PROGRESS BAR ── */}
      <div className="fixed top-0 inset-x-0 h-[3px] bg-white/10 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#e5a93c] via-[#f5c46b] to-[#e5a93c] transition-all duration-300 ease-out shadow-[0_0_12px_#e5a93c]"
          style={{ width: `${((activeStage + 1) / SCENES.length) * 100}%` }}
        />
      </div>

      {/* ── ALL 8 PINNED SECTIONS IN SEQUENTIAL SCROLL ── */}
      {SCENES.map((scene, idx) => (
        <StageSection
          key={scene.id}
          scene={scene}
          index={idx}
          onInView={handleInView}
        />
      ))}

      {/* ── RIGHT-SIDE STAGE TRACKER (CLICK TO JUMP) ── */}
      <div className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3">
        {SCENES.map((s, i) => {
          const isCur = i === activeStage;
          const isPast = i < activeStage;

          return (
            <button
              key={s.id}
              onClick={() => scrollToStage(i)}
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

              {/* Progress Indicator Dot */}
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
        <span className="text-[10px] font-mono font-bold text-[#e5a93c] tracking-widest mt-1">
          {SCENES[activeStage].stepNum}/08
        </span>
      </div>

      {/* ── FLOATING BOTTOM HUD CONTROLS ── */}
      <div className="fixed bottom-6 sm:bottom-8 inset-x-0 px-6 sm:px-12 flex items-center justify-between z-40 pointer-events-auto">
        {/* Left: Sound Toggle */}
        <button
          onClick={toggleSound}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 hover:border-[#e5a93c] text-white/80 hover:text-[#e5a93c] text-xs font-mono transition-all shadow-lg hover:scale-105 cursor-pointer"
          aria-label="Toggle Sound"
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-[#e5a93c] animate-pulse" />}
          <span className="text-[10px] tracking-wider uppercase hidden sm:inline font-semibold">
            {isMuted ? "Sound Off" : "Ambient Ember"}
          </span>
        </button>

        {/* Center: Scroll Cue OR Stage 08 Finale Ordering Banner */}
        {activeStage < 7 ? (
          <div className="flex flex-col items-center gap-1.5 text-center text-white/70 select-none pointer-events-none">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.28em] uppercase text-[#e5a93c] font-bold">
              Scroll To Craft • Stage {SCENES[activeStage].stepNum} / 08
            </span>
            <div className="w-5 h-8 rounded-full border-2 border-[#e5a93c]/50 flex items-start justify-center p-1 shadow-[0_0_10px_rgba(229,169,60,0.2)]">
              <div className="w-1.5 h-2 rounded-full bg-[#e5a93c] animate-bounce" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 bg-black/85 backdrop-blur-2xl border border-[#e5a93c]/60 p-2 sm:p-2.5 rounded-2xl shadow-[0_0_45px_rgba(229,169,60,0.35)] animate-fade-in pointer-events-auto">
            <button
              onClick={() => scrollToStage(0)}
              className="p-2.5 rounded-xl border border-white/20 text-white/70 hover:text-[#e5a93c] hover:border-[#e5a93c] transition-all cursor-pointer"
              title="Replay from Stage 01"
            >
              <RotateCcw size={15} />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#e5a93c] text-[#080706] font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-[#f6c268] transition-all shadow-[0_0_25px_rgba(229,169,60,0.5)] hover:scale-105 cursor-pointer"
            >
              <ShoppingBag size={15} />
              <span>Order Packed Icon</span>
            </button>
            <Link
              href="/menu"
              className="px-4 py-2.5 rounded-xl border border-white/20 hover:border-[#e5a93c] text-[#f5f2ec] font-semibold text-xs uppercase tracking-widest flex items-center gap-1.5 hover:bg-white/10 transition-all hidden sm:flex cursor-pointer"
            >
              <span>Explore Menu</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* Right: Full Menu Quick Link */}
        <Link
          href="/menu"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 hover:border-[#e5a93c] text-[11px] font-mono uppercase tracking-widest text-[#e5a93c] hover:text-white transition-all shadow-lg cursor-pointer"
        >
          <span>Full Menu</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
