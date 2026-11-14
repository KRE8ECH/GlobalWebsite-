import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { site } from "@/data/site";

/** Consistent closing CTA so no page dead-ends. */
export function CtaBand({
  title = "Ready to apply for 2026-27?",
  body = "Applications are open across all programmes. Talk to an admissions counsellor or start your application online.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="border-t border-stone-200 bg-paper py-12">
      <div className="container-page flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div>
          <h2 className="font-editorial text-xl font-bold text-navy sm:text-2xl">{title}</h2>
          <p className="mt-1 max-w-xl text-sm text-stone-600">{body}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admissions"
            className="inline-flex h-11 items-center gap-2 rounded-sm bg-crimson px-5 text-sm font-bold uppercase tracking-wide text-white hover:bg-crimson-dark"
          >
            Apply now
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <a
            href={site.phones.admissions.tel}
            className="inline-flex h-11 items-center gap-2 rounded-sm border border-stone-300 bg-white px-5 text-sm font-bold text-navy hover:border-navy/40"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {site.phones.admissions.value}
          </a>
        </div>
      </div>
    </section>
  );
}
