import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { profile, projects } from "../../data";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";

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
    openGraph: { title: `${project.title} · ${profile.name}`, description: project.longDescription, type: "article" },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <>
      <SiteHeader />
      <main className="case-study-page">
        <section className={`case-hero case-${project.accent} section-frame`}>
          <Link className="back-link" href="/#work">← Back to selected work</Link>
          <div className="case-hero-grid">
            <div>
              <p className="eyebrow">{project.kicker}</p>
              <h1>{project.title}</h1>
              <p className="case-lede">{project.longDescription}</p>
              <div className="case-actions"><a className="button button-dark" href={project.github} target="_blank" rel="noreferrer">Open repository ↗</a><Link className="text-link" href="/contact">Discuss a similar problem <span className="arrow">↗</span></Link></div>
            </div>
            <div className="case-mark" aria-hidden="true"><span>{project.kind}</span><strong>{project.shortTitle}</strong><i /><i /><i /></div>
          </div>
        </section>

        <section className="case-overview section-frame">
          <div className="case-overview-label"><span>Project note</span><span>Read / {project.slug}</span></div>
          <div className="case-overview-copy"><p className="display-copy">{project.description}</p><div className="case-stack"><span>Stack</span><div>{project.stack.map((item) => <b key={item}>{item}</b>)}</div></div></div>
        </section>

        <section className="case-sections section-frame">
          {project.sections.map((section, index) => <article className="case-section" key={section.title}><span className="section-number">0{index + 1} /</span><div><h2>{section.title}</h2><p>{section.body}</p></div></article>)}
        </section>

        <section className="case-outcomes section-frame">
          <div><p className="eyebrow">What is visible</p><h2>From implementation to consequence.</h2></div>
          <div className="outcome-list">{project.outcomes.map((outcome, index) => <div key={outcome}><span>0{index + 1}</span><p>{outcome}</p></div>)}</div>
        </section>

        <section className="case-endcap section-frame">
          <div className="case-endcap-image"><Image src={profile.portraitMono} alt="Almond Owolabi, data scientist and AI engineer" fill sizes="(max-width: 720px) 86vw, 32vw" /></div>
          <div><p className="eyebrow">Keep going</p><h2>Good work leaves a clearer path behind it.</h2><Link className="button button-dark" href="/#work">Explore more work ↗</Link></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

