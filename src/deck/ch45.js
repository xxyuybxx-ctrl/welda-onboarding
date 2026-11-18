const L = require('./lib');
const { K, T, head, hexNum, card, shot, hl, source, A, W, MX, FONT, FONT_SB, ico, rich, paras, note } = L;
const S4 = 'Chapter 4 재방문 프로토콜', K4 = 'Chapter 4 · 재방문 프로토콜';
const S5 = 'Chapter 5 FAQ', K5 = 'Chapter 5 · FAQ';

// 연속 혈당 지표 예시 데이터 (웰다 Pro 화면 예시)
const D = {
  days: ['6.19', '6.20', '6.21', '6.25', '6.26', '7.2', '7.3', '7.4', '7.11', '7.12', '7.13', '7.14'],
  score: [82, 94, 100, 82, 83, 75, 100, 100, 99, 99, 91, 98],
  mean: [116, 107, 105, 117, 116, 109, 101, 91, 95, 91, 92, 87],
  sd: [14, 13, 10, 12, 16, 22, 12, 13, 11, 11, 15, 12]
};
function lineChart(s, x, y, w, h, name, vals, color, min, max, o = {}) {
  s.addChart('line', [{ name, labels: D.days, values: vals }], {
    x, y, w, h, chartColors: [color], lineSize: 2, lineDataSymbol: 'circle', lineDataSymbolSize: 6,
    lineDataSymbolLineColor: color, showValue: !!o.values, dataLabelPosition: 't', dataLabelFontSize: 8.5, dataLabelFontFace: '+mn-lt', dataLabelColor: K.sub,
    catAxisLabelFontFace: '+mn-lt', catAxisLabelFontSize: o.cat === false ? 1 : 9, catAxisLabelColor: o.cat === false ? 'FFFFFF' : K.sub, catAxisLineShow: false, catAxisHidden: o.cat === false,
    valAxisLabelFontFace: '+mn-lt', valAxisLabelFontSize: 9, valAxisLabelColor: K.muted, valAxisMinVal: min, valAxisMaxVal: max, valAxisMajorUnit: o.unit || 10, valAxisLineShow: false,
    valGridLine: { color: 'E8EBF2', size: 0.5 }, catGridLine: { style: 'none' }, showLegend: false, showTitle: false
  });
}

function s33(pres) {
  const s = head(pres, S4, K4, '재방문 상담은 기록 → 혈당 지표 → 식사 순서로 봅니다', '웰다 Pro › 유저 목록에서 환자를 검색해 Overview와 타임라인 탭을 엽니다.');
  const top = 2.0, cw = (12.133 - 0.5) / 3, ch = 4.0;
  const C = [
    ['기록 성실도', 'pro_summary.png', '경과 일수 · 접속 일수 · 기록 건수', '기록이 비어 있으면 상담 시간을 더 배분합니다'],
    ['혈당 지표 추이', null, '일별 혈당 점수 · 평균 혈당 · 혈당 변동성', '개선 방향인지 확인하고, GLP-1군은 중단 전 · 후를 비교합니다'],
    ['식습관', 'pro_week_top.png', '혈당 스파이크가 큰 식사 · C~F 등급 비중', '「이 메뉴가 혈당을 이렇게 올립니다」처럼 구체적으로 설명합니다']
  ];
  C.forEach((c, i) => {
    const x = MX + i * (cw + 0.25);
    card(s, x, top, cw, ch, {});
    hexNum(s, x + 0.3, top + 0.25, i + 1, 0.44);
    T(s, c[0], { x: x + 0.92, y: top + 0.25, w: cw - 1.1, h: 0.44, fontSize: 16, bold: true, color: K.navy, valign: 'middle' });
    card(s, x + 0.25, top + 0.9, cw - 0.5, 1.45, { fill: K.panel, line: false, r: 0.06 });
    if (c[1]) shot(s, c[1], x + 0.35, top + 0.98, cw - 0.7, 1.29, { frame: false });
    else lineChart(s, x + 0.3, top + 0.95, cw - 0.6, 1.35, '평균 혈당', D.mean, K.violet, 80, 120, { cat: false });
    T(s, '보는 것', { x: x + 0.3, y: top + 2.55, w: 1, h: 0.26, fontSize: 11, fontFace: FONT_SB, color: K.violet });
    T(s, c[2], { x: x + 0.3, y: top + 2.82, w: cw - 0.6, h: 0.32, fontSize: 12.5, color: K.ink });
    T(s, '판단', { x: x + 0.3, y: top + 3.2, w: 1, h: 0.26, fontSize: 11, fontFace: FONT_SB, color: K.violet });
    T(s, c[3], { x: x + 0.3, y: top + 3.46, w: cw - 0.6, h: 0.5, fontSize: 12.5, bold: true, color: K.navy, lineSpacingMultiple: 1.15 });
  });
  note(s, MX, top + ch + 0.25, 12.133, 0.5, '**선택** · 세 항목이 양호하면 식곤증 · 잦은 허기 · 피로 등 증상 변화를 짧게 묻고 마무리합니다.', 'info', 12.5);
}

function s34(pres) {
  const s = head(pres, S4, K4, '주요 점검 항목 · 기록 성실도',
    rich('지난 기간 동안 **식사 · 운동 기록을 자주 남겼는지** 확인하고, 앞으로도 잘 기록하도록 피드백해 주세요.', { color: K.sub }));
  const top = 2.0, H = 3.55;
  const lw = H * 1042 / 906, rw = H * 1115 / 876, gap = 0.3;
  const lx = MX, rx = lx + lw + gap;
  const b1 = shot(s, 'pro_overview.png', lx, top, lw, H);
  const b2 = shot(s, 'pro_week.png', rx, top, rw, H);
  hl(s, b1, 'pro_overview.png', [55, 225, 500, 330], 1);
  hl(s, b2, 'pro_week.png', [20, 50, 880, 265], 2);
  hl(s, b2, 'pro_week.png', [20, 380, 650, 870], 3, { badge: 'bl' });
  const x0 = rx + rw + 0.35, w0 = W - MX - x0;
  const t = ['시작한 지 얼마나 됐는지, 얼마나 자주 접속했는지, 기록을 몇 건 남겼는지 봅니다.', '혈당이 오르내릴 때 기록 아이콘이 함께 찍혀 있는지 확인합니다.', '날짜별 기록 카드로 상세한 기록 이력을 확인합니다.'];
  t.forEach((x, i) => {
    const y = top + i * 1.2;
    hexNum(s, x0, y, i + 1, 0.36);
    T(s, x, { x: x0 + 0.5, y: y - 0.03, w: w0 - 0.5, h: 1.05, fontSize: 12, color: K.ink, lineSpacingMultiple: 1.25 });
  });
  note(s, MX, top + H + 0.3, 12.133, 0.5, '웰다 Pro › 유저 목록에서 방문한 환자를 검색해 누르면 **Overview**와 **타임라인** 탭을 볼 수 있습니다.', 'info', 12);
}

function s35(pres) {
  const s = head(pres, S4, K4, '주요 점검 항목 · 혈당 지표 추이',
    'Overview 탭 아래 [연속 혈당 지표 그래프]에서 일별 혈당 점수 · 평균 혈당 · 혈당 변동성 추이를 봅니다. 좋아지고 있는지, 개선이 필요한지 피드백해 주세요.');
  const top = 2.1, cw = 7.3;
  card(s, MX, top, cw, 4.45, {});
  T(s, '연속 혈당 지표 그래프 (예시)', { x: MX + 0.3, y: top + 0.18, w: 5, h: 0.3, fontSize: 13, bold: true, color: K.navy });
  T(s, '평균 혈당 (mg/dL)', { x: MX + 0.3, y: top + 0.55, w: 3, h: 0.24, fontSize: 10.5, fontFace: FONT_SB, color: K.violet });
  lineChart(s, MX + 0.15, top + 0.75, cw - 0.3, 1.45, '평균 혈당', D.mean, K.violet, 80, 120, { cat: false, values: true });
  T(s, '혈당 변동성 (mg/dL)', { x: MX + 0.3, y: top + 2.25, w: 3, h: 0.24, fontSize: 10.5, fontFace: FONT_SB, color: K.teal });
  lineChart(s, MX + 0.15, top + 2.45, cw - 0.3, 1.45, '혈당 변동성', D.sd, K.teal, 0, 30, { values: true });
  // 혈당 점수 행
  const rowY = top + 3.95, x0 = MX + 0.68, step = (cw - 0.95) / 12;
  T(s, '점수', { x: MX + 0.2, y: rowY, w: 0.5, h: 0.3, fontSize: 9.5, fontFace: FONT_SB, color: K.sub, valign: 'middle' });
  D.score.forEach((v, i) => T(s, String(v), { x: x0 + i * step, y: rowY, w: step, h: 0.3, fontSize: 10.5, bold: true, color: v >= 95 ? K.violet : K.navy, align: 'center', valign: 'middle' }));
  const dx = MX + cw + 0.3, dw = W - MX - dx;
  const defs = [['혈당 점수', '혈당 스파이크의 상승 폭과 지속 시간으로 하루 혈당 변화를 평가하는 지표입니다. 점수가 높을수록 혈당이 안정적으로 관리된 날입니다.', K.violet],
    ['혈당 변동성', '하루 동안 혈당이 평균을 중심으로 얼마나 넓게 퍼져 있는지 수치로 나타낸 지표입니다. 혈당이 얼마나 급하게 변하는지 보여 줍니다.', K.teal],
    ['평균 혈당', '연속혈당측정기로 측정한 모든 혈당의 평균입니다. 측정 기간 전체의 관리 상태를 보여 주며, 당화혈색소 추이와 함께 해석합니다.', K.violet]];
  defs.forEach((d, i) => {
    const y = top + i * 1.5;
    card(s, dx, y, dw, 1.37, { fill: K.panel, line: false, r: 0.06 });
    T(s, d[0], { x: dx + 0.25, y: y + 0.14, w: dw - 0.5, h: 0.3, fontSize: 14, bold: true, color: d[2] });
    T(s, d[1], { x: dx + 0.25, y: y + 0.46, w: dw - 0.45, h: 0.86, fontSize: 11, color: K.ink, lineSpacingMultiple: 1.2 });
  });
  source(s, '그래프는 웰다 Pro 화면 예시 데이터를 다시 그린 것입니다.', 6.65);
}

function s36(pres) {
  const s = head(pres, S4, K4, '주요 점검 항목 · 식습관',
    '타임라인 탭에서 혈당 그래프와 함께 식사 기록과 등급을 봅니다. C~F 등급 식사를 짚어 양과 질, 단식 측면에서 개선할 부분을 피드백해 주세요.');
  const top = 2.1, H = 4.45;
  const b = shot(s, 'pro_week.png', MX, top, H * 1115 / 876, H);
  hl(s, b, 'pro_week.png', [6, 4, 454, 48], 1, { badge: 'tr' });
  hl(s, b, 'pro_week.png', [20, 52, 880, 265], 2);
  hl(s, b, 'pro_week.png', [20, 380, 650, 870], 3, { badge: 'bl' });
  hl(s, b, 'pro_week.png', [662, 306, 1110, 614], 4);
  const x0 = b.x + b.w + 0.4, w0 = W - MX - x0;
  const t = [
    '주간 평균 혈당과 비교해 **일간 평균 혈당이 높은 날**을 먼저 봅니다.',
    '**혈당 스파이크가 크게 생긴 식사**를 찾아 원인과 개선 방법을 함께 이야기합니다.',
    '식사 등급 분포를 대략 봅니다. **A · B**가 많으면 전반적으로 양호하고, **C · D · F**가 많으면 개선이 필요합니다.',
    '식사 카드를 누르면 **식사 혈당 그래프, 영양 성분, AI 피드백**을 볼 수 있습니다. 초가공식품 섭취나 잦은 음주, 당류 · 단백질 섭취량을 확인합니다.'
  ];
  let y = top;
  t.forEach((x, i) => {
    const h = i === 3 ? 1.35 : i === 2 ? 1.35 : 0.85;
    hexNum(s, x0, y, i + 1, 0.36);
    T(s, rich(x, { color: K.ink }), { x: x0 + 0.5, y: y - 0.03, w: w0 - 0.5, h, fontSize: 12, lineSpacingMultiple: 1.25 });
    if (i === 2) [['A', '7B4DEB'], ['B', '4C5BE8'], ['C', 'F2A33A'], ['D', 'EF7A22'], ['F', '8B94A7']].forEach((g, k) => {
      s.addShape('hexagon', { x: x0 + 0.5 + k * 0.42, y: y + h - 0.32, w: 0.34, h: 0.3, fill: { color: g[1] }, line: { type: 'none' } });
      T(s, g[0], { x: x0 + 0.5 + k * 0.42, y: y + h - 0.32, w: 0.34, h: 0.3, fontSize: 10, bold: true, color: K.white, align: 'center', valign: 'middle' });
    });
    y += h + 0.12;
  });
}

function s37(pres) {
  const s = head(pres, S4, K4, '지표가 좋지 않을 때 · 생활습관 교육 포인트', '혈당 지표 추이가 좋지 않다면 어떤 생활습관을 어떻게 바꾸면 좋을지 교육해 주세요.');
  const top = 2.0, cw = (12.133 - 0.5) / 3, ch = 4.6;
  const C = [
    ['식습관', 'LuSalad', [
      ['식사 순서 바꾸기', '채소(식이섬유) → 단백질 · 지방 → 탄수화물 순으로 먹습니다. 식이섬유를 먼저 먹으면 이후 탄수화물의 흡수가 늦춰져 식후 혈당 상승이 완만해질 수 있습니다.'],
      ['식후 활동하기', '식후 60분 안에 20분 정도 걷거나 계단을 오릅니다. 방금 흡수된 포도당이 근육의 에너지원으로 먼저 쓰입니다.']]],
    ['운동', 'LuDumbbell', [
      ['근력 운동하기', '주 2~3회, 숨이 차거나 땀이 날 정도의 강도로 합니다. 근육이 포도당을 사용하는 데 도움이 되고, 근육량은 혈당 관리에 도움이 될 수 있습니다.']]],
    ['수면', 'LuMoon', [
      ['숙면 루틴 찾기', '잠들기 4시간 전까지 식사 마치기 · 빛이 들지 않는 어두운 곳에서 자기 · 침실을 서늘하게 유지하기 · 잠들기 1시간 전 스마트폰 사용 줄이기'],
      ['왜 중요한가', '수면의 질이 낮으면 스트레스 호르몬인 코르티솔 분비가 늘어 공복 혈당을 높일 수 있습니다.']]]
  ];
  C.forEach((c, i) => {
    const x = MX + i * (cw + 0.25);
    card(s, x, top, cw, ch, i === 0 ? {} : {});
    ico(s, c[1], x + 0.3, top + 0.28, 0.6);
    T(s, c[0], { x: x + 1.05, y: top + 0.28, w: cw - 1.3, h: 0.6, fontSize: 19, bold: true, color: K.navy, valign: 'middle' });
    let y = top + 1.15;
    c[2].forEach(it => {
      T(s, it[0], { x: x + 0.3, y, w: cw - 0.6, h: 0.3, fontSize: 14, bold: true, color: K.violet });
      const lines = Math.ceil(it[1].length / 27);
      const h = lines * 0.27 + 0.1;
      T(s, it[1], { x: x + 0.3, y: y + 0.36, w: cw - 0.6, h, fontSize: 12, color: K.ink, lineSpacingMultiple: 1.25 });
      y += 0.36 + h + 0.22;
    });
  });
}

function s38(pres) {
  const s = head(pres, S4, K4, '부가 질문과 코멘트 · 증상 변화', '혈당 지표와 식습관이 모두 양호하면, 증상 변화를 묻고 스트레스 · 운동 · 수면에 대해 짧게 코멘트해 주세요. (선택)');
  const items = [['LuCoffee', '식곤증'], ['LuUtensils', '잦은 허기'], ['LuBatteryLow', '만성 피로'], ['LuDroplet', '부종'], ['LuHand', '피부 염증'], ['LuMoon', '수면 부족'], ['LuCloudRain', '우울 · 불안감'], ['LuCalendarDays', '생리불순']];
  const top = 2.2, cw = (12.133 - 3 * 0.3) / 4, chh = 1.05;
  items.forEach((it, i) => {
    const x = MX + (i % 4) * (cw + 0.3), y = top + Math.floor(i / 4) * (chh + 0.3);
    card(s, x, y, cw, chh, { fill: K.panel, line: false, r: 0.5 });
    ico(s, it[0], x + 0.25, y + (chh - 0.6) / 2, 0.6, { bg: K.white });
    T(s, it[1], { x: x + 1.05, y, w: cw - 1.2, h: chh, fontSize: 17, bold: true, color: K.navy, valign: 'middle' });
  });
  card(s, MX, 5.15, 12.133, 1.15, { fill: K.violetLt, line: false });
  ico(s, 'LuMessageCircle', MX + 0.35, 5.42, 0.6, { bg: K.white });
  T(s, paras(['혈당 변동이 큰 분들이 함께 호소하기도 하는 증상입니다.', '생활습관을 실천하면서 **이전보다 나아졌는지** 물어봐 주세요.']), { x: MX + 1.2, y: 5.15, w: 10.5, h: 1.15, fontSize: 14.5, color: K.ink, valign: 'middle', lineSpacingMultiple: 1.3 });
}

function s39(pres) {
  const s = head(pres, S4, K4, '부가 질문과 코멘트 · 스트레스 · 운동 · 수면', '증상 변화와 함께 스트레스 · 운동 · 수면 상태를 짧게 확인합니다. (선택)');
  const R = [['LuBrain', '스트레스', '스트레스가 오래 이어지면 **혈당 조절에 영향을 줄 수 있습니다.** 수면 부족이나 식욕 증가가 함께 오기 쉬우므로, 식단 · 운동과 함께 스트레스 상태도 확인합니다.'],
    ['LuDumbbell', '운동', '규칙적인 운동은 **근육이 포도당을 사용하는 데 도움**이 됩니다. 환자의 생활에 맞는 강도와 빈도를 함께 정합니다.'],
    ['LuMoon', '수면', '수면이 부족하면 스트레스 호르몬이 늘어 **혈당 관리가 어려워질 수 있습니다.** 수면 시간과 규칙성을 함께 확인합니다.']];
  R.forEach((r, i) => {
    const y = 2.1 + i * 1.55;
    card(s, MX, y, 12.133, 1.35, {});
    ico(s, r[0], MX + 0.35, y + 0.35, 0.65);
    T(s, r[1], { x: MX + 1.25, y, w: 2.2, h: 1.35, fontSize: 19, bold: true, color: K.navy, valign: 'middle' });
    T(s, rich(r[2], { color: K.ink }), { x: MX + 3.4, y, w: 8.4, h: 1.35, fontSize: 13.5, valign: 'middle', lineSpacingMultiple: 1.3 });
  });
}

function s41(pres) {
  const s = head(pres, S5, K5, '환자가 자주 묻는 질문', '상담 중 자주 받는 질문과 안내 예시입니다.');
  const Q = [
    ['앱에 「저혈당」이 표시됐는데 괜찮나요?', '앱은 70 mg/dL 이하를 저혈당으로 표시합니다. 연속혈당측정기는 간질액의 포도당을 측정해 실제 혈당과 차이가 날 수 있습니다. 어지럼증 · 식은땀 · 떨림 등 증상이 있으면 자가혈당측정으로 확인하고, 반복되면 진료를 받도록 안내합니다.'],
    ['운동했는데 혈당이 올랐어요', '고강도 운동 직후에는 스트레스 호르몬 반응으로 혈당이 일시적으로 오를 수 있습니다. 대개 시간이 지나면 돌아오며, 반복되거나 증상이 있으면 상담으로 확인합니다.'],
    ['혈당 스파이크가 없으면 무엇이든 먹어도 되나요?', '아닙니다. 스파이크가 없다는 것은 혈당 상승이 상대적으로 작다는 뜻이지, 음식이 건강하다는 뜻은 아닙니다. 술이나 지방 + 정제 탄수화물 조합의 초가공식품은 혈당이 크게 오르지 않아도 대사 건강에 부담이 될 수 있습니다.'],
    ['센서가 작동하지 않아요', '리브레 앱에 어떤 메시지가 뜨는지 확인합니다. 메시지별 대처는 웰다 FAQ의 오류 알림 항목을 참고하고, 해결되지 않거나 원인을 알 수 없으면 채널톡 「웰다」로 문의하도록 안내합니다.'],
    ['센서가 떨어졌어요', '떨어지거나 뗀 센서는 다시 쓸 수 없습니다. 부착 부위를 충분히 말린 뒤 붙이고, 물기와 외부 충격에 주의하도록 안내합니다. 웰다 센서 패치를 쓰면 더 단단히 고정할 수 있습니다.']
  ];
  const top = 1.95, cw = (12.133 - 0.3) / 2;
  const pos = [[0, 0, 1.55], [0, 1, 1.25], [0, 2, 1.55], [1, 0, 1.55], [1, 1, 1.4]];
  const ys = [[top, top + 1.7, top + 3.1], [top, top + 1.7]];
  Q.forEach((q, i) => {
    const [c, r, h] = pos[i]; const x = MX + c * (cw + 0.3), y = ys[c][r];
    card(s, x, y, cw, h, {});
    T(s, 'Q', { x: x + 0.25, y: y + 0.17, w: 0.35, h: 0.34, fontSize: 17, bold: true, color: K.violet });
    T(s, q[0], { x: x + 0.62, y: y + 0.17, w: cw - 0.85, h: 0.34, fontSize: 14, bold: true, color: K.navy, valign: 'middle' });
    T(s, q[1], { x: x + 0.62, y: y + 0.56, w: cw - 0.85, h: h - 0.66, fontSize: 11, color: K.ink, lineSpacingMultiple: 1.2 });
  });
  card(s, MX + cw + 0.3, top + 3.25, cw, 1.4, { fill: K.violetLt, line: false });
  ico(s, 'LuMessageCircle', MX + cw + 0.6, top + 3.6, 0.6, { bg: K.white });
  T(s, paras(['더 궁금한 점은', '채널톡 「웰다」로 문의하도록 안내해 주세요']), { x: MX + cw + 1.4, y: top + 3.25, w: cw - 1.6, h: 1.4, fontSize: 14, bold: true, color: K.navy, valign: 'middle', lineSpacingMultiple: 1.3 });
}

function s42(pres) {
  const s = pres.addSlide({ masterName: 'COVER', sectionTitle: '마무리' });
  s.addShape('hexagon', { x: 8.55, y: 1.35, w: 4.3, h: 3.75, fill: { type: 'none' }, line: { color: K.violetLt, width: 22 } });
  s.addShape('hexagon', { x: 11.35, y: 4.55, w: 1.25, h: 1.08, fill: { color: K.violetLt }, line: { type: 'none' } });
  s.addImage({ path: A('logo.png'), x: MX + 0.02, y: 2.05, w: 2.3, h: 2.3 * 409 / 1723, altText: 'Welda 로고' });
  T(s, '감사합니다', { x: MX, y: 2.85, w: 7, h: 1.0, fontSize: 48, bold: true, color: K.navy, charSpacing: -1.5 });
  T(s, '웰다 도입과 운영은 교육간호사가 함께합니다.', { x: MX, y: 3.95, w: 7, h: 0.4, fontSize: 17, color: K.sub });
  T(s, '대웅제약 디지털헬스케어', { x: MX, y: 6.7, w: 5.5, h: 0.3, fontSize: 10.5, color: K.muted });
}

module.exports = { s33, s34, s35, s36, s37, s38, s39, s41, s42 };
