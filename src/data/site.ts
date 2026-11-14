/**
 * CANONICAL INSTITUTIONAL DATA — GITM Gurgaon
 * ---------------------------------------------------------------------------
 * Every figure in this file is traceable to a primary or published source.
 * Component authors MUST import from here instead of hard-coding numbers,
 * phone numbers, addresses or claims. That is how the site previously drifted
 * into publishing 20 acres (actual: 18), three different "highest package"
 * figures, and a domain (gitm.ac.in) the institute does not own.
 *
 * Sources:
 *  - gitmgurgaon.com/about-us/          → 18 acres, 3 lakh sq ft, 10 labs,
 *                                         500+ PCs, 20,000+ library volumes
 *  - gitmgurgaon.com/placements-highlights/ → year-wise placement tables
 *  - gitmgurgaon.com/ (footer)          → addresses, helplines, email
 *  - gitmgurgaon.com/about-us/founders-message/ + chairmans-message/
 *  - UGC / AICTE mandatory public disclosure requirements
 *
 * Last verified: 2026-11-13
 */

export const site = {
  name: "Global Institute of Technology & Management",
  shortName: "GITM",
  legalName: "Global Institute of Technology & Management",
  society: "Baljeet Singh Education Society",
  tagline: "Engineering, Management & Pharmacy in Delhi NCR",
  established: 2008,
  url: "https://gitmgurgaon.com",
  applyUrl: "https://admissions.gitmgurgaon.com/global-application-form",
  description:
    "GITM Gurugram is an AICTE-approved institute affiliated to Gurugram University, offering B.Tech, M.Tech, MBA, BBA, BCA, MCA, B.Pharm and D.Pharm programmes on an 18-acre campus in Farrukhnagar, Gurugram.",

  /** DTE Haryana institute code published on the institute's own letterhead. */
  dteCode: "074",

  approvals: [
    "Approved by AICTE, Ministry of Education, Government of India",
    "Directorate of Technical Education (DTE), Government of Haryana",
    "Affiliated to Gurugram University, Gurugram",
    "Pharmacy Council of India (PCI) — B.Pharm & D.Pharm",
  ],

  campus: {
    label: "Campus",
    lines: [
      "Global Institute of Technology & Management",
      "5 KM Milestone, Kheda Khurrampur",
      "Farrukhnagar – Haily Mandi Road",
      "Gurugram, Haryana – 122506",
    ],
    addressLocality: "Gurugram",
    addressRegion: "Haryana",
    postalCode: "122506",
    country: "IN",
    mapQuery: "Global Institute of Technology & Management Farrukhnagar Gurugram",
    email: "info@gitmgurgaon.com",
  },

  delhi: {
    label: "Delhi Office",
    lines: [
      "Ch. Birkhe Ram Complex, D-96, 1st Floor",
      "Munirka Village, Opp. Community Centre",
      "New Delhi – 110067",
    ],
  },

  /** Verified phone numbers from the institute's own contact block. */
  phones: {
    admissions: { label: "Admissions Helpline", value: "+91 95551 00100", tel: "+919555100100" },
    general: { label: "General Helpline", value: "+91 80539 80002", tel: "+918053980002" },
    generalAlt: { label: "General Helpline (alt)", value: "+91 80539 80003", tel: "+918053980003" },
    administration: { label: "Administration", value: "+91 89507 46762", tel: "+918950746762" },
    hostel: { label: "Hostel Warden", value: "+91 74048 41737", tel: "+917404841737" },
    delhiOffice: { label: "Delhi Office", value: "+91 88005 26886", tel: "+918800526886" },
  },

  emails: {
    general: "info@gitmgurgaon.com",
    admissions: "admission@gitmgurgaon.com",
    administration: "admin@gitmgurgaon.com",
    placements: "ccr@gitmgurgaon.com",
    hostel: "hostelwarden@gitmgurgaon.com",
  },

  whatsapp: {
    href: "https://wa.me/919555100100?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20admissions%20at%20GITM%20Gurugram.",
    label: "Chat with an admissions counsellor on WhatsApp",
  },

  hours: {
    counselling: "Mon – Sat, 9:00 AM – 5:00 PM IST",
    office: "Mon – Sat, 9:00 AM – 5:00 PM IST",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Verified campus facts — cited in copy, never re-typed in components         */
/* -------------------------------------------------------------------------- */

export const campusFacts = {
  acres: 18,
  builtUpSqFt: "3 lakh sq. ft.",
  computerLabs: 10,
  computers: "500+",
  libraryVolumes: "20,000+",
  internetLeasedLine: "20 Mbps",
  hostels: "Separate boys' and girls' hostels (A/C and Non-A/C)",
  internationalCollaborations: [
    "Henan Institute of Engineering, China",
    "Guangxi University of Science and Technology, China",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Placement data — taken from the institute's published year-wise tables      */
/* -------------------------------------------------------------------------- */

export const placementStats = {
  /** Engineering: highest package offered by year, in LPA. */
  engineeringHighestByYear: [
    { year: 2018, lpa: 6.5 },
    { year: 2019, lpa: 11.8 },
    { year: 2020, lpa: 17.5 },
    { year: 2021, lpa: 23.5 },
    { year: 2022, lpa: 25 },
    { year: 2023, lpa: 32 },
    { year: 2024, lpa: 47 },
  ],
  /** Engineering: students placed per year. */
  engineeringPlacedByYear: [
    { year: 2018, placed: 160 },
    { year: 2019, placed: 400 },
    { year: 2020, placed: 515 },
    { year: 2021, placed: 605 },
    { year: 2022, placed: 763 },
    { year: 2023, placed: 790 },
    { year: 2024, placed: 850 },
  ],
  /** Management: highest package offered by year, in LPA. */
  managementHighestByYear: [
    { year: 2018, lpa: 7.5 },
    { year: 2019, lpa: 8.9 },
    { year: 2020, lpa: 11.2 },
    { year: 2021, lpa: 14.5 },
    { year: 2022, lpa: 16.3 },
    { year: 2023, lpa: 19 },
    { year: 2024, lpa: 21.5 },
  ],
  /** Headline figures used in the hero and CTA. Must match the tables above. */
  headline: {
    highestLpa: 47,
    highestYear: 2024,
    studentsPlacedLatest: 850,
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Leadership — verified names and titles from the institute's own pages       */
/* -------------------------------------------------------------------------- */

export type Leader = {
  name: string;
  role: string;
  bio: string;
  image: string;
  /** Quotes are trimmed from the institute's published messages. */
  quote: string;
};

export const leadership: Leader[] = [
  {
    name: "Mr. Surjeet Singh",
    role: "Founder & Managing Trustee",
    bio: "Founder of the Baljeet Singh Education Society, which established GITM in 2008. Leads the institute's long-term academic and community mission across Delhi NCR.",
    image: "/images/official/general/general_12_founder.jpg",
    quote:
      "I welcome you on behalf of Global Institute of Technology & Management and thank you for showing your interest in us.",
  },
  {
    name: "Mr. Ravinder Tokas",
    role: "Chairman",
    bio: "Provides institutional governance and oversees academic direction, corporate relations and infrastructure development at the Farrukhnagar campus.",
    image: "/images/official/general/general_13_chairman.jpg",
    quote:
      "We believe in imparting quality technical and management education that prepares students for the demands of a changing industry.",
  },
];

/* -------------------------------------------------------------------------- */
/* Programmes — the complete catalogue published by the institute              */
/* -------------------------------------------------------------------------- */

export type ProgramLevel = "UG" | "PG" | "DIPLOMA" | "LEET";
export type Department =
  | "Engineering"
  | "Management"
  | "Computer Applications"
  | "Pharmacy";

export type Program = {
  slug: string;
  name: string;
  shortName: string;
  department: Department;
  level: ProgramLevel;
  durationYears: number;
  eligibility: string;
  intake: number | null;
  description: string;
  /** Fee per year in ₹, where the institute publishes one. Null = contact office. */
  annualFeeInr: number | null;
  highlights: string[];
};

export const programs: Program[] = [
  {
    slug: "b-tech-cse",
    name: "B.Tech in Computer Science & Engineering",
    shortName: "B.Tech CSE",
    department: "Engineering",
    level: "UG",
    durationYears: 4,
    eligibility: "10+2 with Physics & Mathematics plus one of Chemistry / Computer Science / Biology / Biotechnology, minimum 45% aggregate. JEE Main score considered.",
    intake: 180,
    description:
      "Core software engineering programme covering data structures and algorithms, operating systems, distributed computing, cloud systems, cybersecurity and software architecture, delivered under the Gurugram University NEP 2020 framework.",
    annualFeeInr: 95400,
    highlights: ["Industry 4.0 aligned curriculum", "Apple iOS and Big Data labs", "Placement training from semester 5"],
  },
  {
    slug: "b-tech-ai-ds",
    name: "B.Tech in Artificial Intelligence & Data Science",
    shortName: "B.Tech AI & DS",
    department: "Engineering",
    level: "UG",
    durationYears: 4,
    eligibility: "10+2 with Physics & Mathematics plus one of Chemistry / Computer Science / Biology / Biotechnology, minimum 45% aggregate. JEE Main score considered.",
    intake: 60,
    description:
      "Specialised degree in machine learning, deep neural architectures, computer vision, natural language processing and large-scale data engineering, with project work from the second year onward.",
    annualFeeInr: 106200,
    highlights: ["ML and computer-vision lab", "Capstone research project", "Faculty-mentored AI clinic"],
  },
  {
    slug: "b-tech-ai-ml",
    name: "B.Tech in Artificial Intelligence & Machine Learning",
    shortName: "B.Tech AI & ML",
    department: "Engineering",
    level: "UG",
    durationYears: 4,
    eligibility: "10+2 with Physics & Mathematics plus one of Chemistry / Computer Science / Biology / Biotechnology, minimum 45% aggregate. JEE Main score considered.",
    intake: 60,
    description:
      "Builds on the AI and Data Science core with deeper coverage of model engineering, reinforcement learning, MLOps and applied research, positioned for Industry 4.0 roles.",
    annualFeeInr: 106200,
    highlights: ["Highest-fee AI specialisation", "Research and publication support", "Industry internship pathway"],
  },
  {
    slug: "b-tech-ece",
    name: "B.Tech in Electronics & Communication Engineering",
    shortName: "B.Tech ECE",
    department: "Engineering",
    level: "UG",
    durationYears: 4,
    eligibility: "10+2 with Physics & Mathematics, minimum 45% aggregate. JEE Main score considered.",
    intake: 60,
    description:
      "Electronic devices and circuits, VLSI design, embedded systems, satellite and 5G wireless communication, and IoT telecommunication systems.",
    annualFeeInr: 95400,
    highlights: ["VLSI and embedded labs", "Robotics and automation centre", "Semiconductor industry exposure"],
  },
  {
    slug: "b-tech-me",
    name: "B.Tech in Mechanical Engineering",
    shortName: "B.Tech ME",
    department: "Engineering",
    level: "UG",
    durationYears: 4,
    eligibility: "10+2 with Physics, Mathematics & Chemistry, minimum 45% aggregate. JEE Main score considered.",
    intake: 60,
    description:
      "Thermodynamics, fluid mechanics, CAD/CAM automation, robotics, additive manufacturing and automotive systems with a strong workshop and simulation component.",
    annualFeeInr: 95400,
    highlights: ["Robotics and automation lab", "CAD/CAM software suite", "Automotive sector tie-ups"],
  },
  {
    slug: "b-tech-ce",
    name: "B.Tech in Civil Engineering",
    shortName: "B.Tech CE",
    department: "Engineering",
    level: "UG",
    durationYears: 4,
    eligibility: "10+2 with Physics, Mathematics & Chemistry, minimum 45% aggregate. JEE Main score considered.",
    intake: 60,
    description:
      "Structural analysis, surveying and geomatics, transportation engineering, construction management and environmental engineering with field and site training.",
    annualFeeInr: 95400,
    highlights: ["Surveying field camps", "Construction management electives", "Site visit programme"],
  },
  {
    slug: "b-tech-leet",
    name: "B.Tech (Lateral Entry) — Direct 2nd Year",
    shortName: "B.Tech LEET",
    department: "Engineering",
    level: "LEET",
    durationYears: 3,
    eligibility: "Diploma in the relevant branch from a recognised board, or B.Sc., with minimum 45% aggregate.",
    intake: null,
    description:
      "Direct second-year entry to B.Tech for diploma and B.Sc. holders in CSE, AI & DS, AI & ML, Mechanical, ECE and Civil branches.",
    annualFeeInr: null,
    highlights: ["Direct second-year entry", "Credit transfer for diploma study", "All six branches available"],
  },
  {
    slug: "m-tech-cse",
    name: "M.Tech in Computer Science & Engineering",
    shortName: "M.Tech CSE",
    department: "Engineering",
    level: "PG",
    durationYears: 2,
    eligibility: "B.Tech / B.E. in a relevant discipline with minimum 60% aggregate. GATE score preferred.",
    intake: null,
    description:
      "Postgraduate research degree in advanced algorithms, distributed systems, machine learning and dissertation-level applied work.",
    annualFeeInr: 60000,
    highlights: ["Dissertation supervision", "GRDC research cell access", "Publication support"],
  },
  {
    slug: "m-tech-ece",
    name: "M.Tech in Electronics & Communication Engineering",
    shortName: "M.Tech ECE",
    department: "Engineering",
    level: "PG",
    durationYears: 2,
    eligibility: "B.Tech / B.E. in ECE or a related discipline with minimum 60% aggregate. GATE score preferred.",
    intake: null,
    description:
      "Advanced signal processing, communication systems, VLSI architecture and embedded system design with a research dissertation.",
    annualFeeInr: 60000,
    highlights: ["Research dissertation", "VLSI design lab", "Industry-sponsored projects"],
  },
  {
    slug: "mba",
    name: "Master of Business Administration (MBA)",
    shortName: "MBA",
    department: "Management",
    level: "PG",
    durationYears: 2,
    eligibility: "Bachelor's degree in any discipline with minimum 50% aggregate. CAT / MAT / CMAT score considered.",
    intake: 120,
    description:
      "Postgraduate management programme with specialisations in Marketing, Finance, Human Resource Management and Business Analytics, supported by a Proactive Centre for Corporate Relations.",
    annualFeeInr: 90000,
    highlights: ["Four specialisations", "Live industry projects", "Corporate Relations Centre"],
  },
  {
    slug: "bba",
    name: "Bachelor of Business Administration (BBA)",
    shortName: "BBA",
    department: "Management",
    level: "UG",
    durationYears: 3,
    eligibility: "10+2 in any stream with minimum 45% aggregate.",
    intake: null,
    description:
      "Three-year undergraduate management degree covering business fundamentals, marketing, finance, operations and entrepreneurship, with internship credit.",
    annualFeeInr: 60000,
    highlights: ["Internship credit", "Entrepreneurship cell", "Case-study driven teaching"],
  },
  {
    slug: "bca",
    name: "Bachelor of Computer Applications (BCA)",
    shortName: "BCA",
    department: "Computer Applications",
    level: "UG",
    durationYears: 3,
    eligibility: "10+2 with Mathematics, minimum 45% aggregate.",
    intake: null,
    description:
      "Application development, databases, web and mobile engineering, and software testing, preparing graduates for developer and analyst roles.",
    annualFeeInr: 75000,
    highlights: ["Full-stack development track", "Coding club", "Portfolio-based assessment"],
  },
  {
    slug: "mca",
    name: "Master of Computer Applications (MCA)",
    shortName: "MCA",
    department: "Computer Applications",
    level: "PG",
    durationYears: 2,
    eligibility: "BCA, or B.Sc. in Computer Science / Mathematics / IT, with minimum 55% aggregate.",
    intake: null,
    description:
      "Postgraduate computing degree covering advanced software engineering, data management, cloud architecture and enterprise application development.",
    annualFeeInr: 70000,
    highlights: ["Enterprise project work", "Cloud and DevOps electives", "Placement preparation"],
  },
  {
    slug: "b-pharm",
    name: "Bachelor of Pharmacy (B.Pharm)",
    shortName: "B.Pharm",
    department: "Pharmacy",
    level: "UG",
    durationYears: 4,
    eligibility: "10+2 with Physics & Chemistry plus Biology or Mathematics, minimum 45% aggregate.",
    intake: 100,
    description:
      "PCI-approved pharmacy degree covering pharmaceutics, pharmacology, medicinal chemistry, pharmacognosy and pharmaceutical analysis, with laboratory and industrial training.",
    annualFeeInr: 105250,
    highlights: ["PCI approved", "Industrial pharmacy training", "Instrumentation and analysis labs"],
  },
  {
    slug: "d-pharm",
    name: "Diploma in Pharmacy (D.Pharm)",
    shortName: "D.Pharm",
    department: "Pharmacy",
    level: "DIPLOMA",
    durationYears: 2,
    eligibility: "10+2 with Physics & Chemistry plus Biology or Mathematics, minimum 45% aggregate.",
    intake: 60,
    description:
      "PCI-approved two-year diploma preparing registered pharmacists for hospital, community and retail pharmacy practice.",
    annualFeeInr: 80500,
    highlights: ["PCI approved", "Hospital pharmacy practice", "Registration pathway"],
  },
];

export const departmentOrder: Department[] = [
  "Engineering",
  "Management",
  "Computer Applications",
  "Pharmacy",
];

/* -------------------------------------------------------------------------- */
/* Social profiles — verified against the institute's own linked icons        */
/* -------------------------------------------------------------------------- */

export type Social = {
  name: string;
  handle: string;
  href: string;
  brand: "instagram" | "linkedin" | "facebook" | "x" | "youtube";
};

export const socials: Social[] = [
  { name: "Instagram", handle: "@gitm_gurgaon", href: "https://www.instagram.com/gitm_gurgaon/", brand: "instagram" },
  {
    name: "LinkedIn",
    handle: "GITM Gurugram",
    href: "https://www.linkedin.com/school/global-institute-of-technology-management-gurugram-gitm/",
    brand: "linkedin",
  },
  { name: "Facebook", handle: "GITM Gurgaon", href: "https://www.facebook.com/gitm.gurgaon.india/", brand: "facebook" },
  { name: "X", handle: "@gitmfarukhnagar", href: "https://x.com/gitmfarukhnagar", brand: "x" },
  { name: "YouTube", handle: "GITM Gurgaon", href: "https://www.youtube.com/@GITMGuraon", brand: "youtube" },
];

/* -------------------------------------------------------------------------- */
/* Statutory / compliance links — UGC mandates these be publicly findable     */
/* -------------------------------------------------------------------------- */

export type ComplianceLink = { label: string; href: string; note?: string };

export const complianceLinks: ComplianceLink[] = [
  { label: "Mandatory Disclosure", href: "/policies/mandatory-disclosure", note: "AICTE / UGC public disclosure" },
  { label: "Anti-Ragging Committee", href: "/policies/anti-ragging", note: "UGC Regulations 2009" },
  { label: "Internal Complaints Committee (ICC)", href: "/policies/icc", note: "POSH Act 2013" },
  { label: "Grievance Redressal", href: "/policies/grievance", note: "Online complaint register" },
  { label: "SC/ST & OBC Cell", href: "/policies/reservation-cell", note: "Equal opportunity cell" },
  { label: "Privacy Policy", href: "/policies/privacy" },
  { label: "Terms of Use", href: "/policies/terms" },
];

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

export const admissionsSeason = "2026-27";

export function programBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}

export function formatInr(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}
