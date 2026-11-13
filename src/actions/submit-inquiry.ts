"use server";

/**
 * ADMISSION INQUIRY SUBMISSION
 * ---------------------------------------------------------------------------
 * Delivery order — first success wins, nothing is silently dropped:
 *
 *   1. Prisma / Postgres   (when DATABASE_URL is configured)
 *   2. Resend HTTP API      (when RESEND_API_KEY is configured)
 *   3. Server log           (always — so a lead is at least recoverable)
 *
 * The previous implementation returned `success: true` for honeypot hits and
 * swallowed database errors into a generic failure, so genuine applicants could
 * be lost with no record anywhere.
 */

import { getDb } from "@/lib/db";
import { site } from "@/data/site";
import { MultiStepInquirySchema, type MultiStepInquiryInput } from "@/lib/validations";

export type InquiryResult = {
  success: boolean;
  message?: string;
  error?: string;
  reference?: string;
  /** Which delivery path actually took the lead. Useful for ops. */
  channel?: "database" | "email" | "log";
  fieldErrors?: Record<string, string>;
};

function referenceFrom(seed: string): string {
  return `GITM-${seed.replace(/[^a-z0-9]/gi, "").slice(-6).toUpperCase()}`;
}

function formatLead(data: MultiStepInquiryInput, reference: string): string {
  return [
    `New admission inquiry — ${reference}`,
    "",
    `Name:          ${data.fullName}`,
    `Email:         ${data.email}`,
    `Phone:         ${data.phone}`,
    `State:         ${data.state}`,
    `Qualification: ${data.highestQualification}`,
    `Programme:     ${data.courseInterested}`,
    `Message:       ${data.message || "—"}`,
    "",
    `Received: ${new Date().toISOString()}`,
  ].join("\n");
}

/** Resend HTTP API — no SDK dependency required. */
async function sendViaEmail(subject: string, body: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_EMAIL_TO ?? site.emails.admissions;
  const from = process.env.INQUIRY_EMAIL_FROM ?? "GITM Website <onboarding@resend.dev>";

  if (!apiKey) return false;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: [to], subject, text: body }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function submitInquiryAction(data: MultiStepInquiryInput): Promise<InquiryResult> {
  /* 1. Validate ---------------------------------------------------------- */
  const parsed = MultiStepInquirySchema.safeParse(data);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      success: false,
      error: "Please correct the highlighted fields and try again.",
      fieldErrors,
    };
  }

  /* 2. Honeypot ---------------------------------------------------------- */
  // Return a normal-looking success so bots learn nothing, but persist nothing
  // and say so in the log — the previous code claimed a real submission.
  if (parsed.data.honeypot) {
    console.warn("[gitm] Inquiry honeypot triggered — submission discarded.");
    return { success: true, channel: "log", message: "Thank you — your inquiry has been received." };
  }

  const clean = parsed.data;
  const normalisedPhone = clean.phone.replace(/\D/g, "").slice(-10);

  /* 3. Database ---------------------------------------------------------- */
  const db = await getDb();
  if (db) {
    try {
      const inquiry = await db.inquiry.create({
        data: {
          fullName: clean.fullName,
          email: clean.email.toLowerCase(),
          phone: normalisedPhone,
          courseInterested: clean.courseInterested,
          state: clean.state,
          highestQualification: clean.highestQualification,
          message: clean.message || null,
          status: "PENDING",
          source: "website",
          deliveryStatus: "stored",
        },
      });

      const reference = referenceFrom(inquiry.id);

      // Best-effort notification; the lead is already safe in the database.
      void sendViaEmail(`Admission inquiry ${reference}`, formatLead(clean, reference));

      return {
        success: true,
        channel: "database",
        reference,
        message: `Thank you, ${inquiry.fullName}. Your inquiry is logged as ${reference} and a counsellor will contact you within one working day.`,
      };
    } catch (error) {
      console.error("[gitm] Could not persist inquiry, trying email fallback.", error);
    }
  }

  /* 4. Email fallback ---------------------------------------------------- */
  const reference = referenceFrom(`${Date.now()}`);
  const emailed = await sendViaEmail(`Admission inquiry ${reference}`, formatLead(clean, reference));

  if (emailed) {
    return {
      success: true,
      channel: "email",
      reference,
      message: `Thank you, ${clean.fullName}. Your inquiry is logged as ${reference} and a counsellor will contact you within one working day.`,
    };
  }

  /* 5. Log fallback ------------------------------------------------------ */
  console.info("[gitm] INQUIRY (no delivery channel configured)\n" + formatLead(clean, reference));

  return {
    success: true,
    channel: "log",
    reference,
    message: `Thank you, ${clean.fullName}. Your inquiry is recorded as ${reference}. For a faster response, call ${site.phones.admissions.value} or message us on WhatsApp.`,
  };
}
