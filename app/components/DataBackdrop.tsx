"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import retail from "../lib/retail-data.json";
import { CHART_MODES, getChartPhase, interpolatePoint } from "../lib/backdrop-motion.mjs";

const months = retail.months;
const peak = Math.max(...months.map(m => m.revenue));
const profitPeak = Math.max(...months.map(m => m.profit));
const minimumRevenue = Math.min(...months.map(m => m.revenue));
const minimumProfit = Math.min(...months.map(m => m.profit));
const totalRevenue = months.reduce((sum, m) => sum + m.revenue, 0);
const polar = (angle: number, radius: number) => ({ x: 750 + Math.cos(angle) * radius, y: 560 + Math.sin(angle) * radius });
let angle = -Math.PI / 2;
const slices = months.map(m => {
  const start = angle;
  angle += m.revenue / totalRevenue * Math.PI * 2;
  const end = angle;
  const a = polar(start + 0.009, 325), b = polar(end - 0.009, 325);
  const c = polar(end - 0.009, 240), d = polar(start + 0.009, 240);
  return { middle: polar((start + end) / 2, 285), path: `M${a.x},${a.y} A325,325 0 0 1 ${b.x},${b.y} L${c.x},${c.y} A240,240 0 0 0 ${d.x},${d.y} Z` };
});
const layouts = [
  months.map((m, i) => ({ x: 70 + i * 78, y: 720 - m.revenue / peak * 430 })),
  months.map((m, i) => ({ x: 70 + i * 78, y: 850 - m.revenue / peak * 490 })),
  months.map(m => ({ x: 110 + (m.revenue - minimumRevenue) / (peak - minimumRevenue) * 1260, y: 850 - (m.profit - minimumProfit) / (profitPeak - minimumProfit) * 530 })),
  slices.map(s => s.middle),
];
const pathFor = (points: { x: number; y: number }[]) => points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");

/** One set of data marks moves continuously between four views as the page scrolls. */
export function DataBackdrop() {
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const svg = element.querySelector("svg")!;
    const points = Array.from(svg.querySelectorAll<SVGCircleElement>(".morph-point"));
    const bars = Array.from(svg.querySelectorAll<SVGRectElement>(".morph-bar"));
    const line = svg.querySelector<SVGPathElement>(".morph-line")!;
    const area = svg.querySelector<SVGPathElement>(".morph-area")!;
    const radial = svg.querySelector<SVGGElement>(".morph-radial")!;
    const axes = svg.querySelector<SVGGElement>(".morph-axes")!;
    const crosshairs = svg.querySelector<SVGGElement>(".morph-scatter-guides")!;
    const label = element.querySelector<HTMLElement>(".backdrop-mode-label")!;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const draw = () => {
      frame = 0;
      const { from, to, mix } = getChartPhase(window.scrollY, window.innerHeight, preference.matches);
      const weights = CHART_MODES.map((_, index) => (from === index ? 1 - mix : 0) + (to === index ? mix : 0));
      const positions = months.map((_, i) => interpolatePoint(layouts[from][i], layouts[to][i], mix));
      const trace = pathFor(positions);
      line.setAttribute("d", trace);
      line.style.opacity = String(weights[0] * 0.8);
      area.setAttribute("d", `${trace} L1396,900 L70,900 Z`);
      area.style.opacity = String(weights[0] * 0.22);
      radial.style.opacity = String(weights[3] * 0.5);
      axes.style.opacity = String((1 - weights[3]) * 0.2);
      crosshairs.style.opacity = String(weights[2] * 0.18);
      points.forEach((point, i) => {
        const position = positions[i];
        point.setAttribute("cx", position.x.toFixed(2));
        point.setAttribute("cy", position.y.toFixed(2));
        point.setAttribute("r", String(4 + weights[2] * (9 + months[i].profit / profitPeak * 12) + weights[3] * 3));
        point.style.opacity = String(0.7 - weights[1] * 0.4);
        const height = months[i].revenue / peak * 490 * weights[1];
        const width = 3 + 39 * weights[1];
        bars[i].setAttribute("x", String(position.x - width / 2));
        bars[i].setAttribute("y", String(position.y));
        bars[i].setAttribute("width", String(width));
        bars[i].setAttribute("height", String(height));
        bars[i].style.opacity = String(weights[1] * 0.5);
      });
      const activeMode = CHART_MODES[mix < 0.5 ? from : to];
      element.dataset.chartMode = activeMode;
      label.textContent = `DATA STUDY / ${activeMode.toUpperCase()}`;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(draw); };
    draw();
    // Reduced-motion visitors keep a still line chart; no scroll work is scheduled.
    const scroll = () => { if (!preference.matches) schedule(); };
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pageshow", schedule);
    preference.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pageshow", schedule);
      preference.removeEventListener("change", schedule);
    };
  }, [pathname]);

  return <div className="site-data-background scroll-morph-background" ref={root} data-chart-mode="line" aria-hidden="true">
    <svg viewBox="0 0 1500 1100" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="portfolio-data-grid" width="55" height="55" patternUnits="userSpaceOnUse"><path d="M55 0H0V55" fill="none" stroke="currentColor" strokeWidth=".6"/><circle cx="0" cy="0" r="1.5" fill="currentColor"/></pattern>
        <linearGradient id="portfolio-signal-fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a9cb8a" stopOpacity=".35"/><stop offset="100%" stopColor="#a9cb8a" stopOpacity="0"/></linearGradient>
      </defs>
      <rect width="1500" height="1100" fill="url(#portfolio-data-grid)" className="backdrop-grid"/>
      <g className="morph-axes" fill="none" stroke="#b0c79a" strokeWidth="1" opacity=".2"><path d="M55 200V900H1450"/>{[1, 2, 3, 4, 5].map(i => <path key={i} d={`M55 ${900 - i * 120}H1450`} strokeDasharray="4 10"/>)}</g>
      <g className="morph-scatter-guides" stroke="#78b8bd" strokeWidth="1" strokeDasharray="4 9" opacity="0">{[1, 2, 3, 4, 5].map(i => <path key={i} d={`M${55 + i * 250} 250V900`} />)}</g>
      <path className="morph-area" d={`${pathFor(layouts[0])} L1396,900 L70,900 Z`} fill="url(#portfolio-signal-fade)" opacity=".22"/>
      <g className="morph-radial" opacity="0">{slices.map((slice, i) => <path key={i} d={slice.path} fill={i % 3 === 0 ? "#72b9c0" : "#a8ce83"}/>) }<circle cx="750" cy="560" r="365" fill="none" stroke="#a6c583" strokeWidth="1" strokeDasharray="3 12"/><circle cx="750" cy="560" r="180" fill="none" stroke="#72b9c0" strokeWidth="1"/></g>
      {months.map((_, i) => <rect key={i} className="morph-bar" x={layouts[0][i].x} y={layouts[0][i].y} width="3" height="0" rx="3" fill={i % 3 === 0 ? "#72b9c0" : "#a8ce83"} opacity="0"/>)}
      <path className="morph-line" d={pathFor(layouts[0])} fill="none" stroke="#c6e89f" strokeWidth="2" opacity=".8"/>
      {months.map((m, i) => <circle key={m.month} className="morph-point" cx={layouts[0][i].x} cy={layouts[0][i].y} r="4" fill={i % 3 === 0 ? "#72b9c0" : "#c6e89f"} opacity=".7"/>)}
    </svg>
    <span className="backdrop-mode-label">DATA STUDY / LINE</span>
  </div>;
}
