import type { MetadataRoute } from "next";
import { projects } from "./data";
import { siteOrigin } from "./seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/about/", "/services/", "/contact/", ...projects.map(project => `/work/${project.slug}/`)];
  // Update these only for substantive content changes, not on every deployment.
  return routes.map(route => ({
    url: `${siteOrigin}${route}`,
    lastModified: route === "/" ? "2026-09-30" : "2026-09-09",
  }));
}
