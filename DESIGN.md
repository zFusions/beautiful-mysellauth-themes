---
name: Velora Market
description: Dark SaaS digital storefront — orange spotlight, instant delivery, Discord tools
colors:
  bg-void: "#000000"
  section-alt: "#0e0e0e"
  surface: "#0a0a0a"
  card: "#111111"
  product-card: "#161616"
  product-media: "#121212"
  text-primary: "#fafafa"
  text-muted: "rgba(255, 255, 255, 0.68)"
  text-on-accent-dark: "#1a1000"
  accent: "#F99926"
  accent-hot: "#ff7a00"
  accent-hover: "#ffab42"
  accent-price: "#F99926"
  accent-cta-top: "#ffb038"
  accent-cta-mid: "#ff8012"
  accent-cta-bottom: "#e87200"
  border: "rgba(255, 255, 255, 0.1)"
  border-subtle: "rgba(255, 255, 255, 0.06)"
  stock-green: "#4ade80"
typography:
  display-sans:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "clamp(1.75rem, 2.4vw + 0.5rem, 2.625rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  display-serif:
    fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.5rem, 2vw + 0.35rem, 2.125rem)"
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: "-0.02em"
  section-title:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "clamp(1.75rem, 2.4vw + 0.5rem, 2.625rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "clamp(0.9375rem, 0.4vw + 0.85rem, 1.0625rem)"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "-0.01em"
  label:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.01em"
  product-name:
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  product-price:
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
rounded:
  sm: "10px"
  md: "12px"
  lg: "14px"
  pill: "999px"
spacing:
  nav-h: "56px"
  section-y: "clamp(72px, 9vw, 112px)"
  section-y-mobile: "clamp(56px, 12vw, 80px)"
  hero-stack: "clamp(12px, 1.6vw, 18px)"
  hero-cta-gap: "clamp(14px, 1.8vw, 22px)"
  container: "min(1200px, 94vw)"
  products-grid-max: "1280px"
  products-grid-gap: "14px"
components:
  button-nav-primary:
    backgroundColor: "#FF7500"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "44px"
  button-hero-primary:
    backgroundColor: "{colors.accent-hot}"
    textColor: "{colors.text-on-accent-dark}"
    rounded: "{rounded.sm}"
    padding: "0 18px"
    height: "44px"
  button-hero-secondary:
    backgroundColor: "rgba(255, 255, 255, 0.03)"
    textColor: "rgba(255, 255, 255, 0.88)"
    rounded: "{rounded.sm}"
    padding: "0 18px"
    height: "44px"
  product-card:
    backgroundColor: "{colors.product-card}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "0"
  product-card-body:
    backgroundColor: "{colors.product-card}"
    textColor: "{colors.text-primary}"
    rounded: "0"
    padding: "12px 14px 14px"
  product-chip:
    backgroundColor: "rgba(0, 0, 0, 0.55)"
    textColor: "rgba(255, 255, 255, 0.92)"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
---

# Design System: Velora Market

## Overview

**Creative North Star: "The Orange Spotlight"**

Velora Market reads as a premium dark SaaS storefront, not a gaming shop. The page is pure black; a single warm orange spotlight blooms behind the hero headline, grid-textured like SUBSCRIPTO. Typography pairs Arial Normal (clarity, speed) with Playfair Display Italic on the second headline line (confidence, delivery promise). Below the fold, UI mocks prove the product: a hero dashboard panel, distinct flow mocks in how-it-works and features, and a unified product catalog grid with square media tiles.

The system rejects light SaaS defaults, neon gaming aesthetics, and AI landing-page scaffolding (metric heroes, eyebrow kickers on every section, cream backgrounds). Depth comes from tonal layering and the spotlight — not decorative glass or wide drop shadows on bordered cards. Homepage sections alternate void black and `#0e0e0e` bands from the third section onward; hero and how-it-works stay black for panel handoff.

**Key Characteristics:**

- Drenched black canvas with one committed orange accent
- Centered hero stack: sans line → serif italic line → subcopy → CTAs → dashboard mock
- Section UI mocks via shared `vl-flow-spot` spotlight + `vl-flow-panel` (each card uses a different pattern)
- Product cards: unified case (`#161616`), 1:1 media flush top, title + price inside same container, whole card clickable
- Responsive product grid: 1 col (≤479px) → 2 → 3 (≥768px) → 4 (≥1200px)
- Sticky nav with optical center grid; one orange rectangle CTA only
- Flat cards (10–14px radius); no ghost-card pattern

## Colors

The palette is monochrome black/gray with one saturated orange family and a green stock signal.

### Primary

- **Signal Orange** (`#F99926`): Nav CTA hover accents, prices on product cards, FAQ links — `--vl-accent`.
- **Hot Orange** (`#ff7a00`): Hero primary button, spotlight core, nav CTA fill — `--vl-nav-cta-bg`.
- **CTA Gradient** (`#ffb038` → `#ff8012` → `#e87200`): Hero primary and checkout buttons only; not on catalog cards.

### Neutral

- **Void Black** (`#000000`): Page background, hero — `--vl-bg`.
- **Section Alt** (`#0e0e0e`): Alternating homepage bands from section 3 — `--vl-section-alt`.
- **Product Card** (`#161616`): Unified product tile shell — `--vl-product-card`.
- **Product Media** (`#121212`): Image area inside card — `--vl-product-media`.
- **Surface Charcoal** (`#0a0a0a` / `#111111`): Panels, mocks — `--vl-surface`, `--vl-card`.
- **Primary Text** (`#fafafa`): Headlines, nav brand — `--vl-text`.
- **Muted Text** (`rgba(255, 255, 255, 0.68)` minimum on body): Nav links, section subcopy — `--vl-muted`.
- **Price Orange** (`#F99926`): Product price on cards — `.ps-product-price`.
- **Hairline Border** (`rgba(255, 255, 255, 0.1)`): Cards, search bar — `--vl-border`.

### Status

- **In Stock Green** (`#4ade80`): Flow mock live indicators only; catalog stock uses dark pill on image (`X in stock`).

### Named Rules

**The One Voice Rule.** Orange appears on ≤10% of any screen outside the hero spotlight zone and primary CTAs. Its rarity outside those zones is the point.

**The Spotlight Rule.** The hero light stack and `vl-flow-spot` haze are the only places orange fills large ambient area. Do not replicate full-width orange bands in prose sections.

**The Unified Card Rule.** Product image, title, and price live inside one bordered container. Never float title or price on the page background below a separate media box.

## Typography

**Display Sans:** Arial, Helvetica, sans-serif  
**Display Serif:** Playfair Display (Google Fonts), Georgia fallback  
**Body / UI:** Arial Normal (400)  
**Catalog UI:** Inter (400–700) for product grid, search, reviews, FAQ

**Character:** Utilitarian sans for speed and trust; serif italic for the hero emotional payoff line only. Inter on the catalog for crisp product names and prices at small sizes.

### Hierarchy

- **Display Sans** (400, clamp 1.75–2.625rem, lh 1.08): Hero line 1 — `.vl-hero-sans`. `text-wrap: balance`.
- **Display Serif** (400 italic, clamp 1.5–2.125rem, lh 1.14): Hero line 2 — `.vl-hero-serif`.
- **Section Title** (400, clamp 1.75–2.625rem): Products, features, FAQ heads.
- **Body** (400, 14–15px, lh 1.55–1.65): `.vl-products-sub`, `.vl-hero-sub`. `text-wrap: pretty`.
- **Product Name** (700, 15px, Inter): Card titles — `.ps-product-name`, 2-line clamp.
- **Product Price** (700, 16px, Inter): `.ps-product-price` in `--vl-accent`.
- **Label** (400–600, 11–13px): Nav links, stock chips, search input.

### Named Rules

**The −0.04em Floor Rule.** Display letter-spacing never tighter than −0.04em. Hero/section sans uses −0.03em; serif −0.02em.

**The Pairing Rule.** Playfair Italic is reserved for the hero second line only. Do not use in nav, buttons, section headings, or product cards.

**The Inter Catalog Rule.** Inter is used for product grid, search, reviews marquee, and FAQ body — not for hero or section display lines.

## Elevation

This system is **flat by default**. Depth is conveyed through:

1. Tonal layering (void → `#0e0e0e` band → `#161616` product card)
2. The hero orange spotlight (radial gradients, shared arc mask with grid)
3. Flow panel spotlight (`.vl-flow-spot__haze` / `__core`) — localized orange bloom behind section mocks
4. Product card hover: `translateY(-2px)` + orange border tint; no box-shadow at rest

### Shadow Vocabulary

- **Dashboard depth** (`0 40px 100px rgba(0,0,0,0.7)`): Hero mock panel only; not on product cards.
- **Media glow** (radial gradient `::after` on `.ps-product-media`): Orange bloom at image bottom on hover; not a box-shadow.

### Named Rules

**The Flat-By-Default Rule.** No `box-shadow` blur ≥16px combined with 1px decorative border on the same element at rest. Pick border OR shadow.

## Components

### Buttons

- **Shape:** Hero + nav CTAs use 10px radius (`--vl-btn-radius`); not full pills on hero (square-soft per DA).
- **Primary (hero):** Gold gradient fill, dark text `#1a1000`, 44px min-height.
- **Secondary (hero):** `rgba(255,255,255,0.03)` fill, ghost border.
- **Nav primary:** `#FF7500` fill, 44px on mobile, 10px radius.

### Product Cards

- **Shell:** Unified case — `#161616` background, 1px `--vl-border`, 14px radius (`--vl-product-radius`), `overflow: hidden`.
- **Media:** 1:1 aspect ratio, flush top, `object-fit: contain`, subtle orange radial glow at bottom on hover.
- **Stock chip:** Top-right pill on image — `rgba(0,0,0,0.55)` + blur; OOS chip in `#ff8a8a`.
- **Body:** 12px 14px 14px padding; 15px bold title (2-line clamp); 16px bold price in accent orange.
- **Interaction:** Entire card is one `<a>` (in stock); hover lifts 2px + border tint; `:active` resets lift; `:focus-visible` orange outline. OOS: non-interactive `div`, grayscale media, reduced opacity.
- **Grid:** `repeat(2, 1fr)` default → 3 cols ≥768px → 4 cols ≥1200px; 1 col ≤479px; max-width 1280px; gap 14–16px.

### Flow Mocks (How it works / Features)

- **Spotlight:** `.vl-flow-spot` with `__haze` + `__core` radial orange.
- **Panel:** `.vl-flow-panel` dark shell, 1px `rgba(255,255,255,0.08)` border, 12px radius.
- **Responsive:** 3 cols desktop → 2 cols tablet (768–991px) → 1 col mobile.
- **Patterns (one per card):** distinct mock per card — never repeat in one section.

### Cards / Containers

- **Corner Style:** 10px buttons/badges; 12px general cards; 14px product cards and hero mock.
- **Background:** `#161616` product cards; `#0a0a0a` flow panels.
- **Internal Padding:** 12–14px on product body; 14–22px on dashboard blocks.

### Navigation

- **Style:** Sticky, transparent on homepage hero, solid dark on scroll paths, 1px bottom border.
- **Layout:** CSS grid `1fr auto 1fr` ≥992px — logo left, links centered, actions right.
- **Mobile:** Hamburger panel, 44px touch targets, full-width CTAs in drawer.

### Hero Spotlight (signature)

- **Layers:** `.vl-hero-light__arc`, grid masks, shared spotlight variables.
- **Dashboard mock:** Decorative only — badge reads **Preview**, panel has `aria-hidden="true"`; never imply live telemetry.
- **Responsive:** Compact copy + shorter mock on ≤767px; landscape height cap on short viewports.

### Footer

- **Layout:** 4-column grid desktop (1.6fr brand + 3 link columns) → 2 cols tablet → 1 col mobile.
- **Background:** Void black (`--vl-bg`), hairline top border (`--vl-border`).
- **Typography:** Inter for links and body; Arial for shop name; column titles uppercase at 48% white opacity.
- **Social buttons:** Ghost outline (`--vl-border`), 44px min-height; platform tint on hover only — no filled brand blocks at rest.
- **Styles:** All rules live in `velora.css` under `.velora-home-page footer.nexus-footer` — no inline `<style>` in component.

## Do's and Don'ts

### Do:

- **Do** use `--vl-*` tokens from `themes/156746/assets/velora.css` for all new sections.
- **Do** keep product image, title, and price inside one `.ps-product-card` container.
- **Do** use Inter for catalog/reviews/FAQ UI; Arial for hero and section display.
- **Do** respect responsive grid breakpoints (1/2/3/4 columns).
- **Do** verify muted text ≥4.5:1 contrast on black (`--vl-muted` ≥ 0.68 opacity).
- **Do** use sentence-case section leads (`.vl-reviews-lead`) — not uppercase accent eyebrows on reviews.
- **Do** label hero dashboard mock as **Preview** and keep it `aria-hidden`.

### Don't:

- **Don't** look like a dark neon gaming shop with RGB glow and aggressive gradients.
- **Don't** use generic AI SaaS patterns: cream body, metric hero, uppercase eyebrow on every section.
- **Don't** split product title/price outside the card container onto page background.
- **Don't** pair 1px border with wide soft box-shadow on cards (ghost-card).
- **Don't** use separate orange gradient CTA buttons on catalog cards — the card itself is the CTA.
- **Don't** use wireframe/skeleton placeholders in section mocks.
- **Don't** revert to produce.so light blue canvas without explicit request.
- **Don't** use inline styles in `footer.njk` — footer tokens belong in `velora.css`.
- **Don't** use "Live" badges or pulsing status dots on decorative mocks.
