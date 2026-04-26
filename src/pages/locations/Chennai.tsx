import { LocationPage } from "@/components/sections/LocationPage";
export default function Chennai() {
  return <LocationPage
    city="Chennai" state="Tamil Nadu"
    tagline="HQ. Where every deployment starts."
    headline="Our headquarters and primary delivery center"
    subHead=""
    body="Chennai is where RootedAI was founded and where our core engineering team operates. From here we serve manufacturing clients in the Manali-Ambattur corridor, port logistics operators, and knowledge-intensive enterprises across the Chennai metro."
    industries={["Port & Maritime Logistics", "Auto Manufacturing (OMR/Ambattur)", "IT & Knowledge Services", "HR Tech & Talent Platforms"]}
    contacts={[
      { label: "HQ Address", value: "OMR, Sholinganallur, Chennai, TN 600119" },
      { label: "Email",      value: "hello@rootedai.com" },
      { label: "Phone",      value: "+91 98765 43213" },
    ]}
  />;
}
