import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import type { EventItem } from "@/lib/types";
import { formatDate, relativeDays } from "@/lib/utils";

export function EventsSection({ events }: { events: EventItem[] }) {
  return (
    <section
      id="events"
      aria-labelledby="events-heading"
      className="border-b border-stone-200 bg-white py-14 sm:py-20"
    >
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wide text-crimson">
              Campus life
            </p>
            <h2
              id="events-heading"
              className="mt-2 font-editorial text-2xl font-extrabold text-navy sm:text-4xl"
            >
              Conferences, seminars and campus events
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              Technical symposia, hackathons, guest lectures and sports meets hosted at the
              Farrukhnagar campus.
            </p>
          </div>
          <Link
            href="/events"
            className="inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-sm border border-stone-300 px-5 text-sm font-bold text-navy hover:border-navy/40 md:self-auto"
          >
            All events
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {events.slice(0, 3).map((event) => (
            <li key={event.slug}>
              <article className="flex h-full flex-col overflow-hidden rounded-md border border-stone-200 bg-white transition-shadow hover:shadow-md">
                {event.imageUrl && (
                  <div className="relative aspect-[16/9] overflow-hidden bg-stone-100">
                    <Image
                      src={event.imageUrl}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <span className="absolute left-2 top-2 rounded-sm bg-navy/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                      {relativeDays(event.date)}
                    </span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-4">
                  <ul className="flex flex-wrap gap-1">
                    {event.tags.slice(0, 3).map((tag) => (
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
                  <p className="mt-2 text-xs leading-relaxed text-stone-600 line-clamp-3">
                    {event.summary}
                  </p>
                  <div className="mt-auto flex flex-col gap-1 pt-3 text-[11px] text-stone-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      <time dateTime={event.date}>{formatDate(event.date)}</time>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3" aria-hidden="true" />
                      {event.location}
                    </span>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
