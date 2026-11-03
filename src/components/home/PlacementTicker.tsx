import * as React from "react";
import {
  TrendingUp,
  Building2,
  Briefcase,
  Award,
  GraduationCap,
  Sparkles,
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

// Key Hiring Partners specified in user requirements
const HIRING_PARTNERS = [
  { name: "Microsoft", category: "Cloud & Software", tier: "Tier 1" },
  { name: "Amazon", category: "E-Commerce & AWS", tier: "Tier 1" },
  { name: "Google", category: "Search & Enterprise Cloud", tier: "Tier 1" },
  { name: "Capgemini", category: "Global Consulting", tier: "MNC" },
  { name: "Infosys", category: "Enterprise IT Services", tier: "MNC" },
  { name: "Wipro", category: "Technology Solutions", tier: "MNC" },
  { name: "Accenture", category: "Strategy & Tech Consulting", tier: "MNC" },
  { name: "Deloitte", category: "Advisory & Risk Analytics", tier: "Big 4" },
  { name: "TCS Digital", category: "Software & Digital Engineering", tier: "MNC" },
  { name: "Sun Pharma", category: "Pharmaceutical R&D", tier: "Healthcare" },
];

export function PlacementTicker({ placements }: PlacementTickerProps) {
  // Default fallback data if none provided
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
      className="py-16 sm:py-20 border-b border-border bg-muted/20"
      aria-labelledby="placements-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <TrendingUp className="h-4 w-4" />
              <span>Corporate Resource Centre & Placements</span>
            </div>
            <h2
              id="placements-heading"
              className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-1.5"
            >
              Industry Partnerships & Student Success
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              With 100+ recruitment drives annually in the corporate epicenter of Gurgaon (Delhi-NCR), GITM graduates secure leadership roles at Fortune 500 multinationals.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="success" className="text-xs px-3 py-1 font-bold">
              Highest CTC: ₹28.5 LPA
            </Badge>
            <Badge variant="outline" className="text-xs px-3 py-1 font-bold">
              Average CTC: ₹6.8 LPA
            </Badge>
          </div>
        </div>

        {/* 1. INFINITE RECRUITER MARQUEE WITHOUT DOM DUPLICATION */}
        <div className="mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center mb-3">
            Top Hiring Organizations Visiting GITM Campus
          </div>

          {/* Single track wrapper with gradient mask */}
          <div
            className="relative overflow-hidden py-3 rounded-xl border border-border/70 bg-card/50 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
            role="region"
            aria-label="Hiring Partners List"
          >
            <ul
              className="animate-marquee-track gap-4 px-4 list-none m-0"
              tabIndex={0}
              aria-label="Scrolling list of hiring companies. Hover or focus to pause animation."
            >
              {HIRING_PARTNERS.map((partner) => (
                <li
                  key={partner.name}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5 shadow-2xs hover:border-primary/50 transition-colors shrink-0 group"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors font-bold text-xs">
                    {partner.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-sm text-foreground block leading-tight">
                      {partner.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground block">
                      {partner.category}
                    </span>
                  </div>
                  <span className="text-[9px] font-semibold text-muted-foreground ml-2 px-1.5 py-0.5 rounded bg-muted">
                    {partner.tier}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 2. TOP PLACEMENT CARDS */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>Recent Star Placement Highlights</span>
            </h3>
            <span className="text-xs text-muted-foreground">
              Batch 2026 Offers
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPlacements.map((record) => (
              <Card
                key={record.id}
                className="group relative overflow-hidden border border-border bg-card hover:border-primary/60 transition-all duration-200 hover:shadow-md"
              >
                {/* Subtle top primary gradient bar */}
                <div className="h-1 w-full bg-gradient-to-r from-primary to-blue-500" />

                <CardContent className="p-6">
                  {/* Top: Student Name + Package */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                        {record.studentName}
                      </h4>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                        <GraduationCap className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>
                          {record.branch} • Batch {record.year}
                        </span>
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-lg font-black text-primary">
                        ₹{record.packageLPA} LPA
                      </span>
                      <span className="text-[10px] block text-muted-foreground font-medium">
                        Annual CTC
                      </span>
                    </div>
                  </div>

                  {/* Bottom: Company + Designation */}
                  <div className="mt-5 pt-3.5 border-t border-border/70 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-foreground">
                      <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{record.company}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground text-[11px] truncate max-w-[150px]">
                      <Briefcase className="h-3 w-3 shrink-0" />
                      <span title={record.designation}>{record.designation}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Corporate CRC Note */}
        <div className="mt-10 rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 text-foreground font-medium text-center sm:text-left">
            <Award className="h-5 w-5 text-primary shrink-0" />
            <span>
              <strong>Corporate Resource Centre (CRC):</strong> Offering continuous technical bootcamps, soft-skill workshops, and mock interview drives with industry leaders.
            </span>
          </div>
          <a
            href="#inquiry"
            className="font-bold text-primary hover:underline whitespace-nowrap shrink-0"
          >
            Connect with CRC Advisory →
          </a>
        </div>
      </div>
    </section>
  );
}

export default PlacementTicker;

