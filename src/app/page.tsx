import Link from "next/link";
import prisma from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InquiryForm } from "@/components/inquiry-form";
import {
  Award,
  TrendingUp,
  Building2,
  Calendar,
  FileText,
  ExternalLink,
  CheckCircle,
  BookOpen,
  ArrowRight,
  Pin,
  Sparkles,
  MapPin,
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
      take: 6,
    }),
    prisma.event.findMany({
      orderBy: { date: "asc" },
      take: 4,
    }),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 via-background to-background py-16 sm:py-24 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Affiliation Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
                <Award className="h-3.5 w-3.5" />
                <span>Affiliated to Gurugram University, Gurugram</span>
                <span className="text-primary/40">•</span>
                <span>AICTE & PCI Approved</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                Engineering Tomorrow&apos;s Innovations at{" "}
                <span className="text-primary bg-clip-text">GITM Gurgaon</span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Global Institute of Technology & Management offers accredited undergraduate and postgraduate programs in Computer Science, Artificial Intelligence, Business Administration, Computer Applications, and Pharmacy.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md">
                  <Link href="#inquiry">
                    Apply for Admissions 2026-27
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-border">
                  <Link href="#programs">
                    View Academic Programs
                  </Link>
                </Button>
              </div>

              {/* Key Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-border/80">
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-foreground">₹28.5 LPA</div>
                  <div className="text-xs text-muted-foreground font-medium">Highest Package</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-foreground">500+</div>
                  <div className="text-xs text-muted-foreground font-medium">Corporate Recruiters</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-foreground">100%</div>
                  <div className="text-xs text-muted-foreground font-medium">Placement Assistance</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-foreground">18+ Years</div>
                  <div className="text-xs text-muted-foreground font-medium">Academic Legacy</div>
                </div>
              </div>
            </div>

            {/* Hero Quick Inquiry Box */}
            <div className="lg:col-span-5">
              <InquiryForm
                courses={programs.map((p) => ({ slug: p.slug, name: p.name }))}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Notices & Circulars Banner */}
      <section id="notices" className="py-16 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <FileText className="h-4 w-4" />
                <span>Notice Board & Official Circulars</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
                Latest Updates & University Notifications
              </h2>
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              Real-time sync with Gurugram University & GITM Registrars
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notices.map((notice) => (
              <Card
                key={notice.id}
                className={`flex flex-col justify-between transition-all hover:shadow-md ${
                  notice.isPinned ? "border-primary/50 bg-primary/[0.02]" : "border-border"
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

      {/* Academic Programs Section */}
      <section id="programs" className="py-16 sm:py-20 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <BookOpen className="h-4 w-4" />
              <span>Curriculum & Specializations</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground mt-2">
              Academic Programs Offered
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-2">
              Degree programs developed in alignment with Gurugram University and National Education Policy (NEP) guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <Card key={program.id} className="flex flex-col justify-between hover:border-primary/50 transition-all">
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
                  <div className="space-y-2 rounded-lg bg-muted/50 p-3 text-xs">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">Eligibility: </span>
                        <span className="text-muted-foreground">{program.eligibility}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-border/50 text-muted-foreground">
                      <span>Annual Approved Intake:</span>
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
                    <Button asChild size="sm" variant="default" className="bg-primary text-primary-foreground">
                      <Link href="#inquiry">Apply Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Highlights */}
      <section id="placements" className="py-16 sm:py-20 bg-muted/20 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <TrendingUp className="h-4 w-4" />
                <span>Career Opportunities</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground mt-1">
                Outstanding Placement Highlights
              </h2>
              <p className="text-muted-foreground text-sm mt-1 max-w-xl">
                Our Corporate Resource Centre connects graduates with Tier-1 multinational software, engineering, and pharmaceutical enterprises.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="success" className="text-xs px-3 py-1">
                Top CTC: ₹28.5 LPA
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {placementHighlights.map((placement) => (
              <Card key={placement.id} className="overflow-hidden hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-base text-foreground">
                        {placement.studentName}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {placement.branch} • Batch {placement.year}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-extrabold text-primary">
                        ₹{placement.packageLPA} LPA
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-medium text-foreground">
                      <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{placement.company}</span>
                    </div>
                    <span className="text-muted-foreground">{placement.designation}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Events & Hackathons */}
      <section id="events" className="py-16 sm:py-20 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-4 w-4" />
              <span>Campus Life & Innovation</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground mt-2">
              Conferences, Hackathons & Seminars
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-2">
              Active student chapters, national competitions, and research symposiums hosted at GITM Gurgaon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event) => {
              const tags = event.tags ? event.tags.split(",").map((t) => t.trim()) : [];
              return (
                <Card key={event.id} className="flex flex-col justify-between hover:border-primary/50 transition-all">
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

      {/* Gurugram University Affiliation Details Banner */}
      <section className="py-12 bg-primary/10 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-lg font-bold text-foreground">
                Affiliated with Gurugram University, Established by Govt. of Haryana
              </h3>
              <p className="text-xs text-muted-foreground max-w-2xl">
                Degree certifications, examinations, and official syllabi adhere to Gurugram University statutory guidelines and UGC recognized degrees.
              </p>
            </div>
            <a
              href="https://gurugramuniversity.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-background px-4 py-2 text-xs font-semibold text-foreground border border-border shadow-sm hover:bg-accent transition-colors"
            >
              Visit Gurugram University Portal
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
