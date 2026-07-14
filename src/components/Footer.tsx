import { ExternalLink, Mail } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-white">{siteConfig.name}</p>
            <p className="mt-2 text-sm">{siteConfig.title}</p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-4 gap-y-2" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3">
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2 text-sm hover:text-white"
            >
              <Mail size={16} aria-hidden="true" />
              {siteConfig.email}
            </a>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white"
              >
                LinkedIn
                <ExternalLink size={14} aria-hidden="true" />
              </a>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white"
              >
                GitHub
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          &copy; {year} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
