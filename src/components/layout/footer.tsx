import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, MessageCircle, ExternalLink, Clock } from "lucide-react";
import { site, complianceLinks } from "@/data/site";
import { footerNav } from "@/data/navigation";
import { SocialLinks } from "@/components/layout/social-links";

export function Footer() {
  return (
    <footer className="mt-auto border-t-4 border-gold bg-navy-dark text-stone-300">
      {/* Affiliation strip */}
      <div className="border-b border-white/10">
        <div className="container-page flex flex-wrap items-center justify-between gap-4 py-5">
          <div className="flex items-center gap-4">
            <span className="flex items-center rounded-sm bg-white px-3 py-1.5">
              <Image
                src="/images/web/logo/1_logo.webp"
                alt={`${site.name} logo`}
                width={230}
                height={56}
                className="h-9 w-auto"
              />
            </span>
            <div>
              <p className="font-editorial text-sm font-bold text-white">
                {site.name.toUpperCase()}
              </p>
              <p className="text-[11px] text-stone-400">
                Established {site.established} · Farrukhnagar, Gurugram, Haryana
              </p>
            </div>
          </div>
          <p className="text-[11px] leading-relaxed text-stone-400">
            Affiliated to Gurugram University · Approved by AICTE, Ministry of Education
            <br className="hidden sm:block" /> and Pharmacy Council of India · DTE Haryana Code{" "}
            {site.dteCode}
          </p>
        </div>
      </div>

      <div className="container-page grid gap-8 py-10 md:grid-cols-2 lg:grid-cols-6">
        {/* Address + contact */}
        <div className="space-y-3 lg:col-span-2">
          <h2 className="font-editorial text-sm font-bold uppercase tracking-wide text-amber-400">
            Campus
          </h2>
          <address className="space-y-1 text-xs not-italic leading-relaxed text-stone-300">
            {site.campus.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <p className="flex items-center gap-1.5 text-xs text-stone-400">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {site.hours.office}
          </p>

          <div className="space-y-1.5 pt-1 text-xs">
            <a
              href={site.phones.admissions.tel}
              className="flex items-center gap-2 font-semibold text-amber-400 hover:text-amber-300"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {site.phones.admissions.value}
              <span className="font-normal text-stone-400">(Admissions)</span>
            </a>
            <a
              href={site.phones.general.tel}
              className="flex items-center gap-2 hover:text-white"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {site.phones.general.value}
              <span className="text-stone-500">(General)</span>
            </a>
            <a href={`mailto:${site.emails.general}`} className="flex items-center gap-2 hover:text-white">
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              {site.emails.general}
            </a>
          </div>

          <a
            href={site.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-700"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp us
          </a>
        </div>

        {/* Nav columns */}
        {footerNav.map((column) => (
          <nav key={column.heading} aria-label={column.heading}>
            <h2 className="font-editorial text-sm font-bold uppercase tracking-wide text-amber-400">
              {column.heading}
            </h2>
            <ul className="mt-3 space-y-2 text-xs">
              {column.links.map((link) => {
                const external = link.href.startsWith("http");
                return (
                  <li key={link.href + link.label}>
                    {external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:text-white"
                      >
                        {link.label}
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    ) : (
                      <Link href={link.href} className="hover:text-white">
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        ))}
      </div>

      {/* Compliance + socials */}
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-wide text-stone-500">
              Statutory &amp; public disclosure
            </h2>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px]">
              {complianceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <SocialLinks />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-4 text-[11px] text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3" aria-hidden="true" />
            Farrukhnagar, Gurugram, Haryana 122506
          </p>
        </div>
      </div>
    </footer>
  );
}
