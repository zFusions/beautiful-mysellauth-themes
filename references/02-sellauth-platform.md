# SellAuth platform — CLI, files, Nunjucks

## Install

```bash
npm install -g sellauth-theme-cli
sellauth-theme login
```

Config: `~/.sellauth/config.json`

## Commands (from project root with `themes/`)

| Command | Purpose |
|---------|---------|
| `sellauth-theme watch --theme {ID}` | Live sync .css, .njk, .json |
| `sellauth-theme push --theme {ID}` | Full text upload |
| Binary upload (PNG, woff2) | SellAuth Builder API — see below |

Preview: SellAuth Builder → hard refresh **Ctrl+F5**.

API: `https://api-internal-3.sellauth.com/v1`  
Upload: `POST /builder/{themeId}/{folder}/{fileName}/upload`

## Directory layout

```
themes/{THEME_ID}/
├── settings.json
├── settings.default.json
├── schema.json
├── layouts/master.njk
├── templates/
│   ├── shop.njk
│   ├── product.njk
│   ├── cart.njk
│   └── ...
├── components/
├── snippets/
└── assets/
    ├── pro.css          # DO NOT BREAK
    ├── custom.css
    ├── theme.css
    ├── shop-pages.css
    └── theme-feature-mocks.js
```

Full template catalog (shop, product, cart, legal, customer, blog, …): [14-sellauth-surfaces.md](14-sellauth-surfaces.md).

## settings.json

```json
{
  "templates": {
    "shop": {
      "layout": "master",
      "components": {
        "hero": {
          "type": "hero",
          "properties": {
            "title": "<span class=\"t-sans\">Headline</span>",
            "subtitle": "Instant delivery. Card, crypto, PayPal.",
            "cta": "#products",
            "cta_text": "Browse products",
            "cta_2": "#how-it-works",
            "cta_text_2": "How it works"
          }
        },
        "features": {
          "type": "features",
          "properties": {
            "title": "Why us",
            "subtitle": "Proof, not promises.",
            "features": [
              { "title": "Fast", "description": "…", "mock_type": "feed" },
              { "title": "Easy checkout", "description": "…", "mock_type": "list" },
              { "title": "Premium", "description": "…", "mock_type": "meters" }
            ]
          }
        }
      },
      "components_order": [
        "hero", "products", "how-it-works", "features", "faq", "footer"
      ]
    }
  },
  "global": {
    "properties": {
      "theme_color": "#6366f1",
      "primary_background_color": "#000000"
    }
  }
}
```

## Nunjucks safe patterns

```nunjucks
{% for item in properties.items | default([]) %}
  {{ item.title | renderString }}
{% endfor %}
{{ 'theme.css' | assetUrl }}
{{ '/#products' | shopUrl }}
{{ ('/' ~ properties.cta) | shopUrl }}
{% render_snippet "product-card.njk", product=product %}
{% render_component componentId %}
```

## Nunjucks FORBIDDEN

| Forbidden | Alternative |
|-----------|-------------|
| `{% for x in [1,2,3] %}` | settings array or fixed markup |
| `.concat()` | duplicate markup |
| `{% set i = i + 1 %}` | static items |

## CSS load order (master.njk)

1. Platform / Bootstrap defaults
2. `pro.css`
3. `custom.css`
4. `theme.css`
5. `shop-pages.css`

## Binary assets

Never upload images/fonts via `push` alone — text push corrupts binary files.

**Option A — Builder UI:** upload PNG/woff2 in SellAuth theme editor.

**Option B — Upload API:**

```
POST https://api-internal-3.sellauth.com/v1/builder/{themeId}/{folder}/{fileName}/upload
```

Use authenticated session from `sellauth-theme login`. Some teams wrap this in a local script (e.g. `scripts/upload-theme-binaries.mjs`) — not required by the skill.

Restart `watch` after binary upload if assets do not appear.

**Full structure guide:** [13-theme-architecture.md](13-theme-architecture.md) — universal layout for any theme.

## Visual editor (resale-ready themes)

Every storefront string a buyer might change must exist in `schema.json` and render from `properties` in the matching `.njk`.

```nunjucks
<section class="t-section component" data-component-id="{{ componentId }}">
  <h2>{{ properties.title | default('Section title') | renderString }}</h2>
  {% for item in properties.items | default([]) %}
    <p>{{ item.text | renderString }}</p>
  {% endfor %}
</section>
```

Snippets called from components:

```nunjucks
{% render_snippet "section-body.njk", properties=properties, componentId=componentId %}
```

**Mock UI** (hero peek, feature demos, step animations): expose `show_mock_ui` / `show_hero_mock` toggles. When disabled, skip mock HTML; keep title, subtitle, and list copy editable.

**Checklist before ship:** open Builder → select each homepage section → confirm fields update the preview → Ctrl+F5.

## Builder live reload

Include builder snippet that on reload:
- Calls `__revealInit()`
- Calls `__featureMockReplay()`
- Dispatches `theme:motion-start`

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Changes invisible | Ctrl+F5, check watch output |
| Template error | Check forbidden Nunjucks |
| PNG 400/broken | Binary upload via Builder or API — not push alone |
| Component missing | `type` must match `components/{type}.njk` |
