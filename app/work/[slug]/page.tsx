import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { profile, projects } from "../../data";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { AnalyticsShowcase } from "../../components/AnalyticsShowcase";
import { ProjectGallery } from "../../components/ProjectGallery";
import { SystemWorkflow } from "../../components/SystemWorkflow";
import { ResumeLink } from "../../components/ResumeLink";
import { ArrowIcon } from "../../components/ArrowIcon";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} · ${profile.name}`,
    description: project.longDescription,
    keywords: [project.kind, ...project.stack, "Almond Owolabi", "data scientist", "AI engineer"],
    alternates: { canonical: `/work/${project.slug}/` },
    openGraph: { title: `${project.title} · ${profile.name}`, description: project.longDescription, type: "article", images: [{ url: project.image.src, alt: project.image.alt }] },
    twitter: { card: "summary_large_image", title: `${project.title} · ${profile.name}`, description: project.longDescription, images: [project.image.src] },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="case-study-page">
        <section className={`case-hero case-${project.accent} section-frame`}>
          <Link className="back-link" href="/#work">← Back to selected work</Link>
          <div className="case-hero-grid">
            <div>
              <p className="eyebrow">{project.kicker}</p>
              <h1>{project.title}</h1>
              <p className="case-lede">{project.longDescription}</p>
              {project.provenance && <p className="provenance">{project.provenance}. See the upstream attribution in the repository.</p>}
              <div className="case-actions"><a className="button button-dark" href={project.github} target="_blank" rel="noreferrer">Open repository <ArrowIcon /></a><Link className="text-link" href="/contact">Discuss a similar problem <ArrowIcon /></Link></div>
            </div>
            <div className="case-mark case-mark-image">
              <Image unoptimized src={project.image.src} alt={project.image.alt} fill priority sizes="(max-width: 620px) 70vw, 28vw" />
              <span className="case-mark-shade" aria-hidden="true" />
              <span className="case-mark-label">{project.kind}</span>
              <strong>{project.shortTitle}</strong>
            </div>
          </div>
        </section>

        <section className="case-overview section-frame">
          <div className="case-overview-label"><span>Project note</span><span>Read / {project.slug}</span></div>
          <div className="case-overview-copy"><p className="display-copy">{project.description}</p><div className="case-stack"><span>Stack</span><div>{project.stack.map((item) => <b key={item}>{item}</b>)}</div></div></div>
        </section>

        <SystemWorkflow slug={project.slug} />
        {project.slug === "retail-revenue-command-center" && <AnalyticsShowcase embedded />}
        {(project.slug === "retail-revenue-command-center" || project.slug === "health-access-for-pwds") && <ProjectGallery title="The dashboard, in detail." images={[{ ...project.image, caption: project.slug === "retail-revenue-command-center" ? "Retail Revenue Leakage Review. Portfolio demonstration using synthetic data." : "Healthcare access dashboard. Respondent-sample diagnostics, not population estimates." }]} />}
        {project.slug === "linkedin-ai-agent" && <ProjectGallery title="Visuals prepared for the publishing workflow." images={[{ src: "/images/project-linkedin-output.png", alt: "Raw CSV to clean KPI to action content visual", caption: "A prepared content visual connecting data preparation to decisions." }, { src: "/images/project-escalation-story.png", alt: "Dashboard escalation rule content visual", caption: "A second prepared visual: turning dashboard signals into escalation rules." }]} />}
        <section className="case-sections section-frame">
          {project.sections.map((section, index) => <article className="case-section" key={section.title}><span className="section-number">0{index + 1} /</span><div><h2>{section.title}</h2><p>{section.body}</p></div></article>)}
        </section>

        <section className="case-outcomes section-frame">
          <div><p className="eyebrow">What is visible</p><h2>From implementation to consequence.</h2></div>
          <div className="outcome-list">{project.outcomes.map((outcome, index) => <div key={outcome}><span>0{index + 1}</span><p>{outcome}</p></div>)}</div>
        </section>

        <section className="case-endcap section-frame">
          <div className="case-endcap-image"><Image unoptimized src={profile.portraitMono} alt="Almond Owolabi, data scientist and AI engineer" fill sizes="(max-width: 720px) 86vw, 32vw" /></div>
          <div><p className="eyebrow">Keep going</p><h2>Good work leaves a clearer path behind it.</h2><div className="case-actions"><Link className="button button-dark" href="/#work">Explore more work <ArrowIcon /></Link><ResumeLink /></div></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
