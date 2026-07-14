import { Section } from "@/components/ui/Section";
import { projectFlow } from "@/lib/data";

export function ProjectFlow() {
  return (
    <Section
      id="project-flow"
      title="Project Flow"
      subtitle="How we move from idea to launch — step by step."
      className="bg-slate-50"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {projectFlow.map((step, index) => (
          <article
            key={step.phase}
            className="relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
              {index + 1}
            </span>
            <h3 className="font-bold text-slate-900">{step.phase}</h3>
            <p className="mt-2 text-sm text-slate-600">{step.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
