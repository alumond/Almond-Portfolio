"use client";

import Link from "next/link";
import { useId, useState } from "react";
import data from "../lib/retail-data.json";
import { ArrowIcon } from "./ArrowIcon";

type Metric = "revenue" | "profit";
const names = { revenue: "Revenue", profit: "Gross profit" };
const format = (value: number) => `₦${(value / 1e9).toFixed(2)}B`;
const monthLabel = (value: string) => new Date(`${value}-01T00:00:00Z`).toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });

export function HeroSignal() {
  const max = Math.max(...data.months.map(m => m.revenue));
  const points = data.months.map((m,i) => `${i * 1000 / (data.months.length - 1)},${220 - m.revenue / max * 190}`).join(" ");
  return <div className="hero-signal" aria-hidden="true"><svg viewBox="0 0 1000 240" preserveAspectRatio="none"><polyline points={points} pathLength="1" /></svg></div>;
}

export function AnalyticsShowcase({ embedded = false }: { embedded?: boolean }) {
  const [metric, setMetric] = useState<Metric>("revenue");
  const [selected, setSelected] = useState(data.months.length - 1);
  const gradientId = useId().replaceAll(":", "");
  const headingId = useId();
  const months = data.months;
  const current = months[selected];
  const previous = months[selected - 1];
  const change = previous ? (current[metric] - previous[metric]) / previous[metric] * 100 : null;
  const margin = current.profit / current.revenue * 100;
  const max = Math.ceil(Math.max(...months.map(m => m[metric])) / 1e9) * 1e9;
  const x = (i: number) => 48 + i * 672 / (months.length - 1);
  const y = (value: number) => 236 - value / max * 194;
  const line = months.map((m,i) => `${i===0?'M':'L'}${x(i)},${y(m[metric])}`).join(" ");
  const categories = [...current.categories].sort((a,b) => b[metric] - a[metric]);
  const categoryMax = categories[0][metric];

  return <section className={`analytics-section ${embedded?'analytics-embedded':''}`} id={embedded ? undefined : "analytics"} aria-labelledby={headingId}>
    <div className="section-frame">
      <div className="section-heading"><div><p className="eyebrow">Inside the work / Interactive study</p><h2 id={headingId}>The numbers tell a story.<br /><em>Explore it yourself.</em></h2></div><p>A working slice of my retail command centre. Switch metrics and move through 18 months to see how the commercial picture changes.</p></div>
      <div className="analytics-console">
        <div className="console-topline"><span><i className="status-dot" /> RETAIL / COMMERCIAL INTELLIGENCE</span><span className="synthetic-badge">Synthetic dataset · 2,160 records</span></div>
        <div className="console-controls"><div className="chart-tabs" role="group" aria-label="Chart metric">{(['revenue','profit'] as Metric[]).map(m=><button type="button" key={m} aria-pressed={metric===m} className={metric===m?'is-active':''} onClick={()=>setMetric(m)}>{names[m]}</button>)}</div><label className="month-select">Period<select value={selected} onChange={e=>setSelected(Number(e.target.value))}>{months.map((m,i)=><option value={i} key={m.month}>{monthLabel(m.month)}</option>)}</select></label></div>
        <div className="console-metrics" aria-live="polite" aria-atomic="true"><div><span>{names[metric]} / {monthLabel(current.month)}</span><strong key={`${metric}-${selected}`}>{format(current[metric])}</strong><small className={change!==null&&change<0?'metric-negative':'metric-positive'}>{change===null?'First month in dataset':`${change>=0?'+':''}${change.toFixed(1)}% vs previous month`}</small></div><div><span>Gross margin</span><strong>{margin.toFixed(1)}<em>%</em></strong><small>Gross profit / revenue</small></div><div><span>Orders fulfilled</span><strong>{(current.orders/1000).toFixed(1)}<em>K</em></strong><small>Across five regions</small></div></div>
        <div className="console-charts">
          <div className="line-panel"><div className="chart-heading"><h3>{names[metric]} over time</h3><span>NGN · monthly totals</span></div>
            <svg className="revenue-chart" viewBox="0 0 752 285" role="img" aria-labelledby={`${gradientId}-title ${gradientId}-desc`}>
              <title id={`${gradientId}-title`}>Monthly {names[metric].toLowerCase()}, January 2025 to June 2026</title><desc id={`${gradientId}-desc`}>Synthetic retail data. Selected {monthLabel(current.month)}: {format(current[metric])}. Use the period dropdown or month slider to explore exact values, or expand the data table below.</desc>
              <defs><linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d5ef99" stopOpacity=".22"/><stop offset="100%" stopColor="#d5ef99" stopOpacity="0"/></linearGradient></defs>
              {[0,1,2,3,4].map(t=><g key={t}><line x1="48" x2="720" y1={y(max*t/4)} y2={y(max*t/4)} className="chart-gridline"/><text x="36" y={y(max*t/4)+4} textAnchor="end" className="chart-tick">{(max*t/4/1e9).toFixed(1)}B</text></g>)}
              <path d={`${line} L720,236 L48,236 Z`} fill={`url(#${gradientId})`} />
              <path key={metric} className="revenue-path" d={line} pathLength="1" />
              {[0,5,11,17].map(i=><text key={i} x={x(i)} y="264" textAnchor={i===0?'start':i===17?'end':'middle'} className="chart-tick">{monthLabel(months[i].month)}</text>)}
              <line x1={x(selected)} x2={x(selected)} y1="35" y2="236" className="chart-crosshair"/>
              <circle cx={x(selected)} cy={y(current[metric])} r="8" className="chart-point-halo"/><circle cx={x(selected)} cy={y(current[metric])} r="4" className="chart-point"/>
            </svg>
            <label className="month-slider"><span>Explore month <strong>{monthLabel(current.month)}</strong></span><input type="range" min="0" max={months.length-1} value={selected} aria-valuetext={`${monthLabel(current.month)}, ${names[metric]} ${format(current[metric])}`} onChange={e=>setSelected(Number(e.target.value))}/><span className="slider-caption">Jan 2025 <span>Drag or use arrow keys</span> Jun 2026</span></label>
          </div>
          <div className="category-panel"><div className="chart-heading"><h3>Category contribution</h3><span>{monthLabel(current.month)}</span></div><div className="category-bars">{categories.map((c,i)=><div className="category-row" key={c.name}><div><span><b>{String(i+1).padStart(2,'0')}</b>{c.name}</span><strong>₦{(c[metric]/1e6).toFixed(1)}M</strong></div><div className="category-track"><span style={{width:`${c[metric]/categoryMax*100}%`}}/></div></div>)}</div><p className="chart-insight"><span>READ THE SIGNAL</span><strong>{categories[0].name}</strong> leads {names[metric].toLowerCase()} in {monthLabel(current.month)}, contributing {(categories[0][metric]/current[metric]*100).toFixed(1)}% of the month’s total.</p></div>
        </div>
        <div className="console-footer"><p>Portfolio demonstration. Figures are synthetic, not client results.</p><a href="/data/retail-chart-data.json" download>Download chart data <span aria-hidden="true">↓</span></a></div>
        <details className="chart-table-disclosure"><summary>View the accessible data table</summary><div className="chart-table-scroll"><table><caption>Monthly synthetic retail performance, NGN</caption><thead><tr><th scope="col">Month</th><th scope="col">Revenue</th><th scope="col">Gross profit</th><th scope="col">Orders</th></tr></thead><tbody>{months.map(m=><tr key={m.month}><th scope="row">{monthLabel(m.month)}</th><td>{m.revenue.toLocaleString('en-GB')}</td><td>{m.profit.toLocaleString('en-GB')}</td><td>{m.orders.toLocaleString('en-GB')}</td></tr>)}</tbody></table></div></details>
      </div>
      {!embedded&&<div className="analytics-endnote"><span>From a dataset to a decision. That’s the work.</span><Link className="text-link" href="/work/retail-revenue-command-center">Read the full case study <ArrowIcon /></Link></div>}
    </div>
  </section>;
}
