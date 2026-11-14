"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart/CartContext";
import { ShoppingBag, Menu, X, Sparkles } from "lucide-react";

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let prev = false;
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      if (isScrolled !== prev) {
        prev = isScrolled;
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "3D Experience" },
    { href: "/menu", label: "Menu" },
    { href: "/story", label: "Our Story" },
    { href: "/specs", label: "Purity Specs" },
  ];

  return (
    <nav
      id="brandnav"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080706]/90 backdrop-blur-xl border-b border-[#e5a93c]/15 py-3.5 shadow-2xl"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Mark */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-2.5 h-2.5 rounded-full bg-[#e5a93c] shadow-[0_0_12px_#e5a93c] group-hover:scale-125 transition-transform" />
          <span className="font-extrabold tracking-[0.25em] text-sm md:text-base text-[#f5f2ec] uppercase">
            NOIR <span className="text-[#e5a93c]">&</span> EMBER
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors duration-200 ${
                  isActive
                    ? "text-[#e5a93c] font-semibold"
                    : "text-white/60 hover:text-[#e5a93c]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#e5a93c] rounded-full shadow-[0_0_8px_#e5a93c]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Actions: Cart & CTA */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#e5a93c] text-[#f5f2ec] transition-all flex items-center justify-center hover:scale-105"
            aria-label="View Cart"
          >
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#e5a93c] text-[#080706] text-[10px] font-bold flex items-center justify-center font-mono shadow-md">
                {totalItems}
              </span>
            )}
          </button>

          <Link
            href="/menu"
            className="hidden sm:inline-flex px-5 py-2.5 rounded-full border border-[#e5a93c] text-[#e5a93c] hover:bg-[#e5a93c] hover:text-[#080706] text-xs uppercase tracking-widest font-semibold transition-all shadow-[0_0_15px_rgba(229,169,60,0.15)]"
          >
            Order Now
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0807]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4 text-xs uppercase tracking-widest text-white/70">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2.5 border-b border-white/5 ${
                pathname === link.href ? "text-[#e5a93c] font-bold" : "hover:text-[#e5a93c]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/menu"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center py-3 rounded-full bg-[#e5a93c] text-[#080706] font-bold mt-4"
          >
            Order Now
          </Link>
        </div>
      )}
    </nav>
  );
}
