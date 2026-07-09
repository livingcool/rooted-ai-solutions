import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & Engagement Models | Rooted AI Solutions",
  description: "Understand our pricing models, from pilot proofs-of-concept to retainer partnerships, for custom ML, software, and application development.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
