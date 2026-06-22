"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { C } from "@/data/constants";

interface CarouselWrapperProps {
  children: React.ReactNode[];
  desktopClass?: string;
  className?: string;
}

export function CarouselWrapper({ 
  children, 
  desktopClass = "grid grid-cols-1 md:grid-cols-3 gap-8",
  className = ""
}: CarouselWrapperProps) {
  const [current, setCurrent] = useState(0);
  const total = React.Children.count(children);

  const goTo = (idx: number) => setCurrent((idx + total) % total);

  const onDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (info.offset.x < -60) goTo(current + 1);
      else if (info.offset.x > 60) goTo(current - 1);
    },
    [current, total]
  );

  if (total === 0) return null;

  return (
    <>
      {/* Mobile view */}
      <div className={`grid md:hidden w-full overflow-hidden relative col-span-full ${className}`}>
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
            {React.Children.toArray(children)[current]}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-4 px-2">
          <button
            onClick={() => goTo(current - 1)}
            aria-label="Previous"
            style={{
              width: 36, height: 36, borderRadius: "50%",
              border: `2px solid ${C.purple}`, background: C.cream,
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
            }}
          >
            <ChevronLeft size={18} color={C.purple} />
          </button>

          <div style={{ display: "flex", gap: "0.4rem" }}>
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width: i === current ? 20 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === current ? C.orange : `${C.purple}40`,
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "width 0.25s ease, background 0.25s ease",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(current + 1)}
            aria-label="Next"
            style={{
              width: 36, height: 36, borderRadius: "50%",
              border: `2px solid ${C.purple}`, background: C.cream,
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
            }}
          >
            <ChevronRight size={18} color={C.purple} />
          </button>
        </div>
      </div>

      {/* Desktop view */}
      <div className={`hidden md:grid ${className} ${desktopClass.includes('grid') ? '' : 'grid'} ${desktopClass}`}>
        {children}
      </div>
    </>
  );
}
