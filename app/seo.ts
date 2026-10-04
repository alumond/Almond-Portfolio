import type { Metadata } from "next";
import { profile } from "./data";
import { getSiteUrl } from "./site-url";

export const siteOrigin = getSiteUrl();
export const siteTitle = "Almond Owolabi — Data Scientist & AI Engineer in Nigeria";
export const siteDescription = "Almond Owolabi is a data scientist and AI engineer in Nigeria. He builds dashboards, reporting systems, and AI workflows for business and social impact.";
export const socialImage = {
  url: "/social-preview.png",
  width: 1200,
  height: 630,
  alt: "Almond Owolabi — Data Scientist & AI Engineer. AI and data systems for decisions that matter.",
};
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
  address: { "@type": "PostalAddress", addressCountry: "NG" },
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: ["Data science", "Data analytics", "Machine learning", "Monitoring and evaluation", "AI engineering", "Power BI", "Python"],
};

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title, description, url: path, type: "website", siteName: profile.name, locale: "en_NG",
      images: [socialImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [socialImage] },
  };
}
