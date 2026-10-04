import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
const entry = html.match(/<script id="portfolio-intro-entry">([\s\S]*?)<\/script>/);

function loadEntry({ pathname = "/", hash = "", reducedMotion = false, visited = false, blockedStorage = false } = {}) {
  const root = { dataset: {} };
  const timers = [];
  vm.runInNewContext(entry[1], {
    document: { documentElement: root },
    window: {
      location: { pathname, hash },
      matchMedia: () => ({ matches: reducedMotion }),
      sessionStorage: { getItem: () => {
        if (blockedStorage) throw new Error("Storage unavailable");
        return visited ? "true" : null;
      } },
      setTimeout: (callback, delay) => timers.push({ callback, delay }),
    },
  });
  return { root, timers };
}

test("first homepage visit selects the opening scene before the body is parsed", () => {
  assert.ok(entry, "An inline entry script is included in the static HTML");
  assert.ok(entry.index < html.indexOf("</head>"));
  assert.ok(entry.index < html.indexOf("<body"));
  const { root } = loadEntry();
  assert.equal(root.dataset.portfolioEntry, "pending");
  assert.match(html, /<dialog[^>]*data-portfolio-intro/);
  assert.match(html, /A question\./);
  assert.doesNotMatch(html.slice(0, html.indexOf("<head>")), /data-portfolio-entry="pending"/);
});

test("return visits, section links, other routes, and reduced motion bypass the opening screen", () => {
  for (const options of [{ visited: true }, { hash: "#work" }, { pathname: "/about/" }, { reducedMotion: true }]) {
    const { root, timers } = loadEntry(options);
    assert.equal(root.dataset.portfolioEntry, undefined, JSON.stringify(options));
    assert.equal(timers.length, 0);
  }
});

test("blocked session storage still allows a first-visit intro", () => {
  assert.equal(loadEntry({ blockedStorage: true }).root.dataset.portfolioEntry, "pending");
});

test("a missing application bundle releases the opening screen, without interrupting a successful handoff", () => {
  const { root, timers } = loadEntry();
  assert.equal(timers.length, 1);
  assert.equal(timers[0].delay, 6000);
  timers[0].callback();
  assert.equal(root.dataset.portfolioEntry, "bypassed");
  const hydrated = loadEntry();
  delete hydrated.root.dataset.portfolioEntry;
  hydrated.timers[0].callback();
  assert.equal(hydrated.root.dataset.portfolioEntry, undefined);
});
