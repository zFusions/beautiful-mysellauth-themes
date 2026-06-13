(function () {
  'use strict';

  var loader = document.getElementById('page-loader');
  var isInner = document.body.classList.contains('velora-inner-page');
  var fromNav = false;

  try {
    fromNav = sessionStorage.getItem('vl-nav-transition') === '1';
    sessionStorage.removeItem('vl-nav-transition');
  } catch (e) {}

  if (fromNav) {
    document.documentElement.classList.add('vl-page-from-nav');
  }

  var done = false;

  function finish() {
    if (done) return;
    done = true;
    if (loader) {
      loader.classList.add('is-hidden');
      window.setTimeout(function () {
        if (loader.parentNode) loader.remove();
      }, 400);
    }
    document.documentElement.classList.add('vl-motion-play');
    document.dispatchEvent(new CustomEvent('velora:motion-start'));
  }

  function onReady() {
    var delay = isInner ? (fromNav ? 60 : 100) : 0;
    window.setTimeout(function () {
      requestAnimationFrame(function () {
        requestAnimationFrame(finish);
      });
    }, delay);
  }

  if (!loader && isInner) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', onReady);
    } else {
      onReady();
    }
    window.setTimeout(finish, 1200);
    return;
  }

  if (!loader) return;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }

  window.setTimeout(finish, isInner ? 1400 : 3500);
})();
