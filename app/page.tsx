import { PortfolioHome } from "./components/PortfolioHome";
import { pageMetadata } from "./seo";

export const metadata = pageMetadata(
  "Almond Owolabi — Data Scientist & AI Engineer in Nigeria",
  "Explore Almond Owolabi’s work in data science, AI engineering, dashboards and M&E automation. Based in Nigeria. View projects, download a résumé or get in touch.",
  "/",
);

export default function Home() {
  return <PortfolioHome />;
}
