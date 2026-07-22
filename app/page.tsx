import type { Metadata } from "next";
import { PortfolioHome } from "./components/PortfolioHome";
import { profile } from "./data";

export const metadata: Metadata = {
  title: `${profile.name} — Data Scientist & AI Engineer`,
  description: "Almond Owolabi builds analytics, machine learning, M&E intelligence, and AI data products that turn evidence into action.",
  keywords: ["data scientist Nigeria", "AI engineer Nigeria", "data analyst", "machine learning", "M&E intelligence", "Power BI consultant", "Python data science"],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${profile.name} — Data Scientist & AI Engineer`,
    description: "Analytics, machine learning, M&E intelligence, and AI data products by Almond Owolabi.",
    type: "website",
    images: [{ url: "/og.png", width: 1600, height: 900, alt: "Almond Owolabi — Data Scientist and AI Engineer" }],
  },
  twitter: { card: "summary_large_image", title: `${profile.name} — Data Scientist & AI Engineer`, description: "Turning evidence into action across analytics, AI, and development impact.", images: ["/og.png"] },
};

export default function Home() {
  return <PortfolioHome />;
}

