const L = require('./lib');
const { K, T, head, hexNum, card, shot, hl, source, A, W, MX, FONT, FONT_SB, ico, rich, paras, note, stepText, SIZES, img3d } = L;
const SEC = 'Chapter 1 프로그램 개요', KC = 'Chapter 1 · 프로그램 개요';

// 이미지 넣기 (w 또는 h 하나만 주면 비율 유지)
function pic(s, name, x, y, w, h, o = {}) {
  const [iw, ih] = SIZES[name];
  if (w && !h) h = w * ih / iw; if (h && !w) w = h * iw / ih;
  s.addImage(Object.assign({ path: A(name), x, y, w, h, altText: o.alt || '' }, o.tp ? { transparency: o.tp } : {}));
  return { x, y, w, h };
}
function cover(pres) {
  const s = pres.addSlide({ masterName: 'COVER', sectionTitle: '시작' });
  pic(s, 'hex_lilac.png', 11.55, 0.35, 1.5, null, { tp: 20 });
  pic(s, 'hex_pearl.png', 6.15, 5.9, 0.95);
  pic(s, 'm_timeline.png', 6.35, 1.05, 6.3, null, { alt: '웰다 Pro 타임라인 화면' });
  pic(s, 'p_home.png', 10.75, 2.75, null, 4.35, { alt: '웰다 앱 홈 화면' });
  pic(s, '3d/char_fork.png', 5.55, 3.85, 1.65);
  s.addImage({ path: A('logo.png'), x: MX + 0.1, y: 0.62, w: 1.75, h: 1.75 * 409 / 1723, altText: 'Welda 로고' });
  T(s, '의료진 교육자료', { x: MX + 0.1, y: 2.1, w: 4, h: 0.34, fontSize: 14, fontFace: FONT_SB, color: K.violet, charSpacing: 0 });
  T(s, '웰다 의원\n도입 안내', { x: MX + 0.1, y: 2.5, w: 5.4, h: 1.9, fontSize: 52, bold: true, color: K.navy, lineSpacingMultiple: 1.05 });
  T(s, '혈당 데이터 기반 생활습관 관리 프로그램', { x: MX + 0.1, y: 4.5, w: 5.2, h: 0.4, fontSize: 18, color: K.sub });
  s.addShape('rect', { x: MX + 0.1, y: 5.25, w: 0.5, h: 0.04, fill: { color: K.violet }, line: { type: 'none' } });
  T(s, '대웅제약 디지털헬스케어', { x: MX + 0.1, y: 5.45, w: 4.5, h: 0.3, fontSize: 13, fontFace: FONT_SB, color: K.navy });
  T(s, '2026.11', { x: MX + 0.1, y: 5.78, w: 4.5, h: 0.3, fontSize: 13, color: K.muted });
}

const TOC = [
  ['프로그램 개요', '웰다 소개 · 생활습관 기록 화면 · 서울시 혈당캐치9988 · 권유 대상 · 파트너 링크 환자 연결 · 무료 도입 · 비만주사 이후 관리'],
  ['상담 개요', '프로그램 시작과 점검 · 내원 주기와 센서 부착 경로 · 도입 6단계 · 오늘 정할 세 가지'],
  ['첫방문 프로토콜', '파트너 링크 발송 · 앱 온보딩 · 사전 문진 · 허리둘레 입력 · 리브레 연동 · 센서 부착 · 기록 독려'],
  ['재방문 프로토콜', '상담 3단계 · 기록 성실도 · 혈당 지표 · 식습관 · 생활습관 교육 · 증상 · 스트레스 · 운동 · 수면'],
  ['FAQ', '환자가 자주 묻는 질문과 안내 예시']
];
function toc(pres) {
  const s = pres.addSlide({ masterName: 'DIVIDER', sectionTitle: '시작' });
  T(s, '목차', { x: MX, y: 0.74, w: 6, h: 0.62, fontSize: 28, bold: true, color: K.navy, valign: 'middle' });
  TOC.forEach((t, i) => {
    const y = 1.75 + i * 0.98;
    s.addShape('line', { x: MX, y: y - 0.12, w: W - 2 * MX, h: 0, line: { color: K.line, width: 0.75 } });
    hexNum(s, MX, y + 0.12, i + 1, 0.5);
    T(s, 'Chapter ' + (i + 1), { x: 1.45, y: y + 0.02, w: 2.6, h: 0.26, fontSize: 11, fontFace: FONT_SB, color: K.violet });
    T(s, t[0], { x: 1.45, y: y + 0.3, w: 2.9, h: 0.4, fontSize: 19, bold: true, color: K.navy });
    T(s, t[1], { x: 4.45, y: y + 0.08, w: 8.25, h: 0.62, fontSize: 13, color: K.sub, valign: 'middle', lineSpacingMultiple: 1.2 });
  });
}

const DIV_CHAR = { 1: '3d/char_fork.png', 2: '3d/char_glasses.png', 3: '3d/char_gym.png', 4: '3d/char_pillow.png', 5: '3d/char_bubble.png' };
function divider(pres, no, title, items) {
  const s = pres.addSlide({ masterName: 'DIVIDER', sectionTitle: 'Chapter ' + no + ' ' + title });
  pic(s, 'hex_lilac.png', 8.3, 0.75, 3.9, null, { tp: 35 });
  pic(s, 'hex_pearl.png', 11.75, 4.9, 0.9);
  pic(s, 'hex_violet.png', 7.75, 5.35, 0.55);
  const c = DIV_CHAR[no]; const [iw, ih] = SIZES[c]; const ch = 3.0, cw = ch * iw / ih;
  pic(s, c, 10.25 - cw / 2, 2.05, cw, ch);
  T(s, String(no).padStart(2, '0'), { x: MX, y: 1.5, w: 3, h: 1.3, fontSize: 88, bold: true, color: K.violet });
  T(s, 'Chapter ' + no, { x: MX + 0.04, y: 2.9, w: 4, h: 0.4, fontSize: 16, fontFace: FONT_SB, color: K.violet, charSpacing: 0 });
  T(s, title, { x: MX, y: 3.3, w: 7.0, h: 0.9, fontSize: 40, bold: true, color: K.navy });
  T(s, items.map((t, i) => ({ text: t, options: { breakLine: i < items.length - 1 } })), { x: MX + 0.04, y: 4.5, w: 6.8, h: 2.2, fontSize: 15, color: K.sub, lineSpacingMultiple: 1.55 });
}

function s04(pres) {
  const s = head(pres, SEC, KC, '웰다는 혈당 데이터 기반 대사 건강 관리 프로그램입니다',
    '환자는 앱에 기록하고, 의료진은 웰다 Pro에서 확인합니다. 세 환자군 모두 기록 → 확인 → 지속의 흐름은 같습니다.');
  card(s, MX, 2.1, 12.133, 2.95, { fill: K.panel, line: false, r: 0.1 });
  shot(s, 'app_home.png', 0.95, 2.32, 1.1, 2.3);
  T(s, '환자 · 웰다 앱', { x: 0.7, y: 4.7, w: 1.6, h: 0.25, fontSize: 10.5, color: K.sub, align: 'center' });
  T(s, '→', { x: 2.2, y: 3.3, w: 0.4, h: 0.4, fontSize: 18, color: K.violet, align: 'center', valign: 'middle' });
  shot(s, 'pro_timeline.png', 2.75, 2.32, 3.3, 2.3);
  T(s, '의료진 · 웰다 Pro', { x: 2.75, y: 4.7, w: 3.3, h: 0.25, fontSize: 10.5, color: K.sub, align: 'center' });
  [['주간 요약', '평균 혈당 점수 · 평균 혈당 · 혈당 변동성'], ['일별 식사 카드', '카드 수로 기록 순응도를 봅니다'], ['카드 상세', '식사 혈당 그래프와 AI 피드백']].forEach((r, i) => {
    const y = 2.42 + i * 0.85;
    hexNum(s, 6.65, y + 0.04, i + 1, 0.46);
    T(s, r[0], { x: 7.3, y, w: 5, h: 0.32, fontSize: 16, bold: true, color: K.navy });
    T(s, r[1], { x: 7.3, y: y + 0.34, w: 5.2, h: 0.3, fontSize: 13, color: K.sub });
  });
  const g = [['당뇨전단계', '식사별 혈당 반응을 직접 확인하며 생활습관 관리를 시작합니다'], ['GLP-1 계열 투약', '투약 중 만든 식습관을 기록하고, 중단 전 · 후를 비교해 유지 기준을 세웁니다'], ['생활습관 개선군', '생활습관을 파악하고 교정하며 대사 위험 요인을 함께 관리합니다']];
  const cw = (12.133 - 0.5) / 3;
  g.forEach((x, i) => {
    const cx = MX + i * (cw + 0.25);
    card(s, cx, 5.3, cw, 1.4, {});
    T(s, x[0], { x: cx + 0.3, y: 5.5, w: cw - 0.6, h: 0.3, fontSize: 15, bold: true, color: K.violet });
    T(s, x[1], { x: cx + 0.3, y: 5.88, w: cw - 0.6, h: 0.65, fontSize: 12.5, color: K.ink, lineSpacingMultiple: 1.25 });
  });
}

function s05(pres) {
  const s = head(pres, SEC, KC, '환자가 기록하면, 진료실에서 바로 봅니다',
    '환자가 앱에 식사 · 운동을 기록하면 진료실 PC의 웰다 Pro에서 바로 확인하고, 다음 진료 상담에 활용합니다.');
  // 왼쪽: 환자 앱
  card(s, MX, 2.1, 5.0, 4.45, { fill: K.panel, line: false, r: 0.1 });
  T(s, '환자 · + 버튼 하나로 기록', { x: MX + 0.3, y: 2.3, w: 4.4, h: 0.3, fontSize: 14, bold: true, color: K.navy });
  shot(s, 's31_1.png', MX + 0.3, 2.8, 1.75, 3.55);
  const kinds = [['LuUtensils', '식사'], ['LuFootprints', '운동'], ['LuTimer', '단식'], ['LuThermometer', '증상'], ['LuTag', '태그'], ['LuRuler', '신체']];
  kinds.forEach((k, i) => {
    const cx = MX + 2.4 + (i % 2) * 1.25, cy = 2.85 + Math.floor(i / 2) * 1.12;
    ico(s, k[0], cx + 0.2, cy, 0.62, { bg: K.white });
    T(s, k[1], { x: cx - 0.1, y: cy + 0.68, w: 1.22, h: 0.26, fontSize: 12, color: K.ink, align: 'center' });
  });
  // 가운데: 연결
  const mx = 5.95;
  [['LuMonitorCheck', '의료진이 기록을 확인'], ['LuClipboardList', '다음 진료 때 함께 보며 변화 점검'], ['LuMessageCircle', '궁금한 점은 앱의 AI 코치에게']].forEach((r, i) => {
    const y = 2.45 + i * 1.33;
    ico(s, r[0], mx, y, 0.56);
    T(s, r[1], { x: mx + 0.72, y: y - 0.04, w: 1.6, h: 0.66, fontSize: 12.5, bold: true, color: K.navy, valign: 'middle', lineSpacingMultiple: 1.15 });
  });
  // 오른쪽: 웰다 Pro 타임라인
  const b = shot(s, 's05_timeline.png', 8.55, 2.1, 4.18, 3.9, { al: 'r', va: 't' });
  hl(s, b, 's05_timeline.png', [243, 1675, 745, 2349], null);
  hl(s, b, 's05_timeline.png', [1823, 2819, 2269, 3425], null);
  T(s, '웰다 Pro 타임라인 · 등급이 낮은 식사를 다음 진료에서 함께 봅니다', { x: b.x, y: b.y + b.h + 0.14, w: b.w, h: 0.42, fontSize: 10.5, color: K.sub, lineSpacingMultiple: 1.15 });
}

function s43(pres) {
  const s = head(pres, SEC, KC, '생활습관 기록 · 앱 화면',
    rich('환자가 앱에 식사 · 운동을 기록하면 **식사별 혈당 등급, AI 코치 코멘트, 식후 활동 미션**을 바로 받아 봅니다.', { color: K.sub }));
  const Wp = 1.95, Hp = 3.85, gap = (12.133 - 5 * Wp) / 4, top = 2.05;
  const phones = ['app1.png', 'app2.png', 'app3.png', 'app4.png', 'app5.png'];
  const hls = { 0: [[352, 762, 438, 852]], 1: [[98, 628, 436, 700]], 2: [[4, 72, 438, 196], [14, 787, 424, 874]], 3: [[362, 676, 434, 748]], 4: [[20, 488, 436, 700]] };
  const caps = [['식사 기록', '카메라 버튼으로 사진만 찍어도 기록됩니다'], ['양 · 단위 확인', '먹은 양과 단위를 확인하고 저장합니다'], ['혈당 등급 · AI 코멘트', '식사별 혈당 등급과 식후 활동 미션을 받습니다'], ['오늘의 혈당', '혈당 점수와 오늘의 기록을 한 화면에서 봅니다'], ['AI 코치 대화', '궁금한 점을 바로 물어볼 수 있습니다']];
  phones.forEach((p, i) => {
    const x = MX + i * (Wp + gap);
    const b = shot(s, p, x, top, Wp, Hp, { va: 't' });
    (hls[i] || []).forEach(r => hl(s, b, p, r, null));
    hexNum(s, x, top + Hp + 0.22, i + 1, 0.36);
    T(s, caps[i][0], { x: x + 0.5, y: top + Hp + 0.2, w: Wp + 0.2, h: 0.4, fontSize: 14, bold: true, color: K.navy, valign: 'middle' });
    T(s, caps[i][1], { x, y: top + Hp + 0.66, w: Wp + 0.15, h: 0.55, fontSize: 11.5, color: K.ink, lineSpacingMultiple: 1.2 });
  });
}

function s44(pres) {
  const s = head(pres, SEC, KC, '생활습관 기록 · 웰다 Pro 화면',
    rich('환자가 남긴 식사 · 운동 기록과 혈당 흐름을 **진료실 PC의 웰다 Pro**에서 확인하고, 다음 진료 상담에 활용합니다.', { color: K.sub }));
  const top = 2.05, H = 3.6;
  const lw = H * 1042 / 906, rw = H * 1115 / 876, gap = 0.3;
  const lx = MX + (12.133 - lw - rw - gap) / 2, rx = lx + lw + gap;
  const b1 = shot(s, 'pro_overview.png', lx, top, lw, H);
  const b2 = shot(s, 'pro_week.png', rx, top, rw, H);
  hl(s, b1, 'pro_overview.png', [32, 200, 1022, 540], 1);
  hl(s, b1, 'pro_overview.png', [918, 124, 1030, 174], 2, { badge: 'tl' });
  hl(s, b2, 'pro_week.png', [6, 4, 454, 48], 3, { badge: 'tr' });
  hl(s, b2, 'pro_week.png', [662, 306, 1110, 614], 4);
  const texts = ['**요약 정보** · 기록 건수, 평균 혈당, 혈당 변동성, 허리둘레 변화', '**리포트 페이지** · AGP 리포트 등 혈당 보고서 출력', '**주간 실천 현황** · 한 주의 혈당 흐름과 식사 · 운동 기록', '**식사 혈당 그래프** · 식사 카드를 누르면 혈당 등급과 최대 상승폭'];
  const cw = (12.133 - 0.75) / 4;
  texts.forEach((t, i) => {
    const x = MX + i * (cw + 0.25), y = top + H + 0.42;
    hexNum(s, x, y, i + 1, 0.36);
    T(s, rich(t, { color: K.ink }), { x: x + 0.5, y: y - 0.04, w: cw - 0.5, h: 0.72, fontSize: 12, lineSpacingMultiple: 1.2 });
  });
}

function s06(pres) {
  const s = head(pres, SEC, KC, '서울시가 선택한 혈당 관리 프로그램, 웰다',
    '서울시가 공개 모집으로 4개 기업의 제안서를 평가해 대웅제약을 「혈당캐치9988」 협력사업자로 선정했습니다.');
  shot(s, 'poster9988.jpg', MX, 2.1, 3.7, 4.4, { al: 'l', va: 't' });
  const x0 = 4.75, w0 = W - MX - x0;
  [['1,000명', '당뇨전단계 서울시민 (선착순)'], ['25개', '자치구 보건소 연계 지원 체계']].forEach((st, i) => {
    const x = x0 + i * (w0 / 2 + 0.12), w = w0 / 2 - 0.12;
    card(s, x, 2.1, w, 1.45, {});
    T(s, st[0], { x: x + 0.35, y: 2.3, w: w - 0.5, h: 0.62, fontSize: 32, bold: true, color: K.violet });
    T(s, st[1], { x: x + 0.35, y: 2.98, w: w - 0.5, h: 0.32, fontSize: 13, color: K.sub });
  });
  card(s, x0, 3.8, w0, 2.7, { fill: K.violetLt, line: false, r: 0.1 });
  T(s, '원장님께 의미하는 것', { x: x0 + 0.4, y: 4.02, w: 5, h: 0.32, fontSize: 13, fontFace: FONT_SB, color: K.violetDk });
  ['공공 평가를 거쳐 선정된 프로그램입니다', '서울시 채널로 시민에게 알려지는 이름입니다', '같은 프로그램을 의원 · 병원에서 바로 권할 수 있습니다'].forEach((t, i) => {
    const y = 4.5 + i * 0.62;
    ico(s, 'LuCircleCheck', x0 + 0.4, y + 0.02, 0.36, { bg: null, color: K.violet });
    T(s, t, { x: x0 + 0.92, y, w: w0 - 1.2, h: 0.42, fontSize: 17, bold: true, color: K.navy, valign: 'middle' });
  });
  source(s, '이미지 · 내용 출처: 서울시 「내 손안에 서울」(2026.8), 데일리팜(2026.8.26)');
}

function s07(pres) {
  const s = head(pres, SEC, KC, '외래에서 이런 환자에게 권해 주세요', '세 환자군 모두 같은 프로그램으로 시작합니다.');
  const G = [
    ['당뇨전단계', [[{ text: '공복혈당 100~125 mg/dL', options: { breakLine: true } }, { text: '또는 HbA1c 5.7~6.4%' }], '검진 「경계」 통보, 약물 치료는 이른 분'], '약물 치료 전, 생활습관 관리부터', '2주 센서로 식사와 혈당의 관계를 직접 확인합니다'],
    ['GLP-1 계열 투약 환자', ['마운자로 · 위고비 등 투약 중', [{ text: '감량 정체기이거나', options: { breakLine: true } }, { text: '중단 후 체중 재증가가 걱정되는 분' }]], '중단 이후를 미리 준비', '투약 중 식습관을 센서로 점검하고 유지 기준을 만들어 둡니다'],
    ['생활습관 개선군', ['체중 · 식후 졸림 · 식습관 고민', [{ text: '혈당은 정상이지만', options: { breakLine: true } }, { text: '관리 동기가 있는 분' }]], '앱 기록부터 가볍게 시작', '센서 부착은 다음 내원 때 선택할 수 있습니다']
  ];
  const cw = (12.133 - 0.5) / 3, top = 2.0, ch = 4.55;
  G.forEach((g, i) => {
    const x = MX + i * (cw + 0.25);
    card(s, x, top, cw, ch, {});
    hexNum(s, x + 0.3, top + 0.3, i + 1, 0.46);
    T(s, g[0], { x: x + 0.95, y: top + 0.3, w: cw - 1.1, h: 0.46, fontSize: 17, bold: true, color: K.navy, valign: 'middle' });
    T(s, '대상', { x: x + 0.3, y: top + 1.0, w: 2, h: 0.26, fontSize: 11, fontFace: FONT_SB, color: K.violet });
    g[1].forEach((t, j) => {
      const y = top + 1.32 + j * 0.66;
      ico(s, 'LuCheck', x + 0.3, y + 0.04, 0.22, { bg: null, color: K.violet });
      T(s, t, { x: x + 0.6, y, w: cw - 0.85, h: 0.56, fontSize: 12.5, color: K.ink, lineSpacingMultiple: 1.15 });
    });
    card(s, x + 0.25, top + 2.8, cw - 0.5, 1.5, { fill: K.panel, line: false, r: 0.06 });
    T(s, '핵심 포인트', { x: x + 0.5, y: top + 2.95, w: 2, h: 0.24, fontSize: 10.5, fontFace: FONT_SB, color: K.violet });
    T(s, g[2], { x: x + 0.5, y: top + 3.22, w: cw - 1.0, h: 0.34, fontSize: 14.5, bold: true, color: K.navy });
    T(s, g[3], { x: x + 0.5, y: top + 3.6, w: cw - 1.0, h: 0.6, fontSize: 12, color: K.ink, lineSpacingMultiple: 1.2 });
  });
}

function s08(pres) {
  const s = head(pres, SEC, KC, '파트너 링크 한 번이면, 환자 연결은 웰다가 이어갑니다',
    '웰다 Pro에서 환자 이름과 전화번호로 링크를 보내면, 환자가 알림톡으로 앱을 설치하고 의원 웰다 Pro에 연결됩니다.');
  const m = pic(s, 'm_link.png', 0.4, 2.2, 5.3, null, { alt: '웰다 Pro 파트너 연결 링크 발송 화면' });
  s.addShape('roundRect', { x: m.x + m.w * 0.78, y: m.y + m.h * 0.094, w: m.w * 0.155, h: m.h * 0.056, rectRadius: 0.06, fill: { type: 'none' }, line: { color: 'F59E0B', width: 2.25 } });
  pic(s, 'p_kakao.png', 4.7, 3.25, null, 3.3, { alt: '카카오톡 알림톡 화면' });
  const st = [['[파트너 링크 발송]', '웰다 Pro › 유저 관리 오른쪽 위 버튼'], ['환자 정보 입력 후 발송', '파트너 코드 · 이름 · 전화번호'], ['알림톡으로 앱 설치', '카카오톡 「웰다」 링크 · 24시간 유효'], ['의원 웰다 Pro에 연결', '사전 문진 확인 후 기록이 진료실로']];
  const sx = 7.75, sw = W - MX - sx;
  st.forEach((t, i) => {
    const y = 2.3 + i * 0.96;
    card(s, sx, y, sw, 0.8);
    hexNum(s, sx + 0.2, y + 0.17, i + 1, 0.46, { size: 15 });
    T(s, t[0], { x: sx + 0.88, y: y + 0.13, w: sw - 1.0, h: 0.32, fontSize: 15.5, bold: true, color: K.navy });
    T(s, t[1], { x: sx + 0.88, y: y + 0.45, w: sw - 1.0, h: 0.28, fontSize: 12.5, color: K.sub });
  });
  s.addShape('roundRect', { x: sx, y: 6.2, w: sw, h: 0.5, rectRadius: 0.25, fill: { color: K.violet }, line: { type: 'none' } });
  T(s, [{ text: '의원이 할 일은 ', options: {} }, { text: '링크 발송 하나', options: { bold: true } }, { text: '. 설치 · 가입 안내는 알림톡이 맡습니다', options: {} }],
    { x: sx, y: 6.2, w: sw, h: 0.5, fontSize: 12.5, color: K.white, align: 'center', valign: 'middle' });
  pic(s, '3d/char_gym.png', 12.0, 0.3, 0.8);
}

function s09(pres) {
  const s = head(pres, SEC, KC, '기록이 쌓일수록, 환자도 의원도 얻습니다', '환자는 내 몸의 변화를 보고, 의원은 그 기록으로 다시 상담합니다.');
  const top = 2.0, ph = 4.5, pw = 4.3;
  const side = (x, title, icon, items, fill) => {
    card(s, x, top, pw, ph, { fill, line: false, r: 0.1 });
    ico(s, icon, x + 0.3, top + 0.25, 0.46, { bg: K.white });
    T(s, title, { x: x + 0.9, y: top + 0.25, w: 3, h: 0.46, fontSize: 16, bold: true, color: K.navy, valign: 'middle' });
    items.forEach((it, i) => {
      const y = top + 0.95 + i * 0.86;
      ico(s, it[0], x + 0.3, y, 0.56, { bg: K.white });
      T(s, it[1], { x: x + 1.05, y: y - 0.02, w: pw - 1.25, h: 0.3, fontSize: 14, bold: true, color: K.navy });
      T(s, it[2], { x: x + 1.05, y: y + 0.29, w: pw - 1.25, h: 0.28, fontSize: 11.5, color: K.sub });
    });
  };
  side(MX, '환자가 얻는 것', 'LuUser', [['LuScale', '체중 유지 관리', '기록으로 감량 이후까지 관리'], ['LuFootprints', '생활습관 개선', '식사 · 활동 패턴을 스스로 파악'], ['LuTarget', '나에게 맞춘 관리', '내 데이터로 받는 상담'], ['LuActivity', '혈당 변화 확인', '식사 · 활동별 혈당 반응을 눈으로']], K.panel);
  side(W - MX - pw, '의원이 얻는 것', 'LuBuilding2', [['LuHeartHandshake', '환자와 신뢰 형성', '기록을 함께 보며 이어지는 관리 관계'], ['LuCalendarCheck', '재방문 유도', '기록 확인이 다음 상담의 이유'], ['LuStethoscope', '차별화된 진료', '처방을 넘어 생활습관까지 관리'], ['LuBadgePercent', '무료 도입 · 추가 수익', '도입 비용 없이 시작 (다음 장)']], K.violetLt);
  // 가운데 관리 루프
  const cx = MX + pw + 0.25, cw = W - 2 * MX - 2 * pw - 0.5;
  T(s, '웰다 관리 루프', { x: cx, y: top, w: cw, h: 0.3, fontSize: 11.5, fontFace: FONT_SB, color: K.violet, align: 'center' });
  const loop = [['LuNotebookPen', '환자 기록', '앱에 식사 · 운동'], ['LuMonitorCheck', '의원 확인', '웰다 Pro 데이터'], ['LuStethoscope', '데이터 상담', '기록 기반 피드백'], ['LuCalendarCheck', '재방문', '4주 상담 · 2주 센서']];
  loop.forEach((l, i) => {
    const y = top + 0.42 + i * 0.88;
    card(s, cx + 0.1, y, cw - 0.55, 0.7, { r: 0.35 });
    ico(s, l[0], cx + 0.22, y + 0.11, 0.48, { bg: null });
    T(s, l[1], { x: cx + 0.8, y: y + 0.08, w: cw - 1.4, h: 0.28, fontSize: 13, bold: true, color: K.navy });
    T(s, l[2], { x: cx + 0.8, y: y + 0.37, w: cw - 1.4, h: 0.24, fontSize: 10.5, color: K.sub });
    if (i < 3) T(s, '↓', { x: cx + 0.1, y: y + 0.68, w: cw - 0.55, h: 0.22, fontSize: 11, color: K.violetMd, align: 'center', valign: 'middle' });
  });
  // 되돌아가는 화살표
  const rx = cx + cw - 0.32;
  s.addShape('line', { x: rx, y: top + 0.77, w: 0, h: 2.64, line: { color: K.violetMd, width: 1.25, dashType: 'dash' } });
  s.addShape('line', { x: cx + cw - 0.45, y: top + 3.41, w: 0.13, h: 0, line: { color: K.violetMd, width: 1.25, dashType: 'dash' } });
  s.addShape('line', { x: cx + cw - 0.45, y: top + 0.77, w: 0.13, h: 0, line: { color: K.violetMd, width: 1.25, endArrowType: 'triangle' }, flipH: true });
  T(s, '다시 기록', { x: rx + 0.03, y: top + 1.6, w: 0.28, h: 1.0, fontSize: 9.5, color: K.violet, vert: 'eaVert', align: 'center', valign: 'middle' });
  card(s, cx, top + 4.0, cw, 0.5, { fill: K.white, r: 0.25 });
  T(s, rich('한 번의 처방이 **지속되는 관리 관계로**', { color: K.ink }), { x: cx, y: top + 4.0, w: cw, h: 0.5, fontSize: 12, align: 'center', valign: 'middle' });
}

function s10(pres) {
  const s = head(pres, SEC, KC, '웰다는 무료로 도입하고, 연속혈당측정기 활용 시 추가 수익을 기대할 수 있습니다', null);
  const top = 1.75;
  card(s, MX, top, 4.3, 1.55, {});
  T(s, '웰다 도입', { x: MX + 0.35, y: top + 0.22, w: 3, h: 0.28, fontSize: 12.5, fontFace: FONT_SB, color: K.sub });
  T(s, '무료', { x: MX + 0.35, y: top + 0.5, w: 3, h: 0.62, fontSize: 34, bold: true, color: K.navy });
  T(s, '초기 비용 없이 시작합니다', { x: MX + 0.35, y: top + 1.12, w: 3.6, h: 0.28, fontSize: 12, color: K.sub });
  card(s, MX, top + 1.75, 4.3, 2.75, { fill: K.violetLt, line: false });
  T(s, '환자 1명당 차액', { x: MX + 0.35, y: top + 1.97, w: 3.6, h: 0.28, fontSize: 12.5, fontFace: FONT_SB, color: K.violetDk });
  T(s, '3.8~6.8만원', { x: MX + 0.35, y: top + 2.27, w: 3.8, h: 0.62, fontSize: 32, bold: true, color: K.violet });
  T(s, paras(['프로그램 비용 12~15만원', '− 연속혈당측정기 구매 원가 82,488원']), { x: MX + 0.35, y: top + 3.0, w: 3.7, h: 0.6, fontSize: 12.5, color: K.ink, lineSpacingMultiple: 1.25 });
  T(s, '프로그램 비용(상담료)은 의원이 12~15만원 선에서 정합니다', { x: MX + 0.35, y: top + 3.72, w: 3.7, h: 0.6, fontSize: 11, color: K.sub, lineSpacingMultiple: 1.15 });
  // 오른쪽 차트
  const px = MX + 4.6, pw = W - MX - px;
  card(s, px, top, pw, 4.5, {});
  T(s, '환자 수별 추가 수익 (연속혈당측정기 활용 시)', { x: px + 0.35, y: top + 0.22, w: pw - 0.7, h: 0.32, fontSize: 15, bold: true, color: K.navy });
  T(s, '단위: 만원', { x: px + 0.35, y: top + 0.56, w: 3, h: 0.24, fontSize: 10.5, color: K.sub });
  const groups = [['환자 10명', 38, 68], ['환자 50명', 188, 338], ['환자 100명', 375, 675]];
  const base = top + 3.95, maxH = 2.55, gx0 = px + 0.55, gw = (pw - 1.0) / 3, bw = 0.62;
  s.addShape('line', { x: px + 0.35, y: base, w: pw - 0.7, h: 0, line: { color: K.line, width: 1 } });
  groups.forEach((g, i) => {
    const cx = gx0 + i * gw + gw / 2;
    [[g[1], K.violetMd], [g[2], K.violet]].forEach((v, j) => {
      const h = maxH * v[0] / 675, x = cx - bw - 0.04 + j * (bw + 0.08);
      s.addShape('rect', { x, y: base - h, w: bw, h, fill: { color: v[1] }, line: { type: 'none' } });
      T(s, String(v[0]), { x: x - 0.2, y: base - h - 0.32, w: bw + 0.4, h: 0.28, fontSize: 13, bold: true, color: K.navy, align: 'center' });
    });
    T(s, g[0], { x: cx - 1, y: base + 0.1, w: 2, h: 0.3, fontSize: 12.5, bold: true, color: K.ink, align: 'center' });
  });
  [['프로그램 비용 12만원', K.violetMd], ['프로그램 비용 15만원', K.violet]].forEach((l, i) => {
    const x = px + pw - 4.1 + i * 2.0;
    s.addShape('rect', { x, y: top + 0.62, w: 0.16, h: 0.16, fill: { color: l[1] }, line: { type: 'none' } });
    T(s, l[0], { x: x + 0.24, y: top + 0.56, w: 1.75, h: 0.28, fontSize: 11, color: K.sub, valign: 'middle' });
  });
  source(s, '※ 연속혈당측정기(리브레) 구매 원가 기준의 단순 차액이며, 기타 운영 비용은 빼지 않은 금액입니다. 환자 100명 · 프로그램 비용 15만원일 때 최대 675만원(6,751,200원)입니다.');
}

function s11(pres) {
  const s = head(pres, SEC, KC, '비만주사 치료, 처방만으로 충분할까요?',
    '치료를 중단하면 체중이 빠르게 다시 늘 수 있습니다. 투약 중부터 생활습관 관리를 함께 시작해야 하는 이유입니다.');
  const items = [
    ['ic_tag.png', '가격 경쟁', '최저가 중심 경쟁으로 환자가 이탈하고, 지속 관리와 재방문이 줄어듭니다'],
    ['ic_heart.png', '중단 후 체중 재증가', '투약을 멈추면 체중과 대사 지표가 치료 전 수준으로 돌아가는 경향이 보고됩니다'],
    ['ic_clip.png', '허가사항의 전제', '삭센다 · 위고비 · 마운자로 미국 허가사항은 식이요법 · 신체활동 병행을 전제로 합니다']
  ];
  items.forEach((t, i) => {
    const y = 2.3 + i * 1.3;
    card(s, MX, y, 5.6, 1.12);
    img3d(s, t[0], MX + 0.2, y + 0.15, 0.82, 1.0);
    T(s, t[1], { x: MX + 1.3, y: y + 0.17, w: 4.1, h: 0.32, fontSize: 16, bold: true, color: K.navy });
    T(s, t[2], { x: MX + 1.3, y: y + 0.52, w: 4.15, h: 0.55, fontSize: 12.5, color: K.ink, lineSpacingMultiple: 1.25 });
  });
  const px = 6.55, pw = W - MX - px, py = 2.3, ph = 3.72;
  card(s, px, py, pw, ph, { fill: 'F7F5FF', line: 'E2DCFD', shadow: true });
  T(s, '투약 중단 후 월평균 체중 재증가', { x: px + 0.4, y: py + 0.3, w: pw - 0.8, h: 0.34, fontSize: 15.5, bold: true, color: K.navy });
  T(s, '비만치료제 중단 연구 37편 · 9,341명 메타분석', { x: px + 0.4, y: py + 0.66, w: pw - 0.8, h: 0.28, fontSize: 11.5, color: K.sub });
  const base = py + 3.25, scale = 2.4;
  [['전체 비만치료제', 0.4, K.violetMd], ['세마 · 터제', 0.8, K.violet]].forEach((b, i) => {
    const bx = px + 0.55 + i * 1.35, bh = b[1] * scale;
    s.addShape('roundRect', { x: bx, y: base - bh, w: 0.9, h: bh, rectRadius: 0.12, fill: { color: b[2] }, line: { type: 'none' }, shadow: { type: 'outer', color: '4A36B8', opacity: 0.25, blur: 10, offset: 4, angle: 90 } });
    s.addShape('roundRect', { x: bx + 0.1, y: base - bh + 0.08, w: 0.2, h: bh - 0.2, rectRadius: 0.1, fill: { color: K.white, transparency: 72 }, line: { type: 'none' } });
    T(s, b[1].toFixed(1) + 'kg', { x: bx - 0.3, y: base - bh - 0.48, w: 1.5, h: 0.4, fontSize: 20, bold: true, color: K.navy, align: 'center' });
    T(s, b[0], { x: bx - 0.35, y: base + 0.1, w: 1.6, h: 0.28, fontSize: 11, color: K.sub, align: 'center', charSpacing: 0 });
  });
  const sx = px + 3.35, sw = pw - 3.6;
  s.addShape('line', { x: sx - 0.2, y: py + 1.15, w: 0, h: 2.3, line: { color: 'DCD5FB', width: 1 } });
  T(s, '약 1.5년', { x: sx, y: py + 1.15, w: sw, h: 0.55, fontSize: 30, bold: true, color: K.violet });
  T(s, '세마 · 터제 중단 후 치료 전 체중으로 돌아가는 데 걸리는 기간(모델 추정)', { x: sx, y: py + 1.72, w: sw, h: 0.62, fontSize: 11.5, color: K.ink, lineSpacingMultiple: 1.25 });
  T(s, '월 0.3kg', { x: sx, y: py + 2.42, w: sw, h: 0.55, fontSize: 30, bold: true, color: K.violet });
  T(s, '행동요법 프로그램 종료 뒤보다 약물 중단 뒤 더 빨리 늘어난 차이', { x: sx, y: py + 2.99, w: sw, h: 0.62, fontSize: 11.5, color: K.ink, lineSpacingMultiple: 1.25 });
  pic(s, '3d/char_glasses.png', 11.9, 0.3, 0.9);
  source(s, '출처: West S, et al. BMJ 2026;392:e085304 (37편, 9,341명). 세마 · 터제 자료는 8편, 중단 후 최대 12개월 추적이며 이후는 모델 추정입니다. 이 연구에서 투약 중 행동 지원 병행이 중단 후 재증가 속도를 늦추지는 않았습니다. 허가사항: 미국 FDA 처방정보 기준.', 6.3);
}

function s12(pres) {
  const s = head(pres, SEC, KC, '웰다 프로그램 4단계',
    '비만주사 시작부터 앱에 식사 · 운동을 기록해 중단 전후의 변화를 비교하고, 개인별 관리 기준을 세웁니다. 비만주사를 중단하는 시점에는 연속혈당측정기를 부착해 혈당 데이터를 바탕으로 체중 재증가 관리까지 이어갑니다.');
  const st = [
    ['웰다 가입', '첫 내원', ['서비스 안내 및 가입', '생활습관 관리 교육', '앱 사용법 안내'], '앱 가입 · 무료', 'LuUserPlus'],
    ['생활습관 기록', '집에서', ['식사 · 운동 기록', '앱으로 간편 관리'], '식사 · 운동 기록', 'LuNotebookPen'],
    ['재방문 상담', '4주마다', ['기록 기반 리포트 제공', '변화 확인 및 상담'], '변화 확인', 'LuStethoscope'],
    ['센서 부착', '비만주사 중단 시점 · 2주마다', ['기록 + 혈당 데이터 리포트', '변화 확인 및 상담'], '혈당 데이터 연동', 'LuActivity']
  ];
  const top = 2.4, cw = (12.133 - 3 * 0.35) / 4, ch = 4.15;
  st.forEach((t, i) => {
    const x = MX + i * (cw + 0.35);
    card(s, x, top, cw, ch, i === 3 ? { fill: K.violetLt, line: false } : {});
    T(s, 'STEP ' + (i + 1), { x: x + 0.3, y: top + 0.28, w: 2, h: 0.26, fontSize: 11, fontFace: FONT_SB, color: K.violet, charSpacing: 0.5 });
    ico(s, t[4], x + cw - 0.85, top + 0.22, 0.55, { bg: i === 3 ? K.white : K.violetLt });
    T(s, t[0], { x: x + 0.3, y: top + 0.58, w: cw - 0.6, h: 0.42, fontSize: 19, bold: true, color: K.navy });
    T(s, t[1], { x: x + 0.3, y: top + 1.05, w: cw - 0.6, h: 0.3, fontSize: 12.5, fontFace: FONT_SB, color: K.sub });
    t[2].forEach((b, j) => {
      const y = top + 1.65 + j * 0.46;
      ico(s, 'LuCheck', x + 0.3, y + 0.05, 0.2, { bg: null, color: K.violet });
      T(s, b, { x: x + 0.58, y, w: cw - 0.85, h: 0.36, fontSize: 12.5, color: K.ink });
    });
    s.addShape('roundRect', { x: x + 0.3, y: top + ch - 0.62, w: cw - 0.6, h: 0.36, rectRadius: 0.18, fill: { color: i === 3 ? K.white : K.violetLt }, line: { type: 'none' } });
    T(s, t[3], { x: x + 0.3, y: top + ch - 0.62, w: cw - 0.6, h: 0.36, fontSize: 11.5, fontFace: FONT_SB, color: K.violetDk, align: 'center', valign: 'middle' });
    if (i < 3) T(s, '›', { x: x + cw, y: top + ch / 2 - 0.25, w: 0.35, h: 0.5, fontSize: 24, color: K.violetMd, align: 'center', valign: 'middle' });
  });
}

module.exports = { cover, toc, divider, s04, s05, s43, s44, s06, s07, s08, s09, s10, s11, s12 };
