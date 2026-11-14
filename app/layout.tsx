import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartContext";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CartDrawer from "@/components/cart/CartDrawer";
import ProductModal3D from "@/components/3d/ProductModal3D";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NOIR & EMBER — Artisanal 3D Haute-Burger Atelier",
  description:
    "A cinematic 3D culinary storytelling experience. 45-day dry-aged Japanese Wagyu, interactive 3D burger deconstruction, and Michelin-inspired gastronomy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#080706] text-[#f5f2ec] selection:bg-[#e5a93c] selection:text-[#080706]">
        <CartProvider>
          <SmoothScroll>
            {children}
            <CartDrawer />
            <ProductModal3D />
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
