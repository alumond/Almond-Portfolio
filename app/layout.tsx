import type { Metadata } from "next";
import "./globals.css";
import { profile } from "./data";

export const metadata: Metadata = {
  title: "Almond Owolabi — Data Scientist & AI Engineer",
  description:
    "Almond Owolabi is a data scientist and AI engineer building analytics, machine learning, M&E intelligence, and data products.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://almond-owolabi.pages.dev"),
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
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://almond-owolabi.pages.dev",
    sameAs: [profile.github, profile.linkedin],
    knowsAbout: ["Data science", "Data analytics", "Machine learning", "M&E intelligence", "AI engineering", "Power BI", "Python"],
  };

  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        {children}
      </body>
    </html>
  );
}
