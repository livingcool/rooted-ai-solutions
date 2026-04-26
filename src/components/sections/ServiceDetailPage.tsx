// Shared service detail page template
import { Link } from "react-router-dom";
import { ArrowRight, LucideIcon } from "lucide-react";

interface ServicePageProps {
  tag:        string;
  headline:   string;
  subline:    string;
  body:       string;
  features:   { title: string; desc: string }[];
  useCases:   string[];
  icon:       LucideIcon;
  heroBg:     string;
}

export function ServiceDetailPage({ tag, headline, subline, body, features, useCases, icon: Icon, heroBg }: ServicePageProps) {
  const tileBgs = ["#F9EFE9", "#F0DCC8", "#EDD5C0", "#F5E6C8"];
  return (
    <div style={{ background: "#240747" }}>
      {/* Hero */}
      <div style={{ background: "#240747", padding: "4px 4px 0" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 320px", gap: "4px" }} className="svc-hero">
          <div style={{ background: heroBg, padding: "3.5rem 3.5rem 3rem" }}>
            <span className="nb-label-orange" style={{ display: "block", marginBottom: "1rem" }}>{tag}</span>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#240747", lineHeight: 0.95, letterSpacing: "-0.04em", marginBottom: "1.25rem" }}>
              {headline}
            </h1>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.1rem", color: "#F6851B", letterSpacing: "-0.01em", marginBottom: "1.5rem" }}>{subline}</p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", color: "#240747", opacity: 0.7, lineHeight: 1.7, maxWidth: 540 }}>{body}</p>
          </div>
          <div style={{ background: "#240747", padding: "2.5rem 2rem", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "2rem" }}>
            <Icon size={48} color="#F6851B" />
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#F9EFE9", opacity: 0.45, letterSpacing: "0.1em", textTransform: "uppercase", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Factory-floor-ready. Deployed in weeks. IP fully yours.
              </p>
              <Link to="/#contact" className="nb-btn" style={{ background: "#F6851B", color: "#240747", border: "3px solid #F9EFE9", boxShadow: "4px 4px 0 #F9EFE9", textDecoration: "none", width: "100%", justifyContent: "center" }}>
                Start a Pilot <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ background: "#240747", padding: "4px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "4px" }} className="feat-grid">
          {features.map((f, i) => (
            <div key={f.title} style={{ background: tileBgs[i % 4], padding: "2.5rem 2rem", borderLeft: "4px solid #F6851B" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", color: "#240747", letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>{f.title}</h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "#240747", opacity: 0.65, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Use cases */}
      <div style={{ background: "#240747", padding: "4px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ background: "#F5E6C8", padding: "2rem 3rem", borderBottom: "4px solid #240747", marginBottom: "4px" }}>
            <span className="nb-label-orange" style={{ display: "block", marginBottom: "0.5rem" }}>Use Cases</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: "#240747", letterSpacing: "-0.03em", lineHeight: 1 }}>Where we deploy this.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "4px" }} className="use-grid">
            {useCases.map((uc, i) => (
              <div key={uc} style={{ background: i % 2 === 0 ? "#F9EFE9" : "#F0DCC8", padding: "1.5rem 2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: 8, height: 8, background: "#F6851B", borderRadius: "50%", flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem", color: "#240747", letterSpacing: "-0.01em" }}>{uc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "#240747", padding: "4px 4px 0" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", background: "#F9EFE9", padding: "3rem 3.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#240747", lineHeight: 1, letterSpacing: "-0.04em" }}>Ready to see<br />this in action?</h2>
          <Link to="/#contact" className="nb-btn nb-btn-primary">Book a Discovery Call <ArrowRight size={16} /></Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .svc-hero { grid-template-columns: 1fr !important; } .feat-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 600px) { .use-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
