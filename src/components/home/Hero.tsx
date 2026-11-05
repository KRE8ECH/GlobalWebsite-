"use client";

import * as React from "react";
import Link from "next/link";
import {
  Award,
  BookOpen,
  Download,
  Building,
  CheckCircle2,
  MapPin,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  FileCheck,
  Building2,
  Landmark,
  Play,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ACADEMIC_DISCIPLINES = [
  { name: "B.Tech (CSE, AI & DS)", href: "#programs", badge: "AICTE Approved" },
  { name: "Management (MBA)", href: "#programs", badge: "Dual Spec." },
  { name: "Pharmacy (B.Pharm)", href: "#programs", badge: "PCI Approved" },
  { name: "Computer Apps (MCA/BCA)", href: "#programs", badge: "Cloud & Dev" },
];

export function Hero() {
  const [activeStat, setActiveStat] = React.useState<number | null>(null);

  return (
    <section className="relative overflow-hidden border-b border-stone-200 dark:border-stone-800 bg-[#0f2b48] text-white py-14 sm:py-18 lg:py-22">
      {/* Background Architectural Grid Pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-12 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:36px_36px]"
        aria-hidden="true"
      />

      {/* Decorative Collegiate Gold & Navy Accent Illumination */}
      <div 
        className="absolute -top-36 right-0 w-[30rem] h-[30rem] rounded-full bg-[#b45309]/18 blur-3xl pointer-events-none -z-10 animate-float" 
        aria-hidden="true" 
      />
      <div 
        className="absolute -bottom-24 -left-20 w-[24rem] h-[24rem] rounded-full bg-[#1e3a5f]/40 blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          {/* Statutory Approvals & Accreditations Row with subtle hover lift */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-sm border border-amber-500/40 bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-300 shadow-xs hover:border-amber-400 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
              </span>
              <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
              <span>Affiliated to Gurugram University</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-sm border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-stone-200 hover:bg-white/15 transition-colors">
              <Award className="h-3.5 w-3.5 text-amber-400" />
              <span>Approved by AICTE & PCI, New Delhi</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-sm border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-stone-200 hover:bg-white/15 transition-colors">
              <FileCheck className="h-3.5 w-3.5 text-stone-300" />
              <span>DTE Haryana Recognized (Code: 074)</span>
            </span>
          </div>

          {/* Distinguished Editorial Collegiate Headline */}
          <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.18] tracking-tight">
            Building Engineers, Managers, and Innovators Since 2008
          </h1>

          {/* Grounded Formal Academic Description */}
          <p className="text-base sm:text-lg text-stone-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Global Institute of Technology & Management (GITM Gurgaon) is an autonomous seat of higher technical education affiliated with Gurugram University. Situated across 20 acres in the corporate hub of Delhi-NCR, GITM delivers four-year undergraduate and postgraduate programs in Engineering (CSE, AI & Data Science), Management (MBA), Pharmacy, and Computer Applications aligned with the National Education Policy (NEP 2020).
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              asChild
              size="lg"
              className="bg-[#881337] hover:bg-[#70102e] text-white font-bold h-12 px-7 text-sm rounded-md uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-200 active:scale-98"
            >
              <Link href="#programs" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Explore Degree Programs</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-stone-400 bg-white text-[#0f2b48] hover:bg-stone-100 font-bold h-12 px-7 text-sm rounded-md uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200"
            >
              <a
                href="#inquiry"
                className="flex items-center gap-2"
                aria-label="Download Admission Brochure"
              >
                <Download className="h-4 w-4 text-[#881337]" />
                <span>Download Information Brochure</span>
              </a>
            </Button>
          </div>

          {/* Quick Discipline Fast-Picker Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mr-1 hidden sm:inline">
              Key Academic Fields:
            </span>
            {ACADEMIC_DISCIPLINES.map((disc) => (
              <a
                key={disc.name}
                href={disc.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 px-3 py-1 text-xs text-stone-200 hover:text-white transition-all duration-150 group"
              >
                <span>{disc.name}</span>
                <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded-full font-bold">
                  {disc.badge}
                </span>
              </a>
            ))}
          </div>

          {/* OFFICIAL CAMPUS PHOTOGRAPHIC SHOWCASE WITH INTERACTIVE VIDEO TOUR LAUNCHER */}
          <div className="pt-6 pb-2">
            <div className="relative rounded-md overflow-hidden border-2 border-white/20 shadow-2xl max-w-4xl mx-auto group">
              <img
                src="/images/official/general/general_11_about-img.jpg"
                alt="Global Institute of Technology & Management Gurgaon Main Campus Building"
                className="w-full h-64 sm:h-80 md:h-96 object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f2b48]/95 via-[#0f2b48]/30 to-black/20" />
              
              {/* Top-Right Floating Live Status Badge */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs text-white shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-bold text-[11px] tracking-wide uppercase">
                  Admissions Open 2026-27
                </span>
              </div>

              {/* Center Interactive "Watch Campus Tour" Trigger */}
              <div className="absolute inset-0 flex items-center justify-center">
                <a
                  href="#campus-life"
                  className="group/tour flex items-center gap-3 bg-[#0f2b48]/85 hover:bg-[#881337] backdrop-blur-md px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-white/30 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
                  aria-label="Scroll to official video campus tour"
                >
                  <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-amber-400 text-[#0f2b48] flex items-center justify-center shadow-md group-hover/tour:bg-white group-hover/tour:text-[#881337] transition-colors">
                    <Play className="h-4 w-4 fill-current ml-0.5" />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs sm:text-sm font-bold leading-tight">
                      Watch Campus Video Tour
                    </span>
                    <span className="block text-[10px] text-stone-300">
                      20-Acre Campus • Laboratories • Life
                    </span>
                  </div>
                </a>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 text-left">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-xs bg-[#881337] text-white text-[10px] font-bold uppercase tracking-wider mb-1">
                    Official Campus View
                  </span>
                  <h3 className="font-editorial text-lg sm:text-xl font-bold text-white">
                    GITM Central Academic Complex & Quadrangle
                  </h3>
                  <p className="text-xs text-stone-300">
                    5 KM Milestone, Farrukhnagar - Gurgaon Highway, Delhi-NCR
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-black/50 backdrop-blur-xs px-3 py-1.5 rounded-sm border border-white/20 text-xs text-amber-300 font-semibold shrink-0">
                  <Landmark className="h-4 w-4 text-amber-400" />
                  <span>20-Acre Eco-Friendly Campus</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Grounded Institutional Key Metrics with Hover Elevation & Micro Progress */}
          <div className="pt-4 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {/* Metric 1 */}
            <div 
              onMouseEnter={() => setActiveStat(1)}
              onMouseLeave={() => setActiveStat(null)}
              className="rounded-md border border-white/15 bg-white/5 p-4 text-left transition-all duration-200 hover:bg-white/10 hover:border-amber-400/50 hover:-translate-y-1 shadow-sm"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-editorial flex items-center justify-between">
                <span>18+ Years</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-sans font-bold">
                  Legacy
                </span>
              </div>
              <div className="text-xs font-bold text-stone-200 mt-1 uppercase tracking-wide">
                Academic Excellence
              </div>
              <div className="text-[11px] text-stone-400 mt-0.5">
                Estd. 2008 • 15,000+ Alumni
              </div>
              <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full transition-all duration-500 w-[95%]" />
              </div>
            </div>

            {/* Metric 2 */}
            <div 
              onMouseEnter={() => setActiveStat(2)}
              onMouseLeave={() => setActiveStat(null)}
              className="rounded-md border border-white/15 bg-white/5 p-4 text-left transition-all duration-200 hover:bg-white/10 hover:border-white/40 hover:-translate-y-1 shadow-sm"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-editorial flex items-center justify-between">
                <span>100+</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/20 text-stone-200 font-sans font-bold">
                  Corporate
                </span>
              </div>
              <div className="text-xs font-bold text-stone-200 mt-1 uppercase tracking-wide">
                Recruiter Partners
              </div>
              <div className="text-[11px] text-stone-400 mt-0.5">
                Fortune 500 On-Campus Drives
              </div>
              <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-sky-400 h-full rounded-full transition-all duration-500 w-[90%]" />
              </div>
            </div>

            {/* Metric 3 */}
            <div 
              onMouseEnter={() => setActiveStat(3)}
              onMouseLeave={() => setActiveStat(null)}
              className="rounded-md border border-white/15 bg-white/5 p-4 text-left transition-all duration-200 hover:bg-white/10 hover:border-amber-400/50 hover:-translate-y-1 shadow-sm"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-editorial flex items-center justify-between">
                <span>₹40 LPA</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-sans font-bold">
                  Top Offer
                </span>
              </div>
              <div className="text-xs font-bold text-stone-200 mt-1 uppercase tracking-wide">
                Highest Package
              </div>
              <div className="text-[11px] text-stone-400 mt-0.5">
                ₹6.8 LPA Average CTC
              </div>
              <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full transition-all duration-500 w-full" />
              </div>
            </div>

            {/* Metric 4 */}
            <div 
              onMouseEnter={() => setActiveStat(4)}
              onMouseLeave={() => setActiveStat(null)}
              className="rounded-md border border-white/15 bg-white/5 p-4 text-left transition-all duration-200 hover:bg-white/10 hover:border-white/40 hover:-translate-y-1 shadow-sm"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-editorial flex items-center justify-between">
                <span>20 Acres</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/20 text-stone-200 font-sans font-bold">
                  Green
                </span>
              </div>
              <div className="text-xs font-bold text-stone-200 mt-1 uppercase tracking-wide">
                Green Campus
              </div>
              <div className="text-[11px] text-stone-400 mt-0.5">
                Wi-Fi Enabled • Modern Labs
              </div>
              <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full transition-all duration-500 w-[92%]" />
              </div>
            </div>
          </div>

          {/* Secondary Campus Information Line */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-300 font-medium">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-amber-400" />
              Corporate Hub of Delhi-NCR (Gurgaon)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />
              100% Placement Assistance
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Landmark className="h-3.5 w-3.5 text-amber-400" />
              Gurugram University Examination Centre
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
