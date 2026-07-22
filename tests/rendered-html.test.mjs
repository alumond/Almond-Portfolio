import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete portfolio homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Almond Owolabi — Data Scientist &amp; AI Engineer<\/title>/i);
  assert.match(html, /I make complex information/i);
  assert.match(html, /M&amp;E Intelligence Engine/i);
  assert.match(html, /Health Access for Persons with Disabilities/i);
  assert.match(html, /Monitoring-and-Evaluation-Agent/i);
  assert.match(html, /application\/ld\+json/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/i);
});

test("server-renders a flagship case study route", async () => {
  const response = await render("/work/monitoring-and-evaluation-agent");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /M&amp;E Intelligence Engine/i);
  assert.match(html, /production-ready backend/i);
  assert.match(html, /github\.com\/alumond\/Monitoring-and-Evaluation-Agent/i);
});

test("server-renders the SEO support routes", async () => {
  const sitemap = await render("/sitemap.xml");
  const robots = await render("/robots.txt");
  assert.equal(sitemap.status, 200);
  assert.equal(robots.status, 200);
  assert.match(await sitemap.text(), /monitoring-and-evaluation-agent/i);
  assert.match(await robots.text(), /sitemap\.xml/i);
});
