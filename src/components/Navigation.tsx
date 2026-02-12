import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SpotlightNavbar } from "@/components/ui/SpotlightNavbar";
import type { NavItem } from "@/components/ui/SpotlightNavbar";


const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Products", href: "/products" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  // Convert navLinks into SpotlightNavbar items
  const spotlightItems: NavItem[] = navLinks.map((link) => ({
    label: link.name,
    href: link.href,
  }));

  // Detect which nav item matches the current path
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";
  const activeIdx = spotlightItems.findIndex((item) => currentPath.startsWith(item.href));
  const defaultActiveIndex = activeIdx >= 0 ? activeIdx : -1;

  const handleNavItemClick = (item: NavItem) => {
    window.location.href = item.href;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[120] transition-all duration-500 flex flex-col ${isScrolled
          ? "bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-white/20 dark:border-white/5 shadow-md"
          : "bg-transparent"
          }`}
      >

        <div className={`w-full md:container mx-auto px-4 md:px-6 ${!isScrolled ? "py-4" : "py-2"}`}>
          <div className="flex items-center justify-between">
            {/* Brand Name */}
            <a href="/" className="flex items-center group relative z-50">
              <span className="text-2xl md:text-3xl font-bold font-heading tracking-[0.1em] text-black dark:text-white transition-all duration-300">
                ROOTED<span className="font-light">AI</span>
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>

            {/* Desktop Navigation — Spotlight Navbar */}
            <div className="hidden md:flex items-center flex-1 justify-center">
              <SpotlightNavbar
                items={spotlightItems}
                defaultActiveIndex={defaultActiveIndex}
                onItemClick={handleNavItemClick}
              />
            </div>

            {/* Desktop CTA + Theme Toggle */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              <Button
                className="bw-button text-xs md:text-sm px-6"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4 relative z-50">
              <ThemeToggle />
              <button
                className="text-black dark:text-white p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>


      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && createPortal(
        <div
          className="fixed inset-0 bg-white dark:bg-black z-[100] flex items-center justify-center md:hidden"
        >
          <button
            className="absolute top-6 right-6 text-black dark:text-white p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors z-[102]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={32} />
          </button>
          <div className="flex flex-col items-center space-y-8 p-8 w-full max-w-sm relative z-[101]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-2xl font-light text-black dark:text-white hover:text-black/50 dark:hover:text-white/50 transition-colors tracking-wide"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-8 w-full">
              <Button
                className="bw-button w-full text-lg py-6"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Navigation;