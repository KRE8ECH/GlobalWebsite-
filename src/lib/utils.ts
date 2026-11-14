import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formats an ISO date for Indian readers, e.g. "05 Nov 2026". */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

/** Whole months between now and an ISO date; 0 when already passed. */
export function monthsUntil(iso: string, from: Date = new Date()): number {
  const target = new Date(iso);
  const months =
    (target.getFullYear() - from.getFullYear()) * 12 + (target.getMonth() - from.getMonth());
  return Math.max(0, months);
}

/** "3 days ago" / "in 2 days" — stable because it is computed from one input. */
export function relativeDays(iso: string, from: Date = new Date()): string {
  const diff = Math.round(
    (new Date(iso).getTime() - from.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff === -1) return "Yesterday";
  if (diff > 0) return `In ${diff} days`;
  return `${Math.abs(diff)} days ago`;
}
