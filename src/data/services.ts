import { 
  Cpu, Zap, Globe, Brain, BarChart3, Shield, Users, Lock, Code, Smartphone, LucideIcon 
} from "lucide-react";

export interface ServiceDetail {
  slug:      string;
  tag:       string;
  headline:  string;
  subline:   string;
  body:      string;
  features:  { title: string; desc: string }[];
  useCases:  string[];
  icon:      LucideIcon;
  heroBg:    string;
}

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  AIAgents: {
    slug: "AIAgents",
    icon: Cpu,
    tag: "AI Agents",
    heroBg: "#F9EFE9",
    headline: "Autonomous AI Agents for Complex Operations",
    subline: "LLM-powered agents that act, decide, and escalate — without constant human supervision.",
    body: "We build multi-step AI agents that orchestrate your workflows end-to-end. From data ingestion to decision-making to exception handling — your agent runs the process, you approve exceptions.",
    features: [
      { title: "Multi-Step Orchestration", desc: "Agents that chain tasks across systems — read, decide, write, escalate — in a single workflow execution." },
      { title: "Tool Use & API Calls",     desc: "Agents that call your APIs, query databases, send emails, and update your ERP — all automatically." },
      { title: "Human-in-the-Loop",       desc: "Configurable escalation thresholds. Agents handle the routine; humans approve the edge cases." },
    ],
    useCases: ["Purchase order processing", "Supplier communication automation", "Document routing & classification", "Quality exception management", "Inventory reorder triggering", "Shift handover summarization"]
  },
  ProcessAutomation: {
    slug: "ProcessAutomation",
    icon: Zap,
    tag: "Process Automation",
    heroBg: "#F0DCC8",
    headline: "End-to-End Workflow Automation",
    subline: "Eliminate manual steps from your core operational workflows. Permanently.",
    body: "We analyze your highest-friction workflows, design automation pipelines, and connect your existing systems — ERPs, spreadsheets, email, WMS — into a single coordinated operation.",
    features: [
      { title: "Workflow Mapping",     desc: "We document every step, decision, and handoff in your current process before writing a single line of automation." },
      { title: "System Integration",   desc: "Native connectors for SAP, Oracle, Odoo, MS Dynamics, custom APIs. We meet your stack where it is today." },
      { title: "Exception Handling",   desc: "Automated workflows that know when to stop and ask a human — not just crash silently on unexpected inputs." },
    ],
    useCases: ["Goods receipt & dispatch automation", "Invoice matching & approval routing", "Production schedule optimization", "Compliance document generation", "Customer order status updates", "Shift report automation"]
  },
  CustomSoftware: {
    slug: "CustomSoftware",
    icon: Code,
    tag: "Custom Software",
    heroBg: "#EDD5C0",
    headline: "AI-Native Custom Software Engineering",
    subline: "Custom software and intelligent systems engineered from the ground up for operational scale.",
    body: "We design and build bespoke software systems that combine secure architecture, resilient databases, and native AI integration. We replace fragmented legacy processes with robust custom solutions that your teams will actually adopt.",
    features: [
      { title: "AI-Native Architecture", desc: "We integrate large language models, agentic workflows, and semantic search directly into the core database layer." },
      { title: "Enterprise Integrations", desc: "Native API bridges connecting your ERPs, databases, clinical systems, or LMS platforms into a unified interface." },
      { title: "Scalable Databases",      desc: "Engineered for security, high-throughput, and complex operations with strict compliance layers." },
    ],
    useCases: ["Operational dashboard development", "Clinical workflow management software", "Enterprise resource orchestration", "B2B client & partner portals", "Internal operations automation tools", "Legacy database modernization"]
  },
  NLPSystems: {
    slug: "NLPSystems",
    icon: Brain,
    tag: "NLP Systems",
    heroBg: "#F5E6C8",
    headline: "Language AI for Industrial Data",
    subline: "Extract structure, meaning, and decisions from your documents and communications.",
    body: "Your operations generate enormous volumes of text — emails, contracts, reports, manuals, audit logs. We build NLP pipelines and LLM systems that turn this unstructured data into structured intelligence.",
    features: [
      { title: "Document Intelligence", desc: "Extract key clauses, specs, compliance requirements, and data points from contracts, SOPs, and technical documents." },
      { title: "Email & Chat Analysis", desc: "Classify, route, and summarize operational emails and communications automatically." },
      { title: "Knowledge Base RAG",   desc: "LLM question-answering over your internal documentation — instant answers, cited sources." },
    ],
    useCases: ["Contract data extraction", "Supplier communication classification", "SOP question-answering assistant", "Audit log anomaly detection", "Purchase order parsing", "Regulatory compliance checking"]
  },
  PredictiveAnalytics: {
    slug: "PredictiveAnalytics",
    icon: BarChart3,
    tag: "Predictive Analytics",
    heroBg: "#F0DCC8",
    headline: "Forecast Failures Before They Happen",
    subline: "ML pipelines that turn your historical operational data into forward-looking intelligence.",
    body: "Downtime, demand spikes, quality failures, and supply disruptions all have signals in your data — weeks before they happen. We build the pipelines that detect those signals so you can act before the problem.",
    features: [
      { title: "Predictive Maintenance", desc: "ML models trained on your machine sensor data to predict failures before they cause downtime." },
      { title: "Demand Forecasting",     desc: "Accurate short and medium-term demand predictions for production and inventory planning." },
      { title: "Quality Prediction",     desc: "Catch batches likely to fail quality checks before they complete production — not after." },
    ],
    useCases: ["Equipment failure prediction", "Production yield forecasting", "Inventory demand planning", "Delivery delay prediction", "Energy consumption optimization", "Supply chain risk scoring"]
  },
  EnterpriseSecurity: {
    slug: "EnterpriseSecurity",
    icon: Shield,
    tag: "Enterprise Security",
    heroBg: "#EDD5C0",
    headline: "AI-Native Security for Industrial Systems",
    subline: "Anomaly detection, access monitoring, and compliance automation for regulated operations.",
    body: "Industrial AI systems handling production, financial, and customer data require security that's built in — not bolted on. We design and implement AI-native security monitoring, access controls, and compliance pipelines.",
    features: [
      { title: "Anomaly Detection",     desc: "ML-powered monitoring of your operational data streams for unusual patterns that indicate security or quality events." },
      { title: "Access Intelligence",   desc: "AI-monitored access logs that flag unusual behaviour — before a breach, not after an audit." },
      { title: "Compliance Automation", desc: "Automated compliance checks, evidence collection, and reporting for ISO, SOC2, and industry-specific standards." },
    ],
    useCases: ["Operational data access monitoring", "IP protection for AI models", "Compliance evidence automation", "Vendor access risk assessment", "Fraud detection in procurement", "GDPR / data residency compliance"]
  },
  AppDevelopment: {
    slug: "AppDevelopment",
    icon: Smartphone,
    tag: "App Development",
    heroBg: "#F5E6C8",
    headline: "Premium Web & Mobile Applications",
    subline: "High-performance mobile and web apps built natively with modern frameworks and pixel-perfect design.",
    body: "We deliver custom iOS, Android, and web applications that are responsive, lightning-fast, and designed around user workflows. From customer-facing products to specialized internal mobile tools, we handle everything from design to App Store submission.",
    features: [
      { title: "Cross-Platform Delivery", desc: "Build once and deploy everywhere using React Native, Flutter, and Next.js, cutting time-to-market in half." },
      { title: "Pixel-Perfect UX",        desc: "Polished interfaces with smooth animations, high responsiveness, and premium neobrutalist styling." },
      { title: "Offline-First Sync",      desc: "Apps that function seamlessly in low-connectivity environments, syncing data securely when back online." },
    ],
    useCases: ["Patient monitoring mobile apps", "On-the-go student learning apps", "Robotics telemetry & control mobile portals", "Custom field service applications", "Subscription-based B2C apps", "Operational inspection mobile tools"]
  },
  AISafety: {
    slug: "AISafety",
    icon: Lock,
    tag: "AI Safety",
    heroBg: "#F9EFE9",
    headline: "Guardrails for Production AI Systems",
    subline: "Evaluation frameworks, red-teaming, and safety protocols for AI that runs in real operations.",
    body: "Deploying LLMs into industrial operations without safety protocols is a liability. We build the guardrails — output validation, escalation logic, red-teaming protocols, and monitoring dashboards — that make your AI deployments defensible to management, auditors, and customers.",
    features: [
      { title: "Output Validation",    desc: "Automated checking of AI agent outputs against business rules before they touch your systems." },
      { title: "Red-Teaming",          desc: "We attempt to break your AI system before your operations do — adversarial testing for edge cases and failure modes." },
      { title: "Safety Dashboards",    desc: "Real-time monitoring of AI agent behaviour, error rates, and anomalous outputs with configurable alert thresholds." },
    ],
    useCases: ["AI agent output validation", "Hallucination detection in LLM pipelines", "Automated compliance checking", "Model behaviour monitoring", "Adversarial testing programs", "AI audit trail generation"]
  }
};
