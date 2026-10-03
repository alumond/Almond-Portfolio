import type { ReactNode } from "react";
import type { CaseStudy } from "../case-studies";
import type { Project } from "../data";
import { ArrowIcon } from "./ArrowIcon";
import { CaseStudyOutputs } from "./CaseStudyOutputs";
import { SystemWorkflow } from "./SystemWorkflow";

const chapters = [
  ["problem", "The problem"],
  ["my-role", "My role"],
  ["constraints", "Constraints"],
  ["decisions", "Key decisions"],
  ["working-output", "Working output"],
  ["evaluation", "Evaluation"],
  ["limitations", "Limitations"],
] as const;

function Chapter({ index, children }: { index: number; children: ReactNode }) {
  const [id, title] = chapters[index];
  return <section id={id} className="case-chapter section-frame" aria-labelledby={`${id}-title`}>
    <header><span className="eyebrow">0{index + 1} / Case study</span><h2 id={`${id}-title`}>{title}</h2></header>
    <div className="case-chapter-body">{children}</div>
  </section>;
}

export function CaseStudyNarrative({ project, study }: { project: Project; study: CaseStudy }) {
  return <div className="case-narrative">
    <dl className="case-facts section-frame">
      <div><dt>Ownership</dt><dd>{study.role}</dd></div>
      <div><dt>Current evidence</dt><dd>{study.status}</dd></div>
      <div><dt>Tools</dt><dd>{project.stack.slice(0, 4).join(" · ")}</dd></div>
    </dl>
    <nav className="case-chapter-nav section-frame" aria-label="Case study chapters">
      {chapters.map(([id, title], index) => <a href={`#${id}`} key={id}><span aria-hidden="true">0{index + 1}</span>{title}</a>)}
    </nav>
    <Chapter index={0}><p className="case-chapter-lede">{study.problem}</p><p className="case-audience"><strong>Designed for</strong> {study.audience}</p></Chapter>
    <Chapter index={1}><p className="case-role">I built this project independently.</p><ul className="case-detail-list">{study.contributions.map(item => <li key={item}>{item}</li>)}</ul></Chapter>
    <Chapter index={2}><ul className="case-detail-list">{study.constraints.map(item => <li key={item}>{item}</li>)}</ul></Chapter>
    <Chapter index={3}>
      <div className="case-decisions">{study.decisions.map((decision, index) => <article key={decision.title}><span className="case-decision-number">0{index + 1}</span><div><h3>{decision.title}</h3><p>{decision.reasoning}</p><p className="case-tradeoff"><strong>The trade-off</strong> {decision.tradeoff}</p></div></article>)}</div>
    </Chapter>
    <div className="case-architecture"><SystemWorkflow slug={project.slug} /></div>
    <Chapter index={4}><p>{study.output}</p></Chapter>
    <div className={`case-output-gallery case-output-${project.slug}`}><CaseStudyOutputs project={project} /></div>
    <Chapter index={5}>
      <p>{study.evaluation}</p>
      <div className="case-evidence-grid">{study.evidence.map(item => <article className="case-evidence-card" key={item.label}>
        <p className="case-evidence-basis">{item.basis}</p><strong className="case-evidence-value">{item.value}</strong><h3>{item.label}</h3><p>{item.detail}</p>
        {item.href && <a href={item.href} className="text-link">Inspect evidence <ArrowIcon /></a>}
      </article>)}</div>
      <details className="case-reproduce"><summary>{study.reproduce.title}<span aria-hidden="true">+</span></summary><div><ol>{study.reproduce.steps.map(step => <li key={step}>{step}</li>)}</ol>{study.reproduce.command && <pre><code>{study.reproduce.command}</code></pre>}<div className="case-source-links">{study.reproduce.links.map(link => <a href={link.href} key={link.href}>{link.label}<ArrowIcon /></a>)}</div></div></details>
    </Chapter>
    <Chapter index={6}><ul className="case-detail-list case-limit-list">{study.limitations.map(item => <li key={item}>{item}</li>)}</ul></Chapter>
    <aside className="case-source-note section-frame" aria-label="Case study sources"><p>Evidence reviewed 3 October 2026. Ownership and usage statements are attributed to Almond; executed checks and source inspections are labelled separately.</p><div className="case-source-links">{study.sources.map(source => <a key={source.href} href={source.href}>{source.label}<ArrowIcon /></a>)}</div></aside>
  </div>;
}
