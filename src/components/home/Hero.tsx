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
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-stone-200 dark:border-stone-800 bg-[#0f2b48] text-white py-14 sm:py-20 lg:py-24">
      {/* Background Architectural Grid Pattern (Subtle Collegiate Blueprint / Architectural lines) */}
      <div
        className="absolute inset-0 -z-10 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:36px_36px]"
        aria-hidden="true"
      />

      {/* Decorative Warm Accent Ambient Overlay */}
      <div 
        className="absolute -top-32 right-0 w-96 h-96 rounded-full bg-[#b45309]/15 blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Statutory Approvals & Accreditations Row */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-sm border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
              <span>Affiliated to Gurugram University</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-sm border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-stone-200">
              <Award className="h-3.5 w-3.5 text-amber-400" />
              <span>Approved by AICTE & PCI, New Delhi</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-sm border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-stone-200">
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
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Button
              asChild
              size="lg"
              className="bg-[#881337] hover:bg-[#70102e] text-white font-bold h-12 px-7 text-sm rounded-md uppercase tracking-wider shadow-sm transition-colors"
            >
              <Link href="#programs" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Explore Degree Programs</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-stone-400 bg-white text-[#0f2b48] hover:bg-stone-100 font-bold h-12 px-7 text-sm rounded-md uppercase tracking-wider shadow-sm transition-colors"
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

          {/* 4 Grounded Institutional Key Metrics (Understated Bar with Sharp Borders) */}
          <div className="pt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {/* Metric 1 */}
            <div className="rounded-md border border-white/15 bg-white/5 p-4 text-left">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-editorial">
                18+ Years
              </div>
              <div className="text-xs font-bold text-stone-200 mt-1 uppercase tracking-wide">
                Academic Excellence
              </div>
              <div className="text-[11px] text-stone-400 mt-0.5">
                Estd. 2008 • 15,000+ Alumni
              </div>
            </div>

            {/* Metric 2 */}
            <div className="rounded-md border border-white/15 bg-white/5 p-4 text-left">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-editorial">
                100+
              </div>
              <div className="text-xs font-bold text-stone-200 mt-1 uppercase tracking-wide">
                Recruiter Partners
              </div>
              <div className="text-[11px] text-stone-400 mt-0.5">
                Fortune 500 On-Campus Drives
              </div>
            </div>

            {/* Metric 3 */}
            <div className="rounded-md border border-white/15 bg-white/5 p-4 text-left">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-editorial">
                ₹40 LPA
              </div>
              <div className="text-xs font-bold text-stone-200 mt-1 uppercase tracking-wide">
                Highest Package
              </div>
              <div className="text-[11px] text-stone-400 mt-0.5">
                ₹6.8 LPA Average CTC
              </div>
            </div>

            {/* Metric 4 */}
            <div className="rounded-md border border-white/15 bg-white/5 p-4 text-left">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-editorial">
                20 Acres
              </div>
              <div className="text-xs font-bold text-stone-200 mt-1 uppercase tracking-wide">
                Green Campus
              </div>
              <div className="text-[11px] text-stone-400 mt-0.5">
                Wi-Fi Enabled • Modern Labs
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
