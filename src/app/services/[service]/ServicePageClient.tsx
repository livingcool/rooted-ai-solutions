'use client';

import { SERVICE_DETAILS } from "@/data/services";
import { ServiceDetailPage } from "@/components/sections/ServiceDetailPage";
import { notFound } from "next/navigation";

const SLUG_MAP: Record<string, string> = {
  'ai-agents': 'AIAgents',
  'aiagents': 'AIAgents',
  'process-automation': 'ProcessAutomation',
  'processautomation': 'ProcessAutomation',
  'custom-software': 'CustomSoftware',
  'customsoftware': 'CustomSoftware',
  'web-solutions': 'CustomSoftware',
  'nlp-systems': 'NLPSystems',
  'nlpsystems': 'NLPSystems',
  'predictive-analytics': 'PredictiveAnalytics',
  'predictiveanalytics': 'PredictiveAnalytics',
  'enterprise-security': 'EnterpriseSecurity',
  'enterprisesecurity': 'EnterpriseSecurity',
  'app-development': 'AppDevelopment',
  'appdevelopment': 'AppDevelopment',
  'outsourcing': 'AppDevelopment',
  'ai-safety': 'AISafety',
  'aisafety': 'AISafety',
};

function getLookupKey(serviceSlug: string): string {
  if (!serviceSlug) return '';
  return SLUG_MAP[serviceSlug.toLowerCase()] || serviceSlug;
}

export default function ServicePageClient({ serviceSlug }: { serviceSlug: string }) {
  const lookupKey = getLookupKey(serviceSlug);
  const detail = SERVICE_DETAILS[lookupKey];

  if (!detail) {
    return notFound();
  }

  return (
    <ServiceDetailPage 
      tag={detail.tag}
      heroBg={detail.heroBg}
      headline={detail.headline}
      subline={detail.subline}
      body={detail.body}
      features={detail.features}
      useCases={detail.useCases}
    />
  );
}
