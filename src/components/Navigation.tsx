import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

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
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Case Studies", href: "#case-studies" },
    { name: "Products", href: "#products" },
    { name: "Careers", href: "#careers" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-black/10 dark:border-white/10"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between py-2">
          {/* Brand Name Only */}
          <a href="/" className="flex items-center group">
            <span className="text-3xl font-bold font-heading tracking-[0.15em] bg-gradient-to-r from-black via-black/95 to-black/80 dark:from-white dark:via-white/95 dark:to-white/80 bg-clip-text text-transparent hover:from-black hover:via-black hover:to-black dark:hover:from-white dark:hover:via-white dark:hover:to-white transition-all duration-300">
              ROOTEDAI
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors hover-underline-animation"
              >
                {link.name}
              </a>
            ))}
            <ThemeToggle />
            <Button
              className="bw-button text-sm"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              className="text-black dark:text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-black border-b border-black/10 dark:border-white/10 p-4 animate-fade-in shadow-lg">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white font-medium py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button
              className="bw-button w-full"
              onClick={() => {
                setIsMobileMenuOpen(false);
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;