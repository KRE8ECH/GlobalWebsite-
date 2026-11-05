"use client";

import * as React from "react";
import {
  Compass,
  Layers,
  MapPin,
  Sparkles,
  Maximize2,
  RotateCw,
  Info,
  ShieldCheck,
  ChevronRight,
  Eye,
  Camera,
  Activity,
  Cpu,
  BookOpen,
  Trophy,
  Home,
} from "lucide-react";

interface CampusFacility {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  imageSrc: string;
  statBadge: string;
  statLabel: string;
  highlightText: string;
  specs: string[];
  hotspot: { x: number; y: number; label: string };
  icon: typeof Compass;
}

const CAMPUS_FACILITIES: CampusFacility[] = [
  {
    id: "quadrangle",
    name: "Main Academic Quadrangle",
    category: "Campus Core",
    subtitle: "20-Acre Wi-Fi Enabled Eco Campus",
    imageSrc: "/images/official/general/general_11_about-img.jpg",
    statBadge: "20 Acres",
    statLabel: "Green Campus",
    highlightText: "Central administrative tower and tiered multimedia lecture theatres.",
    specs: ["Multi-Storey Academic Block", "Smart Multimedia Theatres", "Council & Moot Court Halls"],
    hotspot: { x: 50, y: 46, label: "Central Academic Block" },
    icon: Compass,
  },
  {
    id: "computing",
    name: "AI & High-Performance Computing",
    category: "R&D Studios",
    subtitle: "Industry-Partnered Research Clusters",
    imageSrc: "/images/official/campus/campus_154_about.jpg",
    statBadge: "18+ Labs",
    statLabel: "Specialized Studios",
    highlightText: "High-throughput GPU clusters, AI/ML nodes, and cloud engineering studios.",
    specs: ["500+ High-End Workstations", "Gigabit Optical Fiber", "Dedicated AI Sandbox"],
    hotspot: { x: 44, y: 52, label: "AI & Robotics Studio" },
    icon: Cpu,
  },
  {
    id: "library",
    name: "Central Digital Library",
    category: "Knowledge Center",
    subtitle: "DELNET & National Digital Library Node",
    imageSrc: "/images/official/general/general_150_abt2.jpg",
    statBadge: "50,000+",
    statLabel: "Volumes & IEEE",
    highlightText: "Exhaustive physical & electronic archives with quiet individual research carrels.",
    specs: ["50,000+ Print Volumes", "IEEE & ScienceDirect Access", "200-Seat Reading Hall"],
    hotspot: { x: 58, y: 40, label: "Digital E-Resource Center" },
    icon: BookOpen,
  },
  {
    id: "sports",
    name: "Sports Complex & Athletic Grounds",
    category: "Athletics & Fitness",
    subtitle: "Inter-University Championship Arena",
    imageSrc: "/images/official/campus/campus_108_Sports-meet1.jpg",
    statBadge: "Full-Size",
    statLabel: "Cricket Ground",
    highlightText: "Olympic-dimension outdoor grounds and indoor gymnasium for active students.",
    specs: ["Full-Size Cricket Arena", "Floodlit Basketball Courts", "Badminton & Table Tennis"],
    hotspot: { x: 62, y: 60, label: "Athletic Arena" },
    icon: Trophy,
  },
  {
    id: "hostels",
    name: "Residential Student Quarters",
    category: "Student Living",
    subtitle: "Separate Hostels for Boys & Girls",
    imageSrc: "/images/official/general/general_151_abt7.jpg",
    statBadge: "1000+ Beds",
    statLabel: "Hostel Capacity",
    highlightText: "Air-cooled secure accommodation with hygienic mess facilities and 24x7 power.",
    specs: ["Separate Hostels with Wardens", "Wi-Fi & Recreational Rooms", "Hygienic Dining Halls"],
    hotspot: { x: 36, y: 42, label: "Residential Quarters" },
    icon: Home,
  },
];

export function Campus3DViewer() {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 });
  const [targetRotation, setTargetRotation] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const [isAutoOrbit, setIsAutoOrbit] = React.useState(true);
  const [showInfoDrawer, setShowInfoDrawer] = React.useState(false);
  const [lightSheen, setLightSheen] = React.useState({ x: 50, y: 50, opacity: 0 });

  const cardRef = React.useRef<HTMLDivElement>(null);
  const activeFacility = CAMPUS_FACILITIES[activeIdx];

  // Smooth mouse tilt tracking with spring physics
  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt (-11 deg to +11 deg)
      const rotateX = ((y - centerY) / centerY) * -11;
      const rotateY = ((x - centerX) / centerX) * 13;

      setTargetRotation({ x: rotateX, y: rotateY });
      setLightSheen({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.4,
      });
    },
    []
  );

  // Smooth lerp animation loop for buttery responsive rotation
  React.useEffect(() => {
    let frameId: number;
    let startTime = Date.now();

    const render = () => {
      if (isHovered) {
        // Damped interpolation towards mouse position
        setRotation((prev) => ({
          x: prev.x + (targetRotation.x - prev.x) * 0.14,
          y: prev.y + (targetRotation.y - prev.y) * 0.14,
        }));
      } else if (isAutoOrbit) {
        // Continuous smooth sinusoidal orbit
        const elapsed = (Date.now() - startTime) / 1000;
        const x = Math.sin(elapsed * 0.9) * 4.5;
        const y = Math.cos(elapsed * 0.7) * 7.0;
        setRotation({ x, y });
      } else {
        // Return smoothly to center
        setRotation((prev) => ({
          x: prev.x + (0 - prev.x) * 0.08,
          y: prev.y + (0 - prev.y) * 0.08,
        }));
      }

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frameId);
  }, [isHovered, isAutoOrbit, targetRotation]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setLightSheen((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div className="w-full flex flex-col space-y-3">
      {/* 3D Perspective Stage Container */}
      <div
        className="w-full select-none"
        style={{ perspective: "1400px" }}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `rotateX(${rotation.x.toFixed(2)}deg) rotateY(${rotation.y.toFixed(2)}deg)`,
            transformStyle: "preserve-3d",
          }}
          className="relative rounded-md border-2 border-amber-400/30 bg-[#071322] shadow-2xl overflow-hidden group/stage transition-shadow duration-300 hover:shadow-amber-500/10 cursor-grab active:cursor-grabbing"
        >
          {/* Main Campus Photographic Canvas */}
          <div className="relative aspect-[16/10] sm:aspect-[16/10] overflow-hidden bg-black">
            <img
              src={activeFacility.imageSrc}
              alt={activeFacility.name}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out photo-enhance group-hover/stage:scale-105"
            />

            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-transparent to-black/40 pointer-events-none" />

            {/* Specular Ambient Lighting Sheen (Moves with cursor) */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${lightSheen.x}% ${lightSheen.y}%, rgba(255,255,255,${lightSheen.opacity}) 0%, transparent 55%)`,
              }}
            />

            {/* Layer 1: Top Floating 3D Pills (translateZ: 45px) */}
            <div
              className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none"
              style={{ transform: "translateZ(45px)" }}
            >
              <div className="flex items-center gap-1.5 bg-[#881337] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-xs shadow-lg border border-amber-400/30">
                <Compass className="h-3.5 w-3.5 text-amber-300 animate-spin-slow" />
                <span>3D Virtual Campus</span>
              </div>

              <div className="bg-black/85 text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded-xs border border-amber-400/40 shadow-lg flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{activeFacility.statBadge}</span>
                <span className="text-stone-300 font-normal">| {activeFacility.statLabel}</span>
              </div>
            </div>

            {/* Layer 2: Floating 3D Interactive Hotspot Pin (translateZ: 65px) */}
            <div
              className="absolute transition-all duration-700 ease-out"
              style={{
                left: `${activeFacility.hotspot.x}%`,
                top: `${activeFacility.hotspot.y}%`,
                transform: "translate(-50%, -50%) translateZ(65px)",
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowInfoDrawer(!showInfoDrawer);
                }}
                className="relative flex items-center justify-center p-2 group/pin cursor-pointer focus:outline-none"
                aria-label={`Inspect ${activeFacility.hotspot.label}`}
                title="Click to inspect facility specifications"
              >
                <span className="h-8 w-8 rounded-full bg-amber-400/25 border border-amber-400 animate-ping absolute" />
                <span className="h-4 w-4 rounded-full bg-amber-400 shadow-xl border-2 border-[#071322] group-hover/pin:scale-125 transition-transform" />
                
                {/* Floating Hotspot Tooltip */}
                <span className="absolute left-full ml-2 whitespace-nowrap bg-[#0b1e32] text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs border border-amber-400/40 shadow-xl pointer-events-none opacity-90 group-hover/pin:opacity-100">
                  {activeFacility.hotspot.label}
                </span>
              </button>
            </div>

            {/* Layer 3: In-Frame Facility Specification Banner (translateZ: 35px) */}
            <div
              className="absolute bottom-3 left-3 right-3 p-3 sm:p-3.5 rounded-xs bg-[#0b1e32]/95 border border-white/20 text-left text-white shadow-2xl"
              style={{ transform: "translateZ(35px)" }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      {activeFacility.category}
                    </span>
                    <span className="text-stone-500">•</span>
                    <span className="text-[10px] text-stone-300">
                      View {activeIdx + 1} of {CAMPUS_FACILITIES.length}
                    </span>
                  </div>

                  <h3 className="font-editorial text-sm sm:text-base font-bold text-white tracking-wide leading-tight">
                    {activeFacility.name}
                  </h3>

                  <p className="text-[11px] text-stone-300 line-clamp-1">
                    {activeFacility.highlightText}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowInfoDrawer(!showInfoDrawer);
                  }}
                  className="shrink-0 bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-xs border border-white/20 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Info className="h-3 w-3 text-amber-300" />
                  <span>{showInfoDrawer ? "Hide Specs" : "Specs"}</span>
                </button>
              </div>

              {/* Expandable Specifications Drawer */}
              {showInfoDrawer && (
                <div className="mt-2.5 pt-2.5 border-t border-white/15 flex flex-wrap gap-2 animate-in fade-in-50 duration-200">
                  {activeFacility.specs.map((spec, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold text-stone-200 bg-white/5 border border-white/15 px-2 py-0.5 rounded-xs"
                    >
                      ✓ {spec}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Interactive Bottom Control Toolbar */}
          <div className="bg-[#0b1e32] px-3.5 py-2 border-t border-white/15 flex items-center justify-between text-xs text-stone-300">
            <div className="flex items-center gap-2 text-[11px] text-stone-400">
              <RotateCw className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden sm:inline">Move mouse cursor across stage to tilt in 3D</span>
              <span className="sm:hidden">Touch & tilt 3D perspective</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAutoOrbit(!isAutoOrbit);
                }}
                className={`px-2.5 py-1 rounded-xs text-[10px] font-bold uppercase tracking-wider transition-colors border cursor-pointer ${
                  isAutoOrbit
                    ? "bg-amber-400/20 text-amber-300 border-amber-400/50"
                    : "bg-white/5 text-stone-400 border-white/15 hover:text-white"
                }`}
              >
                {isAutoOrbit ? "3D Orbit: ACTIVE" : "3D Orbit: PAUSED"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Facility High-Resolution Thumbnails Strip */}
      <div className="grid grid-cols-5 gap-2">
        {CAMPUS_FACILITIES.map((facility, idx) => {
          const Icon = facility.icon;
          const isActive = activeIdx === idx;
          return (
            <button
              key={facility.id}
              onClick={() => {
                setActiveIdx(idx);
                setShowInfoDrawer(false);
              }}
              className={`relative rounded-sm overflow-hidden p-1.5 text-left border transition-all cursor-pointer ${
                isActive
                  ? "bg-[#0b1e32] border-amber-400 ring-2 ring-amber-400/30 text-white shadow-md"
                  : "bg-white/5 border-white/10 text-stone-400 hover:bg-white/10 hover:text-stone-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-amber-400">
                  0{idx + 1}
                </span>
                <Icon className={`h-3 w-3 ${isActive ? "text-amber-300" : "text-stone-500"}`} />
              </div>
              <div className="text-[11px] font-bold truncate mt-1">
                {facility.name.split(" ")[0]}
              </div>
              <div className="text-[9px] text-stone-400 truncate hidden sm:block">
                {facility.statBadge}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
