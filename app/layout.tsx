import type { Metadata } from "next";
import "./globals.css";
import { profile } from "./data";
import { PortfolioLoader } from "./components/PortfolioLoader";
import { getSiteUrl } from "./site-url";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Almond Owolabi — Data Scientist & AI Engineer",
  description:
    "Almond Owolabi is a data scientist and AI engineer building analytics, machine learning, M&E intelligence, and data products.",
  icons: {
    icon: [{ url: "/favicon-ao.svg", type: "image/svg+xml" }],
    shortcut: "/favicon-ao.svg",
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    siteName: "Almond Owolabi",
    locale: "en_NG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    url: siteUrl,
    sameAs: [profile.github, profile.linkedin],
    knowsAbout: ["Data science", "Data analytics", "Machine learning", "M&E intelligence", "AI engineering", "Power BI", "Python"],
  };

  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <PortfolioLoader />
        {children}
      </body>
    </html>
  );
}
