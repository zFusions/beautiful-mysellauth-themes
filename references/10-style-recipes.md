# Style recipes — complete build kits

Full token + font + hero + mock kits per style. Agent copies recipe, adapts copy, ships.

When user asks for a **gaming neon shop** (any language) → run [11-client-brief-kb.md](11-client-brief-kb.md) interview in the user's language, write **DESIGN.md** with **Recipe R3** tokens, then build. Do not improvise fonts or colors.

---

## Recipe R3 — Gaming neon PREMIUM (not cheap)

### What cheap gaming looks like (AVOID)

- Orbitron everywhere, ALL CAPS, #00ff00 on #000
- Scanlines, matrix rain, 5 neon colors
- Pill buttons, excessive text-shadow glow
- Arial / system fonts
- Clip-art controller icons

### What premium gaming looks like (TARGET)

- Void navy `#050508` / `#08080f` — not harsh `#000`
- **One** neon accent (green `#39ff14`, cyan `#00e5ff`, or magenta `#ff2bd6`)
- Clean **Plus Jakarta Sans** body + **Syne** headlines
- **JetBrains Mono** terminal mocks only
- Subtle grid 32px at 4% opacity — no scanlines
- 8px radius, border `rgba(accent, 0.15)` on cards
- Glow: accent at 25–35% opacity, blur 40–60px — **one** hero bloom max
- Hero peek mock (inventory or terminal) — same architecture as SaaS

### Tokens

```css
:root {
  --t-bg: #050508;
  --t-surface: #0c0c14;
  --t-section-alt: #08080f;
  --t-card: #0f0f18;
  --t-text: #f0f0f5;
  --t-muted: rgba(240, 240, 245, 0.58);
  --t-text-faint: rgba(240, 240, 245, 0.38);

  --t-accent: #39ff14;
  --t-accent-hover: #5cff42;
  --t-accent-glow: rgba(57, 255, 20, 0.32);
  --t-accent-soft: rgba(57, 255, 20, 0.12);
  --t-accent-rgb: 57, 255, 20;
  --t-text-on-accent: #041004;

  --t-border: rgba(255, 255, 255, 0.08);
  --t-border-subtle: rgba(255, 255, 255, 0.05);
  --t-border-accent: rgba(57, 255, 20, 0.18);

  --t-radius-btn: 8px;
  --t-radius-card: 10px;

  --t-font-ui: "Plus Jakarta Sans", system-ui, sans-serif;
  --t-font-display: "Syne", system-ui, sans-serif;
  --t-font-mono: "JetBrains Mono", ui-monospace, monospace;

  --mock-line-dur: 0.32s;
  --t-ease: cubic-bezier(0.16, 1, 0.3, 1);
}
```

Cyan variant: `--t-accent: #00e5ff;` `--t-accent-rgb: 0, 229, 255;` `--t-text-on-accent: #001018;`

### Fonts (master.njk)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Syne:wght@600;700&display=swap" rel="stylesheet">
```

### Hero (gaming)

- Background: vignette radial `#000` edges + **subtle grid** (not green flood)
- Accent bloom: **one** elliptical glow top-center, opacity controlled
- Title: Syne 700, `-0.03em`, optional `.t-gradient--neon` (white → accent hint)
- Sub: Plus Jakarta 400, muted — **sentence case**
- CTAs: primary solid accent + dark text; secondary ghost with `--t-border-accent`

```css
.t-hero-light__grid {
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 20%, transparent 70%);
}
.t-hero-light__haze {
  background: radial-gradient(ellipse 80% 60% at 50% 0%,
    rgba(var(--t-accent-rgb), 0.35) 0%, transparent 65%);
  filter: blur(64px);
}
.t-btn-primary {
  background: var(--t-accent);
  color: var(--t-text-on-accent);
  box-shadow: 0 0 20px var(--t-accent-glow);
  border: 1px solid rgba(var(--t-accent-rgb), 0.5);
}
```

### Feature mocks (gaming shop)

| Card | Mock | Content idea |
|------|------|--------------|
| 1 | feed | License key redeemed, item unlocked logs |
| 2 | list | Cart: game key, DLC, boost |
| 3 | meters | Server status / download progress |

Mono font in mocks. Green success lines — not rainbow.

### Feature card styling

```css
.t-feature-card {
  border: 1px solid var(--t-border-accent);
  background: var(--t-surface);
  box-shadow: 0 0 0 1px rgba(var(--t-accent-rgb), 0.04);
}
.t-feature-card:hover {
  border-color: rgba(var(--t-accent-rgb), 0.28);
}
```

Top spot glow: low opacity accent radial — same pattern as SaaS, accent color swapped.

### Motion

Same stack as all themes. No extra glitch effects. Optional: very subtle border pulse on hero CTA hover only.

### Copy tone

Professional gaming commerce — not "EPIC WINZ". Example hero sub: *"Instant delivery. Pay with card, crypto, or PayPal."*

---

## Recipe R1 — Pro SaaS dark (default)

### Target look

- Pure black canvas, **one** warm or cool accent (indigo, orange, violet)
- DM Sans body + Instrument Serif on **one** hero line optional
- 2-layer spotlight + subtle grid behind hero
- 10/12px radius, no pill CTAs on hero
- Mocks: feed, list, meters

### Tokens

```css
:root {
  --t-bg: #000000;
  --t-surface: #0a0a0a;
  --t-section-alt: #0e0e0e;
  --t-card: #111111;
  --t-text: #fafafa;
  --t-muted: rgba(255, 255, 255, 0.58);
  --t-text-faint: rgba(255, 255, 255, 0.35);

  --t-accent: #6366f1;
  --t-accent-hover: #818cf8;
  --t-accent-glow: rgba(99, 102, 241, 0.35);
  --t-accent-soft: rgba(99, 102, 241, 0.18);
  --t-accent-rgb: 99, 102, 241;
  --t-text-on-accent: #0a0a1a;

  --t-border: rgba(255, 255, 255, 0.1);
  --t-border-subtle: rgba(255, 255, 255, 0.06);

  --t-radius-btn: 10px;
  --t-radius-card: 12px;

  --t-font-ui: "DM Sans", system-ui, sans-serif;
  --t-font-display: "Instrument Serif", Georgia, serif;

  --mock-line-dur: 0.32s;
  --t-ease: cubic-bezier(0.16, 1, 0.3, 1);
}
```

Orange accent variant: `--t-accent: #f99926;` `--t-accent-rgb: 249, 153, 38;` `--t-text-on-accent: #1a1000;`

### Fonts (master.njk)

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
```

### Hero

- Spotlight: 2 radial blurs (haze + core), accent at 25–35% opacity
- Optional serif italic on hero line 2 only
- Peek mock: dashboard / order status panel below fold

---

## Recipe R4 — Light shop blue

- Fonts: Inter only or Inter + Fraunces hero
- bg `#f8f9fb`, accent `#2563eb`
- Hero: blue wash 6%, white cards shadow-sm
- No neon glow
- Mocks: list, stats, meters

---

## Recipe R5 — Corporate white-blue

- Fonts: IBM Plex Sans
- bg `#ffffff`, accent `#1d4ed8`
- Sharp 10px radius, minimal motion
- Mocks: stats, meters, grid

---

## Recipe R6 — Luxury dark gold

- Fonts: Inter + Cormorant Garamond
- bg `#0a0a0a`, accent `#c9a227`
- No heavy glow — gold border 0.2 opacity
- Mocks: preview, stats, grid

---

## Recipe R7 — Glassmorphism product register (PDP/cart DA)

Use when landing is premium dark (R1/R3/R6) but shop pages need **Nebula PDP + glass cards** — proven on Velora 156746.

### What it adds (on top of landing recipe)

- Separate `shop-pdp.css` — PDP single source of truth (see [07-shop-pages.md](07-shop-pages.md))
- Nebula two-column layout: media + accordions | sticky buy rail
- Glass surfaces: `rgba(255,255,255,0.035)` + `backdrop-filter: blur(22px) saturate(145%)`
- Top-edge accent gradient line on cards (`::after`)
- Ambient radial wash behind PDP/cart sections
- **Dual-font product register:** system/Arial body + **Inter** for title, price, CTAs

### Product-register tokens (add to theme.css or shop-pdp.css)

```css
:root {
  --t-font-product: Inter, system-ui, -apple-system, "Segoe UI", sans-serif;
  --t-pdp-card-bg-glass: rgba(255, 255, 255, 0.035);
  --t-pdp-radius: 14px;
  --t-stock-green: #4ade80;
}
```

Load Inter in master.njk even when landing uses DM Sans / Syne:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&display=swap" rel="stylesheet">
```

### Volume discount UI

Alpine `productForm` with reactive `totalPrice`, tier nudge meter, strikethrough — full spec in [07-shop-pages.md](07-shop-pages.md#volume-discount--price-sync-alpinejs).

### When to use

| Signal | Action |
|--------|--------|
| User wants "premium PDP", "glass cards", "Nebula layout" | R7 on shop pages |
| Digital goods with qty tiers / bulk discount | R7 + volume discount getters |
| Simple shop, no custom PDP | R1/R3 landing + basic shop-pages.css only |

**Do not** apply glass blur to landing hero — keep glass for product register only.

---

## Recipe selection map

| User prompt keywords | Recipe |
|---------------------|--------|
| gaming, neon, crypto, cyber, esports | **R3** (+ R7 for PDP if premium shop) |
| saas, pro, dark, startup | R1 (+ R7 optional) |
| glass PDP, nebula product page, premium cart | **R7** |
| light, clean, minimal shop | R4 |
| corporate, blue, white, business | R5 |
| luxury, gold, premium | R6 (+ R7 optional) |
| sober, minimal dark | S2 in 01-discovery |

**Always load fonts from recipe before CSS. Product register may add Inter via R7.**
