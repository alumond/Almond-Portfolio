"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./data-hero.module.css";
import { AppliedDataDemo } from "./AppliedDataDemo";

const stages = ["Raw data", "Find the signal", "Make it matter"];

function DataField({ stage, paused }: { stage: number; paused: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const selected = useRef(stage);
  const stopped = useRef(paused);
  useEffect(() => { selected.current = stage; }, [stage]);
  useEffect(() => { stopped.current = paused; }, [paused]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0, height = 0, frame = 0, time = 0, last = 0, mix = 1;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width; height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr; canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const move = (e: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      pointer.tx = (e.clientX - box.left) / width - .5;
      pointer.ty = (e.clientY - box.top) / height - .5;
    };
    const leave = () => { pointer.tx = 0; pointer.ty = 0; };
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    const draw = (now: number) => {
      const frozen = stopped.current || motion.matches || document.hidden;
      if (!frozen) time += Math.min((now - last) / 1000, .05);
      last = now;
      mix += (selected.current - mix) * (motion.matches ? 1 : .045);
      pointer.x += ((frozen ? 0 : pointer.tx) - pointer.x) * .035;
      pointer.y += ((frozen ? 0 : pointer.ty) - pointer.y) * .035;
      ctx.clearRect(0, 0, width, height);
      const scale = Math.min(width / 860, height / 740);
      const cx = width * .52 + pointer.x * 17;
      const cy = height * .53 + pointer.y * 12;
      const project = (x: number, z: number, y: number) => ({
        x: cx + (x * .89 - z * .66) * scale,
        y: cy + (x * .23 + z * .35 - y) * scale,
      });
      // A synthetic scalar field: observations resolve into an analytical surface.
      const field = (x: number, z: number) => {
        const peak = 192 * Math.exp(-((x - 70) ** 2 / 21500 + (z + 25) ** 2 / 25000));
        const ridge = 65 * Math.sin(x / 115 + z / 128 + time * .32);
        const noise = Math.sin(x * 1.7 + z * .36) * Math.cos(z * 1.32 + time * .25) * 86;
        return (peak + ridge) * mix + noise * (1 - mix);
      };
      const line = (points: { x: number; y: number }[], color: string, thickness = .6) => {
        ctx.beginPath(); points.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
        ctx.strokeStyle = color; ctx.lineWidth = thickness; ctx.stroke();
      };
      // A ground plane gives the points a measured, architectural frame.
      for (let n = -350; n <= 350; n += 70) {
        line([project(-350, n, -62), project(350, n, -62)], "rgba(160,196,160,.10)");
        line([project(n, -350, -62), project(n, 350, -62)], "rgba(160,196,160,.10)");
      }
      ctx.font = `${10 * scale}px monospace`; ctx.fillStyle = "#799885";
      for (let n = 0; n < 6; n++) {
        const p = project(-350 + n * 140, 380, -65);
        ctx.fillText((n * .2).toFixed(1), p.x, p.y);
      }
      for (let z = -330; z <= 330; z += 15) {
        const row = [];
        for (let x = -350; x <= 350; x += 14) row.push(project(x, z, field(x, z)));
        line(row, `rgba(178,225,144,${.065 + Math.min(mix, 1) * .075})`);
        for (let i = 0; i < row.length; i++) {
          const x = -350 + i * 14, p = row[i];
          const light = (Math.sin(x / 65 + z / 82 - time * .65) + 1) / 2;
          ctx.beginPath(); ctx.arc(p.x, p.y, (light > .88 ? 1.75 : 1.05) * scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${light > .65 ? "215,243,157" : "107,176,144"},${.27 + light * .65})`;
          ctx.fill();
        }
      }
      // Three highlighted cross sections travel gently through the observations.
      [-165, 0, 180].forEach((z, index) => {
        const points = [];
        for (let x = -350; x <= 350; x += 7) points.push(project(x, z, field(x, z) + 1));
        ctx.shadowBlur = 9; ctx.shadowColor = "#c7ef8a";
        line(points, `rgba(216,249,163,${.28 + Math.min(mix, 1) * .37})`, 1.1);
        ctx.shadowBlur = 0;
        const x = ((time * 31 + index * 217) % 700) - 350;
        const p = project(x, z, field(x, z));
        ctx.beginPath(); ctx.arc(p.x, p.y, 3 * scale, 0, Math.PI * 2);
        ctx.fillStyle = "#edfbc8"; ctx.fill();
      });
      const peak = project(70, -25, field(70, -25));
      line([peak, { x: peak.x, y: peak.y - 55 * scale }, { x: peak.x + 85 * scale, y: peak.y - 55 * scale }], "#93ab7b", .7);
      ctx.fillStyle = "#dcf5b4"; ctx.font = `${11 * scale}px monospace`;
      ctx.fillText(selected.current === 0 ? "OBSERVATIONS" : "SIGNAL IDENTIFIED", peak.x + 8 * scale, peak.y - 66 * scale);
      frame = requestAnimationFrame(draw);
    };
    resize(); frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      canvas.removeEventListener("pointermove", move); canvas.removeEventListener("pointerleave", leave);
    };
  }, []);
  return <canvas ref={ref} className={styles.canvas} aria-hidden="true" />;
}

export function DataHero({ preview = true }: { preview?: boolean }) {
  const [stage, setStage] = useState(1);
  const [paused, setPaused] = useState(false);
  const Content = preview ? "main" : "div";
  return <div className={`${styles.page} ${preview ? "" : styles.embedded}`}>
    {preview && <header className={styles.header}>
      <Link href="/" className={styles.brand}><span className={styles.monogram}>AO</span><span>ALMOND OWOLABI</span></Link>
      <nav aria-label="Portfolio navigation"><Link href="/#work">Selected work</Link><Link href="/about/">About</Link><Link href="/contact/" className={styles.contact}>Let’s talk <span>↗</span></Link></nav>
    </header>}
    <Content id={preview ? "main-content" : undefined}>
      <section className={`${styles.hero} ${stage === 2 ? styles.appliedHero : ""}`} aria-labelledby="data-hero-title">
        <div className={styles.topline}><span><i /> DATA SCIENTIST & AI ENGINEER</span><span>NIGERIA ↗ WORKING GLOBALLY</span></div>
        <div className={styles.copy}>
          <p className={styles.kicker}><span>01 /</span> ALMOND OWOLABI / PORTFOLIO</p>
          <h1 id="data-hero-title" aria-label="Data into clarity. Ideas into impact.">Data into<br /><em>clarity.</em><br />Ideas into <span className={styles.impact}>impact.</span></h1>
          <p className={styles.intro}>I build analytics and AI systems that turn complex data into better decisions.</p>
          <div className={styles.actions}><Link href="/#work" className={styles.primary}>Explore my work <span>↗</span></Link><Link href="/contact/" className={styles.secondary}>Work with me <span>↗</span></Link></div>
          <div className={styles.disciplines}><span>DATA SCIENCE</span><i /><span>AI ENGINEERING</span><i /><span>M&E INTELLIGENCE</span></div>
        </div>
        {stage === 2 ? <div className={`${styles.visual} ${styles.applicationVisual}`}><AppliedDataDemo /></div> : <div className={styles.visual} role="img" aria-label={`Animated illustrative data surface. Stage: ${stages[stage]}. Synthetic observations transform into patterns.`}>
          <div className={styles.visualTop}><span><i /> THE SIGNAL FIELD</span><span>FIG. 001 / SYNTHETIC DATA</span></div>
          <div className={styles.rawData} aria-hidden="true"><span>OBSERVATION MATRIX</span><div>0.742 &nbsp; 0.186 &nbsp; 0.903 &nbsp; 0.451<br />0.328 &nbsp; 0.867 &nbsp; 0.214 &nbsp; 0.692<br />0.519 &nbsp; 0.043 &nbsp; 0.785 &nbsp; 0.336</div></div>
          <DataField stage={stage} paused={paused} />
          <div className={styles.axisLabel} aria-hidden="true">FEATURE SPACE / x₁ × x₂</div>
          <div className={styles.chart} aria-hidden="true"><div><span>SIGNAL EXTRACTION</span><span>f(x)</span></div><svg viewBox="0 0 390 64" fill="none"><path d="M0 52H390M0 26H390" stroke="#345143" strokeDasharray="2 5"/><path d="M0 45L10 53L20 31L30 48L40 39L50 44L60 27L70 41L80 28L90 40L100 19L110 36L120 22L130 32L140 19L150 24L160 10L170 24L180 19L190 31L200 18L210 27L220 10L230 19L240 8L250 16L260 11L270 24L280 9L290 15L300 5L310 15L320 8L330 17L340 6L350 12L360 3L370 10L390 4" stroke="#6b9c82"/><path d="M0 47C40 47 60 39 90 34S140 20 170 22S195 25 225 18S268 18 291 13S350 9 390 5" stroke="#d5ef99" strokeWidth="2"/></svg><footer><span>NOISE</span><span className={styles.chartKey}>UNDERLYING PATTERN</span></footer></div>
        </div>}
        <div className={styles.bottomline}><span>ANALYTICS FOR BETTER DECISIONS.</span><Link href="/#work">VIEW SELECTED WORK ↓</Link></div>
      </section>
      <section className={styles.controls} aria-label="Explore the data animation">
        <div className={styles.controlIntro}><span className={styles.controlEyebrow}>FROM EVIDENCE TO IMPACT</span><p>Follow the signal.</p></div>
        <div className={styles.steps}>{stages.map((label, index) => <button key={label} onClick={() => setStage(index)} aria-pressed={stage === index} className={stage === index ? styles.active : ""}><span className={styles.stepNumber}>0{index + 1}</span><span>{label}</span><span className={styles.stepArrow}>↗</span></button>)}</div>
        {stage !== 2 && <button className={styles.pause} onClick={() => setPaused(!paused)} aria-label={paused ? "Play animation" : "Pause animation"}>{paused ? "▶" : "Ⅱ"}</button>}
      </section>
    </Content>
    {preview && <footer className={styles.previewFooter}><span>LOCAL DESIGN STUDY <i /> DATA IN MOTION</span><span>Illustrative data · No live metrics</span><Link href="/">Compare current portfolio ↗</Link></footer>}
  </div>;
}
