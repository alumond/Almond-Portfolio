# Almond Owolabi — Portfolio

A responsive Next.js portfolio for data science, AI engineering, analytics, and monitoring & evaluation work.

## Run locally

```sh
npm install
npm run dev
```

## Validate

```sh
npm run lint
npm test
```

`npm test` builds the static site and checks rendered routes, new projects, source attribution, social metadata, résumé downloads, chart accessibility, and the image-serving fallback. `tests/tests.txt` contains optional manual browser checks; these are separate from the automated suite.

## Content

`app/data.ts` holds the profile, experience, case studies, and repository archive. Public GitHub metadata and project READMEs were reviewed on 5 September 2026. This is an editorial snapshot, not a live GitHub sync.

Featured work:

- Retail Revenue & Operations Command Center
- LinkedIn AI Agent
- Health for All
- M&E Intelligence Engine
- Health Access for Persons with Disabilities

The Job Application Agent and other projects remain available through All projects and the searchable repository archive. Forked repositories carry explicit attribution. Retail figures are synthetic; Health for All is a clinical-guidance demonstration, and its AfriMedQA training research remains separate from the Gemini-powered interfaces.

## Project structure

- `app/components/PortfolioHome.tsx`: homepage, project filters, searchable archive
- `app/globals.css`: shared responsive visual system
- `app/work/[slug]/page.tsx`: generated case studies and record-specific social metadata
- `public/images/`: portraits and project visuals
- `app/social-preview.png/route.tsx`: social sharing card, rendered to a static PNG during the build

## Build and deployment

- `npm run build:vercel` creates the Next.js static export used by Vercel.
- `npm run build` also copies the static output to `dist/` for the existing alternate hosting workflow.
- `vercel.json` retains the existing Next.js deployment configuration.
- `.openai/hosting.json` retains the existing Sites project and declares `out/` as its static output.
- The canonical origin is `https://almondowolabi.dpdns.org`. `NEXT_PUBLIC_SITE_URL` can explicitly override it; deployment aliases never override it automatically.
- The previous `almond-owolabi-portfolio.vercel.app` address uses a **301 redirect** to the custom domain in the Vercel project's Domains settings. Keep that domain attached as a redirect when deploying.
- Canonicals, social URLs, structured data, robots.txt, and all 14 sitemap entries share this origin. The design study at `/hero-preview/` is marked `noindex` and excluded from the sitemap.
- Search Console ownership tags for both domains and `public/google3d35051d7911371b.html` are retained. `vercel.json` maps Google's exact `.html` URL to Vercel's extensionless static-file route. Keep the verification file when deploying. Sitemap modification dates reflect content changes, not each build.

Publishing is separate from building. No automatic repository synchronization or deployment is performed by the application.

## Interactive presentation

The homepage includes metric and month controls for the retail dataset, animated revenue/profit traces, category contribution bars, an accessible data table, and downloadable chart data. `scripts/prepare-retail-data.py` regenerates the compact chart snapshot from the public source CSV; data is explicitly synthetic.

Both supplied portraits remain in use. Case studies include expandable dashboard and content galleries and system architecture panels. Motion progressively enhances visible content and respects reduced-motion preferences. Résumé links use the browser download attribute; email links and clipboard copying provide complementary ways to get in touch.

The homepage opens with a 6.4-second motion sequence: a particle globe becomes a wave, then an AO monogram as Almond's name appears. Visitors can pause, enter immediately, skip, or press Escape. The intro plays on a fresh homepage load, skips internal return navigation and direct section links, and can be replayed from the footer. Reduced-motion visitors go directly to the portfolio; replay shows a still introduction. The native dialog keeps keyboard focus within the introduction and restores focus on entry. Without JavaScript, the complete portfolio remains available.

Image components explicitly serve original public assets. The alternate vinext worker also redirects valid local image requests when optional Cloudflare image bindings are absent, preventing the local `env.ASSETS.fetch` crash.

## Evidence-led case studies

The five featured projects use `app/case-studies.ts` and `CaseStudyNarrative` for the problem, independent role, constraints, decisions, working output, evaluation, and limitations. Ownership and usage were confirmed by Almond on 3 October 2026. Creator-reported usage, visible artifacts, source inspection, and executed checks have separate labels. Do not turn scope or capabilities into impact claims.

`public/evidence/` contains the reproducible retail aggregation check, its input hashes and result, and the dated Health for All Telegram helper test result. The retail source snapshot is pinned in the verification script and case study. LinkedIn Studio's screenshot is captured from the running application and shows 39 tracked posts; the count is a dated snapshot. Health Access's public code reconstructs interactive records from aggregate profiles; it is not a raw respondent-level dataset.

## Homepage hierarchy (4 October 2026)

The homepage leads with professional positioning and Stanforte Edge/HACEY experience, followed by three selected stories (M&E, Health Access, LinkedIn Studio), the synthetic retail demonstration, a compact about/services section, and a specific contact invitation. The complete case-study and searchable repository collection is at `/archive/`.

The cinematic intro runs for 2.4 seconds plus a 0.4-second exit. It remembers a visit in `sessionStorage`, preserves replay/skip/pause, bypasses automatic playback for anchor destinations and reduced-motion preferences, and suspends its frame loop when paused or the tab is hidden. Background hero-canvas optimisation and a wider performance audit remain separate follow-up work.

A desktop coordinate cursor adds a crosshair, hover ring, and viewport X/Y readout. It is decorative, does not intercept input, and falls back to native text/form controls, keyboard navigation, touch handling, and a static reduced-motion crosshair.

The homepage retains the original Raw data / Find the signal / Make it matter hero controls, including the interactive applications in the third view.
