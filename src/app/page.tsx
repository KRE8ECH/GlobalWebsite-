import prisma from "@/lib/prisma";
import { Hero } from "@/components/home/Hero";
import { PlacementTicker } from "@/components/home/PlacementTicker";
import { ProgramFinder } from "@/components/academics/ProgramFinder";
import { NoticeBoard } from "@/components/notices/NoticeBoard";
import { HolidayCalendar } from "@/components/academics/HolidayCalendar";
import { InquiryForm } from "@/components/inquiry-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Sparkles,
  MapPin,
  Building,
  GraduationCap,
  Users2,
  Cpu,
  ShieldCheck,
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
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. PLACEMENT MARQUEE & STUDENT HIGHLIGHTS */}
      <PlacementTicker placements={placementHighlights} />

      {/* 3. INTERACTIVE PROGRAM FINDER (Client Hydrated Tabs + Search) */}
      <ProgramFinder programs={programs} />

      {/* 4. LIVE NOTICES & CIRCULARS FEED (Split-view GU & GITM) */}
      <NoticeBoard notices={notices} />

      {/* 5. HOLIDAY & ACADEMIC CALENDAR WIDGET */}
      <HolidayCalendar />

      {/* 6. ABOUT GITM GURGAON SECTION */}
      <section
        id="about"
        className="py-16 sm:py-24 border-b border-border bg-background scroll-mt-14"
        aria-labelledby="about-heading"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <Building className="h-4 w-4" />
                <span>About Global Institute of Technology & Management</span>
              </div>
              <h2
                id="about-heading"
                className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight"
              >
                18+ Years of Academic Integrity & Corporate Leadership
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Established in 2008, Global Institute of Technology & Management (GITM) is strategically nestled in Gurgaon, Delhi-NCR. Affiliated with Gurugram University, GITM has produced over 15,000 alumni across engineering, technology, artificial intelligence, business leadership, and clinical pharmaceutical science.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-xl border border-border bg-card">
                  <Cpu className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Advanced Tech Labs</h4>
                    <p className="text-[11px] text-muted-foreground">AI/ML research labs, IoT center, and high-performance computing clusters.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl border border-border bg-card">
                  <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Government Approvals</h4>
                    <p className="text-[11px] text-muted-foreground">Approved by AICTE, PCI, and affiliated to Gurugram University, Haryana.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl border border-border bg-card">
                  <Users2 className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Distinguished Faculty</h4>
                    <p className="text-[11px] text-muted-foreground">PhD scholars, researchers, and corporate mentors guiding student projects.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl border border-border bg-card">
                  <GraduationCap className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Merit Scholarships</h4>
                    <p className="text-[11px] text-muted-foreground">Scholarships up to 100% tuition waiver for meritorious candidates.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-muted/40 rounded-2xl border border-border p-6 sm:p-8 space-y-4">
              <h3 className="text-base font-bold text-foreground">
                Campus Highlights at a Glance
              </h3>
              <ul className="space-y-3 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span>20+ Acres Lush Green Eco-Friendly Campus</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span>Digital Library with 50,000+ Volumes & IEEE Access</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span>Air-Conditioned Hostels for Boys & Girls with 24x7 Security</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span>Dedicated Fleet of AC Buses covering Gurgaon, Delhi & Rewari</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span>On-Campus Sports Complex & Gymnasium</span>
                </li>
              </ul>
              <div className="pt-2">
                <Button asChild variant="outline" className="w-full font-semibold">
                  <a href="#inquiry">Book a Campus Tour</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CAMPUS LIFE & EVENTS */}
      <section
        id="events"
        className="py-16 sm:py-24 border-b border-border bg-muted/20 scroll-mt-14"
        aria-labelledby="events-heading"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-4 w-4" />
              <span>Campus Life & Innovation</span>
            </div>
            <h2
              id="events-heading"
              className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-2"
            >
              Conferences, Hackathons & Cultural Summits
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-2">
              National hackathons, tech symposiums, and leadership conclaves at GITM Gurgaon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event) => {
              const tags = event.tags ? event.tags.split(",").map((t) => t.trim()) : [];
              return (
                <Card
                  key={event.id}
                  className="flex flex-col justify-between hover:border-primary/50 transition-all hover:shadow-md rounded-2xl"
                >
                  <CardHeader className="p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground">
                      {event.title}
                    </CardTitle>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs text-muted-foreground pt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-primary" />
                        {new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        {event.location}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {event.summary}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. ADMISSION INQUIRY SECTION */}
      <section
        id="inquiry"
        className="py-16 sm:py-24 border-b border-border bg-background scroll-mt-14"
        aria-labelledby="inquiry-heading"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <InquiryForm
              courses={programs.map((p) => ({ slug: p.slug, name: p.name }))}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
