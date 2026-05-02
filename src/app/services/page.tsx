'use client';

import Link from "next/link";
import { ArrowRight, Cpu, Zap, Globe, Brain, Shield, BarChart3, Users, Lock } from "lucide-react";
import { CarouselWrapper } from "@/components/ui/CarouselWrapper";

const SERVICES = [
  { icon: Cpu, num: "01", title: "AI Agents", desc: "Deploy autonomous LLM agents that handle complex, multi-step operational workflows without human intervention.", href: "/services/AIAgents", bg: "#F9EFE9" },
  { icon: Zap, num: "02", title: "Process Automation", desc: "End-to-end workflow automation connecting your existing tools, databases, and ERPs through intelligent orchestration.", href: "/services/ProcessAutomation", bg: "#F0DCC8" },
  { icon: Globe, num: "03", title: "Web Solutions", desc: "High-performance web platforms and internal tools built for industrial-grade reliability and scale.", href: "/services/WebSolutions", bg: "#EDD5C0" },
  { icon: Brain, num: "04", title: "NLP Systems", desc: "Custom language models fine-tuned on your operational data for document intelligence and knowledge extraction.", href: "/services/NLPSystems", bg: "#F5E6C8" },
  { icon: BarChart3, num: "05", title: "Predictive Analytics", desc: "ML pipelines that forecast failures, demand spikes, and bottlenecks before they cost you downtime.", href: "/services/PredictiveAnalytics", bg: "#F9EFE9" },
  { icon: Shield, num: "06", title: "Enterprise Security", desc: "AI-native security monitoring, anomaly detection, and compliance automation for regulated industries.", href: "/services/EnterpriseSecurity", bg: "#F0DCC8" },
  { icon: Users, num: "07", title: "Outsourcing", desc: "Embedded AI engineering teams that plug into your org chart and deliver as a managed capability.", href: "/services/Outsourcing", bg: "#EDD5C0" },
  { icon: Lock, num: "08", title: "AI Safety", desc: "Guardrails, evaluation frameworks, and red-teaming protocols to ensure your AI systems behave reliably.", href: "/services/AISafety", bg: "#F5E6C8" },
];

export default function ServicesPage() {
  return (
    <div style={{ background: "#240747" }}>
      {/* Page header */}
      <div style={{ background: "#240747", padding: "4px 4px 0" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", background: "#F9EFE9", padding: "3.5rem 3.5rem 3rem" }}>
          <span className="nb-label-orange" style={{ display: "block", marginBottom: "1rem" }}>What We Build</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(3rem, 6vw, 5.5rem)", color: "#240747", lineHeight: 0.95, letterSpacing: "-0.04em", maxWidth: 700 }}>
            Enterprise AI<br />Services.
          </h1>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "#240747", opacity: 0.6, marginTop: "1.5rem", maxWidth: 540, lineHeight: 1.6, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            Factory-floor-ready AI systems. Deployed in weeks. Built to remove operational risk — not add to it.
          </p>
        </div>
      </div>

      {/* Services grid */}
      <div style={{ background: "#240747", padding: "4px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <CarouselWrapper desktopClass="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[4px]">
            {SERVICES.map((svc) => (
              <Link
                key={svc.href}
                href={svc.href}
                style={{ background: svc.bg, padding: "2.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem", textDecoration: "none", borderLeft: "4px solid #240747" }}
                className="hover:outline hover:outline-3 hover:outline-[#F6851B] transition-all h-full"
              >
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "3rem", color: "#F6851B", lineHeight: 1, letterSpacing: "-0.05em" }}>{svc.num}</span>
                <div style={{ width: 40, height: 40, background: "#240747", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svc.icon size={20} color="#F6851B" />
                </div>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem", color: "#240747", letterSpacing: "-0.02em", lineHeight: 1.1 }}>{svc.title}</h2>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.83rem", color: "#240747", opacity: 0.68, lineHeight: 1.6, flex: 1 }}>{svc.desc}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#F6851B", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "auto" }}>
                  Learn more <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </CarouselWrapper>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "#240747", padding: "4px 4px 0" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", background: "#F6851B", padding: "3rem 3.5rem" }} className="flex flex-col md:flex-row items-center md:justify-between gap-8 md:gap-12">
          <h2 className="text-center md:text-left" style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#240747", lineHeight: 1, letterSpacing: "-0.04em" }}>Not sure where<br />to start?</h2>
          <Link href="/#contact" className="nb-btn-inverted rounded-xl">
            Book a Free Scoping Call <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
