"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, ArrowRight } from "lucide-react";
import { C } from "@/data/constants";
import { useModal } from "@/context/ModalContext";

const tileObj = (bg: string, extra?: React.CSSProperties): React.CSSProperties => ({
  background:   bg,
  borderRadius: 24,
  border:       `3px solid ${C.purple}`,
  overflow:     "hidden",
  ...extra,
});

interface ServiceCapability {
  id:           string;
  num:          string;
  title:        string;
  subHeadline:  string;
  desc:         string;
  points:       string[];
  bg:           string;
}

const SERVICES: ServiceCapability[] = [
  {
    id:          "s1",
    num:         "01",
    title:       "AI Applications",
    subHeadline: "Custom AI-powered web and mobile applications designed around your unique business processes.",
    desc:        "We build intelligent applications that understand, analyze, and automate real-world workflows. From AI assistants and recommendation engines to operational dashboards and decision-support systems, our solutions are designed to create tangible business value rather than experimental prototypes.",
    points: [
      "AI Assistants & Copilots",
      "Generative AI Applications",
      "Intelligent Search Systems",
      "Customer Support AI",
      "Internal Knowledge Platforms"
    ],
    bg:          C.cream,
  },
  {
    id:          "s2",
    num:         "02",
    title:       "Intelligent Automation",
    subHeadline: "Transform repetitive operations into autonomous workflows.",
    desc:        "Manual processes consume valuable time and resources. We design automation systems that connect your software, teams, and data into seamless workflows, reducing operational overhead and allowing your team to focus on higher-value work.",
    points: [
      "Workflow Automation",
      "Business Process Automation",
      "Document Processing",
      "Lead & CRM Automation",
      "AI-Powered Operations"
    ],
    bg:          C.parchment,
  },
  {
    id:          "s3",
    num:         "03",
    title:       "Custom Software Development",
    subHeadline: "Enterprise-grade software engineered for performance, security, and scale.",
    desc:        "Every business operates differently. That's why we build software tailored to your requirements, whether it's a customer-facing platform, internal operations system, analytics dashboard, or enterprise portal.",
    points: [
      "Web Applications",
      "Mobile Applications",
      "Enterprise Platforms",
      "SaaS Products",
      "API & Systems Integration"
    ],
    bg:          C.blush,
  },
  {
    id:          "s4",
    num:         "04",
    title:       "Healthcare AI Solutions",
    subHeadline: "Intelligent healthcare technology built to improve efficiency, accuracy, and patient outcomes.",
    desc:        "We develop AI-powered healthcare systems that streamline clinical workflows, enhance operational visibility, and support better decision-making across healthcare organizations.",
    points: [
      "Clinical Workflow Automation",
      "Patient Engagement Systems",
      "Healthcare Analytics",
      "Medical AI Solutions",
      "Revenue Cycle Intelligence"
    ],
    bg:          C.amber,
  },
  {
    id:          "s5",
    num:         "05",
    title:       "EdTech Platforms",
    subHeadline: "Next-generation learning experiences powered by AI.",
    desc:        "We help educational institutions and learning companies create intelligent digital ecosystems that improve engagement, personalization, and learning outcomes.",
    points: [
      "Learning Management Systems",
      "AI Tutors & Learning Assistants",
      "Assessment Platforms",
      "Student Analytics",
      "Personalized Learning Experiences"
    ],
    bg:          C.cream,
  },
  {
    id:          "s6",
    num:         "06",
    title:       "Data & Predictive Analytics",
    subHeadline: "Turn business data into strategic advantage.",
    desc:        "Data is valuable only when it drives action. We build analytics platforms and predictive models that help organizations identify trends, forecast outcomes, optimize operations, and make confident decisions.",
    points: [
      "Business Intelligence Dashboards",
      "Predictive Modeling",
      "Operational Analytics",
      "Performance Monitoring",
      "Executive Reporting"
    ],
    bg:          C.parchment,
  },
];

const WHY_POINTS = [
  "AI-Native Engineering",
  "Industry-Specific Expertise",
  "Scalable Software Architecture",
  "Enterprise-Grade Security",
  "Rapid Development Cycles",
  "Measurable Business Outcomes",
];

/* ─── Single service card ────────────────────────────────── */
function ServiceCard({ s }: { s: ServiceCapability }) {
  return (
    <div style={{ ...tileObj(s.bg), padding: "2.25rem 2rem", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      "0.8rem",
              fontWeight:    700,
              letterSpacing: "0.15em",
              color:         C.orange,
            }}
          >
            {s.num}
          </span>
        </div>
        <h3
          style={{
            fontFamily:    "var(--font-display)",
            fontWeight:    800,
            fontSize:      "1.5rem",
            color:         C.purple,
            lineHeight:    1.1,
            letterSpacing: "-0.03em",
          }}
        >
          {s.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize:   "0.9rem",
            fontWeight: 600,
            color:      C.purple,
            opacity:    0.9,
            lineHeight: 1.4,
          }}
        >
          {s.subHeadline}
        </p>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize:   "0.85rem",
            color:      C.purple,
            opacity:    0.7,
            lineHeight: 1.55,
          }}
        >
          {s.desc}
        </p>
      </div>

      <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: `2px dashed ${C.purple}30` }}>
        <span 
          style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.65rem",
            fontWeight:    700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color:         C.purple,
            opacity:       0.5,
            display:       "block",
            marginBottom:  "0.75rem",
          }}
        >
          Capabilities
        </span>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {s.points.map((pt, idx) => (
            <li key={idx} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: 6, height: 6, background: C.orange, borderRadius: "50%" }}></div>
              <span 
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize:   "0.8rem",
                  color:      C.purple,
                  fontWeight: 500,
                }}
              >
                {pt}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─── Mobile Carousel ────────────────────────────────────── */
function MobileCarousel() {
  const [current, setCurrent] = useState(0);
  const total = SERVICES.length;

  const goTo = (idx: number) => setCurrent((idx + total) % total);

  const onDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (info.offset.x < -60) goTo(current + 1);
      else if (info.offset.x > 60) goTo(current - 1);
    },
    [current],
  );

  return (
    <div style={{ width: "100%", overflow: "hidden", position: "relative", display: "grid" }}>
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={onDragEnd}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ gridArea: "1 / 1", cursor: "grab", touchAction: "pan-y" }}
        >
          <ServiceCard s={SERVICES[current]} />
        </motion.div>
      </AnimatePresence>

      <div
        style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          marginTop:      "1.5rem",
          paddingLeft:    "0.5rem",
          paddingRight:   "0.5rem",
        }}
      >
        <button
          onClick={() => goTo(current - 1)}
          aria-label="Previous"
          style={{
            width:          36,
            height:         36,
            borderRadius:   "50%",
            border:         `2px solid ${C.purple}`,
            background:     C.cream,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            cursor:         "pointer",
          }}
        >
          <ChevronLeft size={18} color={C.purple} />
        </button>

        <div style={{ display: "flex", gap: "0.4rem" }}>
          {SERVICES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to capability ${i + 1}`}
              style={{
                width:        i === current ? 20 : 8,
                height:       8,
                borderRadius: 4,
                background:   i === current ? C.orange : `${C.purple}40`,
                border:       "none",
                cursor:       "pointer",
                padding:      0,
                transition:   "width 0.25s ease, background 0.25s ease",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(current + 1)}
          aria-label="Next"
          style={{
            width:          36,
            height:         36,
            borderRadius:   "50%",
            border:         `2px solid ${C.purple}`,
            background:     C.cream,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            cursor:         "pointer",
          }}
        >
          <ChevronRight size={18} color={C.purple} />
        </button>
      </div>

      <p
        style={{
          textAlign:     "center",
          fontFamily:    "var(--font-mono)",
          fontSize:      "0.65rem",
          letterSpacing: "0.12em",
          color:         C.purple,
          opacity:       0.5,
          marginTop:     "0.8rem",
          textTransform: "uppercase",
        }}
      >
        {current + 1} / {total}
      </p>
    </div>
  );
}

/* ─── Desktop grid ───────────────────────────────────────── */
function DesktopGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {SERVICES.map((s) => (
        <ServiceCard key={s.id} s={s} />
      ))}
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────── */
export default function ClientDossier() {
  const { openLeadModal } = useModal();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

      {/* ── Header tile ── */}
      <div
        style={tileObj(C.purple)}
        className="p-8 lg:p-16 flex flex-col gap-6"
      >
        <span
          style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.75rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase" as const,
            color:         C.orange,
            fontWeight:    700,
            display:       "block",
          }}
        >
          Who We Are
        </span>

        <h2
          className="font-display font-black text-[2.5rem] md:text-[3.5rem] lg:text-[clamp(3rem,6vw,5rem)] text-white leading-none tracking-tighter"
          style={{ marginBottom: "1rem" }}
        >
          This is RootedAI
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-4">
          <p
            className="text-white/85"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize:   "1.1rem",
              lineHeight: 1.6,
            }}
          >
            RootedAI helps organizations transform complex operations into intelligent, scalable systems. We combine advanced AI, custom software engineering, and automation to help healthcare providers, educational institutions, and modern enterprises operate more efficiently, make better decisions, and unlock new growth opportunities.
          </p>
          <p
            className="text-white/85"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize:   "1.1rem",
              lineHeight: 1.6,
            }}
          >
            Whether you're building a new digital product, automating internal workflows, or deploying AI across your organization, we deliver solutions engineered for measurable business impact.
          </p>
        </div>
      </div>

      {/* ── Cards — mobile carousel / desktop grid ── */}
      <div className="block lg:hidden">
        <MobileCarousel />
      </div>
      <div className="hidden lg:block">
        <DesktopGrid />
      </div>

      {/* ── Bottom Section: Why RootedAI & Call to Action ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* Why RootedAI Box */}
        <div style={tileObj(C.cream)} className="p-8 lg:p-12 flex flex-col justify-between">
          <div>
            <h3 
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "1.8rem",
                color: C.purple,
                marginBottom: "1.5rem",
                letterSpacing: "-0.02em"
              }}
            >
              Why RootedAI
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WHY_POINTS.map((pt, idx) => (
                <li key={idx} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: C.orange,
                    border: `2px solid ${C.purple}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <span style={{ color: C.purple, fontSize: "0.75rem", fontWeight: 900 }}>✓</span>
                  </div>
                  <span 
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.9rem",
                      color: C.purple,
                      fontWeight: 600
                    }}
                  >
                    {pt}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action / Tagline Box */}
        <div style={tileObj(C.orange)} className="p-8 lg:p-12 flex flex-col justify-between gap-8">
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "2rem",
                color: C.purple,
                lineHeight: 1.1,
                letterSpacing: "-0.03em"
              }}
            >
              Build Smarter.<br />Operate Faster.<br />Scale Confidently.
            </h3>
          </div>
          <button 
            onClick={openLeadModal}
            style={{
              background: C.purple,
              color: C.cream,
              border: `3px solid ${C.purple}`,
              boxShadow: `4px 4px 0 ${C.cream}`,
            }}
            className="nb-btn self-start"
          >
            Start a Pilot <ArrowRight size={16} />
          </button>
        </div>
      </div>

    </div>
  );
}
