import { Section } from "@/components/ui/Section";
import { skills } from "@/lib/data";

const categories = ["Development", "Design", "VA"] as const;

export function Skills() {
  return (
    <Section
      id="skills"
      title="Skills & Tech Stack"
      subtitle="Technologies and tools I use to deliver results — demonstrated in real projects, not progress bars."
      className="bg-slate-50"
    >
      <div className="grid gap-8 md:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="mb-4 text-lg font-semibold text-slate-900">{category}</h3>
            <ul className="flex flex-wrap gap-2" role="list">
              {skills
                .filter((s) => s.category === category)
                .map((skill) => (
                  <li key={skill.name}>
                    <span className="inline-block rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700">
                      {skill.name}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
