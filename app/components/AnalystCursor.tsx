"use client";

import { useEffect, useRef } from "react";

/** A quiet dot and ring; it never intercepts interaction or replaces focus. */
export function AnalystCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let x = 0;
    let y = 0;
    const hide = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      cursor.dataset.visible = "false";
      document.documentElement.classList.remove("analyst-cursor-active");
    };
    const move = (event: PointerEvent) => {
      const target = event.target;
      if (!finePointer.matches || reducedMotion.matches || event.pointerType !== "mouse" || !(target instanceof Element)
        || target.closest("input, textarea, select, [contenteditable], dialog") || document.querySelector("dialog[open]")) {
        hide();
        return;
      }
      x = event.clientX;
      y = event.clientY;
      cursor.dataset.interactive = String(Boolean(target.closest("a, button, summary, [role=button]")));
      cursor.dataset.visible = "true";
      document.documentElement.classList.add("analyst-cursor-active");
      if (!frame) frame = requestAnimationFrame(() => {
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        frame = 0;
      });
    };
    const down = (event: PointerEvent) => { if (event.pointerType !== "mouse") hide(); };
    const leave = (event: PointerEvent) => { if (!event.relatedTarget) hide(); };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", leave, { passive: true });
    document.addEventListener("pointerdown", down, { passive: true });
    document.addEventListener("keydown", hide);
    window.addEventListener("blur", hide);
    window.addEventListener("scroll", hide, { passive: true });
    finePointer.addEventListener("change", hide);
    reducedMotion.addEventListener("change", hide);
    return () => {
      hide();
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", leave);
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("keydown", hide);
      window.removeEventListener("blur", hide);
      window.removeEventListener("scroll", hide);
      finePointer.removeEventListener("change", hide);
      reducedMotion.removeEventListener("change", hide);
    };
  }, []);

  return <div ref={cursorRef} className="analyst-cursor" aria-hidden="true" data-visible="false">
    <span className="analyst-cursor-ring" />
    <span className="analyst-cursor-dot" />
  </div>;
}
