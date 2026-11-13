import { z } from "zod";

/* -------------------------------------------------------------------------- */
/* Enums — kept in sync with prisma/schema.prisma                             */
/* -------------------------------------------------------------------------- */

export const NoticeCategoryEnum = z.enum([
  "EXAM",
  "ADMISSION",
  "ACADEMIC",
  "HOLIDAY",
  "GENERAL",
]);

export const NoticeSourceEnum = z.enum(["GITM", "GURUGRAM_UNIVERSITY"]);

export const DepartmentEnum = z.enum([
  "ENGINEERING",
  "MANAGEMENT",
  "PHARMACY",
  "COMPUTER_APPLICATIONS",
]);

export const ProgramLevelEnum = z.enum(["UG", "PG", "DIPLOMA", "LEET"]);

export const InquiryStatusEnum = z.enum(["PENDING", "CONTACTED", "CLOSED"]);

/* -------------------------------------------------------------------------- */
/* Content schemas                                                            */
/* -------------------------------------------------------------------------- */

export const NoticeSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(5, "Title must be at least 5 characters"),
  category: NoticeCategoryEnum,
  source: NoticeSourceEnum.default("GITM"),
  publishDate: z.coerce.date().default(() => new Date()),
  pdfUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  sourceUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  isPinned: z.boolean().default(false),
});

export const ProgramSchema = z.object({
  id: z.string().optional(),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/, "Slug may contain only lowercase letters, numbers and hyphens"),
  name: z.string().min(3, "Programme name must be at least 3 characters"),
  department: DepartmentEnum,
  level: ProgramLevelEnum,
  durationYears: z.number().int().positive("Duration must be a positive integer"),
  eligibility: z.string().min(5, "Eligibility details are required"),
  intake: z.number().int().positive("Intake must be a positive integer"),
  syllabusPdfUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export const EventSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  date: z.coerce.date(),
  location: z.string().min(2, "Location is required"),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  tags: z.string().default(""),
});

export const PlacementHighlightSchema = z.object({
  id: z.string().optional(),
  studentName: z.string().min(2, "Student name is required"),
  company: z.string().min(2, "Company name is required"),
  packageLPA: z.number().positive("Package in LPA must be greater than 0"),
  designation: z.string().min(2, "Designation is required"),
  year: z.number().int().min(2000).max(2100),
  branch: z.string().min(2, "Branch or department is required"),
  photoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

/* -------------------------------------------------------------------------- */
/* Admission inquiry — the only user-submitted form on the site                */
/* -------------------------------------------------------------------------- */

/**
 * Indian mobile numbers only: optional +91 / 0 prefix, then 10 digits
 * starting 6-9. Rejects the junk the previous loose regex accepted.
 */
const INDIAN_MOBILE = /^(?:\+?91[\-\s]?|0)?[6-9]\d{9}$/;

export const StepOneSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "Name cannot exceed 80 characters")
    .regex(/^[a-zA-Z\s.'-]+$/, "Name may contain only letters, spaces, apostrophes and hyphens"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(INDIAN_MOBILE, "Please enter a valid 10-digit Indian mobile number"),
  /** Honeypot — must stay empty. Real users never see this field. */
  honeypot: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export const StepTwoSchema = z.object({
  state: z.string().trim().min(2, "Please select your state"),
  highestQualification: z.string().trim().min(2, "Please select your highest qualification"),
  courseInterested: z.string().trim().min(2, "Please select the programme you are interested in"),
  message: z
    .string()
    .trim()
    .max(500, "Message cannot exceed 500 characters")
    .optional()
    .or(z.literal("")),
  /** Consent is required for lawful processing of the applicant's data. */
  consent: z.literal(true, {
    message: "Please accept the privacy notice to continue",
  }),
});

export const MultiStepInquirySchema = StepOneSchema.extend(StepTwoSchema.shape);

export type MultiStepInquiryInput = z.infer<typeof MultiStepInquirySchema>;
export type StepOneInput = z.infer<typeof StepOneSchema>;
export type StepTwoInput = z.infer<typeof StepTwoSchema>;
