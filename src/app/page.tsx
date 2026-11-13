import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Award, ArrowRight, Landmark } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { StatStrip } from "@/components/home/stat-strip";
import { ProgrammeGrid } from "@/components/home/programme-grid";
import { PlacementSection } from "@/components/home/placement-section";
import { NoticeBoard } from "@/components/notices/notice-board";
import { EventsSection } from "@/components/home/events-section";
import { CampusSection } from "@/components/home/campus-section";
import { CtaSection } from "@/components/home/cta-section";
import { DeadlineCountdown } from "@/components/home/deadline-countdown";
import { getEvents, getNotices, getPlacements } from "@/lib/content";
import { site, campusFacts, programs, admissionsSeason } from "@/data/site";
import { academicCalendar } from "@/data/content";

export const metadata: Metadata = {
  title: `${site.name} | Engineering, Management & Pharmacy in Gurugram`,
  description: site.description,
  alternates: { canonical: "/" },
};

/* Revalidate hourly: notices and events can change without a redeploy. */
export const revalidate = 3600;

/* Computed once per build rather than during render. */
const YEARS_OF_SERVICE = new Date().getFullYear() - site.established;

export default async function HomePage() {
  const [notices, events, placements] = await Promise.all([
    getNotices(10),
    getEvents(6),
    getPlacements(4),
  ]);

  // Resolve "next" milestone against the request time server-side only, so the
  // render stays pure and cannot disagree with the client.
  const now = new Date();
  const nextMilestone = academicCalendar.find((item) => new Date(item.date) > now);

  return (
    <>
      <Hero />
      <StatStrip />

      {/* Compact trust strip — statutory facts, not marketing copy. */}
      <section aria-label="Approvals" className="border-b border-stone-200 bg-white py-4">
        <div className="container-page flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-semibold text-stone-600">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
            AICTE approved
          </span>
          <span className="flex items-center gap-1.5">
            <Landmark className="h-3.5 w-3.5 text-navy" aria-hidden="true" />
            Affiliated to Gurugram University
          </span>
          <span className="flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5 text-crimson" aria-hidden="true" />
            PCI approved pharmacy programmes
          </span>
          <span>DTE Haryana Code {site.dteCode}</span>
          <span>Estd. {site.established}</span>
        </div>
      </section>

      <ProgrammeGrid />

      <PlacementSection placements={placements} />

      {/* Admissions snapshot + countdown */}
      <section
        aria-labelledby="admissions-snapshot"
        className="border-b border-stone-200 bg-white py-14 sm:py-16"
      >
        <div className="container-page grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-wide text-crimson">
              Admissions {admissionsSeason}
            </p>
            <h2
              id="admissions-snapshot"
              className="mt-2 font-editorial text-2xl font-extrabold text-navy sm:text-3xl"
            >
              What you need to apply
            </h2>
            <ol className="mt-5 space-y-3">
              {[
                {
                  title: "Check your eligibility",
                  detail:
                    "Most programmes need 45% aggregate in the qualifying examination. Use the eligibility checker to see which programmes fit your stream.",
                  href: "/admissions#eligibility",
                },
                {
                  title: "Estimate your scholarship",
                  detail:
                    "Merit concessions are available on 12th board percentage, JEE Main rank and CUET percentile. Estimate yours before you apply.",
                  href: "/admissions/scholarships",
                },
                {
                  title: "Submit the application",
                  detail:
                    "Apply online through the official portal, or speak to a counsellor first if you are unsure which programme suits you.",
                  href: "/admissions#apply",
                },
              ].map((step, index) => (
                <li key={step.title} className="flex gap-3 rounded-md border border-stone-200 p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy font-mono text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy">{step.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-stone-600">{step.detail}</p>
                    <Link
                      href={step.href}
                      className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-crimson hover:underline"
                    >
                      Continue
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-4 lg:col-span-5">
            <DeadlineCountdown
              target="2027-07-31T18:29:00.000Z"
              label={`Applications for ${admissionsSeason}`}
            />

            {nextMilestone && (
              <div className="rounded-md border border-stone-200 bg-paper p-4">
                <p className="text-[10px] font-bold uppercase tracking-wide text-stone-500">
                  Next academic milestone
                </p>
                <p className="mt-1 text-sm font-bold text-navy">{nextMilestone.title}</p>
                <p className="text-xs text-stone-600">
                  <time dateTime={nextMilestone.date}>{nextMilestone.dateLabel}</time>
                </p>
                <Link
                  href="/events#calendar"
                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-crimson hover:underline"
                >
                  Academic calendar
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </div>
            )}

            <div className="rounded-md border border-stone-200 bg-white p-4">
              <p className="text-[10px] font-bold uppercase tracking-wide text-stone-500">
                Programme count
              </p>
              <p className="mt-1 font-editorial text-2xl font-black text-navy">
                {programs.length}{" "}
                <span className="text-xs font-bold text-stone-500">degree programmes</span>
              </p>
              <p className="mt-1 text-[11px] text-stone-600">
                Across engineering, management, computer applications and pharmacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <NoticeBoard notices={notices} />
      <EventsSection events={events} />
      <CampusSection />

      {/* About summary */}
      <section
        id="about"
        aria-labelledby="about-heading"
        className="scroll-mt-32 border-b border-stone-200 bg-white py-14 sm:py-20"
      >
        <div className="container-page grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-wide text-crimson">
              About the institute
            </p>
            <h2
              id="about-heading"
              className="mt-2 font-editorial text-2xl font-extrabold text-navy sm:text-4xl"
            >
              {YEARS_OF_SERVICE} years of technical education in Haryana
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-stone-700">
              <p>
                {site.name} was established in {site.established} under the{" "}
                {site.society}. It is approved by the All India Council for Technical Education
                (AICTE), recognised by the Directorate of Technical Education, Government of
                Haryana, and affiliated to Gurugram University. Pharmacy programmes are
                approved by the Pharmacy Council of India.
              </p>
              <p>
                The {campusFacts.acres}-acre campus at Kheda Khurrampur, Farrukhnagar houses{" "}
                {campusFacts.builtUpSqFt} of constructed area, {campusFacts.computerLabs}{" "}
                computer laboratories with {campusFacts.computers} systems, a library of{" "}
                {campusFacts.libraryVolumes} volumes and separate hostels for boys and girls.
              </p>
              <p>
                Students come from across Haryana, Delhi NCR and neighbouring states, as well as
                from Nepal, Bhutan, Bangladesh and the UAE. Academic collaborations include{" "}
                {campusFacts.internationalCollaborations.join(" and ")}.
              </p>
            </div>
            <Link
              href="/about"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-crimson"
            >
              Read the full institutional profile
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-md border border-stone-200 bg-paper p-5">
              <h3 className="font-editorial text-base font-bold text-navy">
                Approvals and affiliation
              </h3>
              <ul className="mt-3 space-y-2">
                {site.approvals.map((approval) => (
                  <li key={approval} className="flex items-start gap-2 text-xs text-stone-700">
                    <ShieldCheck
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600"
                      aria-hidden="true"
                    />
                    {approval}
                  </li>
                ))}
              </ul>
              <Link
                href="/about/approvals"
                className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold text-crimson hover:underline"
              >
                Approval documents and mandatory disclosure
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>

              {nextMilestone && (
                <p className="mt-4 border-t border-stone-200 pt-3 text-[11px] text-stone-500">
                  Institutional figures are reviewed each academic session.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
