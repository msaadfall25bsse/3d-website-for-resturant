"use client";

import React from "react";
import Link from "next/link";
import { BRAND_NAME } from "@/lib/data";
import { Award, ArrowRight, Sparkles } from "lucide-react";

export default function BrandStorySection() {
  return (
    <div id="brand-story" className="relative bg-[#080706] text-[#f5f2ec] overflow-hidden">
      {/* ── 1. MANIFESTO ── */}
      <section className="py-32 px-6 text-center max-w-5xl mx-auto">
        <span className="text-xs uppercase tracking-[0.4em] text-[#e5a93c] font-semibold block mb-4">
          The Manifesto
        </span>
        <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] text-[#f5f2ec]">
          TRUE LUXURY IS <br />
          <span className="text-[#e5a93c] text-gold-glow">TIME, FIRE & OBSESSION.</span>
        </h2>
        <p className="mt-8 text-sm md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed font-light">
          We reject the ordinary. In our kitchen, every cut of beef is aged to peak enzymatic richness, every tomato is flame-seared over white oak, and every bun is baked from slow-fermented French brioche dough.
        </p>
      </section>

      {/* ── 2. ORIGIN & WHY (SPLIT LAYOUT WITH REAL PHOTO) ── */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.35em] text-[#e5a93c] font-semibold block mb-3">
              Origins & Lineage
            </span>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-[#f5f2ec] leading-tight">
              FROM TOKYO HEARTHS TO MODERN GASTRONOMY.
            </h3>
            <p className="mt-6 text-sm text-white/70 leading-relaxed font-light">
              Founded by Michelin-trained culinary architects, NOIR & EMBER was born from a singular question: What happens when the relentless precision of Japanese Wagyu craft is applied to the quintessential burger?
            </p>
            <p className="mt-4 text-sm text-white/70 leading-relaxed font-light">
              We travel directly to Miyazaki Prefecture to hand-select cattle fed on pure spring water and beer grain, ensuring each ounce yields an unmatched melt-in-your-mouth richness.
            </p>

            <div className="mt-8 flex items-center gap-6">
              <div>
                <span className="text-2xl font-bold font-mono text-[#e5a93c]">A5</span>
                <span className="text-[10px] uppercase tracking-widest text-white/40 block mt-0.5">Certified Wagyu</span>
              </div>
              <div className="w-[1px] h-10 bg-white/10" />
              <div>
                <span className="text-2xl font-bold font-mono text-[#e5a93c]">45D</span>
                <span className="text-[10px] uppercase tracking-widest text-white/40 block mt-0.5">Dry-Aged Room</span>
              </div>
              <div className="w-[1px] h-10 bg-white/10" />
              <div>
                <span className="text-2xl font-bold font-mono text-[#e5a93c]">650°C</span>
                <span className="text-[10px] uppercase tracking-widest text-white/40 block mt-0.5">Oak Sear Crust</span>
              </div>
            </div>
          </div>

          {/* Real Photo with Radial Blend Mask */}
          <div className="relative rounded-3xl overflow-hidden border border-[#e5a93c]/20 group shadow-2xl bg-[#110f0d]">
            <img
              src="/images/patty-grill.webp"
              alt="Flame Sear Wagyu Patty"
              className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#e5a93c] font-semibold block mb-1">
                Live Kitchen Archive
              </span>
              <p className="text-base font-bold text-[#f5f2ec]">
                650°C Kishu Binchotan Charcoal Searing in Action
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. CRAFT DETAIL SPLIT (IMAGE LEFT, TEXT RIGHT) ── */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Photo Left */}
          <div className="relative rounded-3xl overflow-hidden border border-[#e5a93c]/20 group shadow-2xl bg-[#110f0d] order-2 lg:order-1">
            <img
              src="/images/cheese-melt.webp"
              alt="Molten Cave-Aged Gruyère"
              className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#e5a93c] font-semibold block mb-1">
                Artisanal Dairy
              </span>
              <p className="text-base font-bold text-[#f5f2ec]">
                24-Month Cave Reserve Gruyère Cascading over Sear Crust
              </p>
            </div>
          </div>

          {/* Text Right */}
          <div className="order-1 lg:order-2">
            <span className="text-xs uppercase tracking-[0.35em] text-[#e5a93c] font-semibold block mb-3">
              Craft Chapter — 01
            </span>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-[#f5f2ec] leading-tight">
              THE BLISTERED CHEESE CRUST.
            </h3>
            <p className="mt-6 text-sm text-white/70 leading-relaxed font-light">
              We source raw-milk Gruyère from high-alpine Swiss caves, aged for two full years until delicate tyrosine crystals form within the curd.
            </p>
            <p className="mt-4 text-sm text-white/70 leading-relaxed font-light">
              Applied directly to the sizzling Wagyu patty on the cast-iron griddle, it is finished with an open torch flame to create a caramelized, nutty umami crown.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. NUMBERS / STATS STRIP ── */}
      <section className="py-20 border-y border-white/10 bg-[#0b0908]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-6xl font-bold font-mono text-[#e5a93c] tracking-tight">
              650°C
            </div>
            <span className="text-xs uppercase tracking-widest text-white/50 block mt-2 font-medium">
              White Oak Charcoal Sear
            </span>
          </div>

          <div>
            <div className="text-4xl md:text-6xl font-bold font-mono text-[#e5a93c] tracking-tight">
              45 Days
            </div>
            <span className="text-xs uppercase tracking-widest text-white/50 block mt-2 font-medium">
              Himalayan Salt Dry Aging
            </span>
          </div>

          <div>
            <div className="text-4xl md:text-6xl font-bold font-mono text-[#e5a93c] tracking-tight">
              220g
            </div>
            <span className="text-xs uppercase tracking-widest text-white/50 block mt-2 font-medium">
              Prime Patty Master Portion
            </span>
          </div>

          <div>
            <div className="text-4xl md:text-6xl font-bold font-mono text-[#e5a93c] tracking-tight">
              100%
            </div>
            <span className="text-xs uppercase tracking-widest text-white/50 block mt-2 font-medium">
              Farm-to-Table Traceability
            </span>
          </div>
        </div>
      </section>

      {/* ── 5. ASYMMETRIC LUXURY PHOTO GALLERY ── */}
      <section className="py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.4em] text-[#e5a93c] font-semibold block mb-3">
            Visual Archive
          </span>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-[#f5f2ec]">
            THE ATELIER GALLERY.
          </h3>
          <p className="mt-3 text-xs md:text-sm text-white/50 font-light">
            High-resolution captures from our Google Flow cinematic film sessions.
          </p>
        </div>

        {/* Asymmetric 12-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Photo 1: 7 cols */}
          <div className="md:col-span-7 relative rounded-3xl overflow-hidden h-[380px] group border border-white/10 hover:border-[#e5a93c]/50 transition-all">
            <img
              src="/images/hero-burger.webp"
              alt="Signature Noir Wagyu"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-5 text-xs font-semibold text-[#f5f2ec]">
              The Noir Reserve Wagyu Centerpiece
            </span>
          </div>

          {/* Photo 2: 5 cols */}
          <div className="md:col-span-5 relative rounded-3xl overflow-hidden h-[380px] group border border-white/10 hover:border-[#e5a93c]/50 transition-all">
            <img
              src="/images/sauce-drizzle.webp"
              alt="Perigord Truffle Drizzle"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-5 text-xs font-semibold text-[#f5f2ec]">
              Perigord Black Truffle Emulsion
            </span>
          </div>

          {/* Photo 3: 5 cols */}
          <div className="md:col-span-5 relative rounded-3xl overflow-hidden h-[380px] group border border-white/10 hover:border-[#e5a93c]/50 transition-all">
            <img
              src="/images/packaging-box.webp"
              alt="Luxury Packaging Box"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-5 text-xs font-semibold text-[#f5f2ec]">
              Matte Black Precision Delivery Packaging
            </span>
          </div>

          {/* Photo 4: 7 cols */}
          <div className="md:col-span-7 relative rounded-3xl overflow-hidden h-[380px] group border border-white/10 hover:border-[#e5a93c]/50 transition-all">
            <img
              src="/images/commercial-feast.webp"
              alt="Dining Room Feast"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-5 text-xs font-semibold text-[#f5f2ec]">
              Candlelit Atelier Tasting Experience
            </span>
          </div>
        </div>
      </section>

      {/* ── 6. TECHNICAL CULINARY SPECIFICATIONS ── */}
      <section id="specs-table" className="py-24 px-6 md:px-12 max-w-4xl mx-auto border-t border-white/10">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.35em] text-[#e5a93c] font-semibold block mb-2">
            Purity Standards
          </span>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-[#f5f2ec]">
            THE MASTER CULINARY SPECIFICATIONS.
          </h3>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10 text-xs md:text-sm">
          {[
            { label: "Beef Lineage", val: "100% Full-Blood Japanese Black Cattle (Kuroge Washu)" },
            { label: "Fat Profile", val: "A5 BMS 11 Marbling with High Oleic Acid Content" },
            { label: "Bun Fermentation", val: "36-Hour Sourdough Levain with Normandy Cultured Butter" },
            { label: "Cheese Aging", val: "24-Month Cave Reserve Swiss Gruyère AOP" },
            { label: "Truffle Provenance", val: "Périgord Winter Black Diamonds (Tuber melanosporum)" },
            { label: "Charcoal Source", val: "Kishu Binchotan (Hard Japanese Oak Coal)" },
            { label: "Packaging Thermal Hold", val: "Engineered 45-Minute 55°C Core Temperature Retention" },
          ].map((row, i) => (
            <div key={i} className="py-4 flex justify-between items-center gap-4">
              <span className="text-white/50 uppercase tracking-wider text-[11px] font-medium">{row.label}</span>
              <span className="text-[#f5f2ec] text-right font-medium">{row.val}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. CLOSING CTA BAND ── */}
      <section className="py-32 px-6 text-center max-w-4xl mx-auto relative">
        <div className="w-48 h-48 rounded-full bg-[#e5a93c]/10 blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <span className="text-xs uppercase tracking-[0.4em] text-[#e5a93c] font-semibold block mb-3">
          Reservations & Delivery
        </span>
        <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-[#f5f2ec]">
          EXPERIENCE <span className="text-[#e5a93c] text-gold-glow">NOIR & EMBER.</span>
        </h2>
        <p className="mt-4 text-xs md:text-sm text-white/60 max-w-md mx-auto leading-relaxed font-light">
          Limited daily allocations. Prepared fresh upon order confirmation.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/menu"
            className="px-8 py-4 rounded-full bg-[#e5a93c] text-[#080706] font-bold text-xs uppercase tracking-widest hover:bg-[#f5c46b] transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(229,169,60,0.35)] flex items-center gap-2"
          >
            <span>Order Your Tasting</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
