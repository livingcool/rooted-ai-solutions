import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ChevronDown, Command, Activity, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import BottomNavigation from "@/components/BottomNavigation";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");
  const [isHovered, setIsHovered] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const navRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset state on path change
  useEffect(() => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Scroll tracking — direction-aware
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const diff = currentY - lastY;
          
          if (Math.abs(diff) > 5) {
            setScrollDir(diff > 0 ? "down" : "up");
          }
          
          setIsScrolled(currentY > 40);
          lastY = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme tracking
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsDarkMode(document.documentElement.classList.contains("dark"));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Nav visibility states:
  // • At top (not scrolled)  → fully expanded
  // • Scrolling down         → hidden
  // • Scrolling up           → compact pill
  // • Hovered while compact  → fully expanded
  const isHidden  = isScrolled && scrollDir === "down" && !isHovered;
  const isCompact = isScrolled && scrollDir === "up"   && !isHovered;
  // isExpanded = !isScrolled OR (scrolled-up AND hovered)

  const navLinks = [
    { 
      name: "Services", 
      links: [
        { name: "AI Agents", href: "/services/ai-agents" },
        { name: "Process Automation", href: "/services/process-automation" },
        { name: "Web Solutions", href: "/services/web-solutions" },
        { name: "NLP Systems", href: "/services/nlp-systems" },
        { name: "All Services", href: "/services" },
      ]
    },
    { 
      name: "Portfolio", 
      links: [
        { name: "Proven Impacts", href: "/impacts" },
        { name: "Case Studies", href: "/case-studies" },
        { name: "Products", href: "/products" },
      ]
    },
    { 
      name: "Locations", 
      links: [
        { name: "Bangalore", href: "/locations/bangalore" },
        { name: "Chennai", href: "/locations/chennai" },
        { name: "Hosur", href: "/locations/hosur" },
        { name: "Coimbatore", href: "/locations/coimbatore" },
        { name: "All Locations", href: "/locations" },
      ]
    },
    { 
      name: "Company", 
      links: [
        { name: "About Us", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
        { name: "FAQ", href: "/faq" },
      ]
    },
    { name: "Contact", href: "/contact" },
  ];

  const handleToggle = (e: React.MouseEvent, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(prev => prev === name ? null : name);
  };

  return (
    <>
      {/* Desktop Dynamic Island Navigation */}
      <div className="fixed top-0 left-0 right-0 z-[120] hidden md:flex justify-center pt-4"
           onMouseEnter={() => setIsHovered(true)}
           onMouseLeave={() => {
             setIsHovered(false);
             setActiveDropdown(null);
           }}
      >
        <motion.nav
          ref={navRef}
          layout
          initial={false}
          animate={{
            width: isCompact ? "auto" : "min(95vw, 1200px)",
            borderRadius: "9999px",
            y: isHidden ? -100 : 0,
            opacity: isHidden ? 0 : 1,
            backgroundColor: isDarkMode 
              ? "rgba(5, 5, 15, 0.88)" 
              : "rgba(255, 255, 255, 0.92)"
          }}
          transition={{
            layout: {
              type: "spring",
              stiffness: 250,
              damping: 25,
              mass: 0.6
            },
            y: { duration: 0.3 },
            opacity: { duration: 0.3 },
            backgroundColor: { duration: 0.5 }
          }}
          className={cn(
            "pointer-events-auto relative flex items-center h-14 transition-all duration-500",
            "shadow-2xl overflow-visible backdrop-blur-2xl border",
            isCompact 
              ? "px-4 border-slate-200/80 dark:border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.12)] dark:shadow-[0_0_20px_rgba(0,0,0,0.6)] min-w-[160px]" 
              : "px-6 border-white/20 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-[32px]"
          )}
        >
          {/* Logo Section */}
          <div className="flex items-center gap-2 shrink-0">
            <a href="/" className="flex items-center gap-2 group outline-none overflow-hidden">
              <img 
                src={isDarkMode ? "/images/Darkmode logo.png" : "/images/Lightmode logo.png"} 
                alt="RootedAI Logo" 
                className={cn(
                  "transition-all duration-300 object-contain",
                  isCompact ? "h-6 w-auto" : "h-10 w-auto"
                )}
              />
              <span className={cn(
                "font-bold tracking-tight transition-all duration-300 whitespace-nowrap",
                isCompact ? "text-lg" : "text-xl",
                isDarkMode ? "text-white" : "text-slate-900"
              )}>
                Rooted<span className="text-violet-600 dark:text-violet-400">AI</span>
              </span>
            </a>
          </div>

          {/* Expanded Menu Items */}
          <AnimatePresence>
            {!isCompact && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex items-center justify-center gap-1 mx-4"
              >
                {navLinks.map((link) => (
                  <div key={link.name} className="relative">
                    {link.links ? (
                      <div className="relative">
                        <button 
                          onClick={(e) => handleToggle(e, link.name)}
                          onMouseEnter={() => setActiveDropdown(link.name)}
                          className={cn(
                            "flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-full transition-all outline-none",
                            "text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10",
                            activeDropdown === link.name && "bg-black/5 dark:bg-white/10 text-black dark:text-white"
                          )}
                        >
                          {link.name}
                          <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-300", activeDropdown === link.name && "rotate-180")} />
                        </button>
                        
                        <div 
                          className={cn(
                            "absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 transition-all duration-300 origin-top z-[200]",
                            activeDropdown === link.name ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                          )}
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          <div className="w-56 glass-premium overflow-hidden p-2 rounded-2xl border border-white/10 bg-[#050505]/95 backdrop-blur-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
                            {link.links.map((sub, i) => (
                              <motion.a
                                key={sub.name}
                                href={sub.href}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => setActiveDropdown(null)}
                                className="block px-4 py-3 text-sm font-semibold rounded-xl transition-all hover:bg-white/10 text-slate-300 hover:text-blue-400 outline-none"
                              >
                                {sub.name}
                              </motion.a>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                        <a
                          href={link.href}
                          onMouseEnter={() => setActiveDropdown(null)}
                          className="block px-4 py-2 text-sm font-semibold rounded-full transition-all text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 outline-none"
                        >
                          {link.name}
                        </a>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Actions */}
          <div className="flex items-center gap-3 shrink-0 ml-auto flex-nowrap overflow-hidden">
            <AnimatePresence>
              {!isCompact && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="flex items-center gap-3 overflow-hidden"
                >
                  <ThemeToggle />
                  <Button
                    variant="glow"
                    className="text-xs font-bold px-6 h-10 rounded-full shrink-0"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    GET STARTED
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Top Bar (Simplified) */}
      <div className="fixed top-0 left-0 right-0 z-[120] md:hidden px-4 pt-4">
        <div className={cn(
          "backdrop-blur-2xl border border-white/10 rounded-2xl py-3 px-4 flex items-center justify-between shadow-2xl transition-all duration-300",
          isDarkMode ? "bg-black/40 border-white/5" : "bg-white/40 border-slate-200"
        )}>
          <a href="/" className="flex items-center gap-2">
            <img 
              src={isDarkMode ? "/images/Darkmode logo.png" : "/images/Lightmode logo.png"} 
              alt="RootedAI Logo" 
              className="h-7 w-auto object-contain"
            />
            <span className={cn(
              "font-bold tracking-tight text-lg",
              isDarkMode ? "text-white" : "text-slate-900"
            )}>
              Rooted<span className="text-violet-600 dark:text-violet-400">AI</span>
            </span>
          </a>
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      {isMobileMenuOpen && createPortal(
        <div className="fixed inset-0 bg-white/95 dark:bg-black/95 backdrop-blur-2xl z-[200] flex flex-col md:hidden animate-in fade-in duration-300">
          <div className="flex items-center justify-between p-6">
            <a href="/" className="flex items-center gap-2">
              <img 
                src={isDarkMode ? "/images/Darkmode logo.png" : "/images/Lightmode logo.png"} 
                alt="RootedAI Logo" 
                className="h-8 w-auto object-contain"
              />
              <span className={cn(
                "font-bold tracking-tight text-xl",
                isDarkMode ? "text-white" : "text-slate-900"
              )}>
                Rooted<span className="text-violet-600 dark:text-violet-400">AI</span>
              </span>
            </a>
            <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 outline-none" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="space-y-8">
              {navLinks.map((group, idx) => (
                <motion.div 
                  key={group.name} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="space-y-4"
                >
                  {group.links ? (
                    <>
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-violet-600 dark:text-violet-400 px-2">{group.name}</div>
                      <div className="grid gap-2">
                        {group.links.map((link) => (
                          <a 
                            key={link.name} 
                            href={link.href} 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-between p-4 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors font-bold text-lg text-slate-800 dark:text-slate-200 outline-none"
                          >
                            {link.name}
                            <ChevronDown size={20} className="-rotate-90 opacity-30" />
                          </a>
                        ))}
                      </div>
                    </>
                  ) : (
                    <a 
                      href={group.href} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between p-4 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors font-bold text-lg text-slate-800 dark:text-slate-200 outline-none"
                    >
                      {group.name}
                      <ChevronDown size={20} className="-rotate-90 opacity-30" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="p-6 border-t border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/50">
            <Button variant="glow" className="w-full h-14 text-lg rounded-2xl font-bold" onClick={() => {
              setIsMobileMenuOpen(false);
              setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 300);
            }}>
              GET STARTED
            </Button>
          </div>
        </div>,
        document.body
      )}

      {/* Bottom Nav triggering Mobile Overlay */}
      <BottomNavigation onMenuClick={() => setIsMobileMenuOpen(true)} />
    </>
  );
};

export default Navigation;