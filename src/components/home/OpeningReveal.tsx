"use client";

import * as React from "react";
import { ShieldCheck, Award, Landmark, ArrowRight, Sparkles } from "lucide-react";

export function OpeningReveal() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  React.useEffect(() => {
    // 1. Skip immediately in test environments (Playwright, CI, automated webdrivers)
    if (typeof navigator !== "undefined" && navigator.webdriver) {
      return;
    }

    // 2. Check if already revealed in this user session
    try {
      if (sessionStorage.getItem("gitm_gateway_revealed") === "true") {
        return;
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }

    // Activate the opening reveal
    setIsVisible(true);

    // Auto-dismiss after 1.8 seconds with smooth upward exit
    const exitTimer = setTimeout(() => {
      dismissReveal();
    }, 1800);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        dismissReveal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(exitTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const dismissReveal = React.useCallback(() => {
    setIsClosing(true);
    try {
      sessionStorage.setItem("gitm_gateway_revealed", "true");
    } catch {
      // Ignore
    }

    // Remove from DOM after transition completes (600ms)
    setTimeout(() => {
      setIsVisible(false);
    }, 600);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Institutional Opening Portal"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#071322] text-white transition-all duration-700 ease-in-out ${
        isClosing
          ? "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100"
      }`}
    >
      {/* Background Architectural Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#153456_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Central Content Box */}
      <div className="relative z-10 max-w-xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Institutional Emblem Frame with Subtle Glow */}
        <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-sm bg-white p-2 border-2 border-amber-400 shadow-2xl mb-5 animate-in zoom-in-75 duration-700">
          <img
            src="/images/official/logo/logo_1_logo.png"
            alt="GITM Gurgaon Official Crest"
            className="h-full w-full object-contain"
          />
        </div>

        {/* Founding Era & Affiliation Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs border border-amber-400/40 bg-amber-400/10 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-3">
          <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
          <span>Affiliated to Gurugram University • Estd. 2008</span>
        </div>

        {/* Distinguished Editorial Headings */}
        <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
          GLOBAL INSTITUTE OF TECHNOLOGY & MANAGEMENT
        </h1>

        <p className="text-xs sm:text-sm text-stone-300 font-medium tracking-wide mt-2">
          Approved by AICTE & PCI, New Delhi • DTE Haryana Code: 074
        </p>

        {/* Golden Sweeping Horizon Bar */}
        <div className="w-56 sm:w-72 h-0.5 bg-stone-800 rounded-full mt-6 mb-4 overflow-hidden relative">
          <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 w-full animate-marquee-progress" />
        </div>

        <p className="text-[11px] font-mono text-amber-400/80 uppercase tracking-widest">
          Initiating Institutional Portal...
        </p>

        {/* Manual Enter Button */}
        <button
          onClick={dismissReveal}
          className="mt-6 flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors border border-white/10 hover:border-white/30 rounded px-3 py-1.5 bg-white/5"
        >
          <span>Enter Campus Directly</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
