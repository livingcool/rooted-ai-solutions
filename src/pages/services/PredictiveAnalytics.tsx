import { BarChart3 } from "lucide-react";
import { ServiceDetailPage } from "@/components/sections/ServiceDetailPage";
export default function PredictiveAnalytics() {
  return <ServiceDetailPage icon={BarChart3} tag="Predictive Analytics" heroBg="#F0DCC8"
    headline="Forecast Failures Before They Happen"
    subline="ML pipelines that turn your historical operational data into forward-looking intelligence."
    body="Downtime, demand spikes, quality failures, and supply disruptions all have signals in your data — weeks before they happen. We build the pipelines that detect those signals so you can act before the problem."
    features={[
      { title: "Predictive Maintenance", desc: "ML models trained on your machine sensor data to predict failures before they cause downtime." },
      { title: "Demand Forecasting",     desc: "Accurate short and medium-term demand predictions for production and inventory planning." },
      { title: "Quality Prediction",     desc: "Catch batches likely to fail quality checks before they complete production — not after." },
    ]}
    useCases={["Equipment failure prediction", "Production yield forecasting", "Inventory demand planning", "Delivery delay prediction", "Energy consumption optimization", "Supply chain risk scoring"]}
  />;
}
