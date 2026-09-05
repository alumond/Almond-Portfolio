/** Serve same-origin public images when optional Cloudflare image bindings are absent. */
export function redirectUnoptimizedImage(request) {
  const requestUrl = new URL(request.url);
  const source = requestUrl.searchParams.get("url");
  if (!source || !source.startsWith("/") || source.startsWith("//")) {
    return new Response("A local image path is required", { status: 400 });
  }
  const target = new URL(source, requestUrl.origin);
  const isPublicImage = target.pathname.startsWith("/images/") || target.pathname === "/og.png";
  if (target.origin !== requestUrl.origin || !isPublicImage) {
    return new Response("Unsupported image source", { status: 400 });
  }
  return new Response(null, { status: 302, headers: { Location: target.href, "Cache-Control": "no-store" } });
}
