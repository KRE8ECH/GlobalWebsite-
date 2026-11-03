import Link from "next/link";
import {
  Award,
  BookOpen,
  Download,
  Building2,
  CheckCircle2,
  MapPin,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 via-background to-background pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
      {/* Background Decorative Grid */}
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Accreditation Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary shadow-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <span>Affiliated to Gurugram University</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1 text-xs font-semibold text-foreground shadow-xs">
              <Award className="h-3.5 w-3.5 text-amber-500" />
              <span>AICTE & PCI Approved</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1 text-xs font-semibold text-foreground shadow-xs">
              <FileCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span>DTE Haryana Recognized</span>
            </span>
          </div>

          {/* High Impact Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.12]">
            Empowering Next-Gen Innovators & Leaders in{" "}
            <span className="bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Delhi-NCR
            </span>
          </h1>

          {/* Value Proposition Description */}
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-normal">
            Global Institute of Technology & Management (GITM, Gurgaon) bridges cutting-edge academic excellence with corporate immersion. Offering degrees in B.Tech, AI & Data Science, MBA, BCA, and B.Pharm.
          </p>

          {/* Primary Action Buttons (CTAs) */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-md h-12 px-7 text-base rounded-xl transition-transform hover:-translate-y-0.5"
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
              className="border-border bg-card hover:bg-accent text-foreground font-bold h-12 px-7 text-base rounded-xl transition-transform hover:-translate-y-0.5"
            >
              <a
                href="#inquiry"
                className="flex items-center gap-2"
                aria-label="Download Admission Brochure"
              >
                <Download className="h-4 w-4 text-primary" />
                <span>Download Brochure</span>
              </a>
            </Button>
          </div>

          {/* 3 Key Stat Badges Requested */}
          <div className="pt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {/* Badge 1: 100+ Recruiter Partners */}
            <div className="flex items-center gap-3.5 rounded-xl border border-border bg-card/80 p-4 backdrop-blur shadow-xs text-left">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-500/10 text-primary shrink-0">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-foreground">100+</div>
                <div className="text-xs font-semibold text-muted-foreground">
                  Recruiter Partners
                </div>
              </div>
            </div>

            {/* Badge 2: 100% Placement Assistance */}
            <div className="flex items-center gap-3.5 rounded-xl border border-border bg-card/80 p-4 backdrop-blur shadow-xs text-left">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-foreground">100%</div>
                <div className="text-xs font-semibold text-muted-foreground">
                  Placement Assistance
                </div>
              </div>
            </div>

            {/* Badge 3: Corporate Hub of Delhi-NCR */}
            <div className="flex items-center gap-3.5 rounded-xl border border-border bg-card/80 p-4 backdrop-blur shadow-xs text-left">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-foreground leading-tight">
                  Corporate Hub
                </div>
                <div className="text-xs font-semibold text-muted-foreground">
                  of Delhi-NCR (Gurgaon)
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Banner */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
              ₹28.5 LPA Highest Package
            </span>
            <span>•</span>
            <span>18+ Years Academic Legacy</span>
            <span>•</span>
            <span>State-of-the-Art Labs & Campus</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
