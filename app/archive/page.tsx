import Link from "next/link";
import { projects } from "../data";
import { pageMetadata } from "../seo";
import { ArrowIcon } from "../components/ArrowIcon";
import { RepositoryArchive } from "../components/RepositoryArchive";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

export const metadata = pageMetadata("Project archive", "Explore Almond Owolabi’s full collection of AI systems, dashboards, analytics projects, and open-source studies.", "/archive/");

export default function ArchivePage() {
  return <><SiteHeader /><main id="main-content" className="project-archive">
    <section className="archive-intro section-frame"><Link className="text-link" href="/#work">← Back to selected work</Link><p className="eyebrow">The wider collection</p><h1>Always <em>building.</em></h1><p>Original systems, analytical studies, and open-source explorations. Start with a case study or search the repository collection.</p></section>
    <section className="archive-case-studies section-frame" aria-labelledby="archive-cases-title"><h2 id="archive-cases-title">Explore the case studies</h2><div>{projects.map(project => <Link href={`/work/${project.slug}/`} key={project.slug}><span>{project.kind}{project.provenance ? " · Fork / study" : ""}</span><h3>{project.title}<ArrowIcon /></h3><p>{project.description}</p></Link>)}</div></section>
    <RepositoryArchive />
  </main><SiteFooter /></>;
}
