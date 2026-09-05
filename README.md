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
- AfriMedQA Fine-Tuning & Chatbot
- M&E Intelligence Engine
- Health Access for Persons with Disabilities

The Job Application Agent and other projects remain available through All projects and the searchable repository archive. Forked repositories carry explicit attribution. Retail figures are synthetic; the AfriMedQA training pipeline is separate from its Gemini-powered chatbot interfaces.

## Project structure

- `app/components/PortfolioHome.tsx`: homepage, project filters, searchable archive
- `app/globals.css`: shared responsive visual system
- `app/work/[slug]/page.tsx`: generated case studies and record-specific social metadata
- `public/images/`: portraits and project visuals
- `public/og.png`: portfolio social sharing card

## Build and deployment

- `npm run build:vercel` creates the Next.js static export used by Vercel.
- `npm run build` also copies the static output to `dist/` for the existing alternate hosting workflow.
- `vercel.json` retains the existing Next.js deployment configuration.
- `.openai/hosting.json` retains the existing Sites project and declares `out/` as its static output.
- Set `NEXT_PUBLIC_SITE_URL` to override the canonical origin; otherwise Vercel's production domain is used, falling back to the existing Vercel portfolio URL.

Publishing is separate from building. No automatic repository synchronization or deployment is performed by the application.

## Interactive presentation

The homepage includes metric and month controls for the retail dataset, animated revenue/profit traces, category contribution bars, an accessible data table, and downloadable chart data. `scripts/prepare-retail-data.py` regenerates the compact chart snapshot from the public source CSV; data is explicitly synthetic.

Both supplied portraits remain in use. Case studies include expandable dashboard and content galleries and system architecture panels. Motion progressively enhances visible content and respects reduced-motion preferences. Résumé links use the browser download attribute; email links and clipboard copying provide complementary ways to get in touch.

Image components explicitly serve original public assets. The alternate vinext worker also redirects valid local image requests when optional Cloudflare image bindings are absent, preventing the local `env.ASSETS.fetch` crash.
