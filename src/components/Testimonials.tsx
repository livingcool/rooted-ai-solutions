"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, ExternalLink, ShieldCheck, Award, MessageSquare } from "lucide-react";
import Image from "next/image";
import { CarouselWrapper } from "@/components/ui/CarouselWrapper";
import { C } from "@/data/constants";

const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 100, damping: 20 } as any
  },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const tileObj = (bg: string, extra?: React.CSSProperties): React.CSSProperties => ({
  background:   bg,
  borderRadius: 24,
  border:       `3px solid ${C.purple}`,
  overflow:     "hidden",
  ...extra,
});

export default function Testimonials() {
  return (
    <motion.div 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 16 }}
      className="testimonials-grid"
    >
      {/* ── HEADER TILE (Full Width) ── */}
      <motion.div 
        variants={fadeUp} 
        style={{ ...tileObj(C.parchment), gridColumn: "span 12", padding: "3rem", marginBottom: 8 }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.orange, fontWeight: 700, display: "block", marginBottom: "0.75rem" }}>
          Validation
        </span>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", color: C.purple, letterSpacing: "-0.03em", lineHeight: 1 }}>
          Market-verified intelligence.
        </h2>
      </motion.div>

      <div className="col-span-12 grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* ── GOODFIRMS CARD ── */}
        <motion.div 
          whileHover={{ y: -5 }} 
          style={{ ...tileObj(C.cream), padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem", position: "relative" }}
          className="col-span-full md:col-span-4"
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ background: C.purple, padding: "0.75rem", borderRadius: 12 }}>
                  <Award size={24} color={C.orange} />
              </div>
              <a href="https://www.goodfirms.co/company/rootedai" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={18} color={C.purple} style={{ opacity: 0.4 }} />
              </a>
          </div>
          <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.2rem", color: C.purple, marginBottom: "0.5rem" }}>GoodFirms</h3>
              <div style={{ display: "flex", gap: 4, marginBottom: "1rem" }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={C.orange} color={C.orange} />)}
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: C.purple, opacity: 0.8, lineHeight: 1.5 }}>
                  Recognized as a leading <strong>AI Development Company</strong> for enterprise-grade autonomous workflows.
              </p>
          </div>
          <Image 
              src="/images/goodfirms-badge.png" 
              alt="GoodFirms Badge" 
              width={140}
              height={50}
              style={{ width: "100%", maxWidth: 140, height: "auto", marginTop: "auto", alignSelf: "center", filter: "grayscale(1) contrast(1.2) brightness(0.8)", opacity: 0.8 }}
          />
        </motion.div>

        {/* ── CLUTCH CARD ── */}
        <motion.div 
          whileHover={{ y: -5 }} 
          style={{ ...tileObj(C.blush), padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}
          className="col-span-full md:col-span-4"
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ background: C.purple, padding: "0.75rem", borderRadius: 12 }}>
                  <ShieldCheck size={24} color={C.orange} />
              </div>
              <a href="https://clutch.co/profile/rootedaico" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={18} color={C.purple} style={{ opacity: 0.4 }} />
              </a>
          </div>
          <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.2rem", color: C.purple, marginBottom: "0.5rem" }}>Clutch</h3>
              <div style={{ display: "flex", gap: 4, marginBottom: "1rem" }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={C.orange} color={C.orange} />)}
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: C.purple, opacity: 0.8, lineHeight: 1.5 }}>
                  Top-rated for <strong>Robotics ML</strong> and industrial automation consulting. Verified excellence in B2B delivery.
              </p>
          </div>
          <div style={{ marginTop: "auto", paddingTop: "2rem", borderTop: `2px solid ${C.purple}20` }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", fontWeight: 700, color: C.purple, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Verified Partner
              </div>
          </div>
        </motion.div>

        {/* ── GOOGLE REVIEW CARD (One major review) ── */}
        <motion.div 
          whileHover={{ y: -5 }} 
          style={{ ...tileObj(C.amber), padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}
          className="col-span-full md:col-span-4"
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ background: C.purple, padding: "0.75rem", borderRadius: 12 }}>
                  <MessageSquare size={24} color={C.orange} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ width: 24, height: 24, background: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 900, color: "#4285F4", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>G</div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", fontWeight: 700, color: C.purple }}>Google Review</span>
              </div>
          </div>
          
          <div style={{ position: "relative" }}>
              <Quote size={40} color={C.orange} style={{ position: "absolute", top: -10, left: -10, opacity: 0.15 }} />
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", fontStyle: "italic", color: C.purple, lineHeight: 1.6, position: "relative", zIndex: 1, paddingLeft: "1rem" }}>
                  "RootedAI provided exceptional service. Their AI agents have transformed our internal workflows. Highly recommend their expertise in Bangalore!"
              </p>
          </div>

          <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.purple, display: "flex", alignItems: "center", justifyContent: "center", color: C.cream, fontFamily: "var(--font-display)", fontWeight: 700 }}>
                  G
              </div>
              <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem", color: C.purple }}>Ganesh B.</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: C.purple, opacity: 0.6 }}>Verified Customer</div>
              </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
