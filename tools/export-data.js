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

// ---------- the "Check your medicine" pilot ----------
vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/js/meds-data.js'), 'utf8'), sandbox);
const M = sandbox.window.MEDS;
const issueName = Object.fromEntries(M.ISSUES.map(i => [i.id, i.name]));
const byName = { gov: 'US government', foreign: 'Non-US government', private: 'Private lawsuit', regulator: 'Regulator', other: 'Research, press or company' };
const links = (list) => (list || []).map(([label, url]) => ({ label, url }));
const meds = M.MEDS.map(m => ({
  medicine: m.name,
  brands: m.brands,
  used_for: m.what,
  maker: m.maker,
  launched: m.launch,
  market: m.market,
  pbs_basis: m.pbs.by === 'scripts' ? 'prescriptions' : 'cost to government',
  pbs_rank: m.pbs.rank,
  pbs_prescriptions_2024_25: m.pbs.n,
  pbs_cost_aud_2024_25: m.pbs.aud || null,
  status_light: M.LIGHTS[m.light].label,
  why: m.why,
  medicine_itself: m.self.text,
  watch: m.watch,
  events: m.events.map(e => ({
    year: e.year,
    conduct_from: e.during ? e.during[0] : null,
    conduct_to: e.during ? e.during[1] : null,
    issue: issueName[e.issue],
    status: e.tag || M.STATUS[e.status].label,
    by: byName[e.by],
    amount: e.amount || '',
    about_parent_drug: e.related || '',
    title: e.title,
    description: e.desc,
    sources: links(e.src)
  }))
}));
fs.writeFileSync(path.join(root, 'data/medicines.json'), JSON.stringify({
  source_of_sample: { label: M.PBS_SRC[0], url: M.PBS_SRC[1] },
  medicines: meds
}, null, 2) + '\n');

const mcols = ['medicine', 'brands', 'pbs_basis', 'pbs_rank', 'status_light', 'year', 'conduct_from', 'conduct_to',
  'issue', 'status', 'by', 'amount', 'about_parent_drug', 'title', 'description', 'sources'];
const mrows = [];
meds.forEach(m => {
  const base = { medicine: m.medicine, brands: m.brands, pbs_basis: m.pbs_basis, pbs_rank: m.pbs_rank, status_light: m.status_light };
  if (!m.events.length) mrows.push(Object.assign({}, base, { title: 'Nothing significant found' }));
  m.events.forEach(e => mrows.push(Object.assign({}, base, e)));
});
const mcsv = [mcols.join(',')].concat(mrows.map(r => mcols.map(k => {
  const v = r[k];
  if (k === 'sources') return esc((v || []).map(s => `${s.label} <${s.url}>`).join('; '));
  return esc(v == null ? '' : v);
}).join(','))).join('\n') + '\n';
fs.writeFileSync(path.join(root, 'data/medicines.csv'), mcsv);
console.log(`Wrote ${meds.length} medicines (${mrows.length} rows) to data/medicines.json and data/medicines.csv`);
