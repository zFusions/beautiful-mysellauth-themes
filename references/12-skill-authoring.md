# Skill authoring & maintenance

How to create, extend, and keep **beautiful-mysellauth-themes** aligned with the [Agent Skills](https://agentskills.io/specification) standard and best practices from [Anthropic's skills repo](https://github.com/anthropics/skills), [Cursor create-skill](https://github.com/cursor/skills-cursor), and [skills.sh](https://skills.sh).

**Scope:** This skill documents **universal SellAuth theme patterns** — not any single client shop. Client brands live in per-project `AGENTS.md` / `PRODUCT.md` / `DESIGN.md` only.

---

## When to update this skill

Update **all affected markdown** whenever you:

1. Ship a **new reusable pattern** (PDP layout, mock engine, motion bus, theme file split).
2. Discover an **anti-pattern** on any live theme (builder crash, invisible CSS layer, CRO mistake).
3. Change **workflow gates** (KB files, builder validation order, CLI deploy).
4. Add or rename a **reference file** — update `SKILL.md` reading table + README module list.
5. Bump **`metadata.version`** in `SKILL.md` frontmatter (semver: patch = fixes, minor = new refs/patterns, major = breaking workflow).

**Iron rule:** Generalize lessons from client work into `{prefix}` / `theme.css` patterns — **never** commit client brand names, theme IDs, or proprietary class names into skill files.

---

## Agent Skills spec (required)

Directory layout ([agentskills.io](https://agentskills.io/specification)):

```
beautiful-mysellauth-themes/
├── SKILL.md              # Required — frontmatter + workflow
├── README.md             # Human install guide
├── LICENSE
├── references/           # Progressive disclosure (read on demand)
├── assets/               # Templates, token CSS, snippets
└── scripts/              # Optional — add when repeatable
```

### Frontmatter (SKILL.md)

| Field | Required | This skill |
|-------|----------|------------|
| `name` | Yes | `beautiful-mysellauth-themes` — must match folder name |
| `description` | Yes | WHAT + WHEN + trigger terms (SellAuth, Nunjucks, PDP, …) |
| `license` | No | MIT — see LICENSE |
| `compatibility` | No | Node, sellauth-theme-cli, network |
| `metadata` | No | `author`, `version`, `spec: agentskills.io` |
| `allowed-tools` | No | Experimental — list if needed |

**Description rules** ([Anthropic template](https://github.com/anthropics/skills/blob/main/template/SKILL.md)):

- Third person ("Builds SellAuth themes…" not "I can build…")
- Include **keywords** agents use to discover the skill
- Max 1024 characters
- State **when NOT to use** (Shopify, WooCommerce, backend APIs)

### Body rules

- Keep **SKILL.md under 500 lines** — details live in `references/`
- **One level deep** file links from SKILL.md (no `references/foo/bar.md` chains)
- No time-sensitive "before August 2025" notes — use "Current method" / "Deprecated"
- Use forward slashes in paths (`references/03-design-system.md`)
- Examples use **placeholder prefix** `t-` — not a real client's classes

---

## Cursor-specific notes

- **Project skill path:** `.cursor/skills/beautiful-mysellauth-themes/`
- **Never write to** `~/.cursor/skills-cursor/` — Cursor internal skills only
- **`disable-model-invocation`:** omit (default) so the agent can auto-load from description triggers
- After editing skill locally: commit + `npx skills add owner/repo --skill beautiful-mysellauth-themes` for global installs

---

## Progressive disclosure map

| Layer | Loaded when | Target size |
|-------|-------------|---------------|
| Frontmatter `name` + `description` | Agent startup (all skills) | ~100 tokens |
| SKILL.md body | Skill activated | &lt; 500 lines |
| `references/*.md` | Task needs depth | Focused files (&lt; 400 lines each) |
| `assets/templates/*` | KB / scaffold phase | Copy-paste templates |

Add new topics as **new reference files** (e.g. `14-checkout-ux.md`) instead of bloating SKILL.md.

**Start here for structure:** [13-theme-architecture.md](13-theme-architecture.md) — universal folder/CSS/component layout for any theme.

---

## Authoring checklist (new reference or section)

- [ ] Linked from SKILL.md mandatory reading table (if full-build relevant)
- [ ] Linked from README "What's inside" if user-facing
- [ ] Cross-linked from related refs (e.g. anti-patterns ↔ design-system)
- [ ] **Generic only** — `{prefix}`, `theme.css`, `themes/{ID}/`; no client brands
- [ ] Code blocks use placeholder prefix (`t-`, `--t-*`)
- [ ] Includes **Do** and **Don't** where visual/CSS decisions matter
- [ ] Version bumped in SKILL.md `metadata.version`

---

## Validation (before publish)

Manual checks:

1. Folder name === `name:` in frontmatter
2. All `references/` links from SKILL.md resolve
3. README version badge matches SKILL.md metadata
4. No Windows backslashes in documented paths
5. DESCRIPTION contains SellAuth + MySellAuth + trigger verbs
6. Grep skill folder for client-specific leaks (brand names, real theme IDs)

Optional CLI ([skills-ref](https://agentskills.io/specification)):

```bash
npx skills-ref validate ./beautiful-mysellauth-themes
```

---

## Publish flow

1. Public GitHub repo (or fork)
2. `npx skills add owner/beautiful-mysellauth-themes --skill beautiful-mysellauth-themes`
3. Surfaces on [skills.sh](https://skills.sh) via CLI index — no separate registry form

---

## Sources to consult when extending

| Source | Use for |
|--------|---------|
| [anthropics/skills](https://github.com/anthropics/skills) | Spec, template, example skill structure |
| [agentskills.io/specification](https://agentskills.io/specification) | Frontmatter fields, directory layout |
| [agentskills.io/llms.txt](https://agentskills.io/llms.txt) | Full doc index |
| Cursor `create-skill` skill | Description writing, concision, anti-patterns |
| Any shipped SellAuth theme QA | Generalize findings → `08-anti-patterns.md` + `13-theme-architecture.md` |

---

## Sync checklist after learning from a client theme

Extract **universal** rules only — write into skill, not the client's name:

1. `13-theme-architecture.md` — file split, component contract, CSS layers
2. `03-design-system.md` — tokens, depth, spotlight scoping
3. `08-anti-patterns.md` — what failed in production
4. `10-style-recipes.md` — recipe defaults (still generic kits)
5. `assets/templates/DESIGN.md` — KB template fields
6. `SKILL.md` — workflow/checklist if gates changed
7. `README.md` — version + feature bullets
8. This file — if authoring process itself changed
