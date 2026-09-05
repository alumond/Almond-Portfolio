"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { profile } from "../data";
import { ResumeLink } from "./ResumeLink";
import { ArrowIcon } from "./ArrowIcon";

const links = [
  ["Work", "/#work"],
  ["Practice", "/#practice"],
  ["About", "/about"],
  ["Archive", "/#archive"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && open) { setOpen(false); toggle.current?.focus(); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <Link className="wordmark" href="/" onClick={() => setOpen(false)}>
        <span className="wordmark-mark">AO</span>
        <span>{profile.name}</span>
      </Link>

      <button
        ref={toggle}
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen((current) => !current)}
      >
        <span>{open ? "Close" : "Menu"}</span>
        <i aria-hidden="true" />
      </button>

      <nav id="primary-navigation" className={`primary-nav ${open ? "is-open" : ""}`} aria-label="Primary navigation">
        {links.map(([label, href]) => (
          <Link key={label} href={href} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
        <ResumeLink className="nav-resume" label="Résumé" />
        <Link className="nav-cta" href="/contact" onClick={() => setOpen(false)}>
          Let&apos;s talk <ArrowIcon />
        </Link>
      </nav>
    </header>
  );
}
