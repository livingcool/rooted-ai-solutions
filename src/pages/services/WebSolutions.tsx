import { Globe } from "lucide-react";
import { ServiceDetailPage } from "@/components/sections/ServiceDetailPage";
export default function WebSolutions() {
  return <ServiceDetailPage icon={Globe} tag="Web Solutions" heroBg="#EDD5C0"
    headline="Industrial-Grade Web Platforms"
    subline="Internal tools, dashboards, and customer portals built for serious operations."
    body="We build web platforms that industrial teams actually use — not demos that look good in a pitch. Operations dashboards, internal tooling, customer-facing portals with real-time data from your manufacturing or logistics systems."
    features={[
      { title: "Operations Dashboards", desc: "Real-time views of production, inventory, and logistics data — designed for the ops floor, not just management." },
      { title: "Internal Tooling",      desc: "Replace your Excel-based processes with purpose-built web tools that your team will actually adopt." },
      { title: "Customer Portals",      desc: "Order tracking, delivery status, and document access portals for your B2B customers." },
    ]}
    useCases={["Manufacturing operations dashboard", "Logistics tracking portal", "Supplier & vendor management system", "Quality inspection interface", "Hiring & HR internal tools", "Inventory management web app"]}
  />;
}
