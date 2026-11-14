import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Library, FlaskConical, Home, Bus, Wifi, Dumbbell } from "lucide-react";
import { campusFacts } from "@/data/site";
import { CampusTour } from "@/components/home/campus-tour";

const facilities = [
  {
    icon: Library,
    title: "Central library",
    detail: `${campusFacts.libraryVolumes} books and journals, with national and international e-resources.`,
  },
  {
    icon: FlaskConical,
    title: "Laboratories",
    detail: `${campusFacts.computerLabs} computer labs with ${campusFacts.computers} systems, plus civil, mechanical, electronics and pharmacy labs.`,
  },
  {
    icon: Wifi,
    title: "Campus connectivity",
    detail: `Wi-Fi across campus on a ${campusFacts.internetLeasedLine} leased line.`,
  },
  {
    icon: Home,
    title: "Hostels",
    detail: campusFacts.hostels,
  },
  {
    icon: Bus,
    title: "Transport",
    detail: "Institute bus service covering Gurugram, Farrukhnagar, Pataudi and Jhajjar routes.",
  },
  {
    icon: Dumbbell,
    title: "Sports & grounds",
    detail: "Cricket, basketball and volleyball grounds, athletics track and indoor games.",
  },
];

export function CampusSection() {
  return (
    <section
      id="campus-life"
      aria-labelledby="campus-heading"
      className="border-b border-stone-200 bg-paper py-14 sm:py-20"
    >
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-wide text-crimson">
              Campus &amp; facilities
            </p>
            <h2
              id="campus-heading"
              className="mt-2 font-editorial text-2xl font-extrabold text-navy sm:text-4xl"
            >
              {campusFacts.acres} acres, {campusFacts.builtUpSqFt} built up
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              The campus at Kheda Khurrampur is a purpose-built residential campus: academic
              blocks, laboratories, library, workshops, hostels and playing fields within
              walking distance of each other.
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {facilities.map((facility) => {
                const Icon = facility.icon;
                return (
                  <li key={facility.title} className="rounded-md border border-stone-200 bg-white p-3">
                    <p className="flex items-center gap-1.5 text-xs font-bold text-navy">
                      <Icon className="h-3.5 w-3.5 text-crimson" aria-hidden="true" />
                      {facility.title}
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-stone-600">
                      {facility.detail}
                    </p>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/campus-life"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-crimson"
            >
              Explore campus life
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="lg:col-span-7">
            {/* Official campus tour video with poster + lazy loading. */}
            <CampusTour />

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { src: "/images/web/campus/154_about.webp", alt: "Academic block and lawns" },
                { src: "/images/web/general/11_about-img.webp", alt: "Campus building" },
                { src: "/images/web/campus/108_Sports-meet1.webp", alt: "Annual sports meet" },
              ].map((photo) => (
                <div
                  key={photo.src}
                  className="relative aspect-[4/3] overflow-hidden rounded-sm border border-stone-200 bg-stone-100"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 220px, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
