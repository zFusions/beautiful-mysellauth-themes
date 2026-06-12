# Client brief & knowledge base — before any code

**Iron rule:** On **new theme** or **full rebuild**, the agent **interviews the user**, writes **AGENTS.md**, **PRODUCT.md**, and **DESIGN.md**, then builds the theme **from those files**. No improvising colors, fonts, or copy tone mid-build.

Templates: [assets/templates/AGENTS.md](../assets/templates/AGENTS.md), [PRODUCT.md](../assets/templates/PRODUCT.md), [DESIGN.md](../assets/templates/DESIGN.md)

---

## Language policy (mandatory)

| Layer | Language |
|-------|----------|
| **This skill** (SKILL.md, references, templates) | **English only** |
| **Interview & chat with user** | **User's language** — detect from their messages |
| **AskQuestion options / labels** | Same language as the user |
| **10-line summary & confirmation** | User's language |
| **KB files (AGENTS / PRODUCT / DESIGN)** | **English** — stable for all agents |
| **Theme copy placeholders** (hero, FAQ, schema labels) | **Site locale** from brief (e.g. FR shop → French placeholders) |

### How to detect user language

1. Use the language of the **latest user message** (French, English, Spanish, etc.).
2. If mixed, prefer the language they used for the **request** ("make me a site" → EN; "fais-moi un site" → FR).
3. If unclear, ask once: *"Which language do you prefer for questions — English or French?"* (in English).

### Examples

| User writes | You respond / ask in |
|-------------|----------------------|
| "Fais-moi un site gaming neon" | French |
| "Make me a gaming neon shop" | English |
| "Quiero una tienda dark SaaS" | Spanish |

**Never** reply in French because the skill mentions French examples. **Always mirror the user.**

---

## When to run the brief

| Situation | Brief required? |
|-----------|-----------------|
| User: "make me a site", "create a theme", "full rebuild" (any language) | **Yes — full interview** |
| User gave rich brief in first message (name + style + colors + niche) | **Yes — confirm gaps, write KB, user OK** |
| Color tweak, one section, animation fix | **No** — read existing KB if present |
| User explicitly: "skip questions, use defaults" | Write KB from defaults + note in PRODUCT.md |

---

## Interview flow (agent behavior)

### Step 1 — Acknowledge & scope

Tell the user (in **their language**) you will ask a short brief, then produce three MD files (project knowledge base), then build the theme.

### Step 2 — Ask questions

Use **AskQuestion** for choices when possible — **translate all prompts and option labels** to the user's language.  
Always leave room for free text ("Other" / "Autre" / etc.).  
**Batch 1–2 rounds max** — do not interrogate for 20 messages. Infer sensible defaults for unanswered optional items and document assumptions in PRODUCT.md.

### Step 3 — Write KB files

Write all three files to **`{BRIEF_ROOT}/`** in **English** before `themes/{ID}/` scaffold.

### Step 4 — Confirm snapshot

Show a **10-line summary** (name, style, accent, fonts, 3 mocks, CTA) in the **user's language**. Ask to proceed unless they already said go.

English example: *"Ready to start the build?"*  
French example: *"OK pour lancer le build ?"*

### Step 5 — Build

Read AGENTS.md → PRODUCT.md → DESIGN.md on **every** subsequent edit in this project.

---

## Question bank (pick what's unclear)

Translate every question below into the user's language before asking.

### Block A — Identity (required)

| # | Question (English source) | Maps to |
|---|---------------------------|---------|
| A1 | **Shop / brand name?** | PRODUCT title, nav brand, AGENTS |
| A2 | **In one sentence: what do you sell?** | PRODUCT purpose, hero sub |
| A3 | **Product type?** (keys, subs, files, services, gaming, Discord, crypto, general) | Mocks, copy, STYLE_ID |
| A4 | **Site language / locale?** (EN, FR, ES, other) | Copy placeholders, schema labels |

### Block B — Audience & voice (required)

| # | Question (English source) | Maps to |
|---|---------------------------|---------|
| B1 | **Who buys?** (age, niche, tech level) | PRODUCT users |
| B2 | **Brand tone?** (pro, gaming, luxury, friendly, technical, minimal) | PRODUCT personality |
| B3 | **Three words that describe the vibe?** | DESIGN north star |

### Block C — Visual direction (required)

| # | Question (English source) | Options / notes |
|---|---------------------------|-----------------|
| C1 | **Dark or light?** | Dark default for digital goods |
| C2 | **Style?** | Pro SaaS (S1), Gaming neon premium (S3/R3), Light shop (S4), Corporate (S5), Luxury (S6), Cyberpunk (S7), or describe freely |
| C3 | **Accent color?** | Hex if known, else agent proposes 2 swatches from recipe |
| C4 | **Sites / refs you like?** (URLs or names) | PRODUCT refs, DESIGN characteristics |
| C5 | **Sites / styles to avoid?** | PRODUCT anti-references |
| C6 | **Logo / favicon ready?** | Assets note in AGENTS |

### Block D — Typography (required for premium)

| # | Question (English source) | Notes |
|---|---------------------------|-------|
| D1 | **Font preference?** | "You pick" → choose from [09-typography-fonts.md](09-typography-fonts.md) |
| D2 | **Serif on hero or all sans?** | S1 optional serif; S3 = Syne + Plus Jakarta |
| D3 | **Google Fonts OK?** | Default yes; self-host note if no |

**Never offer Orbitron / Rajdhani for gaming** — propose Syne + Plus Jakarta.

### Block E — Product & funnel (required)

| # | Question (English source) | Maps to |
|---|---------------------------|---------|
| E1 | **Delivery method?** (instant, manual, email, Discord) | Hero sub, FAQ, mocks |
| E2 | **Payments to mention?** (Stripe, crypto, PayPal…) | Trust copy |
| E3 | **Primary CTA?** (Browse products, Shop now, View catalog) | Hero + nav |
| E4 | **Support channel?** (Discord, Telegram, email) | Footer, FAQ |
| E5 | **Required sections?** | components_order |

Default funnel: Hero → Products → How it works → Features → FAQ → Footer.

### Block F — Technical (when known)

| # | Question (English source) | Maps to |
|---|---------------------------|---------|
| F1 | **SellAuth theme ID?** (existing or new) | AGENTS, paths |
| F2 | **CSS prefix?** (`t-`, `shop-`, brand slug) | DESIGN tokens |
| F3 | **Main CSS filename?** | `theme.css` default |

---

## `{BRIEF_ROOT}` placement

| Repo layout | BRIEF_ROOT |
|-------------|------------|
| One shop per repo (recommended) | Workspace root: `./AGENTS.md`, `./PRODUCT.md`, `./DESIGN.md` |
| Multi-theme monorepo | `themes/{ID}/brief/` OR root if shared brand |

Document choice in AGENTS.md.

---

## File roles (knowledge base)

### AGENTS.md — *how agents work on this project*

- Theme ID, CLI commands, file paths
- Pointer: read PRODUCT.md + DESIGN.md before UI
- CSS stack order, prefix, canonical CSS file
- Skills to use, deploy checklist
- **Register:** `brand` vs `product` surfaces

### PRODUCT.md — *what the shop is*

- Brand name, one-liner, purpose
- Users (primary / secondary)
- Brand personality + voice
- Aesthetic references + **anti-references**
- Design principles (5–7 bullets)
- Surfaces table (homepage, PDP, cart…)
- Constraints (Nunjucks, scope)
- Assumptions if user skipped questions

### DESIGN.md — *how it looks*

- YAML frontmatter: name, colors, typography, radius, spacing (machine-readable)
- Creative north star (1 paragraph)
- Color system with named rules
- Typography hierarchy + font URLs
- Components (buttons, cards, hero, nav)
- Do's and Don'ts tied to this client
- Maps 1:1 to CSS `--{prefix}-*` tokens in theme build

---

## Deriving build config from KB

After DESIGN.md + PRODUCT.md exist, agent extracts:

```
STYLE_ID / RECIPE: from PRODUCT + DESIGN (one row only)
ACCENT: DESIGN frontmatter colors.accent
FONTS: DESIGN frontmatter typography → master.njk URL from 09-typography
PREFIX: AGENTS.md
MOCKS: from PRODUCT niche table (01-discovery)
THEME_ID: AGENTS.md
SITE_LOCALE: PRODUCT.md (for theme copy, not KB language)
```

Then proceed to Phase 2 scaffold.

---

## Quality bar for KB files

| Criterion | Pass |
|-----------|------|
| **Specific** | Real brand name, real accent hex, named fonts — no "TBD" on required fields |
| **Actionable** | Agent can write CSS tokens without guessing |
| **Anti-ref explicit** | At least 3 things client refuses |
| **Surfaces** | Table covers homepage + shop funnel |
| **DESIGN YAML** | Valid frontmatter; colors match narrative |
| **No skill leakage** | Client KB uses **their** brand — not example brand names or generic lorem |
| **Assumptions labeled** | Anything inferred marked under `## Assumptions` in PRODUCT.md |
| **KB in English** | Even when user spoke French/Spanish in chat |

---

## Example AskQuestion batch (gaming neon)

Ask in the **user's language**. English source:

Round 1 (identity + style):
- Shop name (free text in chat if not in tool)
- Dark vs light
- Style: Gaming neon premium / Pro SaaS / Light / Corporate / Luxury / Custom
- Accent: Green neon / Cyan / Magenta / Custom hex

Round 2 (typo + product):
- Fonts: Agent recommends / I have a preference
- Product type: Keys / Subs / Gaming tools / General
- Delivery: Instant automated / Manual
- Reference site (optional free text)

---

## Agent checklist (brief phase)

```
[ ] Detected user language — interview in that language
[ ] Asked Block A–E (F if theme ID known)
[ ] Picked STYLE_ID + recipe + fonts from 09/10 — documented in DESIGN.md
[ ] Wrote AGENTS.md + PRODUCT.md + DESIGN.md in English from templates
[ ] Theme copy placeholders match SITE_LOCALE from brief
[ ] Showed summary in user language + confirmed (or user said go)
[ ] Read all 3 KB files before Phase 2
```

---

## Updating KB after launch

When user changes direction mid-project:
1. Update PRODUCT.md and/or DESIGN.md **first**
2. Sync tokens in theme.css
3. Note change in AGENTS.md if paths/commands shift

Never change colors/fonts in CSS only — KB must stay source of truth.
