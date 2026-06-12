---
target: homepage
total_score: 31
p0_count: 0
p1_count: 1
p2_count: 3
timestamp: 2026-06-12T14-31-41Z
slug: themes-156746-templates-shop-njk
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Hero mock "live" badge is decorative; stock chips on cards are real |
| 2 | Match System / Real World | 4 | Instant delivery, Discord tools, clear pricing language |
| 3 | User Control and Freedom | 4 | Nav anchors live; mobile drawer closes on tap; OOS cards non-interactive |
| 4 | Consistency and Standards | 3 | Arial hero + Inter catalog is intentional; hero gradient CTA vs flat nav CTA |
| 5 | Error Prevention | n/a | Marketing surface |
| 6 | Recognition Rather Than Recall | 4 | Sticky nav, search, whole-card product links |
| 7 | Flexibility and Efficiency | 2 | No keyboard shortcuts; acceptable for landing |
| 8 | Aesthetic and Minimalist Design | 4 | Strong void + spotlight; unified product tiles |
| 9 | Error Recovery | n/a | — |
| 10 | Help and Documentation | 4 | FAQ accordion + Support link in nav |
| **Total** | | **31/32** | **Good — polish PDP/cart next** |

## Anti-Patterns Verdict

**LLM assessment:** Does not read as generic AI SaaS cream template. Committed black void, orange spotlight, serif/sans hero pairing, and dashboard mock are distinctive. Reviews section uses one uppercase eyebrow — acceptable as single accent, not repeated on every block. Product cards are unified tiles (not floating text on background).

**Deterministic scan:** Clean — `detect.mjs` returned 0 findings on shop.njk, hero.njk, navbar.njk, products.njk, product-card.njk.

**Browser visualization:** Skipped — SellAuth preview is remote; no local dev server for overlay injection.

## Overall Impression

The homepage funnel is cohesive and shippable: hero → how-it-works → features → products → reviews → FAQ → final CTA. The responsive pass holds together on mobile (1-col products, stacked CTAs, FAQ single column). Biggest remaining gap is **product register** surfaces (PDP, cart) still behind the homepage polish level.

## What's Working

- **Unified product cards** — image, title, and price in one `#161616` case; whole card clickable with focus ring.
- **Responsive grid** — 1→2→3→4 column progression with safe-area padding and no horizontal scroll.
- **Spotlight hero** — distinctive dark SaaS identity without neon gaming tropes.

## Priority Issues

- **[P2] Reviews eyebrow is uppercase tracked kicker** — Single instance only; watch that FAQ/features don't accumulate more. **Suggested command:** `$impeccable quieter reviews`
- **[P2] Hero mock live indicator is decorative** — Implies real-time data. **Suggested command:** `$impeccable clarify hero`
- **[P1] PDP/cart not at homepage token parity** — PRODUCT.md marks these as next polish target. **Suggested command:** `$impeccable polish product-page`
- **[P2] Out-of-stock cards excluded from keyboard flow** — Correct behavior but no alternative path to notify/waitlist. **Suggested command:** `$impeccable onboard products`

## Persona Red Flags

**Jordan (First-Timer):** Product cards now read as one unit — good. Group products use modal (`data-bs-toggle`) which may surprise if modal copy is unclear.

**Casey (Mobile):** Thumb-zone CTAs in hero stack center; product grid 1-col on narrow phones is thumb-friendly. Search bar full-width — good.

**Sam (Accessibility):** Product images now have `alt` from product name (fixed in polish pass). OOS cards use `role="group"` + `aria-label`. Marquee reviews may be distracting with reduced-motion off — track respects `prefers-reduced-motion`.

## Minor Observations

- Search icon contrast bumped to `--vl-text-faint` (was whisper).
- Footer still carries inline light-era styles; homepage override works but sidecar drift possible.
- Section zebra bands (`#0e0e0e`) start at child 3 — document in DESIGN.md now.

## Questions to Consider

- Should out-of-stock products show a "Notify me" or Discord CTA instead of a dead tile?
- Is the 1:1 product media ratio the long-term choice, or return to banner 16:10 when more products upload wide art?
