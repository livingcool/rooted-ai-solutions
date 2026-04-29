'use client';

import Link from "next/link";
import { ArrowRight, Linkedin, Github, Twitter } from "lucide-react";

const FOOTER_LINKS = {
  Services: [
    { name: "AI Agents",            href: "/services/ai-agents" },
    { name: "Process Automation",   href: "/services/process-automation" },
    { name: "Web Solutions",        href: "/services/web-solutions" },
    { name: "NLP Systems",          href: "/services/nlp-systems" },
    { name: "Predictive Analytics", href: "/services/predictive-analytics" },
  ],
  Company: [
    { name: "About",        href: "/#about" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Blog",         href: "/blog" },
    { name: "Careers",      href: "/careers" },
    { name: "Pricing",      href: "/pricing" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: "#240747" }}>
      {/* Main footer content */}
      <div
        style={{
          background: "#240747",
          padding:    "4px",
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin:   "0 auto",
            display:  "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap:      "4px",
          }}
          className="footer-grid"
        >
          {/* Brand tile */}
          <div
            style={{
              background:    "#F9EFE9",
              padding:       "2.5rem 2rem",
              display:       "flex",
              flexDirection: "column",
              gap:           "1.5rem",
              gridColumn:    "span 1",
            }}
          >
            {/* Logo */}
            <div>
              <span
                style={{
                  fontFamily:    "var(--font-display)",
                  fontWeight:    900,
                  fontSize:      "1.8rem",
                  color:         "#240747",
                  letterSpacing: "-0.04em",
                  lineHeight:    1,
                }}
              >
                Rooted<span style={{ color: "#F6851B" }}>AI</span>
              </span>
              <p
                style={{
                  fontFamily:  "var(--font-mono)",
                  fontSize:    "0.65rem",
                  color:       "#240747",
                  opacity:     0.55,
                  marginTop:   "0.5rem",
                  letterSpacing:"0.08em",
                  textTransform:"uppercase",
                  lineHeight:  1.5,
                }}
              >
                Heavy LLM architectures
                <br />
                for manufacturing & logistics.
              </p>
            </div>

            {/* Social links */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/company/rootdai", label: "LinkedIn" },
                { icon: Github,   href: "https://github.com/rootedai",               label: "GitHub"   },
                { icon: Twitter,  href: "https://x.com/rootedai2025",                label: "Twitter"  },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width:      36,
                    height:     36,
                    border:     "2px solid #240747",
                    display:    "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#F9EFE9",
                    textDecoration: "none",
                    transition: "background 0.12s, transform 0.12s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#F6851B";
                    (e.currentTarget as HTMLElement).style.transform  = "translate(-2px,-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#F9EFE9";
                    (e.currentTarget as HTMLElement).style.transform  = "translate(0,0)";
                  }}
                >
                  <Icon size={16} color="#240747" />
                </a>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/#contact"
              className="nb-btn nb-btn-primary"
              style={{ fontSize: "0.75rem", padding: "0.65rem 1.2rem", marginTop: "auto" }}
            >
              Book a Demo <ArrowRight size={13} />
            </Link>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links], i) => {
            const bgs = ["#F0DCC8", "#EDD5C0", "#F5E6C8"];
            return (
              <div
                key={section}
                style={{
                  background:    bgs[i],
                  padding:       "2.5rem 2rem",
                  display:       "flex",
                  flexDirection: "column",
                  gap:           "1rem",
                }}
              >
                <span
                  style={{
                    fontFamily:    "var(--font-mono)",
                    fontSize:      "0.62rem",
                    fontWeight:    700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color:         "#F6851B",
                    display:       "block",
                    marginBottom:  "0.5rem",
                  }}
                >
                  {section}
                </span>
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    style={{
                      fontFamily:    "var(--font-display)",
                      fontWeight:    600,
                      fontSize:      "0.9rem",
                      color:         "#240747",
                      textDecoration:"none",
                      letterSpacing: "-0.01em",
                      transition:    "color 0.12s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F6851B"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#240747"; }}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            );
          })}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            maxWidth: 1320,
            margin:   "4px auto 0",
            background: "#F9EFE9",
            padding:  "1rem 2rem",
            display:  "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap:      "0.5rem",
          }}
        >
          <p
            style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      "0.62rem",
              color:         "#240747",
              opacity:       0.45,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            © {new Date().getFullYear()} RootedAI. Serving Global Enterprises.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy", "Terms", "FAQ"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                style={{
                  fontFamily:    "var(--font-mono)",
                  fontSize:      "0.62rem",
                  color:         "#240747",
                  opacity:       0.45,
                  textDecoration:"none",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  transition:    "opacity 0.12s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.45"; }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 500px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
