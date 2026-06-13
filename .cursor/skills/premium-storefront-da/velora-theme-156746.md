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
| `themes/156746/assets/velora.css` | **All `--vl-*` tokens + landing + shared inner utilities** |
| `themes/156746/assets/shop-pdp.css` | **PDP only** — layout, glass cards, price/stock/volume UI |
| `themes/156746/assets/shop-pages.css` | **Cart + shared inner-page bg** — no PDP rules |
| `.cursor/rules/sellauth-visual-editor.mdc` | Builder-resale rule (always on) |

**CSS load order in `master.njk`:** pro → custom → velora → shop-pages → shop-pdp

---

## CSS file ownership

| File | Owns | Never put here |
|------|------|----------------|
| `velora.css` | `:root` `--vl-*` tokens, landing (`.velora-home`), product grid, navbar, footer, customer account, modals, shared `.vl-page-*` utilities | PDP layout, cart layout |
| `shop-pages.css` | `.vl-cart-page` glass DA, cart items/summary/qty, mobile pay bar, inner-page ambient (`.velora-inner-page`) | Any `.vl-pdp-*` rule |
| `shop-pdp.css` | `.product-wrapper.vl-pdp` grid, glass cards, stock meter, volume promo BAMP, buy form overrides | Cart rules |

**Rule:** one surface → one file. Duplicating PDP into `shop-pages.css` or `velora.css` is an anti-pattern.

---

## File map for agents

```
themes/156746/
├── settings.json          # components_order + seeded properties
├── schema.json            # builder fields (resale)
├── layouts/master.njk     # font vars, CSS stack, Lenis scope
├── assets/
│   ├── velora.css         # tokens + landing + shared inner
│   ├── shop-pages.css     # cart + inner ambient
│   ├── shop-pdp.css       # PDP v2 only
│   ├── velora-motion.js   # hero cursor glow, FAQ polish
│   ├── velora-flow-mock.js / velora-steps-mock.js
│   └── pro.css, custom.css
├── components/
│   ├── product-page.njk   # PDP shell (rail + accordions)
│   ├── cart-page.njk      # glass cart + Alpine cart logic
│   ├── hero.njk, products.njk, …  # landing sections
│   └── *-page.njk         # legal, feedback, status
├── snippets/
│   ├── product-form.njk   # Alpine productForm + volume promo
│   ├── product-card.njk   # catalog + upsells grid
│   └── vl-page-head.njk, customer-sidebar.njk, …
└── templates/             # route → component wiring
```

**Key pairs:** `product-page.njk` + `product-form.njk` + `shop-pdp.css` · `cart-page.njk` + `shop-pages.css`

---

## Registers

| Surface | Register | Background | Light |
|---------|----------|------------|-------|
| Landing (`shop`) | `brand` | `#030303`, hero glow | Top ambient on hero zone only |
| PDP, cart, legal, account | `product` | `#030303` flat | Subtle top ambient only (lighter than hero) |

---

## Typography

Set in `master.njk` and `velora.css`:

| Role | Token / var | Face | Used on |
|------|-------------|------|---------|
| UI / body | `--font-body` | **Arial** | Labels, accordions, qty controls, cart copy, legal prose |
| Product display | `--vl-font-product` | **Inter** | PDP title, price, strikethrough, upsells; catalog card name/price; cart line prices; **Add to cart / Buy now buttons** |

Landing headlines: Arial sans + Playfair Display italic (hero line 2 only) — see [DESIGN.md](../../../DESIGN.md).

PDP aliases in `shop-pdp.css`: `--vl-pdp-font` → `--font-body`; `--vl-pdp-font-product` → `--vl-font-product`.

---

## Colors (implemented)

| Token | Value | Use |
|-------|-------|-----|
| `--vl-bg` | `#030303` | Page void (landing + inner) |
| `--vl-accent` | `#F99926` | Prices, CTAs, hairlines |
| `--vl-stock-green` | `#4ade80` | PDP save line, stock count, stock bar fill |
| `--vl-border` | `rgba(255,255,255,0.1)` | Glass card borders |

Orange gradient CTAs: `#ffb038` → `#ff8012` → `#e87200` (PDP primary, hero primary).

---

## PDP v2 (Nebula layout + Velora DA)

**Wrapper:** `.product-wrapper.vl-pdp.component`

**Layout (desktop, max 1200px):**

```
Left (vl-pdp-main)          Right (vl-pdp-rail, sticky)
├── Media 16:9 OR           ├── vl-pdp-card--info (title, price, stock, trust)
│   vl-pdp-banner (auto)    └── vl-pdp-card--buy (vl-pdp-form)
└── vl-pdp-accordions
```

**Media fallback:** products without `image_url` / `image_urls` get `.vl-pdp-banner` (CSS mesh + product name). Never use placeholder icons.

**Surfaces:** glass DA — `backdrop-filter`, `rgba(255,255,255,0.035)` fill, `--vl-border`, inset top light + orange hairline on cards (`.vl-pdp-card`).

**Stock status bar:** `.vl-pdp-stock-wrap` — label + pulsing green dot on count; `.vl-pdp-stock-meter` track with `.vl-pdp-stock-bar-fill` width from `stockBarPercent` (100% when unlimited stock `-1`, else `min(100, stock)`). States: `is-out`, `is-hold`.

**Volume BAMP promo:** `.vl-pdp-volume-promo` in `product-form.njk` — icon + “Add N more…” copy + `.vl-pdp-volume-promo-meter` progress bar (`volumeDiscountProgress`). Shown when `availableVolumeDiscount` exists (next tier not yet reached).

**Accordions:** closed by default when product has media; description open when no media.

**Form:** `product-form.njk` wrapped in `.vl-pdp-form` — Add to cart primary, Buy now ghost. Buttons use Inter via `--vl-pdp-font-product`.

---

## PDP price logic (`productForm` in `product-form.njk`)

Alpine component on rail + form. Rail displays computed getters from same `productForm` instance.

| Getter | Behavior |
|--------|----------|
| `totalPrice` | `variant.price × quantity`, then highest applicable **volume discount** tier subtracted. Syncs displayed main price. |
| `subtotalPrice` | Pre-volume-discount line total (`price × qty`). |
| `strikethroughPrice` | If volume discount **applied**: `subtotalPrice` when `subtotal > total`. Else if `variant.price_slash`: `price_slash × qty` when slash total > total. |
| `showStrikethroughPrice` | Strikethrough `<s>` when `strikethroughPrice > 0`. |
| `volumeSaveAmount` | `subtotalPrice - totalPrice` — **only when volume discount applied**. |
| `showVolumeSave` | “You save …” line — **only** when `appliedVolumeDiscount && volumeSaveAmount > 0`. Never for `price_slash` alone. |
| `unitSaveAmount` | Per-unit slash savings (internal; not shown as “You save”). |

**Rule:** “You save” is volume-discount-only. Compare-at strikethrough handles `price_slash` / volume subtotal separately.

---

## Cart page (glass DA)

**Wrapper:** `.vl-cart-page` on `cart-page.njk` component root.

- Glass cards: same pattern as PDP — blur, `rgba(255,255,255,0.035)`, border, orange top hairline on items + summary
- Typography: Arial UI (`--vl-cart-font`), Inter for product names/prices (`--vl-cart-font-product`)
- Subtle top ambient via `.vl-cart-section::before` (not hero spotlight)
- Mobile sticky pay bar at bottom of checkout column
- Volume discount logic mirrors PDP in cart Alpine helpers

Styles: **`shop-pages.css` only**.

---

## Inner pages — shared pattern

**Shell class:** `vl-page-section` on component root + `data-component-id`.

**Prose blocks:** `.editor` inside `.vl-page-prose` (legal, terms — not PDP accordions).

---

## Page inventory

| Template | Component | CSS | Status |
|----------|-----------|-----|--------|
| product | `product-page.njk` | `shop-pdp.css` | ✅ PDP v2 |
| cart | `cart-page.njk` | `shop-pages.css` | ✅ glass DA + mobile pay bar |
| terms / privacy / refund | `*-page.njk` | `velora.css` | ✅ `vl-page-section` |
| customer-* | templates + sidebar | `velora.css` | ✅ dark DA |

---

## PDP checklist

- [ ] Wrapper `.product-wrapper.vl-pdp` (not `vl-pdp-nebula`)
- [ ] No huge empty gap before footer
- [ ] Auto banner on products without image
- [ ] Glass cards: blur, border `--vl-border`, top orange hairline
- [ ] Stock bar + green count pulse
- [ ] Volume promo meter when tiers exist
- [ ] `totalPrice` updates with qty; “You save” only on volume tier hit
- [ ] Strikethrough for `price_slash` or volume subtotal — not conflated with save line
- [ ] Subtle top ambient light (not full hero spotlight)
- [ ] Accordions: no orange double-border on `.editor` content
- [ ] Mobile: rail (buy) appears first
- [ ] Upsells use `.vl-pdp-upsells-grid`
- [ ] CTA buttons: Inter, orange gradient primary

---

## Anti-patterns

- Duplicating PDP CSS in `shop-pages.css` or `velora.css`
- `vl-pdp-nebula` or other parallel class namespaces
- Landing spotlight / grid on PDP
- Placeholder icon for missing product images
- Hardcoded copy on builder-resale components
- “You save” tied to `price_slash` without volume discount
- Pill CTAs on shop pages (use `--vl-btn-radius` 10px)
