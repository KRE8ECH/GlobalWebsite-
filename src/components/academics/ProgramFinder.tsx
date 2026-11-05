"use client";

import * as React from "react";
import {
  Search,
  BookOpen,
  Users,
  CheckCircle,
  FileDown,
  ArrowRight,
  Filter,
  GraduationCap,
  Award,
  Landmark,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export interface ProgramItem {
  id: string;
  slug: string;
  name: string;
  department: string;
  level: "UG" | "PG" | "DIPLOMA";
  durationYears: number;
  eligibility: string;
  intake: number;
  syllabusPdfUrl?: string | null;
  description: string;
}

interface ProgramFinderProps {
  programs: ProgramItem[];
}

type TabLevel = "ALL" | "UG" | "PG" | "DIPLOMA";

const TABS: { id: TabLevel; label: string; sub: string }[] = [
  { id: "ALL", label: "All Degree Programs", sub: "Complete Academic Catalog" },
  { id: "UG", label: "Undergraduate (UG)", sub: "B.Tech, BCA, BBA, B.Pharm" },
  { id: "PG", label: "Postgraduate (PG)", sub: "MBA, MCA, M.Tech" },
  { id: "DIPLOMA", label: "Diploma / Polytechnic", sub: "Engineering & Pharmacy" },
];

export function ProgramFinder({ programs }: ProgramFinderProps) {
  const [selectedTab, setSelectedTab] = React.useState<TabLevel>("ALL");
  const [searchQuery, setSearchQuery] = React.useState("");

  // Filter programs by tab and real-time search query
  const filteredPrograms = React.useMemo(() => {
    return programs.filter((p) => {
      // 1. Tab filter
      if (selectedTab !== "ALL" && p.level !== selectedTab) {
        return false;
      }

      // 2. Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDept = p.department.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesElig = p.eligibility.toLowerCase().includes(query);
        return matchesName || matchesDept || matchesDesc || matchesElig;
      }

      return true;
    });
  }, [programs, selectedTab, searchQuery]);

  return (
    <section
      id="programs"
      className="py-14 sm:py-20 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-[#080f1a] scroll-mt-14"
      aria-labelledby="programs-finder-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#881337] dark:text-amber-400">
            <BookOpen className="h-4 w-4" />
            <span>Academic Curriculum Aligned with NEP 2020 & Gurugram University</span>
          </div>

          <h2
            id="programs-finder-heading"
            className="font-editorial text-2xl sm:text-4xl font-extrabold text-[#0f2b48] dark:text-stone-100"
          >
            Academic Departments & Degree Programs
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl mx-auto">
            Explore approved degree programs offered at GITM Gurgaon. Rigorous curriculum designed in accordance with AICTE model syllabus, Pharmacy Council of India (PCI), and Gurugram University ordinances.
          </p>
        </div>

        {/* Filter Controls: Tabs + Search Bar */}
        <div className="max-w-4xl mx-auto space-y-4 mb-10">
          {/* Tabbed Level Switcher */}
          <div
            role="tablist"
            aria-label="Filter programs by academic level"
            className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-stone-100 dark:bg-stone-900 p-1.5 rounded-md border border-stone-200 dark:border-stone-800"
          >
            {TABS.map((tab) => {
              const isActive = selectedTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="programs-grid"
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex flex-col items-center justify-center py-2.5 px-3 rounded-xs text-center transition-colors ${
                    isActive
                      ? "bg-[#0f2b48] text-white font-bold shadow-2xs"
                      : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 font-medium"
                  }`}
                >
                  <span className="text-xs font-bold">{tab.label}</span>
                  <span className="text-[10px] opacity-75 hidden sm:inline truncate max-w-full">
                    {tab.sub}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input Filter */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <Input
              type="search"
              placeholder="Search by degree name, specialization (e.g., Artificial Intelligence, MBA, Cyber Security)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-11 text-xs sm:text-sm bg-stone-50 dark:bg-stone-900 border-stone-300 dark:border-stone-700 rounded-md focus-visible:ring-1 focus-visible:ring-[#0f2b48]"
              aria-label="Search academic programs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-700"
                aria-label="Clear program search"
              >
                Clear
              </button>
            )}
          </div>

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-xs text-stone-500 px-1">
            <span>
              Showing <strong>{filteredPrograms.length}</strong> {filteredPrograms.length === 1 ? "degree program" : "degree programs"}
              {selectedTab !== "ALL" && ` under ${selectedTab}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
            {(selectedTab !== "ALL" || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedTab("ALL");
                  setSearchQuery("");
                }}
                className="text-[#881337] dark:text-amber-400 hover:underline font-bold"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* 2. STRUCTURED ACADEMIC DEGREE CARDS */}
        {filteredPrograms.length > 0 ? (
          <div
            id="programs-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPrograms.map((program) => (
              <Card
                key={program.id}
                className="academic-card flex flex-col justify-between border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0f1c2e] rounded-md overflow-hidden"
              >
                <div className="h-1 bg-[#0f2b48] w-full" />
                
                <CardHeader className="p-5 pb-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#881337] dark:text-amber-400 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-xs border border-stone-200 dark:border-stone-700">
                      Dept. of {program.department.replace("_", " ")}
                    </span>
                    <span className="text-[10px] font-bold text-stone-500 bg-stone-100 dark:bg-stone-900 px-2 py-0.5 rounded-xs border border-stone-200 dark:border-stone-800">
                      {program.level} • {program.durationYears} Years
                    </span>
                  </div>

                  <CardTitle className="font-editorial text-base sm:text-lg font-bold text-[#0f2b48] dark:text-stone-100 leading-snug">
                    {program.name}
                  </CardTitle>

                  <CardDescription className="text-xs text-stone-600 dark:text-stone-400 line-clamp-3 mt-1.5 leading-relaxed">
                    {program.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-5 pt-0 space-y-3">
                  {/* Statutory Affiliation and Intake */}
                  <div className="rounded-xs border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 p-3 text-xs space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-stone-800 dark:text-stone-200">Eligibility: </span>
                        <span className="text-stone-600 dark:text-stone-400">{program.eligibility}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 text-[11px]">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-stone-400" />
                        Approved Seat Intake:
                      </span>
                      <span className="font-bold text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-800 px-1.5 py-0.2 rounded-xs border border-stone-200 dark:border-stone-700">
                        {program.intake} Seats
                      </span>
                    </div>
                  </div>

                  {/* Actions: Syllabus Download & Admissions */}
                  <div className="flex items-center justify-between pt-1 gap-2">
                    {program.syllabusPdfUrl ? (
                      <a
                        href={program.syllabusPdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0f2b48] dark:text-amber-400 hover:underline"
                        aria-label={`Download NEP 2020 syllabus for ${program.name}`}
                      >
                        <FileDown className="h-3.5 w-3.5" />
                        <span>Curriculum Syllabus</span>
                      </a>
                    ) : (
                      <span className="text-[11px] text-stone-400 italic">Curriculum on request</span>
                    )}

                    <Button
                      asChild
                      size="sm"
                      className="bg-[#0f2b48] hover:bg-[#1a3a5e] text-white font-bold text-xs uppercase tracking-wider rounded-xs ml-auto shadow-2xs"
                    >
                      <a href="#inquiry" className="flex items-center gap-1">
                        <span>Admissions</span>
                        <ArrowRight className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 p-10 text-center max-w-lg mx-auto">
            <Filter className="h-8 w-8 text-stone-400 mx-auto mb-2" />
            <h3 className="font-editorial text-base font-bold text-stone-900 dark:text-stone-100">
              No Programs Matching Criteria
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              No degree courses found matching &quot;{searchQuery}&quot;. Please adjust your filters.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedTab("ALL");
                setSearchQuery("");
              }}
              className="mt-4 font-bold text-xs"
            >
              Reset Search & Show All
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProgramFinder;
