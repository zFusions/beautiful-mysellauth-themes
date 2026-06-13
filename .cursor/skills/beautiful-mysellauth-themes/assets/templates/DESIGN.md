---
name: {{SHOP_NAME}}
description: {{DESIGN_TAGLINE}}
style_id: {{STYLE_ID}}
recipe: {{RECIPE_ID}}
colors:
  bg: "{{COLOR_BG}}"
  section-alt: "{{COLOR_SECTION_ALT}}"
  surface: "{{COLOR_SURFACE}}"
  card: "{{COLOR_CARD}}"
  text-primary: "{{COLOR_TEXT}}"
  text-muted: "{{COLOR_MUTED}}"
  text-on-accent: "{{COLOR_TEXT_ON_ACCENT}}"
  accent: "{{ACCENT_HEX}}"
  accent-hover: "{{ACCENT_HOVER}}"
  accent-glow: "{{ACCENT_GLOW}}"
  accent-soft: "{{ACCENT_SOFT}}"
  border: "{{COLOR_BORDER}}"
  border-subtle: "{{COLOR_BORDER_SUBTLE}}"
typography:
  font-ui:
    family: "{{FONT_UI}}"
    googleFontsUrl: "{{GOOGLE_FONTS_URL}}"
    weights: [400, 500, 600, 700]
  font-display:
    family: "{{FONT_DISPLAY}}"
    weights: [600, 700]
  font-mono:
    family: "{{FONT_MONO}}"
    scope: mocks-only
  font-product:
    family: "Inter"
    scope: product-register-only
    weights: [500, 600, 700]
  hero-title:
    fontFamily: "{{FONT_DISPLAY}}"
    fontSize: "clamp(2rem, 2.4vw + 0.75rem, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  body:
    fontFamily: "{{FONT_UI}}"
    fontSize: "clamp(0.9375rem, 0.5vw + 0.85rem, 1.0625rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "-0.01em"
rounded:
  btn: "{{RADIUS_BTN}}"
  card: "{{RADIUS_CARD}}"
spacing:
  nav-h: "56px"
  section-y: "clamp(72px, 9vw, 112px)"
  container: "min(1200px, 94vw)"
prefix: "{{PREFIX}}"
css_file: "{{CSS_FILE}}"
theme_id: "{{THEME_ID}}"
---

# Design System: {{SHOP_NAME}}

## Overview

**Creative North Star: "{{NORTH_STAR_TITLE}}"**

{{NORTH_STAR_PARAGRAPH}}

**Key Characteristics:**

{{KEY_CHARACTERISTICS_BULLETS}}

## Colors

{{COLOR_NARRATIVE}}

### Primary

- **Accent** (`{{ACCENT_HEX}}`): Primary CTAs, key highlights, mock accents — `--{{PREFIX}}-accent`.
- **Accent hover** (`{{ACCENT_HOVER}}`): Hover states — `--{{PREFIX}}-accent-hover`.

### Neutral

- **Background** (`{{COLOR_BG}}`): Page canvas — `--{{PREFIX}}-bg`.
- **Section alt** (`{{COLOR_SECTION_ALT}}`): Alternating bands — `--{{PREFIX}}-section-alt`.
- **Surface / card**: Panels and cards — `--{{PREFIX}}-surface`, `--{{PREFIX}}-card`.
- **Text** / **Muted**: Body hierarchy — `--{{PREFIX}}-text`, `--{{PREFIX}}-muted`.

### Named Rules

**The One Accent Rule.** {{ONE_ACCENT_RULE}}

**The Glow Rule.** {{GLOW_RULE}}

**The Depth Rule.** Hero spotlight lives in the hero component only. Below the fold, use alternating `--{{PREFIX}}-bg` / `--{{PREFIX}}-section-alt` bands — not full-page orange grids or section-title radials. Optional: footer glow ~50% opacity; ultrawide neutral edge lift. See [03-design-system.md](../references/03-design-system.md#page-depth--background-dark-saas).

## Typography

**UI / body:** {{FONT_UI}}  
**Display:** {{FONT_DISPLAY}}  
**Mono (mocks only):** {{FONT_MONO}}  
**Product register (PDP/cart):** Inter or {{FONT_UI}} — title, price, CTAs only

Google Fonts (master.njk):

```html
{{GOOGLE_FONTS_LINK_TAG}}
```

### Hierarchy

- **Hero title**: Display, 700, clamp scale — `.{{PREFIX}}-hero-title`
- **Section titles**: Display, 600 — `.{{PREFIX}}-section-title`
- **Body / sub**: UI, 400, muted color — `.{{PREFIX}}-hero-sub`, section subs
- **Nav / buttons**: UI, 500–600, 13–14px

### Named Rules

**The Display Scope Rule.** Display font on hero + section titles only — never body paragraphs.

**The Mono Scope Rule.** JetBrains Mono (or chosen mono) only inside mock stages.

**The Product Font Rule.** On PDP/cart, use `--{{PREFIX}}-font-product` (typically Inter) for title, price, qty, and CTAs. Body copy and accordions use UI/system font — never display serif on prices.

## Components

### Buttons

- **Height:** 38–44px per surface (nav 44px touch target on mobile)
- **Radius:** {{RADIUS_BTN}}
- **Primary:** accent fill, `--{{PREFIX}}-text-on-accent` label
- **Secondary:** ghost / subtle surface — no competing accent

### Hero

- **Pattern:** {{HERO_PATTERN}} (spotlight / wash / grid + peek mock)
- **Mock:** Decorative, `aria-hidden="true"`, label **Preview** if dashboard-style
- **CTAs:** Primary → `#products`; copy from PRODUCT.md voice

### Navbar

- Grid `1fr auto 1fr` — brand | links centered in viewport | login + CTA
- Sticky, transparent on hero, 56px height

### Feature mocks

- Types: {{MOCK_TYPES}}
- Empty HTML stages; JS inject; scroll-gated (IO + motion-start)
- One distinct pattern per card — no duplicates in one section

### Product cards

- Match landing tokens; accent on price or CTA per style recipe
- 44px touch targets on mobile

### Shop pages (PDP / cart)

- **CSS split:** `shop-pdp.css` (PDP only) + `shop-pages.css` (cart, checkout) — no duplicate rules
- **Layout:** Two-column PDP — media + accordions | sticky buy rail (992px+)
- **Glass DA:** backdrop-filter cards with solid fallback; top-edge accent highlight
- **Volume discounts:** Alpine reactive `totalPrice`; tier nudge meter — see [07-shop-pages.md](../references/07-shop-pages.md)
- **Register:** `product` — override landing fonts per Product Font Rule above

## Motion

- Scroll reveal on sections (`data-reveal`)
- Hero entrance stagger after `theme:motion-start`
- Mock timing: snappy (start ~300ms, stagger ~520ms) — see 05-mock-ui-mastery
- Respect `prefers-reduced-motion` for accessibility — never crush mock stagger to instant

## Do's and Don'ts

### Do:

{{DOS_BULLETS}}

### Don't:

{{DONTS_BULLETS}}

## Token sync

All values above map to `themes/{{THEME_ID}}/assets/{{CSS_FILE}}` as `--{{PREFIX}}-*`.  
When client changes direction, update **this file first**, then CSS.
