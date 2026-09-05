# Search visibility — Almond Owolabi

Primary audiences: employers hiring data and AI specialists, and clients seeking analytics, dashboard, AI workflow, or M&E support.

## Implemented

- Descriptive, page-specific titles and descriptions; Nigeria appears naturally in homepage copy.
- Self-referencing canonical URLs on every core page and project case study.
- Public crawl access and a sitemap using canonical trailing-slash URLs.
- Sitemap dates reflect content updates, not every build; update `contentUpdatedAt` in `app/seo.ts` when content materially changes.
- Linked Person and WebSite structured data; ProfilePage on About; project breadcrumbs.
- Services link directly to relevant case studies.
- Optional Google verification metadata through `GOOGLE_SITE_VERIFICATION`.

## Next: Google Search Console

1. Sign in at https://search.google.com/search-console/ using the account that will manage the portfolio.
2. Add a URL-prefix property for `https://almond-owolabi-portfolio.vercel.app/`.
3. Choose HTML-tag verification. Set its `content` value as the Vercel production variable `GOOGLE_SITE_VERIFICATION`, redeploy, then complete verification in Search Console. An HTML verification file is also an alternative.
4. Submit `https://almond-owolabi-portfolio.vercel.app/sitemap.xml` in Sitemaps.
5. Inspect the homepage and important case-study URLs and request indexing.
6. Review indexing and Search Performance weekly: queries, impressions, clicks, and average position. Filter by country and query group where useful.

Search Console ownership and sitemap submission have not been completed by the site code.

## Initial search themes

Branded and recruiter searches:
- Almond Owolabi
- Almond Owolabi data scientist
- Almond Owolabi AI engineer

Consulting searches to develop with useful, original content:
- M&E dashboard developer Nigeria
- Data analytics consultant Nigeria
- Power BI dashboard consultant Nigeria
- AI workflow automation Nigeria

These are positioning hypotheses, not verified search-volume or competition estimates. Use Search Console data to refine them.

## Build evidence and discovery

- Put the portfolio link on GitHub and LinkedIn profiles and relevant repository READMEs.
- Write useful project explanations: the question, dataset boundary, technical decisions, screenshots, limitations, and reproducible outputs.
- Develop distinct service pages only when each can offer substantial, specific information; avoid near-duplicate city or keyword pages.
- Publish genuine articles based on the work, such as interpreting retail margin risk or separating M&E report generation from escalation rules.
- Earn relevant links through actual collaboration, contributions, and professional communities. Do not buy ranking links.
- Measure mobile Core Web Vitals with PageSpeed Insights and Search Console before changing animation or image behavior for performance.
- A personal domain can improve consistency and recall; it does not guarantee higher rankings. If adopted, choose one canonical domain, redirect old URLs, and update metadata, sitemap, and Search Console.

No ranking or indexing is guaranteed. Indexing requests may take days to weeks, and search visibility develops over time.
