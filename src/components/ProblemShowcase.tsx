import { AlertCircle, CheckCircle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { problems } from "@/lib/data";

export function ProblemShowcase() {
  return (
    <Section
      id="problems"
      title="Problems I Solve"
      subtitle="Real challenges from real clients — and the outcomes that follow."
      className="bg-slate-50"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {problems.map((item, index) => (
          <article
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Problem {index + 1}: {item.title}
            </p>
            <div className="mt-4 flex gap-3">
              <AlertCircle
                className="mt-0.5 shrink-0 text-amber-500"
                size={20}
                aria-hidden="true"
              />
              <p className="text-sm text-slate-600">{item.problem}</p>
            </div>
            <div className="mt-4 flex gap-3">
              <CheckCircle
                className="mt-0.5 shrink-0 text-emerald-500"
                size={20}
                aria-hidden="true"
              />
              <p className="text-sm font-medium text-slate-800">{item.solution}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
