/* The lab bench: five more experiments (tabs inside the science lab). */
(function () {
  const C = window.Charts, el = C.el;
  const $ = (id) => document.getElementById(id);
  const stats = () => window.LabStats;

  // ═══════════════ Tabs ═══════════════
  function initTabs() {
    const tabs = Array.from(document.querySelectorAll('#benchTabs [role="tab"]'));
    const show = (t) => tabs.forEach(x => {
      const on = x === t;
      x.setAttribute('aria-selected', String(on));
      x.tabIndex = on ? 0 : -1;
      $(x.getAttribute('aria-controls')).hidden = !on;
    });
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => show(t));
      t.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
        n.focus(); show(n);
      });
    });
  }

  // ═══════════════ 1. Headline translator: relative v absolute risk ═══════════════
  function initRisk() {
    const base = $('rBase'), rrr = $('rRrr'), host = $('rArray');
    if (!host) return;
    C.legend($('rLegend'), [
      { label: 'Has a heart attack anyway', color: 'var(--c2)' },
      { label: 'Spared by the drug', color: 'var(--c1)' },
      { label: 'Fine either way', color: 'var(--axis)' }
    ], 'dot');
    let dots = [], lastW = 0;

    function counts() {
      const b = +base.value / 100, r = +rrr.value / 100;
      const before = Math.round(b * 1000);
      const after = Math.round(b * (1 - r) * 1000);
      return { b, r, before, after, spared: before - after };
    }

    function build(W) {
      host.replaceChildren();
      const cols = 40, rows = 25;
      const d = Math.min(14, W / cols);                 // cell pitch
      const r = Math.max(1.6, d / 2 - (W < 420 ? 0.8 : 1.4));
      const Wd = cols * d, H = rows * d;
      const svg = el('svg', { viewBox: `0 0 ${Wd} ${H}`, width: Wd, height: H, role: 'img', 'aria-label': '1,000 people' });
      dots = [];
      for (let i = 0; i < 1000; i++) {
        const cx = (i % cols) * d + d / 2, cy = Math.floor(i / cols) * d + d / 2;
        dots.push(el('circle', { cx, cy, r, style: 'fill:var(--axis);transition:fill .35s ease' }, svg));
      }
      host.appendChild(svg);
      paint();
    }

    function paint() {
      const k = counts();
      $('rBaseOut').textContent = (+base.value) + '%';
      $('rRrrOut').textContent = (+rrr.value) + '%';
      dots.forEach((c, i) => {
        c.style.fill = i < k.after ? 'var(--c2)' : i < k.before ? 'var(--c1)' : 'var(--axis)';
      });
      const nnt = k.spared > 0 ? Math.ceil(1000 / k.spared) : null;
      $('rRel').textContent = `"Wonderstat cuts heart attacks by ${rrr.value}%!"`;
      $('rAbs').textContent = `${k.before} in 1,000 people have a heart attack without it, ${k.after} with it: ${(k.spared / 10).toFixed(1).replace(/\.0$/, '')} percentage point${k.spared === 10 ? '' : 's'} less.`;
      $('rNnt').textContent = nnt
        ? `${nnt} people take it for 5 years for one of them to avoid a heart attack. The other ${nnt - 1} get no benefit.`
        : 'At this risk level, fewer than 1 in 1,000 people benefit.';
      $('rCaption').textContent = `Out of 1,000 people like you taking it for 5 years: ${k.after} still have a heart attack, ${k.spared} are spared, and ${1000 - k.before} would have been fine without it.`;
    }

    C.responsive(host, (W) => { lastW = W; build(W); });
    base.addEventListener('input', paint);
    rrr.addEventListener('input', paint);
    document.querySelectorAll('#panel-risk [data-preset]').forEach(b => b.addEventListener('click', () => {
      const [bv, rv] = b.dataset.preset.split(',');
      base.value = bv; rrr.value = rv; paint();
    }));
  }

  // ═══════════════ 2. Stopped early for benefit ═══════════════
  // One trial: binary outcome, 1,000 patients per arm, interim looks at 250/500/750.
  const P0 = 0.10, N = 1000, LOOKS = [250, 500, 750, 1000];
  function runStopTrial(rrr, alpha) {
    const p1 = P0 * (1 - rrr);
    let e0 = 0, e1 = 0, n = 0;
    for (const look of LOOKS) {
      for (; n < look; n++) { if (Math.random() < P0) e0++; if (Math.random() < p1) e1++; }
      const pool = (e0 + e1) / (2 * n);
      const se = Math.sqrt(2 * pool * (1 - pool) / n);
      const z = se > 0 ? (e0 - e1) / n / se : 0;            // positive z favours the drug
      const p = 2 * (1 - stats().normCdf(Math.abs(z)));
      const est = e0 > 0 ? 1 - e1 / e0 : 0;                  // estimated relative risk reduction
      if (look < N && z > 0 && p < alpha) return { est, early: true, look };
      if (look === N) return { est, early: false, look };
    }
  }

  function initStop() {
    const host = $('sChart');
    if (!host) return;
    let alpha = 0.001, results = [], lastW = 0;
    C.legend($('sLegend'), [{ label: 'Stopped early for benefit', color: 'var(--c2)' }, { label: 'Ran to the end', color: 'var(--c1)' }], 'dot');
    const trueEl = $('sTrue');
    trueEl.addEventListener('input', () => { $('sTrueOut').textContent = trueEl.value + '%'; });

    function simulate() {
      const rrr = +trueEl.value / 100;
      results = [];
      for (let i = 0; i < 400; i++) results.push(Object.assign(runStopTrial(rrr, alpha), { jit: Math.random() }));
      draw(lastW || Math.round(host.clientWidth));
      const early = results.filter(r => r.early), done = results.filter(r => !r.early);
      const mean = (a) => a.reduce((s, r) => s + r.est, 0) / a.length * 100;
      $('sSummary').textContent = early.length
        ? `${early.length} of 400 trials stopped early. On average they reported a ${mean(early).toFixed(0)}% reduction in heart attacks. The true effect is ${trueEl.value}%. Trials that ran to the end averaged ${done.length ? mean(done).toFixed(0) : '–'}%.`
        : `None of the 400 trials stopped early. Try a bigger true effect or the lenient stopping rule.`;
    }

    function draw(W) {
      host.replaceChildren();
      if (!W) return;
      const H = 230, left = 8, right = 8, top = 16, rowH = 70, gap = 34;
      const xMin = -0.4, xMax = 0.8;
      const x = (v) => left + ((Math.max(xMin, Math.min(xMax, v)) - xMin) / (xMax - xMin)) * (W - left - right);
      const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: 'img', 'aria-label': 'Estimated effects of simulated trials' });
      [-0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8].forEach(t => {
        el('line', { x1: x(t), x2: x(t), y1: top, y2: top + rowH * 2 + gap, class: t === 0 ? 'base-line' : 'grid-line' }, svg);
        if (W >= 420 || t * 10 % 4 === 0) el('text', { x: x(t), y: H - 6, 'text-anchor': 'middle', class: 'axis-text', text: (t > 0 ? '+' : '') + Math.round(t * 100) + '%' }, svg);
      });
      el('text', { x: x(-0.4), y: H - 20, class: 'label-text', style: 'font-size:11px', text: 'Estimated reduction in heart attacks →' }, svg);
      const rows = [{ key: true, label: 'Stopped early', color: 'var(--c2)' }, { key: false, label: 'Ran to the end', color: 'var(--c1)' }];
      rows.forEach((row, ri) => {
        const y0 = top + ri * (rowH + gap);
        const list = results.filter(r => r.early === row.key);
        el('text', { x: left, y: y0 - 4, class: 'label-strong', text: `${row.label} (${list.length})` }, svg);
        list.forEach(r => {
          const c = el('circle', { cx: x(r.est), cy: y0 + 8 + r.jit * (rowH - 16), r: 3.2, style: `fill:${row.color};stroke:var(--surface);stroke-width:1;opacity:.85` }, svg);
          C.bindTip(c, host, () => ({ value: `${Math.round(r.est * 100)}% fewer heart attacks`, title: r.early ? `Stopped after ${r.look} patients per arm` : 'Ran to 1,000 patients per arm' }));
        });
        if (list.length) {
          const m = list.reduce((s, r) => s + r.est, 0) / list.length;
          el('line', { x1: x(m), x2: x(m), y1: y0 + 2, y2: y0 + rowH - 2, style: `stroke:var(--ink);stroke-width:2` }, svg);
          el('text', { x: x(m) + 5, y: y0 + rowH - 4, class: 'label-strong', style: 'font-size:11px;paint-order:stroke;stroke:var(--surface);stroke-width:3px;stroke-linejoin:round', text: `average ${Math.round(m * 100)}%` }, svg);
        }
      });
      const tx = x(+trueEl.value / 100);
      el('line', { x1: tx, x2: tx, y1: top - 6, y2: top + rowH * 2 + gap, style: 'stroke:var(--accent);stroke-width:1.5' }, svg);
      el('text', { x: tx + 4, y: top + rowH + gap / 2 + 4, class: 'label-text', style: 'font-size:11px;fill:var(--accent);font-weight:700;paint-order:stroke;stroke:var(--surface);stroke-width:3px;stroke-linejoin:round', text: `truth ${trueEl.value}%` }, svg);
      host.appendChild(svg);
    }

    C.responsive(host, (W) => { lastW = W; draw(W); });
    document.querySelectorAll('#sRule button').forEach(b => b.addEventListener('click', () => {
      alpha = +b.dataset.alpha;
      document.querySelectorAll('#sRule button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    }));
    $('sRun').addEventListener('click', simulate);
    simulate();
  }

  // ═══════════════ 3. The miracle cure: regression to the mean ═══════════════
  function initRtm() {
    const host = $('mChart');
    if (!host) return;
    const cut = $('mCut'), plac = $('mPlacebo');
    let groups = [], lastW = 0;

    function simulate() {
      const g = stats().gaussian;
      const recruits = [];
      while (recruits.length < 120) {
        const usual = 140 + 12 * g();                 // person's usual systolic pressure
        const first = usual + 10 * g();               // reading on screening day
        if (first >= +cut.value) recruits.push({ first, later: usual + 10 * g(), jit: Math.random() });  // the pill does nothing
      }
      groups = plac.checked
        ? [{ name: 'Wonderzol', color: 'var(--c1)', people: recruits.slice(0, 60) }, { name: 'Placebo', color: 'var(--c2)', people: recruits.slice(60) }]
        : [{ name: 'Wonderzol', color: 'var(--c1)', people: recruits.slice(0, 60) }];
      C.legend($('mLegend'), groups.map(gr => ({ label: `${gr.name} group average`, color: gr.color })).concat([{ label: 'One patient', color: 'var(--axis)' }]));
      draw(lastW || Math.round(host.clientWidth));
      const avg = (a, k) => a.reduce((s, p) => s + p[k], 0) / a.length;
      const drop = (gr) => avg(gr.people, 'first') - avg(gr.people, 'later');
      const w = groups[0];
      $('mCutOut').textContent = cut.value + ' mmHg';
      if (groups.length === 1) {
        $('mSummary').textContent = `Average blood pressure fell from ${avg(w.people, 'first').toFixed(0)} to ${avg(w.people, 'later').toFixed(0)} mmHg, a drop of ${drop(w).toFixed(0)}. A "miracle" from a pill that does nothing.`;
      } else {
        const d = drop(w) - drop(groups[1]);
        $('mSummary').textContent = `Wonderzol group fell ${drop(w).toFixed(0)} mmHg; placebo group fell ${drop(groups[1]).toFixed(0)}. The difference between them, the only part a drug could claim, is ${d >= 0 ? '' : '−'}${Math.abs(d).toFixed(0)} mmHg: noise.`;
      }
    }

    function draw(W) {
      host.replaceChildren();
      if (!W) return;
      const two = groups.length > 1, narrow = W < 520;
      const H = 270, top = two ? 46 : 26, bottom = 30, left = 40;
      const yMin = 110, yMax = 200;
      const y = (v) => top + (1 - (Math.max(yMin, Math.min(yMax, v)) - yMin) / (yMax - yMin)) * (H - top - bottom);
      const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: 'img', 'aria-label': 'Blood pressure at enrolment and four weeks later' });
      [120, 140, 160, 180, 200].forEach(t => {
        el('line', { x1: left, x2: W - 6, y1: y(t), y2: y(t), class: 'grid-line' }, svg);
        el('text', { x: left - 6, y: y(t) + 4, 'text-anchor': 'end', class: 'axis-text', text: t }, svg);
      });
      el('text', { x: 0, y: 12, class: 'label-text', style: 'font-size:11px', text: 'Systolic blood pressure (mmHg)' }, svg);
      const panelW = (W - left - 6) / groups.length;
      groups.forEach((gr, gi) => {
        const x0 = left + gi * panelW + panelW * 0.22, x1 = left + gi * panelW + panelW * 0.78;
        const short = two && narrow;
        el('text', { x: x0, y: H - 10, 'text-anchor': 'middle', class: 'axis-text', text: short ? 'start' : 'enrolment' }, svg);
        el('text', { x: x1, y: H - 10, 'text-anchor': 'middle', class: 'axis-text', text: short ? '+4 wks' : '4 weeks later' }, svg);
        if (two) el('text', { x: (x0 + x1) / 2, y: top - 10, 'text-anchor': 'middle', class: 'label-strong', text: gr.name }, svg);
        gr.people.forEach(p => el('line', { x1: x0, y1: y(p.first), x2: x1, y2: y(p.later), style: 'stroke:var(--axis);stroke-width:1;opacity:.7' }, svg));
        const a = gr.people.reduce((s, p) => s + p.first, 0) / gr.people.length;
        const b = gr.people.reduce((s, p) => s + p.later, 0) / gr.people.length;
        el('line', { x1: x0, y1: y(a), x2: x1, y2: y(b), style: `stroke:${gr.color};stroke-width:3;stroke-linecap:round` }, svg);
        [[x0, a, 'end', -8], [x1, b, 'start', 8]].forEach(([xx, v, anc, dx]) => {
          el('circle', { cx: xx, cy: y(v), r: 4.5, style: `fill:${gr.color};stroke:var(--surface);stroke-width:2` }, svg);
          el('text', { x: xx + dx, y: y(v) + 4, 'text-anchor': anc, class: 'label-strong', style: 'paint-order:stroke;stroke:var(--surface);stroke-width:3px;stroke-linejoin:round', text: v.toFixed(0) }, svg);
        });
      });
      host.appendChild(svg);
    }

    C.responsive(host, (W) => { lastW = W; draw(W); });
    cut.addEventListener('input', () => { $('mCutOut').textContent = cut.value + ' mmHg'; });
    cut.addEventListener('change', simulate);
    plac.addEventListener('change', simulate);
    $('mRun').addEventListener('click', simulate);
    simulate();
  }

  // ═══════════════ 4. The surrogate trap ═══════════════
  const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M7.5 12.5l3 3 6-6.5"/></svg>';
  const CROSS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M8.5 8.5l7 7M15.5 8.5l-7 7"/></svg>';
  const CASES = [
    { id: 'cast', tab: 'Heart-rhythm drugs',
      drug: 'Encainide and flecainide, 1980s',
      surrogate: 'Suppressed the irregular heartbeats that often come before sudden death after a heart attack. Suppressing them seemed obviously good.',
      bars: { pct: true, caption: 'Share of patients who died', rows: [['Encainide or flecainide', 7.7, 'var(--c2)'], ['Placebo', 3.0, 'var(--c1)']] },
      outcome: 'In the CAST trial, about 10 months in, 56 of 730 patients on the drugs had died, against 22 of 725 on placebo. The two drug arms were stopped early for harm in 1989.',
      src: ['CAST preliminary report, NEJM 1989', 'https://pubmed.ncbi.nlm.nih.gov/2473403/'] },
    { id: 'torce', tab: 'Torcetrapib',
      drug: 'Torcetrapib (Pfizer), 2006',
      surrogate: 'Raised HDL, the "good" cholesterol, by more than 60%. Pfizer spent close to US$1 billion developing it as a successor to Lipitor.',
      bars: { pct: false, caption: 'Deaths, with about 7,500 patients in each group', rows: [['Torcetrapib plus Lipitor', 82, 'var(--c2)'], ['Lipitor alone', 51, 'var(--c1)']] },
      outcome: 'In the 15,000-patient ILLUMINATE trial, more people died on torcetrapib. Pfizer stopped development in December 2006.',
      src: ['Healio, 2006', 'https://www.healio.com/news/cardiology/20120225/pfizer-discontinues-phase-3-trial-of-torcetrapib'] },
    { id: 'avandia', tab: 'Avandia',
      drug: 'Rosiglitazone / Avandia (GSK), approved 1999',
      surrogate: 'Lowered blood sugar (HbA1c), the measure it was approved on. It became a diabetes blockbuster.',
      big: '×1.43', bigNote: 'odds of a heart attack',
      outcome: 'A 2007 analysis of 42 trials found significantly higher odds of heart attack. Europe suspended the drug in 2010 and the US restricted it. Lower blood sugar had not meant healthier hearts.',
      src: ['Nissen & Wolski, NEJM 2007', 'https://doi.org/10.1056/NEJMoa072761'] },
    { id: 'esa', tab: 'Anaemia drugs',
      drug: 'Epoetin and darbepoetin (Epogen, Aranesp), 2000s',
      surrogate: 'Raised haemoglobin in anaemic kidney patients. Many doctors aimed for near-normal levels, on the theory that more is better.',
      big: '×1.92', bigNote: 'risk of stroke when aiming for 13 g/dL or more',
      outcome: 'Aiming for higher haemoglobin led to more deaths and hospitalisations (CHOIR, 2006) and nearly doubled stroke risk (TREAT, 2009). The FDA added warnings from 2007. Amgen later pleaded guilty over promoting Aranesp at doses beyond its label.',
      src: ['TREAT trial summary', 'https://www.wikijournalclub.org/wiki/TREAT'] }
  ];
  function initSurrogate() {
    const pick = $('surrPick'), host = $('surrCase');
    if (!pick) return;
    function show(id) {
      const c = CASES.find(x => x.id === id);
      pick.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.id === id)));
      host.innerHTML = `
        <div class="side"><div class="who">${c.drug}</div><div class="verdict good">${CHECK}<span>The number improved</span></div><p class="small" style="margin:0"></p></div>
        <div class="side"><div class="who">What happened to patients</div>
          <button class="btn primary surr-reveal">Show me</button>
          <div class="surr-out" hidden></div>
        </div>`;
      host.querySelector('.side p').textContent = c.surrogate;
      const out = host.querySelector('.surr-out');
      let inner = `<div class="verdict bad">${CROSS}<span>Patients did worse</span></div>`;
      if (c.bars) {
        const max = Math.max(...c.bars.rows.map(r => r[1]));
        inner += '<div class="meter">' + c.bars.rows.map(r => `<div class="meter-row"><span class="small"></span><div class="meter-track"><div class="meter-fill" style="background:${r[2]}" data-w="${(r[1] / max * 100).toFixed(1)}"></div></div><span class="v">${r[1]}${c.bars.pct ? '%' : ''}</span></div>`).join('') + `</div><div class="small muted">${c.bars.caption}</div>`;
      } else {
        inner += `<div class="big">${c.big}</div><div class="small muted">${c.bigNote}</div>`;
      }
      inner += '<p class="small" style="margin:0"></p><div class="small"><a target="_blank" rel="noopener"></a></div>';
      out.innerHTML = inner;
      if (c.bars) out.querySelectorAll('.meter-row > span.small').forEach((s, i) => { s.textContent = c.bars.rows[i][0]; });
      out.querySelector('p').textContent = c.outcome;
      const a = out.querySelector('a'); a.href = c.src[1]; a.textContent = c.src[0] + ' ↗';
      host.querySelector('.surr-reveal').addEventListener('click', (e) => {
        e.currentTarget.remove(); out.hidden = false;
        requestAnimationFrame(() => requestAnimationFrame(() => out.querySelectorAll('.meter-fill').forEach(f => { f.style.width = f.dataset.w + '%'; })));
      });
    }
    CASES.forEach(c => {
      const b = document.createElement('button'); b.className = 'chip'; b.dataset.id = c.id; b.textContent = c.tab; b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', () => show(c.id)); pick.appendChild(b);
    });
    show(CASES[0].id);
  }

  // ═══════════════ 5. Spot the switch ═══════════════
  const SWITCHES = {
    population: 'Analysis population. The plan said all 400 randomised patients would be analysed ("intention to treat"). The paper analysed only the 312 who finished. People who dropped out, often because of side effects or no benefit, vanished from the results.',
    outcome: 'Primary outcome. The plan said average change in depression score. The paper used "response" (a 50% improvement) instead, presumably because it gave a significant result.',
    timepoint: 'Timing. The plan said week 8; the paper reports week 6. Picking whichever week looks best is classic outcome switching.',
    subgroup: 'Unplanned subgroup. No subgroups were planned. Fishing for one (here, under-40s) and headlining it is how chance findings become "results".',
    harms: 'Missing harms. The planned key safety outcome, suicidal thoughts and behaviour, is not reported at all. "Generally well tolerated" replaces the data.'
  };
  function initSwitch() {
    const paper = $('switchPaper');
    if (!paper) return;
    const found = new Set();
    let revealed = 0;
    const notes = $('switchNotes'), score = $('switchScore');
    const keys = Object.keys(SWITCHES);
    function addNote(k) {
      const li = document.createElement('li'); li.textContent = SWITCHES[k]; notes.appendChild(li);
    }
    function update() {
      const fact = 'In a check of 67 trials in the top five medical journals, 58 had discrepancies like these.';
      score.textContent = found.size < keys.length ? `Found ${found.size} of ${keys.length}`
        : revealed ? `You found ${keys.length - revealed} of ${keys.length}; the rest are highlighted. ${fact}`
        : `All ${keys.length} found. ${fact}`;
    }
    paper.querySelectorAll('.clue').forEach(b => b.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); b.click(); }
    }));
    paper.querySelectorAll('.clue').forEach(b => b.addEventListener('click', () => {
      const k = b.dataset.key;
      if (k) {
        if (found.has(k)) return;
        found.add(k); b.classList.add('found'); b.setAttribute('aria-label', b.textContent + ' (does not match the protocol)'); addNote(k);
      } else {
        b.classList.add('matches'); b.title = 'This matches the protocol'; b.setAttribute('aria-label', b.textContent + ' (matches the protocol)');
      }
      update();
    }));
    $('switchReveal').addEventListener('click', () => {
      paper.querySelectorAll('.clue[data-key]').forEach(b => {
        const k = b.dataset.key;
        if (!found.has(k)) { found.add(k); revealed++; b.classList.add('revealed'); addNote(k); }
      });
      update();
    });
    update();
  }

  window.Bench = { init() { initTabs(); initRisk(); initStop(); initRtm(); initSurrogate(); initSwitch(); } };
})();
