"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import ScrollExperience from "@/components/cinematic/ScrollExperience";
import BrandStorySection from "@/components/story/BrandStorySection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#080706] text-[#f5f2ec] overflow-x-hidden selection:bg-[#e5a93c] selection:text-[#080706]">
      {/* Luxury Brand Navigation */}
      <Navbar />

      {/* ── ADVANCED SCROLL-DRIVEN CINEMATIC VIDEO EXPERIENCE (8 STAGES) ── */}
      <ScrollExperience />

      {/* ── THE FULL BRAND PAGE (BELOW THE FILM) ── */}
      <BrandStorySection />

      {/* ── GLOBAL LUXURY FOOTER ── */}
      <Footer />
    </main>
  );
}
