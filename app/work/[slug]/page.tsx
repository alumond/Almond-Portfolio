import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StructuredData } from "../../components/StructuredData";
import { siteOrigin } from "../../seo";
import { notFound } from "next/navigation";
import { profile, projects } from "../../data";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { CaseStudyNarrative } from "../../components/CaseStudyNarrative";
import { caseStudies } from "../../case-studies";
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
    openGraph: { title: `${project.title} · ${profile.name}`, description: project.longDescription, type: "article", url: `/work/${project.slug}/`, images: [{ url: project.image.src, alt: project.image.alt }] },
    twitter: { card: "summary_large_image", title: `${project.title} · ${profile.name}`, description: project.longDescription, images: [project.image.src] },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const study = caseStudies[project.slug];

  return (
    <>
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Almond Owolabi", item: `${siteOrigin}/` },
          { "@type": "ListItem", position: 2, name: project.title, item: `${siteOrigin}/work/${project.slug}/` },
        ],
      }} />
      <SiteHeader />
      <main id="main-content" className="case-study-page">
        <section className={`case-hero case-${project.accent} case-project-${project.slug} section-frame`}>
          <Link className="back-link" href="/#work">← Back to selected work</Link>
          <div className="case-hero-grid">
            <div>
              <p className="eyebrow">{project.kicker}</p>
              <h1>{project.title}</h1>
              <p className="case-lede">{project.longDescription}</p>
              {project.provenance && <p className="provenance">{project.provenance}. See the upstream attribution in the repository.</p>}
              <div className="case-actions">{study && <a className="button button-dark" href="#working-output">View working output <ArrowIcon /></a>}<a className={study ? "text-link" : "button button-dark"} href={project.github} target="_blank" rel="noreferrer">Open repository <ArrowIcon /></a><Link className="text-link" href="/contact">Discuss a similar problem <ArrowIcon /></Link></div>
            </div>
            <div className="case-mark case-mark-image">
              <Image unoptimized src={project.image.src} alt={project.image.alt} fill priority sizes="(max-width: 620px) 70vw, 28vw" />
              {project.slug !== "health-for-all" && project.slug !== "monitoring-and-evaluation-agent" && project.slug !== "linkedin-ai-agent" && <><span className="case-mark-shade" aria-hidden="true" /><span className="case-mark-label">{project.kind}</span><strong>{project.shortTitle}</strong></>}
            </div>
          </div>
        </section>

        {study ? <CaseStudyNarrative project={project} study={study} /> : <>
          <section className="case-overview section-frame">
            <div className="case-overview-label"><span>Project note</span><span>Read / {project.slug}</span></div>
            <div className="case-overview-copy"><p className="display-copy">{project.description}</p><div className="case-stack"><span>Stack</span><div>{project.stack.map((item) => <b key={item}>{item}</b>)}</div></div></div>
          </section>
          <SystemWorkflow slug={project.slug} />
          <section className="case-sections section-frame">
            {project.sections.map((section, index) => <article className="case-section" key={section.title}><span className="section-number">0{index + 1} /</span><div><h2>{section.title}</h2><p>{section.body}</p></div></article>)}
          </section>
          <section className="case-outcomes section-frame">
            <div><p className="eyebrow">Project scope</p><h2>What the project contains.</h2></div>
            <div className="outcome-list">{project.outcomes.map((outcome, index) => <div key={outcome}><span>0{index + 1}</span><p>{outcome}</p></div>)}</div>
          </section>
        </>}

        <section className="case-endcap section-frame">
          <div className="case-endcap-image"><Image unoptimized src={profile.portraitMono} alt="Almond Owolabi, data scientist and AI engineer" fill sizes="(max-width: 720px) 86vw, 32vw" /></div>
          <div><p className="eyebrow">Keep going</p><h2>Good work leaves a clearer path behind it.</h2><div className="case-actions"><Link className="button button-dark" href="/#work">Explore more work <ArrowIcon /></Link><ResumeLink /></div></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
