import retail from "../lib/retail-data.json";

/** Background chart traces use the same synthetic project data as the explorer. */
export function DataBackdrop() {
  const months = retail.months;
  const peak = Math.max(...months.map(m => m.revenue));
  const trace = (field: "revenue" | "profit", base: number, height: number) => months.map((m,i) => `${i===0?'M':'L'}${70+i*78},${base-m[field]/peak*height}`).join(" ");
  return <div className="site-data-background" aria-hidden="true">
    <svg viewBox="0 0 1500 1100" preserveAspectRatio="xMidYMid slice">
      <defs><pattern id="portfolio-data-grid" width="55" height="55" patternUnits="userSpaceOnUse"><path d="M55 0H0V55" fill="none" stroke="currentColor" strokeWidth=".6"/><circle cx="0" cy="0" r="1.5" fill="currentColor"/></pattern><linearGradient id="portfolio-signal-fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a9cb8a" stopOpacity=".3"/><stop offset="100%" stopColor="#a9cb8a" stopOpacity="0"/></linearGradient></defs>
      <rect width="1500" height="1100" fill="url(#portfolio-data-grid)" className="backdrop-grid"/>
      <g className="backdrop-revenue"><path d={`${trace('revenue',500,330)} L1396 540 H70Z`} fill="url(#portfolio-signal-fade)"/><path d={trace('revenue',500,330)} fill="none" stroke="#c6e89f" strokeWidth="2"/><path d={trace('profit',520,500)} fill="none" stroke="#72b9c0" strokeWidth="1.5"/>{months.map((m,i)=><circle key={m.month} cx={70+i*78} cy={500-m.revenue/peak*330} r="4" fill="#c6e89f"/>)}</g>
      <g className="backdrop-bars">{months.map((m,i)=><g key={m.month}><rect x={75+i*78} y={940-m.revenue/peak*210} width="30" height={m.revenue/peak*210} rx="2" fill="#8cbb72"/><rect x={109+i*78} y={940-m.profit/peak*210} width="14" height={m.profit/peak*210} rx="2" fill="#62aab5"/></g>)}</g>
      <g className="backdrop-axis" fill="none" stroke="#b0c79a" strokeWidth="1"><path d="M55 140V545H1450M55 670V960H1450"/>{[1,2,3,4].map(i=><path key={i} d={`M55 ${545-i*80}H1450`} strokeDasharray="4 10"/>)}</g>
    </svg>
  </div>;
}
