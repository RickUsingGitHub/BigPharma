/* The science lab: publication-bias animation + p-hacking simulator. */
(function () {
  const C = window.Charts;
  const { el } = C;

  // ═══════════════ Publication bias (Turner et al., NEJM 2008) ═══════════════
  function initPubBias() {
    const host = document.getElementById('pubBias');
    const card = document.getElementById('pubBiasCard');
    if (!host) return;
    const E = window.PHARMA.EVIDENCE.turner;
    const trials = [];
    for (let i = 0; i < E.fdaPositive; i++) trials.push({ fda: 'pos', fate: i < E.fdaPositive - E.unpublishedPositive ? 'pub' : 'unpub' });
    for (let i = 0; i < E.fdaNotPositive; i++) {
      const fate = i < E.spun ? 'spun' : i < E.spun + E.publishedNegative ? 'pubneg' : 'unpub';
      trials.push({ fda: 'neg', fate });
    }
    let step = 0, nodes = [], geom = null;

    C.legend(document.getElementById('pubLegend'), [
      { label: 'Positive result', color: 'var(--c1)' },
      { label: 'Negative or questionable', color: 'var(--c2)' }
    ], 'dot');
    const leg = document.getElementById('pubLegend');
    const spunKey = document.createElement('span');
    spunKey.innerHTML = '<i class="ring" style="background:var(--c1);box-shadow:0 0 0 2px var(--c2)"></i>Negative, published as positive';
    const ghostKey = document.createElement('span');
    ghostKey.innerHTML = '<i class="ring" style="background:transparent;border:1.5px dashed var(--axis-ink)"></i>Never published';
    leg.append(spunKey, ghostKey);

    function layout(W) {
      const narrow = W < 560;
      const r = narrow ? 5.5 : 7.5;
      const gap = narrow ? 4 : 5;
      const d = r * 2 + gap;
      const groups = step === 0
        ? [
            { key: 'pos', title: 'FDA: positive', items: trials.filter(t => t.fda === 'pos') },
            { key: 'neg', title: 'FDA: negative or questionable', items: trials.filter(t => t.fda === 'neg') }
          ]
        : [
            { key: 'p', title: 'Published as positive', items: trials.filter(t => t.fate === 'pub' || t.fate === 'spun') },
            { key: 'n', title: 'Published as negative', items: trials.filter(t => t.fate === 'pubneg') },
            { key: 'u', title: 'Never published', items: trials.filter(t => t.fate === 'unpub') }
          ];
      const titleH = 34;
      const pos = new Map();
      const placed = [];
      let H;
      if (narrow) {
        // Phones: stack the groups vertically, each using the full width.
        const cols = Math.max(1, Math.floor((W + gap) / d));
        let y = 0;
        groups.forEach(g => {
          const rows = Math.ceil(g.items.length / cols);
          placed.push({ g, x0: 0, y0: y, cols, rows });
          g.items.forEach((t, i) => pos.set(t, { x: (i % cols) * d + r, y: y + titleH + Math.floor(i / cols) * d + r }));
          y += titleH + rows * d + 10;
        });
        H = y;
      } else {
        // Wider screens: groups side by side, width shared in proportion to item counts.
        const pad = 28;
        const usable = W - pad * (groups.length - 1);
        // Each group needs room for its title; the rest is shared in proportion to item counts.
        const minW = groups.map(g => Math.max(d * 2, g.title.length * 7.4 + 6));
        const shares = groups.map(g => usable * (g.items.length / trials.length));
        const fixed = shares.map((sh, i) => sh < minW[i]);
        const fixedW = minW.reduce((a, w, i) => a + (fixed[i] ? w : 0), 0);
        const flexItems = groups.reduce((a, g, i) => a + (fixed[i] ? 0 : g.items.length), 0);
        const widths = groups.map((g, i) => fixed[i] ? minW[i] : (usable - fixedW) * (g.items.length / flexItems));
        let x = 0, maxRows = 0;
        groups.forEach((g, gi) => {
          const share = widths[gi];
          const cols = Math.max(1, Math.floor((share + gap) / d));
          const rows = Math.ceil(g.items.length / cols);
          maxRows = Math.max(maxRows, rows);
          placed.push({ g, x0: x, y0: 0, cols, rows });
          g.items.forEach((t, i) => pos.set(t, { x: x + (i % cols) * d + r, y: titleH + Math.floor(i / cols) * d + r }));
          x += Math.max(share, cols * d - gap) + pad;
        });
        H = titleH + maxRows * d + 6;
      }
      return { r, H, placed, pos, narrow };
    }

    function drawTitles(svg) {
      geom.placed.forEach(p => {
        el('text', { x: p.x0, y: p.y0 + 14, class: 'label-strong', text: p.g.title }, svg);
        el('text', { x: p.x0, y: p.y0 + 28, class: 'label-text', style: 'font-size:11px', text: p.g.items.length + ' trials' }, svg);
      });
    }

    function render(W) {
      geom = layout(W);
      host.replaceChildren();
      const svg = el('svg', { viewBox: `0 0 ${W} ${geom.H}`, width: W, height: geom.H, role: 'img',
        'aria-label': step === 0 ? '74 antidepressant trials: 38 positive and 36 negative or questionable according to the FDA' : '48 trials published as positive, 3 published as negative, 23 never published' });
      drawTitles(svg);
      nodes = trials.map(t => {
        const g = el('g', {}, svg);
        const c = el('circle', { cx: 0, cy: 0, r: geom.r }, g);
        t._g = g; t._c = c;
        return g;
      });
      host.appendChild(svg);
      paint(false);
    }

    function paint(animate) {
      trials.forEach((t, i) => {
        const p = geom.pos.get(t);
        t._g.style.transition = animate && !C.reduceMotion ? `transform .9s cubic-bezier(.2,.8,.2,1) ${i * 8}ms, opacity .6s ease` : 'none';
        t._g.style.transform = `translate(${p.x}px, ${p.y}px)`;
        let fill, stroke = 'var(--surface)', sw = 2, dash = '', op = 1;
        if (step === 0) {
          fill = t.fda === 'pos' ? 'var(--c1)' : 'var(--c2)';
        } else if (t.fate === 'unpub') {
          fill = 'transparent'; stroke = 'var(--axis-ink)'; sw = 1.5; dash = '3 2'; op = .8;
        } else if (t.fate === 'spun') {
          fill = 'var(--c1)'; stroke = 'var(--c2)'; sw = 2.5;
        } else {
          fill = t.fda === 'pos' ? 'var(--c1)' : 'var(--c2)';
        }
        const c = t._c;
        c.style.transition = animate && !C.reduceMotion ? `fill .5s ease ${300 + i * 8}ms, stroke .5s ease ${300 + i * 8}ms` : 'none';
        c.style.fill = fill; c.style.stroke = stroke; c.style.strokeWidth = sw; c.setAttribute('stroke-dasharray', dash);
        t._g.style.opacity = op;
      });
      const cap = document.getElementById('pubCaption');
      if (step === 0) cap.textContent = 'What regulators saw: 38 of 74 trials (51%) positive.';
      else cap.textContent = 'What doctors could read: 48 of 51 published trials (94%) look positive. 23 trials vanished, and 11 negative ones were written up as successes.';
    }

    function setStep(s) {
      if (s === step) return;
      step = s;
      card.querySelectorAll('.seg button').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.step === step)));
      // Re-layout but keep existing nodes so dots glide to new homes.
      const W = Math.round(host.clientWidth);
      const old = geom;
      geom = layout(W);
      const svg = host.querySelector('svg');
      if (!svg) { render(W); return; }
      svg.setAttribute('viewBox', `0 0 ${W} ${Math.max(geom.H, old ? old.H : 0)}`);
      svg.setAttribute('height', Math.max(geom.H, old ? old.H : 0));
      svg.querySelectorAll('text').forEach(t => t.remove());
      drawTitles(svg);
      paint(true);
      setTimeout(() => { svg.setAttribute('viewBox', `0 0 ${W} ${geom.H}`); svg.setAttribute('height', geom.H); }, 1300);
    }

    card.querySelectorAll('.seg button').forEach(b => b.addEventListener('click', () => { autoplay = false; setStep(+b.dataset.step); }));
    C.responsive(host, render);

    // Auto-play once when first seen.
    let autoplay = true;
    if ('IntersectionObserver' in window && !C.reduceMotion) {
      const o = new IntersectionObserver((es) => {
        es.forEach(e => {
          if (e.isIntersecting) { o.disconnect(); setTimeout(() => { if (autoplay) setStep(1); }, 1800); }
        });
      }, { threshold: 0.5 });
      o.observe(host);
    }
  }

  // ═══════════════ Statistics helpers ═══════════════
  // Box–Muller, using both outputs of each pair.
  let spare = null;
  function gaussian() {
    if (spare !== null) { const v = spare; spare = null; return v; }
    let u = 0;
    while (u === 0) u = Math.random();
    const r = Math.sqrt(-2 * Math.log(u)), th = 2 * Math.PI * Math.random();
    spare = r * Math.sin(th);
    return r * Math.cos(th);
  }
  function lgamma(x) {
    const g = 7, c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313,
      -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x);
    x -= 1;
    let a = c[0];
    const t = x + g + 0.5;
    for (let i = 1; i < g + 2; i++) a += c[i] / (x + i);
    return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
  }
  function betacf(a, b, x) {
    const MAXIT = 200, EPS = 3e-12, FPMIN = 1e-300;
    let qab = a + b, qap = a + 1, qam = a - 1, c = 1, d = 1 - qab * x / qap;
    if (Math.abs(d) < FPMIN) d = FPMIN;
    d = 1 / d; let h = d;
    for (let m = 1; m <= MAXIT; m++) {
      const m2 = 2 * m;
      let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
      d = 1 + aa * d; if (Math.abs(d) < FPMIN) d = FPMIN;
      c = 1 + aa / c; if (Math.abs(c) < FPMIN) c = FPMIN;
      d = 1 / d; h *= d * c;
      aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
      d = 1 + aa * d; if (Math.abs(d) < FPMIN) d = FPMIN;
      c = 1 + aa / c; if (Math.abs(c) < FPMIN) c = FPMIN;
      d = 1 / d; const del = d * c; h *= del;
      if (Math.abs(del - 1) < EPS) break;
    }
    return h;
  }
  function ibeta(x, a, b) {
    if (x <= 0) return 0; if (x >= 1) return 1;
    const bt = Math.exp(lgamma(a + b) - lgamma(a) - lgamma(b) + a * Math.log(x) + b * Math.log(1 - x));
    return x < (a + 1) / (a + b + 2) ? bt * betacf(a, b, x) / a : 1 - bt * betacf(b, a, 1 - x) / b;
  }
  // Two-sided Welch t-test p-value from summary sums.
  function welchP(n1, s1, q1, n2, s2, q2) {
    if (n1 < 3 || n2 < 3) return null;
    const m1 = s1 / n1, m2 = s2 / n2;
    const v1 = (q1 - n1 * m1 * m1) / (n1 - 1), v2 = (q2 - n2 * m2 * m2) / (n2 - 1);
    const se2 = v1 / n1 + v2 / n2;
    if (se2 <= 0) return null;
    const t = (m1 - m2) / Math.sqrt(se2);
    const df = se2 * se2 / ((v1 / n1) ** 2 / (n1 - 1) + (v2 / n2) ** 2 / (n2 - 1));
    return { p: ibeta(df / (df + t * t), df / 2, 0.5), diff: m1 - m2 };
  }

  // ═══════════════ P-hacking simulator ═══════════════
  const OUTCOMES = ['depression score', 'anxiety', 'sleep quality', 'energy levels', 'pain', 'quality of life',
    'concentration', 'patient-rated mood', 'clinician-rated mood', 'fatigue', 'appetite', 'irritability',
    'social functioning', 'days off work', 'headache frequency', 'blood pressure', 'morning stiffness',
    'memory', 'libido', 'hospital visits'];
  const SLICES = [
    { name: 'men', test: p => p.male }, { name: 'women', test: p => !p.male },
    { name: 'patients over 65', test: p => p.old }, { name: 'patients under 65', test: p => !p.old },
    { name: 'smokers', test: p => p.smoker }, { name: 'non-smokers', test: p => !p.smoker }
  ];
  const N_PER_ARM = 100, LOOK_EVERY = 20;

  // quick = true: only answer "was anything significant?", exiting at the first hit (used for the 1,000-trial run).
  function runTrial(k, s, peek, quick) {
    // groups: 0 = everyone, 1..s = slices; arrays [group][outcome][arm] of n,sum,sumsq
    const G = s + 1;
    const acc = new Float64Array(G * k * 2 * 3);
    const groupsOf = new Int8Array(G);
    const idx = (g, o, arm) => ((g * k + o) * 2 + arm) * 3;
    const looks = peek ? [] : [N_PER_ARM];
    if (peek) for (let n = LOOK_EVERY; n <= N_PER_ARM; n += LOOK_EVERY) looks.push(n);
    let enrolled = 0, result = null;
    for (const look of looks) {
      while (enrolled < look) {
        for (let arm = 0; arm < 2; arm++) {
          const male = Math.random() < 0.5, old = Math.random() < 0.4, smoker = Math.random() < 0.25;
          const pt = { male, old, smoker };
          let nG = 1; groupsOf[0] = 0;
          for (let j = 0; j < s; j++) if (SLICES[j].test(pt)) groupsOf[nG++] = j + 1;
          for (let o = 0; o < k; o++) {
            const y = gaussian(); // the drug does nothing: both arms ~ N(0,1)
            const yy = y * y;
            for (let q = 0; q < nG; q++) {
              const b = ((groupsOf[q] * k + o) * 2 + arm) * 3;
              acc[b] += 1; acc[b + 1] += y; acc[b + 2] += yy;
            }
          }
        }
        enrolled++;
      }
      const tests = [];
      for (let g = 0; g < G; g++) for (let o = 0; o < k; o++) {
        const a = idx(g, o, 0), b = idx(g, o, 1);
        const r = welchP(acc[a], acc[a + 1], acc[a + 2], acc[b], acc[b + 1], acc[b + 2]);
        if (!r) continue;
        if (quick && r.p < 0.05) return { hit: true, stoppedEarly: look < N_PER_ARM, n: look };
        tests.push({ o, g, p: r.p, diff: r.diff });
      }
      result = { tests, n: look, stoppedEarly: false, hit: false };
      if (peek && tests.some(t => t.p < 0.05)) { result.stoppedEarly = look < N_PER_ARM; break; }
    }
    return result;
  }

  function initPhack() {
    const $ = (id) => document.getElementById(id);
    const nO = $('nOutcomes'), nS = $('nSubgroups'), peek = $('peek');
    const strip = $('pStrip'), meter = $('fpMeter'), note = $('fpNote'), head = $('headline'), prog = $('fpProgress');
    if (!nO) return;
    let lastTests = [];

    const syncOut = () => { $('nOutcomesOut').textContent = nO.value; $('nSubgroupsOut').textContent = nS.value; };
    nO.addEventListener('input', syncOut); nS.addEventListener('input', syncOut);
    syncOut();

    function drawStrip(W) {
      strip.replaceChildren();
      const H = 120, left = 8, right = 8, top = 22, bottom = 26;
      const pmin = 1e-4;
      const x = (p) => left + (Math.log10(Math.max(p, pmin)) - Math.log10(pmin)) / (0 - Math.log10(pmin)) * (W - left - right);
      const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: 'img', 'aria-label': 'P-values of all tests' });
      // significance zone
      el('rect', { x: left, y: top - 4, width: x(0.05) - left, height: H - top - bottom + 8, rx: 4, style: 'fill:var(--accent-wash)' }, svg);
      [0.0001, 0.001, 0.01, 0.05, 0.1, 1].forEach(p => {
        el('line', { x1: x(p), x2: x(p), y1: top - 4, y2: H - bottom + 4, class: p === 0.05 ? 'base-line' : 'grid-line', style: p === 0.05 ? 'stroke:var(--accent);stroke-width:1.5' : '' }, svg);
        if (p === 0.1 && W < 520) return; // avoid label collision with 0.05 on narrow screens
        el('text', { x: x(p), y: H - 8, 'text-anchor': p === 0.0001 ? 'start' : p === 1 ? 'end' : 'middle', class: 'axis-text', text: String(p) }, svg);
      });
      el('text', { x: x(0.05) - 4, y: 12, 'text-anchor': 'end', class: 'label-text', style: 'font-size:11px;fill:var(--accent);font-weight:700', text: '← "significant"' }, svg);
      el('text', { x: x(0.05) + 4, y: 12, class: 'label-text', style: 'font-size:11px', text: 'not significant →' }, svg);
      const band = H - top - bottom;
      lastTests.forEach((t, i) => {
        const sig = t.p < 0.05;
        const cy = top + ((t._jit != null ? t._jit : (t._jit = Math.random())) * (band - 10)) + 5;
        const circ = el('circle', { cx: x(t.p), cy, r: sig ? 5.5 : 4,
          style: `fill:${sig ? 'var(--c2)' : 'var(--axis-ink)'};stroke:var(--surface);stroke-width:2;opacity:0;transition:opacity .25s ease ${C.reduceMotion ? 0 : Math.min(i * 12, 900)}ms` }, svg);
        C.bindTip(circ, strip, () => ({
          value: 'p = ' + (t.p < 0.001 ? t.p.toExponential(1) : t.p.toFixed(3)),
          title: OUTCOMES[t.o] + (t.g ? ' · ' + SLICES[t.g - 1].name : ' · all patients'),
          note: sig ? 'Publishable!' : 'Into the file drawer'
        }));
        requestAnimationFrame(() => requestAnimationFrame(() => { circ.style.opacity = sig ? 1 : 0.55; }));
      });
      if (!lastTests.length) {
        el('text', { x: W / 2, y: top + band / 2 + 4, 'text-anchor': 'middle', class: 'label-text', text: 'Run a trial to see its p-values' }, svg);
      }
      strip.appendChild(svg);
    }
    C.responsive(strip, drawStrip);

    function drawMeter(yours, label) {
      const rows = [
        { name: 'Honest: 1 pre-registered test', v: 5, color: 'var(--c1)' },
        { name: label, v: yours, color: 'var(--c2)' }
      ];
      meter.replaceChildren();
      rows.forEach(r => {
        const row = document.createElement('div'); row.className = 'meter-row';
        const n = document.createElement('span'); n.textContent = r.name; n.className = 'small';
        const tr = document.createElement('div'); tr.className = 'meter-track';
        const f = document.createElement('div'); f.className = 'meter-fill'; f.style.background = r.color;
        tr.appendChild(f);
        const v = document.createElement('span'); v.className = 'v'; v.textContent = r.v == null ? '–' : Math.round(r.v) + '%';
        row.append(n, tr, v); meter.appendChild(row);
        requestAnimationFrame(() => requestAnimationFrame(() => { f.style.width = (r.v || 0) + '%'; }));
      });
    }
    drawMeter(null, 'Your strategy');

    function strategyLabel() {
      const k = +nO.value, s = +nS.value;
      const parts = [`${k} outcome${k > 1 ? 's' : ''}`];
      if (s) parts.push(`${s} subgroup${s > 1 ? 's' : ''}`);
      if (peek.checked) parts.push('peeking');
      return 'You: ' + parts.join(', ');
    }

    $('runOne').addEventListener('click', () => {
      const k = +nO.value, s = +nS.value;
      const r = runTrial(k, s, peek.checked);
      lastTests = r.tests;
      drawStrip(Math.round(strip.clientWidth));
      const sig = r.tests.filter(t => t.p < 0.05).sort((a, b) => a.p - b.p);
      head.classList.toggle('win', sig.length > 0);
      const tag = head.querySelector('.h-tag'), txt = head.querySelector('.h-text');
      const total = r.tests.length;
      if (sig.length) {
        const best = sig.find(t => t.diff > 0) || sig[0];
        const verb = best.diff > 0 ? 'significantly improves' : 'has a significant effect on';
        const who = best.g ? ' in ' + SLICES[best.g - 1].name : '';
        tag.textContent = 'Press release · breakthrough';
        txt.textContent = `Wonderzol ${verb} ${OUTCOMES[best.o]}${who} (p = ${best.p < 0.001 ? '<0.001' : best.p.toFixed(3)})`;
        const extra = document.createElement('div');
        extra.className = 'small muted'; extra.style.marginTop = '6px';
        extra.textContent = `${sig.length} of ${total} tests came up "significant"${r.stoppedEarly ? `, and you stopped the trial early at ${r.n} patients per arm` : ''}. The other ${total - 1} quietly go in the drawer. Remember: the true effect is zero.`;
        txt.appendChild(extra);
      } else {
        tag.textContent = 'Press release · cancelled';
        txt.textContent = `Nothing significant across ${total} test${total > 1 ? 's' : ''}. That is the correct answer, because Wonderzol is a sugar pill. Try measuring more outcomes or slicing into subgroups…`;
      }
    });

    let running = false;
    $('runMany').addEventListener('click', () => {
      if (running) return;
      running = true;
      const btn = $('runMany'); btn.disabled = true; btn.textContent = 'Running…';
      const k = +nO.value, s = +nS.value, pk = peek.checked;
      const N = 1000; let done = 0, hits = 0, early = 0;
      const step = () => {
        const until = Math.min(N, done + 40);
        for (; done < until; done++) {
          const r = runTrial(k, s, pk, true);
          if (r.hit) hits++;
          if (r.stoppedEarly) early++;
        }
        prog.style.width = (done / N * 100) + '%';
        if (done < N) requestAnimationFrame(step);
        else {
          const pct = hits / N * 100;
          drawMeter(pct, strategyLabel());
          const nTests = k * (s + 1);
          note.textContent = `Across 1,000 simulated trials of a drug that does nothing, ${Math.round(pct)}% produced at least one "significant" result (${nTests} test${nTests > 1 ? 's' : ''} per trial${pk ? `; ${Math.round(early / N * 100)}% were stopped early` : ''}). ` +
            (pct > 30 ? 'That is p-hacking: no fraud, no fake data, just choices.' : 'Turn up the outcomes, subgroups or peeking and watch it climb.');
          btn.disabled = false; btn.textContent = 'Run 1,000 trials'; running = false;
          setTimeout(() => { prog.style.width = '0'; }, 800);
        }
      };
      requestAnimationFrame(step);
    });
  }

  // ═══════════════ Evidence tiles ═══════════════
  function initEvidence() {
    const E = window.PHARMA.EVIDENCE;
    const host = document.getElementById('evidenceTiles');
    if (!host) return;
    const tiles = [
      { big: '31%', what: 'of antidepressant trials submitted to the FDA were never published, almost all of them negative.', src: E.turner.src },
      { big: `${E.compare.perfect} of ${E.compare.trials}`, what: `trials in the top five journals reported outcomes as pre-specified. ${E.compare.missing} pre-specified outcomes went missing, and ${E.compare.added} new ones were added without saying so.`, src: E.compare.src },
      { big: `${E.reboxetine.hiddenShare}%`, what: `of patient data on Pfizer’s antidepressant reboxetine was unpublished. Published studies overstated its benefit by up to ${E.reboxetine.overestimate}%.`, src: E.reboxetine.src },
      { big: `${E.boutron.abstractConclusionSpin}%`, what: 'of trials whose primary outcome failed still had "spin" in the abstract’s conclusions.', src: E.boutron.src },
      { big: `×${E.lundh.conclusionsRR}`, what: 'Industry-funded studies are 34% more likely to reach favourable conclusions than independent ones, with similar measured risk of bias.', src: E.lundh.src },
      { big: `${E.euTrials.commercial}% v ${E.euTrials.nonCommercial}%`, what: 'Results posted on the EU trials register (2018): industry sponsors v universities, hospitals and charities. On this measure pharma now beats academia.', src: E.euTrials.src }
    ];
    tiles.forEach(t => {
      const d = document.createElement('div'); d.className = 'stat-card reveal';
      const b = document.createElement('div'); b.className = 'big'; b.textContent = t.big;
      const w = document.createElement('div'); w.className = 'what'; w.textContent = t.what;
      const s = document.createElement('div'); s.className = 'src';
      const a = document.createElement('a'); a.href = t.src[1]; a.target = '_blank'; a.rel = 'noopener'; a.textContent = t.src[0];
      s.appendChild(a);
      d.append(b, w, s); host.appendChild(d);
    });
  }

  window.Lab = { init() { initPubBias(); initPhack(); initEvidence(); } };
})();
