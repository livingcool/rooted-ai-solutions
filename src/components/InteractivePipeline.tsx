"use client";



import React, { useEffect, useId, useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { useOutsideClick } from '../hooks/use-outside-click';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { createPortal } from 'react-dom';
import { FaCheckCircle, FaFileAlt, FaMapSigns, FaDatabase, FaCubes, FaCrosshairs, FaPuzzlePiece } from "react-icons/fa";
import { C } from "@/data/constants";

// Constants for Brutalist Theme
const PIPE_COLORS = {
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
        bg: PIPE_COLORS.blush,
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
        bg: PIPE_COLORS.amber,
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

function PipelineCard({ item, index, setActive, id, isLarge = false }: { item: BentoGridItem; index: number; setActive: (item: BentoGridItem | boolean | null) => void; id: string; isLarge?: boolean }) {
    return (
        <motion.li
            layoutId={`card-${item.title}-${id}`}
            key={item.id}
            onClick={() => setActive(item)}
            whileHover={{ y: -6, boxShadow: `8px 8px 0 ${C.orange}`, borderColor: C.orange }}
            className={`nb-tile ${isLarge ? 'lg:col-span-2' : 'col-span-1'}`}
            style={{
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
            <div className="p-6 lg:p-10 flex flex-col gap-4 flex-1">
                <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-[#240747] rounded-[14px] flex items-center justify-center shrink-0">
                        {item.icon}
                    </div>
                    <span className="font-mono text-[0.65rem] tracking-[0.1em] text-[#240747] opacity-50 font-bold uppercase">
                        STEP 0{index + 1}
                    </span>
                </div>

                <div className="flex flex-col gap-2">
                    <motion.h3 
                        layoutId={`title-${item.title}-${id}`}
                        className="font-display font-black text-[1.4rem] lg:text-[1.8rem] text-[#240747] leading-none tracking-[-0.03em] uppercase"
                    >
                        {item.title}
                    </motion.h3>
                    <motion.p 
                        layoutId={`description-${item.title}-${id}`}
                        className="font-sans text-[0.9rem] text-[#240747] opacity-75 leading-[1.4] font-medium"
                    >
                        {item.subtitle}
                    </motion.p>
                </div>
            </div>
        </motion.li>
    );
}

function MobileCarousel({ setActive, id }: { setActive: (item: BentoGridItem | boolean | null) => void; id: string }) {
    const [current, setCurrent] = useState(0);
    const total = ITEMS.length;

    const goTo = (idx: number) => setCurrent((idx + total) % total);

    const onDragEnd = useCallback(
        (_: unknown, info: PanInfo) => {
            if (info.offset.x < -60) goTo(current + 1);
            else if (info.offset.x > 60) goTo(current - 1);
        },
        [current]
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
                    <ul className="p-0 m-0 list-none">
                        <PipelineCard item={ITEMS[current]} index={current} setActive={setActive} id={id} />
                    </ul>
                </motion.div>
            </AnimatePresence>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "1rem",
                    paddingLeft: "0.5rem",
                    paddingRight: "0.5rem",
                }}
            >
                <button
                    onClick={() => goTo(current - 1)}
                    aria-label="Previous"
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        border: `2px solid ${C.purple}`,
                        background: C.cream,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                    }}
                >
                    <ChevronLeft size={18} color={C.purple} />
                </button>

                <div style={{ display: "flex", gap: "0.4rem" }}>
                    {ITEMS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            style={{
                                width: i === current ? 20 : 8,
                                height: 8,
                                borderRadius: 4,
                                background: i === current ? C.orange : `${C.purple}40`,
                                border: "none",
                                cursor: "pointer",
                                padding: 0,
                                transition: "width 0.25s ease, background 0.25s ease",
                            }}
                        />
                    ))}
                </div>

                <button
                    onClick={() => goTo(current + 1)}
                    aria-label="Next"
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        border: `2px solid ${C.purple}`,
                        background: C.cream,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                    }}
                >
                    <ChevronRight size={18} color={C.purple} />
                </button>
            </div>
            
            <p
                style={{
                    textAlign: "center",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.12em",
                    color: C.purple,
                    opacity: 0.5,
                    marginTop: "0.6rem",
                    textTransform: "uppercase",
                }}
            >
                {current + 1} / {total}
            </p>
        </div>
    );
}

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
                                        <div className="p-6 lg:p-8 pb-4">
                                            <motion.h3
                                                layoutId={`title-${active.title}-${id}`}
                                                className="font-display font-black text-[1.5rem] lg:text-[2.5rem] text-[#240747] leading-none tracking-[-0.04em] mb-4 uppercase"
                                            >
                                                {active.title}
                                            </motion.h3>
                                            <motion.p
                                                layoutId={`description-${active.title}-${id}`}
                                                className="font-sans text-[1rem] lg:text-[1.1rem] font-bold text-[#F6851B] leading-[1.3]"
                                            >
                                                {active.subtitle}
                                            </motion.p>
                                        </div>
                                        <div className="px-6 lg:px-8 pb-8 overflow-y-auto">
                                            <motion.div
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="font-sans text-[0.95rem] lg:text-[1rem] text-[#240747] opacity-85 leading-[1.6]"
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

            {/* CAROUSEL (Mobile) */}
            <div className="block md:hidden">
                <MobileCarousel setActive={setActive} id={id} />
            </div>

            {/* BASE GRID (Desktop) */}
            <div className="hidden md:block">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-0 m-0 list-none">
                    {ITEMS.map((item, index) => {
                        const isLarge = index === 0 || index === 3 || index === 4;
                        return (
                            <PipelineCard key={item.id} item={item} index={index} setActive={setActive} id={id} isLarge={isLarge} />
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
