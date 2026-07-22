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
  accent: "brick" | "blue" | "lichen" | "ink";
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
    title: "Decision systems",
    body: "Turn fragmented operational data into clear reporting, accountable performance, and decisions that can move this week.",
    tags: ["M&E intelligence", "KPI systems", "Donor reporting"],
  },
  {
    number: "02",
    title: "Analytics products",
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
    title: "AI & data workflows",
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
    slug: "monitoring-and-evaluation-agent",
    title: "M&E Intelligence Engine",
    shortTitle: "M&E Intelligence Engine",
    kind: "M&E",
    kicker: "Operational intelligence · 2026",
    description: "A production-ready backend that turns programme workbooks into donor-grade reports, decisions, and escalations.",
    longDescription: "A monitoring and evaluation intelligence platform that connects to Google Sheets, normalizes programme state, computes deterministic analytics, and generates an accountable next action for the people who need it.",
    stack: ["Python", "FastAPI", "Google Sheets", "Gemini", "SQLite", "SMTP"],
    github: "https://github.com/alumond/Monitoring-and-Evaluation-Agent",
    featured: true,
    accent: "brick",
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
    featured: true,
    accent: "blue",
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
    kicker: "Retrieval-augmented generation · 2025",
    description: "A local-first retrieval workflow that pairs Llama 3 with LangChain, ChromaDB, Ollama, and a Flask API.",
    longDescription: "A practical RAG implementation that keeps the model workflow close to the data: retrieve relevant context, compose a grounded response, and expose the experience through an API surface.",
    stack: ["Python", "Llama 3", "LangChain", "Ollama", "ChromaDB", "Flask"],
    github: "https://github.com/alumond/RAG",
    featured: true,
    accent: "ink",
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
    kicker: "Applied modelling · 2024",
    description: "A Streamlit interface that wraps a scikit-learn model into an interpretable loan approval probability workflow.",
    longDescription: "A small but complete applied machine-learning product: accept financial and demographic inputs, pass them through a trained scikit-learn pipeline, and return a probability-oriented decision surface.",
    stack: ["Python", "Scikit-learn", "Streamlit", "Feature engineering"],
    github: "https://github.com/alumond/loan-Prediction-App",
    featured: true,
    accent: "blue",
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
    featured: true,
    accent: "lichen",
    outcomes: ["Nigeria-focused indicator selection", "GDP and GNI modelling", "Trade variable exploration"],
    sections: [
      { title: "The frame", body: "Development datasets become useful when the selection is intentional. This project narrows a broad World Bank indicator set into a Nigeria-focused exploration and creates a path from descriptive analysis to prediction." },
      { title: "The modelling question", body: "Can selected indicators help explain or predict movements in GDP, GNI, and import/export spending? The work treats modelling as an inquiry tool, not a magic answer, and keeps the emphasis on interpretation." },
      { title: "The relevance", body: "The project sits at the intersection of economic analysis, policy evidence, and practical data science—an area where clear framing matters as much as model choice." },
    ],
  },
];

export const archiveRepos = [
  ["Activity-1", "Data science activity repository", "Analytics"],
  ["Agent", "Agent building experiments", "AI systems"],
  ["Almond-Owolabi-Hamoye-111", "Logistic regression and linear classification", "Machine learning"],
  ["Almond-Owolabi-Hamoye-Activity-1", "Python for data science code", "Analytics"],
  ["Almond-Owolabi-Hamoye-Activity-2", "Machine learning regression", "Machine learning"],
  ["Almond-Projects", "A central archive of projects by Almond Owolabi", "Analytics"],
  ["Data-Analysis-Dashboard", "Dashboard archive for analysis and visualisation", "Dashboards"],
  ["Fastapi", "FastAPI experiments and service work", "AI systems"],
  ["HR-Analytics-Nexus", "MySQL and Power BI workforce analysis", "Analytics"],
  ["HSDC-Hamoye-Anaconda-", "Hamoye data science contribution", "Analytics"],
  ["HSDC-Hamoye-Group", "Hamoye group contribution", "Analytics"],
  ["Hacey", "HACEY data science work", "Analytics"],
  ["Hamoye", "Time series analysis project", "Machine learning"],
  ["Hamoye-Data-Science-Internship", "Internship quiz and practice codes", "Analytics"],
  ["Health-Access-for-PWDs", "Disability-inclusive healthcare access dashboard", "Dashboards"],
  ["Indicators", "World Bank development indicators for Nigeria", "Analytics"],
  ["Job-Agent", "Job search automation experiments", "AI systems"],
  ["Job-Search-Agent", "Job search agent", "AI systems"],
  ["Monitoring-and-Evaluation-Agent", "Automated M&E intelligence and escalation", "M&E"],
  ["Power-bi-challenge", "Power BI challenge work", "Dashboards"],
  ["RAG", "Local retrieval-augmented generation API", "AI systems"],
  ["dsj", "Data science journal and exercises", "Analytics"],
  ["health-chat", "Health chat experiments", "AI systems"],
  ["loan-Prediction-App", "Streamlit loan approval prediction app", "Machine learning"],
  ["rag-tutorial-v2", "Improved LangChain RAG tutorial", "AI systems"],
] as const;

export const certifications = [
  "IBM Data Science Specialization",
  "IBM Data Analyst Specialization",
  "AWS Elements of Data Science",
  "Google Data Analysis Specialization",
];
