// Location detail page template — shared logic
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { ReactNode } from "react";

interface LocationPageProps {
  city:       string;
  state:      string;
  tagline:    string;
  headline:   string;
  subHead:    string;
  body:       string;
  industries: string[];
  contacts:   { label: string; value: string }[];
}

export function LocationPage({ city, state, tagline, headline, subHead, body, industries, contacts }: LocationPageProps) {
  return (
    <div style={{ background: "#240747" }}>
      {/* Header bento */}
      <div style={{ background: "#240747", padding: "4px 4px 0" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 340px", gap: "4px" }} className="loc-hero">
          <div style={{ background: "#F9EFE9", padding: "3.5rem 3.5rem 3rem" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "#F6851B", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>
              <MapPin size={12} /> {state}
            </span>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(3rem, 6vw, 5.5rem)", color: "#240747", lineHeight: 0.95, letterSpacing: "-0.04em", marginBottom: "0.75rem" }}>
              {city}
            </h1>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "#F6851B", letterSpacing: "-0.01em" }}>{tagline}</p>
          </div>
          <div style={{ background: "#240747", padding: "2.5rem 2rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "#F6851B", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>Key Industries</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
              {industries.map((ind) => (
                <span key={ind} style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem", color: "#F9EFE9", letterSpacing: "-0.01em", borderBottom: "1px solid rgba(249,239,233,0.1)", paddingBottom: "0.5rem" }}>{ind}</span>
              ))}
            </div>
            <Link to="/#contact" className="nb-btn" style={{ background: "#F6851B", color: "#240747", border: "3px solid #F9EFE9", boxShadow: "4px 4px 0 #F9EFE9", marginTop: "1.5rem", textDecoration: "none" }}>
              Contact This Office <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Body content */}
      <div style={{ background: "#240747", padding: "4px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }} className="loc-body">
          <div style={{ background: "#F0DCC8", padding: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "#240747", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.25rem" }}>{headline}</h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "#240747", opacity: 0.7, lineHeight: 1.7 }}>{body}</p>
          </div>
          <div style={{ background: "#EDD5C0", padding: "3rem" }}>
            <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#F6851B", marginBottom: "1.5rem" }}>Get In Touch</h3>
            {contacts.map((c) => (
              <div key={c.label} style={{ marginBottom: "1.25rem", borderBottom: "2px solid #240747", paddingBottom: "1.25rem" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "#240747", opacity: 0.5, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.25rem" }}>{c.label}</p>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem", color: "#240747" }}>{c.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .loc-hero { grid-template-columns: 1fr !important; }
          .loc-body { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
