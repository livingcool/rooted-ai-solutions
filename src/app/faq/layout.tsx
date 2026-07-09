import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Rooted AI Solutions",
  description: "Find answers to common questions about our AI deployment speed, IP ownership, custom ML models, and integration processes.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
