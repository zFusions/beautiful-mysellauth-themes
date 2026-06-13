(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var cardTimers = new WeakMap();
  var played = new WeakSet();
  var pending = new WeakSet();
  var sectionRef = null;
  var booted = false;
  var scrollWatchBound = false;

  var TIMING = {
    enter: reduce.matches ? 220 : 420,
    move: reduce.matches ? 320 : 520,
    pause: reduce.matches ? 100 : 180,
    click: reduce.matches ? 90 : 140,
    ripple: reduce.matches ? 260 : 420,
    between: reduce.matches ? 180 : 320,
    timeline: reduce.matches ? 300 : 520,
    cardStagger: reduce.matches ? 140 : 280,
    finish: reduce.matches ? 280 : 480,
    revealWait: 120,
    loop: reduce.matches ? 0 : 7200
  };

  function clearCard(card) {
    var list = cardTimers.get(card);
    if (!list) return;
    list.forEach(clearTimeout);
    cardTimers.delete(card);
  }

  function later(card, fn, ms) {
    var id = setTimeout(fn, ms);
    if (!cardTimers.has(card)) cardTimers.set(card, []);
    cardTimers.get(card).push(id);
    return id;
  }

  function getPointer(panel) {
    var ptr = panel.querySelector('.vl-mock-pointer');
    if (!ptr) {
      ptr = document.createElement('span');
      ptr.className = 'vl-mock-pointer';
      ptr.setAttribute('aria-hidden', 'true');
      ptr.innerHTML =
        '<svg width="22" height="26" viewBox="0 0 18 21" fill="none" aria-hidden="true">' +
        '<path d="M2 1.5L2 17.5L6.5 13L9.5 19.5L11.5 18.5L8.5 12L14.5 12L2 1.5Z" fill="white" stroke="black" stroke-width="1.2" stroke-linejoin="round"/>' +
        '</svg>' +
        '<span class="vl-mock-pointer__ripple"></span>';
      panel.appendChild(ptr);
    }
    return ptr;
  }

  function targetCenter(panel, el, offset) {
    offset = offset || { x: 6, y: 6 };
    var pr = panel.getBoundingClientRect();
    var er = el.getBoundingClientRect();
    return {
      x: er.left - pr.left + er.width * 0.68 + offset.x,
      y: er.top - pr.top + er.height * 0.62 + offset.y
    };
  }

  function movePointer(ptr, pos, immediate) {
    ptr.style.transition = immediate
      ? 'none'
      : 'transform ' + TIMING.move + 'ms cubic-bezier(0.22, 1, 0.36, 1), opacity 0.32s ease';
    ptr.style.transform = 'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)';
    ptr.classList.add('is-visible');
  }

  function clickTarget(card, ptr, target, onDone) {
    target.classList.add('is-step-hit');
    ptr.classList.add('is-clicking');
    later(card, function () {
      ptr.classList.remove('is-clicking');
      target.classList.remove('is-step-hit');
      if (onDone) onDone();
    }, TIMING.click + TIMING.ripple);
  }

  function sequenceMoveClick(card, panel, ptr, target, immediate, onDone) {
    var pos = targetCenter(panel, target);
    movePointer(ptr, pos, immediate);
    later(
      card,
      function () {
        clickTarget(card, ptr, target, onDone);
      },
      immediate ? TIMING.enter : TIMING.move + TIMING.pause
    );
  }

  function resetTargets(card) {
    card.querySelectorAll('[data-step-target]').forEach(function (el) {
      el.classList.remove('is-step-hit', 'is-step-done', 'is-step-copied', 'is-step-processing');
      if (el.getAttribute('data-step-target') === 'copy') el.textContent = 'Copy';
    });
    var keycard = card.querySelector('.vl-flow-keycard');
    if (keycard) keycard.classList.remove('is-step-flash', 'is-delivered', 'is-copied');
  }

  function resetTimeline(card) {
    card.querySelectorAll('[data-step-timeline]').forEach(function (row) {
      row.classList.remove('is-done', 'is-active');
    });
  }

  function finishCard(card, ptr) {
    card.classList.add('is-step-done');
    card.classList.remove('is-step-live');
    later(card, function () {
      if (ptr) ptr.classList.remove('is-visible', 'is-clicking');
      scheduleLoop(card);
    }, TIMING.finish);
  }

  function scheduleLoop(card) {
    if (!TIMING.loop) return;
    later(card, function () {
      if (!isCardInView(card)) {
        scheduleLoop(card);
        return;
      }
      resetCard(card);
      queueCard(card, 0);
    }, TIMING.loop);
  }

  function resetBrowseCart(card) {
    var form = card.querySelector('[data-step-browse-form]');
    var cart = card.querySelector('[data-step-browse-cart]');
    if (form) form.classList.remove('is-closing', 'is-closed');
    if (cart) {
      cart.classList.remove('is-in');
      cart.setAttribute('aria-hidden', 'true');
    }
    card.querySelectorAll('[data-step-cart-line], [data-step-cart-total]').forEach(function (el) {
      el.classList.remove('is-in');
    });
  }

  function showBrowseCart(card) {
    var form = card.querySelector('[data-step-browse-form]');
    var cart = card.querySelector('[data-step-browse-cart]');
    if (form) form.classList.add('is-closing');

    later(card, function () {
      if (form) {
        form.classList.add('is-closed');
        form.classList.remove('is-closing');
      }
      if (cart) {
        cart.classList.add('is-in');
        cart.removeAttribute('aria-hidden');
      }

      later(card, function () {
        var line = cart && cart.querySelector('[data-step-cart-line]');
        var total = cart && cart.querySelector('[data-step-cart-total]');
        if (line) line.classList.add('is-in');
        if (total) total.classList.add('is-in');
      }, 160);
    }, 420);
  }

  function animBrowse(card) {
    var panel = card.querySelector('.vl-flow-panel');
    var product = card.querySelector('[data-step-target="product"]');
    var cta = card.querySelector('[data-step-target="cta"]');
    if (!panel || !product || !cta) return;

    resetTargets(card);
    resetBrowseCart(card);
    card.classList.add('is-step-live');
    var ptr = getPointer(panel);
    ptr.classList.remove('is-visible', 'is-clicking');

    movePointer(ptr, targetCenter(panel, panel, { x: 36, y: 28 }), true);

    later(card, function () {
      sequenceMoveClick(card, panel, ptr, product, false, function () {
        later(card, function () {
          sequenceMoveClick(card, panel, ptr, cta, false, function () {
            later(card, function () {
              ptr.classList.remove('is-visible');
              showBrowseCart(card);
              later(card, function () {
                resetBrowseCart(card);
                finishCard(card, ptr);
              }, 1100);
            }, 180);
          });
        }, TIMING.between);
      });
    }, TIMING.enter);
  }

  function resetCheckoutSuccess(card) {
    var form = card.querySelector('[data-step-checkout-form]');
    var success = card.querySelector('[data-step-checkout-success]');
    if (form) form.classList.remove('is-closing', 'is-closed');
    if (success) {
      success.classList.remove('is-in');
      success.setAttribute('aria-hidden', 'true');
    }
  }

  function showCheckoutSuccess(card) {
    var form = card.querySelector('[data-step-checkout-form]');
    var success = card.querySelector('[data-step-checkout-success]');
    if (form) form.classList.add('is-closing');

    later(card, function () {
      if (form) {
        form.classList.add('is-closed');
        form.classList.remove('is-closing');
      }
      if (success) {
        success.classList.add('is-in');
        success.removeAttribute('aria-hidden');
      }
    }, 420);
  }

  function animCheckout(card) {
    var panel = card.querySelector('.vl-flow-panel');
    var pay = card.querySelector('[data-step-target="pay"]');
    if (!panel || !pay) return;

    resetTargets(card);
    resetCheckoutSuccess(card);
    card.classList.add('is-step-live');
    var ptr = getPointer(panel);
    ptr.classList.remove('is-visible', 'is-clicking');

    movePointer(ptr, targetCenter(panel, panel, { x: 48, y: 36 }), true);

    later(card, function () {
      sequenceMoveClick(card, panel, ptr, pay, false, function () {
        later(card, function () {
          ptr.classList.remove('is-visible');
          showCheckoutSuccess(card);
          later(card, function () {
            finishCard(card, ptr);
          }, 900);
        }, 180);
      });
    }, TIMING.enter);
  }

  function animDelivery(card) {
    var panel = card.querySelector('.vl-flow-panel');
    var copy = card.querySelector('[data-step-target="copy"]');
    var rows = card.querySelectorAll('[data-step-timeline]');
    if (!panel || !copy || !rows.length) return;

    resetTargets(card);
    resetTimeline(card);
    card.classList.add('is-step-live');
    var ptr = getPointer(panel);
    ptr.classList.remove('is-visible', 'is-clicking');

    var delay = TIMING.enter;
    rows.forEach(function (row, i) {
      later(card, function () {
        row.classList.add('is-done');
        if (i === rows.length - 1) {
          row.classList.add('is-active');
          var keycard = card.querySelector('[data-step-keycard]');
          if (keycard) keycard.classList.add('is-delivered');
        }
      }, delay);
      delay += TIMING.timeline;
    });

    later(card, function () {
      movePointer(ptr, targetCenter(panel, panel, { x: 42, y: 32 }), true);
      later(card, function () {
        sequenceMoveClick(card, panel, ptr, copy, false, function () {
          copy.textContent = 'Copied!';
          copy.classList.add('is-step-copied');
          var keycard = card.querySelector('.vl-flow-keycard');
          if (keycard) {
            keycard.classList.add('is-step-flash', 'is-copied');
          }
          finishCard(card, ptr);
        });
      }, TIMING.enter);
    }, delay + TIMING.between);
  }

  function runCard(card) {
    var kind = card.getAttribute('data-step-card');
    if (kind === 'browse') animBrowse(card);
    else if (kind === 'checkout') animCheckout(card);
    else if (kind === 'delivery') animDelivery(card);
  }

  function cardIsReady(card) {
    if (!isCardInView(card)) return false;
    if (!card.hasAttribute('data-reveal')) return true;
    if (!card.classList.contains('is-visible')) return false;
    var opacity = parseFloat(window.getComputedStyle(card).opacity);
    return isNaN(opacity) || opacity >= 0.72;
  }

  function startCard(card, staggerIndex) {
    if (played.has(card) || pending.has(card)) return;
    pending.add(card);

    var delay = (staggerIndex || 0) * TIMING.cardStagger;
    var attempts = 0;

    function launch() {
      attempts += 1;
      if (played.has(card)) {
        pending.delete(card);
        return;
      }
      if (!cardIsReady(card)) {
        if (attempts < 48) {
          later(card, launch, TIMING.revealWait);
          return;
        }
      }
      if (!isCardInView(card)) {
        pending.delete(card);
        return;
      }

      pending.delete(card);
      played.add(card);
      later(card, function () {
        runCard(card);
      }, delay);
    }

    later(card, launch, delay);
  }

  function queueCard(card, staggerIndex) {
    startCard(card, staggerIndex);
  }

  function resetCard(card) {
    clearCard(card);
    played.delete(card);
    pending.delete(card);
    card.classList.remove('is-step-live', 'is-step-done');
    resetTargets(card);
    resetTimeline(card);
    if (card.getAttribute('data-step-card') === 'checkout') resetCheckoutSuccess(card);
    if (card.getAttribute('data-step-card') === 'browse') resetBrowseCart(card);
    var ptr = card.querySelector('.vl-mock-pointer');
    if (ptr) ptr.classList.remove('is-visible', 'is-clicking');
    var pay = card.querySelector('[data-step-target="pay"]');
    if (pay) pay.textContent = 'Pay securely';
  }

  function isCardInView(card) {
    var panel = card.querySelector('.vl-flow-panel');
    if (!panel) return false;

    var r = panel.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    if (vh <= 0 || r.height <= 0) return false;

    var visibleTop = Math.max(r.top, 0);
    var visibleBottom = Math.min(r.bottom, vh);
    var visibleH = visibleBottom - visibleTop;
    if (visibleH <= 0) return false;

    return visibleH / r.height >= 0.22;
  }

  function sectionIsOnScreen() {
    if (!sectionRef) return false;
    var r = sectionRef.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    return r.top < vh * 0.94 && r.bottom > 40;
  }

  function checkCardsInView() {
    if (!sectionRef || !sectionIsOnScreen()) return;

    var cards = sectionRef.querySelectorAll('.vl-flow-card[data-step-card]');
    var queue = [];

    cards.forEach(function (card, index) {
      if (played.has(card) || pending.has(card)) return;
      if (isCardInView(card)) queue.push({ card: card, index: index });
    });

    queue.forEach(function (entry, queueIndex) {
      queueCard(entry.card, queueIndex);
    });
  }

  var cardObserver = null;
  var sectionObserver = null;

  function bindCardObserver() {
    if (!sectionRef || typeof IntersectionObserver === 'undefined') return;

    if (cardObserver) cardObserver.disconnect();
    cardObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var card = entry.target.closest('.vl-flow-card[data-step-card]');
          if (!card || played.has(card) || pending.has(card)) return;
          queueCard(card, 0);
        });
      },
      { threshold: 0.28, rootMargin: '0px 0px -8% 0px' }
    );

    sectionRef.querySelectorAll('.vl-flow-panel').forEach(function (panel) {
      cardObserver.observe(panel);
    });

    if (sectionObserver) sectionObserver.disconnect();
    sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          checkCardsInView();
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -4% 0px' }
    );
    sectionObserver.observe(sectionRef);
  }

  function bindScrollWatch() {
    if (scrollWatchBound) return;
    scrollWatchBound = true;

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        checkCardsInView();
        ticking = false;
      });
    }

    window.addEventListener('scroll', function () {
      if (window.__lenis) return;
      onScroll();
    }, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    function bindLenis() {
      if (window.__lenis && !window.__lenis.__vlStepsWatchBound) {
        window.__lenis.__vlStepsWatchBound = true;
        window.__lenis.on('scroll', onScroll);
        return true;
      }
      return false;
    }

    bindLenis();
    document.addEventListener('velora:motion-start', bindLenis);

    var lenisTries = 0;
    var lenisRetry = setInterval(function () {
      if (bindLenis() || lenisTries++ > 20) clearInterval(lenisRetry);
    }, 250);
  }

  function boot() {
    if (booted) return;
    var section = document.querySelector('.vl-steps-section[data-steps-section]');
    if (!section) return;

    booted = true;
    sectionRef = section;

    bindScrollWatch();
    bindCardObserver();

    function scheduleChecks() {
      requestAnimationFrame(function () {
        requestAnimationFrame(checkCardsInView);
      });
      [280, 900, 1400, 2200].forEach(function (ms) {
        window.setTimeout(checkCardsInView, ms);
      });
    }

    scheduleChecks();
  }

  function replay() {
    if (!sectionRef) {
      booted = false;
      boot();
    }
    if (!sectionRef) return;
    sectionRef.querySelectorAll('.vl-flow-card[data-step-card]').forEach(resetCard);
    bindCardObserver();
    checkCardsInView();
    window.setTimeout(checkCardsInView, 320);
    window.setTimeout(checkCardsInView, 1200);
  }

  document.addEventListener('velora:motion-start', function () {
    boot();
    window.setTimeout(checkCardsInView, 160);
    window.setTimeout(checkCardsInView, 700);
    window.setTimeout(checkCardsInView, 1500);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.__vlStepsMockReplay = replay;
  window.__vlStepsMockCheck = checkCardsInView;
})();