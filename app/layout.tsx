import type { Metadata } from "next";
import "./globals.css";
import { profile } from "./data";
import { PortfolioLoader } from "./components/PortfolioLoader";
import { AppDeployOverlayGuard } from "./components/AppDeployOverlayGuard";

const overlayGuardScript = `(() => {
  const selector = "[id^='appdeploy-overlay-'],.appdeploy-overlay,#appdeploy-overlay,[data-appdeploy-overlay],[class*='appdeploy-overlay']";
  const remove = () => {
    document.querySelectorAll(selector).forEach((node) => node.remove());
    Array.from(document.documentElement.children)
      .filter((node) => node.tagName.toLowerCase().startsWith('appdeploy-overlay-'))
      .forEach((node) => node.remove());
  };
  const observer = new MutationObserver(remove);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('DOMContentLoaded', remove, { once: true });
  window.setInterval(remove, 400);
})();`;

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
      <head>
        <script dangerouslySetInnerHTML={{ __html: overlayGuardScript }} />
      </head>
      <body
        className="antialiased"
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <AppDeployOverlayGuard />
        <PortfolioLoader />
        {children}
      </body>
    </html>
  );
}
