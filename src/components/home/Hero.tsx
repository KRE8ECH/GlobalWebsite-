import Link from "next/link";
import {
  ShieldCheck,
  Award,
  FileCheck,
  BookOpen,
  Download,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Landmark,
  PhoneCall,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Campus3DViewer } from "./Campus3DViewer";
import { AnimatedLedger } from "./AnimatedLedger";

export function Hero() {
  return (
    <section className="relative bg-[#0f2b48] text-white border-b border-[#0b1e32]">
      {/* 1. MAIN EDITORIAL HERO GRID */}
      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (7 cols): Institutional Authority & Degree Discovery */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Heritage & Approval Strip */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-xs border border-amber-400/40 bg-amber-400/10 px-2.5 py-1 text-xs font-bold text-amber-300">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span>Affiliated to Gurugram University</span>
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-xs border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-medium text-stone-200">
                <Award className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span>Approved by AICTE & PCI, New Delhi</span>
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-xs border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-medium text-stone-200">
                <FileCheck className="h-3.5 w-3.5 text-stone-300 shrink-0" />
                <span>DTE Haryana Code: 074</span>
              </span>
            </div>

            {/* Distinguished Editorial Serif Headline */}
            <h1 className="font-editorial text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.15] tracking-tight">
              Building Engineers, Managers, and Innovators Since 2008
            </h1>

            {/* Grounded Institutional Overview */}
            <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-normal max-w-2xl">
              Global Institute of Technology & Management (GITM Gurgaon) is an autonomous seat of higher technical education established under the Baljeet Singh Education Society. Situated across 20 green acres in Delhi-NCR, GITM delivers four-year undergraduate and postgraduate programs in Engineering (CSE, AI & Data Science), Management (MBA), Pharmacy (B.Pharm), and Computer Applications aligned with the National Education Policy (NEP 2020).
            </p>

            {/* Primary Action Button Suite */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Button
                asChild
                size="lg"
                className="bg-[#881337] hover:bg-[#70102e] text-white font-bold h-11 px-6 text-xs uppercase tracking-wider rounded-sm shadow-sm transition-colors"
              >
                <Link href="#programs" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Explore Academic Programs</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-stone-400 bg-white text-[#0f2b48] hover:bg-stone-100 font-bold h-11 px-6 text-xs uppercase tracking-wider rounded-sm shadow-sm transition-colors"
              >
                <a
                  href="#inquiry"
                  className="flex items-center gap-2"
                  aria-label="Download Information Brochure"
                >
                  <Download className="h-4 w-4 text-[#881337]" />
                  <span>Download Information Brochure</span>
                </a>
              </Button>
            </div>

            {/* Helpline and Direct Admission Contact */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-stone-200 border-t border-white/15 pt-4">
              <span className="flex items-center gap-1.5 font-bold text-amber-300">
                <PhoneCall className="h-3.5 w-3.5" />
                <span>Admissions Helpline: +91-9555 100 100</span>
              </span>
              <span className="hidden sm:inline text-stone-400">•</span>
              <span className="flex items-center gap-1 text-stone-200">
                <MapPin className="h-3.5 w-3.5 text-stone-300" />
                <span>5 KM Milestone, Farrukhnagar - Gurgaon Road, Gurugram</span>
              </span>
            </div>
          </div>

          {/* Right Column (5 cols): 3D Interactive Campus Perspective Viewer & Admissions Notice */}
          <div className="lg:col-span-5 space-y-4">
            <Campus3DViewer />

            {/* Official Academic Session Desk Card */}
            <div className="rounded-md border border-white/15 bg-white/5 p-4 text-left space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4" />
                  <span>Academic Session 2026-27</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-xs">
                  Admissions Open
                </span>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed">
                Direct admission counseling active for B.Tech (CSE, AI & Data Science), MBA, MCA, B.Pharm, BCA, and BBA. Merit scholarships applicable on JEE Mains, CUET, and 10+2 scores.
              </p>

              <div className="pt-1 flex items-center justify-between text-xs">
                <Link
                  href="#inquiry"
                  className="text-amber-300 hover:text-white font-bold flex items-center gap-1 underline underline-offset-2"
                >
                  <span>Submit Admission Inquiry</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
                <Link
                  href="#campus-life"
                  className="text-stone-300 hover:text-white text-[11px]"
                >
                  Virtual Campus Tour
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. GROUNDED INSTITUTIONAL LEDGER (With Smooth Real-Time Counter Animation) */}
      <AnimatedLedger />
    </section>
  );
}

export default Hero;
