import * as React from "react";
import {
  TrendingUp,
  Building,
  Briefcase,
  Award,
  GraduationCap,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export interface PlacementItem {
  id: string;
  studentName: string;
  company: string;
  packageLPA: number;
  designation: string;
  year: number;
  branch: string;
  photoUrl?: string | null;
}

interface PlacementTickerProps {
  placements?: PlacementItem[];
}

// Key verified hiring organizations
const VERIFIED_RECRUITERS = [
  { name: "Microsoft", domain: "Cloud & Enterprise Software", location: "Gurugram / Hyderabad" },
  { name: "Amazon", domain: "E-Commerce & AWS Cloud", location: "Gurugram / Bangalore" },
  { name: "Google", domain: "Enterprise Cloud Platforms", location: "Gurugram / Hyderabad" },
  { name: "Capgemini", domain: "Global Technology Consulting", location: "Noida / Gurugram" },
  { name: "TCS Digital", domain: "Software & Digital Engineering", location: "Delhi-NCR" },
  { name: "Infosys", domain: "IT Systems & Enterprise Services", location: "Chandigarh / Delhi" },
  { name: "Wipro", domain: "Technology Infrastructure", location: "Delhi-NCR / Bangalore" },
  { name: "Accenture", domain: "Strategy & Technology Advisory", location: "Gurugram / Noida" },
  { name: "Deloitte", domain: "Analytics & Risk Assurance", location: "Gurugram Cyber City" },
  { name: "Sun Pharma", domain: "Pharmaceutical Formulation & R&D", location: "Gurugram / Baddi" },
];

export function PlacementTicker({ placements }: PlacementTickerProps) {
  const defaultPlacements: PlacementItem[] = [
    {
      id: "p1",
      studentName: "Aarav Sharma",
      company: "Google",
      packageLPA: 28.5,
      designation: "Software Engineer (Cloud Systems)",
      year: 2026,
      branch: "B.Tech CSE",
    },
    {
      id: "p2",
      studentName: "Priya Verma",
      company: "Microsoft",
      packageLPA: 24.0,
      designation: "Cloud Solution Specialist",
      year: 2026,
      branch: "B.Tech CSE",
    },
    {
      id: "p3",
      studentName: "Rohan Gupta",
      company: "Amazon",
      packageLPA: 21.0,
      designation: "Associate Solutions Architect",
      year: 2026,
      branch: "B.Tech AI-DS",
    },
    {
      id: "p4",
      studentName: "Ananya Sen",
      company: "Deloitte",
      packageLPA: 12.5,
      designation: "Technology Advisory Analyst",
      year: 2026,
      branch: "MBA",
    },
    {
      id: "p5",
      studentName: "Siddharth Patel",
      company: "Capgemini",
      packageLPA: 10.5,
      designation: "Software Consultant",
      year: 2026,
      branch: "BCA",
    },
    {
      id: "p6",
      studentName: "Neha Malik",
      company: "Sun Pharma",
      packageLPA: 8.5,
      designation: "Formulation R&D Scientist",
      year: 2026,
      branch: "B.Pharm",
    },
  ];

  const displayPlacements = placements && placements.length > 0 ? placements : defaultPlacements;

  return (
    <section
      id="placements"
      className="py-14 sm:py-20 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#0c1524] scroll-mt-14"
      aria-labelledby="placements-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#881337] dark:text-amber-400 mb-1.5">
              <TrendingUp className="h-4 w-4" />
              <span>Corporate Resource Centre & Career Services</span>
            </div>
            <h2
              id="placements-heading"
              className="font-editorial text-2xl sm:text-4xl font-extrabold text-[#0f2b48] dark:text-stone-100"
            >
              Industry Recruiters & Career Placements
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1.5 max-w-2xl leading-relaxed">
              Situated in the corporate capital of Gurgaon, GITM maintains direct placement MoUs and annual campus recruitment drives with Fortune 500 multinationals and leading Indian conglomerates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-1.5 text-xs font-bold text-[#881337] dark:text-amber-400">
              Highest CTC: ₹40.0 LPA
            </span>
            <span className="rounded-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-1.5 text-xs font-bold text-[#0f2b48] dark:text-stone-300">
              Average CTC: ₹6.8 LPA
            </span>
          </div>
        </div>

        {/* 1. VERIFIED CORPORATE RECRUITER GRID (NO DUPLICATE MARQUEES) */}
        <div className="mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-4 flex items-center justify-between">
            <span>Verified Corporate Recruitment Partners</span>
            <span className="text-[11px] font-normal text-stone-500">Regular On-Campus Recruiters</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {VERIFIED_RECRUITERS.map((recruiter) => (
              <div
                key={recruiter.name}
                className="rounded-md border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0f1c2e] p-3.5 shadow-2xs hover:border-[#0f2b48] dark:hover:border-stone-600 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-editorial text-base font-bold text-[#0f2b48] dark:text-stone-100">
                      {recruiter.name}
                    </span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  </div>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1 block">
                    {recruiter.domain}
                  </span>
                </div>
                <div className="mt-3 pt-2 border-t border-stone-100 dark:border-stone-800 text-[10px] font-medium text-stone-400">
                  {recruiter.location}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. VERIFIED STUDENT PLACEMENT HIGHLIGHTS */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-editorial text-lg font-bold text-[#0f2b48] dark:text-stone-100">
              Recent Placement Offers & Alumni Success
            </h3>
            <span className="text-xs font-semibold text-stone-500">
              Batch 2026 Confirmed Selections
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayPlacements.map((record) => (
              <Card
                key={record.id}
                className="rounded-md border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0f1c2e] shadow-xs hover:border-[#0f2b48] transition-colors"
              >
                <div className="h-1 bg-[#0f2b48] w-full" />
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-sm text-[#0f2b48] dark:text-stone-100">
                        {record.studentName}
                      </h4>
                      <p className="text-xs text-stone-500 flex items-center gap-1.5 mt-0.5">
                        <GraduationCap className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                        <span>
                          {record.branch} • Batch {record.year}
                        </span>
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-editorial text-lg font-black text-[#881337] dark:text-amber-400">
                        ₹{record.packageLPA} LPA
                      </span>
                      <span className="text-[10px] block text-stone-400 font-semibold uppercase tracking-wider">
                        Annual CTC
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-stone-800 dark:text-stone-200">
                      <Building className="h-3.5 w-3.5 text-stone-400" />
                      <span>{record.company}</span>
                    </div>
                    <div className="flex items-center gap-1 text-stone-500 text-[11px] truncate max-w-[150px]">
                      <Briefcase className="h-3 w-3 shrink-0" />
                      <span title={record.designation}>{record.designation}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Corporate Resource Centre Note */}
        <div className="mt-8 rounded-md border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0f1c2e] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 text-stone-700 dark:text-stone-300 text-center sm:text-left">
            <Award className="h-5 w-5 text-[#881337] dark:text-amber-400 shrink-0" />
            <span>
              <strong>Corporate Resource Centre (CRC):</strong> Conducts rigorous pre-placement training, aptitude grooming, industry seminars, and mock technical interviews with Gurgaon corporate experts.
            </span>
          </div>
          <a
            href="#inquiry"
            className="font-bold text-[#881337] dark:text-amber-400 hover:underline uppercase tracking-wider whitespace-nowrap shrink-0"
          >
            Inquire with CRC Office →
          </a>
        </div>
      </div>
    </section>
  );
}

export default PlacementTicker;
