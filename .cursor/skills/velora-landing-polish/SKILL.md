---
name: velora-landing-polish
description: Produce.so-style landing polish for SellAuth theme 156746 (Velora Market). Use when fixing alignment, typography, section headers, bento cards, or running Impeccable-quality UI passes on the shop homepage.
---

# Velora Landing Polish (theme 156746)

## Stack

- Theme: `themes/156746/`
- CSS: `assets/custom.css` (tokens + `.ps-*`), `assets/produce-landing.css` (hero, bento, dashboard)
- Skill: `.cursor/skills/beautiful-mysellauth-themes/SKILL.md`
- Watch: `sellauth-theme watch --theme 156746`

## Design tokens (produce.so)

| Token | Value |
|-------|-------|
| Background | `#F0F0F0` |
| Primary blue | `#1B44FE` |
| Hero title | Inter 600, ~64px, `-0.03em`, `#0A0B10` |
| Section title | Inter 600, 52px, `-2.6px`, `#151621` |
| Card title | Inter 600, 24px, `-1.2px`, `#0A0B10` |
| Body | Inter 500, 16px, `#7A7A7A` |
| Nav links | Inter 500, 16px, `#7A7A7A` |

## Section header pattern

Use `.ps-head.ps-head-produce` — no eyebrow pills:

```html
<header class="ps-head ps-head-produce" data-reveal>
  <h2 class="ps-title ps-title-stack">Line one.<br>Line two.<br>Line three.</h2>
  <div class="ps-brand-row">
    <span class="ps-brand-icon" aria-hidden="true">…</span>
    <span class="ps-brand-text">With Velora Market</span>
  </div>
</header>
```

Titles in `settings.json` may use `<br>` with `| renderString`.

## Produce.so proportions

| Element | Value |
|---------|-------|
| Grid max-width | `1140px` |
| Grid gap | `28px` |
| Card radius | `16px` |
| Card padding | `14px` |
| Mock inset area | `#f3f3f5`, radius `12px`, height `200–236px` |
| Header → grid gap | `72–104px` |
| Brand line | Same size as section title (52px), blue |
| Card title | 24px / body 15px centered below mock |

## Centering checklist

- [ ] `.ps-head-produce` uses flex column + `align-items: center`
- [ ] `.ps-title-stack` has `text-wrap: balance` + `margin: 0 auto`
- [ ] Hero `.vl-hero-copy` is flex column centered
- [ ] Dashboard `.vl-dashboard` has `margin: 0 auto`
- [ ] Trust bar uses `inline-flex` inside centered container
- [ ] Bento mocks use `margin: 0 auto` + flex center in stage

## Impeccable skill

Installed at `.agents/skills/impeccable`. Use for polish/audit passes:

```bash
npx skills add pbakaus/impeccable --yes   # install
npx skills update                          # update skills
npx impeccable detect <file-or-url>        # anti-pattern scan
```

On Windows, `npx impeccable skills install` may fail (needs `unzip`); use `npx skills add` instead.

## SellAuth Nunjucks constraints

- No `[1,2]` in `{% for %}`
- No `.concat()` or `{% set x = x + 1 %}` in loops
- Use `| default([])` for optional arrays
