# Client brief & knowledge base — before any code

**Iron rule:** On **new theme** or **full rebuild**, the agent **interviews the user**, writes **AGENTS.md**, **PRODUCT.md**, and **DESIGN.md**, then builds the theme **from those files**. No improvising colors, fonts, or copy tone mid-build.

Templates: [assets/templates/AGENTS.md](../assets/templates/AGENTS.md), [PRODUCT.md](../assets/templates/PRODUCT.md), [DESIGN.md](../assets/templates/DESIGN.md)

---

## When to run the brief

| Situation | Brief required? |
|-----------|-----------------|
| User: "Fais-moi un site", "crée un thème", "rebuild complet" | **Yes — full interview** |
| User gave rich brief in first message (name + style + colors + niche) | **Yes — confirm gaps, write KB, user OK** |
| Color tweak, one section, animation fix | **No** — read existing KB if present |
| User explicitly: "skip questions, use defaults" | Write KB from defaults + note in PRODUCT.md |

---

## Interview flow (agent behavior)

### Step 1 — Acknowledge & scope

Tell the user you will ask a short brief, then produce three MD files (their permanent project bible), then build the theme.

### Step 2 — Ask questions

Use **AskQuestion** for choices when possible. Always leave room for free text ("Other").  
**Batch 1–2 rounds max** — do not interrogate for 20 messages. Infer sensible defaults for unanswered optional items and document assumptions in PRODUCT.md.

### Step 3 — Write KB files

Write all three files to **`{BRIEF_ROOT}/`** before `themes/{ID}/` scaffold.

### Step 4 — Confirm snapshot

Show a **10-line summary** (name, style, accent, fonts, 3 mocks, CTA). Ask: *"OK pour lancer le build ?"* unless user already said go.

### Step 5 — Build

Read AGENTS.md → PRODUCT.md → DESIGN.md on **every** subsequent edit in this project.

---

## Question bank (pick what’s unclear)

### Block A — Identity (required)

| # | Question | Maps to |
|---|----------|---------|
| A1 | **Nom de la boutique / marque ?** | PRODUCT title, nav brand, AGENTS |
| A2 | **En une phrase : qu’est-ce que tu vends ?** | PRODUCT purpose, hero sub |
| A3 | **Type de produits ?** (clés, abos, fichiers, services, gaming, Discord, crypto, général) | Mocks, copy, STYLE_ID |
| A4 | **Langue du site ?** (FR, EN, autre) | Copy placeholders, schema labels |

### Block B — Audience & voice (required)

| # | Question | Maps to |
|---|----------|---------|
| B1 | **Qui achète ?** (âge, niche, technicité) | PRODUCT users |
| B2 | **Ton de la marque ?** (pro, gaming, luxe, friendly, technique, minimal) | PRODUCT personality |
| B3 | **3 mots qui décrivent la vibe ?** | DESIGN north star |

### Block C — Visual direction (required)

| # | Question | Options / notes |
|---|----------|-----------------|
| C1 | **Dark ou light ?** | Dark default for digital goods |
| C2 | **Style ?** | Pro SaaS (S1), Gaming neon premium (S3/R3), Light shop (S4), Corporate (S5), Luxury (S6), Cyberpunk (S7), ou décris librement |
| C3 | **Couleur d’accent ?** | Hex si connu, sinon agent propose 2 swatches from recipe |
| C4 | **Sites / refs que tu aimes ?** (URLs ou noms) | PRODUCT refs, DESIGN characteristics |
| C5 | **Sites / styles à éviter absolument ?** | PRODUCT anti-references |
| C6 | **Logo / favicon déjà prêt ?** | Assets note in AGENTS |

### Block D — Typography (required for premium)

| # | Question | Notes |
|---|----------|-------|
| D1 | **Préférence polices ?** | "Tu choisis" → pick from [09-typography-fonts.md](09-typography-fonts.md) |
| D2 | **Serif au hero ou tout sans ?** | S1 optional serif; S3 = Syne + Plus Jakarta |
| D3 | **Google Fonts OK ?** | Default yes; self-host note if no |

**Never offer Orbitron / Rajdhani for gaming** — propose Syne + Plus Jakarta.

### Block E — Product & funnel (required)

| # | Question | Maps to |
|---|----------|---------|
| E1 | **Livraison ?** (instant, manuel, email, Discord) | Hero sub, FAQ, mocks |
| E2 | **Paiements à mentionner ?** (Stripe, crypto, PayPal…) | Trust copy |
| E3 | **CTA principal ?** (Browse products, Shop now, Voir le catalogue) | Hero + nav |
| E4 | **Support ?** (Discord, Telegram, email) | Footer, FAQ |
| E5 | **Sections obligatoires ?** | components_order |

Default funnel: Hero → Products → How it works → Features → FAQ → Footer.

### Block F — Technical (when known)

| # | Question | Maps to |
|---|----------|---------|
| F1 | **Theme ID SellAuth ?** (existant ou nouveau) | AGENTS, paths |
| F2 | **Préfixe CSS ?** (`t-`, `shop-`, brand slug) | DESIGN tokens |
| F3 | **Nom du fichier CSS principal ?** | `theme.css` default |

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
| **No skill leakage** | Client KB uses **their** brand — not "Velora" or generic lorem |
| **Assumptions labeled** | Anything inferred marked under `## Assumptions` in PRODUCT.md |

---

## Example AskQuestion batch (gaming neon)

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
[ ] Asked Block A–E (F if theme ID known)
[ ] Picked STYLE_ID + recipe + fonts from 09/10 — documented in DESIGN.md
[ ] Wrote AGENTS.md from template
[ ] Wrote PRODUCT.md from template
[ ] Wrote DESIGN.md from template (YAML + prose)
[ ] Showed summary + confirmed (or user said go)
[ ] Read all 3 KB files before Phase 2
```

---

## Updating KB after launch

When user changes direction mid-project:
1. Update PRODUCT.md and/or DESIGN.md **first**
2. Sync tokens in theme.css
3. Note change in AGENTS.md if paths/commands shift

Never change colors/fonts in CSS only — KB must stay source of truth.
