import { About } from "@/components/About";
import { CaseStudies } from "@/components/CaseStudies";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";
import { ProblemShowcase } from "@/components/ProblemShowcase";
import { ProjectFlow } from "@/components/ProjectFlow";
import { Services } from "@/components/Services";
import { Skills } from "@/components/Skills";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <ProblemShowcase />
        <CaseStudies />
        <Testimonials />
        <Pricing />
        <ProjectFlow />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
