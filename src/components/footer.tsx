import Link from "next/link";
import { GraduationCap, Mail, Phone, MapPin, Award, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Affiliation */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-base">GITM GURGAON</h3>
                <p className="text-xs text-muted-foreground">Est. 2008</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Global Institute of Technology & Management is a premier engineering, management, and pharmacy institution located in Gurugram, Delhi-NCR.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-primary font-medium">
              <Award className="h-4 w-4" />
              <span>Affiliated to Gurugram University, Gurugram</span>
            </div>
          </div>

          {/* Col 2: Academic Programs */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              Academic Programs
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="#programs" className="hover:text-primary transition-colors">
                  B.Tech in Computer Science (CSE)
                </Link>
              </li>
              <li>
                <Link href="#programs" className="hover:text-primary transition-colors">
                  B.Tech in Artificial Intelligence & Data Science
                </Link>
              </li>
              <li>
                <Link href="#programs" className="hover:text-primary transition-colors">
                  Master of Business Administration (MBA)
                </Link>
              </li>
              <li>
                <Link href="#programs" className="hover:text-primary transition-colors">
                  Bachelor of Computer Applications (BCA)
                </Link>
              </li>
              <li>
                <Link href="#programs" className="hover:text-primary transition-colors">
                  Bachelor of Pharmacy (B.Pharm)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links & University Portal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              Important Portals
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://gurugramuniversity.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  Gurugram University Portal
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <Link href="#notices" className="hover:text-primary transition-colors">
                  Exam & Academic Notices
                </Link>
              </li>
              <li>
                <Link href="#placements" className="hover:text-primary transition-colors">
                  Placement Statistics & Drives
                </Link>
              </li>
              <li>
                <Link href="#inquiry" className="hover:text-primary transition-colors">
                  Online Admission Inquiry
                </Link>
              </li>
              <li>
                <Link href="#events" className="hover:text-primary transition-colors">
                  Campus Life & Hackathons
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              Campus Location
            </h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-1 text-primary shrink-0" />
                <span>
                  5 KM Milestone, Kheda Khurrampur, Farrukhnagar - Haily Mandi Road, Gurugram, Haryana 122506
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>+91-124-2365000 / +91-9818812345</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>admissions@gitm.ac.in / info@gitm.ac.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>© {new Date().getFullYear()} Global Institute of Technology & Management, Gurgaon. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Affiliation: Gurugram University</span>
            <span>•</span>
            <span>AICTE Approved</span>
            <span>•</span>
            <span>PCI Approved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

