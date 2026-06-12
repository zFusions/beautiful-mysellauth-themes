# Velora Market

> Premium digital-products storefront (Discord tools, boosts, scripts) with a dark SaaS landing that converts browsers into buyers in under 60 seconds.

## Register

brand

## Users

### Primary

- **Who**: Discord and gaming-adjacent buyers (teens to mid-20s) purchasing digital products online.
- **Job**: Find a trusted seller, pay quickly, receive the product automatically without support friction.
- **Where**: Desktop or phone, at home or on the go; often in dim ambient light (dark UI); low patience for slow or sketchy checkout flows.

### Secondary

- **Who**: Repeat customers and bulk buyers (servers, resellers).
- **Job**: Re-order confidently, reach support on Discord/Telegram, negotiate bulk pricing.
- **Where**: Same as primary; may return via Discord link or bookmark.

## Product Purpose

Velora Market sells premium digital products with instant automated delivery. The homepage is the primary conversion surface: establish trust, explain speed and security, and drive users to browse products or sign up. Success = clear value proposition, professional dark aesthetic, frictionless path to checkout.

Catalog positioning emphasizes **Discord-native tools** (Boost Bot, token checker, automation scripts) — not generic software keys or Windows licenses.

## Brand Personality

**Fast · Trustworthy · Professional**

- **Voice**: Direct, confident, speed-focused. Lead with delivery time and security; avoid hype slang and fear-based copy.
- **Aesthetic reference**: SUBSCRIPTO-style dark SaaS — black canvas, centered orange spotlight behind hero, sans + serif italic headline pairing, UI mocks below the fold (hero dashboard, section flow panels).
- **Reference sites**: SUBSCRIPTO (spotlight hero, dark mock dashboard), Stripe/Vercel (nav clarity, restrained CTAs, square-ish buttons on nav), competitor product grids with edge-to-edge banner thumbnails.

## Anti-references

- Dark neon gaming shop (RGB glow, pill overload, aggressive gradients)
- Generic AI SaaS (cream body, metric hero, eyebrow kickers on every section, ghost-card border + wide shadow)
- Default Shopify / SellAuth theme look
- Cheap crypto/scam storefront
- Produce.so light blue canvas (superseded — do not revert unless explicitly requested)
- Repeated identical UI mocks across sections (each card must use a distinct pattern)
- Wireframe / skeleton placeholder mocks

## Design Principles

1. **One accent, earned** — Orange `#F99926` / `#ff7a00` is for primary CTAs, spotlight, and key highlights only; not decoration everywhere.
2. **Show the product** — Dashboard mock and section UI previews over stock photos; prove instant delivery visually with distinct mock types per block.
3. **Void continuity** — Homepage sections share seamless `#000000` background; no gray section dividers between blocks.
4. **Speed is the message** — Copy and layout prioritize delivery time, security, and support reachability.
5. **Dark serves focus** — Black background keeps attention on headline and CTA; light text on dark with verified contrast.
6. **Ship in slices** — Add or refactor one landing section at a time; validate with user before stacking more change.

## Accessibility & Inclusion

- **Target**: WCAG **AA**
- **Notes**: Body muted text on black must stay ≥4.5:1 (`rgba(255,255,255,0.74)` minimum on hero subcopy). Large headings white on `#000` or orange spotlight. Respect `prefers-reduced-motion` on any entrance animations. Keyboard-accessible nav, FAQ accordions, and CTAs. Product card hover must not rely on motion-only affordances.

## Context

- **Stack**: SellAuth theme **156746** (Nunjucks, `settings.json`, CSS). Preview: `sellauth-theme watch --theme 156746`; push: `sellauth-theme push --theme 156746`.
- **Register override**: **product** for shop catalog, product detail, cart, checkout, customer account.
- **Stage**: **homepage live** — `components_order`: hero → how-it-works → features → products → feedbacks → faq → final-cta. PDP/cart polish in progress.

## Surfaces

| Surface | Register | Notes |
|---------|----------|-------|
| Homepage (`templates/shop.njk`) | brand | Full funnel sections; seamless void bg; flow mocks in how-it-works + features |
| Navbar | brand | Sticky dark blur bar; grid `1fr auto 1fr`; text links + one orange CTA |
| Hero | brand | Spotlight + grid, Arial + Playfair Display Italic, dashboard mock |
| Product grid & cards | brand → product | Banner media edge-to-edge; dynamic aspect from image; stock badge on image; orange gradient CTA in-stock |
| How it works / Features | brand | `vl-flow-spot` + `vl-flow-panel`; three distinct mock patterns per section |
| Product page, cart, checkout | product | Functional clarity; match dark tokens — next polish target |
| Customer account / auth | product | Minimal, trustworthy; dark theme parity |
| FAQ, footer, legal | brand | Readable prose; official contact links |

## Constraints

- **SellAuth Nunjucks**: no `[1,2]` in `{% for %}`, no `.concat()`, no loop counter increments; use `| default([])` for optional arrays.
- **CSS stack**: `pro.css` → `custom.css` → `velora.css` → `shop-pages.css`. Single landing source: `assets/velora.css`.
- **Impeccable bans**: no gradient text, no side-stripe borders, no ghost-card (1px border + shadow blur ≥16px), card radius ≤16px, no uppercase eyebrow on every section.
- **Typography committed**: Arial Normal (nav, hero sans, body) + Playfair Display Italic (hero serif line only).
- **Product images**: Upload as wide banners (~16:10); JS sets media aspect-ratio from natural dimensions; `object-fit: contain` — never crop product art.

## Out of scope

- Backend, payment rails, or SellAuth platform features outside theme files.
- Full light-theme revert to produce.so unless explicitly requested.
- Stock photography heroes (UI mocks preferred).
