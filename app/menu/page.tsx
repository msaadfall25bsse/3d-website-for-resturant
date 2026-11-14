"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import MenuSection from "@/components/menu/MenuSection";
import Footer from "@/components/layout/Footer";

export default function MenuPage() {
  return (
    <main className="relative min-h-screen bg-[#080706] text-[#f5f2ec] overflow-x-hidden pt-20">
      <Navbar />
      <MenuSection />
      <Footer />
    </main>
  );
}
