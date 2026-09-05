"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: content remains visible without JavaScript or motion. */
export function PortfolioMotion() {
  const pathname = usePathname();
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (preference.matches) continue;
        animations.push(entry.target.animate(
          [{ opacity: 0, transform: "translateY(24px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 850, easing: "cubic-bezier(.16,1,.3,1)" },
        ));
      }
    }, { threshold: 0.08 });
    document.querySelectorAll(".section-heading, .about-photo, .about-intro, .service-row, .case-section, .resume-feature, .contact-banner, .gallery-section").forEach(el => observer.observe(el));
    const stopMotion = () => { if (preference.matches) animations.forEach(a => a.cancel()); };
    preference.addEventListener("change", stopMotion);
    return () => { observer.disconnect(); animations.forEach(a => a.cancel()); preference.removeEventListener("change", stopMotion); };
  }, [pathname]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const value = height > 0 ? Math.min(Math.max(window.scrollY / height, 0), 1) : 0;
        if (progress.current) progress.current.style.transform = `scaleX(${value})`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [pathname]);

  return <div className="reading-progress" ref={progress} aria-hidden="true" />;
}
