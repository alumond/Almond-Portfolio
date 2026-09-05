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
  assert.match(html, /<title>Almond Owolabi — Data Scientist &amp; AI Engineer in Nigeria<\/title>/i);
  assert.match(html, /Data into clarity/i);
  assert.match(html, /M&amp;E Intelligence Engine/i);
  assert.match(html, /Health Access for Persons with Disabilities/i);
  assert.match(html, /Monitoring-and-Evaluation-Agent/i);
  assert.match(html, /project-retail\.png/i);
  assert.match(html, /project-health-dashboard\.png/i);
  assert.match(html, /application\/ld\+json/i);
  assert.doesNotMatch(html, /new MutationObserver|setInterval\(remove/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/i);
});

test("server-renders a flagship case study route", async () => {
  const html = await readDist("/work/monitoring-and-evaluation-agent");
  assert.match(html, /M&amp;E Intelligence Engine/i);
  assert.match(html, /intelligence backend/i);
  assert.match(html, /github\.com\/alumond\/Monitoring-and-Evaluation-Agent/i);
});

test("server-renders the SEO support routes", async () => {
  const sitemap = await readFile(join(distRoot, "sitemap.xml"), "utf8");
  const robots = await readFile(join(distRoot, "robots.txt"), "utf8");
  assert.match(sitemap, /monitoring-and-evaluation-agent/i);
  assert.match(robots, /sitemap\.xml/i);
});


test("renders new original projects and accurate project boundaries", async () => {
  const home = await readDist();
  assert.match(home, /LinkedIn AI Agent/);
  assert.match(home, /AfriMedQA/);
  assert.match(home, /aria-pressed="true"/);
  assert.doesNotMatch(home, /portfolio-loader/);
  const retail = await readDist("/work/retail-revenue-command-center");
  assert.match(retail, /synthetic/);
  assert.match(retail, /property="og:image"[^>]+project-retail/);
  const health = await readDist("/work/health-access-for-pwds");
  assert.match(health, /property="og:image"[^>]+project-health-dashboard/);
  const model = await readDist("/work/afrimedqa-fine-tuning");
  assert.match(model, /do not serve the fine-tuned Llama adapter/);
  const fork = await readDist("/work/rag-api");
  assert.match(fork, /Forked repository/);
  const job = await readDist("/work/job-application-agent");
  assert.match(job, /role-specific approval/);
});


test("serves portraits, charts, resume download and contact access without an optimizer", async () => {
  const html = await readDist();
  assert.match(html, /almond-working\.jpeg/);
  assert.match(html, /almond-profile\.jpeg/);
  assert.match(html, /download="Almond_Owolabi_Resume.pdf"/);
  assert.match(html, /mailto:almond.owolabi01@gmail.com/);
  assert.match(html, /aria-label="Chart metric"/);
  assert.match(html, /type="range"/);
  assert.match(html, /Synthetic dataset/);
  assert.match(html, /Monthly synthetic retail performance/);
  assert.doesNotMatch(html, /src="[^"]*\/_vinext\/image/);
  const pdf = await readFile(join(distRoot, "assets/Almond_Owolabi_Resume.pdf"));
  assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
  const linkedin = await readDist("/work/linkedin-ai-agent");
  assert.match(linkedin, /<dialog/);
  assert.match(linkedin, /project-escalation-story.png/);
});


test("SEO metadata identifies each core page and uses stable canonical URLs", async () => {
  for (const path of ["/", "/about", "/services", "/contact"]) {
    const html = await readDist(path);
    const canonical = `https://almond-owolabi-portfolio.vercel.app${path === "/" ? "/" : `${path}/`}`;
    assert.ok(html.includes(`rel="canonical" href="${canonical}"`), path);
    assert.ok(html.includes(`property="og:url" content="${canonical}"`), path);
  }
  const home = await readDist();
  assert.match(home, /Data Scientist &amp; AI Engineer in Nigeria/);
  const about = await readDist("/about");
  assert.match(about, /"@type":"ProfilePage"/);
  assert.match(about, /"mainEntity":\{"@type":"Person"/);
  const service = await readDist("/services");
  assert.match(service, /Explore the retail analytics dashboard/);
  const project = await readDist("/work/linkedin-ai-agent");
  assert.match(project, /"@type":"BreadcrumbList"/);
  const sitemap = await readFile(join(distRoot, "sitemap.xml"), "utf8");
  assert.match(sitemap, /\/about\/<\/loc>/);
  assert.doesNotMatch(sitemap, /<lastmod>[^<]*T/);
});
