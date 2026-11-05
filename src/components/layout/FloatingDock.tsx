"use client";

import * as React from "react";
import {
  GraduationCap,
  Video,
  Bell,
  ArrowUp,
  X,
  Sparkles,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingDock() {
  const [showBackToTop, setShowBackToTop] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  React.useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 350) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <aside
      aria-label="Quick Access Floating Navigation"
      className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 pointer-events-none"
    >
      {/* Back to top floating pill */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto h-9 w-9 rounded-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-[#0f2b48] dark:text-stone-200 shadow-md flex items-center justify-center hover:scale-110 hover:border-[#0f2b48] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Scroll to top of page"
          title="Scroll to top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}

      {/* Main Floating Quick Action Dock */}
      <div className="pointer-events-auto shadow-2xl rounded-full border border-stone-300/80 dark:border-stone-700/80 bg-white/95 dark:bg-[#0c1829]/95 backdrop-blur-md p-1.5 flex items-center gap-1.5 transition-all">
        {isCollapsed ? (
          <button
            onClick={() => setIsCollapsed(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#881337] text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-[#70102e] transition-colors"
            aria-label="Expand Quick Academic Actions"
          >
            <GraduationCap className="h-4 w-4" />
            <span>Admissions 2026-27</span>
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
        ) : (
          <>
            {/* Admissions 2026-27 Button */}
            <a
              href="#inquiry"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#881337] hover:bg-[#70102e] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-transform active:scale-95"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300" />
              </span>
              <GraduationCap className="h-3.5 w-3.5" />
              <span>Apply Now</span>
            </a>

            {/* Virtual Campus Tour */}
            <a
              href="#campus-life"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-[#0f2b48] dark:text-stone-200 text-xs font-bold uppercase tracking-wider transition-colors"
              title="Watch Campus Video Tour & Facilities"
            >
              <Video className="h-3.5 w-3.5 text-[#881337] dark:text-amber-400" />
              <span>Campus Tour</span>
            </a>

            {/* Live Notices Shortcut */}
            <a
              href="#notices"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-[#0f2b48] dark:text-stone-200 text-xs font-bold uppercase tracking-wider transition-colors"
              title="Gurugram University Exam & Result Circulars"
            >
              <Bell className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
              <span className="hidden md:inline">Circulars</span>
            </a>

            {/* Collapse toggle */}
            <button
              onClick={() => setIsCollapsed(true)}
              className="h-7 w-7 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors ml-0.5"
              aria-label="Collapse quick actions bar"
              title="Minimize"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
