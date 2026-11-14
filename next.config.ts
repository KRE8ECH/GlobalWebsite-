import type { NextConfig } from "next";

/**
 * Baseline security headers. A college site publishes fee schedules, admission
 * offers and contact details — it is a routine target for phishing clones and
 * clickjacking, and there is no reason not to send these.
 */
const securityHeaders = [
  // Block framing entirely: nothing here needs to be embedded.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    // Geolocation/mic/camera are not used; deny them rather than inherit.
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next injects inline bootstrap scripts; styles are inline via Tailwind runtime.
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "media-src 'self'",
      // Google Maps embed on the contact page.
      "frame-src https://www.google.com https://maps.google.com",
      "connect-src 'self'",
      "form-action 'self' https://admissions.gitmgurgaon.com",
      "base-uri 'self'",
      "object-src 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    // Serve modern formats; next/image handles resizing and lazy loading.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1600],
  },

  // Don't advertise the framework version.
  poweredByHeader: false,

  // NOTE: Tailwind v4 is compiled through PostCSS (postcss.config.mjs). The
  // previous config also registered @tailwindcss/turbopack as a *.css loader,
  // which silently produced a stripped stylesheet with NO utility classes —
  // every page rendered unstyled in production. Do not re-add it.

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      // /_next/static/* is already served immutable by Next.js — do not override
      // it here, or `next dev` warns and HMR breaks.
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
      {
        source: "/videos/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000" }],
      },
    ];
  },
};

export default nextConfig;
