import assert from "node:assert/strict";
import test from "node:test";
import { getChartPhase, interpolatePoint } from "../app/lib/backdrop-motion.mjs";

test("scroll cycles through all four chart types and returns continuously to line", () => {
  for (let i = 0; i <= 4; i++) {
    assert.deepEqual(getChartPhase(i * 1500, 1000), { from: i % 4, to: (i + 1) % 4, mix: 0 });
  }
  assert.ok(getChartPhase(1499.999, 1000).mix > .999);
  assert.equal(getChartPhase(1500, 1000).from, 1);
});

test("scrolling reverses the morph and reduced motion stays on a static chart", () => {
  const earlier = getChartPhase(750, 1000), later = getChartPhase(1200, 1000);
  assert.equal(earlier.from, later.from);
  assert.ok(earlier.mix < later.mix);
  assert.deepEqual(getChartPhase(5900, 1000, true), { from: 0, to: 0, mix: 0 });
  assert.equal(getChartPhase(-100, 1000).mix, 0);
  assert.ok(Number.isFinite(getChartPhase(100, 0).mix));
});

test("marks retain their identities while interpolating between chart layouts", () => {
  const start = { x: 20, y: 600 }, end = { x: 320, y: 100 };
  assert.deepEqual(interpolatePoint(start, end, 0), start);
  assert.deepEqual(interpolatePoint(start, end, 1), end);
  assert.deepEqual(interpolatePoint(start, end, .5), { x: 170, y: 350 });
});
