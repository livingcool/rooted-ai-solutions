import { LocationPage } from "@/components/sections/LocationPage";
export default function Bangalore() {
  return <LocationPage
    city="Bangalore" state="Karnataka"
    tagline="Enterprise AI for India's tech capital."
    headline="The intersection of enterprise infrastructure and AI-native operations"
    subHead=""
    body="Bangalore's enterprise tech corridor is demanding AI that integrates with complex stacks — SAP, Salesforce, AWS, Azure — not toys from a hackathon. We build production AI for logistics companies, SaaS firms, and large-scale service businesses operating out of Bangalore."
    industries={["Enterprise SaaS", "Logistics & E-commerce", "IT Services & BPO", "HealthTech & EdTech"]}
    contacts={[
      { label: "Office", value: "Koramangala, Bangalore, KA 560034" },
      { label: "Email",  value: "bangalore@rootedai.com" },
      { label: "Phone",  value: "+91 98765 43212" },
    ]}
  />;
}
