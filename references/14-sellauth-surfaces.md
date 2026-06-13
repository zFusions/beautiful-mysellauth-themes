# SellAuth surfaces — complete page & component catalog

Universal checklist for **any** SellAuth theme. No client brands — use `{PREFIX}`, `{CSS_FILE}`, `{THEME_ID}` from the project KB.

**Related:** [13-theme-architecture.md](13-theme-architecture.md) (file layout) · [07-shop-pages.md](07-shop-pages.md) (PDP/cart) · [04-components.md](04-components.md) (markup patterns)

---

## Priority tiers

| Tier | Meaning | Ship gate |
|------|---------|-----------|
| **P0** | Revenue path — must be styled before launch | Block launch if missing/broken |
| **P1** | Trust & account — expected on premium shops | Ship within same theme pass |
| **P2** | Optional — enable if client needs | Style when enabled in builder |

---

## P0 — Must ship (revenue path)

| Template key | File | Component(s) | CSS scope | Techniques |
|--------------|------|--------------|-----------|------------|
| `shop` | `templates/shop.njk` | Homepage sections via `components_order` | `{CSS_FILE}` landing | Hero peek, mocks, motion, section alternation |
| `product` | `templates/product.njk` | `product-page` | `shop-pdp.css` + tokens | Two-column PDP, Alpine form, volume tiers |
| `cart` | `templates/cart.njk` | `cart-page` | `shop-pages.css` | Cart totals, trust micro-copy, token parity |
| `maintenance` | `templates/maintenance.njk` | maintenance layout | `{CSS_FILE}` or minimal | Branded lock screen when shop offline |

### Global (every page — P0)

| Global component | File | Notes |
|------------------|------|-------|
| `navbar` | `components/navbar.njk` | Sticky, optical center grid, CTA → `#products` |
| `footer` | `components/footer.njk` | Links, legal, social, support |
| `announcement` | `components/announcement.njk` | Optional bar — style if enabled |

**Layout:** `layouts/master.njk` — CSS order, fonts, loader, `theme:motion-start`, body classes.

---

## P1 — Trust, legal, account (premium complete)

| Template key | File | Component | Notes |
|--------------|------|-----------|-------|
| `terms` | `templates/terms.njk` | `terms-page` | Prose layout, readable width |
| `privacy-policy` | `templates/privacy-policy.njk` | `privacy-policy-page` | Same prose shell |
| `refund-policy` | `templates/refund-policy.njk` | `refund-policy-page` | Link from FAQ |
| `faq` | `templates/faq.njk` | FAQ component or dedicated page | Accordion tokens |
| `status` | `templates/status.njk` | `status-page` | Service status cards |
| `feedback` | `templates/feedback.njk` | `feedback-page` | Review list / form shell |
| `customer-dashboard` | `templates/customer-dashboard.njk` | customer shell | Sidebar + dashboard |
| `customer-invoices` | `templates/customer-invoices.njk` | invoices | Match account shell |
| `customer-balance` | `templates/customer-balance.njk` | balance | Match account shell |
| `customer-tickets` | `templates/customer-tickets.njk` | tickets list | Support tickets |
| `customer-ticket` | `templates/customer-ticket.njk` | single ticket | Thread view |
| `customer-affiliate` | `templates/customer-affiliate.njk` | affiliate | If program enabled |

**Customer area pattern:** shared shell snippets (`customer-sidebar`, login modal) + `shop-pages.css` inner tokens.

---

## P2 — Optional surfaces

| Template key | When to style |
|--------------|---------------|
| `blog` / `blog-post` | Client runs content marketing |
| `custom-page` | Builder custom pages |
| Checkout (hosted) | Platform checkout iframe/card — minimal overrides in `shop-pages.css` |

---

## Homepage sections catalog (shop template)

Register each in `settings.json` → `components` + optional `components_order`.

| Section type | Component file | Purpose | Premium techniques |
|--------------|----------------|---------|-------------------|
| `hero` | `components/hero.njk` | Value prop + CTAs | Spotlight, peek mock, `show_hero_mock` toggle |
| `products` | `components/products.njk` | Catalog grid `#products` | Product cards, stock badges, placeholders |
| `how-it-works` | `components/how-it-works.njk` | 3-step funnel | Scroll-gated step mocks (`show_mock_ui`) |
| `features` | `components/features.njk` | 3 benefit cards | feed / list / meters mocks |
| `feedbacks` | `components/feedbacks.njk` | Social proof | Marquee or grid — `data-reveal` |
| `faq` | `components/faq.njk` | Objections | Accordion, support CTA |
| `final-cta` | `components/final-cta.njk` | Bottom conversion | Repeat primary CTA |
| `trust-bar` | `components/trust-bar.njk` | Payment/trust icons | Optional — avoid clutter |
| `reviews` / `feedbacks` | variants | Reviews | Pick one pattern |
| `text-block`, `text-image-block` | builder blocks | Content | Token typography only |
| `before-after`, `image-gallery` | marketing | Visual proof | Lazy-load images |
| `socials`, `join`, `payment-method` | integrations | Links / Discord | Match footer tokens |

**Recommended default order (digital goods):**

```
hero → how-it-works → products → features → feedbacks → faq → final-cta
```

Adapt in PRODUCT.md — document final order in AGENTS.md.

---

## Techniques index (where to learn each)

| Technique | Reference | Apply on |
|-----------|-----------|----------|
| KB brief + DESIGN tokens | [11-client-brief-kb.md](11-client-brief-kb.md) | Before any code |
| Folder / CSS split | [13-theme-architecture.md](13-theme-architecture.md) | Scaffold |
| Design tokens, spotlight, depth | [03-design-system.md](03-design-system.md) | Landing |
| Navbar, hero, sections markup | [04-components.md](04-components.md) | Landing |
| Feature + step mocks | [05-mock-ui-mastery.md](05-mock-ui-mastery.md) | Features, how-it-works |
| Reveal, Lenis, hero entrance | [06-motion-mastery.md](06-motion-mastery.md) | Landing |
| PDP, cart, volume discount | [07-shop-pages.md](07-shop-pages.md) | Shop funnel |
| Google Fonts pairings | [09-typography-fonts.md](09-typography-fonts.md) | master.njk |
| Style recipe kits R1–R7 | [10-style-recipes.md](10-style-recipes.md) | Token bootstrap |
| CLI, Nunjucks, builder | [02-sellauth-platform.md](02-sellauth-platform.md) | Platform |
| Never-ship list | [08-anti-patterns.md](08-anti-patterns.md) | QA |
| Quality pillars | [00-quality-bar.md](00-quality-bar.md) | Pre-push |

---

## settings.json structure (every template)

```json
{
  "templates": {
    "shop": {
      "layout": "master",
      "components": { },
      "components_order": []
    },
    "product": {
      "layout": "master",
      "components": {
        "product-page": { "type": "product-page", "properties": {} }
      },
      "components_order": ["product-page"]
    },
    "cart": {
      "layout": "master",
      "components": {
        "cart-page": { "type": "cart-page", "properties": {} }
      },
      "components_order": ["cart-page"]
    }
  },
  "global": {
    "properties": {},
    "components": {
      "navbar": { "type": "navbar", "properties": {} },
      "footer": { "type": "footer", "properties": {} }
    }
  }
}
```

Every `type` must match `components/{type}.njk`.

---

## Full-ship checklist (copy & track)

```
═══ P0 ═══
[ ] master.njk — CSS order, fonts, loader, motion bus
[ ] navbar + footer — global, all pages
[ ] shop — homepage sections + components_order
[ ] product-page — shop-pdp.css, product-form Alpine
[ ] cart-page — shop-pages.css, totals / volume parity
[ ] maintenance — branded fallback

═══ P1 ═══
[ ] terms + privacy + refund — prose layout
[ ] faq page (if separate template)
[ ] status + feedback pages
[ ] customer-dashboard + invoices + balance + tickets
[ ] customer-login-modal + sidebar shell

═══ P2 (if enabled) ═══
[ ] blog + blog-post
[ ] custom-page
[ ] affiliate

═══ QA ═══
[ ] schema.json ↔ every properties.* field
[ ] Builder preview per section
[ ] Mobile 375px mental pass
[ ] push + binary upload
[ ] 00-quality-bar self-review
```

---

## CSS register map

| Register | Surfaces | Font rule |
|----------|----------|-----------|
| **brand** | Homepage, hero, features, FAQ, footer, legal prose | Display + UI sans from recipe |
| **product** | Product grid cards, PDP, cart, checkout, account | Often Inter or UI sans for prices/CTAs — see [09-typography-fonts.md](09-typography-fonts.md) |

Document both registers in DESIGN.md and PRODUCT.md surfaces table.

---

## Anti-patterns (surfaces)

| ❌ | ✅ |
|----|-----|
| Style only homepage, ship default PDP | P0 trio: shop + product + cart together |
| Skip legal pages on digital goods shop | P1 terms + privacy + refund |
| Hardcode copy in `.njk` | schema + properties + renderString |
| Enable 20 homepage sections day 1 | Start P0 order, add one section at a time |
| Customer pages unstyled white Bootstrap | Extend `shop-pages.css` shell |

See full list: [08-anti-patterns.md](08-anti-patterns.md).
