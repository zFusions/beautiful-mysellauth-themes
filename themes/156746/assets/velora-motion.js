(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var booted = false;

  function initCursorLight() {
    var hero = document.querySelector('.velora-home .vl-hero');
    if (!hero || reduce.matches) return;

    var light = hero.querySelector('.vl-page-cursor-light');
    if (!light) {
      light = document.createElement('div');
      light.className = 'vl-page-cursor-light';
      light.setAttribute('aria-hidden', 'true');
      hero.insertBefore(light, hero.firstChild);
    }

    if (hero.dataset.vlCursorLight === '1') return;
    hero.dataset.vlCursorLight = '1';

    var target = { x: -9999, y: -9999 };
    var current = { x: -9999, y: -9999 };
    var active = false;

    function onMove(e) {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!active) {
        active = true;
        hero.classList.add('is-cursor-light-on');
      }
    }

    function onLeave() {
      active = false;
      hero.classList.remove('is-cursor-light-on');
    }

    hero.addEventListener('mouseenter', onMove);
    hero.addEventListener('mousemove', onMove, { passive: true });
    hero.addEventListener('mouseleave', onLeave);

    function tick() {
      if (active) {
        current.x += (target.x - current.x) * 0.085;
        current.y += (target.y - current.y) * 0.085;
        light.style.transform =
          'translate3d(' + (current.x - 150) + 'px,' + (current.y - 150) + 'px,0)';
      }
      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  function initFaqAccordion() {
    var accordion = document.getElementById('faq-accordion');
    if (!accordion || accordion.dataset.vlFaqMotion === '1') return;
    accordion.dataset.vlFaqMotion = '1';

    accordion.querySelectorAll('.collapse').forEach(function (panel) {
      var inner = panel.querySelector('.faq-content-inner');

      panel.addEventListener('show.bs.collapse', function () {
        var card = panel.closest('.faq-card-red');
        if (card) {
          card.classList.add('is-faq-expanding');
          card.classList.remove('is-faq-closing');
        }
      });

      panel.addEventListener('shown.bs.collapse', function () {
        var card = panel.closest('.faq-card-red');
        if (card) {
          card.classList.add('is-faq-open');
          card.classList.remove('is-faq-expanding', 'is-faq-closing');
        }
        if (inner) inner.classList.add('is-faq-visible');
      });

      panel.addEventListener('hide.bs.collapse', function () {
        if (inner) inner.classList.remove('is-faq-visible');
        var card = panel.closest('.faq-card-red');
        if (card) {
          card.classList.add('is-faq-closing');
          card.classList.remove('is-faq-open', 'is-faq-expanding');
        }
      });

      panel.addEventListener('hidden.bs.collapse', function () {
        var card = panel.closest('.faq-card-red');
        if (card) card.classList.remove('is-faq-closing');
      });
    });
  }

  function initSearchFocus() {
    document.querySelectorAll('.velora-home .search-input-modern').forEach(function (input) {
      var wrap = input.closest('.search-box-modern');
      if (!wrap || wrap.dataset.vlSearchFx === '1') return;
      wrap.dataset.vlSearchFx = '1';
      input.addEventListener('focus', function () {
        wrap.classList.add('is-focused');
      });
      input.addEventListener('blur', function () {
        wrap.classList.remove('is-focused');
      });
    });
  }

  function initRevealPop() {
    if (reduce.matches || typeof MutationObserver === 'undefined') return;

    document
      .querySelectorAll('.velora-home .ps-product-card[data-reveal], .velora-home .faq-card-red[data-reveal]')
      .forEach(function (el) {
        if (el.dataset.vlRevealPop === '1') return;
        el.dataset.vlRevealPop = '1';

        var obs = new MutationObserver(function () {
          if (!el.classList.contains('is-visible')) return;
          el.classList.add('is-motion-pop');
          obs.disconnect();
        });

        obs.observe(el, { attributes: true, attributeFilter: ['class'] });
      });
  }

  function boot() {
    if (!document.querySelector('.velora-home')) return;
    if (booted) {
      initFaqAccordion();
      return;
    }
    booted = true;
    initCursorLight();
    initFaqAccordion();
    initSearchFocus();
    initRevealPop();
  }

  document.addEventListener('velora:motion-start', boot);
  document.addEventListener('shop:page-loaded', function () {
    initFaqAccordion();
    initSearchFocus();
    initRevealPop();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
