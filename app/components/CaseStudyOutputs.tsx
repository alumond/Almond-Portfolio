import type { Project } from "../data";
import { AnalyticsShowcase } from "./AnalyticsShowcase";
import { ProjectGallery } from "./ProjectGallery";

export function CaseStudyOutputs({ project }: { project: Project }) {
  switch (project.slug) {
    case "monitoring-and-evaluation-agent":
      return <ProjectGallery title="Report intelligence. Escalation with accountability." images={[
        { ...project.image, caption: "Report example: actual performance, target achievement, implementation status, risks, issues, and budget. These figures illustrate the report output, not software impact." },
        { src: "/images/project-me-escalation.png", alt: "M&E escalation example with findings and a corrective action plan", caption: "Separate escalation example: findings, evidence, owners, actions, due dates, and a management ask." },
      ]} />;
    case "linkedin-ai-agent":
      return <ProjectGallery title="Inside LinkedIn Studio." images={[
        { ...project.image, caption: "The running LinkedIn Studio review desk, captured 3 October 2026. Its publication history shows 39 tracked posts. No draft is waiting for review in this capture." },
        { src: "/images/project-linkedin-output.png", alt: "Prepared LinkedIn content visual connecting data to decisions", caption: "Example artwork prepared for the publishing workflow. This is an output example, separate from the application screen above." },
      ]} />;
    case "health-for-all":
      return <ProjectGallery title="Clinical guidance, made easier to act on." images={[{ ...project.image, caption: "Health for All. A guidance demonstration, not a clinical diagnosis or emergency service." }]} />;
    case "retail-revenue-command-center":
      return <><AnalyticsShowcase embedded /><ProjectGallery title="The dashboard, in detail." images={[{ ...project.image, caption: "Retail Revenue Leakage Review. Portfolio demonstration using synthetic data." }]} /></>;
    case "health-access-for-pwds":
      return <ProjectGallery title="The dashboard, in detail." images={[{ ...project.image, caption: "Healthcare access dashboard. Interactive demonstration records reconstructed from aggregate profiles; not original respondent-level observations or population estimates." }]} />;
    default:
      return null;
  }
}
