"use client";

import * as React from "react";
import { Search, FileText, ExternalLink, Pin, ChevronDown } from "lucide-react";
import type { Notice, NoticeCategory } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const categoryLabels: Record<NoticeCategory, string> = {
  EXAM: "Examination",
  ADMISSION: "Admission",
  ACADEMIC: "Academic",
  HOLIDAY: "Holiday",
  GENERAL: "General",
};

const categoryTone: Record<NoticeCategory, "crimson" | "navy" | "gold" | "success" | "neutral"> = {
  ADMISSION: "crimson",
  EXAM: "navy",
  ACADEMIC: "neutral",
  HOLIDAY: "success",
  GENERAL: "gold",
};

type Filter = "ALL" | NoticeCategory;

/**
 * Notice board. Rendered from server-supplied data and filtered client-side, so
 * the full list is in the HTML for search engines and for users without JS
 * (they simply see all notices with the filter buttons inert).
 */
export function NoticeBoard({ notices }: { notices: Notice[] }) {
  const [filter, setFilter] = React.useState<Filter>("ALL");
  const [query, setQuery] = React.useState("");
  const [expanded, setExpanded] = React.useState(false);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return notices.filter((notice) => {
      if (filter !== "ALL" && notice.category !== filter) return false;
      if (q && !notice.title.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [notices, filter, query]);

  const visible = expanded ? filtered : filtered.slice(0, 6);
  const counts = React.useMemo(() => {
    const map = new Map<Filter, number>([["ALL", notices.length]]);
    for (const notice of notices) {
      map.set(notice.category, (map.get(notice.category) ?? 0) + 1);
    }
    return map;
  }, [notices]);

  const filters: Filter[] = ["ALL", "ADMISSION", "EXAM", "ACADEMIC", "HOLIDAY", "GENERAL"];

  return (
    <section
      id="notices"
      aria-labelledby="notices-heading"
      className="border-b border-stone-200 bg-paper py-14 sm:py-20"
    >
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wide text-crimson">
              Notices &amp; circulars
            </p>
            <h2
              id="notices-heading"
              className="mt-2 font-editorial text-2xl font-extrabold text-navy sm:text-4xl"
            >
              Official notifications
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              Examination schedules, admission circulars and Gurugram University notifications.
              When the institute&rsquo;s live feed is connected, these records update
              automatically.
            </p>
          </div>

          <div className="w-full md:w-72">
            <label htmlFor="notice-search" className="sr-only">
              Search notices
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
                aria-hidden="true"
              />
              <input
                id="notice-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search circulars…"
                className="h-10 w-full rounded-sm border border-stone-300 bg-white pl-9 pr-3 text-sm text-navy placeholder:text-stone-400 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap gap-1.5" role="group" aria-label="Filter notices by category">
          {filters.map((option) => {
            const isActive = filter === option;
            const count = counts.get(option) ?? 0;
            if (option !== "ALL" && count === 0) return null;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                aria-pressed={isActive}
                className={`rounded-sm border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide transition-colors ${
                  isActive
                    ? "border-navy bg-navy text-white"
                    : "border-stone-300 bg-white text-stone-600 hover:border-navy/40 hover:text-navy"
                }`}
              >
                {option === "ALL" ? "All notices" : categoryLabels[option as NoticeCategory]}
                <span className="ml-1.5 font-mono text-[10px] opacity-70">{count}</span>
              </button>
            );
          })}
        </div>

        {/* List */}
        <div className="mt-5 overflow-hidden rounded-md border border-stone-200 bg-white">
          {visible.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-stone-500">
              No notices match “{query}”.
            </p>
          ) : (
            <ul className="divide-y divide-stone-100">
              {visible.map((notice) => (
                <li key={notice.id} className="flex gap-3 px-4 py-3.5 hover:bg-stone-50 sm:px-5">
                  <div className="w-16 shrink-0 pt-0.5 text-center sm:w-20">
                    <p className="font-mono text-[11px] font-bold uppercase text-navy">
                      {formatDate(notice.publishDate)}
                    </p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-wide text-stone-400">
                      {notice.source === "GITM" ? "GITM" : "Gurugram Univ."}
                    </p>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="flex flex-wrap items-center gap-1.5">
                      <Badge tone={categoryTone[notice.category]}>
                        {categoryLabels[notice.category]}
                      </Badge>
                      {notice.isPinned && (
                        <Badge tone="crimson" className="gap-1">
                          <Pin className="h-2.5 w-2.5" aria-hidden="true" />
                          Pinned
                        </Badge>
                      )}
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-snug text-navy">
                      {notice.title}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-start gap-1.5">
                    {notice.pdfUrl && (
                      <a
                        href={notice.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-sm border border-stone-300 px-2 py-1 text-[10px] font-bold text-navy hover:border-crimson hover:text-crimson"
                      >
                        <FileText className="h-3 w-3" aria-hidden="true" />
                        PDF
                        <span className="sr-only">— {notice.title}</span>
                      </a>
                    )}
                    {notice.sourceUrl && (
                      <a
                        href={notice.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-sm p-1.5 text-stone-400 hover:text-navy"
                        aria-label={`Source: ${notice.title}`}
                      >
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {filtered.length > 6 && (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-crimson"
            aria-expanded={expanded}
          >
            {expanded ? "Show fewer notices" : `Show all ${filtered.length} notices`}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
        )}

        <p className="mt-4 text-[11px] leading-relaxed text-stone-500">
          Notices are published for information. Where a PDF and a summary disagree, the
          signed circular issued by the institute or Gurugram University prevails.
        </p>
      </div>
    </section>
  );
}
