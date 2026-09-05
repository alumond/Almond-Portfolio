"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { archiveRepos, experience, githubSnapshot, profile, projects, services } from "../data";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { ArrowIcon } from "./ArrowIcon";
import { AnalyticsShowcase, HeroSignal } from "./AnalyticsShowcase";
import { ResumeLink } from "./ResumeLink";
import { ContactActions } from "./ContactActions";

const filters = ["Featured", "All projects", "AI systems", "Analytics", "M&E", "Machine learning", "Dashboards"] as const;

export function PortfolioHome() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Featured");
  const [query, setQuery] = useState("");
  const visibleProjects = projects.filter(p => filter === "Featured" ? p.featured : filter === "All projects" || p.kind === filter);
  const repositories = archiveRepos.filter(r => `${r.name} ${r.description} ${r.language}`.toLowerCase().includes(query.toLowerCase()));
  return <>
    <SiteHeader />
    <main id="main-content">
      <section className="hero section-frame" aria-labelledby="hero-title">
        <HeroSignal />
        <div className="hero-topline"><span><i className="status-dot" /> Data scientist & AI engineer</span><span>Based in Nigeria · Working globally</span></div>
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">Almond Owolabi / Portfolio 2026</p>
            <h1 id="hero-title">Data into clarity.<br />Ideas into <em>impact.</em></h1>
            <p className="hero-intro">I build intelligent systems that connect complex data to better decisions. Across analytics, applied AI, and development impact.</p>
            <div className="hero-actions"><Link className="button button-lime" href="#work">Explore my work <ArrowIcon /></Link><Link className="hero-text-link" href="/about">A little about me <ArrowIcon /></Link></div>
            <div className="hero-utility"><ResumeLink /><a href={`mailto:${profile.email}`}>Get in touch <ArrowIcon /></a></div>
            <div className="hero-signoff"><span className="hero-signature">Almond.</span><span>Analytical by training.<br />A builder by instinct.</span></div>
          </div>
          <div className="hero-portrait">
            <Image unoptimized src={profile.portrait} alt="Almond Owolabi working at his laptop" fill priority sizes="(max-width: 760px) 90vw, 38vw" />
            <div className="portrait-caption"><span>THE PERSON BEHIND THE SYSTEMS</span><strong>Curiosity. Context. Craft.</strong></div>
            <a className="portrait-link" href={profile.github} target="_blank" rel="noreferrer" aria-label="Visit Almond's GitHub"><ArrowIcon /></a>
          </div>
        </div>
        <div className="hero-bottomline"><span>ANALYTICS <b>/</b> AI ENGINEERING <b>/</b> M&E</span><a href="#work">Discover selected work <span aria-hidden="true">↓</span></a></div>
      </section>
      <div className="expertise-strip section-frame" aria-label="Core tools"><span>THE TOOLKIT</span>{['Python','SQL','Power BI','FastAPI','Gemini','Scikit-learn'].map(x=><strong key={x}>{x}</strong>)}</div>
      <section className="work-section section-frame" id="work" aria-labelledby="work-title">
        <div className="section-heading"><div><p className="eyebrow">01 / Selected work</p><h2 id="work-title">Built with purpose.<br /><em>Open to explore.</em></h2></div><p>A selection of original builds, from executive dashboards to AI agents. Explore the problem, the approach, and the code behind each one.</p></div>
        <div className="work-toolbar"><div className="filter-bar" role="group" aria-label="Filter projects">{filters.map(item=><button key={item} type="button" aria-pressed={filter===item} className={filter===item?'is-active':''} onClick={()=>setFilter(item)}>{item}</button>)}</div><span className="project-count" aria-live="polite">{String(visibleProjects.length).padStart(2,'0')} projects</span></div>
        <div className="project-grid" key={filter}>
          {visibleProjects.map((p,index)=><article className={`project-card project-${p.slug} ${index===0 && filter==='Featured'?'project-card-flagship':''}`} key={p.slug}>
            <Link href={`/work/${p.slug}`} className={`project-card-visual visual-${p.accent}`} aria-label={`Explore ${p.title}`}>
              <Image unoptimized src={p.image.src} alt={p.image.alt} fill sizes={index===0&&filter==='Featured'?'(max-width: 760px) 90vw, 65vw':'(max-width: 760px) 90vw, 45vw'} />
              <div className="visual-meta"><span>{index===0&&filter==='Featured'?'Featured case study':p.kind}</span><span className="round-arrow"><ArrowIcon /></span></div>
              {p.slug!=='retail-revenue-command-center'&&p.slug!=='health-access-for-pwds'&&p.slug!=='linkedin-ai-agent'&&<span className="visual-title">{p.shortTitle}</span>}
            </Link>
            <div className="project-card-body"><p className="eyebrow">{p.kicker}</p><h3><Link href={`/work/${p.slug}`}>{p.title}</Link></h3><p>{p.description}</p>{p.provenance&&<p className="provenance">{p.provenance}</p>}<div className="tag-row">{p.stack.slice(0,4).map(t=><span key={t}>{t}</span>)}</div><Link className="project-link" href={`/work/${p.slug}`}>Explore project <ArrowIcon /></Link></div>
          </article>)}
        </div>
        <div className="work-bottom"><p>Every build starts with a question worth answering.</p><a className="text-link" href={profile.github} target="_blank" rel="noreferrer">More on GitHub <ArrowIcon /></a></div>
      </section>
      <AnalyticsShowcase />
      <section className="practice-section" id="practice" aria-labelledby="practice-title"><div className="section-frame"><div className="section-heading"><div><p className="eyebrow">02 / How I can help</p><h2 id="practice-title">The right data.<br /><em>A clearer direction.</em></h2></div><p>I work across the full path from a difficult question to a useful system. Always with the people using it in mind.</p></div><div className="services-list">{services.map(s=><Link className="service-row" href="/services" key={s.number}><span className="service-number">{s.number}</span><h3>{s.title}</h3><p>{s.body}</p><span className="round-arrow"><ArrowIcon /></span></Link>)}</div></div></section>
      <section className="about-section section-frame" id="about" aria-labelledby="about-title"><div className="about-photo"><Image unoptimized src={profile.portraitMono} alt="Portrait of Almond Owolabi" fill sizes="(max-width:760px) 90vw, 35vw"/><span>Lagos / Abuja, Nigeria</span></div><div className="about-intro"><p className="eyebrow">03 / The person behind the work</p><h2 id="about-title">A technical mind.<br /><em>A human perspective.</em></h2><p>My work lives between data, technology, and the people they serve. From disability inclusion and programme evidence to commercial analytics, I care about making information useful in the real world.</p><div className="compact-timeline">{experience.map(e=><div key={e.company}><span>{e.period}</span><strong>{e.company}<small>{e.role}</small></strong></div>)}</div><Link className="text-link" href="/about">More about my journey <ArrowIcon /></Link></div></section>
      <section className="resume-feature section-frame" id="resume" aria-labelledby="resume-title"><div className="resume-card"><div className="resume-card-top"><Image unoptimized src={profile.portraitMono} alt="Almond Owolabi" width={66} height={82}/><span>ALMOND<br/>OWOLABI</span><span className="resume-format">PDF ↗</span></div><p>Data Scientist &amp; AI Engineer</p><div className="resume-card-rule"/><div className="resume-card-details"><span>EXPERIENCE</span><strong>Analytics. Systems.<br/>Development impact.</strong><span>CORE PRACTICE</span><p>Python / SQL / Machine learning<br/>Dashboards / AI workflows / M&amp;E</p></div><a className="resume-preview-link" href={profile.resume} target="_blank" rel="noreferrer">Open résumé <ArrowIcon/></a></div><div className="resume-feature-copy"><p className="eyebrow">The professional picture</p><h2 id="resume-title">The work is here.<br/><em>Take the story with you.</em></h2><p>A closer look at my experience, technical background, and the work that shaped my approach. Ready to download and share with your team.</p><div className="resume-actions"><ResumeLink className="button button-dark"/><a className="text-link" href={profile.resume} target="_blank" rel="noreferrer">Preview PDF <ArrowIcon/></a></div><span className="resume-note">PDF document · Opens on any device</span></div></section>
      <section className="archive-section section-frame" id="archive" aria-labelledby="archive-title"><div className="section-heading"><div><p className="eyebrow">04 / The wider collection</p><h2 id="archive-title">Always <em>building.</em></h2></div><p>{githubSnapshot.publicRepos} public repositories. Original projects, collaborations, and learning in the open. Updated September 2026.</p></div><details className="archive-disclosure"><summary><span>Explore the repository archive <b>{githubSnapshot.publicRepos}</b></span><span className="archive-plus" aria-hidden="true">+</span></summary><div className="archive-content"><label className="archive-search">Find a repository<input type="search" placeholder="Search projects, tools, or topics…" value={query} onChange={e=>setQuery(e.target.value)}/></label><p className="search-count" role="status">{repositories.length} repositories</p><div className="archive-table">{repositories.map(r=><a className="archive-row" href={r.github} target="_blank" rel="noreferrer" key={r.name}><span><strong>{r.name}</strong><small>{r.description}</small></span><span className="archive-kind">{r.fork?'Fork / study':r.language}<ArrowIcon /></span></a>)}</div>{repositories.length===0&&<p className="empty-state">No repositories match “{query}”. Try another project name or tool.</p>}</div></details></section>
      <section className="contact-banner section-frame" id="contact" aria-labelledby="contact-title"><div className="contact-top"><p className="eyebrow">Have something in mind?</p><span><i className="status-dot"/> Let’s start a conversation</span></div><h2 id="contact-title">Good questions.<br /><em>Better possibilities.</em></h2><div className="contact-bottom"><ContactActions /><a className="contact-address" href={`mailto:${profile.email}`}>{profile.email}<ArrowIcon /></a></div><div className="contact-socials"><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowIcon /></a><a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowIcon /></a><a href={`tel:${profile.phone.replace(/\s/g, "")}`}>Call Almond <ArrowIcon /></a><ResumeLink /></div></section>
    </main><SiteFooter />
  </>;
}
