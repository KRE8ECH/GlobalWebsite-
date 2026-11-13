import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, MapPin, ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBand } from "@/components/layout/cta-band";
import { getEventBySlug, getEvents } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const revalidate = 1800;

export async function generateStaticParams() {
  const events = await getEvents(50);
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return {};
  return {
    title: event.title,
    description: event.summary.slice(0, 155),
    alternates: { canonical: `/events/${event.slug}` },
    openGraph: {
      title: event.title,
      description: event.summary.slice(0, 155),
      images: event.imageUrl ? [{ url: event.imageUrl }] : undefined,
    },
  };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  return (
    <>
      <PageHero
        eyebrow="Campus event"
        title={event.title}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Events", href: "/events" },
          { label: event.title.slice(0, 40) + (event.title.length > 40 ? "…" : "") },
        ]}
      >
        <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            <time dateTime={event.date}>{formatDate(event.date)}</time>
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {event.location}
          </span>
        </div>
      </PageHero>

      <section className="border-b border-stone-200 bg-white py-12">
        <div className="container-page grid gap-8 lg:grid-cols-12">
          <article className="lg:col-span-8">
            {event.imageUrl && (
              <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-stone-200">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  sizes="(min-width: 1024px) 800px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            )}
            <p className="mt-5 text-sm leading-relaxed text-stone-700">{event.summary}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {event.tags.map((tag) => (
                <li key={tag} className="rounded-sm bg-stone-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-stone-600">
                  {tag}
                </li>
              ))}
            </ul>
          </article>

          <aside className="lg:col-span-4">
            <div className="rounded-md border border-stone-200 bg-paper p-4">
              <h2 className="text-xs font-bold uppercase tracking-wide text-stone-500">Event details</h2>
              <dl className="mt-2 space-y-2 text-xs">
                <div>
                  <dt className="text-stone-500">Date</dt>
                  <dd className="font-semibold text-navy">{formatDate(event.date)}</dd>
                </div>
                <div>
                  <dt className="text-stone-500">Venue</dt>
                  <dd className="font-semibold text-navy">{event.location}</dd>
                </div>
              </dl>
              <Link href="/events" className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold text-crimson hover:underline">
                <ArrowLeft className="h-3 w-3" aria-hidden="true" />
                All events
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
