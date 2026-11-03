"use server";

import prisma from "@/lib/prisma";
import { InquirySchema } from "@/lib/validations";

export type InquiryFormState = {
  success?: boolean;
  message?: string;
  error?: string;
};

export async function submitInquiry(
  _prevState: InquiryFormState,
  formData: FormData
): Promise<InquiryFormState> {
  try {
    const rawData = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      courseInterested: formData.get("courseInterested") as string,
      state: formData.get("state") as string,
      message: (formData.get("message") as string) || undefined,
    };

    const parsed = InquirySchema.safeParse(rawData);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || "Validation failed",
      };
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        courseInterested: parsed.data.courseInterested,
        state: parsed.data.state,
        message: parsed.data.message,
      },
    });

    return {
      success: true,
      message: `Thank you, ${inquiry.fullName}! Your admission inquiry has been logged successfully (Ref: #${inquiry.id.slice(-6).toUpperCase()}). A GITM counselor will connect with you soon.`,
    };
  } catch (err) {
    console.error("Failed to submit inquiry:", err);
    return {
      success: false,
      error: "Failed to submit inquiry. Please verify the information and try again.",
    };
  }
}

