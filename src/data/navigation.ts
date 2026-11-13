import type { NavGroup } from "@/lib/types";

/**
 * Single source of truth for navigation. The desktop header, mobile drawer,
 * command palette and footer all read from here — no duplicated link lists.
 */
export const primaryNav: NavGroup[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    children: [
      { label: "About GITM", href: "/about", description: "Legacy, vision, governance and infrastructure" },
      { label: "Leadership", href: "/about/leadership", description: "Founder and Chairman messages" },
      { label: "Campus & Facilities", href: "/campus-life", description: "Labs, library, hostels and transport" },
      { label: "Approvals & Affiliation", href: "/about/approvals", description: "AICTE, DTE, PCI and Gurugram University" },
    ],
  },
  {
    label: "Programmes",
    href: "/programmes",
    children: [
      { label: "All Programmes", href: "/programmes" },
      { label: "B.Tech", href: "/programmes?department=Engineering" },
      { label: "MBA & BBA", href: "/programmes?department=Management" },
      { label: "BCA & MCA", href: "/programmes?department=Computer%20Applications" },
      { label: "B.Pharm & D.Pharm", href: "/programmes?department=Pharmacy" },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    badge: "Open",
    children: [
      { label: "Admissions 2026-27", href: "/admissions", badge: "Open" },
      { label: "Fees & Scholarships", href: "/admissions/fees" },
      { label: "Scholarship Estimator", href: "/admissions/scholarships" },
      { label: "How to Apply", href: "/admissions#apply" },
    ],
  },
  {
    label: "Placements",
    href: "/placements",
    children: [
      { label: "Placement Record", href: "/placements" },
      { label: "Recruiters", href: "/placements#recruiters" },
      { label: "Training & CRC", href: "/placements#training" },
    ],
  },
  {
    label: "Campus Life",
    children: [
      { label: "Campus & Tour", href: "/campus-life", badge: "Video" },
      { label: "Events & Notices", href: "/events" },
      { label: "Facilities", href: "/campus-life#facilities" },
      { label: "Hostel", href: "/campus-life#hostel" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

/** External portals, verified from the institute's own site. */
export const portals = [
  {
    title: "Student ERP",
    description: "Attendance, marks, examination forms and fee receipts",
    href: "https://erp.gitmgurgaon.com/student",
  },
  {
    title: "Staff ERP",
    description: "Faculty management, lesson plans and LMS",
    href: "https://erp.gitmgurgaon.com/staff",
  },
  {
    title: "Online Application",
    description: "Official GITM admission application form",
    href: "https://admissions.gitmgurgaon.com/global-application-form",
  },
];

export const footerNav = [
  {
    heading: "About",
    links: [
      { label: "About GITM", href: "/about" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Approvals & Affiliation", href: "/about/approvals" },
      { label: "Campus & Facilities", href: "/campus-life" },
    ],
  },
  {
    heading: "Academics",
    links: [
      { label: "All Programmes", href: "/programmes" },
      { label: "B.Tech", href: "/programmes?department=Engineering" },
      { label: "Management", href: "/programmes?department=Management" },
      { label: "Pharmacy", href: "/programmes?department=Pharmacy" },
    ],
  },
  {
    heading: "Admissions",
    links: [
      { label: "Admissions 2026-27", href: "/admissions" },
      { label: "Fees & Scholarships", href: "/admissions/fees" },
      { label: "Scholarship Estimator", href: "/admissions/scholarships" },
      { label: "Apply Online", href: "https://admissions.gitmgurgaon.com/global-application-form" },
    ],
  },
  {
    heading: "Campus",
    links: [
      { label: "Placements", href: "/placements" },
      { label: "Events", href: "/events" },
      { label: "Contact", href: "/contact" },
      { label: "Notifications", href: "/events#notices" },
    ],
  },
];
