"use client";

import React from "react";
import Link from "next/link";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative bg-[#050403] border-t border-white/10 text-[#f5f2ec] pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-2.5 h-2.5 rounded-full bg-[#e5a93c] shadow-[0_0_12px_#e5a93c] group-hover:scale-125 transition-transform" />
              <span className="font-bold tracking-[0.3em] text-lg text-[#f5f2ec] uppercase">
                NOIR <span className="text-[#e5a93c]">&</span> EMBER
              </span>
            </Link>
            <p className="text-xs text-white/50 max-w-sm leading-relaxed font-light">
              {BRAND_TAGLINE}. Engineered 3D culinary storytelling where 45-day dry-aged Japanese Wagyu meets French hearth craft.
            </p>
            <div className="pt-2 text-[11px] text-[#e5a93c] font-mono">
              Open Daily: 17:00 — 01:00 • Private Room by Reservation
            </div>
          </div>

          {/* Nav Column 1 */}
          <div>
            <h5 className="text-[11px] uppercase tracking-[0.3em] text-[#e5a93c] font-semibold mb-4">
              Gastronomy
            </h5>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li><Link href="/menu" className="hover:text-white transition-colors">The Noir Wagyu</Link></li>
              <li><Link href="/menu" className="hover:text-white transition-colors">Kyoto Chicken</Link></li>
              <li><Link href="/menu" className="hover:text-white transition-colors">Triple Truffle Frites</Link></li>
              <li><Link href="/menu" className="hover:text-white transition-colors">Cellar Pairings</Link></li>
            </ul>
          </div>

          {/* Nav Column 2 */}
          <div>
            <h5 className="text-[11px] uppercase tracking-[0.3em] text-[#e5a93c] font-semibold mb-4">
              The Atelier
            </h5>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li><Link href="/story" className="hover:text-white transition-colors">Our Manifesto</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">3D Craft Journey</Link></li>
              <li><Link href="/specs" className="hover:text-white transition-colors">Purity Specs</Link></li>
              <li><Link href="/story" className="hover:text-white transition-colors">Private Dining</Link></li>
            </ul>
          </div>

          {/* Nav Column 3 */}
          <div>
            <h5 className="text-[11px] uppercase tracking-[0.3em] text-[#e5a93c] font-semibold mb-4">
              Locations
            </h5>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li><span className="hover:text-white cursor-pointer transition-colors">Ginza, Tokyo</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Le Marais, Paris</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">SoHo, New York</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Mayfair, London</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Fine Print */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40 tracking-wider">
          <span>© 2026 NOIR & EMBER Atelier. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">Privacy Charter</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Culinary Provenance</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Allergen Matrix</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
