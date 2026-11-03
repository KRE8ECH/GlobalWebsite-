"use client";

import * as React from "react";
import { useActionState } from "react";
import { submitInquiry, type InquiryFormState } from "@/app/actions/inquiry";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { CheckCircle2, AlertCircle, Send, Loader2 } from "lucide-react";

const initialState: InquiryFormState = {};

interface InquiryFormProps {
  courses?: { slug: string; name: string }[];
}

export function InquiryForm({ courses }: InquiryFormProps) {
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);

  const defaultCourses = [
    { slug: "btech-cse", name: "B.Tech Computer Science & Engineering" },
    { slug: "btech-ai-ds", name: "B.Tech Artificial Intelligence & Data Science" },
    { slug: "mba", name: "Master of Business Administration (MBA)" },
    { slug: "bca", name: "Bachelor of Computer Applications (BCA)" },
    { slug: "b-pharm", name: "Bachelor of Pharmacy (B.Pharm)" },
  ];

  const courseList = courses && courses.length > 0 ? courses : defaultCourses;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold tracking-tight text-foreground">
          Admissions Inquiry 2026-27
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill out this form to connect directly with our academic advisory team and receive course brochures.
        </p>
      </div>

      {state.success && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Inquiry Submitted</p>
            <p className="mt-0.5 text-xs">{state.message}</p>
          </div>
        </div>
      )}

      {state.error && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Submission Error</p>
            <p className="mt-0.5 text-xs">{state.error}</p>
          </div>
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="fullName" className="text-xs font-medium text-foreground">
              Full Name <span className="text-destructive">*</span>
            </label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              required
              placeholder="e.g. Vikramaditya Rao"
              disabled={isPending}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-medium text-foreground">
              Email Address <span className="text-destructive">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="name@example.com"
              disabled={isPending}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-xs font-medium text-foreground">
              Phone Number <span className="text-destructive">*</span>
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="+91 9876543210"
              disabled={isPending}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="state" className="text-xs font-medium text-foreground">
              State / UT <span className="text-destructive">*</span>
            </label>
            <Input
              id="state"
              name="state"
              type="text"
              required
              placeholder="e.g. Haryana, Delhi, UP"
              disabled={isPending}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="courseInterested" className="text-xs font-medium text-foreground">
            Course of Interest <span className="text-destructive">*</span>
          </label>
          <select
            id="courseInterested"
            name="courseInterested"
            required
            disabled={isPending}
            defaultValue=""
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="" disabled className="bg-card text-muted-foreground">
              Select program
            </option>
            {courseList.map((c) => (
              <option key={c.slug} value={c.name} className="bg-card text-foreground">
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="message" className="text-xs font-medium text-foreground">
            Questions / Message (Optional)
          </label>
          <Textarea
            id="message"
            name="message"
            rows={3}
            placeholder="Tell us about your entrance exam score, branch preferences, or hostel requirements..."
            disabled={isPending}
          />
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Submitting Application...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Submit Admission Inquiry
            </>
          )}
        </Button>

        <p className="text-[11px] text-center text-muted-foreground">
          By submitting, you agree to receive official academic communications and admission guidance from GITM Gurgaon.
        </p>
      </form>
    </div>
  );
}

