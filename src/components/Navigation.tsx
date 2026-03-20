import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SpotlightNavbar } from "@/components/ui/SpotlightNavbar";
import type { NavItem } from "@/components/ui/SpotlightNavbar";
import BottomNavigation from "@/components/BottomNavigation";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const isHome = pathname === "/" || pathname === "/index.html";

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update dropdown state on path change
  useEffect(() => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Scroll tracking
  const [isInHero, setIsInHero] = useState(true);       // true when in the hero section (top of page)
  const [scrollingUp, setScrollingUp] = useState(false); // true when user is scrolling up
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const goingUp = currentY < lastScrollY.current;
      
      // Full bar at top (< 50px)
      setIsInHero(currentY < 50);
      setScrollingUp(goingUp && currentY > 150);
      lastScrollY.current = currentY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showFullBar = isInHero; 
  const showNavOnly = scrollingUp;

  const navLinks = [
    { name: "Services", href: "/services" },
    { 
      name: "Portfolio", 
      links: [
        { name: "Proven Impacts", href: "/impacts" },
        { name: "Case Studies", href: "/case-studies" },
        { name: "Products", href: "/products" },
      ]
    },
    { 
      name: "Company", 
      links: [
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
      ]
    },
    { name: "Contact", href: "/contact" },
  ];

  // Flat list for SpotlightNavbar and mobile menu (initial load)
  const flatLinks = navLinks.flatMap(link => 
    'links' in link ? link.links : [link]
  ) as { name: string; href: string }[];

  const spotlightItems: NavItem[] = flatLinks.map((link) => ({
    label: link.name,
    href: link.href,
  }));

  const handleToggle = (e: React.MouseEvent, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(prev => prev === name ? null : name);
  };

  return (
    <div ref={navRef}>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-[120] transition-all duration-500 flex flex-col",
          showFullBar ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none",
          !isHome && !isInHero && "bg-background/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 shadow-sm"
        )}
      >
        <div className="w-full md:container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center group relative z-50">
              <span className="text-2xl md:text-3xl font-bold font-heading tracking-[0.1em] text-black dark:text-white transition-all duration-300">
                ROOTED<span className="font-light">AI</span>
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              <div className="glass-premium overflow-visible flex items-center p-1.5 rounded-full border border-black/5 dark:border-white/5 bg-white/40 dark:bg-black/40 backdrop-blur-xl">
                {navLinks.map((link) => (
                  <div key={link.name} className="relative">
                    {link.links ? (
                      <div className="relative">
                        <button 
                          onClick={(e) => handleToggle(e, link.name)}
                          onMouseEnter={() => setActiveDropdown(link.name)}
                          className={cn(
                            "flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full transition-all",
                            "text-muted-foreground hover:text-black dark:hover:text-white",
                            activeDropdown === link.name && "bg-black/10 dark:bg-white/10 text-black dark:text-white"
                          )}
                        >
                          {link.name}
                          <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-300", activeDropdown === link.name && "rotate-180")} />
                        </button>
                        
                        <div 
                          className={cn(
                            "absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 origin-top z-[200]",
                            activeDropdown === link.name ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                          )}
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          <div className="w-56 glass-premium overflow-visible p-2 rounded-2xl border border-black/10 dark:border-white/10 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl shadow-2xl ring-1 ring-black/5">
                            {link.links.map((sub) => (
                              <a
                                key={sub.name}
                                href={sub.href}
                                onClick={() => setActiveDropdown(null)}
                                className="block px-4 py-3 text-sm font-semibold rounded-xl transition-all hover:bg-black/5 dark:hover:bg-white/10 text-muted-foreground hover:text-black dark:hover:text-white"
                              >
                                {sub.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <a
                        href={link.href}
                        onMouseEnter={() => setActiveDropdown(null)}
                        className="block px-4 py-2 text-sm font-medium rounded-full transition-all text-muted-foreground hover:text-black dark:hover:text-white"
                      >
                        {link.name}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              <Button
                variant="glow"
                className="text-xs md:text-sm px-6"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get Started
              </Button>
            </div>

            <div className="md:hidden flex items-center gap-4 relative z-50">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Pill Nav on Scroll Up */}
      <div
        className={cn(
          "fixed top-4 left-0 right-0 z-[120] hidden md:flex justify-center transition-all duration-400",
          showNavOnly && !showFullBar ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8 pointer-events-none"
        )}
      >
        <div className="glass-premium overflow-visible flex items-center p-1.5 rounded-full border border-black/5 dark:border-white/5 bg-white/40 dark:bg-black/40 backdrop-blur-xl">
          {navLinks.map((link) => (
            <div key={link.name} className="relative">
              {link.links ? (
                <div className="relative">
                  <button 
                    onClick={(e) => handleToggle(e, link.name)}
                    onMouseEnter={() => setActiveDropdown(link.name)}
                    className={cn(
                      "flex items-center gap-1 px-4 py-1.5 text-xs font-semibold rounded-full transition-colors",
                      "text-muted-foreground hover:text-black dark:hover:text-white",
                      activeDropdown === link.name && "bg-black/10 dark:bg-white/10 text-black dark:text-white"
                    )}
                  >
                    {link.name}
                    <ChevronDown size={14} className={cn("transition-transform", activeDropdown === link.name && "rotate-180")} />
                  </button>
                  <div 
                    className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 origin-top z-[200]",
                      activeDropdown === link.name ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    )}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="w-48 glass-premium overflow-visible p-1.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl shadow-xl">
                      {link.links.map((sub) => (
                        <a 
                          key={sub.name} 
                          href={sub.href} 
                          onClick={() => setActiveDropdown(null)}
                          className="block px-3 py-2 text-xs font-bold rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-muted-foreground hover:text-black dark:hover:text-white"
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a 
                  href={link.href} 
                  onMouseEnter={() => setActiveDropdown(null)}
                  className="block px-4 py-1.5 text-xs font-semibold rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-muted-foreground hover:text-black dark:hover:text-white"
                >
                  {link.name}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-[120] md:hidden transition-all duration-400",
          showNavOnly ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <div className="bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-white/20 dark:border-white/5 shadow-md px-4 py-2">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center">
              <span className="text-xl font-bold font-heading tracking-[0.1em] text-black dark:text-white">
                ROOTED<span className="font-light">AI</span>
              </span>
            </a>
            <div className="flex items-center gap-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && createPortal(
        <div className="fixed inset-0 bg-white dark:bg-black z-[200] flex flex-col md:hidden animate-in fade-in duration-300">
          <div className="flex items-center justify-between p-6">
            <span className="text-xl font-bold font-heading text-black dark:text-white">
              ROOTED<span className="font-light">AI</span>
            </span>
            <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="space-y-6">
              {navLinks.map((group) => (
                <div key={group.name} className="space-y-4">
                  {group.links ? (
                    <>
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-50 px-2">{group.name}</div>
                      <div className="grid gap-2">
                        {group.links.map((link) => (
                          <a 
                            key={link.name} 
                            href={link.href} 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-between p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-black/10 dark:hover:border-white/10 transition-all font-bold text-lg"
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
                      className="flex items-center justify-between p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-black/10 dark:hover:border-white/10 transition-all font-bold text-lg"
                    >
                      {group.name}
                      <ChevronDown size={20} className="-rotate-90 opacity-30" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-6 border-t border-black/5 dark:border-white/5">
            <Button className="w-full h-16 text-lg rounded-2xl font-bold" onClick={() => {
              setIsMobileMenuOpen(false);
              setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 300);
            }}>
              Get Started
            </Button>
          </div>
        </div>,
        document.body
      )}

      <BottomNavigation onMenuClick={() => setIsMobileMenuOpen(true)} />
    </div>
  );
};

export default Navigation;