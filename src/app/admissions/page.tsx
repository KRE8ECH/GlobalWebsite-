import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileCheck, Phone, MessageCircle, ExternalLink, CalendarClock } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBand } from "@/components/layout/cta-band";
import { InquiryForm } from "@/components/admissions/inquiry-form";
import { EligibilityChecker } from "@/components/admissions/eligibility-checker";
import { ScholarshipEstimator } from "@/components/admissions/scholarship-estimator";
import { DeadlineCountdown } from "@/components/home/deadline-countdown";
import { site, admissionsSeason } from "@/data/site";

export const metadata: Metadata = {
  title: `Admissions ${admissionsSeason}`,
  description:
    "How to apply to GITM Gurugram for the 2026-27 session: eligibility, documents, fee structure, scholarships and the official application portal.",
  alternates: { canonical: "/admissions" },
};

const steps = [
  {
    title: "Confirm your eligibility",
    body: "Most programmes require 45% aggregate in the qualifying examination. Pharmacy programmes require Chemistry with Biology or Mathematics.",
  },
  {
    title: "Prepare your documents",
    body: "Class 10 and 12 marksheets, transfer and character certificates, migration certificate (non-Haryana boards), category certificate if applicable, and passport photographs.",
  },
  {
    title: "Complete the online application",
    body: "Use the official GITM admissions portal. Keep the application number you receive — you will need it for counselling and fee payment.",
  },
  {
    title: "Attend counselling",
    body: "A counsellor reviews your documents, confirms the programme and explains the fee schedule and scholarship slab that applies to you.",
  },
  {
    title: "Pay fees and confirm your seat",
    body: "Fees are payable only through the institute's official channels. Never transfer money to an individual or agent.",
  },
];

const documents = [
  "Class 10 marksheet and certificate",
  "Class 12 marksheet and certificate",
  "JEE Main / CUET / CAT / MAT / CMAT scorecard (if applicable)",
  "Diploma or degree marksheets (for lateral entry and PG applicants)",
  "Transfer certificate and character certificate",
  "Migration certificate (for boards other than HBSE / CBSE Haryana)",
  "Category and income certificate (Haryana residents, if claiming reservation)",
  "Six passport-size photographs",
  "Aadhaar card copy",
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow={`Admissions ${admissionsSeason}`}
        title="Admissions are open"
        intro="Everything you need to apply to GITM Gurugram — eligibility, documents, fees, scholarships and a direct line to a counsellor."
        crumbs={[{ label: "Home", href: "/" }, { label: "Admissions" }]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={site.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-sm bg-crimson px-6 text-sm font-bold uppercase tracking-wide text-white hover:bg-crimson-dark"
          >
            Official application portal
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={site.phones.admissions.tel}
            className="inline-flex h-12 items-center gap-2 rounded-sm border border-white/25 bg-white/5 px-5 text-sm font-bold hover:bg-white/15"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {site.phones.admissions.value}
          </a>
          <a
            href={site.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 px-2 text-sm font-semibold text-emerald-300 underline-offset-4 hover:underline"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </PageHero>

      {/* Process */}
      <section id="apply" className="scroll-mt-32 border-b border-stone-200 bg-white py-12 sm:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-editorial text-2xl font-extrabold text-navy">How to apply</h2>
            <p className="mt-2 text-sm text-stone-600">
              Five steps, roughly two working days end to end if your documents are ready.
            </p>

            <ol className="mt-6 space-y-3">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-4 rounded-md border border-stone-200 p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy font-mono text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-navy">{step.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-stone-600">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h2 className="mt-10 font-editorial text-xl font-bold text-navy">
              Documents checklist
            </h2>
            <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
              {documents.map((document) => (
                <li key={document} className="flex items-start gap-2 text-xs text-stone-700">
                  <FileCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
                  {document}
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-md border border-crimson/25 bg-crimson/5 p-4">
              <h3 className="text-sm font-bold text-crimson">Beware of agents</h3>
              <p className="mt-1 text-xs leading-relaxed text-stone-700">
                GITM does not authorise third-party agents to collect fees or guarantee
                admission. Fees are payable only through the institute&apos;s official channels,
                and every offer of admission is issued on institute letterhead with an
                application number. If someone asks for cash, stop and call{" "}
                <a href={site.phones.admissions.tel} className="font-bold underline">
                  {site.phones.admissions.value}
                </a>
                .
              </p>
            </div>
          </div>

          <aside className="space-y-4 lg:col-span-5">
            <DeadlineCountdown
              target="2027-07-31T18:29:00.000Z"
              label={`Applications for ${admissionsSeason}`}
              href="#apply"
            />

            <div className="overflow-hidden rounded-md border border-stone-200 bg-white shadow-sm">
              <div className="border-b border-stone-200 bg-paper px-5 py-3">
                <h2 className="font-editorial text-base font-bold text-navy">
                  Request a callback
                </h2>
                <p className="text-[11px] text-stone-500">No agents — a staff counsellor calls you.</p>
              </div>
              <InquiryForm idPrefix="adm" compact />
            </div>

            <div className="rounded-md border border-stone-200 bg-paper p-4">
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-stone-500">
                <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
                Counselling hours
              </p>
              <p className="mt-1 text-sm font-semibold text-navy">{site.hours.counselling}</p>
              <p className="mt-2 text-[11px] leading-relaxed text-stone-600">
                {site.campus.lines.slice(1).join(", ")}
              </p>
              <Link href="/contact" className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-crimson hover:underline">
                All contact details
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Tools */}
      <section id="eligibility" className="scroll-mt-32 border-b border-stone-200 bg-paper py-12 sm:py-16">
        <div className="container-page">
          <h2 className="font-editorial text-2xl font-extrabold text-navy">
            Check before you apply
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-stone-600">
            Two quick tools to save you a phone call. Both are indicative — the admissions office
            confirms the final position in writing.
          </p>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <EligibilityChecker />
            <ScholarshipEstimator />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/admissions/fees"
              className="inline-flex h-11 items-center gap-2 rounded-sm border border-stone-300 bg-white px-5 text-sm font-bold text-navy hover:border-navy/40"
            >
              Full fee structure
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/admissions/scholarships"
              className="inline-flex h-11 items-center gap-2 rounded-sm border border-stone-300 bg-white px-5 text-sm font-bold text-navy hover:border-navy/40"
            >
              Scholarship policy
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Questions about your application?"
        body="Our admissions team is available Monday to Saturday. Ask about eligibility, fees, hostels or transport."
      />
    </>
  );
}
