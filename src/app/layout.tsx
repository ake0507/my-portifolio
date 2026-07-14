import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Aklilu Desalegn – Full-Stack Developer, Graphic Designer, Virtual Assistant",
  description:
    "Portfolio of Aklilu Desalegn, a full-stack developer and graphic designer with 2+ years experience. Offering web development, branding, and VA services. Contact for custom solutions.",
  keywords: [
    "full-stack developer",
    "graphic designer",
    "virtual assistant",
    "web development",
    "branding",
    "Aklilu Desalegn",
  ],
  authors: [{ name: "Aklilu Desalegn" }],
  openGraph: {
    title: "Aklilu Desalegn – Full-Stack Developer, Graphic Designer, Virtual Assistant",
    description:
      "Portfolio of Aklilu Desalegn. Web development, branding, and virtual assistant services.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white font-sans text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
