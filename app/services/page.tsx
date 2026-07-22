import type { Metadata } from "next";
import Link from "next/link";
import { profile, services } from "../data";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: `Services · ${profile.name}`,
  description: `Data analytics, machine learning, M&E intelligence, dashboards, and AI workflow services by ${profile.name}.`,
};

export default function ServicesPage() {
  return <><SiteHeader /><main className="inner-page"><section className="inner-hero inner-hero-dark section-frame"><p className="eyebrow">Practice / 04</p><h1>Make the evidence move.</h1><p className="inner-lede">I help teams turn messy information into systems that clarify decisions, expose risk, and keep action moving.</p></section><section className="service-detail-list section-frame">{services.map((service) => <article key={service.number}><div className="service-detail-number">{service.number}</div><div><h2>{service.title}</h2><p>{service.body}</p><div className="service-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><span className="service-detail-mark">↗</span></article>)}</section><section className="engagement-section section-frame"><div><p className="eyebrow">Good to know</p><h2>The right shape depends on the decision.</h2></div><div><p>I can join an existing team, lead a defined analytical workstream, or build a small system end to end. The first step is a conversation about what is stuck, what is consequential, and what a useful outcome looks like.</p><Link className="button button-dark" href="/contact">Start a conversation ↗</Link></div></section></main><SiteFooter /></>;
}

