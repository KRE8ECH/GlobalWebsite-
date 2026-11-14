"use client";

import * as React from "react";
import Link from "next/link";
import { Calculator, Info, ArrowRight } from "lucide-react";
import { programs, formatInr } from "@/data/site";
import { Field, Select, Input } from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";

/**
 * Merit scholarship estimator.
 * ---------------------------------------------------------------------------
 * Slabs are the ones described on the site's own admissions copy ("fee
 * concessions up to 100% for top JEE Main / CUET / 12th board scorers"). This is
 * an ESTIMATOR: it is labelled as indicative and always ends with a "confirm
 * with the admissions office" step, because an unverified calculator that looks
 * official is a consumer-protection problem.
 */

type Basis = "board" | "jee" | "cuet";

const slabs: Record<Basis, { threshold: number; percent: number; label: string }[]> = {
  board: [
    { threshold: 95, percent: 100, label: "95% and above" },
    { threshold: 90, percent: 50, label: "90% – 94.99%" },
    { threshold: 85, percent: 25, label: "85% – 89.99%" },
    { threshold: 75, percent: 10, label: "75% – 84.99%" },
  ],
  jee: [
    { threshold: 1, percent: 100, label: "JEE Main rank under 10,000" },
    { threshold: 25000, percent: 50, label: "Rank 10,000 – 25,000" },
    { threshold: 50000, percent: 25, label: "Rank 25,000 – 50,000" },
    { threshold: 100000, percent: 10, label: "Rank 50,000 – 1,00,000" },
  ],
  cuet: [
    { threshold: 95, percent: 50, label: "CUET percentile 95 and above" },
    { threshold: 90, percent: 25, label: "CUET percentile 90 – 94.99" },
    { threshold: 80, percent: 10, label: "CUET percentile 80 – 89.99" },
  ],
};

export function ScholarshipEstimator() {
  const [basis, setBasis] = React.useState<Basis>("board");
  const [score, setScore] = React.useState<string>("");
  const [programmeSlug, setProgrammeSlug] = React.useState(programs[0].slug);

  const programme = programs.find((p) => p.slug === programmeSlug) ?? programs[0];
  const numeric = Number.parseFloat(score);
  const valid = Number.isFinite(numeric) && numeric > 0;

  const matched = React.useMemo(() => {
    if (!valid) return null;
    return (
      slabs[basis].find((slab) =>
        // Rank works the other way round: lower is better.
        basis === "jee" ? numeric <= slab.threshold : numeric >= slab.threshold
      ) ?? null
    );
  }, [basis, numeric, valid]);

  const annualFee = programme.annualFeeInr;
  const concession =
    annualFee !== null && matched ? Math.round((annualFee * matched.percent) / 100) : 0;
  const payable = annualFee !== null ? annualFee - concession : null;

  return (
    <div className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-navy text-white">
          <Calculator className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-editorial text-lg font-bold text-navy">Scholarship estimator</h2>
          <p className="text-[11px] text-stone-500">
            Indicative concession on first-year tuition
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Field id="sch-basis" label="Merit basis">
          <Select
            id="sch-basis"
            value={basis}
            onChange={(event) => {
              setBasis(event.target.value as Basis);
              setScore("");
            }}
          >
            <option value="board">12th board percentage</option>
            <option value="jee">JEE Main rank</option>
            <option value="cuet">CUET percentile</option>
          </Select>
        </Field>

        <Field
          id="sch-score"
          label={basis === "jee" ? "JEE Main rank" : basis === "cuet" ? "CUET percentile" : "12th percentage"}
          hint={basis === "jee" ? "e.g. 18000" : "e.g. 92"}
        >
          <Input
            id="sch-score"
            type="number"
            inputMode="decimal"
            min={0}
            value={score}
            onChange={(event) => setScore(event.target.value)}
            placeholder={basis === "jee" ? "18000" : "92"}
          />
        </Field>

        <Field id="sch-programme" label="Programme">
          <Select
            id="sch-programme"
            value={programmeSlug}
            onChange={(event) => setProgrammeSlug(event.target.value)}
          >
            {programs
              .filter((p) => p.annualFeeInr !== null)
              .map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.shortName}
                </option>
              ))}
          </Select>
        </Field>
      </div>

      {/* Result — aria-live so screen readers hear the update. */}
      <div
        className="mt-4 rounded-sm border border-stone-200 bg-stone-50 p-4"
        aria-live="polite"
      >
        {!valid && (
          <p className="text-xs text-stone-500">
            Enter your {basis === "jee" ? "rank" : "score"} to see an indicative concession.
          </p>
        )}

        {valid && !matched && (
          <p className="text-xs text-stone-600">
            No listed slab matches that score for this basis. Merit concessions below the
            published cut-offs are decided case by case by the admissions committee.
          </p>
        )}

        {valid && matched && annualFee !== null && (
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="success">{matched.percent}% concession</Badge>
              <span className="text-[11px] text-stone-600">{matched.label}</span>
            </div>
            <dl className="grid gap-2 text-xs sm:grid-cols-3">
              <div>
                <dt className="text-stone-500">Annual tuition</dt>
                <dd className="font-bold text-navy">{formatInr(annualFee)}</dd>
              </div>
              <div>
                <dt className="text-stone-500">Indicative concession</dt>
                <dd className="font-bold text-emerald-700">− {formatInr(concession)}</dd>
              </div>
              <div>
                <dt className="text-stone-500">Indicative payable</dt>
                <dd className="font-bold text-navy">{formatInr(payable!)}</dd>
              </div>
            </dl>
          </div>
        )}
      </div>

      <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-relaxed text-stone-500">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        Indicative only. Scholarship slabs, eligibility conditions and continuation rules are
        confirmed by the admissions office in writing; they are not an offer of admission.
      </p>

      <Link
        href="/contact"
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-crimson hover:underline"
      >
        Confirm your eligibility with admissions
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </div>
  );
}
