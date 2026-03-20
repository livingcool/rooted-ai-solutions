import { useEffect, useState } from "react";

const sections = [
    { id: "hero", name: "Home" },
    { id: "about", name: "About Us" },
    { id: "services", label: "Services" },
    { id: "case-studies", label: "Case Studies" },
    { id: "products", name: "Products" },
    { id: "careers", name: "Careers" },
    { id: "contact", name: "Contact" },
];

const SectionIndicator = () => {
    const [activeSection, setActiveSection] = useState("Home");

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i].id);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i].name);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed left-0 top-0 bottom-0 z-[60] hidden lg:flex flex-col items-start">
            {/* Logo at Top - Removed as per request */}
            <div className="h-[60px] flex items-center pl-6">
                {/* Logo removed */}
            </div>

            {/* Sidebar Content */}
            <div className="relative flex-1 flex items-center">
                {/* Vertical Line */}
                <div className="absolute left-0 w-px h-full bg-black/10 dark:bg-white/10"></div>

                {/* Active Section Glow - positioned dynamically */}
                <div
                    className="absolute left-0 w-1 h-32 bg-gradient-to-b from-transparent via-black/60 dark:via-white/60 to-transparent blur-sm transition-all duration-700 ease-out"
                    style={{
                        top: '50%',
                        transform: 'translateY(-50%)',
                    }}
                ></div>

                {/* Section Name - Rotated Vertically */}
                <div className="ml-8 -rotate-90 origin-left whitespace-nowrap">
                    <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium transition-all duration-300">
                        {activeSection}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SectionIndicator;
