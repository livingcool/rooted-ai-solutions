'use client';

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { CarouselWrapper } from "@/components/ui/CarouselWrapper";

const PRODUCTS = [
  {
    name:   "HireOS",
    tag:    "HR Tech",
    desc:   "End-to-end AI hiring pipeline. Job posting → screening → technical assessment → AI video interview → dashboard. Deploy in your org in 48 hours.",
    status: "Live",
    href:   "/candidate-login",
    bg:     "#F9EFE9",
  },
  {
    name:   "DocMind",
    tag:    "Document AI",
    desc:   "LLM-powered document intelligence. Upload contracts, specs, compliance docs — get structured data, summaries, and automated routing instantly.",
    status: "Beta",
    href:   "/#contact",
    bg:     "#F0DCC8",
  },
  {
    name:   "FlowAgent",
    tag:    "Process Automation",
    desc:   "No-code AI agent builder for operational workflows. Connect your ERPs, emails, and spreadsheets into intelligent automation chains.",
    status: "Coming Soon",
    href:   "/#contact",
    bg:     "#EDD5C0",
  },
  {
    name:   "SignalOps",
    tag:    "Predictive Analytics",
    desc:   "Real-time operational monitoring with ML-powered anomaly detection. Get alerts before production failures happen.",
    status: "Coming Soon",
    href:   "/#contact",
    bg:     "#F5E6C8",
  },
];

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  "Live":        { bg: "#240747", text: "#F9EFE9" },
  "Beta":        { bg: "#F6851B", text: "#240747" },
  "Coming Soon": { bg: "#F9EFE9", text: "#240747" },
};

export default function ProductsPage() {
  return (
    <div style={{ background: "#240747" }}>
      {/* Header */}
      <div style={{ background: "#240747", padding: "4px 4px 0" }}>
        <div
          style={{
            maxWidth:   1320,
            margin:     "0 auto",
            background: "#F0DCC8",
            padding:    "3.5rem 3.5rem 3rem",
          }}
        >
          <span className="nb-label-orange" style={{ display: "block", marginBottom: "1rem" }}>
            Products
          </span>
          <h1
            style={{
              fontFamily:    "var(--font-display)",
              fontWeight:    900,
              fontSize:      "clamp(3rem, 6vw, 5.5rem)",
              color:         "#240747",
              lineHeight:    0.95,
              letterSpacing: "-0.04em",
            }}
          >
            Off-the-shelf
            <br />
            AI systems.
          </h1>
          <p
            style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      "0.75rem",
              color:         "#240747",
              opacity:       0.55,
              marginTop:     "1.25rem",
              maxWidth:      480,
              lineHeight:    1.6,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Productized AI tools built on our core platform. Deploy in your organization without a custom project.
          </p>
        </div>
      </div>

      {/* Products grid */}
      <div style={{ background: "#240747", padding: "4px" }}>
        <div
          style={{
            maxWidth: 1320,
            margin:   "0 auto",
          }}
        >
          <CarouselWrapper desktopClass="grid grid-cols-1 md:grid-cols-2 gap-[4px]">
            {PRODUCTS.map((p) => {
              const status = STATUS_COLORS[p.status] ?? STATUS_COLORS["Coming Soon"];
              return (
                <div
                  key={p.name}
                  style={{
                    background:    p.bg,
                    padding:       "3rem 2.5rem",
                    display:       "flex",
                    flexDirection: "column",
                    gap:           "1.25rem",
                  }}
                  className="h-full"
                >
                  {/* Name + status */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
                    <div>
                      <span className="nb-label-orange" style={{ display: "block", marginBottom: "0.35rem" }}>
                        {p.tag}
                      </span>
                      <h2
                        style={{
                          fontFamily:    "var(--font-display)",
                          fontWeight:    900,
                          fontSize:      "clamp(2rem, 4vw, 3rem)",
                          color:         "#240747",
                          letterSpacing: "-0.04em",
                          lineHeight:    1,
                        }}
                      >
                        {p.name}
                      </h2>
                    </div>
                    <span
                      style={{
                        background:    status.bg,
                        color:         status.text,
                        border:        "2px solid #240747",
                        padding:       "0.25rem 0.65rem",
                        fontFamily:    "var(--font-mono)",
                        fontSize:      "0.62rem",
                        fontWeight:    700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        flexShrink:    0,
                      }}
                    >
                      {p.status}
                    </span>
                  </div>

                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize:   "0.95rem",
                      color:      "#240747",
                      opacity:    0.7,
                      lineHeight: 1.65,
                      flex:       1,
                      borderTop:  "2px solid #240747",
                      paddingTop: "1.25rem",
                      marginTop:  "0.25rem",
                    }}
                  >
                    {p.desc}
                  </p>

                  <Link
                    href={p.href}
                    className="nb-btn nb-btn-primary"
                    style={{
                      textDecoration: "none",
                      width:          "fit-content",
                      display:        "inline-flex",
                    }}
                  >
                    {p.status === "Live" ? "Try It Now" : "Join Waitlist"}
                    {p.status === "Live" ? <ExternalLink size={14} /> : <ArrowRight size={14} />}
                  </Link>
                </div>
              );
            })}
          </CarouselWrapper>
        </div>
      </div>

      {/* No more custom style block needed as CarouselWrapper handles it */}
    </div>
  );
}
