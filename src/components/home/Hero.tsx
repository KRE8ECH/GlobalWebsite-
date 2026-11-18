"use client";

import * as React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  FileCheck,
  BookOpen,
  ArrowRight,
  MapPin,
  PhoneCall,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedLedger } from "./AnimatedLedger";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Hero() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [userPaused, setUserPaused] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);
  const [videoLoaded, setVideoLoaded] = React.useState(false);

  // Detect and respect prefers-reduced-motion preferences without cascading renders
  const prefersReducedMotion = React.useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  const isPlaying = !prefersReducedMotion && !userPaused;

  // Sync video playback with isPlaying state
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isPlaying]);

  // Play / Pause toggle
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setUserPaused(true);
    } else {
      video.play().catch(() => {});
      setUserPaused(false);
    }
  };

  // Discreet Audio Toggle (requires explicit user gesture for unmuting)
  const toggleAudio = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.muted = false;
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <section
      className="hero-viewport-section relative w-full flex flex-col justify-between bg-[#071322] text-white overflow-hidden border-b border-[#0b1e32]"
      style={{
        minHeight: "calc(100vh - 184px)",
      }}
      aria-label="Institutional Welcome & Overview"
    >
      {/* 1. CINEMATIC FULL-WIDTH CAMPUS VIDEO BACKGROUND (Edge-to-Edge) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Campus fallback poster (seamless crossfade on load) */}
        <img
          src="/videos/thumb_2s.jpg"
          alt="GITM Gurgaon 20-Acre Campus Ground"
          style={{ objectFit: "cover" }}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
            videoLoaded ? "opacity-0" : "opacity-100"
          }`}
          loading="eager"
        />

        {/* Ambient HTML5 Campus Video - Natural vibrant colors without heavy blue tints */}
        <video
          ref={videoRef}
          src="/videos/gitm_hero_bg.mp4"
          poster="/videos/thumb_2s.jpg"
          autoPlay={!prefersReducedMotion}
          muted={isMuted}
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          style={{
            objectFit: "cover",
            filter: "contrast(1.08) saturate(1.18) brightness(1.02)",
            imageRendering: "-webkit-optimize-contrast",
          }}
          className="absolute inset-0 w-full h-full object-cover object-center"
          aria-hidden="true"
        />

        {/* Subtle, localized directional scrim for text legibility without obscuring the campus footage */}
        {/* Left-to-right reading scrim: darker behind text on the left, fading completely to transparent so the video shines */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent sm:via-black/35 sm:to-transparent lg:w-4/5" />

        {/* Gentle bottom grounding fade into the ledger */}
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0a1b2d] via-[#0a1b2d]/50 to-transparent" />

        {/* Gentle top vignette for header transition */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 via-black/15 to-transparent" />
      </div>

      {/* 2. OVERSIZED EDITORIAL HERO CONTENT SUITE */}
      <div className="relative z-10 w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 lg:py-12 flex-1 flex flex-col justify-center">
        <div className="max-w-4xl lg:max-w-6xl text-left">
          {/* Statutory Heritage & Regulatory Approvals Strip (Compact, Elegant Pills) */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-4 sm:mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-black/40 px-3.5 py-1 text-[11px] sm:text-xs font-semibold text-amber-300 shadow-xs backdrop-blur-md">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span>Affiliated to Gurugram University</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3.5 py-1 text-[11px] sm:text-xs font-medium text-stone-200 backdrop-blur-md">
              <Award className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span>AICTE & PCI Approved</span>
            </span>

            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3.5 py-1 text-[11px] sm:text-xs font-medium text-stone-300 backdrop-blur-md">
              <FileCheck className="h-3.5 w-3.5 text-stone-400 shrink-0" />
              <span>DTE Haryana Code: 074</span>
            </span>

            <span className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3.5 py-1 text-[11px] sm:text-xs font-medium text-amber-300/90 backdrop-blur-md">
              <Sparkles className="h-3 w-3 text-amber-400 shrink-0" />
              <span>Estd. 2008 • Delhi-NCR</span>
            </span>
          </div>

          {/* Majestic Oversized Editorial Serif Headline */}
          <h1
            className="hero-editorial-headline font-editorial font-semibold text-white tracking-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.75)] mb-4 sm:mb-6 lg:mb-7"
            style={{
              fontSize: "clamp(2.6rem, 6.2vw + 0.5rem, 7.5rem)",
              lineHeight: 1.02,
            }}
          >
            Make your next move{" "}
            <br className="hidden sm:inline" />
            <span className="italic font-normal text-white">meaningful.</span>
          </h1>

          {/* Authoritative Institutional Overview */}
          <p className="text-base sm:text-lg lg:text-xl text-stone-100/90 leading-relaxed font-normal max-w-2xl lg:max-w-3xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] mb-6 sm:mb-8 lg:mb-9">
            Empowering over 15,000 engineers, innovators, and leaders across 20 green acres in Delhi-NCR. Delivering premier degrees in{" "}
            <span className="text-amber-300 font-semibold">B.Tech (CSE, AI & Data Science)</span>,{" "}
            <span className="text-amber-300 font-semibold">MBA</span>, and{" "}
            <span className="text-amber-300 font-semibold">B.Pharm</span> aligned with NEP 2020.
          </p>

          {/* Primary Action Button Suite */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8 lg:mb-9">
            {/* CTA 1: Apply Now */}
            <Button
              asChild
              size="lg"
              className="bg-[#881337] hover:bg-[#70102e] text-white font-bold h-12 sm:h-13 px-6 sm:px-8 text-xs sm:text-sm uppercase tracking-wider rounded-sm shadow-2xl transition-all duration-200 hover:scale-[1.02] active:scale-95 group/apply cursor-pointer"
            >
              <Link href="#inquiry" className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <span>Apply Now 2026-27</span>
                <ArrowRight className="h-4 w-4 group-hover/apply:translate-x-1 transition-transform" />
              </Link>
            </Button>

            {/* CTA 2: Explore Programs */}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/40 bg-black/35 hover:bg-white hover:text-[#0f2b48] text-white backdrop-blur-md font-bold h-12 sm:h-13 px-6 sm:px-7 text-xs sm:text-sm uppercase tracking-wider rounded-sm shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer"
            >
              <Link href="#programs" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-amber-300" />
                <span>Explore Programs</span>
              </Link>
            </Button>

            {/* CTA 3: Watch Campus Tour */}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-amber-400/50 bg-black/35 text-amber-300 hover:bg-amber-400 hover:text-stone-950 backdrop-blur-md font-bold h-12 sm:h-13 px-5 sm:px-6 text-xs sm:text-sm uppercase tracking-wider rounded-sm shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer"
            >
              <a href="#campus-tour" className="flex items-center gap-2" aria-label="Jump to Virtual Campus Tour">
                <Play className="h-4 w-4 fill-amber-300" />
                <span>Campus Tour</span>
              </a>
            </Button>
          </div>

          {/* Institutional Trust Line & Ambient Video Controls Bar */}
          <div className="pt-5 sm:pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/15">
            {/* Left: Admissions Helpline & Location */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-stone-200">
              <a
                href="tel:+919555100100"
                className="inline-flex items-center gap-1.5 font-bold text-amber-300 hover:text-amber-200 transition-colors drop-shadow-sm"
              >
                <PhoneCall className="h-3.5 w-3.5 text-amber-400" />
                <span>Admissions Helpline: +91-9555 100 100</span>
              </a>

              <span className="hidden sm:inline text-white/40">•</span>

              <span className="inline-flex items-center gap-1 text-stone-200/90 drop-shadow-sm">
                <MapPin className="h-3.5 w-3.5 text-amber-400/80 shrink-0" />
                <span>5 KM Milestone, Farrukhnagar - Gurgaon Road, Gurugram</span>
              </span>
            </div>

            {/* Right: Discreet Ambient Video Controls */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause background video" : "Play background video"}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 hover:bg-black/60 px-3 py-1.5 text-[11px] font-semibold text-stone-200 hover:text-white backdrop-blur-md transition-all duration-200 cursor-pointer shadow-xs"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-3.5 w-3.5 text-amber-300" />
                    <span className="hidden sm:inline">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
                    <span className="hidden sm:inline">Play</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={toggleAudio}
                aria-label={isMuted ? "Unmute campus tour audio" : "Mute campus tour audio"}
                className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-black/40 hover:bg-black/60 px-3 py-1.5 text-[11px] font-semibold text-stone-200 hover:text-white backdrop-blur-md transition-all duration-200 cursor-pointer shadow-xs"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="h-3.5 w-3.5 text-amber-400" />
                    <span>Sound On</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Sound Playing</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. GROUNDED INSTITUTIONAL LEDGER (Seamlessly Anchoring Hero Base) */}
      <AnimatedLedger />
    </section>
  );
}

export default Hero;
