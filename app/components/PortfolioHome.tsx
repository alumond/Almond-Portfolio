import Image from "next/image";
import Link from "next/link";
import { profile, projects, services } from "../data";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { ArrowIcon } from "./ArrowIcon";
import { AnalyticsShowcase } from "./AnalyticsShowcase";
import { DataHero } from "./DataHero";
import { ResumeLink } from "./ResumeLink";
import { ContactActions } from "./ContactActions";
import { PortfolioIntro } from "./PortfolioIntro";

const selectedWork = [
  { slug: "monitoring-and-evaluation-agent", focus: "Programme evidence → accountable action", title: "A workbook becomes a report. A finding becomes an action.", summary: "I built an M&E engine that connects project data, performance calculations, reporting, and a separate escalation workflow.", evidence: "Used for project tracking · Report and escalation previews" },
  { slug: "health-access-for-pwds", focus: "Disability inclusion → analytical judgement", title: "Making barriers to healthcare easier to examine.", summary: "I brought access indicators, disability groups, and service gaps into one dashboard, with explicit limits around what its reconstructed demonstration data can establish.", evidence: "Four filter dimensions · Inspectable calculations" },
  { slug: "linkedin-ai-agent", focus: "AI automation → a working product", title: "From a sourced idea to a post I can stand behind.", summary: "I built LinkedIn Studio to bring research, drafts, artwork, and review together. Approval stays tied to the exact text and image that will be published.", evidence: "In regular use · 39 posts tracked at the October 2026 capture" },
];

export function PortfolioHome() {
  return <>
    <SiteHeader />
    <main id="main-content" className="portfolio-home">
      <DataHero preview={false} />
      <section className="work-section selected-stories section-frame" id="work" aria-labelledby="work-title">
        <div className="section-heading"><div><p className="eyebrow">01 / Selected work</p><h2 id="work-title">Three problems.<br /><em>Three working systems.</em></h2></div><p>Built independently. Each case study explains the decisions, shows the output, and makes the evidence available to inspect.</p></div>
        <div className="selected-story-list">
          {selectedWork.map((story, index) => {
            const project = projects.find(item => item.slug === story.slug)!;
            return <article className={`selected-story project-${project.slug}`} key={project.slug}>
              <Link href={`/work/${project.slug}/`} className="project-card-visual" aria-label={`Read the ${project.title} case study`}>
                <Image unoptimized src={project.image.src} alt={project.image.alt} fill sizes="(max-width: 760px) 90vw, 50vw" />
                <span className="story-image-action">View the work <ArrowIcon /></span>
              </Link>
              <div className="selected-story-copy">
                <p className="eyebrow">0{index + 1} / {story.focus}</p>
                <p className="story-project-name">{project.title}</p>
                <h3><Link href={`/work/${project.slug}/`}>{story.title}</Link></h3>
                <p>{story.summary}</p>
                <p className="story-evidence">{story.evidence}</p>
                <Link className="text-link" href={`/work/${project.slug}/`}>Read the case study <ArrowIcon /></Link>
              </div>
            </article>;
          })}
        </div>
        <div className="work-bottom" id="archive"><p>More to explore, including <Link href="/work/health-for-all/">Health for All</Link> and machine learning projects.</p><Link className="text-link" href="/archive/">Browse all projects <ArrowIcon /></Link></div>
      </section>
      <AnalyticsShowcase />
      <section className="home-practice section-frame" id="practice" aria-labelledby="practice-title">
        <div className="home-about">
          <div className="home-about-photo"><Image unoptimized src={profile.portrait} alt="Almond Owolabi working at his laptop" fill sizes="(max-width:760px) 90vw, 32vw" /></div>
          <div><p className="eyebrow">02 / The person behind the work</p><h2 id="practice-title">Technical depth.<br /><em>A human context.</em></h2><p>My work spans disability inclusion, programme evidence, and commercial analytics. I care about what a team needs to understand, the quality of the evidence, and what happens after the dashboard is delivered.</p><div className="home-about-actions"><Link className="text-link" href="/about/">More about my experience <ArrowIcon /></Link><ResumeLink /></div><p className="home-toolkit">Python · SQL · Power BI · FastAPI · Gemini</p></div>
        </div>
        <div className="home-services" aria-label="How I can help">{services.map(service => <Link href="/services/" key={service.number}><span className="eyebrow">{service.number} / How I can help</span><h3>{service.title}<ArrowIcon /></h3><p>{service.body}</p></Link>)}</div>
      </section>
      <section className="contact-banner home-contact section-frame" id="contact" aria-labelledby="contact-title">
        <div className="contact-top"><p className="eyebrow">Let’s work on it</p><span><i className="status-dot" /> Let’s talk</span></div>
        <h2 id="contact-title">Have a reporting, analytics,<br /> <em>or automation problem?</em></h2>
        <p className="home-contact-intro">Tell me what your team needs to understand or improve.</p>
        <div className="contact-bottom"><ContactActions /><a className="contact-address" href={`mailto:${profile.email}`}>{profile.email}<ArrowIcon /></a></div>
        <div className="contact-socials"><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowIcon /></a><a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowIcon /></a><ResumeLink /></div>
      </section>
    </main><SiteFooter /><PortfolioIntro />
  </>;
}
