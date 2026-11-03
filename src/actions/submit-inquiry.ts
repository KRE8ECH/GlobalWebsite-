"use server";

import prisma from "@/lib/prisma";
import { MultiStepInquirySchema, type MultiStepInquiryInput } from "@/lib/validations";

export async function submitInquiryAction(
  data: MultiStepInquiryInput
): Promise<{
  success: boolean;
  message?: string;
  error?: string;
  inquiryId?: string;
}> {
  try {
    // 1. Anti-spam Honeypot Protection
    if (data.honeypot && data.honeypot.trim().length > 0) {
      console.warn("🛡️ Honeypot triggered by automated bot. Silently dropped.");
      return {
        success: true,
        message: "Thank you! Your admission inquiry has been logged.",
        inquiryId: "BOT_TRAPPED",
      };
    }

    // 2. Validate input schema
    const validation = MultiStepInquirySchema.safeParse(data);
    if (!validation.success) {
      const firstError = validation.error.issues[0]?.message || "Validation failed";
      return {
        success: false,
        error: firstError,
      };
    }

    const { fullName, email, phone, state, highestQualification, courseInterested, message } =
      validation.data;

    // Normalize phone number to standard 10 digits
    const cleanedPhone = phone.replace(/[^\d]/g, "").slice(-10);

    // Combine qualification notes into message payload for counselor review
    const enrichedMessage = `[Qualification: ${highestQualification}]${
      message ? ` ${message}` : ""
    }`.trim();

    // 3. Persist inquiry into Prisma database
    const inquiry = await prisma.inquiry.create({
      data: {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: cleanedPhone,
        courseInterested: courseInterested.trim(),
        state: state.trim(),
        message: enrichedMessage,
        status: "PENDING",
      },
    });

    const refNumber = inquiry.id.slice(-6).toUpperCase();

    return {
      success: true,
      inquiryId: inquiry.id,
      message: `Thank you, ${inquiry.fullName}! Your admission inquiry (Ref: #${refNumber}) has been submitted. A GITM admission counselor will reach out within 24 hours.`,
    };
  } catch (err: unknown) {
    console.error("Error submitting admission inquiry:", err);
    return {
      success: false,
      error: "Unable to submit inquiry at this moment. Please check your details or call our helpline (+91-9555 100 100).",
    };
  }
}
