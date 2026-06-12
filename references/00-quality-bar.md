# Quality bar — what "best MySellAuth theme ever" means

This is the bar every theme must hit before ship. Not "good enough" — **premium**.

## The 11 pillars of excellence

| # | Pillar | Pass criteria |
|---|--------|---------------|
| 1 | **Instant clarity** | Value prop readable in 5 seconds. User knows what's sold + delivery method. |
| 2 | **One accent** | Single hue family. No rainbow, no competing neons. |
| 3 | **Visual proof** | Hero mock peek + 3 feature mocks prove product (not decorative fluff). |
| 4 | **Soft pro geometry** | 8–12px radius. No pill CTAs on pro/SaaS. Intentional pills only for gaming. |
| 5 | **Optical layout** | Nav links centered in viewport. Hero copy centered. Grid aligned. |
| 6 | **Motion with purpose** | Scroll reveal, hero entrance, mocks scroll-gated. Never autoplay on load off-screen. |
| 7 | **Shop funnel** | Primary CTA → `#products`. Copy mentions payment + instant delivery. |
| 8 | **Builder-safe** | Valid Nunjucks. schema.json complete. No forbidden patterns. |
| 9 | **Shop parity** | PDP + cart match landing tokens. Not a default Bootstrap afterthought. |
| 10 | **Typography** | Google Fonts pairing in master.njk. Body = readable sans. Gaming = Syne + Plus Jakarta, not Orbitron. |
| 11 | **Mobile first** | Hero readable. Mocks acceptable crop. 44px touch targets. |

## What separates amateur from premium

| Amateur | Premium |
|---------|---------|
| Stock Bootstrap hero | Custom spotlight / wash + peek mock |
| Static feature icons | Animated mock UI (feed, list, meters) |
| "Get started free" CTA | Browse products / Shop now |
| 5 CSS files fighting | One `theme.css` design system |
| Glow on every element | Glow on hero + one CTA |
| Animations on page load | Scroll-gated, play once |
| Pill buttons everywhere | Soft rectangle 10px |
| Generic lorem ipsum | Niche-aware copy structure (user fills text) |
| Orbitron + Arial gaming neon | Syne + Plus Jakarta + JetBrains Mono (Recipe R3) |

## Section rhythm (homepage)

Alternate surfaces for depth:
- Dark: `#000` hero → `#0e0e0e` bands → `#000` how-it-works → `#0e0e0e` features
- Light: `#fff` → `#f1f5f9` → `#fff`

Vertical spacing: `clamp(12px, 1.6vw, 18px)` between section head and content.

## Typography hierarchy

| Level | Size approach | Weight |
|-------|---------------|--------|
| Hero display | `clamp(2rem, 2.2vw + 0.875rem, 3.375rem)` | 400 |
| Section title | 24–52px clamp | 600 |
| Body | 14–16px | 400 |
| Nav / UI | 13px | 400–500 |
| Mock chrome | 10–11px mono | 400 |

Max 2 font families. Display serif optional — **one emotional line max** on hero.

## Trust signals (place near conversion)

- Payment methods (card, crypto, PayPal)
- Instant delivery
- Support link (Discord, Telegram, ticket)
- Stock indicators on product cards
- FAQ answering refunds, delivery, payment

## Performance gates

- LCP: hero title in static HTML (not JS)
- CLS: mock panel uses fixed min-height / flex spacer — no layout jump
- Decorative mocks: `aria-hidden="true"`
- Fonts: max 2, `font-display: swap`
- No 2MB hero images — CSS gradients + SVG grid

## Agent self-review (before push)

Ask:
1. Would I pay for a product on this site?
2. Does motion start when I scroll to mocks (not before)?
3. Is there exactly one accent?
4. Does every `components_order` id exist?
5. Mobile screenshot mentally OK?

If any NO → fix before push.
