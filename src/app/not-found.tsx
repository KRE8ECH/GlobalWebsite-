import Link from "next/link";
import { primaryNav } from "@/data/navigation";

export default function NotFound() {
  return (
    <section className="border-b border-stone-200 bg-white py-20">
      <div className="container-page max-w-2xl text-center">
        <p className="font-mono text-sm font-bold text-crimson">404</p>
        <h1 className="mt-2 font-editorial text-3xl font-extrabold text-navy sm:text-4xl">
          That page does not exist
        </h1>
        <p className="mt-3 text-sm text-stone-600">
          The link may be out of date, or the page may have moved. Here are the places most people
          are looking for:
        </p>

        <ul className="mt-6 flex flex-wrap justify-center gap-2">
          {primaryNav
            .filter((item) => item.href)
            .map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href!}
                  className="inline-flex rounded-sm border border-stone-300 px-3 py-1.5 text-xs font-bold text-navy hover:border-navy/40"
                >
                  {item.label}
                </Link>
              </li>
            ))}
        </ul>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/programmes"
            className="inline-flex h-11 items-center rounded-sm bg-crimson px-5 text-sm font-bold uppercase tracking-wide text-white hover:bg-crimson-dark"
          >
            Browse programmes
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center rounded-sm border border-stone-300 px-5 text-sm font-bold text-navy hover:border-navy/40"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
