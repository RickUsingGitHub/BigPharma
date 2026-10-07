#!/usr/bin/env node
// Writes data/cases.json and data/cases.csv from assets/js/data.js.
// Run after editing the case database:  node tools/export-data.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/js/data.js'), 'utf8'), sandbox);
const P = sandbox.window.PHARMA;

const coName = Object.fromEntries(P.COMPANIES.concat(P.OTHERS).map(c => [c.id, c.name]));
const catName = Object.fromEntries(P.CATEGORIES.map(c => [c.id, c.name]));
const counted = (c) => {
  if (!(c.kind === 'gov' || c.kind === 'foreign') || (c.status && c.status !== 'final')) return 0;
  return c.count != null ? c.count : c.usd;
};

const rows = P.CASES.slice()
  .sort((a, b) => a.year - b.year || coName[a.co].localeCompare(coName[b.co]))
  .map(c => ({
    year: c.year,
    company: coName[c.co],
    via: c.via || '',
    title: c.title,
    category: catName[c.cat],
    kind: P.KINDS[c.kind],
    criminal: { plea: 'guilty plea', conviction: 'conviction', dpa: 'deferred prosecution' }[c.crim] || '',
    status: c.status || 'final',
    amount_usd_millions: c.usd,
    counted_as_government_penalty_usd_millions: counted(c),
    description: c.desc,
    sources: (c.src || []).map(([label, url]) => ({ label, url }))
  }));

fs.mkdirSync(path.join(root, 'data'), { recursive: true });
fs.writeFileSync(path.join(root, 'data/cases.json'), JSON.stringify(rows, null, 2) + '\n');

const cols = ['year', 'company', 'via', 'title', 'category', 'kind', 'criminal', 'status',
  'amount_usd_millions', 'counted_as_government_penalty_usd_millions', 'description', 'sources'];
const esc = (v) => {
  const s = String(v);
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
};
const csv = [cols.join(',')].concat(rows.map(r => cols.map(k =>
  esc(k === 'sources' ? r.sources.map(s => `${s.label} <${s.url}>`).join('; ') : r[k])).join(','))).join('\n') + '\n';
fs.writeFileSync(path.join(root, 'data/cases.csv'), csv);

console.log(`Wrote ${rows.length} cases to data/cases.json and data/cases.csv`);
