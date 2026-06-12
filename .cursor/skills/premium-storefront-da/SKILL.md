---
name: premium-storefront-da
description: >-
  Generic premium dark storefront design system — colors, soft geometry (10/12px),
  typography, spotlight, components, motion language. Platform-agnostic. Use when
  building any digital shop, SaaS landing, or admin UI that needs dark void + single
  accent + pro soft UI. No client-specific names in content.
---

# Premium Storefront — Design System

**Scope :** identité visuelle réutilisable — site, dashboard, admin, landing.

**SellAuth plumbing :** `.cursor/skills/beautiful-mysellauth-themes/`

**Modules :**
| Fichier | Contenu |
|---------|---------|
| [forms-and-shapes.md](forms-and-shapes.md) | Formes, silhouettes, composition |
| [motion-language.md](motion-language.md) | Vitesse, easing, durées |
| [tokens.json](tokens.json) | Tokens machine-readable |

---

## 1. Principes

1. **Void first** — fond `#000` ou off-white dominant
2. **Un accent** — une teinte chaude ou froide, pas de second brand color
3. **Soft geometry** — 10px boutons, 12px cards, pas pill sur CTA
4. **Glow sparse** — spotlight hero + un CTA glow max
5. **Dual typo** — sans UI + serif/display une ligne max
6. **Peek mock** — panel app sous le fold

---

## 2. Couleurs (dark default)

| Token | Value | Usage |
|-------|-------|-------|
| bg | `#000000` | Page |
| section-alt | `#0e0e0e` | Bandes alternées |
| surface | `#0a0a0a` | Zones relevées |
| card | `#111111` | Cards |
| text | `#fafafa` | Titres |
| muted | `rgba(255,255,255,0.55)` | Body |
| accent | custom | CTA, links |
| border | `rgba(255,255,255,0.1)` | Inputs, panels |

Gradients headline : blanc → gris clair (`background-clip: text`).

CTA primary : gradient vertical accent + bordure semi-transparente + glow externe.

---

## 3. Formes

→ Détail : [forms-and-shapes.md](forms-and-shapes.md)

| Élément | Radius |
|---------|--------|
| Boutons, badges | 10px |
| Cards, panels | 12px |
| Micro bars 4px | 999px OK |

---

## 4. Typographie

| Rôle | Stack |
|------|-------|
| UI | Arial, Helvetica, sans-serif |
| Display | Playfair Display, Georgia, serif |

Hero : `clamp()` sizes, tracking `-0.02em` à `-0.03em`.

---

## 5. Composants

### Bouton primary
- 38×px height, padding `0 18px`, radius 10px
- Texte foncé sur accent clair
- Hover `translateY(-1px)` + glow (hero only)

### Bouton ghost
- `rgba(255,255,255,0.03)` bg, border `0.14` alpha
- Pas de glow

### Navbar
- 56px height, grid `1fr auto 1fr`
- Logo gauche, liens centrés viewport, actions droite

### Cards
- Border `rgba(255,255,255,0.06–0.1)`, radius 12px
- Shadow large shells only : `0 32px 64px rgba(0,0,0,0.55)`

---

## 6. Motion

→ [motion-language.md](motion-language.md) + `beautiful-mysellauth-themes/module-animations.md`

- Lent, fluide, `cubic-bezier(0.16, 1, 0.3, 1)`
- Mocks feature ~8–12s, scroll-gated
- Pas bounce/elastic

---

## 7. CSS variables template

```css
:root {
  --ps-bg: #000000;
  --ps-surface: #0a0a0a;
  --ps-card: #111111;
  --ps-text: #fafafa;
  --ps-muted: rgba(255, 255, 255, 0.55);
  --ps-accent: #ff8012;
  --ps-accent-glow: rgba(255, 128, 18, 0.35);
  --ps-radius-btn: 10px;
  --ps-radius-card: 12px;
  --ps-container: min(1200px, 94vw);
}
```

---

## 8. Anti-patterns ❌

| Éviter | Pourquoi |
|--------|----------|
| Pill CTA | Gaming / dated |
| Second accent color | Bruit visuel |
| Glow every card | Cheap |
| 16px+ card radius | Conflit soft pro |
| Light theme sans demande | Default = dark |

---

## 9. Checklist agent

1. Lire ce skill + module formes si layout nouveau
2. Mapper composants aux specs §5
3. SellAuth → beautiful-mysellauth-themes pour Nunjucks/CLI
4. Timings mocks → TIMING object ~25s, pas reduce crush
