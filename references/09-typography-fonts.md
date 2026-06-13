# Typography & fonts — mandatory for every theme

**Never ship default system fonts alone** (Arial, Times, generic sans). Every theme loads **curated Google Fonts** with a defined pairing before writing CSS.

---

## Iron rules

1. **Max 2 families** on landing (display + UI). Mono is a **third exception** for mock terminals only. A **fourth exception** — product font (e.g. Inter) — applies only on PDP/cart (`product` register); see [Product register split](#product-register-split-pdpcart) below.
2. **Load via Google Fonts** in `master.njk` with `preconnect` + `display=swap`.
3. **Subset weights** — only load what you use (400, 500, 600, 700 — not every weight).
4. **Body = highly readable sans** — never a display/gaming font for paragraphs.
5. **Display font = headlines only** — hero H1, section titles, optional brand wordmark.
6. **Letter-spacing:** titles `-0.02em` to `-0.04em`. Body `-0.01em`. Never positive tracking on body.
7. **No ALL CAPS** except tiny badges (11px max). Gaming ≠ screaming caps everywhere.
8. **Mono** only inside mock UI / code blocks — not nav or product titles.

---

## Forbidden fonts (instant cheap look)

| Never use for UI | Why |
|------------------|-----|
| Comic Sans, Papyrus, Impact | Joke fonts |
| Orbitron / Audiowide / Press Start 2P / Rajdhani **anywhere on gaming** | 2010 arcade cliche — use **Syne** display instead |
| System default only | Generic AI slop |
| More than 2 sans families | Visual noise |
| Bold 900 on everything | Heavy, amateur |
| Italic display font on body | Unreadable |

**Gaming neon (S3 / R3):** Syne headlines + Plus Jakarta body + JetBrains Mono mocks. **No Orbitron, no Rajdhani, no ALL CAPS hero.**

## Pairing catalog (pick ONE row per theme)

### S1 — Pro SaaS dark

| Role | Font | Weights |
|------|------|---------|
| UI / body | **Geist** or **Inter** or **DM Sans** | 400, 500, 600 |
| Display (optional 1 hero line) | **Playfair Display** italic OR **Instrument Serif** | 400, 500 |

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
```

```css
:root {
  --t-font-ui: "DM Sans", system-ui, sans-serif;
  --t-font-display: "Instrument Serif", Georgia, serif;
}
```

### S2 — Pro sober

| Role | Font | Weights |
|------|------|---------|
| All UI | **IBM Plex Sans** or **Source Sans 3** | 400, 500, 600 |

No display serif. Tight, editorial.

### S3 — Gaming / neon premium ⭐

**NOT cheap neon:** clean geometric body + controlled display accent.

| Role | Font | Weights | Notes |
|------|------|---------|-------|
| UI / body | **Plus Jakarta Sans** or **Space Grotesk** (body weight) | 400, 500, 600 | Readable, modern |
| Display / hero | **Syne** or **Space Grotesk** 700 | 600, 700 | Strong, not cartoon |
| Mono (mocks) | **JetBrains Mono** | 400, 500 | Terminal only |

**Alternative premium gaming pair:**
- Body: **Outfit** 400–500
- Display: **Chakra Petch** 600 (titles only — subtle tech, not arcade)

```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Syne:wght@600;700&display=swap" rel="stylesheet">
```

```css
:root {
  --t-font-ui: "Plus Jakarta Sans", system-ui, sans-serif;
  --t-font-display: "Syne", system-ui, sans-serif;
  --t-font-mono: "JetBrains Mono", ui-monospace, monospace;
}
.t-hero-title { font-family: var(--t-font-display); font-weight: 700; letter-spacing: -0.03em; }
.t-section-title { font-family: var(--t-font-display); font-weight: 600; letter-spacing: -0.02em; }
body, .t-nav-links, .t-btn { font-family: var(--t-font-ui); }
.t-mock-stage, .t-mock-chrome { font-family: var(--t-font-mono); font-size: 11px; }
```

### S4 — Light shop

| Role | Font |
|------|------|
| UI | **Inter** or **Geist** |
| Display | Same as UI (no second family) OR **Fraunces** for one hero line |

### S5 — Corporate white-blue

| Role | Font |
|------|------|
| UI | **IBM Plex Sans** |
| Display | **IBM Plex Sans** 600 — no second family needed |

### S6 — Luxury dark

| Role | Font |
|------|------|
| UI | **Helvetica Neue**, **Neue Haas Grotesk**, fallback **Inter** |
| Display | **Cormorant Garamond** or **Libre Baskerville** |

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@400;500&display=swap" rel="stylesheet">
```

### S7 — Cyberpunk / dual neon (advanced)

| Role | Font |
|------|------|
| UI | **Space Grotesk** 400–500 |
| Display | **Syncopate** 700 (sparingly — hero only) |
| Mono | **IBM Plex Mono** |

Use dual accent only if user explicitly wants cyberpunk. Still one primary CTA color.

---

## Type scale (use clamp — never fixed px only)

```css
.t-hero-title {
  font-size: clamp(2rem, 2.4vw + 0.75rem, 3.5rem);
  line-height: 1.08;
  font-weight: 700;
  letter-spacing: -0.03em;
}
.t-section-title {
  font-size: clamp(1.5rem, 1.8vw + 0.5rem, 2.25rem);
  line-height: 1.12;
  font-weight: 600;
  letter-spacing: -0.02em;
}
.t-section-sub, .t-hero-sub {
  font-size: clamp(0.9375rem, 0.5vw + 0.85rem, 1.0625rem);
  line-height: 1.55;
  font-weight: 400;
  color: var(--t-muted);
}
.t-nav-links { font-size: 13px; font-weight: 500; }
.t-btn { font-size: 14px; font-weight: 600; letter-spacing: -0.01em; }
```

---

## master.njk font loading pattern

```nunjucks
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet" id="theme-font">

<style>
  :root {
    --bs-font-sans-serif: var(--t-font-ui);
    --bs-body-font-family: var(--t-font-ui);
  }
  html { font-family: var(--t-font-ui); }
  body { font-synthesis: none; text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; }
</style>
```

**Self-hosting (optional premium):** download woff2 → `assets/fonts/` → `@font-face` in theme.css → upload via binary script. Use when user wants zero Google dependency.

---

## Binary font upload (SellAuth)

After adding woff2 files:

```bash
node scripts/upload-theme-binaries.mjs --theme {ID}
```

```css
@font-face {
  font-family: "Custom Sans";
  src: url("CustomSans.woff2") format("woff2");
  font-weight: 400 700;
  font-display: swap;
}
```

Path in CSS must match SellAuth asset URL pattern.

---

## Gradient text (display only)

```css
.t-hero-title .t-gradient {
  background: linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.75) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
/* Gaming: optional subtle accent tint in gradient — not full rainbow */
.t-hero-title .t-gradient--neon {
  background: linear-gradient(180deg, #fff 0%, var(--t-accent) 120%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

Never gradient on body paragraphs.

---

## Product register split (PDP/cart)

Landing and shop pages may use different registers. Document both in DESIGN.md.

| Register | Body / labels | Commerce (title, price, buttons) |
|----------|---------------|----------------------------------|
| `brand` (landing) | Google Fonts UI (`--t-font-ui`) | Display font on hero/sections only |
| `product` (PDP/cart) | System sans or Arial (`--font-body`) | **Inter** or dedicated `--t-font-product` |

```css
/* shop-pdp.css — scoped to product wrapper */
.product-wrapper.t-pdp {
  --t-pdp-font: var(--font-body, var(--t-font-ui, system-ui, sans-serif));
  --t-pdp-font-product: var(--t-font-product, Inter, system-ui, sans-serif);
  font-family: var(--t-pdp-font);
}
.t-pdp-title,
.t-pdp-price,
.t-pdp-form .btn { font-family: var(--t-pdp-font-product); }
```

**Rules:**
- Inter (or product font) on H1 title, price, qty, CTAs — never on long description body
- Accordion / trust / stock labels stay on body/system font
- Load product font in master.njk even when landing uses different families
- Recipe R7 in [10-style-recipes.md](10-style-recipes.md) ships this stack

**Anti-pattern:** Using display font (Syne, Instrument Serif) on PDP price — too decorative for commerce.

---

## Agent checklist (typography)

- [ ] Google Fonts link in master.njk with preconnect
- [ ] `--t-font-ui` and `--t-font-display` in :root
- [ ] Body uses UI font only (landing)
- [ ] Hero/section titles use display font
- [ ] Mono scoped to mocks
- [ ] `--t-font-product` documented if PDP uses Inter split
- [ ] clamp() sizes applied
- [ ] No forbidden fonts on landing
- [ ] Weights limited to 3–4 max in URL

See also: [10-style-recipes.md](10-style-recipes.md) for full gaming neon recipe; [07-shop-pages.md](07-shop-pages.md) for PDP font wiring.
