import { Cpu } from "lucide-react";
import { ServiceDetailPage } from "@/components/sections/ServiceDetailPage";
export default function AIAgents() {
  return <ServiceDetailPage icon={Cpu} tag="AI Agents" heroBg="#F9EFE9"
    headline="Autonomous AI Agents for Complex Operations"
    subline="LLM-powered agents that act, decide, and escalate — without constant human supervision."
    body="We build multi-step AI agents that orchestrate your workflows end-to-end. From data ingestion to decision-making to exception handling — your agent runs the process, you approve exceptions."
    features={[
      { title: "Multi-Step Orchestration", desc: "Agents that chain tasks across systems — read, decide, write, escalate — in a single workflow execution." },
      { title: "Tool Use & API Calls",     desc: "Agents that call your APIs, query databases, send emails, and update your ERP — all automatically." },
      { title: "Human-in-the-Loop",       desc: "Configurable escalation thresholds. Agents handle the routine; humans approve the edge cases." },
    ]}
    useCases={["Purchase order processing", "Supplier communication automation", "Document routing & classification", "Quality exception management", "Inventory reorder triggering", "Shift handover summarization"]}
  />;
}
