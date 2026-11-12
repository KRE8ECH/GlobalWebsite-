"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Navigation,
  MapPin,
  Compass,
  Play,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Radio,
  ArrowRight,
  Maximize2,
} from "lucide-react";

interface Waypoint {
  name: string;
  sub: string;
  x: number; // 0 to 1 normalized
  y: number; // 0 to 1 normalized
  km: string;
  isDestination?: boolean;
}

const WAYPOINTS: Waypoint[] = [
  { name: "New Delhi / IGI Hub", sub: "Terminal 3 Corridor", x: 0.12, y: 0.22, km: "0 KM" },
  { name: "Gurugram Cyber City", sub: "DLF Cyber Hub SEZ", x: 0.35, y: 0.38, km: "12 KM" },
  { name: "Dwarka Expressway", sub: "KMP Corridor Junction", x: 0.58, y: 0.48, km: "19 KM" },
  {
    name: "GITM 20-Acre Campus",
    sub: "Farrukhnagar - Gurgaon Road",
    x: 0.82,
    y: 0.68,
    km: "24 KM (Arrived)",
    isDestination: true,
  },
];

interface MapFlightCanvasProps {
  onArriveAtCampus?: () => void;
  className?: string;
  autoTransitionDelay?: number; // ms to wait after arrival before auto-opening video (default 2500)
}

export default function MapFlightCanvas({
  onArriveAtCampus,
  className = "",
  autoTransitionDelay = 2800,
}: MapFlightCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0); // 0 to 1
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasArrived, setHasArrived] = useState(false);
  const [activeWaypoint, setActiveWaypoint] = useState(0);

  const progressRef = useRef(0);
  const isPlayingRef = useRef(true);

  // Bezier curve control points for realistic highway curve
  const getPointOnPath = (t: number, w: number, h: number) => {
    // 3-segment piecewise curve through waypoints
    const p0 = { x: WAYPOINTS[0].x * w, y: WAYPOINTS[0].y * h };
    const p1 = { x: WAYPOINTS[1].x * w, y: WAYPOINTS[1].y * h };
    const p2 = { x: WAYPOINTS[2].x * w, y: WAYPOINTS[2].y * h };
    const p3 = { x: WAYPOINTS[3].x * w, y: WAYPOINTS[3].y * h };

    if (t <= 0.33) {
      const u = t / 0.33;
      return {
        x: p0.x + (p1.x - p0.x) * u,
        y: p0.y + (p1.y - p0.y) * u,
      };
    } else if (t <= 0.66) {
      const u = (t - 0.33) / 0.33;
      return {
        x: p1.x + (p2.x - p1.x) * u,
        y: p1.y + (p2.y - p1.y) * u,
      };
    } else {
      const u = (t - 0.66) / 0.34;
      return {
        x: p2.x + (p3.x - p2.x) * u,
        y: p2.y + (p3.y - p2.y) * u,
      };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    let radarAngle = 0;
    let trailParticles: { x: number; y: number; alpha: number }[] = [];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Advance flight progress
      if (isPlayingRef.current) {
        if (progressRef.current < 1) {
          progressRef.current += 0.0035; // ~5-6 seconds flight duration
          if (progressRef.current >= 1) {
            progressRef.current = 1;
            setHasArrived(true);
          }
          setProgress(progressRef.current);

          // Update active waypoint index based on progress
          if (progressRef.current < 0.3) setActiveWaypoint(0);
          else if (progressRef.current < 0.6) setActiveWaypoint(1);
          else if (progressRef.current < 0.95) setActiveWaypoint(2);
          else setActiveWaypoint(3);
        }
      }

      radarAngle += 0.035;

      // 1. Dark Satellite / Tactical Grid Background
      ctx.fillStyle = "#071322";
      ctx.fillRect(0, 0, width, height);

      // Grid coordinate lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Sweeping Radar Cone around Destination
      const destX = WAYPOINTS[3].x * width;
      const destY = WAYPOINTS[3].y * height;
      const radarRadius = Math.min(width, height) * 0.42;

      ctx.save();
      ctx.beginPath();
      ctx.arc(destX, destY, radarRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(217, 119, 6, 0.25)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Concentric range circles (5km, 10km, 20km)
      [0.35, 0.65, 1.0].forEach((ratio) => {
        ctx.beginPath();
        ctx.arc(destX, destY, radarRadius * ratio, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(217, 119, 6, 0.15)";
        ctx.stroke();
      });

      // Rotating radar beam
      const radarGrad = ctx.createRadialGradient(destX, destY, 2, destX, destY, radarRadius);
      radarGrad.addColorStop(0, "rgba(217, 119, 6, 0.25)");
      radarGrad.addColorStop(1, "rgba(217, 119, 6, 0)");
      ctx.fillStyle = radarGrad;
      ctx.beginPath();
      ctx.moveTo(destX, destY);
      ctx.arc(destX, destY, radarRadius, radarAngle, radarAngle + 0.45);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // 3. Draw Road Contours (Highway lines)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      WAYPOINTS.forEach((pt, i) => {
        const px = pt.x * width;
        const py = pt.y * height;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();

      // 4. Draw Completed Golden Flight Path
      const currentPos = getPointOnPath(progressRef.current, width, height);

      ctx.strokeStyle = "#f59e0b"; // Golden amber flight line
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      const samples = 100;
      const currentSamples = Math.floor(samples * progressRef.current);
      for (let s = 0; s <= currentSamples; s++) {
        const pt = getPointOnPath(s / samples, width, height);
        if (s === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();

      // Glowing halo on active route
      ctx.strokeStyle = "rgba(245, 158, 11, 0.25)";
      ctx.lineWidth = 10;
      ctx.stroke();

      // 5. Particle Trail behind Drone
      if (isPlayingRef.current && progressRef.current < 1) {
        trailParticles.push({ x: currentPos.x, y: currentPos.y, alpha: 0.9 });
      }
      for (let i = trailParticles.length - 1; i >= 0; i--) {
        const p = trailParticles[i];
        p.alpha -= 0.025;
        if (p.alpha <= 0) {
          trailParticles.splice(i, 1);
        } else {
          ctx.fillStyle = `rgba(245, 158, 11, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 6. Draw Waypoint Nodes
      WAYPOINTS.forEach((pt, idx) => {
        const px = pt.x * width;
        const py = pt.y * height;
        const isReached = progressRef.current >= (idx === 0 ? 0 : idx === 1 ? 0.33 : idx === 2 ? 0.66 : 0.98);

        // Outer pulsing ring
        if (pt.isDestination) {
          ctx.beginPath();
          ctx.arc(px, py, 14 + Math.sin(radarAngle * 2) * 4, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(217, 119, 6, 0.8)";
          ctx.lineWidth = 2;
          ctx.stroke();

          // Destination Crest icon background
          ctx.fillStyle = "#881337"; // Crimson
          ctx.beginPath();
          ctx.arc(px, py, 10, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#fbbf24";
          ctx.lineWidth = 2;
          ctx.stroke();
        } else {
          ctx.fillStyle = isReached ? "#f59e0b" : "#475569";
          ctx.beginPath();
          ctx.arc(px, py, 5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Waypoint Label Tags
        ctx.fillStyle = isReached ? "#FFFFFF" : "#94a3b8";
        ctx.font = "bold 11px system-ui, -apple-system, sans-serif";
        ctx.textAlign = px > width * 0.7 ? "right" : "left";
        const textOffsetX = px > width * 0.7 ? -16 : 16;
        ctx.fillText(pt.name, px + textOffsetX, py - 4);

        ctx.fillStyle = isReached ? "#fbbf24" : "#64748b";
        ctx.font = "10px monospace";
        ctx.fillText(`${pt.km} • ${pt.sub}`, px + textOffsetX, py + 10);
      });

      // 7. Draw Drone / Transit Indicator along route
      ctx.save();
      ctx.translate(currentPos.x, currentPos.y);

      // Target Reticle
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, 9, 0, Math.PI * 2);
      ctx.stroke();

      // Heading arrow pointing along route direction
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Pulsing wave
      ctx.beginPath();
      ctx.arc(0, 0, 16 + (progressRef.current * 20) % 10, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(251, 191, 36, 0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // 8. Destination Reached Banner Overlay on Canvas
      if (progressRef.current >= 0.99) {
        ctx.fillStyle = "rgba(7, 19, 34, 0.85)";
        ctx.fillRect(width * 0.5 - 130, height * 0.82, 260, 48);
        ctx.strokeStyle = "#f59e0b";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(width * 0.5 - 130, height * 0.82, 260, 48);

        ctx.fillStyle = "#10b981";
        ctx.font = "bold 11px monospace";
        ctx.textAlign = "center";
        ctx.fillText("● TARGET REACHED: 20-ACRE CAMPUS", width * 0.5, height * 0.82 + 18);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 12px system-ui, sans-serif";
        ctx.fillText("Global Institute of Technology & Management", width * 0.5, height * 0.82 + 36);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // When arrived, automatically trigger video callback after delay
  useEffect(() => {
    if (hasArrived && onArriveAtCampus) {
      const timer = setTimeout(() => {
        onArriveAtCampus();
      }, autoTransitionDelay);
      return () => clearTimeout(timer);
    }
  }, [hasArrived, onArriveAtCampus, autoTransitionDelay]);

  const handleRestart = () => {
    progressRef.current = 0;
    setProgress(0);
    setHasArrived(false);
    setActiveWaypoint(0);
    isPlayingRef.current = true;
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    isPlayingRef.current = !isPlayingRef.current;
    setIsPlaying(isPlayingRef.current);
  };

  return (
    <div className={`relative w-full rounded-md overflow-hidden border-2 border-amber-500/30 bg-[#071322] ${className}`}>
      {/* Flight Radar Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full aspect-[16/10] sm:aspect-[21/9] block"
        title="Interactive Flight Navigation to GITM Campus"
      />

      {/* Top Telemetry HUD Header */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-[#0b1e32]/90 backdrop-blur-md px-3 py-1.5 rounded-xs border border-amber-400/30 text-white shadow-lg">
          <Radio className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-amber-300">
            Delhi-NCR Flight Radar
          </span>
          <span className="hidden sm:inline text-stone-500">|</span>
          <span className="hidden sm:inline text-[11px] text-stone-300 font-mono">
            ETA: {hasArrived ? "ARRIVED" : `${Math.ceil((1 - progress) * 6)}s`}
          </span>
        </div>

        {/* Live GPS Coordinates HUD */}
        <div className="hidden md:flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xs border border-white/20 text-[11px] font-mono text-stone-300 shadow-lg">
          <Navigation className="h-3.5 w-3.5 text-emerald-400" />
          <span>28.4595° N, 76.9248° E</span>
          <span className="text-stone-500">•</span>
          <span className="text-amber-300 font-bold">ALT 216m</span>
        </div>
      </div>

      {/* Bottom Control Bar */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 p-2 bg-[#050e18]/95 backdrop-blur-md border border-white/15 rounded-xs text-xs">
        {/* Left: Play/Pause/Replay Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleTogglePlay}
            className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-xs font-mono text-xs uppercase flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Play className={`h-3 w-3 ${isPlaying ? "text-amber-400" : ""}`} />
            <span>{isPlaying ? "Pause" : "Resume"}</span>
          </button>

          <button
            type="button"
            onClick={handleRestart}
            className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white rounded-xs font-mono text-xs uppercase flex items-center gap-1 transition-colors cursor-pointer"
            title="Replay Flight Path"
          >
            <RotateCcw className="h-3 w-3" />
            <span className="hidden sm:inline">Replay</span>
          </button>

          <span className="text-[11px] text-stone-400 font-mono pl-1">
            {WAYPOINTS[activeWaypoint]?.name}
          </span>
        </div>

        {/* Right: Enter College Tour Video Button */}
        {onArriveAtCampus && (
          <button
            type="button"
            onClick={onArriveAtCampus}
            className={`px-3 py-1 rounded-xs font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
              hasArrived
                ? "bg-emerald-600 hover:bg-emerald-500 text-white animate-pulse"
                : "bg-amber-600 hover:bg-amber-500 text-white"
            }`}
          >
            <span>{hasArrived ? "Enter College Tour Video Now" : "Skip to Tour Video"}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
