import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide",
  {
    variants: {
      tone: {
        neutral: "border-stone-200 bg-stone-100 text-stone-700",
        navy: "border-navy/20 bg-navy/5 text-navy",
        crimson: "border-crimson/25 bg-crimson/8 text-crimson",
        gold: "border-amber-300 bg-amber-50 text-amber-800",
        success: "border-emerald-300 bg-emerald-50 text-emerald-800",
        dark: "border-white/20 bg-white/10 text-white",
      },
    },
    defaultVariants: { tone: "neutral" },
  }
);

export function Badge({
  className,
  tone,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
