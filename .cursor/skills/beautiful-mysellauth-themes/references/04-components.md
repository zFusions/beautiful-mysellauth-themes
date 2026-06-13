# Components — full Nunjucks patterns

Prefix `t-` below — replace with project prefix.

---

## master.njk essentials

```nunjucks
<link rel="stylesheet" href="{{ 'pro.css' | assetUrl }}">
<link rel="stylesheet" href="{{ 'custom.css' | assetUrl }}">
<link rel="stylesheet" href="{{ 'theme.css' | assetUrl }}">
<link rel="stylesheet" href="{{ 'shop-pages.css' | assetUrl }}">

{% block template %}{% endblock %}

{# Homepage motion #}
<script src="https://cdn.jsdelivr.net/npm/lenis@1.3.23/dist/lenis.min.js"></script>
<script src="{{ 'theme-feature-mocks.js' | assetUrl }}" defer></script>
```

Inline or separate: scroll reveal + hero entrance + Lenis. Event: `theme:motion-start`.

---

## shop.njk

```nunjucks
<div class="t-home">
  {% for componentId in components_order %}
    {% render_component componentId %}
  {% endfor %}
</div>
```

Class `t-home` scopes Lenis + motion + section alternation.

### Section background alternation (landing)

```css
.t-home > .component { background: var(--t-section-alt) !important; }
.t-home > .component:nth-child(even) { background: var(--t-bg) !important; }
.t-home > .component.t-hero { background: transparent !important; }
```

Hero = child 1 (odd, overridden transparent). How-it-works = child 2 (even, black). Products = child 3 (gray). Continue down the page.

Full depth rules: [03-design-system.md](03-design-system.md#page-depth--background-dark-saas).

---

## Navbar

```nunjucks
<nav class="t-navbar component" data-component-id="{{ componentId }}">
  <div class="t-nav-inner t-container">
    <a class="t-nav-brand" href="{{ '/' | shopUrl }}">
      {# logo img or mark + wordmark #}
    </a>
    <div class="t-nav-links">
      <a href="{{ '/#products' | shopUrl }}">Products</a>
      <a href="{{ '/#features' | shopUrl }}">Features</a>
      <a href="{{ '/#faq' | shopUrl }}">FAQ</a>
    </div>
    <div class="t-nav-actions">
      <a href="{{ '/login' | shopUrl }}" class="t-nav-login">Login</a>
      <a href="{{ '/signup' | shopUrl }}" class="t-nav-cta t-btn-primary">Get Started</a>
    </div>
  </div>
</nav>
```

```css
.t-nav-inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  height: var(--t-nav-h);
}
.t-nav-links { justify-self: center; display: flex; gap: clamp(20px, 2.4vw, 36px); }
.t-nav-actions { justify-self: end; display: flex; gap: 12px; align-items: center; }
.t-navbar { position: sticky; top: 0; z-index: 50; background: transparent; }
```

Inner pages: `.t-navbar.is-solid { background: rgba(0,0,0,0.55); backdrop-filter: blur(16px); }`

---

## Hero

```nunjucks
<section class="t-hero component" data-component-id="{{ componentId }}">
  <div class="t-hero-bg" aria-hidden="true">
    {# spotlight layers — see design-system #}
  </div>
  <div class="t-hero-inner t-container">
    <div class="t-hero-copy">
      <h1 class="t-hero-title">{{ properties.title | renderString }}</h1>
      <p class="t-hero-sub">{{ properties.subtitle | renderString }}</p>
      <div class="t-hero-actions">
        <a href="{{ ('/' ~ properties.cta) | shopUrl }}" class="t-btn-primary">
          {{ properties.cta_text | renderString }}
        </a>
        <a href="{{ ('/' ~ properties.cta_2) | shopUrl }}" class="t-btn-ghost">
          {{ properties.cta_text_2 | renderString }}
        </a>
      </div>
    </div>
    {% render_snippet "hero-mock.njk" %}
  </div>
</section>
```

**Peek layout lock:**

```css
.t-hero-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: clamp(74px, 9.5vh, 120px);
}
.t-hero-inner::after {
  content: '';
  display: block;
  width: 100%;
  height: var(--t-hero-mock-footprint);
  pointer-events: none;
}
.t-hero-mock {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: var(--t-hero-mock-top);
  width: min(920px, 94vw);
}
```

Tune **only** `--t-hero-mock-top` and `--t-hero-mock-footprint` after lock.

---

## Products

```nunjucks
<section class="t-section t-section--alt" id="products" data-component-id="{{ componentId }}">
  <div class="t-container">
    <header class="t-section-head" data-reveal>
      <h2>{{ properties.title | renderString }}</h2>
      <p class="t-section-sub">{{ properties.subtitle | renderString }}</p>
    </header>
    <div class="t-products-grid" data-reveal-group>
      {% for product in products %}
        {% render_snippet "product-card.njk", product=product %}
      {% endfor %}
    </div>
  </div>
</section>
```

```css
.t-products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: clamp(14px, 2vw, 20px);
}
```

---

## Features (3 mocks)

```nunjucks
<section class="t-section t-features" id="features"
  data-component-id="{{ componentId }}" data-feature-mock-section>
  <div class="t-feature-cursor-light" aria-hidden="true"></div>
  <div class="t-container">
    <header class="t-section-head t-section-head--center" data-reveal>
      <h2>{{ properties.title | renderString }}</h2>
      <p class="t-section-sub">{{ properties.subtitle | renderString }}</p>
    </header>
    <div class="t-feature-grid" data-reveal-group>
      {% for feature in properties.features | default([]) %}
      <article class="t-feature-card" data-reveal>
        <div class="t-feature-spot" aria-hidden="true"></div>
        <div class="t-feature-mock-wrap" aria-hidden="true">
          <div class="t-feature-panel" data-mock-panel>
            {% render_snippet "feature-mock.njk", type=feature.mock_type %}
          </div>
        </div>
        <div class="t-feature-body">
          <h3>{{ feature.title | renderString }}</h3>
          <p>{{ feature.description | renderString }}</p>
        </div>
      </article>
      {% endfor %}
    </div>
  </div>
</section>
```

Card top glow:

```css
.t-feature-spot {
  position: absolute;
  top: 0; left: 10%; right: 10%;
  height: 40%;
  background: radial-gradient(ellipse at 50% 0%, var(--t-accent-glow), transparent 70%);
  pointer-events: none;
}
.t-feature-card {
  position: relative;
  border-radius: var(--t-radius-card);
  border: 1px solid var(--t-border-subtle);
  background: var(--t-surface);
  overflow: hidden;
}
```

---

## FAQ

```nunjucks
<section class="t-section" id="faq" data-component-id="{{ componentId }}">
  <div class="t-container">
    <header class="t-section-head" data-reveal>
      <h2>{{ properties.title | default('FAQ') | renderString }}</h2>
    </header>
    <div class="t-faq-list" data-reveal-group>
      {% for item in properties.items | default([]) %}
      <details class="t-faq-item" data-reveal>
        <summary>{{ item.question | renderString }}</summary>
        <p>{{ item.answer | renderString }}</p>
      </details>
      {% endfor %}
    </div>
  </div>
</section>
```

---

## Footer

Links: products, FAQ, terms, support (Discord/Telegram). Match `--t-section-alt` background.

---

## schema.json example (features)

```json
{
  "features": {
    "label": "Features",
    "properties": {
      "title": { "type": "text", "label": "Title" },
      "subtitle": { "type": "text", "label": "Subtitle" },
      "features": {
        "type": "array",
        "label": "Feature cards",
        "items": {
          "title": { "type": "text" },
          "description": { "type": "text" },
          "mock_type": { "type": "text", "label": "feed|list|meters|stats|grid" }
        }
      }
    }
  }
}
```

Every component in `components_order` needs schema + matching `.njk` file.
