'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { updates } from "@/data/updates";

const C = {
  purple: "#240747",
  orange: "#F6851B",
  cream:  "#F9EFE9",
};

export default function VideoPanel() {
  const [playing, setPlaying] = useState(false);
  const mainVideo = updates.find((u) => u.type === "video");

  return (
    <div
      style={{
        display:       "flex",
        flexDirection: "column",
        height:        "100%",
        background:    C.purple,
        borderRadius:  24,
        border:        `3px solid ${C.purple}`,
        overflow:      "hidden",
        position:      "relative"
      }}
    >
      {mainVideo?.videoUrl && playing ? (
        <iframe
          src={`${mainVideo.videoUrl}?autoplay=1`}
          title={mainVideo.title}
          allow="autoplay; fullscreen"
          style={{ width: "100%", height: "100%", border: "none", flex: 1 }}
        />
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, gap: "1rem", cursor: "pointer", padding: "1.5rem" }}
          onClick={() => mainVideo && setPlaying(true)}
        >
          <motion.div
            style={{
              width:          84,
              height:         84,
              borderRadius:   "50%",
              background:     C.orange,
              border:         `3px solid ${C.cream}`,
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              boxShadow:      "4px 4px 0 rgba(249,239,233,0.3)",
            }}
            whileHover={{ scale: 1.08, boxShadow: "6px 6px 0 rgba(249,239,233,0.4)" }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Play size={26} color={C.purple} fill={C.purple} style={{ marginLeft: 4 }} />
          </motion.div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.cream, opacity: 0.8, textAlign: "center" }}>
            {mainVideo?.tag ?? "DEMO"} — Play Demo
          </p>
        </div>
      )}
    </div>
  );
}
