import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TrendingUp, ArrowRight, Briefcase, Target, Users } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBand } from "@/components/layout/cta-band";
import { placementStats, site } from "@/data/site";
import { recruiters } from "@/data/content";
import { getPlacements } from "@/lib/content";

export const metadata: Metadata = {
  title: "Placements & Recruiters",
  description:
    "GITM Gurugram placement record with year-wise highest packages and students placed, plus the recruiting partners who run on-campus drives.",
  alternates: { canonical: "/placements" },
};

const training = [
  {
    icon: Target,
    title: "Aptitude & reasoning",
    body: "Weekly sessions from the third semester covering quantitative aptitude, logical reasoning and verbal ability for campus tests.",
  },
  {
    icon: Briefcase,
    title: "Technical interview preparation",
    body: "Department-led preparation on data structures, DBMS, operating systems and core-subject viva questions.",
  },
  {
    icon: Users,
    title: "Mock interviews & résumé clinics",
    body: "One-to-one feedback from the Corporate Relations Centre, including recruiter-run sessions ahead of drive season.",
  },
];

export default async function PlacementsPage() {
  const placements = await getPlacements(6);
  const engineering = placementStats.engineeringHighestByYear;
  const management = placementStats.managementHighestByYear;
  const maxLpa = Math.max(...engineering.map((entry) => entry.lpa));

  return (
    <>
      <PageHero
        eyebrow="Career services"
        title="Placements & recruiters"
        intro="The Corporate Relations Centre runs the campus recruitment programme. Below is the published year-wise record — the same numbers appear on the institute's own placement pages."
        crumbs={[{ label: "Home", href: "/" }, { label: "Placements" }]}
      >
        <dl className="grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Highest package", value: `₹${placementStats.headline.highestLpa} LPA` },
            { label: "Year", value: String(placementStats.headline.highestYear) },
            { label: "Students placed", value: `${placementStats.headline.studentsPlacedLatest}+` },
            { label: "Recruiting partners shown", value: String(recruiters.length) },
          ].map((item) => (
            <div key={item.label}>
              <dt className="text-[10px] font-bold uppercase tracking-wide text-stone-400">
                {item.label}
              </dt>
              <dd className="mt-0.5 font-editorial text-base font-bold text-white">{item.value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <section className="border-b border-stone-200 bg-white py-12 sm:py-16">
        <div className="container-page">
          <h2 className="flex items-center gap-2 font-editorial text-2xl font-extrabold text-navy">
            <TrendingUp className="h-5 w-5 text-crimson" aria-hidden="true" />
            Year-wise placement record
          </h2>

          <div className="mt-5 grid gap-8 lg:grid-cols-2">
            {/* Engineering */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wide text-stone-500">
                Engineering stream
              </h3>
              <div className="mt-2 overflow-x-auto rounded-md border border-stone-200">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">
                    Engineering: highest package and students placed by year
                  </caption>
                  <thead className="bg-stone-50 text-[10px] uppercase tracking-wide text-stone-500">
                    <tr>
                      <th scope="col" className="px-3 py-2 font-bold">Year</th>
                      <th scope="col" className="px-3 py-2 font-bold">Highest</th>
                      <th scope="col" className="px-3 py-2 font-bold">Placed</th>
                      <th scope="col" className="w-20 px-3 py-2 font-bold">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {[...engineering].reverse().map((entry) => {
                      const placed = placementStats.engineeringPlacedByYear.find(
                        (item) => item.year === entry.year
                      );
                      return (
                        <tr key={entry.year}>
                          <th scope="row" className="px-3 py-2 font-mono text-xs font-bold text-navy">
                            {entry.year}
                          </th>
                          <td className="px-3 py-2 font-semibold text-navy">₹{entry.lpa.toFixed(1)} LPA</td>
                          <td className="px-3 py-2 text-stone-600">{placed?.placed ?? "—"}</td>
                          <td className="px-3 py-2">
                            <span
                              className="block h-1.5 rounded-full bg-navy"
                              style={{ width: `${Math.round((entry.lpa / maxLpa) * 100)}%` }}
                              aria-hidden="true"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Management */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wide text-stone-500">
                Management stream
              </h3>
              <div className="mt-2 overflow-x-auto rounded-md border border-stone-200">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">
                    Management: highest package by year
                  </caption>
                  <thead className="bg-stone-50 text-[10px] uppercase tracking-wide text-stone-500">
                    <tr>
                      <th scope="col" className="px-3 py-2 font-bold">Year</th>
                      <th scope="col" className="px-3 py-2 font-bold">Highest</th>
                      <th scope="col" className="w-24 px-3 py-2 font-bold">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {[...management].reverse().map((entry) => (
                      <tr key={entry.year}>
                        <th scope="row" className="px-3 py-2 font-mono text-xs font-bold text-navy">
                          {entry.year}
                        </th>
                        <td className="px-3 py-2 font-semibold text-navy">₹{entry.lpa.toFixed(1)} LPA</td>
                        <td className="px-3 py-2">
                          <span
                            className="block h-1.5 rounded-full bg-gold"
                            style={{
                              width: `${Math.round((entry.lpa / Math.max(...management.map((m) => m.lpa))) * 100)}%`,
                            }}
                            aria-hidden="true"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <p className="mt-3 text-[11px] leading-relaxed text-stone-500">
            Source: GITM published placement highlights. Percentages, averages and counts reported
            by third-party aggregators often differ from these institutional figures — where they
            disagree, the institute&rsquo;s own record prevails. Ask for the current placement
            report during counselling.
          </p>

          {/* Student highlights */}
          <h2 className="mt-12 font-editorial text-xl font-bold text-navy">Recent offers</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {placements.map((placement) => (
              <li key={placement.id} className="rounded-md border border-stone-200 p-4">
                <div className="flex items-center gap-3">
                  {placement.photoUrl ? (
                    <Image
                      src={placement.photoUrl}
                      alt=""
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded-sm object-cover"
                    />
                  ) : (
                    <span className="flex h-14 w-14 items-center justify-center rounded-sm bg-stone-100 text-stone-400">
                      <Users className="h-6 w-6" aria-hidden="true" />
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-navy">{placement.studentName}</p>
                    <p className="truncate text-[11px] text-stone-600">{placement.branch}</p>
                    <p className="text-[10px] text-stone-400">{placement.year}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline justify-between border-t border-stone-100 pt-3">
                  <div>
                    <p className="text-xs font-semibold text-navy">{placement.company}</p>
                    <p className="text-[10px] text-stone-500">{placement.designation}</p>
                  </div>
                  <p className="font-editorial text-lg font-black text-crimson">
                    ₹{placement.packageLPA}
                    <span className="text-[10px] font-bold text-stone-400">LPA</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Training */}
      <section id="training" className="scroll-mt-32 border-b border-stone-200 bg-paper py-12 sm:py-16">
        <div className="container-page">
          <h2 className="font-editorial text-2xl font-extrabold text-navy">Preparation, not just drives</h2>
          <p className="mt-2 max-w-2xl text-sm text-stone-600">
            The Corporate Relations Centre runs a continuous preparation programme alongside the
            recruitment calendar.
          </p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {training.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.title} className="rounded-md border border-stone-200 bg-white p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-navy text-white">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-navy">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-stone-600">{item.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Recruiters */}
      <section id="recruiters" className="scroll-mt-32 border-b border-stone-200 bg-white py-12 sm:py-16">
        <div className="container-page">
          <h2 className="font-editorial text-2xl font-extrabold text-navy">Recruiting partners</h2>
          <p className="mt-2 max-w-2xl text-sm text-stone-600">
            Organisations that have recruited from GITM or engaged through internships, MoUs and
            corporate technical symposia.
          </p>
          <ul className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {recruiters.map((recruiter) => (
              <li
                key={recruiter.name}
                className="flex h-20 flex-col items-center justify-center gap-1 rounded-sm border border-stone-200 bg-white p-2"
              >
                {recruiter.logo ? (
                  <Image
                    src={recruiter.logo}
                    alt={recruiter.name}
                    width={120}
                    height={44}
                    className="max-h-9 w-auto object-contain"
                  />
                ) : (
                  <span className="text-center text-[11px] font-bold text-stone-600">{recruiter.name}</span>
                )}
                <span className="sr-only">{recruiter.sector}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] text-stone-500">
            Logos are the property of their respective owners and are shown to indicate recruiting
            relationships. Inclusion does not imply a standing guarantee of employment.
          </p>

          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-crimson"
          >
            Contact the Corporate Relations Centre ({site.emails.placements})
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <CtaBand
        title="Choosing a college is also choosing a career service"
        body="Ask us for the current placement report and the list of drives already held this session."
      />
    </>
  );
}
