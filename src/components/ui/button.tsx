import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-crimson text-white hover:bg-crimson-dark focus-visible:ring-crimson",
        navy: "bg-navy text-white hover:bg-navy-dark focus-visible:ring-navy",
        gold: "bg-gold text-stone-950 hover:bg-gold-light focus-visible:ring-gold",
        outline:
          "border border-stone-300 bg-white text-navy hover:bg-stone-50 hover:border-navy/40 focus-visible:ring-navy",
        ghostOutline:
          "border border-white/25 bg-white/5 text-white hover:bg-white/15 focus-visible:ring-white",
        ghost: "text-navy hover:bg-stone-100 focus-visible:ring-navy",
      },
      size: {
        sm: "h-9 px-3.5 text-xs rounded-sm",
        md: "h-11 px-5 text-sm rounded-sm",
        lg: "h-12 px-6 text-sm rounded-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

/** Anchor styled as a button. Uses a real <a> so right-click / new-tab work. */
export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & VariantProps<typeof buttonVariants>) {
  return <a className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
