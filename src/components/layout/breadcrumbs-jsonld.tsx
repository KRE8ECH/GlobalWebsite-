import type { Crumb } from "@/components/layout/page-hero";
import { site } from "@/data/site";

/**
 * BreadcrumbList structured data derived from the same `crumbs` array the page
 * passes to PageHero, so the two can never disagree. A malformed or drifting
 * breadcrumb is worse than none: Google drops the rich result and may show a
 * different path than the page displays.
 */
export function BreadcrumbsJsonLd({ crumbs }: { crumbs: Crumb[] }) {
  if (crumbs.length < 2) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: crumbs.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.label,
            ...(crumb.href ? { item: `${site.url}${crumb.href === "/" ? "" : crumb.href}` } : {}),
          })),
        }),
      }}
    />
  );
}
