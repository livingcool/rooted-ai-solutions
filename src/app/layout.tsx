import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "../index.css";
import { Providers } from "./providers";
import Navigation from "@/components/Navigation";
import Footer from "@/components/sections/Footer";
import TrackingScripts from "@/components/analytics/TrackingScripts";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rootedai.co.in"),
  title: "Rooted AI Solutions | Strategic AI Engineering for Robotics",
  description: "Accelerate your robotics deployment with our expert perception systems and tactical engineering services. Helping startups scale intelligence with precision.",
  keywords: [
    "Robotics AI",
    "Computer Vision",
    "Perception Systems",
    "AI Engineering",
    "Tactical Software",
    "Rooted AI",
    "Robotics Outsourcing",
    "AI Agents"
  ],
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://www.rootedai.co.in",
  },
  openGraph: {
    title: "Rooted AI Solutions | Strategic AI Engineering",
    description: "Scale your robotics startup with precision perception and engineering.",
    url: "https://www.rootedai.co.in",
    siteName: "Rooted AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#240747",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/models/RobotExpressive.glb" as="fetch" crossOrigin="anonymous" />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NFJ9DNNQ');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NFJ9DNNQ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <TrackingScripts />
        <Providers>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
