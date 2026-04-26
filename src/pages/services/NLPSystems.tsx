import { Brain } from "lucide-react";
import { ServiceDetailPage } from "@/components/sections/ServiceDetailPage";
export default function NLPSystems() {
  return <ServiceDetailPage icon={Brain} tag="NLP Systems" heroBg="#F5E6C8"
    headline="Language AI for Industrial Data"
    subline="Extract structure, meaning, and decisions from your documents and communications."
    body="Your operations generate enormous volumes of text — emails, contracts, reports, manuals, audit logs. We build NLP pipelines and LLM systems that turn this unstructured data into structured intelligence."
    features={[
      { title: "Document Intelligence", desc: "Extract key clauses, specs, compliance requirements, and data points from contracts, SOPs, and technical documents." },
      { title: "Email & Chat Analysis", desc: "Classify, route, and summarize operational emails and communications automatically." },
      { title: "Knowledge Base RAG",   desc: "LLM question-answering over your internal documentation — instant answers, cited sources." },
    ]}
    useCases={["Contract data extraction", "Supplier communication classification", "SOP question-answering assistant", "Audit log anomaly detection", "Purchase order parsing", "Regulatory compliance checking"]}
  />;
}
