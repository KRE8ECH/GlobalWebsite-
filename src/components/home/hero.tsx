import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Award, FileCheck, ArrowRight, Phone, MapPin, Play } from "lucide-react";
import { site, campusFacts, placementStats, programs } from "@/data/site";
import { Badge } from "@/components/ui/badge";

const quickFacts = [
  { label: "Established", value: String(site.established) },
  { label: "Campus", value: `${campusFacts.acres} acres` },
  { label: "Built-up area", value: campusFacts.builtUpSqFt },
  { label: "Programmes", value: `${programs.length}` },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      {/* Campus photograph, optimised by next/image and served as AVIF/WebP. */}
      <Image
        src="/images/web/campus/154_about.webp"
        alt="GITM Gurugram campus buildings and lawns, Farrukhnagar"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div
        className="-z-10 absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/70"
        aria-hidden="true"
      />

      <div className="container-page py-12 sm:py-16 lg:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          {/* Left: authority + proposition */}
          <div className="lg:col-span-7">
            <ul className="flex flex-wrap gap-2">
              <li>
                <Badge tone="gold" className="gap-1.5 px-2.5 py-1 normal-case tracking-normal">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  Affiliated to Gurugram University
                </Badge>
              </li>
              <li>
                <Badge tone="dark" className="gap-1.5 px-2.5 py-1 normal-case tracking-normal">
                  <Award className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
                  AICTE &amp; PCI approved
                </Badge>
              </li>
              <li>
                <Badge tone="dark" className="gap-1.5 px-2.5 py-1 normal-case tracking-normal">
                  <FileCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  DTE Haryana Code {site.dteCode}
                </Badge>
              </li>
            </ul>

            <h1 className="mt-5 font-editorial text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.9rem]">
              Building engineers, managers and pharmacists in Delhi NCR since{" "}
              <span className="text-amber-400">2008</span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-200 sm:text-base">
              {site.name} (GITM Gurugram) is an AICTE-approved institute affiliated to
              Gurugram University, set on an {campusFacts.acres}-acre campus at Farrukhnagar.
              We offer B.Tech, M.Tech, MBA, BBA, BCA, MCA, B.Pharm and D.Pharm programmes
              aligned with the National Education Policy 2020.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/admissions"
                className="inline-flex h-12 items-center gap-2 rounded-sm bg-crimson px-6 text-sm font-bold uppercase tracking-wide hover:bg-crimson-dark"
              >
                Apply for 2026-27
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/programmes"
                className="inline-flex h-12 items-center gap-2 rounded-sm border border-white/25 bg-white/5 px-5 text-sm font-bold uppercase tracking-wide hover:bg-white/15"
              >
                Explore programmes
              </Link>
              <Link
                href="/campus-life#tour"
                className="inline-flex h-12 items-center gap-2 px-2 text-sm font-semibold text-amber-300 underline-offset-4 hover:underline"
              >
                <Play className="h-4 w-4 fill-amber-300" aria-hidden="true" />
                Watch campus tour
              </Link>
            </div>

            <dl className="mt-8 grid max-w-xl grid-cols-2 gap-x-6 gap-y-4 border-t border-white/15 pt-5 sm:grid-cols-4">
              {quickFacts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[10px] font-bold uppercase tracking-wide text-stone-400">
                    {fact.label}
                  </dt>
                  <dd className="font-editorial text-lg font-bold text-white">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-stone-300">
              <a
                href={site.phones.admissions.tel}
                className="flex items-center gap-1.5 font-bold text-amber-300 hover:text-amber-200"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                {site.phones.admissions.value}
              </a>
              <span aria-hidden="true" className="text-stone-600">
                •
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                5 KM Milestone, Farrukhnagar Road, Gurugram
              </span>
            </p>
          </div>

          {/* Right: verified outcome card */}
          <div className="lg:col-span-5">
            <div className="rounded-md border border-white/15 bg-white/[0.07] p-5 backdrop-blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-wide text-amber-400">
                Published placement record
              </p>
              <p className="mt-1 font-editorial text-4xl font-black text-white">
                ₹{placementStats.headline.highestLpa}{" "}
                <span className="text-base font-bold text-stone-300">LPA</span>
              </p>
              <p className="text-xs text-stone-300">
                Highest package offered, {placementStats.headline.highestYear} engineering
                drive
              </p>

              <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-wide text-stone-400">
                    Students placed
                  </dt>
                  <dd className="font-editorial text-xl font-bold text-white">
                    {placementStats.headline.studentsPlacedLatest}+
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-wide text-stone-400">
                    Highest (management)
                  </dt>
                  <dd className="font-editorial text-xl font-bold text-white">
                    ₹
                    {
                      placementStats.managementHighestByYear[
                        placementStats.managementHighestByYear.length - 1
                      ].lpa
                    }{" "}
                    <span className="text-xs font-bold text-stone-400">LPA</span>
                  </dd>
                </div>
              </dl>

              <Link
                href="/placements"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200"
              >
                See the full year-wise record
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>

              <p className="mt-4 border-t border-white/10 pt-3 text-[10px] leading-relaxed text-stone-400">
                Figures reproduced from GITM&rsquo;s published placement highlights for the
                years shown.
              </p>
            </div>

            <div className="mt-4 rounded-md border border-amber-400/30 bg-amber-400/10 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wide text-amber-300">
                Admissions helpline
              </p>
              <a
                href={site.phones.admissions.tel}
                className="mt-1 flex items-center gap-2 font-editorial text-xl font-bold text-white hover:text-amber-200"
              >
                <Phone className="h-4 w-4 text-amber-300" aria-hidden="true" />
                {site.phones.admissions.value}
              </a>
              <p className="mt-1 text-[11px] text-stone-300">{site.hours.counselling}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
