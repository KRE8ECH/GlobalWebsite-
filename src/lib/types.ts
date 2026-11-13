/**
 * Shared UI domain types.
 * Static data (src/data/*) and optional database rows are both normalised into
 * these shapes, so components never care where the data came from.
 */

export type NoticeCategory =
  | "EXAM"
  | "ADMISSION"
  | "ACADEMIC"
  | "HOLIDAY"
  | "GENERAL";

export type NoticeSource = "GITM" | "GURUGRAM_UNIVERSITY";

export type Notice = {
  id: string;
  title: string;
  category: NoticeCategory;
  source: NoticeSource;
  publishDate: string; // ISO string — keeps server/client serialisation identical
  pdfUrl?: string | null;
  sourceUrl?: string | null;
  isPinned: boolean;
};

export type EventItem = {
  slug: string;
  title: string;
  summary: string;
  date: string; // ISO string
  location: string;
  imageUrl?: string | null;
  tags: string[];
};

export type PlacementItem = {
  id: string;
  studentName: string;
  company: string;
  packageLPA: number;
  designation: string;
  year: number;
  branch: string;
  photoUrl?: string | null;
};

export type Recruiter = {
  name: string;
  sector: string;
  group: "tech" | "fintech" | "core" | "pharma";
  logo?: string;
};

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  badge?: string;
};

export type NavGroup = {
  label: string;
  href?: string;
  badge?: string;
  children?: NavItem[];
};
