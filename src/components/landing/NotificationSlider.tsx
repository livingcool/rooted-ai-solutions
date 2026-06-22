'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { updates } from "@/data/updates";
import { C } from "@/data/constants";

export default function NotificationSlider() {
  const [index, setIndex] = useState(0);
  const items = updates.filter(u => u.type !== "video");

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [items.length]);

  if (!items.length) return null;
  const currentItem = items[index];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ width: "100%" }}
        >
          <Link href={currentItem.href || "/blog"} style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span
                style={{
                  background:    C.orange,
                  border:        `2px solid ${C.purple}`,
                  padding:       "0.2rem 0.5rem",
                  fontFamily:    "var(--font-mono)",
                  fontSize:      "0.5rem",
                  fontWeight:    700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color:         C.purple,
                  borderRadius:  4,
                  display:       "inline-block"
                }}
              >
                {currentItem.tag ?? currentItem.type}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: C.orange, fontWeight: 700 }}>
                {index + 1} / {items.length}
              </span>
            </div>
            
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: C.purple, lineHeight: 1.2 }}>
              {currentItem.title}
            </h3>
            
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.orange, fontWeight: 700, marginTop: "0.2rem" }}>
              Read More <ArrowRight size={10} />
            </div>
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
