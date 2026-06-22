import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Rooted AI Solutions",
  description: "See how Rooted AI Solutions delivers real-world results through AI Vision, Optimized Dispatch Routing, and AI-powered hiring pipelines.",
  keywords: ["AI Case Studies", "Robotics AI Results", "Industrial Automation Proof", "AI Implementation Examples"],
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
