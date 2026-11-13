import type { Metadata } from "next";
import Link from "next/link";
import { Info, ArrowRight, Download } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBand } from "@/components/layout/cta-band";
import { programs, formatInr, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Fees & Charges",
  description:
    "Annual tuition fees for every programme at GITM Gurugram, plus the additional charges applicants should budget for. Confirm current figures before paying.",
  alternates: { canonical: "/admissions/fees" },
};

const additionalCharges = [
  { label: "One-time admission / registration", note: "Charged once at the time of joining" },
  { label: "University examination fee", note: "Billed per semester as notified by Gurugram University" },
  { label: "Hostel and mess", note: "A/C and Non-A/C options; billed annually" },
  { label: "Transport (institute bus)", note: "Route-dependent; ask for the current route chart" },
  { label: "Library and laboratory caution deposit", note: "Refundable, subject to clearance" },
];

export default function FeesPage() {
  const byDepartment = ["Engineering", "Management", "Computer Applications", "Pharmacy"] as const;

  return (
    <>
      <PageHero
        eyebrow="Admissions · Fees"
        title="Fee structure"
        intro="Annual tuition for each programme, plus the charges that sit outside tuition. Published so families can budget before applying."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Admissions", href: "/admissions" },
          { label: "Fees" },
        ]}
      />

      <section className="border-b border-stone-200 bg-white py-12 sm:py-16">
        <div className="container-page">
          <div className="rounded-md border-l-4 border-amber-500 bg-amber-50 p-4">
            <p className="flex items-start gap-2 text-xs leading-relaxed text-amber-900">
              <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                <strong>Verify before you pay.</strong> The figures below are annual tuition for
                the 2026-27 session and exclude the additional charges listed further down. Fees
                change between sessions. Always confirm the current amount with the accounts
                office at{" "}
                <a href={site.phones.general.tel} className="font-bold underline">
                  {site.phones.general.value}
                </a>{" "}
                or {site.emails.administration}.
              </span>
            </p>
          </div>

          {byDepartment.map((department) => {
            const items = programs.filter((programme) => programme.department === department);
            if (items.length === 0) return null;

            return (
              <div key={department} className="mt-10">
                <h2 className="font-editorial text-xl font-bold text-navy">{department}</h2>
                <div className="mt-3 overflow-x-auto rounded-md border border-stone-200">
                  <table className="w-full min-w-[520px] text-left text-sm">
                    <caption className="sr-only">
                      Annual tuition fees for {department} programmes
                    </caption>
                    <thead className="bg-stone-50 text-[10px] uppercase tracking-wide text-stone-500">
                      <tr>
                        <th scope="col" className="px-4 py-2.5 font-bold">Programme</th>
                        <th scope="col" className="px-4 py-2.5 font-bold">Duration</th>
                        <th scope="col" className="px-4 py-2.5 font-bold">Annual tuition</th>
                        <th scope="col" className="px-4 py-2.5 font-bold">Est. programme total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {items.map((programme) => (
                        <tr key={programme.slug} className="hover:bg-stone-50">
                          <th scope="row" className="px-4 py-3 font-semibold text-navy">
                            <Link href={`/programmes/${programme.slug}`} className="hover:text-crimson">
                              {programme.shortName}
                            </Link>
                          </th>
                          <td className="px-4 py-3 text-stone-600">{programme.durationYears} years</td>
                          <td className="px-4 py-3 font-mono text-xs text-navy">
                            {programme.annualFeeInr !== null ? formatInr(programme.annualFeeInr) : "On request"}
                          </td>
                          <td className="px-4 py-3 font-mono text-xs text-stone-600">
                            {programme.annualFeeInr !== null
                              ? formatInr(programme.annualFeeInr * programme.durationYears)
                              : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}

          <h2 className="mt-12 font-editorial text-xl font-bold text-navy">
            Charges outside tuition
          </h2>
          <ul className="mt-3 divide-y divide-stone-100 rounded-md border border-stone-200">
            {additionalCharges.map((charge) => (
              <li key={charge.label} className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3">
                <span className="text-sm font-semibold text-navy">{charge.label}</span>
                <span className="text-[11px] text-stone-500">{charge.note}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-md border border-stone-200 p-4">
              <h3 className="text-sm font-bold text-navy">Payment channels</h3>
              <p className="mt-1 text-xs leading-relaxed text-stone-600">
                Fees are accepted through the institute&apos;s official portal, demand draft in
                favour of the institute, or NEFT to the account printed on your admission offer.
                The institute does not accept cash at the campus gate, and no staff member will
                ask you to transfer money to a personal account.
              </p>
            </div>
            <div className="rounded-md border border-stone-200 p-4">
              <h3 className="text-sm font-bold text-navy">Refunds</h3>
              <p className="mt-1 text-xs leading-relaxed text-stone-600">
                Refund eligibility follows the AICTE and Gurugram University norms in force for
                the session. Caution deposits are refundable after clearance of library and
                laboratory dues. Ask for the refund policy in writing with your offer letter.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/admissions/scholarships"
              className="inline-flex h-11 items-center gap-2 rounded-sm bg-navy px-5 text-sm font-bold text-white hover:bg-navy-dark"
            >
              Estimate a scholarship
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/policies/mandatory-disclosure"
              className="inline-flex h-11 items-center gap-2 rounded-sm border border-stone-300 px-5 text-sm font-bold text-navy hover:border-navy/40"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Mandatory disclosure
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
