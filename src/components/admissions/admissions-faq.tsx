import { ChevronDown } from "lucide-react";

/**
 * Genuine admissions questions, answered only from facts already published
 * elsewhere on this site. Google requires FAQPage structured data to match
 * visible on-page text, so this array is the single source for both the
 * accordion and the JSON-LD block in the page — change it in one place.
 */
export const admissionsFaqs = [
  {
    question: "What is the eligibility for B.Tech at GITM Gurugram?",
    answer:
      "A pass in Class 12 with Physics and Mathematics as compulsory subjects, plus one of Chemistry, Biology, Biotechnology or a technical vocational subject, with at least 45% aggregate (40% for reserved category candidates of Haryana). Admission is through JEE Main or the Haryana LEET/DTE counselling process.",
  },
  {
    question: "Which documents do I need for admission?",
    answer:
      "Class 10 and Class 12 marksheets and certificates, transfer certificate, character certificate, migration certificate for non-Haryana boards, category certificate if applicable, entrance exam scorecard if applicable, and recent passport-size photographs.",
  },
  {
    question: "How do I pay the fees, and can I pay in instalments?",
    answer:
      "Fees are payable only through the institute's official channels — the admissions portal, NEFT/RTGS to the institute account, or a demand draft in the institute's name. Pay in instalments only if the accounts office has approved a schedule in writing for you. Never transfer money to an individual or an agent.",
  },
  {
    question: "Does GITM Gurugram provide hostel facilities?",
    answer:
      "Yes. Separate boys' and girls' hostels are available on campus in both air-conditioned and non-air-conditioned options, with mess facilities. Hostel charges are separate from tuition fees; contact the hostel office for current rates and availability.",
  },
  {
    question: "Is GITM affiliated and approved?",
    answer:
      "GITM Gurugram was established in 2008 and is approved by AICTE, affiliated to Gurugram University, and has its programmes approved by the Directorate of Technical Education, Haryana. Verify the current status directly on the AICTE and Gurugram University websites using the links on our approvals page.",
  },
  {
    question: "Are scholarships available?",
    answer:
      "Yes. The institute offers merit-based tuition concessions, and students may also be eligible for Haryana state schemes, central schemes for reserved categories, and the Central Sector Scheme of Scholarship. Scholarship slabs shown on this site are indicative; the final amount is confirmed at counselling.",
  },
];

export function AdmissionsFaq() {
  return (
    <div className="divide-y divide-stone-200 border-y border-stone-200">
      {admissionsFaqs.map((faq) => (
        <details key={faq.question} className="group py-4">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left font-bold text-navy">
            <span>{faq.question}</span>
            <ChevronDown
              className="mt-0.5 h-5 w-5 shrink-0 text-stone-400 transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-700">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
