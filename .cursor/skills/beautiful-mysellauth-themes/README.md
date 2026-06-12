# beautiful-mysellauth-themes

MEGA skill for building **premium SellAuth / MySellAuth storefront themes** — any style (dark SaaS, gaming neon, light shop, corporate, luxury).

Works with Cursor, Claude Code, Codex, Windsurf, and any [Agent Skills](https://agentskills.io) client.

## What you get

- **Client brief workflow** — interview → `AGENTS.md` + `PRODUCT.md` + `DESIGN.md` before code
- **12 reference playbooks** — platform, design system, components, mocks, motion, shop pages, typography, recipes
- **Style recipes** — full kit for gaming neon (R3); token + font kits for SaaS (R1), light (R4), corporate (R5), luxury (R6)
- **Assets** — CSS token template, Google Fonts head snippet, KB templates

## Requirements

- Node.js
- [sellauth-theme-cli](https://www.npmjs.com/package/sellauth-theme-cli) (`npm install -g sellauth-theme-cli`)
- SellAuth account + theme ID
- Network for `push` and Google Fonts

## Install

### From this repo (monorepo path)

```bash
npx skills add ./.cursor/skills/beautiful-mysellauth-themes --skill beautiful-mysellauth-themes -y
```

### From GitHub (after you publish)

```bash
npx skills add YOUR_GITHUB_USER/YOUR_REPO --skill beautiful-mysellauth-themes -y
```

### Cursor project skill (no CLI)

Copy the folder to `.cursor/skills/beautiful-mysellauth-themes/` in your project. Cursor loads it automatically.

## Usage

Tell your agent:

- *"Fais-moi un site"* / *"Create a SellAuth theme"*
- *"Fais-moi un site gaming neon"*
- *"Fix feature mock animations"*

The agent should read `SKILL.md`, run the brief phase on new builds, then follow Phases 0–6.

## Folder structure

```
beautiful-mysellauth-themes/
├── SKILL.md                 # Entry point — start here
├── README.md
├── LICENSE
├── assets/
│   ├── token-template.css
│   ├── master-font-head.snippet.html
│   └── templates/           # AGENTS.md, PRODUCT.md, DESIGN.md
└── references/
    ├── 00-quality-bar.md
    ├── 01-discovery.md
    ├── …
    └── 11-client-brief-kb.md
```

## Publish your fork

There is **no registry submit form** for [skills.sh](https://skills.sh). To publish:

1. Create a **public GitHub repo** containing this folder (or `skills/beautiful-mysellauth-themes/` inside a skills repo).
2. Ensure folder name matches `name:` in `SKILL.md` frontmatter.
3. Include this README + LICENSE.
4. Share install command: `npx skills add owner/repo --skill beautiful-mysellauth-themes`
5. Installs may appear on skills.sh leaderboard via CLI telemetry.

Optional: pin a release tag (`v4.3.0`) for stable installs.

## License

MIT — see [LICENSE](./LICENSE).

## Not in scope

Shopify Liquid, WooCommerce, WordPress, SellAuth backend APIs, payment processing logic.
