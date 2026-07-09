import { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCATION_DETAILS } from "@/data/locations";
import LocationDetailClient from "./LocationDetailClient";

interface Props {
  params: { city: string };
}

export async function generateStaticParams() {
  return [
    { city: "bangalore" },
    { city: "coimbatore" },
    { city: "chennai" },
    { city: "hosur" },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const citySlug = params.city.toLowerCase();
  const detail = LOCATION_DETAILS[citySlug];
  if (!detail) return {};

  return {
    title: `AI Solutions & Software Development in ${detail.city}, ${detail.state}`,
    description: `${detail.tagline} ${detail.headline}. Contact our office for custom ML, software engineering, and app development.`,
    alternates: {
      canonical: `https://www.rootedai.co.in/locations/${citySlug}`,
    },
  };
}

export default function Page({ params }: Props) {
  const citySlug = params.city.toLowerCase();
  const detail = LOCATION_DETAILS[citySlug];
  if (!detail) {
    notFound();
  }

  return <LocationDetailClient detail={detail} />;
}
