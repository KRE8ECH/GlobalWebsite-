import Link from "next/link";
import { Phone, MessageCircle, MapPin, ShieldCheck, Award } from "lucide-react";
import { site } from "@/data/site";
import { InquiryForm } from "@/components/admissions/inquiry-form";

export function CtaSection() {
  return (
    <section
      id="inquiry"
      aria-labelledby="inquiry-heading"
      className="scroll-mt-32 border-b border-navy-dark bg-navy py-14 text-white sm:py-20"
    >
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <p className="text-xs font-bold uppercase tracking-wide text-amber-400">
            Admissions 2026-27
          </p>
          <h2
            id="inquiry-heading"
            className="mt-2 font-editorial text-2xl font-extrabold leading-tight sm:text-4xl"
          >
            Talk to a counsellor before you decide
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-200">
            Tell us what you want to study and where you are in the process. A GITM admissions
            counsellor will call you within one working day — no agents, no lead resale.
          </p>

          <ul className="mt-6 space-y-2.5">
            {[
              "Guidance on eligibility, fees and scholarships",
              "Campus visit and hostel booking",
              "Help with the Gurugram University application",
            ].map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-stone-200">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-2.5 rounded-md border border-white/15 bg-white/5 p-4">
            <a
              href={site.phones.admissions.tel}
              className="flex items-center gap-2 font-editorial text-lg font-bold text-white hover:text-amber-300"
            >
              <Phone className="h-4 w-4 text-amber-400" aria-hidden="true" />
              {site.phones.admissions.value}
            </a>
            <a
              href={site.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-emerald-300 hover:text-emerald-200"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Message us on WhatsApp
            </a>
            <p className="flex items-start gap-2 text-[11px] text-stone-300">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>
                {site.campus.lines.slice(1).join(", ")}
                <br />
                {site.hours.counselling}
              </span>
            </p>
          </div>

          <p className="mt-4 flex items-start gap-2 text-[11px] text-stone-400">
            <Award className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>
              Prefer the official portal?{" "}
              <a
                href={site.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-amber-300 underline"
              >
                Apply on the official portal
              </a>
              .
            </span>
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-md bg-white shadow-xl">
            <InquiryForm idPrefix="home" compact />
          </div>
          <p className="mt-2 text-center text-[11px] text-stone-400">
            Already applied?{" "}
            <Link href="/contact" className="underline hover:text-white">
              Track or update your application
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
