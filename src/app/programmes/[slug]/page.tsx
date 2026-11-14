import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2, Clock, GraduationCap, IndianRupee, ArrowRight, Phone } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBand } from "@/components/layout/cta-band";
import { InquiryForm } from "@/components/admissions/inquiry-form";
import { programs, programBySlug, formatInr, site } from "@/data/site";

/** Pre-render every programme page at build time. */
export function generateStaticParams() {
  return programs.map((programme) => ({ slug: programme.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const programme = programBySlug(slug);
  if (!programme) return {};

  return {
    title: programme.name,
    description: `${programme.name} at GITM Gurugram — ${programme.durationYears}-year ${
      programme.level === "LEET" ? "lateral entry" : programme.level
    } programme. ${programme.description.slice(0, 120)}`,
    alternates: { canonical: `/programmes/${programme.slug}` },
  };
}

/** Course structured data — makes the programme eligible for rich results. */
function courseSchema(slug: string) {
  const programme = programBySlug(slug);
  if (!programme) return null;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || site.url;

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: programme.name,
    description: programme.description,
    url: `${baseUrl}/programmes/${programme.slug}`,
    provider: {
      "@type": "CollegeOrUniversity",
      name: site.name,
      sameAs: baseUrl,
    },
    educationalCredentialAwarded: programme.level === "PG" ? "Postgraduate degree" : "Undergraduate degree",
    timeRequired: `P${programme.durationYears}Y`,
    ...(programme.annualFeeInr !== null && {
      offers: {
        "@type": "Offer",
        category: "Tuition",
        price: programme.annualFeeInr,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
    }),
  };
}

export default async function ProgrammePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const programme = programBySlug(slug);
  if (!programme) notFound();

  const related = programs
    .filter((item) => item.department === programme.department && item.slug !== programme.slug)
    .slice(0, 3);

  const schema = courseSchema(slug);

  return (
    <>
      <PageHero
        eyebrow={`${programme.department} · ${programme.level === "LEET" ? "Lateral entry" : programme.level}`}
        title={programme.name}
        intro={programme.description}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Programmes", href: "/programmes" },
          { label: programme.shortName },
        ]}
      >
        <dl className="grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { icon: Clock, label: "Duration", value: `${programme.durationYears} years` },
            {
              icon: GraduationCap,
              label: "Sanctioned intake",
              value: programme.intake ? `${programme.intake} seats` : "As per university",
            },
            {
              icon: IndianRupee,
              label: "Annual tuition",
              value: programme.annualFeeInr !== null ? formatInr(programme.annualFeeInr) : "On request",
            },
            { icon: CheckCircle2, label: "Level", value: programme.level === "LEET" ? "Lateral entry" : programme.level },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label}>
                <dt className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-stone-400">
                  <Icon className="h-3 w-3" aria-hidden="true" />
                  {item.label}
                </dt>
                <dd className="mt-0.5 font-editorial text-sm font-bold text-white">{item.value}</dd>
              </div>
            );
          })}
        </dl>
      </PageHero>

      <section className="border-b border-stone-200 bg-white py-12 sm:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-editorial text-xl font-bold text-navy">Eligibility</h2>
            <p className="mt-2 rounded-md border-l-4 border-gold bg-paper p-4 text-sm leading-relaxed text-stone-700">
              {programme.eligibility}
            </p>
            <p className="mt-2 text-[11px] text-stone-500">
              Admission is subject to Gurugram University ordinances and Haryana state
              reservation policy. Reserved-category candidates should check the applicable
              relaxation with the admissions office.
            </p>

            <h2 className="mt-8 font-editorial text-xl font-bold text-navy">
              What the programme covers
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-700">{programme.description}</p>

            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {programme.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2 rounded-md border border-stone-200 p-3 text-xs text-stone-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                  {highlight}
                </li>
              ))}
            </ul>

            <h2 className="mt-8 font-editorial text-xl font-bold text-navy">Fees</h2>
            <div className="mt-2 overflow-hidden rounded-md border border-stone-200">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">Fee structure for {programme.name}</caption>
                <tbody className="divide-y divide-stone-100">
                  <tr>
                    <th scope="row" className="px-4 py-3 font-medium text-stone-600">Annual tuition</th>
                    <td className="px-4 py-3 text-right font-semibold text-navy">
                      {programme.annualFeeInr !== null ? formatInr(programme.annualFeeInr) : "Contact the accounts office"}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-3 font-medium text-stone-600">Merit scholarship</th>
                    <td className="px-4 py-3 text-right text-navy">
                      <Link href="/admissions/scholarships" className="font-semibold text-crimson underline">
                        Up to 100% concession
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-3 font-medium text-stone-600">Hostel (optional)</th>
                    <td className="px-4 py-3 text-right text-navy">
                      <Link href="/contact" className="font-semibold text-crimson underline">
                        Ask for current rates
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-[11px] text-stone-500">
              Examination fees, one-time charges and bus fees are billed separately. This table is
              informational and is not a quotation.
            </p>

            {related.length > 0 && (
              <>
                <h2 className="mt-8 font-editorial text-xl font-bold text-navy">
                  Other {programme.department} programmes
                </h2>
                <ul className="mt-3 grid gap-2">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/programmes/${item.slug}`}
                        className="flex items-center justify-between gap-3 rounded-md border border-stone-200 px-4 py-3 text-sm hover:border-navy/40"
                      >
                        <span className="font-semibold text-navy">{item.name}</span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-stone-400" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Enquiry panel — programme pre-selected */}
          <aside className="lg:col-span-5">
            <div className="sticky top-32">
              <div className="overflow-hidden rounded-md border border-stone-200 bg-white shadow-sm">
                <div className="border-b border-stone-200 bg-paper px-5 py-3">
                  <h2 className="font-editorial text-base font-bold text-navy">
                    Ask about {programme.shortName}
                  </h2>
                  <p className="text-[11px] text-stone-500">
                    A counsellor replies within one working day.
                  </p>
                </div>
                <InquiryForm initialProgramme={programme.name} idPrefix={`prog-${programme.slug}`} compact />
              </div>

              <div className="mt-3 rounded-md border border-stone-200 bg-paper p-4">
                <p className="text-[10px] font-bold uppercase tracking-wide text-stone-500">
                  Prefer to call?
                </p>
                <a
                  href={site.phones.admissions.tel}
                  className="mt-1 flex items-center gap-2 font-editorial text-lg font-bold text-navy hover:text-crimson"
                >
                  <Phone className="h-4 w-4 text-crimson" aria-hidden="true" />
                  {site.phones.admissions.value}
                </a>
                <p className="mt-1 text-[11px] text-stone-500">{site.hours.counselling}</p>
              </div>

              <div className="mt-3 overflow-hidden rounded-md border border-stone-200">
                <Image
                  src="/images/web/general/11_about-img.webp"
                  alt="GITM Gurugram academic building"
                  width={600}
                  height={400}
                  className="h-36 w-full object-cover"
                />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand />

      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </>
  );
}
