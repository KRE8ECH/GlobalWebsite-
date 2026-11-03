"use client";

import * as React from "react";
import {
  FileText,
  Search,
  Calendar,
  ExternalLink,
  Download,
  Pin,
  Sparkles,
  School,
  Building2,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export interface NoticeItem {
  id: string;
  title: string;
  category: "EXAM" | "ADMISSION" | "ACADEMIC" | "HOLIDAY" | "GENERAL";
  source: "GITM" | "GURUGRAM_UNIVERSITY";
  publishDate: string | Date;
  pdfUrl?: string | null;
  sourceUrl?: string | null;
  isPinned: boolean;
  createdAt?: string | Date;
}

interface NoticeBoardProps {
  notices: NoticeItem[];
}

type NoticeSourceTab = "GURUGRAM_UNIVERSITY" | "GITM";

// Helper to determine if a notice is under 7 days old
function isUnderSevenDays(dateInput: string | Date): boolean {
  const d = new Date(dateInput);
  const diffTime = Math.abs(Date.now() - d.getTime());
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays <= 7;
}

export function NoticeBoard({ notices }: NoticeBoardProps) {
  const [activeSourceTab, setActiveSourceTab] =
    React.useState<NoticeSourceTab>("GURUGRAM_UNIVERSITY");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("ALL");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  // Filter notices based on Source Tab, Category, and Search Query
  const filteredNotices = React.useMemo(() => {
    return notices.filter((item) => {
      // 1. Source Tab
      if (item.source !== activeSourceTab) {
        return false;
      }

      // 2. Category
      if (selectedCategory !== "ALL" && item.category !== selectedCategory) {
        return false;
      }

      // 3. Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        return matchesTitle || matchesCategory;
      }

      return true;
    });
  }, [notices, activeSourceTab, selectedCategory, searchQuery]);

  // Counts for each source tab
  const guCount = notices.filter((n) => n.source === "GURUGRAM_UNIVERSITY").length;
  const gitmCount = notices.filter((n) => n.source === "GITM").length;

  return (
    <section
      id="notices"
      className="py-16 sm:py-24 border-b border-border bg-background scroll-mt-14"
      aria-labelledby="notices-board-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-2">
              <FileText className="h-3.5 w-3.5" />
              <span>Official Circulars & Notifications</span>
            </div>

            <h2
              id="notices-board-heading"
              className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground"
            >
              Live Circulars & Noticeboard
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl leading-relaxed">
              Stay synchronized with official Gurugram University examination schedules, result circulars, Samarth eGov portals, and GITM campus announcements.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Automated Live Sync Active</span>
          </div>
        </div>

        {/* 1. SPLIT-VIEW SOURCE TABS */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Main 2 Tabs */}
          <div
            className="flex p-1.5 rounded-xl border border-border bg-muted/50 max-w-md w-full"
            role="tablist"
            aria-label="Filter notices by source"
          >
            <button
              role="tab"
              aria-selected={activeSourceTab === "GURUGRAM_UNIVERSITY"}
              onClick={() => setActiveSourceTab("GURUGRAM_UNIVERSITY")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                activeSourceTab === "GURUGRAM_UNIVERSITY"
                  ? "bg-card text-foreground shadow-xs border border-border/80"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <School className="h-4 w-4 text-primary" />
              <span>Gurugram University</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-primary/10 text-primary">
                {guCount}
              </span>
            </button>

            <button
              role="tab"
              aria-selected={activeSourceTab === "GITM"}
              onClick={() => setActiveSourceTab("GITM")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                activeSourceTab === "GITM"
                  ? "bg-card text-foreground shadow-xs border border-border/80"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Building2 className="h-4 w-4 text-primary" />
              <span>GITM Campus</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-primary/10 text-primary">
                {gitmCount}
              </span>
            </button>
          </div>

          {/* Search + Category Filter Dropdown */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search circulars..."
                className="pl-9 h-9 text-xs bg-card border-border rounded-lg"
                aria-label="Search circulars"
              />
            </div>

            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-9 rounded-lg border border-input bg-card px-3 text-xs font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-xs w-full sm:w-auto"
              aria-label="Filter notices by category"
            >
              <option value="ALL">All Categories</option>
              <option value="EXAM">Examination & Results</option>
              <option value="ADMISSION">Admissions & Counseling</option>
              <option value="ACADEMIC">Academic & Samarth</option>
              <option value="HOLIDAY">Holidays & Closures</option>
              <option value="GENERAL">General Circulars</option>
            </select>
          </div>
        </div>

        {/* 2. NOTICES FEED GRID */}
        {filteredNotices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotices.map((notice) => {
              const publishDateObj = new Date(notice.publishDate);
              const isRecent = isUnderSevenDays(publishDateObj);

              return (
                <Card
                  key={notice.id}
                  className={`flex flex-col justify-between border bg-card hover:border-primary/50 transition-all duration-200 hover:shadow-md rounded-xl ${
                    notice.isPinned
                      ? "border-primary/40 bg-gradient-to-b from-primary/[0.03] to-card ring-1 ring-primary/20"
                      : "border-border"
                  }`}
                >
                  <CardHeader className="p-5 pb-3">
                    {/* Top Row: Category + Pinned + "NEW" */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <Badge
                          variant={
                            notice.category === "EXAM"
                              ? "default"
                              : notice.category === "ADMISSION"
                              ? "success"
                              : notice.category === "HOLIDAY"
                              ? "warning"
                              : "secondary"
                          }
                          className="text-[10px] font-bold tracking-wider"
                        >
                          {notice.category}
                        </Badge>

                        {isRecent && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                            <Sparkles className="h-2.5 w-2.5" />
                            NEW
                          </span>
                        )}
                      </div>

                      {notice.isPinned && (
                        <span className="flex items-center text-amber-500 text-[11px] font-bold gap-1 bg-amber-500/10 px-2 py-0.5 rounded-full">
                          <Pin className="h-3 w-3 fill-amber-500" />
                          Pinned
                        </span>
                      )}
                    </div>

                    {/* Notice Title */}
                    <CardTitle className="text-base font-bold text-foreground leading-snug line-clamp-3">
                      {notice.title}
                    </CardTitle>

                    {/* Publication Date Badge */}
                    <CardDescription className="text-xs flex items-center gap-1.5 pt-2 text-muted-foreground font-medium">
                      <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span>
                        Published:{" "}
                        {publishDateObj.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </CardDescription>
                  </CardHeader>

                  {/* Card Actions: PDF Download & External Link */}
                  <CardContent className="p-5 pt-0 mt-auto flex items-center justify-between gap-2 border-t border-border/50 pt-3">
                    {notice.pdfUrl ? (
                      <a
                        href={notice.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 hover:underline"
                        aria-label={`Open PDF circular for ${notice.title} in a new tab`}
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download PDF</span>
                      </a>
                    ) : (
                      <span className="text-[11px] text-muted-foreground italic">
                        Text circular
                      </span>
                    )}

                    {notice.sourceUrl && (
                      <a
                        href={notice.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:underline ml-auto"
                        aria-label="View original portal link"
                      >
                        <span>Official Portal</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center max-w-lg mx-auto">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto mb-3">
              <Filter className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-foreground">No circulars found</h3>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              No notifications matched your current filter criteria in{" "}
              {activeSourceTab === "GURUGRAM_UNIVERSITY" ? "Gurugram University" : "GITM Campus"}.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory("ALL");
                setSearchQuery("");
              }}
              className="mt-4 font-semibold"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default NoticeBoard;
