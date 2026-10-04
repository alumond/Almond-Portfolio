import { AnalystCursor } from "./components/AnalystCursor";
import type { Metadata } from "next";
import "./globals.css";
import { profile } from "./data";
import { DataBackdrop } from "./components/DataBackdrop";
import { PortfolioMotion } from "./components/PortfolioMotion";
import { personSchema, personId, websiteId, siteOrigin, siteTitle, siteDescription, socialImage } from "./seo";
import { StructuredData } from "./components/StructuredData";
import { introEntryScript } from "./lib/intro-entry";

const siteUrl = siteOrigin;

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: [{ url: "/favicon-ao.svg", type: "image/svg+xml" }],
    shortcut: "/favicon-ao.svg",
  },
  metadataBase: new URL(siteUrl),
  verification: { google: ["PWu5cQntdLsHoX0humPNhNL4o2AGEYdxKmzKmcvrJi4", "CDdQYcUsNJuk8nuhO1CuX7l8ycZP78GJwnnTN7wPSrQ"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    siteName: "Almond Owolabi",
    locale: "en_NG",
    type: "website",
    title: siteTitle,
    description: siteDescription,
    images: [socialImage],
  },
  twitter: { card: "summary_large_image", title: siteTitle, description: siteDescription, images: [socialImage] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [personSchema, {
      "@type": "WebSite",
      "@id": websiteId,
      name: profile.name,
      url: `${siteOrigin}/`,
      description: "The professional portfolio of Almond Owolabi: data science, AI engineering, analytics, and monitoring and evaluation.",
      publisher: { "@id": personId },
      inLanguage: "en",
    }],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script id="portfolio-intro-entry" dangerouslySetInnerHTML={{ __html: introEntryScript }} />
      </head>
      <body
        className="antialiased"
      >
        <StructuredData data={structuredData} />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <DataBackdrop />
        <PortfolioMotion />
        {children}
        <AnalystCursor />
      </body>
    </html>
  );
}
