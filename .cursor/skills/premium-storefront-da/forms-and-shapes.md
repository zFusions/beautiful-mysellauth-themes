# Formes & composition — Premium storefront

Référence visuelle générique. Lire avant de choisir radius, glow, ou composer une section.

---

## Philosophie

**Carré doux** = pro SaaS 2024–2026. Pas pill, pas blob gaming.

| Intention | Forme |
|-----------|-------|
| Actions | Rectangle 10px |
| Contenu | Panel 12px |
| Accent | Glow circulaire diffus (1 par zone) |
| Preuve produit | Mock type app/dashboard |

---

## Grille radius

```
Micro (dots, barres 4px)     → 4px
Boutons, badges, inputs      → 10px
Cards, panels, modals        → 12px
Barres progress h=4px        → 999px OK
```

---

## Silhouettes

### Spotlight hero
```
     arc haze (blur 72px)
        core (blur 44px)
           grille 32×32
         [ copy + CTAs ]
         ┌───────────┐
         │ mock peek │
         └───────────┘
```

### Flow card (features)
```
┌─────────────────┐ 12px
│  arc glow top   │
│ ┌─────────────┐ │
│ │ mock panel  │ │
│ └─────────────┘ │
│ title + text    │
└─────────────────┘
```

### Panel backlight
Deux ellipses blur derrière le mock — **pas** box-shadow coloré sur le panel.

---

## Bordures & profondeur

| Niveau | Valeur |
|--------|--------|
| Whisper | `rgba(255,255,255,0.06)` |
| Default | `rgba(255,255,255,0.1)` |
| Hover | `rgba(255,255,255,0.16)` |

Ombres orange sur panels posés sur noir = interdit.

---

## Mock UI interne

- Terminal : mono font, logs succès vert/orange soft
- Cart : lignes dynamiques JS, total dashed
- Meters : track gris, fill gradient accent, h=4px

---

## Checklist formes

- [ ] CTA 10px, pas pill
- [ ] Cards 12px
- [ ] Un accent
- [ ] Un spotlight max
- [ ] Mocks aria-hidden

---

## Anti-formes ❌

| Éviter | Remplacer |
|--------|-----------|
| Pills | 10px rect |
| Cards 16px+ | 12px |
| 3+ glows | 1 spotlight |
| Glass bleu/violet | Void + accent unique |
