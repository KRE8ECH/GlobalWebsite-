"use client";

import * as React from "react";
import {
  FileText,
  Search,
  Calendar,
  ExternalLink,
  Download,
  Pin,
  School,
  Building2,
  Filter,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

  const guCount = notices.filter((n) => n.source === "GURUGRAM_UNIVERSITY").length;
  const gitmCount = notices.filter((n) => n.source === "GITM").length;

  return (
    <section
      id="notices"
      className="py-14 sm:py-20 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-[#080f1a] scroll-mt-14"
      aria-labelledby="notices-board-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#881337] dark:text-amber-400 mb-1.5">
              <FileText className="h-4 w-4" />
              <span>Official Regulatory Circulars & Notifications</span>
            </div>

            <h2
              id="notices-board-heading"
              className="font-editorial text-2xl sm:text-4xl font-extrabold text-[#0f2b48] dark:text-stone-100"
            >
              Live Circulars & Noticeboard
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1.5 max-w-2xl leading-relaxed">
              Official circulars synchronized directly from Gurugram University (Controller of Examinations, Samarth eGov Portal) and GITM Campus Dean of Academic Affairs.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-sm border border-emerald-300 dark:border-emerald-800 shrink-0 shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0" />
            <span>Automated Live Sync Active</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6">
          {/* Official Toggle Tabs: Gurugram University vs GITM Campus */}
          <div
            className="flex rounded-md border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-900 p-1 max-w-md w-full"
            role="tablist"
            aria-label="Filter notices by source"
          >
            <button
              role="tab"
              aria-selected={activeSourceTab === "GURUGRAM_UNIVERSITY"}
              onClick={() => setActiveSourceTab("GURUGRAM_UNIVERSITY")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                activeSourceTab === "GURUGRAM_UNIVERSITY"
                  ? "bg-[#0f2b48] text-white shadow-xs"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              <School className="h-3.5 w-3.5" />
              <span>Gurugram University</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-xs ${
                activeSourceTab === "GURUGRAM_UNIVERSITY" ? "bg-white/20 text-white" : "bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
              }`}>
                {guCount}
              </span>
            </button>

            <button
              role="tab"
              aria-selected={activeSourceTab === "GITM"}
              onClick={() => setActiveSourceTab("GITM")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                activeSourceTab === "GITM"
                  ? "bg-[#0f2b48] text-white shadow-xs"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              <Building2 className="h-3.5 w-3.5" />
              <span>GITM Campus</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-xs ${
                activeSourceTab === "GITM" ? "bg-white/20 text-white" : "bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
              }`}>
                {gitmCount}
              </span>
            </button>
          </div>

          {/* Search + Category Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search circular title or keyword..."
                className="pl-9 h-9 text-xs bg-stone-50 dark:bg-stone-900 border-stone-300 dark:border-stone-700 rounded-md"
                aria-label="Search circulars"
              />
            </div>

            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-9 rounded-md border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 px-3 text-xs font-bold text-stone-800 dark:text-stone-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary shadow-2xs w-full sm:w-auto"
              aria-label="Filter notices by category"
            >
              <option value="ALL">All Circular Categories</option>
              <option value="EXAM">Examination & Results</option>
              <option value="ADMISSION">Admissions & Counseling</option>
              <option value="ACADEMIC">Academic & Samarth Portal</option>
              <option value="HOLIDAY">Holidays & Closures</option>
              <option value="GENERAL">General Administrative</option>
            </select>
          </div>
        </div>

        {/* 2. TABULAR OFFICIAL NOTICEBOARD */}
        {filteredNotices.length > 0 ? (
          <div className="rounded-md border border-stone-300 dark:border-stone-800 overflow-hidden shadow-xs bg-white dark:bg-[#0f1c2e]">
            {/* Desktop Table View */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#0f2b48] text-white border-b border-[#0b1e32]">
                    <th scope="col" className="py-3 px-4 font-bold uppercase tracking-wider w-32">
                      Date
                    </th>
                    <th scope="col" className="py-3 px-4 font-bold uppercase tracking-wider w-36">
                      Category
                    </th>
                    <th scope="col" className="py-3 px-4 font-bold uppercase tracking-wider">
                      Subject / Notification Title
                    </th>
                    <th scope="col" className="py-3 px-4 font-bold uppercase tracking-wider text-right w-44">
                      Official Document
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                  {filteredNotices.map((notice) => {
                    const publishDateObj = new Date(notice.publishDate);
                    const isRecent = isUnderSevenDays(publishDateObj);

                    return (
                      <tr
                        key={notice.id}
                        className={`hover:bg-stone-50 dark:hover:bg-stone-900/60 transition-colors ${
                          notice.isPinned
                            ? "bg-amber-50/40 dark:bg-amber-950/20 border-l-4 border-l-[#b45309]"
                            : ""
                        }`}
                      >
                        {/* Date Column */}
                        <td className="py-3.5 px-4 font-mono text-stone-700 dark:text-stone-300 whitespace-nowrap align-top">
                          <span className="font-bold">
                            {publishDateObj.toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </td>

                        {/* Category Column */}
                        <td className="py-3.5 px-4 align-top whitespace-nowrap">
                          <div className="flex flex-col gap-1 items-start">
                            <span
                              className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-xs border ${
                                notice.category === "EXAM"
                                  ? "bg-red-50 text-red-800 border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-900"
                                  : notice.category === "ADMISSION"
                                  ? "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-900"
                                  : notice.category === "HOLIDAY"
                                  ? "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-900"
                                  : "bg-stone-100 text-stone-800 border-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700"
                              }`}
                            >
                              {notice.category}
                            </span>

                            {notice.isPinned && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 dark:text-amber-400">
                                <Pin className="h-2.5 w-2.5 fill-amber-600" />
                                Pinned
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Subject Title Column */}
                        <td className="py-3.5 px-4 align-top">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-stone-900 dark:text-stone-100 text-sm leading-snug">
                                {notice.title}
                              </span>

                              {isRecent && (
                                <span className="inline-block text-[10px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded-xs bg-[#881337] text-white">
                                  NEW
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-3 text-[11px] text-stone-500">
                              <span>
                                Source:{" "}
                                {notice.source === "GURUGRAM_UNIVERSITY"
                                  ? "Gurugram University, Sector 51, Gurugram"
                                  : "GITM Campus Academic Office"}
                              </span>
                              {notice.sourceUrl && (
                                <a
                                  href={notice.sourceUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-stone-500 hover:text-[#0f2b48] dark:hover:text-amber-400"
                                >
                                  <span>Portal Entry</span>
                                  <ExternalLink className="h-2.5 w-2.5" />
                                </a>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* PDF / Document Column */}
                        <td className="py-3.5 px-4 text-right align-top whitespace-nowrap">
                          {notice.pdfUrl ? (
                            <a
                              href={notice.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-sm border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 px-3 py-1.5 font-bold text-xs text-[#0f2b48] dark:text-stone-200 hover:bg-[#0f2b48] hover:text-white dark:hover:bg-amber-500 dark:hover:text-stone-950 transition-colors shadow-2xs"
                              aria-label={`Download PDF circular for ${notice.title} in a new tab`}
                            >
                              <Download className="h-3.5 w-3.5 text-[#881337] group-hover:text-white shrink-0" />
                              <span>Download PDF</span>
                            </a>
                          ) : (
                            <span className="text-[11px] text-stone-400 italic">
                              Circular on record
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer with Official Record Notice */}
            <div className="bg-stone-50 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-stone-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                <span>Showing <strong>{filteredNotices.length}</strong> authenticated records verified against Gurugram University notification server.</span>
              </span>
              <a
                href="https://gurugramuniversity.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#0f2b48] dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>gurugramuniversity.ac.in</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ) : (
          /* Empty Search State */
          <div className="rounded-md border border-dashed border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 p-10 text-center max-w-lg mx-auto">
            <Filter className="h-8 w-8 text-stone-400 mx-auto mb-2" />
            <h3 className="font-editorial text-base font-bold text-stone-900 dark:text-stone-100">
              No Circulars Found
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              No published notifications matched &quot;{searchQuery}&quot; under the selected category.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory("ALL");
                setSearchQuery("");
              }}
              className="mt-4 font-bold text-xs"
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
