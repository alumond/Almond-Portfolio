"use client";

import { useEffect, useState } from "react";

export function PortfolioLoader() {
  const [phase, setPhase] = useState<"visible" | "leaving" | "hidden">("visible");

  useEffect(() => {
    const hasWelcomed = window.sessionStorage.getItem("almond-portfolio-welcomed");
    if (hasWelcomed) {
      const hideSeenTimer = window.setTimeout(() => setPhase("hidden"), 0);
      return () => window.clearTimeout(hideSeenTimer);
    }

    window.sessionStorage.setItem("almond-portfolio-welcomed", "true");
    const leaveTimer = window.setTimeout(() => setPhase("leaving"), 1050);
    const hideTimer = window.setTimeout(() => setPhase("hidden"), 1550);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div className={`portfolio-loader ${phase === "leaving" ? "is-leaving" : ""}`} role="status" aria-live="polite">
      <div className="loader-grid" aria-hidden="true" />
      <div className="loader-content">
        <span className="loader-monogram">AO</span>
        <p>Welcome to</p>
        <h1>Almond Owolabi&apos;s Portfolio</h1>
        <div className="loader-progress" aria-hidden="true"><span /></div>
        <span className="loader-caption">Data · systems · evidence</span>
      </div>
    </div>
  );
}
