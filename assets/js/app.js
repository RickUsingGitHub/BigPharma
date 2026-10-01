/* Big Pharma on Trial — page controller. */
(function () {
  const P = window.PHARMA, C = window.Charts;
  const { CATEGORIES, KINDS, COMPANIES, OTHERS, CASES } = P;
  const fmt = C.fmtUsd;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  const ALL_COS = COMPANIES.concat(OTHERS);
  const SHORT = { pfizer: 'Pfizer', jnj: 'J&J', roche: 'Roche', merck: 'Merck', abbvie: 'AbbVie', astrazeneca: 'AstraZeneca',
    novartis: 'Novartis', bms: 'BMS', sanofi: 'Sanofi', lilly: 'Lilly', novo: 'Novo Nordisk', gsk: 'GSK', purdue: 'Purdue',
    teva: 'Teva', takeda: 'Takeda', amgen: 'Amgen', mylan: 'Mylan', insys: 'Insys', ranbaxy: 'Ranbaxy', gilead: 'Gilead', vyera: 'Vyera' };
  const coById = Object.fromEntries(ALL_COS.map(c => [c.id, c]));
  const catIndex = Object.fromEntries(CATEGORIES.map((c, i) => [c.id, i]));
  const catColor = (id) => C.catColor(catIndex[id]);
  const catName = (id) => CATEGORIES[catIndex[id]].name;
  CATEGORIES.forEach((c, i) => { c.color = C.catColor(i); });

  // ---------- what counts ----------
  const isFinal = (c) => !c.status || c.status === 'final';
  const govAmt = (c) => (c.kind === 'gov' || c.kind === 'foreign') && isFinal(c) ? (c.count != null ? c.count : c.usd) : 0;
  const privAmt = (c) => c.kind === 'private' && isFinal(c) ? c.usd : 0;
  const counted = (c, mode) => govAmt(c) + (mode === 'all' ? privAmt(c) : 0);
  const isCrim = (c) => c.crim === 'plea' || c.crim === 'conviction';
  const sum = (arr, f) => arr.reduce((a, x) => a + f(x), 0);
  CASES.forEach(c => { c.color = catColor(c.cat); c.catName = catName(c.cat); });

  function coStats(id) {
    const cs = CASES.filter(c => c.co === id);
    return {
      cases: cs,
      gov: sum(cs, govAmt),
      priv: sum(cs, privAmt),
      pleas: cs.filter(isCrim).length,
      dpas: cs.filter(c => c.crim === 'dpa').length,
      byCat: CATEGORIES.map(k => sum(cs.filter(c => c.cat === k.id), govAmt))
    };
  }

  // ---------- theme + nav ----------
  function initChrome() {
    const btn = $('#themeBtn');
    const root = document.documentElement;
    const isDark = () => root.getAttribute('data-theme') === 'dark' ||
      (!root.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const setIcon = () => {
      btn.innerHTML = isDark()
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
      btn.setAttribute('aria-label', isDark() ? 'Switch to light mode' : 'Switch to dark mode');
    };
    setIcon();
    btn.addEventListener('click', () => {
      const next = isDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('bp-theme', next); } catch (e) {}
      setIcon();
      renderHeat(); // heatmap picks ink colour by theme
    });

    const menu = $('#menuBtn'), nav = $('#nav');
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
    });
    $$('#nav a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }));

    if ('IntersectionObserver' in window) {
      const links = Object.fromEntries($$('#nav a').map(a => [a.getAttribute('href').slice(1), a]));
      const obs = new IntersectionObserver((es) => {
        es.forEach(e => {
          if (e.isIntersecting && links[e.target.id]) {
            Object.values(links).forEach(l => l.removeAttribute('aria-current'));
            links[e.target.id].setAttribute('aria-current', 'true');
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      Object.keys(links).forEach(id => { const s = document.getElementById(id); if (s) obs.observe(s); });
    }
    $$('.reveal').forEach(n => C.observe(n));
  }

  // ---------- hero ----------
  function initHero() {
    const total = sum(CASES, govAmt);
    const priv = sum(CASES, privAmt);
    const pleas = CASES.filter(isCrim).length;
    const dpas = CASES.filter(c => c.crim === 'dpa').length;
    const value = $('#heroTotal');
    const target = total / 1000;
    const draw = (v) => { value.textContent = '$' + v.toFixed(1) + ' billion'; };
    if (C.reduceMotion) draw(target);
    else {
      const t0 = performance.now(), dur = 1800;
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        draw(target * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
    const top12WithCrime = COMPANIES.filter(co => CASES.some(c => c.co === co.id && (isCrim(c) || c.crim === 'dpa'))).length;
    const pc = document.getElementById('pleaCount');
    if (pc) pc.textContent = top12WithCrime === 12 ? 'all twelve' : `${top12WithCrime} of the twelve`;
    const tiles = [
      { label: 'Cases tracked', value: String(CASES.length), sub: `${ALL_COS.length} companies, 1996–2026` },
      { label: 'Guilty pleas & convictions', value: String(pleas), sub: `plus ${dpas} deferred prosecutions` },
      { label: 'Paid in private lawsuits', value: '$' + (priv / 1000).toFixed(1) + 'bn', sub: 'patients, insurers, shareholders' },
      { label: 'Top-12 firms with a criminal case', value: `${top12WithCrime} of 12`, sub: 'guilty plea or deferred prosecution' }
    ];
    const host = $('#heroTiles');
    tiles.forEach(t => {
      const d = document.createElement('div'); d.className = 'tile';
      d.innerHTML = '<div class="label"></div><div class="value"></div><div class="sub"></div>';
      d.children[0].textContent = t.label; d.children[1].textContent = t.value; d.children[2].textContent = t.sub;
      host.appendChild(d);
    });
  }

  // ---------- playbook ----------
  function initPlaybook() {
    const host = $('#tactics');
    const groupName = { science: 'Rigging the science', selling: 'Buying the prescription', money: 'Gaming the money' };
    window.PLAYBOOK.forEach((t, i) => {
      const b = document.createElement('button');
      b.className = 'tactic reveal'; b.dataset.group = t.group; b.id = 't-' + t.id;
      b.setAttribute('aria-haspopup', 'dialog');
      b.innerHTML = `<span class="t-num">${String(i + 1).padStart(2, '0')}</span>
        <span class="t-group">${groupName[t.group]}</span>
        <span class="t-title"></span><span class="t-hook"></span><span class="t-stat">${t.stat}</span>`;
      $('.t-title', b).textContent = t.title;
      $('.t-hook', b).textContent = t.hook;
      b.addEventListener('click', () => openTactic(t.id));
      host.appendChild(b);
      C.observe(b);
    });
    $$('#tacticFilters .chip').forEach(ch => ch.addEventListener('click', () => {
      $$('#tacticFilters .chip').forEach(c => c.setAttribute('aria-pressed', String(c === ch)));
      const g = ch.dataset.group;
      $$('#tactics .tactic').forEach(card => { card.hidden = !(g === 'all' || card.dataset.group === g); });
    }));
    const dlg = $('#tacticSheet');
    $('#sheetClose').addEventListener('click', () => dlg.close());
    dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('close', () => { if (location.hash.startsWith('#t-')) history.replaceState(null, '', '#playbook'); });
  }
  function openTactic(id) {
    const t = window.PLAYBOOK.find(x => x.id === id);
    if (!t) return;
    const dlg = $('#tacticSheet');
    const body = $('#sheetBody');
    body.innerHTML = `<span class="kicker">${{ science: 'Rigging the science', selling: 'Buying the prescription', money: 'Gaming the money' }[t.group]}</span><h3 id="sheetTitle"></h3>` + t.body;
    $('#sheetTitle', body).textContent = t.title;
    $$('a[href^="#"]', body).forEach(a => a.addEventListener('click', () => dlg.close()));
    if (typeof dlg.showModal === 'function') { if (!dlg.open) dlg.showModal(); } else dlg.setAttribute('open', '');
    dlg.querySelector('.sheet-inner').scrollTop = 0;
    history.replaceState(null, '', '#t-' + id);
  }

  // ---------- companies ----------
  let currentCo = null;
  function initCompanies() {
    const host = $('#coMenu');
    const mk = (co, isOther) => {
      const st = coStats(co.id);
      const b = document.createElement('button');
      b.className = 'co-btn'; b.dataset.co = co.id; b.setAttribute('aria-pressed', 'false');
      b.innerHTML = '<span class="n"></span><span class="a"></span><span class="s"></span><span class="co-bar" aria-hidden="true"></span>';
      $('.n', b).textContent = co.name;
      $('.a', b).textContent = fmt(st.gov);
      $('.s', b).textContent = `${st.cases.length} case${st.cases.length === 1 ? '' : 's'} · ${st.pleas} guilty plea${st.pleas === 1 ? '' : 's'}`;
      const bar = $('.co-bar', b);
      st.byCat.forEach((v, i) => { if (v > 0) { const s = document.createElement('span'); s.style.flex = String(v); s.style.background = C.catColor(i); bar.appendChild(s); } });
      b.addEventListener('click', () => { selectCo(co.id, true); });
      host.appendChild(b);
    };
    COMPANIES.slice().sort((a, b) => coStats(b.id).gov - coStats(a.id).gov).forEach(co => mk(co));
    const sep = document.createElement('div');
    sep.style.gridColumn = '1 / -1'; sep.className = 'small muted'; sep.style.marginTop = '8px';
    sep.textContent = 'Not in the top 12 by revenue, but impossible to leave out:';
    host.appendChild(sep);
    OTHERS.slice().sort((a, b) => coStats(b.id).gov - coStats(a.id).gov).forEach(co => mk(co, true));
  }

  function selectCo(id, scroll) {
    const co = coById[id]; if (!co) return;
    currentCo = id;
    $$('#coMenu .co-btn').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.co === id)));
    const st = coStats(id);
    const d = $('#dossier');
    d.replaceChildren();
    const card = document.createElement('div'); card.className = 'card';
    const isTop = COMPANIES.includes(co);
    const daysOfRev = co.revenue ? (st.gov / 1000) / co.revenue * 365 : null;
    card.innerHTML = `
      <div class="dossier-head">
        <div><span class="kicker">Rap sheet</span><h3></h3><div class="meta"></div></div>
        ${co.revenue ? `<div class="meta" style="text-align:right">2025 revenue<br><strong style="font-size:1.3rem;color:var(--ink)">≈ $${co.revenue.toFixed(1)}bn</strong></div>` : ''}
      </div>
      <div class="mini-tiles"></div>
      ${co.signature ? '<p class="signature"></p>' : ''}
      <div class="chart-title" style="margin-top:8px">Timeline, 1996–2026</div>
      <div class="chart-sub">Dot size shows the amount. Hollow dots are scandals with no fine, or rulings overturned or under appeal.</div>
      <div class="legend dossier-legend"></div>
      <div class="chart dossier-tl"></div>
      ${co.good ? '<h4 style="margin:22px 0 10px">Credit where it’s due</h4><ul class="good-list"></ul>' : ''}
      <h4 style="margin:22px 0 4px">Every tracked case</h4>
      <div class="case-list"></div>`;
    $('h3', card).textContent = co.name;
    $('.meta', card).textContent = [co.hq, co.lineage || co.note].filter(Boolean).join(' · ');
    const tiles = [
      { label: 'Government penalties', value: fmt(st.gov), sub: 'final, paid' },
      { label: 'Private lawsuits', value: fmt(st.priv), sub: 'settlements & verdicts paid' },
      { label: 'Guilty pleas / DPAs', value: `${st.pleas} / ${st.dpas}`, sub: 'criminal resolutions' },
      daysOfRev != null
        ? { label: 'Penalties in days of revenue', value: daysOfRev < 1 ? '<1 day' : `${Math.round(daysOfRev)} days`, sub: '30 years of fines v 2025 sales' }
        : { label: 'Cases tracked', value: String(st.cases.length), sub: 'since 1996' }
    ];
    const tl = $('.mini-tiles', card);
    tiles.forEach(t => {
      const x = document.createElement('div'); x.className = 'tile';
      x.innerHTML = '<div class="label"></div><div class="value"></div><div class="sub"></div>';
      x.children[0].textContent = t.label; x.children[1].textContent = t.value; x.children[2].textContent = t.sub;
      tl.appendChild(x);
    });
    if (co.signature) $('.signature', card).textContent = co.signature;
    if (co.good) co.good.forEach(g => { const li = document.createElement('li'); li.textContent = g; $('.good-list', card).appendChild(li); });
    const usedCats = CATEGORIES.filter(k => st.cases.some(c => c.cat === k.id));
    C.legend($('.dossier-legend', card), usedCats.map(k => ({ label: k.name, color: k.color })), 'dot');
    const list = $('.case-list', card);
    st.cases.slice().sort((a, b) => b.year - a.year || b.usd - a.usd).forEach(c => list.appendChild(caseCard(c)));
    d.appendChild(card);
    C.dotTimeline($('.dossier-tl', card), st.cases);
    if (scroll) {
      history.replaceState(null, '', '#co-' + id);
      d.scrollIntoView({ behavior: C.reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }
  }

  function tagEls(c) {
    const out = [];
    const t = (cls, text, color) => {
      const s = document.createElement('span'); s.className = 'tag' + (cls ? ' ' + cls : '');
      if (color) { const i = document.createElement('i'); i.style.background = color; s.appendChild(i); }
      s.appendChild(document.createTextNode(text)); out.push(s);
    };
    t('', CATEGORIES[catIndex[c.cat]].short, c.color);
    t('', KINDS[c.kind]);
    if (c.crim === 'plea') t('crim', 'Guilty plea');
    if (c.crim === 'conviction') t('crim', 'Criminal conviction');
    if (c.crim === 'dpa') t('crim', 'Deferred prosecution');
    if (c.status === 'appeal') t('warn', 'Under appeal · not counted');
    if (c.status === 'overturned') t('warn', 'Overturned · not counted');
    if (c.kind === 'tax') t('warn', 'Tax · not a penalty');
    if (c.count != null) t('warn', `Counted as ${fmt(c.count)} actually paid`);
    if (c.via) t('', 'via ' + c.via);
    return out;
  }

  function caseCard(c) {
    const d = document.createElement('article'); d.className = 'case';
    const yr = document.createElement('div'); yr.className = 'yr'; yr.textContent = c.year;
    const ttl = document.createElement('div'); ttl.className = 'ttl'; ttl.textContent = c.title;
    const amt = document.createElement('div'); amt.className = 'amt'; amt.textContent = c.usd > 0 ? fmt(c.usd) : 'No fine';
    if (c.status === 'overturned') amt.classList.add('struck');
    const body = document.createElement('div'); body.className = 'body'; body.textContent = c.desc;
    const tags = document.createElement('div'); tags.className = 'tags'; tagEls(c).forEach(x => tags.appendChild(x));
    d.append(yr, ttl, amt, body, tags);
    if (c.src && c.src.length) {
      const s = document.createElement('div'); s.className = 'src-links';
      c.src.forEach(([label, url]) => { const a = document.createElement('a'); a.href = url; a.target = '_blank'; a.rel = 'noopener'; a.textContent = label + ' ↗'; s.appendChild(a); });
      d.appendChild(s);
    }
    return d;
  }

  // ---------- money charts ----------
  let leaderMode = 'gov';
  function renderLeader() {
    const rows = COMPANIES.map(co => {
      const cs = CASES.filter(c => c.co === co.id);
      const segs = CATEGORIES.map(k => ({ key: k.id, label: k.name, color: k.color, value: sum(cs.filter(c => c.cat === k.id), c => counted(c, leaderMode)) }));
      return { label: co.name, short: SHORT[co.id], segs, total: sum(segs, s => s.value), id: co.id };
    }).sort((a, b) => b.total - a.total);
    C.legend($('#leaderLegend'), CATEGORIES.map(k => ({ label: k.name, color: k.color })));
    C.stackedHBar($('#leaderChart'), rows, {
      aria: 'Penalties by company and type of misconduct',
      noteFn: (r, s) => {
        const top = CASES.filter(c => c.co === r.id && c.cat === s.key && counted(c, leaderMode) > 0).sort((a, b) => counted(b, leaderMode) - counted(a, leaderMode))[0];
        return top ? `Largest: ${top.title} (${top.year})` : '';
      }
    });
    $('#leaderSub').textContent = leaderMode === 'gov'
      ? 'Penalties paid to governments, 1996–2026, by type of misconduct. US$ billions, nominal.'
      : 'Government penalties plus private lawsuits paid (product liability, class actions, shareholder suits). US$ billions, nominal.';
    C.table($('#leaderTable'), [{ label: 'Company' }].concat(CATEGORIES.map(k => ({ label: k.short, num: true }))).concat([{ label: 'Total', num: true }]),
      rows.map(r => [r.label].concat(r.segs.map(s => s.value ? fmt(s.value) : '–')).concat([fmt(r.total)])));
  }

  function renderYears() {
    const years = []; for (let y = 1996; y <= 2026; y++) years.push(y);
    const cols = years.map(y => {
      const cs = CASES.filter(c => c.year === y);
      const segs = CATEGORIES.map(k => ({ label: k.name, color: k.color, value: sum(cs.filter(c => c.cat === k.id), govAmt) }));
      return { label: String(y), segs, total: sum(segs, s => s.value), cases: cs };
    });
    C.legend($('#yearLegend'), CATEGORIES.map(k => ({ label: k.name, color: k.color })));
    C.stackedColumns($('#yearChart'), cols, {
      aria: 'Penalties per year by type of misconduct',
      noteFn: (c, s) => {
        const top = c.cases.filter(x => x.catName === s.label && govAmt(x) > 0).sort((a, b) => govAmt(b) - govAmt(a))[0];
        return top ? `Biggest: ${coById[top.co].name}, ${top.title}` : '';
      },
      annotations: [
        { year: 2009, text: 'Pfizer, Lilly' },
        { year: 2012, text: 'GSK $3bn', hideNarrow: true },
        { year: 2013, text: 'J&J', hideNarrow: true },
        { year: 2021, text: 'Opioids', hideNarrow: false },
        { year: 2025, text: 'Purdue plan' }
      ]
    });
    C.table($('#yearTable'), [{ label: 'Year' }].concat(CATEGORIES.map(k => ({ label: k.short, num: true }))).concat([{ label: 'Total', num: true }]),
      cols.map(c => [c.label].concat(c.segs.map(s => s.value ? fmt(s.value) : '–')).concat([c.total ? fmt(c.total) : '–'])));
  }

  function renderDays() {
    const items = P.DAYS_OF_REVENUE.map(d => {
      const days = (d.usd / 1000) / d.revenue * 365;
      return {
        label: d.label, shortLabel: d.label.replace(/\s*\(.*\)/, ''), value: days, color: 'var(--c1)', valueLabel: `${days.toFixed(days < 10 ? 1 : 0)} days`,
        tip: { value: `${days.toFixed(1)} days of revenue`, title: d.label, rows: [{ label: `Revenue that year ≈ $${d.revenue}bn` }] }
      };
    }).sort((a, b) => b.value - a.value);
    C.simpleHBar($('#daysChart'), items, { aria: 'Record fines in days of revenue', tickFmt: (t) => t + 'd', valueW: 64,
      labelW: (W) => W < 440 ? 112 : 200 });
  }

  function renderTop() {
    const list = CASES.filter(c => (c.kind === 'gov' || c.kind === 'foreign' || c.kind === 'private') && isFinal(c))
      .map(c => ({ c, v: c.count != null ? c.count : c.usd })).sort((a, b) => b.v - a.v).slice(0, 15);
    const items = list.map(({ c, v }) => ({
      label: `${SHORT[c.co]} ${c.year}` + (c.tag ? ` · ${c.tag}` : ''),
      shortLabel: `${SHORT[c.co]} ${c.year}`,
      value: v / 1000, color: c.color, valueLabel: fmt(v),
      tip: { value: fmt(v), title: `${coById[c.co].name}, ${c.year}`, rows: [{ color: c.color, label: c.title }], note: KINDS[c.kind] }
    }));
    C.simpleHBar($('#topChart'), items, { aria: 'Fifteen biggest single cases', tickFmt: (t) => '$' + t + 'bn', valueW: 58,
      narrowAt: 460, labelW: (W) => W < 460 ? 92 : 178 });
  }

  function renderHeat() {
    const host = $('#heatChart'); if (!host) return;
    host.replaceChildren();
    const rows = COMPANIES.map(co => ({ id: co.id, label: co.name, short: SHORT[co.id] }))
      .sort((a, b) => coStats(b.id).gov - coStats(a.id).gov);
    const cols = CATEGORIES.map(k => ({ id: k.id, name: k.name, short: k.short, color: k.color }));
    // reset so responsive() renders afresh on theme change
    const clone = host.cloneNode(false); host.parentNode.replaceChild(clone, host);
    const val = (r, c) => sum(CASES.filter(x => x.co === r.id && x.cat === c.id), govAmt);
    C.heatmap(clone, rows, cols, val, { aria: 'Penalties by company and type of misconduct' });
    const spread = rows.map(r => cols.filter(c => val(r, c) > 0).length);
    const sub = $('#heatSub');
    if (sub && !sub.dataset.done) {
      sub.dataset.done = '1';
      sub.textContent += ` Every company appears in at least ${Math.min(...spread)} columns; ${spread.filter(n => n >= 3).length} of the 12 in three or more.`;
    }
  }

  function initMoney() {
    renderLeader();
    $$('#leaderToggle button').forEach(b => b.addEventListener('click', () => {
      leaderMode = b.dataset.mode;
      $$('#leaderToggle button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      const host = $('#leaderChart'); const clone = host.cloneNode(false); host.parentNode.replaceChild(clone, host);
      renderLeader();
    }));
    renderYears();
    renderDays();
    renderTop();
    renderHeat();
  }

  // ---------- verdict scorecard ----------
  const SCORE = [
    { what: 'Publishing trial results', s: 'better', why: 'Registration has been required since 2005, with results-posting laws in the US (2007) and EU. Industry now posts EU results far more reliably than academia (68% v 11%).' },
    { what: 'Access to raw trial data', s: 'better', why: 'GSK, J&J (via the YODA Project) and others share patient-level data with outside researchers, and the EMA publishes clinical study reports. Tamiflu-style stand-offs are rarer.' },
    { what: 'Ghostwriting', s: 'better', why: 'Medical writers and funders must now be declared under journal and industry rules. Writing help is still common, but it is disclosed.' },
    { what: 'Outcome switching & spin', s: 'same', why: 'Only 9 of 67 top-journal trials reported outcomes as pre-specified (COMPare). Spin in abstracts remains common.' },
    { what: 'Hiding harms', s: 'mixed', why: 'Safety-reporting powers have been stronger since 2007, but recent cases (Zantac, talc, Plavix) show fights over what companies knew and when are far from over.' },
    { what: 'Off-label promotion', s: 'mixed', why: 'Criminal cases fell after a 2012 court ruling made them harder to bring, which is not the same as promotion stopping. Janssen’s $1.64bn judgment (2025) shows civil cases still land.' },
    { what: 'Kickbacks to prescribers', s: 'same', why: 'Speaker-programme and copay-charity cases every year: Novartis 2020, Teva 2024, Gilead and Biohaven 2025, Takeda and Dompé 2026. Over $660m in fiscal 2025 alone.' },
    { what: 'Bribery abroad', s: 'same', why: 'GSK China 2014, Teva 2016, Novartis 2020, AstraZeneca China 2024. US foreign-bribery enforcement was narrowed in 2025.' },
    { what: 'Opioids', s: 'mixed', why: 'The biggest reckoning in pharma history: more than $50bn in industry settlements and the Sacklers out of Purdue. It came only after hundreds of thousands of deaths.' },
    { what: 'Drug prices', s: 'worse', why: 'The median US launch price hit about $300,000 a year in 2023, up 35% in a year. The US pays about 2.78 times other rich countries. Insulin cuts (2023) and "most-favoured-nation" deals (2025) came only under heavy pressure.' },
    { what: 'Patent games', s: 'same', why: 'Humira’s 132-patent thicket was ruled legal. The EU fined Teva €462.6m (2024) for patent misuse. Pay-for-delay is riskier since 2013, but evergreening thrives.' },
    { what: 'Political influence', s: 'worse', why: 'PhRMA spent a record $38.2m on US lobbying in 2025. Pharma and health products has been the top-spending lobbying sector in almost every quarter since 2010.' },
    { what: 'Enforcement', s: 'mixed', why: 'Federal criminal penalties fell about 90% from 2012–13 to 2016–17. But whistleblower suits hit a record 1,297 in fiscal 2025 and False Claims Act recoveries a record $6.8bn, 83% of it health care.' }
  ];
  const ICON = {
    better: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M7.5 12.5l3 3 6-6.5"/></svg>',
    same: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg>',
    worse: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 7v9M8.5 12.5L12 16l3.5-3.5"/></svg>',
    mixed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M7 13.5c1.5-2.5 3.5-2.5 5 0s3.5 2.5 5 0"/></svg>'
  };
  const LABEL = { better: 'Better', same: 'No real change', worse: 'Worse', mixed: 'Mixed' };
  function initScore() {
    const host = $('#scorecard');
    SCORE.forEach(r => {
      const d = document.createElement('div'); d.className = 'score-row reveal';
      d.innerHTML = `<div class="what"></div><div class="status ${r.s}">${ICON[r.s]}<span>${LABEL[r.s]}</span></div><div class="why"></div>`;
      $('.what', d).textContent = r.what; $('.why', d).textContent = r.why;
      host.appendChild(d); C.observe(d);
    });
  }

  // ---------- explorer ----------
  function initExplorer() {
    const fCo = $('#fCo'), fCat = $('#fCat'), fKind = $('#fKind'), fText = $('#fText');
    const opt = (sel, v, t) => { const o = document.createElement('option'); o.value = v; o.textContent = t; sel.appendChild(o); };
    opt(fCo, '', 'All companies'); ALL_COS.forEach(c => opt(fCo, c.id, c.name));
    opt(fCat, '', 'All types'); CATEGORIES.forEach(k => opt(fCat, k.id, k.name));
    opt(fKind, '', 'All kinds'); Object.entries(KINDS).forEach(([k, v]) => opt(fKind, k, v)); opt(fKind, 'crim', 'Criminal (plea, conviction, DPA)');
    let sortKey = 'year', sortDir = -1;
    const tbody = $('#explorer tbody');
    function render() {
      const q = fText.value.trim().toLowerCase();
      let rows = CASES.filter(c =>
        (!fCo.value || c.co === fCo.value) &&
        (!fCat.value || c.cat === fCat.value) &&
        (!fKind.value || (fKind.value === 'crim' ? !!c.crim : c.kind === fKind.value)) &&
        (!q || (c.title + ' ' + c.desc + ' ' + (c.via || '') + ' ' + coById[c.co].name).toLowerCase().includes(q)));
      rows.sort((a, b) => (sortKey === 'usd' ? (a.usd - b.usd) : (a.year - b.year || a.usd - b.usd)) * sortDir);
      tbody.replaceChildren();
      rows.forEach(c => {
        const tr = document.createElement('tr');
        const td = (cls) => { const x = document.createElement('td'); if (cls) x.className = cls; tr.appendChild(x); return x; };
        td('c-year').textContent = c.year;
        const co = td('c-co'); co.textContent = coById[c.co].name; if (c.via) { const v = document.createElement('div'); v.className = 'd'; v.textContent = 'via ' + c.via; co.appendChild(v); }
        const w = td('c-what'); const t = document.createElement('div'); t.className = 't'; t.textContent = c.title; const dd = document.createElement('div'); dd.className = 'd'; dd.textContent = c.desc; w.append(t, dd);
        const cat = td('c-cat'); const tg = tagEls(c); cat.appendChild(tg[0]);
        const k = td('c-kind'); tg.slice(1).filter(x => !x.textContent.startsWith('via ')).forEach(x => { k.appendChild(x); k.appendChild(document.createTextNode(' ')); });
        const a = td('num c-amt'); a.textContent = c.usd > 0 ? fmt(c.usd) : '–'; if (c.status === 'overturned' || c.status === 'appeal' || c.kind === 'tax') a.style.color = 'var(--muted)';
        const s = td('c-src'); (c.src || []).forEach(([l, u]) => { const x = document.createElement('a'); x.href = u; x.target = '_blank'; x.rel = 'noopener'; x.textContent = l + ' ↗'; x.style.display = 'block'; x.style.fontSize = '.8rem'; s.appendChild(x); });
        tbody.appendChild(tr);
      });
      const tot = sum(rows, govAmt);
      $('#fCount').textContent = `${rows.length} case${rows.length === 1 ? '' : 's'} · ${fmt(tot)} counted`;
    }
    [fCo, fCat, fKind].forEach(x => x.addEventListener('change', render));
    fText.addEventListener('input', render);
    $$('#explorer th button').forEach(b => b.addEventListener('click', () => {
      const k = b.dataset.sort; if (sortKey === k) sortDir *= -1; else { sortKey = k; sortDir = -1; } render();
    }));
    render();
  }

  // ---------- sources ----------
  function initSources() {
    const extra = [
      ['Public Citizen: 31 years of pharmaceutical penalties, 1991–2021', 'https://www.citizen.org/article/thirty-one-years-of-pharmaceutical-industry-criminal-and-civil-penalties-1991-2021/'],
      ['Public Citizen: 27 years of penalties, 1991–2017', 'https://www.citizen.org/article/twenty-seven-years-of-pharmaceutical-industry-criminal-and-civil-penalties-1991-through-2017/'],
      ['Morgan Lewis: record $6.8bn False Claims Act recoveries, FY2025', 'https://www.morganlewis.com/pubs/2026/01/doj-announces-highest-ever-annual-false-claims-act-recoveries-over-6-8-billion-in-fiscal-year-2025'],
      ['RAND: international prescription drug price comparisons (2024)', 'https://www.rand.org/pubs/research_reports/RRA788-3.html'],
      ['Reuters via PharmaLive: launch prices rose 35% in 2023', 'https://www.pharmalive.com/prices-for-new-us-drugs-rose-35-in-2023-more-than-the-previous-year/'],
      ['CMS: Open Payments report to Congress', 'https://www.cms.gov/files/document/open-payments-fy-2025-report-congress.pdf'],
      ['Stacker/OpenSecrets: pharma lobbying 2025', 'https://stacker.com/stories/government-politics/drug-companies-involved-trumprx-boosted-lobbying-23-ahead-programs'],
      ['White House: most-favoured-nation pricing deals (2025)', 'https://www.whitehouse.gov/fact-sheets/2025/10/fact-sheet-president-donald-j-trump-announces-second-deal-to-bring-most-favored-nation-pricing-to-american-patients'],
      ['HealthDay: insulin price cuts (2023)', 'https://www.healthday.com/health-news/diabetes/sanofi-follows-lilly-novo-nordisk-in-cutting-insulin-prices-2659612153.html'],
      ['Access to Medicine Index 2024', 'https://accesstomedicinefoundation.org/resource/2024-access-to-medicine-index'],
      ['Fierce Pharma: the "buried" Seroquel study', 'https://www.fiercepharma.com/pharma/post-resurrects-buried-seroquel-study'],
      ['NPR: pharmaceutical ghostwriters (Wyeth)', 'https://www.npr.org/sections/health-shots/2009/08/pharmaceutical_ghostwriters_re.html'],
      ['Scientific American: Scott Reuben faked data in 21 studies', 'https://www.scientificamerican.com/article/a-medical-madoff-anesthestesiologist-faked-data/'],
      ['Chemistry World: Senate report on GSK and Avandia', 'https://www.chemistryworld.com/news/report-hits-out-at-gsks-avandia/3003435.article'],
      ['CBS News: Merck’s Vioxx "hit list"', 'https://www.cbsnews.com/news/merck-created-hit-list-to-destroy-neutralize-or-discredit-dissenting-doctors/'],
      ['NY Attorney General: Purdue plan approved (2025)', 'https://ag.ny.gov/press-release/2025/attorney-general-james-secures-approval-purdue-bankruptcy-plan']
    ];
    const seen = new Set(); const items = [];
    const add = (l, u) => { if (!u || seen.has(u)) return; seen.add(u); items.push([l, u]); };
    extra.forEach(([l, u]) => add(l, u));
    Object.values(P.EVIDENCE).forEach(e => add(e.src[0], e.src[1]));
    CASES.slice().sort((a, b) => a.year - b.year).forEach(c => (c.src || []).forEach(([l, u]) => add(`${coById[c.co].name} ${c.year}: ${c.title} (${l})`, u)));
    const host = $('#sourceList');
    items.forEach(([l, u]) => {
      const li = document.createElement('li');
      const a = document.createElement('a'); a.href = u; a.target = '_blank'; a.rel = 'noopener'; a.textContent = l;
      li.appendChild(a); host.appendChild(li);
    });
  }

  // ---------- deep links ----------
  function handleHash() {
    const h = decodeURIComponent(location.hash || '');
    if (h.startsWith('#co-')) {
      const id = h.slice(4);
      if (coById[id]) { selectCo(id, false); setTimeout(() => $('#dossier').scrollIntoView({ block: 'start' }), 60); }
    } else if (h.startsWith('#t-')) {
      openTactic(h.slice(3));
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initChrome();
    initHero();
    initPlaybook();
    window.Lab.init();
    initCompanies();
    initMoney();
    initScore();
    initExplorer();
    initSources();
    // default dossier: the company with the highest government penalties
    const top = COMPANIES.slice().sort((a, b) => coStats(b.id).gov - coStats(a.id).gov)[0];
    selectCo(top.id, false);
    handleHash();
    window.addEventListener('hashchange', handleHash);
    $$('.reveal').forEach(n => C.observe(n));
  });
})();
