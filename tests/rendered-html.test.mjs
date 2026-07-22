import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const distRoot = fileURLToPath(new URL("../dist/", import.meta.url));

async function readDist(path = "/") {
  const route = path === "/" ? "index.html" : join(path.replace(/^\/|\/$/g, ""), "index.html");
  return readFile(join(distRoot, route), "utf8");
}

test("server-renders the complete portfolio homepage", async () => {
  const html = await readDist();
  assert.match(html, /<title>Almond Owolabi — Data Scientist &amp; AI Engineer<\/title>/i);
  assert.match(html, /I make complex information/i);
  assert.match(html, /M&amp;E Intelligence Engine/i);
  assert.match(html, /Health Access for Persons with Disabilities/i);
  assert.match(html, /Monitoring-and-Evaluation-Agent/i);
  assert.match(html, /project-me-intelligence\.jpg/i);
  assert.match(html, /project-health-access\.jpg/i);
  assert.match(html, /application\/ld\+json/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/i);
});

test("server-renders a flagship case study route", async () => {
  const html = await readDist("/work/monitoring-and-evaluation-agent");
  assert.match(html, /M&amp;E Intelligence Engine/i);
  assert.match(html, /production-ready backend/i);
  assert.match(html, /github\.com\/alumond\/Monitoring-and-Evaluation-Agent/i);
});

test("server-renders the SEO support routes", async () => {
  const sitemap = await readFile(join(distRoot, "sitemap.xml"), "utf8");
  const robots = await readFile(join(distRoot, "robots.txt"), "utf8");
  assert.match(sitemap, /monitoring-and-evaluation-agent/i);
  assert.match(robots, /sitemap\.xml/i);
});
