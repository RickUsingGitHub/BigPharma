# Big Pharma on Trial

An interactive, evidence-based website covering 30 years (1996–2026) of misconduct by the world's biggest drug companies: fines, guilty pleas, buried trials, ghostwriting, kickbacks, bribery, price gouging and p-hacking. It ends with a verdict on whether they are good or bad, and whether they are getting better.

## What's on the site

| Section | What it does |
|---|---|
| **The playbook** | 16 recurring tactics (bury trials, outcome switching, p-hacking, ghostwriting, hiding harms, off-label sales, kickbacks, bribery, silencing critics, opioids, overcharging, blocking competition, price gouging, tax games). Each card opens real cases, numbers and "has it been fixed?" |
| **The science lab** | An animation of Turner et al. (NEJM 2008) showing 74 antidepressant trials shrinking from 51% positive (FDA) to 94% positive (journals). A **p-hacking simulator**: run real simulated trials of a sugar pill and watch the false-positive rate climb from 5% to over 60%. A **funnel plot** showing how hiding small negative trials shifts a meta-analysis away from zero. Plus research-on-research stats and the Study 329 "same data, opposite conclusion". |
| **The rap sheets** | Dossiers for the 12 biggest companies by revenue (J&J, Roche, Lilly, Merck, Pfizer, AbbVie, AstraZeneca, Novartis, Sanofi, BMS, Novo Nordisk, GSK) plus Purdue, Teva, Bayer, Takeda, Mallinckrodt, Endo, Valeant, Amgen, Mylan, Insys, Ranbaxy, Gilead and Vyera. Each has a timeline, every case with sources, and "credit where it's due". |
| **Meanwhile, in Australia** | Merck's fake journal and doctor "hit list", the A$300m pelvic-mesh settlement, Tasmanian poppies, and what one month of Ozempic costs here compared with the US and other countries. |
| **Follow the money** | Penalties by company, by year and by type; fines measured in days of revenue; the 15 biggest cases; a company-by-misconduct heatmap. A switch restates every amount in 2025 dollars. Every chart has hover tooltips and a table view. |
| **The verdict** | The case for the defence and for the prosecution, a 13-point "are they getting better?" scorecard, and the bottom line. |
| **Every case** | A searchable, filterable table of all ~130 cases with source links, also downloadable as [CSV](data/cases.csv) or [JSON](data/cases.json). |

## Viewing it

It is a plain static site (HTML, CSS and vanilla JavaScript, with no build step and no dependencies).

- **Locally:** open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit <http://localhost:8000>.
- **GitHub Pages:** go to *Settings → Pages → Build and deployment*, choose *Deploy from a branch*, pick the branch containing this site and the `/ (root)` folder, then save. The site appears at `https://<username>.github.io/BigPharma/`.

## Files

```
index.html            page structure and static text
assets/css/style.css  design tokens (light and dark), layout, components
assets/js/data.js     the case database (~120 cases), company profiles, research stats
assets/js/playbook.js the 16 tactics
assets/js/charts.js   small SVG chart kit (stacked bars, columns, heatmap, timeline, tooltips)
assets/js/lab.js      publication-bias animation + p-hacking simulator (Welch t-tests)
assets/js/app.js      wires everything together
assets/og-card.png    link-preview image for social media and messages
data/cases.csv|json   the case database as downloadable files (generated)
tools/export-data.js  regenerates data/cases.csv and data/cases.json
tools/og-card.html    source for the link-preview image (tools/render-og-card.js renders it)
```

## Adding or correcting a case

Add an object to `CASES` in `assets/js/data.js`:

```js
{ co: 'pfizer', year: 2026, usd: 123.4, cat: 'kickbacks', kind: 'gov', crim: 'plea',
  title: 'Short headline', desc: 'One or two factual sentences.',
  src: [S('US DOJ', 'https://www.justice.gov/...')] }
```

- `usd` is in **US$ millions**, nominal.
- `kind` is `gov` (US government), `foreign` (non-US government), `private` (lawsuits), `tax` or `event` (no fine).
- `status: 'appeal'` or `'overturned'` keeps a case visible but out of the totals.

All charts and totals recalculate automatically. Then run `node tools/export-data.js` to refresh the downloadable CSV and JSON, and optionally `node tools/render-og-card.js` to refresh the link-preview image (needs Playwright).

## Method, in brief

- Amounts are US dollars as announced; a switch on the page restates them in 2025 dollars using the US CPI-U.
- Headline totals count only **final** payments to **governments**. Private lawsuits are shown separately; tax disputes, overturned rulings and cases under appeal are never counted.
- Settling is not admitting: many settlements were made without admission of liability, and that is noted. Guilty pleas, convictions and deferred prosecutions are flagged explicitly.
- Cases are attributed to today's parent company where it acquired the business (e.g. Allergan → AbbVie).
- This is a curated set of the most significant cases, not an exhaustive list. Public Citizen counted 482 US government settlements totalling $62.3bn from 1991 to 2021.

Sources are linked on every case and listed at the bottom of the page. Corrections with a source are welcome via issues.

*Not medical advice. Never stop or change a medicine without talking to your doctor.*
