import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Library, FlaskConical, Home, Bus, Wifi, Dumbbell, Utensils, HeartPulse, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBand } from "@/components/layout/cta-band";
import { CampusTour } from "@/components/home/campus-tour";
import { campusFacts, site } from "@/data/site";
import { academicCalendar } from "@/data/content";

export const metadata: Metadata = {
  title: "Campus Life & Facilities",
  description:
    "Life on GITM Gurugram's 18-acre residential campus: laboratories, a 20,000-volume library, hostels for boys and girls, sports facilities, transport and the academic calendar.",
  alternates: { canonical: "/campus-life" },
};

const facilities = [
  {
    icon: Library,
    title: "Central library",
    detail: `${campusFacts.libraryVolumes} books and national and international journals, with e-journal access and reading rooms.`,
  },
  {
    icon: FlaskConical,
    title: "Laboratories",
    detail: `${campusFacts.computerLabs} computer laboratories with ${campusFacts.computers} systems, plus civil, mechanical, electronics and pharmacy laboratories.`,
  },
  {
    icon: Wifi,
    title: "Connectivity",
    detail: `Campus-wide Wi-Fi on a ${campusFacts.internetLeasedLine} leased line.`,
  },
  {
    icon: Home,
    title: "Hostels",
    detail: campusFacts.hostels,
  },
  {
    icon: Bus,
    title: "Transport",
    detail: "Institute bus service on Gurugram, Farrukhnagar, Pataudi and Jhajjar routes. Ask for the current route chart.",
  },
  {
    icon: Dumbbell,
    title: "Sports",
    detail: "Cricket, basketball and volleyball grounds, athletics track and indoor games, with an annual inter-collegiate meet.",
  },
  {
    icon: Utensils,
    title: "Cafeteria",
    detail: "Subsidised cafeteria serving vegetarian and non-vegetarian meals on campus.",
  },
  {
    icon: HeartPulse,
    title: "Health & welfare",
    detail: "First aid room, visiting medical officer and access to nearby hospitals in Farrukhnagar and Gurugram.",
  },
];

const gallery = [
  { src: "/images/web/campus/154_about.webp", alt: "Academic blocks and lawns" },
  { src: "/images/web/general/11_about-img.webp", alt: "Campus building exterior" },
  { src: "/images/web/campus/108_Sports-meet1.webp", alt: "Annual sports meet in progress" },
  { src: "/images/web/general/107_science-day.webp", alt: "Science day exhibition" },
  { src: "/images/web/general/101_Expert-talk.webp", alt: "Expert talk in the seminar hall" },
  { src: "/images/web/campus/86_eve15.webp", alt: "Cultural event on campus" },
];

const kindTone = {
  HOLIDAY: "bg-emerald-50 text-emerald-800 border-emerald-200",
  ACADEMIC: "bg-stone-100 text-stone-700 border-stone-200",
  EXAM: "bg-navy/5 text-navy border-navy/20",
} as const;

export default function CampusLifePage() {
  return (
    <>
      <PageHero
        eyebrow="Campus life"
        title={`${campusFacts.acres} acres in Farrukhnagar`}
        intro={`A purpose-built residential campus with ${campusFacts.builtUpSqFt} of constructed area, hostels for boys and girls, and academic, workshop and sports facilities within walking distance of each other.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Campus life" }]}
      />

      {/* Tour */}
      <section className="border-b border-stone-200 bg-white py-12 sm:py-16">
        <div className="container-page">
          <h2 className="font-editorial text-2xl font-extrabold text-navy">Take the tour</h2>
          <p className="mt-2 max-w-2xl text-sm text-stone-600">
            The official campus film, plus photographs from the academic blocks, laboratories and
            the annual sports meet.
          </p>
          <div className="mt-5 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <CampusTour />
            </div>
            <div className="lg:col-span-4">
              <ul className="grid grid-cols-2 gap-2 lg:grid-cols-1">
                {gallery.slice(0, 4).map((photo) => (
                  <li key={photo.src} className="relative aspect-[4/3] overflow-hidden rounded-sm border border-stone-200">
                    <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section id="facilities" className="scroll-mt-32 border-b border-stone-200 bg-paper py-12 sm:py-16">
        <div className="container-page">
          <h2 className="font-editorial text-2xl font-extrabold text-navy">Facilities</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facilities.map((facility) => {
              const Icon = facility.icon;
              return (
                <li key={facility.title} className="rounded-md border border-stone-200 bg-white p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-navy text-white">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-navy">{facility.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-stone-600">{facility.detail}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Hostel */}
      <section id="hostel" className="scroll-mt-32 border-b border-stone-200 bg-white py-12 sm:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-editorial text-2xl font-extrabold text-navy">Hostel &amp; residence</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-stone-700">
              <p>
                The institute operates in-house hostels for both boys and girls, with a choice of
                air-conditioned and non-air-conditioned rooms. Hostel accommodation is optional and
                billed separately from tuition.
              </p>
              <p>
                The hostel warden handles room allocation, mess arrangements, visitor rules and
                leave approvals. Parents should note that hostel places are limited and are
                confirmed on a first-come basis each session.
              </p>
            </div>
            <dl className="mt-4 grid gap-2 sm:grid-cols-2">
              <div className="rounded-md border border-stone-200 p-3">
                <dt className="text-[10px] font-bold uppercase tracking-wide text-stone-500">Hostel office</dt>
                <dd className="mt-0.5">
                  <a href={site.phones.hostel.tel} className="text-sm font-bold text-navy hover:text-crimson">
                    {site.phones.hostel.value}
                  </a>
                </dd>
                <dd className="text-[11px] text-stone-500">{site.emails.hostel}</dd>
              </div>
              <div className="rounded-md border border-stone-200 p-3">
                <dt className="text-[10px] font-bold uppercase tracking-wide text-stone-500">Transport office</dt>
                <dd className="mt-0.5 text-[11px] text-stone-600">
                  Route and fee queries through the general helpline: {site.phones.general.value}
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-stone-200">
              <Image
                src="/images/web/general/14_c9.webp"
                alt="Students on the GITM Gurugram campus"
                fill
                sizes="(min-width: 1024px) 400px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Academic calendar */}
      <section id="calendar" className="scroll-mt-32 border-b border-stone-200 bg-paper py-12 sm:py-16">
        <div className="container-page">
          <h2 className="font-editorial text-2xl font-extrabold text-navy">Academic calendar</h2>
          <p className="mt-2 max-w-2xl text-sm text-stone-600">
            Key dates for the current session. Gazetted holidays follow Government of Haryana
            notifications; examination dates follow Gurugram University.
          </p>

          <ol className="mt-5 space-y-2">
            {academicCalendar.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-2 rounded-md border border-stone-200 bg-white p-4 sm:flex-row sm:items-center sm:gap-4"
              >
                <span className={`self-start rounded-sm border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${kindTone[item.kind]}`}>
                  {item.kind.toLowerCase()}
                </span>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-navy">{item.title}</h3>
                  <p className="mt-0.5 text-xs text-stone-600">{item.description}</p>
                </div>
                <p className="shrink-0 font-mono text-xs font-bold text-navy sm:text-right">
                  {item.dateLabel}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-3 text-[11px] text-stone-500">
            Dates are indicative and may be revised by Gurugram University or the Government of
            Haryana. Check the notices page or the Samarth portal for the operative schedule.
          </p>

          <Link
            href="/events#notices"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-crimson"
          >
            Current notices
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <CtaBand
        title="Visit the campus before you decide"
        body="Campus visits run Monday to Saturday. Call ahead so a counsellor can walk you through the labs, library and hostels."
      />
    </>
  );
}
