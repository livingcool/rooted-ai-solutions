import { LocationPage } from "@/components/sections/LocationPage";
export default function Hosur() {
  return <LocationPage
    city="Hosur" state="Tamil Nadu"
    tagline="Manufacturing AI — Where the factory floor meets intelligence."
    headline="Serving India's fastest-growing industrial belt"
    subHead=""
    body="Hosur has become a hub for EV, auto-parts, electronics, and defence manufacturing. Our team is embedded with clients on the Hosur-Krishnagiri industrial corridor — deploying AI agents that run on the shop floor, not just in the cloud."
    industries={["EV & Auto Components", "Electronics Manufacturing", "Defence & Aerospace", "Consumer Goods"]}
    contacts={[
      { label: "Office", value: "SIPCOT Industrial Area, Hosur, TN 635109" },
      { label: "Email",  value: "hosur@rootedai.com" },
      { label: "Phone",  value: "+91 98765 43210" },
    ]}
  />;
}
