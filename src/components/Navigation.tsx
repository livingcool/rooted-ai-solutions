import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { name: "Services",    href: "/services" },
  { name: "How It Works",href: "/#how-it-works" },
  { name: "Use Cases",   href: "/case-studies" },
  { name: "About",       href: "/#about" },
  { name: "Blog",        href: "/blog" },
];

const Navigation = () => {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Main Navbar ── */}
      <nav
        style={{
          backgroundColor: "#F9EFE9",
          borderBottom:    scrolled ? "3px solid #240747" : "3px solid transparent",
          boxShadow:       scrolled ? "0 4px 0 #240747" : "none",
          transition:      "border-color 0.2s ease, box-shadow 0.2s ease",
        }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div
          style={{ maxWidth: 1320, margin: "0 auto" }}
          className="flex items-center justify-between px-8 h-[72px]"
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-1 no-underline"
            style={{ textDecoration: "none" }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "1.5rem",
                color: "#240747",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              Rooted
            </span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "1.5rem",
                color: "#F6851B",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              AI
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  style={{
                    fontFamily:    "var(--font-display)",
                    fontWeight:    700,
                    fontSize:      "0.82rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color:         isActive ? "#F6851B" : "#240747",
                    textDecoration: "none",
                    paddingBottom:  "2px",
                    borderBottom:   isActive ? "2px solid #F6851B" : "2px solid transparent",
                    transition:     "color 0.15s ease, border-color 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#F6851B";
                      (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "#F6851B";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#240747";
                      (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "transparent";
                    }
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/#contact"
              className="hidden md:inline-flex items-center gap-2 nb-btn nb-btn-primary"
              style={{ fontSize: "0.78rem", padding: "0.6rem 1.4rem" }}
            >
              Book a Demo <ArrowRight size={14} />
            </Link>

            <button
              className="md:hidden flex items-center justify-center w-10 h-10"
              style={{
                border: "3px solid #240747",
                background: "#F9EFE9",
                cursor: "pointer",
              }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen
                ? <X size={20} color="#240747" />
                : <Menu size={20} color="#240747" />
              }
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Full-Screen Overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col"
          style={{
            backgroundColor: "#F9EFE9",
            paddingTop:       "4.5rem",
            borderTop:        "3px solid #240747",
          }}
        >
          {/* Nav Links */}
          <div className="flex flex-col flex-1 px-6 pt-8" style={{ gap: 0 }}>
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.name}
                to={link.href}
                style={{
                  fontFamily:    "var(--font-display)",
                  fontWeight:    800,
                  fontSize:      "2.2rem",
                  color:         location.pathname === link.href ? "#F6851B" : "#240747",
                  textDecoration: "none",
                  letterSpacing: "-0.03em",
                  lineHeight:    1.1,
                  borderBottom:  "3px solid #240747",
                  padding:       "1.25rem 0",
                  animation:     `nb-slide-up 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 0.06}s forwards`,
                  opacity:       0,
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            className="px-6 py-8"
            style={{ borderTop: "3px solid #240747" }}
          >
            <Link
              to="/#contact"
              className="nb-btn nb-btn-primary"
              style={{ width: "100%", justifyContent: "center", fontSize: "1rem" }}
            >
              Book a Demo <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}

      {/* Spacer to offset fixed nav */}
      <div style={{ height: 64 }} />
    </>
  );
};

export default Navigation;
