/**
 * STATUTORY & COMPLIANCE PAGES
 * ---------------------------------------------------------------------------
 * UGC and AICTE require institutes to publish certain disclosures where students
 * and parents can find them. This site previously had none of these pages, which
 * is a compliance gap as well as a credibility problem.
 *
 * IMPORTANT: the text below is a well-structured starting point, written to the
 * usual regulatory shape. Committee names, phone numbers and document links must
 * be completed by the institute before publication — each page says so plainly
 * where a fact is still required.
 */

export type PolicySection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  /** Rendered as a visible "to be completed by the institute" notice. */
  todo?: string;
};

export type Policy = {
  slug: string;
  title: string;
  summary: string;
  regulation?: string;
  updated: string;
  sections: PolicySection[];
};

export const policies: Policy[] = [
  {
    slug: "privacy",
    title: "Privacy Notice",
    summary:
      "What personal data this website collects, why, how long it is kept, and how to ask for it to be deleted.",
    regulation: "Digital Personal Data Protection Act, 2023",
    updated: "2026-11-13",
    sections: [
      {
        heading: "What we collect",
        paragraphs: [
          "When you submit an admission enquiry we collect your name, email address, mobile number, state, highest qualification, programme of interest and any message you write. That is the whole list — we do not ask for identity documents, date of birth or payment details through this website.",
        ],
        bullets: [
          "Enquiry forms: name, email, mobile, state, qualification, programme, message.",
          "Server logs: IP address, browser type and pages requested, retained for security and abuse prevention.",
          "No advertising or cross-site tracking cookies are set by this site.",
        ],
      },
      {
        heading: "Why we collect it",
        paragraphs: [
          "We use enquiry details only to respond to your admission question and to follow up about the programme you asked about. We do not sell, rent or share enquiry data with third-party marketing companies.",
        ],
      },
      {
        heading: "Who can see it",
        paragraphs: [
          "Enquiries are visible to GITM admissions staff and, where a database provider or email delivery service is used, to that processor under contract. International transfers, if any, are limited to the hosting and email providers named in the institute's records.",
        ],
      },
      {
        heading: "How long we keep it",
        paragraphs: [
          "Enquiry records are retained for the current and following admission cycle, then deleted unless the enquiry converted into an application. Application records are retained as required by university and statutory rules.",
        ],
      },
      {
        heading: "Your rights",
        bullets: [
          "Ask for a copy of the data we hold about you.",
          "Ask us to correct inaccurate data.",
          "Ask us to erase your enquiry and stop contacting you.",
          "Withdraw consent at any time, without affecting admissions already completed.",
        ],
        todo: "Add the contact details of the institute's Data Protection / Grievance Officer (name, email, postal address).",
      },
      {
        heading: "Children",
        paragraphs: [
          "Applicants are normally 17 or older. If you are under 18, please submit enquiries with a parent or guardian.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Use",
    summary:
      "The basis on which you may use this website, and the limits of the information published on it.",
    updated: "2026-11-13",
    sections: [
      {
        heading: "Information is indicative",
        paragraphs: [
          "Programme details, fees, scholarship slabs, placement figures and calendar dates are published for guidance. They do not constitute an offer of admission or a contract. Where this website and an official notification from GITM or Gurugram University disagree, the official notification prevails.",
        ],
      },
      {
        heading: "Admissions",
        paragraphs: [
          "Admission is granted only by the institute's admissions committee through its official process. GITM does not authorise agents to guarantee admission or to collect fees on its behalf. Payments made to any individual are not payments to the institute.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "Institute names, the crest, photographs and course material are the property of GITM. Third-party company names and logos are the property of their respective owners and are used to identify recruiting relationships only.",
        ],
      },
      {
        heading: "Acceptable use",
        bullets: [
          "Do not attempt to gain unauthorised access to any part of this site or its systems.",
          "Do not submit automated, bulk or fraudulent enquiries.",
          "Do not scrape or republish content for commercial use without permission.",
        ],
      },
      {
        heading: "Liability",
        paragraphs: [
          "The website is provided on an 'as is' basis. To the extent permitted by law, GITM is not liable for indirect loss arising from reliance on information published here.",
        ],
      },
    ],
  },
  {
    slug: "mandatory-disclosure",
    title: "Mandatory Disclosure",
    summary:
      "AICTE-mandated institutional disclosure: approvals, intake, faculty, infrastructure and fee details.",
    regulation: "AICTE Approval Process Handbook",
    updated: "2026-11-13",
    sections: [
      {
        heading: "Institutional identity",
        bullets: [
          "Name: Global Institute of Technology & Management",
          "Society: Baljeet Singh Education Society",
          "Established: 2008",
          "Affiliating university: Gurugram University, Gurugram",
          "Approving bodies: AICTE; Pharmacy Council of India (pharmacy programmes)",
          "DTE Haryana institute code: 074",
          "Campus: 5 KM Milestone, Kheda Khurrampur, Farrukhnagar – Haily Mandi Road, Gurugram, Haryana 122506",
        ],
      },
      {
        heading: "Programmes and sanctioned intake",
        paragraphs: [
          "Programme-wise sanctioned intake for the current session is listed on the Programmes page. Intake figures are those approved for the session and may be revised by the regulator.",
        ],
        todo: "Link the current AICTE approval letter, EOA report and the signed mandatory disclosure PDF for this session.",
      },
      {
        heading: "Infrastructure",
        bullets: [
          "Campus area: 18 acres",
          "Constructed area: 3 lakh sq. ft.",
          "Computer laboratories: 10, with 500+ systems",
          "Library: 20,000+ volumes plus national and international journals",
          "Internet: 20 Mbps leased line with campus Wi-Fi",
          "Hostels: separate boys' and girls' hostels, A/C and Non-A/C",
        ],
      },
      {
        heading: "Faculty",
        paragraphs: [
          "Faculty details, including qualifications and experience, are maintained department-wise. The current faculty list is available from the institute on request and is displayed on the campus notice board.",
        ],
        todo: "Publish the department-wise faculty list with designations and qualifications.",
      },
    ],
  },
  {
    slug: "anti-ragging",
    title: "Anti-Ragging",
    summary:
      "GITM has zero tolerance for ragging. How to report it, who handles the complaint, and what happens next.",
    regulation: "UGC Regulations on Curbing the Menace of Ragging, 2009",
    updated: "2026-11-13",
    sections: [
      {
        heading: "Zero tolerance",
        paragraphs: [
          "Ragging in any form is prohibited on the campus, in hostels, on transport and during any institute activity. Any student found ragging is liable to disciplinary action under the UGC Regulations 2009, which can include cancellation of admission, withholding of results, and debarment from the institute.",
        ],
      },
      {
        heading: "How to report",
        paragraphs: [
          "A complaint may be made in person, in writing or by phone to the Anti-Ragging Committee. Complaints can also be made anonymously. The identity of a complainant is kept confidential unless disclosure is required for a fair inquiry.",
        ],
        bullets: [
          "UGC national anti-ragging helpline: 1800-180-5522 (24×7, toll-free)",
          "UGC anti-ragging email: helpline@antiragging.in",
          "Institute helpline: see the contact directory",
        ],
        todo: "Add the Anti-Ragging Committee chairperson, members, phone numbers and the on-campus complaint drop-box location.",
      },
      {
        heading: "What happens after a complaint",
        bullets: [
          "The complaint is acknowledged and recorded the same working day.",
          "The Anti-Ragging Committee begins a preliminary inquiry within 24 hours of a serious complaint.",
          "The committee submits findings, and action follows the UGC-prescribed procedure.",
          "The complainant is informed of the outcome.",
        ],
      },
      {
        heading: "Undertakings",
        paragraphs: [
          "Every student and parent submits an anti-ragging undertaking at admission, as required by UGC. Affidavits are retained by the institute.",
        ],
      },
    ],
  },
  {
    slug: "icc",
    title: "Internal Complaints Committee (ICC)",
    summary:
      "The committee constituted under the POSH Act to receive and inquire into complaints of sexual harassment.",
    regulation: "Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013",
    updated: "2026-11-13",
    sections: [
      {
        heading: "Purpose",
        paragraphs: [
          "The Internal Complaints Committee (ICC) receives and inquires into complaints of sexual harassment from students, faculty and staff, in accordance with the POSH Act 2013. The ICC is chaired by a senior woman employee and includes an external member.",
        ],
      },
      {
        heading: "Making a complaint",
        paragraphs: [
          "A complaint should be made in writing within three months of the incident, ordinarily, to the ICC chairperson. Complaints may be made in person or by email. Confidentiality is maintained throughout.",
        ],
        todo: "Publish the ICC chairperson's name, direct phone number, email address and the members' list.",
      },
      {
        heading: "Process",
        bullets: [
          "Complaint is received and acknowledged in writing.",
          "The ICC conducts an inquiry, ordinarily within 90 days.",
          "Both parties are heard, with the opportunity to submit evidence and name witnesses.",
          "Recommendations are forwarded to the institute for action.",
        ],
      },
      {
        heading: "Protection against retaliation",
        paragraphs: [
          "No student or employee may be victimised for making a complaint or for participating in an inquiry in good faith.",
        ],
      },
    ],
  },
  {
    slug: "grievance",
    title: "Grievance Redressal",
    summary:
      "How to raise an academic, administrative or fee complaint, and the timeline for a response.",
    regulation: "UGC (Redressal of Grievances of Students) Regulations, 2023",
    updated: "2026-11-13",
    sections: [
      {
        heading: "What you can raise",
        bullets: [
          "Admission and eligibility decisions",
          "Examination, evaluation and result queries",
          "Fee, scholarship and refund matters",
          "Hostel, transport and facility issues",
          "Staff conduct",
        ],
      },
      {
        heading: "How to complain",
        paragraphs: [
          "Raise it first with the department or office concerned; most issues are resolved at that level. If it is not resolved within seven working days, escalate in writing to the Grievance Redressal Committee.",
        ],
        todo: "Add the Grievance Redressal Committee chairperson's contact details and the online complaint form link (UGC's online grievance portal accepts student complaints against institutions).",
      },
      {
        heading: "Timeline",
        bullets: [
          "Acknowledgement within 3 working days.",
          "Decision ordinarily within 30 days of the complaint.",
          "Appeal against the committee's decision lies with the Director/Principal within 15 days.",
        ],
      },
      {
        heading: "External escalation",
        paragraphs: [
          "If the institute does not resolve the grievance, students may use the UGC online grievance portal (https://samadhaan.ugc.ac.in) or approach the affiliating university.",
        ],
      },
    ],
  },
  {
    slug: "reservation-cell",
    title: "SC/ST, OBC & Equal Opportunity Cell",
    summary:
      "The cell that monitors implementation of reservation and equal-opportunity obligations on campus.",
    regulation: "UGC Equal Opportunity Cell guidelines; Government of Haryana reservation policy",
    updated: "2026-11-13",
    sections: [
      {
        heading: "Role",
        paragraphs: [
          "The cell monitors the implementation of reservation policy in admissions, scholarships and facility access, and receives complaints of discrimination on the basis of caste, religion, gender, disability or region.",
        ],
      },
      {
        heading: "Reservation",
        paragraphs: [
          "Admission and fee concessions for reserved categories follow the Government of Haryana policy in force for the session and the Gurugram University ordinances. Candidates should confirm the applicable relaxation with the admissions office before applying.",
        ],
      },
      {
        heading: "Scholarships",
        paragraphs: [
          "Post-matric scholarships and other state schemes are administered through the official Haryana and National Scholarship Portal, not by the institute directly. The cell assists students in preparing and submitting applications.",
        ],
        todo: "Add the cell's coordinator, members and direct contact details.",
      },
    ],
  },
];

export function policyBySlug(slug: string): Policy | undefined {
  return policies.find((policy) => policy.slug === slug);
}
