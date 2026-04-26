import { LocationPage } from "@/components/sections/LocationPage";
export default function Coimbatore() {
  return <LocationPage
    city="Coimbatore" state="Tamil Nadu"
    tagline="The Manchester of South India — automated."
    headline="Powering MSME AI adoption in Coimbatore's industrial ecosystem"
    subHead=""
    body="Coimbatore's textile mills, pump manufacturers, and engineering MSMEs are the backbone of Tamil Nadu's export economy. We bring enterprise-grade AI to mid-sized Industrial manufacturers who don't have the budget or bandwidth to hire ML teams."
    industries={["Textile & Apparel", "Pump & Motor Manufacturing", "Engineering MSMEs", "Logistics & Cold Chain"]}
    contacts={[
      { label: "Office", value: "Tidel Park, Coimbatore, TN 641014" },
      { label: "Email",  value: "coimbatore@rootedai.com" },
      { label: "Phone",  value: "+91 98765 43211" },
    ]}
  />;
}
