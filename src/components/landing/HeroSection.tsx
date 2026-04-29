'use client';

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import { useModal } from "@/context/ModalContext";
import { C } from "@/data/constants";

import { Skeleton } from "@/components/ui/skeleton";

const RobotPanel = dynamic(() => import("@/components/RobotPanel"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#F0DCC8] border-3 border-[#240747] rounded-[24px] p-8 flex flex-col gap-4">
      <Skeleton className="w-24 h-3 bg-[#240747]/10" />
      <div className="flex-1 flex items-center justify-center">
        <Skeleton className="w-40 h-40 rounded-full bg-[#240747]/5" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-full h-2 bg-[#240747]/10" />
        <Skeleton className="w-2/3 h-2 bg-[#240747]/10" />
      </div>
    </div>
  )
});
const NotificationSlider = dynamic(() => import("@/components/landing/NotificationSlider"), { ssr: false });

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 100, damping: 20 } as any
  },
};

const tileHover = {
  rest: { scale: 1, boxShadow: "4px 4px 0 transparent", borderColor: C.purple },
  hover: { scale: 1.015, boxShadow: `6px 6px 0 ${C.orange}`, borderColor: C.orange, transition: { type: "spring", stiffness: 300 } as any },
};

const tileObj = (bg: string, extra?: React.CSSProperties): React.CSSProperties => ({
  background:   bg,
  borderRadius: 24,
  border:       `3px solid ${C.purple}`,
  overflow:     "hidden",
  ...extra,
});

export default function HeroSection() {
  const { openLeadModal } = useModal();

  return (
    <section style={{ padding: "3rem 1.5rem", paddingTop: "3rem" }}>
      <motion.div 
        style={{ maxWidth: 1320, margin: "0 auto" }} 
        initial="hidden" 
        animate="visible" 
        variants={staggerContainer}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 16, alignItems: "stretch" }} className="hero-bento">
          
          {/* ── LEFT TILE ── */}
          <motion.div variants={fadeUp} style={{ ...tileObj(C.purple), padding: "4rem", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "65vh" }}>
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.orange, fontWeight: 700, display: "block", marginBottom: "3rem" }}>
                Engineering Intelligence Complexity Simplified
              </span>
              
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(3rem, 6vw, 4.5rem)", lineHeight: 1, letterSpacing: "-0.04em", textTransform: "uppercase", color: "#F9EFE9", marginBottom: "2rem", maxWidth: 700 }}>
                Your robot works.<br/>
                <span style={{ color: C.orange }}>Now make it see.</span>
              </h1>

              <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.05rem", color: "#F9EFE9", opacity: 0.8, lineHeight: 1.6, maxWidth: 500, marginBottom: "3rem", fontWeight: 400 }}>
                We help robotics startups deploy perception systems in weeks — not months.
              </p>
            </div>

            <div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
                <button 
                  onClick={openLeadModal}
                  className="nb-btn nb-btn-primary"
                >
                  Book a Demo <ArrowRight size={16} />
                </button>
                <Link 
                  href="/case-studies" 
                  className="nb-btn nb-btn-ghost"
                >
                  See Our Work
                </Link>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", paddingTop: "1.5rem", borderTop: `2px solid rgba(249, 239, 233, 0.15)` }}>
                {["No fragile prototypes", "IP fully yours", "4-week deployment"].map((t) => (
                  <span key={t} style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 600, color: "#F9EFE9", opacity: 0.7 }}>
                    ✓ {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN ── */}
          <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ flex: 3 }}>
              <RobotPanel />
            </div>
            {/* Notification Slider */}
            <motion.div whileHover="hover" initial="rest" animate="rest" variants={tileHover} style={{ ...tileObj(C.blush), padding: "2rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 160 }}>
               <NotificationSlider />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
