"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useCart } from "@/components/cart/CartContext";
import { X, Plus, Minus, Check, Flame, Award, Clock } from "lucide-react";

export default function ProductModal3D() {
  const { selectedProductModal, setSelectedProductModal, addToCart } = useCart();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({
    pattyDoneness: "Medium-Rare (54°C)",
    truffleLevel: "Signature Drizzle",
    cheeseChoice: "24-Month Gruyère",
  });
  const [isRotating, setIsRotating] = useState(true);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProductModal(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSelectedProductModal]);

  // Three.js interactive 3D burger inspection in modal
  useEffect(() => {
    if (!selectedProductModal || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = canvas.clientWidth || 400;
    const height = canvas.clientHeight || 350;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 5.2);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    // Lights
    const ambient = new THREE.AmbientLight(0xfff3e0, 1.2);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffeedd, 3.0);
    keyLight.position.set(3, 5, 4);
    scene.add(keyLight);

    const goldRim = new THREE.DirectionalLight(0xe5a93c, 3.5);
    goldRim.position.set(-4, 2, -3);
    scene.add(goldRim);

    const emberLight = new THREE.PointLight(0xff5722, 1.8, 10);
    emberLight.position.set(0, -2, 2);
    scene.add(emberLight);

    // Burger Group
    const group = new THREE.Group();
    scene.add(group);

    // Top Bun
    const bunGeo = new THREE.SphereGeometry(1.2, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.48);
    bunGeo.scale(1, 0.65, 1);
    const bunMat = new THREE.MeshStandardMaterial({ color: 0xc68239, roughness: 0.35, metalness: 0.08 });
    const bun = new THREE.Mesh(bunGeo, bunMat);
    bun.position.y = 0.55;
    group.add(bun);

    // Seeds
    const seedGeo = new THREE.ConeGeometry(0.02, 0.05, 5);
    const seedMat = new THREE.MeshStandardMaterial({ color: 0xfffaee });
    for (let i = 0; i < 60; i++) {
      const s = new THREE.Mesh(seedGeo, seedMat);
      const phi = Math.random() * Math.PI * 0.4;
      const theta = Math.random() * Math.PI * 2;
      s.position.set(1.18 * Math.sin(phi) * Math.cos(theta), 0.55 + 0.77 * Math.cos(phi), 1.18 * Math.sin(phi) * Math.sin(theta));
      s.lookAt(0, 0.8, 0);
      group.add(s);
    }

    // Greens
    const greensGeo = new THREE.CylinderGeometry(1.25, 1.2, 0.1, 24);
    const greensMat = new THREE.MeshStandardMaterial({ color: 0x38761d, roughness: 0.7 });
    const greens = new THREE.Mesh(greensGeo, greensMat);
    greens.position.y = 0.22;
    group.add(greens);

    // Tomato
    const tomatoGeo = new THREE.CylinderGeometry(1.15, 1.15, 0.15, 24);
    const tomatoMat = new THREE.MeshPhysicalMaterial({ color: 0xb22222, roughness: 0.2, clearcoat: 0.8 });
    const tomato = new THREE.Mesh(tomatoGeo, tomatoMat);
    tomato.position.y = 0.08;
    group.add(tomato);

    // Cheese
    const cheeseGeo = new THREE.BoxGeometry(1.8, 0.08, 1.8);
    const cheeseMat = new THREE.MeshStandardMaterial({ color: 0xf4b428, roughness: 0.4 });
    const cheese = new THREE.Mesh(cheeseGeo, cheeseMat);
    cheese.rotation.y = Math.PI / 4;
    cheese.position.y = -0.05;
    group.add(cheese);

    // Patty
    const pattyGeo = new THREE.CylinderGeometry(1.2, 1.22, 0.45, 32);
    const pattyMat = new THREE.MeshStandardMaterial({ color: 0x3d1c10, roughness: 0.85 });
    const patty = new THREE.Mesh(pattyGeo, pattyMat);
    patty.position.y = -0.32;
    group.add(patty);

    // Bottom Bun
    const bBunGeo = new THREE.CylinderGeometry(1.18, 1.1, 0.35, 32);
    const bBunMat = new THREE.MeshStandardMaterial({ color: 0xb57328, roughness: 0.5 });
    const bBun = new THREE.Mesh(bBunGeo, bBunMat);
    bBun.position.y = -0.7;
    group.add(bBun);

    // Drag to rotate
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setIsRotating(false);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      group.rotation.y += deltaX * 0.01;
      group.rotation.x = Math.max(-0.6, Math.min(0.6, group.rotation.x + deltaY * 0.01));
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      if (!isDragging) {
        group.rotation.y += 0.008;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(reqId);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      renderer.dispose();
    };
  }, [selectedProductModal]);

  if (!selectedProductModal) return null;

  const handleAddToCart = () => {
    addToCart(selectedProductModal, quantity, selectedVariants);
    setSelectedProductModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel-glow rounded-3xl border border-[#e5a93c]/25 p-6 md:p-8 flex flex-col md:flex-row gap-8 text-[#f5f2ec]">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductModal(null)}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-[#e5a93c] flex items-center justify-center text-white/70 hover:text-[#e5a93c] transition-all"
        >
          <X size={18} />
        </button>

        {/* Left Column: 3D Canvas Orbit Stage */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative min-h-[320px] rounded-2xl bg-gradient-to-b from-[#14110f] to-[#0a0807] border border-white/5 p-4">
          <canvas
            ref={canvasRef}
            className="w-full h-[280px] md:h-[320px] cursor-grab active:cursor-grabbing block"
          />
          <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none">
            <span className="text-[10px] uppercase tracking-widest text-[#e5a93c]/80 bg-[#080706]/80 px-3 py-1 rounded-full border border-[#e5a93c]/20">
              Drag to Orbit 360°
            </span>
          </div>
        </div>

        {/* Right Column: Customization & Details */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#e5a93c]/15 text-[#e5a93c] text-[10px] tracking-wider uppercase font-semibold">
                {selectedProductModal.category}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-[#e5a93c]">
                ★ {selectedProductModal.rating}
              </span>
              <span className="text-white/40 text-[11px]">|</span>
              <span className="text-white/40 text-[11px]">{selectedProductModal.calories}</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#f5f2ec]">
              {selectedProductModal.name}
            </h2>
            <p className="text-xs text-[#e5a93c] font-medium tracking-wide mt-1">
              {selectedProductModal.tagline}
            </p>

            <p className="mt-3 text-xs text-[#f5f2ec]/70 leading-relaxed font-light">
              {selectedProductModal.description}
            </p>

            {/* Customization Options */}
            <div className="mt-6 space-y-4">
              {/* Doneness */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#f5f2ec]/50 block mb-1.5 font-medium">
                  Patty Temperature
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Medium-Rare (54°C)", "Medium (60°C)", "Well-Seared (68°C)"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedVariants((prev) => ({ ...prev, pattyDoneness: opt }))}
                      className={`py-2 px-2 rounded-xl text-[10px] border transition-all text-center leading-tight ${
                        selectedVariants.pattyDoneness === opt
                          ? "bg-[#e5a93c]/15 border-[#e5a93c] text-[#e5a93c] font-semibold"
                          : "border-white/10 text-white/60 hover:border-white/20"
                      }`}
                    >
                      {opt.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Truffle Sauce */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#f5f2ec]/50 block mb-1.5 font-medium">
                  Truffle Emulsion Level
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["Signature Drizzle", "Double Decadence (+ $4)"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedVariants((prev) => ({ ...prev, truffleLevel: opt }))}
                      className={`py-2 px-2.5 rounded-xl text-[11px] border transition-all text-center ${
                        selectedVariants.truffleLevel === opt
                          ? "bg-[#e5a93c]/15 border-[#e5a93c] text-[#e5a93c] font-semibold"
                          : "border-white/10 text-white/60 hover:border-white/20"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Quantity & Add to Cart */}
          <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="text-sm font-semibold w-4 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 py-3.5 px-6 rounded-full bg-[#e5a93c] text-[#080706] font-bold text-xs uppercase tracking-widest hover:bg-[#f5c46b] transition-all transform hover:scale-[1.02] shadow-[0_0_25px_rgba(229,169,60,0.3)] flex items-center justify-center gap-2"
            >
              <span>Add to Order</span>
              <span>•</span>
              <span>${selectedProductModal.price * quantity}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
