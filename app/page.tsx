import { PortfolioHome } from "./components/PortfolioHome";
import { pageMetadata, siteTitle, siteDescription } from "./seo";

export const metadata = pageMetadata(
  siteTitle,
  siteDescription,
  "/",
);

export default function Home() {
  return <PortfolioHome />;
}
