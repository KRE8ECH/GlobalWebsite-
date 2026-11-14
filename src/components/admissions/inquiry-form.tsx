"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Phone,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { MultiStepInquirySchema, type MultiStepInquiryInput } from "@/lib/validations";
import { submitInquiryAction } from "@/actions/submit-inquiry";
import { programs, site } from "@/data/site";

const STATES = [
  "Haryana",
  "Delhi",
  "Uttar Pradesh",
  "Rajasthan",
  "Punjab",
  "Bihar",
  "Madhya Pradesh",
  "Uttarakhand",
  "Himachal Pradesh",
  "Jharkhand",
  "West Bengal",
  "Chandigarh",
  "Other state / UT",
  "Outside India",
];

const QUALIFICATIONS = [
  "12th Standard (PCM)",
  "12th Standard (PCB)",
  "12th Standard (Commerce / Arts)",
  "Polytechnic Diploma",
  "D.Pharm",
  "Graduation (B.Tech / BCA / B.Sc.)",
  "Graduation (BBA / B.Com / BA)",
  "Post-graduation",
];

export function InquiryForm({
  initialProgramme,
  compact = false,
  idPrefix = "inq",
}: {
  initialProgramme?: string;
  compact?: boolean;
  idPrefix?: string;
}) {
  const [step, setStep] = React.useState<1 | 2>(1);
  const [pending, setPending] = React.useState(false);
  const [reference, setReference] = React.useState<string | null>(null);
  const [channel, setChannel] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    setError,
  } = useForm<MultiStepInquiryInput>({
    // Always validate the complete schema. Step one is advanced manually via
    // `trigger([...])`, so a half-filled form never reaches the server.
    resolver: zodResolver(MultiStepInquirySchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      state: "Haryana",
      highestQualification: QUALIFICATIONS[0],
      courseInterested: initialProgramme ?? programs[0].name,
      message: "",
      honeypot: "",
      consent: true,
    },
  });

  const next = async () => {
    const ok = await trigger(["fullName", "email", "phone"]);
    if (ok) setStep(2);
  };

  const onSubmit = async (data: MultiStepInquiryInput) => {
    setPending(true);
    try {
      const result = await submitInquiryAction(data);

      if (!result.success) {
        if (result.fieldErrors) {
          for (const [field, message] of Object.entries(result.fieldErrors)) {
            setError(field as keyof MultiStepInquiryInput, { message });
          }
          // A step-one error means the user must go back.
          if (result.fieldErrors.fullName || result.fieldErrors.email || result.fieldErrors.phone) {
            setStep(1);
          }
        }
        toast.error(result.error ?? "Could not submit your inquiry.");
        return;
      }

      setReference(result.reference ?? "RECEIVED");
      setChannel(result.channel ?? null);
      toast.success("Inquiry received", { description: result.message });
    } catch {
      toast.error("Something went wrong. Please call the admissions helpline.");
    } finally {
      setPending(false);
    }
  };

  /* ── Success state ─────────────────────────────────────────────────── */
  if (reference) {
    return (
      <div className="p-6 sm:p-8" role="status" aria-live="polite">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="mt-4 font-editorial text-xl font-bold text-navy">
          Thank you — your inquiry is logged
        </h3>
        <p className="mt-1 text-sm text-stone-600">
          Your reference is{" "}
          <strong className="font-mono text-navy">{reference}</strong>. An admissions counsellor
          will contact you within one working day.
        </p>

        {channel === "log" && (
          <p className="mt-3 rounded-sm border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900">
            Our online intake is temporarily unavailable. Please also call{" "}
            <a href={site.phones.admissions.tel} className="font-bold underline">
              {site.phones.admissions.value}
            </a>{" "}
            so nothing is delayed.
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <Button
            variant="primary"
            onClick={() => window.open(site.applyUrl, "_blank", "noopener")}
          >
            Continue to the application form
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <a
            href={site.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-sm border border-emerald-600 px-4 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp us
          </a>
        </div>
      </div>
    );
  }

  const fieldId = (name: string) => `${idPrefix}-${name}`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-5 sm:p-6">
      {/* Progress */}
      <ol className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-wide">
        <li className={step === 1 ? "text-crimson" : "text-emerald-700"}>
          1 · Your details
        </li>
        <li
          aria-hidden="true"
          className={`h-px flex-1 ${step === 2 ? "bg-crimson" : "bg-stone-200"}`}
        />
        <li className={step === 2 ? "text-crimson" : "text-stone-400"}>2 · Your interest</li>
      </ol>

      {/* Honeypot — visually hidden, never announced, not reachable by keyboard. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor={fieldId("website")}>Website</label>
        <input
          id={fieldId("website")}
          {...register("honeypot")}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {step === 1 ? (
        <div className="space-y-4">
          <Field
            id={fieldId("fullName")}
            label="Full name"
            required
            error={errors.fullName?.message}
          >
            <Input
              id={fieldId("fullName")}
              autoComplete="name"
              placeholder="e.g. Ananya Sharma"
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? `${fieldId("fullName")}-error` : undefined}
              {...register("fullName")}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              id={fieldId("email")}
              label="Email address"
              required
              error={errors.email?.message}
            >
              <Input
                id={fieldId("email")}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
                {...register("email")}
              />
            </Field>

            <Field
              id={fieldId("phone")}
              label="Mobile number"
              required
              hint="10-digit Indian mobile"
              error={errors.phone?.message}
            >
              <Input
                id={fieldId("phone")}
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="98123 45678"
                aria-invalid={Boolean(errors.phone)}
                {...register("phone")}
              />
            </Field>
          </div>

          <Button type="button" variant="primary" size="lg" className="w-full" onClick={next}>
            Continue
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              id={fieldId("courseInterested")}
              label="Programme of interest"
              required
              error={errors.courseInterested?.message}
            >
              <Select
                id={fieldId("courseInterested")}
                aria-invalid={Boolean(errors.courseInterested)}
                {...register("courseInterested")}
              >
                {programs.map((programme) => (
                  <option key={programme.slug} value={programme.name}>
                    {programme.name}
                  </option>
                ))}
                <option value="Not sure — please advise">Not sure — please advise</option>
              </Select>
            </Field>

            <Field
              id={fieldId("highestQualification")}
              label="Highest qualification"
              required
              error={errors.highestQualification?.message}
            >
              <Select
                id={fieldId("highestQualification")}
                aria-invalid={Boolean(errors.highestQualification)}
                {...register("highestQualification")}
              >
                {QUALIFICATIONS.map((qualification) => (
                  <option key={qualification} value={qualification}>
                    {qualification}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          <Field id={fieldId("state")} label="State / UT" required error={errors.state?.message}>
            <Select
              id={fieldId("state")}
              aria-invalid={Boolean(errors.state)}
              {...register("state")}
            >
              {STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </Select>
          </Field>

          {!compact && (
            <Field
              id={fieldId("message")}
              label="Anything we should know? (optional)"
              error={errors.message?.message}
              hint="JEE Main rank, 12th percentage, hostel or transport requirement…"
            >
              <Textarea
                id={fieldId("message")}
                maxLength={500}
                aria-invalid={Boolean(errors.message)}
                {...register("message")}
              />
            </Field>
          )}

          {/* Consent — required for lawful processing under India's DPDP Act. */}
          <div>
            <label className="flex items-start gap-2.5 text-[11px] leading-relaxed text-stone-600">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border-stone-300 text-crimson focus:ring-crimson"
                aria-invalid={Boolean(errors.consent)}
                {...register("consent")}
              />
              <span>
                I agree to be contacted by GITM about admissions, and I have read the{" "}
                <Link href="/policies/privacy" className="font-semibold text-navy underline">
                  privacy notice
                </Link>
                .
              </span>
            </label>
            {errors.consent && (
              <p role="alert" className="mt-1 text-[11px] font-medium text-red-700">
                {errors.consent.message}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" size="lg" onClick={() => setStep(1)}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </Button>
            <Button type="submit" variant="primary" size="lg" className="flex-1" disabled={pending}>
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Submitting…
                </>
              ) : (
                <>
                  Submit inquiry
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      <p className="mt-4 flex items-start gap-1.5 border-t border-stone-100 pt-3 text-[11px] text-stone-500">
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
        <span>
          Your details are used only to respond to this inquiry. Prefer to talk?{" "}
          <a
            href={site.phones.admissions.tel}
            className="inline-flex items-center gap-1 font-semibold text-navy underline"
          >
            <Phone className="h-3 w-3" aria-hidden="true" />
            {site.phones.admissions.value}
          </a>
        </span>
      </p>
    </form>
  );
}
