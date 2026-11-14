import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBand } from "@/components/layout/cta-band";
import { leadership, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Leadership & Messages",
  description:
    "Messages from the Founder and Chairman of GITM Gurugram, and the vision and mission of the Baljeet Singh Education Society.",
  alternates: { canonical: "/about/leadership" },
};

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Governance"
        title="Leadership & messages"
        intro={`GITM is governed by the ${site.society}. Its leadership sets academic direction and institutional policy.`}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Leadership" },
        ]}
      />

      <section className="border-b border-stone-200 bg-white py-12 sm:py-16">
        <div className="container-page max-w-4xl space-y-10">
          {leadership.map((leader) => (
            <article key={leader.name} className="rounded-md border border-stone-200 p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <Image
                  src={leader.image}
                  alt={`Portrait of ${leader.name}`}
                  width={120}
                  height={120}
                  className="h-28 w-28 shrink-0 rounded-sm object-cover"
                />
                <div>
                  <h2 className="font-editorial text-xl font-bold text-navy">{leader.name}</h2>
                  <p className="text-xs font-bold uppercase tracking-wide text-crimson">{leader.role}</p>
                  <blockquote className="mt-3 border-l-2 border-gold pl-3 text-sm italic leading-relaxed text-stone-700">
                    “{leader.quote}”
                  </blockquote>
                  <p className="mt-3 text-sm leading-relaxed text-stone-700">{leader.bio}</p>
                </div>
              </div>
            </article>
          ))}

          <div className="rounded-md border border-stone-200 bg-paper p-5 sm:p-6">
            <h2 className="font-editorial text-xl font-bold text-navy">Vision</h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-700">
              To make Global Institute of Technology &amp; Management a premier institution with
              an unparallelled commitment to excellence and quality education of global
              dimensions, enabling students to take on confidently the present world of evolving
              technology and management.
            </p>

            <h2 className="mt-6 font-editorial text-xl font-bold text-navy">Mission</h2>
            <ul className="mt-2 space-y-1.5">
              {[
                "Deliver technical and management education aligned with industry practice and the National Education Policy 2020.",
                "Build an environment where research, innovation and entrepreneurship are ordinary activities, not exceptions.",
                "Develop graduates with the communication, judgement and ethical grounding to lead teams.",
                "Serve the surrounding community through outreach, extension work and access to education.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-stone-700">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-crimson" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[11px] text-stone-500">
              Full versions of the founder&rsquo;s and chairman&rsquo;s messages are available from
              the institute office on request.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
