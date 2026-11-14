"use client";

import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShoppingBag,
  RotateCcw,
} from "lucide-react";
import { useCart } from "@/components/cart/CartContext";

interface SceneNavigationProps {
  activeIndex: number;
  totalScenes: number;
  onPrevScene: () => void;
  onNextScene: () => void;
  onReplay: () => void;
}

export default function SceneNavigation({
  activeIndex,
  totalScenes,
  onPrevScene,
  onNextScene,
  onReplay,
}: SceneNavigationProps) {
  const [isMuted, setIsMuted] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const { setIsCartOpen } = useCart();

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

  const isLastScene = activeIndex === totalScenes - 1;

  return (
    <div className="fixed bottom-6 sm:bottom-8 inset-x-0 px-6 sm:px-12 flex items-center justify-between z-40 pointer-events-auto">
      {/* ── LEFT: SOUND TOGGLE & PREV/NEXT CHEVRONS ── */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSound}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 hover:border-[#e5a93c] text-white/80 hover:text-[#e5a93c] text-xs font-mono transition-all shadow-lg hover:scale-105 cursor-pointer"
          aria-label="Toggle Sound"
        >
          {isMuted ? (
            <VolumeX size={15} />
          ) : (
            <Volume2 size={15} className="text-[#e5a93c] animate-pulse" />
          )}
          <span className="text-[10px] tracking-wider uppercase hidden sm:inline font-semibold">
            {isMuted ? "Sound Off" : "Ambient Ember"}
          </span>
        </button>

        {/* Prev / Next Chevrons on Tablet / Desktop */}
        <div className="hidden sm:flex items-center gap-1.5 bg-black/50 backdrop-blur-md rounded-full border border-white/10 p-1">
          <button
            onClick={onPrevScene}
            disabled={activeIndex === 0}
            className={`p-1.5 rounded-full transition-all ${
              activeIndex === 0
                ? "text-white/20 cursor-not-allowed"
                : "text-white/80 hover:text-[#e5a93c] hover:bg-white/10 cursor-pointer"
            }`}
            aria-label="Previous Stage"
          >
            <ChevronUp size={16} />
          </button>
          <button
            onClick={onNextScene}
            disabled={isLastScene}
            className={`p-1.5 rounded-full transition-all ${
              isLastScene
                ? "text-white/20 cursor-not-allowed"
                : "text-white/80 hover:text-[#e5a93c] hover:bg-white/10 cursor-pointer"
            }`}
            aria-label="Next Stage"
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* ── CENTER: SCROLL CUE OR SCENE 08 FINALE CTA ── */}
      {!isLastScene ? (
        <div className="flex flex-col items-center gap-1.5 text-center text-white/70 select-none pointer-events-none">
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.28em] uppercase text-[#e5a93c] font-bold">
            Scroll To Craft • Stage {String(activeIndex + 1).padStart(2, "0")} / 08
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-[#e5a93c]/50 flex items-start justify-center p-1 shadow-[0_0_10px_rgba(229,169,60,0.2)]">
            <div className="w-1.5 h-2 rounded-full bg-[#e5a93c] animate-bounce" />
          </div>
        </div>
      ) : (
        /* Scene 08 Finale Ordering Banner */
        <div className="flex items-center gap-3 bg-black/85 backdrop-blur-2xl border border-[#e5a93c]/60 p-2 sm:p-2.5 rounded-2xl shadow-[0_0_45px_rgba(229,169,60,0.35)] animate-fade-in pointer-events-auto">
          <button
            onClick={onReplay}
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

      {/* ── RIGHT: FULL MENU QUICK LINK ── */}
      <div className="flex items-center gap-3">
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
