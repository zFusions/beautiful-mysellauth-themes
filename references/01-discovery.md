# Discovery phase — before writing code

> **New theme:** Run [11-client-brief-kb.md](11-client-brief-kb.md) first — interview user, write **AGENTS.md**, **PRODUCT.md**, **DESIGN.md**. This phase **fills those files** and extracts STYLE_ID — do not skip straight to CSS.

Run this phase **every time** user says "make me a site" or "create a theme" (after KB files exist or in parallel while drafting them).

## Questions to infer (ask only if unclear)

Use the full question bank in [11-client-brief-kb.md](11-client-brief-kb.md). Minimum before build:

| Question | Why |
|----------|-----|
| Shop / brand name? | PRODUCT.md, nav, AGENTS.md |
| Dark or light? | Entire token base |
| Style + accent? | DESIGN.md + recipe |
| Font preference or "you pick"? | DESIGN.md + 09-typography |
| Niche + product type? | Mocks + copy |
| Refs + anti-refs? | PRODUCT personality |
| Delivery + payments? | Hero trust copy |

If user gives nothing: **Pro SaaS dark** for digital goods shops.

## Style matrix (pick ONE row)

| ID | Name | bg | accent examples | typo | radius | hero | mocks |
|----|------|-----|-----------------|------|--------|------|-------|
| S1 | Pro SaaS dark | `#000` | orange, indigo, violet | sans + serif 1 line | 10/12px | spotlight 2 blur + grid | dashboard, feed, list |
| S2 | Pro sober | `#0f0f0f` | white/gray | sans only | 8–10px | flat | table, list |
| S3 | Gaming / neon premium | `#050508` | neon green `#39ff14`, cyan | **Syne + Plus Jakarta** — see R3 | 8px | grid + vignette | terminal feed, inventory |
| S4 | Light shop | `#f8f9fb` | `#2563eb` | Inter | 12–16px | wash 6% | cart list, meters |
| S5 | Corporate blue | `#fff` | `#1d4ed8` | IBM Plex | 10px | blue gradient wash | stats grid, meters |
| S6 | Luxury dark | `#0a0a0a` | gold `#c9a227` | serif + sans | 12px | minimal | showcase preview |
| S7 | High contrast neon | `#000` | magenta + cyan dual* | geometric sans | 8px | scanline optional | terminal, grid |

*Dual accent only for intentional cyberpunk (S7) — still one **primary** CTA color. S3 = [Recipe R3](10-style-recipes.md), fonts in [09-typography-fonts.md](09-typography-fonts.md).*

## Mock selection by niche

| Niche | Card 1 | Card 2 | Card 3 |
|-------|--------|--------|--------|
| Digital keys / bots | feed (automation log) | list (cart) | meters (subscription) |
| SaaS tools | feed (status log) | stats (metrics) | meters (usage) |
| Gaming | feed (console) | list (inventory) | grid (status) |
| General ecommerce | list (cart) | stats (orders) | meters (delivery) |
| Luxury | preview card | stats | grid |

## Copy structure (user-editable via builder)

**Hero title:** `[Value] + [Emotional line]` — two spans, different typography optional.

**Hero sub:** Delivery speed + payment methods in one sentence.

**CTAs:** Primary = shop action. Secondary = how it works / docs.

**Features (×3):** Title = benefit. Description = how + outcome. No feature without mock proof.

**FAQ (×5–8):** Delivery, payment, refund, support, product-specific objection.

## Output of discovery phase

Write or update the knowledge base, then document internally:

```
BRIEF_ROOT: ./ (or themes/{ID}/brief/)
KB: AGENTS.md, PRODUCT.md, DESIGN.md
STYLE_ID: S3
RECIPE: R3
ACCENT: #39ff14
FONTS: Syne + Plus Jakarta Sans + JetBrains Mono
PREFIX: t-
MOCKS: feed, list, meters
SHOP_TYPE: gaming digital keys
```

Then proceed to scaffold. **Do not skip to CSS without KB files.**
