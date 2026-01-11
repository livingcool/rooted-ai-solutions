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
import Seo from "@/components/Seo";

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
      <Seo
        title="RootedAI - Intelligent AI Solutions & Automation"
        description="RootedAI empowers businesses with cutting-edge Artificial Intelligence, Process Automation, and Web Solutions. Transform your operations today."
        keywords={[
          "AI software development company",
          "enterprise AI solutions",
          "custom AI integration",
          "digital transformation agency",
          "generative AI services",
          "LLM development",
          "business process automation",
          "AI consulting firm",
          "RootedAI",
          "cognitive computing"
        ]}
        canonical="https://rootedai.com"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "RootedAI",
          "url": "https://rootedai.com",
          "logo": "https://rootedai.com/logo.png",
          "sameAs": [
            "https://www.linkedin.com/company/rootedai",
            "https://twitter.com/rootedai",
            "https://github.com/rootedai"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-7904168521",
            "contactType": "customer service",
            "areaServed": "Global",
            "availableLanguage": ["English"]
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN"
          },
          "description": "RootedAI is a premier AI software development company specializing in autonomous agents, process automation, and enterprise web solutions."
        }}
      />
      <div className="relative z-10">
        <Navigation />
        <div id="hero">
          <Hero />
        </div>

        <RevealOnScroll delay={0.2}>
          <TechStackMarquee />
        </RevealOnScroll>

        <div id="about">
          <RevealOnScroll>
            <About />
          </RevealOnScroll>
        </div>

        <div id="services">
          <RevealOnScroll>
            <Services />
          </RevealOnScroll>
        </div>



        <div id="case-studies">
          <RevealOnScroll>
            <CaseStudies />
          </RevealOnScroll>
        </div>

        <div id="products">
          <RevealOnScroll>
            <Products />
          </RevealOnScroll>
        </div>

        <div id="careers">
          <RevealOnScroll>
            <Careers />
          </RevealOnScroll>
        </div>

        <div id="contact">
          <RevealOnScroll>
            <Contact />
          </RevealOnScroll>
        </div>

        <RevealOnScroll>
          <Footer />
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default Index;
