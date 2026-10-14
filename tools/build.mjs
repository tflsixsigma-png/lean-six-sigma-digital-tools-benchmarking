import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const [, , srcPath, outPath, metaPath, mode, tocPath] = process.argv;
const COVER_ONLY = mode === 'cover';
const META = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
const TOCNUM = tocPath && fs.existsSync(tocPath) ? JSON.parse(fs.readFileSync(tocPath, 'utf8')) : null;
const FONTDIR = 'file://' + path.resolve('fonts');
const PRINTCSS = fs.readFileSync('print.css', 'utf8').replace(/FONTDIR/g, FONTDIR);

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage();
const errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.goto('file://' + path.resolve(srcPath), { waitUntil: 'load' });
await page.evaluate(v => { window.__coverOnly = v; }, COVER_ONLY);

const parts = await page.evaluate(({ meta, tocnum }) => {
  // strip remote font links (offline) and page scripts
  document.querySelectorAll('link[rel="stylesheet"][href*="fonts.googleapis"], link[rel="preconnect"]').forEach(n => n.remove());
  document.querySelectorAll('.back, .exportbar, .savenote, .readout').forEach(n => n.remove());

  // the conditional-layer gate is an on-screen behaviour; say the printed thing instead
  // the simulators keep their default rendering; the controls make no sense on paper
  document.querySelectorAll('.sim').forEach(f => {
    var c = f.querySelector('.simctl'); if (c) c.remove();
    var s = f.querySelector('.simhead span');
    if (s) s.textContent = 'Shown here at its default setting. The version on the course page has sliders, and the chart and the sentence below move with them.';
  });

  document.querySelectorAll('.gate').forEach(g => {
    const d = document.createElement('div');
    d.className = 'ap-printnote';
    d.innerHTML = '<b>The next two sections apply only where the tool contains AI or machine learning.</b> ' +
      'If the last question of section 1 is answered no, go straight to section 5. In the online version these sections appear and disappear on their own.';
    g.replaceWith(d);
  });

  // form controls -> printable writing areas
  document.querySelectorAll('.field').forEach(f => {
    const sel = f.querySelector('select');
    if (sel) {
      const ul = document.createElement('ul');
      ul.className = 'ap-opts';
      [...sel.options].forEach(o => {
        const t = (o.textContent || '').trim();
        if (!t || t === '—' || /^select\b/i.test(t) || /—$/.test(t)) return;
        const li = document.createElement('li');
        const b = document.createElement('span'); b.className = 'ap-box';
        const s = document.createElement('span'); s.textContent = t;
        li.append(b, s); ul.append(li);
      });
      sel.replaceWith(ul);
      return;
    }
    const ta = f.querySelector('textarea');
    if (ta) { const d = document.createElement('div'); d.className = 'ap-write ap-tall'; ta.replaceWith(d); return; }
    const inp = f.querySelector('input');
    if (inp) {
      const d = document.createElement('div'); d.className = 'ap-write';
      const ph = inp.getAttribute('placeholder');
      if (ph) { const h = document.createElement('div'); h.className = 'hint'; h.textContent = ph; f.insertBefore(h, inp); }
      inp.replaceWith(d);
    }
  });

  // collect parts for the contents page
  const found = [...document.querySelectorAll('.partbar')].map(bar => ({
    n: (bar.querySelector('.n') || {}).textContent?.trim() || '',
    t: (bar.querySelector('h2') || {}).textContent?.trim() || ''
  }));

  // replace the web cover with a print cover
  const oldCover = document.querySelector('header.cover');
  if (oldCover) oldCover.remove();

  const cover = document.createElement('div');
  cover.className = 'ap-cover';
  cover.innerHTML =
    '<div class="ap-top"><div class="eyebrow">' + meta.eyebrow + '</div>' +
    '<h1>' + meta.title + '</h1>' +
    '<div class="ap-rule"></div>' +
    '<p class="ap-sub">' + meta.sub + '</p></div>' +
    '<div><div class="ap-meta">' + meta.meta + '</div></div>' +
    '<div class="ap-foot">' + meta.foot + '</div>';

  const toc = document.createElement('div');
  toc.className = 'ap-toc';
  const rows = found.map((p, i) => {
    const num = tocnum && tocnum[i] != null ? tocnum[i] : '—';
    return '<li><span class="ap-n">' + p.n + '</span><span class="ap-t">' + p.t + '</span><span class="ap-p">' + num + '</span></li>';
  }).join('');
  toc.innerHTML = '<h2>' + meta.tocTitle + '</h2>' +
    '<p class="ap-kick">' + meta.tocKick + '</p>' +
    '<ol>' + rows + '</ol>' +
    '<div class="ap-note">' + meta.tocNote + '</div>';

  if (window.__coverOnly) {
    document.body.innerHTML = '';
    document.body.appendChild(cover);
  } else {
    document.body.prepend(toc);
  }
  return found;
}, { meta: META, tocnum: TOCNUM });

await page.addStyleTag({ content: PRINTCSS });
if (COVER_ONLY) await page.addStyleTag({ content: '@page{size:A4;margin:0} .ap-cover{height:297mm;break-after:auto}' });
await page.emulateMedia({ media: 'print' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(600);

await page.pdf({
  path: outPath,
  format: 'A4',
  printBackground: true,
  displayHeaderFooter: false,
  margin: COVER_ONLY
    ? { top: '0', bottom: '0', left: '0', right: '0' }
    : { top: '17mm', bottom: '20mm', left: '0', right: '0' }
});

console.log(JSON.stringify({ parts: parts.map(p => p.t), errors: errs }));
await browser.close();
