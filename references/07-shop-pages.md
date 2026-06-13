# Shop pages — PDP, cart, checkout

Landing beauty means nothing if product pages look like default Bootstrap.

Applies to **any** premium theme — use `{prefix}` from DESIGN.md (e.g. `t-`, `shop-`).

---

## CSS architecture (single source of truth)

Split shop CSS by surface. **Never duplicate PDP rules in cart CSS or vice versa.**

| File | Scope | Rule |
|------|-------|------|
| `theme.css` | Landing tokens (`--t-*` or `--{prefix}-*`) | Source of accent, bg, borders |
| `shop-pdp.css` | **PDP only** — `.product-wrapper.{prefix}-pdp` | All layout, glass, rail, volume promo |
| `shop-pages.css` | Cart, checkout, shared inner shell | Comment at top: `PDP layout/styles: shop-pdp.css` |

**Load order in master.njk:**

```
pro.css → custom.css → theme.css → shop-pdp.css → shop-pages.css
```

**Anti-pattern:** Copying `{prefix}-pdp-card` glass rules into `shop-pages.css` or landing CSS. Cart reuses the *pattern*, not duplicated selectors — mirror tokens on `{prefix}-cart-page`.

---

## Register override — typography split

Landing (`brand` register) uses Google Fonts from DESIGN.md. Shop pages (`product` register) may use a **dual-font stack**:

| Role | Font | Scope |
|------|------|-------|
| Body / labels / accordions | System sans or Arial (`--font-body`, `--{prefix}-font-header-sans`) | Descriptions, stock labels, trust chips |
| Commerce emphasis | **Inter** or chosen UI sans (`--{prefix}-font-product`) | Product title, price, qty controls, CTAs |

Document both in DESIGN.md YAML:

```yaml
typography:
  font-ui:
    family: "DM Sans"          # landing body
  font-product:
    family: "Inter"            # PDP title, price, buttons
    scope: product-register-only
```

Load Inter (or product font) in master.njk even if landing uses a different UI font.

---

## Premium two-column PDP layout

Two-column grid with sticky buy rail. Mobile stacks: media → rail → accordions.

```
┌─────────────────────────────────────────────┐
│  [ ambient radial wash behind nav ]         │
├──────────────────────┬──────────────────────┤
│  Media / auto banner │  Info card (sticky)    │
│  Thumbnails          │  - title, price, stock │
│  Accordions          │  Buy card              │
│  (description, tabs) │  - variants, qty, CTAs │
│                      │  - volume promo meter  │
└──────────────────────┴──────────────────────┘
│  Upsells grid (optional)                    │
└─────────────────────────────────────────────┘
```

### Markup skeleton

```nunjucks
<div class="product-wrapper {{prefix}}-pdp component" data-component-id="{{ componentId }}">
  <section class="{{prefix}}-pdp-section">
    <div class="{{prefix}}-pdp-shell">
      <div class="{{prefix}}-pdp-grid">
        <div class="{{prefix}}-pdp-main" x-data="{ accOpen: 'description' }">
          {# media | auto-banner when no image #}
          {# accordions for description + product_tabs #}
        </div>
        <aside class="{{prefix}}-pdp-rail" x-data="productForm">
          <div class="{{prefix}}-pdp-card {{prefix}}-pdp-card--info">
            {# title, price (x-text totalPrice), stock meter, trust row #}
          </div>
          <div class="{{prefix}}-pdp-card {{prefix}}-pdp-card--buy">
            {% render_snippet "product-form.njk", product=product %}
          </div>
        </aside>
      </div>
    </div>
  </section>
</div>
```

### Grid CSS

```css
.{{prefix}}-pdp-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 16px;
}
@media (min-width: 992px) {
  .{{prefix}}-pdp-grid {
    grid-template-columns: minmax(0, 1fr) minmax(320px, 380px);
    gap: 24px;
  }
  .{{prefix}}-pdp-rail {
    position: sticky;
    top: calc(var(--{{prefix}}-nav-h, 56px) + 16px);
  }
}
```

### Auto banner (no product image)

When `product.image_urls` and `product.image_url` are empty, render a glass banner with editable kicker from `properties.delivery_badge` and product name — not a broken empty frame.

### Ambient wash

Section `::before` extends above sticky nav so no black strip appears under navbar:

```css
.{{prefix}}-pdp-section::before {
  top: calc(var(--{{prefix}}-nav-h, 56px) * -1);
  height: min(640px, 82vh);
  background: radial-gradient(
    ellipse 100% 58% at 50% 0%,
    rgba(var(--{{prefix}}-accent-rgb), 0.11) 0%,
    transparent 68%
  );
}
```

---

## Glassmorphism DA (product register)

Shared surface treatment for cards, media frame, variants, qty input, buy-now ghost button.

```css
:root {
  --{{prefix}}-pdp-card-bg: rgba(14, 14, 14, 0.72);
  --{{prefix}}-pdp-card-bg-glass: rgba(255, 255, 255, 0.035);
  --{{prefix}}-pdp-card-border: var(--{{prefix}}-border);
  --{{prefix}}-pdp-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.07),
    0 18px 44px rgba(0, 0, 0, 0.38);
}

@supports ((backdrop-filter: blur(12px)) or (-webkit-backdrop-filter: blur(12px))) {
  .{{prefix}}-pdp-card {
    background: var(--{{prefix}}-pdp-card-bg-glass);
    backdrop-filter: blur(22px) saturate(145%);
    box-shadow: var(--{{prefix}}-pdp-shadow);
  }
}

/* Top edge highlight — signature DA line */
.{{prefix}}-pdp-card::after {
  content: "";
  position: absolute;
  top: 0; left: 10%; right: 10%; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(var(--{{prefix}}-accent-rgb), 0.45), transparent);
}
```

**Fallback:** Solid `--{{prefix}}-pdp-card-bg` when backdrop-filter unsupported — never leave cards transparent.

Cart page mirrors the same token names (`--{{prefix}}-cart-card-bg-glass`, etc.) on `.{{prefix}}-cart-page`.

---

## Volume discount + price sync (Alpine.js)

SellAuth exposes `product.volume_discounts` as `{ quantity, percentage }[]`. Implement in `Alpine.data('productForm')` — price block and form share one component.

### Computed getters (required)

| Getter | Logic |
|--------|-------|
| `subtotalPrice` | `variant.price * quantity` |
| `totalPrice` | Subtotal minus highest matching tier discount |
| `appliedVolumeDiscount` | Sort tiers **desc** by quantity → first where `quantity >= tier.quantity` |
| `availableVolumeDiscount` | Sort tiers **asc** → first where `quantity < tier.quantity` (nudge UI) |
| `volumeDiscountRemaining` | `availableTier.quantity - quantity` |
| `volumeDiscountProgress` | `min(100, round(quantity / target * 100))` |
| `strikethroughPrice` | Subtotal (when volume applied) OR `price_slash * quantity` — whichever is higher than total |
| `volumeSaveAmount` | `subtotalPrice - totalPrice` when tier applied |
| `showVolumeSave` | `appliedVolumeDiscount && volumeSaveAmount > 0.001` |
| `stockBarPercent` | `min(100, stock)` or 100 when unlimited (`stock === -1`) |

### totalPrice discount application

```javascript
get totalPrice() {
  let price = this.variant.price * this.quantity;
  const priceBeforeDiscounts = price;
  if (this.hasVolumeDiscounts) {
    const tiers = [...this.product.volume_discounts].sort((a, b) => b.quantity - a.quantity);
    for (const tier of tiers) {
      if (this.quantity >= parseInt(tier.quantity, 10)) {
        price -= priceBeforeDiscounts * parseInt(tier.percentage, 10) / 100;
        break; // highest matching tier only
      }
    }
  }
  return Math.max(0, price).toFixed(2);
}
```

### Quantity bounds

```javascript
get minQuantity() { return this.variant.quantity_min || 1; }
get maxQuantity() {
  const max = this.variant.quantity_max || 10000;
  if (this.variant.stock === -1 || this.product.hide_stock_count) return max;
  return Math.min(max, this.variant.stock);
}
changeQuantity(q) {
  this.quantity = Math.min(Math.max(this.minQuantity, q), this.maxQuantity);
}
```

**Watchers:** On `activeVariant` change → reset quantity to min, call `changeQuantity`. On `quantity` change → reset `addedToCart`.

### Price display (template)

```nunjucks
<span class="{{prefix}}-pdp-price" x-text="appCurrency.format(parseFloat(totalPrice), '{{ product.currency }}')"></span>
<template x-if="showStrikethroughPrice">
  <s class="{{prefix}}-pdp-price-compare" x-text="appCurrency.format(strikethroughPrice, '{{ product.currency }}')"></s>
</template>
<template x-if="showVolumeSave">
  <p class="{{prefix}}-pdp-price-save">You save <span x-text="appCurrency.format(volumeSaveAmount, '{{ product.currency }}')"></span></p>
</template>
```

### Volume promo nudge (below buy buttons)

Show when `availableVolumeDiscount` exists — progress bar toward next tier:

```nunjucks
{% if product.volume_discounts and product.volume_discounts|length > 0 %}
<div class="{{prefix}}-pdp-volume-promo" x-show="availableVolumeDiscount" x-cloak>
  <p>Add <strong x-text="volumeDiscountRemaining"></strong> more to unlock
     <strong x-text="availableVolumeDiscount?.percentage"></strong>% off</p>
  <div class="{{prefix}}-pdp-volume-promo-bar" :style="`width: ${volumeDiscountProgress}%`"></div>
</div>
{% endif %}
```

### Cart page parity

Mirror the same tier logic in cart Alpine component:

- `getAppliedVolumeDiscount(index)` — desc sort
- `getAvailableVolumeDiscount(index)` — asc sort
- `getItemSinglePrice(index)` — unit price after tier
- `changeQuantity(index, q)` — clamp + `appCart.editQuantity`

**Anti-pattern:** Hardcoding discounted price in Nunjucks — always reactive via Alpine getters.

---

## Product detail checklist

- [ ] `shop-pdp.css` is sole PDP stylesheet — zero duplicate rules elsewhere
- [ ] Glass cards with `@supports` fallback
- [ ] Sticky rail on desktop; CTA visible without scroll on mobile
- [ ] `totalPrice` updates on variant + quantity change
- [ ] Volume tiers: highest match applied; nudge shows next tier
- [ ] Stock meter respects `-1` unlimited, `0` out, `hide_stock_count`
- [ ] Trust micro-row (delivery, verified, fresh)
- [ ] Auto banner when no images; editable kicker in schema
- [ ] Product font on title/price/CTAs; body font on descriptions
- [ ] No raw Bootstrap blue buttons

---

## Cart page

Reuse glass DA from PDP. Same ambient wash, shell width, top-edge highlight.

Must have:
- Line items readable with product font on names/prices
- Quantity controls with min/max clamp (same as PDP)
- Volume discount reflected in line totals
- Summary card sticky on desktop
- Trust row near checkout CTA
- Empty state styled (not broken layout)

```css
.{{prefix}}-cart-summary {
  position: sticky;
  top: calc(var(--{{prefix}}-nav-h, 56px) + 16px);
}
```

---

## Checkout

- Minimal restyle — don't break SellAuth checkout flow
- Match button radius and accent
- Ensure contrast on form inputs:

```css
.checkout-page input:focus {
  border-color: color-mix(in srgb, var(--{{prefix}}-accent) 50%, transparent);
  box-shadow: 0 0 0 3px var(--{{prefix}}-accent-soft);
}
```

**Anti-pattern:** Lenis smooth scroll on checkout — causes modal scroll bugs.

---

## Product cards (catalog snippet)

Shared between homepage grid and PDP upsells:

- Image aspect ratio consistent (16:9 or 1:1)
- Product font on price; hover border brighten + translateY(-2px)
- Out of stock: muted + badge

---

## Mobile shop pages

- PDP: rail below media; sticky bottom CTA optional
- Cart: summary below items, full width
- Touch targets 44px on quantity controls

---

## QA checklist

- [ ] PDP accent CTA visible without scroll (mobile)
- [ ] Price syncs when changing qty and variant
- [ ] Volume discount strikethrough + save line appear at tier threshold
- [ ] Cart totals match PDP logic per line item
- [ ] Forms readable on dark AND light themes
- [ ] No unscoped Bootstrap blue buttons left
- [ ] Glass fallback solid on browsers without backdrop-filter
