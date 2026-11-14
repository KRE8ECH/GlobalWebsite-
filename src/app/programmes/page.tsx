import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, GraduationCap, IndianRupee } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBand } from "@/components/layout/cta-band";
import { programs, departmentOrder, formatInr } from "@/data/site";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Programmes & Courses",
  description:
    "Explore all 14 degree programmes at GITM Gurugram: B.Tech in CSE, AI & Data Science, AI & ML, ECE, Mechanical and Civil, plus MBA, BBA, BCA, MCA, B.Pharm and D.Pharm.",
  alternates: { canonical: "/programmes" },
};

export default function ProgrammesPage() {
  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="Programmes & courses"
        intro="Fourteen degree pathways across four departments, delivered under Gurugram University ordinances with AICTE and PCI curriculum frameworks."
        crumbs={[{ label: "Home", href: "/" }, { label: "Programmes" }]}
      />

      <section className="border-b border-stone-200 bg-white py-12 sm:py-16">
        <div className="container-page">
          {/* Comparison table — the fastest way to answer "what can I study?" */}
          <div className="overflow-x-auto rounded-md border border-stone-200">
            <table className="w-full min-w-[720px] text-left text-sm">
              <caption className="sr-only">
                All programmes with level, duration, annual fee, intake and eligibility
              </caption>
              <thead className="bg-stone-50 text-[10px] uppercase tracking-wide text-stone-500">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold">Programme</th>
                  <th scope="col" className="px-4 py-3 font-bold">Department</th>
                  <th scope="col" className="px-4 py-3 font-bold">Level</th>
                  <th scope="col" className="px-4 py-3 font-bold">Duration</th>
                  <th scope="col" className="px-4 py-3 font-bold">Annual fee</th>
                  <th scope="col" className="px-4 py-3 font-bold" />
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {programs.map((programme) => (
                  <tr key={programme.slug} className="hover:bg-stone-50">
                    <th scope="row" className="px-4 py-3 font-semibold text-navy">
                      <Link href={`/programmes/${programme.slug}`} className="hover:text-crimson">
                        {programme.name}
                      </Link>
                    </th>
                    <td className="px-4 py-3 text-stone-600">{programme.department}</td>
                    <td className="px-4 py-3">
                      <Badge tone={programme.level === "PG" ? "navy" : programme.level === "LEET" ? "gold" : "crimson"}>
                        {programme.level === "LEET" ? "Lateral" : programme.level}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-stone-600">{programme.durationYears} yrs</td>
                    <td className="px-4 py-3 font-mono text-xs text-stone-700">
                      {programme.annualFeeInr !== null ? `${formatInr(programme.annualFeeInr)}/yr` : "On request"}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/programmes/${programme.slug}`}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-crimson hover:underline"
                      >
                        Details
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[11px] text-stone-500">
            Fees shown are annual tuition as published for the 2026-27 session and exclude
            examination, hostel and one-time charges. Confirm current figures with the accounts
            office before paying anything.
          </p>

          {/* Department cards */}
          <div className="mt-12 space-y-10">
            {departmentOrder.map((department) => {
              const items = programs.filter((programme) => programme.department === department);
              if (items.length === 0) return null;

              return (
                <div key={department}>
                  <h2 className="font-editorial text-xl font-bold text-navy">{department}</h2>
                  <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((programme) => (
                      <li key={programme.slug}>
                        <Link
                          href={`/programmes/${programme.slug}`}
                          className="group flex h-full flex-col rounded-md border border-stone-200 bg-white p-4 hover:border-navy/40 hover:shadow-sm"
                        >
                          <h3 className="font-editorial text-base font-bold leading-snug text-navy group-hover:text-crimson">
                            {programme.name}
                          </h3>
                          <ul className="mt-2 space-y-1 text-[11px] text-stone-500">
                            <li className="flex items-center gap-1.5">
                              <Clock className="h-3 w-3" aria-hidden="true" />
                              {programme.durationYears} years
                            </li>
                            {programme.intake && (
                              <li className="flex items-center gap-1.5">
                                <GraduationCap className="h-3 w-3" aria-hidden="true" />
                                {programme.intake} sanctioned seats
                              </li>
                            )}
                            {programme.annualFeeInr !== null && (
                              <li className="flex items-center gap-1.5">
                                <IndianRupee className="h-3 w-3" aria-hidden="true" />
                                {formatInr(programme.annualFeeInr)} per year
                              </li>
                            )}
                          </ul>
                          <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-stone-600">
                            {programme.description}
                          </p>
                          <span className="mt-auto pt-3 text-[11px] font-bold text-crimson">
                            Eligibility, fees &amp; syllabus
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure which programme fits?"
        body="Use the eligibility checker, or send us your stream and percentage and a counsellor will map out your options."
      />
    </>
  );
}
