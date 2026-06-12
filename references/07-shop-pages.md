# Shop pages — PDP, cart, checkout

Landing beauty means nothing if product pages look like default Bootstrap.

## Scope in `shop-pages.css`

Reuse ALL `:root` tokens from `theme.css`. Scope selectors:

```css
.product-page { /* PDP */ }
.cart-page { /* cart */ }
.checkout-page { /* checkout */ }
```

Do not redefine colors — inherit `--t-*`.

---

## Product detail page (PDP)

Must have above fold:
- Product name (H1)
- Price (prominent)
- Stock badge
- Primary CTA: Add to cart / Buy now (accent button)
- Trust micro-row: instant delivery, payment icons

```css
.product-page .product-title {
  font-size: clamp(1.5rem, 2vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--t-text);
}
.product-page .product-price {
  font-size: clamp(1.25rem, 1.5vw, 1.75rem);
  font-weight: 700;
  color: var(--t-accent);
}
.product-page .btn-add-cart {
  height: 42px;
  border-radius: var(--t-radius-btn);
  background: var(--t-accent);
  color: var(--t-text-on-accent);
  font-weight: 600;
}
```

Dark theme: card `#111`, border subtle. Light: white card, shadow-sm.

---

## Cart page

- Line items readable
- Total prominent
- Sticky checkout CTA on mobile
- Trust row near summary (payment methods, instant delivery)
- Empty state styled (not broken layout)

```css
.cart-page .cart-summary {
  border-radius: var(--t-radius-card);
  border: 1px solid var(--t-border-subtle);
  background: var(--t-surface);
  padding: 20px;
  position: sticky;
  top: calc(var(--t-nav-h) + 16px);
}
```

---

## Checkout

- Minimal restyle — don't break SellAuth checkout flow
- Match button radius and accent
- Ensure contrast on form inputs:

```css
.checkout-page input,
.checkout-page select {
  border-radius: var(--t-radius-btn);
  border: 1px solid var(--t-border);
  background: var(--t-surface);
  color: var(--t-text);
}
.checkout-page input:focus {
  border-color: color-mix(in srgb, var(--t-accent) 50%, transparent);
  outline: none;
  box-shadow: 0 0 0 3px var(--t-accent-soft);
}
```

---

## Product cards (catalog snippet)

Shared between homepage grid and products section:

- Image aspect ratio consistent (16:10 or 1:1)
- Hover: border brighten + translateY(-2px)
- Out of stock: muted + badge
- Price always visible

---

## Mobile shop pages

- PDP: CTA sticky bottom optional
- Cart: summary below items, full width
- Touch targets 44px on quantity controls

---

## QA checklist

- [ ] PDP accent CTA visible without scroll (mobile)
- [ ] Cart total correct styling
- [ ] Forms readable on dark AND light themes
- [ ] No unscoped Bootstrap blue buttons left
