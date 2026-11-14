import { campusFacts, placementStats } from "@/data/site";

/**
 * Institutional facts at a glance. Every value is derived from src/data/site.ts
 * so the numbers can never drift apart again.
 */
export function StatStrip() {
  const stats = [
    { value: String(placementStats.headline.highestLpa), unit: "LPA", label: "Highest package" },
    {
      value: String(placementStats.headline.studentsPlacedLatest),
      unit: "+",
      label: `Students placed (${placementStats.headline.highestYear})`,
    },
    { value: String(campusFacts.acres), unit: "acres", label: "Green campus" },
    { value: campusFacts.computerLabs.toString(), unit: "labs", label: "Computer laboratories" },
  ];

  return (
    <section aria-label="Institute at a glance" className="border-b border-stone-200 bg-white">
      <div className="container-page">
        <dl className="grid grid-cols-2 divide-stone-200 sm:grid-cols-4 sm:divide-x">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`py-6 sm:px-6 ${index < 2 ? "border-b border-stone-200 sm:border-b-0" : ""} ${
                index % 2 === 1 ? "border-l border-stone-200 pl-4 sm:border-l-0 sm:pl-6" : ""
              }`}
            >
              <dd className="font-editorial text-2xl font-black text-navy sm:text-3xl">
                {stat.value}{" "}
                <span className="text-xs font-bold uppercase tracking-wide text-gold">
                  {stat.unit}
                </span>
              </dd>
              <dt className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-stone-500">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
