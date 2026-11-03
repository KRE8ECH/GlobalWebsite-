"use client";

import * as React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Menu,
  X,
  PhoneCall,
  ChevronDown,
  ExternalLink,
  UserCheck,
  Building,
  Mail,
  Sparkles,
  ArrowRight,
  Search,
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
  { label: "Admissions", href: "#inquiry", badge: "2026-27" },
  { label: "Programs", href: "#programs" },
  { label: "Live University Notices", href: "#notices", badge: "Live Sync" },
  { label: "Placements", href: "#placements" },
  { label: "Campus Life", href: "#events" },
  { label: "About GITM", href: "#about" },
];

const ERP_PORTALS = [
  {
    title: "Student ERP Portal",
    description: "Attendance, grades, fee slips & exam results",
    href: "https://erp.gitmgurgaon.com/student",
    icon: UserCheck,
  },
  {
    title: "Staff & Faculty ERP",
    description: "Faculty management, payroll & LMS tools",
    href: "https://erp.gitmgurgaon.com/staff",
    icon: Building,
  },
  {
    title: "Institutional Webmail",
    description: "Official @gitm.ac.in cloud email access",
    href: "https://mail.google.com/a/gitm.ac.in",
    icon: Mail,
  },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [erpOpen, setErpOpen] = React.useState(false);
  const [commandOpen, setCommandOpen] = React.useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = React.useState(false);

  // References for focus trap and keyboard control
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
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        {/* 1. TOP UTILITY STRIP */}
        <div className="bg-slate-900 text-slate-100 text-xs py-1.5 px-4 border-b border-slate-800">
          <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
            {/* Left: Affiliation & Accreditation Badge */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs">
              <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Gurugram University Affiliated
              </span>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <span className="text-slate-300 hidden md:inline">
                Approved by AICTE & PCI, New Delhi • DTE Haryana Recognized
              </span>
            </div>

            {/* Right: Admission Helpline & ERP Portals Dropdown */}
            <div className="flex items-center gap-4 text-[11px] sm:text-xs ml-auto">
              {/* Admission Helpline */}
              <a
                href="tel:+919555100100"
                className="flex items-center gap-1.5 font-medium text-amber-300 hover:text-amber-200 transition-colors"
                aria-label="Call Admission Helpline at +91-9555 100 100"
              >
                <PhoneCall className="h-3 w-3" />
                <span>Helpline: +91-9555 100 100</span>
              </a>

              <span className="text-slate-700">|</span>

              {/* ERP Portals Dropdown */}
              <div className="relative" ref={erpDropdownRef}>
                <button
                  ref={erpButtonRef}
                  onClick={() => setErpOpen(!erpOpen)}
                  aria-expanded={erpOpen}
                  aria-haspopup="true"
                  aria-label="ERP Portals Menu"
                  className="flex items-center gap-1 text-slate-200 hover:text-white font-medium focus:outline-none focus:ring-1 focus:ring-primary rounded px-1.5 py-0.5"
                >
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
                    className="absolute right-0 mt-2 w-64 rounded-lg border border-border bg-card p-2 text-foreground shadow-xl ring-1 ring-black/5 animate-in fade-in-50 zoom-in-95 z-50"
                  >
                    <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border-b border-border/50">
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
                          className="flex items-start gap-2.5 rounded-md p-2 hover:bg-accent transition-colors group mt-1"
                        >
                          <div className="rounded bg-primary/10 p-1.5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold flex items-center justify-between">
                              <span>{portal.title}</span>
                              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
                            </div>
                            <p className="text-[10px] text-muted-foreground line-clamp-1">
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

        {/* 2. MAIN NAVBAR */}
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 gap-3">
          {/* Brand / Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg p-1 shrink-0"
            aria-label="GITM Gurgaon - Global Institute of Technology & Management Home"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md group-hover:scale-105 transition-transform">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-foreground group-hover:text-primary transition-colors">
                  GITM GURGAON
                </span>
                <span className="hidden sm:inline-block rounded bg-primary/10 px-1.5 py-0.2 text-[9px] font-bold text-primary">
                  EST. 2008
                </span>
              </div>
              <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground line-clamp-1">
                Global Institute of Technology & Management
              </span>
            </div>
          </Link>

          {/* Desktop Main Navigation */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold"
            aria-label="Main Navigation"
          >
            {MAIN_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-3 py-2 rounded-md text-foreground/85 hover:text-primary hover:bg-accent/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-1.5 inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-primary/15 text-primary">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Actions: Search Palette Button + Theme Toggle + "Apply Now" CTA Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Global Search Command Trigger Button */}
            <button
              onClick={() => setCommandOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-border bg-card px-2.5 py-1.5 text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all duration-150 shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Open search command palette"
              title="Search degrees, notices, and links (Ctrl+K / Cmd+K)"
            >
              <Search className="h-3.5 w-3.5 text-primary" />
              <span className="hidden xl:inline text-xs font-medium">Search...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-bold text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>

            <ThemeToggle />

            {/* Apply Now button opens the multi-step admission modal */}
            <Button
              onClick={() => setInquiryModalOpen(true)}
              size="sm"
              className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-sm px-4 py-2"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-300 mr-1" />
              <span>Apply Now 2026-27</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Button>

            {/* Hamburger Mobile Toggle */}
            <button
              ref={hamburgerButtonRef}
              onClick={() => setMobileOpen(true)}
              className="lg:hidden inline-flex items-center justify-center rounded-lg p-2 text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Open mobile menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* 3. ACCESSIBLE MOBILE DRAWER WITH FOCUS TRAP */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-50 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            ref={mobileDrawerRef}
          >
            {/* Backdrop Overlay */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer Content */}
            <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background border-l border-border shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
              <div>
                {/* Header inside drawer */}
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="font-bold text-sm block">GITM GURGAON</span>
                      <span className="text-[10px] text-muted-foreground block">
                        Affiliated to Gurugram University
                      </span>
                    </div>
                  </div>

                  <button
                    ref={closeButtonRef}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Close navigation menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Mobile Search Button */}
                <div className="mt-4">
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setCommandOpen(true);
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl border border-border bg-card text-xs text-muted-foreground hover:text-foreground"
                  >
                    <span className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-primary" />
                      Search programs, notices, ERP...
                    </span>
                    <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono border border-border">
                      Ctrl K
                    </span>
                  </button>
                </div>

                {/* Admission Helpline Quick Dial in Drawer */}
                <div className="my-3 p-3 rounded-lg bg-muted/60 border border-border/80 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-medium text-muted-foreground block">
                      Admission Helpline:
                    </span>
                    <a
                      href="tel:+919555100100"
                      className="text-xs font-bold text-primary flex items-center gap-1 mt-0.5"
                    >
                      <PhoneCall className="h-3 w-3" />
                      +91-9555 100 100
                    </a>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    Open
                  </span>
                </div>

                {/* Main Nav Links */}
                <nav className="flex flex-col space-y-1 py-2">
                  {MAIN_NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold text-foreground hover:bg-accent hover:text-primary transition-colors"
                    >
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </nav>

                {/* ERP Portals in Drawer */}
                <div className="pt-4 border-t border-border mt-3">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-1">
                    ERP & Campus Portals
                  </div>
                  <div className="space-y-1">
                    {ERP_PORTALS.map((portal) => (
                      <a
                        key={portal.title}
                        href={portal.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between py-2 px-3 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
                      >
                        <span>{portal.title}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA in Drawer */}
              <div className="pt-6 border-t border-border mt-6">
                <Button
                  onClick={() => {
                    setMobileOpen(false);
                    setInquiryModalOpen(true);
                  }}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2.5"
                >
                  Apply Now 2026-27
                </Button>
                <p className="text-[10px] text-center text-muted-foreground mt-2">
                  5 KM Milestone, Farrukhnagar Rd, Gurugram, Delhi-NCR
                </p>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Command Menu Palette Dialog */}
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
