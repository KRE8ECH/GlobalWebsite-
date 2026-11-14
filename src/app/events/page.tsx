import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBand } from "@/components/layout/cta-band";
import { NoticeBoard } from "@/components/notices/notice-board";
import { getEvents, getNotices } from "@/lib/content";
import { academicCalendar } from "@/data/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Events & Notices",
  description:
    "Upcoming events at GITM Gurugram and the current notice board of examination, admission and Gurugram University circulars.",
  alternates: { canonical: "/events" },
};

export const revalidate = 1800;

export default async function EventsPage() {
  const [events, notices] = await Promise.all([getEvents(12), getNotices(20)]);

  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title="Events & notices"
        intro="Technical symposia, sports meets and guest lectures, plus every current circular from the institute and Gurugram University."
        crumbs={[{ label: "Home", href: "/" }, { label: "Events & notices" }]}
      >
        <div className="flex flex-wrap gap-3">
          <a
            href="#notices"
            className="inline-flex h-11 items-center gap-2 rounded-sm bg-crimson px-5 text-sm font-bold uppercase tracking-wide text-white hover:bg-crimson-dark"
          >
            Notice board
          </a>
          <a
            href="#calendar"
            className="inline-flex h-11 items-center gap-2 rounded-sm border border-white/25 bg-white/5 px-5 text-sm font-bold hover:bg-white/15"
          >
            Academic calendar
          </a>
        </div>
      </PageHero>

      <section className="border-b border-stone-200 bg-white py-12 sm:py-16">
        <div className="container-page">
          <h2 className="font-editorial text-2xl font-extrabold text-navy">Upcoming &amp; recent events</h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <li key={event.slug}>
                <article className="flex h-full flex-col overflow-hidden rounded-md border border-stone-200 bg-white hover:shadow-md">
                  {event.imageUrl && (
                    <div className="relative aspect-[16/9] bg-stone-100">
                      <Image
                        src={event.imageUrl}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-4">
                    <ul className="flex flex-wrap gap-1">
                      {event.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-sm bg-stone-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-stone-600"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <h3 className="mt-2 font-editorial text-base font-bold leading-snug text-navy">
                      <Link href={`/events/${event.slug}`} className="hover:text-crimson">
                        {event.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-stone-600">{event.summary}</p>
                    <div className="mt-auto space-y-1 pt-3 text-[11px] text-stone-500">
                      <p className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" aria-hidden="true" />
                        <time dateTime={event.date}>{formatDate(event.date)}</time>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        {event.location}
                      </p>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <NoticeBoard notices={notices} />

      <section id="calendar" className="scroll-mt-32 border-b border-stone-200 bg-white py-12 sm:py-16">
        <div className="container-page">
          <h2 className="font-editorial text-2xl font-extrabold text-navy">Academic calendar</h2>
          <div className="mt-4 overflow-x-auto rounded-md border border-stone-200">
            <table className="w-full min-w-[560px] text-left text-sm">
              <caption className="sr-only">Academic calendar entries</caption>
              <thead className="bg-stone-50 text-[10px] uppercase tracking-wide text-stone-500">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-bold">Date</th>
                  <th scope="col" className="px-4 py-2.5 font-bold">Item</th>
                  <th scope="col" className="px-4 py-2.5 font-bold">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {academicCalendar.map((item) => (
                  <tr key={item.id}>
                    <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs text-navy">{item.dateLabel}</td>
                    <td className="px-4 py-2.5">
                      <p className="font-semibold text-navy">{item.title}</p>
                      <p className="text-[11px] text-stone-500">{item.description}</p>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="rounded-sm bg-stone-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-stone-600">
                        {item.kind.toLowerCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[11px] text-stone-500">
            Indicative dates. Gurugram University and Government of Haryana notifications prevail.
          </p>

          <Link
            href="/campus-life#calendar"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-crimson"
          >
            Campus life &amp; calendar
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
