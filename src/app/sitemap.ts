import type { MetadataRoute } from "next";
import { site, programs } from "@/data/site";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || site.url;

/**
 * Only real, indexable routes belong here. The previous sitemap listed hash
 * fragments ("/#programs"), which Google ignores, and programme detail URLs that
 * did not exist — actively harming crawl trust.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about/leadership`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/about/approvals`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/programmes`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/admissions`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/admissions/fees`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/admissions/scholarships`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/placements`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/campus-life`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/events`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  ];

  const policyRoutes: MetadataRoute.Sitemap = [
    "privacy",
    "terms",
    "mandatory-disclosure",
    "anti-ragging",
    "icc",
    "grievance",
    "reservation-cell",
  ].map((slug) => ({
    url: `${baseUrl}/policies/${slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.4,
  }));

  const programmeRoutes: MetadataRoute.Sitemap = programs.map((programme) => ({
    url: `${baseUrl}/programmes/${programme.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...programmeRoutes, ...policyRoutes];
}
