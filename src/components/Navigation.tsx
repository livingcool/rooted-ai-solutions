import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Products", href: "/products" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[120] transition-all duration-500 ${isScrolled
          ? "bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-white/20 dark:border-white/5 shadow-md py-2"
          : "bg-transparent py-4"
          }`}
      >
        <div className="w-full md:container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Brand Name */}
            <a href="/" className="flex items-center group relative z-50">
              <span className="text-2xl md:text-3xl font-bold font-heading tracking-[0.1em] text-black dark:text-white transition-all duration-300">
                ROOTED<span className="font-light">AI</span>
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors relative group py-1"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              ))}
              <div className="flex items-center gap-4 pl-4 border-l border-black/10 dark:border-white/10">
                <ThemeToggle />
                <Button
                  className="bw-button text-xs md:text-sm px-6"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Get Started
                </Button>
              </div>
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
            {navLinks.map((link, idx) => (
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