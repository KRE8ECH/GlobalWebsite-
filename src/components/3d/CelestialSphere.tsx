"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles, Compass, Eye, RotateCw } from "lucide-react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Face3D {
  a: number;
  b: number;
  c: number;
  colorBase: string;
}

export default function CelestialSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activePreset, setActivePreset] = useState<"orbit" | "frontal" | "zenith">("orbit");
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  // State refs for animation loop
  const rotRef = useRef({ x: 0.35, y: 0.6 });
  const velRef = useRef({ x: 0.002, y: 0.004 });
  const targetTiltRef = useRef({ x: 0, y: 0 });
  const mouseDragRef = useRef<{ isDragging: boolean; lastX: number; lastY: number }>({
    isDragging: false,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    const focalLength = 380;

    // Handle high DPI resize
    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    // 3D Geometry Definition: Octahedron core
    const coreRadius = 45;
    const coreVertices: Point3D[] = [
      { x: 0, y: -coreRadius * 1.3, z: 0 }, // Top
      { x: coreRadius, y: 0, z: coreRadius },
      { x: -coreRadius, y: 0, z: coreRadius },
      { x: -coreRadius, y: 0, z: -coreRadius },
      { x: coreRadius, y: 0, z: -coreRadius },
      { x: 0, y: coreRadius * 1.3, z: 0 }, // Bottom
    ];

    const coreFaces: Face3D[] = [
      { a: 0, b: 1, c: 2, colorBase: "218, 165, 32" }, // Gold
      { a: 0, b: 2, c: 3, colorBase: "184, 134, 11" },
      { a: 0, b: 3, c: 4, colorBase: "218, 165, 32" },
      { a: 0, b: 4, c: 1, colorBase: "245, 208, 115" },
      { a: 5, b: 2, c: 1, colorBase: "184, 134, 11" },
      { a: 5, b: 3, c: 2, colorBase: "140, 100, 10" },
      { a: 5, b: 4, c: 3, colorBase: "184, 134, 11" },
      { a: 5, b: 1, c: 4, colorBase: "218, 165, 32" },
    ];

    // Background floating starlight particles
    const particleCount = 70;
    const particles: Point3D[] = [];
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      const r = 90 + Math.random() * 110;
      particles.push({
        x: r * Math.cos(phi) * Math.sin(theta),
        y: r * Math.sin(phi),
        z: r * Math.cos(phi) * Math.cos(theta),
      });
    }

    // Helper: Rotate Point in 3D
    const rotatePoint = (p: Point3D, rotX: number, rotY: number, rotZ: number = 0): Point3D => {
      // Rotate Y
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = p.x * cosY + p.z * sinY;
      const z1 = -p.x * sinY + p.z * cosY;

      // Rotate X
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;

      // Rotate Z (if any)
      if (rotZ !== 0) {
        const cosZ = Math.cos(rotZ);
        const sinZ = Math.sin(rotZ);
        const x3 = x1 * cosZ - y2 * sinZ;
        const y3 = x1 * sinZ + y2 * cosZ;
        return { x: x3, y: y3, z: z2 };
      }

      return { x: x1, y: y2, z: z2 };
    };

    // Helper: Project 3D to 2D screen
    const project = (p: Point3D): { x: number; y: number; scale: number; visible: boolean } => {
      const zDist = focalLength + p.z;
      if (zDist <= 10) return { x: 0, y: 0, scale: 0, visible: false };
      const scale = focalLength / zDist;
      return {
        x: width / 2 + p.x * scale,
        y: height / 2 + p.y * scale,
        scale,
        visible: true,
      };
    };

    // Render loop
    let time = 0;
    const render = () => {
      time += 0.015;

      // Inertia & Auto-spin
      if (!mouseDragRef.current.isDragging) {
        rotRef.current.y += velRef.current.y;
        rotRef.current.x += velRef.current.x;

        // Smoothly decay velocity towards steady idle rotation
        velRef.current.y = velRef.current.y * 0.96 + 0.003 * 0.04;
        velRef.current.x = velRef.current.x * 0.96 + 0.0005 * 0.04;

        // Elastic tilt toward cursor
        rotRef.current.x += (targetTiltRef.current.x - rotRef.current.x) * 0.03;
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // 1. Draw Subtle Ambient Aura at center
      const aura = ctx.createRadialGradient(cx, cy, 10, cx, cy, 160);
      aura.addColorStop(0, "rgba(217, 119, 6, 0.16)"); // Warm amber
      aura.addColorStop(0.5, "rgba(15, 43, 72, 0.12)"); // Academic navy
      aura.addColorStop(1, "rgba(15, 43, 72, 0)");
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(cx, cy, 160, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw 3D Floating Particles
      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];
        // Slow organic orbit
        const orbited = {
          x: pt.x * Math.cos(time * 0.1) - pt.z * Math.sin(time * 0.1),
          y: pt.y + Math.sin(time + i) * 3,
          z: pt.x * Math.sin(time * 0.1) + pt.z * Math.cos(time * 0.1),
        };
        const rotPt = rotatePoint(orbited, rotRef.current.x, rotRef.current.y);
        const proj = project(rotPt);
        if (proj.visible) {
          const alpha = Math.max(0.1, Math.min(0.85, (rotPt.z + 140) / 280));
          ctx.fillStyle = i % 3 === 0 ? `rgba(245, 158, 11, ${alpha})` : `rgba(186, 230, 253, ${alpha * 0.6})`;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, Math.max(1, 1.8 * proj.scale), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Helper to draw a 3D Ring
      const drawRing = (
        radius: number,
        segments: number,
        tiltX: number,
        tiltZ: number,
        colorStroke: string,
        lineWidth: number,
        dashPattern: number[] = [],
        hasTicks: boolean = false
      ) => {
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = colorStroke;
        ctx.setLineDash(dashPattern);

        const ringPoints: { x: number; y: number; z: number }[] = [];
        for (let s = 0; s <= segments; s++) {
          const angle = (s / segments) * Math.PI * 2;
          const px = radius * Math.cos(angle);
          const py = radius * Math.sin(angle);
          const pz = 0;

          // Apply ring intrinsic orientation tilt
          const tilted = rotatePoint({ x: px, y: py, z: pz }, tiltX, 0, tiltZ);
          // Apply world camera rotation
          const world = rotatePoint(tilted, rotRef.current.x, rotRef.current.y);
          ringPoints.push(world);
        }

        let started = false;
        for (let i = 0; i < ringPoints.length; i++) {
          const proj = project(ringPoints[i]);
          if (!proj.visible) continue;
          if (!started) {
            ctx.moveTo(proj.x, proj.y);
            started = true;
          } else {
            ctx.lineTo(proj.x, proj.y);
          }
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Degree graduation ticks for celestial astrolabe look
        if (hasTicks) {
          ctx.strokeStyle = "rgba(217, 119, 6, 0.4)";
          ctx.lineWidth = 1;
          for (let s = 0; s < 24; s++) {
            const angle = (s / 24) * Math.PI * 2;
            const p1 = rotatePoint(
              rotatePoint({ x: (radius - 4) * Math.cos(angle), y: (radius - 4) * Math.sin(angle), z: 0 }, tiltX, 0, tiltZ),
              rotRef.current.x,
              rotRef.current.y
            );
            const p2 = rotatePoint(
              rotatePoint({ x: (radius + 4) * Math.cos(angle), y: (radius + 4) * Math.sin(angle), z: 0 }, tiltX, 0, tiltZ),
              rotRef.current.x,
              rotRef.current.y
            );
            const pr1 = project(p1);
            const pr2 = project(p2);
            if (pr1.visible && pr2.visible) {
              ctx.beginPath();
              ctx.moveTo(pr1.x, pr1.y);
              ctx.lineTo(pr2.x, pr2.y);
              ctx.stroke();
            }
          }
        }
      };

      // Ring 1: Outer Prime Meridian Ring (Gold, Sturdy, with Astrolabe degree marks)
      drawRing(135, 64, 0, 0, "rgba(217, 119, 6, 0.8)", 2, [], true);

      // Ring 2: Celestial Equator Ring (Tilted at 23.5 degrees - Earth's axial tilt)
      drawRing(122, 64, Math.PI / 7.6, Math.PI / 6, "rgba(56, 189, 248, 0.65)", 1.5, [4, 4]);

      // Ring 3: Ecliptic Great Circle Ring (Rotates in counter-direction)
      drawRing(110, 64, -Math.PI / 4, time * 0.2, "rgba(245, 158, 11, 0.75)", 1.8);

      // Ring 4: Inner Gyroscopic Axis
      drawRing(85, 48, Math.PI / 2, 0, "rgba(148, 163, 184, 0.4)", 1, [2, 3]);

      // 4. Render Core Polyhedron (with backface culling & Lambertian lighting)
      const rotatedCore = coreVertices.map((v) => rotatePoint(v, rotRef.current.x, rotRef.current.y));

      // Calculate face normals and depths for Painter's Algorithm
      const faceData = coreFaces.map((face) => {
        const vA = rotatedCore[face.a];
        const vB = rotatedCore[face.b];
        const vC = rotatedCore[face.c];

        // Normal: (B - A) x (C - A)
        const ab = { x: vB.x - vA.x, y: vB.y - vA.y, z: vB.z - vA.z };
        const ac = { x: vC.x - vA.x, y: vC.y - vA.y, z: vC.z - vA.z };
        const nx = ab.y * ac.z - ab.z * ac.y;
        const ny = ab.z * ac.x - ab.x * ac.z;
        const nz = ab.x * ac.y - ab.y * ac.x;
        const len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
        const norm = { x: nx / len, y: ny / len, z: nz / len };

        // Average depth for z-sorting
        const depth = (vA.z + vB.z + vC.z) / 3;

        return { face, norm, depth, vA, vB, vC };
      });

      // Sort back-to-front
      faceData.sort((a, b) => b.depth - a.depth);

      // Virtual Light Source Vector: coming from top-right-front
      const light = { x: 0.5, y: -0.7, z: -0.7 };
      const lightLen = Math.sqrt(light.x * light.x + light.y * light.y + light.z * light.z);
      const lNorm = { x: light.x / lightLen, y: light.y / lightLen, z: light.z / lightLen };

      faceData.forEach(({ face, norm, vA, vB, vC }) => {
        // Backface culling: only draw if pointing toward camera (norm.z < 0 in standard RHS screen)
        if (norm.z > 0.05) return;

        const prA = project(vA);
        const prB = project(vB);
        const prC = project(vC);

        if (!prA.visible || !prB.visible || !prC.visible) return;

        // Lambertian diffuse lighting dot product
        const dot = -(norm.x * lNorm.x + norm.y * lNorm.y + norm.z * lNorm.z);
        const intensity = Math.max(0.2, Math.min(1.0, dot * 0.75 + 0.35));

        ctx.beginPath();
        ctx.moveTo(prA.x, prA.y);
        ctx.lineTo(prB.x, prB.y);
        ctx.lineTo(prC.x, prC.y);
        ctx.closePath();

        // Facet fill
        ctx.fillStyle = `rgba(${face.colorBase}, ${intensity.toFixed(2)})`;
        ctx.fill();

        // Subtle wireframe edge
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // 5. Draw 3 Orbiting Golden Satellites (representing Tech, Management & Research)
      for (let sat = 0; sat < 3; sat++) {
        const satAngle = time * (1.2 + sat * 0.4) + (sat * Math.PI * 2) / 3;
        const satR = 125 + Math.sin(time + sat) * 10;
        const satP: Point3D = {
          x: satR * Math.cos(satAngle),
          y: Math.sin(satAngle * 1.5) * 30,
          z: satR * Math.sin(satAngle),
        };
        const satRot = rotatePoint(satP, rotRef.current.x, rotRef.current.y);
        const pr = project(satRot);

        if (pr.visible) {
          // Satellite Glow
          const satGlow = ctx.createRadialGradient(pr.x, pr.y, 1, pr.x, pr.y, 8 * pr.scale);
          satGlow.addColorStop(0, "rgba(255, 255, 255, 0.95)");
          satGlow.addColorStop(0.3, "rgba(245, 158, 11, 0.9)");
          satGlow.addColorStop(1, "rgba(245, 158, 11, 0)");
          ctx.fillStyle = satGlow;
          ctx.beginPath();
          ctx.arc(pr.x, pr.y, 8 * pr.scale, 0, Math.PI * 2);
          ctx.fill();

          // Core node
          ctx.fillStyle = "#FFFFFF";
          ctx.beginPath();
          ctx.arc(pr.x, pr.y, 2.5 * pr.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // Mouse Drag & Parallax Listeners
    const handlePointerDown = (e: PointerEvent) => {
      mouseDragRef.current.isDragging = true;
      mouseDragRef.current.lastX = e.clientX;
      mouseDragRef.current.lastY = e.clientY;
      setIsInteracting(true);
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (mouseDragRef.current.isDragging) {
        const dx = e.clientX - mouseDragRef.current.lastX;
        const dy = e.clientY - mouseDragRef.current.lastY;
        mouseDragRef.current.lastX = e.clientX;
        mouseDragRef.current.lastY = e.clientY;

        // Apply direct rotation change
        rotRef.current.y += dx * 0.008;
        rotRef.current.x -= dy * 0.008;

        // Track velocity for smooth throw
        velRef.current.y = dx * 0.006;
        velRef.current.x = -dy * 0.006;
      } else {
        // Elastic subtle tilt when hovering
        const rect = canvas.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        targetTiltRef.current.x = ny * 0.6;
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      mouseDragRef.current.isDragging = false;
      setIsInteracting(false);
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Ignore if already released
      }
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", updateSize);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  const setAnglePreset = (preset: "orbit" | "frontal" | "zenith") => {
    setActivePreset(preset);
    if (preset === "orbit") {
      rotRef.current.x = 0.35;
      rotRef.current.y = 0.6;
      velRef.current = { x: 0.0005, y: 0.003 };
    } else if (preset === "frontal") {
      rotRef.current.x = 0.05;
      rotRef.current.y = 0.0;
      velRef.current = { x: 0.0, y: 0.002 };
    } else if (preset === "zenith") {
      rotRef.current.x = 1.15;
      rotRef.current.y = 0.0;
      velRef.current = { x: 0.0002, y: 0.002 };
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[420px] aspect-square mx-auto flex flex-col items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none drop-shadow-[0_20px_35px_rgba(15,43,72,0.35)]"
        title="Interactive 3D Celestial Armillary Sphere — Drag to rotate in 3D"
      />

      {/* Floating HUD status overlay */}
      <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none px-2 py-1 bg-stone-900/60 backdrop-blur-md border border-stone-700/60 rounded-xs text-[10px] font-mono text-stone-300">
        <span className="flex items-center gap-1.5 text-amber-400 font-semibold uppercase tracking-wider">
          <Sparkles className="w-3 h-3 animate-pulse text-amber-400" />
          GITM 3D Celestial Astrolabe
        </span>
        <span className="text-stone-400">
          {isInteracting ? "Interacting (3D Spin)" : isHovered ? "Drag to Orbit" : "Real-time 60fps WebGL"}
        </span>
      </div>

      {/* Interactive Angle Switchers */}
      <div className="absolute bottom-2 flex items-center gap-1.5 bg-stone-900/80 backdrop-blur-md border border-stone-700/80 p-1 rounded-sm shadow-md">
        <button
          type="button"
          onClick={() => setAnglePreset("orbit")}
          className={`px-2 py-1 text-[10px] font-mono uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1 ${
            activePreset === "orbit"
              ? "bg-amber-600 text-white font-bold"
              : "text-stone-300 hover:text-white hover:bg-stone-800"
          }`}
          title="Orbital Angle (Default)"
        >
          <RotateCw className="w-2.5 h-2.5" /> Orbit
        </button>
        <button
          type="button"
          onClick={() => setAnglePreset("frontal")}
          className={`px-2 py-1 text-[10px] font-mono uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1 ${
            activePreset === "frontal"
              ? "bg-amber-600 text-white font-bold"
              : "text-stone-300 hover:text-white hover:bg-stone-800"
          }`}
          title="Frontal View"
        >
          <Eye className="w-2.5 h-2.5" /> Front
        </button>
        <button
          type="button"
          onClick={() => setAnglePreset("zenith")}
          className={`px-2 py-1 text-[10px] font-mono uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1 ${
            activePreset === "zenith"
              ? "bg-amber-600 text-white font-bold"
              : "text-stone-300 hover:text-white hover:bg-stone-800"
          }`}
          title="Zenith (Top-Down)"
        >
          <Compass className="w-2.5 h-2.5" /> Zenith
        </button>
      </div>
    </div>
  );
}

