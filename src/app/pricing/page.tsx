'use client';

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { CarouselWrapper } from "@/components/ui/CarouselWrapper";
import { useModal } from "@/context/ModalContext";

const PLANS = [
  {
    name:  "Pilot",
    subName: "Proof of Concept",
    price: "₹2.5L - ₹4.0L",
    unit:  "/ project",
    desc:  "Baseline model training on static, historical data.",
    features: [
      "Data Scope: Up to 10GB / Single Dataset",
      "Model Type: Standard ML or Basic Fine-Tuning",
      "Compute: Included up to ₹30K",
      "1 Trained Model",
      "Evaluation & Accuracy Report",
      "API Endpoint setup",
      "2-week iteration window",
    ],
    cta:     "Start a Pilot",
    bg:      "#F0DCC8",
    invert:  false,
  },
  {
    name:  "Growth",
    subName: "Continuous Learning",
    price: "Starts at ₹1.5L",
    unit:  "/ month",
    desc:  "Active models requiring continuous retraining.",
    features: [
      "Data Scope: Continuous data pipelines",
      "Model Type: Deep Learning / NLP / Ongoing Fine-Tuning",
      "Compute: Pass-through (Client pays AWS/GCP)",
      "Weekly model retraining",
      "Model drift monitoring",
      "Feature engineering updates",
      "Monthly performance review",
    ],
    cta:     "Book a Call",
    bg:      "#240747",
    invert:  true,
    badge:   "MOST POPULAR",
  },
  {
    name:  "Enterprise",
    subName: "Custom LLM",
    price: "Custom",
    unit:  "",
    desc:  "High-security, on-premise, or massive scale models.",
    features: [
      "Data Scope: Multi-source, unstructured data lakes",
      "Model Type: Custom Foundational Models / RAG",
      "Compute: Pass-through / On-Premise",
      "Dedicated ML engineer on-site",
      "Custom LLM fine-tuning",
      "Data security/compliance layer",
      "Full IP transfer of weights",
    ],
    cta:     "Talk to Sales",
    bg:      "#F9EFE9",
    invert:  false,
  },
];

export default function PricingPage() {
  const { openLeadModal } = useModal();

  return (
    <div style={{ background: "#240747" }}>
      {/* Header */}
      <div style={{ background: "#240747", padding: "4px 4px 0" }}>
        <div
          style={{
            maxWidth:   1320,
            margin:     "0 auto",
            background: "#F9EFE9",
            padding:    "3.5rem 3.5rem 3rem",
          }}
        >
          <span className="nb-label-orange" style={{ display: "block", marginBottom: "1rem" }}>
            Pricing
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
            Simple.
            <br />
            Outcome-driven.
          </h1>
          <p
            style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      "0.78rem",
              color:         "#240747",
              opacity:       0.55,
              marginTop:     "1.25rem",
              maxWidth:      520,
              lineHeight:    1.6,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            No surprise invoices. No endless scope creep. Fixed pilots. Retainer once results are proven.
          </p>
        </div>
      </div>

      {/* Pricing cards */}
      <div style={{ background: "#240747", padding: "4px" }}>
        <div
          style={{
            maxWidth: 1320,
            margin:   "0 auto",
          }}
        >
          <CarouselWrapper desktopClass="grid grid-cols-1 md:grid-cols-3 gap-[4px]">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                style={{
                  background:    plan.bg,
                  padding:       "3rem 2.5rem",
                  display:       "flex",
                  flexDirection: "column",
                  gap:           "1.5rem",
                  position:      "relative",
                }}
                className="h-full"
              >
                {/* Popular badge */}
                {plan.badge && (
                  <div
                    style={{
                      position:   "absolute",
                      top:        "0",
                      right:      "2rem",
                      background: "#F6851B",
                      border:     "2px solid " + (plan.invert ? "#F9EFE9" : "#240747"),
                      padding:    "0.2rem 0.6rem",
                      fontFamily: "var(--font-mono)",
                      fontSize:   "0.6rem",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color:      "#240747",
                      transform:  "translateY(-50%)",
                      zIndex:     10,
                    }}
                  >
                    {plan.badge}
                  </div>
                )}

                {/* Name & SubName */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <span
                    style={{
                      fontFamily:    "var(--font-mono)",
                      fontSize:      "0.65rem",
                      fontWeight:    700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color:         "#F6851B",
                    }}
                  >
                    {plan.name}
                  </span>
                  <span
                    style={{
                      fontFamily:    "var(--font-sans)",
                      fontSize:      "0.85rem",
                      fontWeight:    600,
                      color:         plan.invert ? "#F9EFE9" : "#240747",
                      opacity:       0.8,
                    }}
                  >
                    {plan.subName}
                  </span>
                </div>

                {/* Price */}
                <div>
                  <span
                    style={{
                      fontFamily:    "var(--font-display)",
                      fontWeight:    900,
                      fontSize:      plan.price.length > 6 ? "clamp(2rem, 3.5vw, 2.8rem)" : "clamp(2.5rem, 4vw, 3.5rem)",
                      color:         plan.invert ? "#F9EFE9" : "#240747",
                      letterSpacing: "-0.04em",
                      lineHeight:    1,
                    }}
                  >
                    {plan.price}
                  </span>
                  {plan.unit && (
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize:   "0.75rem",
                        color:      plan.invert ? "#F9EFE9" : "#240747",
                        opacity:    0.55,
                        marginLeft: "0.5rem",
                      }}
                    >
                      {plan.unit}
                    </span>
                  )}
                </div>

                {/* Desc */}
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize:   "0.9rem",
                    color:      plan.invert ? "#F9EFE9" : "#240747",
                    opacity:    plan.invert ? 0.75 : 0.7,
                    lineHeight: 1.55,
                    borderTop:  "2px solid " + (plan.invert ? "rgba(249,239,233,0.2)" : "#240747"),
                    paddingTop: "1.25rem",
                  }}
                >
                  {plan.desc}
                </p>

                {/* Features */}
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                      <div
                        style={{
                          width:      20,
                          height:     20,
                          background: "#F6851B",
                          border:     "2px solid " + (plan.invert ? "#F9EFE9" : "#240747"),
                          display:    "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop:  "1px",
                        }}
                      >
                        <Check size={11} color="#240747" />
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize:   "0.85rem",
                          color:      plan.invert ? "#F9EFE9" : "#240747",
                          lineHeight: 1.4,
                        }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={openLeadModal}
                  className="nb-btn cursor-pointer border-none"
                  style={{
                    background:  plan.invert ? "#F6851B" : "#240747",
                    color:       plan.invert ? "#240747" : "#F9EFE9",
                    border:      "3px solid " + (plan.invert ? "#F9EFE9" : "#240747"),
                    boxShadow:   plan.invert ? "4px 4px 0 #F9EFE9" : "4px 4px 0 #F6851B",
                    justifyContent: "center",
                    marginTop:   "auto",
                  }}
                >
                  {plan.cta} <ArrowRight size={15} />
                </button>
              </div>
            ))}
          </CarouselWrapper>
        </div>
      </div>

      {/* Note */}
      <div style={{ background: "#240747", padding: "4px 4px 0" }}>
        <div
          style={{
            maxWidth:  1320,
            margin:    "0 auto",
            background:"#EDD5C0",
            padding:   "2rem 3.5rem",
          }}
        >
          <p
            style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      "0.72rem",
              color:         "#240747",
              opacity:       0.6,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              lineHeight:    1.7,
            }}
          >
            All prices in INR. USD engagement pricing available for international clients. Contact us for custom enterprise proposals.
            IP is always 100% yours. No lock-in contracts.
          </p>
        </div>
      </div>
    </div>
  );
}
