export interface LocationDetail {
  city:       string;
  state:      string;
  tagline:    string;
  headline:   string;
  body:       string;
  industries: string[];
  contacts:   { label: string; value: string }[];
  bg:         string;
}

export const LOCATION_DETAILS: Record<string, LocationDetail> = {
  bangalore: {
    city: "Bangalore",
    state: "Karnataka",
    tagline: "Enterprise AI for India's tech capital.",
    headline: "The intersection of enterprise infrastructure and AI-native operations",
    body: "Bangalore's enterprise tech corridor is demanding AI that integrates with complex stacks — SAP, Salesforce, AWS, Azure — not toys from a hackathon. We build production AI for logistics companies, SaaS firms, and large-scale service businesses operating out of Bangalore.",
    industries: ["Enterprise SaaS", "Logistics & E-commerce", "IT Services & BPO", "HealthTech & EdTech"],
    contacts: [
      { label: "Office", value: "Koramangala, Bangalore, KA 560034" },
      { label: "Email",  value: "bangalore@rootedai.co.in" },
      { label: "Phone",  value: "+91 98765 43212" },
    ],
    bg: "#EDD5C0"
  },
  coimbatore: {
    city: "Coimbatore",
    state: "Tamil Nadu",
    tagline: "The Manchester of South India — automated.",
    headline: "Powering MSME AI adoption in Coimbatore's industrial ecosystem",
    body: "Coimbatore's textile mills, pump manufacturers, and engineering MSMEs are the backbone of Tamil Nadu's export economy. We bring enterprise-grade AI to mid-sized industrial manufacturers who don't have the budget or bandwidth to hire ML teams.",
    industries: ["Textile & Apparel", "Pump & Motor Manufacturing", "Engineering MSMEs", "Logistics & Cold Chain"],
    contacts: [
      { label: "Office", value: "Tidel Park, Coimbatore, TN 641014" },
      { label: "Email",  value: "coimbatore@rootedai.co.in" },
      { label: "Phone",  value: "+91 98765 43211" },
    ],
    bg: "#F0DCC8"
  },
  chennai: {
    city: "Chennai",
    state: "Tamil Nadu",
    tagline: "HQ. Where every deployment starts.",
    headline: "Our headquarters and primary delivery center",
    body: "Chennai is where RootedAI was founded and where our core engineering team operates. From here we serve manufacturing clients in the Manali-Ambattur corridor, port logistics operators, and knowledge-intensive enterprises across the Chennai metro.",
    industries: ["Port & Maritime Logistics", "Auto Manufacturing (OMR/Ambattur)", "IT & Knowledge Services", "HR Tech & Talent Platforms"],
    contacts: [
      { label: "HQ Address", value: "OMR, Sholinganallur, Chennai, TN 600119" },
      { label: "Email",      value: "hello@rootedai.co.in" },
      { label: "Phone",      value: "+91 98765 43213" },
    ],
    bg: "#F5E6C8"
  },
  hosur: {
    city: "Hosur",
    state: "Tamil Nadu",
    tagline: "Manufacturing AI — Where the factory floor meets intelligence.",
    headline: "Serving India's fastest-growing industrial belt",
    body: "Hosur has become a hub for EV, auto-parts, electronics, and defence manufacturing. Our team is embedded with clients on the Hosur-Krishnagiri industrial corridor — deploying AI agents that run on the shop floor, not just in the cloud.",
    industries: ["EV & Auto Components", "Electronics Manufacturing", "Defence & Aerospace", "Consumer Goods"],
    contacts: [
      { label: "Office", value: "SIPCOT Industrial Area, Hosur, TN 635109" },
      { label: "Email",  value: "hosur@rootedai.co.in" },
      { label: "Phone",  value: "+91 98765 43210" },
    ],
    bg: "#F9EFE9"
  }
};
