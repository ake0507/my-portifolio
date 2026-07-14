import { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, title, subtitle, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8 ${className}`}
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2
            id={`${id}-heading`}
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
