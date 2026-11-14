"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BURGER_INGREDIENTS } from "@/lib/data";
import { Volume2, VolumeX, Eye, Sparkles, Layers, Box, Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface BurgerSceneProps {
  onScrollProgress?: (progress: number, activeScene: number) => void;
}

export default function BurgerScene3D({ onScrollProgress }: BurgerSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Video references for the 4 cinematic story stages
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const video6Ref = useRef<HTMLVideoElement>(null);
  const video7Ref = useRef<HTMLVideoElement>(null);

  const [activeSceneNumber, setActiveSceneNumber] = useState<number>(1);
  const [activeIngredientIndex, setActiveIngredientIndex] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [displayMode, setDisplayMode] = useState<"video" | "three3d">("video");
  const [scrollFraction, setScrollFraction] = useState<number>(0);

  // ── SOUND TOGGLE ──
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    [video1Ref, video2Ref, video6Ref, video7Ref].forEach((ref) => {
      if (ref.current) ref.current.muted = nextMuted;
    });
  };

  // ── THREE.JS PROCEDURAL 3D BURGER & PARTICLE CANVAS ──
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080706, 0.045);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 7.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffecd1, 2.8);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const goldRimLight = new THREE.DirectionalLight(0xe5a93c, 3.5);
    goldRimLight.position.set(-5, 3, -4);
    scene.add(goldRimLight);

    const emberFillLight = new THREE.PointLight(0xff5722, 2.0, 15);
    emberFillLight.position.set(0, -3.5, 2);
    scene.add(emberFillLight);

    // Root Burger Group for 3D Mode
    const burgerGroup = new THREE.Group();
    scene.add(burgerGroup);

    // Top Bun
    const topBunGroup = new THREE.Group();
    const bunGeo = new THREE.SphereGeometry(1.5, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.48);
    bunGeo.scale(1, 0.65, 1);
    const bunMat = new THREE.MeshStandardMaterial({ color: 0xc68239, roughness: 0.38, metalness: 0.08 });
    const topBunMesh = new THREE.Mesh(bunGeo, bunMat);
    topBunGroup.add(topBunMesh);

    // Bun flat bottom slice
    const bunSliceGeo = new THREE.CylinderGeometry(1.48, 1.48, 0.08, 32);
    const bunSlice = new THREE.Mesh(bunSliceGeo, new THREE.MeshStandardMaterial({ color: 0xdeb887, roughness: 0.8 }));
    topBunGroup.add(bunSlice);

    // Sesame Seeds
    const sesameGeo = new THREE.ConeGeometry(0.025, 0.07, 6);
    sesameGeo.rotateX(Math.PI / 2);
    const sesameMat = new THREE.MeshStandardMaterial({ color: 0xfff8ee, roughness: 0.4 });
    const sesameCount = 120;
    const sesameInstanced = new THREE.InstancedMesh(sesameGeo, sesameMat, sesameCount);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < sesameCount; i++) {
      const phi = Math.random() * Math.PI * 0.4;
      const theta = Math.random() * Math.PI * 2;
      const r = 1.47;
      dummy.position.set(r * Math.sin(phi) * Math.cos(theta), r * 0.65 * Math.cos(phi) + 0.02, r * Math.sin(phi) * Math.sin(theta));
      dummy.lookAt(0, 1.2, 0);
      dummy.updateMatrix();
      sesameInstanced.setMatrixAt(i, dummy.matrix);
    }
    topBunGroup.add(sesameInstanced);
    burgerGroup.add(topBunGroup);

    // Truffle Sauce
    const sauceGeo = new THREE.TorusGeometry(1.1, 0.16, 12, 32);
    sauceGeo.scale(1, 0.35, 1);
    const sauceMesh = new THREE.Mesh(sauceGeo, new THREE.MeshPhysicalMaterial({ color: 0x3d1c06, roughness: 0.1, clearcoat: 1.0 }));
    burgerGroup.add(sauceMesh);

    // Greens
    const leafGeo = new THREE.CylinderGeometry(1.55, 1.45, 0.14, 24, 2);
    const pos = leafGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i);
      const v = pos.getZ(i);
      const wave = Math.sin(Math.atan2(v, u) * 7) * 0.12;
      pos.setY(i, pos.getY(i) + wave);
    }
    leafGeo.computeVertexNormals();
    const greensMesh = new THREE.Mesh(leafGeo, new THREE.MeshStandardMaterial({ color: 0x38761d, roughness: 0.65, flatShading: true, side: THREE.DoubleSide }));
    burgerGroup.add(greensMesh);

    // Tomato
    const tomatoMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.22, 32), new THREE.MeshPhysicalMaterial({ color: 0xb22222, roughness: 0.2, clearcoat: 0.9 }));
    burgerGroup.add(tomatoMesh);

    // Cheese
    const cheeseGeo = new THREE.BoxGeometry(2.3, 0.1, 2.3, 8, 2, 8);
    const cPos = cheeseGeo.attributes.position;
    for (let i = 0; i < cPos.count; i++) {
      const dist = Math.hypot(cPos.getX(i), cPos.getZ(i));
      if (dist > 0.9) cPos.setY(i, cPos.getY(i) - (dist - 0.9) * 0.4);
    }
    cheeseGeo.computeVertexNormals();
    const cheeseMesh = new THREE.Mesh(cheeseGeo, new THREE.MeshStandardMaterial({ color: 0xf4b428, roughness: 0.35 }));
    cheeseMesh.rotation.y = Math.PI / 4;
    burgerGroup.add(cheeseMesh);

    // Patty
    const pattyMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.52, 0.65, 36), new THREE.MeshStandardMaterial({ color: 0x3d1c10, roughness: 0.85 }));
    burgerGroup.add(pattyMesh);

    // Bottom Bun
    const bottomBunMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.48, 1.35, 0.45, 32), new THREE.MeshStandardMaterial({ color: 0xb57328, roughness: 0.5 }));
    burgerGroup.add(bottomBunMesh);

    const layers = [topBunGroup, sauceMesh, greensMesh, tomatoMesh, cheeseMesh, pattyMesh, bottomBunMesh];
    const assembledY = [0.85, 0.45, 0.3, 0.12, -0.05, -0.4, -0.85];
    layers.forEach((l, idx) => (l.position.y = assembledY[idx]));

    // Packaging Box
    const packagingGroup = new THREE.Group();
    packagingGroup.position.set(0, -8, 0);
    scene.add(packagingGroup);
    const boxBase = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.8, 4.2), new THREE.MeshStandardMaterial({ color: 0x12100e, roughness: 0.6 }));
    boxBase.position.y = -0.9;
    packagingGroup.add(boxBase);

    const lidPivot = new THREE.Group();
    lidPivot.position.set(0, 0, -2.1);
    const lidMesh = new THREE.Mesh(new THREE.BoxGeometry(4.25, 0.4, 4.25), new THREE.MeshStandardMaterial({ color: 0x12100e, roughness: 0.6 }));
    lidMesh.position.set(0, 0.2, 2.1);
    lidPivot.add(lidMesh);
    packagingGroup.add(lidPivot);

    // Particles (Glowing Embers)
    const particleCount = 75;
    const particleGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 8;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({ color: 0xff7a00, size: 0.055, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending })
    );
    scene.add(particles);

    // Mouse Parallax
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      width = canvasRef.current.clientWidth;
      height = canvasRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // ── SCROLLTRIGGER SYNC ACROSS THE 5 BEATS ──
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.8,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollFraction(p);

        let sceneNum = 1;
        if (p < 0.20) sceneNum = 1;
        else if (p < 0.45) sceneNum = 2;
        else if (p < 0.65) sceneNum = 3;
        else if (p < 0.82) sceneNum = 4;
        else sceneNum = 5;

        setActiveSceneNumber(sceneNum);
        if (onScrollProgress) onScrollProgress(p, sceneNum);

        // Control Video playback based on active scene
        if (video1Ref.current && video2Ref.current && video6Ref.current && video7Ref.current) {
          if (sceneNum === 1) {
            video1Ref.current.play().catch(() => {});
          } else if (sceneNum === 2 || sceneNum === 3) {
            video2Ref.current.play().catch(() => {});
          } else if (sceneNum === 4) {
            video6Ref.current.play().catch(() => {});
          } else if (sceneNum === 5) {
            video7Ref.current.play().catch(() => {});
          }
        }

        // 3D Procedural Mesh Animations
        if (p <= 0.20) {
          const t1 = p / 0.20;
          burgerGroup.rotation.y = t1 * Math.PI * 1.5;
          camera.position.z = 7.5 - t1 * 1.2;
          layers.forEach((l, idx) => (l.position.y = assembledY[idx]));
          packagingGroup.position.y = -8;
          setActiveIngredientIndex(null);
        } else if (p > 0.20 && p <= 0.45) {
          const t2 = (p - 0.20) / 0.25;
          burgerGroup.rotation.y = Math.PI * 1.5 + t2 * Math.PI * 0.6;
          layers.forEach((l, idx) => {
            l.position.y = THREE.MathUtils.lerp(assembledY[idx], BURGER_INGREDIENTS[idx].yOffset, t2);
            l.rotation.z = Math.sin(idx * 1.5 + t2) * 0.05 * t2;
          });
          packagingGroup.position.y = -8;
          setActiveIngredientIndex(null);
        } else if (p > 0.45 && p <= 0.65) {
          const t3 = (p - 0.45) / 0.20;
          const ingIndex = Math.min(BURGER_INGREDIENTS.length - 1, Math.floor(t3 * BURGER_INGREDIENTS.length));
          setActiveIngredientIndex(ingIndex);
          layers.forEach((l, idx) => (l.position.y = BURGER_INGREDIENTS[idx].yOffset));
          packagingGroup.position.y = -8;
        } else if (p > 0.65 && p <= 0.82) {
          const t4 = (p - 0.65) / 0.17;
          setActiveIngredientIndex(null);
          layers.forEach((l, idx) => {
            l.position.y = THREE.MathUtils.lerp(BURGER_INGREDIENTS[idx].yOffset, assembledY[idx], t4);
            l.rotation.z = THREE.MathUtils.lerp(l.rotation.z, 0, t4);
          });
          packagingGroup.position.y = THREE.MathUtils.lerp(-8, -2.2, t4);
          lidPivot.rotation.x = THREE.MathUtils.lerp(0, -Math.PI * 0.65, t4);
        } else if (p > 0.82) {
          const t5 = (p - 0.82) / 0.18;
          setActiveIngredientIndex(null);
          layers.forEach((l, idx) => (l.position.y = assembledY[idx]));
          burgerGroup.position.y = THREE.MathUtils.lerp(0, -1.8, Math.min(t5 * 1.5, 1));
          packagingGroup.position.y = -1.8;
          lidPivot.rotation.x = t5 > 0.6 ? THREE.MathUtils.lerp(-Math.PI * 0.65, 0, (t5 - 0.6) / 0.4) : -Math.PI * 0.65;
        }
      },
    });

    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      burgerGroup.rotation.x = THREE.MathUtils.lerp(burgerGroup.rotation.x, mouseY, 0.05);
      burgerGroup.rotation.z = THREE.MathUtils.lerp(burgerGroup.rotation.z, -mouseX * 0.5, 0.05);

      const arr = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        arr[i * 3 + 1] += 0.01;
        if (arr[i * 3 + 1] > 4) arr[i * 3 + 1] = -4;
      }
      particleGeo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      trigger.kill();
      renderer.dispose();
      scene.clear();
    };
  }, [onScrollProgress]);

  return (
    <div ref={containerRef} className="relative w-full h-[650vh]">
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#080706]">
        {/* ── CINEMATIC GOOGLE FLOW VIDEOS LAYER (CROSSFADING BASED ON SCENE) ── */}
        <div
          className={`absolute inset-0 z-0 transition-opacity duration-700 ${
            displayMode === "video" ? "opacity-100" : "opacity-20"
          }`}
        >
          {/* Act 1: Floating Hero Video */}
          <video
            ref={video1Ref}
            src="/videos/video-01-hero-floating.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              activeSceneNumber === 1 ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
          />

          {/* Act 2 & 3: Exploded Disassembly Video */}
          <video
            ref={video2Ref}
            src="/videos/video-02-burger-exploded.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              activeSceneNumber === 2 || activeSceneNumber === 3
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105 pointer-events-none"
            }`}
          />

          {/* Act 4: Reassembly Video */}
          <video
            ref={video6Ref}
            src="/videos/video-06-burger-reassemble.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              activeSceneNumber === 4 ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
          />

          {/* Act 5: Luxury Packaging Box Video */}
          <video
            ref={video7Ref}
            src="/videos/video-07-packaging-box-reveal.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              activeSceneNumber === 5 ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
          />
        </div>

        {/* ── THREE.JS CANVAS (PROCEDURAL BURGER + EMBER PARTICLES) ── */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full block z-10 transition-opacity duration-500 ${
            displayMode === "three3d" ? "opacity-100 pointer-events-auto" : "opacity-40 pointer-events-none"
          }`}
        />

        {/* Cinematic Radial Vignette & Edge Blend */}
        <div className="absolute inset-0 pointer-events-none z-20 vignette-radial" />
        <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-[#080706] to-transparent pointer-events-none z-20" />
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#080706] to-transparent pointer-events-none z-20" />

        {/* ── TOP CONTROLS: DISPLAY MODE TOGGLE & SOUND ── */}
        <div className="absolute top-24 right-6 md:right-12 z-30 flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[11px]">
            <button
              onClick={() => setDisplayMode("video")}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all flex items-center gap-1.5 ${
                displayMode === "video"
                  ? "bg-[#e5a93c] text-[#080706] font-bold shadow-md"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Play size={11} className="fill-current" />
              <span>Cinematic Film</span>
            </button>
            <button
              onClick={() => setDisplayMode("three3d")}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all flex items-center gap-1.5 ${
                displayMode === "three3d"
                  ? "bg-[#e5a93c] text-[#080706] font-bold shadow-md"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Eye size={12} />
              <span>Interactive 3D</span>
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleMute}
            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:border-[#e5a93c] text-white/70 hover:text-[#e5a93c] flex items-center justify-center transition-all"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-[#e5a93c]" />}
          </button>
        </div>

        {/* ── SYNCHRONIZED SCENE TEXT OVERLAYS ── */}

        {/* SCENE 1: HERO REVEAL */}
        <div
          className={`absolute inset-x-0 top-[26%] md:top-[28%] flex flex-col items-center text-center px-6 pointer-events-none z-30 transition-all duration-700 ${
            activeSceneNumber === 1 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <span className="text-[11px] md:text-xs tracking-[0.45em] uppercase text-[#e5a93c] mb-3 font-semibold">
            Artisanal Haute-Burger Studio
          </span>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#f5f2ec] max-w-4xl leading-[1.02]">
            CRAFTED TO <span className="text-[#e5a93c] text-gold-glow">PERFECTION.</span>
          </h1>
          <p className="mt-4 text-xs md:text-base text-[#f5f2ec]/75 max-w-lg font-light leading-relaxed">
            Where 45-day dry-aged Miyazaki Wagyu meets 650°C white oak charcoal fire.
          </p>

          <div className="mt-8 flex items-center gap-4 pointer-events-auto">
            <a
              href="#interactive-menu"
              className="px-8 py-3.5 rounded-full bg-[#e5a93c] text-[#080706] text-xs uppercase tracking-widest font-bold hover:bg-[#f5c46b] transition-all transform hover:scale-105 shadow-[0_0_25px_rgba(229,169,60,0.35)]"
            >
              Explore Menu
            </a>
            <a
              href="#cinematic-craft"
              className="px-8 py-3.5 rounded-full border border-[#e5a93c]/40 text-[#f5f2ec] text-xs uppercase tracking-widest font-medium hover:border-[#e5a93c] hover:bg-[#e5a93c]/10 transition-all backdrop-blur-xs"
            >
              Watch Craft Film
            </a>
          </div>

          <div className="mt-12 flex flex-col items-center gap-2 text-[#f5f2ec]/40 text-[10px] tracking-[0.3em] uppercase animate-pulse">
            <span>Scroll to deconstruct</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-[#e5a93c] to-transparent" />
          </div>
        </div>

        {/* SCENE 2: EXPLOSION / DISASSEMBLY */}
        <div
          className={`absolute left-6 md:left-16 top-1/2 -translate-y-1/2 max-w-md pointer-events-none z-30 transition-all duration-700 ${
            activeSceneNumber === 2 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#e5a93c] font-semibold">
            Act II — Deconstruction
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#f5f2ec] mt-2">
            THE ARCHITECTURE OF <span className="text-[#e5a93c]">FLAVOR.</span>
          </h2>
          <p className="mt-3 text-xs md:text-sm text-[#f5f2ec]/75 leading-relaxed font-light">
            Every element exists in deliberate equilibrium. Seven isolated layers engineered to release umami in orchestrated sequence.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-black/60 border border-[#e5a93c]/30 text-[10px] text-[#e5a93c] tracking-wider uppercase backdrop-blur-md">
              Zero-Gravity Film View
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] text-white/70 tracking-wider uppercase backdrop-blur-md">
              7 Distinct Layers
            </span>
          </div>
        </div>

        {/* SCENE 3: INGREDIENT FOCUS CARD */}
        {activeIngredientIndex !== null && (
          <div
            className={`absolute right-6 md:right-16 top-1/2 -translate-y-1/2 w-full max-w-sm glass-panel-glow p-6 md:p-8 rounded-3xl pointer-events-auto z-30 transition-all duration-500`}
          >
            <div className="flex items-center justify-between border-b border-[#e5a93c]/20 pb-3">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#e5a93c] font-semibold">
                Layer 0{activeIngredientIndex + 1} of 07
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#e5a93c] animate-ping" />
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-[#f5f2ec] mt-3">
              {BURGER_INGREDIENTS[activeIngredientIndex].name}
            </h3>
            <p className="text-xs text-[#e5a93c] font-medium tracking-wide mt-1">
              {BURGER_INGREDIENTS[activeIngredientIndex].subtitle}
            </p>

            <p className="text-xs text-[#f5f2ec]/70 mt-3 leading-relaxed font-light">
              {BURGER_INGREDIENTS[activeIngredientIndex].description}
            </p>

            <div className="mt-5 pt-4 border-t border-white/10 space-y-2 text-[11px]">
              <div className="flex justify-between">
                <span className="text-[#f5f2ec]/50 uppercase tracking-wider">Provenance</span>
                <span className="text-[#f5f2ec] font-medium">{BURGER_INGREDIENTS[activeIngredientIndex].specs.origin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#f5f2ec]/50 uppercase tracking-wider">Preparation</span>
                <span className="text-[#f5f2ec] font-medium">{BURGER_INGREDIENTS[activeIngredientIndex].specs.prep}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#f5f2ec]/50 uppercase tracking-wider">Serving State</span>
                <span className="text-[#e5a93c] font-medium">{BURGER_INGREDIENTS[activeIngredientIndex].specs.temperature}</span>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 4: REASSEMBLY */}
        <div
          className={`absolute left-6 md:left-16 bottom-[16%] max-w-md pointer-events-none z-30 transition-all duration-700 ${
            activeSceneNumber === 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#e5a93c] font-semibold">
            Act IV — Harmonic Fusion
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#f5f2ec] mt-2">
            REASSEMBLED AS <span className="text-[#e5a93c]">ONE.</span>
          </h2>
          <p className="mt-3 text-xs md:text-sm text-[#f5f2ec]/75 leading-relaxed font-light">
            All elements snap back into locked unity. The heat fuses aged Gruyère into marbled Wagyu beef, sealing bone marrow jus into the toasted brioche cushion.
          </p>
        </div>

        {/* SCENE 5: PACKAGING & PRESTIGE */}
        <div
          className={`absolute inset-x-0 bottom-[18%] flex flex-col items-center text-center px-6 pointer-events-none z-30 transition-all duration-700 ${
            activeSceneNumber === 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#e5a93c] font-semibold">
            Act V — Presentation & Delivery
          </span>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-[#f5f2ec] mt-2 max-w-2xl">
            THE LUXURY <span className="text-[#e5a93c]">UNBOXING.</span>
          </h2>
          <p className="mt-3 text-xs md:text-sm text-[#f5f2ec]/75 max-w-md leading-relaxed font-light">
            Engineered thermally insulated matte black packaging with gold foil seals, ensuring every burger arrives at the exact serving temperature.
          </p>
          <div className="mt-6 pointer-events-auto flex items-center gap-4">
            <a
              href="#interactive-menu"
              className="px-8 py-3.5 rounded-full bg-[#e5a93c] text-[#080706] text-xs uppercase tracking-widest font-bold hover:bg-[#f5c46b] transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(229,169,60,0.35)]"
            >
              Order For Delivery
            </a>
          </div>
        </div>

        {/* Scene Navigation Track Dots */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-30 pointer-events-none">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`w-1.5 rounded-full transition-all duration-300 ${
                activeSceneNumber === s ? "h-8 bg-[#e5a93c] shadow-[0_0_12px_#e5a93c]" : "h-1.5 bg-white/20"
              }`}
            />
          ))}
          <span className="text-[9px] text-[#e5a93c] tracking-widest font-mono mt-1">
            0{activeSceneNumber}
          </span>
        </div>
      </div>
    </div>
  );
}
