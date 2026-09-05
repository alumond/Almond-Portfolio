import type { MetadataRoute } from "next";
import { projects } from "./data";
import { contentUpdatedAt, siteOrigin } from "./seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/about/", "/services/", "/contact/", ...projects.map(project => `/work/${project.slug}/`)];
  return routes.map(route => ({ url: `${siteOrigin}${route}`, lastModified: contentUpdatedAt }));
}
