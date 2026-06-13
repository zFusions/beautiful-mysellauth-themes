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

Complete SellAuth page catalog: [14-sellauth-surfaces.md](../../references/14-sellauth-surfaces.md). Document which surfaces this project ships in `components_order` and PRODUCT notes below.

| Surface | Register | Priority | Notes |
|---------|----------|----------|-------|
| Homepage (`shop`) | brand | P0 | {{HOMEPAGE_NOTES}} |
| Navbar / footer (global) | brand | P0 | Sticky; grid `1fr auto 1fr`; links viewport-centered |
| Hero | brand | P0 | {{HERO_NOTES}} |
| Product grid & cards | brand → product | P0 | {{PRODUCT_GRID_NOTES}} |
| How it works / Features | brand | P0 | 3 distinct mock patterns — feed / list / meters |
| Product page, cart, checkout | product | P0 | Match tokens from DESIGN.md |
| Maintenance | brand | P0 | Branded offline page |
| Terms, privacy, refund | brand | P1 | Shared prose layout |
| Status, feedback | brand | P1 | Trust surfaces |
| Customer area (dashboard, invoices, balance, tickets) | product | P1 | Shared account shell |
| FAQ, footer, support links | brand | P0/P1 | {{SUPPORT_CHANNELS}} |
| Blog / custom pages | brand | P2 | If enabled in builder |

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
