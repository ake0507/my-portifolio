import { ArrowRight, Mail } from "lucide-react";
import { siteConfig } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #6366f1 0%, transparent 50%), radial-gradient(circle at 75% 75%, #818cf8 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="mb-4 inline-block rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-200">
          {siteConfig.experience}
        </p>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {siteConfig.name}
          <span className="mt-2 block text-2xl font-semibold text-indigo-300 sm:text-3xl lg:text-4xl">
            {siteConfig.title}
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
          Hi, I&apos;m {siteConfig.name.split(" ")[0]}. I build end-to-end web applications
          and brand assets, and I streamline business tasks — all backed by{" "}
          {siteConfig.experience}.
        </p>

        <p className="mt-3 max-w-2xl text-base text-slate-400">{siteConfig.tagline}</p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Let&apos;s Work Together
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur transition-all hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            View Projects
          </a>
        </div>

        <div className="mt-12 flex items-center gap-2 text-sm text-slate-400">
          <Mail size={16} aria-hidden="true" />
          <span>Or email me at</span>
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-medium text-indigo-300 underline-offset-4 hover:text-indigo-200 hover:underline"
          >
            {siteConfig.email}
          </a>
        </div>
      </div>
    </section>
  );
}
