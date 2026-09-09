"use client";

import { useState } from "react";
import Link from "next/link";
import { projects } from "../data";
import { forecastDemand, processOrders, sampleOrders } from "../lib/applied-demos.mjs";
import styles from "./data-hero.module.css";

function ForecastDemo() {
  const [growth, setGrowth] = useState(20);
  const model = forecastDemand(growth);
  const x = (i: number) => 32 + i * 46;
  const y = (value: number) => 163 - value * .7;
  const values = [...model.observed, ...model.projected];
  const path = (start: number, end: number) => values.slice(start, end).map((value, i) => `${i ? "L" : "M"}${x(i + start)},${y(value)}`).join(" ");
  return <>
    <p className={styles.appEyebrow}>01 / FORECASTING</p>
    <h2>Plan for what’s next.</h2>
    <p className={styles.appDescription}>Change demand growth to see how much stock you would need.</p>
    <figure className={styles.forecastFigure}>
      <svg viewBox="0 0 390 194" role="img" aria-label={`Four observed weeks followed by four projected weeks. Projected demand: ${model.total} units.`}>
        {[50, 100, 150, 200].map(value => <g key={value}><line x1="32" x2="372" y1={y(value)} y2={y(value)} stroke="#38513b" strokeDasharray="2 5" /><text x="24" y={y(value) + 4} textAnchor="end">{value}</text></g>)}
        <rect x="184" y="20" width="188" height="147" fill="#d5ef9908" />
        <path d={path(0, 4)} stroke="#82ad98" strokeWidth="2" fill="none" />
        <path d={path(3, 8)} stroke="#d5ef99" strokeWidth="2.5" strokeDasharray="5 4" fill="none" />
        {values.map((value, i) => <circle key={i} cx={x(i)} cy={y(value)} r="3" fill={i < 4 ? "#82ad98" : "#d5ef99"} />)}
        <text x="32" y="187">WEEK 1</text><text x="170" y="187" textAnchor="middle">4</text><text x="354" y="187" textAnchor="end">WEEK 8</text>
      </svg>
      <figcaption><span>● Observed</span><span>● Projected</span></figcaption>
    </figure>
    <label className={styles.forecastControl}>Demand growth <output>{growth > 0 ? "+" : ""}{growth}%</output><input type="range" min="-20" max="40" step="5" value={growth} onChange={e => setGrowth(Number(e.target.value))} aria-valuetext={`${growth}% demand growth`} /></label>
    <div className={styles.demoResults} aria-live="polite" aria-atomic="true"><div><strong>{model.total}</strong><span>units over the next 4 weeks</span></div><div><strong>{model.reorder}</strong><span>units to reorder</span></div></div>
    <p className={styles.demoNote}>440 units in stock · No inbound deliveries assumed.</p>
    <p className={styles.demoDisclosure}>Synthetic demand. A simple growth scenario based on the observed average, not a trained forecasting model.</p>
  </>;
}

const goals = [
  { label: "Understand business performance", slug: "retail-revenue-command-center", reason: "Revenue, margin, and customer trends in one commercial dashboard." },
  { label: "Automate routine reporting", slug: "monitoring-and-evaluation-agent", reason: "A workflow that turns programme workbooks into reports and follow-up actions." },
  { label: "Find answers in documents", slug: "rag-api", reason: "A retrieval workflow that finds relevant context before generating an answer." },
];

function RecommendationDemo() {
  const [goal, setGoal] = useState(0);
  const choice = goals[goal];
  const project = projects.find(item => item.slug === choice.slug)!;
  return <>
    <p className={styles.appEyebrow}>02 / RECOMMENDATIONS</p>
    <h2>Find a useful match.</h2>
    <p className={styles.appDescription}>Choose a goal. Get a relevant project from my portfolio.</p>
    <label className={styles.goalLabel}>What do you want to do?<select value={goal} onChange={e => setGoal(Number(e.target.value))}>{goals.map((item, index) => <option value={index} key={item.slug}>{item.label}</option>)}</select></label>
    <div className={styles.projectMatch} aria-live="polite" aria-atomic="true">
      <div className={styles.matchMeta}><span>YOUR MATCH</span><span>↗</span></div>
      <h3>{project.shortTitle}</h3>
      <p>{choice.reason}</p>
      <div className={styles.matchTags}>{project.stack.slice(0, 3).map(tool => <span key={tool}>{tool}</span>)}</div>
      {project.provenance && <p className={styles.demoNote}>{project.provenance}</p>}
      <Link href={`/work/${project.slug}/`} className={styles.appCaseLink}>Explore this project <span aria-hidden="true">↗</span></Link>
    </div>
    <p className={styles.demoDisclosure}>Real portfolio projects. This demo uses explicit goal matching, not inferred personal data or an AI ranking.</p>
  </>;
}

function AutomationDemo() {
  const [processed, setProcessed] = useState(false);
  const result = processOrders();
  const download = () => {
    const url = URL.createObjectURL(new Blob([result.csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = "cleaned-sample-orders.csv";
    document.body.appendChild(anchor); anchor.click(); anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return <>
    <p className={styles.appEyebrow}>03 / AUTOMATION</p>
    <h2>From messy to ready.</h2>
    <p className={styles.appDescription}>Clean a sample order file and generate an export.</p>
    <div className={styles.sampleTable}><table><caption>Sample input · 6 order records</caption><thead><tr><th scope="col">Order</th><th scope="col">Region</th><th scope="col">Units</th></tr></thead><tbody>{sampleOrders.map((row, i) => <tr key={i} className={i === 3 || row.units === null ? styles.flaggedRow : ""}><td>{row.id}{i === 3 && <small> duplicate</small>}</td><td>{row.region}</td><td>{row.units ?? "missing"}</td></tr>)}</tbody></table></div>
    {!processed ? <button type="button" className={styles.runDemo} onClick={() => setProcessed(true)}>Clean & summarise <span aria-hidden="true">→</span></button> : <div className={styles.automationOutput} role="status">
      <p><strong>{result.clean.length} clean orders</strong><span>Ready to export</span></p>
      <ul><li>{result.duplicates} duplicate removed</li><li>{result.incomplete} incomplete row excluded</li><li>{result.units} units · ${result.sales.toLocaleString("en-GB")} in sample sales</li></ul>
      <div className={styles.exportActions}><button type="button" className={styles.runDemo} onClick={download}>Download CSV ↓</button><button type="button" className={styles.resetDemo} onClick={() => setProcessed(false)}>Reset</button></div>
    </div>}
    <p className={styles.demoDisclosure}>Synthetic orders. Processing runs in your browser; the download contains the cleaned sample rows.</p>
  </>;
}

export function AppliedDataDemo() {
  const [demo, setDemo] = useState(0);
  return <section className={styles.decisionApp} aria-label="Applied data demos">
    <div className={styles.appBar}><span><i aria-hidden="true" /> DATA IN ACTION</span><span>TRY IT</span></div>
    <div className={styles.demoSwitcher} role="group" aria-label="Choose a data application">{["Forecast", "Recommend", "Automate"].map((name, i) => <button type="button" key={name} aria-pressed={demo === i} onClick={() => setDemo(i)}>{name}</button>)}</div>
    <div className={styles.appBody}>{demo === 0 ? <ForecastDemo /> : demo === 1 ? <RecommendationDemo /> : <AutomationDemo />}</div>
  </section>;
}
