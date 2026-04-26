import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";

const LOCATIONS = [
  { name: "Hosur",      state: "Tamil Nadu", desc: "Our manufacturing AI hub. Embedded with auto-parts & electronics producers on the Hosur industrial belt.",   href: "/locations/hosur",      bg: "#F9EFE9" },
  { name: "Coimbatore", state: "Tamil Nadu", desc: "Textile, engineering, and MSME automation. Serving the Manchester of South India.",                          href: "/locations/coimbatore", bg: "#F0DCC8" },
  { name: "Bangalore",  state: "Karnataka",  desc: "Tech enterprise integrations, SaaS AI, and logistics automation for the startup and enterprise corridor.",    href: "/locations/bangalore",  bg: "#EDD5C0" },
  { name: "Chennai",    state: "Tamil Nadu", desc: "HQ city. Manufacturing, port logistics, HR tech, and knowledge operations across the metro.",                 href: "/locations/chennai",    bg: "#F5E6C8" },
];

export default function Locations() {
  return (
    <div style={{ background: "#240747" }}>
      <div style={{ background: "#240747", padding: "4px 4px 0" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", background: "#F9EFE9", padding: "3.5rem 3.5rem 3rem" }}>
          <span className="nb-label-orange" style={{ display: "block", marginBottom: "1rem" }}>Where We Operate</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(3rem, 6vw, 5rem)", color: "#240747", lineHeight: 0.95, letterSpacing: "-0.04em" }}>
            4 cities.<br /><span style={{ color: "#F6851B" }}>One mission.</span>
          </h1>
        </div>
      </div>
      <div style={{ background: "#240747", padding: "4px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "4px" }} className="loc-grid">
          {LOCATIONS.map((loc) => (
            <Link key={loc.href} to={loc.href} style={{ background: loc.bg, padding: "3rem 2.5rem", display: "flex", flexDirection: "column", gap: "1rem", textDecoration: "none", borderLeft: "4px solid transparent", transition: "border-color 0.12s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderLeftColor = "#F6851B"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderLeftColor = "transparent"; }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "#F6851B", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                <MapPin size={12} /> {loc.state}
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#240747", lineHeight: 1, letterSpacing: "-0.04em" }}>{loc.name}</h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "#240747", opacity: 0.65, lineHeight: 1.6, flex: 1 }}>{loc.desc}</p>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#F6851B", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Learn more <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 640px) { .loc-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
