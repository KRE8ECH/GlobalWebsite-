import type { Metadata } from "next";
/* Self-hosted fonts: no third-party request, no FOUT from a blocked CDN, and
   the same files serve every region. Variable axes keep the payload small. */
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource/merriweather/400.css";
import "@fontsource/merriweather/700.css";
import "@fontsource/merriweather/900.css";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileBar } from "@/components/layout/mobile-bar";
import { site, socials } from "@/data/site";
import { Toaster } from "sonner";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || site.url;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${site.name} | GITM Gurugram — Engineering, Management & Pharmacy`,
    template: `%s | GITM Gurugram`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "GITM Gurgaon",
    "GITM Gurugram",
    "Global Institute of Technology and Management",
    "engineering college Gurugram",
    "AICTE approved college Delhi NCR",
    "Gurugram University affiliated college",
    "B.Tech admission Gurgaon 2026",
    "B.Tech AI Data Science Haryana",
    "MBA college Gurgaon",
    "BCA college Gurugram",
    "B.Pharm college Haryana PCI",
    "best engineering college in Delhi NCR",
  ],
  authors: [{ name: site.name, url: baseUrl }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  formatDetection: { email: false, address: true, telephone: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: baseUrl,
    siteName: "GITM Gurugram",
    title: `${site.name} | Engineering, Management & Pharmacy in Delhi NCR`,
    description: site.description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GITM Gurugram campus, Farrukhnagar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GITM Gurugram | Engineering, Management & Pharmacy",
    description: `${site.description} Admissions open for 2026-27.`,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "education",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className="h-full">
      <body className="flex min-h-screen flex-col">
        {/* Keyboard users must be able to skip the 3-row header. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-navy focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to main content
        </a>

        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileBar />
        <Toaster position="top-right" richColors closeButton />

        {/* Social profiles belong in the document head, not the body. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollegeOrUniversity",
              "@id": `${baseUrl}/#institution`,
              name: site.name,
              alternateName: ["GITM Gurgaon", "GITM Gurugram", "GITM Farrukhnagar"],
              url: baseUrl,
              logo: `${baseUrl}/images/web/logo/1_logo.webp`,
              image: `${baseUrl}/og-image.jpg`,
              foundingDate: "2008",
              description: site.description,
              telephone: site.phones.general.value,
              email: site.emails.general,
              address: {
                "@type": "PostalAddress",
                streetAddress: "5 KM Milestone, Kheda Khurrampur, Farrukhnagar – Haily Mandi Road",
                addressLocality: site.campus.addressLocality,
                addressRegion: site.campus.addressRegion,
                postalCode: site.campus.postalCode,
                addressCountry: site.campus.country,
              },
              sameAs: socials.map((s) => s.href),
            }),
          }}
        />
      </body>
    </html>
  );
}
