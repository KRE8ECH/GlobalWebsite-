"use client";

import * as React from "react";
import {
  Clock,
  CalendarDays,
  FileDown,
  Building,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface AcademicScheduleItem {
  id: string;
  title: string;
  type: "HOLIDAY" | "ACADEMIC" | "EXAM";
  dateFormatted: string;
  month: string;
  day: string;
  description: string;
  isGazetted?: boolean;
}

const ACADEMIC_HOLIDAY_SCHEDULE: AcademicScheduleItem[] = [
  {
    id: "h1",
    title: "Haryana Day & Gurugram University Foundation Day",
    type: "HOLIDAY",
    dateFormatted: "Nov 01, 2026",
    month: "NOV",
    day: "01",
    description: "Official Gazetted Public Holiday observed across all Haryana university departments and affiliated colleges.",
    isGazetted: true,
  },
  {
    id: "h2",
    title: "Diwali & Govardhan Puja Academic Break",
    type: "HOLIDAY",
    dateFormatted: "Nov 08 - Nov 12, 2026",
    month: "NOV",
    day: "08",
    description: "University academic closure for the festival of Diwali and autumn cultural recess.",
    isGazetted: true,
  },
  {
    id: "h3",
    title: "Guru Nanak Dev Jayanti",
    type: "HOLIDAY",
    dateFormatted: "Nov 24, 2026",
    month: "NOV",
    day: "24",
    description: "Gazetted Public Holiday recognized by the Government of Haryana.",
    isGazetted: true,
  },
  {
    id: "a1",
    title: "Samarth Examination Portal Registration Deadline",
    type: "ACADEMIC",
    dateFormatted: "Dec 05, 2026",
    month: "DEC",
    day: "05",
    description: "Mandatory examination enrollment on Samarth eGov portal for all B.Tech, MBA, MCA, and B.Pharm candidates.",
  },
  {
    id: "e1",
    title: "Odd Semester Practical & Laboratory Evaluations",
    type: "EXAM",
    dateFormatted: "Dec 15 - Dec 22, 2026",
    month: "DEC",
    day: "15",
    description: "University appointed external practical viva-voce and laboratory assessments across departments.",
  },
  {
    id: "e2",
    title: "Gurugram University Semester End Theory Examinations",
    type: "EXAM",
    dateFormatted: "Dec 28, 2026 - Jan 18, 2027",
    month: "EXAM",
    day: "28",
    description: "Centrally administered theory examinations conducted as per the Controller of Examinations official notification.",
  },
  {
    id: "a2",
    title: "Commencement of Even Semester Academic Sessions",
    type: "ACADEMIC",
    dateFormatted: "Feb 01, 2027",
    month: "FEB",
    day: "01",
    description: "Formal class commencement for all UG and PG semesters adhering to NEP 2020 credit framework.",
  },
  {
    id: "h4",
    title: "Republic Day",
    type: "HOLIDAY",
    dateFormatted: "Jan 26, 2027",
    month: "JAN",
    day: "26",
    description: "National Holiday and Republic Day Ceremonial Flag Hoisting at GITM Central Quadrangle.",
    isGazetted: true,
  },
];

export function HolidayCalendar() {
  const [filterType, setFilterType] = React.useState<"ALL" | "HOLIDAY" | "ACADEMIC" | "EXAM">("ALL");

  const filteredItems = React.useMemo(() => {
    if (filterType === "ALL") return ACADEMIC_HOLIDAY_SCHEDULE;
    return ACADEMIC_HOLIDAY_SCHEDULE.filter((item) => item.type === filterType);
  }, [filterType]);

  return (
    <section
      id="calendar"
      className="py-14 sm:py-20 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#0c1524] scroll-mt-14"
      aria-labelledby="calendar-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#881337] dark:text-amber-400 mb-1.5">
              <CalendarDays className="h-4 w-4" />
              <span>Institutional Almanac & University Datesheet</span>
            </div>

            <h2
              id="calendar-heading"
              className="font-editorial text-2xl sm:text-4xl font-extrabold text-[#0f2b48] dark:text-stone-100"
            >
              Academic Calendar & Gazetted Holidays
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1.5 max-w-2xl leading-relaxed">
              Official academic schedule for academic year 2026-27 detailing semester commencement, Samarth portal deadlines, examination dates, and Haryana state gazetted closures.
            </p>
          </div>

          <Button asChild variant="outline" size="sm" className="bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 font-bold text-xs uppercase tracking-wider rounded-sm shrink-0">
            <a
              href="https://gurugramuniversity.ac.in/Notice/academic-calendar-2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
            >
              <FileDown className="h-3.5 w-3.5 text-[#881337] dark:text-amber-400" />
              <span>Download Academic Calendar PDF</span>
            </a>
          </Button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6" role="group" aria-label="Filter calendar events">
          <button
            onClick={() => setFilterType("ALL")}
            className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
              filterType === "ALL"
                ? "bg-[#0f2b48] text-white shadow-2xs"
                : "bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:text-stone-900"
            }`}
          >
            All Milestones ({ACADEMIC_HOLIDAY_SCHEDULE.length})
          </button>
          <button
            onClick={() => setFilterType("HOLIDAY")}
            className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
              filterType === "HOLIDAY"
                ? "bg-[#0f2b48] text-white shadow-2xs"
                : "bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:text-stone-900"
            }`}
          >
            Gazetted Holidays ({ACADEMIC_HOLIDAY_SCHEDULE.filter((i) => i.type === "HOLIDAY").length})
          </button>
          <button
            onClick={() => setFilterType("EXAM")}
            className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
              filterType === "EXAM"
                ? "bg-[#0f2b48] text-white shadow-2xs"
                : "bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:text-stone-900"
            }`}
          >
            Examination Schedules ({ACADEMIC_HOLIDAY_SCHEDULE.filter((i) => i.type === "EXAM").length})
          </button>
          <button
            onClick={() => setFilterType("ACADEMIC")}
            className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
              filterType === "ACADEMIC"
                ? "bg-[#0f2b48] text-white shadow-2xs"
                : "bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:text-stone-900"
            }`}
          >
            Semester Milestones ({ACADEMIC_HOLIDAY_SCHEDULE.filter((i) => i.type === "ACADEMIC").length})
          </button>
        </div>

        {/* Calendar Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="flex items-start gap-4 p-4 rounded-md border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0f1c2e] hover:border-[#0f2b48] transition-colors shadow-2xs"
            >
              {/* Collegiate Date Stamp */}
              <div className="flex flex-col items-center justify-center h-14 w-14 rounded-sm bg-[#0f2b48] text-white border border-[#0b1e32] shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  {item.month}
                </span>
                <span className="font-editorial text-lg font-black leading-none mt-0.5">
                  {item.day}
                </span>
              </div>

              {/* Event Content */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded-xs border ${
                      item.type === "HOLIDAY"
                        ? "bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300"
                        : item.type === "EXAM"
                        ? "bg-red-50 text-red-800 border-red-300 dark:bg-red-950 dark:text-red-300"
                        : "bg-stone-100 text-stone-800 border-stone-300 dark:bg-stone-800 dark:text-stone-300"
                    }`}
                  >
                    {item.type}
                  </span>

                  {item.isGazetted && (
                    <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400">
                      • Haryana Gazetted
                    </span>
                  )}

                  <span className="text-[11px] text-stone-500 font-mono ml-auto flex items-center gap-1">
                    <Clock className="h-3 w-3 text-stone-400" />
                    {item.dateFormatted}
                  </span>
                </div>

                <h4 className="font-editorial text-sm font-bold text-stone-900 dark:text-stone-100 leading-snug">
                  {item.title}
                </h4>

                <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HolidayCalendar;
