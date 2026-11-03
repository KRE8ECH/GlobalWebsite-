"use client";

import * as React from "react";
import {
  Clock,
  CalendarDays,
  FileDown,
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
    description: "Gazetted State Holiday for all schools, colleges, and university departments across Haryana.",
    isGazetted: true,
  },
  {
    id: "h2",
    title: "Diwali & Govardhan Puja Break",
    type: "HOLIDAY",
    dateFormatted: "Nov 08 - Nov 12, 2026",
    month: "NOV",
    day: "08",
    description: "University campus closed for auspicious Diwali festival and cultural break.",
    isGazetted: true,
  },
  {
    id: "h3",
    title: "Guru Nanak Dev Jayanti",
    type: "HOLIDAY",
    dateFormatted: "Nov 24, 2026",
    month: "NOV",
    day: "24",
    description: "Official gazetted public holiday in Haryana and Delhi-NCR.",
    isGazetted: true,
  },
  {
    id: "a1",
    title: "Samarth Examination Portal Registration Deadline",
    type: "ACADEMIC",
    dateFormatted: "Dec 05, 2026",
    month: "DEC",
    day: "05",
    description: "Mandatory examination form submission on Samarth portal for all B.Tech, MBA, BCA, and B.Pharm batches.",
  },
  {
    id: "e1",
    title: "Odd Semester Practical & Viva-Voce Examinations",
    type: "EXAM",
    dateFormatted: "Dec 15 - Dec 22, 2026",
    month: "DEC",
    day: "15",
    description: "Internal and external practical evaluations in computer, electrical, and pharmaceutical laboratories.",
  },
  {
    id: "e2",
    title: "Gurugram University Semester End Theory Examinations",
    type: "EXAM",
    dateFormatted: "Dec 28, 2026 - Jan 18, 2027",
    month: "EXAM",
    day: "28",
    description: "University wide written examinations conducted as per the official Controller of Examinations datesheet.",
  },
  {
    id: "a2",
    title: "Commencement of Even Semester Classes (Session 2026-27)",
    type: "ACADEMIC",
    dateFormatted: "Feb 01, 2027",
    month: "FEB",
    day: "01",
    description: "Classes commence for all undergraduate and postgraduate semesters adhering to NEP 2020 schedule.",
  },
  {
    id: "h4",
    title: "Republic Day",
    type: "HOLIDAY",
    dateFormatted: "Jan 26, 2027",
    month: "JAN",
    day: "26",
    description: "National Holiday and Republic Day Flag Hoisting ceremony at GITM Central Lawn.",
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
      className="py-16 sm:py-24 border-b border-border bg-muted/20 scroll-mt-14"
      aria-labelledby="calendar-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-2">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>Official Academic Schedule</span>
            </div>

            <h2
              id="calendar-heading"
              className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground"
            >
              Academic Calendar & Gazetted Holidays
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl leading-relaxed">
              Official timeline of university breaks, semester commencement dates, Samarth deadlines, and Haryana gazetted closures.
            </p>
          </div>

          <Button asChild variant="outline" size="sm" className="bg-card border-border font-semibold text-xs">
            <a
              href="https://gurugramuniversity.ac.in/Notice/academic-calendar-2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
            >
              <FileDown className="h-4 w-4 text-primary" />
              <span>Download Official Calendar PDF</span>
            </a>
          </Button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8" role="group" aria-label="Filter calendar events">
          <button
            onClick={() => setFilterType("ALL")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${filterType === "ALL"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
          >
            All Milestones ({ACADEMIC_HOLIDAY_SCHEDULE.length})
          </button>
          <button
            onClick={() => setFilterType("HOLIDAY")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${filterType === "HOLIDAY"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
          >
            Gazetted Holidays ({ACADEMIC_HOLIDAY_SCHEDULE.filter((i) => i.type === "HOLIDAY").length})
          </button>
          <button
            onClick={() => setFilterType("EXAM")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${filterType === "EXAM"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
          >
            Examination Schedules ({ACADEMIC_HOLIDAY_SCHEDULE.filter((i) => i.type === "EXAM").length})
          </button>
          <button
            onClick={() => setFilterType("ACADEMIC")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${filterType === "ACADEMIC"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
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
              className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all hover:shadow-xs group"
            >
              {/* Date Chip */}
              <div className="flex flex-col items-center justify-center h-14 w-14 rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <span className="text-[10px] font-black uppercase tracking-wider">
                  {item.month}
                </span>
                <span className="text-xl font-extrabold leading-none mt-0.5">
                  {item.day}
                </span>
              </div>

              {/* Event Content */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    variant={
                      item.type === "HOLIDAY"
                        ? "warning"
                        : item.type === "EXAM"
                          ? "destructive"
                          : "default"
                    }
                    className="text-[10px] font-bold uppercase tracking-wider"
                  >
                    {item.type}
                  </Badge>

                  {item.isGazetted && (
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.2 rounded-full border border-amber-500/20">
                      Haryana Gazetted
                    </span>
                  )}

                  <span className="text-xs text-muted-foreground font-medium ml-auto flex items-center gap-1">
                    <Clock className="h-3 w-3 text-primary" />
                    {item.dateFormatted}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                  {item.title}
                </h4>

                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
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
