// Shared frame reproducing the Sorbonne / IAE Paris "Template Professor" (16:9, 13.333 x 7.5 in)
const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

const NAVY = '082A54', BLUE = '4A7DBA', GOLD = 'C59221', GREY = 'E6E6E6', INK = '1A1A1A', MUT = '5A6675', WHITE = 'FFFFFF', SOFT = 'F3F6FA', GOLDSOFT = 'FBF3E0';
const FONT = 'Calibri';
const W = 13.333, H = 7.5;
const CX = 0.5, CW = W - 1.0;            // content column
const CY = 1.0, CH = 5.95;               // content band (header 0.7, footer from 7.1)
const LOGO1 = path.join(__dirname, 'tu/ppt/media/image1.png'); // IAE Paris wordmark 1558x350
const LOGO2 = path.join(__dirname, 'tu/ppt/media/image2.png'); // emblem 1942x2048

function newDeck(meta) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.author = 'Prof. Dr. Thiago Lima';
  pres.company = 'IAE Paris - Sorbonne Business School · IDGP Academy';
  pres.title = meta.title;
  pres.theme = { headFontFace: FONT, bodyFontFace: FONT };

  // CONTENT frame: navy header bar + footer bar, as in the template's slides 2-3
  pres.defineSlideMaster({
    title: 'CONTENT', background: { color: WHITE },
    objects: [
      { rect: { x: 0, y: 0, w: W, h: 0.7, fill: { color: NAVY } } },
      { rect: { x: 0, y: 7.1, w: W, h: 0.4, fill: { color: NAVY } } },
      { text: { text: meta.footer, options: { x: 0.5, y: 7.1, w: 9, h: 0.4, fontFace: FONT, fontSize: 9, color: 'C6D4E4', valign: 'middle', margin: 0 } } },
      { placeholder: { options: { name: 'title', type: 'title', x: 0.5, y: 0.08, w: 11.3, h: 0.54, fontFace: FONT, fontSize: 22, bold: true, color: WHITE, valign: 'middle', margin: 0 }, text: '' } },
    ],
    slideNumber: { x: 12.3, y: 7.1, w: 0.6, h: 0.4, fontFace: FONT, fontSize: 9, color: 'C6D4E4', align: 'right' },
  });
  // COVER frame: white, logos top-right, navy band at the bottom (template slide 1)
  pres.defineSlideMaster({
    title: 'COVER', background: { color: WHITE },
    objects: [
      { rect: { x: 0, y: 6.1, w: W, h: 1.4, fill: { color: NAVY } } },
      { image: { path: LOGO1, x: 8.13, y: 0.7, w: 3.62, h: 0.81 } },
      { image: { path: LOGO2, x: 11.9, y: 0.43, w: 1.1, h: 1.16 } },
    ],
  });
  // CLOSE frame: navy left block, logos bottom-right (template slide 4)
  pres.defineSlideMaster({
    title: 'CLOSE', background: { color: WHITE },
    objects: [
      { rect: { x: 0, y: 0, w: 7.61, h: H, fill: { color: NAVY } } },
      { image: { path: LOGO1, x: 8.46, y: 6.43, w: 3.52, h: 0.79 } },
      { image: { path: LOGO2, x: 12.11, y: 6.16, w: 1.07, h: 1.13 } },
    ],
  });
  return pres;
}

// ---------- slide builders ----------
function cover(pres, title, subtitle, meta) {
  const s = pres.addSlide({ masterName: 'COVER' });
  s.addText(title, { x: 0.8, y: 1.75, w: 10.5, h: 1.3, fontFace: FONT, fontSize: 34, bold: true, color: NAVY, valign: 'bottom', margin: 0, isTextBox: true });
  s.addText(subtitle, { x: 0.8, y: 3.1, w: 9.5, h: 0.9, fontFace: FONT, fontSize: 24, bold: true, color: GOLD, valign: 'top', margin: 0, isTextBox: true });
  s.addText(meta, { x: 0.8, y: 4.3, w: 9.5, h: 1.2, fontFace: FONT, fontSize: 15, color: MUT, valign: 'top', margin: 0, isTextBox: true, lineSpacingMultiple: 1.2 });
  return s;
}

function closing(pres, lines) {
  const s = pres.addSlide({ masterName: 'CLOSE' });
  s.addText('THANK YOU', { x: 0.9, y: 2.9, w: 6, h: 1.0, fontFace: FONT, fontSize: 50, bold: true, color: WHITE, margin: 0, isTextBox: true });
  s.addText(lines, { x: 8.2, y: 1.2, w: 4.7, h: 4.3, fontFace: FONT, fontSize: 14, color: INK, valign: 'top', margin: 0, isTextBox: true, lineSpacingMultiple: 1.25 });
  return s;
}

function content(pres, title, section) {
  const s = pres.addSlide({ masterName: 'CONTENT', sectionTitle: section });
  s.addText(title, { placeholder: 'title' });
  return s;
}

// Section divider on the content frame: large part label and title, template style
function divider(pres, part, title, lead, section) {
  const s = content(pres, part, section);
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: CX, y: 1.3, w: CW, h: 4.9, fill: { color: NAVY }, line: { color: NAVY }, rectRadius: 0.15 });
  s.addText(part.toUpperCase(), { x: 1.1, y: 1.9, w: 6, h: 0.5, fontFace: FONT, fontSize: 14, bold: true, color: GOLD, charSpacing: 4, margin: 0, isTextBox: true });
  s.addText(title, { x: 1.1, y: 2.5, w: 10.8, h: 1.4, fontFace: FONT, fontSize: 38, bold: true, color: WHITE, valign: 'top', margin: 0, isTextBox: true });
  if (lead) s.addText(lead, { x: 1.1, y: 4.1, w: 10.8, h: 1.7, fontFace: FONT, fontSize: 17, color: 'C6D4E4', valign: 'top', margin: 0, isTextBox: true, lineSpacingMultiple: 1.2 });
  return s;
}

// Rounded card as in template slide 3 (white, blue border) or tinted
function card(s, pres, x, y, w, h, head, body, opts = {}) {
  const fill = opts.fill || WHITE, line = opts.line || BLUE;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: fill }, line: { color: line, width: 1.25 }, rectRadius: 0.12 });
  let ty = y + 0.18;
  if (head) {
    s.addText(head, { x: x + 0.22, y: ty, w: w - 0.44, h: 0.42, fontFace: FONT, fontSize: opts.headSize || 16, bold: true, color: opts.headColor || NAVY, valign: 'top', margin: 0, isTextBox: true });
    ty += 0.46;
  }
  if (body) {
    const items = Array.isArray(body) ? body : [body];
    const runs = items.map((t, i) => (typeof t === 'string' ? { text: t, options: { breakLine: i < items.length - 1, bullet: opts.bullets ? true : undefined, paraSpaceAfter: opts.bullets ? 4 : 6 } } : t));
    s.addText(runs, { x: x + 0.22, y: ty, w: w - 0.44, h: y + h - ty - 0.15, fontFace: FONT, fontSize: opts.size || 13, color: opts.color || INK, valign: 'top', margin: 0, isTextBox: true, lineSpacingMultiple: 1.12 });
  }
}

function bullets(s, items, x, y, w, h, opts = {}) {
  const runs = items.map((t, i) => (typeof t === 'string'
    ? { text: t, options: { bullet: opts.plain ? undefined : true, breakLine: i < items.length - 1, paraSpaceAfter: opts.gap || 8 } }
    : Object.assign({}, t, { options: Object.assign({ bullet: opts.plain ? undefined : true, breakLine: i < items.length - 1, paraSpaceAfter: opts.gap || 8 }, t.options || {}) })));
  s.addText(runs, { x, y, w, h, fontFace: FONT, fontSize: opts.size || 15, color: opts.color || INK, valign: 'top', margin: 0, isTextBox: true, lineSpacingMultiple: 1.12 });
}

function para(s, text, x, y, w, h, opts = {}) {
  s.addText(text, { x, y, w, h, fontFace: FONT, fontSize: opts.size || 15, bold: !!opts.bold, italic: !!opts.italic, color: opts.color || INK, valign: opts.valign || 'top', align: opts.align || 'left', margin: 0, isTextBox: true, lineSpacingMultiple: 1.15 });
}

// Table with navy header row and light banding, template palette
function table(s, rows, x, y, w, opts = {}) {
  const colW = opts.colW;
  const head = rows[0].map(t => ({ text: t, options: { bold: true, color: WHITE, fill: { color: NAVY }, fontSize: opts.headSize || 12, fontFace: FONT, valign: 'middle' } }));
  const body = rows.slice(1).map((r, i) => r.map((c, j) => {
    const cell = typeof c === 'string' ? { text: c, options: {} } : c;
    cell.options = Object.assign({ fontSize: opts.size || 12, fontFace: FONT, color: INK, valign: 'top', fill: { color: i % 2 ? SOFT : WHITE } }, cell.options || {});
    if (j === 0 && opts.boldFirst !== false) cell.options.bold = true;
    return cell;
  }));
  s.addTable([head, ...body], { x, y, w, colW, border: { type: 'solid', pt: 0.5, color: 'C9D3DE' }, margin: [0.06, 0.1, 0.06, 0.1], autoPage: false, rowH: opts.rowH });
}

function equation(s, pres, x, y, w, h, formula, caption, size) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: NAVY }, line: { color: NAVY }, rectRadius: 0.12 });
  s.addText(formula, { x: x + 0.2, y: y + 0.12, w: w - 0.4, h: h * 0.58, fontFace: 'Cambria', fontSize: size || 30, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0, isTextBox: true });
  if (caption) s.addText(caption, { x: x + 0.2, y: y + h * 0.62, w: w - 0.4, h: h * 0.34, fontFace: FONT, fontSize: 12, color: 'F2DFB4', align: 'center', valign: 'top', margin: 0, isTextBox: true });
}

function figure(s, file, x, y, w, h, caption) {
  const p = path.join(__dirname, 'figs', file);
  const { width, height } = require('child_process').execSync(`python3 -c "from PIL import Image;im=Image.open('${p}');print(im.size[0],im.size[1])"`).toString().trim().split(' ').reduce((o, v, i) => (i ? { ...o, height: +v } : { width: +v }), {});
  // fit inside box keeping ratio
  let iw = w, ih = w * height / width;
  if (ih > h) { ih = h; iw = h * width / height; }
  s.addImage({ path: p, x: x + (w - iw) / 2, y, w: iw, h: ih });
  if (caption) s.addText(caption, { x, y: y + ih + 0.08, w, h: 0.5, fontFace: FONT, fontSize: 11, italic: true, color: MUT, valign: 'top', margin: 0, isTextBox: true });
  return ih;
}

function callout(s, pres, x, y, w, h, text, opts = {}) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: opts.fill || GOLDSOFT }, line: { color: opts.line || GOLD, width: 1.25 }, rectRadius: 0.12 });
  s.addText(text, { x: x + 0.22, y: y + 0.1, w: w - 0.44, h: h - 0.2, fontFace: FONT, fontSize: opts.size || 14, bold: !!opts.bold, italic: !!opts.italic, color: opts.color || INK, valign: 'middle', margin: 0, isTextBox: true, lineSpacingMultiple: 1.12 });
}

function stat(s, pres, x, y, w, h, big, label, opts = {}) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: opts.fill || SOFT }, line: { color: opts.line || 'C9D3DE', width: 1 }, rectRadius: 0.12 });
  s.addText(big, { x: x + 0.15, y: y + 0.12, w: w - 0.3, h: h * 0.5, fontFace: 'Cambria', fontSize: opts.bigSize || 36, bold: true, color: opts.bigColor || NAVY, align: 'center', valign: 'middle', margin: 0, isTextBox: true });
  s.addText(label, { x: x + 0.15, y: y + h * 0.6, w: w - 0.3, h: h * 0.38, fontFace: FONT, fontSize: opts.size || 12, color: MUT, align: 'center', valign: 'top', margin: 0, isTextBox: true });
}

// "In project terms" block, three rows like the notes
function projectTerms(s, pres, x, y, w, h, idea, project, monday) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: SOFT }, line: { color: BLUE, width: 1.25 }, rectRadius: 0.12 });
  s.addText('IN PROJECT TERMS', { x: x + 0.22, y: y + 0.14, w: w - 0.44, h: 0.3, fontFace: FONT, fontSize: 11, bold: true, color: GOLD, charSpacing: 3, margin: 0, isTextBox: true });
  const rows = [['THE IDEA', idea], ['IN A PROJECT', project], ['ON MONDAY', monday]].filter(r => r[1]);
  const avail = h - 0.5;
  const weights = rows.map(r => Math.max(1.2, Math.ceil(r[1].length / 150)) + 0.35);
  const tot = weights.reduce((a, b) => a + b, 0);
  let ry = y + 0.48;
  rows.forEach((r, i) => {
    const rh = avail * weights[i] / tot;
    s.addText(r[0], { x: x + 0.22, y: ry, w: 1.3, h: rh - 0.08, fontFace: FONT, fontSize: 10.5, bold: true, color: NAVY, valign: 'top', margin: 0, isTextBox: true });
    s.addText(r[1], { x: x + 1.55, y: ry, w: w - 1.8, h: rh - 0.08, fontFace: FONT, fontSize: 12.5, color: INK, valign: 'top', margin: 0, isTextBox: true, lineSpacingMultiple: 1.1 });
    ry += rh;
  });
}

function agenda(s, pres, items) {
  // template slide 2: plain bullet list, 24pt; we keep the register with numbered parts
  const runs = items.map((t, i) => ({ text: t, options: { bullet: { type: 'number' }, breakLine: i < items.length - 1, paraSpaceAfter: 7 } }));
  s.addText(runs, { x: 1.0, y: 1.3, w: 7.2, h: 5.4, fontFace: FONT, fontSize: 18, color: INK, valign: 'top', margin: 0, isTextBox: true, lineSpacingMultiple: 1.1 });
}

module.exports = { newDeck, cover, closing, content, divider, card, bullets, para, table, equation, figure, callout, stat, projectTerms, agenda, C: { NAVY, BLUE, GOLD, GREY, INK, MUT, WHITE, SOFT, GOLDSOFT }, FONT, W, H, CX, CW, CY, CH };
