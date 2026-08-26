export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`icon-arrow ${className}`.trim()}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path d="M5 15 15 5M7 5h8v8" />
    </svg>
  );
}
