# RootedAI — Complete Website Redesign Specification
## MLaaS for US Robotics Companies

> **Version:** 2.0 | **Author:** RootedAI Internal | **Status:** Conversion-Optimized Build Spec  
> **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Stitch UI · Radix UI · shadcn/ui  
> **Changelog v2.0:** Hero rewrite → outcome-first · Problem section sharpened · Services reframed as outcomes · Live System Proof section added · Pricing value framing added · "What You Get" deliverables section added · "Who This Is For / Not For" section added · Sample use case story added · Software services secondary section added

---

## TABLE OF CONTENTS

1. [Brand Identity & Design System](#1-brand-identity--design-system)
2. [Tech Stack & Architecture](#2-tech-stack--architecture)
3. [Site Map & Page Structure](#3-site-map--page-structure)
4. [Global Components](#4-global-components)
5. [Homepage — Full Specification](#5-homepage--full-specification)
6. [Services Page](#6-services-page)
7. [How It Works Page](#7-how-it-works-page)
8. [Use Cases Page](#8-use-cases-page)
9. [Pricing Page](#9-pricing-page)
10. [About Page](#10-about-page)
11. [Blog / Insights Page](#11-blog--insights-page)
12. [Contact Page](#12-contact-page)
13. [Animation & Motion System](#13-animation--motion-system)
14. [Responsive Design System](#14-responsive-design-system)
15. [SEO & Performance](#15-seo--performance)
16. [Copy & Messaging Framework](#16-copy--messaging-framework)
17. [Component Library Reference](#17-component-library-reference)

---

## 1. Brand Identity & Design System

### 1.1 Positioning Statement

> **RootedAI is the perception engineering team for US robotics companies.**  
> We act as your ML team — designing, training, and shipping production-ready perception systems, integrated into your robot stack. You keep building. We plug in and deliver.

**Tagline:** *Your robot works. Now make it see.*

> **⚠️ Language Rule (v2.0):** Avoid the phrase "ML outsourcing partner" in public copy. Buyers don't think in outsourcing terms — they think in team terms. Always say: *"we act as your perception engineering team"* or *"we plug into your robot stack."* The output is a working module, not a deliverable from a vendor.

---

### 1.2 Visual Identity Direction

**Aesthetic:** Industrial-Precision meets Deep Tech  
- Think: the intersection of a high-end hardware startup (Anduril, Figure AI) and a systems-level software company (Palantir)  
- **NOT:** Generic SaaS purple gradients, stock robot illustrations, or bubbly rounded cards  
- **IS:** Dark-dominant, data-forward, engineered-looking UI with sharp geometry and purposeful motion

**Mood Board Keywords:**
- Oscilloscope readouts
- CNC machining tolerances
- Neural activation maps
- Circuit trace aesthetics
- Terminal green on carbon black

---

### 1.3 Color System

```css
:root {
  /* ── Primary Palette ── */
  --color-bg-base:        #080C0F;   /* Near-black, not pure */
  --color-bg-surface:     #0D1117;   /* Card/panel background */
  --color-bg-elevated:    #131920;   /* Elevated surface */
  --color-bg-highlight:   #1A2430;   /* Hover states */

  /* ── Accent / Brand ── */
  --color-accent-primary: #00E5A0;   /* Electric teal-green — main CTA */
  --color-accent-glow:    rgba(0, 229, 160, 0.15); /* Glow overlay */
  --color-accent-dim:     #00A36C;   /* Secondary teal */

  /* ── Signal Colors ── */
  --color-signal-blue:    #1E90FF;   /* Data / info */
  --color-signal-amber:   #F5A623;   /* Warning / highlight */
  --color-signal-red:     #FF4545;   /* Error / alert */

  /* ── Typography ── */
  --color-text-primary:   #F0F4F8;   /* Body text */
  --color-text-secondary: #8A9BB0;   /* Muted text */
  --color-text-tertiary:  #4A5568;   /* Disabled / hint */
  --color-text-accent:    #00E5A0;   /* Highlighted text */

  /* ── Border & Dividers ── */
  --color-border-subtle:  rgba(255,255,255,0.06);
  --color-border-default: rgba(255,255,255,0.10);
  --color-border-strong:  rgba(255,255,255,0.18);
  --color-border-accent:  rgba(0, 229, 160, 0.35);

  /* ── Gradients ── */
  --gradient-hero:        linear-gradient(135deg, #080C0F 0%, #0D1F2D 50%, #080C0F 100%);
  --gradient-card:        linear-gradient(145deg, #0D1117 0%, #131920 100%);
  --gradient-accent-fade: linear-gradient(180deg, rgba(0,229,160,0.08) 0%, transparent 60%);
  --gradient-text:        linear-gradient(90deg, #00E5A0 0%, #1E90FF 100%);
}
```

---

### 1.4 Typography System

```css
/* Google Fonts + Variable Fonts */
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;500;600;700;800&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');

:root {
  /* Font Families */
  --font-display:  'Syne', sans-serif;         /* Hero headlines, section titles */
  --font-body:     'IBM Plex Sans', sans-serif; /* Body copy, descriptions */
  --font-mono:     'Space Mono', monospace;     /* Code, labels, metrics, tech specs */

  /* Type Scale */
  --text-xs:   0.75rem;   /* 12px — metadata, tags */
  --text-sm:   0.875rem;  /* 14px — captions */
  --text-base: 1rem;      /* 16px — body */
  --text-lg:   1.125rem;  /* 18px — large body */
  --text-xl:   1.25rem;   /* 20px — lead text */
  --text-2xl:  1.5rem;    /* 24px — subheadings */
  --text-3xl:  1.875rem;  /* 30px — section titles */
  --text-4xl:  2.25rem;   /* 36px — page titles */
  --text-5xl:  3rem;      /* 48px — hero sub */
  --text-6xl:  3.75rem;   /* 60px — hero headline */
  --text-7xl:  4.5rem;    /* 72px — max display */

  /* Letter Spacing */
  --tracking-tight:  -0.04em;
  --tracking-normal: 0em;
  --tracking-wide:   0.08em;
  --tracking-widest: 0.2em;

  /* Line Heights */
  --leading-tight:  1.1;
  --leading-snug:   1.3;
  --leading-normal: 1.5;
  --leading-relaxed:1.7;
}
```

---

### 1.5 Spacing & Layout System

```css
:root {
  /* Spacing Scale (4px base) */
  --space-1:  0.25rem;   /* 4px */
  --space-2:  0.5rem;    /* 8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-5:  1.25rem;   /* 20px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
  --space-32: 8rem;      /* 128px */

  /* Container */
  --container-max: 1280px;
  --container-padding: clamp(1rem, 5vw, 3rem);

  /* Border Radius */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-2xl:  24px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-card:    0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06);
  --shadow-elevated: 0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08);
  --shadow-glow:    0 0 40px rgba(0,229,160,0.2), 0 0 80px rgba(0,229,160,0.08);
  --shadow-glow-sm: 0 0 16px rgba(0,229,160,0.25);
}
```

---

### 1.6 Logo Specification

**Primary Logo:**
- Wordmark: "RootedAI" set in Syne 700
- Icon: Stylized neural node branching downward (roots) with upward signal lines
- Color: `--color-accent-primary` on dark; white on accent backgrounds
- Minimum size: 120px wide on desktop, 100px on mobile

**Logo Variants:**
- `logo-full.svg` — icon + wordmark horizontal
- `logo-icon.svg` — icon only (for favicon, app icon)
- `logo-mono-white.svg` — monochrome for dark backgrounds
- `logo-mono-dark.svg` — monochrome for light backgrounds

---

## 2. Tech Stack & Architecture

### 2.1 Core Stack

```
Framework:        Next.js 14 (App Router)
Language:         TypeScript 5.x
Styling:          Tailwind CSS 3.4 + CSS Variables
UI Components:    shadcn/ui + Radix UI primitives
Design System:    Stitch UI (custom token layer on top of shadcn)
Animation:        Framer Motion 11
Icons:            Lucide React + custom SVG set
Forms:            React Hook Form + Zod validation
Email:            Resend (transactional) + React Email templates
CMS:              Contentlayer + MDX (blog/case studies)
Analytics:        Vercel Analytics + PostHog
SEO:              Next.js Metadata API + next-sitemap
Deployment:       Vercel (edge functions)
```

### 2.2 Stitch UI Integration

Stitch UI is the design-token layer that bridges your Figma variables to code. Install and configure:

```bash
npm install @stitches/react
# or if using the newer Stitch UI design system
npm install stitch-ui
```

**Stitch Configuration (`stitch.config.ts`):**
```typescript
import { createStitches } from '@stitches/react';

export const { styled, css, globalCss, keyframes, theme, createTheme } = createStitches({
  theme: {
    colors: {
      bgBase:       '#080C0F',
      bgSurface:    '#0D1117',
      accentPrimary:'#00E5A0',
      textPrimary:  '#F0F4F8',
      textSecondary:'#8A9BB0',
      borderSubtle: 'rgba(255,255,255,0.06)',
    },
    fonts: {
      display: 'Syne, sans-serif',
      body:    'IBM Plex Sans, sans-serif',
      mono:    'Space Mono, monospace',
    },
    space: {
      1:  '4px',
      2:  '8px',
      4:  '16px',
      8:  '32px',
      16: '64px',
    },
    radii: {
      sm: '4px',
      md: '8px',
      lg: '12px',
      full: '9999px',
    },
  },
  media: {
    sm:  '(min-width: 640px)',
    md:  '(min-width: 768px)',
    lg:  '(min-width: 1024px)',
    xl:  '(min-width: 1280px)',
  },
});
```

### 2.3 Framer Motion Setup

```typescript
// lib/motion.ts — shared animation variants
export const fadeInUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export const fadeInLeft = {
  hidden:  { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export const staggerContainer = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

export const slideInRight = {
  hidden:  { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

// Scroll-triggered viewport settings
export const viewportOnce = { once: true, margin: '-100px' };
```

### 2.4 Project Directory Structure

```
rootedai/
├── app/
│   ├── layout.tsx              # Root layout with nav + footer
│   ├── page.tsx                # Homepage
│   ├── services/
│   │   └── page.tsx
│   ├── how-it-works/
│   │   └── page.tsx
│   ├── use-cases/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── pricing/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── contact/
│       └── page.tsx
├── components/
│   ├── global/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── AnnouncementBar.tsx
│   │   └── SmoothScroll.tsx
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── sections/               # Page sections
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── LogoStrip.tsx
│   │   │   ├── ProblemSection.tsx
│   │   │   ├── ServicesGrid.tsx
│   │   │   ├── HowItWorksPreview.tsx
│   │   │   ├── MetricsBar.tsx
│   │   │   ├── UseCasesPreview.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── FinalCTA.tsx
│   │   ├── services/
│   │   ├── pricing/
│   │   └── ...
│   └── shared/
│       ├── SectionHeader.tsx
│       ├── TechBadge.tsx
│       ├── MetricCard.tsx
│       ├── ProcessStep.tsx
│       └── GlowCard.tsx
├── lib/
│   ├── motion.ts
│   ├── utils.ts
│   └── fonts.ts
├── styles/
│   ├── globals.css
│   └── animations.css
└── public/
    ├── fonts/
    ├── images/
    └── videos/
```

---

## 3. Site Map & Page Structure

```
rootedai.co.in/
│
├── /                          Homepage
├── /services                  Services Overview
│   ├── /services/robotics-ml  Robotics ML Systems
│   ├── /services/edge-ai      Edge AI Deployment
│   ├── /services/ros          ROS Integration
│   └── /services/mlops        Continuous Learning / MLOps
├── /how-it-works              Process Walkthrough
├── /use-cases                 Use Cases Hub
│   ├── /use-cases/warehouse   Warehouse Robotics
│   ├── /use-cases/inspection  Industrial Inspection
│   ├── /use-cases/navigation  Autonomous Navigation
│   └── /use-cases/agri        Agricultural Robotics
├── /pricing                   Engagement Models
├── /about                     About RootedAI
├── /blog                      Technical Blog & Insights
│   └── /blog/[slug]
├── /contact                   Contact + Demo Request
└── /demo                      Interactive Demo / Sandbox (future)
```

---

## 4. Global Components

### 4.1 Announcement Bar

**Component:** `AnnouncementBar.tsx`  
**Position:** Sticky, above Navbar  
**Height:** 36px  
**Content:** Rotating messages promoting current offer

```tsx
// Visual spec:
// [⚡ NEW] We're accepting pilot projects for Q3 2025 — 3 spots remaining → Book a call
// Background: rgba(0,229,160,0.08) with 1px bottom border --color-border-accent
// Text: Space Mono, 12px, --color-accent-primary
// Dismiss X on right
// Framer Motion: slideDown on mount, fadeOut on dismiss
```

**Animation:**
```typescript
const announcementVariants = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 36, opacity: 1, transition: { duration: 0.4 } },
  exit:    { height: 0, opacity: 0, transition: { duration: 0.3 } }
};
```

---

### 4.2 Navigation Bar

**Component:** `Navbar.tsx`  
**Behavior:** Transparent on load → frosted-glass on scroll (backdrop-blur: 20px)  
**Height:** 64px (desktop), 56px (mobile)

**Layout:**
```
[Logo]                    [Nav Links]                    [CTA Button]
RootedAI                  Services | How It Works |      [Book a Demo →]
                          Use Cases | About | Blog
```

**Nav Links with Mega Dropdown (Services):**
```
┌─────────────────────────────────────────────────────────┐
│  CORE SERVICES              DEPLOYMENT                   │
│  ● Robotics ML Systems      ● Edge AI (Jetson/ONNX)     │
│  ● Custom Model Training    ● ROS/ROS2 Integration       │
│  ● Perception Pipelines     ● Continuous Learning        │
│                                                          │
│  ──────────────────────────────────────────────────────  │
│  USE CASES: Warehouse · Inspection · Navigation · Agri   │
└─────────────────────────────────────────────────────────┘
```

**Styling:**
```css
/* Scrolled state */
.navbar-scrolled {
  background: rgba(8, 12, 15, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--color-border-subtle);
}
```

**Framer Motion — Navbar entrance:**
```typescript
const navVariants = {
  initial: { y: -100, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } }
};
```

**Mobile Nav:**
- Hamburger → full-screen overlay with staggered link animation
- Background: `--color-bg-base` at 98% opacity
- Links: Syne 700, 32px, full width with border-bottom
- CTA pinned to bottom

---

### 4.3 Footer

**Component:** `Footer.tsx`  
**Layout:** 4-column grid on desktop, stacked on mobile

```
┌──────────────────────────────────────────────────────────────────┐
│  [Logo]                                                          │
│  ML outsourcing for US robotics                                  │
│  companies. Perception to production.                            │
│                                                                  │
│  [LinkedIn] [GitHub] [Twitter/X]                                │
├──────────────────────────────────────────────────────────────────┤
│  SERVICES           USE CASES          COMPANY         LEGAL     │
│  Robotics ML        Warehouse          About           Privacy   │
│  Edge AI            Inspection         Blog            Terms     │
│  ROS Integration    Navigation         Contact         IP Policy │
│  MLOps              Agriculture        Careers                   │
├──────────────────────────────────────────────────────────────────┤
│  © 2025 RootedAI. Chennai, India → Serving US Robotics Companies │
│  Built with Next.js · Deployed on Vercel                         │
└──────────────────────────────────────────────────────────────────┘
```

**Visual Details:**
- Background: `--color-bg-surface`
- Top border: 1px `--color-border-subtle`
- Accent column headers: `--color-accent-primary`, Space Mono, 11px, tracked wide
- A thin animated gradient line at the very top of footer (CSS animation, sliding accent)

---

### 4.4 Smooth Scroll Provider

```tsx
// components/global/SmoothScroll.tsx
// Uses Lenis for ultra-smooth scrolling
import Lenis from '@studio-freight/lenis';
import { useEffect } from 'react';
import { useMotionValue } from 'framer-motion';

export function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
```

---

### 4.5 Cursor Component (Desktop Only)

```tsx
// components/global/CustomCursor.tsx
// Replaces default cursor on desktop
// - Small dot (4px) at actual position
// - Larger ring (24px) that follows with spring lag
// - Expands to 48px on hovering interactive elements
// - Color: --color-accent-primary
// - Mix-blend-mode: difference for contrast on all backgrounds
```

---

## 5. Homepage — Full Specification

### 5.1 Hero Section

**Component:** `HeroSection.tsx`  
**Height:** 100vh minimum, content-driven on mobile  
**Background:** Animated mesh gradient with floating particle system

**Background Details:**
```css
/* Layered background system */
.hero-bg {
  background: var(--color-bg-base);
  position: relative;
  overflow: hidden;
}

/* Layer 1: Radial glow from top-left */
.hero-bg::before {
  content: '';
  position: absolute;
  top: -20%;
  left: -10%;
  width: 60%;
  height: 70%;
  background: radial-gradient(ellipse, rgba(0,229,160,0.07) 0%, transparent 65%);
  filter: blur(40px);
}

/* Layer 2: Subtle grid overlay */
.hero-grid {
  background-image: 
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* Layer 3: Bottom fade */
.hero-fade {
  background: linear-gradient(to bottom, transparent 70%, var(--color-bg-base) 100%);
}
```

**Canvas Particle System (Three.js or tsParticles):**
```javascript
// Floating neural-node particles
// - ~80 particles, small dots (1-3px)
// - Color: rgba(0,229,160,0.3) to rgba(30,144,255,0.2)
// - Connected by lines when < 120px apart
// - Slow drift motion, mouse repulsion at 80px radius
// - Performance: requestAnimationFrame, capped at 60fps
```

**Hero Content Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  [SPACE MONO TAG]                                               │
│  // Perception Engineering for Robotics Teams                  │
│                                                                 │
│  [SYNE 800 — MAIN HEADLINE — 3 lines, each animates in]        │
│  We help robotics startups                                      │
│  deploy perception systems                                      │
│  in weeks — not months.                                         │
│                                                                 │
│  [IBM PLEX BODY — 2 lines max]                                  │
│  From camera → model → ROS topic → running on your robot.      │
│  We act as your ML team. You keep shipping hardware.           │
│                                                                 │
│  [CTA ROW]                                                      │
│  [Book a Discovery Call →]   [See a Live Demo ↓]              │
│  PRIMARY (teal)              GHOST (border)                     │
│                                                                 │
│  [TRUST ROW — below CTAs]                                       │
│  ✓ No ML hiring needed    ✓ IP fully yours    ✓ 4-week starts  │
│  (Space Mono, 12px, secondary color)                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

                    [RIGHT SIDE — HERO VISUAL]
┌─────────────────────────────────────────────────────────────────┐
│  Animated terminal / model metrics dashboard card               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  model: yolov8-custom-rooted                            │   │
│  │  status: ● DEPLOYED  hardware: Jetson AGX Orin          │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  inference: 38ms   accuracy: 96.4%   fps: 26.3          │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  > Object detected: pallet_edge [0.97]                  │   │
│  │  > ROS2 topic published: /perception/bbox               │   │
│  │  > Frame processed in 38.2ms                            │   │
│  │  > Model version: v3.1.2 | Last retrain: 2d ago         │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

> **⚠️ Copy Note (v2.0 fix):** The old headline *"Fine-tuned ML models, deployed into your robot. Fast."* was engineer-impressive but not buyer-converting. The new headline leads with the outcome the buyer actually wants (perception system deployed quickly), not the mechanism (fine-tuned models). The sub-copy then clarifies the pipeline. This distinction is critical for conversions.

**Hero Copy Alternatives (A/B test these):**

```
VARIANT A (recommended — outcome lead):
  Headline: "We help robotics startups deploy perception systems in weeks — not months."
  Sub:      "From camera → model → ROS topic → running on your robot."

VARIANT B (pain-first):
  Headline: "Your robot works in the lab. It shouldn't fail in production."
  Sub:      "We build the perception systems that make robots reliable in the real world."

VARIANT C (team framing):
  Headline: "Plug in a perception engineering team. Ship faster."
  Sub:      "We design, train, and deploy ML systems for robotics — as a managed service."
```

**Hero Terminal Card — Animation Sequence:**
```typescript
// Framer Motion staggered typewriter on terminal lines
// 1. Card fades in (scaleIn) - 0.5s
// 2. Lines reveal sequentially (typewriter effect) - 80ms per char
// 3. Cursor blink starts
// 4. Metrics counter animates up (useMotionValue + useTransform)
// 5. "DEPLOYED" badge pulses with green glow every 3s

const terminalLines = [
  '> Loading model config...',
  '> Connecting to /dev/video0...',
  '> Inference pipeline ready',
  '> Object detected: pallet_edge [0.97]',
  '> ROS2 /perception/bbox published ✓',
];
```

**Framer Motion — Hero Entrance:**
```typescript
// Staggered reveal order:
// 1. Tag pill — delay 0s
// 2. Headline line 1 — delay 0.1s
// 3. Headline line 2 — delay 0.2s
// 4. Headline line 3 — delay 0.3s
// 5. Body text — delay 0.5s
// 6. CTA row — delay 0.7s
// 7. Terminal card — delay 0.4s (parallel track)
// All use: fadeInUp with duration 0.7, ease [0.22,1,0.36,1]
```

---

### 5.2 Logo / Trust Strip

**Component:** `LogoStrip.tsx`  
**Purpose:** Social proof — "Teams using our models work with"  
**Content:** Logos of relevant ecosystems/platforms, not clients (until you have clients)

```
[  NVIDIA Jetson  ]  [  ROS2  ]  [  PyTorch  ]  [  ONNX  ]  [  TensorRT  ]  [  OpenCV  ]
```

**Animation:** Infinite horizontal marquee (CSS animation, pauses on hover)  
**Style:** Logos at 40% opacity, scale to 70% on hover with transition  
**Label above:** `// BUILT FOR THESE ECOSYSTEMS` in Space Mono, tracked widest

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.marquee-track {
  animation: marquee 25s linear infinite;
}
.marquee-track:hover {
  animation-play-state: paused;
}
```

---

### 5.3 Problem Section

**Component:** `ProblemSection.tsx`  
**Purpose:** Agitate the real pain. Not generic "it's slow/expensive" — the specific failure robotics teams feel.

**Section Label:** `// THE REAL PROBLEM`  
**Headline:** `Your robot works in the lab.`  
**Subhead (accent color):** *It keeps failing in production. Perception is why.*

**Supporting copy (IBM Plex, 18px, secondary):**
```
Most robotics teams nail the mechanics. The arm moves. The wheels navigate.
But when it hits a real warehouse floor — variable lighting, cluttered shelves,
humans in the frame — the perception layer breaks down.

The model wasn't built for your environment.
And you don't have 6 months or $200K to fix it.
```

**3-Column Problem Cards — SHARPENED COPY:**

```
┌────────────────────┐  ┌────────────────────┐  ┌────────────────────┐
│  THE LAB/PROD GAP  │  │  THE HIRING WALL   │  │  THE STACK PUZZLE  │
│                    │  │                    │  │                    │
│  Your robot        │  │  A senior ML       │  │  Edge deployment + │
│  performs at 94%   │  │  engineer takes    │  │  ROS integration + │
│  in your test env. │  │  3-6 months to     │  │  model retraining  │
│  It drops to 71%   │  │  hire. $150K+ /yr. │  │  aren't the same   │
│  on the actual     │  │  And they still    │  │  person's job.     │
│  factory floor.    │  │  need to ramp up.  │  │  You need 3 roles  │
│                    │  │                    │  │  for one problem.  │
│  That gap is your  │  │  You don't have    │  │                    │
│  perception layer. │  │  that runway.      │  │  We are all three. │
└────────────────────┘  └────────────────────┘  └────────────────────┘
```

**Card Styling:**
- Background: `--color-bg-surface`
- Left border: 3px `--color-signal-red` (red for pain — increased from 2px)
- First line of card body: Syne 600, slightly brighter — makes the problem name pop
- Last line of each card (the "kicker"): `--color-accent-primary` — turns pain into hook
- Hover: subtle lift (translateY(-4px)), border changes to `--color-border-strong`

**Transition → Solution:**
```
A single line separator with animated gradient sweep:
border-image: linear-gradient(90deg, transparent, --accent-primary, transparent) 1
+ slow ping animation on the down arrow
Label: "// Here's what we do about it"  (Space Mono, accent color)
```

---

### 5.4 Solution Statement (Interstitial)

**Full-width section, center-aligned, large text**

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│    "We are your ML team.                                        │
│     You ship the robot.                                         │
│     We ship the intelligence."                                  │
│                                                                 │
│  RootedAI handles model design, training, edge optimization,    │
│  ROS integration, and continuous improvement — as a managed     │
│  service. You get production-ready ML without building a team.  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Typography:**
- Quote: Syne 700, 48px, gradient text (teal → blue)
- Body: IBM Plex Sans, 18px, `--color-text-secondary`
- Line breaks intentional — each line animates in separately

**Framer Motion:**
```typescript
// ScrollTrigger + splitText reveal
// Each word in the quote enters with a staggered fade-blur (filter: blur(8px) → 0)
// Delay between words: 30ms
// Viewport: once: true, margin: '-20%'
```

---

### 5.5 Services Grid

**Component:** `ServicesGrid.tsx`  
**Layout:** 2×2 grid on desktop, 1-column on mobile  
**Section Label:** `// WHAT WE BUILD`

**Service Card Structure:**
```tsx
interface ServiceCard {
  id: string;
  icon: SVGComponent;      // Custom engineering icon
  label: string;           // Space Mono, teal, 11px tracked
  title: string;           // Syne 700, 24px
  description: string;     // IBM Plex 16px, secondary color
  techTags: string[];      // ['YOLOv8', 'PyTorch', 'ROS2']
  href: string;
}
```

**4 Service Cards — REWRITTEN AS OUTCOMES:**

> **⚠️ Copy Rule (v2.0 fix):** Service titles and descriptions must lead with what the client GETS, not what we DO. Old: "We design and train custom models." New: "Object detection and perception systems for your robot." Outcome > Capability. Always.

**Card 1 — Object Detection & Perception Systems**
```
ICON: Neural network / brain circuit
LABEL: // CORE SERVICE
TITLE: Object Detection & Perception for Your Robot
BODY: Your robot gets a production-grade perception system — 
      trained on your environment, validated against your targets,
      exported and ready to run. Object detection, segmentation,
      pose estimation. Built for your use case, not a benchmark.
WHAT YOU GET: A trained model + eval report + ONNX export
TAGS: YOLOv8 · Detectron2 · PyTorch · Custom Datasets · COCO
LINK: /services/robotics-ml
```

**Card 2 — Real-Time Inference on Your Hardware**
```
ICON: Chip / accelerator
LABEL: // DEPLOYMENT
TITLE: Real-Time Inference on Jetson Hardware
BODY: Your model runs at the latency your robot requires — on the
      Jetson board you already have. We handle TensorRT optimization,
      INT8 quantization, and profiling so you get guaranteed
      sub-40ms inference without buying new hardware.
WHAT YOU GET: TensorRT engine + profiling report + deployment guide
TAGS: Jetson AGX · TensorRT · ONNX · INT8 Quant · DeepStream
LINK: /services/edge-ai
```

**Card 3 — Camera-to-Action Pipelines in Your ROS Stack**
```
ICON: Circuit nodes / interconnected rings
LABEL: // INTEGRATION
TITLE: Camera-to-Action Pipelines in Your ROS Stack
BODY: Your perception results flow directly into your robot's
      decision layer. We write production ROS2 nodes, define
      message types, configure launch files, and test end-to-end —
      so /camera/image_raw becomes /perception/detections cleanly.
WHAT YOU GET: ROS2 node package + integration test suite + launch files
TAGS: ROS2 Humble · rosbag · sensor_msgs · rviz2 · OpenCV
LINK: /services/ros
```

**Card 4 — Your Model Stays Accurate Over Time**
```
ICON: Circular arrows / refresh loop
LABEL: // MANAGED MLOPS
TITLE: Your Model Stays Accurate as Your World Changes
BODY: Environments shift. New objects appear. Lighting changes.
      We monitor your model's performance continuously, trigger
      retraining when drift is detected, and push updates without
      touching your production system. Your robot keeps working.
WHAT YOU GET: Monitoring dashboard + retraining pipeline + monthly report
TAGS: MLflow · DVC · Weights & Biases · CI/CD · A/B Eval
LINK: /services/mlops
```

**Card Animation:**
```typescript
// Stagger: each card enters with fadeInUp, 0.1s apart
// Hover state:
// - Card background lightens from --bg-surface to --bg-elevated
// - Left border transitions from --border-default to --color-accent-primary (2px)
// - Tech tags slide in from bottom (hidden by default, shown on hover)
// - Arrow icon rotates 45° on hover
```

**Tech Tags:**
```css
.tech-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  background: rgba(0,229,160,0.06);
  border: 1px solid rgba(0,229,160,0.2);
  color: var(--color-accent-dim);
  letter-spacing: 0.05em;
}
```

---

### 5.6 Metrics Bar

**Component:** `MetricsBar.tsx`  
**Purpose:** Credibility through numbers  
**Layout:** 4 metrics in a horizontal band

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│    <38ms          96%+           5x            100%            │
│  Inference       Accuracy      Faster than    ROS2             │
│  Latency         Average       In-house        Compatible      │
│  on Jetson       on Custom     ML Build                        │
│                  Models                                         │
└─────────────────────────────────────────────────────────────────┘
```

**Animation:**
```typescript
// useInView + useMotionValue counter animation
// Each number counts up when section enters viewport
// Duration: 2s, easing: easeOut
// Separator lines between metrics pulse once when visible
```

**Styling:**
- Background: `--color-bg-elevated` with subtle circuit-trace SVG watermark
- Numbers: Syne 800, 48px, `--color-accent-primary`
- Labels: IBM Plex 14px, `--color-text-secondary`
- Dividers: 1px `--color-border-subtle`

---

### 5.7 Live System Proof Section ⭐ NEW — CRITICAL

**Component:** `LiveProofSection.tsx`  
**Purpose:** This is the most important section you're missing. Without real demo evidence, every other claim on the site is unverified. This section converts skeptical engineers into booked calls.  
**Section Label:** `// REAL SYSTEM. REAL OUTPUT.`  
**Headline:** `Not a mockup. An actual deployed system.`

> **⚠️ Note (v2.0):** This section must be built and populated before launch. Even one real demo video elevates the entire site's credibility more than any copy change. If you have no client work yet, build a demonstration system yourself (e.g. warehouse object detection on a Jetson with a ROS2 publisher) and record it. Annotate the video with overlaid metrics. This is non-negotiable.

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  // REAL SYSTEM. REAL OUTPUT.                                   │
│                                                                 │
│  Not a mockup. An actual deployed system.                       │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────┐  ┌─────────────────────────┐ │
│  │  [VIDEO PLAYER]              │  │  SYSTEM SPECS           │ │
│  │                              │  │                         │ │
│  │  Demo: Warehouse Object      │  │  Hardware:              │ │
│  │  Detection on Jetson AGX     │  │  Jetson AGX Orin 32GB   │ │
│  │                              │  │                         │ │
│  │  Shows:                      │  │  Model:                 │ │
│  │  • Live camera feed          │  │  YOLOv8m — custom       │ │
│  │  • Bounding boxes overlaid   │  │  trained on warehouse   │ │
│  │  • Class labels + confidence │  │  dataset (4,200 images) │ │
│  │  • FPS counter (live)        │  │                         │ │
│  │  • ROS2 topic output         │  │  Results:               │ │
│  │    visible in terminal       │  │  • 26.3 FPS             │ │
│  │                              │  │  • 38ms avg latency     │ │
│  │  [▶ Play Demo]               │  │  • 96.4% mAP@0.5       │ │
│  └──────────────────────────────┘  │  • 8 object classes     │ │
│                                    │                         │ │
│                                    │  ROS2 Output:           │ │
│                                    │  /perception/detections │ │
│                                    │  Publishing @ 25Hz      │ │
│                                    └─────────────────────────┘ │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PROOF EVIDENCE ROW — 3 items                                   │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │  [SCREENSHOT]    │  │  [SCREENSHOT]    │  │  [METRICS]   │  │
│  │  rviz2 showing   │  │  ROS2 terminal   │  │  Benchmark   │  │
│  │  detection       │  │  with topic      │  │  comparison  │  │
│  │  overlays on     │  │  output stream   │  │  table:      │  │
│  │  real camera     │  │  publishing at   │  │  PyTorch vs  │  │
│  │  feed            │  │  25Hz            │  │  TensorRT    │  │
│  └──────────────────┘  └──────────────────┘  └──────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Video Player Component Spec:**
```typescript
// components/sections/home/LiveProofSection.tsx
// Video: autoplay on hover (desktop), tap-to-play on mobile
// Poster image: freeze frame of best detection moment
// Overlay: animated bounding box drawn via CSS/SVG on poster until play
// Controls: minimal — play/pause + mute only
// Loop: true (keeps engagement)
// Caption bar at bottom: "Actual footage from test deployment — not rendered"
// Aspect ratio: 16:9

// Note: host video on Cloudinary or Bunny.net for performance
// Use next/dynamic to lazy load the video section
```

**Proof Screenshot Cards:**
```css
.proof-card {
  position: relative;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-bg-surface);
}
.proof-card-label {
  position: absolute;
  top: 12px;
  left: 12px;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--color-accent-primary);
  background: rgba(8,12,15,0.85);
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border-accent);
}
```

**Framer Motion — Proof Section:**
```typescript
// Video card: fadeIn + scaleUp on scroll entry
// Spec panel: slideLeft (comes from right), delayed 0.2s after video
// Proof screenshots: stagger fadeUp, 0.1s apart
// On video hover: border transitions to --color-border-accent (teal glow)
```

**Section Footer:**
```
"Want to see this running on your use case? Book a 30-minute technical demo."
[Book Technical Demo →]   (links to /contact with ?type=demo pre-filled)
```

---

### 5.8 What You Get Section ⭐ NEW

**Component:** `DeliverablesSection.tsx`  
**Purpose:** Make the deliverables completely explicit. Buyers need to know exactly what changes hands. This replaces vague service descriptions with concrete items.  
**Section Label:** `// WHAT LANDS IN YOUR REPO`  
**Headline:** `Every engagement delivers a complete, working system.`  
**Subhead:** *Not a Jupyter notebook. Not a research report. A production module.*

**Deliverables Table:**
```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  WHEN YOU WORK WITH US, YOU RECEIVE:                             │
│                                                                  │
│  ✓  Trained model weights       (.pt / .onnx / .engine)         │
│  ✓  TensorRT-optimized engine   (INT8 or FP16, device-specific) │
│  ✓  Training code & config      (reproducible, documented)      │
│  ✓  Annotated dataset           (COCO format, split & versioned)│
│  ✓  Evaluation report           (mAP, latency, confusion matrix)│
│  ✓  ROS2 node package           (buildable, launch-file ready)  │
│  ✓  Integration test suite      (pytest + rosbag playback)      │
│  ✓  Deployment documentation    (step-by-step Jetson setup)     │
│  ✓  Performance baseline        (FPS, latency, resource usage)  │
│  ✓  Handoff call + support      (1 week of async Q&A)           │
│                                                                  │
│  100% IP OWNERSHIP — Everything transfers to you on completion. │
│  No licensing. No lock-in. No "call us to retrain."             │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Visual Design:**
- Each row: checkmark in `--color-accent-primary`, label in primary text, detail in secondary text
- Monospaced file extensions: `--font-mono`, `--color-accent-dim`
- Footer row (IP ownership): different background `--color-bg-elevated`, bold accent text
- Framer Motion: rows stagger in from left, 50ms apart on scroll entry

---

### 5.9 Who This Is For Section ⭐ NEW

**Component:** `IdealClientSection.tsx`  
**Purpose:** Qualify leads before they book. This filters in the right clients and filters out bad fits — saving everyone time and increasing close rate.  
**Section Label:** `// IS THIS A FIT?`  
**Headline:** `Built for a specific kind of team.`

**Layout — Two Columns:**
```
┌──────────────────────────────────┐  ┌──────────────────────────────────┐
│  ✅ THIS IS FOR YOU IF...        │  │  ✗ NOT THE RIGHT FIT IF...       │
│                                  │  │                                  │
│  ● You're a robotics company     │  │  ● You need general-purpose AI   │
│    (hardware-first, not SaaS)    │  │    with no robot involvement     │
│                                  │  │                                  │
│  ● You have a robot that works   │  │  ● You're in pure research /     │
│    mechanically but needs        │  │    academia (no deployment)      │
│    reliable perception           │  │                                  │
│                                  │  │  ● You want to own the ML        │
│  ● You're 5-100 people and       │  │    process entirely in-house     │
│    can't hire an ML team yet     │  │    from day one                  │
│                                  │  │                                  │
│  ● You have (or can collect)     │  │  ● You have no sensor data and   │
│    camera/sensor data from       │  │    no way to collect it yet      │
│    your environment              │  │                                  │
│                                  │  │  ● Your timeline is > 12 months  │
│  ● You need to ship something    │  │    with no near-term deployment  │
│    production-worthy in < 3 mo   │  │    pressure                      │
│                                  │  │                                  │
│  ● You use (or plan to use)      │  │  ● Budget is < $4,000            │
│    ROS, ROS2, or custom Linux    │  │    (pilots start at $5K)         │
│    robotics stack                │  │                                  │
└──────────────────────────────────┘  └──────────────────────────────────┘
```

**Visual Design:**
- Left column: `--color-bg-surface` with subtle teal top-border (2px)
- Right column: `--color-bg-surface` with subtle red top-border (2px)
- Checkmarks: `--color-accent-primary`
- X marks: `--color-signal-red` at 70% opacity
- Each item: IBM Plex 15px, line-height 1.6
- Bottom CTA: `"Think you're a fit? Let's find out in 45 minutes."` → Book Call

---

### 5.10 Sample Story Section ⭐ NEW

**Component:** `StorySectionPreview.tsx`  
**Purpose:** Stories convert. A single concrete case — even a hypothetical / anonymized one at launch — shows buyers what the journey looks like.  
**Section Label:** `// WHAT THIS LOOKS LIKE IN PRACTICE`  
**Headline:** `From unreliable lab model to 95% accuracy in production.`

**Story Layout (magazine editorial style — NOT a card):**
```
┌─────────────────────────────────────────────────────────────────┐
│  CASE: WAREHOUSE PICKING ROBOT                                  │
│  Timeline: 5 weeks  ·  Hardware: Jetson AGX Orin                │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  THE SITUATION                                                  │
│  A 12-person robotics startup building pick-and-place arms for  │
│  e-commerce warehouses. The arm moved perfectly. But their      │
│  perception model — trained on a generic dataset — failed on    │
│  anything outside standard boxes. Accuracy on their actual      │
│  SKU mix: 71%.                                                  │
│                                                                 │
│  WHAT WE DID                                                    │
│  Week 1: Scoped the environment. Identified 47 SKU classes.    │
│          Designed dataset collection protocol.                  │
│  Week 2: Collected and annotated 6,200 images from their        │
│          test warehouse. Built augmentation pipeline.           │
│  Week 3-4: Trained YOLOv8m. Iterative eval. Hit targets.       │
│  Week 5: TensorRT optimization → 34ms on their Jetson.          │
│          ROS2 node built, integrated, tested.                   │
│                                                                 │
│  THE RESULT                                                     │
│  ● Accuracy on production SKU mix: 94.8% mAP@0.5               │
│  ● Inference latency: 34ms (was 180ms with unoptimized model)   │
│  ● ROS2 /arm/targets topic publishing at 28Hz                   │
│  ● Zero false picks in 3-day validation run                     │
│                                                                 │
│  [Read the full case study →]                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Visual Design:**
- Full-width section, max-width 880px, centered
- Background: `--color-bg-elevated` with left accent bar (4px, `--color-accent-primary`)
- Section dividers between THE SITUATION / WHAT WE DID / THE RESULT: 1px `--color-border-subtle`
- "Week X" labels: Space Mono, `--color-accent-primary`, bold
- Results: Syne 600, larger size, green checkmarks
- Timeline bar at top: animated from left → right on scroll entry (Framer Motion pathLength)

> **⚠️ Note:** At launch, label this story as *"Representative project — composite based on our methodology"* until you have a real case study. Swap in real data as soon as your first client completes.

---

### 5.11 Software Services (Secondary) Section ⭐ NEW

**Component:** `SoftwareServicesSection.tsx`  
**Purpose:** Secondary revenue stream — custom software engineering for robotics companies. Kept clearly separate from the primary ML positioning so it doesn't dilute the core message.

**Visual treatment:** Visually distinct from the main services grid — different background, smaller scale, clearly marked "secondary."

```
┌─────────────────────────────────────────────────────────────────┐
│  BACKGROUND: --color-bg-elevated (slightly different shade)     │
│  Border-top: 1px dashed --color-border-subtle                  │
│                                                                 │
│  // ADDITIONAL CAPABILITY                                       │
│                                                                 │
│  Custom Software Engineering                                    │
│  for Robotics Companies                                         │
│                                                                 │
│  Once your ML systems are running, your team often needs        │
│  software to connect, monitor, and operate them. We build       │
│  the surrounding software layer — so you don't need to          │
│  context-switch to a different vendor.                          │
│                                                                 │
│  ┌────────────────────┐  ┌────────────────────┐  ┌───────────┐ │
│  │ Perception         │  │ Robot Operations   │  │ Data &    │ │
│  │ Dashboards         │  │ APIs & Backends    │  │ Annotation│ │
│  │                    │  │                    │  │ Tools     │ │
│  │ Real-time viz of   │  │ REST/gRPC APIs     │  │ Custom    │ │
│  │ model output,      │  │ for robot control, │  │ labeling  │ │
│  │ alerts, and        │  │ fleet management,  │  │ pipelines │ │
│  │ performance        │  │ telemetry logging  │  │ for your  │ │
│  │ metrics            │  │                    │  │ team      │ │
│  └────────────────────┘  └────────────────────┘  └───────────┘ │
│                                                                 │
│  This is a supporting capability — not our primary offering.   │
│  [Discuss a software project →]                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Design Rules:**
- Font sizes 10% smaller than primary service cards (visual hierarchy signal)
- Tag: `// SUPPORTING CAPABILITY` in amber (`--color-signal-amber`) instead of teal — signals secondary
- Cards: border only (no background fill) — lighter visual weight
- CTA: ghost button, not primary — doesn't compete with main CTAs

---



**Component:** `HowItWorksPreview.tsx`  
**Purpose:** 5-step process teaser with link to full page  
**Layout:** Horizontal timeline on desktop, vertical on mobile

```
STEP 1        STEP 2        STEP 3        STEP 4        STEP 5
Discovery  →  Model Design →  Train &    →  Deploy &   →  Monitor
& Scoping      & Dataset     Benchmark     Integrate       & Improve
               Prep          
```

**Step Card Details:**
```
01. Discovery & Scoping
    "We understand your robot, environment, and ML requirements."
    Duration: 1-2 days

02. Model Design & Dataset
    "We architect the right model family and build your dataset pipeline."
    Duration: 1-2 weeks

03. Train & Benchmark
    "Iterative training with continuous evaluation against your targets."
    Duration: 2-4 weeks

04. Deploy & Integrate
    "Edge-optimized deployment + ROS integration on your hardware."
    Duration: 1-2 weeks

05. Monitor & Improve
    "Performance monitoring, retraining triggers, version management."
    Duration: Ongoing
```

**Animation:**
```typescript
// The connecting arrows between steps draw from left to right
// SVG path with Framer Motion pathLength animation
// Triggered by scroll into view
// Each step card then fades in after its arrow arrives
```

---

### 5.8 Use Cases Preview

**Component:** `UseCasesPreview.tsx`  
**Layout:** Asymmetric 2-column — large featured card + 2 smaller cards

```
┌─────────────────────────────────┐  ┌────────────────────────────┐
│                                 │  │  INDUSTRIAL INSPECTION     │
│  WAREHOUSE ROBOTICS             │  │  Defect detection on       │
│                                 │  │  production lines.         │
│  Real-time object detection     │  │  → Learn more              │
│  for pick-and-place robots.     │  └────────────────────────────┘
│  Track pallets, packages,       │
│  people in dynamic envs.        │  ┌────────────────────────────┐
│                                 │  │  AUTONOMOUS NAVIGATION     │
│  [See full use case →]          │  │  Obstacle avoidance and    │
│                                 │  │  semantic mapping for AMRs  │
│  [Demonstration video thumb]    │  │  → Learn more              │
└─────────────────────────────────┘  └────────────────────────────┘
```

**Featured Card:**
- Background: dark image with gradient overlay + teal border-left (3px)
- Tag: Space Mono uppercase label
- On hover: slight scale (1.01), image parallax shift

**Small Cards:**
- Minimal — border, icon, title, one-liner, arrow link

---

### 5.9 Testimonials / Social Proof

**Component:** `TestimonialsSection.tsx`  
**Note:** For launch, use placeholder structure with "Pilot client" if no testimonials yet

**Layout:** Scrollable card carousel (Embla Carousel)

```
┌──────────────────────────────────────────────────────────────┐
│  "RootedAI delivered a working perception system in 3 weeks. │
│   We went from camera feed to ROS topic in production."      │
│                                                              │
│   ── [Name], [Title], [Company]                              │
│      [Warehouse Automation Startup]                          │
└──────────────────────────────────────────────────────────────┘
```

**Styling:**
- Cards: `--color-bg-surface`, 1px border `--color-border-default`
- Quote mark: Syne, 80px, `--color-accent-primary` at 20% opacity (decorative)
- Dots pagination at bottom
- Auto-advance every 5s, pauses on hover

---

### 5.10 Final Homepage CTA

**Component:** `FinalCTA.tsx`  
**Full-width section with large centered content**

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│         Ready to ship ML into your robot?                       │
│                                                                 │
│  We're currently accepting pilot projects for Q3 2025.         │
│  Engagements start at 4 weeks. 3 spots remaining.              │
│                                                                 │
│  [  Book a Discovery Call  ]   [ Download Capability Deck ]     │
│          PRIMARY CTA                  SECONDARY CTA             │
│                                                                 │
│  No commitment. 45 minutes. We'll tell you if we're a fit.     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Background:**
```css
/* Radial accent glow + slight noise texture overlay */
background: radial-gradient(ellipse at 50% 50%, rgba(0,229,160,0.08) 0%, transparent 70%),
            var(--color-bg-base);
```

**Animation:**
- Section enters with fadeInUp
- "3 spots remaining" has a slow pulse animation (opacity 0.7 → 1 → 0.7, 2s loop)
- CTA button has hover glow effect

---

## 6. Services Page

### 6.1 Services Hero

```
[Page Header]
// WHAT WE BUILD

Fine-tuned ML models for robotics.
Built for production. Shipped as a service.

[Short intro paragraph — 2-3 sentences]
We specialize in one thing: getting custom ML models into your robot's
perception stack, running efficiently on your hardware, integrated with 
your existing ROS system.
```

### 6.2 Service Detail Sections

Each service gets a full-width alternating layout (image/diagram left or right).

**6.2.1 Robotics ML Systems Section**

```
[LEFT]                              [RIGHT]
────────────────────────────────    ──────────────────────────────────
// SERVICE 01                       [Architecture Diagram / SVG]
ROBOTICS ML SYSTEMS                 
                                    Neural Network diagram showing:
We design model architectures       Input (Camera) → Backbone →
specifically for your task. Not     Detection Head → NMS → Output
off-the-shelf — custom, trained     
on your data, benchmarked for       With animated data flow lines
your environment.                   (Framer Motion pathLength)
                                    
WHAT WE HANDLE:                     
● Model architecture selection      
● Dataset collection & annotation   
● Training pipeline setup           
● Validation & benchmarking         
● Model export (ONNX/TorchScript)   

TYPICAL DELIVERABLE:                
A fine-tuned model + eval report    
+ training code + dataset repo      

[Explore this service →]            
```

**6.2.2 Edge AI Deployment Section**

```
[RIGHT]                             [LEFT]
────────────────────────────────    ──────────────────────────────────
// SERVICE 02                       [Jetson Hardware Diagram]
EDGE AI DEPLOYMENT                  
                                    Visual: Model size vs inference
Your model needs to run at          time scatter plot
< 40ms on a $500 Jetson board.      
We get you there.                   Animated bar chart showing
                                    FP32 vs FP16 vs INT8 speed
WHAT WE HANDLE:
● ONNX export & optimization
● TensorRT engine compilation
● INT8 / FP16 quantization
● Jetson profiling & tuning
● DeepStream pipeline setup

TYPICAL RESULTS:
3-10x speedup over baseline PyTorch
~60-90% model size reduction
```

**6.2.3 ROS Integration Section**
```
// SERVICE 03
ROS INTEGRATION

Your model connects to your robot's
brain. We write production-grade
ROS2 nodes, not hacks.

WHAT WE DELIVER:
● Camera → inference ROS2 node
● Custom message type definitions
● Topic → action bridge components
● Launch file configuration
● Integration testing suite
● rviz2 visualization overlays
```

**6.2.4 Continuous Learning Section**
```
// SERVICE 04
CONTINUOUS LEARNING

ML models degrade. Environments 
change. Products scale. We manage
the ongoing ML lifecycle so you 
don't have to think about it.

WHAT WE MANAGE:
● Performance monitoring dashboards
● Automatic drift detection triggers
● Retraining pipeline execution
● A/B model evaluation
● Blue/green model deployment
● Monthly performance reports
```

---

### 6.3 Comparison Table

**"Why not build in-house?"**

```
                    In-House ML Team    RootedAI MLaaS
────────────────────────────────────────────────────────
Time to first model    3-6 months           2-4 weeks
Hiring cost            $150K-$200K/yr        Pilot: $5K-15K
Infrastructure setup   Weeks                 Included
ROS expertise          Rare to find          Core capability
Ongoing retraining     Manual / ad-hoc       Managed
Ramp-up risk           High                  Low
────────────────────────────────────────────────────────
```

**Styling:**
- Alternating row backgrounds
- Check marks in RootedAI column: `--color-accent-primary`
- X marks in In-House column: `--color-signal-red`
- Table header: Space Mono, tracked wide

---

## 7. How It Works Page

### 7.1 Full Process Walkthrough

**Layout:** Vertical scrolling timeline with sticky section headers

```
PHASE 1: DISCOVERY (Days 1-3)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

What happens:
  A 90-minute technical scoping call with you and your team.
  We understand: your robot, sensors, environment, OS, ROS 
  version, hardware, latency requirements, and business goals.

You send us:
  → Sample video/image data from your robot
  → Technical spec sheet (or we build it together)
  → Access to your dev Jetson (if available)

We deliver:
  → Project scope document
  → Model architecture recommendation
  → Timeline + milestone plan
  → Pricing confirmation

───────────────────────────────────────────────────────

PHASE 2: DATA & DESIGN (Week 1-2)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

What happens:
  Dataset pipeline + model architecture finalised.
  We handle annotation, augmentation, and train/val splits.

You provide:
  → Raw video/image capture from your environment

We deliver:
  → Annotated dataset (COCO format)
  → Data exploration report
  → Model design doc with architecture rationale

───────────────────────────────────────────────────────

PHASE 3: TRAINING & ITERATION (Week 2-4)
...

PHASE 4: DEPLOYMENT & INTEGRATION (Week 4-6)
...

PHASE 5: HANDOFF & SUPPORT (Week 6+)
...
```

**Visual treatment:**
- Each phase has a large mono-spaced phase number as background watermark
- Animated vertical timeline line that draws as you scroll (Framer Motion, scroll-linked pathLength)
- Phase marker dots: filled with accent color when in view, hollow below

---

## 8. Use Cases Page

### 8.1 Use Cases Hero

```
// WHAT WE'VE BUILT FOR

Real problems. Real robots.
Real production deployments.
```

### 8.2 Use Case Cards (Full Detail)

Each use case is a detailed card/section:

**8.2.1 Warehouse Robotics**

```
┌─────────────────────────────────────────────────────────────────┐
│  WAREHOUSE ROBOTICS                           [Diagram/Image]   │
│                                                                 │
│  THE CHALLENGE                                                  │
│  Warehouse robots need to detect and classify hundreds of       │
│  SKU types, navigate around dynamic human workers, and          │
│  handle variable lighting — all in <30ms per frame.             │
│                                                                 │
│  WHAT WE BUILD                                                  │
│  ● Multi-class object detection (pallets, people, AGVs)         │
│  ● Depth estimation integration (stereo or ToF sensors)         │
│  ● Semantic segmentation for floor/obstacle classification      │
│  ● ROS2 nodes for /detection, /costmap integration              │
│                                                                 │
│  TECH STACK                                                     │
│  [YOLOv8] [Jetson Orin] [ROS2 Nav2] [TensorRT] [RTSP]         │
│                                                                 │
│  SAMPLE METRICS                                                 │
│  Inference: 28ms | mAP@0.5: 0.94 | Classes: 47                 │
└─────────────────────────────────────────────────────────────────┘
```

**8.2.2 Industrial Inspection**

```
THE CHALLENGE
Visual defect detection on fast-moving production lines.
Requirements: sub-mm defect detection, <20ms per frame,
integration with existing SCADA/PLC systems.

WHAT WE BUILD
● Anomaly detection models (supervised + unsupervised)
● High-res image pipeline (1080p → ROI crop → classify)
● False positive rate optimization
● MQTT/OPC-UA bridge for factory system integration

TECH STACK
[EfficientDet] [PatchCore] [OpenCV] [MQTT] [Jetson NX]
```

**8.2.3 Autonomous Navigation**
```
THE CHALLENGE
AMRs need semantic understanding of their environment beyond
LIDAR-based SLAM. Camera-based obstacle classification,
pedestrian detection, and dynamic re-routing.

WHAT WE BUILD
● Bird's-eye-view segmentation from monocular camera
● Pedestrian/vehicle/static obstacle classification
● Fusion with existing LIDAR costmaps
● Nav2 costmap_2d plugin integration
```

**8.2.4 Agricultural Robotics**
```
THE CHALLENGE
Crop monitoring robots operating outdoors with variable 
weather, lighting, and plant growth stages. Models must 
work on solar-powered hardware with tight compute budgets.

WHAT WE BUILD
● Plant health classification (RGB + multispectral)
● Fruit detection and ripeness estimation
● Pruning target localization
● Lightweight MobileNet-class models for ARM Cortex
```

---

## 9. Pricing Page

### 9.1 Engagement Model Overview

**Headline:** `Structured for how robotics companies actually work.`

**3 Engagement Tiers:**

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  PILOT          │  │  FULL BUILD     │  │  MANAGED        │
│                 │  │                 │  │                 │
│  Prove the      │  │  End-to-end ML  │  │  Ongoing ML     │
│  concept fast.  │  │  system build.  │  │  partnership.   │
│                 │  │                 │  │                 │
│  4-6 weeks      │  │  8-16 weeks     │  │  Monthly        │
│  Fixed scope    │  │  Milestones     │  │  Retainer       │
│                 │  │                 │  │                 │
│  STARTS AT      │  │  STARTS AT      │  │  STARTS AT      │
│  $5,000         │  │  $18,000        │  │  $3,500/mo      │
│                 │  │                 │  │                 │
│  ✓ 1 model      │  │  ✓ Full stack   │  │  ✓ Monitoring   │
│  ✓ Evaluation   │  │  ✓ ROS nodes    │  │  ✓ Retraining   │
│  ✓ ONNX export  │  │  ✓ Edge deploy  │  │  ✓ Updates      │
│  ✓ Report       │  │  ✓ Docs         │  │  ✓ Support      │
│                 │  │                 │  │                 │
│ [Start a Pilot] │  │  [Book a Call]  │  │  [Learn More]   │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

**Pricing Notes:**
```
* Prices are starting points — custom scoping required
* All engagements include a free 45-minute discovery call
* Pilot projects can roll into Full Build engagements
* IP ownership fully transferred to client on project completion
```

**FAQ Section (Accordion):**
```
Q: Do we own the trained models and code?
A: Yes. 100%. We transfer all IP on completion.

Q: What data do you need to start?
A: Ideally 500+ labeled images or 30+ minutes of video from your robot.
   We can also help you design a data collection process.

Q: Can you work with our existing codebase / ROS setup?
A: Yes. We start by understanding your current stack.

Q: Do you work with teams outside the US?
A: We're India-based, serving US robotics companies.
   We work async + weekly syncs across time zones.

Q: What hardware do you target?
A: NVIDIA Jetson family (Nano, NX, AGX Orin) primarily.
   Can also target Raspberry Pi 4/5, x86 edge servers, or cloud.
```

---

## 10. About Page

### 10.1 Story Section

```
// WHO WE ARE

RootedAI was founded in Chennai, India with one clear mission:

Give US robotics startups access to world-class ML engineering
without the cost and complexity of building it in-house.

We're a tight team of ML engineers and robotics systems developers.
We don't build generic AI. We build systems that go into real robots
that operate in real environments.

Our team has experience with:
→ Computer vision at scale
→ NVIDIA Jetson deployment
→ ROS/ROS2 system architecture
→ Production ML pipelines
→ Sensor fusion (camera + LIDAR + IMU)
```

### 10.2 Team Section

**Cards:**
```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  [Photo]         │  │  [Photo]         │  │  [Photo]         │
│  Ganesh [L.]     │  │  [Name]          │  │  [Name]          │
│  Founder & CEO   │  │  ML Engineer     │  │  ROS Engineer    │
│  Chennai, India  │  │                  │  │                  │
│  [LinkedIn ↗]    │  │  [LinkedIn ↗]    │  │  [LinkedIn ↗]    │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

### 10.3 Values / Principles

```
01. PRECISION OVER PROMISES
    We spec carefully, benchmark honestly, and deliver exactly 
    what we said we would.

02. PRODUCTION-FIRST
    Every model we build is designed to work in the field —
    not just on your test laptop.

03. RADICAL TRANSPARENCY
    Weekly progress updates, shared dashboards, open code repos.
    You always know exactly where your project stands.

04. LONG-TERM PARTNERSHIP
    We want to be your ML team for years, not a one-time vendor.
```

---

## 11. Blog / Insights Page

### 11.1 Blog Structure

**Categories (filterable tags):**
- `Technical Guides`
- `Edge AI`
- `ROS / ROS2`
- `Dataset & Training`
- `Case Studies`
- `Industry Trends`

### 11.2 Suggested Launch Posts

```
1. "YOLOv8 vs RT-DETR for Real-Time Robot Perception: A Benchmarking Guide"
   → Tags: Technical Guide, Dataset & Training

2. "Deploying PyTorch Models to Jetson AGX Orin with TensorRT: Step-by-Step"
   → Tags: Edge AI, Technical Guide

3. "Why Your Robotics Company Doesn't Need to Hire an ML Team (Yet)"
   → Tags: Industry Trends

4. "ROS2 Humble + Camera Pipeline: From /image_raw to /detection Results"
   → Tags: ROS / ROS2, Technical Guide

5. "INT8 Quantization Without Accuracy Loss: What We Learned"
   → Tags: Edge AI, Technical Guide
```

### 11.3 Blog Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  [FEATURED POST — LARGE CARD]                                    │
│  YOLOv8 vs RT-DETR: Benchmarking Guide                          │
│  Jan 2025 · 12 min read · Technical Guide                        │
└──────────────────────────────────────────────────────────────────┘

[ All ] [ Technical ] [ Edge AI ] [ ROS ] [ Case Studies ]   ← Filter tabs

┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Post Card   │  │  Post Card   │  │  Post Card   │
│  [thumbnail] │  │  [thumbnail] │  │  [thumbnail] │
│  [tag]       │  │  [tag]       │  │  [tag]       │
│  [title]     │  │  [title]     │  │  [title]     │
│  [excerpt]   │  │  [excerpt]   │  │  [excerpt]   │
│  [date][time]│  │  [date][time]│  │  [date][time]│
└──────────────┘  └──────────────┘  └──────────────┘
```

---

## 12. Contact Page

### 12.1 Layout

```
┌──────────────────────────────┐  ┌──────────────────────────────┐
│  LET'S TALK                  │  │  CONTACT FORM                │
│                              │  │                              │
│  We respond within           │  │  Name *                      │
│  24 business hours.          │  │  [__________________]        │
│                              │  │                              │
│  ────────────────────────    │  │  Company *                   │
│                              │  │  [__________________]        │
│  📍 Chennai, India           │  │                              │
│  🕐 IST (UTC+5:30)           │  │  Email *                     │
│  🌍 Serving US companies     │  │  [__________________]        │
│                              │  │                              │
│  ────────────────────────    │  │  Robot / Use Case *          │
│                              │  │  [__________________]        │
│  BOOK A CALL                 │  │                              │
│  Calendly embed below        │  │  What are you building?      │
│  or [Schedule directly]      │  │  [______________________]   │
│                              │  │  [______________________]   │
│  ────────────────────────    │  │                              │
│                              │  │  [  Send Message →  ]        │
│  ganesh@rootedai.co.in       │  │                              │
│  LinkedIn ↗                  │  │  Or book directly:           │
│                              │  │  [Schedule a 45-min call]    │
└──────────────────────────────┘  └──────────────────────────────┘
```

### 12.2 Form Behavior

```typescript
// React Hook Form + Zod schema
const contactSchema = z.object({
  name:     z.string().min(2, 'Name required'),
  company:  z.string().min(1, 'Company required'),
  email:    z.string().email('Valid email required'),
  useCase:  z.string().min(3, 'Tell us your use case'),
  message:  z.string().min(20, 'Please describe your project'),
});

// On submit:
// 1. POST to /api/contact
// 2. Server action sends email via Resend
// 3. Success: confetti + success card replaces form
// 4. Error: inline error message with retry option
```

### 12.3 Calendly Integration

```tsx
// Embed Calendly inline widget
// OR link to calendly.com/rootedai/discovery
// Primary CTA: "Book a 45-minute Discovery Call"
// Show timezone context: "We match your timezone (US EST/PST friendly)"
```

---

## 13. Animation & Motion System

### 13.1 Framer Motion — Core Variants Library

```typescript
// lib/animations.ts

import { Variants } from 'framer-motion';

export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT   = [0.4, 0, 0.2, 1];

// ── Entry Animations ──────────────────────────────────────

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO }
  }
};

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1,
    transition: { duration: 0.5 }
  }
};

export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO }
  }
};

export const slideRight: Variants = {
  hidden:  { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO }
  }
};

export const scaleUp: Variants = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO }
  }
};

// ── Container / Stagger ───────────────────────────────────

export const stagger: Variants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren:   0.15,
    }
  }
};

export const staggerFast: Variants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.05 }
  }
};

// ── Hover States ──────────────────────────────────────────

export const cardHover = {
  rest:  { y: 0,  scale: 1,    transition: { duration: 0.25 } },
  hover: { y: -6, scale: 1.01, transition: { duration: 0.25 } }
};

export const buttonHover = {
  rest:  { scale: 1 },
  hover: { scale: 1.03, transition: { duration: 0.15 } },
  tap:   { scale: 0.97 }
};

// ── SVG Path Animations ───────────────────────────────────

export const drawPath: Variants = {
  hidden:  { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1,
    transition: { duration: 1.5, ease: EASE_IN_OUT }
  }
};

// ── Number Counter Animation ──────────────────────────────

// Used with useMotionValue + useTransform
export function useCountUp(target: number, duration = 2) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  
  useEffect(() => {
    const controls = animate(count, target, { duration, ease: 'easeOut' });
    return controls.stop;
  }, [target]);
  
  return rounded;
}
```

---

### 13.2 Page Transition System

```typescript
// app/layout.tsx — AnimatePresence wrapper
// components/PageTransition.tsx

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0,
    transition: { duration: 0.35, ease: EASE_OUT_EXPO }
  },
  exit:    { opacity: 0, y: -8,
    transition: { duration: 0.2 }
  }
};

// Wrap each page:
// <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
```

---

### 13.3 Scroll-Triggered Animations

```typescript
// Usage pattern for every section:
function SectionComponent() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <motion.section
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <motion.h2 variants={fadeUp}>...</motion.h2>
      <motion.p  variants={fadeUp}>...</motion.p>
      {/* cards */}
      {items.map(item => (
        <motion.div key={item.id} variants={scaleUp}>...</motion.div>
      ))}
    </motion.section>
  );
}
```

---

### 13.4 Terminal Typewriter Effect

```typescript
// components/shared/TerminalTypewriter.tsx

import { useEffect, useState } from 'react';

interface Props {
  lines: string[];
  speed?: number;       // ms per character, default 45
  lineDelay?: number;   // ms between lines, default 400
}

export function TerminalTypewriter({ lines, speed = 45, lineDelay = 400 }: Props) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLine >= lines.length) return;
    
    if (currentChar < lines[currentLine].length) {
      const t = setTimeout(() => {
        setDisplayed(prev => {
          const next = [...prev];
          next[currentLine] = (next[currentLine] || '') + lines[currentLine][currentChar];
          return next;
        });
        setCurrentChar(c => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setCurrentLine(l => l + 1);
        setCurrentChar(0);
      }, lineDelay);
      return () => clearTimeout(t);
    }
  }, [currentLine, currentChar, lines, speed, lineDelay]);

  return (
    <div className="terminal-output font-mono text-sm">
      {displayed.map((line, i) => (
        <div key={i} className="terminal-line">
          <span className="terminal-prompt text-accent">{'>'}</span>
          <span className="terminal-text ml-2">{line}</span>
          {i === currentLine && <span className="terminal-cursor animate-pulse">█</span>}
        </div>
      ))}
    </div>
  );
}
```

---

### 13.5 Animated SVG Timeline

```typescript
// components/shared/AnimatedTimeline.tsx
// Framer Motion scroll-linked SVG path

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function AnimatedTimeline({ steps }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center']
  });

  return (
    <div ref={ref} className="relative">
      {/* SVG line */}
      <svg className="absolute left-6 top-0 h-full w-4">
        <motion.line
          x1="8" y1="0" x2="8" y2="100%"
          stroke="var(--color-accent-primary)"
          strokeWidth="2"
          style={{ pathLength: scrollYProgress }}
          strokeDasharray="1"
          strokeDashoffset="0"
        />
      </svg>

      {/* Steps */}
      {steps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: i * 0.1, duration: 0.6, ease: EASE_OUT_EXPO }}
          className="step-item ml-16 mb-16"
        >
          {/* Dot */}
          <div className="absolute left-4 w-4 h-4 rounded-full bg-accent border-2 border-bg-base" />
          <div className="step-content">{/* ... */}</div>
        </motion.div>
      ))}
    </div>
  );
}
```

---

## 14. Responsive Design System

### 14.1 Breakpoints

```css
/* Tailwind config breakpoints */
screens: {
  'xs':  '375px',   /* Small mobile */
  'sm':  '640px',   /* Mobile */
  'md':  '768px',   /* Tablet */
  'lg':  '1024px',  /* Small desktop */
  'xl':  '1280px',  /* Desktop */
  '2xl': '1536px',  /* Wide desktop */
}
```

### 14.2 Responsive Layout Rules

```
HERO SECTION
  Mobile:  Stack vertically. Terminal card below headline.
           Headline: 36px. CTA full-width buttons.
  Tablet:  Same stack, wider padding. Headline: 48px.
  Desktop: Side by side. Headline: 60-72px.

SERVICES GRID
  Mobile:  1 column
  Tablet:  2 columns
  Desktop: 2x2 grid

METRICS BAR
  Mobile:  2x2 grid
  Desktop: 4-column row

NAV
  Mobile:  Logo + hamburger menu
  Desktop: Full horizontal nav

FOOTER
  Mobile:  Single column, stacked
  Tablet:  2 columns
  Desktop: 4 columns
```

### 14.3 Mobile-Specific Components

```tsx
// Mobile hamburger → full-screen menu
// Touch-optimized CTA buttons (min-height: 48px)
// Swipeable carousel for testimonials and use cases
// Collapsed accordion for service details on mobile
// Bottom-sticky CTA bar on mobile (fixed, blurred background)
```

**Bottom Sticky CTA (Mobile):**
```
┌─────────────────────────────────────────────────────┐
│  [ Book a Discovery Call → ]                        │
└─────────────────────────────────────────────────────┘
// Shows after scrolling past hero
// Hidden on desktop
// bg: rgba(8,12,15,0.9) blur(16px)
// border-top: 1px --color-border-default
```

---

## 15. SEO & Performance

### 15.1 Metadata Configuration

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://rootedai.co.in'),
  title: {
    default: 'RootedAI — ML as a Service for Robotics Companies',
    template: '%s | RootedAI'
  },
  description: 'RootedAI designs, trains, and deploys fine-tuned ML models for US robotics companies. Robotics perception, edge AI, ROS integration — as a managed service.',
  keywords: [
    'ML as a service robotics',
    'custom ML models robotics',
    'Jetson deployment service',
    'ROS2 ML integration',
    'robotics perception AI',
    'edge AI deployment India',
    'computer vision robotics',
    'MLaaS robotics'
  ],
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         'https://rootedai.co.in',
    siteName:    'RootedAI',
    title:       'RootedAI — ML as a Service for Robotics Companies',
    description: 'Custom ML models for robotics. Edge-deployed, ROS-integrated, managed.',
    images: [{
      url:    '/og-image.png',  // 1200×630px
      width:  1200,
      height: 630,
      alt:    'RootedAI — ML as a Service for Robotics'
    }]
  },
  twitter: {
    card:        'summary_large_image',
    title:       'RootedAI — ML as a Service for Robotics',
    description: 'Custom ML models for robotics. Edge-deployed, ROS-integrated, managed.',
    images:      ['/og-image.png'],
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: { index: true, follow: true }
  }
};
```

### 15.2 Structured Data (JSON-LD)

```typescript
// app/page.tsx — Homepage structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'RootedAI',
  url: 'https://rootedai.co.in',
  logo: 'https://rootedai.co.in/logo.svg',
  description: 'ML as a Service for US robotics companies',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chennai',
    addressCountry: 'IN'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'ganesh@rootedai.co.in',
    availableLanguage: 'English'
  },
  sameAs: [
    'https://linkedin.com/company/rootedai',
    'https://github.com/rootedai'
  ]
};
```

### 15.3 Core Web Vitals Targets

```
LCP  (Largest Contentful Paint): < 2.5s
FID  (First Input Delay):        < 100ms
CLS  (Cumulative Layout Shift):  < 0.1
INP  (Interaction to Next Paint): < 200ms
```

**Optimization Checklist:**
```
□ next/image for all images (WebP, AVIF, lazy loading)
□ next/font for Google Fonts (no FOUT)
□ Dynamic imports for heavy components (Three.js, particle system)
□ Suspense boundaries for below-fold sections
□ Edge caching on Vercel for static pages
□ Preload hero fonts
□ Critical CSS inlined
□ Video elements: poster image + preload="none"
□ Framer Motion: lazy import + reduced-motion media query support
```

### 15.4 Reduced Motion Support

```typescript
// Respect prefers-reduced-motion
import { useReducedMotion } from 'framer-motion';

export function AnimatedSection({ children, variants }) {
  const shouldReduce = useReducedMotion();
  
  return (
    <motion.div
      variants={shouldReduce ? {} : variants}
      initial={shouldReduce ? false : 'hidden'}
      whileInView={shouldReduce ? {} : 'visible'}
    >
      {children}
    </motion.div>
  );
}
```

---

## 16. Copy & Messaging Framework

### 16.1 Core Messages by Audience

**For Founding Engineers / CTOs:**
```
Headline angle: "Your robot needs ML. You don't have time to hire for it."
Pain: Building an ML team is slow and expensive
Solution: RootedAI is your ML team, on demand
Proof: Week 1 scoping → Week 4 deployed model
CTA: "Book a technical scoping call"
```

**For Founders / CEOs:**
```
Headline angle: "ML is a capability, not a cost center."
Pain: $150K ML engineer + GPU infra + months of ramp-up
Solution: Fixed-scope engagements, IP owned by you
Proof: Pilot project structure, clear milestones
CTA: "See engagement models"
```

### 16.2 Elevator Pitch (45 seconds)

> "RootedAI helps US robotics companies integrate custom ML models into their systems — without hiring an ML team. We handle everything from model design and training to edge deployment on Jetson hardware and ROS2 integration, delivered as a managed service. Pilot projects start at 4 weeks. You own the IP. You keep shipping."

### 16.3 Key Differentiators to Repeat

1. **Robotics-specific** — not general ML, not generic AI agency
2. **End-to-end** — model to ROS topic, not just "here's a model file"
3. **Edge-first** — Jetson, TensorRT, real hardware, real latency
4. **IP ownership** — clients own everything on delivery
5. **Managed service** — ongoing retraining and monitoring, not one-and-done
6. **India time zone advantage** — async-friendly, US business hours overlap

### 16.4 Words to Use / Avoid

**USE:**
```
✓ Fine-tuned
✓ Production-ready
✓ Deployed
✓ Managed service
✓ Real-time inference
✓ Edge-optimized
✓ ROS integration
✓ Benchmarked
✓ Custom
✓ Perception pipeline
```

**AVOID:**
```
✗ AI solutions
✗ Cutting-edge
✗ Leverage AI
✗ Synergize
✗ Machine learning (too generic — say "ML models" or be specific)
✗ "We help you" (overused)
✗ "Powerful" (meaningless)
✗ "Scale your AI"
✗ "Transform your business"
```

---

## 17. Component Library Reference

### 17.1 Button Components

```typescript
// components/ui/button.tsx
// Variants: primary | ghost | outline | destructive | link

// PRIMARY — Main CTA
<Button variant="primary" size="lg">
  Book a Discovery Call →
</Button>
// Styling: bg --accent-primary, text dark, hover: glow shadow + slight lighten
// Active: scale(0.97)

// GHOST — Secondary action
<Button variant="ghost" size="lg">
  See How It Works ↓
</Button>
// Styling: bg transparent, border 1px --border-default, text primary
// Hover: border --accent-primary, text --accent-primary

// ICON BUTTON
<Button variant="icon" size="sm">
  <ArrowRight size={16} />
</Button>
```

### 17.2 Card Components

```typescript
// components/ui/card.tsx

// GlowCard — for service and feature cards
// Hover: accent color left border, subtle background glow from top-left
export function GlowCard({ children, accentColor = 'var(--color-accent-primary)' }) {
  return (
    <motion.div
      className="glow-card"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      style={{ '--card-accent': accentColor }}
    >
      {children}
    </motion.div>
  );
}

// MetricCard — for stats
export function MetricCard({ value, label, suffix = '' }) {
  const count = useCountUp(value);
  return (
    <div className="metric-card">
      <motion.span className="metric-value font-display">
        {count}{suffix}
      </motion.span>
      <span className="metric-label font-mono">{label}</span>
    </div>
  );
}

// TechBadge — for stack tags
export function TechBadge({ label }: { label: string }) {
  return (
    <span className="tech-badge font-mono text-xs px-2 py-1 rounded-sm
                     bg-accent/5 border border-accent/20 text-accent-dim">
      {label}
    </span>
  );
}

// SectionHeader — consistent section headers
export function SectionHeader({ label, title, description }) {
  return (
    <motion.div variants={stagger} initial="hidden" whileInView="visible"
                viewport={{ once: true }} className="section-header">
      <motion.p variants={fadeUp} className="section-label font-mono text-accent text-xs tracking-widest uppercase">
        {label}
      </motion.p>
      <motion.h2 variants={fadeUp} className="section-title font-display text-4xl font-bold mt-3">
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={fadeUp} className="section-desc text-secondary text-lg mt-4 max-w-2xl">
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
```

### 17.3 Form Components

```typescript
// Styled form inputs (dark theme)
// Using React Hook Form + shadcn/ui Input + Zod

// Input styling:
const inputStyles = `
  bg-bg-surface
  border border-border-default
  focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary/30
  text-text-primary placeholder:text-text-tertiary
  font-body text-base
  rounded-md px-4 py-3
  transition-colors duration-200
`;

// Textarea:
const textareaStyles = `${inputStyles} resize-none min-h-[120px]`;

// Error state:
const errorStyles = `border-signal-red focus:border-signal-red focus:ring-signal-red/30`;
```

### 17.4 Badge / Tag Components

```typescript
// Status badge
export function StatusBadge({ status }: { status: 'live' | 'beta' | 'coming-soon' }) {
  const colors = {
    'live':         'bg-accent/10 text-accent border-accent/30',
    'beta':         'bg-signal-amber/10 text-signal-amber border-signal-amber/30',
    'coming-soon':  'bg-border-subtle text-text-tertiary border-border-subtle',
  };
  
  return (
    <span className={`badge font-mono text-xs px-2 py-0.5 rounded-full border ${colors[status]}`}>
      {status === 'live' && <span className="mr-1 inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />}
      {status.replace('-', ' ')}
    </span>
  );
}
```

---

## APPENDIX A — Launch Checklist

### Pre-Launch Technical

```
□ Domain connected to Vercel (rootedai.co.in)
□ SSL certificate active
□ All pages tested on Chrome, Firefox, Safari, Mobile Safari
□ Lighthouse score: Performance >85, Accessibility >95
□ Form submissions tested and arriving in inbox
□ Calendly link working
□ OG image renders correctly (test with opengraph.xyz)
□ robots.txt and sitemap.xml generated
□ Google Search Console property added
□ Analytics tracking verified (pageviews, form submissions)
□ Custom 404 page built
□ Reduced-motion tested (in macOS Accessibility settings)
```

### Content Checklist

```
□ Hero copy finalized and proofread
□ All service descriptions written
□ At least 1 blog post published at launch
□ About section has real names and LinkedIn links
□ Contact form goes to monitored email
□ Footer links all working
□ Pricing tier descriptions reviewed
□ FAQ answers written
□ Meta descriptions for every page
□ Alt text on all images
```

### Post-Launch

```
□ Submit sitemap to Google Search Console
□ Share launch on LinkedIn
□ Post blog article on launch day for SEO signal
□ Set up Ahrefs / SEMrush for keyword tracking
□ A/B test hero CTA button copy within 30 days
□ Install Hotjar or Microsoft Clarity for heatmap tracking
□ Set up conversion goal tracking in PostHog
```

---

## APPENDIX B — Competitor Reference Sites

Study these for reference (DO NOT copy):
```
● Figure AI (figure.ai) — hero aesthetic, dark + bold typography
● Anduril (anduril.com) — engineering credibility signals
● Covariant (covariant.ai) — robotics ML positioning
● Skild AI (skild.ai) — model-first messaging
● Physical Intelligence (physicalintelligence.company) — minimalist authority
```

---

## APPENDIX C — Future Feature Roadmap

```
Phase 2 (3-6 months post-launch):
  □ Interactive model demo widget (run inference on sample images in browser)
  □ ROI calculator (how much does hiring vs. RootedAI cost?)
  □ Case study deep-dives with metrics
  □ Partner ecosystem page (NVIDIA Inception, ROS Partners)

Phase 3 (6-12 months):
  □ Client portal (project dashboard, model performance metrics)
  □ Public model benchmark leaderboard
  □ Video testimonials
  □ Webinar / live demo events page
```

---

*Document maintained by RootedAI. Last updated: April 2025.*  
*Questions: ganesh@rootedai.co.in*
