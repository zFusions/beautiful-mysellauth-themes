# Velora Market — Design Authority (DA complète)

**Version :** 2026-06-13 · Theme 156746  
**Usage :** Référence unique pour reproduire la DA Velora **pixel perfect** sur tout écosystème (site, panel admin, bot Discord, app desktop, docs, status page, etc.)  
**Règle :** Ce document décrit **comment** la DA est faite — pas d’exemples de code.

---

## 1. Identité & philosophie

### North Star — « The Orange Spotlight »

Velora Market est un **storefront SaaS digital premium sombre**, pas une boutique gaming néon. L’expérience repose sur :

- Un **vide noir** quasi total comme canvas
- **Un seul accent orange** chaud (famille `#F99926` → `#FF7500`)
- **Une seule zone de lumière ambiante forte** par écran (hero en haut, footer en bas sur le site)
- De la **profondeur par couches tonales** + glass dark, pas par des ombres colorées partout
- Une typo **Arial utilitaire** + **Playfair italic** réservé au hero + **Inter** sur tout ce qui est produit/prix/achat

### Ce que Velora n’est pas

| Interdit | Pourquoi |
|----------|----------|
| SaaS clair / fond crème | Casse l’identité void |
| Gaming RGB / néon multicolore | Second accent interdit |
| Pill buttons partout | Forme = carré doux 10px |
| Glass bleu/violet | Un seul accent orange |
| Eyebrows uppercase sur chaque section | Pattern AI landing générique |
| Cartes avec border + grosse box-shadow orange | « Ghost card » interdit |
| Traits 1px orange/blanc décoratifs sur les bords | Artefacts visuels — profondeur via dégradé frost, pas rim lines |
| Lumière orange au centre d’un formulaire | Glow toujours **ancré** (haut hero, haut modal header, bas footer) |

### Registers (registres visuels)

| Surface | Fond | Lumière | Typo display |
|---------|------|---------|--------------|
| **Brand / Landing** | `#030303` void | Spotlight hero + flow spots sections | Arial + Playfair (ligne 2 hero only) |
| **Product / Inner** | `#030303` plat | Ambient top léger (10–14% orange max) | Arial UI + Inter produit |
| **Customer account** | `#030303` + cards `#0c0c0c` | Aucun spotlight | Arial + accent orange actif nav |

---

## 2. Palette — tokens canoniques

Tous les produits Velora doivent mapper sur ces valeurs exactes.

### 2.1 Fonds (du plus profond au plus élevé)

| Token | Hex / valeur | Rôle |
|-------|--------------|------|
| `--vl-bg` | `#030303` | Page void — landing, inner, footer |
| `--vl-surface` | `#070707` | Zones secondaires, inputs dark, panneaux bas |
| `--vl-section-alt` | `#090909` | Bandes alternées homepage (à partir section 3) |
| `--vl-card` | `#0c0c0c` | Cards génériques, compte client |
| `--vl-product-card` | `#101010` | Shell carte produit catalog |
| `--vl-product-media` | `#070707` | Zone image 1:1 dans carte produit |
| `--vl-product-chip` | `rgba(12,12,12,0.88)` | Chips stock sur image |

**Règle de layering :** void → surface/card → glass layer. Ne jamais sauter directement du noir pur au blanc.

### 2.2 Texte (hiérarchie d’opacité blanc)

| Token | Valeur | Usage |
|-------|--------|-------|
| `--vl-text` | `#fafafa` | Titres, prix actifs, nav brand |
| `--vl-muted` | `rgba(255,255,255,0.68)` | Body, sous-titres, nav links — **minimum body sur noir** |
| `--vl-text-faint` | `rgba(255,255,255,0.52)` | Meta secondaire |
| `--vl-text-dim` | `rgba(255,255,255,0.45)` | Labels faibles, hints mock |
| `--vl-text-ghost` | `rgba(255,255,255,0.38)` | Placeholders UI mock |
| `--vl-text-whisper` | `rgba(255,255,255,0.32)` | Micro-copy mock terminal |
| `--vl-placeholder` | `rgba(255,255,255,0.62)` | Placeholders inputs |

**Contraste :** texte body ≥ `0.68` opacity sur `#030303`.

### 2.3 Accent orange (famille unique)

| Token | Valeur | Usage |
|-------|--------|-------|
| `--vl-accent` | `#F99926` | Prix catalog, liens actifs, icônes SVG, hairlines discrets |
| `--vl-accent-hover` | `#ffab42` | Hover CTA secondaires |
| `--vl-accent-glow` | `rgba(249,153,38,0.35)` | Référence glow — usage parcimonieux |
| `--vl-nav-cta-bg` | `#FF7500` | CTA navbar « Get Started » |
| `--vl-nav-cta-bg-hover` | `#FF8A18` | Hover nav CTA |

**Dégradé CTA primaire (achat / hero / login Continue) :**

| Stop | Couleur | Position |
|------|---------|----------|
| Top | `#ffb038` / `#ffc84a` / `rgba(255,210,100,0.95)` | 0% |
| Mid | `#ff8012` / `#f99926` / `rgba(255,168,48,0.9)` | ~48% |
| Bottom | `#e87200` / `#e8870f` / `rgba(249,140,20,0.88)` | 100% |

**Texte sur bouton orange :** `#1a1000` ou `#1a0d00` (marron très foncé, pas blanc).

**Dégradé titre accent (legal pages) :** `#ffc46a` → `#F99926` → `#e8840f` à 135deg, en text-fill transparent.

### 2.4 Bordures

| Token | Valeur | Usage |
|-------|--------|-------|
| `--vl-border` | `rgba(255,255,255,0.10)` | Default cards, inputs, modals |
| `--vl-border-hover` | `rgba(255,255,255,0.16)` | Hover cards glass |
| Whisper | `rgba(255,255,255,0.06)` | Séparateurs ultra discrets |
| Glass PDP / inner | `rgba(255,255,255,0.09)` | Cartes PDP légèrement plus discrètes |
| Glass modal login | `rgba(255,255,255,0.11)` | Contour modal |
| CTA border | `rgba(255,200,90,0.55)` | Contour bouton achat orange |
| Focus orange | `rgba(249,153,38,0.45)` | Ring focus inputs |

### 2.5 Statut

| Token | Valeur | Usage |
|-------|--------|-------|
| `--vl-stock-green` | `#4ade80` | Stock PDP, barre stock, « You save », indicateurs succès mock |
| OOS chip | `#ff8a8a` | Rupture stock sur image catalog |
| Erreur form | `#ff8a8a` | Messages `.text-danger` login modal |

### 2.6 Règle « One Voice »

Orange ≤ **10% de la surface visible** hors zones autorisées : hero spotlight, flow spots, CTA primaires, prix, icônes accent, glow footer/modal header. Partout ailleurs : monochrome.

---

## 3. Typographie

### 3.1 Familles

| Rôle | Police | Chargement | Scope |
|------|--------|------------|-------|
| **UI / Body** | Arial, Helvetica, sans-serif | System + fallback | Nav, labels, legal prose, accordions, qty, footer links, bouton login « Continue », hero CTAs |
| **Display serif** | Playfair Display | Google Fonts 400 italic | **Uniquement** ligne 2 du hero landing |
| **Product display** | Inter 400–800 | Google Fonts | Noms/prix catalog, titre/prix PDP, cart line prices, trust chips weight, OTP digits |

**Interdit :** Playfair en nav, boutons, sections, cartes produit, modales.

### 3.2 Échelle typographique

| Rôle | Taille | Weight | Letter-spacing | Line-height |
|------|--------|--------|----------------|-------------|
| Hero sans L1 | clamp 32–54px | 400 | −0.03em | 1.08 |
| Hero serif L2 | clamp 30–46px | 400 italic | −0.02em | 1.10 |
| Hero sub | 14px | 400 | −0.01em | 1.55 |
| Section title | clamp 28–42px | 400–500 | −0.03 à −0.04em | 1.05–1.08 |
| Legal title | clamp 36–56px | 500 | −0.04em | 1.05 |
| PDP title | 28px | 600 Inter | −0.5px | 34px |
| PDP price main | 32px | 700 Inter | −0.7px | 1 |
| Product card name | 15px | 700 Inter | −0.02em | 1.3, 2 lignes max |
| Product card price | 16px | 700 Inter | −0.02em | 1.2 |
| Nav brand | 15px | 600 | −0.02em | — |
| Nav links | 13px | 400 | −0.01em | — |
| UI label / PDP UI | 13px | 400–700 | −0.01em | 19.5px |
| Footer column title | uppercase small | 600 | tracked | — |
| Modal title login | 1.2rem (~19px) | 600 Arial | −0.03em | 1.25 |

### 3.3 Règles typo

- **Floor tracking :** jamais plus serré que −0.04em sur display
- **text-wrap :** `balance` sur hero titles, `pretty` sur subcopy
- **Font smoothing :** antialiased partout (`-webkit-font-smoothing: antialiased`)
- **Pas de font-synthesis** (pas de faux gras italic système)

---

## 4. Grille, layout & espacements

### 4.1 Container

| Token | Valeur |
|-------|--------|
| `--vl-container` | `min(1200px, 94vw)` |
| Padding horizontal global | `clamp(1.25rem, 4vw, 2.5rem)` + safe-area |
| Legal shell max | `920px` centré |
| Login modal max | `440px` |
| CTA box max | `640px` |
| Products grid max | `1280px` |

### 4.2 Hauteurs structurelles

| Élément | Valeur |
|---------|--------|
| `--vl-nav-h` | `56px` |
| Nav CTA height | `34px` desktop |
| Nav action link | `32px` |
| Hero CTA | `38px` |
| Touch target minimum | `44px` mobile |
| PDP buy button | `50px` min-height |
| Login Continue | `50px` min-height, pill `999px` **exception** login only |
| Input standard | `48px` min-height |

### 4.3 Sections verticales

| Token | Valeur |
|-------|--------|
| `--vl-section-y` | `clamp(72px, 9vw, 112px)` |
| Hero padding top | `clamp(56px, 7vh, 88px)` + nav height |
| PDP section padding | `20px 0 48px` |
| Legal section padding top | `nav-h + 24px`, bottom `64px` |
| Footer padding | `clamp(48px, 6vw, 80px) 0 clamp(24px, 4vw, 32px)` |

### 4.4 Gaps standards

| Contexte | Gap |
|----------|-----|
| Hero stack elements | `clamp(12px, 1.6vw, 18px)` |
| Hero CTA row | `10px` |
| Nav menu links | `clamp(20px, 2.4vw, 36px)` |
| Product grid | `14–16px` |
| PDP grid desktop | `24px` colonnes, rail `320–380px` |
| Trust chips PDP | `8px` vertical stack |
| Footer grid | `clamp(2rem, 4vw, 3rem)` |

### 4.5 Breakpoints

| Breakpoint | Comportement |
|------------|--------------|
| ≤479px | Product grid 1 col |
| ≤767px | Hero compact, nav hamburger, PDP rail first (buy before info flow mobile) |
| 768–991px | Product grid 2–3 cols, footer 2 cols |
| ≥992px | Nav grid 3 zones (logo / links center / actions), PDP 2 cols sticky rail |
| ≥1200px | Product grid 4 cols |

---

## 5. Rayons & formes (geometry)

Philosophie : **carré doux SaaS 2024–2026**, pas pill sauf exception login CTA.

| Élément | Radius |
|---------|--------|
| `--vl-btn-radius` | **10px** — boutons, inputs, badges nav, ghost buttons |
| `--vl-radius` | **12px** — cards génériques, flow panels, modals inner |
| `--vl-product-radius` | **14px** — cartes produit catalog + cartes PDP |
| `--vl-nav-btn-radius` | **10px** |
| `--vl-radius-xs` | **4px** — micro éléments, barres progress hauteur 4px → pill OK |
| Login modal | **18px** |
| Login Continue button | **999px** (seule exception pill) |
| Stock chip catalog | **999px** pill |
| Progress bars | **999px** |

**Anti-formes :** pas de radius 16px+ sur cards standard ; pas de blobs ; pas de coins carrés 0px sur CTA.

---

## 6. Système d’éclairage (Lighting)

La lumière Velora = **radial gradients orange + blur**, jamais un aplat orange semi-transparent au centre d’un panel.

### 6.1 Hero spotlight (landing — signature)

**Position :** absolute, zone hero uniquement, **scroll away** avec la page (pas fixed).

**Stack en 4 couches (haut de page) :**

1. **Arc container** — masque elliptique partagé (`124% × 98%`, ancré `50% -18%`)
2. **Haze** — blur **72px**, ellipse orange dégradée du `#ff7a0e` 52% → transparent 94%
3. **Core** — blur **44px**, ellipse plus intense `#ff9822` 72% → transparent 96%
4. **Grid relief** — damier SVG 32×32px, `mix-blend-mode: soft-light`, opacity ~0.46, masqué par le même arc

**Vignette horizontale :** dégradé noir sur les bords (~78% opacity aux extrémités) pour fondre la lumière dans le void.

**Couleurs haze/core (référence) :** `#ff7a0e` family, opacités 0.52 → 0.01 en cascade.

### 6.2 Flow spot (sections Features / How it works)

- Même recette haze/core que hero mais **localisée** derrière chaque `.vl-flow-panel`
- **Un spot par carte** — jamais 3 glows qui se chevauchent sur toute la section
- Panel : fond `rgba(8,8,8,0.52)` + glass blur 18px, border `rgba(255,255,255,0.11)`

### 6.3 Mock panel backlight (hero dashboard peek)

- Ellipses blur **inversées** — ancrage **bas** du mock (`50% 102%` / `50% 100%`)
- Même famille orange, blur 72px + 44px
- **Pas** de box-shadow coloré sur le panel lui-même

### 6.4 Ambient inner pages (PDP, cart, legal)

**Position :** `::before` pseudo top, hauteur `min(560–640px, 75–82vh)`, z-index 0.

**Intensité :** **3× à 5× plus faible** que hero.

| Page | Gradient type | Orange max opacity |
|------|---------------|-------------------|
| PDP | Ellipse `50% 0%` | ~11% → transparent 68% |
| Legal / premium | Double radial top | 14% + 6% secondary |
| Cart | Similaire PDP | subtil top only |

**Règle :** inner pages = **jamais** le arc mask + grid relief du hero.

### 6.5 Footer light (bas de page)

**Position :** absolute, full footer height, masqué vers le haut.

**Stack :**
- **Haze** — blur 72px, ancré `50% 102%`, opacité max ~42% → transparent 88%
- **Core** — blur 44px, ancré `50% 100%`, opacité max ~55% → transparent 90%
- **Mask vertical** — opaque 0–22% bas, fade transparent à 82% haut
- **Vignette latérale** — noir 55% aux bords 14%

**Interdit :** dégradé linéaire orange plat sur tout le footer ; barre orange horizontale ; glow qui remonte sur le texte brand.

### 6.6 Modal login light

**Uniquement en haut du header modal** — hauteur ~88px max.

- Radial `50% 0%`, orange 24% → transparent 72%
- Mask fade vers le bas à 45%
- **Body modal opaque** `rgba(8,8,8,0.96)` — **aucune** lumière au centre du formulaire
- Backdrop : noir 78% + blur 10px

---

## 7. Glassmorphism — recette exacte

Velora glass = **dark frost**, pas verre laiteux clair.

### 7.1 Formule glass standard (PDP, cart, trust chips, legal rows)

**Couches (ordre bas → haut) :**

1. **Frost gradient** — angle 165deg : blanc 3.5% → transparent 42% → blanc 1.2% 100%
2. **Fill dark** — `rgba(12,12,12,0.50)` avec blur OU fallback `rgba(10,10,10,0.74)` sans blur
3. **Highlight top optional** — gradient vertical blanc 3.5% → transparent 26%, opacity 0.5, via pseudo ::before sur cards PDP

**Blur :** `20–26px`, saturate `135–165%`  
**Border :** `1px solid rgba(255,255,255,0.09–0.12)`  
**Shadow :** **uniquement noir** — ex. `0 18px 44px rgba(0,0,0,0.42)` — **pas** de halo orange autour de la carte  
**Interdit :** `inset 0 1px 0` rim white/orange ; `::after` 1px gradient lines ; box-shadow orange sur panels posés

### 7.2 Glass legal / premium pages

- Panel bg : gradient frost 5% + `rgba(12,12,12,0.55)`
- Blur : 22px saturate 145%
- Rows internes : `rgba(255,255,255,0.035)` fill, border `0.08`
- Shadow panel : noir `0 20px 48px rgba(0,0,0,0.42)` — legacy inset top 8% acceptable sur legal panels uniquement

### 7.3 Glass bouton secondaire (Buy Now PDP, footer social)

- Fill : `rgba(12,12,12,0.52–0.58)` + frost 4%
- Border : `rgba(255,255,255,0.14–0.22)`
- Blur : 20–24px
- Hover : léger éclaircissement fill, **pas** blanc laiteux

### 7.4 Glass inputs (login, PDP qty)

- Fill : frost + `rgba(255,255,255,0.035–0.045)`
- Border : `rgba(255,255,255,0.10)`
- Shadow : noir `0 8px 22px rgba(0,0,0,0.22)`
- Focus : ring orange 3px `rgba(249,153,38,0.12)` — **sans** glow orange diffus autour

### 7.5 Quand NE PAS utiliser glass

- Product cards catalog landing : **opaque** `#101010`, pas blur
- Navbar inner pages sticky : `rgba(0,0,0,0.94)` opaque
- Body text areas legal : prose sur fond panel, pas blur sur texte

---

## 8. Ombres & profondeur

### Hiérarchie

| Niveau | Traitement |
|--------|------------|
| Repos (cards glass) | Ombre noire diffuse seule |
| Hover card produit | `translateY(-2px)` + border tint orange 28% — **pas** d’ombre au repos |
| Hero mock panel | Exception : `0 40px 100px rgba(0,0,0,0.7)` |
| Modal | `0 28px 80px rgba(0,0,0,0.58)` + hairline `0 0 0 1px rgba(255,255,255,0.04)` |
| CTA orange | Glow orange **sur le bouton seulement** : `0 4–8px 14–28px rgba(249,153,38,0.22–0.34)` — direction **bas**, pas halo qui remonte sur le form |

### Règle Flat-By-Default

Ne jamais combiner **border 1px decorative + box-shadow blur ≥16px coloré** sur le même élément au repos.

---

## 9. Navigation

### Structure desktop (≥992px)

Grid 3 colonnes : `1fr | auto | 1fr`
- Gauche : logo 28×28 + nom shop 15px/600 blanc
- Centre : liens 13px, gap 20–36px, scroll-spy active state
- Droite : Login (text link) + CTA orange `#FF7500`

### Homepage vs inner

| État | Navbar background |
|------|-------------------|
| Landing hero zone | **Transparent** — pas de border-bottom |
| Inner pages | Sticky, `rgba(0,0,0,0.94)`, **sans** border-bottom grey line |

### Mobile

- Toggle 44×44, panel slide, links 44px height
- CTA full width dans drawer
- Login = bouton text (pas lien dashboard direct)

### CTA navbar

- Fill `#FF7500`, hover `#FF8A18`
- Height 34px, padding 0 18px, radius 10px
- **Pas** de glow, **pas** de transform agressif

---

## 10. Hero landing

### Composition verticale (centre)

1. Titre ligne 1 — Arial sans clamp
2. Titre ligne 2 — Playfair italic
3. Subcopy 14px muted 74%
4. Actions row — primary gradient + secondary ghost
5. Services/trust strip optional
6. Dashboard mock peek — panel avec badge **Preview**, `aria-hidden`

### Boutons hero

| Variant | Fill | Border | Text |
|---------|------|--------|------|
| Primary | Gradient gold `#ffc84a→#e8870f` | `rgba(255,210,90,0.65)` | `#1a1000` |
| Secondary | `rgba(255,255,255,0.03)` | `rgba(255,255,255,0.14)` | white 88% |

Primary a inset highlight top blanc 28% — **acceptable hero only**.

---

## 11. Sections landing

### Bandes alternées

- Hero + How it works : void `#030303`
- À partir section 3 : alternance `#030303` / `#090909`

### Products grid

- Colonnes : 1 → 2 → 3 (768) → 4 (1200)
- Gap 14–16px, max-width 1280px

### FAQ

- Accordion dark, chevron, **pas** double border orange sur contenu `.editor`

### Reviews / Feedback

- Lead sentence-case — **pas** uppercase eyebrow orange

### Final CTA

- Box `#070707` surface, border `--vl-border`, radius 12px, centré max 640px

---

## 12. Cartes produit (catalog)

### Shell unifié (règle absolue)

Image + titre + prix **dans le même container** `#101010`, radius 14px, border `--vl-border`.

### Media

- Ratio **1:1**, `object-fit: contain`, fond `#070707`
- Hover : glow radial orange **bas de l’image** via pseudo (::after), pas box-shadow carte
- Stock chip top-right : fond noir 55% + blur, pill, texte blanc 92%

### Body

- Padding `12px 14px 14px`
- Nom Inter 700 15px, 2 lines clamp
- Prix Inter 700 16px `#F99926`

### États

| État | Comportement |
|------|--------------|
| In stock | Carte entière cliquable, hover −2px Y, border tint orange |
| OOS | div non cliquable, grayscale image, opacity réduite, chip `#ff8a8a` |
| Focus | outline orange 2px |

**Interdit :** bouton CTA orange séparé sur la carte — la carte EST le CTA.

---

## 13. Page produit (PDP)

### Layout desktop

| Colonne gauche (flex) | Colonne droite (sticky) |
|-----------------------|-------------------------|
| Media 16:9 ou banner auto | Card info : titre, prix, stock, trust |
| Accordions description | Card buy : qty, Add to cart, Buy now |

Max width 1200px, rail sticky `top: nav-h + 16px`.

### Banner auto (sans image)

- Mesh grid subtil + glow orange top inside banner
- Texte produit bottom-left, label « DELIVERED AUTOMATICALLY… » orange small caps

### Stock UI

- Label + count pill vert pulsant
- Barre track dark + fill `#4ade80`, width = min(100, stock) sauf unlimited = 100%

### Trust chips

- Stack vertical full width, glass dark, icône SVG **orange stroke**, texte Inter/Arial 13px bold

### Boutons achat

| Bouton | Style |
|--------|-------|
| Add to cart | Gradient orange CTA, text `#1a0d00`, Inter 800, min-h 50px, radius 10px |
| Buy now | Glass dark secondary, text white 92%, border white 14% |

### Prix

- Main = total après qty + volume discount
- Strikethrough = price_slash OU subtotal pre-volume
- « You save » **uniquement** si volume discount appliqué — jamais pour slash seul

---

## 14. Panier

- Même glass recipe que PDP
- Typo : Arial UI, Inter noms/prix
- Mobile : pay bar sticky bottom colonne checkout
- Ambient top légal/cart — pas hero spotlight

---

## 15. Pages légales & premium inner

### Structure

1. Back link
2. Hero centré : titre plain + mot accent gradient
3. Subtitle muted
4. Panel glass max 920px
5. Rows / highlights avec icônes SVG orange **stroke** (pas fill blob)

### Icônes legal

- Boîte 32px glass, SVG  stroke 1.5–2px orange, **pas** `fill: currentColor` sur tout le SVG

---

## 16. Compte client

- Wrapper `.velora-customer`
- Sidebar : nav dark, item actif orange
- Cards stats : fond `#0c0c0c`, border `--vl-border`, **pas** blanc Bootstrap
- Tables/forms override dark dans contexte customer

---

## 17. Modales

### Login client

- Dialog 440px, radius 18px
- Glass dark + top light **header only**
- Body opaque — formulaire sans transparence
- Titre Arial 600
- Continue : pill orange gradient, text `#1a0d00`, **Arial 600** (pas Inter)
- Backdrop blur 10px

### Tickets / maintenance

- Style dark standard 12px radius — moins premium que login

---

## 18. Footer

### Grid

- Desktop : `1.6fr + 1fr + 1fr + 1fr`
- Tablet 2 cols, mobile 1 col

### Brand column

- Nom shop : gradient `#fff → #ffc46a → #F99926` text clip
- Body muted 0.92rem
- Social buttons : glass ghost 44px, SVG **orange fill**, hover tint plateforme (Discord purple, Telegram blue)

### Bottom

- Copyright centered muted
- **Pas** de border-top line
- Footer light en arrière-plan (section 6.5)

---

## 19. Icônes & SVG

| Contexte | Traitement |
|----------|------------|
| Trust / features / legal | Stroke orange `#F99926`, pas carré orange plein |
| Footer social | Fill orange default, couleur plateforme au hover |
| Boutons CTA | Icône 18–24px, opacity 0.92, hérite couleur texte |
| UI decorative mocks | Monochrome whisper, vert succès `#4ade80` logs |

**Interdit :** icônes legal en fill solid orange (blob carré).

---

## 20. Motion & animation

### Easing canon

- UI : `cubic-bezier(0.22, 1, 0.36, 1)`
- Hovers : `0.15–0.18s ease`
- Entrées hero/reveal : ~620ms–1s

### Scroll

- **Lenis** smooth scroll : landing + **toutes inner pages**
- Reveal on scroll : translateY 3rem + blur 12px → 0, classe `.vl-reveal`

### Landing-only motion

- Hero rise stagger
- Flow mock JS (features, steps, boost)
- Hero cursor glow
- FAQ accordion polish

### Inner pages

- Hovers only — pas de parallax lourd
- `prefers-reduced-motion` : réduire parallax/Lenis/cursor — **pas** les staggers mock décoratifs <1s

### Interdit

- Bounce/elastic
- Rotation decorative
- Infinite content animation (sauf pulse stock dot, cursor mock)
- Scale bounce on load

---

## 21. Responsive & pixel-perfect checklist

Pour tout nouvel écran Velora (app, panel, bot embed) :

### Avant ship

- [ ] Fond `#030303` — pas `#000` pur sauf overlays
- [ ] Un seul accent orange — vérifier blues legacy éliminés
- [ ] Typo : Arial UI, Inter prix/produit, Playfair **only** hero ligne 2
- [ ] Radius : 10 buttons, 12 cards, 14 product
- [ ] Glass = dark frost + blur — pas blanc laiteux
- [ ] Lumière ancrée haut ou bas — jamais centre formulaire
- [ ] Pas de rim lines 1px inset decorative
- [ ] Ombres noires seules sur cards — orange glow réservé CTA/spotlights
- [ ] Body text ≥ 68% white on black
- [ ] Touch 44px mobile
- [ ] Container max 1200px aligné site
- [ ] SVG icons stroke orange — pas blobs
- [ ] CTA primary text `#1a1000` sur orange

### Mapping cross-plateforme

| Élément site | Panel / app equivalent |
|--------------|------------------------|
| `--vl-bg` | App background |
| `--vl-card` glass | Sidebar cards, modals |
| `--vl-nav-cta-bg` | Primary action buttons |
| `--vl-accent` | Links, prices, active nav |
| Hero spotlight | **Ne pas** dupliquer — utiliser ambient top 11% max |
| Footer light | Optional page bottom glow on long dashboards |
| Inter | All numeric / product / price UI |
| Arial | All chrome / labels / navigation |

---

## 22. Anti-patterns — liste exhaustive

| ❌ Éviter | ✅ Utiliser |
|----------|-------------|
| Pill CTAs (sauf login Continue) | 10px radius |
| Second accent (bleu `#1B44FE`, violet) | Orange family only |
| Fixed hero light on scroll | Absolute hero zone only |
| Light mode customer cards | `.velora-customer` dark |
| Glass blanc 8%+ fill | Dark glass 3–5% frost max |
| Orange box-shadow on cards | Black shadow only |
| inset 1px rim highlights | Frost gradient ::before |
| Light centre modal | Top glow + opaque body |
| Playfair partout | Hero L2 only |
| Inter nav/hero | Arial |
| « You save » sans volume discount | Strikethrough for slash |
| Placeholder icon produit sans image | Auto banner mesh |
| Duplicate Home footer link | Quick links = navbar links |
| Grey navbar border inner | border-bottom none |
| Hardcoded copy builder components | schema.json properties |

---

## 23. Fichiers de référence implémentation (site)

Pour les agents/devs — où la DA est appliquée sur le theme 156746 :

| Fichier | Contient |
|---------|----------|
| `themes/156746/assets/velora.css` | Tokens `:root`, hero, nav, footer, landing, customer, modals, motion |
| `themes/156746/assets/shop-pdp.css` | PDP glass, layout, stock, buy UI |
| `themes/156746/assets/shop-pages.css` | Cart glass, legal premium, inner ambient |
| `DESIGN.md` (racine projet) | YAML tokens + résumé brand |
| `tokens.json` (skill) | Export machine-readable |

**Ordre cascade CSS site :** pro → custom → velora → shop-pages → shop-pdp

---

## 24. Versioning DA

Mettre à jour ce document quand :

- Un token `--vl-*` change dans `velora.css`
- Une recette glass/light est modifiée (PDP, login, footer)
- Une règle typo est étendue (nouveau surface)
- Un anti-pattern est découvert en QA

**Référence audit technique séparée :** [AUDIT-156746.md](AUDIT-156746.md)  
**Playbook theme agents :** [velora-theme-156746.md](velora-theme-156746.md)  
**Formes génériques :** [forms-and-shapes.md](forms-and-shapes.md)  
**Motion :** [motion-language.md](motion-language.md)

---

*Velora Market DA — document vivant. Objectif : même sensation pixel perfect sur site, panel, Discord, desktop, docs.*
