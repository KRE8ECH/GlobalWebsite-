import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBand } from "@/components/layout/cta-band";
import { policies, policyBySlug } from "@/data/policies";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return policies.map((policy) => ({ slug: policy.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const policy = policyBySlug(slug);
  if (!policy) return {};
  return {
    title: policy.title,
    description: policy.summary,
    alternates: { canonical: `/policies/${policy.slug}` },
  };
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = policyBySlug(slug);
  if (!policy) notFound();

  const others = policies.filter((item) => item.slug !== policy.slug).slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow={policy.regulation ?? "Statutory disclosure"}
        title={policy.title}
        intro={policy.summary}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Policies", href: "/policies/privacy" },
          { label: policy.title },
        ]}
      />

      <section className="border-b border-stone-200 bg-white py-12">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <article className="lg:col-span-8">
            <p className="text-[11px] text-stone-500">
              Last reviewed {formatDate(policy.updated)}
            </p>

            <div className="mt-5 space-y-8">
              {policy.sections.map((section) => (
                <section key={section.heading} aria-labelledby={`h-${section.heading.replace(/\W+/g, "-")}`}>
                  <h2
                    id={`h-${section.heading.replace(/\W+/g, "-")}`}
                    className="font-editorial text-lg font-bold text-navy"
                  >
                    {section.heading}
                  </h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="mt-2 text-sm leading-relaxed text-stone-700">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="mt-2 space-y-1.5">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2 text-sm text-stone-700">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-crimson" aria-hidden="true" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.todo && (
                    <p className="mt-3 flex items-start gap-2 rounded-sm border border-amber-300 bg-amber-50 p-3 text-[11px] leading-relaxed text-amber-900">
                      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>
                        <strong>To be completed by the institute:</strong> {section.todo}
                      </span>
                    </p>
                  )}
                </section>
              ))}
            </div>

            <div className="mt-10 rounded-md border border-stone-200 bg-paper p-4">
              <h2 className="text-sm font-bold text-navy">Need help with this?</h2>
              <p className="mt-1 text-xs leading-relaxed text-stone-600">
                Contact the institute office for anything related to this page. If you believe a
                statutory disclosure is missing or out of date, please tell us so it can be
                corrected.
              </p>
            </div>
          </article>

          <aside className="lg:col-span-4">
            <div className="sticky top-32 rounded-md border border-stone-200 bg-paper p-4">
              <h2 className="text-[10px] font-bold uppercase tracking-wide text-stone-500">
                Related policies
              </h2>
              <ul className="mt-2 space-y-1">
                {others.map((item) => (
                  <li key={item.slug}>
                    <a
                      href={`/policies/${item.slug}`}
                      className="block rounded-sm px-2 py-1.5 text-xs font-semibold text-navy hover:bg-white hover:text-crimson"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand
        title="Questions about a policy?"
        body="The institute office can clarify anything on this page and will confirm the position in writing where required."
      />
    </>
  );
}
