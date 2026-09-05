export type ProjectKind = "M&E" | "Analytics" | "Machine learning" | "AI systems" | "Dashboards";

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  kind: ProjectKind;
  kicker: string;
  description: string;
  longDescription: string;
  stack: string[];
  github: string;
  featured: boolean;
  provenance?: string;
  live?: string;
  accent: "brick" | "blue" | "lichen" | "ink";
  image: {
    src: string;
    alt: string;
  };
  outcomes: string[];
  sections: Array<{
    title: string;
    body: string;
  }>;
};

export const profile = {
  name: "Almond Owolabi",
  role: "Data Scientist · AI Engineer",
  location: "Lagos / Abuja, Nigeria",
  email: "almond.owolabi01@gmail.com",
  phone: "+234 810 310 9645",
  github: "https://github.com/alumond",
  linkedin: "https://ng.linkedin.com/in/almond-owolabi-515a4a1b2",
  resume: "/assets/Almond_Owolabi_Resume.pdf",
  portrait: "/images/almond-working.jpeg",
  portraitMono: "/images/almond-profile.jpeg",
};

export const services = [
  {
    number: "01",
    title: "M&E reporting & intelligence",
    body: "Turn fragmented operational data into clear reporting, accountable performance, and decisions that can move this week.",
    tags: ["M&E intelligence", "KPI systems", "Donor reporting"],
  },
  {
    number: "02",
    title: "Data analytics & dashboards",
    body: "Design dashboards, data models, and analytical workflows that make complex evidence understandable to technical and non-technical teams.",
    tags: ["Power BI", "Tableau", "SQL", "Python"],
  },
  {
    number: "03",
    title: "Applied machine learning",
    body: "Build practical predictive systems from clean problem framing to deployable models, with interpretation and operational use in mind.",
    tags: ["Segmentation", "Forecasting", "Classification"],
  },
  {
    number: "04",
    title: "AI workflow automation",
    body: "Connect APIs, language models, databases, and reporting layers into useful automation—not demos that stop at the notebook.",
    tags: ["RAG", "FastAPI", "LLM workflows", "Automation"],
  },
];

export const experience = [
  {
    period: "2024 — now",
    role: "Data Analyst",
    company: "Stanforte Edge",
    place: "Lagos, Nigeria · remote",
    body: "Managed the data lifecycle for the Access 360 Disability Data Centre, developed state-level inclusion analysis, and translated findings into advocacy and policy recommendations.",
  },
  {
    period: "2021 — 2022",
    role: "Data Scientist",
    company: "HACEY",
    place: "Nigeria",
    body: "Built predictive segmentation models and data pipelines for the HACEY FEED programme, pairing Python and SQL workflows with mobile-first data collection, dashboards, and evidence-based programme design.",
  },
  {
    period: "Earlier work",
    role: "Data & research intern",
    company: "Nigeria Mental Health",
    place: "Abuja, Nigeria",
    body: "Supported the collection, cleaning, and analysis of survey and clinical data for mental-health research, policy advocacy, and programme objectives.",
  },
];

export const skills = [
  "Python",
  "Pandas / NumPy",
  "Scikit-learn",
  "SQL",
  "PostgreSQL",
  "MySQL",
  "Power BI",
  "Tableau",
  "Microsoft Excel",
  "FastAPI",
  "Flask",
  "Streamlit",
  "LangChain",
  "Ollama",
  "ChromaDB",
  "KoboToolbox / ODK",
  "ETL & APIs",
  "Data quality & governance",
];

export const projects: Project[] = [
{
  "slug": "retail-revenue-command-center",
  "title": "Retail Revenue & Operations Command Center",
  "shortTitle": "Retail command centre",
  "kind": "Analytics",
  "kicker": "Business intelligence · 2026",
  "description": "A commercial command centre connecting revenue, customer retention, margin pressure, and the decisions that follow.",
  "longDescription": "A Python-generated executive dashboard that brings revenue quality, product performance, customer retention, and operational risk into one view. Built on a clearly labelled synthetic retail dataset.",
  "stack": [
    "Python",
    "HTML / CSS",
    "CSV / JSON",
    "Excel"
  ],
  "github": "https://github.com/alumond/linkedin-AI-Agent/tree/main/projects/retail-revenue-command-center",
  "featured": true,
  "accent": "lichen",
  "image": {
    "src": "/images/project-retail.png",
    "alt": "Retail revenue dashboard with commercial KPIs, trends, and margin analysis"
  },
  "outcomes": [
    "2,160 synthetic records",
    "18 months of operational data",
    "5 regions · 4 sales channels"
  ],
  "sections": [
    {
      "title": "The business question",
      "body": "Is revenue growth supported by healthy profit? The dashboard connects category and channel performance to retention, returns, fulfillment delays, and stockout risk so leaders can identify where to investigate next."
    },
    {
      "title": "From dataset to decision",
      "body": "A reproducible Python workflow generates the dataset and dashboard outputs. The executive view includes KPI cards, revenue and gross-profit trends, category rankings, channel mix, regional performance, and recommended management actions."
    },
    {
      "title": "A transparent demonstration",
      "body": "The 2,160 rows are synthetic, spanning 18 months, five regions, four channels, and six product categories. This is a portfolio demonstration of analytical design and business reasoning; the figures do not represent client results."
    }
  ]
},
{
  "slug": "linkedin-ai-agent",
  "title": "LinkedIn AI Agent",
  "shortTitle": "LinkedIn AI Agent",
  "kind": "AI systems",
  "kicker": "Research & content automation · 2026",
  "description": "From sourced research to a reviewable post: an AI publishing workflow with grounding, visual checks, and publication history.",
  "longDescription": "A Python agent that researches Data and AI topics using Gemini Search grounding, drafts sourced LinkedIn posts, pairs them with topic-specific visuals, and supports staged review and scheduled publishing.",
  "stack": [
    "Python",
    "Gemini",
    "LinkedIn API",
    "GitHub Actions"
  ],
  "github": "https://github.com/alumond/linkedin-AI-Agent",
  "featured": true,
  "accent": "blue",
  "image": {
    "src": "/images/project-linkedin-output.png",
    "alt": "Example decision-storytelling visual prepared for the LinkedIn AI Agent"
  },
  "outcomes": [
    "Search-grounded research",
    "Exact-preview publishing",
    "Source, image & duplication checks"
  ],
  "sections": [
    {
      "title": "A complete publishing workflow",
      "body": "The agent connects current-topic research, source-grounded writing, visual validation, and LinkedIn publishing. A scheduled GitHub Actions workflow supports weekday runs and keeps a publication history."
    },
    {
      "title": "Review the exact output",
      "body": "Preview mode stages the exact text and image for review. The publish-preview command publishes that staged version without regenerating it. An independent dry-run path prepares and validates content without contacting publishing endpoints."
    },
    {
      "title": "Checks before publication",
      "body": "The workflow skips publication when sources are missing, topic confidence is low, a topic was recently covered, the visual fails validation, or the LinkedIn token has expired. The default image workflow uses prepared, topic-specific assets."
    }
  ]
},
{
  "slug": "afrimedqa-fine-tuning",
  "title": "AfriMedQA Fine-Tuning & Chatbot",
  "shortTitle": "AfriMedQA",
  "kind": "Machine learning",
  "kicker": "Applied language models · 2026",
  "description": "A Colab-first QLoRA training pipeline, with separate Gemini-powered Streamlit and Telegram interfaces.",
  "longDescription": "An AfriMedQA model-training workflow that turns a notebook into a reusable fine-tuning pipeline, alongside Gemini-powered conversational demonstrations for web and Telegram.",
  "stack": [
    "Python",
    "QLoRA",
    "Streamlit",
    "Gemini",
    "Telegram"
  ],
  "github": "https://github.com/alumond/Activity-1",
  "featured": true,
  "accent": "brick",
  "image": {
    "src": "/images/project-health-access.jpg",
    "alt": "Stethoscope and laptop representing the medical question-answering research domain"
  },
  "outcomes": [
    "Data preview & training commands",
    "LoRA adapter export",
    "Web & Telegram demonstrations"
  ],
  "sections": [
    {
      "title": "From notebook to pipeline",
      "body": "The repository separates training from the interface. A Colab-oriented pipeline provides dataset previews, a small training smoke test, and full QLoRA fine-tuning with an exported LoRA adapter."
    },
    {
      "title": "Two distinct model paths",
      "body": "The Streamlit chatbot and Telegram webhook call Gemini directly. They do not serve the fine-tuned Llama adapter. This distinction keeps the training experiment and the deployed demonstration accurately documented."
    },
    {
      "title": "Designed as a demonstration",
      "body": "The chatbot is a research and decision-support demonstration, not a clinically validated service. The Telegram integration supports optional recent-message memory with a seven-day expiry when a compatible key-value store is configured."
    }
  ]
},
{
  "slug": "job-application-agent",
  "title": "Job Application Agent",
  "shortTitle": "Job Application Agent",
  "kind": "AI systems",
  "kicker": "Workflow automation · 2026",
  "description": "A role-discovery and application workflow that ranks opportunities, prepares tailored packets, and keeps submission under human review.",
  "longDescription": "A Python application agent that searches public job sources, scores role fit, produces tailored application materials, and tracks approvals and submission outcomes.",
  "stack": [
    "Python",
    "Job APIs",
    "Gmail API",
    "PDF"
  ],
  "github": "https://github.com/alumond/Job-Agent",
  "featured": false,
  "accent": "ink",
  "image": {
    "src": "/images/project-hr-analytics.jpg",
    "alt": "Team discussing work around a laptop"
  },
  "outcomes": [
    "Ranked roles with rationale",
    "Tailored resume & cover letter packets",
    "Per-role approval & submission tracking"
  ],
  "sections": [
    {
      "title": "Discovery to preparation",
      "body": "The agent searches job sources, ranks opportunities against a configured profile, and generates ATS-oriented resume drafts, recruiter-ready PDFs, cover letters, and application briefs."
    },
    {
      "title": "Human review remains central",
      "body": "Each role enters a review queue. Preparation for submission and email sending require a role-specific approval and configured consent. Duplicate-send checks and a submission tracker record what has already been sent."
    },
    {
      "title": "An expanded outreach workflow",
      "body": "The repository also includes prospect discovery, relevance scoring, personalized outreach packets, and a daily scheduler. These share the same review-first approach, with approval required before sending."
    }
  ]
},
  {
    slug: "monitoring-and-evaluation-agent",
    title: "M&E Intelligence Engine",
    shortTitle: "M&E Intelligence Engine",
    kind: "M&E",
    kicker: "Operational intelligence · 2026",
    description: "An intelligence backend that turns programme workbooks into donor-ready reports, decisions, and escalations.",
    longDescription: "A monitoring and evaluation intelligence platform that connects to Google Sheets, normalizes programme state, computes deterministic analytics, and generates an accountable next action for the people who need it.",
    stack: ["Python", "FastAPI", "Google Sheets", "Gemini", "SQLite", "SMTP"],
    github: "https://github.com/alumond/Monitoring-and-Evaluation-Agent",
    featured: true,
    accent: "brick",
    image: {
      src: "/images/project-me-intelligence.jpg",
      alt: "Hands working on a laptop with a detailed spreadsheet open in an office",
    },
    outcomes: ["Full workbook analysis", "Donor-grade PDF output", "Separate escalation workflow"],
    sections: [
      { title: "The premise", body: "Programme data should not end as a static spreadsheet. This system treats a workbook as an operational surface: it classifies sheets, normalizes project state, detects performance gaps, and decides whether the next action is a report, alert, escalation, recommendation, or a recorded no-op." },
      { title: "How it works", body: "A reusable intelligence cycle receives triggers or runs autonomously. Deterministic analytics cover schedule, KPI, risk, dependency, budget, and data quality. Gemini Flash 2.5 Lite is given structured summaries rather than raw spreadsheet rows, keeping the reasoning layer bounded and auditable." },
      { title: "Built for follow-through", body: "The engine exports branded PDFs, sends stakeholder emails, records an audit trail in SQLite, writes recommendations back to a workbook when enabled, and can create calendar reminders for corrective action. Its dry-run mode makes the decision policy safe to test before enabling live actions." },
    ],
  },
  {
    slug: "health-access-for-pwds",
    title: "Health Access for Persons with Disabilities",
    shortTitle: "Health access dashboard",
    kind: "Dashboards",
    kicker: "Inclusive health · 2026",
    description: "An interactive M&E dashboard that turns reported access barriers into a clear prioritisation conversation.",
    longDescription: "A static web dashboard for exploring healthcare access barriers reported by persons with disabilities in Nigeria, with target-aware KPIs, state rankings, barrier exposure, qualitative themes, and executive action recommendations.",
    stack: ["HTML", "CSS", "JavaScript", "M&E analytics", "Data quality"],
    github: "https://github.com/alumond/Health-Access-for-PWDs",
    featured: true,
    accent: "lichen",
    image: {
      src: "/images/project-health-dashboard.png",
      alt: "Healthcare access dashboard showing survey indicators, barriers, and recommendations",
    },
    outcomes: ["Filterable by state and disability group", "Target-aware KPI cards", "Donor-ready action framing"],
    sections: [
      { title: "The question", body: "Where are access barriers most visible, which groups face the highest exposure, and which service-readiness gaps need attention first? The dashboard is structured around the decisions a programme manager or M&E lead actually needs to make." },
      { title: "The translation layer", body: "Survey responses are cleaned and normalized into a visual surface that keeps actual values and target performance together. State ranking, facility utilization, response trends, heatmaps, and recommendation themes help a reader move from signal to action." },
      { title: "The data boundary", body: "Figures are explicitly framed as respondent-sample diagnostics for M&E prioritisation and donor discussion—not population prevalence estimates. This is a small but important choice: useful evidence should come with an honest boundary around what it can prove." },
    ],
  },
  {
    slug: "hr-analytics-nexus",
    title: "HR Analytics Nexus",
    shortTitle: "HR Analytics Nexus",
    kind: "Analytics",
    kicker: "Workforce intelligence · 2024",
    description: "A MySQL and Power BI workflow for understanding workforce composition, tenure, geography, and turnover.",
    longDescription: "An HR analytics project built around more than 22,000 rows, cleaned and analyzed in MySQL Workbench, then turned into a Power BI narrative for strategic people decisions.",
    stack: ["MySQL", "Power BI", "Data cleaning", "Turnover analysis"],
    github: "https://github.com/alumond/HR-Analytics-Nexus",
    featured: false,
    provenance: "Forked repository · learning & exploration",
    accent: "blue",
    image: {
      src: "/images/project-hr-analytics.jpg",
      alt: "A workplace team gathered around a laptop during an analytics discussion",
    },
    outcomes: ["22,000+ employee records", "967 invalid ages excluded", "1,599 future dates excluded"],
    sections: [
      { title: "The brief", body: "Make workforce patterns legible across gender, race, age, location, department, job title, tenure, and turnover. The work combines SQL cleaning and analysis with a dashboard layer designed for decision makers rather than database specialists." },
      { title: "The finding", body: "Marketing carried the highest turnover rate in the analyzed sample, while Research and Development, Support, and Legal were among the lowest. Legal and Auditing showed the highest tenure, with Services, Sales, and Marketing among the lowest." },
      { title: "The discipline", body: "The analysis removed 967 records with negative ages and excluded 1,599 term dates that extended into the future. These decisions are recorded as limitations, keeping the dashboard persuasive without pretending the source data was cleaner than it was." },
    ],
  },
  {
    slug: "rag-api",
    title: "Local RAG API",
    shortTitle: "Local RAG API",
    kind: "AI systems",
    kicker: "Retrieval-augmented generation · 2024",
    description: "A local-first retrieval workflow that pairs Llama 3 with LangChain, ChromaDB, Ollama, and a Flask API.",
    longDescription: "A practical RAG implementation that keeps the model workflow close to the data: retrieve relevant context, compose a grounded response, and expose the experience through an API surface.",
    stack: ["Python", "Llama 3", "LangChain", "Ollama", "ChromaDB", "Flask"],
    github: "https://github.com/alumond/RAG",
    featured: false,
    provenance: "Forked repository · learning & exploration",
    accent: "ink",
    image: {
      src: "/images/project-rag-api.jpg",
      alt: "Code displayed on a development workstation for an API system",
    },
    outcomes: ["Local model runtime", "Vector retrieval layer", "Flask API surface"],
    sections: [
      { title: "The point", body: "RAG is most useful when it reduces the gap between a language model and a trusted body of information. This project focuses on the plumbing that makes that possible: local inference, retrieval, context assembly, and a service endpoint." },
      { title: "The architecture", body: "Llama 3 runs through Ollama, LangChain orchestrates the retrieval workflow, ChromaDB stores the vector layer, and Flask exposes the result as an API. The stack is intentionally inspectable and portable for teams that need more control over where information travels." },
      { title: "The next step", body: "The project provides a foundation for grounded assistants that can be connected to internal knowledge, health information, or operational documents—provided the source data and evaluation criteria are treated as seriously as the model." },
    ],
  },
  {
    slug: "loan-prediction-app",
    title: "Loan Approval Prediction App",
    shortTitle: "Loan prediction app",
    kind: "Machine learning",
    kicker: "Applied modelling · 2026",
    description: "A Streamlit interface that wraps a scikit-learn model into an interpretable loan approval probability workflow.",
    longDescription: "A small but complete applied machine-learning product: accept financial and demographic inputs, pass them through a trained scikit-learn pipeline, and return a probability-oriented decision surface.",
    stack: ["Python", "Scikit-learn", "Streamlit", "Feature engineering"],
    github: "https://github.com/alumond/loan-Prediction-App",
    featured: false,
    accent: "blue",
    image: {
      src: "/images/project-loan-prediction.jpg",
      alt: "Financial paperwork and calculator used for loan and approval analysis",
    },
    outcomes: ["Interactive input surface", "Trained ML pipeline", "Probability-led output"],
    sections: [
      { title: "The translation", body: "The project moves beyond a notebook by giving a model a user-facing interface. Financial and demographic inputs become a structured request, the pipeline transforms them, and the app returns a result that a non-technical user can understand." },
      { title: "The caution", body: "A probability is not a lending decision. Any production version would require calibration, fairness analysis, documented feature governance, and a clear separation between model output and human review." },
      { title: "The signal", body: "The value here is in the full path from data to model to interface—a compact demonstration of how applied machine learning becomes useful when it is made accessible and responsibly framed." },
    ],
  },
  {
    slug: "indicators",
    title: "Nigeria Development Indicators",
    shortTitle: "Development indicators",
    kind: "Analytics",
    kicker: "Economic signal · 2023",
    description: "A World Bank indicators exploration for Nigeria with predictive models for GDP, GNI, imports, and exports.",
    longDescription: "A development-data project that selects and explores country indicators, then tests predictive modelling against macroeconomic variables including GDP, GNI, and trade flows.",
    stack: ["Python", "World Bank data", "Regression", "Exploratory analysis"],
    github: "https://github.com/alumond/Indicators",
    featured: false,
    accent: "lichen",
    image: {
      src: "/images/project-development-indicators.jpg",
      alt: "Aerial view of Lagos roads and urban infrastructure",
    },
    outcomes: ["Nigeria-focused indicator selection", "GDP and GNI modelling", "Trade variable exploration"],
    sections: [
      { title: "The frame", body: "Development datasets become useful when the selection is intentional. This project narrows a broad World Bank indicator set into a Nigeria-focused exploration and creates a path from descriptive analysis to prediction." },
      { title: "The modelling question", body: "Can selected indicators help explain or predict movements in GDP, GNI, and import/export spending? The work treats modelling as an inquiry tool, not a magic answer, and keeps the emphasis on interpretation." },
      { title: "The relevance", body: "The project sits at the intersection of economic analysis, policy evidence, and practical data science—an area where clear framing matters as much as model choice." },
    ],
  },
];

export const githubSnapshot = { checked: "2026-09-05", publicRepos: 27 };

export const archiveRepos = [
  {
    "name": "linkedin-AI-Agent",
    "description": "Grounded publishing agent & retail analytics",
    "github": "https://github.com/alumond/linkedin-AI-Agent",
    "fork": false,
    "language": "Python",
    "updated": "2026-09-04"
  },
  {
    "name": "Almond-Portfolio",
    "description": "Almond Portfolio",
    "github": "https://github.com/alumond/Almond-Portfolio",
    "fork": false,
    "language": "TypeScript",
    "updated": "2026-08-26"
  },
  {
    "name": "Activity-1",
    "description": "AfriMedQA fine-tuning pipeline & Gemini chatbot",
    "github": "https://github.com/alumond/Activity-1",
    "fork": false,
    "language": "Jupyter Notebook",
    "updated": "2026-08-11"
  },
  {
    "name": "Job-Agent",
    "description": "Job discovery, tailored applications & review workflow",
    "github": "https://github.com/alumond/Job-Agent",
    "fork": false,
    "language": "Python",
    "updated": "2026-07-25"
  },
  {
    "name": "Job-Search-Agent",
    "description": "Job search Agent",
    "github": "https://github.com/alumond/Job-Search-Agent",
    "fork": false,
    "language": "Project files",
    "updated": "2026-07-22"
  },
  {
    "name": "Health-Access-for-PWDs",
    "description": "Dashboard",
    "github": "https://github.com/alumond/Health-Access-for-PWDs",
    "fork": false,
    "language": "JavaScript",
    "updated": "2026-05-31"
  },
  {
    "name": "Monitoring-and-Evaluation-Agent",
    "description": "Monitors programme indicators, detects when targets are being missed, determines root cause, recommends corrective actions, and escalates to the right person automatically. It also provides monthly report",
    "github": "https://github.com/alumond/Monitoring-and-Evaluation-Agent",
    "fork": false,
    "language": "Python",
    "updated": "2026-05-24"
  },
  {
    "name": "Agent",
    "description": "Agent Building",
    "github": "https://github.com/alumond/Agent",
    "fork": false,
    "language": "Python",
    "updated": "2026-05-18"
  },
  {
    "name": "loan-Prediction-App",
    "description": "Loan Approval Prediction App built with Streamlit and a Machine Learning pipeline. The app takes user financial and demographic inputs and predicts loan approval probability using a trained scikit-learn model.",
    "github": "https://github.com/alumond/loan-Prediction-App",
    "fork": false,
    "language": "Python",
    "updated": "2026-04-14"
  },
  {
    "name": "Data-Analysis-Dashboard",
    "description": "This repository contains a Data Analysis Dashboard built to support data exploration and decision-making. It integrates data cleaning, analysis, and visualization to present insights through dynamic charts and summary metrics. The project demonstrates practical applications of data analysis workflows and dashboard design.",
    "github": "https://github.com/alumond/Data-Analysis-Dashboard",
    "fork": false,
    "language": "Project files",
    "updated": "2026-01-19"
  },
  {
    "name": "health-chat",
    "description": "health chat",
    "github": "https://github.com/alumond/health-chat",
    "fork": true,
    "language": "Project files",
    "updated": "2024-10-26"
  },
  {
    "name": "rag-tutorial-v2",
    "description": "An Improved Langchain RAG Tutorial (v2) with local LLMs, database updates, and testing.",
    "github": "https://github.com/alumond/rag-tutorial-v2",
    "fork": true,
    "language": "Project files",
    "updated": "2024-08-03"
  },
  {
    "name": "RAG",
    "description": "Rag (Retreival Augmented Generation) Python solution with llama3, LangChain, Ollama and ChromaDB in a Flask API based solution",
    "github": "https://github.com/alumond/RAG",
    "fork": true,
    "language": "Project files",
    "updated": "2024-06-03"
  },
  {
    "name": "HR-Analytics-Nexus",
    "description": "Experience the synergy of MySQL and PowerBI in our HR Analytics Nexus. Streamline HR processes with dynamic dashboards, actionable insights, and strategic decision-making. Elevate your HR game today!",
    "github": "https://github.com/alumond/HR-Analytics-Nexus",
    "fork": true,
    "language": "Project files",
    "updated": "2024-02-09"
  },
  {
    "name": "Indicators",
    "description": "A data set from world bank storing different world development Indicators. I made a selection for Nigeria and selected a few other indicators. I also built a model to predict GDP and GNI of the country and also amount spent on goods (Import and Export)",
    "github": "https://github.com/alumond/Indicators",
    "fork": false,
    "language": "Jupyter Notebook",
    "updated": "2023-08-27"
  },
  {
    "name": "Power-bi-challenge",
    "description": "Power bi challenge",
    "github": "https://github.com/alumond/Power-bi-challenge",
    "fork": false,
    "language": "Project files",
    "updated": "2023-02-02"
  },
  {
    "name": "Hacey",
    "description": "Hacey",
    "github": "https://github.com/alumond/Hacey",
    "fork": false,
    "language": "Project files",
    "updated": "2022-12-22"
  },
  {
    "name": "Fastapi",
    "description": "Fastapi",
    "github": "https://github.com/alumond/Fastapi",
    "fork": false,
    "language": "Python",
    "updated": "2022-12-02"
  },
  {
    "name": "Hamoye",
    "description": "Hamoye Project E, Time series Analysis",
    "github": "https://github.com/alumond/Hamoye",
    "fork": false,
    "language": "Jupyter Notebook",
    "updated": "2022-10-13"
  },
  {
    "name": "HSDC-Hamoye-Group",
    "description": "Almond contribution",
    "github": "https://github.com/alumond/HSDC-Hamoye-Group",
    "fork": false,
    "language": "Jupyter Notebook",
    "updated": "2022-10-09"
  },
  {
    "name": "HSDC-Hamoye-Anaconda-",
    "description": "Almond contribution",
    "github": "https://github.com/alumond/HSDC-Hamoye-Anaconda-",
    "fork": false,
    "language": "Project files",
    "updated": "2022-10-09"
  },
  {
    "name": "dsj",
    "description": "kew",
    "github": "https://github.com/alumond/dsj",
    "fork": false,
    "language": "Jupyter Notebook",
    "updated": "2022-09-20"
  },
  {
    "name": "Almond-Owolabi-Hamoye-111",
    "description": "Project C, Logistic Regression and Linear Classification",
    "github": "https://github.com/alumond/Almond-Owolabi-Hamoye-111",
    "fork": false,
    "language": "Jupyter Notebook",
    "updated": "2022-09-06"
  },
  {
    "name": "Almond-Owolabi-Hamoye-Activity-2",
    "description": "machine learning regression",
    "github": "https://github.com/alumond/Almond-Owolabi-Hamoye-Activity-2",
    "fork": false,
    "language": "Jupyter Notebook",
    "updated": "2022-08-13"
  },
  {
    "name": "Almond-Owolabi-Hamoye-Activity-1",
    "description": "Python for data science code",
    "github": "https://github.com/alumond/Almond-Owolabi-Hamoye-Activity-1",
    "fork": false,
    "language": "Jupyter Notebook",
    "updated": "2022-08-01"
  },
  {
    "name": "Almond-Projects",
    "description": "Projects done by Owolabi almond",
    "github": "https://github.com/alumond/Almond-Projects",
    "fork": false,
    "language": "Project files",
    "updated": "2022-07-03"
  },
  {
    "name": "Hamoye-Data-Science-Internship",
    "description": "Quiz Codes",
    "github": "https://github.com/alumond/Hamoye-Data-Science-Internship",
    "fork": true,
    "language": "Project files",
    "updated": "2020-10-13"
  }
];

export const certifications = [
  "IBM Data Science Specialization",
  "IBM Data Analyst Specialization",
  "AWS Elements of Data Science",
  "Google Data Analysis Specialization",
];
