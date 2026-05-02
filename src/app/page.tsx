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
import { CarouselWrapper } from "@/components/ui/CarouselWrapper";

const RobotPanel = dynamic(() => import("@/components/RobotPanel"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#F0DCC8] border-3 border-[#240747] rounded-[24px] p-8 flex flex-col gap-4">
      <span className="sr-only">Robot Perception Interface: Visualizing real-time sensor fusion and actor-critic models for autonomous operations.</span>
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
const InteractivePipeline = dynamic(() => import("@/components/InteractivePipeline"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-white border-3 border-[#240747] rounded-[24px] p-12 flex flex-col justify-center">
      <h3 className="sr-only">Our Tactical Pipeline: 1. Raw Data, 2. Strategy Scoping, 3. Data Cleaning, 4. LLM Fine-Tuning, 5. Validation, 6. System Integration.</h3>
      <Skeleton className="w-48 h-8 bg-[#240747]/10 mb-8" />
      <div className="grid grid-cols-6 gap-4">
        {[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-24 bg-[#240747]/5" />)}
      </div>
    </div>
  )
});
const ClientDossier = dynamic(() => import("@/components/ClientDossier"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true });
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
      <section style={sectionWrap} className="!mt-[-1.5rem] lg:!mt-[-3rem]">
        <div style={innerWrap}>
          <div style={tileObj(C.cream)} className="p-8 lg:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
            <div>
              <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#F6851B] font-bold block mb-3">What We Build</span>
              <h2 className="font-display font-bold text-[2rem] lg:text-[clamp(2rem,4vw,3rem)] text-[#240747] tracking-[-0.03em] leading-none">Enterprise-grade AI.</h2>
            </div>
            <Link href="/services" className="nb-btn nb-btn-primary w-full md:w-auto">
              All Services <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mb-4">
            <CarouselWrapper desktopClass="grid-cols-1 md:grid-cols-2 gap-4">
              {SERVICES.slice(0, 2).map((svc) => (
                <Link key={svc.title} href={svc.href} style={tileObj(svc.bg)} className="p-8 lg:p-12 flex flex-col gap-8 no-underline h-full hover:scale-[1.01] transition-transform">
                  <div style={{ width: 56, height: 56, background: C.purple, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svc.icon size={28} color={C.orange} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[1.6rem] text-[#240747] tracking-[-0.02em] leading-[1.1] mb-2">{svc.title}</h3>
                    <div className="flex items-center gap-[0.35rem] font-mono text-[0.7rem] text-[#F6851B] font-bold tracking-[0.1em] uppercase">
                      Learn more <ChevronRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </CarouselWrapper>
          </div>

          <div>
            <CarouselWrapper desktopClass="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SERVICES.slice(2).map((svc) => (
                <Link key={svc.title} href={svc.href} style={tileObj(svc.bg)} className="p-6 lg:p-8 flex flex-col gap-4 no-underline h-full hover:scale-[1.02] transition-transform">
                  <div style={{ width: 40, height: 40, background: C.purple, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svc.icon size={20} color={C.orange} />
                  </div>
                  <h3 className="font-display font-bold text-[1.1rem] text-[#240747] tracking-[-0.02em] leading-[1.1]">{svc.title}</h3>
                </Link>
              ))}
            </CarouselWrapper>
          </div>
        </div>
      </section>

      {/* ═════════════════ WHAT WE DO (Pipeline Workflow) ═════════════════ */}
      <section id="how-it-works" style={sectionWrap}>
        <div style={innerWrap}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
            <div style={tileObj(C.purple)} className="p-8 lg:p-16 text-center mb-4">
              <span className="font-mono text-[0.85rem] tracking-[0.25em] uppercase text-[#F6851B] font-bold block mb-8">
                What we do
              </span>
              <h2 className="font-display font-black text-[2.4rem] md:text-[3rem] lg:text-[clamp(3rem,5vw,4.5rem)] leading-[1.1] md:leading-[0.85] tracking-[-0.04em]">
                <span className="text-[#F9EFE9] block pb-1">From inputs to</span>
                <span className="text-[#F6851B] block">system integration.</span>
              </h2>
              <p className="font-sans text-[1.1rem] lg:text-[1.2rem] text-[#F9EFE9] opacity-80 max-w-[600px] mx-auto mt-8 font-medium">
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
          <div style={tileObj(C.cream)} className="p-8 lg:p-20 flex flex-col md:flex-row md:items-center justify-between gap-12">
            <div>
              <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#F6851B] font-bold block mb-4">Deploy</span>
              <h2 className="font-display font-bold text-[2.5rem] lg:text-[clamp(2.5rem,5vw,4rem)] text-[#240747] leading-none tracking-[-0.03em]">
                Ready to remove<br/>operational risk?
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              <button 
                onClick={openLeadModal}
                className="nb-btn nb-btn-primary text-lg px-10 py-5 w-full md:w-auto"
              >
                Book Discovery Call <ArrowRight size={18} />
              </button>
              <p className="font-mono text-[0.65rem] text-[#240747] opacity-50 tracking-[0.1em] uppercase md:pl-2">
                Limited slots available.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
