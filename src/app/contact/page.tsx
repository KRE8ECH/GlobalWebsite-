import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle, Clock, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { InquiryForm } from "@/components/admissions/inquiry-form";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact GITM Gurugram — admissions helpline, general enquiry numbers, department emails, campus address at Farrukhnagar and the Delhi office.",
  alternates: { canonical: "/contact" },
};

const departments = [
  { name: "Admissions", phone: site.phones.admissions, email: site.emails.admissions },
  { name: "General enquiries", phone: site.phones.general, email: site.emails.general },
  { name: "Administration", phone: site.phones.administration, email: site.emails.administration },
  { name: "Corporate Relations (TPO)", phone: site.phones.generalAlt, email: site.emails.placements },
  { name: "Hostel", phone: site.phones.hostel, email: site.emails.hostel },
];

export default function ContactPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.campus.mapQuery)}&output=embed`;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to us"
        intro="Admissions counsellors are available Monday to Saturday. Choose whichever channel suits you — phone, WhatsApp, email or the form below."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="border-b border-stone-200 bg-white py-12 sm:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {/* Primary contact */}
            <div className="space-y-4">
              <a
                href={site.phones.admissions.tel}
                className="flex items-start gap-3 rounded-md border border-crimson/25 bg-crimson/5 p-4 hover:border-crimson"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-crimson text-white">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-wide text-crimson">
                    {site.phones.admissions.label}
                  </span>
                  <span className="block font-editorial text-xl font-bold text-navy">
                    {site.phones.admissions.value}
                  </span>
                  <span className="block text-[11px] text-stone-600">{site.hours.counselling}</span>
                </span>
              </a>

              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-emerald-900 hover:border-emerald-500"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                <span className="text-sm font-bold">Message us on WhatsApp</span>
                <ExternalLink className="ml-auto h-4 w-4" aria-hidden="true" />
              </a>

              <div className="rounded-md border border-stone-200 p-4">
                <h2 className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-stone-500">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {site.campus.label}
                </h2>
                <address className="mt-1 text-sm not-italic leading-relaxed text-stone-700">
                  {site.campus.lines.join(", ")}
                </address>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.campus.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-crimson hover:underline"
                >
                  Open in Google Maps
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>

              <div className="rounded-md border border-stone-200 p-4">
                <h2 className="text-[10px] font-bold uppercase tracking-wide text-stone-500">
                  {site.delhi.label}
                </h2>
                <address className="mt-1 text-sm not-italic leading-relaxed text-stone-700">
                  {site.delhi.lines.join(", ")}
                </address>
                <a
                  href={site.phones.delhiOffice.tel}
                  className="mt-1 flex items-center gap-1.5 text-sm font-bold text-navy hover:text-crimson"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  {site.phones.delhiOffice.value}
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="mt-4 overflow-hidden rounded-md border border-stone-200">
              <iframe
                src={mapSrc}
                title="Map showing the GITM Gurugram campus location"
                width="100%"
                height="260"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block border-0"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            {/* Department directory */}
            <h2 className="font-editorial text-xl font-bold text-navy">Department directory</h2>
            <div className="mt-3 overflow-x-auto rounded-md border border-stone-200">
              <table className="w-full min-w-[420px] text-left text-sm">
                <caption className="sr-only">Department contact numbers and emails</caption>
                <thead className="bg-stone-50 text-[10px] uppercase tracking-wide text-stone-500">
                  <tr>
                    <th scope="col" className="px-4 py-2.5 font-bold">Department</th>
                    <th scope="col" className="px-4 py-2.5 font-bold">Phone</th>
                    <th scope="col" className="px-4 py-2.5 font-bold">Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {departments.map((department) => (
                    <tr key={department.name}>
                      <th scope="row" className="px-4 py-2.5 font-semibold text-navy">
                        {department.name}
                      </th>
                      <td className="whitespace-nowrap px-4 py-2.5">
                        <a href={department.phone.tel} className="text-stone-700 hover:text-crimson">
                          {department.phone.value}
                        </a>
                      </td>
                      <td className="px-4 py-2.5">
                        <a href={`mailto:${department.email}`} className="text-stone-700 hover:text-crimson">
                          {department.email}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-2 flex items-center gap-1.5 text-[11px] text-stone-500">
              <Clock className="h-3 w-3" aria-hidden="true" />
              Office hours: {site.hours.office} · Sunday closed
            </p>

            {/* Enquiry form */}
            <div className="mt-8 overflow-hidden rounded-md border border-stone-200 bg-white shadow-sm">
              <div className="border-b border-stone-200 bg-paper px-5 py-3">
                <h2 className="font-editorial text-base font-bold text-navy">Send an enquiry</h2>
                <p className="text-[11px] text-stone-500">
                  Goes directly to the admissions desk. Reply within one working day.
                </p>
              </div>
              <InquiryForm idPrefix="contact" />
            </div>

            <p className="mt-3 flex items-start gap-2 text-[11px] text-stone-500">
              <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              For documents and formal correspondence, write to {site.emails.general}. For
              certificate or transcript requests, contact the administration office.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
