"use client";

import { useEffect } from "react";

export function AppDeployOverlayGuard() {
  useEffect(() => {
    const removeInjectedToolbar = () => {
      document
        .querySelectorAll<HTMLElement>("[id^='appdeploy-overlay-'], .appdeploy-overlay, #appdeploy-overlay, [data-appdeploy-overlay]")
        .forEach((overlay) => {
          if (overlay.id.startsWith("appdeploy-overlay-")) {
            overlay.remove();
            return;
          }
          overlay.style.setProperty("display", "none", "important");
        });
    };

    removeInjectedToolbar();
    const observer = new MutationObserver(removeInjectedToolbar);
    observer.observe(document.documentElement, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
