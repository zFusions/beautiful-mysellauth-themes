# Motion mastery — scroll, hero, Lenis

Full motion stack for premium MySellAuth homepages.

---

## Event bus

```javascript
window.addEventListener('load', function () {
  document.documentElement.classList.add('motion-ready');
  document.dispatchEvent(new CustomEvent('theme:motion-start'));
});
```

All motion consumers listen to **`theme:motion-start`** once after loader hides.

Builder reload:
```javascript
window.__revealInit && window.__revealInit();
window.__featureMockReplay && window.__featureMockReplay();
document.dispatchEvent(new CustomEvent('theme:motion-start'));
```

---

## Layer 1 — Hero entrance

On `theme:motion-start`, stagger (exclude from scroll reveal):

| Element | Delay |
|---------|-------|
| `.t-hero-title` | 0 ms |
| `.t-hero-sub` | 80 ms |
| `.t-hero-actions` | 160 ms |
| `.t-hero-mock` | 240 ms |

```javascript
var EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
var DUR = reduce.matches ? 450 : 900;

el.style.opacity = '0';
el.style.transform = 'translate3d(0, 32px, 0)';
el.style.filter = 'blur(10px)';
// rAF → transition to opacity 1, transform 0, blur 0
```

---

## Layer 2 — Scroll reveal

Markup:
```html
<header data-reveal>...</header>
<div data-reveal-group>
  <article data-reveal>...</article>
</div>
```

Rules:
- **Exclude** `.t-hero` from reveal nodes
- IO: `{ threshold: 0.05, rootMargin: '0px 0px -6% 0px' }`
- Stagger: children `index × 80ms`, max 480ms via `--reveal-delay`
- Initial state: opacity 0, translateY 48px, blur 12px
- Animate: ~620–900ms with EASE above
- Export `window.__revealInit()` for builder

Lenis / scroll / resize → `scanReveal()` fallback.

---

## Layer 3 — Lenis smooth scroll

Homepage only (`.shop-home` wrapper):

```javascript
var lenis = new Lenis({
  duration: reduce.matches ? 1.05 : 1.75,
  easing: function (t) { return 1 - Math.pow(1 - t, 4); },
  smoothWheel: true,
  syncTouch: true,
  autoRaf: false
});
lenis.on('scroll', function () {
  scanReveal();
  window.__featureMockCheck && window.__featureMockCheck();
});
requestAnimationFrame(function raf(t) { lenis.raf(t); requestAnimationFrame(raf); });
```

**Modals:** `lenis.stop()` on show, `lenis.start()` on hidden.

**Parallax (optional dark hero):**
- Spotlight: `translateY(scroll * 0.14)`
- Mock stage: `translateY(scroll * 0.08)`
- Disable if `prefers-reduced-motion`

---

## Layer 4 — Feature mocks

See [05-mock-ui-mastery.md](05-mock-ui-mastery.md).

Hook: `window.__featureMockCheck` called from Lenis scroll + native scroll + boot timeouts.

---

## Anchor links

```javascript
document.addEventListener('click', function (e) {
  var a = e.target.closest('a[href*="#"]');
  if (!a) return;
  var id = a.getAttribute('href').split('#')[1];
  var target = document.getElementById(id);
  if (!target) return;
  e.preventDefault();
  if (window.__lenis) {
    window.__lenis.scrollTo(target, { offset: -80, duration: 1.65 });
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
});
```

---

## Easing canon

| Use | Value |
|-----|-------|
| UI entrance | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Hover color | `0.15s ease` |
| Mock lines | same as entrance, 0.45–1.1s duration |

**Forbidden:** bounce, elastic, infinite content loops.

---

## Page loader

Optional full-screen loader → add `.motion-ready` on html → dispatch `theme:motion-start` → remove loader after 400ms.

Fallback timeout 6s if load hangs.

---

## Motion QA checklist

- [ ] Hero animates once on load
- [ ] Sections reveal on scroll into view
- [ ] Mocks start when panel visible (not at page top)
- [ ] Mocks do NOT replay on every scroll
- [ ] Lenis stops during modals
- [ ] Reduced motion: no parallax, shorter hero dur, mocks still visible
- [ ] Builder reload resets reveal + mocks
