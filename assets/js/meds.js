/* Check your medicine: the 15-medicine pilot (findings, matrix, timeline). The lookup lives in shelf.js. */
window.Meds = (function () {
  const D = window.MEDS, C = window.Charts;
  const { ISSUES, STATUS, LIGHTS, MEDS } = D;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const NOW = 2026;
  const LIGHT_ORDER = ['red', 'amber', 'green'];
  const LIGHT_COLOR = { red: 'var(--critical)', amber: 'var(--warning)', green: 'var(--good)' };
  const issueById = Object.fromEntries(ISSUES.map(i => [i.id, i]));

  const chartName = (m) => m.short || m.name;
  const fullName = (m) => (m.short || m.brands === chartName(m)) ? chartName(m) : `${m.name} (${m.brands})`;
  const median = (a) => { const s = a.slice().sort((x, y) => x - y), k = s.length >> 1; return s.length % 2 ? s[k] : (s[k - 1] + s[k]) / 2; };
  const evText = (e) => `${e.year} · ${e.tag || STATUS[e.status].label} · ${e.title}${e.amount ? ' (' + e.amount + ')' : ''}`;

  function cellOf(m, issue) {
    const ev = m.events.filter(e => e.issue === issue);
    return {
      ev,
      proven: ev.some(e => STATUS[e.status].level === 3),
      open: ev.some(e => e.status === 'open'),
      raised: ev.some(e => STATUS[e.status].level === 1)
    };
  }

  // ---------- figures computed from the data ----------
  function figures() {
    const scripts = MEDS.filter(m => m.pbs.by === 'scripts');
    const cost = MEDS.filter(m => m.pbs.by === 'cost');
    const legal = (e) => !e.related && e.status !== 'raised' && e.status !== 'dismissed';
    // launch → first government action (penalty, settlement or lawsuit), own-drug events only
    const govLag = MEDS.map(m => {
      const e = m.events.filter(x => legal(x) && (x.by === 'gov' || x.by === 'foreign')).sort((a, b) => a.year - b.year)[0];
      return e ? e.year - m.launch : null;
    }).filter(v => v != null);
    // start of the conduct → the outcome (or the case), where the sources date the conduct
    const conductLag = [];
    MEDS.forEach(m => m.events.forEach(e => {
      if (e.during && legal(e) && e.by !== 'other' && e.by !== 'regulator') conductLag.push(e.year - e.during[0]);
    }));
    const dismissed = [];
    MEDS.forEach(m => m.events.forEach(e => { if (e.status === 'dismissed') dismissed.push({ m, e }); }));
    const count = (l) => MEDS.filter(m => m.light === l).length;
    return {
      scripts, cost, govLag, conductLag, dismissed,
      quietScripts: scripts.filter(m => m.light === 'green').length,
      hotCost: cost.filter(m => m.light !== 'green').length,
      red: count('red'), amber: count('amber'), green: count('green')
    };
  }

  function renderFindings() {
    const F = figures();
    const allOrN = (n, of) => n === of ? `All ${of}` : `${n} of ${of}`;
    const items = [
      { h: `The everyday drugs have the worst pasts, and the quietest present`,
        p: `${F.quietScripts} of the ${F.scripts.length} most-prescribed medicines are quiet now. Yet they carry most of the proven record: $784.6 million for hiding Protonix discounts from Medicaid, AstraZeneca’s Nexium kickback and $425 million kidney settlements, a guilty plea by Lexapro’s US seller, and Servier’s €331 million EU fine over perindopril. Nearly all of it happened while they were brand-name blockbusters. As cheap generics, their main risk now is factory quality.` },
      { h: `The trouble has followed the money`,
        p: `${allOrN(F.hotCost, F.cost.length)} of the PBS’s most expensive medicines are in court or show warning signs: two US government fraud cases over Eylea, about 30 lymphoma lawsuits over Dupixent, a class action accusing J&J of delaying Stelara’s cheaper rivals, and patent walls and pricing questions for Keytruda and Trikafta.` },
      { h: `Penalties arrive years later`,
        p: `Government action came ${Math.min(...F.govLag)} to ${Math.max(...F.govLag)} years after launch (median ${median(F.govLag)}), and ${Math.min(...F.conductLag)} to ${Math.max(...F.conductLag)} years after the conduct began. If something is going wrong with today’s blockbusters, the pattern suggests it will mostly surface in the 2030s.` },
      { h: `Not every accusation sticks`,
        p: `Injury lawsuits over ${F.dismissed.map(d => d.m.brands).join(' and ')} were thrown out because the evidence did not hold up in court. Dupixent’s lymphoma link is unproven too. "In court now" means payouts may be coming, not that a medicine is unsafe.` }
    ];
    const host = $('#medFindings');
    host.replaceChildren();
    items.forEach((it, i) => {
      const d = document.createElement('div'); d.className = 'finding reveal';
      d.innerHTML = '<span class="n"></span><h4></h4><p></p>';
      d.children[0].textContent = `Finding ${i + 1}`;
      d.children[1].textContent = it.h;
      d.children[2].textContent = it.p;
      host.appendChild(d);
    });
    $('#medPredict').innerHTML = `<span class="kicker">So, can anyone predict the next payout?</span>
      <p><strong>Partly.</strong> A live court case is the best predictor we have: ${F.red} of the 15 have one. Even then the outcome, size and timing are uncertain, and two big injury cases in this pilot were thrown out. Warning signs such as patent walls, safety signals and pricing probes raise the odds without saying when. The biggest blind spot is whistleblower suits, which are filed under seal and can stay secret for years. Two cases here began that way (the Nexium kickbacks and the Eylea pricing case), and nobody outside could have seen them coming.</p>`;
  }

  // ---------- legends (inline SVG keys) ----------
  const KEY = {
    proven: '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="3" width="10" height="10" rx="2.5" style="fill:var(--ink)"/></svg>',
    open: '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6" style="fill:none;stroke:var(--critical);stroke-width:2.2"/></svg>',
    raised: '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="4" style="fill:var(--surface);stroke:var(--axis-ink);stroke-width:1.5"/></svg>',
    none: '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="1.6" style="fill:var(--axis)"/></svg>',
    dot: '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="5" style="fill:var(--ink)"/></svg>',
    span: '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="1" y="4" width="14" height="8" rx="2" style="fill:var(--ink);opacity:.16"/></svg>',
    launch: '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="7" y="2" width="2.4" height="12" rx="1" style="fill:var(--ink-2)"/></svg>',
    tail: '<svg viewBox="0 0 22 16" aria-hidden="true"><circle cx="6" cy="8" r="4.5" style="fill:none;stroke:var(--critical);stroke-width:2"/><path d="M11 8h10" style="stroke:var(--critical);stroke-width:1.6;stroke-dasharray:2.5 2.5"/></svg>'
  };
  function keyLegend(host, items) {
    host.replaceChildren();
    items.forEach(([k, label]) => {
      const s = document.createElement('span'); s.className = 'key';
      s.innerHTML = KEY[k];
      s.appendChild(document.createTextNode(label));
      host.appendChild(s);
    });
  }

  // ---------- tooltip binding (only marks with content are focusable) ----------
  function tip(mark, host, specFn, focusable) {
    const on = (e) => { host.classList.add('hovering'); mark.classList.add('hot'); C.Tip.show(e, specFn()); };
    const off = () => { host.classList.remove('hovering'); mark.classList.remove('hot'); C.Tip.hide(); };
    mark.classList.add('mark');
    mark.addEventListener('pointerenter', on);
    mark.addEventListener('pointermove', (e) => C.Tip.move(e));
    mark.addEventListener('pointerleave', off);
    if (focusable) {
      mark.setAttribute('tabindex', '0');
      mark.addEventListener('focus', on);
      mark.addEventListener('blur', off);
    }
  }

  function nameLink(svg, m, x, y, text, anchor) {
    const a = C.el('a', { href: '#shelf-' + m.id, class: 'med-name' }, svg);
    C.el('text', { x, y, 'text-anchor': anchor || 'start', class: 'label-text', text }, a);
    return a;
  }

  // ---------- matrix: medicine × type of problem ----------
  function renderMatrix() {
    const host = $('#medMatrix');
    keyLegend($('#medMatrixLegend'), [['proven', 'Paid or proven'], ['open', 'In court now'], ['raised', 'Raised, not proven, or thrown out'], ['none', 'Nothing found']]);
    C.responsive(host, (W) => {
      host.replaceChildren();
      const narrow = W < 620;
      const labelW = narrow ? 112 : 240;
      const headH = narrow ? 78 : 40;
      const rowH = 30, groupH = 32;
      const cellW = (W - labelW) / ISSUES.length;
      const rows = [];
      LIGHT_ORDER.forEach(l => {
        const ms = MEDS.filter(m => m.light === l);
        if (!ms.length) return;
        rows.push({ group: l, n: ms.length });
        ms.forEach(m => rows.push({ m }));
      });
      const H = headH + rows.reduce((h, r) => h + (r.group ? groupH : rowH), 0) + 4;
      const svg = C.el('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: 'img',
        'aria-label': 'Grid of the 15 medicines against six types of problem, showing which were paid or proven, which are in court now, and which were raised but not proven.' });
      ISSUES.forEach((iss, j) => {
        const cx = labelW + j * cellW + cellW / 2;
        const t = C.el('text', { x: cx, y: headH - 10, 'text-anchor': narrow ? 'start' : 'middle', class: 'label-text', style: 'font-weight:700', text: iss.short }, svg);
        if (narrow) t.setAttribute('transform', `rotate(-50 ${cx} ${headH - 10})`);
      });
      let y = headH;
      rows.forEach(r => {
        if (r.group) {
          C.el('line', { x1: 0, x2: W, y1: y + 0.5, y2: y + 0.5, class: 'grid-line' }, svg);
          C.el('circle', { cx: 6, cy: y + groupH / 2 + 1, r: 5, style: `fill:${LIGHT_COLOR[r.group]}` }, svg);
          C.el('text', { x: 18, y: y + groupH / 2 + 5, class: 'label-strong', text: `${LIGHTS[r.group].label} · ${r.n}` }, svg);
          y += groupH;
          return;
        }
        const m = r.m, cy = y + rowH / 2;
        nameLink(svg, m, 18, cy + 4, narrow ? chartName(m) : fullName(m));
        ISSUES.forEach((iss, j) => {
          const cx = labelW + j * cellW + cellW / 2;
          const c = cellOf(m, iss.id);
          const g = C.el('g', {}, svg);
          C.el('rect', { x: cx - cellW / 2 + 1, y: y + 1, width: Math.max(0, cellW - 2), height: rowH - 2, rx: 4, style: 'fill:transparent' }, g);
          if (!c.ev.length) {
            C.el('circle', { cx, cy, r: 1.6, style: 'fill:var(--axis)' }, g);
          } else {
            if (c.open) C.el('circle', { cx, cy, r: 10, style: 'fill:none;stroke:var(--critical);stroke-width:2.4' }, g);
            if (c.proven) C.el('rect', { x: cx - 5.5, y: cy - 5.5, width: 11, height: 11, rx: 2.5, style: 'fill:var(--ink)' }, g);
            else if (c.raised) C.el('circle', { cx, cy, r: 4, style: 'fill:var(--surface);stroke:var(--axis-ink);stroke-width:1.5' }, g);
          }
          tip(g, host, () => ({
            title: `${chartName(m)} · ${iss.name}`,
            rows: c.ev.length ? c.ev.map(e => ({ label: evText(e) })) : [{ label: 'Nothing found' }],
            note: c.ev.some(e => e.related) ? 'Includes a case about the parent drug.' : ''
          }), c.ev.length > 0);
        });
        y += rowH;
      });
      host.appendChild(svg);
    });
  }

  // ---------- timeline: launch → today ----------
  function renderTimeline() {
    const host = $('#medTimeline');
    keyLegend($('#medTimelineLegend'), [['launch', 'Launch'], ['span', 'When the conduct happened'], ['dot', 'Paid or proven'], ['tail', 'In court now'], ['raised', 'Raised, not proven, or thrown out']]);
    const y0 = 1985, y1 = NOW + 1;
    C.responsive(host, (W) => {
      host.replaceChildren();
      const narrow = W < 620;
      const labelW = narrow ? 104 : 168, right = 8;
      const rowH = narrow ? 26 : 28, top = 18, axisH = 26;
      const meds = MEDS.slice().sort((a, b) => a.launch - b.launch || a.pbs.rank - b.pbs.rank);
      const H = top + meds.length * rowH + axisH;
      const x = (yr) => labelW + ((Math.max(y0, Math.min(y1, yr)) - y0) / (y1 - y0)) * (W - labelW - right);
      const svg = C.el('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: 'img',
        'aria-label': 'Timeline for each medicine from launch to today, showing when misconduct happened and when it was resolved or reached court.' });
      const axisY = top + meds.length * rowH + 4;
      for (let yr = 1985; yr <= 2025; yr += 5) {
        if (narrow && yr % 10) continue;
        C.el('line', { x1: x(yr), x2: x(yr), y1: top, y2: axisY, class: 'grid-line' }, svg);
        if (yr < 2025) C.el('text', { x: x(yr), y: axisY + 16, 'text-anchor': 'middle', class: 'axis-text', text: yr }, svg);
      }
      const xNow = x(NOW + 0.8);
      C.el('line', { x1: xNow, x2: xNow, y1: top - 4, y2: axisY, style: 'stroke:var(--ink-2);stroke-width:1;stroke-dasharray:2 3' }, svg);
      C.el('text', { x: xNow + 2, y: top - 8, 'text-anchor': 'end', class: 'axis-text', style: 'font-weight:700', text: 'Now' }, svg);
      const r = narrow ? 4.2 : 5;
      meds.forEach((m, i) => {
        const cy = top + i * rowH + rowH / 2;
        nameLink(svg, m, labelW - 10, cy + 4, chartName(m), 'end');
        const lx = x(m.launch);
        C.el('line', { x1: lx, x2: xNow, y1: cy, y2: cy, style: 'stroke:var(--axis);stroke-width:2;stroke-linecap:round' }, svg);
        if (m.launch < y0) {
          C.el('text', { x: lx + 4, y: cy - 6, class: 'axis-text', style: 'font-size:10px', text: `◂ ${m.launch}` }, svg);
        } else {
          const t = C.el('rect', { x: lx - 1.2, y: cy - 7, width: 2.4, height: 14, rx: 1, style: 'fill:var(--ink-2)' }, svg);
          tip(t, host, () => ({ title: `${chartName(m)} launched`, value: String(m.launch) }), false);
        }
        m.events.filter(e => e.during && !e.related).forEach(e => {
          const sx = x(e.during[0]), ex = x(e.during[1] + 1);
          const b = C.el('rect', { x: sx, y: cy - 5, width: Math.max(3, ex - sx), height: 10, rx: 2.5, style: 'fill:var(--ink);opacity:.16' }, svg);
          tip(b, host, () => ({ title: e.title, rows: [{ label: `Conduct ${e.during[0]}–${e.during[1]}, outcome ${e.year}` }] }), false);
        });
        const seen = {};
        m.events.slice().sort((a, b) => a.year - b.year).forEach(e => {
          const k = e.year; seen[k] = (seen[k] || 0) + 1;
          const cx = x(e.year + 0.5) + (seen[k] - 1) * (r * 1.6);
          const g = C.el('g', {}, svg);
          if (e.status === 'open') {
            C.el('line', { x1: cx + r, x2: xNow, y1: cy, y2: cy, style: 'stroke:var(--critical);stroke-width:1.6;stroke-dasharray:3 3' }, g);
            C.el('circle', { cx, cy, r: r + 0.6, style: 'fill:var(--surface);stroke:var(--critical);stroke-width:2.2' }, g);
          } else if (STATUS[e.status].level === 3) {
            C.el('circle', { cx, cy, r, style: 'fill:var(--ink);stroke:var(--surface);stroke-width:1' }, g);
          } else {
            C.el('circle', { cx, cy, r: r - 1, style: 'fill:var(--surface);stroke:var(--axis-ink);stroke-width:1.5' }, g);
          }
          tip(g, host, () => ({
            value: e.amount || '',
            title: `${chartName(m)}: ${e.title}`,
            rows: [{ label: `${e.year} · ${e.tag || STATUS[e.status].label} · ${issueById[e.issue].name}` }],
            note: [e.during ? `Conduct ${e.during[0]}–${e.during[1]}.` : '', e.related ? `About the parent drug, ${e.related}.` : ''].filter(Boolean).join(' ')
          }), true);
        });
      });
      host.appendChild(svg);
    });
  }

  function init() {
    if (!D || !$('#medFindings')) return;
    renderFindings();
    renderMatrix();
    renderTimeline();
    $$('#medicines .reveal').forEach(n => C.observe(n));
  }

  return { init, figures };
})();
