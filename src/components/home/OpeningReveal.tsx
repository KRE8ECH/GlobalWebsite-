"use client";

import * as React from "react";
import { ShieldCheck, Award, Landmark, ArrowRight, Sparkles, Compass } from "lucide-react";

export function OpeningReveal() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    // Skip in automated test environments so test suites run instantaneously
    if (typeof navigator !== "undefined" && navigator.webdriver) {
      return;
    }

    // Always trigger smoothly for real visitors
    setIsVisible(true);

    // Smooth progress counter simulation from 0% to 100%
    const startTime = Date.now();
    const duration = 2100; // 2.1 seconds of smooth cinematic presentation

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);

      if (p >= 100) {
        clearInterval(interval);
        handleDismiss();
      }
    }, 25);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        handleDismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleDismiss = React.useCallback(() => {
    setIsClosing(true);
    // Smooth upward slide transition completes in 700ms
    setTimeout(() => {
      setIsVisible(false);
    }, 700);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      role="status"
      aria-live="polite"
      aria-label="GITM Institutional Gateway Portal"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#071322] text-white transition-all duration-700 ease-in-out ${
        isClosing
          ? "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100"
      }`}
    >
      {/* Background Architectural Canvas with Subtle Golden Rays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#102a45]/60 via-[#071322] to-[#040b14] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-xl mx-auto px-6 text-center flex flex-col items-center select-none">
        {/* 3D Elevated Official College Brand Plaque */}
        <div className="relative group mb-6">
          <div className="absolute -inset-1 rounded-sm bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600 opacity-60 blur-xs transition-opacity duration-500" />
          <div className="relative flex items-center justify-center rounded-sm bg-white px-6 sm:px-8 py-3.5 border-2 border-amber-400 shadow-2xl">
            <img
              src="/images/official/logo/logo_1_logo.png"
              alt="Global Institute of Technology & Management Official Crest & Logo"
              className="h-12 sm:h-16 w-auto object-contain"
            />
          </div>
        </div>

        {/* Heritage Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs border border-amber-400/40 bg-amber-400/10 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
          <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
          <span>Affiliated to Gurugram University • Estd. 2008</span>
        </div>

        {/* Distinguished Serif Title */}
        <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
          GLOBAL INSTITUTE OF TECHNOLOGY & MANAGEMENT
        </h1>

        <p className="text-xs sm:text-sm text-stone-300 font-medium tracking-wide mt-2">
          Approved by AICTE & PCI, New Delhi • DTE Haryana Institute Code: 074
        </p>

        {/* Smooth Animated Horizon Progress Line */}
        <div className="w-64 sm:w-80 h-1 bg-stone-800/80 rounded-full mt-6 mb-3 overflow-hidden relative border border-white/10">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 rounded-full transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-64 sm:w-80 text-[10px] font-mono text-amber-300/90 tracking-widest uppercase">
          <span>ENTERING CAMPUS</span>
          <span>{Math.round(progress)}%</span>
        </div>

        {/* Direct Enter Action */}
        <button
          onClick={handleDismiss}
          className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300 hover:text-white transition-all bg-white/10 hover:bg-white/20 border border-amber-400/30 hover:border-amber-400 rounded-sm px-4 py-2 shadow-md cursor-pointer"
        >
          <span>Enter Campus Directly</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </aside>
  );
}
