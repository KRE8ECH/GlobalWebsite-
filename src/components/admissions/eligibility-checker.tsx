"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, ArrowRight, GraduationCap } from "lucide-react";
import { programs } from "@/data/site";
import { Field, Select } from "@/components/ui/field";

/**
 * "Which programmes am I eligible for?"
 * ---------------------------------------------------------------------------
 * Applicants — especially first-generation applicants in Haryana — routinely
 * arrive not knowing whether their stream qualifies them. Answering that before
 * asking for a phone number is both better service and a stronger funnel.
 */

const streams = [
  { id: "pcm", label: "12th with Physics, Chemistry & Maths (PCM)" },
  { id: "pcb", label: "12th with Physics, Chemistry & Biology (PCB)" },
  { id: "pcmb", label: "12th with Physics, Chemistry, Maths & Biology" },
  { id: "commerce", label: "12th Commerce" },
  { id: "arts", label: "12th Arts / Humanities" },
  { id: "bca", label: "Graduation — BCA / B.Sc. CS / IT / Maths" },
  { id: "any-grad", label: "Graduation — any other discipline" },
  { id: "diploma", label: "Diploma (Engineering) or B.Sc." },
  { id: "btech", label: "B.Tech / B.E. graduate" },
] as const;

type StreamId = (typeof streams)[number]["id"];

/** Which programme level each stream can enter. */
const eligibleLevels: Record<StreamId, string[]> = {
  pcm: ["UG", "DIPLOMA"],
  pcb: ["UG", "DIPLOMA"],
  pcmb: ["UG", "DIPLOMA"],
  commerce: ["UG"],
  arts: ["UG"],
  bca: ["PG"],
  "any-grad": ["PG"],
  diploma: ["LEET"],
  btech: ["PG"],
};

/** Pharmacy needs Chemistry plus Biology or Maths — Commerce is not eligible. */
function qualifies(programmeSlug: string, stream: StreamId) {
  const blocked: Record<StreamId, string[]> = {
    pcm: [],
    pcb: ["bca"],
    pcmb: [],
    commerce: ["b-pharm", "d-pharm", "bca", "b-tech-cse", "b-tech-ai-ds", "b-tech-ai-ml", "b-tech-ece", "b-tech-me", "b-tech-ce"],
    arts: ["b-pharm", "d-pharm", "bca", "b-tech-cse", "b-tech-ai-ds", "b-tech-ai-ml", "b-tech-ece", "b-tech-me", "b-tech-ce"],
    bca: [],
    "any-grad": [],
    diploma: [],
    btech: [],
  };
  return !blocked[stream].includes(programmeSlug);
}

export function EligibilityChecker() {
  const [stream, setStream] = React.useState<StreamId | "">("");
  const [percentage, setPercentage] = React.useState("");

  const numeric = Number.parseFloat(percentage);
  const hasScore = Number.isFinite(numeric);

  const matches = React.useMemo(() => {
    if (!stream) return [];
    const allowedLevels = eligibleLevels[stream];
    return programs.filter(
      (programme) =>
        allowedLevels.includes(programme.level) &&
        qualifies(programme.slug, stream) &&
        (!hasScore || numeric >= 45)
    );
  }, [stream, hasScore, numeric]);

  return (
    <div className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-crimson text-white">
          <GraduationCap className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-editorial text-lg font-bold text-navy">
            Which programmes can I join?
          </h2>
          <p className="text-[11px] text-stone-500">Check eligibility in two steps</p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Field id="elig-stream" label="Your last qualification">
          <Select
            id="elig-stream"
            value={stream}
            onChange={(event) => setStream(event.target.value as StreamId)}
          >
            <option value="">Select your qualification…</option>
            {streams.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          id="elig-score"
          label="Aggregate percentage (optional)"
          hint="Most programmes require a minimum of 45%"
        >
          <select
            id="elig-score"
            value={percentage}
            onChange={(event) => setPercentage(event.target.value)}
            className="flex h-11 w-full rounded-sm border border-stone-300 bg-white px-3 text-sm text-navy focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
          >
            <option value="">Prefer not to say</option>
            <option value="60">60% and above</option>
            <option value="50">50% – 59%</option>
            <option value="45">45% – 49%</option>
            <option value="40">Below 45%</option>
          </select>
        </Field>
      </div>

      {stream && (
        <div className="mt-4" aria-live="polite">
          {hasScore && numeric < 45 ? (
            <p className="flex items-start gap-2 rounded-sm border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900">
              <XCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                Most programmes require a minimum of 45% aggregate. Several categories —
                including reserved-category candidates — have relaxed cut-offs, so please speak
                to the admissions office rather than ruling yourself out.
              </span>
            </p>
          ) : matches.length > 0 ? (
            <div className="rounded-sm border border-emerald-200 bg-emerald-50 p-3">
              <p className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                You appear eligible for {matches.length} programme
                {matches.length === 1 ? "" : "s"}:
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {matches.map((programme) => (
                  <li key={programme.slug}>
                    <Link
                      href={`/programmes/${programme.slug}`}
                      className="inline-flex items-center gap-1 rounded-sm border border-emerald-300 bg-white px-2 py-1 text-[11px] font-semibold text-emerald-900 hover:border-emerald-500"
                    >
                      {programme.shortName}
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="rounded-sm border border-stone-200 bg-stone-50 p-3 text-xs text-stone-600">
              No programme matched that combination automatically. Our counsellors can review
              your documents and advise on the closest option.
            </p>
          )}
        </div>
      )}

      <p className="mt-3 text-[11px] leading-relaxed text-stone-500">
        Indicative guidance based on the eligibility criteria published for each programme.
        Final eligibility is determined by Gurugram University ordinances and the admissions
        committee.
      </p>
    </div>
  );
}
