import Link from "next/link";
import prisma from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Hero } from "@/components/home/Hero";
import { PlacementTicker } from "@/components/home/PlacementTicker";
import { InquiryForm } from "@/components/inquiry-form";
import {
  Calendar,
  FileText,
  ExternalLink,
  CheckCircle,
  BookOpen,
  Pin,
  Sparkles,
  MapPin,
  ShieldCheck,
  Building,
  GraduationCap,
  Users2,
  Cpu,
} from "lucide-react";

export default async function HomePage() {
  // Fetch real-time data from database via Prisma ORM Server Components
  const [programs, placementHighlights, notices, events] = await Promise.all([
    prisma.program.findMany({
      orderBy: { name: "asc" },
    }),
    prisma.placementHighlight.findMany({
      orderBy: { packageLPA: "desc" },
    }),
    prisma.notice.findMany({
      orderBy: [{ isPinned: "desc" }, { publishDate: "desc" }],
      take: 6,
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

      {/* 3. LIVE GURUGRAM UNIVERSITY & GITM NOTICES */}
      <section
        id="notices"
        className="py-16 sm:py-20 bg-background border-b border-border scroll-mt-14"
        aria-labelledby="notices-heading"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <FileText className="h-4 w-4" />
                <span>Notice Board & Official Circulars</span>
              </div>
              <h2
                id="notices-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground mt-1"
              >
                Live University Notifications & Exam Schedules
              </h2>
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-time sync with Gurugram University & Registrars</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notices.map((notice) => (
              <Card
                key={notice.id}
                className={`flex flex-col justify-between transition-all hover:shadow-md ${
                  notice.isPinned
                    ? "border-primary/50 bg-primary/[0.02]"
                    : "border-border"
                }`}
              >
                <CardHeader className="p-5 pb-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge
                      variant={
                        notice.source === "GURUGRAM_UNIVERSITY" ? "secondary" : "default"
                      }
                      className="text-[10px] tracking-wide uppercase font-semibold"
                    >
                      {notice.source === "GURUGRAM_UNIVERSITY"
                        ? "Gurugram University"
                        : "GITM Campus"}
                    </Badge>
                    <div className="flex items-center gap-1.5">
                      <Badge variant="outline" className="text-[10px]">
                        {notice.category}
                      </Badge>
                      {notice.isPinned && (
                        <span className="flex items-center text-amber-500 text-[11px] font-semibold gap-0.5">
                          <Pin className="h-3 w-3 fill-amber-500" />
                          Pinned
                        </span>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-base font-semibold leading-snug line-clamp-2">
                    {notice.title}
                  </CardTitle>
                  <CardDescription className="text-xs flex items-center gap-1 pt-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(notice.publishDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-5 pt-0 mt-auto flex items-center gap-3">
                  {notice.pdfUrl && (
                    <a
                      href={notice.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      Download PDF
                    </a>
                  )}
                  {notice.sourceUrl && (
                    <a
                      href={notice.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:underline ml-auto"
                    >
                      Source Link
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ACADEMIC PROGRAMS OFFERED */}
      <section
        id="programs"
        className="py-16 sm:py-20 border-b border-border bg-muted/20 scroll-mt-14"
        aria-labelledby="programs-heading"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <BookOpen className="h-4 w-4" />
              <span>Accredited Programs</span>
            </div>
            <h2
              id="programs-heading"
              className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-2"
            >
              Academic Disciplines & Specializations
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-2">
              Industry-aligned curricula affiliated with Gurugram University and governed by AICTE & PCI norms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <Card
                key={program.id}
                className="flex flex-col justify-between hover:border-primary/50 transition-all hover:shadow-md"
              >
                <CardHeader className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="outline" className="text-xs uppercase font-medium">
                      {program.department.replace("_", " ")}
                    </Badge>
                    <Badge variant="secondary" className="text-xs font-semibold">
                      {program.level} • {program.durationYears} Years
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-bold text-foreground">
                    {program.name}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground line-clamp-3 mt-2 leading-relaxed">
                    {program.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6 pt-0 space-y-4">
                  <div className="space-y-2 rounded-lg bg-muted/60 p-3 text-xs">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">Eligibility: </span>
                        <span className="text-muted-foreground">{program.eligibility}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-border/50 text-muted-foreground">
                      <span>Approved Intake:</span>
                      <span className="font-semibold text-foreground">{program.intake} Seats</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {program.syllabusPdfUrl ? (
                      <a
                        href={program.syllabusPdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-muted-foreground hover:text-primary flex items-center gap-1"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        Syllabus PDF
                      </a>
                    ) : (
                      <span />
                    )}
                    <Button
                      asChild
                      size="sm"
                      variant="default"
                      className="bg-primary text-primary-foreground font-semibold"
                    >
                      <Link href="#inquiry">Apply Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ABOUT GITM GURGAON SECTION */}
      <section
        id="about"
        className="py-16 sm:py-20 border-b border-border bg-background scroll-mt-14"
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
                18+ Years of Academic Integrity & Professional Excellence
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Established in 2008, Global Institute of Technology & Management (GITM) is strategically nestled in Gurgaon, the Millennium City and premier technology hub of India. Affiliated with Gurugram University, GITM has fostered more than 15,000 alumni across engineering, technology, artificial intelligence, business leadership, and clinical pharmaceutical science.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-lg border border-border bg-card">
                  <Cpu className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Advanced Tech Labs</h4>
                    <p className="text-[11px] text-muted-foreground">AI/ML research labs, IoT center, and high-performance computing clusters.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-lg border border-border bg-card">
                  <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Government Approvals</h4>
                    <p className="text-[11px] text-muted-foreground">Approved by AICTE, PCI, and affiliated to Gurugram University, Haryana.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-lg border border-border bg-card">
                  <Users2 className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Distinguished Faculty</h4>
                    <p className="text-[11px] text-muted-foreground">PhD scholars, researchers, and corporate mentors guiding student projects.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-lg border border-border bg-card">
                  <GraduationCap className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Merit Scholarships</h4>
                    <p className="text-[11px] text-muted-foreground">Scholarships up to 100% tuition waiver for meritorious candidates.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-muted/40 rounded-2xl border border-border p-6 space-y-4">
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

      {/* 6. CAMPUS LIFE & EVENTS */}
      <section
        id="events"
        className="py-16 sm:py-20 border-b border-border bg-muted/20 scroll-mt-14"
        aria-labelledby="events-heading"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-4 w-4" />
              <span>Hackathons & Cultural Conclaves</span>
            </div>
            <h2
              id="events-heading"
              className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-2"
            >
              Campus Life & Innovation Summits
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
                  className="flex flex-col justify-between hover:border-primary/50 transition-all hover:shadow-md"
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

      {/* 7. ADMISSION INQUIRY SECTION */}
      <section
        id="inquiry"
        className="py-16 sm:py-20 border-b border-border bg-background scroll-mt-14"
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
