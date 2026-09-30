"use client";

import { useEffect, useRef } from "react";
import { createIntroArtwork } from "../lib/intro-artwork";
import styles from "./portfolio-intro.module.css";

// Internal navigation stays immediate. A full page load starts a new sequence.
let hasEnteredPortfolio = false;
const SEQUENCE_MS = 6400;
const EXIT_MS = 850;

export function PortfolioIntro() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const replayRef = useRef<HTMLButtonElement>(null);
  const pauseRef = useRef<HTMLButtonElement>(null);
  const controller = useRef({ start: () => {}, finish: () => {}, pause: () => {} });

  useEffect(() => {
    const dialog = dialogRef.current;
    const canvas = canvasRef.current;
    const replay = replayRef.current;
    if (!dialog || !canvas || !replay) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const artwork = createIntroArtwork(canvas);
    let frame = 0;
    let exitTimer = 0;
    let elapsed = 0;
    let lastTime = 0;
    let leaving = false;
    let paused = false;
    let previousFocus: HTMLElement | null = null;
    let previousOverflow = "";
    let scrollLocked = false;

    const unlockScroll = () => {
      if (!scrollLocked) return;
      document.documentElement.style.overflow = previousOverflow;
      scrollLocked = false;
    };

    const close = () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(exitTimer);
      dialog.close();
      unlockScroll();
      // Restore a replay user's focus; first-time visitors land at the main heading.
      const target = previousFocus && previousFocus !== document.body
        ? previousFocus
        : document.querySelector<HTMLElement>("#data-hero-title");
      if (target) {
        const oldTabIndex = target.getAttribute("tabindex");
        if (oldTabIndex === null) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        if (oldTabIndex === null) target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
      }
    };

    const finish = () => {
      if (!dialog.open || leaving) return;
      leaving = true;
      hasEnteredPortfolio = true;
      dialog.dataset.leaving = "true";
      if (preference.matches) close();
      else exitTimer = window.setTimeout(close, EXIT_MS);
    };

    const render = (time: number) => {
      if (!dialog.open) return;
      if (lastTime && !document.hidden && !paused) elapsed += Math.min(time - lastTime, 64);
      lastTime = time;
      const scene = elapsed < 1750 ? "question" : elapsed < 3450 ? "pattern" : "identity";
      if (dialog.dataset.scene !== scene) dialog.dataset.scene = scene;
      dialog.style.setProperty("--intro-progress", String(Math.min(elapsed / SEQUENCE_MS, 1)));
      if (!paused) artwork.draw(elapsed);
      if (elapsed >= SEQUENCE_MS) finish();
      frame = requestAnimationFrame(render);
    };

    const start = () => {
      if (dialog.open) return;
      previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      previousOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      scrollLocked = true;
      elapsed = 0;
      lastTime = 0;
      leaving = false;
      paused = false;
      if (pauseRef.current) {
        pauseRef.current.textContent = "Pause";
        pauseRef.current.setAttribute("aria-label", "Pause intro");
        pauseRef.current.setAttribute("aria-pressed", "false");
      }
      dialog.dataset.leaving = "false";
      dialog.dataset.scene = preference.matches ? "identity" : "question";
      dialog.style.setProperty("--intro-progress", "0");
      dialog.showModal();
      artwork.resize();
      if (preference.matches) artwork.draw(5400);
      else frame = requestAnimationFrame(render);
    };

    const onPreferenceChange = () => {
      if (preference.matches && dialog.open) {
        hasEnteredPortfolio = true;
        close();
      }
    };
    const pause = () => {
      if (leaving) return;
      paused = !paused;
      if (pauseRef.current) {
        pauseRef.current.textContent = paused ? "Resume" : "Pause";
        pauseRef.current.setAttribute("aria-label", paused ? "Resume intro" : "Pause intro");
        pauseRef.current.setAttribute("aria-pressed", String(paused));
      }
    };
    controller.current = { start, finish, pause };
    replay.hidden = false;
    // Anchor links and reduced-motion visits get straight to their destination.
    if (!hasEnteredPortfolio && !window.location.hash && !preference.matches) start();
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(exitTimer);
      preference.removeEventListener("change", onPreferenceChange);
      artwork.destroy();
      dialog.close();
      unlockScroll();
      controller.current = { start: () => {}, finish: () => {}, pause: () => {} };
    };
  }, []);

  return <>
    <dialog ref={dialogRef} className={styles.intro} aria-labelledby="intro-title" aria-describedby="intro-description"
      data-portfolio-intro data-scene="question" data-leaving="false"
      onCancel={event => { event.preventDefault(); controller.current.finish(); }}>
      <div className={styles.grain} aria-hidden="true" />
      <header className={styles.header}>
        <span className={styles.brand}><span className={styles.mark}>ao.</span><span>ALMOND OWOLABI<br /><span>SELECTED WORK</span></span></span>
        <div className={styles.controls}>
          <button ref={pauseRef} className={styles.pause} type="button" aria-label="Pause intro" aria-pressed="false" onClick={() => controller.current.pause()}>Pause</button>
          <button className={styles.skip} type="button" onClick={() => controller.current.finish()}>Skip intro <span aria-hidden="true">↗</span></button>
        </div>
      </header>

      <div className={styles.stage}>
        <div className={styles.artwork} aria-hidden="true">
          <div className={styles.orbit} />
          <canvas ref={canvasRef} />
          <span className={styles.artLabel}>CURIOSITY, IN MOTION</span>
          <span className={styles.coordinates}>AO / 001 — ∞</span>
        </div>
        <div className={styles.copy}>
          <p className={styles.eyebrow}><span /> A DIFFERENT WAY TO SEE</p>
          <div className={styles.titles}>
            <p className={`${styles.sceneTitle} ${styles.question}`} aria-hidden="true">It starts with<br /><em>a question.</em></p>
            <p className={`${styles.sceneTitle} ${styles.pattern}`} aria-hidden="true">Then, a<br /><em>new perspective.</em></p>
            <h2 id="intro-title" className={`${styles.sceneTitle} ${styles.identity}`}><span>Almond</span><br /><em>Owolabi.</em></h2>
          </div>
          <p id="intro-description" className={styles.description}>Data scientist. AI engineer.<br />Curious about what comes next.</p>
          <button className={styles.enter} type="button" onClick={() => controller.current.finish()}>
            <span>Enter my portfolio</span><span className={styles.enterArrow} aria-hidden="true">↗</span>
          </button>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.chapters} aria-hidden="true">
          <span className={styles.chapterQuestion}><b>01</b> Curiosity</span>
          <span className={styles.chapterPattern}><b>02</b> Discovery</span>
          <span className={styles.chapterIdentity}><b>03</b> Possibility</span>
        </div>
        <span className={styles.footerNote}>DATA · SYSTEMS · HUMAN IMPACT</span>
        <div className={styles.progress} aria-hidden="true"><span /></div>
      </footer>
    </dialog>
    <div className={styles.replayRow}><button ref={replayRef} hidden type="button" onClick={() => controller.current.start()} className={styles.replay}>Replay the intro <span aria-hidden="true">↻</span></button></div>
  </>;
}
