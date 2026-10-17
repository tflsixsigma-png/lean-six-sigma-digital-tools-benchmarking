/* Shared behaviour for the fillable instruments (Value Case Canvas, Digital Tool Appraisal,
   Benchmarking Study — in English and Portuguese).

   Each page declares its fields with data-section / data-label and calls Instrument.init(cfg).
   This module saves answers in the browser, keeps the on-page readout current, copies a plain-text
   version, and exports a typeset PDF built in the browser with pdfmake (vendored in js/vendor,
   loaded only when the button is pressed). Nothing is transmitted. */
(function (global) {
  'use strict';

  var C = { navy: '#0A2342', ink: '#04121F', gold: '#B8820F', goldSoft: '#F2DFB4', paper: '#FBFAF7',
            line: '#C9D4E0', soft: '#F3F6FA', cream: '#FEF8EA', muted: '#56687C', body: '#101B25' };

  var T = {
    en: { notAnswered: 'not answered', readout: 'What these answers say', page: 'Page', of: 'of',
          generated: 'Exported', copied: 'Copied', clearAsk: 'Clear every field?', copyPrompt: 'Copy the text:',
          building: 'Preparing the PDF…', failed: 'The PDF could not be built in this browser. Use “Copy as text” instead.',
          imported: function (n) { return 'Filled ' + n + ' field' + (n === 1 ? '' : 's') + '. Check them, then download the PDF.'; },
          unplaced: 'Could not place — fill these in by hand:', nothing: 'Nothing recognised. Paste the whole text block the AI coach gave you.',
          months: ['January','February','March','April','May','June','July','August','September','October','November','December'] },
    pt: { notAnswered: 'sem resposta', readout: 'O que estas respostas dizem', page: 'Página', of: 'de',
          generated: 'Exportado em', copied: 'Copiado', clearAsk: 'Apagar todos os campos?', copyPrompt: 'Copie o texto:',
          building: 'Preparando o PDF…', failed: 'Não foi possível gerar o PDF neste navegador. Use “Copiar como texto”.',
          imported: function (n) { return n + (n === 1 ? ' campo preenchido' : ' campos preenchidos') + '. Confiram e baixem o PDF.'; },
          unplaced: 'Não foi possível encaixar — preencham à mão:', nothing: 'Nada reconhecido. Colem o bloco de texto inteiro que o coach de IA entregou.',
          months: ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'] }
  };

  function scriptBase() {
    var s = document.querySelector('script[src*="instrument.js"]');
    return s ? s.getAttribute('src').replace(/instrument\.js.*$/, '') : 'js/';
  }

  var pdfReady = null;
  function loadPdfMake() {
    if (global.pdfMake && global.pdfMake.vfs) return Promise.resolve();
    if (pdfReady) return pdfReady;
    var base = scriptBase() + 'vendor/';
    function add(src) {
      return new Promise(function (res, rej) {
        var s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej;
        document.head.appendChild(s);
      });
    }
    pdfReady = add(base + 'pdfmake.min.js').then(function () { return add(base + 'vfs_fonts.js'); });
    return pdfReady;
  }

  // "<b>x</b> rest" -> pdfmake rich text
  function rich(html) {
    var parts = [], re = /<b>(.*?)<\/b>/g, last = 0, m;
    var clean = function (s) { return glyphs(s).replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'); };
    while ((m = re.exec(html))) {
      if (m.index > last) parts.push({ text: clean(html.slice(last, m.index)) });
      parts.push({ text: clean(m[1]), bold: true, color: C.navy });
      last = re.lastIndex;
    }
    if (last < html.length) parts.push({ text: clean(html.slice(last)) });
    return parts;
  }
  // the embedded Roboto has no arrow glyphs and no emoji: map what people type to what it can draw
  function glyphs(t) {
    return String(t)
      .replace(/[\u2192\u21D2\u27F6\u279C\u2794]|-->|->/g, '›')
      .replace(/[\u2190\u21D0\u27F5]|<--|<-/g, '‹')
      .replace(/[\u2191]/g, '^').replace(/[\u2193]/g, 'v')
      .replace(/[\u2713\u2714\u2705]/g, '(ok)')
      .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '')
      .replace(/[\u2600-\u27BF\uFE0F]/g, '');
  }
  function plain(html) { return html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&'); }

  function init(cfg) {
    var L = T[cfg.lang || 'en'];
    var root = document.getElementById(cfg.rootId || 'canvas');
    if (!root) return;
    var who = cfg.whoId ? document.getElementById(cfg.whoId) : null;
    var fields = [].slice.call(root.querySelectorAll('[data-label]'));
    var all = who ? fields.concat([who]) : fields;
    var extra = (cfg.extraIds || []).map(function (id) { return document.getElementById(id); }).filter(Boolean);
    all = all.concat(extra.filter(function (e) { return all.indexOf(e) === -1; }));

    var api = {
      el: function (id) { return document.getElementById(id); },
      val: function (id) { var e = document.getElementById(id); return e ? (e.value || '') : ''; },
      txt: function (id) {
        var e = document.getElementById(id);
        if (!e || !e.value) return '';
        return e.options ? e.options[e.selectedIndex].text : e.value.trim();
      },
      flagged: function (id) { var v = api.val(id); return v.indexOf('flag-') === 0; },
      blank: function (id) { return !api.val(id).trim(); }
    };

    try {
      var saved = JSON.parse(localStorage.getItem(cfg.key) || '{}');
      all.forEach(function (f) { if (typeof saved[f.id] === 'string') f.value = saved[f.id]; });
    } catch (e) {}

    if (cfg.prefill) { try { cfg.prefill(api); } catch (e) {} }

    function save() {
      try {
        var o = {};
        all.forEach(function (f) { o[f.id] = f.value; });
        localStorage.setItem(cfg.key, JSON.stringify(o));
      } catch (e) {}
    }

    function readoutItems() { return cfg.readout ? (cfg.readout(api) || []) : []; }

    function renderReadout() {
      var body = cfg.readoutId && document.getElementById(cfg.readoutId);
      if (!body) return;
      var items = readoutItems();
      body.innerHTML = items.length
        ? '<ul>' + items.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul>'
        : '<p class="none" style="margin:0">' + cfg.readoutEmpty + '</p>';
    }

    function onChange() { save(); if (cfg.onChange) cfg.onChange(api); renderReadout(); }
    all.forEach(function (f) { f.addEventListener('input', onChange); f.addEventListener('change', onChange); });
    if (cfg.onChange) cfg.onChange(api);
    renderReadout();

    // ---------- collect ----------
    function collect() {
      var secs = [], cur = null;
      fields.forEach(function (f) {
        var sec = f.getAttribute('data-section') || '';
        if (cfg.skipSection && cfg.skipSection(sec, api)) return;
        if (!cur || cur.name !== sec) { cur = { name: sec, rows: [] }; secs.push(cur); }
        var v = f.options ? (f.value ? f.options[f.selectedIndex].text : '') : (f.value || '');
        cur.rows.push({ label: f.getAttribute('data-label'), value: v.trim() });
      });
      return secs;
    }

    function today() {
      var d = new Date();
      return cfg.lang === 'pt' ? d.getDate() + ' de ' + L.months[d.getMonth()] + ' de ' + d.getFullYear()
                               : d.getDate() + ' ' + L.months[d.getMonth()] + ' ' + d.getFullYear();
    }

    function slug() {
      var src = (cfg.slugFrom && api.val(cfg.slugFrom).trim()) || (who && who.value.trim()) || 'export';
      return src.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
        .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'export';
    }

    // ---------- plain text ----------
    function buildText() {
      var out = [cfg.title.toUpperCase(), cfg.subtitle, cfg.context, ''];
      if (who) out.push(cfg.whoLabel + ': ' + (who.value.trim() || '—'));
      collect().forEach(function (s) {
        out.push('', s.name.toUpperCase());
        s.rows.forEach(function (r) { out.push('  ' + r.label + ': ' + (r.value || '—')); });
      });
      var items = readoutItems();
      if (items.length) {
        out.push('', L.readout.toUpperCase());
        items.forEach(function (s) { out.push('  • ' + plain(s)); });
      }
      out.push('', cfg.footer);
      return out.join('\n');
    }

    // ---------- PDF ----------
    function docDefinition() {
      var W = 595.28, M = 46;
      var content = [];
      var whoVal = who ? (who.value.trim() || '—') : '';

      // cover band (drawn as page-1 background) + title block
      content.push({ text: cfg.eyebrow.toUpperCase(), fontSize: 7.5, bold: true, color: C.goldSoft, characterSpacing: 1.2, margin: [0, 2, 0, 8] });
      content.push({ text: cfg.title, fontSize: 25, bold: true, color: '#FFFFFF', margin: [0, 0, 0, 4] });
      content.push({ text: cfg.subtitle, fontSize: 10.5, color: '#C6D4E4', margin: [0, 0, 0, 14] });
      content.push({
        columns: [
          who ? { text: [{ text: cfg.whoLabel + '   ', color: C.goldSoft, bold: true, fontSize: 8 }, { text: glyphs(whoVal), color: '#FFFFFF', fontSize: 11, bold: true }] } : { text: '' },
          { text: L.generated + ' ' + today(), alignment: 'right', color: '#A8BBD1', fontSize: 8.5, margin: [0, 2, 0, 0] }
        ], margin: [0, 0, 0, 48]
      });

      // highlight boxes
      if (cfg.highlights && cfg.highlights.length) {
        var cells = cfg.highlights.map(function (h) {
          var v = h.compute ? h.compute(api) : api.txt(h.id);
          return {
            stack: [
              { text: h.label.toUpperCase(), fontSize: 7, bold: true, color: C.muted, characterSpacing: 0.8, margin: [0, 0, 0, 4] },
              { text: glyphs(v || '—'), fontSize: 11, bold: true, color: v ? C.navy : '#9AA8B8' }
            ], fillColor: C.soft, margin: [10, 9, 10, 10]
          };
        });
        content.push({
          table: { widths: cfg.highlights.map(function () { return '*'; }), body: [cells] },
          layout: { hLineWidth: function () { return 0; }, vLineWidth: function (i, node) { return (i === 0 || i === node.table.widths.length) ? 0 : 4; },
                    vLineColor: function () { return '#FFFFFF'; }, paddingLeft: function () { return 0; }, paddingRight: function () { return 0; },
                    paddingTop: function () { return 0; }, paddingBottom: function () { return 0; } },
          margin: [0, 0, 0, 18]
        });
      }

      // sections — heading kept with its first rows (repeated if a table runs over a page)
      var n = 0, lastNum = null;
      collect().forEach(function (s) {
        var head;
        if (cfg.headings && cfg.headings[s.name]) head = cfg.headings[s.name];
        else { n++; head = (cfg.numberSections === false ? '' : n + ' · ') + s.name; }
        var headCell = {
          colSpan: 2, margin: [0, 8, 0, 6],
          table: { widths: [4, '*'], body: [[{ text: '', fillColor: C.gold }, { text: head, fontSize: 12.5, bold: true, color: C.navy, margin: [8, 3, 0, 3] }]] },
          layout: 'noBorders'
        };
        var body = [[headCell, {}]];
        s.rows.forEach(function (r, k) {
          var fill = k % 2 ? '#FFFFFF' : C.soft;
          body.push([
            { text: glyphs(r.label), fontSize: 8.6, bold: true, color: C.navy, fillColor: fill, margin: [6, 5, 6, 5] },
            r.value ? { text: glyphs(r.value), fontSize: 9.8, color: C.body, fillColor: fill, margin: [6, 4.5, 6, 5], lineHeight: 1.18 }
                    : { text: L.notAnswered, fontSize: 9, italics: true, color: '#9AA8B8', fillColor: fill, margin: [6, 5, 6, 5] }
          ]);
        });
        content.push({
          table: { widths: [150, '*'], headerRows: 1, keepWithHeaderRows: Math.min(2, s.rows.length), dontBreakRows: true, body: body },
          layout: { hLineWidth: function (i, node) { return i === 0 ? 0 : (i === 1 || i === node.table.body.length) ? 0.6 : 0.3; },
                    vLineWidth: function () { return 0; }, hLineColor: function () { return C.line; },
                    paddingLeft: function () { return 0; }, paddingRight: function () { return 0; } },
          margin: [0, 0, 0, 10]
        });
      });

      // readout
      var items = readoutItems();
      if (items.length) {
        content.push({
          table: {
            widths: ['*'], body: [[{
              stack: [
                { text: L.readout, fontSize: 12.5, bold: true, color: C.navy, margin: [0, 0, 0, 7] },
                { ul: items.map(function (s) { return { text: rich(s), fontSize: 9.6, color: C.body, lineHeight: 1.2, margin: [0, 0, 0, 5] }; }), markerColor: C.gold }
              ], fillColor: C.cream, margin: [14, 12, 14, 8]
            }]]
          },
          layout: { hLineWidth: function (i) { return i === 0 ? 2.5 : 0.6; }, vLineWidth: function () { return 0; },
                    hLineColor: function (i) { return i === 0 ? C.gold : C.line; } },
          margin: [0, 8, 0, 0], unbreakable: items.length <= 12
        });
      }
      if (cfg.closingNote) content.push({ text: cfg.closingNote, fontSize: 8.6, italics: true, color: C.muted, margin: [0, 14, 0, 0] });

      return {
        pageSize: 'A4',
        pageMargins: [M, 40, M, 44],
        info: { title: cfg.title + (whoVal ? ' — ' + whoVal : ''), author: 'Prof. Dr. Thiago Lima', subject: cfg.subtitle },
        defaultStyle: { font: 'Roboto', fontSize: 10, color: C.body },
        background: function (page) {
          if (page !== 1) return null;
          return { canvas: [
            { type: 'rect', x: 0, y: 0, w: W, h: 172, color: C.ink },
            { type: 'rect', x: 0, y: 172, w: W, h: 4, color: C.gold }
          ] };
        },
        footer: function (page, pages) {
          return { margin: [M, 14, M, 0], columns: [
            { text: cfg.footer, fontSize: 7, color: '#6B7D92' },
            { text: L.page + ' ' + page + ' ' + L.of + ' ' + pages, alignment: 'right', fontSize: 7, bold: true, color: '#6B7D92', width: 80 }
          ] };
        },
        content: content
      };
    }

    function flash(btn, msg) { var old = btn.textContent; btn.textContent = msg; setTimeout(function () { btn.textContent = old; }, 2200); }

    var dl = document.getElementById(cfg.buttons.download);
    if (dl) dl.addEventListener('click', function () {
      var btn = this, old = btn.textContent;
      btn.textContent = L.building; btn.disabled = true;
      loadPdfMake().then(function () {
        global.pdfMake.createPdf(docDefinition()).download(cfg.filePrefix + '-' + slug() + '.pdf');
      }).catch(function () { window.alert(L.failed); })
        .then(function () { btn.textContent = old; btn.disabled = false; });
    });

    var cp = document.getElementById(cfg.buttons.copy);
    if (cp) cp.addEventListener('click', function () {
      var btn = this, text = buildText();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { flash(btn, L.copied); })
          .catch(function () { window.prompt(L.copyPrompt, text); });
      } else { window.prompt(L.copyPrompt, text); }
    });

    var cl = document.getElementById(cfg.buttons.clear);
    if (cl) cl.addEventListener('click', function () {
      if (!window.confirm(L.clearAsk)) return;
      all.forEach(function (f) { f.value = ''; });
      onChange();
    });


    // ---------- paste from the AI coach ----------
    // Reads the plain-text format produced by "Copy as text" (and by the AI coach skill):
    // one "Label: value" per line. Section titles and readout lines are ignored; the readout is recomputed.
    function norm(t) {
      return (t || '').replace(/[–‒―]/g, '—').replace(/\s*—\s*/g, ' — ')
        .replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim().toLowerCase();
    }
    function importText(text) {
      var targets = all.map(function (f) { return { f: f, label: f.getAttribute('data-label') || (f === who ? cfg.whoLabel : '') }; })
        .filter(function (t) { return t.label; })
        .sort(function (a, b) { return b.label.length - a.label.length; });
      var filled = 0, unplaced = [];
      (text || '').split(/\r?\n/).forEach(function (line) {
        var t = line.replace(/\*\*/g, '').replace(/^\s*[-•*]\s+/, '').trim();
        if (!t) return;
        var low = norm(t);
        for (var i = 0; i < targets.length; i++) {
          var lab = norm(targets[i].label);
          if (low.indexOf(lab + ':') !== 0) continue;
          var f = targets[i].f, v = t.slice(t.indexOf(':', targets[i].label.length - 1) + 1).trim();
          if (/^[—\-–]?$/.test(v)) v = '';
          if (f.options) {
            if (!v) { f.selectedIndex = 0; filled++; return; }
            var nv = norm(v), hit = -1;
            for (var k = 1; k < f.options.length && hit === -1; k++) if (norm(f.options[k].text) === nv) hit = k;
            for (k = 1; k < f.options.length && hit === -1; k++) {
              var o = norm(f.options[k].text);
              if (nv.indexOf(o + ' —') === 0 || nv.indexOf(o + '.') === 0 || (nv.length > 12 && o.indexOf(nv) === 0)) hit = k;
            }
            if (hit === -1) { unplaced.push(targets[i].label + ': ' + v); return; }
            f.selectedIndex = hit;
          } else { f.value = v; }
          filled++;
          return;
        }
      });
      onChange();
      return { filled: filled, unplaced: unplaced };
    }

    var ps = cfg.buttons.paste && document.getElementById(cfg.buttons.paste);
    var pbox = cfg.pasteBoxId && document.getElementById(cfg.pasteBoxId);
    if (ps && pbox) {
      var ta = pbox.querySelector('textarea'), go = pbox.querySelector('button'), msg = pbox.querySelector('.pastemsg');
      ps.addEventListener('click', function () { pbox.hidden = !pbox.hidden; if (!pbox.hidden) ta.focus(); });
      go.addEventListener('click', function () {
        var r = importText(ta.value);
        if (!r.filled) { msg.textContent = L.nothing; return; }
        msg.innerHTML = '';
        msg.appendChild(document.createTextNode(L.imported(r.filled)));
        if (r.unplaced.length) {
          msg.appendChild(document.createElement('br'));
          msg.appendChild(document.createTextNode(L.unplaced + ' ' + r.unplaced.join(' · ')));
        } else { ta.value = ''; }
      });
    }

    // exposed for testing
    global.__instrument = { doc: docDefinition, text: buildText, load: loadPdfMake, importText: importText };
  }

  global.Instrument = { init: init };
})(window);
