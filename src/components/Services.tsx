import { Calendar, Code, Palette } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { services } from "@/lib/data";

const iconMap = {
  code: Code,
  palette: Palette,
  calendar: Calendar,
} as const;

export function Services() {
  return (
    <Section
      id="services"
      title="Services"
      subtitle="Three core offerings to help your business grow — development, design, and support."
      className="bg-white"
    >
      <div className="grid gap-8 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = iconMap[service.icon as keyof typeof iconMap];
          return (
            <article
              key={service.id}
              className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 inline-flex rounded-xl bg-indigo-100 p-3 text-indigo-600">
                <Icon size={28} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
              <p className="mt-3 text-slate-600">{service.description}</p>
              <ul className="mt-6 space-y-2" role="list">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-slate-700"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <a
          href="#pricing"
          className="inline-flex items-center rounded-lg border border-indigo-600 px-6 py-3 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Compare Plans
        </a>
      </div>
    </Section>
  );
}
