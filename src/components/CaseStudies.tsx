import { Section } from "@/components/ui/Section";
import { caseStudies } from "@/lib/data";

export function CaseStudies() {
  return (
    <Section
      id="portfolio"
      title="Portfolio & Case Studies"
      subtitle="Problem-solution narratives with measurable impact."
      className="bg-white"
    >
      <div className="space-y-12">
        {caseStudies.map((study, index) => (
          <article
            key={study.title}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
              <h3 className="text-xl font-bold text-slate-900">{study.title}</h3>
            </div>

            <div className="grid gap-6 p-6 lg:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-600">
                    Problem
                  </h4>
                  <p className="mt-2 text-slate-600">{study.problem}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                    Solution
                  </h4>
                  <p className="mt-2 text-slate-600">{study.solution}</p>
                </div>
                <div className="rounded-lg bg-indigo-50 p-4">
                  <h4 className="text-sm font-semibold text-indigo-800">Impact</h4>
                  <p className="mt-1 text-sm font-medium text-indigo-700">{study.impact}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <figure className="overflow-hidden rounded-xl border border-slate-200">
                  <div
                    className="flex h-40 items-center justify-center bg-slate-200 text-center text-xs font-medium text-slate-500 sm:h-48"
                    role="img"
                    aria-label={study.beforeLabel}
                  >
                    Before
                  </div>
                  <figcaption className="px-3 py-2 text-xs text-slate-500">
                    {study.beforeLabel}
                  </figcaption>
                </figure>
                <figure className="overflow-hidden rounded-xl border border-indigo-200">
                  <div
                    className="flex h-40 items-center justify-center bg-indigo-100 text-center text-xs font-medium text-indigo-600 sm:h-48"
                    role="img"
                    aria-label={study.afterLabel}
                  >
                    After
                  </div>
                  <figcaption className="px-3 py-2 text-xs text-slate-500">
                    {study.afterLabel}
                  </figcaption>
                </figure>
              </div>
            </div>

            {index < caseStudies.length - 1 && (
              <div className="px-6 pb-6">
                <a
                  href="#contact"
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Request a similar project →
                </a>
              </div>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
