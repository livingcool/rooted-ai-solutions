import { useEffect, Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
// Lazy load non-critical sections
const About = lazy(() => import("@/components/About"));
const Services = lazy(() => import("@/components/Services"));
const CaseStudies = lazy(() => import("@/components/CaseStudies"));
const Products = lazy(() => import("@/components/Products"));
const Careers = lazy(() => import("@/components/Careers"));
const Contact = lazy(() => import("@/components/Contact"));
const SocialProof = lazy(() => import("@/components/SocialProof"));
const NewsletterCapture = lazy(() => import("@/components/NewsletterCapture"));
const Footer = lazy(() => import("@/components/Footer"));

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
        description: "Learn about RootedAI's mission to simplify enterprise complexity through engineering intelligence and autonomous agents.",
        canonical: "https://www.rootedai.co.in/about"
      };
    }
    if (path.includes("/services/enterprise-security")) {
      return {
        title: "Enterprise Security Solutions | RootedAI Security & Compliance",
        description: "Secure your enterprise with RootedAI's advanced security solutions. We ensure data privacy, compliance, and robust protection against cyber threats.",
        canonical: "https://www.rootedai.co.in/services/enterprise-security"
      };
    }
    if (path.includes("/services/ai-agents")) {
      return {
        title: "AI Agents for Business | Autonomous Workflow Automation",
        description: "Deploy autonomous AI agents to handle customer support, data analysis, and complex workflows. Reduce tickets by 60% with RootedAI.",
        canonical: "https://www.rootedai.co.in/services/ai-agents"
      };
    }
    if (path.includes("/services/process-automation")) {
      return {
        title: "Business Process Automation Services | Save 90% Manual Effort",
        description: "End-to-end automation for logistics, finance, and operations. Automate invoice reconciliation and order updates with RootedAI.",
        canonical: "https://www.rootedai.co.in/services/process-automation"
      };
    }
    if (path.includes("/services/web-solutions")) {
      return {
        title: "Custom Web App Development | AI-Integrated Web Solutions",
        description: "Build dynamic, AI-powered web applications and dashboards. Get custom analytics and predictive insights integrated into your web platform.",
        canonical: "https://www.rootedai.co.in/services/web-solutions"
      };
    }
    if (path.includes("/services/nlp-systems")) {
      return {
        title: "NLP & Sentiment Analysis Services | Document Processing AI",
        description: "Advanced Natural Language Processing for automated reporting and sentiment analysis. Process thousands of documents in minutes.",
        canonical: "https://www.rootedai.co.in/services/nlp-systems"
      };
    }
    if (path.includes("/services/predictive-analytics")) {
      return {
        title: "Predictive Analytics Solutions | Forecast Trends & Demand",
        description: "Optimize decision-making with data-driven insights. Forecast inventory demand and reduce wastage by 20-30% with RootedAI.",
        canonical: "https://www.rootedai.co.in/services/predictive-analytics"
      };
    }
    if (path.includes("/services/outsourcing")) {
      return {
        title: "IT Outsourcing Services | Hire Pre-Vetted Developers",
        description: "Scale your team instantly with elite developers. Hire a full-stack team in 48 hours and save 60% on development costs.",
        canonical: "https://www.rootedai.co.in/services/outsourcing"
      };
    }
    if (path.includes("/services")) {
      return {
        title: "Our Services - RootedAI",
        description: "From Process Automation to Predictive Analytics. Explore our comprehensive suite of AI solutions for scaling businesses.",
        canonical: "https://www.rootedai.co.in/services"
      };
    }
    if (path.includes("/case-studies")) {
      return {
        title: "Case Studies - RootedAI",
        description: "See how we've helped SMEs and enterprises save millions and automate workflows. Real results, real data.",
        canonical: "https://www.rootedai.co.in/case-studies"
      };
    }
    if (path.includes("/products")) {
      return {
        title: "Our Products - RootedAI",
        description: "Discover our flagship AI products designed to streamline your operations and hiring processes.",
        canonical: "https://www.rootedai.co.in/products"
      };
    }
    if (path.includes("/careers")) {
      return {
        title: "Careers - Join RootedAI",
        description: "Join the team building the future of autonomous work. View open positions and apply today.",
        canonical: "https://www.rootedai.co.in/careers"
      };
    }
    if (path.includes("/contact")) {
      return {
        title: "Contact Us - RootedAI",
        description: "Ready to scale? Get in touch with our team for a custom consultation or quote.",
        canonical: "https://www.rootedai.co.in/contact"
      };
    }

    // Default Home
    return {
      title: "RootedAI - Engineering Intelligence | Top Software Solutions",
      description: "RootedAI is the top software solutions provider, delivering Engineering Intelligence, AI agents, and enterprise automation. COMPLEXITY. SIMPLIFIED.",
      canonical: "https://www.rootedai.co.in/"
    };
  };

  const seoData = getSeoData();

  return (
    <div className="min-h-screen">
      <Seo
        title={seoData.title}
        description={seoData.description}
        canonical={seoData.canonical}
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
              "url": "https://www.rootedai.co.in",
              "logo": "https://www.rootedai.co.in/logo.png",
              "image": "https://www.rootedai.co.in/og-image.png",
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
              "url": "https://www.rootedai.co.in",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.rootedai.co.in/?s={search_term_string}",
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


        <RevealOnScroll>
          <Suspense fallback={<div className="h-20" />}>
            <SocialProof />
          </Suspense>
        </RevealOnScroll>

        <div id="about">
          <RevealOnScroll>
            <Suspense fallback={<div className="min-h-[50vh]" />}>
              <About />
            </Suspense>
          </RevealOnScroll>
        </div>

        <div id="services">
          <RevealOnScroll>
            <Suspense fallback={<div className="min-h-[50vh]" />}>
              <Services />
            </Suspense>
          </RevealOnScroll>
        </div>

        <div id="case-studies">
          <RevealOnScroll>
            <Suspense fallback={<div className="min-h-[50vh]" />}>
              <CaseStudies />
            </Suspense>
          </RevealOnScroll>
        </div>

        <div id="products">
          <RevealOnScroll>
            <Suspense fallback={<div className="min-h-[50vh]" />}>
              <Products />
            </Suspense>
          </RevealOnScroll>
        </div>

        <div id="careers">
          <RevealOnScroll>
            <Suspense fallback={<div className="min-h-[50vh]" />}>
              <Careers />
            </Suspense>
          </RevealOnScroll>
        </div>



        <div id="contact">
          <RevealOnScroll>
            <Suspense fallback={<div className="min-h-[50vh]" />}>
              <Contact />
            </Suspense>
          </RevealOnScroll>
        </div>

        <RevealOnScroll>
          <Suspense fallback={<div className="h-20" />}>
            <NewsletterCapture />
          </Suspense>
        </RevealOnScroll>

        <RevealOnScroll>
          <Suspense fallback={<div className="h-20" />}>
            <Footer />
          </Suspense>
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default Index;
