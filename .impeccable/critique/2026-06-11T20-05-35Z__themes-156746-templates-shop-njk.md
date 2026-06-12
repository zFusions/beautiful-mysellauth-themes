---
target: homepage
total_score: 28
p0_count: 0
p1_count: 1
p2_count: 2
p3_count: 1
timestamp: 2026-06-11T20-05-35Z
slug: themes-156746-templates-shop-njk
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Live badge on mock is decorative only |
| 2 | Match System / Real World | 4 | Clear payment/delivery language |
| 3 | User Control and Freedom | 3 | Nav anchors to future sections not yet live |
| 4 | Consistency and Standards | 3 | Pill hero CTAs vs square nav CTA (intentional but mixed) |
| 5 | Error Prevention | n/a | Marketing surface |
| 6 | Recognition Rather Than Recall | 3 | Nav links point to #products etc. before sections exist |
| 7 | Flexibility and Efficiency | 2 | No keyboard shortcuts; acceptable for landing |
| 8 | Aesthetic and Minimalist Design | 4 | Strong spotlight focus, minimal chrome |
| 9 | Error Recovery | n/a | — |
| 10 | Help and Documentation | 3 | Support link present; FAQ section pending |
| **Total** | | **28/32** | **Good — address nav dead anchors** |

## Anti-Patterns Verdict

**LLM assessment:** Does not read as generic AI SaaS cream template. Dark committed palette, serif/sans hero pairing, and dashboard mock are distinctive. Trust bar avoids uppercase eyebrow kicker. Remaining tells: pill hero buttons alongside square nav CTA; Playfair on reflex-reject list but user-requested.

**Deterministic scan:** Clean — `detect.mjs` returned 0 findings on shop.njk, hero.njk, navbar.njk, home-trust.njk.

**Browser visualization:** Skipped — no local dev server; SellAuth preview is remote.

## Overall Impression

The hero landing is cohesive and on-brand for dark SaaS. Biggest gap: navigation promises sections (Products, FAQ) that are not yet in `components_order`, which erodes trust on click.

## What's Working

- Orange spotlight + grid creates a memorable SUBSCRIPTO-adjacent identity without neon gaming aesthetics.
- Typography hierarchy (Arial + Playfair Italic) reads clearly on the spotlight.
- Trust bar is quiet, centered, and doesn't compete with the hero.

## Priority Issues

**[P1] Dead nav anchors**
- **Why:** Users click Products/FAQ and land on empty or wrong scroll targets.
- **Fix:** Add sections incrementally or disable/hash-guard links until live.
- **Command:** `$impeccable craft products`

**[P2] Hero dashboard ghost-card (fixed in polish)**
- **Why:** Border + wide orange glow shadow violated Flat-By-Default rule.
- **Fix:** Applied — depth shadow only; rim light retained.

**[P2] Missing focus-visible (fixed in polish)**
- **Why:** Keyboard users couldn't see focus on CTAs and nav.
- **Fix:** Applied outline on hero buttons and nav interactive elements.

**[P3] Floating feedback rating widget**
- **Why:** Disconnected from layout grid; reads as third-party bolt-on.
- **Fix:** Integrate into trust bar or hide until styled.
- **Command:** `$impeccable quieter homepage`

## Persona Red Flags

**Jordan (First-Timer):** Clicks "Products" in nav — section may not exist yet. Confusing empty scroll.

**Casey (Mobile):** Hero CTAs stack acceptably; nav toggle now 44px touch target after polish.

**Sam (Accessibility):** Trust items are spans not list — screen reader grouping weak; `aria-label` on section helps.

## Minor Observations

- Hero subcopy on orange-lit area: verify contrast at 0.74 opacity in production.
- `data-reveal` on old trust snippet removed; no motion on trust bar (good for reduced motion).

## Questions to Consider

- Should nav links to unpublished sections be hidden until each section ships?
- Is the floating star rating widget intentional long-term?
