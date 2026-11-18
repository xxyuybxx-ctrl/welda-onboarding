// 웰다 의료진용 덱 공통 서식
const fs = require('fs');
const path = require('path');
const pptxgen = require('pptxgenjs');

const SIZES = JSON.parse(fs.readFileSync(path.join(__dirname, 'assets.json'), 'utf8'));
const A = n => path.join(__dirname, 'assets', n);

const THEME = {
  name: 'Welda Clinical',
  headFontFace: 'Pretendard',
  bodyFontFace: 'Pretendard',
  colors: {
    dk1: '252B3B', lt1: 'FFFFFF', dk2: '1B2559', lt2: 'F5F7FC',
    accent1: '6B4EF0', accent2: '1497A8', accent3: 'B9A8F8', accent4: 'C2410C',
    accent5: '8B94A7', accent6: 'E3E7F0', hlink: '6B4EF0', folHlink: '4A36B8'
  }
};
// 색 (hex 전용 옵션에서 쓰는 값)
const K = {
  navy: '1B2559', ink: '252B3B', sub: '545E72', muted: '8B94A7', line: 'E3E7F0', panel: 'F5F7FC',
  violet: '6B4EF0', violetDk: '4A36B8', violetLt: 'EEEAFE', violetMd: 'B9A8F8',
  teal: '1497A8', tealLt: 'E4F5F7', red: 'C2410C', redLt: 'FDF0E8', white: 'FFFFFF'
};
const FONT = 'Pretendard', FONT_SB = 'Pretendard SemiBold';
const W = 13.333, H = 7.5, MX = 0.6;

function newDeck() {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.theme = { headFontFace: FONT, bodyFontFace: FONT };
  pres.author = '신사업전략 1팀 유영빈';
  pres.company = '대웅제약 디지털헬스케어';
  pres.title = '웰다 의원 도입 안내 · 의료진 교육자료';
  const C = pres.SchemeColor;

  const footer = [
    { text: { text: '웰다 · 의료진 교육자료', options: { x: MX, y: 7.06, w: 5, h: 0.26, fontFace: FONT, fontSize: 9, color: K.muted, margin: 0 } } }
  ];
  const num = { x: W - MX - 0.8, y: 7.06, w: 0.8, h: 0.26, fontFace: FONT, fontSize: 9, color: K.muted, align: 'right', margin: 0 };

  pres.defineSlideMaster({
    title: 'CONTENT', background: { color: 'FFFFFF' },
    objects: [
      ...footer,
      { placeholder: { options: { name: 'kicker', type: 'body', x: MX, y: 0.42, w: 9, h: 0.3, fontFace: FONT_SB, fontSize: 12, color: K.violet, margin: 0, valign: 'middle', align: 'left' }, text: '' } },
      { placeholder: { options: { name: 'title', type: 'title', x: MX, y: 0.74, w: W - 2 * MX, h: 0.62, fontFace: FONT, fontSize: 28, bold: true, color: K.navy, margin: 0, valign: 'middle', align: 'left', charSpacing: -0.5 }, text: '' } },
      { placeholder: { options: { name: 'lead', type: 'body', x: MX, y: 1.42, w: W - 2 * MX, h: 0.5, fontFace: FONT, fontSize: 14, color: K.sub, margin: 0, valign: 'top', align: 'left', lineSpacingMultiple: 1.25 }, text: '' } }
    ],
    slideNumber: num
  });
  pres.defineSlideMaster({ title: 'DIVIDER', background: { color: 'FFFFFF' }, objects: [...footer], slideNumber: num });
  pres.defineSlideMaster({ title: 'COVER', background: { color: 'FFFFFF' }, objects: [] });
  return { pres, C };
}

// 텍스트 상자 (기본: 여백 0, Pretendard)
function T(slide, text, o) {
  slide.addText(text, Object.assign({ fontFace: FONT, fontSize: 13, color: K.ink, margin: 0, isTextBox: true, valign: 'top' }, o));
}
// 내용 장 머리글
function head(pres, sec, kicker, title, lead) {
  const s = pres.addSlide({ masterName: 'CONTENT', sectionTitle: sec });
  s.addText(kicker, { placeholder: 'kicker' });
  s.addText(title, { placeholder: 'title' });
  if (lead) s.addText(lead, { placeholder: 'lead' });
  return s;
}
// 육각형 번호 배지 (웰다 로고 모양)
function hexNum(slide, x, y, n, d = 0.42, o = {}) {
  slide.addShape('hexagon', { x, y, w: d * 1.08, h: d, fill: { color: o.fill || K.violet }, line: { color: o.fill || K.violet, width: 0 }, objectName: 'badge ' + n });
  slide.addText(String(n), { x, y, w: d * 1.08, h: d, fontFace: FONT, fontSize: o.size || Math.round(d * 30), bold: true, color: o.color || K.white, align: 'center', valign: 'middle', margin: 0, isTextBox: true });
}
// 카드
function card(slide, x, y, w, h, o = {}) {
  slide.addShape('roundRect', {
    x, y, w, h, rectRadius: o.r ?? 0.08,
    fill: { color: o.fill || K.white }, line: o.line === false ? { type: 'none' } : { color: o.line || K.line, width: 0.75 },
    shadow: o.shadow ? { type: 'outer', color: '1B2559', opacity: 0.08, blur: 8, offset: 2, angle: 90 } : undefined,
    objectName: o.name
  });
}
// 이미지를 상자 안에 비율 유지로 넣기 (align: c|l|r, valign: m|t|b)
function fit(name, x, y, w, h, al = 'c', va = 'm') {
  const [iw, ih] = SIZES[name]; const r = Math.min(w / iw, h / ih);
  const ww = iw * r, hh = ih * r;
  const xx = al === 'l' ? x : al === 'r' ? x + w - ww : x + (w - ww) / 2;
  const yy = va === 't' ? y : va === 'b' ? y + h - hh : y + (h - hh) / 2;
  return { x: xx, y: yy, w: ww, h: hh };
}
// 화면 캡처 (흰 테두리 + 그림자)
function shot(slide, name, x, y, w, h, o = {}) {
  const b = fit(name, x, y, w, h, o.al, o.va);
  if (o.frame !== false) card(slide, b.x - 0.04, b.y - 0.04, b.w + 0.08, b.h + 0.08, { r: 0.05, shadow: true, line: K.line });
  slide.addImage({ path: A(name), x: b.x, y: b.y, w: b.w, h: b.h, altText: o.alt || name, rounding: false });
  return b;
}
// 캡처 위 강조 박스 (b: shot 결과, 원본 px 좌표)
const ORIGW = { 's05_timeline.png': 3944, 's19_pro.png': 4312 };
function hl(slide, b, name, px, n, o = {}) {
  const iw = ORIGW[name] || SIZES[name][0]; const s = b.w / iw;
  const x = b.x + px[0] * s, y = b.y + px[1] * s, w = (px[2] - px[0]) * s, h = (px[3] - px[1]) * s;
  slide.addShape('roundRect', { x, y, w, h, rectRadius: 0.04, fill: { type: 'none' }, line: { color: o.color || K.violet, width: o.wd || 2 }, objectName: 'highlight ' + (n || '') });
  if (n) {
    const d = o.d || 0.34; const pos = o.badge || 'tl';
    const bx = pos.includes('r') ? x + w - d * 0.54 : x - d * 0.54, by = pos.includes('b') ? y + h - d / 2 : y - d / 2;
    hexNum(slide, bx, by, n, d);
  }
  return { x, y, w, h };
}
// 출처 · 각주
function source(slide, text, y = 6.62) {
  T(slide, text, { x: MX, y, w: W - 2 * MX, h: 0.36, fontSize: 9.5, color: K.muted, valign: 'bottom', lineSpacingMultiple: 1.15 });
}
// 노트
function notes(slide, t) { if (t) slide.addNotes(t); }

// 아이콘 (원형 배경 + Lucide 아이콘). ICON[name+color] 경로는 빌드 전에 만들어 둠
const ICON = {};
const icoPath = (n, c) => path.join(__dirname, 'assets', 'icons', `${n}_${c}.png`);
function ico(slide, name, x, y, d = 0.5, o = {}) {
  const bg = o.bg === undefined ? K.violetLt : o.bg, col = o.color || K.violet;
  ICON[name + '|' + col] = 1;
  if (bg) slide.addShape('ellipse', { x, y, w: d, h: d, fill: { color: bg }, line: { type: 'none' } });
  const p = bg ? d * 0.24 : 0;
  slide.addImage({ path: icoPath(name, col), x: x + p, y: y + p, w: d - 2 * p, h: d - 2 * p, altText: '' });
}
// 굵게 강조가 들어간 문장: '보통 **굵게** 보통'
function rich(str, base = {}, boldOpt = {}) {
  const parts = str.split(/(\*\*[^*]+\*\*)/).filter(Boolean);
  return parts.map(p => p.startsWith('**') ? { text: p.slice(2, -2), options: Object.assign({ bold: true, color: K.navy }, boldOpt) } : { text: p, options: Object.assign({}, base) });
}
// 문단 여러 개
function paras(list, o = {}) {
  const out = [];
  list.forEach((t, i) => {
    const runs = typeof t === 'string' ? rich(t) : t;
    runs.forEach((r, j) => { if (j === runs.length - 1 && i < list.length - 1) r.options = Object.assign({}, r.options, { breakLine: true }); out.push(r); });
  });
  return out;
}
// 알림 상자 (info | warn)
function note(slide, x, y, w, h, text, kind = 'info', fs = 11.5) {
  const warn = kind === 'warn';
  card(slide, x, y, w, h, { fill: warn ? K.redLt : K.panel, line: false, r: 0.06 });
  ico(slide, warn ? 'LuTriangleAlert' : 'LuInfo', x + 0.14, y + (h - 0.26) / 2, 0.26, { bg: null, color: warn ? K.red : K.violet });
  T(slide, typeof text === 'string' ? rich(text) : text, { x: x + 0.5, y, w: w - 0.62, h, fontSize: fs, color: warn ? '9A3412' : K.ink, valign: 'middle', lineSpacingMultiple: 1.15 });
}
// 스텝 라벨 + 제목 + 설명
function stepText(slide, x, y, w, label, title, body, o = {}) {
  T(slide, label, { x, y, w, h: 0.24, fontSize: 10.5, fontFace: FONT_SB, color: K.violet, charSpacing: 0.5 });
  T(slide, title, { x, y: y + 0.26, w, h: 0.32, fontSize: o.tfs || 14.5, bold: true, color: K.navy });
  if (body) T(slide, typeof body === 'string' ? rich(body) : body, { x, y: y + 0.62, w, h: o.bh || 0.8, fontSize: o.fs || 12, color: K.ink, lineSpacingMultiple: 1.2 });
}
// 가이드 화면 묶음: 같은 높이로 가로 배치, 아래에 스텝 설명
function guideRow(slide, items, y, h, o = {}) {
  const gap = o.gap ?? 0.28, x0 = o.x ?? MX, wTot = o.w ?? (W - 2 * MX);
  const ws = items.map(it => { const [iw, ih] = SIZES[it.img]; return iw / ih; });
  let hh = h; let sum = ws.reduce((a, b) => a + b, 0) * hh + gap * (items.length - 1);
  if (sum > wTot) { hh = (wTot - gap * (items.length - 1)) / ws.reduce((a, b) => a + b, 0); sum = wTot; }
  let x = x0 + (o.center === false ? 0 : (wTot - sum) / 2);
  const boxes = [];
  items.forEach((it, i) => {
    const w = ws[i] * hh;
    slide.addImage({ path: A(it.img), x, y, w, h: hh, altText: it.alt || it.title || '' , rounding: false });
    boxes.push({ x, y, w, h: hh });
    const ty = y + hh + 0.2, tw = Math.max(w, it.minW || 0) - 0.05;
    stepText(slide, x, ty, tw, it.label, it.title, it.body, { bh: it.bh, fs: o.fs });
    if (it.note) note(slide, x, ty + 0.62 + (it.bh || 0.62), tw, it.nh || 0.5, it.note, it.kind || 'info', 10.5);
    x += w + gap;
  });
  return boxes;
}
function iconsNeeded() { return Object.keys(ICON).map(k => k.split('|')); }

module.exports = { pptxgen, THEME, K, FONT, FONT_SB, W, H, MX, SIZES, A, newDeck, T, head, hexNum, card, fit, shot, hl, source, notes, ico, rich, paras, note, stepText, guideRow, iconsNeeded };
