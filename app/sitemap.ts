import type { MetadataRoute } from "next";
import { projects } from "./data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://almond-owolabi.pages.dev";
  const routes = ["/", "/about", "/services", "/contact", ...projects.map((project) => `/work/${project.slug}`)];
  return routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: route === "/" ? "monthly" : "yearly", priority: route === "/" ? 1 : 0.7 }));
}

