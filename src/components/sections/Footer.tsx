'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Linkedin, Github, Twitter, ExternalLink, Star } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import LocationFooter from "./LocationFooter";
import RootedLogo from "../ui/RootedLogo";

const FOOTER_LINKS = {
  Services: [
    { name: "Custom ML Models",     href: "/services/mlaas" },
    { name: "AI-Native Software",   href: "/services/web-solutions" },
    { name: "App Development",      href: "/services/outsourcing" },
    { name: "AI Agents",            href: "/services/ai-agents" },
    { name: "Process Automation",   href: "/services/process-automation" },
  ],
  Company: [
    { name: "About",        href: "/#about" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Blog",         href: "/blog" },
    { name: "Careers",      href: "/careers" },
    { name: "Pricing",      href: "/pricing" },
  ],
};

const ACCREDITATIONS = [
  {
    id: "goodfirms",
    name: "GoodFirms",
    label: "Accredited by GoodFirms",
    href: "https://www.goodfirms.co/company/rootedai",
    renderBadge: () => (
      <Image
        src="/images/goodfirms-badge.png"
        alt="Accredited by GoodFirms"
        width={140}
        height={45}
        style={{
          height:    "auto",
          width:     "auto",
          maxHeight: "42px",
          objectFit: "contain",
        }}
      />
    ),
  },
  {
    id: "f6s",
    name: "F6S",
    label: "Accredited by F6S",
    href: "https://www.f6s.com/company/rootedai",
    renderBadge: () => (
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
          <rect width="100" height="100" rx="20" fill="#162836" />
          <path d="M25 25H75V40H42V50H70V65H42V80H25V25Z" fill="#F6851B" />
          <circle cx="78" cy="78" r="8" fill="#F6851B" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: "1.1rem", color: "#240747", letterSpacing: "0.02em", lineHeight: 1 }}>
            F6S
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", fontWeight: 700, color: "#F6851B", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "2px" }}>
            Verified Partner
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "clutch",
    name: "Clutch",
    label: "Accredited by Clutch",
    href: "https://clutch.co/profile/rootedai",
    renderBadge: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <svg width="24" height="24" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="48" fill="#21313F" />
            <path d="M50 20C33.4 20 20 33.4 20 50C20 66.6 33.4 80 50 80C62 80 72.2 73 77 63L65 56C62.2 62 56.6 66 50 66C41.2 66 34 58.8 34 50C34 41.2 41.2 34 50 34C56.6 34 62.2 38 65 44L77 37C72.2 27 62 20 50 20Z" fill="#DA3932" />
          </svg>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.15rem", color: "#240747", letterSpacing: "-0.03em" }}>
            Clutch
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={11} fill="#F6851B" color="#F6851B" />
          ))}
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 700, color: "#240747", marginLeft: "4px" }}>
            5.0
          </span>
        </div>
      </div>
    ),
  },
];

function AccreditationTile() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ACCREDITATIONS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const current = ACCREDITATIONS[currentIndex];

  return (
    <div
      style={{
        background:    "#F5E6C8",
        padding:       "2.5rem 2rem",
        display:       "flex",
        flexDirection: "column",
        gap:           "1rem",
        position:      "relative",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header row with Title and Pagination dots */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.62rem",
            fontWeight:    700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color:         "#F6851B",
          }}
        >
          Accreditation
        </span>

        {/* Step Indicator Dots */}
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          {ACCREDITATIONS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to ${item.name} accreditation`}
              style={{
                width: idx === currentIndex ? 16 : 6,
                height: 6,
                borderRadius: 3,
                background: idx === currentIndex ? "#F6851B" : "#240747",
                opacity: idx === currentIndex ? 1 : 0.25,
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* Animated Card Content */}
      <AnimatePresence mode="wait">
        <motion.a
          key={current.id}
          href={current.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          style={{
            display:       "flex",
            flexDirection: "column",
            gap:           "1.25rem",
            textDecoration:"none",
            height:        "100%",
          }}
          onMouseEnter={(e) => {
            const text = e.currentTarget.querySelector('.gf-text') as HTMLElement;
            if (text) text.style.color = "#F6851B";
            const box = e.currentTarget.querySelector('.gf-box') as HTMLElement;
            if (box) box.style.transform = "translate(-2px, -2px)";
          }}
          onMouseLeave={(e) => {
            const text = e.currentTarget.querySelector('.gf-text') as HTMLElement;
            if (text) text.style.color = "#240747";
            const box = e.currentTarget.querySelector('.gf-box') as HTMLElement;
            if (box) box.style.transform = "translate(0, 0)";
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span
              className="gf-text"
              style={{
                fontFamily:    "var(--font-display)",
                fontWeight:    600,
                fontSize:      "0.9rem",
                color:         "#240747",
                letterSpacing: "-0.01em",
                transition:    "color 0.12s",
              }}
            >
              {current.label}
            </span>
            <ExternalLink size={14} color="#240747" style={{ opacity: 0.6 }} />
          </div>

          <div
            className="gf-box"
            style={{
              marginTop:   "auto",
              padding:     "0.75rem 1rem",
              minHeight:   "65px",
              background:  "#F9EFE9",
              border:      "2px solid #240747",
              display:     "flex",
              alignItems:  "center",
              justifyContent: "center",
              transition:  "transform 0.12s, background 0.12s",
            }}
          >
            {current.renderBadge()}
          </div>
        </motion.a>
      </AnimatePresence>
    </div>
  );
}

export default function Footer() {
  const { openLeadModal } = useModal();
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
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[4px]"
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
              <RootedLogo size={40} />
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
            <button
              onClick={openLeadModal}
              className="nb-btn nb-btn-primary"
              style={{ fontSize: "0.75rem", padding: "0.65rem 1.2rem", marginTop: "auto" }}
            >
              Book a Demo <ArrowRight size={13} />
            </button>
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

          {/* Accreditation tile */}
          <AccreditationTile />
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

      {/* SEO & GEO Semantic Mapping */}
      <LocationFooter />
    </footer>
  );
}
