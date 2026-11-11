"use client";

import * as React from "react";
import {
  TrendingUp,
  Building,
  Briefcase,
  Award,
  GraduationCap,
  CheckCircle2,
  ExternalLink,
  User,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ThreeDTiltCard from "@/components/3d/ThreeDTiltCard";

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

// 16 Real Verified Corporate Recruitment Partners
const VERIFIED_RECRUITERS = [
  { name: "Google", domain: "Cloud & Systems", category: "tech", logoUrl: "/images/official/general/general_23_google.jpg", location: "Gurugram / Hyderabad" },
  { name: "Microsoft", domain: "Enterprise Software", category: "tech", logoUrl: "/images/official/general/general_45_Microsoft.jpg", location: "Gurugram Cyber City" },
  { name: "Samsung", domain: "R&D Institute", category: "core", logoUrl: "/images/official/general/general_24_samsung.jpg", location: "Noida / Delhi-NCR" },
  { name: "Sony", domain: "Consumer Tech & Media", category: "tech", logoUrl: "/images/official/general/general_26_Sony.jpg", location: "Gurugram" },
  { name: "Cognizant", domain: "Digital Engineering", category: "tech", logoUrl: "/images/official/general/general_41_Cognizant.jpg", location: "Delhi-NCR" },
  { name: "Tech Mahindra", domain: "IT Systems & Telecom", category: "tech", logoUrl: "/images/official/general/general_42_Tech-Mahindra.jpg", location: "Noida / Gurugram" },
  { name: "HDFC Bank", domain: "Fintech & Banking", category: "fintech", logoUrl: "/images/official/general/general_35_HDFC-Bank.jpg", location: "Gurugram" },
  { name: "Bank of America", domain: "Global Financial Services", category: "fintech", logoUrl: "/images/official/general/general_36_Bank-of-America.jpg", location: "Gurugram SEZ" },
  { name: "Airtel", domain: "Telecommunication & Cloud", category: "tech", logoUrl: "/images/official/general/general_38_airtel.jpg", location: "Gurugram Head Office" },
  { name: "Hitachi", domain: "Industrial Automation", category: "core", logoUrl: "/images/official/general/general_40_Hitachi.jpg", location: "Delhi-NCR" },
  { name: "Panasonic", domain: "Electronics & Energy", category: "core", logoUrl: "/images/official/general/general_39_Panasonic.jpg", location: "Jhajjar / Gurugram" },
  { name: "Nestlé", domain: "FMCG Supply Chain", category: "core", logoUrl: "/images/official/general/general_43_Nestl.jpg", location: "Delhi-NCR" },
  { name: "Paytm", domain: "Digital Payments & AI", category: "fintech", logoUrl: "/images/official/general/general_44_paytm.jpg", location: "Noida" },
  { name: "Daffodil Software", domain: "Enterprise Engineering", category: "tech", logoUrl: "/images/official/general/general_29_Daffodil-Software.jpg", location: "Gurugram" },
  { name: "Yamaha", domain: "Motor Solutions", category: "core", logoUrl: "/images/official/general/general_33_Yamaha-Motor-Solutions.jpg", location: "Surajpur / Delhi-NCR" },
  { name: "Eicher", domain: "Commercial Vehicles & CAD", category: "core", logoUrl: "/images/official/general/general_34_Eicher.jpg", location: "Gurugram" },
];

export function PlacementTicker({ placements }: PlacementTickerProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  const defaultPlacements: PlacementItem[] = [
    {
      id: "p1",
      studentName: "Isha Sharma",
      company: "Google",
      packageLPA: 28.5,
      designation: "Software Engineer (Cloud Systems)",
      year: 2026,
      branch: "B.Tech CSE",
      photoUrl: "/images/official/general/general_137_isha.jpg",
    },
    {
      id: "p2",
      studentName: "Sarvesh",
      company: "Microsoft",
      packageLPA: 24.0,
      designation: "Cloud Solution Specialist",
      year: 2026,
      branch: "B.Tech CSE",
      photoUrl: "/images/official/general/general_136_Sarvesh.jpg",
    },
    {
      id: "p3",
      studentName: "Neeru",
      company: "Amazon",
      packageLPA: 21.0,
      designation: "Associate Solutions Architect",
      year: 2026,
      branch: "B.Tech AI-DS",
      photoUrl: "/images/official/general/general_134_neeru.jpg",
    },
    {
      id: "p4",
      studentName: "Yasmeen",
      company: "Samsung R&D",
      packageLPA: 14.5,
      designation: "Software Engineer - Embedded AI",
      year: 2026,
      branch: "B.Tech CSE",
      photoUrl: "/images/official/general/general_135_yasmeen.jpg",
    },
    {
      id: "p5",
      studentName: "Anamika",
      company: "Deloitte",
      packageLPA: 12.5,
      designation: "Technology Advisory Analyst",
      year: 2026,
      branch: "MBA",
      photoUrl: "/images/official/general/general_138_anamika.jpg",
    },
    {
      id: "p6",
      studentName: "Gopal Chauhan",
      company: "Cognizant",
      packageLPA: 10.5,
      designation: "Associate Consultant",
      year: 2026,
      branch: "BCA",
      photoUrl: "/images/official/general/general_141_gopal.jpg",
    },
  ];

  const displayPlacements = placements && placements.length > 0 ? placements : defaultPlacements;

  const filteredRecruiters = React.useMemo(() => {
    if (selectedCategory === "all") return VERIFIED_RECRUITERS;
    return VERIFIED_RECRUITERS.filter((r) => r.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id="placements"
      className="py-14 sm:py-20 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#0c1524] scroll-mt-14"
      aria-labelledby="placements-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
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
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 mt-1.5 max-w-2xl leading-relaxed font-medium">
              Situated in the corporate capital of Gurgaon, GITM maintains direct placement MoUs and annual campus recruitment drives with Fortune 500 multinationals and leading Indian conglomerates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3.5 py-1.5 text-xs font-bold text-[#881337] dark:text-amber-400">
              Highest CTC: ₹40.0 LPA
            </span>
            <span className="rounded-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3.5 py-1.5 text-xs font-bold text-[#0f2b48] dark:text-stone-300">
              Average CTC: ₹6.8 LPA
            </span>
          </div>
        </div>

        {/* 1. AUTHENTIC CORPORATE RECRUITER WALL */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                Verified Corporate Hiring Partners (Annual On-Campus Drives)
              </h3>
              <p className="text-[11px] text-stone-500">
                Official placement partnerships, internship MoUs & corporate technical symposiums
              </p>
            </div>

            {/* Formal Domain Category Filters */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: "all", label: "All 16 Partners" },
                { id: "tech", label: "Cloud & Software" },
                { id: "fintech", label: "Banking & Fintech" },
                { id: "core", label: "Industrial & Auto" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-xs border transition-colors ${
                    selectedCategory === tab.id
                      ? "bg-[#0f2b48] text-white border-[#0f2b48] dark:bg-amber-400 dark:text-stone-950 dark:border-amber-400"
                      : "bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:bg-stone-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Verified Corporate Partners */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {filteredRecruiters.map((recruiter) => (
              <ThreeDTiltCard
                key={recruiter.name}
                maxTilt={8}
                glareColor="rgba(217, 119, 6, 0.15)"
                className="h-full"
              >
                <div
                  className="academic-card h-full rounded-md border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0f1c2e] p-3 flex flex-col items-center justify-between text-center min-h-[110px] shadow-2xs hover:shadow-sm transition-all"
                >
                  <div className="w-full h-11 flex items-center justify-center p-1 bg-white rounded-xs">
                    <img
                      src={recruiter.logoUrl}
                      alt={`${recruiter.name} Corporate Recruitment Logo`}
                      className="max-h-full max-w-full object-contain filter contrast-125"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-full mt-2 pt-1.5 border-t border-stone-100 dark:border-stone-800">
                    <span className="font-bold text-[11px] text-[#0f2b48] dark:text-stone-200 block truncate">
                      {recruiter.name}
                    </span>
                    <span className="text-[9px] text-stone-500 dark:text-stone-400 block truncate">
                      {recruiter.domain}
                    </span>
                  </div>
                </div>
              </ThreeDTiltCard>
            ))}
          </div>
        </div>

        {/* 2. VERIFIED STUDENT PLACEMENT HONOURS */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-editorial text-lg font-bold text-[#0f2b48] dark:text-stone-100">
                Recent Placement Honours & Alumni Selections
              </h3>
              <p className="text-xs text-stone-500">
                Confirmed campus placement offers for the 2026 graduating batch
              </p>
            </div>
            <span className="text-xs font-semibold text-stone-500 hidden sm:inline">
              100% Placement Record
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayPlacements.map((record) => (
              <ThreeDTiltCard
                key={record.id}
                maxTilt={6}
                glareColor="rgba(217, 119, 6, 0.12)"
                className="h-full"
              >
                <Card
                  className="academic-card h-full rounded-md border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0f1c2e] overflow-hidden shadow-2xs hover:shadow-sm transition-all"
                >
                  <div className="h-1 bg-[#0f2b48] w-full" />
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-start gap-3.5">
                      {/* Student Portrait */}
                      <div className="h-14 w-14 rounded-xs border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 overflow-hidden shrink-0">
                        {record.photoUrl ? (
                          <img
                            src={record.photoUrl}
                            alt={record.studentName}
                            className="h-full w-full object-cover object-top"
                            loading="lazy"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-stone-400">
                            <User className="h-6 w-6" />
                          </div>
                        )}
                      </div>

                      {/* Student Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-bold text-sm text-[#0f2b48] dark:text-stone-100 truncate">
                              {record.studentName}
                            </h4>
                            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wide">
                              <CheckCircle2 className="h-3 w-3" />
                              <span>Verified Selection</span>
                            </span>
                          </div>

                          <span className="font-editorial text-base font-black text-[#881337] dark:text-amber-400 shrink-0 bg-stone-100 dark:bg-stone-900 px-2 py-0.5 rounded-xs border border-stone-200 dark:border-stone-800">
                            ₹{record.packageLPA} LPA
                          </span>
                        </div>

                        <p className="text-xs text-stone-700 dark:text-stone-300 font-medium flex items-center gap-1 mt-1">
                          <GraduationCap className="h-3.5 w-3.5 text-[#0f2b48] dark:text-amber-400 shrink-0" />
                          <span className="truncate">
                            {record.branch} • Batch {record.year}
                          </span>
                        </p>

                        <div className="mt-2.5 pt-2 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 font-bold text-stone-900 dark:text-stone-100">
                            <Building className="h-3 w-3 text-[#881337] dark:text-amber-400" />
                            <span className="truncate">{record.company}</span>
                          </div>
                          <div className="flex items-center gap-1 text-stone-700 dark:text-stone-300 text-[11px] font-medium truncate max-w-[130px]">
                            <Briefcase className="h-3 w-3 shrink-0 text-stone-400" />
                            <span title={record.designation}>{record.designation}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ThreeDTiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlacementTicker;
