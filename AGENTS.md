# Velora Market — Agent Context

SellAuth theme **156746** (Nunjucks + `velora.css`). Watch: `sellauth-theme watch --theme 156746` from this directory.

## Design Context

Strategic and visual specs live at the project root — read both before any UI work:

| File | Purpose |
|------|---------|
| [PRODUCT.md](./PRODUCT.md) | Register (`brand`), users, anti-references, principles, surfaces, constraints |
| [DESIGN.md](./DESIGN.md) | Tokens (YAML frontmatter), colors, typography, components, do's/don'ts |
| [.impeccable/design.json](./.impeccable/design.json) | Sidecar for live panel: component snippets, tonal ramps, narrative rules |

**Register:** `brand` for homepage/marketing; override to `product` for cart, PDP, checkout, account.

**Canonical CSS:** `themes/156746/assets/velora.css` — all `--vl-*` tokens.

**Skills:** `premium-storefront-da` (**primary** — theme 156746, all pages, DA + builder rules), `beautiful-mysellauth-themes` (generic SellAuth / new themes), `velora-landing-polish` (legacy — prefer premium-storefront-da).

**Visual editor rule:** `.cursor/rules/sellauth-visual-editor.mdc` (always on) — every component must be editable in the SellAuth builder for resale; update the skill after major UI work.

**Impeccable commands:** `$impeccable polish products`, `$impeccable audit themes/156746`, `$impeccable craft cart`.
