import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Rooted AI Solutions",
  description: "Read the latest engineering logs, case studies, and insights from the Rooted AI team on machine learning, custom software, and system automation.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
