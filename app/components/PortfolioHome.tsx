"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { archiveRepos, certifications, experience, profile, projects, services, skills } from "../data";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

const filters = ["All", "M&E", "Analytics", "Machine learning", "AI systems", "Dashboards"] as const;

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

function ProjectGlyph({ accent }: { accent: string }) {
  return (
    <span className={`project-glyph glyph-${accent}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <b />
    </span>
  );
}

export function PortfolioHome() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  useEffect(() => {
    document.body.classList.add("js-reveal");
    const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));

    const hideAppDeployOverlay = () => {
      document
        .querySelectorAll<HTMLElement>(".appdeploy-overlay, #appdeploy-overlay, [data-appdeploy-overlay]")
        .forEach((overlay) => overlay.style.setProperty("display", "none", "important"));
    };
    hideAppDeployOverlay();
    window.postMessage("appdeploy:hideOverlay", window.location.origin);
    const appDeployObserver = new MutationObserver(hideAppDeployOverlay);
    appDeployObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.classList.remove("js-reveal");
      observer.disconnect();
      appDeployObserver.disconnect();
    };
  }, []);

  const visibleProjects = useMemo(
    () => filter === "All" ? projects : projects.filter((project) => project.kind === filter),
    [filter],
  );

  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero section-frame" aria-labelledby="hero-title">
          <div className="hero-index reveal">01 <span>/</span> portfolio</div>
          <div className="hero-copy reveal">
            <p className="eyebrow">Data scientist · AI engineer · M&E specialist</p>
            <h1 id="hero-title">I make complex information <em>legible.</em></h1>
            <p className="hero-intro">I build data products, predictive systems, and evidence workflows that help people move from raw information to confident action.</p>
            <div className="hero-actions">
              <Link className="button button-dark" href="#work">See selected work <Arrow /></Link>
              <Link className="text-link" href="/contact">Work with me <Arrow /></Link>
            </div>
          </div>
          <div className="hero-portrait reveal reveal-delay-1">
            <div className="portrait-frame">
              <Image src={profile.portrait} alt="Almond Owolabi working at a laptop" fill priority sizes="(max-width: 720px) 86vw, 38vw" />
              <span className="portrait-stamp">AO / 01</span>
            </div>
            <div className="portrait-caption">
              <span>Profile study</span>
              <span>03° 22′ N / 06° 31′ E</span>
            </div>
          </div>
          <div className="hero-side-note reveal reveal-delay-2">
            <span className="side-note-dot" />
            <span>Turning evidence into decisions across analytics, AI, and development impact.</span>
          </div>
          <div className="hero-scroll reveal reveal-delay-2"><span>Scroll to explore</span><span className="scroll-line" /></div>
        </section>

        <section className="intro-band section-frame" aria-label="Profile summary">
          <div className="intro-band-label reveal"><span>02</span><span>What I bring</span></div>
          <div className="intro-band-copy reveal reveal-delay-1">
            <p className="display-copy">Four years across analytics, visualization, statistical modelling, pipelines, and applied machine learning—grounded in the questions that matter to people, programmes, and businesses.</p>
            <div className="stat-row">
              <div><strong>25</strong><span>public repos</span></div>
              <div><strong>30%</strong><span>pipeline time reduced</span></div>
              <div><strong>4+</strong><span>years in data</span></div>
            </div>
          </div>
        </section>

        <section className="work-section section-frame" id="work" aria-labelledby="work-title">
          <div className="section-heading reveal">
            <div><span className="section-number">03 /</span><p className="eyebrow">Selected work</p></div>
            <h2 id="work-title">Proof, in public.</h2>
            <p>Systems that make a case for clarity—from donor-grade programme intelligence to local retrieval workflows.</p>
          </div>
          <div className="filter-bar reveal" role="tablist" aria-label="Filter selected work">
            {filters.map((item) => (
              <button key={item} className={filter === item ? "is-active" : ""} type="button" role="tab" aria-selected={filter === item} onClick={() => setFilter(item)}>{item}</button>
            ))}
          </div>
          <div className="project-grid">
            {visibleProjects.map((project, index) => (
              <article className={`project-card reveal ${index % 2 === 1 ? "project-card-offset" : ""}`} key={project.slug}>
                <div className={`project-card-visual visual-${project.accent}`}>
                  <Image src={project.image.src} alt={project.image.alt} fill sizes="(max-width: 620px) calc(100vw - 40px), 46vw" />
                  <div className="visual-meta"><span>0{index + 1}</span><span>{project.kind}</span></div>
                  <ProjectGlyph accent={project.accent} />
                  <span className="visual-word">{project.shortTitle}</span>
                </div>
                <div className="project-card-body">
                  <p className="eyebrow">{project.kicker}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-row">{project.stack.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <Link className="project-link" href={`/work/${project.slug}`}>Read case study <Arrow /></Link>
                </div>
              </article>
            ))}
          </div>
          <div className="archive-prompt reveal"><span>See the full body of work</span><Link className="button button-outline" href="#archive">Open repository archive <Arrow /></Link></div>
        </section>

        <section className="practice-section section-frame" id="practice" aria-labelledby="practice-title">
          <div className="section-heading section-heading-wide reveal">
            <div><span className="section-number">04 /</span><p className="eyebrow">Ways of working</p></div>
            <h2 id="practice-title">Useful systems over impressive theatre.</h2>
            <p>Whether the work is a dashboard, model, report, or API, the measure is the same: does it help the right person make a better decision?</p>
          </div>
          <div className="services-list">
            {services.map((service) => (
              <article className="service-row reveal" key={service.number}>
                <span className="service-number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
                <div className="service-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="experience-section section-frame" id="about" aria-labelledby="experience-title">
          <div className="section-heading reveal">
            <div><span className="section-number">05 /</span><p className="eyebrow">Experience</p></div>
            <h2 id="experience-title">Close to the work.</h2>
            <p>My practice sits between the spreadsheet, the model, and the meeting where something has to change.</p>
          </div>
          <div className="experience-layout">
            <div className="experience-portrait reveal">
              <Image src={profile.portraitMono} alt="Portrait of Almond Owolabi" fill sizes="(max-width: 720px) 86vw, 36vw" />
              <span>Evidence, carefully handled.</span>
            </div>
            <div className="timeline">
              {experience.map((item) => (
                <article className="timeline-item reveal" key={`${item.company}-${item.role}`}>
                  <div className="timeline-meta"><span>{item.period}</span><span>{item.place}</span></div>
                  <div><h3>{item.role}<small>{item.company}</small></h3><p>{item.body}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="capability-section section-frame" aria-labelledby="capability-title">
          <div className="capability-copy reveal"><span className="section-number">06 /</span><p className="eyebrow">Technical range</p><h2 id="capability-title">A wide lens. A careful hand.</h2><p>From data collection in low-connectivity environments to APIs, models, dashboards, and board-level reporting.</p></div>
          <div className="capability-list reveal reveal-delay-1">{skills.map((skill, index) => <span key={skill}><b>{String(index + 1).padStart(2, "0")}</b>{skill}</span>)}</div>
        </section>

        <section className="archive-section section-frame" id="archive" aria-labelledby="archive-title">
          <div className="section-heading reveal"><div><span className="section-number">07 /</span><p className="eyebrow">Open archive</p></div><h2 id="archive-title">Every repository has a trace.</h2><p>Twenty-five public repositories across analytics, dashboards, machine learning, M&E, and AI systems.</p></div>
          <div className="archive-table reveal">
            <div className="archive-head"><span>Repository</span><span>Focus</span><span>Open</span></div>
            {archiveRepos.map(([repo, description, kind], index) => <a className="archive-row" href={`https://github.com/alumond/${repo}`} target="_blank" rel="noreferrer" key={repo}><span><b>{String(index + 1).padStart(2, "0")}</b>{repo}</span><span>{description}</span><span className="archive-kind">{kind} ↗</span></a>)}
          </div>
        </section>

        <section className="credentials-section section-frame" aria-labelledby="credentials-title">
          <div className="credentials-copy reveal"><span className="section-number">08 /</span><p className="eyebrow">Credentials</p><h2 id="credentials-title">The work is the credential. The study is the habit.</h2></div>
          <div className="credential-grid reveal reveal-delay-1">{certifications.map((item, index) => <div key={item}><span>0{index + 1}</span><p>{item}</p></div>)}</div>
        </section>

        <section className="contact-banner section-frame" id="contact" aria-labelledby="contact-title">
          <div className="contact-art" aria-hidden="true"><span>AO</span><i /><i /><i /></div>
          <div className="contact-copy reveal"><span className="section-number">09 /</span><p className="eyebrow">Start a conversation</p><h2 id="contact-title">Have a difficult dataset, a consequential decision, or a system that needs to grow up?</h2><Link className="button button-light" href="/contact">Let&apos;s work on it <Arrow /></Link></div>
          <div className="contact-details reveal reveal-delay-1"><a href={`mailto:${profile.email}`}>{profile.email}</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
