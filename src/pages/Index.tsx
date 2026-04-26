import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Play, ExternalLink,
  Cpu, Zap, Globe, Brain, Shield, BarChart3,
  Users, Factory, ChevronRight,
} from "lucide-react";
import { updates } from "@/data/updates";

/* ─────────────────────────────────────────
   TILE COLOURS
───────────────────────────────────────── */
const C = {
  cream:     "#F9EFE9",
  parchment: "#F0DCC8",
  blush:     "#EDD5C0",
  amber:     "#F5E6C8",
  purple:    "#240747",
  orange:    "#F6851B",
};

/* ─────────────────────────────────────────
   METRICS
───────────────────────────────────────── */
const METRICS = [
  { value: "40%",   label: "Risk Reduction",      bg: C.cream     },
  { value: "3×",    label: "Faster Deployment",   bg: C.parchment },
  { value: "150+",  label: "Automations Shipped", bg: C.blush     },
  { value: "98%",   label: "Client Retention",    bg: C.amber     },
];

const SERVICES = [
  { icon: Cpu,       title: "AI Agents",            href: "/services/ai-agents",            bg: C.cream     },
  { icon: Zap,       title: "Process Automation",   href: "/services/process-automation",   bg: C.parchment },
  { icon: Globe,     title: "Web Solutions",         href: "/services/web-solutions",        bg: C.blush     },
  { icon: Brain,     title: "NLP Systems",           href: "/services/nlp-systems",          bg: C.amber     },
  { icon: BarChart3, title: "Predict Analytics",  href: "/services/predictive-analytics", bg: C.cream     },
  { icon: Shield,    title: "Enterprise Sec",   href: "/services/enterprise-security",  bg: C.parchment },
];

/* ─────────────────────────────────────────
   FRAMER MOTION VARIANTS
───────────────────────────────────────── */
const staggerContainer = {
  hidden: { opacity: 0 },
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
    transition: { type: "spring", stiffness: 100, damping: 20 } 
  },
};

const tileHover = {
  rest: { scale: 1, boxShadow: "4px 4px 0 transparent", borderColor: C.purple },
  hover: { scale: 1.015, boxShadow: `6px 6px 0 ${C.orange}`, borderColor: C.orange, transition: { type: "spring", stiffness: 300 } },
};

/* ─────────────────────────────────────────
   VIDEO PANEL
───────────────────────────────────────── */
function VideoPanel() {
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

/* ─────────────────────────────────────────
   NOTIFICATION SLIDER
───────────────────────────────────────── */
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

function NotificationSlider() {
  const [index, setIndex] = useState(0);
  const items = updates.filter(u => u.type !== "video"); // Exclude the main video from the slider

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 4500); // cycle every 4.5s
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
          <Link to={currentItem.href || "/blog"} style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
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

/* ─────────────────────────────────────────
   SHARED INLINE STYLES
───────────────────────────────────────── */
const tileObj = (bg: string, extra?: React.CSSProperties): React.CSSProperties => ({
  background:   bg,
  borderRadius: 24,
  border:       `3px solid ${C.purple}`,
  overflow:     "hidden",
  ...extra,
});

const sectionWrap: React.CSSProperties = {
  background: C.cream,
  padding:    "0 1.5rem 4rem",
};

const innerWrap: React.CSSProperties = {
  maxWidth: 1320,
  margin:   "0 auto",
};

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function Index() {
  return (
    <div style={{ background: C.cream }}>
      
      {/* ═════════════════ HERO ═════════════════ */}
      <section style={{ ...sectionWrap, paddingTop: "3rem" }}>
        <motion.div style={innerWrap} initial="hidden" animate="visible" variants={staggerContainer}>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 16, alignItems: "stretch" }} className="hero-bento">
            
            {/* ── LEFT TILE ── */}
            <motion.div variants={fadeUp} style={{ ...tileObj(C.cream), padding: "4rem", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "65vh" }}>
              <div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.orange, fontWeight: 700, display: "block", marginBottom: "3rem" }}>
                  Autonomous Ops for the real world
                </span>
                
                <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(3rem, 6vw, 4.5rem)", lineHeight: 1, letterSpacing: "-0.04em", color: C.purple, marginBottom: "2rem", maxWidth: 700 }}>
                  Hard ops,<br/>
                  <span style={{ color: C.orange }}>automated.</span>
                </h1>

                <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.05rem", color: C.purple, opacity: 0.7, lineHeight: 1.6, maxWidth: 500, marginBottom: "3rem", fontWeight: 400 }}>
                  Deploy AI agents that execute complex logistics, manufacturing, and data workflows—with zero fragile prototypes.
                </p>
              </div>

              <div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
                  <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                    <Link to="/#contact" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.05em", textTransform: "uppercase", padding: "1rem 2rem", background: C.orange, color: C.purple, border: `3px solid ${C.purple}`, borderRadius: 12, boxShadow: `5px 5px 0 ${C.purple}`, textDecoration: "none" }}>
                      Book a Demo <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                    <Link to="/case-studies" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.05em", textTransform: "uppercase", padding: "1rem 2rem", background: C.cream, color: C.purple, border: `3px solid ${C.purple}`, borderRadius: 12, boxShadow: `5px 5px 0 ${C.purple}`, textDecoration: "none" }}>
                      See Our Work
                    </Link>
                  </motion.div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", paddingTop: "1.5rem", borderTop: `2px solid rgba(36,7,71,0.1)` }}>
                  {["No fragile prototypes", "IP fully yours", "4-week deployment"].map((t) => (
                    <span key={t} style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 600, color: C.purple, opacity: 0.6 }}>
                      ✓ {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT COLUMN ── */}
            <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ flex: 3 }}>
                <VideoPanel />
              </div>
              {/* Notification Slider (replaces the static 40% metric) */}
              <motion.div whileHover="hover" initial="rest" animate="rest" variants={tileHover} style={{ ...tileObj(C.blush), padding: "2rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 160 }}>
                 <NotificationSlider />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═════════════════ METRICS (Z-Pattern dynamic grid) ═════════════════ */}
      <section style={sectionWrap}>
        <motion.div style={innerWrap} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridAutoRows: "minmax(180px, auto)", gap: 16 }} className="zbento-grid">
            
            {/* Large primary metric - spans 2 cols, 2 rows */}
            <motion.div variants={fadeUp} style={{ ...tileObj(C.purple), gridColumn: "span 2", gridRow: "span 2", padding: "4rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.orange, fontWeight: 700 }}>Results</span>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(3rem, 6vw, 5rem)", color: C.cream, lineHeight: 1, letterSpacing: "-0.04em", marginBottom: "1rem" }}>40%</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "1.2rem", color: C.cream, opacity: 0.8, fontWeight: 500 }}>Risk Reduction across enterprise deployments.</div>
              </div>
            </motion.div>

            {/* Top right small */}
            <motion.div variants={fadeUp} style={{ ...tileObj(C.parchment), padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "2.5rem", color: C.purple, lineHeight: 1, letterSpacing: "-0.04em" }}>3×</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: C.purple, opacity: 0.6, marginTop: "0.5rem", fontWeight: 500 }}>Faster Deployment</div>
            </motion.div>

            {/* Bottom right small */}
            <motion.div variants={fadeUp} style={{ ...tileObj(C.cream), padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "2.5rem", color: C.purple, lineHeight: 1, letterSpacing: "-0.04em" }}>98%</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: C.purple, opacity: 0.6, marginTop: "0.5rem", fontWeight: 500 }}>Client Retention</div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═════════════════ PROBLEM (Z-Flip Layout) ═════════════════ */}
      <section style={sectionWrap}>
        <motion.div style={innerWrap} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16 }} className="zbento-grid">
            
            {/* Left large horizontal span */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="sub-grid-mb">
              <motion.div variants={fadeUp} style={{ ...tileObj(C.amber), gridColumn: "span 2", padding: "3rem", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 280 }}>
                 <div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.purple, fontWeight: 700, display: "block", marginBottom: "1.5rem" }}>
                      The Problem
                    </span>
                    <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: C.purple, lineHeight: 1.1, letterSpacing: "-0.03em", maxWidth: 500 }}>
                      Why AI projects fail <br/><span style={{ color: C.orange }}>in production.</span>
                    </h2>
                 </div>
              </motion.div>

              <motion.div variants={fadeUp} whileHover="hover" initial="rest" animate="rest" style={{ ...tileObj(C.cream), padding: "2.5rem" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "3rem", color: C.orange, lineHeight: 1, letterSpacing: "-0.05em", display: "block", marginBottom: "1.5rem" }}>01</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.2rem", color: C.purple, letterSpacing: "-0.02em", marginBottom: "1rem" }}>The Lab/Prod Gap</h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: C.purple, opacity: 0.7, lineHeight: 1.5 }}>Passes tests, fails on the factory floor.</p>
              </motion.div>

              <motion.div variants={fadeUp} whileHover="hover" initial="rest" animate="rest" style={{ ...tileObj(C.cream), padding: "2.5rem" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "3rem", color: C.orange, lineHeight: 1, letterSpacing: "-0.05em", display: "block", marginBottom: "1.5rem" }}>02</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.2rem", color: C.purple, letterSpacing: "-0.02em", marginBottom: "1rem" }}>The Hiring Wall</h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: C.purple, opacity: 0.7, lineHeight: 1.5 }}>Senior engineers take 6 months to hire & ramp.</p>
              </motion.div>
            </div>

            {/* Right vertical tower piece */}
            <motion.div variants={fadeUp} style={{ ...tileObj(C.purple), padding: "3rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "3rem", color: C.orange, lineHeight: 1, letterSpacing: "-0.05em", display: "block", marginBottom: "1.5rem" }}>03</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", color: C.cream, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>The Stack Puzzle</h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: C.cream, opacity: 0.7, lineHeight: 1.6, marginBottom: "2rem" }}>LLMs + data pipelines + enterprise integration taking weeks.</p>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: C.orange }}>We do it in days.</p>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* ═════════════════ SERVICES (Dynamic Layout) ═════════════════ */}
      <section style={sectionWrap}>
        <motion.div style={innerWrap} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <motion.div variants={fadeUp} style={{ ...tileObj(C.cream), padding: "3rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", marginBottom: 16 }}>
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.orange, fontWeight: 700, display: "block", marginBottom: "0.75rem" }}>What We Build</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", color: C.purple, letterSpacing: "-0.03em", lineHeight: 1 }}>Enterprise-grade AI.</h2>
            </div>
            <Link to="/services" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.05em", textTransform: "uppercase", padding: "1rem 2rem", background: C.orange, color: C.purple, border: `3px solid ${C.purple}`, borderRadius: 12, boxShadow: `5px 5px 0 ${C.purple}`, textDecoration: "none" }}>
              All Services <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Mixed bento - 2 cols top, 3 cols bottom */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="sub-grid-mb">
            {SERVICES.slice(0, 2).map((svc) => (
              <motion.div key={svc.title} variants={fadeUp} whileHover="hover" initial="rest" animate="rest">
                <Link to={svc.href} style={{ ...tileObj(svc.bg), padding: "3rem", display: "flex", flexDirection: "column", gap: "2rem", textDecoration: "none", height: "100%" }}>
                  <div style={{ width: 56, height: 56, background: C.purple, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svc.icon size={28} color={C.orange} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.6rem", color: C.purple, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "0.5rem" }}>{svc.title}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: C.orange, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      Learn more <ChevronRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="zbento-grid">
            {SERVICES.slice(2).map((svc) => (
              <motion.div key={svc.title} variants={fadeUp} whileHover="hover" initial="rest" animate="rest">
                <Link to={svc.href} style={{ ...tileObj(svc.bg), padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem", textDecoration: "none", height: "100%" }}>
                  <div style={{ width: 40, height: 40, background: C.purple, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svc.icon size={20} color={C.orange} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: C.purple, letterSpacing: "-0.02em", lineHeight: 1.1 }}>{svc.title}</h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═════════════════ INDUSTRIES ═════════════════ */}
      <section style={sectionWrap}>
        <motion.div style={innerWrap} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <motion.div variants={fadeUp} style={{ ...tileObj(C.parchment), padding: "3rem", marginBottom: 16 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.orange, fontWeight: 700, display: "block", marginBottom: "0.75rem" }}>Industries</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", color: C.purple, letterSpacing: "-0.03em", lineHeight: 1 }}>Built for operations.</h2>
          </motion.div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="zbento-grid">
            {[
              { icon: Factory, name: "Manufacturing",  desc: "Line-level AI monitoring.", bg: C.cream     },
              { icon: Zap,     name: "Logistics",       desc: "Routing & warehouse automation.", bg: C.blush     },
              { icon: Users,   name: "HR & Talent",     desc: "AI-driven talent pipelines.",  bg: C.amber     },
              { icon: Brain,   name: "Knowledge",   desc: "LLMs over internal data.",   bg: C.parchment },
            ].map((ind) => (
              <motion.div key={ind.name} variants={fadeUp} whileHover={{ y: -5 }} style={{ ...tileObj(ind.bg), padding: "2.5rem 2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <ind.icon size={28} color={C.orange} />
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: C.purple, letterSpacing: "-0.02em" }}>{ind.name}</h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: C.purple, opacity: 0.7, lineHeight: 1.5 }}>{ind.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═════════════════ CTA ═════════════════ */}
      <section id="contact" style={{ ...sectionWrap, paddingBottom: "5rem" }}>
        <motion.div style={innerWrap} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <motion.div variants={fadeUp} style={{ ...tileObj(C.cream), padding: "5rem 4rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "3rem" }}>
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.orange, fontWeight: 700, display: "block", marginBottom: "1rem" }}>Deploy</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: C.purple, lineHeight: 1, letterSpacing: "-0.03em" }}>
                Ready to remove<br/>operational risk?
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/#contact" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.05em", textTransform: "uppercase", padding: "1.2rem 2.5rem", background: C.orange, color: C.purple, border: `3px solid ${C.purple}`, borderRadius: 14, boxShadow: `6px 6px 0 ${C.purple}`, textDecoration: "none" }}>
                  Book Discovery Call <ArrowRight size={18} />
                </Link>
              </motion.div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: C.purple, opacity: 0.5, letterSpacing: "0.1em", textTransform: "uppercase", paddingLeft: "0.5rem" }}>
                Limited slots available.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>
      
      <style>{`
        @media (max-width: 1024px) {
          .hero-bento, .problem-bento { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .zbento-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .zbento-grid, .sub-grid-mb { grid-template-columns: 1fr !important; }
          .zbento-grid > div { grid-column: auto !important; grid-row: auto !important; }
        }
      `}</style>
    </div>
  );
}
