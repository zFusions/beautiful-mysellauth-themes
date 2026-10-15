<div align="center">

<h1>Beautiful MySellAuth Themes</h1>

<p>
  <b>The agent skill for premium SellAuth &amp; MySellAuth storefront themes.</b><br/>
  Client brief in your language, English knowledge base, scroll mocks, shipped with <code>sellauth-theme push</code>.
</p>

<p>
  <a href="https://agentskills.io"><img src="https://img.shields.io/badge/spec-agentskills.io-1f6feb?style=flat-square&labelColor=21262d" alt="Agent Skills spec" /></a>
  <a href="https://skills.sh"><img src="https://img.shields.io/badge/install-skills.sh-1f6feb?style=flat-square&labelColor=21262d" alt="Install with skills.sh" /></a>
  <a href="./SKILL.md"><img src="https://img.shields.io/badge/version-5.0.0-1f6feb?style=flat-square&labelColor=21262d" alt="Version 5.0.0" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-1f6feb?style=flat-square&labelColor=21262d" alt="MIT license" /></a>
  <a href="https://sellauth.com"><img src="https://img.shields.io/badge/platform-SellAuth-1f6feb?style=flat-square&labelColor=21262d" alt="Platform: SellAuth" /></a>
</p>

<p>
  <a href="#showcase">Showcase</a> &nbsp;·&nbsp;
  <a href="#install">Install</a> &nbsp;·&nbsp;
  <a href="#usage">Usage</a> &nbsp;·&nbsp;
  <a href="#whats-inside">What's inside</a> &nbsp;·&nbsp;
  <a href="#workflow">Workflow</a> &nbsp;·&nbsp;
  <a href="#style-recipes">Style recipes</a>
</p>

<a href="https://veloramarket.mysellauth.com/"><img src="https://veloramarket.mysellauth.com/assets/156746/velora-og-banner.png" width="100%" alt="Velora Market, a storefront built with this skill" /></a>

</div>

<br/>

## Overview

**beautiful-mysellauth-themes** teaches AI coding agents to build premium digital-shop themes on SellAuth, with one design system and one accent instead of a generic template skin.

Ask in any language. The agent interviews you in yours, then produces:

1. A **client brief** (questions in your language)
2. **`AGENTS.md`, `PRODUCT.md`, `DESIGN.md`** (English knowledge base, stable for agents)
3. A **Nunjucks theme** with CSS tokens, hero peek and scroll-gated feature mocks
4. **Styled shop pages**, deployed through the CLI

## Showcase

**[Velora Market](https://veloramarket.mysellauth.com/)** is a live storefront built with this skill, from brief to `sellauth-theme push`.

| Skill pattern | Where it shows on the live site |
| :-- | :-- |
| Hero spotlight with peek mock | Hero with a live product console panel |
| Feature mocks | Three-step sequence: browse, checkout, instant delivery |
| `#products` funnel | Every call to action routes to the catalog |
| Single accent, one design system | One orange accent across all sections |
| Trust pages (P1) | Status, feedback, terms, privacy, refund, one-time-password login |
| Conversion sections | Features, FAQ, final call to action |

## Install

```bash
npx skills add zFusions/beautiful-mysellauth-themes --skill beautiful-mysellauth-themes -y
```

Global (all projects):

```bash
npx skills add zFusions/beautiful-mysellauth-themes --skill beautiful-mysellauth-themes -g -y
```

Cursor project skill: copy this folder to `.cursor/skills/beautiful-mysellauth-themes/`.

## Usage

| AI tool | Setup |
| :-- | :-- |
| **Cursor** | `npx skills add ...` or `.cursor/skills/`, see the [Cursor rules docs](https://docs.cursor.com/context/rules-for-ai) |
| **Claude Code, Codex, Windsurf** | `npx skills add zFusions/beautiful-mysellauth-themes -y` |
| **Any skills.sh client** | Same install command |

### Example prompts

| Prompt | Result |
| :-- | :-- |
| *"Make me a SellAuth shop"* | Brief, knowledge base, full build |
| *"Build a gaming neon theme"* | Recipe **R3** with premium fonts |
| *"Clean corporate blue theme"* | Recipe **R5** |
| *"Fix feature mock animations"* | Mock and motion playbooks only |

### Languages

| What | Language |
| :-- | :-- |
| Skill docs (`SKILL.md`, references) | English |
| Interview, questions, chat with you | Your language (auto-detected) |
| `AGENTS.md`, `PRODUCT.md`, `DESIGN.md` | English (stable for agents) |
| Theme copy in the builder | Site locale from the brief (EN, FR, ES, ...) |

## What's inside

| Module | Description |
| :-- | :-- |
| **Client brief** | Multilingual interview feeding the knowledge-base templates |
| **15 playbooks** | Platform, theme architecture, all SellAuth surfaces, design system, mocks, motion, shop, typography, skill authoring |
| **Style recipes** | SaaS R1, gaming neon R3, light R4, corporate R5, luxury R6 |
| **Font pairings** | Curated Google Fonts, never system-only |
| **Assets** | Token template, font snippet, knowledge-base templates |
| **Quality bar** | 12 pillars checked before ship |

**Signature patterns:** optical navbar, hero spotlight with peek mock, scroll-gated mocks, `#products` funnel, a universal file and CSS structure ([13-theme-architecture.md](./references/13-theme-architecture.md)) and a complete page catalog P0 to P2 ([14-sellauth-surfaces.md](./references/14-sellauth-surfaces.md)).

Spec: [agentskills.io](https://agentskills.io/specification) · Examples: [anthropics/skills](https://github.com/anthropics/skills)

## Workflow

```text
Phase 0   Read references (15 playbooks)
Phase 0.5 Brief (user language) + write knowledge base (English)
Phase 1-2 Scaffold from DESIGN.md + surfaces catalog
Phase 3   Landing sections (builder-safe, one at a time)
Phase 4   Shop P0: product, cart, maintenance
Phase 4.5 Trust P1: legal, status, feedback, customer area
Phase 5   Motion (Lenis on .t-home)
Phase 6   Push + full-ship QA
```

## Style recipes

| Recipe | Style | Fonts |
| :-- | :-- | :-- |
| **R1** | Pro SaaS dark | DM Sans + Instrument Serif |
| **R3** | Gaming neon premium | Syne + Plus Jakarta Sans + JetBrains Mono |
| **R4** | Light shop | Inter |
| **R5** | Corporate blue | IBM Plex Sans |
| **R6** | Luxury gold | Inter + Cormorant Garamond |

Details: [`references/10-style-recipes.md`](./references/10-style-recipes.md)

## Requirements

- Node.js and [sellauth-theme-cli](https://www.npmjs.com/package/sellauth-theme-cli)
- A SellAuth account and a theme ID
- Network access for `push` and Google Fonts

**Out of scope:** Shopify Liquid, WooCommerce, WordPress, SellAuth backend, payment logic.

## Contributing

1. Fork the repo
2. Keep skill files generic (no client brand names in references)
3. Follow [references/12-skill-authoring.md](./references/12-skill-authoring.md): bump `metadata.version` and sync every affected `.md`
4. Open a pull request

## License

[MIT](./LICENSE)

<br/>

<div align="center">

<sub><b>Built for builders who ship premium digital shops.</b><br/>Star the repo if this skill saved you hours.</sub>

</div>
