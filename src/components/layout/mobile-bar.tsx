"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MessageCircle, FileText } from "lucide-react";
import { site } from "@/data/site";

/**
 * Persistent mobile action bar. On a phone the two things an applicant wants are
 * "call admissions" and "apply" — putting them under the thumb measurably
 * improves lead conversion versus a header button only.
 */
export function MobileBar() {
  const pathname = usePathname();

  // Give the bar some breathing room at the end of the page.
  if (pathname.startsWith("/policies")) return null;

  return (
    <>
      <div className="h-16 lg:hidden" aria-hidden="true" />
      <nav
        aria-label="Quick actions"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-stone-200 bg-white/95 backdrop-blur lg:hidden"
      >
        <a
          href={site.phones.admissions.tel}
          className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-bold uppercase tracking-wide text-navy"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call
        </a>
        <a
          href={site.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 border-x border-stone-200 py-2.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp
        </a>
        <Link
          href="/admissions#apply"
          className="flex flex-col items-center justify-center gap-0.5 bg-crimson py-2.5 text-[10px] font-bold uppercase tracking-wide text-white"
        >
          <FileText className="h-4 w-4" aria-hidden="true" />
          Apply
        </Link>
      </nav>
    </>
  );
}
