# Anti-patterns — never ship these

## Platform / Nunjucks

| ❌ | Why |
|----|-----|
| `{% for x in [1,2,3] %}` | Builder crash |
| `.concat()` in templates | Builder crash |
| Template loop counters | Unreliable |
| Push PNG via text upload | Corruption |
| All sections enabled day 1 | Undebuggable layout |

## Visual

| ❌ | Why |
|----|-----|
| System fonts only (Arial, no Google Fonts) | Generic AI slop |
| Orbitron / Rajdhani / Press Start 2P on gaming site | Cheap 2010 neon |
| ALL CAPS hero + body on gaming | Screaming, illegible |
| Neon text-shadow on every heading | Arcade, not premium |
| Pill buttons (999px) on pro/SaaS hero | Dated / gaming |
| Glow on every card | Cheap |
| 3+ accent colors | Noise |
| 16px+ radius on pro cards | Wrong tone |
| Light theme + heavy orange glow | Washed |
| Mix gaming + luxury serif | Incoherent |
| Moving hero copy when tuning mock peek | Breaks approved layout |

## Motion

| ❌ | Why |
|----|-----|
| Mocks on DOMContentLoaded off-screen | User misses animation |
| `stepGap = 80` when reduce motion | Instant (<1s) |
| `transition: none; opacity:1` on mock lines | Same |
| Bounce / elastic easing | Not premium |
| Lenis on checkout | Modal scroll bugs |
| Infinite mock loops | Distraction |
| Interactive fake buttons in mocks | a11y confusion |

## CSS architecture

| ❌ | Why |
|----|-----|
| 5+ landing CSS files | Specificity wars |
| Global `.btn` override on homepage | Breaks shop pages |
| Hardcoded hex scattered | Unmaintainable |
| No prefix on custom classes | Bootstrap conflicts |
| PDP rules duplicated in shop-pages.css AND shop-pdp.css | Drift, double maintenance |
| Glass styles only in velora.css with no `@supports` fallback | Broken cards on old browsers |
| Volume discount price hardcoded in Nunjucks | Breaks on qty change — use Alpine getters |

## Shop pages / PDP

| ❌ | Why |
|----|-----|
| Empty frame when product has no image | Broken PDP — use auto banner |
| Display font on product price | Illegible, wrong register |
| Sticky rail without mobile stack test | CTA buried below fold |
| Volume tier sort wrong (asc for applied) | Applies lowest tier instead of best |
| Missing `$watch` on variant → quantity desync | Price/stock mismatch |
| Lenis on checkout | Modal scroll bugs |
| Cart totals without volume discount parity | User sees different price vs PDP |

## CRO / copy

| ❌ | Why |
|----|-----|
| "Get started free" on product shop | Wrong funnel |
| No `#products` anchor | Broken nav |
| Hero with no delivery/payment mention | Low trust |
| Features without mock proof | Weak differentiation |

## Agent behavior

| ❌ | Why |
|----|-----|
| Skip schema.json | Builder broken |
| Skip shop-pages.css | Half-themed shop |
| Skip push after JS change | User sees stale |
| Skip Google Fonts / use default Arial for "gaming neon" | User asked for premium — deliver R3 fonts |
| Improvise gaming colors/fonts without Recipe R3 | Inconsistent cheap neon |
| Start coding theme before AGENTS/PRODUCT/DESIGN exist | No source of truth; wrong client vision |
| Change accent in CSS only without updating DESIGN.md | KB drift; next agent breaks style |
| Copy another shop's brand in skill examples | Not universal |
| Skip mobile mental check | Broken responsive |
