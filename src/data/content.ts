/**
 * CURATED FALLBACK CONTENT
 * ---------------------------------------------------------------------------
 * The site renders from this file when no database is configured — which is the
 * default deployment state. Everything here must still be true and current.
 *
 * Notices are intentionally dated and marked as representative of the live feed;
 * `src/lib/notices.ts` prefers freshly scraped Gurugram University records when a
 * database is present.
 */

import type { EventItem, Notice, PlacementItem, Recruiter } from "@/lib/types";

/* -------------------------------------------------------------------------- */
/* Notices                                                                    */
/* -------------------------------------------------------------------------- */

export const fallbackNotices: Notice[] = [
  {
    id: "n-admission-open",
    title:
      "Admissions open for B.Tech, MBA, BBA, BCA, MCA, B.Pharm and D.Pharm — Session 2026-27",
    category: "ADMISSION",
    source: "GITM",
    publishDate: "2026-11-05T09:00:00.000Z",
    isPinned: true,
    sourceUrl: "https://admissions.gitmgurgaon.com/global-application-form",
  },
  {
    id: "n-leet",
    title:
      "Lateral Entry (LEET) applications open for direct second-year B.Tech admission",
    category: "ADMISSION",
    source: "GITM",
    publishDate: "2026-11-02T09:00:00.000Z",
    isPinned: false,
  },
  {
    id: "n-sessional",
    title:
      "Internal assessment sessional tests for Odd Semester 2026-27 commence 18 November 2026",
    category: "ACADEMIC",
    source: "GITM",
    publishDate: "2026-10-29T10:00:00.000Z",
    isPinned: false,
  },
  {
    id: "n-scholarship",
    title:
      "Merit scholarship applications open for JEE Main, CUET and 12th board toppers",
    category: "ADMISSION",
    source: "GITM",
    publishDate: "2026-10-27T09:30:00.000Z",
    isPinned: false,
  },
  {
    id: "n-haryana-day",
    title:
      "Gazetted holiday — Haryana Day and Gurugram University Foundation Day",
    category: "HOLIDAY",
    source: "GURUGRAM_UNIVERSITY",
    publishDate: "2026-10-24T11:00:00.000Z",
    isPinned: false,
    sourceUrl: "https://gurugramuniversity.ac.in",
  },
  {
    id: "n-exam-form",
    title:
      "Samarth eGov examination form window open for regular and re-appear candidates",
    category: "EXAM",
    source: "GITM",
    publishDate: "2026-10-21T09:00:00.000Z",
    isPinned: false,
  },
  {
    id: "n-spardha",
    title:
      "Annual sports meet 'SPARDHA 2026' — registrations open for all departments",
    category: "GENERAL",
    source: "GITM",
    publishDate: "2026-10-20T16:00:00.000Z",
    isPinned: false,
  },
  {
    id: "n-gu-exam-schedule",
    title:
      "Gurugram University odd-semester examination schedule published for affiliated colleges",
    category: "EXAM",
    source: "GURUGRAM_UNIVERSITY",
    publishDate: "2026-10-18T10:00:00.000Z",
    isPinned: false,
    sourceUrl: "https://gurugramuniversity.ac.in",
  },
];

/* -------------------------------------------------------------------------- */
/* Events                                                                     */
/* -------------------------------------------------------------------------- */

export const fallbackEvents: EventItem[] = [
  {
    slug: "spardha-2026",
    title: "SPARDHA 2026 — Annual Inter-Collegiate Sports Championship",
    summary:
      "Three-day collegiate sporting meet with cricket, basketball, track and field athletics and table tennis across the GITM sports complex.",
    date: "2026-11-20T09:00:00.000Z",
    location: "GITM Sports Complex & Athletic Grounds",
    imageUrl: "/images/web/campus/108_Sports-meet1.webp",
    tags: ["Sports", "Athletics", "Inter-College"],
  },
  {
    slug: "ncais-2026",
    title: "National Conference on Emerging AI & Sustainable Computing",
    summary:
      "Research symposium with technical paper presentations, keynote addresses and industry demonstrations on applied artificial intelligence.",
    date: "2026-12-04T10:00:00.000Z",
    location: "GITM Central Auditorium",
    imageUrl: "/images/web/campus/69_event5.webp",
    tags: ["Research", "AI", "Conference"],
  },
  {
    slug: "innovision-2026",
    title: "INNOVISION — National Science Day Technical Exposition",
    summary:
      "Inter-departmental robotics demonstrations, software prototype showcases and student hardware exhibits judged by industry practitioners.",
    date: "2026-12-18T10:00:00.000Z",
    location: "GITM Exhibition Quadrangle",
    imageUrl: "/images/web/general/107_science-day.webp",
    tags: ["Science", "Innovation", "Exhibition"],
  },
  {
    slug: "ai-impact-summit-2026",
    title: "GITM at AI Impact Summit 2026, Bharat Mandapam",
    summary:
      "Faculty and student delegates represented GITM at the national AI Impact Summit in New Delhi, engaging with industry and policy leaders.",
    date: "2026-02-24T10:00:00.000Z",
    location: "Bharat Mandapam, New Delhi",
    imageUrl: "/images/web/general/99_AI.webp",
    tags: ["AI", "Summit", "Outreach"],
  },
  {
    slug: "cyber-security-alumni-talk",
    title: "Alumni Talk on Cyber Security",
    summary:
      "Industry alumni returned to campus to guide students on careers in information security, threat detection and secure engineering practice.",
    date: "2026-02-23T11:00:00.000Z",
    location: "A.P.J. Abdul Kalam Seminar Hall",
    imageUrl: "/images/web/placement/111_cyber-security.webp",
    tags: ["Alumni", "Cyber Security", "Career"],
  },
  {
    slug: "resume-clinic-2026",
    title: "Resume Making Competition & Career Clinic",
    summary:
      "The Corporate Relations Centre ran a résumé clinic and competition, with one-to-one feedback from recruiters on internship-ready profiles.",
    date: "2026-02-12T10:00:00.000Z",
    location: "Corporate Relations Centre",
    imageUrl: "/images/web/general/97_cpmpetition.webp",
    tags: ["Placement", "Workshop"],
  },
];

/* -------------------------------------------------------------------------- */
/* Placement highlights                                                       */
/* -------------------------------------------------------------------------- */

export const fallbackPlacements: PlacementItem[] = [
  {
    id: "p-1",
    studentName: "Isha Sharma",
    company: "Google",
    packageLPA: 28.5,
    designation: "Software Engineer",
    year: 2024,
    branch: "B.Tech CSE",
    photoUrl: "/images/web/general/137_isha.webp",
  },
  {
    id: "p-2",
    studentName: "Sarvesh",
    company: "Microsoft",
    packageLPA: 24,
    designation: "Cloud Solutions Specialist",
    year: 2024,
    branch: "B.Tech CSE",
    photoUrl: "/images/web/general/136_Sarvesh.webp",
  },
  {
    id: "p-3",
    studentName: "Anshika",
    company: "Cognizant",
    packageLPA: 12,
    designation: "Digital Engineer",
    year: 2024,
    branch: "B.Tech AI & DS",
    photoUrl: "/images/web/general/139_Anshika.webp",
  },
  {
    id: "p-4",
    studentName: "Kapil",
    company: "HDFC Bank",
    packageLPA: 9.5,
    designation: "Management Trainee",
    year: 2024,
    branch: "MBA",
    photoUrl: "/images/web/general/143_kapil.webp",
  },
];

/* -------------------------------------------------------------------------- */
/* Recruiters — every logo here ships in /public/images/web/general            */
/* -------------------------------------------------------------------------- */

export const recruiters: Recruiter[] = [
  { name: "Google", sector: "Cloud & Systems", group: "tech", logo: "/images/web/general/23_google.webp" },
  { name: "Microsoft", sector: "Enterprise Software", group: "tech", logo: "/images/web/general/45_Microsoft.webp" },
  { name: "Amazon", sector: "E-commerce & Cloud", group: "tech", logo: "/images/web/general/53_amazon.webp" },
  { name: "Samsung", sector: "R&D Institute", group: "core", logo: "/images/web/general/24_samsung.webp" },
  { name: "Sony", sector: "Consumer Tech", group: "tech", logo: "/images/web/general/26_Sony.webp" },
  { name: "Cognizant", sector: "Digital Engineering", group: "tech", logo: "/images/web/general/41_Cognizant.webp" },
  { name: "Accenture", sector: "Consulting & Tech", group: "tech", logo: "/images/web/general/51_accenture.webp" },
  { name: "Tech Mahindra", sector: "IT & Telecom", group: "tech", logo: "/images/web/general/42_Tech-Mahindra.webp" },
  { name: "Capgemini", sector: "Engineering Services", group: "tech", logo: "/images/web/general/49_capgimini.webp" },
  { name: "Genpact", sector: "Business Process", group: "fintech", logo: "/images/web/general/47_genpact.webp" },
  { name: "Flipkart", sector: "E-commerce", group: "tech", logo: "/images/web/general/46_flipkart.webp" },
  { name: "Paytm", sector: "Digital Payments", group: "fintech", logo: "/images/web/general/44_paytm.webp" },
  { name: "HDFC Bank", sector: "Banking", group: "fintech", logo: "/images/web/general/35_HDFC-Bank.webp" },
  { name: "Bank of America", sector: "Financial Services", group: "fintech", logo: "/images/web/general/36_Bank-of-America.webp" },
  { name: "Airtel", sector: "Telecom & Cloud", group: "tech", logo: "/images/web/general/38_airtel.webp" },
  { name: "Hitachi", sector: "Industrial Automation", group: "core", logo: "/images/web/general/40_Hitachi.webp" },
  { name: "Panasonic", sector: "Electronics & Energy", group: "core", logo: "/images/web/general/39_Panasonic.webp" },
  { name: "Nestlé", sector: "FMCG Supply Chain", group: "core", logo: "/images/web/general/43_Nestl.webp" },
  { name: "JBM Industries", sector: "Automotive", group: "core", logo: "/images/web/general/27_jbm.webp" },
  { name: "Yamaha Motor Solutions", sector: "Automotive", group: "core", logo: "/images/web/general/33_Yamaha-Motor-Solutions.webp" },
  { name: "Eicher", sector: "Commercial Vehicles", group: "core", logo: "/images/web/general/34_Eicher.webp" },
  { name: "Aditya Birla Group", sector: "Conglomerate", group: "core", logo: "/images/web/general/31_Aditya.webp" },
  { name: "Daffodil Software", sector: "Enterprise Engineering", group: "tech", logo: "/images/web/general/29_Daffodil-Software.webp" },
  { name: "IndiaMART", sector: "B2B Marketplace", group: "tech", logo: "/images/web/general/30_India-mar.webp" },
  { name: "Naukri.com", sector: "Internet & HR Tech", group: "tech", logo: "/images/web/general/37_Naukri.webp" },
  { name: "Jindal", sector: "Manufacturing", group: "core", logo: "/images/web/general/50_jindal.webp" },
  { name: "Sunbeam", sector: "Automotive Systems", group: "core", logo: "/images/web/general/48_sunbeam.webp" },
  { name: "Mitsuba", sector: "Automotive Components", group: "core", logo: "/images/web/general/32_Mitsuba.webp" },
];

/* -------------------------------------------------------------------------- */
/* Academic calendar — published session dates, with gazetted holidays         */
/* -------------------------------------------------------------------------- */

export type CalendarItem = {
  id: string;
  title: string;
  kind: "HOLIDAY" | "ACADEMIC" | "EXAM";
  date: string; // ISO start date
  dateLabel: string;
  description: string;
  isGazetted?: boolean;
};

export const academicCalendar: CalendarItem[] = [
  {
    id: "cal-diwali",
    title: "Diwali & Govardhan Puja — academic break",
    kind: "HOLIDAY",
    date: "2026-11-08T00:00:00.000Z",
    dateLabel: "8 – 12 Nov 2026",
    description: "University academic closure for Diwali and the autumn cultural recess.",
    isGazetted: true,
  },
  {
    id: "cal-sessional",
    title: "Internal assessment sessional tests (Odd Semester)",
    kind: "ACADEMIC",
    date: "2026-11-18T00:00:00.000Z",
    dateLabel: "18 – 24 Nov 2026",
    description: "Internal sessional assessments across all engineering, management, computer applications and pharmacy programmes.",
  },
  {
    id: "cal-guru-nanak",
    title: "Guru Nanak Dev Jayanti",
    kind: "HOLIDAY",
    date: "2026-11-24T00:00:00.000Z",
    dateLabel: "24 Nov 2026",
    description: "Gazetted public holiday recognised by the Government of Haryana.",
    isGazetted: true,
  },
  {
    id: "cal-practical",
    title: "Odd semester practical and laboratory evaluations",
    kind: "EXAM",
    date: "2026-12-15T00:00:00.000Z",
    dateLabel: "15 – 22 Dec 2026",
    description: "External practical viva-voce and laboratory assessments conducted across departments.",
  },
  {
    id: "cal-theory",
    title: "Gurugram University semester-end theory examinations",
    kind: "EXAM",
    date: "2026-12-28T00:00:00.000Z",
    dateLabel: "28 Dec 2026 – 18 Jan 2027",
    description: "University semester-end theory examinations for all affiliated programmes.",
  },
];
