"use client";

import Link from "next/link";
import { useEffect } from "react";
import { site } from "@/data/site";

/**
 * Route-level error boundary. Without this, a runtime error in one section
 * blanked the whole page.
 */
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[gitm] Page error:", error);
  }, [error]);

  return (
    <section className="border-b border-stone-200 bg-white py-20">
      <div className="container-page max-w-2xl text-center">
        <h1 className="font-editorial text-2xl font-extrabold text-navy sm:text-3xl">
          Something went wrong
        </h1>
        <p className="mt-3 text-sm text-stone-600">
          This page could not be displayed. Your information has not been lost — if you were
          submitting an enquiry, please call us instead so nothing is delayed.
        </p>
        {error.digest && (
          <p className="mt-2 font-mono text-[11px] text-stone-400">Reference: {error.digest}</p>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-11 items-center rounded-sm bg-navy px-5 text-sm font-bold text-white hover:bg-navy-dark"
          >
            Try again
          </button>
          <a
            href={site.phones.admissions.tel}
            className="inline-flex h-11 items-center rounded-sm border border-stone-300 px-5 text-sm font-bold text-navy hover:border-navy/40"
          >
            Call {site.phones.admissions.value}
          </a>
          <Link
            href="/"
            className="inline-flex h-11 items-center px-3 text-sm font-semibold text-crimson hover:underline"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
