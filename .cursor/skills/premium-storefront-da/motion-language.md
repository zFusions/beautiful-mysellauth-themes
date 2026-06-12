# Motion language — Premium storefront

Vitesse et easing pour UI premium. Implémentation SellAuth : `beautiful-mysellauth-themes/module-animations.md`.

---

## Principes

1. **Lent & fluide** — pas bounce/elastic
2. **Une fois** — mocks ne bouclent pas
3. **Scroll-gated** — mocks quand ~20% panel visible
4. **TIMING centralisé** — ~25s par carte feature

---

## Easing

```
cubic-bezier(0.16, 1, 0.3, 1)  /* entrées UI, logs */
ease /* 0.15s hovers */
```

---

## Durées repère

| Élément | Valeur |
|---------|--------|
| Hover couleur | 0.15–0.25s |
| Log stagger JS | 1400ms |
| Cart item stagger | 2600ms |
| Ligne CSS fade | 1.15s |
| Meter fill | 2400ms (1ère barre) |
| Scroll reveal | ~620ms |
| Hero entrance | ~1s stagger |

---

## prefers-reduced-motion

Réduire : parallax, cursor glow, Lenis duration.

**Ne pas** réduire : stagger JS des mocks décoratifs (sinon < 1s perçu).

---

## Entrées OK

- opacity + translateY 10–12px
- blur 5px → 0 sur lignes mock
- width 0 → N% sur meters

## Interdit

- scale bounce on load
- rotation decorative
- infinite content animation
- `transition: none` + opacity 1 sur mocks en reduce
