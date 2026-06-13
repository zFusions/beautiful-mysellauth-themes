(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var cardTimers = new WeakMap();
  var played = new WeakSet();
  var sectionRef = null;
  var booted = false;
  var scrollWatchBound = false;
  var sectionBelowFoldAtBoot = false;

  /** Timings décoratifs — terminal / panier (meters inchangés) */
  var TIMING = {
    scriptsStart: 200,
    scriptsStagger: 340,
    scriptsFinishDelay: 450,
    cartStart: 200,
    cartStagger: 480,
    cartTotalDelay: 400,
    cartFinishDelay: 300,
    meterGap: 520,
    meterFinishDelay: 1200,
    cardStagger: 280
  };

  var ease = TIMING;

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

  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function hex(n) {
    var s = rand(0, Math.pow(16, n) - 1).toString(16);
    while (s.length < n) s = '0' + s;
    return s;
  }

  function fakeToken(i) {
    var p = ['MT', 'OD', 'Nz'][i % 3];
    return p + hex(2) + '.' + hex(3) + '.' + hex(4) + hex(4);
  }

  function maskToken(raw) {
    var t = String(raw || '').trim();
    var visible = Math.min(12, Math.max(6, Math.ceil(t.length * 0.4)));
    return t.slice(0, visible) + '********';
  }

  function makeClock() {
    var h = rand(10, 20);
    var m = rand(0, 59);
    var s = rand(0, 50);
    return function () {
      s += rand(2, 4);
      if (s >= 60) {
        s -= 60;
        m += 1;
      }
      var pad = function (n) {
        return String(n).padStart(2, '0');
      };
      return pad(h) + ':' + pad(m) + ':' + pad(s);
    };
  }

  function resetMeterFill(fill) {
    if (!fill) return;
    fill.style.transition = 'none';
    fill.style.width = '0%';
    fill.style.removeProperty('--w');
  }

  function animateMeterFill(fill, target, duration) {
    if (!fill) return;
    resetMeterFill(fill);
    void fill.offsetWidth;
    fill.style.transition =
      'width ' + duration + 'ms cubic-bezier(0.16, 1, 0.3, 1)';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        fill.style.width = target + '%';
      });
    });
  }

  function finishCard(card) {
    card.classList.add('is-done');
    card.classList.remove('is-live');
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
      : 'transform 480ms cubic-bezier(0.22, 1, 0.36, 1), opacity 0.32s ease';
    ptr.style.transform = 'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)';
    ptr.classList.add('is-visible');
  }

  function clickTarget(card, ptr, target, onDone) {
    target.classList.add('is-mock-hit');
    ptr.classList.add('is-clicking');
    later(card, function () {
      ptr.classList.remove('is-clicking');
      target.classList.remove('is-mock-hit');
      if (onDone) onDone();
    }, 520);
  }

  function sequenceMoveClick(card, panel, ptr, target, immediate, onDone) {
    var pos = targetCenter(panel, target);
    movePointer(ptr, pos, immediate);
    later(
      card,
      function () {
        clickTarget(card, ptr, target, onDone);
      },
      immediate ? 360 : 640
    );
  }

  function resetQrScan(qr) {
    if (!qr) return;
    qr.classList.remove('is-scanned');
  }

  function confirmQrPayment(qr, card, done) {
    if (!qr) {
      if (done) done();
      return;
    }

    resetQrScan(qr);

    var delay = reduce.matches ? 720 : 2400;

    later(card, function () {
      qr.classList.add('is-scanned');
      if (done) done();
    }, delay);
  }

  function resetDiscordPay(card) {
    var pay = card.querySelector('[data-flow-discord-pay]');
    var qr = card.querySelector('[data-flow-qr]');
    var status = card.querySelector('[data-flow-pay-status]');
    if (pay) {
      pay.classList.remove('is-in', 'is-closing', 'is-closed', 'is-paid');
      pay.setAttribute('aria-hidden', 'true');
    }
    resetQrScan(qr);
    if (status) status.textContent = 'Waiting for payment…';
  }

  function resetDiscordSuccess(card) {
    var cart = card.querySelector('[data-flow-discord-cart]');
    var success = card.querySelector('[data-flow-discord-success]');
    if (cart) cart.classList.remove('is-closing', 'is-closed');
    if (success) {
      success.classList.remove('is-in');
      success.setAttribute('aria-hidden', 'true');
    }
    resetDiscordPay(card);
  }

  function showDiscordSuccess(card, skipCartClose) {
    var cart = card.querySelector('[data-flow-discord-cart]');
    var success = card.querySelector('[data-flow-discord-success]');
    var totalEl = card.querySelector('[data-flow-cart-total]');
    var sub = card.querySelector('[data-flow-success-sub]');

    if (sub && totalEl) {
      sub.textContent = 'Instant delivery · ' + totalEl.textContent.trim();
    }

    function revealSuccess() {
      if (success) {
        success.classList.add('is-in');
        success.removeAttribute('aria-hidden');
      }
    }

    if (skipCartClose) {
      revealSuccess();
      return;
    }

    if (cart) cart.classList.add('is-closing');

    later(card, function () {
      if (cart) {
        cart.classList.add('is-closed');
        cart.classList.remove('is-closing');
      }
      revealSuccess();
    }, 420);
  }

  function showDiscordPayThenSuccess(card, onDone) {
    var cart = card.querySelector('[data-flow-discord-cart]');
    var pay = card.querySelector('[data-flow-discord-pay]');
    var amount = card.querySelector('[data-flow-pay-amount]');
    var totalEl = card.querySelector('[data-flow-cart-total]');
    var qr = card.querySelector('[data-flow-qr]');
    var status = card.querySelector('[data-flow-pay-status]');

    if (amount && totalEl) {
      amount.textContent = totalEl.textContent.trim();
    }

    if (cart) cart.classList.add('is-closing');

    later(card, function () {
      if (cart) {
        cart.classList.add('is-closed');
        cart.classList.remove('is-closing');
      }
      if (pay) {
        pay.classList.add('is-in');
        pay.removeAttribute('aria-hidden');
      }
      if (status) status.textContent = 'Waiting for payment…';

      confirmQrPayment(qr, card, function () {
        if (pay) pay.classList.add('is-paid');
        if (status) status.textContent = 'Payment received';

        later(card, function () {
          if (pay) pay.classList.add('is-closing');

          later(card, function () {
            if (pay) {
              pay.classList.add('is-closed');
              pay.classList.remove('is-closing', 'is-in', 'is-paid');
              pay.setAttribute('aria-hidden', 'true');
            }
            showDiscordSuccess(card, true);
            later(card, function () {
              if (onDone) onDone();
            }, 880);
          }, 420);
        }, 480);
      });
    }, 400);
  }

  function animDiscordCheckoutClick(card) {
    var panel = card.querySelector('.vl-flow-panel');
    var checkout = card.querySelector('[data-flow-target="checkout"]');
    if (!panel || !checkout) {
      finishCard(card);
      return;
    }

    var ptr = getPointer(panel);
    ptr.classList.remove('is-visible', 'is-clicking');
    movePointer(ptr, targetCenter(panel, panel, { x: 40, y: 36 }), true);

    later(card, function () {
      sequenceMoveClick(card, panel, ptr, checkout, false, function () {
        later(card, function () {
          ptr.classList.remove('is-visible');
          showDiscordPayThenSuccess(card, function () {
            finishCard(card);
          });
        }, 180);
      });
    }, 300);
  }

  function appendTerminalLine(body, line) {
    var row = document.createElement('p');
    row.className = 'vl-flow-log ' + (line.cls || 'is-dim');
    row.innerHTML = '<span class="vl-boost-ts">[' + line.ts + ']</span> ' + line.text;
    body.appendChild(row);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        row.classList.add('is-in');
        body.scrollTop = body.scrollHeight;
      });
    });
  }

  function animScripts(card) {
    var body = card.querySelector('[data-flow-terminal]');
    if (!body) return;

    clearCard(card);
    body.innerHTML = '';

    var tokens = [];
    var i;
    for (i = 0; i < 7; i++) {
      tokens.push(maskToken(fakeToken(i)));
    }

    var tick = makeClock();
    var idx = 0;

    function next() {
      if (idx >= tokens.length) {
        appendTerminalLine(body, {
          ts: tick(),
          text: 'Auto Boost Completed: 14/14 boosts | 7 tokens OK, 0 failed',
          cls: 'is-dim'
        });
        later(card, function () {
          finishCard(card);
        }, ease.scriptsFinishDelay);
        return;
      }
      appendTerminalLine(body, {
        ts: tick(),
        text: '✓ Boosted Successfully ' + tokens[idx],
        cls: 'is-ok'
      });
      idx += 1;
      later(card, next, ease.scriptsStagger);
    }

    later(card, next, ease.scriptsStart);
  }

  function ensureCartSlots(list, count) {
    var rows = list.querySelectorAll('.vl-flow-cart-line');
    var i;
    for (i = rows.length; i < count; i++) {
      var row = document.createElement('li');
      row.className = 'vl-flow-cart-line';
      row.setAttribute('aria-hidden', 'true');
      list.appendChild(row);
    }
    return list.querySelectorAll('.vl-flow-cart-line');
  }

  function resetCartSlots(list) {
    if (!list) return;
    list.querySelectorAll('.vl-flow-cart-line').forEach(function (row) {
      row.classList.remove('is-in');
      row.innerHTML = '';
      row.setAttribute('aria-hidden', 'true');
    });
  }

  function fillCartLine(row, item) {
    row.innerHTML =
      '<span>' +
      item.name +
      '</span><strong>€' +
      item.price.toFixed(2) +
      '</strong>';
    row.removeAttribute('aria-hidden');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        row.classList.add('is-in');
      });
    });
  }

  function animDiscord(card) {
    var list = card.querySelector('[data-flow-cart-list]');
    var countEl = card.querySelector('[data-flow-cart-count]');
    var totalEl = card.querySelector('[data-flow-cart-total]');
    var totalRow = card.querySelector('[data-flow-cart-total-row]');
    if (!list) return;

    var catalog = [
      { name: 'Boost Bot', price: 9.99 },
      { name: 'Token checker', price: 4.99 },
      { name: 'Auto mod pack', price: 14.99 }
    ];

    clearCard(card);
    resetCartSlots(list);
    if (totalRow) totalRow.classList.remove('is-in');
    if (countEl) countEl.textContent = '0 items';
    if (totalEl) totalEl.textContent = '€0.00';

    ensureCartSlots(list, catalog.length);

    var running = 0;
    var idx = 0;
    var slots = list.querySelectorAll('.vl-flow-cart-line');

    function next() {
      if (idx >= catalog.length) {
        later(card, function () {
          if (totalRow) {
            requestAnimationFrame(function () {
              requestAnimationFrame(function () {
                totalRow.classList.add('is-in');
              });
            });
          }
          later(card, function () {
            animDiscordCheckoutClick(card);
          }, ease.cartFinishDelay);
        }, ease.cartTotalDelay);
        return;
      }

      var item = catalog[idx];
      fillCartLine(slots[idx], item);
      running += item.price;
      if (countEl) {
        countEl.textContent = idx + 1 + ' item' + (idx > 0 ? 's' : '');
        countEl.classList.remove('is-tick');
        void countEl.offsetWidth;
        countEl.classList.add('is-tick');
      }
      if (totalEl) {
        totalEl.textContent = '€' + running.toFixed(2);
      }
      idx += 1;
      later(card, next, ease.cartStagger);
    }

    later(card, next, ease.cartStart);
  }

  function animPremium(card) {
    var bars = card.querySelectorAll('[data-flow-meter-bar]');
    if (!bars.length) return;

    clearCard(card);

    bars.forEach(function (bar) {
      var fill = bar.querySelector('i');
      var meter = bar.closest('.vl-flow-meter');
      if (meter) meter.classList.remove('is-anim');
      resetMeterFill(fill);
    });

    var maxEnd = 0;

    bars.forEach(function (bar, n) {
      var fill = bar.querySelector('i');
      var meter = bar.closest('.vl-flow-meter');
      var target = parseFloat(bar.getAttribute('data-target') || '50');
      var duration = parseFloat(bar.getAttribute('data-duration') || (n === 0 ? '2400' : '1800'));
      var delay = n === 0 ? 320 : ease.meterGap * n;

      later(card, function () {
        if (meter) meter.classList.add('is-anim');
        animateMeterFill(fill, target, duration);
      }, delay);

      maxEnd = Math.max(maxEnd, delay + duration);
    });

    later(
      card,
      function () {
        finishCard(card);
      },
      maxEnd + ease.meterFinishDelay
    );
  }

  function initCardState(card) {
    var mock = card.querySelector('[data-flow-mock]');
    if (!mock) return;

    var type = mock.getAttribute('data-flow-mock');
    if (type === 'scripts') {
      var body = card.querySelector('[data-flow-terminal]');
      if (body) body.innerHTML = '';
    } else if (type === 'discord') {
      var list = card.querySelector('[data-flow-cart-list]');
      resetCartSlots(list);
      ensureCartSlots(list, 3);
      var totalRow = card.querySelector('[data-flow-cart-total-row]');
      if (totalRow) totalRow.classList.remove('is-in');
      var countEl = card.querySelector('[data-flow-cart-count]');
      var totalEl = card.querySelector('[data-flow-cart-total]');
      if (countEl) countEl.textContent = '0 items';
      if (totalEl) totalEl.textContent = '€0.00';
      resetDiscordSuccess(card);
    } else if (type === 'premium') {
      card.querySelectorAll('[data-flow-meter-bar]').forEach(function (bar) {
        var fill = bar.querySelector('i');
        var meter = bar.closest('.vl-flow-meter');
        if (meter) meter.classList.remove('is-anim');
        resetMeterFill(fill);
      });
    }
  }

  function startCard(card, staggerIndex) {
    if (played.has(card)) return;
    played.add(card);

    var delay = (staggerIndex || 0) * ease.cardStagger;

    later(card, function () {
      card.classList.add('is-live');

      var mock = card.querySelector('[data-flow-mock]');
      if (!mock) return;

      var type = mock.getAttribute('data-flow-mock');
      if (type === 'scripts') animScripts(card);
      else if (type === 'discord') animDiscord(card);
      else if (type === 'premium') animPremium(card);
    }, delay);
  }

  function resetCard(card) {
    clearCard(card);
    played.delete(card);
    card.classList.remove('is-live', 'is-done');
    var cta = card.querySelector('.vl-flow-cta');
    if (cta) cta.classList.remove('is-done', 'is-mock-hit');
    var ptr = card.querySelector('.vl-mock-pointer');
    if (ptr) ptr.classList.remove('is-visible', 'is-clicking');
    initCardState(card);
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

    return visibleH / r.height >= 0.08;
  }

  function getScrollY() {
    var y = window.scrollY || window.pageYOffset || 0;
    if (window.__lenis && typeof window.__lenis.scroll === 'number') {
      y = Math.max(y, window.__lenis.scroll);
    }
    if (window.__lenis && window.__lenis.animatedScroll != null) {
      y = Math.max(y, window.__lenis.animatedScroll);
    }
    return y;
  }

  function sectionIsOnScreen() {
    if (!sectionRef) return false;
    var r = sectionRef.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    return r.top < vh * 0.94 && r.bottom > 24;
  }

  function canRunMocks() {
    if (!sectionRef) return false;
    var r = sectionRef.getBoundingClientRect();
    if (r.bottom < 24) return false;
    if (sectionIsOnScreen()) return true;
    if (!sectionBelowFoldAtBoot) return true;
    return getScrollY() > 8;
  }

  function checkCardsInView() {
    if (!sectionRef || !canRunMocks()) return;

    var cards = sectionRef.querySelectorAll('.vl-flow-card');
    var queue = [];

    cards.forEach(function (card, index) {
      if (played.has(card)) return;
      if (isCardInView(card)) queue.push({ card: card, index: index });
    });

    queue.forEach(function (entry, queueIndex) {
      startCard(entry.card, queueIndex);
    });
  }

  var cardObserver = null;

  function bindCardObserver() {
    if (!sectionRef || cardObserver || typeof IntersectionObserver === 'undefined') return;

    cardObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var card = entry.target.closest('.vl-flow-card');
          if (!card || played.has(card)) return;
          if (!canRunMocks()) return;
          startCard(card, 0);
          cardObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -4% 0px' }
    );

    sectionRef.querySelectorAll('.vl-flow-panel').forEach(function (panel) {
      cardObserver.observe(panel);
    });
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
      if (window.__lenis && !window.__lenis.__vlFlowWatchBound) {
        window.__lenis.__vlFlowWatchBound = true;
        window.__lenis.on('scroll', onScroll);
      }
    }

    bindLenis();
    document.addEventListener('velora:motion-start', bindLenis);

    var lenisTries = 0;
    var lenisRetry = setInterval(function () {
      if (bindLenis() || lenisTries++ > 14) clearInterval(lenisRetry);
    }, 350);
  }

  function setupCursorLight(section) {
    var glow = section.querySelector('.vl-flow-cursor-light');
    if (!glow || reduce.matches) return;

    var target = { x: 0, y: 0 };
    var current = { x: 0, y: 0 };
    var active = false;

    section.addEventListener('mouseenter', function () {
      active = true;
      glow.classList.add('is-on');
    });

    section.addEventListener('mouseleave', function () {
      active = false;
      glow.classList.remove('is-on');
    });

    section.addEventListener('mousemove', function (e) {
      var rect = section.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
    });

    function tick() {
      if (active) {
        current.x += (target.x - current.x) * 0.09;
        current.y += (target.y - current.y) * 0.09;
        glow.style.transform =
          'translate3d(' + (current.x - 140) + 'px,' + (current.y - 140) + 'px,0)';
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function boot() {
    if (booted) return;
    var section = document.querySelector('.vl-features-section[data-flow-section]');
    if (!section) return;

    booted = true;
    sectionRef = section;

    var vh = window.innerHeight || document.documentElement.clientHeight;
    sectionBelowFoldAtBoot = section.getBoundingClientRect().top >= vh * 0.82;

    section.querySelectorAll('.vl-flow-card').forEach(function (card) {
      initCardState(card);
    });

    bindScrollWatch();
    bindCardObserver();
    setupCursorLight(section);

    function scheduleChecks() {
      requestAnimationFrame(function () {
        requestAnimationFrame(checkCardsInView);
      });
      window.setTimeout(checkCardsInView, 280);
      window.setTimeout(checkCardsInView, 900);
    }

    scheduleChecks();
  }

  function replay() {
    if (!sectionRef) {
      booted = false;
      boot();
    }
    if (!sectionRef) return;
    if (cardObserver) {
      cardObserver.disconnect();
      cardObserver = null;
    }
    sectionRef.querySelectorAll('.vl-flow-card').forEach(resetCard);
    bindCardObserver();
    checkCardsInView();
    window.setTimeout(checkCardsInView, 320);
  }

  document.addEventListener('velora:motion-start', function () {
    boot();
    window.setTimeout(checkCardsInView, 120);
    window.setTimeout(checkCardsInView, 600);
  });
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.__vlFlowMockReplay = replay;
  window.__vlFlowMockCheck = checkCardsInView;
})();