import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Impact | Rooted AI Solutions",
  description: "Read about our client success stories, key metrics, and the real-world operational impact delivered by our tactical AI systems.",
  alternates: {
    canonical: "/impact",
  },
};

export default function ImpactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
