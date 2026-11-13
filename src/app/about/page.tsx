import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Building2, Users, BookOpen, Globe2 } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBand } from "@/components/layout/cta-band";
import { site, campusFacts, leadership } from "@/data/site";

export const metadata: Metadata = {
  title: "About GITM Gurugram",
  description:
    "Established in 2008, GITM Gurugram is an AICTE-approved institute affiliated to Gurugram University, with an 18-acre campus, 3 lakh sq ft of built-up area and 20,000+ library volumes.",
  alternates: { canonical: "/about" },
};

const pillars = [
  {
    icon: ShieldCheck,
    title: "Statutory approvals",
    body: "AICTE approval, DTE Haryana recognition, PCI approval for pharmacy programmes and permanent affiliation to Gurugram University.",
  },
  {
    icon: Building2,
    title: "Infrastructure",
    body: `${campusFacts.acres} acres, ${campusFacts.builtUpSqFt} constructed area, ${campusFacts.computerLabs} computer labs with ${campusFacts.computers} systems and a ${campusFacts.internetLeasedLine} leased line.`,
  },
  {
    icon: BookOpen,
    title: "Academic depth",
    body: `14 degree programmes across engineering, management, computer applications and pharmacy, with ${campusFacts.libraryVolumes} library volumes and e-journal access.`,
  },
  {
    icon: Users,
    title: "Student community",
    body: "Students from across Haryana and Delhi NCR, plus international students from Nepal, Bhutan, Bangladesh and the UAE.",
  },
];

/* Computed at module scope so render stays pure. */
const YEARS = new Date().getFullYear() - site.established;

export default function AboutPage() {

  return (
    <>
      <PageHero
        eyebrow="Institutional profile"
        title={`${YEARS} years of technical education in Haryana`}
        intro={`${site.name} was established in ${site.established} by the ${site.society}. This page sets out what the institute is, what it offers and how it is governed.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <section className="border-b border-stone-200 bg-white py-12 sm:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-editorial text-2xl font-extrabold text-navy">Who we are</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-stone-700">
              <p>
                {site.name} (GITM Farrukhnagar) is a private technical institute established in{" "}
                {site.established} under the {site.society}. It is approved by the All India
                Council for Technical Education (AICTE), Ministry of Education, Government of
                India, recognised by the Directorate of Technical Education, Government of
                Haryana, and affiliated to Gurugram University, Gurugram. The pharmacy
                programmes are approved by the Pharmacy Council of India.
              </p>
              <p>
                The campus is located at the 5 KM milestone on the Farrukhnagar – Haily Mandi
                Road, within the Gurugram district — one of the largest concentrations of
                IT, software and manufacturing employment in northern India. That location is
                deliberate: it is why recruiters from Cyber City, Golf Course Road and the
                industrial belt around Manesar and Bawal can run campus drives without
                disrupting a working day.
              </p>
              <p>
                Academically the institute follows the Gurugram University NEP 2020 credit
                framework, with AICTE model syllabus for engineering and PCI regulations for
                pharmacy. Alongside the degree programmes, GITM runs a Centre of Excellence, a
                Corporate Relations Centre, a Global Research &amp; Development Cell and a Centre
                for Community Services.
              </p>
              <p>
                Students come from across Haryana, Delhi NCR and neighbouring states, and from
                Nepal, Bhutan, Bangladesh and the UAE. Academic collaborations include{" "}
                {campusFacts.internationalCollaborations.join(" and ")}.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.title} className="rounded-md border border-stone-200 p-4">
                    <p className="flex items-center gap-2 text-sm font-bold text-navy">
                      <Icon className="h-4 w-4 text-crimson" aria-hidden="true" />
                      {pillar.title}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-stone-600">{pillar.body}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="overflow-hidden rounded-md border border-stone-200">
              <Image
                src="/images/web/campus/154_about.webp"
                alt="The GITM Gurugram academic blocks and lawns at Farrukhnagar"
                width={900}
                height={563}
                className="h-56 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="font-editorial text-base font-bold text-navy">Campus at a glance</h2>
                <dl className="mt-3 space-y-2 text-xs">
                  {[
                    ["Established", String(site.established)],
                    ["Campus area", `${campusFacts.acres} acres`],
                    ["Built-up area", campusFacts.builtUpSqFt],
                    ["Computer labs", `${campusFacts.computerLabs} labs, ${campusFacts.computers} systems`],
                    ["Library", `${campusFacts.libraryVolumes} volumes + e-journals`],
                    ["Hostels", campusFacts.hostels],
                    ["DTE Haryana code", site.dteCode],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-3 border-b border-stone-100 pb-2">
                      <dt className="text-stone-500">{label}</dt>
                      <dd className="text-right font-semibold text-navy">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="mt-4 rounded-md border border-stone-200 bg-paper p-4">
              <h2 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-stone-500">
                <Globe2 className="h-3.5 w-3.5" aria-hidden="true" />
                International collaborations
              </h2>
              <ul className="mt-2 space-y-1 text-xs text-stone-700">
                {campusFacts.internationalCollaborations.map((collaboration) => (
                  <li key={collaboration}>{collaboration}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Leadership */}
      <section className="border-b border-stone-200 bg-paper py-12 sm:py-16" aria-labelledby="leadership-heading">
        <div className="container-page">
          <h2 id="leadership-heading" className="font-editorial text-2xl font-extrabold text-navy">
            Leadership
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-stone-600">
            The institute is governed by the {site.society}.
          </p>

          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            {leadership.map((leader) => (
              <li key={leader.name} className="rounded-md border border-stone-200 bg-white p-5">
                <div className="flex items-start gap-4">
                  <Image
                    src={leader.image}
                    alt={`Portrait of ${leader.name}`}
                    width={80}
                    height={80}
                    className="h-20 w-20 shrink-0 rounded-sm object-cover"
                  />
                  <div>
                    <h3 className="font-editorial text-base font-bold text-navy">{leader.name}</h3>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-crimson">
                      {leader.role}
                    </p>
                  </div>
                </div>
                <blockquote className="mt-3 border-l-2 border-gold pl-3 text-xs italic leading-relaxed text-stone-600">
                  “{leader.quote}”
                </blockquote>
                <p className="mt-3 text-xs leading-relaxed text-stone-600">{leader.bio}</p>
              </li>
            ))}
          </ul>

          <Link
            href="/about/leadership"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-crimson"
          >
            Read the full messages
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
