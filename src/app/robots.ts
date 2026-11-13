import type { MetadataRoute } from "next";
import { site } from "@/data/site";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || site.url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/policies/draft"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
