"use client";

import { useState } from "react";
import { archiveRepos, githubSnapshot } from "../data";
import { ArrowIcon } from "./ArrowIcon";

export function RepositoryArchive() {
  const [query, setQuery] = useState("");
  const repositories = archiveRepos.filter(repo => `${repo.name} ${repo.description} ${repo.language}`.toLowerCase().includes(query.toLowerCase()));
  return <section className="archive-section repository-collection section-frame" id="repositories" aria-labelledby="archive-title">
    <div className="section-heading"><div><p className="eyebrow">Open source / Repository index</p><h2 id="archive-title">Code and experiments.</h2></div><p>{githubSnapshot.publicRepos} public repositories in the September 2026 snapshot. Original builds, collaborations, forks, and studies.</p></div>
    <label className="archive-search">Find a repository<input type="search" placeholder="Search projects, tools, or topics…" value={query} onChange={event => setQuery(event.target.value)} /></label>
    <p className="search-count" role="status">{repositories.length} repositories</p>
    <div className="archive-table">{repositories.map(repo => <a className="archive-row" href={repo.github} target="_blank" rel="noreferrer" key={repo.name}><span><strong>{repo.name}</strong><small>{repo.description}</small></span><span className="archive-kind">{repo.fork ? "Fork / study" : repo.language}<ArrowIcon /></span></a>)}</div>
    {repositories.length === 0 && <p className="empty-state">No repositories match “{query}”. Try another project name or tool.</p>}
  </section>;
}
