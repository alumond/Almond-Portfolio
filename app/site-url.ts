const fallbackSiteUrl = "https://almondowolabi.dpdns.org";

function normalizeSiteUrl(value: string) {
  const url = value.startsWith("http://") || value.startsWith("https://") ? value : `https://${value}`;
  return url.replace(/\/+$/, "");
}

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configuredUrl) return normalizeSiteUrl(configuredUrl);

  // Deployment aliases must never become the canonical identity of the site.
  return fallbackSiteUrl;
}
