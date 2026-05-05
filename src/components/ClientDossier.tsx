"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react";
import { C } from "@/data/constants";

/* ─── Brand tokens ────────────────────────────────────────── */

const tileObj = (bg: string, extra?: React.CSSProperties): React.CSSProperties => ({
  background:   bg,
  borderRadius: 24,
  border:       `3px solid ${C.purple}`,
  overflow:     "hidden",
  ...extra,
});

/* ─── Qualification criteria data ────────────────────────── */
interface Criterion {
  id:       string;
  label:    string;
  desc:     string;
  verdict:  "QUALIFIED" | "DISQUALIFIED";
  bg:       string;
}

const CRITERIA: Criterion[] = [
  {
    id:      "c1",
    label:   "Robotics / Industrial Tech",
    desc:    "You operate robotics, automation lines, or industrial IoT systems that produce real-time sensor or camera data.",
    verdict: "QUALIFIED",
    bg:      C.cream,
  },
  {
    id:      "c2",
    label:   "Pain Point Is Real & Costing You Now",
    desc:    "Downtime, missed defects, slow QA cycles — the problem has a dollar figure and a deadline attached to it.",
    verdict: "QUALIFIED",
    bg:      C.parchment,
  },
  {
    id:      "c3",
    label:   "Pilot-Ready in 30 Days",
    desc:    "You can grant data access, assign a technical point-of-contact, and start an engagement inside a month.",
    verdict: "QUALIFIED",
    bg:      C.blush,
  },
  {
    id:      "c4",
    label:   "Curiosity Tours with No Brief",
    desc:    "No defined problem, no timeline, no decision-maker in the room. We are not a demo vendor.",
    verdict: "DISQUALIFIED",
    bg:      C.amber,
  },
  {
    id:      "c5",
    label:   "Bespoke Consumer Apps",
    desc:    "We are built for industrial and enterprise stacks, not consumer mobile apps or SaaS dashboards.",
    verdict: "DISQUALIFIED",
    bg:      C.cream,
  },
  {
    id:      "c6",
    label:   "Pre-Seed with No Operational Data",
    desc:    "Without production data to train on, we cannot deliver meaningful models. Come back when you have real logs.",
    verdict: "DISQUALIFIED",
    bg:      C.parchment,
  },
];

/* ─── Verdict badge ──────────────────────────────────────── */
function VerdictBadge({ verdict }: { verdict: Criterion["verdict"] }) {
  const isOk = verdict === "QUALIFIED";
  return (
    <span
      style={{
        display:        "inline-flex",
        alignItems:     "center",
        gap:            "0.3rem",
        padding:        "0.25rem 0.7rem",
        borderRadius:   6,
        border:         `2px solid ${C.purple}`,
        background:     isOk ? C.orange : C.purple,
        color:          isOk ? C.purple : C.cream,
        fontFamily:     "var(--font-mono)",
        fontSize:       "0.55rem",
        fontWeight:     700,
        letterSpacing:  "0.12em",
        textTransform:  "uppercase" as const,
      }}
    >
      {isOk
        ? <><Check size={10} strokeWidth={3} /> QUALIFIED</>
        : <><X size={10} strokeWidth={3} /> DISQUALIFIED</>
      }
    </span>
  );
}

/* ─── Single criterion card ──────────────────────────────── */
function CriterionCard({ c, index }: { c: Criterion; index: number }) {
  return (
    <div style={{ ...tileObj(c.bg), padding: "2rem", height: "100%", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
        <span
          style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.65rem",
            fontWeight:    700,
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
            color:         C.purple,
            opacity:       0.45,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <VerdictBadge verdict={c.verdict} />
      </div>
      <h3
        style={{
          fontFamily:    "var(--font-display)",
          fontWeight:    700,
          fontSize:      "1.1rem",
          color:         C.purple,
          lineHeight:    1.2,
          letterSpacing: "-0.02em",
        }}
      >
        {c.label}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize:   "0.9rem",
          color:      C.purple,
          opacity:    0.7,
          lineHeight: 1.55,
        }}
      >
        {c.desc}
      </p>
    </div>
  );
}

/* ─── Mobile Carousel ────────────────────────────────────── */
function MobileCarousel() {
  const [current, setCurrent] = useState(0);
  const total = CRITERIA.length;

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
      {/* Card */}
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
          <CriterionCard c={CRITERIA[current]} index={current} />
        </motion.div>
      </AnimatePresence>

      {/* Controls row */}
      <div
        style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          marginTop:      "1rem",
          paddingLeft:    "0.5rem",
          paddingRight:   "0.5rem",
        }}
      >
        {/* Prev arrow */}
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

        {/* Dots */}
        <div style={{ display: "flex", gap: "0.4rem" }}>
          {CRITERIA.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
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

        {/* Next arrow */}
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

      {/* Counter */}
      <p
        style={{
          textAlign:     "center",
          fontFamily:    "var(--font-mono)",
          fontSize:      "0.6rem",
          letterSpacing: "0.12em",
          color:         C.purple,
          opacity:       0.5,
          marginTop:     "0.6rem",
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
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {CRITERIA.map((c, i) => (
        <CriterionCard key={c.id} c={c} index={i} />
      ))}
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────── */
export default function ClientDossier() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

      {/* ── Header tile ── */}
      <div
        style={tileObj(C.purple)}
        className="p-8 lg:p-16 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-start"
      >
        <div>
          <span
            style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      "0.75rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase" as const,
              color:         C.orange,
              fontWeight:    700,
              display:       "block",
              marginBottom:  "2rem",
            }}
          >
            CASE FILE: QUALIFIED OPERATORS
          </span>

          <h2
            className="font-display font-black text-[2rem] md:text-[2.5rem] lg:text-[clamp(2.5rem,5vw,4rem)] text-white"
            style={{ lineHeight: 1, letterSpacing: "-0.05em", marginBottom: "1.5rem" }}
          >
            <span className="text-white" style={{ display: "block", paddingBottom: "0.15rem" }}>We don&apos;t take</span>
            <span className="text-white" style={{ display: "block", paddingBottom: "0.15rem" }}>every project.</span>
            <span style={{ display: "block", color: C.orange }}>We take the right ones.</span>
          </h2>

          <p
            className="text-white"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize:   "1.05rem",
              lineHeight: 1.6,
              maxWidth:   520,
            }}
          >
            We run field assessments. We work best with operators whose problems are real,
            deadlines are immediate, and vision is enough to build on.{" "}
            <strong className="text-white">If you qualify, you already know.</strong>
          </p>
        </div>
      </div>

      {/* ── Cards — mobile carousel / desktop grid ── */}
      <div className="block md:hidden">
        <MobileCarousel />
      </div>
      <div className="hidden md:block">
        <DesktopGrid />
      </div>
    </div>
  );
}
