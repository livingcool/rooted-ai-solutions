import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import CaseStudies from "@/components/CaseStudies";
import Careers from "@/components/Careers";
import Contact from "@/components/Contact";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import GlobalBackground from "@/components/GlobalBackground";

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
    <div className="min-h-screen bg-black relative">
      <GlobalBackground />
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <About />
        <Services />
        <CaseStudies />
        <Careers />
        <Contact />
        <Blog />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
