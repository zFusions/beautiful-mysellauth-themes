# {{SHOP_NAME}} — Agent Context

SellAuth theme **{{THEME_ID}}** (Nunjucks + `{{CSS_FILE}}`).  
Preview: `sellauth-theme watch --theme {{THEME_ID}}` from `{{WORKSPACE_ROOT}}`.  
Ship: `sellauth-theme push --theme {{THEME_ID}}` then Ctrl+F5.

## Knowledge base (read before any UI work)

| File | Purpose |
|------|---------|
| [PRODUCT.md](./PRODUCT.md) | Brand, users, anti-references, principles, surfaces, constraints |
| [DESIGN.md](./DESIGN.md) | Tokens (YAML frontmatter), colors, typography, components, do's/don'ts |

**Brief root:** `{{BRIEF_ROOT}}`

## Design context

- **Register:** `brand` for homepage, hero, marketing sections, navbar, FAQ, footer.
- **Register override:** `product` for catalog grid, PDP, cart, checkout, customer account.
- **Canonical CSS:** `themes/{{THEME_ID}}/assets/{{CSS_FILE}}` — all `--{{PREFIX}}-*` tokens.
- **Class prefix:** `{{PREFIX}}` on all custom landing classes.

## CSS stack (do not reorder)

```
pro.css → custom.css → {{CSS_FILE}} → shop-pages.css
```

## Theme architecture

| Path | Role |
|------|------|
| `themes/{{THEME_ID}}/settings.json` | Config + `components_order` |
| `themes/{{THEME_ID}}/schema.json` | Builder fields |
| `themes/{{THEME_ID}}/layouts/master.njk` | Shell, fonts, motion |
| `themes/{{THEME_ID}}/components/` | Landing sections |
| `themes/{{THEME_ID}}/assets/{{CSS_FILE}}` | Landing design system |
| `themes/{{THEME_ID}}/assets/shop-pdp.css` | PDP-only styles (if used) |
| `themes/{{THEME_ID}}/assets/shop-pages.css` | Cart, checkout |
| `themes/{{THEME_ID}}/assets/theme-feature-mocks.js` | Feature mock engine |

## Page depth (landing)

- Hero spotlight: **inside hero component only** — see DESIGN.md Depth Rule
- Below hero: alternate `--{{PREFIX}}-bg` / `--{{PREFIX}}-section-alt` on `.t-home > .component`
- Do **not** stack full-page grids or section-title orange radials

## Build recipe

| Key | Value |
|-----|-------|
| STYLE_ID | {{STYLE_ID}} |
| Recipe | {{RECIPE_ID}} |
| Accent | {{ACCENT_HEX}} |
| Fonts UI | {{FONT_UI}} |
| Fonts display | {{FONT_DISPLAY}} |
| Feature mocks | {{MOCK_TYPES}} |

## Skills

- **Primary:** `beautiful-mysellauth-themes` (full workflow + brief KB)
- **Optional:** `premium-storefront-da` (motion/DA polish)

## Deploy checklist

1. Builder validates each new section before adding next to `components_order`
2. `sellauth-theme push --theme {{THEME_ID}}`
3. `node scripts/upload-theme-binaries.mjs --theme {{THEME_ID}}` if images/fonts added
4. Hard refresh (Ctrl+F5) desktop + mobile check

## Nunjucks survival (never break builder)

- No array literals in `{% for %}`
- No `.concat()` in templates
- Use `| default([])` for optional arrays

## Agent rules for this project

1. Read PRODUCT.md + DESIGN.md at start of every UI session.
2. Tokens and fonts come from DESIGN.md — do not invent new accents mid-task.
3. One section at a time in builder when adding homepage blocks.
4. Shop pages must match landing tokens (no raw Bootstrap blue).
