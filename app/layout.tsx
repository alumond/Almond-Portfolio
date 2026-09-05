import type { Metadata } from "next";
import "./globals.css";
import { profile } from "./data";
import { DataBackdrop } from "./components/DataBackdrop";
import { PortfolioMotion } from "./components/PortfolioMotion";
import { personSchema, personId, websiteId, siteOrigin } from "./seo";
import { StructuredData } from "./components/StructuredData";

const siteUrl = siteOrigin;

export const metadata: Metadata = {
  title: "Almond Owolabi — Data Scientist & AI Engineer",
  description:
    "Almond Owolabi is a data scientist and AI engineer building analytics, machine learning, M&E intelligence, and data products.",
  icons: {
    icon: [{ url: "/favicon-ao.svg", type: "image/svg+xml" }],
    shortcut: "/favicon-ao.svg",
  },
  metadataBase: new URL(siteUrl),
  verification: { google: "PWu5cQntdLsHoX0humPNhNL4o2AGEYdxKmzKmcvrJi4" },
  openGraph: {
    siteName: "Almond Owolabi",
    locale: "en_NG",
    type: "website",
    title: "Almond Owolabi — Data Scientist & AI Engineer",
    description: "Data into clarity. Ideas into impact. Analytics, AI engineering, and development impact by Almond Owolabi.",
    images: [{ url: "/og.png", alt: "Almond Owolabi — Data into clarity. Ideas into impact." }],
  },
  twitter: { card: "summary_large_image", title: "Almond Owolabi — Data Scientist & AI Engineer", description: "Data into clarity. Ideas into impact.", images: ["/og.png"] },
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
    <html lang="en">
      <body
        className="antialiased"
      >
        <StructuredData data={structuredData} />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <DataBackdrop />
        <PortfolioMotion />
        {children}
      </body>
    </html>
  );
}
