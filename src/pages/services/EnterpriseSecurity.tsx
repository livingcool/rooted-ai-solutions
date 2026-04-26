import { Shield } from "lucide-react";
import { ServiceDetailPage } from "@/components/sections/ServiceDetailPage";
export default function EnterpriseSecurity() {
  return <ServiceDetailPage icon={Shield} tag="Enterprise Security" heroBg="#EDD5C0"
    headline="AI-Native Security for Industrial Systems"
    subline="Anomaly detection, access monitoring, and compliance automation for regulated operations."
    body="Industrial AI systems handling production, financial, and customer data require security that's built in — not bolted on. We design and implement AI-native security monitoring, access controls, and compliance pipelines."
    features={[
      { title: "Anomaly Detection",     desc: "ML-powered monitoring of your operational data streams for unusual patterns that indicate security or quality events." },
      { title: "Access Intelligence",   desc: "AI-monitored access logs that flag unusual behaviour — before a breach, not after an audit." },
      { title: "Compliance Automation", desc: "Automated compliance checks, evidence collection, and reporting for ISO, SOC2, and industry-specific standards." },
    ]}
    useCases={["Operational data access monitoring", "IP protection for AI models", "Compliance evidence automation", "Vendor access risk assessment", "Fraud detection in procurement", "GDPR / data residency compliance"]}
  />;
}
