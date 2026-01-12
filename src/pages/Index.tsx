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
        title="RootedAI - Engineering Intelligence & Enterprise Automation"
        description="Engineering Intelligence. COMPLEXITY. SIMPLIFIED. RootedAI delivers autonomous agents, logistics automation, and hiring solutions for scaling enterprises."
        keywords={[
          "RootedAI",
          "Engineering Intelligence",
          "AI agents",
          "hiring automation",
          "logistics AI",
          "process automation",
          "enterprise AI solutions",
          "generative AI services",
          "custom LLM development",
          "scale",
          "business intelligence"
        ]}
        canonical="https://rootedai.com"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "name": "RootedAI",
              "url": "https://rootedai.com",
              "logo": "https://rootedai.com/logo.png",
              "slogan": "Engineering Intelligence. COMPLEXITY. SIMPLIFIED.",
              "sameAs": [
                "https://www.linkedin.com/company/rootdai",
                "https://twitter.com/rootedai",
                "https://www.instagram.com/rootedai_official/"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-7904168521",
                "contactType": "sales",
                "areaServed": "Global",
                "availableLanguage": ["English"]
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN",
                "addressRegion": "TN",
                "addressLocality": "Hosur"
              }
            },
            {
              "@type": "WebSite",
              "name": "RootedAI",
              "url": "https://rootedai.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://rootedai.com/?s={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          ]
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
