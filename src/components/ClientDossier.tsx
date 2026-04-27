import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '../hooks/use-outside-click';
import { X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import {
  FaRobot, FaTriangleExclamation, FaSeedling,
  FaUsersGear, FaBolt
} from 'react-icons/fa6';

const C = {
  purple: '#240747',
  orange: '#F6851B',
  cream: '#F9EFE9',
  blush: '#FBE6D6',
  parchment: '#F0E4D8',
  amber: '#FFD085',
};

const clampStyle: React.CSSProperties = { fontFamily: 'var(--font-display)' };

interface DossierItem {
  id: string;
  tab: string;
  headline: string;
  subline: string;
  body: string;
  icon: React.ReactNode;
  bg: string;
  fieldData: { label: string; value: string }[];
  bullets: string[];
}

const SUBJECTS: DossierItem[] = [
  {
    id: 's01',
    tab: 'HARDWARE OPS',
    headline: 'You ship hardware.',
    subline: 'Robots, drones, machines with sensor data nobody knows what to do with.',
    body: 'You build physical systems. Robots, drones, inspection rigs. Your sensors collect terabytes of visual, haptic, and positional data every minute — and most of it dies on a drive. We turn that raw signal into a decisive perception layer integrated directly into your existing stack.',
    icon: <FaRobot size={26} color={C.orange} />,
    bg: C.parchment,
    fieldData: [
      { label: 'SUBJECT TYPE', value: 'Hardware Manufacturer / Robotics Startup' },
      { label: 'PAIN SIGNATURE', value: 'Sensor-data blindness' },
      { label: 'CLEARANCE', value: 'Alpha Priority' },
    ],
    bullets: ['No fragile prototypes', 'IP entirely yours', '4-week active deployment', 'No academic consultants'],
  },
  {
    id: 's02',
    tab: 'PRIOR ATTEMPT',
    headline: "You've tried before.",
    subline: 'Last attempt cost 6 months. You don\'t have another 6 to waste on almost-working.',
    body: 'You\'ve already been through the motions with another vendor or internal team. The model almost worked. Now you\'re sitting on a half-built system and a board that\'s asking questions. We don\'t restart from zero. We forensically assess what exists, fix the architectural debt, and ship.',
    icon: <FaTriangleExclamation size={26} color={C.orange} />,
    bg: C.blush,
    fieldData: [
      { label: 'SUBJECT TYPE', value: 'Post-Failed Deployment Operator' },
      { label: 'PAIN SIGNATURE', value: 'Prototype graveyard' },
      { label: 'CLEARANCE', value: 'Priority Escalation' },
    ],
    bullets: ['Forensic architecture audit', 'Rescue or rebuild decision in 48h', 'Fixed fee, not billable hours', 'Zero fragile handoffs'],
  },
  {
    id: 's03',
    tab: 'FUNDED FOUNDER',
    headline: "You're post-seed.",
    subline: 'You have budget authority and product signal. You need execution velocity.',
    body: 'You\'ve raised. You have real customers signaling real demand. The board wants a live AI feature in the next product cycle. Your engineering team is three people and they\'re already sprinting. We are the AI team you hire instead of building one.',
    icon: <FaSeedling size={26} color={C.orange} />,
    bg: C.amber,
    fieldData: [
      { label: 'SUBJECT TYPE', value: 'Funded B2B SaaS / Industrial Startup' },
      { label: 'PAIN SIGNATURE', value: 'Execution velocity gap' },
      { label: 'CLEARANCE', value: 'Alpha Priority' },
    ],
    bullets: ['Embedded team model', 'Ships in weeks not quarters', 'Scales down when you\'re ready', 'Full knowledge transfer'],
  },
  {
    id: 's04',
    tab: 'CORE TEAM',
    headline: 'Your engineers are irreplaceable.',
    subline: 'Too valuable to spend on annotation pipelines. Keep them building product.',
    body: 'Your senior engineers are your product. Every hour they spend cleaning training data or debugging GPU configs is an hour they\'re not shipping. We absorb the entire heavy infrastructure layer — annotation, training, validation, integration — so your team stays focused on what only they can do.',
    icon: <FaUsersGear size={26} color={C.orange} />,
    bg: C.parchment,
    fieldData: [
      { label: 'SUBJECT TYPE', value: 'Engineering-Led Product Company' },
      { label: 'PAIN SIGNATURE', value: 'Core team bandwidth drain' },
      { label: 'CLEARANCE', value: 'Efficiency Critical' },
    ],
    bullets: ['We own the full ML lifecycle', 'Zero context-switch for your team', 'Async-first collaboration', 'Weekly precision reporting'],
  },
  {
    id: 's05',
    tab: 'VELOCITY',
    headline: 'Speed is your moat.',
    subline: 'Your market window closes the moment a slower competitor catches up.',
    body: 'You\'re in a category that rewards the first mover. You\'ve seen slower teams close the gap and you know what\'s at stake. Our entire process is engineered around removing delay — we own the infra, we have the engineers, we have the data pipeline. Time is your scarcest resource. We protect it.',
    icon: <FaBolt size={26} color={C.orange} />,
    bg: C.blush,
    fieldData: [
      { label: 'SUBJECT TYPE', value: 'Market Velocity Operator' },
      { label: 'PAIN SIGNATURE', value: 'Competitive window compression' },
      { label: 'CLEARANCE', value: 'Maximum Priority' },
    ],
    bullets: ['4-week deployment record', 'No RFP theatre', 'Decision in 48h', 'Same-week kickoff available'],
  },
];

// ─── Folder tab clip ────────────────────────────────────────────────
const FolderCard = ({
  item,
  index,
  onOpen,
  layoutId,
}: {
  item: DossierItem;
  index: number;
  onOpen: () => void;
  layoutId: string;
}) => {
  return (
    <motion.div
      layoutId={layoutId}
      onClick={onOpen}
      whileHover={{ y: -8, boxShadow: `8px 8px 0 ${C.orange}`, borderColor: C.orange }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="nb-tile"
      style={{
        background: item.bg,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
      }}
    >

      {/* Card body */}
      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{
            width: 48, height: 48, background: C.purple,
            borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {item.icon}
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: C.purple, opacity: 0.5, fontWeight: 700 }}>
             SUBJECT 0{index + 1}
          </span>
        </div>

        <div>
          <h3 style={{
            ...clampStyle,
            fontWeight: 900, fontSize: '1.4rem',
            color: C.purple, lineHeight: 1.0, letterSpacing: '-0.03em',
            marginBottom: '0.6rem',
          }}>
            {item.headline}
          </h3>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '0.9rem',
            color: C.purple, opacity: 0.75, lineHeight: 1.4, fontWeight: 500,
          }}>
            {item.subline}
          </p>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
          color: C.orange, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>
          OPEN FILE <ArrowRight size={12} />
        </div>
      </div>

      {/* Folded corner */}
      <div style={{
        position: 'absolute', bottom: 0, right: 0,
        width: 0, height: 0,
        borderStyle: 'solid',
        borderWidth: '0 0 28px 28px',
        borderColor: `transparent transparent ${C.purple} transparent`,
        opacity: 0.25,
      }} />
    </motion.div>
  );
};

// ─── Expanded Modal ──────────────────────────────────────────────────
const DossierModal = ({
  item,
  layoutId,
  onClose,
}: {
  item: DossierItem;
  layoutId: string;
  onClose: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, onClose);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(36,7,71,0.88)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
        }}
      />
      <div style={{
        position: 'fixed', inset: 0,
        display: 'grid', placeItems: 'center',
        zIndex: 10000, padding: '1.5rem',
      }}>
        <motion.div
          layoutId={layoutId}
          ref={ref}
          style={{
            width: '100%', maxWidth: 680, maxHeight: '90vh',
            background: C.cream, borderRadius: 24,
            border: `4px solid ${C.purple}`,
            boxShadow: `16px 16px 0 ${C.orange}`,
            overflow: 'hidden', display: 'flex', flexDirection: 'column',
          }}
        >
          {/* Modal folder tab */}
          <div style={{
            background: C.purple, padding: '0.6rem 2rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', color: C.orange, fontWeight: 700 }}>
                CASE FILE
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)', fontWeight: 700, textTransform: 'uppercase' }}>
                {item.tab}
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              style={{
                background: C.orange, border: `2px solid #fff`,
                borderRadius: '50%', width: 34, height: 34,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={16} color={C.purple} strokeWidth={3} />
            </motion.button>
          </div>

          {/* Dossier content */}
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {/* Hero icon + headline */}
            <div style={{
              background: item.bg, borderBottom: `3px solid ${C.purple}`,
              padding: '2.5rem 2.5rem 2rem',
              display: 'flex', alignItems: 'flex-start', gap: '1.5rem',
            }}>
              <div style={{
                width: 72, height: 72, background: C.purple,
                borderRadius: 18, display: 'flex', alignItems: 'center',
                justifyContent: 'center', flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <div>
                <h2 style={{
                  ...clampStyle, fontWeight: 900,
                  fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                  color: C.purple, lineHeight: 1.0,
                  letterSpacing: '-0.04em', marginBottom: '0.75rem',
                }}>
                  {item.headline}
                </h2>
                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: '1.05rem',
                  fontWeight: 700, color: C.orange, lineHeight: 1.3,
                }}>
                  {item.subline}
                </p>
              </div>
            </div>

            {/* Field assessment block */}
            <div style={{
              background: C.purple, margin: '2rem 2.5rem 0',
              borderRadius: 14, padding: '1.25rem 1.5rem',
              border: `2px solid ${C.orange}`,
              display: 'flex', flexDirection: 'column', gap: '0.6rem',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                letterSpacing: '0.22em', color: C.orange, fontWeight: 700,
                display: 'block', marginBottom: '0.25rem',
              }}>
                ██ FIELD ASSESSMENT ██
              </span>
              {item.fieldData.map((f) => (
                <div key={f.label} style={{ display: 'flex', gap: '0.75rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: C.orange, opacity: 0.7, fontWeight: 700, minWidth: 130 }}>
                    {f.label}:
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: C.cream, fontWeight: 600 }}>
                    {f.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Body */}
            <div style={{ padding: '2rem 2.5rem' }}>
              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: '1rem',
                color: C.purple, lineHeight: 1.7, opacity: 0.85, marginBottom: '2rem',
              }}>
                {item.body}
              </p>

              {/* Bullet grid */}
              <div style={{
                background: C.purple, borderRadius: 14,
                border: `2px solid rgba(246,133,27,0.3)`,
                padding: '1.25rem 1.5rem',
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem',
              }}>
                {item.bullets.map((b) => (
                  <div key={b} style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                    color: C.cream, fontWeight: 600, display: 'flex', gap: '0.5rem', alignItems: 'center',
                  }}>
                    <span style={{ color: C.orange }}>✓</span> {b}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ marginTop: '2rem' }}>
                <Link
                  to="/#contact"
                  onClick={onClose}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem',
                    letterSpacing: '0.05em', textTransform: 'uppercase',
                    padding: '1rem 2rem',
                    background: C.orange, color: C.purple,
                    border: `3px solid ${C.purple}`, borderRadius: 12,
                    boxShadow: `5px 5px 0 ${C.purple}`, textDecoration: 'none',
                  }}
                >
                  Open a Case File <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

// ─── Main Export ─────────────────────────────────────────────────────
export default function ClientDossier() {
  const [active, setActive] = useState<DossierItem | null>(null);
  const id = useId();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActive(null); };
    document.body.style.overflow = active ? 'hidden' : 'auto';
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* ── Header Tile ── */}
      <div style={{
        background: C.purple, borderRadius: 24,
        border: `3px solid ${C.purple}`,
        padding: '4rem',
        display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'start',
      }}>
        {/* Left copy */}
        <div>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: C.orange, fontWeight: 700, display: 'block', marginBottom: '2.5rem',
          }}>
            CASE FILE: QUALIFIED OPERATORS
          </span>
          <h2 style={{
            ...clampStyle, fontWeight: 900,
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            lineHeight: 0.88, letterSpacing: '-0.05em',
            marginBottom: '2rem',
          }}>
            <span style={{ color: C.cream, display: 'block', paddingBottom: '0.2rem' }}>We don't take</span>
            <span style={{ color: C.cream, display: 'block', paddingBottom: '0.2rem' }}>every project.</span>
            <span style={{ color: C.orange, display: 'block' }}>We take the right ones.</span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '1.1rem',
            color: C.cream, opacity: 0.72, lineHeight: 1.6,
            maxWidth: 520, fontWeight: 400,
          }}>
            We run field assessments. We work best with operators whose problems are real, deadlines are immediate, and vision is enough to build on.<br />
            <strong style={{ color: C.cream, opacity: 1 }}>If you qualify, you already know.</strong>
          </p>
        </div>

        {/* Right — metadata block */}
        <div style={{
          border: `2px solid rgba(246,133,27,0.4)`, borderRadius: 16,
          padding: '1.5rem', minWidth: 200,
          display: 'flex', flexDirection: 'column', gap: '0.75rem',
        }}>
          {[
            { label: 'FILED', value: 'Q3 2026' },
            { label: 'CLEARANCE', value: '████ ALPHA' },
            { label: 'SUBJECTS', value: '5 OPEN FILES' },
            { label: 'STATUS', value: 'ACCEPTING OPS' },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.2em', color: C.orange, opacity: 0.6, fontWeight: 700 }}>{row.label}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.05em', color: C.cream, fontWeight: 700 }}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Dossier Card Grid (Flex layout to balance cards) ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
        {SUBJECTS.map((item, i) => (
          <div key={item.id} style={{ flex: '1 1 calc(33.333% - 16px)', minWidth: 280, maxWidth: i > 2 ? 'calc(50% - 8px)' : 'none' }}>
            <FolderCard
              item={item}
              index={i}
              layoutId={`dossier-${item.id}-${id}`}
              onOpen={() => setActive(item)}
            />
          </div>
        ))}
      </div>

      {/* ── NOT CLEARED Strip ── */}
      <div style={{
        borderRadius: 20, border: `2px dashed rgba(36,7,71,0.25)`,
        padding: '2.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '2rem', opacity: 0.65, position: 'relative', overflow: 'hidden',
      }}>
        <motion.div
          animate={{ rotate: [-8, -8] }}
          initial={{ rotate: -8 }}
          style={{
            fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', color: C.orange,
            border: `4px solid ${C.orange}`, borderRadius: 8,
            padding: '0.25rem 1rem', letterSpacing: '0.08em',
            transform: 'rotate(-8deg)', flexShrink: 0,
          }}
        >
          NOT CLEARED
        </motion.div>
        <div>
          <p style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: '1.1rem', color: C.purple, lineHeight: 1.2, marginBottom: '0.35rem',
          }}>
            Still "exploring" whether AI is for you?
          </p>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '0.9rem',
            color: C.purple, opacity: 0.75, lineHeight: 1.5,
          }}>
            We're not the right fit. Come back when the operational pain is real. We'll be here.
          </p>
        </div>
      </div>

      {/* Expanded modal portal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {active && (
            <DossierModal
              key={active.id}
              item={active}
              layoutId={`dossier-${active.id}-${id}`}
              onClose={() => setActive(null)}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
