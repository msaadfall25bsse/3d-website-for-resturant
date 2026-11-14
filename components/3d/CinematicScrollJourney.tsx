"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flame, Clock, Award, ShieldCheck, ArrowDown, ShoppingBag } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface StepConfig {
  id: string;
  stepNum: string;
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  description: string;
  videoSrc: string;
  specs: { label: string; val: string }[];
}

const STEPS: StepConfig[] = [
  {
    id: "step-01",
    stepNum: "01",
    badge: "The Vision & Lineage",
    title: "CRAFTED TO",
    titleHighlight: "PERFECTION.",
    subtitle: "Artisanal Haute-Burger Studio",
    description:
      "Our signature Wagyu creation hovers in pure chiaroscuro studio space. 45-day dry-aged beef, cave reserve cheese, and slow-fermented brioche.",
    videoSrc: "/videos/video-01-scrub.mp4",
    specs: [
      { label: "Provenance", val: "Miyazaki, Japan" },
      { label: "Fermentation", val: "36-Hour Sourdough" },
      { label: "Serving State", val: "Weightless Core" },
    ],
  },
  {
    id: "step-02",
    stepNum: "02",
    badge: "Open Fire Mastery",
    title: "650°C KISHU",
    titleHighlight: "BINCHOTAN.",
    subtitle: "Flame Sear & Sear Crust",
    description:
      "The thick 220g A5 Wagyu patty hits smoking cast iron over glowing white oak coals. Rendered marbling fat ignites brief licking flames, sealing a caramelized mahogany crust.",
    videoSrc: "/videos/video-03-scrub.mp4",
    specs: [
      { label: "Charcoal Heat", val: "650°C White Oak" },
      { label: "Portion", val: "220g Master Cut" },
      { label: "Sear Duration", val: "90 Seconds Flat" },
    ],
  },
  {
    id: "step-03",
    stepNum: "03",
    badge: "Alpine Dairy Craft",
    title: "MOLTEN CAVE-AGED",
    titleHighlight: "GRUYÈRE.",
    subtitle: "24-Month Cave Reserve",
    description:
      "A thick cut of raw-milk Gruyère cascades over the sizzling crust. Blistering into delicate amber bubbles under open torch flame, releasing rich toasted-nut umami.",
    videoSrc: "/videos/video-04-scrub.mp4",
    specs: [
      { label: "Aging", val: "24-Month Reserve" },
      { label: "Caves", val: "Fribourg, Switzerland" },
      { label: "Melt Point", val: "72°C Molten Texture" },
    ],
  },
  {
    id: "step-04",
    stepNum: "04",
    badge: "The Signature Emulsion",
    title: "PÉRIGORD BLACK",
    titleHighlight: "TRUFFLE JUS.",
    subtitle: "The Chef's Drizzle",
    description:
      "A silver spoon releases an 18-hour reduction of black winter diamonds, roasted marrow jus, and 12-year Modena balsamic in velvety spiral ribbons across the frisée.",
    videoSrc: "/videos/video-05-scrub.mp4",
    specs: [
      { label: "Truffle", val: "Périgord Winter Black" },
      { label: "Jus", val: "Roasted Bone Marrow" },
      { label: "Acidity", val: "12-Year Modena Balsamic" },
    ],
  },
  {
    id: "step-05",
    stepNum: "05",
    badge: "Harmonic Lock",
    title: "REASSEMBLED AS",
    titleHighlight: "ONE.",
    subtitle: "Magnetic Assembly",
    description:
      "Brioche crown, truffle drizzle, crisp frisée, charred tomato, molten Gruyère, seared Wagyu, and toasted cushion descend and lock together with a succulent, juicy bounce.",
    videoSrc: "/videos/video-06-scrub.mp4",
    specs: [
      { label: "Structure", val: "7 Unified Elements" },
      { label: "Sealing", val: "Marrow Cushion" },
      { label: "Internal Temp", val: "54°C Medium-Rare" },
    ],
  },
  {
    id: "step-06",
    stepNum: "06",
    badge: "The Anatomy",
    title: "THE ARCHITECTURE OF",
    titleHighlight: "FLAVOR.",
    subtitle: "Zero-Gravity Deconstruction",
    description:
      "Clean exploded view in zero-gravity space. Every ingredient suspends in mid-air with millimeter precision, showcasing the pure structural equilibrium of the recipe.",
    videoSrc: "/videos/video-02-scrub.mp4",
    specs: [
      { label: "View", val: "7-Layer Explosion" },
      { label: "Equilibrium", val: "Zero-Gravity Hold" },
      { label: "Separation", val: "Symmetrical Air Gaps" },
    ],
  },
  {
    id: "step-07",
    stepNum: "07",
    badge: "Delivery Prestige",
    title: "THE LUXURY",
    titleHighlight: "UNBOXING.",
    subtitle: "Engineered Packaging",
    description:
      "The bespoke matte black octagonal box glides open on magnetic hinges. The hot burger docks into the gold-lined velvet cradle, and the lid smoothly folds shut with gold-foil seals.",
    videoSrc: "/videos/video-07-scrub.mp4",
    specs: [
      { label: "Architecture", val: "Matte Black Octagonal" },
      { label: "Interior", val: "Gold Thermal Velvet" },
      { label: "Heat Retention", val: "45 Minutes at 55°C" },
    ],
  },
  {
    id: "step-08",
    stepNum: "08",
    badge: "Atelier Experience",
    title: "THE DINING",
    titleHighlight: "FEAST.",
    subtitle: "Michelin-Grade Gastronomy",
    description:
      "A high-octane montage of roaring flame, crystal cellar wine pouring, tweezers micro-precision, and candlelit gastronomic joy. Welcome to NOIR & EMBER.",
    videoSrc: "/videos/video-08-scrub.mp4",
    specs: [
      { label: "Atmosphere", val: "Candlelit Obsidian" },
      { label: "Pairing", val: "Sommelier Bordeaux" },
      { label: "Service", val: "Private Atelier Dining" },
    ],
  },
];

function StepSection({ step }: { step: StepConfig }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    // Ensure video is paused and ready
    video.pause();

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
      onUpdate: (self) => {
        if (!video.duration || isNaN(video.duration)) return;
        const targetTime = self.progress * video.duration;
        if (Math.abs(video.currentTime - targetTime) > 0.04) {
          video.currentTime = targetTime;
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={step.id}
      className="relative h-[250vh] w-full bg-[#080706]"
    >
      {/* Pinned Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#080706]">
        {/* Background Scrub Video */}
        <video
          ref={videoRef}
          src={step.videoSrc}
          playsInline
          muted
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Cinematic Vignettes and Contrast Layers */}
        <div className="absolute inset-0 pointer-events-none vignette-radial" />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-[#080706] to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#080706] to-transparent pointer-events-none z-10" />

        {/* Floating Story Card */}
        <div
          ref={cardRef}
          className="relative z-20 max-w-xl mx-6 md:mx-16 p-8 md:p-10 rounded-3xl glass-panel-glow border border-[#e5a93c]/25 text-[#f5f2ec] shadow-[0_0_50px_rgba(0,0,0,0.85)] self-center ml-6 md:ml-20"
        >
          {/* Step Number & Badge */}
          <div className="flex items-center justify-between border-b border-[#e5a93c]/20 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#e5a93c]">
                STEP {step.stepNum} OF 08
              </span>
              <span className="text-white/30">•</span>
              <span className="text-[11px] uppercase tracking-wider text-[#e5a93c] font-semibold">
                {step.badge}
              </span>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-[#e5a93c] animate-ping" />
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#f5f2ec] mt-4 leading-tight">
            {step.title} <span className="text-[#e5a93c] text-gold-glow">{step.titleHighlight}</span>
          </h2>
          <p className="text-xs text-[#e5a93c] font-semibold tracking-wider uppercase mt-1">
            {step.subtitle}
          </p>

          {/* Description */}
          <p className="mt-4 text-xs md:text-sm text-[#f5f2ec]/75 font-light leading-relaxed">
            {step.description}
          </p>

          {/* Culinary Micro-Specs */}
          <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-3 gap-3 text-[11px]">
            {step.specs.map((s, idx) => (
              <div key={idx}>
                <span className="text-[10px] text-white/40 uppercase tracking-widest block font-medium">
                  {s.label}
                </span>
                <span className="text-[#f5f2ec] font-semibold mt-0.5 block leading-tight">
                  {s.val}
                </span>
              </div>
            ))}
          </div>

          {/* Scroll Cue in First Section */}
          {step.stepNum === "01" && (
            <div className="mt-8 flex items-center gap-2 text-[#e5a93c] text-xs font-medium tracking-widest uppercase animate-pulse">
              <ArrowDown size={14} />
              <span>Scroll to control the culinary journey</span>
            </div>
          )}
        </div>

        {/* Global Progress Track on Right */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3 z-30 pointer-events-none">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className={`text-[9px] uppercase tracking-widest font-mono transition-all ${
                  s.stepNum === step.stepNum
                    ? "text-[#e5a93c] font-bold opacity-100"
                    : "text-white/20 opacity-0"
                }`}
              >
                {s.titleHighlight}
              </span>
              <div
                className={`w-1.5 rounded-full transition-all duration-300 ${
                  s.stepNum === step.stepNum
                    ? "h-8 bg-[#e5a93c] shadow-[0_0_12px_#e5a93c]"
                    : "h-1.5 bg-white/20"
                }`}
              />
            </div>
          ))}
          <span className="text-[10px] text-[#e5a93c] font-mono tracking-widest mt-1">
            {step.stepNum}/08
          </span>
        </div>
      </div>
    </section>
  );
}

export default function CinematicScrollJourney() {
  return (
    <div className="relative w-full">
      {STEPS.map((step) => (
        <StepSection key={step.id} step={step} />
      ))}
    </div>
  );
}
