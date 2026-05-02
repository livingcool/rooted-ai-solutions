'use client';

import React from "react";
import Link from "next/link";
import {
  ArrowRight, Cpu, Zap, Globe, Brain, Shield, BarChart3, ChevronRight
} from "lucide-react";
import dynamic from "next/dynamic";
import { METRICS, SERVICES } from "@/data/constants";
import { useModal } from "@/context/ModalContext";

// Dynamic imports for heavy client components
const HeroSection = dynamic(() => import("@/components/landing/HeroSection"), { ssr: true });
import { Skeleton } from "@/components/ui/skeleton";

const RobotPanel = dynamic(() => import("@/components/RobotPanel"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#F0DCC8] border-3 border-[#240747] rounded-[24px] p-8 flex flex-col gap-4">
      <Skeleton className="w-24 h-4 bg-[#240747]/10" />
      <div className="flex-1 flex items-center justify-center">
        <Skeleton className="w-48 h-48 rounded-full bg-[#240747]/5" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-full h-3 bg-[#240747]/10" />
        <Skeleton className="w-3/4 h-3 bg-[#240747]/10" />
      </div>
    </div>
  )
});
const InteractivePipeline = dynamic(() => import("@/components/InteractivePipeline"), { ssr: false });
const ClientDossier = dynamic(() => import("@/components/ClientDossier"), { ssr: false });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: false });
const NotificationSlider = dynamic(() => import("@/components/landing/NotificationSlider"), { ssr: false });

const C = {
  cream:     "#F9EFE9",
  parchment: "#F0DCC8",
  blush:     "#EDD5C0",
  amber:     "#F5E6C8",
  purple:    "#240747",
  orange:    "#F6851B",
};

const tileObj = (bg: string, extra?: React.CSSProperties): React.CSSProperties => ({
  background:   bg,
  borderRadius: 24,
  border:       `3px solid ${C.purple}`,
  overflow:     "hidden",
  ...extra,
});

const sectionWrap: React.CSSProperties = {
  padding:    "4rem 1.5rem",
  position: "relative",
  zIndex: 1
};

const innerWrap: React.CSSProperties = {
  maxWidth: 1320,
  margin:   "0 auto",
};

export default function LandingPage() {
  const { openLeadModal } = useModal();
  React.useEffect(() => {
    console.log("LandingPage (App Router) mounted");
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {/* ═════════════════ HERO ═════════════════ */}
      <HeroSection />

      {/* ═════════════════ WHO WE WORK WITH (Client Dossier) ═════════════════ */}
      <section id="about" style={sectionWrap}>
        <div style={innerWrap}>
          <ClientDossier />
        </div>
      </section>

      {/* ═════════════════ SERVICES ═════════════════ */}
      <section style={{ ...sectionWrap, marginTop: "-3rem" }}>
        <div style={innerWrap}>
          <div style={{ ...tileObj(C.cream), padding: "3rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", marginBottom: 16 }}>
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.orange, fontWeight: 700, display: "block", marginBottom: "0.75rem" }}>What We Build</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", color: C.purple, letterSpacing: "-0.03em", lineHeight: 1 }}>Enterprise-grade AI.</h2>
            </div>
            <Link href="/services" className="nb-btn nb-btn-primary">
              All Services <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="sub-grid-mb">
            {SERVICES.slice(0, 2).map((svc) => (
              <Link key={svc.title} href={svc.href} style={{ ...tileObj(svc.bg), padding: "3rem", display: "flex", flexDirection: "column", gap: "2rem", textDecoration: "none", height: "100%" }} className="hover:scale-[1.01] transition-transform">
                <div style={{ width: 56, height: 56, background: C.purple, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svc.icon size={28} color={C.orange} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.6rem", color: C.purple, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "0.5rem" }}>{svc.title}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: C.orange, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Learn more <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="zbento-grid">
            {SERVICES.slice(2).map((svc) => (
              <Link key={svc.title} href={svc.href} style={{ ...tileObj(svc.bg), padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem", textDecoration: "none", height: "100%" }} className="hover:scale-[1.02] transition-transform">
                <div style={{ width: 40, height: 40, background: C.purple, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svc.icon size={20} color={C.orange} />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: C.purple, letterSpacing: "-0.02em", lineHeight: 1.1 }}>{svc.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════ WHAT WE DO (Pipeline Workflow) ═════════════════ */}
      <section id="how-it-works" style={sectionWrap}>
        <div style={innerWrap}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
            <div style={{ ...tileObj(C.purple), padding: "4rem", textAlign: "center", marginBottom: "1rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", letterSpacing: "0.25em", textTransform: "uppercase", color: C.orange, fontWeight: 700, display: "block", marginBottom: "2rem" }}>
                What we do
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(3rem, 5vw, 4.5rem)", lineHeight: 0.85, letterSpacing: "-0.04em" }}>
                <span style={{ color: C.cream, display: "block", paddingBottom: "0.3rem" }}>From inputs to</span>
                <span style={{ color: C.orange, display: "block" }}>system integration.</span>
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.2rem", color: C.cream, opacity: 0.8, maxWidth: 600, margin: "2rem auto 0 auto", fontWeight: 500 }}>
                Explore our tactical lifecycle and operational benefits.
              </p>
            </div>
            <InteractivePipeline />
          </div>
        </div>
      </section>

      {/* ═════════════════ TESTIMONIALS ═════════════════ */}
      <section style={sectionWrap}>
        <div style={innerWrap}>
          <Testimonials />
        </div>
      </section>

      {/* ═════════════════ CTA ═════════════════ */}
      <section id="contact" style={{ ...sectionWrap, paddingBottom: "5rem" }}>
        <div style={innerWrap}>
          <div style={{ ...tileObj(C.cream), padding: "5rem 4rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "3rem" }}>
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.orange, fontWeight: 700, display: "block", marginBottom: "1rem" }}>Deploy</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: C.purple, lineHeight: 1, letterSpacing: "-0.03em" }}>
                Ready to remove<br/>operational risk?
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <button 
                onClick={openLeadModal}
                className="nb-btn nb-btn-primary text-lg px-10 py-5"
              >
                Book Discovery Call <ArrowRight size={18} />
              </button>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: C.purple, opacity: 0.5, letterSpacing: "0.1em", textTransform: "uppercase", paddingLeft: "0.5rem" }}>
                Limited slots available.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
