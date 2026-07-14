import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { pricingPackages } from "@/lib/data";

const featureLabels = [
  { key: "development" as const, label: "Full-Stack Dev" },
  { key: "design" as const, label: "Graphic Design" },
  { key: "va" as const, label: "Virtual Assistant" },
];

export function Pricing() {
  return (
    <Section
      id="pricing"
      title="Services & Pricing"
      subtitle="Flexible packages to match your scope. Custom quotes and hourly rates also available."
      className="bg-slate-50"
    >
      <div className="mb-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-left text-sm">
          <caption className="sr-only">Pricing package comparison</caption>
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th scope="col" className="px-6 py-4 font-semibold text-slate-900">
                Feature / Package
              </th>
              {pricingPackages.map((pkg) => (
                <th
                  key={pkg.name}
                  scope="col"
                  className={`px-6 py-4 font-semibold ${
                    pkg.highlighted ? "bg-indigo-50 text-indigo-900" : "text-slate-900"
                  }`}
                >
                  {pkg.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featureLabels.map((feature) => (
              <tr key={feature.key} className="border-b border-slate-100">
                <th scope="row" className="px-6 py-4 font-medium text-slate-700">
                  {feature.label}
                </th>
                {pricingPackages.map((pkg) => (
                  <td
                    key={`${pkg.name}-${feature.key}`}
                    className={`px-6 py-4 text-slate-600 ${
                      pkg.highlighted ? "bg-indigo-50/50" : ""
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Check size={16} className="shrink-0 text-emerald-500" aria-hidden="true" />
                      {pkg.features[feature.key]}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th scope="row" className="px-6 py-4 font-semibold text-slate-900">
                Price
              </th>
              {pricingPackages.map((pkg) => (
                <td
                  key={`${pkg.name}-price`}
                  className={`px-6 py-4 text-lg font-bold ${
                    pkg.highlighted ? "bg-indigo-50 text-indigo-700" : "text-slate-900"
                  }`}
                >
                  {pkg.price}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {pricingPackages.map((pkg) => (
          <div
            key={pkg.name}
            className={`rounded-2xl border p-6 ${
              pkg.highlighted
                ? "border-indigo-300 bg-indigo-50 shadow-md"
                : "border-slate-200 bg-white shadow-sm"
            }`}
          >
            {pkg.highlighted && (
              <span className="mb-3 inline-block rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                Most Popular
              </span>
            )}
            <h3 className="text-xl font-bold text-slate-900">{pkg.name}</h3>
            <p className="mt-2 text-2xl font-bold text-indigo-600">{pkg.price}</p>
            <p className="mt-3 text-sm text-slate-600">{pkg.description}</p>
            <a
              href="#contact"
              className={`mt-6 block rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                pkg.highlighted
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              }`}
            >
              Get a Quote
            </a>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-slate-600">
        Hourly rates and retainer options (e.g. 20 hrs/month) are also available.{" "}
        <a href="#contact" className="font-semibold text-indigo-600 hover:text-indigo-700">
          Contact me for a custom quote.
        </a>
      </p>
    </Section>
  );
}
