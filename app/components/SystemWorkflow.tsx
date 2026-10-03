import { ArrowIcon } from "./ArrowIcon";

const flows: Record<string, { title: string; note: string; steps: [string, string][] }> = {
  'monitoring-and-evaluation-agent': { title: 'From workbook to follow-through.', note: 'Deterministic analytics ground the narrative. Reports and escalations follow separate paths.', steps: [['01 / INPUT','Google Sheets'],['02 / ANALYSIS','KPI · risk · budget'],['03 / REASONING','Structured narrative'],['04 / ACTION','Report & escalation']] },
  'linkedin-ai-agent': { title: 'Research. Review. Publish.', note: 'The staged review flow publishes the exact approved text and visual.', steps: [['01 / DISCOVER','Grounded research'],['02 / CREATE','Post & visual'],['03 / REVIEW','Preview & validate'],['04 / PUBLISH','LinkedIn API']] },
  'job-application-agent': { title: 'Automation with a human checkpoint.', note: 'Applications move to submission only after per-role approval and configured consent.', steps: [['01 / DISCOVER','Search job sources'],['02 / ASSESS','Rank role fit'],['03 / PREPARE','Tailor application'],['04 / APPROVE','Review & submit']] },
  'health-for-all': { title: 'Symptoms in. Safer next steps out.', note: 'Health for All structures model output around urgency, practical action, cautions, and warning signs. It supports decision-making but does not replace clinical diagnosis.', steps: [['01 / INPUT','Describe symptoms'],['02 / SAFETY','Urgency & red flags'],['03 / GUIDANCE','Do now · avoid'],['04 / NEXT STEP','Test · clinic · emergency']] },
};

export function SystemWorkflow({ slug }: { slug: string }) {
  const flow = flows[slug];
  if (!flow) return null;
  return <section className="workflow-section section-frame"><p className="eyebrow">System architecture</p><h2>{flow.title}</h2><ol className="workflow-steps">{flow.steps.map(([label, title], i)=><li key={label}><span>{label}</span><strong>{title}</strong>{i<flow.steps.length-1&&<ArrowIcon/>}</li>)}</ol><p className="workflow-note">{flow.note}</p></section>;
}
