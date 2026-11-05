"use client";

import * as React from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  ExternalLink,
  UserCheck,
  Building,
  Mail,
  ArrowRight,
  Search,
  Bell,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { CommandMenu } from "@/components/search/CommandMenu";
import { InquiryModal } from "@/components/admissions/InquiryModal";

interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

const MAIN_NAV_ITEMS: NavItem[] = [
  { label: "Programs", href: "#programs" },
  { label: "Admissions 2026-27", href: "#inquiry", badge: "Open" },
  { label: "Live University Notices", href: "#notices", badge: "Sync" },
  { label: "Placements", href: "#placements" },
  { label: "Academic Calendar", href: "#calendar" },
  { label: "Campus & Tour", href: "#campus-life", badge: "Video" },
  { label: "About GITM", href: "#about" },
];

const ERP_PORTALS = [
  {
    title: "Student ERP Portal",
    description: "Attendance, marks, examination forms & fee receipts",
    href: "https://erp.gitmgurgaon.com/student",
    icon: UserCheck,
  },
  {
    title: "Staff & Faculty ERP",
    description: "Faculty management, academic lesson plans & LMS",
    href: "https://erp.gitmgurgaon.com/staff",
    icon: Building,
  },
  {
    title: "Institutional Webmail",
    description: "Official @gitm.ac.in cloud email communication",
    href: "https://mail.google.com/a/gitm.ac.in",
    icon: Mail,
  },
];

const BREAKING_NOTICES = [
  "Gurugram University Semester End Examination Schedule 2026-27 Announced",
  "Samarth eGov Portal Examination Form Submission Window Open for Regular & Re-appear Batches",
  "Admissions Open for B.Tech (CSE, AI & Data Science), MBA, MCA, and B.Pharm for Session 2026-27",
  "Annual NEP 2020 Academic Calendar & Gazetted Haryana State Holidays Published",
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [erpOpen, setErpOpen] = React.useState(false);
  const [commandOpen, setCommandOpen] = React.useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = React.useState(false);

  const erpDropdownRef = React.useRef<HTMLDivElement>(null);
  const erpButtonRef = React.useRef<HTMLButtonElement>(null);
  const mobileDrawerRef = React.useRef<HTMLDivElement>(null);
  const hamburgerButtonRef = React.useRef<HTMLButtonElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  // Handle outside clicks for ERP dropdown
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        erpDropdownRef.current &&
        !erpDropdownRef.current.contains(event.target as Node)
      ) {
        setErpOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard events (Escape to close dropdown / drawer)
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (erpOpen) {
          setErpOpen(false);
          erpButtonRef.current?.focus();
        }
        if (mobileOpen) {
          setMobileOpen(false);
          hamburgerButtonRef.current?.focus();
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [erpOpen, mobileOpen]);

  // Focus trap for mobile drawer
  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();

      const drawer = mobileDrawerRef.current;
      if (!drawer) return;

      const focusableElements = drawer.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstEl = focusableElements[0];
      const lastEl = focusableElements[focusableElements.length - 1];

      function trapFocus(e: KeyboardEvent) {
        if (e.key !== "Tab") return;

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl?.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl?.focus();
          }
        }
      }

      drawer.addEventListener("keydown", trapFocus);
      return () => {
        document.body.style.overflow = "";
        drawer.removeEventListener("keydown", trapFocus);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full shadow-xs">
        {/* 1. TOP UTILITY STRIP (Institutional Governance & Helpline) */}
        <div className="bg-[#0b1e32] text-stone-200 text-xs py-1 px-4 border-b border-[#132c49]">
          <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
            {/* Left: Statutory Regulatory Approvals */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs">
              <span className="inline-flex items-center gap-1.5 font-semibold text-amber-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                Gurugram University Affiliated
              </span>
              <span className="text-stone-500 hidden sm:inline">|</span>
              <span className="text-stone-300 hidden md:inline">
                Approved by AICTE & PCI, New Delhi • DTE Haryana Institute Code: 074
              </span>
            </div>

            {/* Right: Helpline & ERP Portals */}
            <div className="flex items-center gap-4 text-[11px] sm:text-xs ml-auto">
              <a
                href="tel:+919555100100"
                className="flex items-center gap-1.5 font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                aria-label="Call Admission Helpline at +91-9555 100 100"
              >
                <Phone className="h-3 w-3" />
                <span>Admissions Helpline: +91-9555 100 100</span>
              </a>

              <span className="text-stone-600 hidden sm:inline">|</span>

              {/* ERP Portals Dropdown */}
              <div className="relative" ref={erpDropdownRef}>
                <button
                  ref={erpButtonRef}
                  onClick={() => setErpOpen(!erpOpen)}
                  aria-expanded={erpOpen}
                  aria-haspopup="true"
                  aria-label="ERP Portals Menu"
                  className="flex items-center gap-1 text-stone-200 hover:text-white font-medium focus:outline-none focus:ring-1 focus:ring-amber-400 rounded px-1.5 py-0.5 bg-white/5 hover:bg-white/10"
                >
                  <UserCheck className="h-3 w-3 text-amber-400" />
                  <span>ERP Portals</span>
                  <ChevronDown
                    className={`h-3 w-3 transition-transform duration-200 ${
                      erpOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {erpOpen && (
                  <div
                    role="menu"
                    aria-label="ERP and Portal Links"
                    className="absolute right-0 mt-2 w-72 rounded-md border border-stone-200 bg-white p-2 text-stone-900 shadow-xl ring-1 ring-black/10 z-50 animate-in fade-in-50 zoom-in-95"
                  >
                    <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-500 border-b border-stone-200">
                      College Management Portals
                    </div>
                    {ERP_PORTALS.map((portal) => {
                      const Icon = portal.icon;
                      return (
                        <a
                          key={portal.title}
                          href={portal.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          role="menuitem"
                          onClick={() => setErpOpen(false)}
                          className="flex items-start gap-2.5 rounded-sm p-2 hover:bg-stone-100 transition-colors group mt-1"
                        >
                          <div className="rounded bg-[#0f2b48]/10 p-1.5 text-[#0f2b48] group-hover:bg-[#0f2b48] group-hover:text-white transition-colors shrink-0">
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-stone-900 flex items-center justify-between">
                              <span>{portal.title}</span>
                              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-stone-400" />
                            </div>
                            <p className="text-[10px] text-stone-600 line-clamp-1">
                              {portal.description}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2. OFFICIAL INSTITUTIONAL BRAND HEADER */}
        <div className="bg-white dark:bg-[#0f1c2e] border-b border-stone-200 dark:border-stone-800 py-3 px-4 sm:px-6">
          <div className="container mx-auto flex items-center justify-between gap-4">
            {/* Official College Crest & Typography */}
            <Link
              href="/"
              className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded p-1"
              aria-label="GITM Gurgaon - Global Institute of Technology & Management Home"
            >
              {/* Institutional Emblem Crest */}
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-sm bg-white p-1 border border-stone-200 shadow-2xs shrink-0 overflow-hidden">
                <img
                  src="/images/official/logo/logo_1_logo.png"
                  alt="Global Institute of Technology & Management Official Crest"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-editorial text-lg sm:text-2xl font-black tracking-tight text-[#0f2b48] dark:text-stone-100 leading-tight">
                    GITM GURGAON
                  </span>
                  <span className="hidden sm:inline-block border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 px-1.5 py-0.2 text-[10px] font-bold text-stone-700 dark:text-stone-300 rounded-sm">
                    ESTD. 2008
                  </span>
                </div>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#881337] dark:text-amber-400 line-clamp-1">
                  Global Institute of Technology & Management
                </span>
                <span className="text-[10px] sm:text-[11px] text-stone-600 dark:text-stone-400 flex items-center gap-1 line-clamp-1">
                  <MapPin className="h-3 w-3 text-stone-400 shrink-0" />
                  Farrukhnagar, Gurugram (Delhi-NCR) • Affiliated to Gurugram University
                </span>
              </div>
            </Link>

            {/* Right Action Icons: Search + Theme + Apply CTA */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Search Shortcut Button */}
              <button
                onClick={() => setCommandOpen(true)}
                className="flex items-center gap-2 rounded-md border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 px-2.5 py-1.5 text-xs text-stone-600 dark:text-stone-300 hover:border-[#0f2b48] transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Open search command palette"
                title="Search courses, notifications, and contacts (Ctrl+K)"
              >
                <Search className="h-3.5 w-3.5 text-[#0f2b48] dark:text-amber-400" />
                <span className="hidden md:inline text-xs font-semibold">Search Portal</span>
                <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 px-1.5 font-mono text-[10px] font-bold text-stone-500">
                  Ctrl+K
                </kbd>
              </button>

              <ThemeToggle />

              {/* Official Academic CTA */}
              <Button
                onClick={() => setInquiryModalOpen(true)}
                size="sm"
                className="hidden sm:inline-flex bg-[#881337] hover:bg-[#70102e] text-white font-bold rounded-md shadow-sm px-4 py-2 text-xs uppercase tracking-wider"
              >
                <span>Apply Now 2026-27</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </Button>

              {/* Hamburger for Mobile */}
              <button
                ref={hamburgerButtonRef}
                onClick={() => setMobileOpen(true)}
                className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700"
                aria-label="Open mobile menu"
                aria-expanded={mobileOpen}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. MAIN NAVIGATION RIBBON (Deep Academic Navy) */}
        <div className="bg-[#0f2b48] text-white border-b border-[#0b1e32] hidden lg:block">
          <div className="container mx-auto px-4 sm:px-6">
            <nav
              className="flex items-center gap-1 xl:gap-2 text-xs font-bold uppercase tracking-wider py-1.5"
              aria-label="Main Academic Navigation"
            >
              {MAIN_NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-1.5 rounded-sm text-stone-200 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1.5 inline-block text-[9px] font-bold px-1.5 py-0.2 rounded-xs bg-[#881337] text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* 4. BREAKING NOTICE TICKER TAPE (Authentic Indian University Marquee) */}
        <div className="bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 text-xs py-1.5 px-4 overflow-hidden">
          <div className="container mx-auto flex items-center gap-3">
            {/* Urgent Badge */}
            <div className="flex items-center gap-1.5 bg-[#881337] text-white text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-xs shrink-0 shadow-xs">
              <Bell className="h-3 w-3 animate-pulse" />
              <span>URGENT NOTICES:</span>
            </div>

            {/* Marquee Content */}
            <div className="flex-1 overflow-hidden relative">
              <div className="animate-notice-ticker flex items-center gap-8 text-stone-800 dark:text-stone-200 font-medium text-xs">
                {BREAKING_NOTICES.concat(BREAKING_NOTICES).map((notice, idx) => (
                  <Link
                    key={idx}
                    href="#notices"
                    className="inline-flex items-center gap-2 hover:text-[#881337] dark:hover:text-amber-400 transition-colors shrink-0"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#b45309]" />
                    <span>{notice}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 5. ACCESSIBLE MOBILE DRAWER */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-50 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            ref={mobileDrawerRef}
          >
            <div
              className="fixed inset-0 bg-black/60 transition-opacity"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-stone-950 border-l border-stone-200 dark:border-stone-800 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-white p-1 border border-stone-200 shrink-0 overflow-hidden">
                      <img
                        src="/images/official/logo/logo_1_logo.png"
                        alt="GITM Official Crest"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="font-editorial font-bold text-sm text-[#0f2b48] dark:text-white block">
                        GITM GURGAON
                      </span>
                      <span className="text-[10px] text-stone-500 block">
                        Affiliated to Gurugram University
                      </span>
                    </div>
                  </div>

                  <button
                    ref={closeButtonRef}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800"
                    aria-label="Close navigation menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Mobile Search */}
                <div className="mt-4">
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setCommandOpen(true);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-md border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-xs text-stone-600 dark:text-stone-300"
                  >
                    <span className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-[#0f2b48] dark:text-amber-400" />
                      Search programs, circulars, ERP...
                    </span>
                    <span className="rounded bg-stone-200 dark:bg-stone-800 px-1.5 py-0.5 text-[10px] font-mono">
                      Ctrl+K
                    </span>
                  </button>
                </div>

                {/* Admission Helpline */}
                <div className="my-4 p-3 rounded-md bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-stone-500 block uppercase">
                      Admissions Helpline
                    </span>
                    <a
                      href="tel:+919555100100"
                      className="text-xs font-bold text-[#881337] dark:text-amber-400 flex items-center gap-1.5 mt-0.5"
                    >
                      <Phone className="h-3 w-3" />
                      +91-9555 100 100
                    </a>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-xs border border-emerald-300">
                    Active
                  </span>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="flex flex-col space-y-1 py-2">
                  {MAIN_NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between py-2 px-3 rounded-md text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    >
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-xs bg-[#881337] text-white">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </nav>

                {/* ERP Portals */}
                <div className="pt-4 border-t border-stone-200 dark:border-stone-800 mt-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-2 px-1">
                    Official College Portals
                  </div>
                  <div className="space-y-1">
                    {ERP_PORTALS.map((portal) => (
                      <a
                        key={portal.title}
                        href={portal.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between py-2 px-3 rounded-md text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                      >
                        <span>{portal.title}</span>
                        <ExternalLink className="h-3 w-3 text-stone-400" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 mt-4">
                <Button
                  onClick={() => {
                    setMobileOpen(false);
                    setInquiryModalOpen(true);
                  }}
                  className="w-full bg-[#881337] hover:bg-[#70102e] text-white font-bold py-2 rounded-md uppercase tracking-wider text-xs"
                >
                  Apply Online 2026-27
                </Button>
                <p className="text-[10px] text-center text-stone-500 mt-2">
                  5 KM Milestone, Farrukhnagar Rd, Gurugram, Delhi-NCR
                </p>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Command Menu */}
      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />

      {/* Multi-Step Admission Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />
    </>
  );
}

export default Navbar;
