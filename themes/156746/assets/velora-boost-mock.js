(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var timers = [];
  var booted = false;

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function later(fn, ms) {
    var id = setTimeout(fn, ms);
    timers.push(id);
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

  function pickScenario(list) {
    var last = '';
    try {
      last = sessionStorage.getItem('vl-boost-scenario') || '';
    } catch (e) {}

    var pool = list.filter(function (s) {
      return s.id !== last;
    });
    if (!pool.length) pool = list;

    var weights = pool.map(function (s) {
      return s.weight || 1;
    });
    var total = weights.reduce(function (a, b) {
      return a + b;
    }, 0);
    var r = Math.random() * total;
    var picked = pool[pool.length - 1];
    for (var i = 0; i < pool.length; i++) {
      r -= weights[i];
      if (r <= 0) {
        picked = pool[i];
        break;
      }
    }

    try {
      sessionStorage.setItem('vl-boost-scenario', picked.id);
    } catch (e) {}
    return picked;
  }

  /** Début du token + ******** — comme le panel bot */
  function maskToken(raw) {
    var t = String(raw || '').trim();
    if (!t) return '********';
    var visible = Math.min(12, Math.max(6, Math.ceil(t.length * 0.4)));
    return t.slice(0, visible) + '********';
  }

  function fakeToken(i) {
    var p = ['MT', 'OD', 'Nz'][i % 3];
    return p + hex(2) + '.' + hex(3) + '.' + hex(4) + hex(4);
  }

  function makeClock() {
    var h = rand(9, 22);
    var m = rand(0, 59);
    var s = 0;
    return function () {
      s += rand(1, 4);
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

  function buildTokenPool(count) {
    var pool = [];
    var i;
    var raw;
    for (i = 0; i < count; i++) {
      raw = fakeToken(i);
      pool.push({ raw: raw, masked: maskToken(raw) });
    }
    return pool;
  }

  function successLines(tokens, tick, opts) {
    opts = opts || {};
    var lines = [];
    var total = tokens.length;
    var i;
    var token;
    var captchaAt = opts.captchaAt;

    for (i = 0; i < total; i++) {
      token = tokens[i];

      if (captchaAt === i) {
        lines.push({
          ts: tick(),
          text: 'Captcha detected ' + token.masked + ' - Attempting solve...',
          cls: 'is-dim'
        });
        lines.push({
          ts: tick(),
          text: '[ANYSOLVER] Captcha résolu en ' + opts.solveSec + 's',
          cls: 'is-dim'
        });
        lines.push({
          ts: tick(),
          text: 'Captcha solved ' + token.masked + ' - Joining server...',
          cls: 'is-dim'
        });
      }

      lines.push({
        ts: tick(),
        text: '✓ Boosted Successfully ' + token.masked,
        cls: 'is-ok'
      });
    }

    return lines;
  }

  function buildScenarios() {
    var invite = 'velora-market';
    var boosts = 14;
    var tokensOk = 7;
    var tokens = buildTokenPool(tokensOk);
    var solveSec = (rand(12, 28) / 10).toFixed(1);
    var orderIntro =
      'Processing Auto Boost Order: ' +
      boosts +
      ' boosts (' +
      tokensOk +
      ' tokens) for https://discord.gg/' +
      invite;

    function finishLine(tick) {
      return {
        ts: tick(),
        text:
          'Auto Boost Completed: ' +
          boosts +
          '/' +
          boosts +
          ' boosts | ' +
          tokensOk +
          ' tokens OK, 0 failed | Invite: ' +
          invite,
        cls: 'is-stat',
        final: true
      };
    }

    return [
      {
        id: 'success',
        weight: 3,
        tab: 'boost-bot · console',
        status: { label: 'Running', mod: '' },
        metrics: [boosts + ' boosts', tokensOk + ' tokens', invite],
        progress: { label: 'Boost progress', total: boosts },
        logs: function () {
          var tick = makeClock();
          var lines = [{ ts: tick(), text: orderIntro, cls: 'is-dim' }];
          lines = lines.concat(successLines(tokens, tick));
          lines.push(finishLine(tick));
          return lines;
        }
      },
      {
        id: 'captcha',
        weight: 1,
        tab: 'boost-bot · console',
        status: { label: 'Running', mod: 'is-solving' },
        metrics: [boosts + ' boosts', tokensOk + ' tokens', invite],
        progress: { label: 'Boost progress', total: boosts },
        logs: function () {
          var tick = makeClock();
          var lines = [{ ts: tick(), text: orderIntro, cls: 'is-dim' }];
          lines = lines.concat(successLines(tokens, tick, { captchaAt: 0, solveSec: solveSec }));
          lines.push(finishLine(tick));
          return lines;
        }
      }
    ];
  }

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function setText(el, text) {
    if (el) el.textContent = text;
  }

  function setStatus(panel, status) {
    if (!status) return;
    var badge = qs('[data-boost-status]', panel);
    var label = qs('[data-boost-status-label]', panel);
    if (!badge || !label) return;
    badge.className = 'vl-boost-status' + (status.mod ? ' ' + status.mod : '');
    setText(label, status.label);
  }

  function setMetrics(panel, values) {
    values.forEach(function (val, i) {
      var el = qs('[data-boost-metric="' + i + '"]', panel);
      if (el) el.textContent = val;
    });
  }

  function setProgress(panel, current, total) {
    var fill = qs('[data-boost-progress-fill]', panel);
    var count = qs('[data-boost-progress-count]', panel);
    if (!fill || !count || !total) return;
    fill.style.width = Math.min(100, Math.round((current / total) * 100)) + '%';
    setText(count, current + '/' + total);
  }

  function appendLog(body, line, index) {
    var row = document.createElement('p');
    row.className = 'vl-boost-log ' + (line.cls || 'is-dim');
    if (line.final) row.classList.add('is-final');
    row.style.setProperty('--log-i', String(index));
    row.innerHTML =
      '<span class="vl-boost-ts">[' +
      line.ts +
      ']</span> ' +
      line.text +
      (line.final ? '<span class="vl-boost-cursor is-blink"></span>' : '');
    body.appendChild(row);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        row.classList.add('is-visible');
        body.scrollTop = body.scrollHeight;
      });
    });
  }

  function progressFromLogs(logs, index, total) {
    if (logs[index].final) return total;
    var ok = 0;
    for (var i = 0; i <= index; i++) {
      if (logs[i].cls === 'is-ok') ok += 2;
    }
    return Math.min(total, ok);
  }

  function playScenario(panel, scenario) {
    clearTimers();

    var body = qs('[data-boost-logs]', panel);
    var fill = qs('[data-boost-progress-fill]', panel);
    if (!body || !scenario) return;

    body.innerHTML = '';
    if (fill) fill.style.width = '0%';

    var logs = typeof scenario.logs === 'function' ? scenario.logs() : scenario.logs;
    var total = scenario.progress.total;

    setText(qs('[data-boost-tab]', panel), scenario.tab);
    setText(qs('[data-boost-ping]', panel), 'discord.gg/' + (scenario.metrics[2] || 'velora-market'));
    setStatus(panel, scenario.status);
    setMetrics(panel, scenario.metrics);
    setProgress(panel, 0, total);

    var start = reduce.matches ? 400 : 900;
    var stagger = reduce.matches ? 180 : 520;

    logs.forEach(function (line, i) {
      later(function () {
        appendLog(body, line, i);
        setProgress(panel, progressFromLogs(logs, i, total), total);
        if (line.final) {
          setStatus(panel, { label: 'Complete', mod: 'is-complete' });
        }
      }, start + i * stagger);
    });
  }

  function bootBoostMock(force) {
    if (!document.querySelector('.velora-home [data-boost-panel]')) return;
    if (!force && booted) return;
    booted = true;
    playScenario(qs('.velora-home [data-boost-panel]'), pickScenario(buildScenarios()));
  }

  document.addEventListener('velora:motion-start', function () {
    bootBoostMock(false);
  });
  window.__vlBoostMockReplay = function () {
    booted = false;
    bootBoostMock(true);
  };
})();