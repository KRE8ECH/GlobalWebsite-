import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ExternalLink, AlertCircle } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBand } from "@/components/layout/cta-band";
import { site } from "@/data/site";
import { complianceLinks } from "@/data/site";

export const metadata: Metadata = {
  title: "Approvals & Affiliation",
  description:
    "GITM Gurugram's statutory approvals: AICTE approval, DTE Haryana recognition, PCI approval for pharmacy, and affiliation to Gurugram University.",
  alternates: { canonical: "/about/approvals" },
};

const approvals = [
  {
    body: "All India Council for Technical Education (AICTE)",
    scope: "All engineering, management and computer applications programmes",
    detail:
      "AICTE, under the Ministry of Education, Government of India, approves technical institutions and their sanctioned intake each academic session.",
    verify: "https://www.aicte-india.org",
  },
  {
    body: "Directorate of Technical Education (DTE), Government of Haryana",
    scope: `Institute code ${site.dteCode}`,
    detail:
      "DTE Haryana recognises the institute for technical education in the state and administers state-level admission and fee regulation.",
    verify: "https://techeduhry.gov.in",
  },
  {
    body: "Gurugram University, Gurugram",
    scope: "Affiliation for all degree programmes",
    detail:
      "Gurugram University conducts examinations, awards degrees and sets the curriculum framework (NEP 2020) to which the institute is affiliated.",
    verify: "https://gurugramuniversity.ac.in",
  },
  {
    body: "Pharmacy Council of India (PCI)",
    scope: "B.Pharm and D.Pharm programmes",
    detail:
      "PCI regulates pharmacy education nationally and approves the institute's pharmacy programmes and intake.",
    verify: "https://www.pci.nic.in",
  },
];

export default function ApprovalsPage() {
  return (
    <>
      <PageHero
        eyebrow="Compliance"
        title="Approvals & affiliation"
        intro="An institute's degrees are only worth what its approvals are worth. This page lists every statutory approval GITM relies on, with the regulator's own site so you can verify it independently."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Approvals" },
        ]}
      />

      <section className="border-b border-stone-200 bg-white py-12 sm:py-16">
        <div className="container-page">
          <ul className="grid gap-4 sm:grid-cols-2">
            {approvals.map((approval) => (
              <li key={approval.body} className="rounded-md border border-stone-200 p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-emerald-600 text-white">
                    <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="text-sm font-bold text-navy">{approval.body}</h2>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-crimson">
                      {approval.scope}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-stone-600">{approval.detail}</p>
                <a
                  href={approval.verify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-navy hover:text-crimson"
                >
                  Verify on the regulator&rsquo;s site
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-md border border-amber-300 bg-amber-50 p-4">
            <p className="flex items-start gap-2 text-xs leading-relaxed text-amber-900">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                <strong>Verify before you enrol.</strong> Approval status and sanctioned intake are
                renewed each session. AICTE and DTE publish the authoritative record — check the
                institute&rsquo;s current entry there rather than relying on any brochure, including
                this website.
              </span>
            </p>
          </div>

          <h2 className="mt-10 font-editorial text-xl font-bold text-navy">
            Mandatory public disclosures
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {complianceLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center justify-between gap-2 rounded-md border border-stone-200 px-4 py-3 text-sm hover:border-navy/40"
                >
                  <span className="font-semibold text-navy">{link.label}</span>
                  <span className="text-[10px] text-stone-500">{link.note ?? ""}</span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-[11px] text-stone-500">
            Approval letters, affiliation orders and the AICTE Essential of Approval report are
            available from the institute office and are displayed on the campus notice board.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
