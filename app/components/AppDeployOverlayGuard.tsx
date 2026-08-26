"use client";

import { useEffect } from "react";

export function AppDeployOverlayGuard() {
  useEffect(() => {
    const selector = "[id^='appdeploy-overlay-'], .appdeploy-overlay, #appdeploy-overlay, [data-appdeploy-overlay], [class*='appdeploy-overlay']";
    const removeInjectedToolbar = () => {
      document
        .querySelectorAll<HTMLElement>(selector)
        .forEach((overlay) => overlay.remove());
    };

    removeInjectedToolbar();
    const observer = new MutationObserver(removeInjectedToolbar);
    observer.observe(document.documentElement, { childList: true, subtree: true });
    const interval = window.setInterval(removeInjectedToolbar, 400);
    window.addEventListener("load", removeInjectedToolbar);

    return () => {
      observer.disconnect();
      window.clearInterval(interval);
      window.removeEventListener("load", removeInjectedToolbar);
    };
  }, []);

  return null;
}
