# Website source — wee4techsolutions.com

The HTML pages in the repository root are **generated**. Edit the files in `src/`, then rebuild:

```bash
node src/build.mjs
```

No npm install is needed (Node 18+ only). Commit the regenerated files and Netlify deploys them as before.

## Where to edit

| What | File |
|---|---|
| Company details (phone, email, address, social links, GA id) | `src/site.mjs` → `SITE` |
| Header, footer, `<head>` SEO tags, JSON-LD schema | `src/site.mjs` |
| Service pages (copy, FAQs, technologies) | `src/content.mjs` → `SERVICES` |
| Course pages (summary, outcomes, FAQs) | `src/content.mjs` → `COURSES` |
| Course syllabus modules | `src/syllabus.json` |
| Testimonials, client logos | `src/content.mjs` |
| Home, About, Careers, Contact, legal pages | `src/pages.mjs` |
| Old URL → new URL redirects | `src/pages.mjs` → `REDIRECTS` |
| Styles / behaviour | `assets/css/style.css`, `assets/js/site.js` |

## What the build generates

- 24 HTML pages (home, services hub + 7 service pages, courses hub + 8 course pages, about, careers, contact, privacy, terms, 404)
- `sitemap.xml`, `robots.txt` (allows search and AI crawlers), `llms.txt` (AI-readable summary)
- `_redirects` (Netlify 301s for old URLs) and `_headers` (security + caching headers)
- `site.webmanifest`

## Adding a new service or course

1. Add an entry to `SERVICES` or `COURSES` in `src/content.mjs` (copy an existing one).
2. For a course, add its modules to `src/syllabus.json` under the same slug.
3. Run `node src/build.mjs`. Navigation, footer, sitemap, llms.txt and schema update automatically.

## SEO / GEO / AEO checklist for new content

- One clear `h1` with the main keyword + location where relevant ("… in Chennai").
- Title ≤ 60 characters, meta description 120–160 characters.
- A short, direct "answer" paragraph near the top (what it is, who it's for) — this is what Google AI Overviews, ChatGPT and Perplexity quote.
- 3–5 real customer questions as FAQs (they become `FAQPage` schema automatically).
- Link to at least two related pages.
