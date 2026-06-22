import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Services & Solutions | Rooted AI Solutions",
  description: "Explore our range of custom ML model development for healthcare, robotics, and education, custom AI-native software engineering, and app development.",
  keywords: ["Custom ML Models", "AI Software Development", "App Development", "AI Agents", "Process Automation", "NLP Systems"],
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
