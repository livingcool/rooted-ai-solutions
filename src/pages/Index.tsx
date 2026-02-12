import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Seo from "@/components/Seo";
import Hero from "@/components/Hero";

// Placeholder components until full refactor
const SectionPlaceholder = ({ title, id }: { title: string, id: string }) => (
    <section id={id} className="min-h-[80vh] flex items-center justify-center border-t border-white/5 relative">
        <div className="text-center">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 mb-4">{title}</h2>
            <p className="text-neutral-500">Section Refactoring in Progress...</p>
        </div>
    </section>
);

const Index = () => {
    const location = useLocation();

    useEffect(() => {
        // Scroll handling (kept from original)
        if (history.scrollRestoration) {
            history.scrollRestoration = "manual";
        }

        const scrollToSection = () => {
            const path = location.pathname.replace(/^\//, "");
            if (path && document.getElementById(path)) {
                const el = document.getElementById(path);
                if (el) el.scrollIntoView({ behavior: "smooth" });
            } else if (location.hash) {
                const id = location.hash.replace("#", "");
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: "smooth" });
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        };

        setTimeout(scrollToSection, 100);
    }, [location]);

    return (
        <div className="min-h-screen bg-transparent relative">
            <Seo
                title="RootedAI - Engineering Intelligence | Top Software Solutions"
                description="RootedAI is the top software solutions provider, delivering Engineering Intelligence, AI agents, and enterprise automation. COMPLEXITY. SIMPLIFIED."
                canonical="https://www.rootedai.co.in/"
                keywords={[
                    "RootedAI",
                    "Engineering Intelligence",
                    "AI agents",
                    "enterprise automation",
                    "logistics AI"
                ]}
                structuredData={{
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "WebSite",
                            "name": "RootedAI",
                            "url": "https://www.rootedai.co.in"
                        }
                    ]
                }}
            />
            <Hero />
            <SectionPlaceholder id="services" title="Services" />
            <SectionPlaceholder id="tech" title="Technology" />
            <SectionPlaceholder id="projects" title="Showcase" />
            <SectionPlaceholder id="about" title="Company" />
            <SectionPlaceholder id="contact" title="Contact" />
        </div>
    );
};

export default Index;