# Design system — complete reference

One `theme.css` file. Prefix every class (`t-`, `shop-`, etc.).

## `:root` token sheet

```css
:root {
  /* Surfaces */
  --t-bg: #000000;
  --t-surface: #0a0a0a;
  --t-section-alt: #0e0e0e;
  --t-card: #111111;

  /* Text opacity scale */
  --t-text: #fafafa;
  --t-muted: rgba(255, 255, 255, 0.55);
  --t-text-faint: rgba(255, 255, 255, 0.35);
  --t-text-whisper: rgba(255, 255, 255, 0.22);

  /* Accent */
  --t-accent: #6366f1;
  --t-accent-hover: #818cf8;
  --t-accent-glow: rgba(99, 102, 241, 0.35);
  --t-accent-soft: rgba(99, 102, 241, 0.18);
  --t-text-on-accent: #0a0a1a;

  /* Borders */
  --t-border: rgba(255, 255, 255, 0.1);
  --t-border-subtle: rgba(255, 255, 255, 0.06);
  --t-border-hover: rgba(255, 255, 255, 0.16);

  /* Geometry */
  --t-radius-btn: 10px;
  --t-radius-card: 12px;
  --t-radius-xs: 4px;

  /* Layout */
  --t-container: min(1200px, 94vw);
  --t-nav-h: 56px;

  /* Typography */
  --t-font-ui: Arial, Helvetica, sans-serif;
  --t-font-display: 'Playfair Display', Georgia, serif;

  /* Motion */
  --mock-line-dur: 0.45s;
  --mock-meter-dur: 2s;
  --t-ease: cubic-bezier(0.16, 1, 0.3, 1);

  /* Hero tune (panel only) */
  --t-hero-mock-top: clamp(430px, 54vh, 580px);
  --t-hero-mock-footprint: clamp(380px, 44vh, 480px);
}
```

Light theme: invert bg/text/border. Divide `--t-accent-glow` opacity by 2–3.

## Spotlight hero (dark SaaS)

Layer stack:

```html
<div class="t-hero-light">
  <div class="t-hero-light__arc">
    <div class="t-hero-light__haze"></div>
    <div class="t-hero-light__core"></div>
    <div class="t-hero-light__grid"></div>
  </div>
</div>
```

```css
.t-hero-light__haze {
  position: absolute;
  inset: -20% -30% 40%;
  background: radial-gradient(ellipse 80% 60% at 50% 0%,
    rgba(var(--t-accent-rgb), 0.5) 0%, transparent 70%);
  filter: blur(72px);
  pointer-events: none;
}
.t-hero-light__core {
  /* tighter, brighter — blur 44px */
}
.t-hero-light__grid {
  /* 32px SVG checker, mix-blend-mode: soft-light, opacity ~0.45 */
  mask-image: linear-gradient(180deg, #000 0%, transparent 85%);
}
```

Rules:
- Max **2** blur glow layers
- Light stops **above** CTAs — not behind dashboard mock
- Side vignette optional on `::after`

## Panel backlight (feature cards + hero mock)

Elliptical gradients **behind** panel — not orange box-shadow on panel:

```css
.t-panel-glow__haze { filter: blur(56px); }
.t-panel-glow__core { filter: blur(38px); }
/* clip-path cuts bottom of glow at panel edge */
```

## Buttons

```css
.t-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  padding: 0 18px;
  border-radius: var(--t-radius-btn);
  font: 500 14px/1 var(--t-font-ui);
  letter-spacing: -0.01em;
  color: var(--t-text-on-accent);
  background: linear-gradient(180deg, color-mix(in srgb, var(--t-accent) 80%, white) 0%,
    var(--t-accent) 42%, color-mix(in srgb, var(--t-accent) 80%, black) 100%);
  border: 1px solid color-mix(in srgb, var(--t-accent) 60%, white);
  box-shadow: 0 0 24px var(--t-accent-glow);
  transition: transform 0.15s ease, box-shadow 0.2s ease;
}
.t-btn-primary:hover { transform: translateY(-1px); }
.t-btn-ghost {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.88);
  box-shadow: none;
}
```

Gaming variant: solid neon, `text-shadow` optional. Sober: flat white/black, no gradient.

## Headline gradient text

```css
.t-hero-title .t-display {
  background: linear-gradient(180deg, #fff 0%, #ededed 52%, #c9c9c9 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

Body text: flat `--t-muted` — no gradient on paragraphs.

## Product cards

```css
.t-product-card {
  border-radius: 14px;
  border: 1px solid var(--t-border-subtle);
  background: var(--t-card);
  transition: border-color 0.2s ease, transform 0.2s ease;
}
.t-product-card:hover {
  border-color: var(--t-border-hover);
  transform: translateY(-2px);
}
```

Stock badge: small rounded rect 10px, not pill.

## Section alternation

```css
.t-section--alt { background: var(--t-section-alt); }
```

Hero + how-it-works often share `#000`. Features/reviews alternate.

## Container

```css
.t-container {
  width: var(--t-container);
  margin-inline: auto;
  padding-inline: clamp(12px, 3vw, 20px);
}
```

## Focus & a11y

```css
:focus-visible {
  outline: 2px solid var(--t-accent);
  outline-offset: 2px;
}
```

Min touch 44×44 on mobile nav toggle.
