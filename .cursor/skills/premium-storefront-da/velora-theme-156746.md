# Velora Market — Theme 156746 (canonical reference)

**Theme ID:** `156746`  
**Watch:** `sellauth-theme watch --theme 156746` from project `settings/`  
**Builder:** https://dash.sellauth.com/builder/visual/156746  
**Preview refresh:** Ctrl+F5 after every push

---

## Source of truth (read before UI work)

| File | Role |
|------|------|
| [DESIGN.md](../../../DESIGN.md) | Tokens, typography, surfaces, do/don't |
| [PRODUCT.md](../../../PRODUCT.md) | Voice, register, anti-references |
| [AGENTS.md](../../../AGENTS.md) | Project context, skills map |
| `themes/156746/assets/velora.css` | **All `--vl-*` tokens + landing + shared utilities |
| `themes/156746/assets/shop-pages.css` | PDP + cart only |
| `.cursor/rules/sellauth-visual-editor.mdc` | Builder-resale rule (always on) |

**SellAuth plumbing (CLI, forbidden Nunjucks):** `beautiful-mysellauth-themes` — not duplicated here.

---

## Registers

| Surface | Register | Background | Light |
|---------|----------|------------|-------|
| Landing (`shop`) | `brand` | `#000`, hero glow | Top ambient on hero zone only (`position: absolute`, scrolls away) |
| PDP, cart, legal, account | `product` | `#000` flat | **No** landing light — no `velora-landing-page` glow |

Body classes: `velora-home-page` (nav/footer chrome all pages), `velora-landing-page` (shop template only — legacy marker).

Landing wrapper: `templates/shop.njk` → `<div class="components velora-home velora-landing-page">`.

---

## File map

```
themes/156746/
├── settings.json / schema.json
├── layouts/master.njk
├── templates/          # shop, product, cart, terms, feedback, status, customer-*, …
├── components/         # hero, products, product-page, cart-page, terms-page, …
├── snippets/
└── assets/
    ├── velora.css           # tokens, landing, vl-page-section, velora-customer
    ├── shop-pages.css       # .vl-pdp, .vl-cart-page
    ├── velora-motion.js     # cursor light (hero only), FAQ motion
    ├── velora-flow-mock.js  # feature section mocks
    └── velora-steps-mock.js # how-it-works mocks
```

CSS load order in `master.njk`: pro → custom → velora → shop-pages.

---

## Landing (shop) — builder-editable

Every marketing string → `schema.json` + `properties` + `| renderString`.

| Component | Key properties |
|-----------|----------------|
| hero | title, subtitle, cta, cta_text, show_hero_mock |
| features | title, subtitle, features[], show_mock_ui, mock_type per item |
| how-it-works | title_sans, title_serif, subtitle, steps[], show_mock_ui |
| products | title, subtitle, ids |
| feedbacks | lead, title, subtitle, amount |
| faq | aside_*, help_*, items[] |
| final-cta | title, subtitle, cta_text, cta, secondary_* |
| trust-bar | items[] (optional — add to components_order) |

Mock UI toggles: buyer can disable demos without code.

---

## Inner pages — shared pattern

**Shell class:** `vl-page-section` on component root + `data-component-id`.

**Structure:**

```nunjucks
<div class="container component vl-page-section" data-component-id="{{ componentId }}">
  <section class="py-5-nav">
    <header class="vl-page-head">
      <a href="{{ '/' | shopUrl }}" class="vl-page-back">← Back to store</a>
      <h1>{{ properties.title | default('Page title') | renderString }}</h1>
      {% if properties.subtitle %}
      <p class="vl-page-sub">{{ properties.subtitle | renderString }}</p>
      {% endif %}
    </header>
    <div class="vl-page-body">…</div>
  </section>
</div>
```

**Prose blocks:** `.editor` inside `.vl-page-prose` (max-width 720px, surface card).

**Customer area:** wrapper `velora-customer`, sidebar snippet — **no inline light-theme `<style>`**.

---

## Page inventory

| Template | Component / file | Status |
|----------|------------------|--------|
| shop | landing components | ✅ builder-ready |
| product | `product-page.njk` | ✅ PDP dark — builder props (back link, delivery, upsells) + `shop-pages.css` |
| cart | `cart-page.njk` | ✅ Velora cart + builder props |
| terms | `terms-page.njk` | ✅ prose + `vl-page-head` |
| privacy-policy | `privacy-policy-page.njk` | ✅ prose + settings entry |
| refund-policy | `refund-policy-page.njk` | ✅ prose + settings entry |
| feedback | `feedback-page.njk` | ✅ grid + builder props |
| status | `status-page.njk` | ✅ status cards |
| blog | `blog-posts.njk` | ✅ listing (if enabled in shop) |
| blog-post | `blog-post-page.njk` | ✅ article prose |
| customer-dashboard | `customer-dashboard.njk` | ✅ dark cards |
| customer-invoices | `customer-invoices.njk` | ✅ orders table |
| customer-balance | `customer-balance.njk` | ✅ top-up |
| customer-tickets | `customer-tickets.njk` | ✅ support list |
| customer-ticket | `customer-ticket.njk` | ✅ thread (no inline light CSS) |
| customer-affiliate | `customer-affiliate.njk` | ✅ affiliate |
| custom-page | `custom-page.njk` | ✅ CMS page shell |
| maintenance | `maintenance.njk` | ⚠️ light fallback (rare page) |

**Modals** (dark via `velora.css`): `#customer-login-modal`, `#ticket-create-modal`, `#admin-login-modal`.

---

## PDP checklist

- Wrapper: `.product-wrapper.vl-pdp.component`
- Buy column: `.vl-pdp-buy` surface card
- Trust: `vl-trust-micro.njk`
- Delivery badge + FAQ link
- Upsells: `.vl-pdp-upsells-grid` with homepage product cards
- Buttons: orange gradient primary (match hero), ghost secondary
- **No** landing top light

---

## Customer area checklist

- Remove duplicate `<div class="components">` loops at bottom of templates
- Remove inline `#ffffff` card styles — use `.velora-customer` in velora.css
- Sidebar: `.nexus-customer-sidebar` styled via `.velora-customer`
- Tables, pagination: dark `--vl-*` tokens
- Links: `var(--vl-accent)` not blue `#1B44FE`

---

## Light rules (landing)

```css
.velora-home::before {
  position: absolute;  /* NOT fixed — does not follow scroll */
  top: 0;
  height: min(100vh, 820px);
}
.velora-home > .component { background: #000 !important; }
.velora-home .vl-hero { background: transparent !important; }
```

Hero spotlight: `.vl-hero-light` inside hero — no scroll parallax on light stack.

---

## Agent workflow

1. Read DESIGN.md + this file
2. Landing change → schema + settings + template + builder validate
3. Inner page → `vl-page-section` pattern, `shop-pages.css` or `velora.css` only
4. Never add inline light-theme styles (`#ffffff`, `#1B44FE`)
5. Major UI pass → update this file + SKILL.md

---

## Anti-patterns ❌

- Hardcoded copy on resale components
- `position: fixed` for landing ambient light (follows viewport / breaks on Lenis)
- Light cards on customer/dashboard pages
- Duplicate `components_order` loops in customer templates
- Bootstrap default blue on inner pages
