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
  assert.match(html, /AI and data systems for decisions that matter/i);
  assert.match(html, /M&amp;E Intelligence Engine/i);
  assert.match(html, /Health Access for Persons with Disabilities/i);
  assert.equal((html.match(/<article class="selected-story /g) || []).length, 3);
  assert.match(html, /Stanforte Edge/);
  assert.match(html, /aria-label="Explore the data animation"/);
  for (const stage of ["Raw data", "Find the signal", "Make it matter"]) assert.ok(html.includes(stage));
  assert.match(html, /HACEY/);
  assert.match(html, /href="\/archive\/"/);
  assert.doesNotMatch(html, /aria-label="Filter projects"|class="resume-feature |class="archive-table"/);
  assert.match(html, /project-health-dashboard\.png/i);
  assert.match(html, /project-me-report\.png/i);
  assert.match(html, /application\/ld\+json/i);
  assert.doesNotMatch(html, /new MutationObserver|setInterval\(remove/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/i);
});

test("server-renders a flagship case study route", async () => {
  const html = await readDist("/work/monitoring-and-evaluation-agent");
  assert.match(html, /M&amp;E Intelligence Engine/i);
  assert.match(html, /I built this project independently/i);
  assert.match(html, /github\.com\/alumond\/Monitoring-and-Evaluation-Agent/i);
  assert.match(html, /project-me-report\.png/i);
  assert.match(html, /project-me-escalation\.png/i);
  assert.match(html, /Report intelligence\. Escalation with accountability\./i);
  assert.match(html, /<dialog/);
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
  assert.match(home, /Health for All/);
  const archive = await readDist("/archive");
  assert.match(archive, /Health for All/);
  assert.match(archive, /Find a repository/);
  assert.equal((archive.match(/<h3>/g) || []).length, 10);
  assert.match(home, /aria-pressed="true"/);
  assert.doesNotMatch(home, /portfolio-loader/);
  const retail = await readDist("/work/retail-revenue-command-center");
  assert.match(retail, /synthetic/);
  assert.match(retail, /property="og:image"[^>]+project-retail/);
  const health = await readDist("/work/health-access-for-pwds");
  assert.match(health, /property="og:image"[^>]+project-health-dashboard/);
  const model = await readDist("/work/health-for-all");
  assert.match(model, /8 \/ 8/);
  assert.match(model, /Creator-reported/);
  assert.match(model, /does not replace clinical diagnosis/);
  assert.match(model, /property="og:image"[^>]+project-health-for-all/);
  assert.match(model, /<dialog/);
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
  assert.match(linkedin, /project-linkedin-studio.png/);
  assert.doesNotMatch(linkedin, /project-escalation-story.png/);
});


test("SEO metadata identifies each core page and uses stable canonical URLs", async () => {
  for (const path of ["/", "/about", "/services", "/contact", "/archive"]) {
    const html = await readDist(path);
    const canonical = `https://almondowolabi.dpdns.org${path === "/" ? "/" : `${path}/`}`;
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

test("every sitemap page uses the custom domain and remains crawlable without JavaScript", async () => {
  const origin = "https://almondowolabi.dpdns.org";
  const sitemap = await readFile(join(distRoot, "sitemap.xml"), "utf8");
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  assert.equal(urls.length, 15);
  assert.equal(new Set(urls).size, urls.length);
  for (const url of urls) {
    assert.equal(new URL(url).origin, origin);
    const html = await readDist(new URL(url).pathname);
    assert.ok(html.includes(`rel="canonical" href="${url}"`), url);
    assert.ok(html.includes(`property="og:url" content="${url}"`), url);
    assert.doesNotMatch(html, /<meta name="(?:robots|googlebot)"[^>]*content="[^"]*noindex/i, url);
    assert.doesNotMatch(html, /almond-owolabi-portfolio\.vercel\.app/, url);
    assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, url);
    for (const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)) {
      assert.doesNotThrow(() => JSON.parse(match[1]), url);
    }
  }
  const robots = await readFile(join(distRoot, "robots.txt"), "utf8");
  assert.match(robots, /Allow: \//);
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
  const preview = await readDist("/hero-preview");
  assert.match(preview, /<meta name="robots" content="noindex, follow"/);
  assert.match(preview, /<meta name="googlebot" content="noindex, follow"/);
  assert.ok(!urls.some(url => url.includes("hero-preview")));
});

test("social preview and domain verification match the current portfolio", async () => {
  const verification = await readFile(join(distRoot, "google3d35051d7911371b.html"), "utf8");
  assert.equal(verification.trim(), "google-site-verification: google3d35051d7911371b.html");
  const home = await readDist();
  assert.match(home, /content="CDdQYcUsNJuk8nuhO1CuX7l8ycZP78GJwnnTN7wPSrQ"/);
  assert.match(home, /content="PWu5cQntdLsHoX0humPNhNL4o2AGEYdxKmzKmcvrJi4"/);
  assert.match(home, /property="og:image" content="https:\/\/almondowolabi\.dpdns\.org\/social-preview\.png"/);
  assert.match(home, /property="og:image:width" content="1200"/);
  assert.match(home, /property="og:image:height" content="630"/);
  const png = await readFile(join(distRoot, "social-preview.png"));
  assert.equal(png.subarray(1, 4).toString(), "PNG");
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
});
