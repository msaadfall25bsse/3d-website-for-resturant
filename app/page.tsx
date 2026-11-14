"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import SequenceScroller from "@/components/3d/SequenceScroller";

export default function Home() {
  return (
    <main className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#080706] text-[#f5f2ec] select-none selection:bg-[#e5a93c] selection:text-[#080706]">
      {/* Luxury Brand Navigation */}
      <Navbar />

      {/* ── 8-STAGE SCROLL-DRIVEN BURGER CREATION (PAGE STABLE, 100% FIXED) ── */}
      {/*
        Exact Videos from `public/videos/add video combination in the scrolling this sequence`:
        Step 1: video number 1 add.mp4 -> Binchotan Open-Fire Sear
        Step 2: video number 2 add.mp4 -> The Roaring Flame & Caramelization
        Step 3: video number 3 add.mp4 -> Périgord Truffle Drizzle
        Step 4: video number 4 add.mp4 -> Molten Aged Gruyère Melt
        Step 5: video number 5 add.mp4 -> Exploded Zero-Gravity View
        Step 6: video number 6 add.mp4 -> The Wagyu Icon & Brioche Crown
        Step 7: video number 7 add.mp4 -> The Reassembly Lock
        Step 8: video number 8 add.mp4 -> Luxury Thermal Octagonal Box Sealed
      */}
      <SequenceScroller />
    </main>
  );
}
