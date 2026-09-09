"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./data-hero.module.css";

const sites = [
  { name: "North", actual: 1240, target: 1200, finding: "All scheduled outreach visits were completed.", action: "Maintain the outreach schedule and review which delivery practices other teams could adopt.", owner: "Programme manager", deadline: "Next monthly review" },
  { name: "Central", actual: 860, target: 1000, finding: "Attendance fell below plan at two outreach sessions.", action: "Confirm attendance barriers with community partners and adjust the next session times.", owner: "Community liaison", deadline: "Within 14 days" },
  { name: "South", actual: 620, target: 1000, finding: "Two planned outreach visits were missed because transport was unavailable.", action: "Confirm transport and reschedule both missed outreach visits.", owner: "Outreach lead", deadline: "Within 7 days" },
];

export function ProgrammeDecision() {
  const [selected, setSelected] = useState(2);
  const site = sites[selected];
  const achievement = site.actual / site.target * 100;
  const gap = Math.max(site.target - site.actual, 0);
  const status = achievement >= 100 ? "On track" : achievement >= 80 ? "At risk" : "Off track";
  const tone = achievement >= 100 ? styles.onTrack : achievement >= 80 ? styles.atRisk : styles.offTrack;

  return <section className={styles.decisionApp} aria-labelledby="decision-title">
    <div className={styles.appBar}><span><i aria-hidden="true" /> M&E INTELLIGENCE</span><span>DEMO</span></div>
    <div className={styles.appBody}>
      <p className={styles.appEyebrow}>03 / PUT THE EVIDENCE TO WORK</p>
      <h2 id="decision-title">Where should the<br />team act next?</h2>
      <p className={styles.appDescription}>Compare outreach results. Choose the next action.</p>
      <div className={styles.sitePicker} role="group" aria-label="Choose an outreach area">
        {sites.map((item, index) => <button key={item.name} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}><span>{item.name}</span><small>{Math.round(item.actual / item.target * 100)}%</small></button>)}
      </div>
      <div className={`${styles.applicationResult} ${tone}`} aria-live="polite" aria-atomic="true">
        <p className={styles.indicatorName}>People reached · {site.name}</p>
        <div className={styles.actualRow}><strong>{site.actual.toLocaleString("en-GB")}</strong><span className={styles.statusPill}><i aria-hidden="true" />{status}</span></div>
        <p className={styles.achievement}><strong>{Math.round(achievement)}% achievement</strong><span>Target: {site.target.toLocaleString("en-GB")}</span></p>
        <div className={styles.targetTrack} aria-hidden="true"><span style={{ width: `${Math.min(achievement, 100)}%` }} /></div>
        <p className={styles.targetGap}>{gap > 0 ? `${gap.toLocaleString("en-GB")} people below target` : `${(site.actual - site.target).toLocaleString("en-GB")} people above target`}</p>
        <aside className={styles.actionCallout}>
          <p className={styles.actionHeading}>{gap > 0 ? "RECOMMENDED ACTION" : "SUSTAIN PERFORMANCE"}</p>
          <p className={styles.actionText}>{site.action}</p>
          <p className={styles.actionOwner}>{site.owner} <span>·</span> {site.deadline}</p>
          <details key={site.name} className={styles.evidenceDetail}><summary>Why this action?</summary><p>{site.finding}</p></details>
        </aside>
      </div>
      <Link href="/work/monitoring-and-evaluation-agent/" className={styles.appCaseLink}>Explore my M&E system <span aria-hidden="true">↗</span></Link>
    </div>
    <footer className={styles.appFootnote}>Illustrative scenario · Synthetic data<br />Demo thresholds: ≥100% on track · 80–99% at risk · &lt;80% off track</footer>
  </section>;
}
