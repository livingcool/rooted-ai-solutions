import Link from "next/link";
import { ArrowRight, MapPin, Clock, Briefcase } from "lucide-react";

const OPEN_ROLES = [
  {
    title:     "Senior AI/ML Engineer",
    type:      "Full-time",
    location:  "Remote",
    dept:      "Engineering",
    bg:        "#F9EFE9",
  },
  {
    title:     "LLM Systems Engineer",
    type:      "Full-time",
    location:  "Remote",
    dept:      "Engineering",
    bg:        "#F0DCC8",
  },
  {
    title:     "Full Stack Developer (React + Node)",
    type:      "Full-time",
    location:  "Remote",
    dept:      "Engineering",
    bg:        "#EDD5C0",
  },
  {
    title:     "Business Development Manager",
    type:      "Full-time",
    location:  "Remote",
    dept:      "Sales",
    bg:        "#F5E6C8",
  },
  {
    title:     "AI Product Designer",
    type:      "Full-time",
    location:  "Remote",
    dept:      "Design",
    bg:        "#F9EFE9",
  },
  {
    title:     "DevOps / MLOps Engineer",
    type:      "Contract",
    location:  "Remote",
    dept:      "Infrastructure",
    bg:        "#F0DCC8",
  },
];

export default function CareersPage() {
  return (
    <div style={{ background: "#240747" }}>
      {/* Header */}
      <div style={{ background: "#240747", padding: "4px 4px 0" }}>
        <div
          style={{
            maxWidth: 1320,
            margin:   "0 auto",
            display:  "grid",
            gridTemplateColumns: "1fr 380px",
            gap:      "4px",
          }}
          className="careers-hero"
        >
          <div style={{ background: "#F9EFE9", padding: "3.5rem 3.5rem 3rem" }}>
            <span className="nb-label-orange" style={{ display: "block", marginBottom: "1rem" }}>
              Careers
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
              Build the AI
              <br />
              that runs
              <br />
              <span style={{ color: "#F6851B" }}>factories.</span>
            </h1>
            <p
              style={{
                fontFamily:    "var(--font-mono)",
                fontSize:      "0.75rem",
                color:         "#240747",
                opacity:       0.55,
                marginTop:     "1.5rem",
                maxWidth:      480,
                lineHeight:    1.6,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              We're a tight team building AI systems that run in real industrial environments.
              Not demos. Not research. Production.
            </p>
          </div>

          {/* Side stats */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ background: "#F6851B", padding: "2rem", flex: 1 }}>
              <div
                style={{
                  fontFamily:    "var(--font-display)",
                  fontWeight:    900,
                  fontSize:      "3.5rem",
                  color:         "#240747",
                  lineHeight:    1,
                  letterSpacing: "-0.05em",
                }}
              >
                {OPEN_ROLES.length}
              </div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#240747", opacity: 0.65, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "0.4rem" }}>
                Open positions
              </p>
            </div>
            <div style={{ background: "#EDD5C0", padding: "2rem", flex: 1 }}>
              <div
                style={{
                  fontFamily:    "var(--font-display)",
                  fontWeight:    900,
                  fontSize:      "3.5rem",
                  color:         "#240747",
                  lineHeight:    1,
                  letterSpacing: "-0.05em",
                }}
              >
                100%
              </div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#240747", opacity: 0.65, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "0.4rem" }}>
                Remote eligible
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Open roles */}
      <div style={{ background: "#240747", padding: "4px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          {/* Section label */}
          <div
            style={{
              background:   "#240747",
              padding:      "1.25rem 2rem",
              borderBottom: "4px solid #F6851B",
              marginBottom:  "4px",
            }}
          >
            <span className="nb-label" style={{ color: "#F9EFE9", opacity: 1 }}>
              Open Roles — {new Date().getFullYear()}
            </span>
          </div>

          {/* Role list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {OPEN_ROLES.map((role, i) => (
              <Link
                key={i}
                to="/careers"
                style={{
                  background:    role.bg,
                  padding:       "1.75rem 2rem",
                  display:       "flex",
                  alignItems:    "center",
                  justifyContent:"space-between",
                  gap:           "1rem",
                  textDecoration:"none",
                  flexWrap:      "wrap",
                  borderLeft:    "4px solid transparent",
                  transition:    "border-color 0.12s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderLeftColor = "#F6851B"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderLeftColor = "transparent"; }}
              >
                <div>
                  <span className="nb-tag" style={{ marginBottom: "0.5rem", display: "inline-block" }}>{role.dept}</span>
                  <h3
                    style={{
                      fontFamily:    "var(--font-display)",
                      fontWeight:    800,
                      fontSize:      "1.15rem",
                      color:         "#240747",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {role.title}
                  </h3>
                </div>
                <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "#240747", opacity: 0.55, letterSpacing: "0.08em" }}>
                    <MapPin size={12} /> {role.location}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "#240747", opacity: 0.55, letterSpacing: "0.08em" }}>
                    <Briefcase size={12} /> {role.type}
                  </span>
                  <div
                    className="nb-btn nb-btn-primary"
                    style={{ fontSize: "0.7rem", padding: "0.5rem 1rem", pointerEvents: "none" }}
                  >
                    Apply <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* General applications */}
      <div style={{ background: "#240747", padding: "4px 4px 0" }}>
        <div
          style={{
            maxWidth:   1320,
            margin:     "0 auto",
            background: "#240747",
            padding:    "3rem 3.5rem",
            display:    "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap:   "wrap",
            gap:        "2rem",
            border:     "3px solid #F6851B",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily:    "var(--font-display)",
                fontWeight:    900,
                fontSize:      "clamp(1.5rem, 3vw, 2.5rem)",
                color:         "#F9EFE9",
                lineHeight:    1.05,
                letterSpacing: "-0.04em",
              }}
            >
              Don't see your role?
              <br />
              <span style={{ color: "#F6851B" }}>Send your CV anyway.</span>
            </h2>
          </div>
          <a
            href="mailto:careers@rootedai.co.in"
            className="nb-btn"
            style={{
              background: "#F6851B",
              color:      "#240747",
              border:     "3px solid #F9EFE9",
              boxShadow:  "4px 4px 0 #F9EFE9",
              textDecoration: "none",
            }}
          >
            careers@rootedai.co.in <ArrowRight size={15} />
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .careers-hero { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
