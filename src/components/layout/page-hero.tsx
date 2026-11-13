import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

/**
 * Page header with breadcrumbs. Every inner page uses this so the hierarchy is
 * consistent for users and for search engines — the site previously had exactly
 * one page, so there was no hierarchy at all.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-stone-200 bg-navy text-white">
      <div className="container-page py-10 sm:py-14">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-[11px] text-stone-400">
            {crumbs.map((crumb, index) => {
              const isLast = index === crumbs.length - 1;
              return (
                <li key={crumb.label} className="flex items-center gap-1">
                  {index > 0 && (
                    <ChevronRight className="h-3 w-3 text-stone-600" aria-hidden="true" />
                  )}
                  {crumb.href && !isLast ? (
                    <Link href={crumb.href} className="hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={isLast ? "text-stone-200" : undefined} aria-current={isLast ? "page" : undefined}>
                      {crumb.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {eyebrow && (
          <p className="mt-5 text-xs font-bold uppercase tracking-wide text-amber-400">{eyebrow}</p>
        )}
        <h1 className="mt-2 max-w-3xl font-editorial text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {intro && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-200 sm:text-base">{intro}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
