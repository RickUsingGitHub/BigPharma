/* Minimal SVG chart kit: stacked bars, columns, heatmap, dot timeline. No dependencies. */
window.Charts = (function () {
  const NS = 'http://www.w3.org/2000/svg';
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(tag, attrs, parent) {
    const n = document.createElementNS(NS, tag);
    if (attrs) for (const k in attrs) {
      if (k === 'style') n.setAttribute('style', attrs[k]);
      else if (k === 'text') n.textContent = attrs[k];
      else n.setAttribute(k, attrs[k]);
    }
    if (parent) parent.appendChild(n);
    return n;
  }

  function trimNum(s) { return s.indexOf('.') >= 0 ? s.replace(/0+$/, '').replace(/\.$/, '') : s; }
  function fmtUsd(m) {
    if (m == null) return '–';
    if (m === 0) return '$0';
    if (Math.abs(m) >= 1000) {
      const b = m / 1000;
      return '$' + trimNum(b >= 100 ? b.toFixed(0) : b >= 10 ? b.toFixed(1) : b.toFixed(2)) + 'bn';
    }
    if (m >= 100) return '$' + Math.round(m) + 'm';
    return '$' + trimNum(m.toFixed(2)) + 'm';
  }
  const fmtBn = (m) => m === 0 ? '$0' : '$' + trimNum((m / 1000).toFixed(1)) + 'bn';

  // Rounded data-end, square at the baseline (r capped by size).
  function hBarPath(x, y, w, h, r) {
    if (w <= 0) return '';
    r = Math.min(r, w, h / 2);
    return `M${x},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h - r}Q${x + w},${y + h} ${x + w - r},${y + h}H${x}Z`;
  }
  function vBarPath(x, y, w, h, r) {
    if (h <= 0) return '';
    r = Math.min(r, h, w / 2);
    return `M${x},${y + h}V${y + r}Q${x},${y} ${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h}Z`;
  }

  function niceMax(v, ticks) {
    if (v <= 0) return 1;
    const raw = v / ticks;
    const mag = Math.pow(10, Math.floor(Math.log10(raw)));
    const steps = [1, 2, 2.5, 5, 10];
    const step = steps.find(s => s * mag >= raw) * mag;
    return { max: step * ticks, step };
  }

  // ---------- tooltip ----------
  const Tip = (function () {
    let node;
    function ensure() { node = node || document.getElementById('tooltip'); return node; }
    function show(evt, spec) {
      const t = ensure(); if (!t) return;
      t.replaceChildren();
      if (spec.value) { const v = document.createElement('div'); v.className = 'tt-value'; v.textContent = spec.value; t.appendChild(v); }
      if (spec.title) { const h = document.createElement('div'); h.className = 'tt-title'; h.textContent = spec.title; t.appendChild(h); }
      (spec.rows || []).forEach(r => {
        const row = document.createElement('div'); row.className = 'tt-row';
        if (r.color) { const k = document.createElement('span'); k.className = 'tt-key'; k.style.background = r.color; row.appendChild(k); }
        const s = document.createElement('span'); s.textContent = r.label; row.appendChild(s);
        t.appendChild(row);
      });
      if (spec.note) { const n = document.createElement('div'); n.className = 'tt-note'; n.textContent = spec.note; t.appendChild(n); }
      t.classList.add('show');
      move(evt);
    }
    function move(evt) {
      const t = ensure(); if (!t) return;
      let x, y;
      if (evt && evt.clientX != null && !(evt.type === 'focus' || evt.type === 'focusin')) { x = evt.clientX; y = evt.clientY; }
      else if (evt && evt.target && evt.target.getBoundingClientRect) { const b = evt.target.getBoundingClientRect(); x = b.left + b.width / 2; y = b.top; }
      else return;
      const w = t.offsetWidth, h = t.offsetHeight, pad = 12;
      let left = x + 14, top = y - h - 12;
      if (left + w > window.innerWidth - pad) left = x - w - 14;
      if (left < pad) left = pad;
      if (top < pad) top = y + 18;
      t.style.left = left + 'px'; t.style.top = top + 'px';
    }
    function hide() { const t = ensure(); if (t) t.classList.remove('show'); }
    return { show, move, hide };
  })();

  // Attach hover + keyboard focus behaviour to a mark.
  function bindTip(mark, container, specFn) {
    mark.classList.add('mark');
    mark.setAttribute('tabindex', '0');
    const on = (e) => { container.classList.add('hovering'); mark.classList.add('hot'); Tip.show(e, specFn()); };
    const off = () => { container.classList.remove('hovering'); mark.classList.remove('hot'); Tip.hide(); };
    mark.addEventListener('pointerenter', on);
    mark.addEventListener('pointermove', (e) => Tip.move(e));
    mark.addEventListener('pointerleave', off);
    mark.addEventListener('focus', on);
    mark.addEventListener('blur', off);
  }

  // Reveal-on-view: adds .in-view once the element scrolls into view.
  const io = ('IntersectionObserver' in window) ? new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } });
  }, { threshold: 0.15 }) : null;
  function observe(node) {
    if (!io || reduceMotion) { node.classList.add('in-view'); return; }
    io.observe(node);
  }

  // Re-render a chart whenever its container width changes.
  function responsive(container, render) {
    let lastW = 0, raf;
    const run = () => {
      const w = Math.round(container.clientWidth);
      if (w && w !== lastW) { lastW = w; render(w); }
    };
    if ('ResizeObserver' in window) {
      new ResizeObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(run); }).observe(container);
    } else {
      window.addEventListener('resize', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(run); });
    }
    run();
  }

  function legend(node, items, shape) {
    node.replaceChildren();
    items.forEach(it => {
      const s = document.createElement('span');
      const i = document.createElement('i');
      i.style.background = it.color;
      if (shape === 'dot') i.className = 'ring';
      s.appendChild(i);
      s.appendChild(document.createTextNode(it.label));
      node.appendChild(s);
    });
  }

  function catColor(i) { return `var(--c${i + 1})`; }

  // ---------- stacked horizontal bars ----------
  // rows: [{label, sub, segs:[{key, label, value, color}], total}]
  function stackedHBar(container, rows, opts) {
    opts = opts || {};
    responsive(container, (W) => {
      container.replaceChildren();
      const narrow = W < 520;
      const labelW = narrow ? 104 : 168;
      const valueW = 60;
      const barH = narrow ? 16 : 20, gapY = narrow ? 14 : 16;
      const top = 22, H = top + rows.length * (barH + gapY) + 4;
      const plotW = Math.max(60, W - labelW - valueW);
      const maxV = Math.max(...rows.map(r => r.total), 1);
      const nm = niceMax(maxV, narrow ? 3 : 5);
      const x = (v) => labelW + (v / nm.max) * plotW;
      const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: 'img', 'aria-label': opts.aria || 'Bar chart' });
      for (let t = 0; t <= nm.max + 1e-9; t += nm.step) {
        el('line', { x1: x(t), x2: x(t), y1: top - 6, y2: H - 2, class: t === 0 ? 'base-line' : 'grid-line' }, svg);
        el('text', { x: x(t), y: 12, 'text-anchor': 'middle', class: 'axis-text', text: fmtBn(t) }, svg);
      }
      rows.forEach((r, i) => {
        const y = top + i * (barH + gapY);
        const lab = el('text', { x: labelW - 10, y: y + barH / 2 + 4, 'text-anchor': 'end', class: 'label-text', text: narrow && r.short ? r.short : r.label }, svg);
        if (r.labelStrong) lab.setAttribute('class', 'label-strong');
        const g = el('g', { class: 'grow-x' }, svg);
        let acc = 0;
        const segs = r.segs.filter(s => s.value > 0);
        segs.forEach((s, j) => {
          const x0 = x(acc), x1 = x(acc + s.value);
          const last = j === segs.length - 1;
          const w = Math.max(0, x1 - x0 - (last ? 0 : 2)); // 2px surface gap between segments
          const p = el('path', { d: last ? hBarPath(x0, y, w, barH, 4) : `M${x0},${y}h${w}v${barH}h${-w}Z`, style: `fill:${s.color}` }, g);
          bindTip(p, container, () => ({ value: fmtUsd(s.value), title: r.label, rows: [{ color: s.color, label: s.label }], note: opts.noteFn ? opts.noteFn(r, s) : '' }));
          acc += s.value;
        });
        el('text', { x: x(r.total) + 6, y: y + barH / 2 + 4, class: 'label-strong fade-in', text: fmtUsd(r.total) }, svg);
      });
      container.appendChild(svg);
      observe(container);
    });
  }

  // ---------- stacked columns (years) ----------
  // cols: [{label, segs:[{label,value,color}], total, annot?}]
  function stackedColumns(container, cols, opts) {
    opts = opts || {};
    responsive(container, (W) => {
      container.replaceChildren();
      const narrow = W < 560;
      const H = narrow ? 260 : 320, top = 18, bottom = 26, left = 40, right = 6;
      const plotW = W - left - right, plotH = H - top - bottom;
      const maxV = Math.max(...cols.map(c => c.total), 1);
      const nm = niceMax(maxV, 4);
      const y = (v) => top + plotH - (v / nm.max) * plotH;
      const slot = plotW / cols.length;
      const bw = Math.min(24, Math.max(4, slot - (narrow ? 2 : 4)));
      const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: 'img', 'aria-label': opts.aria || 'Column chart' });
      for (let t = 0; t <= nm.max + 1e-9; t += nm.step) {
        el('line', { x1: left, x2: W - right, y1: y(t), y2: y(t), class: t === 0 ? 'base-line' : 'grid-line' }, svg);
        el('text', { x: left - 6, y: y(t) + 4, 'text-anchor': 'end', class: 'axis-text', text: fmtBn(t) }, svg);
      }
      cols.forEach((c, i) => {
        const cx = left + i * slot + slot / 2;
        const every = narrow ? 5 : (slot < 26 ? 5 : 2);
        if (i % every === 0 || i === cols.length - 1) el('text', { x: cx, y: H - 8, 'text-anchor': 'middle', class: 'axis-text', text: c.label }, svg);
        const g = el('g', { class: 'grow-y', style: reduceMotion ? '' : `transition-delay:${(i * 18)}ms` }, svg);
        let acc = 0;
        const segs = c.segs.filter(s => s.value > 0);
        segs.forEach((s, j) => {
          const y1 = y(acc), y0 = y(acc + s.value);
          const last = j === segs.length - 1;
          const h = Math.max(0, y1 - y0 - (j === 0 ? 0 : 2));
          const yy = y0;
          const p = el('path', { d: last ? vBarPath(cx - bw / 2, yy, bw, h, 4) : `M${cx - bw / 2},${yy}h${bw}v${h}h${-bw}Z`, style: `fill:${s.color}` }, g);
          bindTip(p, container, () => ({
            value: fmtUsd(s.value), title: `${c.label} · ${s.label}`,
            rows: [{ label: `Year total ${fmtUsd(c.total)}` }],
            note: opts.noteFn ? opts.noteFn(c, s) : ''
          }));
          acc += s.value;
        });
        // invisible full-height hit target so thin years are still hoverable
        if (!segs.length) return;
      });
      (opts.annotations || []).forEach(a => {
        const i = cols.findIndex(c => c.label === String(a.year));
        if (i < 0) return;
        const c = cols[i];
        const cx = left + i * slot + slot / 2;
        const ty = y(c.total) - 8;
        if (narrow && a.hideNarrow) return;
        const anchor = cx > W - 90 ? 'end' : (cx < 90 ? 'start' : 'middle');
        el('text', { x: cx, y: Math.max(12, ty), 'text-anchor': anchor, class: 'label-text fade-in', style: 'font-size:11px', text: a.text }, svg);
      });
      container.appendChild(svg);
      observe(container);
    });
  }

  // ---------- simple horizontal bars ----------
  // items: [{label, value, color, valueLabel, tip:{...}}]
  function simpleHBar(container, items, opts) {
    opts = opts || {};
    responsive(container, (W) => {
      container.replaceChildren();
      const narrow = W < (opts.narrowAt || 440);
      const labelW = opts.labelW ? opts.labelW(W) : (narrow ? 120 : 190);
      const valueW = opts.valueW || 64;
      const barH = 16, gapY = 12, top = opts.axis === false ? 4 : 20;
      const H = top + items.length * (barH + gapY);
      const plotW = Math.max(40, W - labelW - valueW);
      const maxV = opts.max || Math.max(...items.map(i => i.value), 1);
      const nm = opts.axis === false ? { max: maxV, step: maxV } : niceMax(maxV, narrow ? 2 : 4);
      const x = (v) => labelW + (v / nm.max) * plotW;
      const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: 'img', 'aria-label': opts.aria || 'Bar chart' });
      if (opts.axis !== false) {
        for (let t = 0; t <= nm.max + 1e-9; t += nm.step) {
          el('line', { x1: x(t), x2: x(t), y1: top - 6, y2: H - 4, class: t === 0 ? 'base-line' : 'grid-line' }, svg);
          el('text', { x: x(t), y: 11, 'text-anchor': 'middle', class: 'axis-text', text: opts.tickFmt ? opts.tickFmt(t) : t }, svg);
        }
      } else {
        el('line', { x1: x(0), x2: x(0), y1: 0, y2: H - 4, class: 'base-line' }, svg);
      }
      items.forEach((it, i) => {
        const y = top + i * (barH + gapY);
        const label = narrow && it.shortLabel ? it.shortLabel : it.label;
        el('text', { x: labelW - 8, y: y + barH / 2 + 4, 'text-anchor': 'end', class: 'label-text', text: label }, svg);
        const g = el('g', { class: 'grow-x', style: reduceMotion ? '' : `transition-delay:${i * 50}ms` }, svg);
        const p = el('path', { d: hBarPath(x(0), y, Math.max(1, x(it.value) - x(0)), barH, 4), style: `fill:${it.color}` }, g);
        if (it.tip) bindTip(p, container, () => it.tip);
        el('text', { x: x(it.value) + 6, y: y + barH / 2 + 4, class: 'label-strong fade-in', text: it.valueLabel }, svg);
      });
      container.appendChild(svg);
      observe(container);
    });
  }

  // ---------- heatmap ----------
  function heatmap(container, rows, cols, valueFn, opts) {
    opts = opts || {};
    const ramp = ['--s100', '--s200', '--s300', '--s400', '--s500', '--s600', '--s700'];
    responsive(container, (W) => {
      container.replaceChildren();
      const narrow = W < 640;
      const labelW = narrow ? 92 : 150;
      const headH = narrow ? 96 : 70;
      const cellW = (W - labelW) / cols.length;
      const cellH = narrow ? 30 : 34;
      const H = headH + rows.length * cellH + 4;
      const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: 'img', 'aria-label': opts.aria || 'Heatmap' });
      cols.forEach((c, j) => {
        const cx = labelW + j * cellW + cellW / 2;
        const t = el('text', { x: cx, y: headH - 8, class: 'label-text', style: 'font-size:11px', 'text-anchor': narrow ? 'start' : 'middle', text: narrow ? c.short : c.short }, svg);
        if (narrow) t.setAttribute('transform', `rotate(-55 ${cx} ${headH - 8})`);
        el('rect', { x: cx - 6, y: headH - (narrow ? 4 : 4), width: 12, height: 3, rx: 1.5, style: `fill:${c.color}` }, svg);
      });
      const all = [];
      rows.forEach(r => cols.forEach(c => { const v = valueFn(r, c); if (v > 0) all.push(v); }));
      const maxLog = Math.log10(Math.max(...all, 10));
      const minLog = Math.log10(Math.max(1, Math.min(...all, 1000)));
      rows.forEach((r, i) => {
        const y = headH + i * cellH;
        el('text', { x: labelW - 8, y: y + cellH / 2 + 4, 'text-anchor': 'end', class: 'label-text', text: narrow ? (r.short || r.label) : r.label }, svg);
        cols.forEach((c, j) => {
          const v = valueFn(r, c);
          const x0 = labelW + j * cellW + 1, y0 = y + 1;
          let fill = 'var(--s-zero)', step = -1;
          if (v > 0) {
            const t = (Math.log10(v) - minLog) / Math.max(0.0001, (maxLog - minLog));
            step = Math.max(0, Math.min(ramp.length - 1, Math.round(t * (ramp.length - 1))));
            fill = `var(${ramp[step]})`;
          }
          const rect = el('rect', { x: x0, y: y0, width: Math.max(0, cellW - 2), height: cellH - 2, rx: 4, style: `fill:${fill}` }, svg);
          bindTip(rect, container, () => ({ value: v > 0 ? fmtUsd(v) : 'No tracked penalty', title: `${r.label} · ${c.name}` }));
          if (v > 0 && cellW >= 46) {
            const dark = document.documentElement.getAttribute('data-theme') === 'dark' ||
              (!document.documentElement.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
            const inkOnFill = dark ? (step >= 5 ? '#0b0b0b' : '#ffffff') : (step >= 3 ? '#ffffff' : '#0b0b0b');
            el('text', { x: x0 + (cellW - 2) / 2, y: y0 + cellH / 2 + 3, 'text-anchor': 'middle', style: `font-size:10.5px;font-weight:700;fill:${inkOnFill};pointer-events:none`, text: fmtUsd(v).replace('.0bn', 'bn') }, svg);
          }
        });
      });
      container.appendChild(svg);
      observe(container);
    });
  }

  // ---------- dot timeline (company dossier) ----------
  function dotTimeline(container, cases, opts) {
    opts = opts || {};
    responsive(container, (W) => {
      container.replaceChildren();
      const y0 = 1996, y1 = 2026;
      const H = 120, left = 14, right = 14, axisY = 92;
      const x = (yr) => left + ((yr - y0) / (y1 - y0)) * (W - left - right);
      const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: 'img', 'aria-label': 'Timeline of cases' });
      el('line', { x1: left, x2: W - right, y1: axisY, y2: axisY, class: 'base-line' }, svg);
      for (let yr = y0; yr <= y1; yr += 5) {
        el('line', { x1: x(yr), x2: x(yr), y1: axisY, y2: axisY + 4, class: 'base-line' }, svg);
        el('text', { x: x(yr), y: axisY + 18, 'text-anchor': 'middle', class: 'axis-text', text: yr }, svg);
      }
      const maxUsd = Math.max(...cases.map(c => c.usd || 0), 100);
      const rad = (v) => v > 0 ? Math.max(5, Math.sqrt(v / maxUsd) * 30) : 5;
      // simple stacking so same-year dots don't sit on top of each other
      const byYear = {};
      const sorted = cases.slice().sort((a, b) => (b.usd || 0) - (a.usd || 0));
      sorted.forEach(c => {
        const k = c.year; byYear[k] = (byYear[k] || 0) + 1;
        const idx = byYear[k] - 1;
        const r = rad(c.usd);
        const cy = axisY - 6 - r - idx * 9;
        const g = el('g', { class: 'fade-in' }, svg);
        const hollow = c.kind === 'event' || c.status === 'overturned' || c.status === 'appeal';
        const circ = el('circle', {
          cx: x(c.year), cy: Math.max(r + 2, cy), r,
          style: hollow ? `fill:var(--surface);stroke:${c.color};stroke-width:2` : `fill:${c.color};stroke:var(--surface);stroke-width:2;fill-opacity:.9`
        }, g);
        bindTip(circ, container, () => ({
          value: c.usd > 0 ? fmtUsd(c.usd) : 'No fine',
          title: `${c.year} · ${c.title}`,
          rows: [{ color: c.color, label: c.catName }],
          note: c.status === 'overturned' ? 'Overturned, not counted' : c.status === 'appeal' ? 'Under appeal, not counted' : (c.kind === 'private' ? 'Private lawsuits' : '')
        }));
        if (opts.onClick) circ.addEventListener('click', () => opts.onClick(c));
      });
      container.appendChild(svg);
      observe(container);
    });
  }

  function table(container, headers, rows) {
    const t = document.createElement('table'); t.className = 'data';
    const thead = document.createElement('thead'); const tr = document.createElement('tr');
    headers.forEach(h => { const th = document.createElement('th'); th.textContent = h.label; if (h.num) th.className = 'num'; tr.appendChild(th); });
    thead.appendChild(tr); t.appendChild(thead);
    const tb = document.createElement('tbody');
    rows.forEach(r => {
      const tr2 = document.createElement('tr');
      r.forEach((cell, i) => { const td = document.createElement('td'); td.textContent = cell; if (headers[i].num) td.className = 'num'; tr2.appendChild(td); });
      tb.appendChild(tr2);
    });
    t.appendChild(tb);
    container.replaceChildren(t);
  }

  return { el, fmtUsd, fmtBn, Tip, bindTip, observe, responsive, legend, catColor, stackedHBar, stackedColumns, simpleHBar, heatmap, dotTimeline, table, hBarPath, reduceMotion };
})();
