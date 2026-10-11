/* Still on the shelf: a searchable, sortable table of every medicine on the site
   (the 15 pilot medicines plus the extra list in shelf-data.js). */
window.Shelf = (function () {
  const C = window.Charts, D = window.MEDS, SH = window.SHELF;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  if (!D || !SH) return { init() {} };
  const { ISSUES, STATUS, LIGHTS } = D;

  const LIGHT_ORDER = ['red', 'amber', 'green'];
  const LIGHT_COLOR = { red: 'var(--critical)', amber: 'var(--warning)', green: 'var(--good)' };
  const AREA_NAME = Object.fromEntries(SH.AREAS.map(a => [a.id, a.name]));
  const ISSUE = Object.fromEntries(ISSUES.map(i => [i.id, i]));
  const BENCH = {
    stop: 'See why stopping a trial early exaggerates the benefit, in the lab →',
    switch: 'Try spotting a switched outcome yourself, in the lab →',
    surr: 'See the surrogate-endpoint trap, in the lab →'
  };
  const coName = (() => {
    const P = window.PHARMA; if (!P) return {};
    return Object.fromEntries(P.COMPANIES.concat(P.OTHERS).map(c => [c.id, c.name]));
  })();

  // ---------- money: US$ millions; other currencies at approximate current rates ----------
  const RATE = { 'A$': 0.65, '€': 1.10, '£': 1.30, '$': 1 };
  function usdOf(e) {
    if (!e.amount || /^part of/i.test(e.amount)) return { v: 0, approx: false };
    const m = e.amount.replace(/,/g, '').match(/^(A\$|€|£|\$)([\d.]+)\s*(bn|m)?/);
    if (!m) return { v: e.usd || 0, approx: false };
    if (m[1] === '$' && e.usd != null) return { v: e.usd, approx: false };
    const n = parseFloat(m[2]) * (m[3] === 'bn' ? 1000 : m[3] === 'm' ? 1 : 1e-6);
    return { v: n * RATE[m[1]], approx: m[1] !== '$' };
  }
  const fmtPaid = (r) => r.paid > 0 ? (r.approx ? '≈ ' : '') + C.fmtUsd(r.paid) : '–';

  // ---------- rows ----------
  const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const ROWS = D.MEDS.map(m => Object.assign({}, m, { pilot: true }))
    .concat(SH.MEDS.map(m => Object.assign({}, m)));
  ROWS.forEach(r => {
    r.label = r.short || r.name;
    let paid = 0, approx = false;
    r.events.forEach(e => {
      if (e.status !== 'paid' || e.related) return;
      const u = usdOf(e); paid += u.v; approx = approx || (u.approx && u.v > 0);
    });
    r.paid = paid; r.approx = approx;
    r.latest = r.events.length ? Math.max(...r.events.map(e => e.year)) : null;
    r.open = r.events.filter(e => e.status === 'open').length;
    r.issues = ISSUES.map(iss => {
      const ev = r.events.filter(e => e.issue === iss.id);
      if (!ev.length) return null;
      const kind = ev.some(e => e.status === 'open') ? 'open' : ev.some(e => STATUS[e.status].level === 3) ? 'proven' : 'raised';
      return { id: iss.id, kind };
    }).filter(Boolean);
    r.hay = norm([r.name, r.short, r.brands, r.alias, r.what, r.maker, AREA_NAME[r.area],
      r.events.map(e => e.title + ' ' + e.desc).join(' ')].join(' '));
  });
  const byId = Object.fromEntries(ROWS.map(r => [r.id, r]));

  // ---------- state ----------
  const state = { q: '', light: 'all', issue: 'all', area: 'all', list: 'all', sort: 'light', dir: 1 };
  const SORTS = {
    light: (a, b) => LIGHT_ORDER.indexOf(a.light) - LIGHT_ORDER.indexOf(b.light) || b.paid - a.paid || a.label.localeCompare(b.label),
    name: (a, b) => a.label.localeCompare(b.label),
    maker: (a, b) => a.maker.localeCompare(b.maker) || a.label.localeCompare(b.label),
    paid: (a, b) => b.paid - a.paid || a.label.localeCompare(b.label),
    latest: (a, b) => (b.latest || 0) - (a.latest || 0) || a.label.localeCompare(b.label),
    issues: (a, b) => b.issues.length - a.issues.length || b.open - a.open || a.label.localeCompare(b.label)
  };

  function visible(r) {
    if (state.light !== 'all' && r.light !== state.light) return false;
    if (state.issue !== 'all' && !r.issues.some(i => i.id === state.issue)) return false;
    if (state.area !== 'all' && r.area !== state.area) return false;
    if (state.list === 'pilot' && !r.pilot) return false;
    if (state.list === 'more' && r.pilot) return false;
    if (state.q) return state.q.split(/\s+/).every(w => r.hay.includes(w));
    return true;
  }

  // ---------- detail panel ----------
  function srcLinks(list) {
    const s = document.createElement('div'); s.className = 'src';
    list.forEach(([label, url]) => {
      const a = document.createElement('a'); a.href = url; a.target = '_blank'; a.rel = 'noopener'; a.textContent = label + ' ↗';
      s.appendChild(a);
    });
    return s;
  }
  function para(cls, strong, text) {
    const p = document.createElement('p'); p.className = cls;
    if (strong) { const b = document.createElement('strong'); b.textContent = strong + ' '; p.appendChild(b); }
    p.appendChild(document.createTextNode(text));
    return p;
  }
  function detail(r) {
    const box = document.createElement('div'); box.className = 'shelf-detail';
    const meta = document.createElement('div'); meta.className = 'med-meta';
    const pbs = r.pbs ? (r.pbs.by === 'scripts'
      ? ` · PBS #${r.pbs.rank} by prescriptions in 2024–25 (${(r.pbs.n / 1e6).toFixed(1)} million)`
      : ` · PBS #${r.pbs.rank} by cost in 2024–25 (A$${Math.round(r.pbs.aud / 1e6)} million)`) : '';
    meta.textContent = `${r.what} · ${r.maker}${r.launch ? ' · launched ' + r.launch : ''}${pbs}`;
    box.appendChild(meta);
    box.appendChild(para('med-why', '', r.why));
    const self = para('med-self ' + r.self.q, 'The medicine itself:', r.self.text);
    box.appendChild(self);
    if (r.events.length) {
      const ol = document.createElement('ol'); ol.className = 'med-ev';
      r.events.slice().sort((x, y) => y.year - x.year).forEach(e => {
        const li = document.createElement('li'); li.className = e.status;
        li.innerHTML = '<div class="h"><span class="yr"></span><span class="tag"></span><span class="tag kind"></span><span class="t"></span><span class="amt"></span></div><p></p>';
        $('.yr', li).textContent = e.year;
        const tag = $('.tag', li); tag.textContent = e.tag || STATUS[e.status].label;
        if (e.status === 'open') tag.classList.add('crim');
        if (e.status === 'raised' || e.status === 'dismissed') tag.classList.add('warn');
        $('.tag.kind', li).textContent = ISSUE[e.issue].short;
        $('.t', li).textContent = e.title;
        if (e.amount) $('.amt', li).textContent = e.amount; else $('.amt', li).remove();
        const extra = [];
        if (e.crim) extra.push('Guilty plea.');
        if (e.related) extra.push(`About the parent drug, ${e.related}.`);
        if (e.during) extra.push(`Conduct: ${e.during[0] === e.during[1] ? e.during[0] : e.during[0] + '–' + e.during[1]}.`);
        $('p', li).textContent = e.desc + ' ' + extra.join(' ');
        li.appendChild(srcLinks(e.src));
        if (e.bench && BENCH[e.bench]) {
          const b = document.createElement('a'); b.href = '#bench'; b.className = 'bench-link'; b.dataset.bench = e.bench;
          b.textContent = BENCH[e.bench];
          b.addEventListener('click', (ev) => {
            const tab = document.getElementById('tab-' + e.bench);
            if (tab) { ev.preventDefault(); tab.click(); document.getElementById('bench').scrollIntoView({ behavior: C.reduceMotion ? 'auto' : 'smooth', block: 'start' }); }
          });
          li.appendChild(b);
        }
        ol.appendChild(li);
      });
      box.appendChild(ol);
    } else {
      box.appendChild(para('small muted', '', 'We searched for fines, lawsuits, recalls, safety alerts and research problems and found nothing significant.'));
    }
    if (r.watch) { box.appendChild(para('med-watch', 'What to watch:', r.watch)); if (r.watchSrc) box.appendChild(srcLinks(r.watchSrc)); }
    if (r.note) { box.appendChild(para('med-note', '', r.note)); if (r.noteSrc) box.appendChild(srcLinks(r.noteSrc)); }
    const links = document.createElement('div'); links.className = 'shelf-links';
    if (r.pilot) {
      const a = document.createElement('a'); a.href = '#medicines'; a.textContent = 'One of the PBS top 15: see what the pilot found →';
      links.appendChild(a);
    }
    if (r.co && coName[r.co]) {
      const a = document.createElement('a'); a.href = '#co-' + r.co; a.textContent = `${coName[r.co]}’s rap sheet →`;
      links.appendChild(a);
    }
    if (links.children.length) box.appendChild(links);
    return box;
  }

  // ---------- table ----------
  function issueChips(r) {
    const wrap = document.createElement('span'); wrap.className = 'itags';
    r.issues.forEach(i => {
      const t = document.createElement('span'); t.className = 'itag ' + i.kind; t.textContent = ISSUE[i.id].short;
      t.title = `${ISSUE[i.id].name}: ${i.kind === 'open' ? 'in court now' : i.kind === 'proven' ? 'paid or proven' : 'raised, not proven'}`;
      wrap.appendChild(t);
    });
    if (!r.issues.length) { wrap.textContent = 'None found'; wrap.classList.add('muted'); }
    return wrap;
  }

  function rowEls(r) {
    const tr = document.createElement('tr'); tr.className = 'srow'; tr.id = 'shelf-' + r.id; tr.dataset.id = r.id;
    tr.innerHTML = `
      <td class="c-name"><button class="sname" type="button" aria-expanded="false"><span class="n"></span><span class="b"></span></button></td>
      <td class="c-for"></td>
      <td class="c-maker"></td>
      <td class="c-light"><span class="light"><i></i><span></span></span></td>
      <td class="c-issues"></td>
      <td class="c-paid num"></td>
      <td class="c-latest num"></td>`;
    $('.n', tr).textContent = r.label;
    $('.b', tr).textContent = (r.short ? r.name : r.brands !== r.label ? r.brands : '') + (r.pilot ? ' · PBS top 15' : '');
    $('.c-for', tr).textContent = r.what;
    $('.c-maker', tr).textContent = r.maker;
    $('.light i', tr).style.background = LIGHT_COLOR[r.light];
    $('.light span', tr).textContent = LIGHTS[r.light].label;
    $('.c-issues', tr).appendChild(issueChips(r));
    $('.c-paid', tr).textContent = fmtPaid(r);
    if (r.paid > 0) $('.c-paid', tr).title = 'Total of payments on record' + (r.approx ? ', including non-US amounts converted at approximate rates' : '');
    $('.c-latest', tr).textContent = r.latest || '–';
    const dt = document.createElement('tr'); dt.className = 'sdetail'; dt.hidden = true;
    const td = document.createElement('td'); td.colSpan = 7; dt.appendChild(td);
    const btn = $('.sname', tr);
    btn.setAttribute('aria-controls', 'shelf-d-' + r.id); td.id = 'shelf-d-' + r.id;
    const toggle = (open) => {
      if (open && !td.firstChild) td.appendChild(detail(r));
      dt.hidden = !open; btn.setAttribute('aria-expanded', String(open)); tr.classList.toggle('open', open);
    };
    btn.addEventListener('click', () => toggle(dt.hidden));
    tr.addEventListener('click', (e) => { if (e.target.closest('button, a')) return; toggle(dt.hidden); });
    tr._toggle = toggle;
    return [tr, dt];
  }

  const els = {};
  function render() {
    const body = $('#shelfBody');
    const rows = ROWS.filter(visible).sort((a, b) => SORTS[state.sort](a, b) * state.dir);
    const frag = document.createDocumentFragment();
    rows.forEach(r => { frag.appendChild(els[r.id][0]); frag.appendChild(els[r.id][1]); });
    body.replaceChildren(frag);
    // counts and summary
    const shown = rows.length;
    const paid = rows.reduce((s, r) => s + r.paid, 0);
    const inCourt = rows.filter(r => r.light === 'red').length;
    $('#shelfSummary').textContent = `Showing ${shown} of ${ROWS.length} medicines · ${inCourt} in court now · about ${C.fmtUsd(paid)} paid on record`;
    $('#shelfEmpty').hidden = shown > 0;
    $('#shelfClear').hidden = !(state.q || state.light !== 'all' || state.issue !== 'all' || state.area !== 'all' || state.list !== 'all');
    $('.shelf-wrap').hidden = shown === 0;
    $$('#shelfLights .chip').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === state.light)));
    $$('#shelfIssues .chip').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === state.issue)));
    const DESC_FIRST = { paid: 1, latest: 1, issues: 1 };   // keys whose natural order is largest or newest first
    $$('#shelfTable thead th[data-sort]').forEach(th => {
      const k = th.dataset.sort;
      const asc = (state.dir === 1) !== !!DESC_FIRST[k];
      th.setAttribute('aria-sort', k === state.sort ? (asc ? 'ascending' : 'descending') : 'none');
    });
    $('#shelfSort').value = state.sort;
  }

  function chip(host, v, label, count) {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.dataset.v = v;
    b.setAttribute('aria-pressed', 'false');
    if (v in LIGHT_COLOR) { const i = document.createElement('i'); i.className = 'dot'; i.style.background = LIGHT_COLOR[v]; b.appendChild(i); }
    b.appendChild(document.createTextNode(label + (count != null ? ` (${count})` : '')));
    host.appendChild(b);
    return b;
  }

  function initControls() {
    const lights = $('#shelfLights');
    chip(lights, 'all', 'All', ROWS.length);
    LIGHT_ORDER.forEach(l => chip(lights, l, LIGHTS[l].label, ROWS.filter(r => r.light === l).length));
    lights.addEventListener('click', (e) => { const b = e.target.closest('.chip'); if (!b) return; state.light = b.dataset.v; render(); });

    const issues = $('#shelfIssues');
    chip(issues, 'all', 'Any problem');
    ISSUES.forEach(i => chip(issues, i.id, i.short === 'Spin' ? 'Research spin' : i.name.split(/,| &/)[0], ROWS.filter(r => r.issues.some(x => x.id === i.id)).length));
    issues.addEventListener('click', (e) => { const b = e.target.closest('.chip'); if (!b) return; state.issue = b.dataset.v; render(); });

    const area = $('#shelfArea');
    SH.AREAS.forEach(a => {
      const n = ROWS.filter(r => r.area === a.id).length; if (!n) return;
      const o = document.createElement('option'); o.value = a.id; o.textContent = `${a.name} (${n})`; area.appendChild(o);
    });
    area.addEventListener('change', () => { state.area = area.value; render(); });
    $('#shelfList').addEventListener('change', (e) => { state.list = e.target.value; render(); });

    const q = $('#shelfSearch');
    let t;
    q.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => { state.q = norm(q.value.trim()); render(); }, 80); });

    $('#shelfSort').addEventListener('change', (e) => { state.sort = e.target.value; state.dir = 1; render(); });
    $$('#shelfTable thead th[data-sort] button').forEach(btn => btn.addEventListener('click', () => {
      const k = btn.closest('th').dataset.sort;
      if (state.sort === k) state.dir *= -1; else { state.sort = k; state.dir = 1; }
      render();
    }));
    $('#shelfReset').addEventListener('click', reset);
    $('#shelfClear').addEventListener('click', reset);
  }

  function reset() {
    Object.assign(state, { q: '', light: 'all', issue: 'all', area: 'all', list: 'all' });
    $('#shelfSearch').value = ''; $('#shelfArea').value = 'all'; $('#shelfList').value = 'all';
    render();
  }

  // ---------- deep links: #shelf-<id> (and the pilot's old #med-<id>) ----------
  function onHash() {
    const h = decodeURIComponent(location.hash || '');
    const m = h.match(/^#(?:shelf|med)-(.+)$/);
    if (!m || !byId[m[1]]) return;
    const r = byId[m[1]];
    if (!visible(r)) reset();
    const [tr] = els[r.id];
    tr._toggle(true);
    setTimeout(() => tr.scrollIntoView({ behavior: C.reduceMotion ? 'auto' : 'smooth', block: 'start' }), 30);
  }

  function init() {
    if (!$('#shelfBody')) return;
    ROWS.forEach(r => { els[r.id] = rowEls(r); });
    initControls();
    render();
    window.addEventListener('hashchange', onHash);
    onHash();
  }

  return { init, rows: ROWS };
})();
