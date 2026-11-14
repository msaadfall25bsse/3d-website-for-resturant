"use client";

import React, { useState, useRef } from "react";
import { GOOGLE_FLOW_VIDEOS } from "@/lib/data";
import { VideoAssetInfo } from "@/types";
import { Play, Pause, Volume2, VolumeX, Maximize2, Copy, Check, Film, Flame, Sparkles } from "lucide-react";

export default function VideoShowcaseSection() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // We feature all 8 videos in this theater, with focus on the craft and commercial clips!
  const allVideos = GOOGLE_FLOW_VIDEOS;
  const currentVideo = allVideos[activeVideoIndex];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !isMuted;
    videoRef.current.muted = next;
    setIsMuted(next);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleCopyPrompt = (video: VideoAssetInfo) => {
    navigator.clipboard.writeText(video.prompt);
    setCopiedId(video.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="cinematic-craft" className="relative py-32 px-6 md:px-12 bg-[#0b0908] text-[#f5f2ec] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.4em] text-[#e5a93c] font-semibold block mb-3">
            Cinematic Food Videography
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#f5f2ec]">
            THE ART OF <span className="text-[#e5a93c]">THE FLAME.</span>
          </h2>
          <p className="mt-4 text-xs md:text-sm text-[#f5f2ec]/60 font-light leading-relaxed">
            Witness the sensory alchemy behind every course: 650°C charcoal searing, cave-aged cheese melting, and hand-whipped Perigord truffle infusions captured in 1080p cinematic brilliance.
          </p>
        </div>

        {/* Video Player Stage & Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Video Viewport (7 Columns) */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden glass-panel-glow border border-[#e5a93c]/35 aspect-video bg-black group shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <video
              ref={videoRef}
              key={currentVideo.filename}
              src={`/videos/${currentVideo.filename}`}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/30" />

            {/* Video Controls Overlay */}
            <div className="absolute bottom-4 inset-x-6 z-20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:border-[#e5a93c] text-white flex items-center justify-center transition-all hover:scale-105"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5 fill-current" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:border-[#e5a93c] text-white flex items-center justify-center transition-all hover:scale-105"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="text-[#e5a93c]" />}
                </button>

                <span className="text-[11px] font-mono text-white/70 bg-black/60 px-3 py-1.5 rounded-full border border-white/10">
                  {currentVideo.duration} • 1080p
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleFullscreen}
                  className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:border-[#e5a93c] text-white flex items-center justify-center transition-all hover:scale-105"
                  title="Fullscreen"
                >
                  <Maximize2 size={16} />
                </button>
              </div>
            </div>

            {/* Top Video Title Badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#e5a93c]/30 text-xs text-[#f5f2ec]">
              <span className="w-2 h-2 rounded-full bg-[#e5a93c] animate-ping" />
              <span className="font-semibold">{currentVideo.title}</span>
            </div>
          </div>

          {/* Video Selector Tabs & Details (5 Columns) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#e5a93c] font-semibold">
                Cinematic Sequence Library
              </span>
              <span className="text-[11px] text-white/40 font-mono">
                8 Master Shots
              </span>
            </div>

            {/* Scrollable list of video clips */}
            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              {allVideos.map((vid, idx) => (
                <div
                  key={vid.id}
                  onClick={() => {
                    setActiveVideoIndex(idx);
                    setIsPlaying(true);
                  }}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    activeVideoIndex === idx
                      ? "glass-panel-glow border-[#e5a93c] scale-[1.01]"
                      : "glass-panel border-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-mono font-bold ${
                        activeVideoIndex === idx ? "text-[#e5a93c]" : "text-white/40"
                      }`}>
                        0{idx + 1}
                      </span>
                      <h5 className="text-sm font-bold text-[#f5f2ec]">{vid.title}</h5>
                    </div>
                    <span className="text-[10px] uppercase font-mono text-white/40">
                      {vid.duration}
                    </span>
                  </div>

                  <p className="text-xs text-[#f5f2ec]/60 mt-1.5 line-clamp-2 font-light">
                    {vid.purpose}
                  </p>

                  {activeVideoIndex === idx && (
                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                      <span className="text-white/40">{vid.section}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyPrompt(vid);
                        }}
                        className="text-[#e5a93c] hover:underline flex items-center gap-1 font-medium"
                      >
                        <Copy size={12} />
                        <span>{copiedId === vid.id ? "Copied!" : "Prompt Info"}</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
