/**
 * Legacy file — reveal logic lives inline in layouts/master.njk.
 * Kept for sellauth-theme watch sync; exports __vlRevealInit if loaded manually.
 */
(function () {
  'use strict';
  if (typeof window.__vlRevealInit === 'function') return;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var observer = null;

  function initReveal() {
    var nodes = Array.prototype.filter.call(document.querySelectorAll('[data-reveal]'), function (el) {
      if (el.closest('.vl-hero')) return false;
      if (el.getAttribute('aria-hidden') === 'true') return false;
      return true;
    });
    if (!nodes.length) return;
    if (observer) observer.disconnect();
    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      nodes.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    nodes.forEach(function (el) {
      el.classList.remove('is-visible');
      observer.observe(el);
    });
  }

  window.__vlRevealInit = initReveal;
  initReveal();
})();
