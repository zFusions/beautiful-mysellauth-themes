# Theme architecture — universal SellAuth structure

How to **structure any SellAuth theme** — regardless of brand, style recipe, or client. Patterns use placeholder prefix `t-` and CSS file `theme.css`; replace with `{PREFIX}` / `{CSS_FILE}` from DESIGN.md.

**Related:** [14-sellauth-surfaces.md](14-sellauth-surfaces.md) — every template key and P0/P1/P2 checklist.

---

## Layer model (top → bottom)

```
┌─────────────────────────────────────────┐
│  schema.json + settings.json  (config)  │
├─────────────────────────────────────────┤
│  layouts/master.njk           (shell)   │
├─────────────────────────────────────────┤
│  templates/*.njk              (pages)   │
├─────────────────────────────────────────┤
│  components/*.njk             (sections)  │
├─────────────────────────────────────────┤
│  snippets/*.njk               (partials)│
├─────────────────────────────────────────┤
│  assets/*.css + *.js            (style) │
└─────────────────────────────────────────┘
```

Each layer has **one job**. Do not mix landing marketing CSS into shop-only files or duplicate rules across files.

---

## Required files

| Path | Role | Rules |
|------|------|-------|
| `settings.json` | Live config + `components_order` | Every component in order must exist in `components` |
| `schema.json` | Builder field definitions | Every editable string has a schema entry |
| `layouts/master.njk` | HTML shell, CSS/JS order, body classes | No section markup here |
| `templates/shop.njk` | Homepage wrapper | Loops `components_order` only |
| `templates/product.njk` | PDP wrapper | One product-page component typical |
| `templates/cart.njk` | Cart wrapper | |
| `assets/pro.css` | Platform base | **Never break or override globally** |
| `assets/custom.css` | Minimal platform tweaks | Keep tiny |
| `assets/theme.css` | **Entire landing design system** | All `--t-*` tokens + homepage sections |
| `assets/shop-pages.css` | Cart, checkout, shared inner shell | No PDP layout here if split |
| `assets/shop-pdp.css` | PDP only (optional but recommended) | Single source for product page layout |
| `assets/theme-feature-mocks.js` | Scroll-gated mock UI | No-op if nodes missing |

Theme CSS filename is `{CSS_FILE}` (commonly `theme.css`) — **one landing file only**, documented in DESIGN.md.

---

## master.njk responsibilities

1. **Meta + fonts** — Google Fonts from DESIGN.md; preconnect.
2. **CSS stack** (fixed order):

```
Bootstrap (CDN) → pro.css → custom.css → theme.css → shop-pdp.css → shop-pages.css
```

3. **Body classes** — distinguish landing vs inner pages:

```nunjucks
<body class="site-background-fixed t-home-page{% if isLanding %} t-landing-page{% else %} t-inner-page{% endif %}">
```

4. **`#app` wrapper** — SellAuth Alpine root; do not put fixed ambient layers inside without testing opacity stack.
5. **Scripts** — defer mocks, reveal, Lenis; dispatch `theme:motion-start` after loader.
6. **Inline critical** — loader, optional hero entrance only; not full design system.

---

## Homepage template

```nunjucks
<div class="components t-home t-landing-page">
  {% for componentId in components_order %}
    {% render_component componentId %}
  {% endfor %}
</div>
```

- Class `t-home` scopes Lenis + motion + section background alternation.
- Each rendered block is `.component` with `data-component-id`.

### Typical `components_order` (adapt per PRODUCT.md)

```
hero → how-it-works → products → features → feedbacks → compare/why → faq → final-cta
```

Footer is usually via `master.njk` (`{% render_component "footer" %}`), not in shop loop — either pattern is valid; stay consistent.

---

## Component contract (every section)

```nunjucks
<section id="products" class="t-section t-products component" data-component-id="{{ componentId }}">
  <div class="container">
    <h2>{{ properties.title | default('…') | renderString }}</h2>
  </div>
</section>
```

| Requirement | Why |
|-------------|-----|
| `class="component"` | Builder integration |
| `data-component-id="{{ componentId }}"` | Builder targeting |
| `properties.* \| renderString` | Editable copy |
| `properties.* \| default('…')` | Sensible preview when empty |
| Matching `schema.json` + `settings.json` | Resale-ready editor |

**Snippets:** parent passes `properties` explicitly:

```nunjucks
{% render_snippet "section-body.njk", properties=properties, componentId=componentId %}
```

---

## CSS architecture rules

### Single source of truth

| Concern | File |
|---------|------|
| Tokens (`--t-bg`, `--t-accent`, …) | `theme.css` `:root` |
| Hero, nav, landing sections | `theme.css` |
| PDP layout + product cards on PDP | `shop-pdp.css` |
| Cart, checkout, account | `shop-pages.css` |
| Platform | `pro.css` — touch minimally |

**Anti-pattern:** same glass card rules copied in three CSS files — mirror **tokens**, not duplicate selectors.

### Prefix discipline

All custom classes: `{prefix}-*` (e.g. `t-hero`, `t-flow-card`). Never unprefixed `.hero` on landing — Bootstrap collisions.

### Background depth (any dark theme)

1. **Hero light** — scoped inside `.t-hero` only (spotlight + optional grid mask).
2. **Section surfaces** — alternate `--t-bg` / `--t-section-alt` on `.t-home > .component`:

```css
.t-home > .component { background: var(--t-section-alt) !important; }
.t-home > .component:nth-child(even) { background: var(--t-bg) !important; }
.t-home > .component.t-hero { background: transparent !important; }
```

3. **No full-page glow/grid** stacked on hero — see [03-design-system.md](03-design-system.md#page-depth--background-dark-saas).

4. **`#app` opacity stack** — if `#app { background: solid !important }`, fixed `body::before` layers are invisible; use section backgrounds instead.

### Optional footer anchor

Low-opacity bottom radial on footer only — not per-section title glows.

---

## JavaScript architecture

| Script | Scope | Trigger |
|--------|-------|---------|
| `theme-reveal.js` or inline | Scroll reveal `data-reveal` | `theme:motion-start` |
| `theme-feature-mocks.js` | Feature + how-it-works mocks | IntersectionObserver + IO |
| Lenis | `.t-home` / landing only | After motion-start |
| Alpine | Platform `#app` | Product form, cart qty |

Mocks must **no-op** when `show_mock_ui: false` or nodes absent.

---

## Inner pages (PDP, cart, product)

Same tokens as landing. Body gets `t-inner-page`. Navbar often solid background:

```css
.t-inner-page .t-navbar-wrap {
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(16px);
}
```

PDP layout pattern (generic two-column): media + accordions | sticky buy rail — full markup in [07-shop-pages.md](07-shop-pages.md).

---

## Builder validation workflow

After **each** new component:

1. `sellauth-theme push --theme {ID}`
2. Open visual builder for that section
3. Edit every schema field → preview updates
4. Ctrl+F5
5. Then add next component to `components_order`

---

## Naming: files vs classes

| Client chooses | Agent implements |
|----------------|------------------|
| CSS file `theme.css` | `assets/theme.css` |
| Prefix `shop-` | `--shop-bg`, `.shop-hero` |
| Prefix `t-` | `--t-bg`, `.t-hero` |

Document in DESIGN.md YAML: `prefix`, `css_file`, `theme_id`.

---

## Checklist — structure before polish

```
[ ] settings.json components match components_order
[ ] schema.json covers every properties.* used in templates
[ ] master.njk CSS order correct
[ ] One landing CSS file with all tokens
[ ] PDP rules not duplicated in shop-pages.css
[ ] All sections use component + data-component-id
[ ] Hero spotlight scoped to hero — not full viewport
[ ] Section alternation OR intentional single surface — documented in DESIGN.md
[ ] Mock JS fails gracefully when toggles off
[ ] push + binary upload for assets
```

---

## Related references

- Platform CLI + Nunjucks: [02-sellauth-platform.md](02-sellauth-platform.md)
- Tokens + depth: [03-design-system.md](03-design-system.md)
- Section markup: [04-components.md](04-components.md)
- Shop surfaces: [07-shop-pages.md](07-shop-pages.md)
- Anti-patterns: [08-anti-patterns.md](08-anti-patterns.md)
- Style kits: [10-style-recipes.md](10-style-recipes.md)
