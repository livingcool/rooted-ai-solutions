import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Rooted AI Solutions",
  description: "See how Rooted AI Solutions delivers real-world results through AI Vision, Optimized Dispatch Routing, and AI-powered hiring pipelines.",
  keywords: ["AI Case Studies", "Custom Software Case Studies", "Healthcare AI Results", "Robotics ML", "App Development Portfolios", "EdTech AI Case Studies"],
  alternates: {
    canonical: "/case-studies",
  },
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
