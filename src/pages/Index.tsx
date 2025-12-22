import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import CaseStudies from "@/components/CaseStudies";
import Products from "@/components/Products";
import Careers from "@/components/Careers";
import Contact from "@/components/Contact";

import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import TechStackMarquee from "@/components/TechStackMarquee";

const Index = () => {
  useEffect(() => {
    // Prevent browser from restoring scroll position
    if (history.scrollRestoration) {
      history.scrollRestoration = "manual";
    }

    // Force scroll to top
    window.scrollTo(0, 0);

    // Backup scroll to top after a small delay to ensure it overrides any async behavior
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10">
        <Navigation />
        <Hero />

        <RevealOnScroll delay={0.2}>
          <TechStackMarquee />
        </RevealOnScroll>

        <RevealOnScroll>
          <About />
        </RevealOnScroll>
        <RevealOnScroll>
          <Services />
        </RevealOnScroll>
        <RevealOnScroll>
          <CaseStudies />
        </RevealOnScroll>
        <RevealOnScroll>
          <Products />
        </RevealOnScroll>
        <RevealOnScroll>
          <Careers />
        </RevealOnScroll>
        <RevealOnScroll>
          <Contact />
        </RevealOnScroll>

        <RevealOnScroll>
          <Footer />
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default Index;
