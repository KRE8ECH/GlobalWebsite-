"use client";

import * as React from "react";
import Link from "next/link";
import { CalendarClock, ArrowRight } from "lucide-react";

/**
 * Admission deadline countdown.
 * ---------------------------------------------------------------------------
 * Computed on the client *after* mount so the server-rendered HTML always
 * matches (the previous codebase computed dates during render, which is a
 * classic hydration-mismatch source). Until hydration completes the server
 * shows a neutral label rather than a wrong number.
 */
export function DeadlineCountdown({
  target,
  label,
  href = "/admissions",
}: {
  /** ISO date of the deadline. */
  target: string;
  label: string;
  href?: string;
}) {
  const [remaining, setRemaining] = React.useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    passed: boolean;
  } | null>(null);

  React.useEffect(() => {
    const tick = () => {
      const diff = new Date(target).getTime() - Date.now();
      if (diff <= 0) {
        setRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0, passed: true });
        return;
      }
      setRemaining({
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff / 3_600_000) % 24),
        minutes: Math.floor((diff / 60_000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        passed: false,
      });
    };

    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  const units = remaining
    ? [
        { value: remaining.days, label: "days" },
        { value: remaining.hours, label: "hrs" },
        { value: remaining.minutes, label: "min" },
        { value: remaining.seconds, label: "sec" },
      ]
    : [];

  return (
    <div className="rounded-md border border-crimson/25 bg-white p-4">
      <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-crimson">
        <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
        {label}
      </p>

      {/* The ticking numbers are decorative for assistive tech; the label above
          and the link below carry the meaning. */}
      <div className="mt-2 flex gap-2" aria-hidden={remaining ? "true" : undefined}>
        {remaining ? (
          units.map((unit) => (
            <div
              key={unit.label}
              className="flex-1 rounded-sm bg-stone-50 py-2 text-center"
            >
              <p className="font-editorial text-xl font-black text-navy tabular-nums">
                {remaining.passed ? "0" : String(unit.value).padStart(2, "0")}
              </p>
              <p className="text-[9px] font-bold uppercase tracking-wide text-stone-500">
                {unit.label}
              </p>
            </div>
          ))
        ) : (
          <p className="py-2 text-sm text-stone-500">Checking the deadline…</p>
        )}
      </div>

      <p className="sr-only">
        {remaining?.passed
          ? "The advertised deadline has passed. Contact admissions for late-application options."
          : "A deadline countdown is running. Contact admissions to confirm exact dates."}
      </p>

      <Link
        href={href}
        className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold text-crimson hover:underline"
      >
        {remaining?.passed ? "Check late-application options" : "Apply before the deadline"}
        <ArrowRight className="h-3 w-3" aria-hidden="true" />
      </Link>
    </div>
  );
}
