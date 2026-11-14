import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-sm border border-stone-300 bg-white px-3 py-2 text-sm text-navy",
        "placeholder:text-stone-400",
        "focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy",
        "disabled:cursor-not-allowed disabled:bg-stone-50 disabled:opacity-70",
        "aria-[invalid=true]:border-red-600 aria-[invalid=true]:ring-red-600",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[96px] w-full rounded-sm border border-stone-300 bg-white px-3 py-2 text-sm text-navy",
      "placeholder:text-stone-400",
      "focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy",
      "disabled:cursor-not-allowed disabled:bg-stone-50 disabled:opacity-70",
      "aria-[invalid=true]:border-red-600 aria-[invalid=true]:ring-red-600",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "flex h-11 w-full appearance-none rounded-sm border border-stone-300 bg-white px-3 py-2 text-sm text-navy",
      "focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy",
      "disabled:cursor-not-allowed disabled:bg-stone-50 disabled:opacity-70",
      "aria-[invalid=true]:border-red-600 aria-[invalid=true]:ring-red-600",
      className
    )}
    {...props}
  />
));
Select.displayName = "Select";

/** Field wrapper: label + hint + error, wired to the control via id. */
export function Field({
  id,
  label,
  error,
  hint,
  required,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={id} className="block text-xs font-bold text-stone-800">
        {label}
        {required && (
          <span className="ml-0.5 text-crimson" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && <p className="text-[11px] text-stone-500">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-[11px] font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
