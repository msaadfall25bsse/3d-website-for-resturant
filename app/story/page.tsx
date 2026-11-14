"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import BrandStorySection from "@/components/story/BrandStorySection";
import Footer from "@/components/layout/Footer";

export default function StoryPage() {
  return (
    <main className="relative min-h-screen bg-[#080706] text-[#f5f2ec] overflow-x-hidden pt-20">
      <Navbar />
      <BrandStorySection />
      <Footer />
    </main>
  );
}
