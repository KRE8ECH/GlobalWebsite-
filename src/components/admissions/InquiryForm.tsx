"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  MapPin,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MultiStepInquirySchema,
  type MultiStepInquiryInput,
} from "@/lib/validations";
import { submitInquiryAction } from "@/actions/submit-inquiry";

interface InquiryFormProps {
  initialCourse?: string;
  onSuccess?: (refId: string) => void;
  className?: string;
}

const INDIAN_STATES = [
  "Haryana",
  "Delhi-NCR",
  "Uttar Pradesh",
  "Rajasthan",
  "Punjab",
  "Bihar",
  "Madhya Pradesh",
  "Uttarakhand",
  "Himachal Pradesh",
  "Jharkhand",
  "West Bengal",
  "Other State / UT",
];

const QUALIFICATIONS = [
  "12th Standard (PCM)",
  "12th Standard (PCB)",
  "12th Standard (Commerce / Arts)",
  "Polytechnic Diploma (Engineering)",
  "Diploma in Pharmacy (D.Pharm)",
  "Graduation (B.Tech / BCA / B.Sc)",
  "Graduation (BBA / B.Com / BA)",
  "Post Graduation",
];

const AVAILABLE_PROGRAMS = [
  "B.Tech in Computer Science & Engineering",
  "B.Tech in Artificial Intelligence & Data Science",
  "Bachelor of Computer Applications (BCA)",
  "Bachelor of Business Administration (BBA)",
  "Bachelor of Pharmacy (B.Pharm)",
  "Master of Business Administration (MBA)",
  "M.Tech in Computer Science & Engineering",
  "Master of Computer Applications (MCA)",
  "Diploma in Mechanical Engineering",
  "Diploma in Pharmacy (D.Pharm)",
];

export function InquiryForm({ initialCourse, onSuccess, className = "" }: InquiryFormProps) {
  const [step, setStep] = React.useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submittedRef, setSubmittedRef] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<MultiStepInquiryInput>({
    resolver: zodResolver(MultiStepInquirySchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      state: "Haryana",
      highestQualification: "12th Standard (PCM)",
      courseInterested: initialCourse || "B.Tech in Computer Science & Engineering",
      message: "",
      honeypot: "",
    },
  });

  // Advance from Step 1 to Step 2 with validation
  const handleNextStep = async () => {
    const isValid = await trigger(["fullName", "email", "phone"]);
    if (isValid) {
      setStep(2);
    } else {
      toast.error("Please provide valid personal contact details before proceeding.");
    }
  };

  // Form submission handler
  const onSubmit = async (data: MultiStepInquiryInput) => {
    setIsSubmitting(true);
    try {
      const response = await submitInquiryAction(data);

      if (response.success) {
        const refId = response.inquiryId ? response.inquiryId.slice(-6).toUpperCase() : "VERIFIED";
        setSubmittedRef(refId);
        toast.success("Application Submitted!", {
          description: `Reference #${refId}. Counselor assigned.`,
        });
        if (onSuccess) onSuccess(refId);
      } else {
        toast.error("Submission Issue", {
          description: response.error || "Please verify your information and retry.",
        });
      }
    } catch {
      toast.error("Network Error", {
        description: "Failed to connect to server. Please try again or call our helpline.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm ${className}`}
      aria-label="GITM Gurgaon Admission Inquiry Form"
    >
      {/* 1. Header & Step Indicator */}
      {!submittedRef ? (
        <>
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                <Sparkles className="h-3 w-3" />
                <span>Admissions 2026-27</span>
              </span>

              <span className="text-xs font-bold text-muted-foreground">
                Step {step} of 2
              </span>
            </div>

            <h3 className="text-xl font-bold tracking-tight text-foreground mt-2">
              {step === 1 ? "Step 1: Contact Details" : "Step 2: Academic Interests"}
            </h3>

            <p className="text-xs text-muted-foreground mt-1">
              {step === 1
                ? "Provide your contact information so our counselor can reach you."
                : "Select your preferred program and previous educational qualification."}
            </p>

            {/* Visual Step Progress Bar */}
            <div className="w-full bg-muted rounded-full h-1.5 mt-3 overflow-hidden">
              <div
                className="bg-primary h-1.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: step === 1 ? "50%" : "100%" }}
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {/* Hidden Honeypot Anti-Spam Field */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden opacity-0 absolute -z-10 h-0 w-0"
              aria-hidden="true"
              {...register("honeypot")}
            />

            {/* STEP 1: PERSONAL DETAILS */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in-50 duration-200">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="inquiry-fullName" className="text-xs font-bold text-foreground flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-primary" />
                    <span>Candidate&apos;s Full Name</span>
                    <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="inquiry-fullName"
                    type="text"
                    placeholder="e.g. Ananya Sen"
                    disabled={isSubmitting}
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? "fullName-error" : undefined}
                    {...register("fullName")}
                  />
                  {errors.fullName && (
                    <p id="fullName-error" className="text-[11px] text-destructive flex items-center gap-1 font-medium">
                      <ShieldAlert className="h-3 w-3" />
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="inquiry-email" className="text-xs font-bold text-foreground flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5 text-primary" />
                    <span>Email Address</span>
                    <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="inquiry-email"
                    type="email"
                    placeholder="ananya.sen@example.com"
                    disabled={isSubmitting}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-[11px] text-destructive flex items-center gap-1 font-medium">
                      <ShieldAlert className="h-3 w-3" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Indian Mobile Number */}
                <div className="space-y-1.5">
                  <label htmlFor="inquiry-phone" className="text-xs font-bold text-foreground flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5 text-primary" />
                    <span>Mobile Number (10 Digits)</span>
                    <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">
                      +91
                    </span>
                    <Input
                      id="inquiry-phone"
                      type="tel"
                      maxLength={10}
                      placeholder="9812345678"
                      className="pl-12"
                      disabled={isSubmitting}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      {...register("phone")}
                    />
                  </div>
                  {errors.phone && (
                    <p id="phone-error" className="text-[11px] text-destructive flex items-center gap-1 font-medium">
                      <ShieldAlert className="h-3 w-3" />
                      {errors.phone.message}
                    </p>
                  )}
                  <p className="text-[10px] text-muted-foreground">
                    OTP and counseling instructions will be sent via SMS / WhatsApp.
                  </p>
                </div>

                {/* Step 1 CTA */}
                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold mt-2"
                >
                  <span>Continue to Academic Interests</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </div>
            )}

            {/* STEP 2: ACADEMIC INTERESTS */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in-50 duration-200">
                {/* State Domicile */}
                <div className="space-y-1.5">
                  <label htmlFor="inquiry-state" className="text-xs font-bold text-foreground flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <span>Domicile State / UT</span>
                    <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="inquiry-state"
                    disabled={isSubmitting}
                    className="flex h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...register("state")}
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-[11px] text-destructive font-medium">{errors.state.message}</p>
                  )}
                </div>

                {/* Highest Qualification */}
                <div className="space-y-1.5">
                  <label htmlFor="inquiry-qual" className="text-xs font-bold text-foreground flex items-center gap-1">
                    <GraduationCap className="h-3.5 w-3.5 text-primary" />
                    <span>Highest Completed / Pursuing Qualification</span>
                    <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="inquiry-qual"
                    disabled={isSubmitting}
                    className="flex h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...register("highestQualification")}
                  >
                    {QUALIFICATIONS.map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                  {errors.highestQualification && (
                    <p className="text-[11px] text-destructive font-medium">
                      {errors.highestQualification.message}
                    </p>
                  )}
                </div>

                {/* Program Interested in */}
                <div className="space-y-1.5">
                  <label htmlFor="inquiry-course" className="text-xs font-bold text-foreground flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5 text-primary" />
                    <span>Degree Program Interested In</span>
                    <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="inquiry-course"
                    disabled={isSubmitting}
                    className="flex h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring font-medium"
                    {...register("courseInterested")}
                  >
                    {AVAILABLE_PROGRAMS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  {errors.courseInterested && (
                    <p className="text-[11px] text-destructive font-medium">
                      {errors.courseInterested.message}
                    </p>
                  )}
                </div>

                {/* Optional Message */}
                <div className="space-y-1.5">
                  <label htmlFor="inquiry-msg" className="text-xs font-medium text-muted-foreground">
                    Questions or Entrance Exam Percentile (Optional)
                  </label>
                  <Textarea
                    id="inquiry-msg"
                    rows={2}
                    placeholder="e.g. JEE Main score, hostel inquiry, bus route details..."
                    disabled={isSubmitting}
                    {...register("message")}
                  />
                </div>

                {/* Navigation Buttons for Step 2 */}
                <div className="flex items-center gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    disabled={isSubmitting}
                    className="w-1/3 border-border font-bold text-xs"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    <span>Back</span>
                  </Button>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-2/3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-1.5" />
                        <span>Complete Submission</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </>
      ) : (
        /* 2. SUCCESS SCREEN WITH CONFIRMATION REFERENCE */
        <div className="py-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 mx-auto">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-black text-foreground">
              Admission Inquiry Received!
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Your academic application has been recorded in the central GITM Gurgaon admissions portal.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-muted/60 p-4 max-w-xs mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
              Application Reference ID
            </span>
            <span className="text-2xl font-black text-primary font-mono tracking-wider block mt-0.5">
              #{submittedRef}
            </span>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSubmittedRef(null);
                setStep(1);
                reset();
              }}
              className="text-xs font-bold"
            >
              Submit Another Inquiry
            </Button>

            <Button asChild size="sm" className="bg-primary text-primary-foreground text-xs font-bold">
              <a href="https://gurugramuniversity.ac.in/Notice/academic-calendar-2026.pdf" target="_blank" rel="noopener noreferrer">
                Download Academic Calendar
              </a>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InquiryForm;
