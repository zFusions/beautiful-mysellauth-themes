---
name: premium-storefront-da
description: >-
  Velora Market theme 156746 — complete dark storefront DA, all pages (landing,
  PDP, cart, legal, feedback, status, customer account), builder-resale rules,
  tokens, and inner-page patterns. Use for ANY work on themes/156746, Velora CSS,
  shop-pages, or SellAuth inner templates. Generic SellAuth CLI/Nunjucks →
  beautiful-mysellauth-themes instead.
---

# Premium Storefront DA — Velora Theme 156746

**This skill is the single source for Velora theme work.**  
**DA complète A→Z (pixel perfect, sans code) :** [VELORA-DA.md](VELORA-DA.md) — **lire en premier pour tout nouveau produit Velora.**  
Generic reusable DA primitives: [forms-and-shapes.md](forms-and-shapes.md), [motion-language.md](motion-language.md), [tokens.json](tokens.json).  
**Full theme playbook:** [velora-theme-156746.md](velora-theme-156746.md) — read before every theme session.

---

## Quick start

```bash
cd "D:/8- Projet/2- Velora Market/settings"
sellauth-theme watch --theme 156746
```

| Need | Read |
|------|------|
| **DA complète A→Z (tous produits Velora)** | [VELORA-DA.md](VELORA-DA.md) |
| Tokens, colors, typography | [DESIGN.md](../../../DESIGN.md) + `velora.css` `:root` |
| All pages, registers, file map, price logic | [velora-theme-156746.md](velora-theme-156746.md) |
| Builder / schema / resale | `.cursor/rules/sellauth-visual-editor.mdc` |
| SellAuth CLI, forbidden Nunjucks | `beautiful-mysellauth-themes` |

---

## Velora tokens (accent orange)

| Token | Value |
|-------|-------|
| `--vl-bg` | `#030303` |
| `--vl-surface` | `#070707` |
| `--vl-card` | `#0c0c0c` |
| `--vl-accent` | `#F99926` |
| `--vl-stock-green` | `#4ade80` |
| `--vl-text` | `#fafafa` |
| `--vl-muted` | `rgba(255,255,255,0.68)` |
| `--vl-btn-radius` | `10px` |
| `--vl-radius` | `12px` |

---

## Typography

| Role | Font | Scope |
|------|------|-------|
| UI / body | **Arial** (`--font-body`) | Nav, labels, cart copy, PDP accordions, qty UI |
| Product display | **Inter** (`--vl-font-product`) | Catalog name/price, PDP title/price/CTAs, cart line prices |
| Hero accent | **Playfair Display** italic | Hero line 2 only — not shop pages |

---

## Two surfaces

### 1. Landing (`shop` template)

- Wrapper: `.velora-home.velora-landing-page`
- Register: **brand** — serif accent lines, hero peek mock, section mocks
- Top light: `.velora-home::before` — **absolute**, hero height only, scrolls away
- Every component: `schema.json` + `properties` + `data-component-id`
- Mock toggles: `show_mock_ui`, `show_hero_mock`

### 2. Inner pages (product, cart, terms, account, …)

- Register: **product** — flat `#030303`, no landing glow
- Shell: `.vl-page-section` + `.vl-page-head` + `.vl-page-prose .editor`
- Customer: `.velora-customer` — dark cards, orange active nav
- **Never** inline `#ffffff` / blue `#1B44FE` styles in templates

---

## CSS discipline

**Load order:** pro → custom → velora → shop-pages → shop-pdp

| File | Scope |
|------|-------|
| `velora.css` | Tokens, landing, product grid, customer, modals, shared utilities |
| `shop-pages.css` | Cart glass DA, inner ambient — **no PDP** |
| `shop-pdp.css` | PDP v2 only — **single source of truth** |

1. **One token file:** `velora.css` for `--vl-*` + landing
2. **No sprawl** — no per-template `<style>` blocks with light theme leftovers
3. Override Bootstrap in page context: `.vl-page-section .btn-primary`, `.velora-customer .table`

---

## Shop highlights (see velora-theme-156746.md for detail)

- **PDP v2:** `.vl-pdp` grid, glass cards, stock status bar, volume BAMP promo
- **Price logic:** `totalPrice` syncs qty; “You save” **only** on volume discount applied; strikethrough for `price_slash` / volume subtotal
- **Cart:** glass DA in `shop-pages.css`, mobile pay bar

---

## Page work checklist

```
[ ] Component has data-component-id + class="component"
[ ] Copy from properties | renderString (pages with schema)
[ ] Uses --vl-* tokens only
[ ] No landing light on inner page
[ ] PDP edits → shop-pdp.css only
[ ] Cart edits → shop-pages.css only
[ ] Ctrl+F5 builder preview
[ ] Update velora-theme-156746.md if new pattern
```

---

## Components by area

**Landing:** hero, features, how-it-works, products, feedbacks, faq, final-cta, navbar, footer

**Shop:** product-page, cart-page (+ `product-form.njk` snippet)

**Legal / info:** terms-page, privacy-policy-page, refund-policy-page, feedback-page, status-page

**Account:** customer-dashboard, customer-invoices, customer-balance, customer-tickets (+ templates)

**Blog:** blog-posts, blog-post-page

**Modals (dark in velora.css):** customer-login-modal, ticket-create-modal, maintenance-login-modal

---

## Motion

| Asset | Scope |
|-------|-------|
| `velora-motion.js` | Hero cursor glow, FAQ accordion polish |
| `velora-flow-mock.js` | Features section mocks |
| `velora-steps-mock.js` | How-it-works mocks |
| Lenis | `.velora-home` only (master.njk) |

Inner pages: minimal motion — hover states only.

---

## Skill maintenance

After major UI/UX on theme 156746:

1. Update [velora-theme-156746.md](velora-theme-156746.md) with new patterns
2. Bump [tokens.json](tokens.json) if tokens change
3. Sync [DESIGN.md](../../../DESIGN.md) YAML if brand tokens change

Do **not** duplicate SellAuth platform docs here — link to `beautiful-mysellauth-themes`.

---

## Anti-patterns ❌

| Avoid | Use instead |
|-------|-------------|
| Pill CTAs | 10px radius |
| Second accent | Orange only |
| Fixed landing light | Absolute on `.velora-home` |
| Hardcoded page titles | schema `title` property |
| White customer cards | `.velora-customer` dark |
| Light pagination | `.vl-pagination` in velora.css |
| PDP rules in shop-pages.css | shop-pdp.css |
| “You save” for price_slash only | Strikethrough + volume-only save line |

---

## Agent constraints

1. Read `velora-theme-156746.md` first on any 156746 task
2. Landing edits → schema + settings together
3. Inner pages → product register, no hero light
4. Remove legacy inline styles when touching a file
5. `beautiful-mysellauth-themes` only for new themes from scratch or full rebuilds
