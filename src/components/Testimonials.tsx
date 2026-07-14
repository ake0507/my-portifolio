"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  return (
    <Section
      id="testimonials"
      title="Testimonials"
      subtitle="What clients say about working together."
      className="bg-white"
    >
      <div className="mx-auto max-w-3xl">
        <article className="relative rounded-2xl border border-slate-200 bg-slate-50 p-8 sm:p-12">
          <Quote
            className="absolute left-6 top-6 text-indigo-200 sm:left-8 sm:top-8"
            size={48}
            aria-hidden="true"
          />

          <blockquote className="relative">
            <p className="text-lg leading-relaxed text-slate-700 sm:text-xl">
              &ldquo;{current.quote}&rdquo;
            </p>
            <footer className="mt-6 border-t border-slate-200 pt-6">
              <cite className="not-italic">
                <span className="block font-semibold text-slate-900">{current.name}</span>
                <span className="text-sm text-slate-500">
                  {current.role}, {current.company}
                </span>
              </cite>
              <p className="mt-2 text-sm font-medium text-emerald-600">{current.result}</p>
            </footer>
          </blockquote>
        </article>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setActive((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={`Testimonial ${index + 1}`}
                onClick={() => setActive(index)}
                className={`h-2.5 w-2.5 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                  index === active ? "bg-indigo-600" : "bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setActive((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </Section>
  );
}
