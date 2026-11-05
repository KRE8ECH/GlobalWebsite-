import Link from "next/link";
import { GraduationCap, Mail, Phone, MapPin, Award, ExternalLink, ShieldCheck, Landmark } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#132c49] bg-[#0b1e32] text-stone-200 text-xs">
      {/* Top Footer Strip: Institutional Affiliations */}
      <div className="border-b border-[#153456] py-6 px-4 sm:px-6 bg-[#081726]">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-white p-1 border border-stone-200 shrink-0 overflow-hidden">
              <img
                src="/images/official/logo/logo_1_logo.png"
                alt="GITM Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-editorial text-base font-bold text-white tracking-tight">
                GLOBAL INSTITUTE OF TECHNOLOGY & MANAGEMENT
              </h3>
              <p className="text-[11px] text-stone-400">
                Approved by AICTE, Ministry of Education, Govt. of India • Affiliated to Gurugram University, Haryana
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-stone-300">
            <span className="flex items-center gap-1.5 text-amber-400">
              <ShieldCheck className="h-4 w-4" />
              DTE Haryana Code: 074
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-stone-300">
              <Award className="h-4 w-4 text-amber-400" />
              PCI Approved
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: About & Campus */}
          <div className="space-y-3">
            <h4 className="font-editorial text-sm font-bold uppercase tracking-wider text-amber-400">
              About the Institute
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Established in 2008, GITM Gurgaon is an autonomous seat of technical excellence committed to grooming industry-ready engineers, innovators, and business leaders across 20 green acres in Delhi-NCR.
            </p>
            <div className="pt-2 text-[11px] text-stone-400 space-y-1">
              <div>Estd. Year: <strong>2008</strong></div>
              <div>Affiliation: <strong>Gurugram University, Sector 51, Gurugram</strong></div>
              <div>Campus Size: <strong>20-Acre Wi-Fi Enabled Eco Campus</strong></div>
            </div>
          </div>

          {/* Col 2: Academic Programs */}
          <div>
            <h4 className="font-editorial text-sm font-bold uppercase tracking-wider text-amber-400 mb-3">
              Approved Degree Programs
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <Link href="#programs" className="hover:text-amber-400 transition-colors">
                  B.Tech in Computer Science & Engineering (180 Seats)
                </Link>
              </li>
              <li>
                <Link href="#programs" className="hover:text-amber-400 transition-colors">
                  B.Tech in Artificial Intelligence & Data Science (60 Seats)
                </Link>
              </li>
              <li>
                <Link href="#programs" className="hover:text-amber-400 transition-colors">
                  Master of Business Administration - MBA (60 Seats)
                </Link>
              </li>
              <li>
                <Link href="#programs" className="hover:text-amber-400 transition-colors">
                  Bachelor of Computer Applications - BCA (60 Seats)
                </Link>
              </li>
              <li>
                <Link href="#programs" className="hover:text-amber-400 transition-colors">
                  Bachelor of Pharmacy - B.Pharm (60 Seats)
                </Link>
              </li>
              <li>
                <Link href="#programs" className="hover:text-amber-400 transition-colors">
                  Diploma in Mechanical & Civil Engineering
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Statutory Portals & Links */}
          <div>
            <h4 className="font-editorial text-sm font-bold uppercase tracking-wider text-amber-400 mb-3">
              Institutional Portals
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <a
                  href="https://gurugramuniversity.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
                >
                  Gurugram University Main Portal
                  <ExternalLink className="h-3 w-3 text-stone-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://erp.gitmgurgaon.com/student"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
                >
                  Student ERP Portal Login
                  <ExternalLink className="h-3 w-3 text-stone-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://erp.gitmgurgaon.com/staff"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
                >
                  Faculty & Staff Management Portal
                  <ExternalLink className="h-3 w-3 text-stone-400" />
                </a>
              </li>
              <li>
                <Link href="#notices" className="hover:text-amber-400 transition-colors">
                  Official Circulars & Date Sheets
                </Link>
              </li>
              <li>
                <Link href="#placements" className="hover:text-amber-400 transition-colors">
                  Corporate Resource Centre (CRC)
                </Link>
              </li>
              <li>
                <Link href="#calendar" className="hover:text-amber-400 transition-colors">
                  Annual Academic Calendar 2026-27
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Location & Helpline */}
          <div>
            <h4 className="font-editorial text-sm font-bold uppercase tracking-wider text-amber-400 mb-3">
              Campus Location & Contact
            </h4>
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 text-amber-400 shrink-0" />
                <span>
                  5 KM Milestone, Kheda Khurrampur, Farrukhnagar - Haily Mandi Road, Gurugram, Delhi-NCR, Haryana 122506
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Admissions: +91-9555 100 100 / 0124-2426000</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                <span>admissions@gitm.ac.in • info@gitm.ac.in</span>
              </div>
              <div className="pt-2">
                <a
                  href="#inquiry"
                  className="inline-block bg-[#881337] hover:bg-[#70102e] text-white font-bold uppercase tracking-wider text-[11px] px-3.5 py-2 rounded-sm"
                >
                  Submit Admission Inquiry
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="mt-10 pt-5 border-t border-[#132c49] flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-3">
          <p>© {new Date().getFullYear()} Global Institute of Technology & Management (GITM), Gurugram. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span>AICTE File No: 06/06/HAR/ENGG/2008/01</span>
            <span>•</span>
            <span>PCI Approval No: 32-1135</span>
            <span>•</span>
            <span>Affiliation: Gurugram University</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
