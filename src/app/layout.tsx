import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://gitm.ac.in";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Global Institute of Technology & Management | GITM Gurgaon (Affiliated to Gurugram University)",
    template: "%s | GITM Gurgaon",
  },
  description:
    "Official portal of GITM Gurgaon, premier engineering, management, and pharmacy college affiliated with Gurugram University. Explore B.Tech CSE, AI & Data Science, MBA, BCA, B.Pharm programs, placement records, and live university notices.",
  keywords: [
    "GITM Gurgaon",
    "Global Institute of Technology and Management",
    "Gurugram University Affiliated College",
    "B.Tech Admissions Gurgaon 2026",
    "B.Tech AI Data Science Haryana",
    "Top Engineering College Delhi NCR",
    "MBA College Gurgaon",
    "BCA College Gurugram",
    "B.Pharm College Haryana PCI Approved",
  ],
  authors: [{ name: "GITM Academic Council" }],
  creator: "Global Institute of Technology & Management",
  publisher: "Gurugram University Affiliated Institutes",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Global Institute of Technology & Management | GITM Gurgaon",
    description:
      "Premier engineering, management, and pharmacy institution affiliated with Gurugram University. Approved by AICTE & PCI. ₹28.5 LPA top package and 100+ recruiters.",
    url: baseUrl,
    siteName: "GITM Gurgaon",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GITM Gurgaon Campus - Affiliated to Gurugram University",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GITM Gurgaon | Engineering, Management & Pharmacy",
    description:
      "Affiliated to Gurugram University. Admissions open for 2026-27 in B.Tech, MBA, BCA, and B.Pharm.",
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
};

// JSON-LD Structured Data Schema for CollegeOrUniversity & Courses
const collegeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollegeOrUniversity",
      "@id": "https://gitm.ac.in/#institution",
      "name": "Global Institute of Technology & Management",
      "alternateName": ["GITM Gurgaon", "GITM"],
      "url": "https://gitm.ac.in",
      "logo": "https://gitm.ac.in/logo.png",
      "image": "https://gitm.ac.in/og-image.jpg",
      "description":
        "Premier engineering, management, and pharmacy college in Gurgaon, affiliated with Gurugram University, approved by AICTE & PCI.",
      "telephone": "+91-9555100100",
      "email": "admissions@gitm.ac.in",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "5 KM Milestone, Kheda Khurrampur, Farrukhnagar - Haily Mandi Road",
        "addressLocality": "Gurugram",
        "addressRegion": "Haryana",
        "postalCode": "122506",
        "addressCountry": "IN",
      },
      "sameAs": [
        "https://gurugramuniversity.ac.in",
        "https://www.facebook.com/gitmgurgaonofficial",
        "https://www.linkedin.com/school/gitmgurgaon",
      ],
    },
    {
      "@type": "Course",
      "@id": "https://gitm.ac.in/#btech-cse",
      "name": "B.Tech in Computer Science & Engineering",
      "description":
        "4-Year undergraduate engineering program in Computer Science covering cloud systems, algorithms, AI, and software architecture under Gurugram University.",
      "educationalCredentialAwarded": "Bachelor of Technology",
      "timeRequired": "P4Y",
      "provider": {
        "@id": "https://gitm.ac.in/#institution",
      },
    },
    {
      "@type": "Course",
      "@id": "https://gitm.ac.in/#btech-ai-ds",
      "name": "B.Tech in Artificial Intelligence & Data Science",
      "description":
        "Specialized degree in machine learning, neural networks, computer vision, and large scale data engineering.",
      "educationalCredentialAwarded": "Bachelor of Technology",
      "timeRequired": "P4Y",
      "provider": {
        "@id": "https://gitm.ac.in/#institution",
      },
    },
    {
      "@type": "Course",
      "@id": "https://gitm.ac.in/#mba",
      "name": "Master of Business Administration (MBA)",
      "description":
        "Postgraduate management program with dual specializations in Marketing, Finance, Human Resources, and Business Analytics.",
      "educationalCredentialAwarded": "Master of Business Administration",
      "timeRequired": "P2Y",
      "provider": {
        "@id": "https://gitm.ac.in/#institution",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        {/* Inject JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(collegeStructuredData),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="top-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
