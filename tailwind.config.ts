import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";
import tailwindTypography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans:    ["Inter", "system-ui", "sans-serif"],
        display: ["cabinet-grotesk", "Syne", "sans-serif"],
        mono:    ["JetBrains Mono", "monospace"],
      },
      colors: {
        /* — Institutional Neobrutalism Palette — */
        "nb-cream":     "#F9EFE9",
        "nb-parchment": "#F0DCC8",
        "nb-blush":     "#EDD5C0",
        "nb-amber":     "#F5E6C8",
        "nb-purple":    "#240747",
        "nb-orange":    "#F6851B",

        /* — Shadcn/Radix compatibility mappings — */
        border:     "var(--border)",
        input:      "var(--input)",
        ring:       "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",

        primary: {
          DEFAULT:    "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT:    "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT:    "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT:    "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT:    "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT:    "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT:    "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        none: "0px",
        sm:   "4px",
        md:   "6px",
        lg:   "8px",
        xl:   "12px",
        full: "9999px",
      },
      boxShadow: {
        "nb-sm": "3px 3px 0 #240747",
        "nb-md": "4px 4px 0 #240747",
        "nb-lg": "6px 6px 0 #240747",
        "nb-xl": "8px 8px 0 #240747",
        "nb-orange-md": "4px 4px 0 #F6851B",
        "nb-orange-lg": "6px 6px 0 #F6851B",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "marquee": {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "nb-slide-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "nb-stamp": {
          "0%":   { opacity: "0", transform: "scale(1.4) rotate(-3deg)" },
          "60%":  { opacity: "1", transform: "scale(0.97) rotate(0deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
        },
        "pulse-orange": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(246,133,27,0.4)" },
          "50%":      { boxShadow: "0 0 0 8px rgba(246,133,27,0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "marquee":        "marquee 40s linear infinite",
        "nb-slide-up":    "nb-slide-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "nb-stamp":       "nb-stamp 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "pulse-orange":   "pulse-orange 2s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindAnimate, tailwindTypography],
} satisfies Config;
