import { Section } from "@/components/ui/Section";

export function About() {
  return (
    <Section
      id="about"
      title="About Me"
      subtitle="Full-stack engineer, creative designer, and reliable virtual assistant."
      className="bg-white"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div
          className="mx-auto flex h-64 w-64 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-7xl font-bold text-white shadow-xl lg:mx-0 lg:h-80 lg:w-80"
          role="img"
          aria-label="Stylized avatar representing Aklilu Desalegn"
        >
          AD
        </div>

        <div className="space-y-4 text-slate-600">
          <p className="text-lg leading-relaxed">
            I&apos;m Aklilu, a full-stack software engineer and creative designer. Over 2
            years I&apos;ve built responsive web applications, crafted brand identities, and
            supported clients with administrative tasks.
          </p>
          <p className="leading-relaxed">
            I specialize in solving problems like turning outdated websites into fast,
            conversion-focused experiences and creating cohesive brand systems that work
            across every channel.
          </p>
          <p className="leading-relaxed">
            I&apos;m seeking opportunities to help businesses grow online — whether that
            means building a custom web app, designing memorable brand assets, or keeping
            your operations running smoothly behind the scenes.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Hire Me
          </a>
        </div>
      </div>
    </Section>
  );
}
