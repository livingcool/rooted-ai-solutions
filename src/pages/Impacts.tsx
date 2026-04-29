import Link from "next/link";
import { ArrowRight, TrendingUp, Clock, DollarSign, Shield, Users, Zap } from "lucide-react";

const METRICS = [
  { value: "40%",   label: "Average Risk Reduction",    desc: "Across manufacturing clients in the first 90 days.", bg: "#F9EFE9", icon: Shield  },
  { value: "3×",    label: "Faster Process Execution",  desc: "Compared to manually operated workflows.",           bg: "#F0DCC8", icon: Zap     },
  { value: "₹1.2Cr",label: "Avg. Annual Cost Savings",  desc: "Per client from automated operational workflows.",   bg: "#EDD5C0", icon: DollarSign },
  { value: "4 wks", label: "Time to First Automation",  desc: "From discovery call to live deployment.",            bg: "#F5E6C8", icon: Clock   },
  { value: "98%",   label: "Client Retention Rate",     desc: "Clients that renewed after the pilot project.",      bg: "#F0DCC8", icon: Users   },
  { value: "150+",  label: "Automations Shipped",       desc: "Across manufacturing, logistics, and HR operations.", bg: "#F9EFE9", icon: TrendingUp },
];

const CASE_HIGHLIGHTS = [
  {
    industry:  "Manufacturing",
    headline:  "Line-level defect detection reduced scrap rate by 34%",
    detail:    "An industrial auto-parts manufacturer deployed our vision AI agent across 3 production lines.",
    metric:    "34% scrap reduction",
    bg:        "#F9EFE9",
  },
  {
    industry:  "Logistics",
    headline:  "AI dispatch routing cut fuel costs by 28% in 6 weeks",
    detail:    "A leading 3PL operator automated route optimization for 200+ daily deliveries.",
    metric:    "28% fuel savings",
    bg:        "#EDD5C0",
  },
  {
    industry:  "HR Tech",
    headline:  "AI interview pipeline screened 1,200 candidates in 4 days",
    detail:    "A high-growth startup replaced 3 rounds of manual screening with our AI interview system.",
    metric:    "12× faster screening",
    bg:        "#F5E6C8",
  },
];

export default function Impacts() {
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
            Impact
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
            Numbers that
            <br />
            <span style={{ color: "#F6851B" }}>matter.</span>
          </h1>
        </div>
      </div>

      {/* Metrics bento */}
      <div style={{ background: "#240747", padding: "4px" }}>
        <div
          style={{
            maxWidth: 1320,
            margin:   "0 auto",
            display:  "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap:      "4px",
          }}
          className="impact-grid"
        >
          {METRICS.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                style={{
                  background:    m.bg,
                  padding:       "2.5rem 2rem",
                  display:       "flex",
                  flexDirection: "column",
                  gap:           "1rem",
                }}
              >
                <Icon size={24} color="#F6851B" />
                <div
                  style={{
                    fontFamily:    "var(--font-display)",
                    fontWeight:    900,
                    fontSize:      "clamp(2.8rem, 5vw, 4.5rem)",
                    color:         "#240747",
                    lineHeight:    1,
                    letterSpacing: "-0.05em",
                  }}
                >
                  {m.value}
                </div>
                <div>
                  <p
                    style={{
                      fontFamily:    "var(--font-display)",
                      fontWeight:    700,
                      fontSize:      "1rem",
                      color:         "#240747",
                      letterSpacing: "-0.01em",
                      marginBottom:  "0.35rem",
                    }}
                  >
                    {m.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize:   "0.82rem",
                      color:      "#240747",
                      opacity:    0.6,
                      lineHeight: 1.5,
                    }}
                  >
                    {m.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case highlights */}
      <div style={{ background: "#240747", padding: "4px" }}>
        <div
          style={{
            maxWidth: 1320,
            margin:   "0 auto",
          }}
        >
          {/* Header tile */}
          <div
            style={{
              background:   "#240747",
              padding:      "2rem 3rem",
              borderBottom: "4px solid #F6851B",
              marginBottom: "4px",
            }}
          >
            <h2
              style={{
                fontFamily:    "var(--font-display)",
                fontWeight:    900,
                fontSize:      "clamp(2rem, 4vw, 3.5rem)",
                color:         "#F9EFE9",
                letterSpacing: "-0.04em",
                lineHeight:    1,
              }}
            >
              Real results.
              <br />
              <span style={{ color: "#F6851B" }}>Real operations.</span>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap:     "4px",
            }}
            className="case-grid"
          >
            {CASE_HIGHLIGHTS.map((c) => (
              <div
                key={c.industry}
                style={{
                  background:    c.bg,
                  padding:       "2.5rem 2rem",
                  display:       "flex",
                  flexDirection: "column",
                  gap:           "1rem",
                  borderTop:     "4px solid #F6851B",
                }}
              >
                <span className="nb-tag nb-tag-orange">{c.industry}</span>
                <h3
                  style={{
                    fontFamily:    "var(--font-display)",
                    fontWeight:    800,
                    fontSize:      "1.15rem",
                    color:         "#240747",
                    letterSpacing: "-0.02em",
                    lineHeight:    1.2,
                    flex:          1,
                  }}
                >
                  {c.headline}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize:   "0.83rem",
                    color:      "#240747",
                    opacity:    0.65,
                    lineHeight: 1.55,
                  }}
                >
                  {c.detail}
                </p>
                <div
                  style={{
                    fontFamily:    "var(--font-display)",
                    fontWeight:    900,
                    fontSize:      "1.5rem",
                    color:         "#F6851B",
                    letterSpacing: "-0.03em",
                    borderTop:     "2px solid #240747",
                    paddingTop:    "1rem",
                    marginTop:     "0.5rem",
                  }}
                >
                  {c.metric}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "#240747", padding: "4px 4px 0" }}>
        <div
          style={{
            maxWidth:   1320,
            margin:     "0 auto",
            background: "#F6851B",
            padding:    "3rem 3.5rem",
            display:    "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap:   "wrap",
            gap:        "2rem",
          }}
        >
          <h2
            style={{
              fontFamily:    "var(--font-display)",
              fontWeight:    900,
              fontSize:      "clamp(2rem, 4vw, 3.5rem)",
              color:         "#240747",
              lineHeight:    1,
              letterSpacing: "-0.04em",
            }}
          >
            Your operation.
            <br />
            Your impact next.
          </h2>
          <Link to="/#contact" className="nb-btn" style={{
            background: "#240747",
            color:      "#F9EFE9",
            border:     "3px solid #240747",
            boxShadow:  "4px 4px 0 #F9EFE9",
          }}>
            Start Your Pilot <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .impact-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .case-grid   { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .impact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
