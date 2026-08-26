import type { MetadataRoute } from "next";
import { projects } from "./data";
import { getSiteUrl } from "./site-url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const routes = ["/", "/about", "/services", "/contact", ...projects.map((project) => `/work/${project.slug}`)];
  return routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: route === "/" ? "monthly" : "yearly", priority: route === "/" ? 1 : 0.7 }));
}
