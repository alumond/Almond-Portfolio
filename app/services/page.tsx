import { pageMetadata } from "../seo";
import Link from "next/link";
import { services } from "../data";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { ArrowIcon } from "../components/ArrowIcon";

export const metadata = pageMetadata('Data Analytics, AI & M&E Services | Almond Owolabi', 'Data analytics, Power BI dashboards, machine learning and M&E automation by Almond Owolabi in Nigeria. Explore services, example projects and ways to work together.', "/services/");

const serviceExamples: Record<string, { label: string; href: string }> = {
  "01": { label: "Explore the M&E Intelligence Engine", href: "/work/monitoring-and-evaluation-agent/" },
  "02": { label: "Explore the retail analytics dashboard", href: "/work/retail-revenue-command-center/" },
  "03": { label: "Explore the AfriMedQA fine-tuning pipeline", href: "/work/afrimedqa-fine-tuning/" },
  "04": { label: "Explore the LinkedIn AI Agent", href: "/work/linkedin-ai-agent/" },
};

export default function ServicesPage() {
  return <><SiteHeader /><main id="main-content" className="inner-page"><section className="inner-hero inner-hero-dark section-frame"><p className="eyebrow">Practice / 04</p><h1>Make the evidence move.</h1><p className="inner-lede">Data analytics, AI engineering, and monitoring and evaluation services. Based in Nigeria, I help teams turn complex information into dashboards, predictive models, and practical automation.</p></section><section className="service-detail-list section-frame">{services.map((service) => <article key={service.number}><div className="service-detail-number">{service.number}</div><div><h2>{service.title}</h2><p>{service.body}</p><div className="service-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><Link className="project-link" href={serviceExamples[service.number].href}>{serviceExamples[service.number].label}<ArrowIcon /></Link></div><span className="service-detail-mark"><ArrowIcon /></span></article>)}</section><section className="engagement-section section-frame"><div><p className="eyebrow">Good to know</p><h2>The right shape depends on the decision.</h2></div><div><p>I can join an existing team, lead a defined analytical workstream, or build a small system end to end. The first step is a conversation about what is stuck, what is consequential, and what a useful outcome looks like.</p><Link className="button button-dark" href="/contact">Start a conversation <ArrowIcon /></Link></div></section></main><SiteFooter /></>;
}
