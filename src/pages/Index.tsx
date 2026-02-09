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
import RootScrollHero from "@/components/RootScrollHero";
import Team from "@/components/Team";
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
    if (path.includes("/services/enterprise-security")) {
      return {
        title: "Enterprise Security Solutions | RootedAI Security & Compliance",
        description: "Secure your enterprise with RootedAI's advanced security solutions. We ensure data privacy, compliance, and robust protection against cyber threats."
      };
    }
    if (path.includes("/services/ai-agents")) {
      return {
        title: "AI Agents for Business | Autonomous Workflow Automation",
        description: "Deploy autonomous AI agents to handle customer support, data analysis, and complex workflows. Reduce tickets by 60% with RootedAI."
      };
    }
    if (path.includes("/services/process-automation")) {
      return {
        title: "Business Process Automation Services | Save 90% Manual Effort",
        description: "End-to-end automation for logistics, finance, and operations. Automate invoice reconciliation and order updates with RootedAI."
      };
    }
    if (path.includes("/services/web-solutions")) {
      return {
        title: "Custom Web App Development | AI-Integrated Web Solutions",
        description: "Build dynamic, AI-powered web applications and dashboards. Get custom analytics and predictive insights integrated into your web platform."
      };
    }
    if (path.includes("/services/nlp-systems")) {
      return {
        title: "NLP & Sentiment Analysis Services | Document Processing AI",
        description: "Advanced Natural Language Processing for automated reporting and sentiment analysis. Process thousands of documents in minutes."
      };
    }
    if (path.includes("/services/predictive-analytics")) {
      return {
        title: "Predictive Analytics Solutions | Forecast Trends & Demand",
        description: "Optimize decision-making with data-driven insights. Forecast inventory demand and reduce wastage by 20-30% with RootedAI."
      };
    }
    if (path.includes("/services/outsourcing")) {
      return {
        title: "IT Outsourcing Services | Hire Pre-Vetted Developers",
        description: "Scale your team instantly with elite developers. Hire a full-stack team in 48 hours and save 60% on development costs."
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
      title: "RootedAI - Engineering Intelligence | Top Software Solutions",
      description: "RootedAI is the top software solutions provider, delivering Engineering Intelligence, AI agents, and enterprise automation. COMPLEXITY. SIMPLIFIED."
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
          "Top Software Solutions Provider in Hosur",
          "Software Company Hosur",
          "automations",
          "ai",
          "software",
          "website",
          "web-app",
          "application",
          "erp",
          "WhatsApp Automation",
          "ai-powered-ticketing-system-for-logistics",
          "ticketing-system",
          "rhizoconnect",
          "ai-powered-ticket-management-software",
          "Engineering Intelligence",
          "AI agents",
          "hiring automation",
          "logistics AI",
          "process automation",
          "enterprise AI solutions",
          "generative AI services",
          "custom LLM development",
          "business intelligence"
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ProfessionalService",
              "additionalType": "SoftwareHouse",
              "name": "RootedAI Solutions",
              "url": "https://rootedai.com",
              "logo": "https://rootedai.com/logo.png",
              "image": "https://rootedai.com/og-image.png",
              "description": "RootedAI is the top software solutions provider in Hosur, specializing in AI automation, custom ERP, web apps, and enterprise software.",
              "slogan": "Engineering Intelligence. COMPLEXITY. SIMPLIFIED.",
              "priceRange": "$$",
              "foundingDate": "2023",
              "founders": [
                {
                  "@type": "Person",
                  "name": "RootedAI Team"
                }
              ],
              "sameAs": [
                "https://www.linkedin.com/company/rootedai",
                "https://x.com/rootedai2025",
                "https://www.instagram.com/rootedai_official/"
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
                "streetAddress": "Hosur",
                "addressLocality": "Hosur",
                "addressRegion": "Tamil Nadu",
                "postalCode": "635109",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 12.7409,
                "longitude": 77.8253
              },
              "areaServed": {
                "@type": "City",
                "name": "Hosur"
              },
              "hasMap": "https://maps.google.com/?q=RootedAI+Hosur"
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

        {/* Replacing Custom Hero with Scrollytelling Hero */}
        <div id="hero">
          <RootScrollHero />
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

        <div id="team">
          <RevealOnScroll>
            <Team />
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
