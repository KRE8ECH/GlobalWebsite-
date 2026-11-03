import { z } from "zod";

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

export const ProgramLevelEnum = z.enum(["UG", "PG", "DIPLOMA"]);

export const InquiryStatusEnum = z.enum(["PENDING", "CONTACTED"]);

// Notice validation schema
export const NoticeSchema = z.object({
  id: z.string().cuid().optional(),
  title: z.string().min(5, "Title must be at least 5 characters"),
  category: NoticeCategoryEnum,
  source: NoticeSourceEnum.default("GITM"),
  publishDate: z.coerce.date().default(() => new Date()),
  pdfUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  sourceUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  isPinned: z.boolean().default(false),
});

export type NoticeInput = z.infer<typeof NoticeSchema>;

// Program validation schema
export const ProgramSchema = z.object({
  id: z.string().cuid().optional(),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase alphanumeric characters and hyphens"),
  name: z.string().min(3, "Program name must be at least 3 characters"),
  department: DepartmentEnum,
  level: ProgramLevelEnum,
  durationYears: z.number().int().positive("Duration must be a positive integer"),
  eligibility: z.string().min(5, "Eligibility details are required"),
  intake: z.number().int().positive("Intake must be a positive integer"),
  syllabusPdfUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export type ProgramInput = z.infer<typeof ProgramSchema>;

// Event validation schema
export const EventSchema = z.object({
  id: z.string().cuid().optional(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  date: z.coerce.date(),
  location: z.string().min(2, "Location is required"),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  tags: z.string().default(""), // Stored as comma-separated or JSON
});

export type EventInput = z.infer<typeof EventSchema>;

// PlacementHighlight validation schema
export const PlacementHighlightSchema = z.object({
  id: z.string().cuid().optional(),
  studentName: z.string().min(2, "Student name is required"),
  company: z.string().min(2, "Company name is required"),
  packageLPA: z.number().positive("Package in LPA must be greater than 0"),
  designation: z.string().min(2, "Designation is required"),
  year: z.number().int().min(2000).max(2100),
  branch: z.string().min(2, "Branch/Department is required"),
  photoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type PlacementHighlightInput = z.infer<typeof PlacementHighlightSchema>;

// Inquiry validation schema
export const InquirySchema = z.object({
  id: z.string().cuid().optional(),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\-\s()]+$/, "Invalid phone number format"),
  courseInterested: z.string().min(2, "Please select or specify a course"),
  state: z.string().min(2, "State is required"),
  message: z.string().optional(),
  status: InquiryStatusEnum.default("PENDING"),
});

export type InquiryInput = z.infer<typeof InquirySchema>;

