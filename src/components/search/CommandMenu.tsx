"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  Search,
  BookOpen,
  FileText,
  Building,
  GraduationCap,
  ExternalLink,
  PhoneCall,
  Calendar,
  Sparkles,
  ArrowRight,
  School,
  X,
} from "lucide-react";

interface CommandMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CommandMenu({
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: CommandMenuProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const router = useRouter();

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const setIsOpen = React.useCallback(
    (val: boolean) => {
      if (setControlledOpen) setControlledOpen(val);
      else setInternalOpen(val);
    },
    [setControlledOpen]
  );

  // Global Ctrl+K / Cmd+K keyboard shortcut listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  const runCommand = React.useCallback(
    (command: () => void) => {
      setIsOpen(false);
      command();
    },
    [setIsOpen]
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Global search command palette"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in-50"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-2xl rounded-2xl border border-border bg-card text-foreground shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 z-10">
        <Command
          className="w-full flex flex-col focus:outline-none"
          loop
          filter={(value, search) => {
            if (value.toLowerCase().includes(search.toLowerCase())) return 1;
            return 0;
          }}
        >
          {/* Search Input Box */}
          <div className="flex items-center border-b border-border px-4 py-3 gap-3">
            <Search className="h-5 w-5 text-muted-foreground shrink-0" />
            <Command.Input
              autoFocus
              placeholder="Type a program, notice, facility, or keyword to search..."
              className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Close search"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Search Results List */}
          <Command.List className="max-h-[60vh] overflow-y-auto p-2 focus:outline-none space-y-2">
            <Command.Empty className="py-10 text-center text-xs text-muted-foreground">
              No matching results found in the GITM directory.
            </Command.Empty>

            {/* GROUP 1: DEGREE PROGRAMS */}
            <Command.Group
              heading="Academic Degree Programs"
              className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-1.5"
            >
              <Command.Item
                value="B.Tech Computer Science Engineering CSE Software AI"
                onSelect={() =>
                  runCommand(() => {
                    router.push("#programs");
                  })
                }
                className="flex items-center justify-between rounded-xl p-2.5 text-xs font-semibold text-foreground hover:bg-accent cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg bg-blue-500/10 p-2 text-primary">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold block text-sm">B.Tech Computer Science & Engineering</span>
                    <span className="text-[10px] text-muted-foreground font-normal">
                      Engineering • 4 Years • 120 Seats • Gurugram University
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Command.Item>

              <Command.Item
                value="B.Tech Artificial Intelligence Data Science AI DS Machine Learning"
                onSelect={() =>
                  runCommand(() => {
                    router.push("#programs");
                  })
                }
                className="flex items-center justify-between rounded-xl p-2.5 text-xs font-semibold text-foreground hover:bg-accent cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-600 dark:text-indigo-400">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold block text-sm">B.Tech AI & Data Science</span>
                    <span className="text-[10px] text-muted-foreground font-normal">
                      Specialized • 4 Years • 60 Seats • High Package Recruiter Track
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Command.Item>

              <Command.Item
                value="MBA Master Business Administration Finance Marketing HR Analytics"
                onSelect={() =>
                  runCommand(() => {
                    router.push("#programs");
                  })
                }
                className="flex items-center justify-between rounded-xl p-2.5 text-xs font-semibold text-foreground hover:bg-accent cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold block text-sm">Master of Business Administration (MBA)</span>
                    <span className="text-[10px] text-muted-foreground font-normal">
                      Management • 2 Years • Dual Specializations • Corporate CRC
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Command.Item>

              <Command.Item
                value="BCA Bachelor Computer Applications Web Development Coding"
                onSelect={() =>
                  runCommand(() => {
                    router.push("#programs");
                  })
                }
                className="flex items-center justify-between rounded-xl p-2.5 text-xs font-semibold text-foreground hover:bg-accent cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg bg-sky-500/10 p-2 text-sky-600 dark:text-sky-400">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold block text-sm">Bachelor of Computer Applications (BCA)</span>
                    <span className="text-[10px] text-muted-foreground font-normal">
                      Computer Applications • 3 Years • Full Stack Computing
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Command.Item>

              <Command.Item
                value="B.Pharm Bachelor Pharmacy Clinical Pharmacology Medicine"
                onSelect={() =>
                  runCommand(() => {
                    router.push("#programs");
                  })
                }
                className="flex items-center justify-between rounded-xl p-2.5 text-xs font-semibold text-foreground hover:bg-accent cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold block text-sm">Bachelor of Pharmacy (B.Pharm)</span>
                    <span className="text-[10px] text-muted-foreground font-normal">
                      Pharmacy • 4 Years • PCI Approved • Drug Synthesis Labs
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Command.Item>
            </Command.Group>

            {/* GROUP 2: NOTICES & CIRCULARS */}
            <Command.Group
              heading="Notices & University Circulars"
              className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-1.5 mt-2"
            >
              <Command.Item
                value="Gurugram University Semester End Examination Date Sheet Circular"
                onSelect={() =>
                  runCommand(() => {
                    router.push("#notices");
                  })
                }
                className="flex items-center justify-between rounded-xl p-2.5 text-xs font-semibold text-foreground hover:bg-accent cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold block text-sm">Semester End Examination Schedule</span>
                    <span className="text-[10px] text-muted-foreground font-normal">
                      Gurugram University Official Notification • Exam Date Sheet
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Command.Item>

              <Command.Item
                value="Samarth eGov Portal Registration Mandatory Batch 2026"
                onSelect={() =>
                  runCommand(() => {
                    router.push("#notices");
                  })
                }
                className="flex items-center justify-between rounded-xl p-2.5 text-xs font-semibold text-foreground hover:bg-accent cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold block text-sm">Samarth eGov Portal Registration</span>
                    <span className="text-[10px] text-muted-foreground font-normal">
                      Mandatory registration circular for affiliated university students
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Command.Item>

              <Command.Item
                value="Haryana Gazetted Holidays and University Academic Calendar"
                onSelect={() =>
                  runCommand(() => {
                    router.push("#calendar");
                  })
                }
                className="flex items-center justify-between rounded-xl p-2.5 text-xs font-semibold text-foreground hover:bg-accent cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold block text-sm">Haryana Gazetted Holidays & Breaks</span>
                    <span className="text-[10px] text-muted-foreground font-normal">
                      Official semester break schedule and gazetted holidays
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Command.Item>
            </Command.Group>

            {/* GROUP 3: QUICK LINKS & PORTALS */}
            <Command.Group
              heading="Quick Links & Portals"
              className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-1.5 mt-2"
            >
              <Command.Item
                value="Apply Online Admission Inquiry Form 2026-27"
                onSelect={() =>
                  runCommand(() => {
                    router.push("#inquiry");
                  })
                }
                className="flex items-center justify-between rounded-xl p-2.5 text-xs font-semibold text-foreground hover:bg-accent cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold block text-sm">Online Admission Inquiry 2026-27</span>
                    <span className="text-[10px] text-muted-foreground font-normal">
                      Apply directly to GITM Admissions Office
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Command.Item>

              <Command.Item
                value="Student ERP Portal Attendance Grades Fee Results"
                onSelect={() =>
                  runCommand(() => {
                    window.open("https://erp.gitmgurgaon.com/student", "_blank");
                  })
                }
                className="flex items-center justify-between rounded-xl p-2.5 text-xs font-semibold text-foreground hover:bg-accent cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg bg-blue-500/10 p-2 text-primary">
                    <Building className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold block text-sm">Student ERP Portal</span>
                    <span className="text-[10px] text-muted-foreground font-normal">
                      Attendance records, grades, and semester fees
                    </span>
                  </div>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
              </Command.Item>

              <Command.Item
                value="Gurugram University Official Website Portal"
                onSelect={() =>
                  runCommand(() => {
                    window.open("https://gurugramuniversity.ac.in", "_blank");
                  })
                }
                className="flex items-center justify-between rounded-xl p-2.5 text-xs font-semibold text-foreground hover:bg-accent cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg bg-blue-500/10 p-2 text-primary">
                    <School className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold block text-sm">Gurugram University Portal</span>
                    <span className="text-[10px] text-muted-foreground font-normal">
                      Statutory university website and circulars
                    </span>
                  </div>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
              </Command.Item>

              <Command.Item
                value="Admission Helpline Call Phone 9555100100"
                onSelect={() =>
                  runCommand(() => {
                    window.location.href = "tel:+919555100100";
                  })
                }
                className="flex items-center justify-between rounded-xl p-2.5 text-xs font-semibold text-foreground hover:bg-accent cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400">
                    <PhoneCall className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold block text-sm">Call Admission Helpline</span>
                    <span className="text-[10px] text-muted-foreground font-normal">
                      +91-9555 100 100 • 9:00 AM - 6:00 PM (Mon-Sat)
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Command.Item>
            </Command.Group>
          </Command.List>

          {/* Footer note with shortcut help */}
          <div className="border-t border-border px-4 py-2.5 bg-muted/30 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Use ↑ ↓ to navigate, Enter to select, Esc to close</span>
            <div className="flex items-center gap-1 font-mono text-[10px] bg-muted px-1.5 py-0.5 rounded border border-border">
              <span>Esc</span>
            </div>
          </div>
        </Command>
      </div>
    </div>
  );
}

export default CommandMenu;
