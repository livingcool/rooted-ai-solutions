import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise AI Services | Rooted AI Solutions",
  description: "Explore our range of AI services including AI Agents, Process Automation, NLP Systems, and Predictive Analytics for robotics and industrial applications.",
  keywords: ["AI Agents", "Process Automation", "NLP Systems", "Predictive Analytics", "Robotics AI Services"],
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
