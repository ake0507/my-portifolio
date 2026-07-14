import { Section } from "@/components/ui/Section";
import { timeline } from "@/lib/data";

export function ProjectTimeline() {
  return (
    <Section
      id="timeline"
      title="Project Timeline"
      subtitle="A typical project flow from discovery to launch."
      className="bg-slate-50"
    >
      <ol className="relative mx-auto max-w-3xl">
        {timeline.map((phase, index) => (
          <li key={phase.phase} className="relative pb-10 pl-8 last:pb-0">
            {index < timeline.length - 1 && (
              <span
                className="absolute left-[11px] top-6 h-full w-0.5 bg-indigo-200"
                aria-hidden="true"
              />
            )}
            <span
              className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-bold text-slate-900">{phase.phase}</h3>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                  {phase.duration}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{phase.description}</p>
              <p className="mt-1 text-xs text-slate-400">{phase.date}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
