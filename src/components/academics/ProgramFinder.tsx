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
  { id: "ALL", label: "All Programs", sub: "Complete Catalog" },
  { id: "UG", label: "Undergraduate", sub: "B.Tech, BBA, BCA, B.Pharm" },
  { id: "PG", label: "Postgraduate", sub: "M.Tech, MBA, MCA" },
  { id: "DIPLOMA", label: "Diploma", sub: "Polytechnic & D.Pharm" },
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
      className="py-16 sm:py-24 border-b border-border bg-muted/20 scroll-mt-14"
      aria-labelledby="programs-finder-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <BookOpen className="h-3.5 w-3.5" />
            <span>NEP 2020 Aligned Academic Degrees</span>
          </div>

          <h2
            id="programs-finder-heading"
            className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground"
          >
            Interactive Degree & Program Finder
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Find your ideal academic pathway affiliated with Gurugram University. Explore multidisciplinary curricula, eligibility criteria, and approved seat intakes.
          </p>
        </div>

        {/* Filter Controls: Tabs + Search Bar */}
        <div className="max-w-4xl mx-auto space-y-5 mb-10">
          {/* Tabbed Level Switcher */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 rounded-xl border border-border bg-card shadow-xs"
            role="tablist"
            aria-label="Filter programs by level"
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
                  className={`flex flex-col items-center justify-center py-2.5 px-3 rounded-lg text-xs font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  <span className="text-sm sm:text-xs">{tab.label}</span>
                  <span
                    className={`text-[10px] font-normal truncate max-w-full ${
                      isActive ? "text-primary-foreground/80" : "text-muted-foreground/70"
                    }`}
                  >
                    {tab.sub}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Real-time Search Input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search programs by title or specialization (e.g. 'AI & Data Science', 'Finance', 'Pharmacy', 'Full Stack')..."
              className="pl-10 h-11 bg-card text-foreground placeholder:text-muted-foreground/70 border-border shadow-xs rounded-xl text-sm"
              aria-label="Search academic programs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground bg-muted px-2 py-0.5 rounded-md"
              >
                Clear
              </button>
            )}
          </div>

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
            <span>
              Showing <strong>{filteredPrograms.length}</strong> {filteredPrograms.length === 1 ? "program" : "programs"}
              {selectedTab !== "ALL" && ` in ${selectedTab}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
            {(selectedTab !== "ALL" || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedTab("ALL");
                  setSearchQuery("");
                }}
                className="text-primary hover:underline font-medium"
              >
                Reset all filters
              </button>
            )}
          </div>
        </div>

        {/* 2. PROGRAM CARDS GRID */}
        {filteredPrograms.length > 0 ? (
          <div
            id="programs-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredPrograms.map((program) => (
              <Card
                key={program.id}
                className="flex flex-col justify-between border border-border bg-card hover:border-primary/50 transition-all duration-200 hover:shadow-lg group rounded-2xl overflow-hidden"
              >
                {/* Header with badges */}
                <CardHeader className="p-6 pb-4">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="outline" className="text-xs uppercase font-bold tracking-wide">
                      {program.department.replace("_", " ")}
                    </Badge>
                    <Badge variant="secondary" className="text-xs font-semibold">
                      {program.level} • {program.durationYears} Years
                    </Badge>
                  </div>

                  <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {program.name}
                  </CardTitle>

                  <CardDescription className="text-xs text-muted-foreground line-clamp-3 mt-2 leading-relaxed">
                    {program.description}
                  </CardDescription>
                </CardHeader>

                {/* Body Content */}
                <CardContent className="p-6 pt-0 space-y-4">
                  {/* Eligibility & Seats box */}
                  <div className="space-y-2 rounded-xl bg-muted/60 p-3.5 text-xs">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-foreground">Eligibility: </span>
                        <span className="text-muted-foreground">{program.eligibility}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border/60 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-primary" />
                        Annual Approved Intake:
                      </span>
                      <span className="font-bold text-foreground">{program.intake} Seats</span>
                    </div>
                  </div>

                  {/* Syllabus & Enquire Actions */}
                  <div className="flex items-center justify-between pt-1 gap-2">
                    {program.syllabusPdfUrl ? (
                      <a
                        href={program.syllabusPdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 hover:underline"
                        aria-label={`Download NEP 2020 syllabus for ${program.name}`}
                      >
                        <FileDown className="h-3.5 w-3.5" />
                        <span>NEP 2020 Syllabus</span>
                      </a>
                    ) : (
                      <span className="text-[11px] text-muted-foreground">Syllabus on request</span>
                    )}

                    <Button
                      asChild
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-xs ml-auto"
                    >
                      <a href="#inquiry" className="flex items-center gap-1">
                        <span>Enquire Now</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center max-w-lg mx-auto">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto mb-3">
              <Filter className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-foreground">No matching programs found</h3>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              We couldn&apos;t find any programs matching &quot;{searchQuery}&quot; under the selected filter. Try broadening your keywords.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedTab("ALL");
                setSearchQuery("");
              }}
              className="mt-4 font-semibold"
            >
              Clear Search & Show All
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProgramFinder;
