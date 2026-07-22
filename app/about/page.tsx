import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { certifications, experience, profile, skills } from "../data";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: `About · ${profile.name}`,
  description: `${profile.name} is a data scientist and AI engineer working across analytics, machine learning, M&E intelligence, and data products.`,
};

export default function AboutPage() {
  return <><SiteHeader /><main className="inner-page"><section className="inner-hero section-frame"><p className="eyebrow">About / 05</p><h1>Data work with a point of view.</h1><p className="inner-lede">I am Almond Owolabi—a data scientist and AI engineer working at the intersection of analysis, systems, and development impact.</p></section><section className="about-story section-frame"><div className="about-image"><Image src={profile.portraitMono} alt="Almond Owolabi in a monochrome portrait" fill sizes="(max-width: 720px) 86vw, 35vw" /></div><div className="about-copy"><p className="eyebrow">The through-line</p><p className="display-copy">I care about what data makes possible when it is handled with rigour, context, and enough imagination to reach the people who need it.</p><p>My experience spans data lifecycle management, statistical modelling, dashboards, mobile-first collection systems, machine learning, and evidence-based advocacy. I have worked with programme teams, research teams, and business stakeholders to turn analysis into decisions they can actually use.</p><p>My default is practical: understand the decision, respect the data boundary, build the smallest useful system, and leave the process more legible than I found it.</p><Link className="button button-dark" href={profile.resume}>Download resume ↗</Link></div></section><section className="about-list section-frame"><div><p className="eyebrow">Experience</p><h2>Where I have been useful.</h2></div><div className="about-timeline">{experience.map((item) => <article key={item.company}><span>{item.period}</span><div><h3>{item.role} <small>{item.company}</small></h3><p>{item.body}</p></div></article>)}</div></section><section className="about-skills section-frame"><div><p className="eyebrow">Tools of the trade</p><h2>A working vocabulary.</h2></div><div className="skill-cloud">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></section><section className="about-credentials section-frame"><div><p className="eyebrow">Study</p><h2>Proof of practice.</h2></div><div>{certifications.map((item) => <p key={item}>{item}</p>)}</div></section></main><SiteFooter /></>;
}

