"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MENU_ITEMS } from "@/lib/data";
import { MenuItem } from "@/types";
import { useCart } from "@/components/cart/CartContext";
import { Plus, Eye, Flame, Sparkles } from "lucide-react";

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { addToCart, setSelectedProductModal } = useCart();

  const categories = [
    { id: "all", label: "Full Collection" },
    { id: "signature", label: "Signature Wagyu" },
    { id: "classic", label: "Heritage Classics" },
    { id: "chicken", label: "Kyoto Chicken" },
    { id: "combos", label: "Sommelier Feasts" },
    { id: "fries", label: "Truffle Frites" },
    { id: "drinks", label: "Botanical Elixirs" },
  ];

  const filteredItems =
    activeCategory === "all"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="interactive-menu" className="relative py-32 px-6 md:px-12 bg-[#080706] text-[#f5f2ec]">
      {/* Glow Backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#e5a93c]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.4em] text-[#e5a93c] font-semibold block mb-3">
            Haute Gastronomy Menu
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#f5f2ec]">
            THE CULINARY <span className="text-[#e5a93c]">EDITIONS.</span>
          </h2>
          <p className="mt-4 text-xs md:text-sm text-[#f5f2ec]/60 font-light leading-relaxed">
            Every creation is prepared to order using Japanese binchotan charcoal, farm-sourced heirloom botanicals, and certified A5 Japanese Wagyu.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-300 font-medium ${
                  activeCategory === cat.id
                    ? "bg-[#e5a93c] text-[#080706] font-bold shadow-[0_0_20px_rgba(229,169,60,0.3)] scale-105"
                    : "bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-[#e5a93c]/30"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid with Real Food Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative glass-panel rounded-3xl p-6 flex flex-col justify-between border border-white/10 hover:border-[#e5a93c]/40 hover:shadow-[0_0_35px_rgba(229,169,60,0.12)] transition-all duration-500"
            >
              {/* Top Badges */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex flex-wrap gap-1.5">
                  {item.badges.map((b, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-full bg-[#e5a93c]/15 border border-[#e5a93c]/20 text-[9px] uppercase tracking-wider text-[#e5a93c] font-semibold"
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-mono text-[#e5a93c] font-semibold">
                  ★ {item.rating}
                </span>
              </div>

              {/* REAL PRODUCT IMAGE STAGE */}
              <div
                onClick={() => setSelectedProductModal(item)}
                className="relative h-56 w-full rounded-2xl overflow-hidden cursor-pointer group-hover:border-[#e5a93c]/40 transition-all border border-white/5 bg-[#120f0d]"
              >
                {/* Real Food Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />

                {/* Radial Mask & Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                {/* Inspect in 3D badge on hover */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#e5a93c] font-semibold">
                  <Eye size={16} />
                  <span>Inspect in 3D</span>
                </div>

                <div className="absolute bottom-3 left-3 text-[10px] text-[#e5a93c] font-mono bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  {item.calories}
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-5">
                <h3 className="text-xl font-bold tracking-tight text-[#f5f2ec] group-hover:text-[#e5a93c] transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-[#e5a93c] font-medium tracking-wide mt-1">
                  {item.tagline}
                </p>
                <p className="mt-2.5 text-xs text-[#f5f2ec]/60 font-light leading-relaxed line-clamp-2">
                  {item.description}
                </p>

                {/* Ingredients chips */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.ingredients.slice(0, 3).map((ing, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] text-white/50 bg-white/5 px-2 py-0.5 rounded-md"
                    >
                      {ing}
                    </span>
                  ))}
                  {item.ingredients.length > 3 && (
                    <span className="text-[10px] text-[#e5a93c] px-1 py-0.5">
                      +{item.ingredients.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Price & Action Button */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest block">Price</span>
                  <span className="text-xl font-bold font-mono text-[#e5a93c]">${item.price}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedProductModal(item)}
                    title="Inspect 3D & Customize"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-[#e5a93c] hover:text-[#e5a93c] flex items-center justify-center text-white/60 transition-all"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => addToCart(item)}
                    className="px-4 py-2.5 rounded-full bg-[#e5a93c] text-[#080706] font-bold text-xs uppercase tracking-wider hover:bg-[#f5c46b] transition-all transform hover:scale-105 flex items-center gap-1.5 shadow-[0_0_15px_rgba(229,169,60,0.25)]"
                  >
                    <Plus size={14} />
                    <span>Order</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
