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
} from "lucide-react";

interface CampusPerspective {
  id: string;
  name: string;
  subtitle: string;
  imageSrc: string;
  statBadge: string;
  statLabel: string;
  description: string;
  pinCoordinates: { x: number; y: number }; // percentage
}

const PERSPECTIVES: CampusPerspective[] = [
  {
    id: "quadrangle",
    name: "Main Academic Quadrangle",
    subtitle: "20-Acre Wi-Fi Enabled Eco Campus",
    imageSrc: "/images/official/general/general_11_about-img.jpg",
    statBadge: "20 Acres",
    statLabel: "Green Campus",
    description: "Multi-storeyed architectural complex housing lecture theatres, administrative offices, and central council hall.",
    pinCoordinates: { x: 50, y: 48 },
  },
  {
    id: "computing",
    name: "Advanced AI & Computing Labs",
    subtitle: "High-Throughput Research Clusters",
    imageSrc: "/images/official/campus/campus_154_about.jpg",
    statBadge: "18+ Labs",
    statLabel: "Specialized Studios",
    description: "Industry-partnered laboratories featuring enterprise servers, AI/ML clusters, and high-speed fiber backbone.",
    pinCoordinates: { x: 42, y: 55 },
  },
  {
    id: "library",
    name: "Central Digital Library",
    subtitle: "DELNET & National Digital Library Node",
    imageSrc: "/images/official/general/general_150_abt2.jpg",
    statBadge: "50,000+",
    statLabel: "Books & Journals",
    description: "Extensive repository of international IEEE journals, reference textbooks, digital archives, and quiet study carrels.",
    pinCoordinates: { x: 58, y: 42 },
  },
  {
    id: "sports",
    name: "Sports Complex & Athletic Grounds",
    subtitle: "Inter-University Championship Arena",
    imageSrc: "/images/official/campus/campus_108_Sports-meet1.jpg",
    statBadge: "Olympic Specs",
    statLabel: "Athletic Arena",
    description: "Full-sized cricket ground, basketball courts, badminton arena, and indoor gymnasium for holistic development.",
    pinCoordinates: { x: 65, y: 62 },
  },
  {
    id: "hostels",
    name: "Residential Student Quarters",
    subtitle: "Separate Hostels for Boys & Girls",
    imageSrc: "/images/official/general/general_151_abt7.jpg",
    statBadge: "1000+ Beds",
    statLabel: "Secure Housing",
    description: "Air-cooled rooms with 24x7 power backup, Wi-Fi connectivity, hygienic dining facilities, and round-the-clock security.",
    pinCoordinates: { x: 35, y: 40 },
  },
];

export function Campus3DViewer() {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const [isAutoOrbit, setIsAutoOrbit] = React.useState(true);
  const [lightSheen, setLightSheen] = React.useState({ x: 50, y: 50, opacity: 0 });

  const cardRef = React.useRef<HTMLDivElement>(null);
  const activePerspective = PERSPECTIVES[activeIdx];

  // Mouse move handler for real-time 3D tilt and ambient light reflection
  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt (-9 deg to +9 deg)
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 10;

      setRotation({ x: rotateX, y: rotateY });
      setLightSheen({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.35,
      });
    },
    []
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setLightSheen((prev) => ({ ...prev, opacity: 0 }));
    if (!isAutoOrbit) {
      setRotation({ x: 0, y: 0 });
    }
  };

  // Gentle ambient 3D orbit when idle and auto-orbit enabled
  React.useEffect(() => {
    if (!isAutoOrbit || isHovered) return;

    let frameId: number;
    let startTime = Date.now();

    const loop = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      // Smooth sinusoidal gentle tilt
      const x = Math.sin(elapsed * 0.8) * 3.5;
      const y = Math.cos(elapsed * 0.6) * 5;
      setRotation({ x, y });
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [isAutoOrbit, isHovered]);

  return (
    <div className="w-full flex flex-col space-y-3">
      {/* 3D Perspective Canvas Container */}
      <div
        className="w-full select-none"
        style={{ perspective: "1200px" }}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `rotateX(${rotation.x.toFixed(2)}deg) rotateY(${rotation.y.toFixed(2)}deg)`,
            transformStyle: "preserve-3d",
            transition: isHovered ? "transform 0.1s ease-out" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="relative rounded-md border-2 border-white/20 bg-[#071322] shadow-2xl overflow-hidden cursor-crosshair group/card"
        >
          {/* Main Photographic Layer */}
          <div className="relative aspect-[16/10] sm:aspect-[16/10] overflow-hidden bg-black">
            <img
              src={activePerspective.imageSrc}
              alt={activePerspective.name}
              className="w-full h-full object-cover object-center transition-all duration-700 ease-out filter contrast-[1.04] saturate-[1.06]"
            />

            {/* Subtle Vignette & Contrast Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-transparent to-black/30 pointer-events-none" />

            {/* Specular Ambient Light Sheen Layer */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${lightSheen.x}% ${lightSheen.y}%, rgba(255,255,255,${lightSheen.opacity}) 0%, transparent 60%)`,
              }}
            />

            {/* Top 3D Status Badges (Pops out in Z-space) */}
            <div
              className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none"
              style={{ transform: "translateZ(35px)" }}
            >
              <div className="flex items-center gap-1.5 bg-[#881337] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xs shadow-md border border-white/20">
                <Compass className="h-3 w-3 text-amber-300" />
                <span>3D Interactive Campus</span>
              </div>

              <div className="bg-black/80 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-xs border border-amber-400/30 flex items-center gap-1">
                <span>{activePerspective.statBadge}</span>
                <span className="text-white/70 font-normal">| {activePerspective.statLabel}</span>
              </div>
            </div>

            {/* Floating 3D Hotspot Pin (Pops out in Z-space) */}
            <div
              className="absolute pointer-events-none transition-all duration-500 ease-out"
              style={{
                left: `${activePerspective.pinCoordinates.x}%`,
                top: `${activePerspective.pinCoordinates.y}%`,
                transform: "translate(-50%, -50%) translateZ(45px)",
              }}
            >
              <div className="relative flex items-center justify-center">
                <span className="h-4 w-4 rounded-full bg-amber-400/30 border border-amber-400 animate-ping absolute" />
                <span className="h-3 w-3 rounded-full bg-amber-400 shadow-lg border-2 border-[#0f2b48]" />
              </div>
            </div>

            {/* Bottom In-Image Specification Banner (Pops out in Z-space) */}
            <div
              className="absolute bottom-3 left-3 right-3 p-3 rounded-xs bg-[#0b1e32]/95 border border-white/15 text-left text-white shadow-xl backdrop-blur-none"
              style={{ transform: "translateZ(30px)" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-editorial text-xs sm:text-sm font-bold text-white tracking-wide">
                    {activePerspective.name}
                  </h3>
                  <p className="text-[10px] text-stone-300 line-clamp-1 mt-0.5">
                    {activePerspective.subtitle}
                  </p>
                </div>

                <div className="text-right shrink-0 ml-3">
                  <span className="text-[9px] uppercase tracking-wider font-mono text-amber-300 block">
                    View {activeIdx + 1}/{PERSPECTIVES.length}
                  </span>
                  <span className="text-[10px] text-stone-400">
                    ESTD. 2008
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive 3D Control Strip */}
          <div className="bg-[#0b1e32] px-3 py-2 border-t border-white/15 flex items-center justify-between text-[11px] text-stone-300">
            <span className="flex items-center gap-1.5 text-stone-400">
              <RotateCw className="h-3 w-3 text-amber-400" />
              <span className="hidden sm:inline">Move cursor to tilt 3D perspective</span>
              <span className="sm:hidden">Interactive 3D view</span>
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsAutoOrbit(!isAutoOrbit);
              }}
              className={`px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-wider transition-colors border ${
                isAutoOrbit
                  ? "bg-amber-400/20 text-amber-300 border-amber-400/40"
                  : "bg-white/5 text-stone-400 border-white/15 hover:text-white"
              }`}
            >
              {isAutoOrbit ? "Orbit: ON" : "Orbit: OFF"}
            </button>
          </div>
        </div>
      </div>

      {/* Perspective Quick Navigation Tabs */}
      <div className="grid grid-cols-5 gap-1.5 pt-0.5">
        {PERSPECTIVES.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => {
              setActiveIdx(idx);
              setRotation({ x: 0, y: 0 });
            }}
            className={`p-1.5 rounded-xs text-left border transition-all ${
              activeIdx === idx
                ? "bg-white/15 border-amber-400 text-white shadow-sm"
                : "bg-white/5 border-white/10 text-stone-400 hover:bg-white/10 hover:text-stone-200"
            }`}
          >
            <div className="text-[9px] font-mono font-bold uppercase tracking-wider text-amber-400 line-clamp-1">
              0{idx + 1}
            </div>
            <div className="text-[10px] font-bold line-clamp-1 leading-tight mt-0.5">
              {p.name.split(" ")[0]}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
