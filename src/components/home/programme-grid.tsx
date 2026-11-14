import Link from "next/link";
import { ArrowRight, Clock, GraduationCap } from "lucide-react";
import { programs, departmentOrder, formatInr, type Program } from "@/data/site";
import { Badge } from "@/components/ui/badge";

function groupByDepartment(): { department: string; items: Program[] }[] {
  return departmentOrder
    .map((department) => ({
      department,
      items: programs.filter((programme) => programme.department === department),
    }))
    .filter((group) => group.items.length > 0);
}

/**
 * Departmental programme listing. Server-rendered — no client JavaScript is
 * needed to read the catalogue, which matters on the slow 3G connections a lot
 * of applicants in Haryana are actually on.
 */
export function ProgrammeGrid({ limitPerDepartment }: { limitPerDepartment?: number }) {
  const groups = groupByDepartment();

  return (
    <section id="programmes" aria-labelledby="programmes-heading" className="border-b border-stone-200 bg-paper py-14 sm:py-20">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-wide text-crimson">
            Academic programmes · NEP 2020 aligned
          </p>
          <h2
            id="programmes-heading"
            className="mt-2 font-editorial text-2xl font-extrabold text-navy sm:text-4xl"
          >
            Four departments, fourteen degree pathways
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            Every programme is delivered under Gurugram University ordinances, with AICTE
            model syllabus for engineering and PCI regulations for pharmacy.
          </p>
        </div>

        <div className="mt-8 space-y-8">
          {groups.map((group) => (
            <div key={group.department}>
              <div className="flex items-center justify-between gap-4 border-b border-stone-300 pb-2">
                <h3 className="font-editorial text-lg font-bold text-navy">{group.department}</h3>
                <span className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">
                  {group.items.length} programme{group.items.length === 1 ? "" : "s"}
                </span>
              </div>

              <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(limitPerDepartment ? group.items.slice(0, limitPerDepartment) : group.items).map(
                  (programme) => (
                    <li key={programme.slug}>
                      <Link
                        href={`/programmes/${programme.slug}`}
                        className="group flex h-full flex-col rounded-md border border-stone-200 bg-white p-4 transition-colors hover:border-navy/40 hover:shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <Badge tone={programme.level === "PG" ? "navy" : "crimson"}>
                            {programme.level === "LEET" ? "Lateral entry" : programme.level}
                          </Badge>
                          {programme.annualFeeInr !== null && (
                            <span className="text-[11px] font-semibold text-stone-500">
                              {formatInr(programme.annualFeeInr)}/yr
                            </span>
                          )}
                        </div>

                        <h4 className="mt-2 font-editorial text-base font-bold leading-snug text-navy group-hover:text-crimson">
                          {programme.name}
                        </h4>

                        <p className="mt-1.5 flex items-center gap-3 text-[11px] text-stone-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" aria-hidden="true" />
                            {programme.durationYears} years
                          </span>
                          {programme.intake && (
                            <span className="flex items-center gap-1">
                              <GraduationCap className="h-3 w-3" aria-hidden="true" />
                              {programme.intake} seats
                            </span>
                          )}
                        </p>

                        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-stone-600">
                          {programme.description}
                        </p>

                        <span className="mt-auto pt-3 inline-flex items-center gap-1 text-[11px] font-bold text-crimson">
                          Eligibility &amp; details
                          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                        </span>
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8">
          <Link
            href="/programmes"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-crimson"
          >
            Compare all programmes, fees and eligibility
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  );
}
