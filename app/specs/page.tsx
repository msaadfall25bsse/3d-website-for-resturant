"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ShieldCheck, Thermometer, Flame, Clock, Award, Sparkles, ArrowRight } from "lucide-react";

export default function SpecsPage() {
  const specs = [
    {
      category: "WAGYU BEEF PROFILE",
      icon: Award,
      items: [
        { label: "Cattle Pedigree", val: "100% Full-Blood Kuroge Washu (Japanese Black)" },
        { label: "Origin & Farm", val: "Miyazaki Prefecture, Kyushu, Japan" },
        { label: "Marbling Grade", val: "Certified A5, BMS 10-12 (Highest Japanese Score)" },
        { label: "Fat Melting Point", val: "25°C (Melt-in-mouth body warmth rendering)" },
        { label: "Dry Aging Protocol", val: "45 Days Himalayan Pink Salt Cellar (0-2°C, 80% RH)" },
        { label: "Grind & Cut", val: "Coarse 8mm artisanal double grind of short-rib & brisket" },
      ],
    },
    {
      category: "FIRE & THERMAL PRECISION",
      icon: Flame,
      items: [
        { label: "Fuel Source", val: "Pure Kishu Binchotan (Ancient Japanese Holm Oak)" },
        { label: "Hearth Surface Temp", val: "650°C (1,202°F) ultra-high radiant infrared heat" },
        { label: "Sear Duration", val: "Precisely 90 seconds per side on ribbed cast iron" },
        { label: "Internal Serving Temp", val: "54°C (129°F) medium-rare resting equilibrium" },
        { label: "Crust Chemistry", val: "Maillard caramelization without charring bitterness" },
      ],
    },
    {
      category: "BOTANICALS & DAIRY CRAFT",
      icon: Sparkles,
      items: [
        { label: "Gruyère Reserve", val: "24-Month Cave Reserve, Canton of Fribourg, Switzerland" },
        { label: "Truffle Spec", val: "Périgord Winter Black Diamonds (Tuber melanosporum)" },
        { label: "Brioche Levain", val: "36-Hour wild sourdough fermentation, Normandy butter" },
        { label: "Heirloom Tomatoes", val: "San Marzano Campanian vines, flame-charred skin" },
        { label: "Artisanal Sea Salt", val: "Maldon hand-harvested pyramidal salt crystals" },
      ],
    },
    {
      category: "PACKAGING & THERMAL STABILITY",
      icon: ShieldCheck,
      items: [
        { label: "Box Construction", val: "Bespoke matte black 8-sided rigid paperboard" },
        { label: "Interior Cradle", val: "Gold thermal food-grade velvet cushion" },
        { label: "Thermal Retention", val: "Maintains >55°C core warmth for up to 45 minutes" },
        { label: "Steam Vents", val: "Micro-perforated chimneys prevent bun sogginess" },
        { label: "Tamper Proofing", val: "Embossed metallic gold foil security seal" },
      ],
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#080706] text-[#f5f2ec] overflow-x-hidden pt-28 pb-16">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#e5a93c]/30 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#e5a93c] animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#e5a93c] uppercase">
              Culinary Laboratory
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#f5f2ec] uppercase">
            PURITY &amp; <span className="text-[#e5a93c] text-gold-glow">SPECIFICATIONS.</span>
          </h1>

          <p className="mt-6 text-sm md:text-base text-white/60 leading-relaxed font-light">
            Every element of the NOIR &amp; EMBER experience is calibrated to scientific precision — from molecular fat melting curves to radiant infrared ember temperatures.
          </p>
        </div>

        {/* 4 Technical Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {specs.map((group, idx) => {
            const Icon = group.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl bg-[#0f0d0b] border border-[#e5a93c]/20 p-8 md:p-10 shadow-2xl relative overflow-hidden group hover:border-[#e5a93c]/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                  <div className="p-2.5 rounded-xl bg-[#e5a93c]/10 text-[#e5a93c]">
                    <Icon size={20} />
                  </div>
                  <h2 className="text-sm md:text-base font-bold font-mono tracking-widest text-[#f5f2ec] uppercase">
                    {group.category}
                  </h2>
                </div>

                <div className="space-y-4">
                  {group.items.map((row, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 py-2 border-b border-white/5 last:border-b-0 text-xs"
                    >
                      <span className="text-white/40 uppercase tracking-wider font-mono text-[11px]">
                        {row.label}
                      </span>
                      <span className="text-[#f5f2ec] font-semibold text-right sm:max-w-xs">
                        {row.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="rounded-3xl bg-gradient-to-r from-[#171410] via-[#1c1712] to-[#171410] border border-[#e5a93c]/40 p-10 md:p-14 text-center relative overflow-hidden shadow-[0_0_60px_rgba(229,169,60,0.15)]">
          <div className="max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.35em] text-[#e5a93c] font-semibold block mb-3">
              Taste The Precision
            </span>
            <h3 className="text-3xl md:text-5xl font-extrabold text-[#f5f2ec] tracking-tight">
              EXPERIENCE THE OBSESSION.
            </h3>
            <p className="mt-4 text-xs md:text-sm text-white/60 font-light leading-relaxed">
              Experience the harmony of 650°C Kishu Binchotan sear and Miyazaki A5 Wagyu at your table or delivered in bespoke thermal packaging.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/menu"
                className="px-8 py-3.5 rounded-full bg-[#e5a93c] text-[#080706] font-bold text-xs uppercase tracking-widest hover:bg-[#f6c268] transition-all shadow-[0_0_25px_rgba(229,169,60,0.4)] flex items-center gap-2"
              >
                <span>Explore Full Menu</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/"
                className="px-6 py-3.5 rounded-full border border-white/20 text-[#f5f2ec] hover:border-[#e5a93c] font-semibold text-xs uppercase tracking-widest transition-all"
              >
                Replay 3D Journey
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
