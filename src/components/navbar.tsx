"use client";

import * as React from "react";
import Link from "next/link";
import { GraduationCap, Menu, X, PhoneCall, ChevronRight } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { label: "Programs", href: "#programs" },
    { label: "Placements", href: "#placements" },
    { label: "Notices", href: "#notices" },
    { label: "Events", href: "#events" },
    { label: "Inquire", href: "#inquiry" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Top Bar for Affiliation and Fast Contact */}
      <div className="hidden md:flex border-b border-border/60 bg-muted/40 px-4 py-1.5 text-xs text-muted-foreground justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Admissions Open 2026-27
          </span>
          <span className="text-border">|</span>
          <span>Affiliated to Gurugram University & Approved by AICTE, PCI, DTE Haryana</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="tel:+911242365000"
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <PhoneCall className="h-3 w-3" />
            +91-124-2365000 / +91-9818812345
          </a>
          <span>Gurgaon, Haryana, India</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm group-hover:bg-primary/90 transition-colors">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors">
              GITM GURGAON
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Global Institute of Tech & Mgmt
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/80 hover:text-primary transition-colors hover:font-semibold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="#inquiry" className="flex items-center gap-1">
              Apply Now
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </Button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card px-4 pt-2 pb-6 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-3 pt-2">
            <div className="pb-2 border-b border-border/50 text-xs text-muted-foreground">
              Affiliated with Gurugram University
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-base font-medium text-foreground hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button asChild className="w-full bg-primary text-primary-foreground">
                <Link href="#inquiry" onClick={() => setMobileMenuOpen(false)}>
                  Apply for Admission
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

