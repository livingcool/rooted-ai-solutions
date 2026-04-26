import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQS = [
  {
    q: "How quickly can RootedAI deploy an AI agent?",
    a: "Our standard first deployment takes 4 weeks from discovery call to go-live. Complex multi-system integrations can take 6–10 weeks depending on API access and data readiness.",
  },
  {
    q: "Do we retain IP ownership of the models and workflows you build?",
    a: "Yes — 100%. Every model, workflow, agent, and piece of code we build for you is fully yours. We transfer all IP upon project completion. We sign IP assignments as standard practice.",
  },
  {
    q: "We don't have a data team. Can you still work with us?",
    a: "Absolutely. Most of our clients don't have dedicated data teams. We work with whatever operational data you have — ERP exports, spreadsheets, historical logs — and build from that.",
  },
  {
    q: "What industries do you specialize in?",
    a: "Our core is manufacturing, logistics, and industrial operations. We also work with HR/talent tech and knowledge-intensive enterprises. We don't do consumer products or gaming.",
  },
  {
    q: "How is this different from hiring an AI consultant?",
    a: "Consultants produce reports. We produce working systems. We embed into your operations, build the actual software, integrate it with your stack, and stay accountable to outcomes — not recommendations.",
  },
  {
    q: "What does your engagement model look like?",
    a: "Typically a fixed-scope pilot project (one workflow automated, proven results), followed by a monthly retainer for ongoing development and support. See our Pricing page for details.",
  },
  {
    q: "Can the AI agents integrate with our existing ERP/WMS?",
    a: "Yes. We've integrated with SAP, Oracle, Microsoft Dynamics, Odoo, and most major warehouse management systems. If it has an API, we can connect to it.",
  },
  {
    q: "Is our data secure? Where does it get processed?",
    a: "Your data stays within your infrastructure or a dedicated private cloud environment we set up for you. We never use client data to train shared models. All pipelines are SOC2-compliant by design.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div style={{ background: "#240747" }}>
      {/* Header */}
      <div style={{ background: "#240747", padding: "4px 4px 0" }}>
        <div
          style={{
            maxWidth:   1320,
            margin:     "0 auto",
            background: "#F5E6C8",
            padding:    "3.5rem 3.5rem 3rem",
            display:    "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap:   "wrap",
            gap:        "2rem",
          }}
        >
          <div>
            <span className="nb-label-orange" style={{ display: "block", marginBottom: "1rem" }}>
              FAQ
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
              Frequently
              <br />
              Asked.
            </h1>
          </div>
          <p
            style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      "0.75rem",
              color:         "#240747",
              opacity:       0.6,
              maxWidth:      320,
              lineHeight:    1.6,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Everything you need to know before your first call.
          </p>
        </div>
      </div>

      {/* FAQ List */}
      <div style={{ background: "#240747", padding: "4px" }}>
        <div
          style={{
            maxWidth: 1320,
            margin:   "0 auto",
          }}
        >
          {FAQS.map((faq, i) => (
            <div
              key={i}
              style={{
                borderBottom: "3px solid #240747",
                borderTop:    i === 0 ? "3px solid #240747" : "none",
              }}
            >
              <button
                id={`faq-btn-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width:         "100%",
                  textAlign:     "left",
                  padding:       "1.5rem 2rem",
                  display:       "flex",
                  justifyContent:"space-between",
                  alignItems:    "center",
                  background:    open === i ? "#240747" : "#F9EFE9",
                  border:        "none",
                  cursor:        "pointer",
                  transition:    "background 0.15s",
                  gap:           "1rem",
                }}
              >
                <span
                  style={{
                    fontFamily:    "var(--font-display)",
                    fontWeight:    700,
                    fontSize:      "clamp(1rem, 2vw, 1.15rem)",
                    color:         open === i ? "#F9EFE9" : "#240747",
                    letterSpacing: "-0.02em",
                    lineHeight:    1.2,
                  }}
                >
                  {faq.q}
                </span>
                <div
                  style={{
                    width:      32,
                    height:     32,
                    background: "#F6851B",
                    border:     "2px solid #240747",
                    display:    "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {open === i
                    ? <ChevronUp  size={16} color="#240747" />
                    : <ChevronDown size={16} color="#240747" />
                  }
                </div>
              </button>

              {open === i && (
                <div
                  style={{
                    background: "#F0DCC8",
                    padding:    "1.5rem 2rem 1.75rem",
                    borderTop:  "3px solid #240747",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize:   "1rem",
                      color:      "#240747",
                      lineHeight: 1.7,
                      maxWidth:   720,
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Still have questions */}
      <div style={{ background: "#240747", padding: "4px 4px 0" }}>
        <div
          style={{
            maxWidth:   1320,
            margin:     "0 auto",
            background: "#EDD5C0",
            padding:    "3rem 3.5rem",
            display:    "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap:   "wrap",
            gap:        "2rem",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily:    "var(--font-display)",
                fontWeight:    900,
                fontSize:      "clamp(1.8rem, 3.5vw, 3rem)",
                color:         "#240747",
                letterSpacing: "-0.04em",
                lineHeight:    1,
              }}
            >
              Still have questions?
            </h2>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "#240747", opacity: 0.55, marginTop: "0.5rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              We typically reply within 4 hours.
            </p>
          </div>
          <a
            href="mailto:hello@rootedai.com"
            className="nb-btn nb-btn-primary"
            style={{ textDecoration: "none" }}
          >
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
}
