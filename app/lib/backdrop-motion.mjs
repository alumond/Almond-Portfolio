export const CHART_MODES = ["line", "bars", "scatter", "radial"];

/** Hold each chart briefly, then morph to the next over a viewport-sized scroll. */
export function getChartPhase(scrollY, viewportHeight, reducedMotion = false) {
  if (reducedMotion) return { from: 0, to: 0, mix: 0 };
  const safeScroll = Number.isFinite(scrollY) ? Math.max(0, scrollY) : 0;
  const safeHeight = Number.isFinite(viewportHeight) ? Math.max(1, viewportHeight) : 1;
  const position = safeScroll / (safeHeight * 1.5);
  const from = Math.floor(position) % CHART_MODES.length;
  const raw = Math.min(1, Math.max(0, ((position % 1) - 0.32) / 0.68));
  const mix = raw * raw * (3 - 2 * raw);
  return { from, to: (from + 1) % CHART_MODES.length, mix };
}

export function interpolatePoint(from, to, mix) {
  return { x: from.x + (to.x - from.x) * mix, y: from.y + (to.y - from.y) * mix };
}
