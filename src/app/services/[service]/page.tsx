'use client';

import { useParams, notFound } from "next/navigation";
import { SERVICE_DETAILS } from "@/data/services";
import { ServiceDetailPage } from "@/components/sections/ServiceDetailPage";

export default function ServicePage() {
  const params = useParams();
  const serviceSlug = params?.service as string;

  const detail = SERVICE_DETAILS[serviceSlug];

  if (!detail) {
    return notFound();
  }

  return (
    <ServiceDetailPage 
      icon={detail.icon}
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
