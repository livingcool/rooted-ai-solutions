import { Zap } from "lucide-react";
import { ServiceDetailPage } from "@/components/sections/ServiceDetailPage";
export default function ProcessAutomation() {
  return <ServiceDetailPage icon={Zap} tag="Process Automation" heroBg="#F0DCC8"
    headline="End-to-End Workflow Automation"
    subline="Eliminate manual steps from your core operational workflows. Permanently."
    body="We analyze your highest-friction workflows, design automation pipelines, and connect your existing systems — ERPs, spreadsheets, email, WMS — into a single coordinated operation."
    features={[
      { title: "Workflow Mapping",     desc: "We document every step, decision, and handoff in your current process before writing a single line of automation." },
      { title: "System Integration",   desc: "Native connectors for SAP, Oracle, Odoo, MS Dynamics, custom APIs. We meet your stack where it is today." },
      { title: "Exception Handling",   desc: "Automated workflows that know when to stop and ask a human — not just crash silently on unexpected inputs." },
    ]}
    useCases={["Goods receipt & dispatch automation", "Invoice matching & approval routing", "Production schedule optimization", "Compliance document generation", "Customer order status updates", "Shift report automation"]}
  />;
}
