import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Rooted AI Solutions",
  description: "Join the tactical engineering team at Rooted AI. We are hiring AI Engineers, Robotics Specialists, and Process Automation experts.",
  keywords: ["AI Jobs", "Robotics Careers", "Engineering Jobs Hosur", "AI Engineering Jobs Bangalore"],
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
