import type { Metadata } from "next";
import { profile } from "../data";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { ResumeLink } from "../components/ResumeLink";
import { ContactActions } from "../components/ContactActions";
import { ArrowIcon } from "../components/ArrowIcon";

export const metadata: Metadata = {
  title: `Contact · ${profile.name}`,
  description: `Contact ${profile.name} about data analytics, AI engineering, M&E intelligence, and data product work.`,
};

export default function ContactPage() {
  return <><SiteHeader /><main id="main-content" className="inner-page contact-page"><section className="inner-hero section-frame"><p className="eyebrow">Contact / 09</p><h1>Let&apos;s make something useful.</h1><p className="inner-lede">Tell me what you are trying to understand, improve, or build. I&apos;ll bring the data lens and a clear next step.</p></section><section className="contact-grid section-frame"><div><p className="eyebrow">Direct line</p><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}</a><p><a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a></p><p>{profile.location}</p></div><div className="contact-links"><a href={profile.linkedin} target="_blank" rel="noreferrer"><span>LinkedIn</span><strong>Professional profile <ArrowIcon /></strong></a><a href={profile.github} target="_blank" rel="noreferrer"><span>GitHub</span><strong>Open project archive <ArrowIcon /></strong></a><a href={profile.resume} download="Almond_Owolabi_Resume.pdf"><span>Résumé</span><strong>Download PDF <ArrowIcon /></strong></a></div></section><section className="contact-note section-frame"><p className="eyebrow">A useful first message</p><h2>“We have data, but the decision is still unclear.”</h2><p>That is enough to start.</p><ContactActions /><ResumeLink /></section></main><SiteFooter /></>;
}
