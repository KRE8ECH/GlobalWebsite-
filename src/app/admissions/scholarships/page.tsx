import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBand } from "@/components/layout/cta-band";
import { ScholarshipEstimator } from "@/components/admissions/scholarship-estimator";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Scholarships & Fee Concessions",
  description:
    "Merit scholarships at GITM Gurugram for 12th board toppers, JEE Main rank holders and CUET scorers, plus state and central government scholarship routes.",
  alternates: { canonical: "/admissions/scholarships" },
};

const slabs = [
  { basis: "12th board", criteria: "95% and above", concession: "Up to 100%" },
  { basis: "12th board", criteria: "90% – 94.99%", concession: "Up to 50%" },
  { basis: "12th board", criteria: "85% – 89.99%", concession: "Up to 25%" },
  { basis: "JEE Main", criteria: "Rank under 10,000", concession: "Up to 100%" },
  { basis: "JEE Main", criteria: "Rank 10,000 – 25,000", concession: "Up to 50%" },
  { basis: "CUET", criteria: "Percentile 95 and above", concession: "Up to 50%" },
];

export default function ScholarshipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions · Scholarships"
        title="Merit scholarships & fee concessions"
        intro="Institutional concessions for strong academic performers, and guidance on the state and central scholarship schemes Haryana students are usually eligible for."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Admissions", href: "/admissions" },
          { label: "Scholarships" },
        ]}
      />

      <section className="border-b border-stone-200 bg-white py-12 sm:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-editorial text-2xl font-extrabold text-navy">
              Institutional merit slabs
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              Concessions are applied to tuition only, are reviewed each session, and are subject
              to maintaining satisfactory attendance and academic standing.
            </p>

            <div className="mt-4 overflow-x-auto rounded-md border border-stone-200">
              <table className="w-full min-w-[480px] text-left text-sm">
                <caption className="sr-only">Merit scholarship slabs</caption>
                <thead className="bg-stone-50 text-[10px] uppercase tracking-wide text-stone-500">
                  <tr>
                    <th scope="col" className="px-4 py-2.5 font-bold">Basis</th>
                    <th scope="col" className="px-4 py-2.5 font-bold">Requirement</th>
                    <th scope="col" className="px-4 py-2.5 font-bold">Concession</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {slabs.map((slab) => (
                    <tr key={`${slab.basis}-${slab.criteria}`}>
                      <th scope="row" className="px-4 py-2.5 font-semibold text-navy">{slab.basis}</th>
                      <td className="px-4 py-2.5 text-stone-600">{slab.criteria}</td>
                      <td className="px-4 py-2.5 font-bold text-emerald-700">{slab.concession}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 rounded-md border-l-4 border-amber-500 bg-amber-50 p-4">
              <p className="flex items-start gap-2 text-xs leading-relaxed text-amber-900">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  <strong>These slabs are indicative.</strong> They reflect the scheme described in
                  the institute&rsquo;s admissions material. Actual award, the exact percentage and
                  any conditions are confirmed in writing by the admissions committee. Nothing on
                  this page is an offer of a scholarship.
                </span>
              </p>
            </div>

            <h2 className="mt-10 font-editorial text-xl font-bold text-navy">
              Government scholarship routes
            </h2>
            <ul className="mt-3 space-y-2">
              {[
                {
                  title: "Haryana Post Matric Scholarship",
                  body: "For SC, BC-A, BC-B and other eligible categories domiciled in Haryana, via the Haryana Kaushal Rozgar Nigam / e-Bandhu portal.",
                },
                {
                  title: "National Scholarship Portal (NSP)",
                  body: "Central schemes including the Central Sector Scheme of Scholarship for College and University Students, for students in the top 20th percentile of their board.",
                },
                {
                  title: "AICTE Pragati & Saksham",
                  body: "Pragati for girls and Saksham for differently-abled students in AICTE-approved technical programmes.",
                },
                {
                  title: "Haryana Meritorious Students scheme",
                  body: "State award for top board performers; check the current notification for the applicable year.",
                },
              ].map((scheme) => (
                <li key={scheme.title} className="flex items-start gap-2 rounded-md border border-stone-200 p-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-bold text-navy">{scheme.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-stone-600">{scheme.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] leading-relaxed text-stone-500">
              Government schemes are administered by the respective departments. Apply directly on
              the official portal for the scheme; the institute can help you assemble documents but
              cannot approve an award.
            </p>

            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-crimson"
            >
              Ask the scholarship desk for help with documents
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-32">
              <ScholarshipEstimator />
              <div className="mt-3 rounded-md border border-stone-200 bg-paper p-4">
                <p className="text-[10px] font-bold uppercase tracking-wide text-stone-500">
                  Talk to the scholarship desk
                </p>
                <a
                  href={site.phones.admissions.tel}
                  className="mt-1 block font-editorial text-lg font-bold text-navy hover:text-crimson"
                >
                  {site.phones.admissions.value}
                </a>
                <p className="mt-1 text-[11px] text-stone-500">{site.hours.counselling}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
