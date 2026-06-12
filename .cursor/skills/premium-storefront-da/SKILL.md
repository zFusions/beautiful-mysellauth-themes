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
Generic reusable DA primitives: [forms-and-shapes.md](forms-and-shapes.md), [motion-language.md](motion-language.md), [tokens.json](tokens.json).  
**Full theme playbook:** [velora-theme-156746.md](velora-theme-156746.md) — read before every session.

---

## Quick start

```bash
cd "D:/8- Projet/2- Velora Market/settings"
sellauth-theme watch --theme 156746
```

| Need | Read |
|------|------|
| Tokens, colors, typography | [DESIGN.md](../../../DESIGN.md) + `velora.css` `:root` |
| All pages, registers, file map | [velora-theme-156746.md](velora-theme-156746.md) |
| Builder / schema / resale | `.cursor/rules/sellauth-visual-editor.mdc` |
| SellAuth CLI, forbidden Nunjucks | `beautiful-mysellauth-themes` |

---

## Velora tokens (accent orange)

| Token | Value |
|-------|-------|
| `--vl-bg` | `#000000` |
| `--vl-surface` | `#0a0a0a` |
| `--vl-card` | `#111111` |
| `--vl-accent` | `#F99926` |
| `--vl-text` | `#fafafa` |
| `--vl-muted` | `rgba(255,255,255,0.68)` |
| `--vl-btn-radius` | `10px` |
| `--vl-radius` | `12px` |

Typography: Arial UI + Playfair Display serif accents on landing headlines.

---

## Two surfaces

### 1. Landing (`shop` template)

- Wrapper: `.velora-home.velora-landing-page`
- Register: **brand** — serif accent lines, hero peek mock, section mocks
- Top light: `.velora-home::before` — **absolute**, hero height only, scrolls away
- Every component: `schema.json` + `properties` + `data-component-id`
- Mock toggles: `show_mock_ui`, `show_hero_mock`

### 2. Inner pages (product, cart, terms, account, …)

- Register: **product** — flat black, no landing glow
- Shell: `.vl-page-section` + `.vl-page-head` + `.vl-page-prose .editor`
- Customer: `.velora-customer` — dark cards, orange active nav
- Styles: `shop-pages.css` (PDP/cart) + `velora.css` (shared inner utilities)
- **Never** inline `#ffffff` / blue `#1B44FE` styles in templates

---

## Page work checklist

```
[ ] Component has data-component-id + class="component"
[ ] Copy from properties | renderString (pages with schema)
[ ] Uses --vl-* tokens only
[ ] No landing light on inner page
[ ] Ctrl+F5 builder preview
[ ] Update velora-theme-156746.md if new pattern
```

---

## Components by area

**Landing:** hero, features, how-it-works, products, feedbacks, faq, final-cta, navbar, footer

**Shop:** product-page, cart-page

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

## CSS discipline

1. **One token file:** `velora.css` for shared + landing
2. **Shop pages:** `shop-pages.css` for `.vl-pdp` and `.vl-cart-*` only
3. **No sprawl** — no per-template `<style>` blocks with light theme leftovers
4. Override Bootstrap in page context: `.vl-page-section .btn-primary`, `.velora-customer .table`

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

---

## Agent constraints

1. Read `velora-theme-156746.md` first on any 156746 task
2. Landing edits → schema + settings together
3. Inner pages → product register, no hero light
4. Remove legacy inline styles when touching a file
5. `beautiful-mysellauth-themes` only for new themes from scratch or full rebuilds
