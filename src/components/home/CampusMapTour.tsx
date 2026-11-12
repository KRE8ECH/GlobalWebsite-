"use client";

import React, { useState } from "react";
import {
  Navigation,
  Video,
  Compass,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
} from "lucide-react";
import MapFlightCanvas from "@/components/3d/MapFlightCanvas";
import CampusVideoPlayer from "@/components/home/CampusVideoPlayer";
import { Button } from "@/components/ui/button";

interface CampusMapTourProps {
  id?: string;
  defaultMode?: "map" | "video";
}

export default function CampusMapTour({
  id = "campus-tour",
  defaultMode = "map",
}: CampusMapTourProps) {
  const [currentMode, setCurrentMode] = useState<"map" | "video">(defaultMode);
  const [hasVisitedCampus, setHasVisitedCampus] = useState(false);

  const handleFlightArrival = () => {
    setHasVisitedCampus(true);
    setCurrentMode("video");
  };

  return (
    <div id={id} className="w-full space-y-4">
      {/* Top Header & Mode Switcher Deck */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-stone-900 border border-stone-800 rounded-md text-white shadow-md">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider bg-[#881337] text-white px-2.5 py-0.5 rounded-xs border border-amber-400/30">
              <Compass className="h-3.5 w-3.5 text-amber-300" />
              <span>Interactive Campus Journey</span>
            </span>
            <span className="text-stone-500 hidden sm:inline">•</span>
            <span className="text-[11px] text-stone-300 font-mono hidden sm:inline">
              Farrukhnagar, Gurugram (Delhi-NCR)
            </span>
          </div>

          <h3 className="font-editorial text-base sm:text-lg font-bold text-white tracking-wide">
            {currentMode === "map"
              ? "Aerial Highway Navigation: Delhi-NCR to GITM 20-Acre Campus"
              : "Experience GITM: 20-Acre Campus Infrastructure & Walkthrough"}
          </h3>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-1 p-1 bg-black/70 border border-white/15 rounded-xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setCurrentMode("map")}
            className={`px-3 py-1.5 rounded-xs text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              currentMode === "map"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-stone-400 hover:text-white hover:bg-stone-800"
            }`}
          >
            <Navigation className="h-3.5 w-3.5" />
            <span>1. Map Flight</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentMode("video")}
            className={`px-3 py-1.5 rounded-xs text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              currentMode === "video"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-stone-400 hover:text-white hover:bg-stone-800"
            }`}
          >
            <Video className="h-3.5 w-3.5" />
            <span>2. Video Tour</span>
            {hasVisitedCampus && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* Dynamic Stage: Flight Canvas vs Full HD Video Player */}
      <div className="relative">
        {currentMode === "map" ? (
          <MapFlightCanvas onArriveAtCampus={handleFlightArrival} />
        ) : (
          <CampusVideoPlayer onBackToMap={() => setCurrentMode("map")} autoPlay={true} />
        )}
      </div>

      {/* Institutional Metadata & Campus Visitation Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
        <div className="p-3 rounded-md border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 flex items-start gap-2.5">
          <MapPin className="h-4 w-4 text-[#881337] dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-stone-900 dark:text-stone-100">Campus Location</div>
            <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5 leading-relaxed">
              5 KM Milestone, Farrukhnagar - Gurgaon Road, Gurugram, Haryana - 122506
            </p>
          </div>
        </div>

        <div className="p-3 rounded-md border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 flex items-start gap-2.5">
          <Clock className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-stone-900 dark:text-stone-100">Visiting Hours & Tours</div>
            <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5 leading-relaxed">
              Monday – Saturday, 9:00 AM – 5:00 PM. Guided lab inspections available.
            </p>
          </div>
        </div>

        <div className="p-3 rounded-md border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 flex items-center justify-between">
          <div>
            <div className="font-bold text-stone-900 dark:text-stone-100">Schedule Physical Visit</div>
            <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">
              Direct counselor assistance
            </p>
          </div>
          <Button asChild size="sm" className="bg-[#0f2b48] hover:bg-[#1a3a5e] text-white text-xs font-bold uppercase tracking-wider rounded-xs shrink-0">
            <a href="#inquiry" className="flex items-center gap-1">
              <span>Book Visit</span>
              <ArrowRight className="h-3 w-3" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
