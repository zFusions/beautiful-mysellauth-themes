<div align="center">

# 🛍️ Beautiful MySellAuth Themes

**The MEGA Agent Skill for premium SellAuth & MySellAuth storefront themes.**

*Client brief → design system → scroll mocks → ship with `sellauth-theme push`.*

<br />

[![Agent Skills](https://img.shields.io/badge/spec-agentskills.io-6366f1?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iI2ZmZiIgdmlld0JveD0iMCAwIDE2IDE2Ij48cGF0aCBkPSJNOCAwTDE2IDhMOCAxNiAwIDggeiIvPjwvc3ZnPg==)](https://agentskills.io)
[![skills.sh](https://img.shields.io/badge/install-skills.sh-000?style=for-the-badge)](https://skills.sh)
[![Version](https://img.shields.io/badge/version-4.3.0-orange?style=for-the-badge)](./SKILL.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)
[![SellAuth](https://img.shields.io/badge/platform-SellAuth-ff7a00?style=for-the-badge)](https://sellauth.com)

<br />

[Install](#-install) · [Usage](#-usage) · [What's inside](#-whats-inside) · [Workflow](#-workflow) · [Recipes](#-style-recipes) · [License](#-license)

</div>

---

## ✨ Overview

**beautiful-mysellauth-themes** teaches AI coding agents how to build **world-class digital shop themes** on SellAuth — not generic Bootstrap skins.

Say *"Fais-moi un site gaming neon"* and the agent will:

1. **Interview you** (name, style, fonts, accent, niche)
2. Write **`AGENTS.md` · `PRODUCT.md` · `DESIGN.md`** — your project knowledge base
3. Scaffold Nunjucks + CSS tokens + hero peek + feature mocks
4. Style shop pages and deploy with the CLI

> 🎮 **Gaming neon?** Syne + Plus Jakarta Sans — not Orbitron slop.  
> 🎨 **One accent. One design system. Scroll-gated mock UI.**

---

## 📖 Table of Contents

- [Install](#-install)
- [Usage](#-usage)
- [What's inside](#-whats-inside)
- [Workflow](#-workflow)
- [Style recipes](#-style-recipes)
- [Requirements](#-requirements)
- [Folder structure](#-folder-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📦 Install

### One-liner (recommended)

```bash
npx skills add zFusions/beautiful-mysellauth-themes --skill beautiful-mysellauth-themes -y
```

Global install (all projects):

```bash
npx skills add zFusions/beautiful-mysellauth-themes --skill beautiful-mysellauth-themes -g -y
```

### Cursor — project skill (no CLI)

Copy this repo into your project:

```
your-project/.cursor/skills/beautiful-mysellauth-themes/
```

Cursor auto-detects `SKILL.md`.

---

## 🚀 Usage

Configure your AI tool, then prompt naturally.

### How to use in different tools

| AI tool | How to include this skill |
|--------|---------------------------|
| **Cursor** | Install via `npx skills add …` or copy to `.cursor/skills/`. Agent reads `SKILL.md` when you ask for a SellAuth theme. [Cursor rules docs](https://docs.cursor.com/context/rules-for-ai) |
| **Claude Code** | `npx skills add zFusions/beautiful-mysellauth-themes -g -y` — skill loads from [Agent Skills](https://agentskills.io) format |
| **Codex / OpenAI** | Add repo via skills CLI; references `SKILL.md` + `references/` on theme builds |
| **Windsurf** | Install with skills CLI or symlink skill folder into your agent config |
| **Any skills.sh client** | `npx skills add zFusions/beautiful-mysellauth-themes --skill beautiful-mysellauth-themes` |

### Example prompts

| You say | Agent does |
|--------|------------|
| *"Fais-moi un site"* | Brief → KB files → full theme build |
| *"Fais-moi un site gaming neon"* | Recipe **R3** + Syne / Plus Jakarta / JetBrains Mono |
| *"Theme clair bleu corporate"* | Recipe **R5** + IBM Plex Sans |
| *"Fix les animations features"* | Reads mock + motion playbooks only |
| *"Change l'accent orange"* | Updates `DESIGN.md` first, then CSS tokens |

---

## 🧰 What's inside

| Module | Description |
|--------|-------------|
| 📋 **Client brief** | Interview bank → `AGENTS.md` + `PRODUCT.md` + `DESIGN.md` |
| 📚 **12 playbooks** | Platform, design system, components, mocks, motion, shop, typography, anti-patterns |
| 🎨 **Style recipes** | Full kits: SaaS dark **R1**, gaming neon **R3**, light **R4**, corporate **R5**, luxury **R6** |
| 🔤 **Font pairings** | Curated Google Fonts per style — mandatory, never system-only |
| 🧩 **Assets** | CSS token template, font head snippet, KB templates |
| ✅ **Quality bar** | 11 pillars — premium bar before ship |

### Signature patterns encoded

- 🎯 Optical navbar (`1fr auto 1fr` — links viewport-centered)
- 💡 Hero spotlight + peek mock below fold
- 📊 Scroll-gated feature mocks (feed · cart · meters)
- 🛒 Shop funnel → `#products`
- 🚫 Builder-safe Nunjucks (no forbidden loops)

---

## 🔄 Workflow

```
Phase 0   → Read all references
Phase 0.5 → Brief user + write AGENTS / PRODUCT / DESIGN
Phase 1   → Derive STYLE_ID, fonts, mocks from KB
Phase 2   → Scaffold theme (settings, schema, master.njk, theme.css)
Phase 3   → Landing sections (one at a time in builder)
Phase 4   → Shop pages (PDP, cart, checkout)
Phase 5   → Motion (reveal, Lenis, mock engine)
Phase 6   → Push + QA
```

**Iron rule:** no theme code until the three KB files exist.

---

## 🎨 Style recipes

| Recipe | Style | Fonts (examples) |
|--------|-------|------------------|
| **R1** | Pro SaaS dark | DM Sans + Instrument Serif |
| **R3** | Gaming neon premium | Syne + Plus Jakarta + JetBrains Mono |
| **R4** | Light shop blue | Inter (+ optional Fraunces) |
| **R5** | Corporate white-blue | IBM Plex Sans |
| **R6** | Luxury dark gold | Inter + Cormorant Garamond |

Full tokens + hero specs → [`references/10-style-recipes.md`](./references/10-style-recipes.md)

---

## ⚙️ Requirements

| Requirement | Notes |
|-------------|-------|
| **Node.js** | For `sellauth-theme-cli` |
| **sellauth-theme-cli** | `npm install -g sellauth-theme-cli` |
| **SellAuth account** | Theme ID + builder access |
| **Network** | `push`, Google Fonts |

---

## 📁 Folder structure

```
beautiful-mysellauth-themes/
├── SKILL.md              ← Agent entry point
├── README.md
├── LICENSE
├── assets/
│   ├── token-template.css
│   ├── master-font-head.snippet.html
│   └── templates/        ← AGENTS.md, PRODUCT.md, DESIGN.md
└── references/
    ├── 00-quality-bar.md
    ├── 01-discovery.md
    ├── …
    └── 11-client-brief-kb.md
```

---

## 🤝 Contributing

Contributions welcome — new recipes, typography pairings, mock patterns, or platform updates.

1. Fork [zFusions/beautiful-mysellauth-themes](https://github.com/zFusions/beautiful-mysellauth-themes)
2. Edit under `references/` or `assets/` — keep skill **generic** (no client brand names in skill files)
3. Bump `metadata.version` in `SKILL.md`
4. Open a Pull Request

---

## ⛔ Not in scope

Shopify Liquid · WooCommerce · WordPress · SellAuth backend APIs · payment logic

---

## ⚖️ License

[MIT](./LICENSE) — free to use, modify, and share.

---

<div align="center">

**Built for builders who ship premium digital shops — not AI slop.**

⭐ Star this repo if it saved you hours on your SellAuth theme.

</div>
