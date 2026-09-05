import { ArrowIcon } from "./ArrowIcon";

const flows: Record<string, { title: string; note: string; steps: [string, string][] }> = {
  'monitoring-and-evaluation-agent': { title: 'From workbook to follow-through.', note: 'Deterministic analytics ground the narrative. Reports and escalations follow separate paths.', steps: [['01 / INPUT','Google Sheets'],['02 / ANALYSIS','KPI · risk · budget'],['03 / REASONING','Structured narrative'],['04 / ACTION','Report & escalation']] },
  'linkedin-ai-agent': { title: 'Research. Review. Publish.', note: 'The staged review flow publishes the exact approved text and visual.', steps: [['01 / DISCOVER','Grounded research'],['02 / CREATE','Post & visual'],['03 / REVIEW','Preview & validate'],['04 / PUBLISH','LinkedIn API']] },
  'job-application-agent': { title: 'Automation with a human checkpoint.', note: 'Applications move to submission only after per-role approval and configured consent.', steps: [['01 / DISCOVER','Search job sources'],['02 / ASSESS','Rank role fit'],['03 / PREPARE','Tailor application'],['04 / APPROVE','Review & submit']] },
  'afrimedqa-fine-tuning': { title: 'Two paths. A clear distinction.', note: 'The fine-tuning pipeline exports a LoRA adapter. The web and Telegram demonstrations use Gemini directly.', steps: [['TRAINING / DATA','AfriMedQA'],['TRAINING / OUTPUT','QLoRA → adapter'],['CHAT / MODEL','Gemini API'],['CHAT / INTERFACE','Streamlit · Telegram']] },
};

export function SystemWorkflow({ slug }: { slug: string }) {
  const flow = flows[slug];
  if (!flow) return null;
  return <section className="workflow-section section-frame"><p className="eyebrow">System architecture</p><h2>{flow.title}</h2><ol className={`workflow-steps ${slug==='afrimedqa-fine-tuning'?'workflow-two-paths':''}`}>{flow.steps.map(([label, title], i)=><li key={label}><span>{label}</span><strong>{title}</strong>{i<flow.steps.length-1&&<ArrowIcon/>}</li>)}</ol><p className="workflow-note">{flow.note}</p></section>;
}
