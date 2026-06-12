# Mock UI mastery — production-grade feature animations

Complete system for scroll-gated decorative mocks. Battle-tested patterns.

---

## Architecture

```
theme-feature-mocks.js     ← single engine
snippets/feature-mock.njk  ← empty shells per type
theme.css                  ← .t-mock-line transitions
features.njk               ← data-feature-mock-section
master.njk                 ← loads JS + Lenis hooks __featureMockCheck
```

---

## HTML shells (empty stages)

### Feed / log

```nunjucks
<div class="t-mock-app" data-mock="feed">
  <div class="t-mock-chrome">
    <span class="t-mock-dots"><i></i><i></i><i></i></span>
    <span class="t-mock-label">console</span>
  </div>
  <div class="t-mock-stage" data-mock-stage></div>
</div>
```

### List / cart

```nunjucks
<div class="t-mock-app" data-mock="list">
  <div class="t-mock-receipt-head">
    <span>Your cart</span>
    <em data-mock-count>0 items</em>
  </div>
  <ul class="t-mock-list" data-mock-list></ul>
  <div class="t-mock-total" data-mock-total-row>
    <span>Total</span>
    <strong data-mock-total>$0.00</strong>
  </div>
</div>
```

### Meters

```nunjucks
<div class="t-mock-app" data-mock="meters">
  <div class="t-mock-meter" data-mock-meter data-target="78" data-duration="2400">
    <div class="t-mock-meter-label"><span>Plan A</span><em>Active</em></div>
    <div class="t-mock-meter-track"><i class="t-mock-meter-fill"></i></div>
  </div>
  {# repeat 2–3 meters #}
</div>
```

**Rule:** lists and feeds are **empty** in HTML. JS injects all animated content.

---

## CSS

```css
.t-mock-line,
.t-mock-list li {
  opacity: 0;
  filter: blur(4px);
  transform: translate3d(0, 8px, 0);
  transition:
    opacity var(--mock-line-dur, 0.45s) var(--t-ease),
    transform var(--mock-line-dur, 0.45s) var(--t-ease),
    filter var(--mock-line-dur, 0.45s) var(--t-ease);
}
.t-mock-line.is-visible,
.t-mock-list li.is-visible {
  opacity: 1;
  filter: none;
  transform: none;
}
.t-mock-meter-fill {
  display: block;
  height: 4px;
  width: 0%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--t-accent), color-mix(in srgb, var(--t-accent) 70%, white));
  transition: width var(--mock-meter-dur, 2s) var(--t-ease);
}
```

---

## JS engine (complete pattern)

```javascript
(function () {
  'use strict';

  var TIMING = {
    startDelay: 200,
    stepGap: 340,
    listStepGap: 480,
    meterGap: 520,
    finishDelay: 300,
    cardStagger: 280
  };

  var played = new WeakSet();
  var sectionRef = null;
  var cardObserver = null;

  function reveal(el) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { el.classList.add('is-visible'); });
    });
  }

  function getScrollY() {
    var y = window.scrollY || 0;
    if (window.__lenis && typeof window.__lenis.scroll === 'number') {
      y = Math.max(y, window.__lenis.scroll);
    }
    return y;
  }

  function sectionIsOnScreen() {
    if (!sectionRef) return false;
    var r = sectionRef.getBoundingClientRect();
    var vh = window.innerHeight;
    return r.top < vh * 0.94 && r.bottom > 24;
  }

  function canRun() {
    if (!sectionRef) return false;
    if (sectionRef.getBoundingClientRect().bottom < 24) return false;
    return sectionIsOnScreen() || getScrollY() > 8;
  }

  function runFeed(stage, lines, done) {
    stage.innerHTML = '';
    var i = 0;
    function next() {
      if (i >= lines.length) return done();
      var el = document.createElement('p');
      el.className = 't-mock-line' + (lines[i].tone ? ' is-' + lines[i].tone : '');
      el.textContent = lines[i].text;
      stage.appendChild(el);
      reveal(el);
      i++;
      setTimeout(next, TIMING.stepGap);
    }
    setTimeout(next, TIMING.startDelay);
  }

  function runList(card, items, done) {
    var list = card.querySelector('[data-mock-list]');
    var count = card.querySelector('[data-mock-count]');
    var total = card.querySelector('[data-mock-total]');
    var totalRow = card.querySelector('[data-mock-total-row]');
    if (!list) return done();
    list.innerHTML = '';
    var sum = 0, i = 0;
    function next() {
      if (i >= items.length) {
        if (totalRow) reveal(totalRow);
        return setTimeout(done, TIMING.finishDelay);
      }
      var li = document.createElement('li');
      li.className = 't-mock-list';
      li.innerHTML = '<span>' + items[i].name + '</span><strong>' + items[i].price + '</strong>';
      list.appendChild(li);
      reveal(li);
      sum += parseFloat(items[i].raw) || 0;
      if (count) count.textContent = (i + 1) + ' item' + (i ? 's' : '');
      if (total) total.textContent = '$' + sum.toFixed(2);
      i++;
      setTimeout(next, TIMING.listStepGap);
    }
    setTimeout(next, TIMING.startDelay);
  }

  function runMeters(card, done) {
    var meters = card.querySelectorAll('[data-mock-meter]');
    var maxEnd = 0;
    meters.forEach(function (m, n) {
      var fill = m.querySelector('.t-mock-meter-fill');
      var target = parseFloat(m.getAttribute('data-target') || '50');
      var dur = parseFloat(m.getAttribute('data-duration') || '2400');
      var delay = n === 0 ? TIMING.startDelay : TIMING.meterGap * n;
      setTimeout(function () {
        fill.style.width = '0%';
        void fill.offsetWidth;
        fill.style.width = target + '%';
      }, delay);
      maxEnd = Math.max(maxEnd, delay + dur);
    });
    setTimeout(done, maxEnd + TIMING.finishDelay);
  }

  var HANDLERS = {
    feed: function (card, done) {
      var stage = card.querySelector('[data-mock-stage]');
      var lines = (card.dataset.mockLines || '').split('|').filter(Boolean).map(function (t) {
        return { text: t };
      });
      if (!lines.length) lines = [{ text: 'Processing…' }, { text: 'Done.' }];
      runFeed(stage, lines, done);
    },
    list: function (card, done) { runList(card, [], done); },
    meters: function (card, done) { runMeters(card, done); }
  };

  function startCard(card) {
    if (played.has(card)) return;
    played.add(card);
    card.classList.add('is-live');
    var mock = card.querySelector('[data-mock]');
    if (!mock) return;
    var type = mock.getAttribute('data-mock');
    var fn = HANDLERS[type];
    if (fn) fn(card, function () { card.classList.add('is-done'); });
  }

  function check() {
    if (!canRun()) return;
    sectionRef.querySelectorAll('.t-feature-card').forEach(function (card) {
      if (played.has(card)) return;
      var panel = card.querySelector('[data-mock-panel]');
      if (!panel) return;
      var r = panel.getBoundingClientRect();
      var vh = window.innerHeight;
      var vis = Math.min(r.bottom, vh) - Math.max(r.top, 0);
      if (vis / r.height >= 0.08) startCard(card);
    });
  }

  function bindObserver() {
    if (!sectionRef || cardObserver) return;
    cardObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting || !canRun()) return;
        var card = e.target.closest('.t-feature-card');
        if (card) startCard(card);
      });
    }, { threshold: 0.08 });
    sectionRef.querySelectorAll('[data-mock-panel]').forEach(function (p) {
      cardObserver.observe(p);
    });
  }

  function boot() {
    sectionRef = document.querySelector('[data-feature-mock-section]');
    if (!sectionRef) return;
    bindObserver();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });
    document.addEventListener('theme:motion-start', function () {
      setTimeout(check, 120);
      setTimeout(check, 600);
    });
    requestAnimationFrame(function () { requestAnimationFrame(check); });
    setTimeout(check, 300);
    setTimeout(check, 900);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.__featureMockCheck = check;
  window.__featureMockReplay = function () {
    played = new WeakSet();
    sectionRef.querySelectorAll('.t-feature-card').forEach(function (c) {
      c.classList.remove('is-live', 'is-done');
    });
    if (cardObserver) { cardObserver.disconnect(); cardObserver = null; }
    bindObserver();
    check();
  };
})();
```

Populate `lines` / `items` from `settings.json` or inline config — **never empty handlers in production**.

---

## Trigger rules (critical)

1. **IntersectionObserver** on `[data-mock-panel]` threshold 0.08
2. **`sectionIsOnScreen()`** — if user is at section, run without scrollY
3. **Lenis:** read `lenis.scroll`, not only `window.scrollY`
4. **Boot checks:** rAF + 300ms + 900ms + on `theme:motion-start`
5. **Play once** per card (`WeakSet`)

---

## prefers-reduced-motion

**Never:**
```javascript
if (reduce.matches) TIMING.stepGap = 80;
```
```css
.t-mock-line { opacity: 1; transition: none; }
```

**Do:** shorten parallax/cursor only. Keep mock stagger perceptible.

---

## Timing guide

| Feel | stepGap | listStepGap | total ~5 lines |
|------|---------|-------------|----------------|
| Snappy (default) | 320–400 ms | 450–550 ms | ~2.5–3.5 s |
| Balanced | 700–900 ms | 1200–1400 ms | ~6–8 s |
| Slow | 1400+ ms | 2000+ ms | 12+ s |

CSS `--mock-line-dur` ≈ 0.32s for snappy feed/list; meters keep `--mock-meter-dur` 2s+.

---

## Cursor ambient (optional, dark themes)

Orange/accent radial following mouse on features section. `pointer-events: none`. Disable in `prefers-reduced-motion`.

---

## Common bugs

| Bug | Fix |
|-----|-----|
| Mocks never start | Lenis scrollY=0 — use sectionIsOnScreen + IO |
| Empty terminal | Handler not called — check data-mock type |
| Instant flash | reduce-motion CSS transition:none |
| Replay broken | Rebind observer + clear WeakSet |
