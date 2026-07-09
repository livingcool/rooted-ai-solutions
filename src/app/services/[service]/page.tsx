import { notFound, permanentRedirect } from "next/navigation";
import { SERVICE_DETAILS } from "@/data/services";
import ServicePageClient from "./ServicePageClient";
import { Metadata } from "next";

interface Props {
  params: {
    service: string;
  };
}

// Map of slug alias to ServiceDetail key
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

// Canonical kebab-case URLs for each SLUG_MAP key
const CANONICAL_SLUG_MAP: Record<string, string> = {
  'aiagents': 'ai-agents',
  'ai-agents': 'ai-agents',
  'processautomation': 'process-automation',
  'process-automation': 'process-automation',
  'customsoftware': 'web-solutions',
  'custom-software': 'web-solutions',
  'web-solutions': 'web-solutions',
  'nlpsystems': 'nlp-systems',
  'nlp-systems': 'nlp-systems',
  'predictiveanalytics': 'predictive-analytics',
  'predictive-analytics': 'predictive-analytics',
  'enterprisesecurity': 'enterprise-security',
  'enterprise-security': 'enterprise-security',
  'appdevelopment': 'outsourcing',
  'app-development': 'outsourcing',
  'outsourcing': 'outsourcing',
  'aisafety': 'ai-safety',
  'ai-safety': 'ai-safety',
};

function getLookupKey(serviceSlug: string): string {
  if (!serviceSlug) return '';
  return SLUG_MAP[serviceSlug.toLowerCase()] || serviceSlug;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const serviceSlug = params.service;
  const lookupKey = getLookupKey(serviceSlug);
  const detail = SERVICE_DETAILS[lookupKey];

  if (!detail) {
    return {};
  }

  const canonicalSlug = CANONICAL_SLUG_MAP[serviceSlug.toLowerCase()] || serviceSlug;

  return {
    title: detail.tag,
    description: `${detail.subline} ${detail.body.substring(0, 120)}...`,
    alternates: {
      canonical: `https://www.rootedai.co.in/services/${canonicalSlug}`,
    },
  };
}

export function generateStaticParams() {
  // Pre-render canonical slugs at build time
  return [
    { service: 'ai-agents' },
    { service: 'process-automation' },
    { service: 'web-solutions' },
    { service: 'nlp-systems' },
    { service: 'predictive-analytics' },
    { service: 'enterprise-security' },
    { service: 'outsourcing' },
    { service: 'ai-safety' },
  ];
}

export default function ServicePage({ params }: Props) {
  const serviceSlug = params.service;
  
  // 1. SEO Redirect: Redirect non-canonical slugs to canonical kebab-case URL permanently
  const canonicalSlug = CANONICAL_SLUG_MAP[serviceSlug.toLowerCase()];
  if (canonicalSlug && serviceSlug !== canonicalSlug) {
    permanentRedirect(`/services/${canonicalSlug}`);
  }

  // 2. Check if lookup key exists
  const lookupKey = getLookupKey(serviceSlug);
  const detail = SERVICE_DETAILS[lookupKey];

  if (!detail) {
    return notFound();
  }

  return <ServicePageClient serviceSlug={serviceSlug} />;
}
