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
  title: {
    default: "Rooted AI Solutions | Custom ML, Software & App Development",
    template: "%s | Rooted AI Solutions"
  },
  description: "Deploy custom ML models for healthcare, robotics, and education. AI-native custom software engineering and mobile/web app development delivered in weeks.",
  keywords: [
    "Custom ML Models",
    "Healthcare AI",
    "Robotics ML",
    "EdTech AI",
    "Custom Software Development",
    "App Development",
    "AI-Native Software",
    "Mobile App Development",
    "Web App Development",
    "AI Engineering",
    "Tactical Software",
    "Rooted AI",
    "AI Agents",
    "Process Automation"
  ],
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://www.rootedai.co.in",
  },
  openGraph: {
    title: "Rooted AI Solutions | Custom ML, Software & App Development",
    description: "Tailored ML models for healthcare, robotics, and education. AI-native custom software and mobile/web app development.",
    url: "https://www.rootedai.co.in",
    siteName: "Rooted AI",
    images: [],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rooted AI Solutions | Custom ML, Software & App Development",
    description: "Tailored ML models for healthcare, robotics, and education. AI-native custom software and mobile/web app development.",
    images: [],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.rootedai.co.in/#organization",
      "name": "Rooted AI Solutions",
      "url": "https://www.rootedai.co.in",
      "sameAs": [
        "https://www.linkedin.com/company/rootedai"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-7904168521",
        "contactType": "sales",
        "email": "info@rootedai.co.in",
        "areaServed": ["IN", "AE", "SG"],
        "availableLanguage": "en"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.rootedai.co.in/#website",
      "url": "https://www.rootedai.co.in",
      "name": "Rooted AI Solutions",
      "publisher": { "@id": "https://www.rootedai.co.in/#organization" },
      "description": "Strategic AI Engineering, Custom ML Model Development (Healthcare, Robotics, EdTech) & App Development"
    }
  ]
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-NH3TQYDJ02" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-NH3TQYDJ02');`,
          }}
        />
        {/* End Google tag */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preload" href="/models/RobotExpressive.glb" as="fetch" crossOrigin="anonymous" />
        <link rel="ai-actions" href="/ai-actions.json" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="AI-Friendly Context" />
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
