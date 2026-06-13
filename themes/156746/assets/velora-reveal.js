(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var observer = null;
  var EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

  function isInnerPage() {
    return document.body.classList.contains('velora-inner-page');
  }

  function motionMs() {
    if (isInnerPage()) return reduce.matches ? 380 : 720;
    return reduce.matches ? 450 : 900;
  }

  function motionY() {
    return reduce.matches ? '24px' : isInnerPage() ? '40px' : '48px';
  }

  function motionBlur() {
    return reduce.matches ? '6px' : isInnerPage() ? '14px' : '12px';
  }

  function parseDelay(el) {
    var raw = getComputedStyle(el).getPropertyValue('--reveal-delay').trim();
    if (!raw) return 0;
    if (raw.endsWith('ms')) return parseFloat(raw) || 0;
    if (raw.endsWith('s')) return (parseFloat(raw) || 0) * 1000;
    return parseFloat(raw) || 0;
  }

  function autoTagRevealNodes() {
    document.querySelectorAll('.velora-inner-page .components > .component').forEach(function (el) {
      if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', '');
    });

    document.querySelectorAll('.vl-pdp-back:not([data-reveal])').forEach(function (el) {
      el.setAttribute('data-reveal', '');
    });

    var grid = document.querySelector('.vl-pdp-grid');
    if (grid && !grid.hasAttribute('data-reveal-group')) {
      grid.setAttribute('data-reveal-group', '');
      grid.querySelectorAll('.vl-pdp-main, .vl-pdp-rail').forEach(function (el) {
        if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', '');
      });
    }

    document.querySelectorAll('.vl-cart-head:not([data-reveal]), .vl-cart-main:not([data-reveal]), .vl-cart-summary:not([data-reveal])').forEach(function (el) {
      el.setAttribute('data-reveal', '');
    });

    document.querySelectorAll('.vl-page-head:not([data-reveal])').forEach(function (el) {
      el.setAttribute('data-reveal', '');
    });

    document.querySelectorAll('.vl-terms-highlight, .vl-terms-block, .vl-terms-row, .vl-terms-extra, .vl-legal-highlight, .vl-legal-block, .vl-legal-row, .vl-legal-extra').forEach(function (el) {
      if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', '');
    });

    document.querySelectorAll('.vl-premium-page .vl-legal-panel > *:not([data-reveal-group])').forEach(function (el) {
      if (!el.hasAttribute('data-reveal') && el.children.length > 0) return;
      if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', '');
    });

    document.querySelectorAll('.velora-customer .card:not([data-reveal])').forEach(function (el) {
      el.setAttribute('data-reveal', '');
    });

    document.querySelectorAll(
      '.status-card:not([data-reveal]), .blog-post-card:not([data-reveal]), .feedback-card:not([data-reveal]), .status-group:not([data-reveal])'
    ).forEach(function (el) {
      el.setAttribute('data-reveal', '');
    });

    document.querySelectorAll('.velora-inner-page .status-cards > .status-card').forEach(function (el, i) {
      if (!el.parentElement.hasAttribute('data-reveal-group')) {
        el.parentElement.setAttribute('data-reveal-group', '');
      }
    });

    document.querySelectorAll('footer.nexus-footer .footer-column, footer.nexus-footer .nexus-footer-brand').forEach(function (el) {
      if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', '');
    });

    document.querySelectorAll(
      '.velora-inner-page .text-image-block, .velora-inner-page .text-block, .velora-inner-page .text-video-block, .velora-inner-page .image-gallery, .velora-inner-page .socials, .velora-inner-page .join, .velora-inner-page .before-after, .velora-inner-page .plants'
    ).forEach(function (el) {
      var target = el.closest('.component') || el;
      if (!target.hasAttribute('data-reveal')) target.setAttribute('data-reveal', '');
    });
  }

  function staggerDelays() {
    document.querySelectorAll('[data-reveal-group]').forEach(function (group) {
      Array.prototype.filter.call(group.children, function (el) {
        return el.hasAttribute('data-reveal');
      }).forEach(function (el, i) {
        el.style.setProperty('--reveal-delay', Math.min(i * 60, 360) + 'ms');
      });
    });
  }

  function getRevealNodes() {
    return Array.prototype.filter.call(document.querySelectorAll('[data-reveal]'), function (el) {
      if (el.closest('.vl-hero')) return false;
      if (el.getAttribute('aria-hidden') === 'true') return false;
      return true;
    });
  }

  function setHidden(el) {
    el.style.transition = 'none';
    el.style.opacity = '0';
    el.style.transform = 'translate3d(0, ' + motionY() + ', 0)';
    el.style.filter = 'blur(' + motionBlur() + ')';
    el.classList.remove('is-visible');
  }

  function animateIn(el, extraDelay) {
    var dur = motionMs();
    var delay = (extraDelay || 0) + parseDelay(el);
    void el.offsetHeight;
    el.style.transition =
      'opacity ' + dur + 'ms ' + EASE + ', transform ' + dur + 'ms ' + EASE + ', filter ' + dur + 'ms ' + EASE;
    el.style.transitionDelay = delay + 'ms';
    el.style.opacity = '1';
    el.style.transform = 'translate3d(0, 0, 0)';
    el.style.filter = 'blur(0)';
    el.classList.add('is-visible');
    window.setTimeout(function () {
      el.style.transition = '';
      el.style.transitionDelay = '';
    }, dur + delay + 80);
  }

  function playReveal(el, extraDelay) {
    if (el.dataset.vlRevealed === '1') return;
    el.dataset.vlRevealed = '1';
    setHidden(el);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        animateIn(el, extraDelay || 0);
      });
    });
  }

  function scanReveal() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    getRevealNodes().forEach(function (el) {
      if (el.dataset.vlRevealed === '1') return;
      var rect = el.getBoundingClientRect();
      if (rect.top <= vh * 0.92 && rect.bottom >= vh * 0.08) {
        playReveal(el);
      }
    });
  }

  function playInnerPageEnter() {
    if (!isInnerPage()) return;

    var nodes = [];
    getRevealNodes().forEach(function (el) {
      if (el.dataset.vlRevealed === '1') return;
      var rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.95) nodes.push(el);
    });

    nodes.slice(0, 6).forEach(function (el, i) {
      playReveal(el, Math.min(i * 70, 280));
    });
  }

  function bootReveal() {
    autoTagRevealNodes();
    staggerDelays();

    getRevealNodes().forEach(function (el) {
      if (el.dataset.vlRevealed !== '1') setHidden(el);
    });

    if (observer) observer.disconnect();

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            playReveal(entry.target);
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.05, rootMargin: '0px 0px -6% 0px' }
      );
      getRevealNodes().forEach(function (el) {
        if (el.dataset.vlRevealed !== '1') observer.observe(el);
      });
    }

    requestAnimationFrame(scanReveal);
  }

  window.__vlRevealInit = function () {
    getRevealNodes().forEach(function (el) {
      delete el.dataset.vlRevealed;
      el.classList.remove('is-visible');
      el.style.opacity = '';
      el.style.transform = '';
      el.style.filter = '';
      el.style.transition = '';
      el.style.transitionDelay = '';
    });
    bootReveal();
    scanReveal();
  };

  function playHeroEntrance() {
    var dur = motionMs();
    var steps = [
      ['.vl-hero-title', 0],
      ['.vl-hero-sub', 80],
      ['.vl-hero-actions', 160],
      ['.vl-hero-mock', 240]
    ];
    steps.forEach(function (pair) {
      var el = document.querySelector('.velora-home .vl-hero ' + pair[0]);
      if (!el) return;
      el.style.transition = 'none';
      el.style.opacity = '0';
      el.style.transform = 'translate3d(0, 32px, 0)';
      el.style.filter = 'blur(10px)';
      void el.offsetHeight;
      requestAnimationFrame(function () {
        el.style.transition =
          'opacity ' + dur + 'ms ' + EASE + ', transform ' + dur + 'ms ' + EASE + ', filter ' + dur + 'ms ' + EASE;
        el.style.transitionDelay = pair[1] + 'ms';
        el.style.opacity = '1';
        el.style.transform = 'translate3d(0, 0, 0)';
        el.style.filter = 'blur(0)';
      });
    });
  }

  document.addEventListener('velora:motion-start', function () {
    playHeroEntrance();
    playInnerPageEnter();
  });

  function setupLenis() {
    if (window.__lenis) return window.__lenis;
    if (typeof Lenis === 'undefined') return null;

    var isHome = !!document.querySelector('.velora-home');
    var heroMock = document.querySelector('.velora-home .vl-hero-mock-stage');
    var heroParallaxLimit = window.innerHeight * 1.4;
    var parallaxActive = false;
    var revealTicking = false;

    var lenis = new Lenis({
      lerp: reduce.matches ? 0.14 : 0.11,
      duration: reduce.matches ? 1.05 : 1.75,
      easing: function (t) {
        return 1 - Math.pow(1 - t, 4);
      },
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.92,
      touchMultiplier: 1,
      infinite: false,
      autoRaf: true,
      allowNestedScroll: true
    });

    window.__lenis = lenis;

    if (heroMock && !reduce.matches) {
      lenis.on('scroll', function onHomeParallax(e) {
        var y = typeof e === 'object' && e.scroll != null ? e.scroll : lenis.scroll;
        if (y >= heroParallaxLimit) {
          if (parallaxActive) {
            heroMock.style.transform = '';
            parallaxActive = false;
          }
          return;
        }
        parallaxActive = true;
        heroMock.style.transform = 'translate3d(0,' + (y * 0.08) + 'px,0)';
      });
    }

    if (!isHome) {
      lenis.on('scroll', function onInnerReveal() {
        if (!revealTicking) {
          revealTicking = true;
          requestAnimationFrame(function () {
            scanReveal();
            revealTicking = false;
          });
        }
      });
    }

    document.addEventListener('show.bs.modal', function () {
      lenis.stop();
    });
    document.addEventListener('hidden.bs.modal', function () {
      lenis.start();
    });

    return lenis;
  }

  var anchorsBound = false;
  function setupAnchors() {
    if (anchorsBound) return;
    anchorsBound = true;
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href]');
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href || href.indexOf('#') === -1) return;
      var id = href.substring(href.indexOf('#') + 1);
      if (!id) return;
      var target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();

      if (window.__lenis) {
        window.__lenis.scrollTo(target, {
          offset: -80,
          duration: reduce.matches ? 0.6 : 1.65,
          easing: function (t) {
            return 1 - Math.pow(1 - t, 4);
          }
        });
      } else {
        target.scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth' });
      }

      var mobile = document.getElementById('vlMobileNav');
      var toggle = document.querySelector('.vl-nav-toggle');
      if (mobile && mobile.classList.contains('is-open')) {
        mobile.classList.remove('is-open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var navBound = false;
  function bindPageTransitions() {
    if (navBound || reduce.matches) return;
    navBound = true;

    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href]');
      if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.hasAttribute('data-bs-toggle') || a.hasAttribute('download')) return;

      var href = a.getAttribute('href');
      if (!href || href[0] === '#' || href.indexOf('javascript:') === 0) return;
      if (href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return;

      var url;
      try {
        url = new URL(a.href, window.location.href);
      } catch (err) {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.hash) return;

      e.preventDefault();

      try {
        sessionStorage.setItem('vl-nav-transition', '1');
      } catch (err) {}

      document.documentElement.classList.add('vl-page-exit');
      window.setTimeout(function () {
        window.location.href = a.href;
      }, 200);
    });
  }

  var scrollBound = false;
  function bindScroll() {
    if (scrollBound) return;
    scrollBound = true;
    window.addEventListener('scroll', scanReveal, { passive: true });
    window.addEventListener('resize', scanReveal, { passive: true });
  }

  function bootMotion() {
    bootReveal();
    bindScroll();
    setupAnchors();
    bindPageTransitions();
  }

  var lenisBootTries = 0;

  function bootLenis() {
    if (setupLenis()) {
      scanReveal();
      return;
    }
    if (lenisBootTries++ > 30) return;
    window.setTimeout(bootLenis, 120);
  }

  function bootLenisWhenReady() {
    if (document.documentElement.classList.contains('vl-motion-play')) {
      bootLenis();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootMotion);
  } else {
    bootMotion();
  }

  document.addEventListener('velora:motion-start', bootLenis);
  bootLenisWhenReady();
  document.addEventListener('shop:page-loaded', bootReveal);

  if (typeof reduce.addEventListener === 'function') {
    reduce.addEventListener('change', bootReveal);
  } else if (typeof reduce.addListener === 'function') {
    reduce.addListener(bootReveal);
  }
})();
