"use client";



import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '../hooks/use-outside-click';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { FaCheckCircle, FaFileAlt, FaMapSigns, FaDatabase, FaCubes, FaCrosshairs, FaPuzzlePiece } from "react-icons/fa";

// Constants for Brutalist Theme
const C = {
  purple: "#240747",
  orange: "#F6851B",
  cream: "#F9EFE9",
  blush: "#FBE6D6",
  parchment: "#F0E4D8",
  amber: "#FFD085"
};

export interface BentoGridItem {
    id: string | number;
    title: string;
    subtitle?: string;
    description?: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
    bg: string;
}

const ITEMS: BentoGridItem[] = [
    {
        id: "step-1",
        title: "DATA RAW",
        subtitle: "Unify Operational Silos. Gain Absolute Clarity.",
        bg: C.cream,
        icon: <FaFileAlt size={28} color={C.orange} />,
        content: (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <p>We do not expect your data to be perfectly organized. Our first objective is plunging into raw, disjointed manufacturing logs and operational silos to map the reality of your data footprint.</p>
                <div style={{ padding: "1rem", background: C.purple, color: C.cream, borderRadius: 12, border: `2px solid ${C.orange}`, fontWeight: 700, fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
                    ✓ Raw unstructured ingestion
                </div>
            </div>
        )
    },
    {
        id: "step-2",
        title: "STRATEGY SCOPING",
        subtitle: "Access Senior Engineering Expertise. Skip Learning Curves.",
        bg: C.parchment,
        icon: <FaMapSigns size={28} color={C.orange} />,
        content: (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <p>Avoid building solutions looking for problems. We pair you with senior architects to rigorously define the operational KPI the model must accomplish. Zero fragile prototypes. Pure business utility.</p>
                <div style={{ padding: "1rem", background: C.purple, color: C.cream, borderRadius: 12, border: `2px solid ${C.orange}`, fontWeight: 700, fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
                    ✓ Heavy architecture blueprints
                </div>
            </div>
        )
    },
    {
        id: "step-3",
        title: "DATA CLEANING",
        subtitle: "Sanitize Complex Datasets. Automate the Tedium.",
        bg: C.blush,
        icon: <FaDatabase size={28} color={C.orange} />,
        content: (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <p>The hardest, dirtiest part of AI. We own the quality engineers and annotation infrastructure to rip through terabytes of messy visual and logistical data, returning a pristine corpus ready for ingestion.</p>
                <div style={{ padding: "1rem", background: C.purple, color: C.cream, borderRadius: 12, border: `2px solid ${C.orange}`, fontWeight: 700, fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
                    ✓ Automated synthetic sanitization
                </div>
            </div>
        )
    },
    {
        id: "step-4",
        title: "LLM FINE-TUNING",
        subtitle: "Managed Infrastructure. Zero Operational Risks.",
        bg: C.amber,
        icon: <FaCubes size={28} color={C.orange} />,
        content: (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <p>We own the GPU clusters. We train, prune, and align complex LLM architectures strictly around your unique datasets. You skip the massive capital expenditure of scaling your own hardware.</p>
                <div style={{ padding: "1rem", background: C.purple, color: C.cream, borderRadius: 12, border: `2px solid ${C.orange}`, fontWeight: 700, fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
                    ✓ Dedicated GPU allocation
                </div>
            </div>
        )
    },
    {
        id: "step-5",
        title: "RIGOROUS VALIDATION",
        subtitle: "Predictable Costs. Optimize Resource Allocation.",
        bg: C.cream,
        icon: <FaCrosshairs size={28} color={C.orange} />,
        content: (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <p>Every inference model undergoes hostile testing against edge cases. We quantify exact token costs and latency metrics so you deploy with absolutely predictable resource allocation.</p>
                 <div style={{ padding: "1rem", background: C.purple, color: C.cream, borderRadius: 12, border: `2px solid ${C.orange}`, fontWeight: 700, fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
                    ✓ Millisecond latency profiling
                </div>
            </div>
        )
    },
    {
        id: "step-6",
        title: "SYSTEM INTEGRATION",
        subtitle: "Accelerate Deployment. Reduce Time-to-ROI.",
        bg: C.parchment,
        icon: <FaPuzzlePiece size={28} color={C.orange} />,
        content: (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <p>We don't leave you with a Jupyter Notebook. We wrap the model in secure APIs and deeply integrate it directly into your existing ERP, logistics software, or robotics stack. Weeks to deployment instead of quarters.</p>
                 <div style={{ padding: "1rem", background: C.purple, color: C.cream, borderRadius: 12, border: `2px solid ${C.orange}`, fontWeight: 700, fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
                    ✓ Enterprise networking & API bridge
                </div>
            </div>
        )
    }
];

export default function InteractivePipeline() {
    const [active, setActive] = useState<BentoGridItem | boolean | null>(null);
    const ref = useRef<HTMLDivElement>(null);
    const id = useId();

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setActive(false);
            }
        }

        if (active && typeof active === 'object') {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    return (
        <div style={{ position: "relative" }}>
            {typeof document !== 'undefined' && createPortal(
                <>
                    {/* BACKDROP */}
                    <AnimatePresence>
                        {active && typeof active === 'object' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ position: "fixed", inset: 0, background: "rgba(36, 7, 71, 0.85)", backdropFilter: "blur(6px)", zIndex: 10000 }}
                            />
                        )}
                    </AnimatePresence>

                    {/* EXPANDED MODAL */}
                    <AnimatePresence>
                        {active && typeof active === 'object' ? (
                            <div style={{ position: "fixed", inset: 0, display: "grid", placeItems: "center", zIndex: 10001, padding: "1rem" }}>
                                
                                <motion.button
                                    key={`button-${active.title}-${id}`}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, transition: { duration: 0.05 } }}
                                    style={{ position: "absolute", top: "1.5rem", right: "1.5rem", zIndex: 10002, background: C.orange, border: `3px solid ${C.purple}`, borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: `4px 4px 0 ${C.purple}` }}
                                    onClick={() => setActive(null)}
                                >
                                    <X size={20} color={C.purple} strokeWidth={3} />
                                </motion.button>
                                
                                <motion.div
                                    layoutId={`card-${active.title}-${id}`}
                                    ref={ref}
                                    style={{ 
                                        width: "100%", maxWidth: 640, maxHeight: "90vh",
                                        background: C.cream, borderRadius: 24, border: `4px solid ${C.purple}`, 
                                        overflow: "hidden", display: "flex", flexDirection: "column",
                                        boxShadow: `12px 12px 0 ${C.purple}`
                                    }}
                                >
                                    <motion.div layoutId={`image-${active.title}-${id}`}>
                                        <div style={{ width: "100%", height: 180, background: active.bg, borderBottom: `4px solid ${C.purple}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <div style={{ width: 80, height: 80, background: C.purple, borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", transform: "scale(1.2)" }}>
                                                {active.icon}
                                            </div>
                                        </div>
                                    </motion.div>

                                    <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
                                        <div style={{ padding: "2rem", paddingBottom: "1rem" }}>
                                            <motion.h3
                                                layoutId={`title-${active.title}-${id}`}
                                                style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: C.purple, lineHeight: 1, letterSpacing: "-0.04em", marginBottom: "1rem", textTransform: "uppercase" }}
                                            >
                                                {active.title}
                                            </motion.h3>
                                            <motion.p
                                                layoutId={`description-${active.title}-${id}`}
                                                style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", fontWeight: 700, color: C.orange, lineHeight: 1.3 }}
                                            >
                                                {active.subtitle}
                                            </motion.p>
                                        </div>
                                        <div style={{ padding: "0 2rem 2rem 2rem", overflowY: "auto" }}>
                                            <motion.div
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: C.purple, opacity: 0.85, lineHeight: 1.6 }}
                                            >
                                                {active.content}
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ) : null}
                    </AnimatePresence>
                </>,
                document.body
            )}

            {/* BASE GRID (Asymmetric Bento for Z-flow) */}
            <ul style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(3, 1fr)", 
                gap: 20, 
                padding: 0, 
                margin: 0, 
                listStyle: "none" 
            }}>
                {ITEMS.map((item, index) => {
                    const isLarge = index === 0 || index === 3 || index === 4;
                    return (
                        <motion.li
                            layoutId={`card-${item.title}-${id}`}
                            key={item.id}
                            onClick={() => setActive(item)}
                            whileHover={{ y: -6, boxShadow: `8px 8px 0 ${C.orange}`, borderColor: C.orange }}
                            className="nb-tile"
                            style={{
                                gridColumn: isLarge ? "span 2" : "span 1",
                                background: item.bg,
                                cursor: "pointer",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                gap: "1rem",
                                minHeight: "280px",
                                transition: "all 0.2s ease",
                            }}
                        >
                             <motion.div layoutId={`image-${item.title}-${id}`} style={{ display: "inline-block" }}>
                                 <div style={{ width: 64, height: 64, background: C.purple, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                     {item.icon}
                                 </div>
                             </motion.div>
                             <div style={{ marginTop: "1rem" }}>
                                 <motion.h3 
                                     layoutId={`title-${item.title}-${id}`}
                                     style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.6rem", color: C.purple, lineHeight: 1.1, marginBottom: "0.5rem", textTransform: "uppercase" }}
                                 >
                                     {item.title}
                                 </motion.h3>
                                 <motion.p 
                                     layoutId={`description-${item.title}-${id}`}
                                     style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: C.purple, opacity: 0.7, fontWeight: 700 }}
                                 >
                                     {item.subtitle}
                                 </motion.p>
                             </div>
                        </motion.li>
                    );
                })}
            </ul>
        </div>
    );
}
