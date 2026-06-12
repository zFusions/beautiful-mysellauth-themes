# {{SHOP_NAME}}

> {{ONE_LINER}}

## Register

brand

## Users

### Primary

- **Who**: {{PRIMARY_WHO}}
- **Job**: {{PRIMARY_JOB}}
- **Where**: {{PRIMARY_WHERE}}

### Secondary

- **Who**: {{SECONDARY_WHO}}
- **Job**: {{SECONDARY_JOB}}
- **Where**: {{SECONDARY_WHERE}}

## Product Purpose

{{PRODUCT_PURPOSE_PARAGRAPH}}

Catalog positioning: **{{CATALOG_POSITIONING}}** — not {{CATALOG_NOT}}.

## Brand Personality

**{{PERSONALITY_ADJECTIVES}}**

- **Voice**: {{VOICE_DESCRIPTION}}
- **Aesthetic reference**: {{AESTHETIC_REFERENCE}}
- **Reference sites**: {{REFERENCE_SITES}}

## Anti-references

{{ANTI_REFERENCES_BULLETS}}

## Design Principles

1. **{{PRINCIPLE_1}}**
2. **{{PRINCIPLE_2}}**
3. **{{PRINCIPLE_3}}**
4. **{{PRINCIPLE_4}}**
5. **{{PRINCIPLE_5}}**

## Accessibility & Inclusion

- **Target**: {{WCAG_TARGET}}
- **Notes**: {{A11Y_NOTES}}

## Context

- **Stack**: SellAuth theme **{{THEME_ID}}** (Nunjucks, `settings.json`, CSS).
- **Language**: {{LOCALE}}
- **Register override**: **product** for shop catalog, PDP, cart, checkout, account.
- **Stage**: {{STAGE}}

## Surfaces

| Surface | Register | Notes |
|---------|----------|-------|
| Homepage | brand | {{HOMEPAGE_NOTES}} |
| Navbar | brand | Sticky; grid `1fr auto 1fr`; links viewport-centered |
| Hero | brand | {{HERO_NOTES}} |
| Product grid & cards | brand → product | {{PRODUCT_GRID_NOTES}} |
| How it works / Features | brand | 3 distinct mock patterns — feed / list / meters |
| Product page, cart, checkout | product | Match tokens from DESIGN.md |
| FAQ, footer, support links | brand | {{SUPPORT_CHANNELS}} |

## Constraints

- **SellAuth Nunjucks**: no `[1,2]` in loops, no `.concat()`, no template counters.
- **CSS stack**: see AGENTS.md — single landing source: `assets/{{CSS_FILE}}`.
- **Typography**: {{FONT_COMMITMENT}} — loaded via Google Fonts in master.njk.
- **Delivery message**: Hero and FAQ must mention {{DELIVERY_METHOD}}.
- **Payments mentioned**: {{PAYMENT_METHODS}}.

## Assumptions

<!-- List anything inferred because user did not answer. Remove section if none. -->

{{ASSUMPTIONS_OR_NONE}}

## Out of scope

- Backend, payment rails, SellAuth platform features outside theme files.
- {{OUT_OF_SCOPE_EXTRA}}
