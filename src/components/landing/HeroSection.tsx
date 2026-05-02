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
    <section className="px-4 py-8 lg:px-6 lg:py-12">
      <motion.div 
        className="max-w-[1320px] mx-auto"
        initial="hidden" 
        animate="visible" 
        variants={staggerContainer}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4 items-stretch">
          
          {/* ── LEFT TILE ── */}
          <motion.div variants={fadeUp} style={tileObj(C.purple)} className="p-8 lg:p-16 flex flex-col justify-between min-h-[50vh] lg:min-h-[65vh]">
            <div>
              <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#F6851B] font-bold block mb-8 lg:mb-12">
                Engineering Intelligence Complexity Simplified
              </span>
              
              <h1 className="font-display font-bold text-[2.5rem] lg:text-[clamp(3rem,6vw,4.5rem)] leading-[1] tracking-[-0.04em] uppercase text-[#F9EFE9] mb-8 max-w-[700px]">
                Your robot works.<br/>
                <span className="text-[#F6851B]">Now make it see.</span>
              </h1>

              <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.05rem", color: "#F9EFE9", opacity: 0.8, lineHeight: 1.6, maxWidth: 500, marginBottom: "3rem", fontWeight: 400 }}>
                We help robotics startups deploy perception systems in weeks — not months.
              </p>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  id="cta-primary-demo"
                  onClick={openLeadModal}
                  className="nb-btn nb-btn-primary w-full sm:w-auto"
                >
                  Book a Demo <ArrowRight size={16} />
                </button>
                <Link 
                  id="cta-ghost-work"
                  href="/case-studies" 
                  className="nb-btn nb-btn-ghost w-full sm:w-auto text-center"
                >
                  See Our Work
                </Link>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-3 pt-6 border-t border-[#F9EFE9]/15">
                {["No fragile prototypes", "IP fully yours", "4-week deployment"].map((t) => (
                  <span key={t} className="font-sans text-[0.75rem] font-semibold text-[#F9EFE9] opacity-70">
                    ✓ {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN ── */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <div className="flex-[3] min-h-[350px] lg:min-h-0">
              <RobotPanel />
            </div>
            {/* Notification Slider */}
            <motion.div 
              whileHover="hover" 
              initial="rest" 
              animate="rest" 
              variants={tileHover} 
              style={tileObj(C.blush)} 
              className="p-6 lg:p-8 flex-1 flex flex-col justify-center min-h-[140px] lg:min-h-[160px] mt-8 lg:mt-0"
            >
               <NotificationSlider />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
