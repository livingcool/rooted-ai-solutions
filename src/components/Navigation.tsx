

'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight, Linkedin, Twitter, Github } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import RootedLogo from "./ui/RootedLogo";

const NAV_LINKS = [
  { name: "Services", href: "/services" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "Use Cases", href: "/case-studies" },
  { name: "About", href: "/#about" },
  { name: "Blog", href: "/blog" },
  { name: "Careers", href: "/careers" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { openLeadModal } = useModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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
          borderBottom: scrolled ? "3px solid #240747" : "3px solid transparent",
          boxShadow: scrolled ? "0 4px 0 #240747" : "none",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div
          style={{ maxWidth: 1320, margin: "0 auto" }}
          className="flex items-center justify-between px-8 h-[72px]"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 no-underline group"
            style={{ textDecoration: "none" }}
          >
            <RootedLogo size={32} />
          </Link>


          {/* Desktop Nav Links */}
          <div className="!hidden md:!flex items-center gap-8 nav-desktop-links">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: isActive ? "#F6851B" : "#240747",
                    textDecoration: "none",
                    paddingBottom: "2px",
                    borderBottom: isActive ? "2px solid #F6851B" : "2px solid transparent",
                    transition: "color 0.15s ease, border-color 0.15s ease",
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
            <button
              onClick={openLeadModal}
              className="!hidden md:!inline-flex items-center gap-2 nb-btn nb-btn-primary nav-desktop-links"
              style={{ fontSize: "0.78rem", padding: "0.6rem 1.4rem", cursor: 'pointer' }}
            >
              Book a Demo <ArrowRight size={14} />
            </button>

            <button
              className="md:hidden flex items-center justify-center w-10 h-10 relative z-[70]"
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
          className="fixed inset-0 z-[60] flex flex-col"
          style={{
            backgroundColor: "#F9EFE9",
            paddingTop: "4.5rem",
            borderTop: "3px solid #240747",
            touchAction: "none", // Prevent scroll bleed
          }}
        >
          {/* Nav Links */}
          <div className="flex flex-col flex-1 px-6 pt-8 overflow-y-auto" style={{ gap: 0 }}>
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "2.2rem",
                  color: pathname === link.href ? "#F6851B" : "#240747",
                  textDecoration: "none",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  borderBottom: "3px solid #240747",
                  padding: "1.25rem 0",
                  animation: `nb-slide-up 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 0.06}s forwards`,
                  opacity: 0,
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Bottom CTA + Socials */}
          <div
            className="px-6 py-8 flex flex-col gap-6"
            style={{ borderTop: "3px solid #240747" }}
          >
            <button
              onClick={() => { setMobileOpen(false); openLeadModal(); }}
              className="nb-btn nb-btn-primary"
              style={{ width: "100%", justifyContent: "center", fontSize: "1rem" }}
            >
              Book a Demo <ArrowRight size={16} />
            </button>
            <div className="flex justify-center gap-6">
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/company/rootdai", label: "LinkedIn" },
                { icon: Github, href: "https://github.com/rootedai", label: "GitHub" },
                { icon: Twitter, href: "https://x.com/rootedai2025", label: "Twitter" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center"
                  style={{
                    border: "3px solid #240747",
                    background: "#F9EFE9",
                    textDecoration: "none",
                  }}
                  aria-label={label}
                >
                  <Icon size={20} color="#240747" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Spacer to offset fixed nav */}
      <div style={{ height: 72 }} />
    </>
  );
};

export default Navigation;
