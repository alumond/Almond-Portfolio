"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "../data";
import { ArrowIcon } from "./ArrowIcon";

export function ContactActions() {
  const [status, setStatus] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setStatus("Email copied");
    } catch {
      setStatus("Select the email address above to copy it.");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(""), 4500);
  };
  return <div className="contact-actions">
    <a href={`mailto:${profile.email}?subject=Let%27s%20build%20something`} className="button button-lime">Email Almond<ArrowIcon /></a>
    <button type="button" className="copy-email" onClick={copy}>Copy email address <span aria-hidden="true">⧉</span></button>
    <span className="copy-status" role="status">{status}</span>
  </div>;
}
