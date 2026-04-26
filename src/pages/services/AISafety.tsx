import { Lock } from "lucide-react";
import { ServiceDetailPage } from "@/components/sections/ServiceDetailPage";
export default function AISafety() {
  return <ServiceDetailPage icon={Lock} tag="AI Safety" heroBg="#F9EFE9"
    headline="Guardrails for Production AI Systems"
    subline="Evaluation frameworks, red-teaming, and safety protocols for AI that runs in real operations."
    body="Deploying LLMs into industrial operations without safety protocols is a liability. We build the guardrails — output validation, escalation logic, red-teaming protocols, and monitoring dashboards — that make your AI deployments defensible to management, auditors, and customers."
    features={[
      { title: "Output Validation",    desc: "Automated checking of AI agent outputs against business rules before they touch your systems." },
      { title: "Red-Teaming",          desc: "We attempt to break your AI system before your operations do — adversarial testing for edge cases and failure modes." },
      { title: "Safety Dashboards",    desc: "Real-time monitoring of AI agent behaviour, error rates, and anomalous outputs with configurable alert thresholds." },
    ]}
    useCases={["AI agent output validation", "Hallucination detection in LLM pipelines", "Automated compliance checking", "Model behaviour monitoring", "Adversarial testing programs", "AI audit trail generation"]}
  />;
}
