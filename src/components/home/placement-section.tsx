import Link from "next/link";
import Image from "next/image";
import { TrendingUp, ArrowRight, Building2 } from "lucide-react";
import { placementStats, campusFacts } from "@/data/site";
import { recruiters } from "@/data/content";
import type { PlacementItem } from "@/lib/types";

/**
 * Placement evidence. The year-wise table is the single most persuasive element
 * on a college site for a parent, so it is shown as data, not as a marketing
 * claim — and it is reproducible from the institute's published figures.
 */
export function PlacementSection({ placements }: { placements: PlacementItem[] }) {
  const engineering = placementStats.engineeringHighestByYear;
  const placed = placementStats.engineeringPlacedByYear;
  const maxLpa = Math.max(...engineering.map((entry) => entry.lpa));

  return (
    <section
      id="placements"
      aria-labelledby="placements-heading"
      className="border-b border-stone-200 bg-white py-14 sm:py-20"
    >
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-crimson">
              <TrendingUp className="h-4 w-4" aria-hidden="true" />
              Corporate Relations Centre
            </p>
            <h2
              id="placements-heading"
              className="mt-2 font-editorial text-2xl font-extrabold text-navy sm:text-4xl"
            >
              Placement record, year on year
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              GITM sits in India&rsquo;s corporate capital. Recruiters come from Cyber City,
              Golf Course Road and the Noida expressway corridor, and a substantial share of
              offers arrive through pre-placement offers after internships.
            </p>
          </div>

          <Link
            href="/placements"
            className="inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-sm bg-navy px-5 text-sm font-bold text-white hover:bg-navy-dark md:self-auto"
          >
            Full placement report
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          {/* Year-wise table */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-md border border-stone-200">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">
                  Highest package offered and number of students placed, engineering, by year
                </caption>
                <thead className="bg-stone-50 text-[10px] uppercase tracking-wide text-stone-500">
                  <tr>
                    <th scope="col" className="px-4 py-2.5 font-bold">
                      Year
                    </th>
                    <th scope="col" className="px-4 py-2.5 font-bold">
                      Highest package
                    </th>
                    <th scope="col" className="px-4 py-2.5 font-bold">
                      Students placed
                    </th>
                    <th scope="col" className="w-24 px-4 py-2.5 font-bold">
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {[...engineering].reverse().map((entry) => {
                    const placedEntry = placed.find((p) => p.year === entry.year);
                    const width = Math.round((entry.lpa / maxLpa) * 100);
                    return (
                      <tr key={entry.year} className="hover:bg-stone-50">
                        <th scope="row" className="px-4 py-2.5 font-mono text-xs font-bold text-navy">
                          {entry.year}
                        </th>
                        <td className="px-4 py-2.5 font-semibold text-navy">
                          ₹{entry.lpa.toFixed(1)} LPA
                        </td>
                        <td className="px-4 py-2.5 text-stone-600">{placedEntry?.placed ?? "—"}</td>
                        <td className="px-4 py-2.5">
                          <span
                            className="block h-1.5 rounded-full bg-gold"
                            style={{ width: `${width}%` }}
                            aria-hidden="true"
                          />
                          <span className="sr-only">{width}% of the highest value shown</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-[11px] text-stone-500">
              Source: GITM published placement highlights (engineering stream). Management
              stream peaked at ₹
              {placementStats.managementHighestByYear[placementStats.managementHighestByYear.length - 1].lpa}{" "}
              LPA in the same period.
            </p>
          </div>

          {/* Student cards */}
          <div className="lg:col-span-5">
            <h3 className="text-xs font-bold uppercase tracking-wide text-stone-500">
              Recent offers
            </h3>
            <ul className="mt-3 space-y-3">
              {placements.slice(0, 4).map((placement) => (
                <li
                  key={placement.id}
                  className="flex items-center gap-3 rounded-md border border-stone-200 p-3"
                >
                  {placement.photoUrl ? (
                    <Image
                      src={placement.photoUrl}
                      alt=""
                      width={48}
                      height={48}
                      className="h-12 w-12 shrink-0 rounded-sm object-cover"
                    />
                  ) : (
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-stone-100 text-stone-400">
                      <Building2 className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-navy">{placement.studentName}</p>
                    <p className="truncate text-[11px] text-stone-600">
                      {placement.designation} · {placement.company}
                    </p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-wide text-stone-400">
                      {placement.branch} · {placement.year}
                    </p>
                  </div>
                  <p className="shrink-0 font-editorial text-base font-black text-crimson">
                    ₹{placement.packageLPA}
                    <span className="text-[10px] font-bold text-stone-400">LPA</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recruiter wall */}
        <div className="mt-10 rounded-md border border-stone-200 bg-stone-50 p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wide text-navy">
              Recruiting partners
            </h3>
            <p className="text-[11px] text-stone-500">
              {recruiters.length} organisations shown · {campusFacts.internationalCollaborations.length}{" "}
              international academic collaborations
            </p>
          </div>
          <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {recruiters.slice(0, 21).map((recruiter) => (
              <li
                key={recruiter.name}
                className="flex h-16 items-center justify-center rounded-sm border border-stone-200 bg-white p-2"
                title={`${recruiter.name} — ${recruiter.sector}`}
              >
                {recruiter.logo ? (
                  <Image
                    src={recruiter.logo}
                    alt={recruiter.name}
                    width={120}
                    height={48}
                    className="max-h-10 w-auto object-contain"
                  />
                ) : (
                  <span className="text-center text-[11px] font-bold text-stone-600">
                    {recruiter.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
