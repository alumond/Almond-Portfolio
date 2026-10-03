export type CaseStudy = {
  role: string;
  status: string;
  problem: string;
  audience: string;
  contributions: string[];
  constraints: string[];
  decisions: { title: string; reasoning: string; tradeoff: string }[];
  output: string;
  evidence: { value: string; label: string; basis: string; detail: string; href?: string }[];
  evaluation: string;
  reproduce: { title: string; steps: string[]; command?: string; links: { label: string; href: string }[] };
  limitations: string[];
  sources: { label: string; href: string }[];
};

const github = "https://github.com/alumond";
const retailSource = `${github}/linkedin-AI-Agent/tree/141568967e3bb3cbbebdd60b8b7b893c272619cd/projects/retail-revenue-command-center`;
const healthSource = `${github}/Activity-1/tree/07a5f58d691df9a7bde652a2d23073545119debf`;

// Ownership and usage were confirmed by Almond on 3 October 2026.
// Keep creator-reported usage distinct from inspected artifacts and executed checks.
export const caseStudies: Record<string, CaseStudy> = {
  "monitoring-and-evaluation-agent": {
    role: "Independent designer & developer",
    status: "Used for project tracking",
    problem: "Programme workbooks hold the evidence a team needs, but turning that evidence into a report, an escalation, and an accountable next action takes separate steps. I built an intelligence engine to connect those steps while keeping the calculations inspectable.",
    audience: "Programme managers, M&E leads, and the people responsible for corrective action.",
    contributions: [
      "Designed and built the Google Sheets connection, workbook classification, and common project-state model.",
      "Implemented indicator, schedule, risk, budget, and data-quality analysis, then connected the results to structured narrative generation.",
      "Built the PDF reporting and separate escalation paths, with audit records and a dry-run mode for reviewing planned actions.",
    ],
    constraints: [
      "Workbook tabs can have different names and layouts; the analysis needs to recognise their purpose from their headers.",
      "Narrative quality depends on reliable calculations and enough context to explain a performance gap.",
      "A useful automated recommendation must be traceable before it triggers email, write-back, or a reminder.",
    ],
    decisions: [
      { title: "Calculate first, explain second", reasoning: "Deterministic analytics compute performance before the language model receives a structured summary. This keeps numeric evidence separate from narrative generation.", tradeoff: "The narrative still needs review, and errors in the source workbook remain errors in the analysis." },
      { title: "Separate reports from escalations", reasoning: "A regular report and an urgent corrective-action request serve different readers. I gave them separate delivery paths, with durable run history and a dry-run action plan.", tradeoff: "Thresholds, recipients, and permissions need project-specific configuration before live actions are enabled." },
    ],
    output: "The report and escalation previews below show the two outputs: a consolidated performance review and a focused request for corrective action. The figures belong to the displayed report example; they are not a measure of the software’s impact.",
    evidence: [
      { value: "Project use", label: "Used to track a project", basis: "Creator-reported · October 2026", detail: "I have used the engine for project tracking. The project is not identified here, and no time-saving or delivery-improvement estimate is claimed." },
      { value: "2 paths", label: "Report and escalation outputs", basis: "Visible artifacts", detail: "Separate report and escalation previews can be expanded below. The repository documents the corresponding trigger and delivery paths.", href: "#working-output" },
    ],
    evaluation: "The current evidence is practical project use, visible output samples, and an inspectable implementation. A controlled before-and-after study of reporting time or programme performance has not been published.",
    reproduce: {
      title: "Review a planned action before delivery",
      steps: ["Follow the repository setup using a sample workbook and your own service configuration.", "Run the documented dry-run endpoint and compare each finding with the workbook’s actual values, targets, owners, and dates.", "Inspect the returned action plan. Dry-run mode does not generate a PDF, send email, write to Sheets, or persist completed-run memory."],
      command: 'curl -X POST "http://127.0.0.1:8000/autonomy/run?dry_run=true"',
      links: [{ label: "Setup and dry-run documentation", href: `${github}/Monitoring-and-Evaluation-Agent/blob/69e9645e91909f6555265e2930f309aa5a139d2a/README.md` }],
    },
    limitations: ["Usage confirms that the workflow has been exercised; it does not establish a causal improvement in project outcomes.", "Missing, stale, or inconsistently defined indicators need source-data correction. An explanation generated from them is not independent verification.", "Recommendations and escalation thresholds require an accountable human owner."],
    sources: [{ label: "Implementation and operating guide", href: `${github}/Monitoring-and-Evaluation-Agent/tree/69e9645e91909f6555265e2930f309aa5a139d2a` }],
  },
  "linkedin-ai-agent": {
    role: "Independent designer & developer",
    status: "In regular publishing use",
    problem: "Consistent publishing involves research, writing, image preparation, checking previous topics, and deciding what is ready to share. I built LinkedIn Studio as a review desk that brings that workflow together and keeps final publication under my control.",
    audience: "A personal publishing workflow for sourced data, AI, analytics, and project stories.",
    contributions: ["Built the research-to-draft workflow, source checks, topic-history checks, and publication tracking.", "Designed and built the local LinkedIn Studio review desk and its connection to the GitHub Actions publisher.", "Implemented approval for a specific version of both text and image, with a new approval required after changes."],
    constraints: ["A revised draft or image must not inherit approval from an earlier version.", "Repeated topics and uncertain publication responses need explicit handling to avoid duplicate posts.", "A useful review interface must show the actual story, artwork, and sources together."],
    decisions: [
      { title: "Bind approval to the exact preview", reasoning: "The review desk approves a specific text-and-image version. A change invalidates that approval, so the published asset corresponds to what was reviewed.", tradeoff: "Preparation can be automated, but a post waits until I approve it." },
      { title: "Keep a durable publication history", reasoning: "The workflow checks recorded topics and image reuse, preserves pending drafts, and does not automatically retry an uncertain create-post request.", tradeoff: "The record covers tracked publisher activity; it is not an exhaustive history of manually published LinkedIn posts." },
    ],
    output: "LinkedIn Studio is shown in its ready-to-prepare state, with the recent publication history visible. This is the actual application screen, including the 39-post count at capture, rather than an example post standing in for the product.",
    evidence: [
      { value: "39", label: "Posts tracked in the review desk", basis: "Application screenshot · 3 October 2026", detail: "The captured desk shows 39 tracked posts and recent entries from 25 September to 2 October. This is a snapshot of recorded publication history, not an engagement metric.", href: "/images/project-linkedin-studio.png" },
      { value: "In use", label: "Consistent publishing", basis: "Creator-reported · October 2026", detail: "I use the agent to publish consistently. No reach, conversion, or audience-growth result is attributed to the automation here." },
    ],
    evaluation: "The screenshot supports the publication-history claim, and the repository provides tests for approval, stale previews, changed images, and attempts to bypass review. Those tests are available for inspection; a fresh execution of that suite is not claimed on this page.",
    reproduce: { title: "Inspect the approval boundary", steps: ["Check out the linked source snapshot and install its development dependencies in an isolated environment.", "Run the approval tests. They use fake generation and mocked publisher calls to exercise the review rules.", "Read the assertions for unapproved posts, changed text or images, stale previews, and requested revisions."], command: "pytest -q tests/test_approval.py", links: [{ label: "Approval test cases", href: `${github}/linkedin-AI-Agent/blob/141568967e3bb3cbbebdd60b8b7b893c272619cd/tests/test_approval.py` }] },
    limitations: ["A tracked-post count does not measure engagement, content quality, or business value.", "Checks depend on the available history and sources. Human review remains necessary for accuracy and editorial judgement.", "Publication depends on valid platform credentials and external service availability."],
    sources: [{ label: "LinkedIn Studio workflow and source", href: `${github}/linkedin-AI-Agent/tree/141568967e3bb3cbbebdd60b8b7b893c272619cd` }],
  },
  "health-for-all": {
    role: "Independent designer & developer",
    status: "Used by more than 100 people",
    problem: "A person describing symptoms needs a response they can understand: how urgent the situation may be, what to do next, and which warning signs need attention. I built Health for All to organise that guidance in a conversational interface for African healthcare contexts.",
    audience: "People seeking understandable health guidance, with a clear boundary between a demonstration and clinical care.",
    contributions: ["Designed and built the Health for All interface, focused and detailed response modes, and transcript export.", "Implemented the Gemini-backed conversation path and the separate Telegram webhook with message formatting and optional recent-history support.", "Developed the earlier QLoRA training pipeline as a separate research path; the current chatbot uses Gemini directly."],
    constraints: ["Generated health advice can be incomplete or wrong; the product must make its limits visible.", "The web interface and Telegram have different message, formatting, and session constraints.", "Research training outputs must not be confused with the model serving the current product."],
    decisions: [
      { title: "Put urgency and next steps first", reasoning: "The interface supports focused or detailed guidance while keeping urgency, immediate actions, and warning signs central to the response.", tradeoff: "A clear response format is not evidence that a medical answer is correct." },
      { title: "Keep training separate from serving", reasoning: "The Gemini-backed product can operate without a hosted fine-tuned adapter. The earlier QLoRA work remains inspectable as research, without implying that it powers the live chatbot.", tradeoff: "The current experience depends on the external model service; adapter training results do not validate its answers." },
    ],
    output: "The Health for All product screen below shows the guidance format and available actions. It demonstrates the interface, not a clinically validated diagnosis or treatment recommendation.",
    evidence: [
      { value: "100+", label: "People have used Health for All", basis: "Creator-reported · October 2026", detail: "I report usage by more than 100 people. This count has not been independently audited and does not measure clinical effectiveness." },
      { value: "8 / 8", label: "Telegram helper tests passed", basis: "Executed locally · 3 October 2026", detail: "The existing tests passed for message extraction, splitting, formatting, escaping, prompt context, configuration, and URL encoding. No live model or Telegram request was made.", href: "/evidence/health-for-all-tests.txt" },
    ],
    evaluation: "Usage and software checks answer different questions. The reported user count shows the product has been used; the eight offline tests verify message-handling helpers. Neither establishes diagnostic accuracy, appropriate triage, or clinical benefit.",
    reproduce: { title: "Reproduce the offline software checks", steps: ["Download the linked source snapshot and install the requests dependency in an isolated Python environment.", "Run the existing unittest suite from the repository root. No API credentials are required for these helper tests.", "Compare the result with the dated test record. Clinical evaluation would require a separate, expert-reviewed protocol."], command: "python3 -m unittest discover -s tests -v", links: [{ label: "Test source", href: `${healthSource.replace('/tree/', '/blob/')}/tests/test_telegram_bot.py` }, { label: "Dated test result", href: "/evidence/health-for-all-tests.txt" }] },
    limitations: ["Health for All does not replace clinical diagnosis, emergency care, or local treatment guidelines.", "No clinician-reviewed accuracy or triage-safety benchmark is presented here.", "The usage count is creator-reported; retention and outcome data have not been independently verified."],
    sources: [{ label: "Health for All source snapshot", href: healthSource }],
  },
  "retail-revenue-command-center": {
    role: "Independent analyst & developer",
    status: "Reproducible portfolio demonstration",
    problem: "Revenue growth can hide weaker margins, rising returns, or poor retention. I built a retail command centre that brings commercial and operational signals together so a reader can identify where to investigate next.",
    audience: "Retail leaders reviewing revenue quality, customer behaviour, and operational pressure.",
    contributions: ["Designed the synthetic dataset across month, region, channel, and product category.", "Built the Python workflow that generates the dataset, executive dashboard, and KPI summary.", "Translated the analysis into visual priorities and an interactive portfolio view with downloadable chart data."],
    constraints: ["The project uses synthetic data, so apparent commercial performance cannot be claimed as a client result.", "Every displayed total needs to reconcile with the source records.", "The output needs to be shareable as a static artifact without a paid analytics runtime."],
    decisions: [
      { title: "Read revenue alongside profit", reasoning: "Revenue and gross profit share the same time controls, making it easier to inspect whether growth and margin move together.", tradeoff: "A monthly aggregate can hide individual products or transactions that need further investigation." },
      { title: "Use an inspectable generation workflow", reasoning: "Python, CSV, JSON, and static HTML keep the input and output easy to reproduce. The portfolio also exposes its chart data.", tradeoff: "This demonstrates analytical design; it is not a live integration with a retailer’s systems." },
    ],
    output: "Explore the embedded revenue and profit view, then expand the dashboard image. All figures are synthetic. The record count and period describe the dataset’s scope, not business impact.",
    evidence: [
      { value: "270 / 270", label: "Displayed totals reconciled", basis: "Executed locally · 3 October 2026", detail: "Independently summed the source CSV and compared monthly revenue, profit, and orders plus category revenue and profit with the portfolio chart. Zero mismatches.", href: "/evidence/retail-validation.json" },
      { value: "2,160", label: "Synthetic source records", basis: "Dataset scope · 18 months", detail: "The check covers all 18 months. Dataset size describes the demonstration; no revenue uplift or operating improvement is claimed.", href: retailSource },
    ],
    evaluation: "The reconciliation tests aggregation accuracy against the pinned source CSV, with file hashes recorded for repeatability. It does not evaluate business impact, forecasting, or the representativeness of the synthetic data.",
    reproduce: { title: "Reconcile the chart yourself", steps: ["Download the source CSV from the pinned repository snapshot, the portfolio chart JSON, and the verification script below.", "Place the three files in the same directory and run the command with Python 3. No extra packages are needed.", "The script compares 270 totals and exits with a failure if values or coverage differ. The saved result records input hashes."], command: "python3 verify-retail.py retail_operations_kpis.csv retail-chart-data.json", links: [{ label: "Source CSV", href: `${retailSource.replace('/tree/', '/blob/')}/data/retail_operations_kpis.csv` }, { label: "Chart data", href: "/data/retail-chart-data.json" }, { label: "Verification script", href: "/evidence/verify-retail.py" }, { label: "Saved result", href: "/evidence/retail-validation.json" }] },
    limitations: ["Synthetic patterns are constructed for demonstration and should not be interpreted as market evidence.", "Correct totals do not establish that a recommendation will improve business performance.", "The embedded view presents a subset of the full dashboard’s measures."],
    sources: [{ label: "Dataset, builder, and dashboard outputs", href: retailSource }],
  },
  "health-access-for-pwds": {
    role: "Independent analyst & developer",
    status: "Survey-informed dashboard demonstration",
    problem: "Disability inclusion data needs to lead to practical questions about service readiness: communication support, physical access, affordability, and respectful care. I built a dashboard that brings these barriers into one prioritisation view.",
    audience: "Programme managers, M&E leads, and teams discussing disability-inclusive healthcare access.",
    contributions: ["Designed and built the dashboard, its filters, target-aware indicator cards, and SVG charts.", "Connected state, disability-group, facility, and barrier views with recommendation themes.", "Implemented the browser-side demonstration records and calculations from aggregate survey profiles."],
    constraints: ["The public implementation reconstructs demonstration rows from aggregate profiles rather than loading original respondent-level records.", "Indicators need to distinguish service availability from harmful exposure; their direction of improvement differs.", "Small groups and reconstructed combinations limit what filtered comparisons can establish."],
    decisions: [
      { title: "Show actual values with target performance", reasoning: "Indicator cards keep the observed demonstration value close to its target comparison. Availability indicators and financial-difficulty exposure use different directions of improvement.", tradeoff: "Targets are reference settings in the demonstration, not independently validated programme commitments." },
      { title: "Keep the demonstration portable", reasoning: "The dashboard uses static HTML, CSS, and JavaScript with browser-rendered charts. Its aggregate profiles make the interaction easy to inspect and run locally.", tradeoff: "Reconstructed rows cannot support claims about actual respondent-level relationships or population prevalence." },
    ],
    output: "The dashboard preview shows how indicators, barriers, and actions are organised. Its interactive records are reconstructed from aggregate profiles; filtered subgroup results should be read as demonstration outputs.",
    evidence: [
      { value: "4", label: "Filter dimensions implemented", basis: "Source inspection", detail: "State, disability group, facility level, and barrier focus are implemented in the public dashboard. This describes functionality, not adoption or impact." },
      { value: "Traceable", label: "Browser-side calculations", basis: "Source inspection", detail: "The record builder, percentage calculations, and target comparisons are available in src/main.js for inspection.", href: `${github}/Health-Access-for-PWDs/blob/81fcf813d61e406e77943b1ec9b6fea356c3aa6c/src/main.js` },
    ],
    evaluation: "This case study establishes an inspectable dashboard implementation and a transparent data boundary. It does not claim a completed user study, validated subgroup estimates, or a measured change in healthcare access.",
    reproduce: { title: "Inspect the demonstration and its calculations", steps: ["Download the linked source snapshot and start a static server from the repository directory.", "Open the dashboard, change one filter at a time, and inspect the remaining record count alongside each percentage.", "Review buildRecords, pct, and renderKpi in src/main.js. Distinguish the reconstructed records from the aggregate source profile before drawing conclusions."], command: "python3 -m http.server 4173", links: [{ label: "Dashboard source and setup", href: `${github}/Health-Access-for-PWDs/tree/81fcf813d61e406e77943b1ec9b6fea356c3aa6c` }] },
    limitations: ["Reconstructed demonstration rows are not original survey responses. Cross-filter relationships must not be presented as observed respondent findings.", "The dashboard cannot establish population prevalence or causal drivers of exclusion.", "A production analysis would need verified source records, documented sampling, and explicit treatment of missing and multiple-response data."],
    sources: [{ label: "Aggregate profiles and record-generation code", href: `${github}/Health-Access-for-PWDs/blob/81fcf813d61e406e77943b1ec9b6fea356c3aa6c/src/main.js` }],
  },
};
