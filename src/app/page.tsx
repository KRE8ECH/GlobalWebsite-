import prisma from "@/lib/prisma";
import { Hero } from "@/components/home/Hero";
import { PlacementTicker } from "@/components/home/PlacementTicker";
import { ProgramFinder } from "@/components/academics/ProgramFinder";
import { NoticeBoard } from "@/components/notices/NoticeBoard";
import { HolidayCalendar } from "@/components/academics/HolidayCalendar";
import { CampusGallery } from "@/components/home/CampusGallery";
import { InquiryForm } from "@/components/admissions/InquiryForm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Building,
  GraduationCap,
  Users2,
  Cpu,
  ShieldCheck,
  Award,
  Landmark,
  BookOpen,
  Phone,
} from "lucide-react";

export default async function HomePage() {
  // Fetch data in parallel using Prisma ORM server components
  const [programs, placementHighlights, notices, events] = await Promise.all([
    prisma.program.findMany({
      orderBy: { name: "asc" },
    }),
    prisma.placementHighlight.findMany({
      orderBy: { packageLPA: "desc" },
    }),
    prisma.notice.findMany({
      orderBy: [{ isPinned: "desc" }, { publishDate: "desc" }],
    }),
    prisma.event.findMany({
      orderBy: { date: "asc" },
      take: 4,
    }),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION (Collegiate 2008 Legacy, Accreditations & Key Metrics) */}
      <Hero />

      {/* 2. VERIFIED RECRUITERS & PLACEMENT HIGHLIGHTS */}
      <PlacementTicker placements={placementHighlights} />

      {/* 3. ACADEMIC DEPARTMENTS & DEGREE FINDER (NEP 2020 Aligned) */}
      <ProgramFinder programs={programs} />

      {/* 4. FORMAL TABULAR NOTICEBOARD (Gurugram University & GITM Circulars) */}
      <NoticeBoard notices={notices} />

      {/* 5. ACADEMIC CALENDAR & GAZETTED HOLIDAYS */}
      <HolidayCalendar />

      {/* 6. CAMPUS INFRASTRUCTURE, ACADEMIC LIFE & VIRTUAL TOUR */}
      <CampusGallery />

      {/* 7. ABOUT GITM GURGAON (Authoritative Institutional Profile & Leadership) */}
      <section
        id="about"
        className="py-14 sm:py-20 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-[#080f1a] scroll-mt-14"
        aria-labelledby="about-heading"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#881337] dark:text-amber-400">
                <Landmark className="h-4 w-4" />
                <span>Institutional Governance & Legacy</span>
              </div>
              <h2
                id="about-heading"
                className="font-editorial text-2xl sm:text-4xl font-extrabold text-[#0f2b48] dark:text-stone-100 leading-tight"
              >
                18+ Years of Academic Discipline, Integrity & Leadership
              </h2>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                Founded in 2008 under the aegis of the Baljeet Singh Education Society, Global Institute of Technology & Management (GITM Gurgaon) is recognized by the Directorate of Technical Education, Government of Haryana, approved by the All India Council for Technical Education (AICTE), Ministry of Education, Government of India, and the Pharmacy Council of India (PCI). GITM is permanently affiliated with Gurugram University, Gurugram.
              </p>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                Strategically situated across a 20-acre lush green campus on the Farrukhnagar-Gurgaon Highway within the corporate sphere of Delhi-NCR, the institute has nurtured over 15,000 engineers, software architects, corporate leaders, and pharmaceutical scientists serving in premier organizations worldwide.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-md border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 flex items-start gap-3">
                  <Cpu className="h-5 w-5 text-[#0f2b48] dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      Advanced Computing Infrastructure
                    </h4>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">
                      High-throughput artificial intelligence clusters, IoT design studios, and cloud research laboratories.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-md border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      Statutory Approvals & Affiliation
                    </h4>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">
                      Fully approved by AICTE, PCI, DTE Haryana (Code 074), and affiliated to Gurugram University.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-md border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 flex items-start gap-3">
                  <Users2 className="h-5 w-5 text-[#b45309] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      Eminent Academic Faculty
                    </h4>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">
                      Senior academicians, PhD scholars from premier central universities, and corporate research guides.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-md border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 flex items-start gap-3">
                  <GraduationCap className="h-5 w-5 text-[#881337] dark:text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      Merit Scholarship Scheme
                    </h4>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">
                      Institutional fee concessions and merit scholarships awarded to top JEE, CUET, and 10+2 scorers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Campus Facilities Specification Card */}
            <div className="lg:col-span-5 bg-stone-50 dark:bg-stone-900/80 rounded-md border border-stone-300 dark:border-stone-800 p-6 space-y-4">
              <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
                <h3 className="font-editorial text-base font-bold text-[#0f2b48] dark:text-stone-100">
                  Campus Facilities & Academic Infrastructure
                </h3>
                <p className="text-[11px] text-stone-500">
                  Inspected and accredited collegiate amenities
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-stone-700 dark:text-stone-300">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0f2b48] dark:bg-amber-400 mt-1.5 shrink-0" />
                  <span><strong>20-Acre Campus:</strong> Lush green, barrier-free, Wi-Fi enabled infrastructure.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0f2b48] dark:bg-amber-400 mt-1.5 shrink-0" />
                  <span><strong>Central Digital Library:</strong> Over 50,000 print volumes, IEEE, DELNET, and National Digital Library access.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0f2b48] dark:bg-amber-400 mt-1.5 shrink-0" />
                  <span><strong>Residential Hostels:</strong> Separate air-cooled hostels for male and female students with 24x7 security and hygienic dining.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0f2b48] dark:bg-amber-400 mt-1.5 shrink-0" />
                  <span><strong>Transport Fleet:</strong> Institute-owned buses operating across Gurugram, Delhi, Dwarka, Rewari, and Jhajjar.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0f2b48] dark:bg-amber-400 mt-1.5 shrink-0" />
                  <span><strong>Sports & Gymnasium:</strong> Cricket grounds, basketball courts, badminton arena, and indoor recreation centre.</span>
                </li>
              </ul>

              <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
                <Button asChild variant="outline" className="w-full font-bold text-xs uppercase tracking-wider rounded-sm border-stone-300 dark:border-stone-700">
                  <a href="#inquiry">Request Campus Inspection Tour</a>
                </Button>
              </div>
            </div>
          </div>

          {/* Institutional Leadership Desk */}
          <div className="mt-14 pt-10 border-t border-stone-200 dark:border-stone-800">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#881337] dark:text-amber-400">
                Institutional Leadership
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#0f2b48] dark:text-stone-100 mt-1">
                Visionary Guidance & Academic Leadership
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                Committed to delivering transformative higher education, ethical stewardship, and industry excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Founder */}
              <div className="rounded-md border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 p-5 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <img
                  src="/images/official/general/general_12_founder.jpg"
                  alt="Late Shri Surjeet Singh - Founder, GITM Gurgaon"
                  className="w-28 h-36 sm:w-32 sm:h-40 rounded-sm object-cover object-top border-2 border-stone-300 dark:border-stone-700 shadow-sm shrink-0"
                />
                <div className="space-y-2 text-center sm:text-left">
                  <div className="inline-block px-2 py-0.5 rounded-xs bg-[#0f2b48] text-white text-[10px] font-bold uppercase tracking-wider">
                    Founder & Visionary
                  </div>
                  <h4 className="font-editorial text-lg font-bold text-[#0f2b48] dark:text-stone-100">
                    Late Shri Surjeet Singh
                  </h4>
                  <p className="text-xs font-semibold text-[#881337] dark:text-amber-400">
                    Baljeet Singh Education Society
                  </p>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed italic">
                    &ldquo;Our mission has always been to democratize premier technical education, empowering youth from every corner of India to innovate with discipline and empathy.&rdquo;
                  </p>
                </div>
              </div>

              {/* Chairman */}
              <div className="rounded-md border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 p-5 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <img
                  src="/images/official/general/general_13_chairman.jpg"
                  alt="Mr. Ravinder Tokas - Chairman, GITM Gurgaon"
                  className="w-28 h-36 sm:w-32 sm:h-40 rounded-sm object-cover object-top border-2 border-stone-300 dark:border-stone-700 shadow-sm shrink-0"
                />
                <div className="space-y-2 text-center sm:text-left">
                  <div className="inline-block px-2 py-0.5 rounded-xs bg-[#881337] text-white text-[10px] font-bold uppercase tracking-wider">
                    Chairman
                  </div>
                  <h4 className="font-editorial text-lg font-bold text-[#0f2b48] dark:text-stone-100">
                    Mr. Ravinder Tokas
                  </h4>
                  <p className="text-xs font-semibold text-[#0f2b48] dark:text-amber-400">
                    Chairman, Global Institute of Technology & Management
                  </p>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed italic">
                    &ldquo;GITM stands at the vanguard of NEP 2020 adoption, blending robust academic curricula with industry-partnered experiential learning.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ACADEMIC EVENTS, CONFERENCES & SYMPOSIUMS */}
      <section
        id="events"
        className="py-14 sm:py-20 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#0c1524] scroll-mt-14"
        aria-labelledby="events-heading"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#881337] dark:text-amber-400 mb-1.5">
                <BookOpen className="h-4 w-4" />
                <span>Scholarly Summits, Hackathons & Seminars</span>
              </div>
              <h2
                id="events-heading"
                className="font-editorial text-2xl sm:text-4xl font-extrabold text-[#0f2b48] dark:text-stone-100"
              >
                Conferences, Seminars & Campus Events
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1.5 max-w-2xl">
                National research conventions, faculty development programs, and inter-collegiate technical symposia hosted at GITM Gurgaon.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => {
              const tags = event.tags ? event.tags.split(",").map((t) => t.trim()) : [];
              return (
                <Card
                  key={event.id}
                  className="card-lift rounded-md border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0f1c2e] hover:border-[#0f2b48] dark:hover:border-amber-400/50 shadow-2xs flex flex-col justify-between overflow-hidden group"
                >
                  {event.imageUrl && (
                    <div className="relative h-44 sm:h-52 w-full bg-stone-100 dark:bg-stone-800 overflow-hidden border-b border-stone-200 dark:border-stone-800">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-bold uppercase tracking-wider bg-black/85 text-white px-2 py-0.5 rounded-xs border border-white/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <CardHeader className="p-5 pb-3">
                    {!event.imageUrl && (
                      <div className="flex flex-wrap items-center gap-1.5 mb-2">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-bold uppercase tracking-wider bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 px-2 py-0.5 rounded-xs border border-stone-200 dark:border-stone-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <CardTitle className="font-editorial text-base sm:text-lg font-bold text-[#0f2b48] dark:text-stone-100 leading-snug group-hover:text-[#881337] dark:group-hover:text-amber-400 transition-colors">
                      {event.title}
                    </CardTitle>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs text-stone-500 pt-2 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-stone-400" />
                        {new Date(event.date).toLocaleDateString("en-IN", {
                          weekday: "short",
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-stone-400" />
                        {event.location}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="p-5 pt-0">
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                      {event.summary}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. ADMISSION INQUIRY SECTION (With Authentic Campus Photographic Backdrop) */}
      <section
        id="inquiry"
        className="relative py-16 sm:py-24 border-b border-stone-200 dark:border-stone-800 scroll-mt-14 overflow-hidden bg-[#071322] text-white"
        aria-labelledby="inquiry-heading"
      >
        {/* Campus Photographic Backdrop with Depth Gradients */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/official/banner/banner_10_Banner-1.jpg"
            alt="GITM Gurgaon 20-Acre Campus Ground"
            className="w-full h-full object-cover object-center filter brightness-[0.32] contrast-[1.12]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071322] via-[#071322]/90 to-[#0b1e32]/85" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column (5 cols): Admissions Authority & Counseling Helpline */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 rounded-xs border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300">
                <Landmark className="h-3.5 w-3.5 text-amber-400" />
                <span>Central Admissions Office 2026-27</span>
              </div>

              <h2
                id="inquiry-heading"
                className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight"
              >
                Begin Your Engineering & Management Career
              </h2>

              <p className="text-sm text-stone-200 leading-relaxed font-normal">
                Direct admission counseling active for Academic Session 2026-27 across AICTE-approved B.Tech (CSE, AI & Data Science), MBA, MCA, BCA, and PCI-approved B.Pharm degree programs affiliated with Gurugram University.
              </p>

              {/* Verified Admissions Pillars */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-sm bg-white/5 border border-white/10">
                  <ShieldCheck className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Gurugram University Affiliated & AICTE Approved
                    </h4>
                    <p className="text-[11px] text-stone-300 mt-0.5 leading-relaxed">
                      100% recognized degree programs aligned with the National Education Policy (NEP 2020) credit framework.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-sm bg-white/5 border border-white/10">
                  <Award className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Merit Scholarship Scheme
                    </h4>
                    <p className="text-[11px] text-stone-300 mt-0.5 leading-relaxed">
                      Institutional fee concessions up to 100% awarded to top JEE Mains, CUET, and 12th Board scorers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Official Admissions Helpline Card */}
              <div className="p-4 rounded-sm bg-gradient-to-br from-[#881337] to-[#590a20] border border-amber-400/30 text-white space-y-1.5 shadow-xl">
                <span className="text-[10px] uppercase tracking-wider font-bold text-amber-300 block">
                  Official Admission Helpline
                </span>
                <a
                  href="tel:+919555100100"
                  className="text-lg sm:text-2xl font-mono font-black text-white hover:text-amber-200 flex items-center gap-2 transition-colors"
                >
                  <Phone className="h-5 w-5 text-amber-300" />
                  <span>+91-9555 100 100</span>
                </a>
                <p className="text-[11px] text-stone-200">
                  Direct counseling lines open Mon – Sat (9:00 AM – 5:00 PM)
                </p>
              </div>
            </div>

            {/* Right Column (7 cols): The High-Contrast Inquiry Form Card */}
            <div className="lg:col-span-7">
              <div className="bg-white dark:bg-[#0f1c2e] rounded-md shadow-2xl p-1 sm:p-2 border border-stone-200 dark:border-stone-700">
                <InquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
