import { Users } from "lucide-react";
import { ServiceDetailPage } from "@/components/sections/ServiceDetailPage";
export default function Outsourcing() {
  return <ServiceDetailPage icon={Users} tag="Outsourcing" heroBg="#F5E6C8"
    headline="Your Embedded AI Engineering Team"
    subline="We plug into your org. You get a functioning AI capability without the hiring pain."
    body="The AI engineers you need take 3–6 months to hire and cost ₹20–40L/yr per person. We embed a team of engineers directly into your product and operations team — delivering as a managed capability, not as a vendor."
    features={[
      { title: "Embedded Engineering", desc: "Our team attends your standups, works in your tools, and ships with your cadence. You won't feel the outsourcing boundary." },
      { title: "Managed Delivery",     desc: "Sprint-based delivery with weekly demos and monthly performance reviews. You see progress every week." },
      { title: "IP Transfer",          desc: "Everything we build is yours. Full code ownership, model weights, documentation transferred at the end of each sprint." },
    ]}
    useCases={["AI team for a startup with no ML resources", "R&D projects requiring specialized LLM expertise", "Augmenting an existing data team", "Building internal AI tooling quickly", "Running AI pilots before committing to full hiring", "Managing ongoing model performance"]}
  />;
}
