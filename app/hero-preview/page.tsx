import type { Metadata } from "next";
import { DataHero } from "../components/DataHero";

export const metadata: Metadata = {
  title: "Data in motion — Almond Owolabi · Local concept",
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
};

export default function HeroPreview() {
  return <DataHero />;
}
