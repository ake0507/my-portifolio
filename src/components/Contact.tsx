"use client";

import { FormEvent, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/data";

type FormStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    setSuccessMessage("");
    setPreviewUrl("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to send message");
      }

      setStatus("success");
      setSuccessMessage(
        typeof data.message === "string"
          ? data.message
          : "Your message has been sent. I'll get back to you within 48 hours.",
      );
      if (typeof data.previewUrl === "string") {
        setPreviewUrl(data.previewUrl);
      }
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <Section
      id="contact"
      title="Contact"
      subtitle="Ready to start? Send a message and I'll get back to you within 48 hours."
      className="bg-white"
    >
      <div className="mx-auto grid max-w-4xl gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="text-slate-600">
            Whether you need a new website, brand assets, or ongoing virtual assistant
            support, I&apos;d love to hear about your project.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Email
              </h3>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-1 block text-lg font-medium text-indigo-600 hover:text-indigo-700"
              >
                {siteConfig.email}
              </a>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Social
              </h3>
              <ul className="mt-2 space-y-1" role="list">
                <li>
                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <p className="text-sm text-slate-500">All fields required.</p>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              minLength={2}
              maxLength={100}
              placeholder="Your Name"
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Your Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="you@example.com"
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700">
              Your Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              minLength={10}
              maxLength={2000}
              rows={5}
              placeholder="Type your message..."
              className="mt-1.5 w-full resize-y rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              aria-required="true"
            />
          </div>

          {status === "success" && (
            <div
              role="status"
              className="space-y-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
            >
              <p>{successMessage}</p>
              {previewUrl && (
                <p>
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-emerald-800"
                  >
                    View test email preview
                  </a>
                </p>
              )}
            </div>
          )}

          {status === "error" && (
            <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            aria-label="Send Message"
          >
            {status === "loading" ? (
              <>
                <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                Sending...
              </>
            ) : (
              <>
                <Send size={18} aria-hidden="true" />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </Section>
  );
}
