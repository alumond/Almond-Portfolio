const fallbackSiteUrl = "https://almond-owolabi.pages.dev";

function normalizeSiteUrl(value: string) {
  const url = value.startsWith("http://") || value.startsWith("https://") ? value : `https://${value}`;
  return url.replace(/\/+$/, "");
}

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configuredUrl) return normalizeSiteUrl(configuredUrl);

  const vercelProductionUrl =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ??
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL?.trim();

  return vercelProductionUrl ? normalizeSiteUrl(vercelProductionUrl) : fallbackSiteUrl;
}
