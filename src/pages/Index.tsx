import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();

  useEffect(() => {
    // Prevent browser from restoring scroll position automatically
    if (history.scrollRestoration) {
      history.scrollRestoration = "manual";
    }

    const scrollToSection = () => {
      const path = location.pathname.replace(/^\//, ""); // Remove leading slash
      if (path && document.getElementById(path)) {
        // Scroll to section matches path (e.g. /services -> id="services")
        const el = document.getElementById(path);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else if (location.hash) {
        // Fallback to hash if present
        const id = location.hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Default to top if root
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(scrollToSection, 100);
    return () => clearTimeout(timer);
  }, [location]);

  // Dynamic SEO based on current path
  const getSeoData = () => {
    const path = location.pathname;

    if (path.includes("/about")) {
      return {
        title: "About Us - RootedAI",
        description: "Learn about RootedAI's mission to simplify enterprise complexity through engineering intelligence and autonomous agents."
      };
    }
    if (path.includes("/services")) {
      return {
        title: "Our Services - RootedAI",
        description: "From Process Automation to Predictive Analytics. Explore our comprehensive suite of AI solutions for scaling businesses."
      };
    }
    if (path.includes("/case-studies")) {
      return {
        title: "Case Studies - RootedAI",
        description: "See how we've helped SMEs and enterprises save millions and automate workflows. Real results, real data."
      };
    }
    if (path.includes("/products")) {
      return {
        title: "Our Products - RootedAI",
        description: "Discover our flagship AI products designed to streamline your operations and hiring processes."
      };
    }
    if (path.includes("/careers")) {
      return {
        title: "Careers - Join RootedAI",
        description: "Join the team building the future of autonomous work. View open positions and apply today."
      };
    }
    if (path.includes("/contact")) {
      return {
        title: "Contact Us - RootedAI",
        description: "Ready to scale? Get in touch with our team for a custom consultation or quote."
      };
    }

    // Default Home
    return {
      title: "RootedAI - Engineering Intelligence & Enterprise Automation",
      description: "Engineering Intelligence. COMPLEXITY. SIMPLIFIED. RootedAI delivers autonomous agents, logistics automation, and hiring solutions for scaling enterprises."
    };
  };

  const seoData = getSeoData();

  return (
    <div className="min-h-screen">
      <Seo
        title={seoData.title}
        description={seoData.description}
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
                "https://www.linkedin.com/company/rootedai"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-917904168521",
                "contactType": "sales",
                "areaServed": "Global",
                "availableLanguage": ["English", "Tamil", "Hindi"]
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Hosur",
                "addressRegion": "Tamil Nadu",
                "addressCountry": "IN"
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
