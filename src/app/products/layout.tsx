import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Products & Tools | Rooted AI Solutions",
  description: "Explore our AI-native products and custom solutions tailored for workflow automation, enterprise search, and agentic intelligence.",
  alternates: {
    canonical: "/products",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
