export const INTRO_SESSION_KEY = "almond-portfolio-intro-seen";

// Runs in the document head, before the homepage can paint. Keep this independent
// of the application bundle so slower connections see the opening scene first.
export const introEntryScript = `(function () {
  if (window.location.pathname !== "/" || window.location.hash) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  try {
    if (window.sessionStorage.getItem("${INTRO_SESSION_KEY}") === "true") return;
  } catch (_) {}
  var root = document.documentElement;
  root.dataset.portfolioEntry = "pending";
  window.setTimeout(function () {
    if (root.dataset.portfolioEntry === "pending") root.dataset.portfolioEntry = "bypassed";
  }, 6000);
})();`;
