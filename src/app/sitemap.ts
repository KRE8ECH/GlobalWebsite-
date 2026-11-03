import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://gitm.ac.in";

  // Core static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/#programs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#notices`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#placements`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#inquiry`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  try {
    const programs = await prisma.program.findMany({
      select: { slug: true, updatedAt: true },
    });

    const programRoutes: MetadataRoute.Sitemap = programs.map((p) => ({
      url: `${baseUrl}/programs/${p.slug}`,
      lastModified: p.updatedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    }));

    return [...routes, ...programRoutes];
  } catch (error) {
    console.error("Error generating sitemap with database records:", error);
    return routes;
  }
}
