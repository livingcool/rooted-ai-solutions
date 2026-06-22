import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Rooted AI Solutions",
  description: "Join the tactical engineering team at Rooted AI. We are hiring AI Engineers, Full-Stack Developers, App Developers, and ML Specialists (Healthcare, Robotics, Education).",
  keywords: ["AI Jobs", "Custom Software Careers", "App Development Jobs", "Robotics Careers", "Healthcare AI Jobs", "EdTech ML Jobs", "Engineering Jobs Hosur"],
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
