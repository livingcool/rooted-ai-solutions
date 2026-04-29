import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CASE_STUDIES = [
  { id: "cs-01", tag: "Manufacturing", result: "34% scrap reduction", headline: "Auto-parts Manufacturer — AI Vision on the Production Line", body: "A Hosur-based manufacturer was losing ₹40L/month to manual defect detection failures. We deployed a computer vision AI agent on 3 production lines in 5 weeks. Defects caught before final assembly — scrap rate dropped 34%.", stack: ["Computer Vision", "Edge Inference", "ERP Integration"], bg: "#F9EFE9" },
  { id: "cs-02", tag: "Logistics", result: "28% fuel cost reduction", headline: "Chennai 3PL — AI-Optimized Dispatch Routing", body: "200+ daily deliveries routed manually by a dispatcher. We built an LLM-powered dispatch agent that factors live traffic, vehicle loads, and delivery windows. Fuel costs dropped 28%. Dispatcher moved to exceptions only.", stack: ["LLM Agents", "Maps API", "WMS Integration"], bg: "#F0DCC8" },
  { id: "cs-03", tag: "HR Tech", result: "12× faster candidate screening", headline: "High-Growth Startup — AI Interview Pipeline", body: "1,200 applications. No HR team to screen them. We built an end-to-end AI hiring pipeline: automated screening, technical assessments, and AI video interviews. 4 days to final shortlist of 18 candidates.", stack: ["NLP Screening", "AI Interviews", "ATS Integration"], bg: "#EDD5C0" },
  { id: "cs-04", tag: "Knowledge Ops", result: "70% faster doc processing", headline: "Industrial Supplier — AI Document Intelligence", body: "Hundreds of supplier contracts, spec sheets, and compliance docs processed manually each month. We deployed an LLM document agent that extracts, classifies, and routes documents automatically.", stack: ["RAG Pipeline", "Document AI", "SharePoint Integration"], bg: "#F5E6C8" },
];

export default function CaseStudies() {
  return (
    <div style={{ background: "#240747" }}>
      {/* Header */}
      <div style={{ background: "#240747", padding: "4px 4px 0" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", background: "#EDD5C0", padding: "3.5rem 3.5rem 3rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem" }}>
          <div>
            <span className="nb-label-orange" style={{ display: "block", marginBottom: "1rem" }}>Case Studies</span>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(3rem, 6vw, 5.5rem)", color: "#240747", lineHeight: 0.95, letterSpacing: "-0.04em" }}>Proof in<br />production.</h1>
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#240747", opacity: 0.55, maxWidth: 320, lineHeight: 1.6, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            Not demos. Not MVPs. Working systems deployed in real operations.
          </p>
        </div>
      </div>

      {/* Case study bento */}
      <div style={{ background: "#240747", padding: "4px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", flexDirection: "column", gap: "4px" }}>
          {CASE_STUDIES.map((cs, i) => {
            const isEven = i % 2 === 0;
            return (
              <div key={cs.id} style={{ display: "grid", gridTemplateColumns: isEven ? "1fr 320px" : "320px 1fr", gap: "4px", minHeight: 280 }} className="cs-row">
                <div style={{ background: cs.bg, padding: "2.5rem 3rem", display: "flex", flexDirection: "column", gap: "1.25rem", order: isEven ? 0 : 1, borderLeft: "4px solid #F6851B" }}>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
                    <span className="nb-tag nb-tag-orange">{cs.tag}</span>
                  </div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.3rem, 2.5vw, 2rem)", color: "#240747", letterSpacing: "-0.03em", lineHeight: 1.1 }}>{cs.headline}</h2>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "#240747", opacity: 0.7, lineHeight: 1.65, flex: 1 }}>{cs.body}</p>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {cs.stack.map((s) => (
                      <span key={s} className="nb-tag" style={{ fontSize: "0.6rem" }}>{s}</span>
                    ))}
                  </div>
                </div>
                <div style={{ background: "#240747", padding: "2.5rem 2rem", display: "flex", flexDirection: "column", justifyContent: "center", gap: "0.75rem", order: isEven ? 1 : 0 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#F6851B", lineHeight: 1, letterSpacing: "-0.04em" }}>{cs.result}</div>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#F9EFE9", opacity: 0.5, letterSpacing: "0.1em", textTransform: "uppercase" }}>Key Result</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "#240747", padding: "4px 4px 0" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", background: "#F9EFE9", padding: "3rem 3.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#240747", lineHeight: 1, letterSpacing: "-0.04em" }}>Your operation<br />could be next.</h2>
          <Link href="/#contact" className="nb-btn-primary rounded-xl">
            Start a Pilot <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
