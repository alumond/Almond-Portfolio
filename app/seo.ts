import type { Metadata } from "next";
import { profile } from "./data";
import { getSiteUrl } from "./site-url";

export const siteOrigin = getSiteUrl();
export const contentUpdatedAt = "2026-09-05";
export const personId = `${siteOrigin}/#person`;
export const websiteId = `${siteOrigin}/#website`;

export const personSchema = {
  "@type": "Person",
  "@id": personId,
  name: profile.name,
  jobTitle: "Data Scientist and AI Engineer",
  description: "Data scientist and AI engineer based in Nigeria, working across analytics, machine learning, monitoring and evaluation, and AI workflows.",
  url: `${siteOrigin}/about/`,
  image: `${siteOrigin}${profile.portraitMono}`,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: ["Data science", "Data analytics", "Machine learning", "Monitoring and evaluation", "AI engineering", "Power BI", "Python"],
};

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title, description, url: path, type: "website", siteName: profile.name,
      images: [{ url: "/og.png", alt: "Almond Owolabi — Data Scientist and AI Engineer" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}
