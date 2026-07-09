import { Metadata } from "next";
import LocationsClient from "./LocationsClient";

export const metadata: Metadata = {
  title: "Our Locations | AI Solutions & Software Development Offices",
  description: "RootedAI operates across South India's major tech & industrial hubs: Bangalore, Chennai, Coimbatore, and Hosur. Deployed factory-floor-ready AI systems.",
  alternates: {
    canonical: "https://www.rootedai.co.in/locations",
  },
};

export default function LocationsPage() {
  return <LocationsClient />;
}
