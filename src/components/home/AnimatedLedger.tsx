"use client";

import * as React from "react";

interface CounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

function SmoothCounter({
  value,
  duration = 1800,
  decimals = 0,
  prefix = "",
  suffix = "",
}: CounterProps) {
  const [count, setCount] = React.useState(0);
  const elementRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    let startTimestamp: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Exponential ease-out for ultra smooth landing
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = easeProgress * value;

      setCount(currentVal);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [value, duration]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function AnimatedLedger() {
  return (
    <div className="border-t border-white/15 bg-[#0a1b2d] py-6 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:divide-x md:divide-white/15 text-left">
          {/* Pillar 1 */}
          <div className="space-y-1 md:pr-4 group">
            <div className="font-editorial text-2xl sm:text-4xl font-black text-amber-400 flex items-center">
              <SmoothCounter value={18} duration={1400} suffix="+" />
              <span className="text-xl sm:text-2xl font-bold ml-1 text-white">Years</span>
            </div>
            <div className="text-xs font-bold text-stone-200 uppercase tracking-wide">
              Academic Legacy
            </div>
            <p className="text-[11px] text-stone-400">
              Estd. 2008 • Over 15,000 alumni worldwide
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="space-y-1 md:px-4 group">
            <div className="font-editorial text-2xl sm:text-4xl font-black text-white flex items-center">
              <SmoothCounter value={100} duration={1600} suffix="+" />
              <span className="text-xl sm:text-2xl font-bold ml-1 text-amber-400">Partners</span>
            </div>
            <div className="text-xs font-bold text-stone-200 uppercase tracking-wide">
              Corporate Recruiters
            </div>
            <p className="text-[11px] text-stone-400">
              Annual on-campus drives & corporate MoUs
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="space-y-1 md:px-4 group">
            <div className="font-editorial text-2xl sm:text-4xl font-black text-amber-400 flex items-center">
              <SmoothCounter value={40.0} duration={1800} decimals={1} prefix="₹" suffix=" LPA" />
            </div>
            <div className="text-xs font-bold text-stone-200 uppercase tracking-wide">
              Highest Package
            </div>
            <p className="text-[11px] text-stone-400">
              ₹6.8 LPA average CTC across branches
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="space-y-1 md:pl-4 group">
            <div className="font-editorial text-2xl sm:text-4xl font-black text-white flex items-center">
              <SmoothCounter value={20} duration={1500} suffix="" />
              <span className="text-xl sm:text-2xl font-bold ml-1 text-amber-400">Acres</span>
            </div>
            <div className="text-xs font-bold text-stone-200 uppercase tracking-wide">
              Eco-Friendly Campus
            </div>
            <p className="text-[11px] text-stone-400">
              Delhi-NCR corridor • Wi-Fi enabled infrastructure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

