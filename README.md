<div align="center">

# 🛍️ Beautiful MySellAuth Themes

**The MEGA Agent Skill for premium SellAuth & MySellAuth storefront themes.**

*Client brief in your language → English knowledge base → scroll mocks → ship with `sellauth-theme push`.*

<br />

[![Agent Skills](https://img.shields.io/badge/spec-agentskills.io-6366f1?style=for-the-badge)](https://agentskills.io)
[![skills.sh](https://img.shields.io/badge/install-skills.sh-000?style=for-the-badge)](https://skills.sh)
[![Version](https://img.shields.io/badge/version-5.0.0-orange?style=for-the-badge)](./SKILL.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)
[![SellAuth](https://img.shields.io/badge/platform-SellAuth-ff7a00?style=for-the-badge)](https://sellauth.com)

<br />

[Install](#-install) · [Usage](#-usage) · [Languages](#-languages) · [What's inside](#-whats-inside) · [Workflow](#-workflow) · [License](#-license)

</div>

---

## ✨ Overview

**beautiful-mysellauth-themes** teaches AI coding agents how to build **world-class digital shop themes** on SellAuth — not generic Bootstrap skins.

Ask in **any language** — the agent interviews you in yours, then ships:

1. **Client brief** (questions in your language)
2. **`AGENTS.md` · `PRODUCT.md` · `DESIGN.md`** (English knowledge base for agents)
3. Nunjucks theme + CSS tokens + hero peek + scroll-gated feature mocks
4. Shop pages styled and deployed via CLI

> 🎮 **Gaming neon?** Syne + Plus Jakarta Sans — not Orbitron slop.  
> 🎨 **One accent. One design system. Premium by default.**

---

## 📖 Table of Contents

- [Install](#-install)
- [Usage](#-usage)
- [Languages](#-languages)
- [What's inside](#-whats-inside)
- [Workflow](#-workflow)
- [Style recipes](#-style-recipes)
- [Requirements](#-requirements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📦 Install

```bash
npx skills add zFusions/beautiful-mysellauth-themes --skill beautiful-mysellauth-themes -y
```

Global (all projects):

```bash
npx skills add zFusions/beautiful-mysellauth-themes --skill beautiful-mysellauth-themes -g -y
```

**Cursor project skill:** copy this folder to `.cursor/skills/beautiful-mysellauth-themes/`.

---

## 🚀 Usage

| AI tool | Setup |
|--------|--------|
| **Cursor** | `npx skills add …` or `.cursor/skills/` — [Cursor rules docs](https://docs.cursor.com/context/rules-for-ai) |
| **Claude Code / Codex / Windsurf** | `npx skills add zFusions/beautiful-mysellauth-themes -y` |
| **Any skills.sh client** | Same install command |

### Example prompts

| Prompt | Result |
|--------|--------|
| *"Make me a SellAuth shop"* | Brief → KB files → full build |
| *"Build a gaming neon theme"* | Recipe **R3** + premium fonts |
| *"Clean corporate blue theme"* | Recipe **R5** |
| *"Fix feature mock animations"* | Mock + motion playbooks only |

---

## 🌍 Languages

| What | Language |
|------|----------|
| Skill docs (`SKILL.md`, references) | **English** |
| Interview, questions, chat with you | **Your language** (auto-detected) |
| `AGENTS.md` / `PRODUCT.md` / `DESIGN.md` | **English** (agent-stable) |
| Theme copy in builder | **Site locale** from brief (EN, FR, ES, …) |

---

## 🧰 What's inside

| Module | Description |
|--------|-------------|
| 📋 **Client brief** | Multilingual interview → KB templates |
| 📚 **15 playbooks** | Platform, **theme architecture**, **all SellAuth surfaces**, design system, mocks, motion, shop, typography, skill authoring |
| 🎨 **Style recipes** | SaaS **R1**, gaming neon **R3**, light **R4**, corporate **R5**, luxury **R6** |
| 🔤 **Font pairings** | Curated Google Fonts — never system-only |
| 🧩 **Assets** | Token template, font snippet, KB templates |
| ✅ **Quality bar** | 12 pillars before ship |

**Signature patterns:** optical navbar · hero spotlight + peek mock · scroll-gated mocks · `#products` funnel · **universal file/CSS structure** ([13-theme-architecture.md](./references/13-theme-architecture.md)) · **complete page catalog P0–P2** ([14-sellauth-surfaces.md](./references/14-sellauth-surfaces.md))

Spec: [agentskills.io](https://agentskills.io/specification) · Examples: [anthropics/skills](https://github.com/anthropics/skills)

---

## 🔄 Workflow

```
Phase 0   → Read references (15 playbooks)
Phase 0.5 → Brief (user language) + write KB (English)
Phase 1–2 → Scaffold from DESIGN.md + surfaces catalog
Phase 3   → Landing sections (builder-safe, one at a time)
Phase 4   → Shop P0: product, cart, maintenance
Phase 4.5 → Trust P1: legal, status, feedback, customer area
Phase 5   → Motion (Lenis on `.t-home`)
Phase 6   → Push + full-ship QA
```

---

## 🎨 Style recipes

| Recipe | Style | Fonts |
|--------|-------|-------|
| **R1** | Pro SaaS dark | DM Sans + Instrument Serif |
| **R3** | Gaming neon premium | Syne + Plus Jakarta + JetBrains Mono |
| **R4** | Light shop | Inter |
| **R5** | Corporate blue | IBM Plex Sans |
| **R6** | Luxury gold | Inter + Cormorant Garamond |

Details: [`references/10-style-recipes.md`](./references/10-style-recipes.md)

---

## ⚙️ Requirements

- Node.js + [sellauth-theme-cli](https://www.npmjs.com/package/sellauth-theme-cli)
- SellAuth account + theme ID
- Network for `push` and Google Fonts

---

## 🤝 Contributing

1. Fork the repo
2. Keep skill files **generic** (no client brand names in references)
3. Follow [references/12-skill-authoring.md](./references/12-skill-authoring.md) — bump `metadata.version`, sync all affected `.md`
4. Open a PR

---

## ⛔ Not in scope

Shopify Liquid · WooCommerce · WordPress · SellAuth backend · payment logic

---

## ⚖️ License

[MIT](./LICENSE)

---

<div align="center">

**Built for builders who ship premium digital shops.**

⭐ Star the repo if this skill saved you hours.

</div>
