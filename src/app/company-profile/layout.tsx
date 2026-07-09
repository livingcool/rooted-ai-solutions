import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Profile | Rooted AI Solutions",
  description: "Learn about the mission, operational core, and team members behind Rooted AI Solutions.",
  alternates: {
    canonical: "/company-profile",
  },
};

export default function CompanyProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
