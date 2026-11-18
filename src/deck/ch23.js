const L = require('./lib');
const { K, T, head, hexNum, card, shot, hl, source, A, W, MX, FONT, FONT_SB, ico, rich, paras, note, stepText, guideRow } = L;
const S2 = 'Chapter 2 상담 개요', K2 = 'Chapter 2 · 상담 개요';
const S3 = 'Chapter 3 첫방문 프로토콜', K3 = 'Chapter 3 · 첫방문 프로토콜';
const GUIDE = '출처: 웰다 사용 가이드';

function s14(pres) {
  const s = head(pres, S2, K2, '프로그램 시작과 점검', '첫방문에서는 앱을 설치하고 기록을 시작하게 하고, 재방문에서는 기록을 함께 보며 점검합니다.');
  const top = 2.05;
  // 첫방문
  const w1 = 3.9;
  card(s, MX, top, w1, 3.55, { fill: K.panel, line: false, r: 0.1 });
  T(s, '첫방문 · 온보딩', { x: MX + 0.35, y: top + 0.25, w: w1 - 0.7, h: 0.36, fontSize: 17, bold: true, color: K.navy });
  [['LuSmartphone', '앱 설치하고 시작하기'], ['LuNotebookPen', '생활습관 기록 독려하기']].forEach((r, i) => {
    const y = top + 0.9 + i * 0.95;
    card(s, MX + 0.3, y, w1 - 0.6, 0.75, { r: 0.08 });
    ico(s, r[0], MX + 0.45, y + 0.13, 0.5);
    T(s, r[1], { x: MX + 1.1, y, w: w1 - 1.5, h: 0.75, fontSize: 14, bold: true, color: K.navy, valign: 'middle' });
  });
  // 재방문
  const x2 = MX + w1 + 0.3, w2 = W - MX - x2;
  card(s, x2, top, w2, 3.55, { fill: K.violetLt, line: false, r: 0.1 });
  T(s, '재방문 · 점검', { x: x2 + 0.35, y: top + 0.25, w: 4, h: 0.36, fontSize: 17, bold: true, color: K.navy });
  const col = (x, w, icon, title, items) => {
    card(s, x, top + 0.9, w, 2.4, { r: 0.08 });
    ico(s, icon, x + 0.2, top + 1.08, 0.5);
    T(s, title, { x: x + 0.85, y: top + 1.08, w: w - 1.0, h: 0.5, fontSize: 14, bold: true, color: K.navy, valign: 'middle' });
    T(s, items.map((t, i) => ({ text: t, options: { bullet: { indent: 14 }, breakLine: i < items.length - 1 } })), { x: x + 0.3, y: top + 1.75, w: w - 0.5, h: 1.45, fontSize: 13, color: K.ink, paraSpaceAfter: 4 });
  };
  const cw = (w2 - 0.6 - 0.25) / 2;
  col(x2 + 0.3, cw, 'LuSearch', '주요 점검 항목 리뷰와 피드백', ['기록 성실도', '혈당 지표 추이', '식습관']);
  col(x2 + 0.55 + cw, cw, 'LuMessageCircle', '부가 질문과 코멘트 (선택)', ['증상 변화', '스트레스', '운동 · 수면']);
  // 선택 사항
  const y3 = top + 3.8;
  s.addShape('roundRect', { x: MX, y: y3, w: W - 2 * MX, h: 0.85, rectRadius: 0.08, fill: { color: K.white }, line: { color: K.violetMd, width: 1, dashType: 'dash' } });
  s.addShape('roundRect', { x: MX + 0.3, y: y3 + 0.24, w: 1.05, h: 0.37, rectRadius: 0.18, fill: { color: K.violet }, line: { type: 'none' } });
  T(s, '선택 사항', { x: MX + 0.3, y: y3 + 0.24, w: 1.05, h: 0.37, fontSize: 11.5, fontFace: FONT_SB, color: K.white, align: 'center', valign: 'middle' });
  ico(s, 'LuActivity', MX + 1.6, y3 + 0.2, 0.45);
  T(s, '연속혈당측정기 부착', { x: MX + 2.2, y: y3, w: 3.5, h: 0.85, fontSize: 15, bold: true, color: K.navy, valign: 'middle' });
  T(s, '필요한 환자만 부착합니다. 첫 내원 당일 또는 앱 기록 후 다음 내원 때 붙입니다.', { x: MX + 5.6, y: y3, w: 6.3, h: 0.85, fontSize: 13, color: K.ink, valign: 'middle' });
}

function s15(pres) {
  const s = head(pres, S2, K2, '환자는 2주마다 센서 교체, 4주마다 상담으로 내원합니다', '센서 부착은 항상 의원에서 합니다.');
  const st = [['첫 내원', '가입 · 생활습관 교육'], ['의원에서', '센서 부착'], ['집에서 2주', '앱 기록'], ['2주마다', '센서 교체 내원'], ['4주마다', '재방문 상담']];
  const top = 2.0, cw = (12.133 - 4 * 0.2) / 5;
  s.addShape('line', { x: MX + 0.4, y: top + 0.28, w: 12.133 - 0.8, h: 0, line: { color: K.violetMd, width: 1.5 } });
  st.forEach((t, i) => {
    const x = MX + i * (cw + 0.2);
    hexNum(s, x + 0.12, top + 0.04, i + 1, 0.48);
    card(s, x, top + 0.75, cw, 1.35, {});
    T(s, t[0], { x: x + 0.25, y: top + 0.95, w: cw - 0.4, h: 0.28, fontSize: 12, fontFace: FONT_SB, color: K.violet });
    T(s, t[1], { x: x + 0.25, y: top + 1.3, w: cw - 0.4, h: 0.5, fontSize: 15.5, bold: true, color: K.navy });
  });
  const y2 = top + 2.35;
  T(s, '센서 부착 시점 · 두 가지 경로', { x: MX, y: y2, w: 6, h: 0.32, fontSize: 15, bold: true, color: K.navy });
  const pw = (12.133 - 0.3) / 2;
  [['경로 A', '첫 내원 당일, 교육 직후 의원에서 부착', 'LuZap'], ['경로 B', '앱 기록으로 2~4주 먼저 시작 → 다음 내원일에 부착', 'LuNotebookPen']].forEach((p, i) => {
    const x = MX + i * (pw + 0.3);
    card(s, x, y2 + 0.48, pw, 1.35, { fill: K.panel, line: false });
    ico(s, p[2], x + 0.3, y2 + 0.88, 0.55, { bg: K.white });
    T(s, p[0], { x: x + 1.05, y: y2 + 0.74, w: 3, h: 0.28, fontSize: 12, fontFace: FONT_SB, color: K.violet });
    T(s, p[1], { x: x + 1.05, y: y2 + 1.04, w: pw - 1.3, h: 0.5, fontSize: 15.5, bold: true, color: K.navy });
  });
  note(s, MX, y2 + 1.95, 12.133, 0.52, '비용이 부담되는 환자는 **경로 B**로 안내합니다.', 'info', 13);
}

function s16(pres) {
  const s = head(pres, S2, K2, '오늘 세 가지만 정해 주시면 바로 시작할 수 있습니다', '도입을 정하시면 첫 스태프 교육부터 교육간호사가 함께 진행합니다.');
  const st = [['도입 결정', '상담료 책정'], ['Pro 계정', '파트너 코드 발급'], ['리브레 주문', '더샵 초기 수량'], ['스태프 교육', '교육간호사 방문'], ['첫 환자 등록', '링크 발송 · 부착'], ['정기 운영', '2주 센서 · 4주 상담']];
  const top = 2.0, cw = (12.133 - 5 * 0.16) / 6;
  st.forEach((t, i) => {
    const x = MX + i * (cw + 0.16);
    card(s, x, top, cw, 1.5, {});
    hexNum(s, x + (cw - 0.42 * 1.08) / 2, top + 0.2, i + 1, 0.42);
    T(s, t[0], { x, y: top + 0.72, w: cw, h: 0.3, fontSize: 14, bold: true, color: K.navy, align: 'center' });
    T(s, t[1], { x, y: top + 1.05, w: cw, h: 0.26, fontSize: 11.5, color: K.sub, align: 'center' });
  });
  const y2 = top + 1.9;
  T(s, '오늘 정해 주실 것', { x: MX, y: y2, w: 5, h: 0.32, fontSize: 15, bold: true, color: K.violet });
  const dw = (12.133 - 0.5) / 3;
  [['상담료', ['리브레 + 상담 기준', '12~15만원 선에서 책정'], 'LuWallet'], ['첫 스태프 교육 방문일', ['데스크 · 간호사 대상', 'Pro 등록 · 센서 부착 시연'], 'LuCalendarCheck'], ['먼저 권유할 환자군', ['당뇨전단계 · GLP-1 투약 ·', '생활습관 개선군 중 시작점'], 'LuUsers']].forEach((d, i) => {
    const x = MX + i * (dw + 0.25);
    card(s, x, y2 + 0.45, dw, 2.3, { fill: K.violetLt, line: false });
    hexNum(s, x + 0.3, y2 + 0.72, i + 1, 0.44);
    T(s, d[0], { x: x + 0.92, y: y2 + 0.7, w: dw - 1.1, h: 0.46, fontSize: 16, bold: true, color: K.navy, valign: 'middle' });
    T(s, paras(d[1]), { x: x + 0.35, y: y2 + 1.4, w: dw - 0.6, h: 0.9, fontSize: 13.5, color: K.ink, lineSpacingMultiple: 1.3 });
  });
}

function s18(pres) {
  const s = head(pres, S3, K3, '환자에게 안내하는 웰다 시작 3단계', '첫 내원 때 환자에게 이 순서로 안내합니다. 시작 전 사전 체크리스트 작성을 권해 주세요.');
  const st = [['웰다 앱 설치', '앱을 설치한 뒤 회원가입과 사전 문진을 마칩니다. 간편 회원가입을 지원합니다.', 'LuSmartphone'], ['건강 상태 입력', '지금의 몸 상태와 생활습관을 기록해 앞으로의 변화를 정확히 확인합니다.', 'LuClipboardList'], ['웰다 여정 시작', '웰다와 함께 나에게 맞는 건강한 생활습관을 만들어 갑니다.', 'LuFootprints']];
  const top = 2.05, cw = 2.75, ch = 4.4;
  st.forEach((t, i) => {
    const x = MX + i * (cw + 0.25);
    card(s, x, top, cw, ch, {});
    hexNum(s, x + 0.3, top + 0.3, i + 1, 0.5);
    ico(s, t[2], x + cw - 0.95, top + 0.28, 0.6);
    T(s, t[0], { x: x + 0.3, y: top + 1.2, w: cw - 0.5, h: 0.4, fontSize: 18, bold: true, color: K.navy });
    T(s, t[1], { x: x + 0.3, y: top + 1.75, w: cw - 0.55, h: 1.6, fontSize: 13, color: K.ink, lineSpacingMultiple: 1.3 });
  });
  const qx = MX + 3 * (cw + 0.25) + 0.15, qw = W - MX - qx;
  card(s, qx, top, qw, ch, { fill: K.violetLt, line: false });
  T(s, '웰다 여정을 시작하기 전에', { x: qx + 0.4, y: top + 0.35, w: qw - 0.8, h: 0.3, fontSize: 13, fontFace: FONT_SB, color: K.violetDk });
  T(s, '사전 체크리스트를 작성해 보세요', { x: qx + 0.4, y: top + 0.68, w: qw - 0.6, h: 0.4, fontSize: 18, bold: true, color: K.navy });
  card(s, qx + (qw - 2.0) / 2, top + 1.35, 2.0, 2.0, { r: 0.1 });
  s.addImage({ path: A('qr_checklist.png'), x: qx + (qw - 1.7) / 2, y: top + 1.5, w: 1.7, h: 1.7, altText: '웰다 사전 체크리스트 QR' });
  T(s, '웰다 사전 체크리스트', { x: qx + 0.3, y: top + 3.5, w: qw - 0.6, h: 0.3, fontSize: 13, bold: true, color: K.violet, align: 'center' });
  T(s, '현재 상태를 파악하고 앞으로의 변화에 필요한 것을 준비합니다.', { x: qx + 0.3, y: top + 3.82, w: qw - 0.6, h: 0.5, fontSize: 11, color: K.ink, align: 'center', lineSpacingMultiple: 1.15 });
}

function s19(pres) {
  const s = head(pres, S3, K3, '의원: 웰다 Pro에서 파트너 링크 발송',
    '웰다 Pro › 유저 관리에서 [파트너 링크 발송]을 누르고, 환자 정보를 입력해 링크를 보냅니다.');
  const b = shot(s, 's19_pro.png', MX, 2.0, 7.6, 4.6, { al: 'l', va: 't' });
  hl(s, b, 's19_pro.png', [3480, 170, 4130, 385], 1, { badge: 'tl' });
  hl(s, b, 's19_pro.png', [1350, 875, 2965, 2405], 2);
  const x0 = b.x + b.w + 0.45, w0 = W - MX - x0;
  const st = [['[파트너 링크 발송]', '유저 관리 화면 오른쪽 위의 버튼을 누릅니다.'], ['정보 입력 후 발송', '파트너 코드를 고르고, 환자 이름과 전화번호를 입력한 뒤 [링크 발송]을 누릅니다.'], ['카카오톡 확인 안내', '환자 카카오톡으로 시작 링크가 발송됩니다. 링크는 발송 후 24시간 동안 유효합니다.']];
  st.forEach((t, i) => {
    const y = 2.05 + i * 1.45;
    hexNum(s, x0, y, i + 1, 0.42);
    T(s, t[0], { x: x0 + 0.62, y: y + 0.02, w: w0 - 0.62, h: 0.34, fontSize: 15, bold: true, color: K.navy });
    T(s, t[1], { x: x0 + 0.62, y: y + 0.42, w: w0 - 0.62, h: 0.9, fontSize: 12.5, color: K.ink, lineSpacingMultiple: 1.25 });
  });
}

function s20(pres) {
  const s = head(pres, S3, K3, '환자가 받는 알림톡', '파트너 링크를 보내면 환자 카카오톡으로 「웰다」 알림톡이 도착합니다.');
  const b = shot(s, 's20_kakao.png', MX + 0.2, 2.0, 2.75, 4.65, { va: 't' });
  const x0 = b.x + b.w + 0.6, w0 = W - MX - x0;
  const st = [['카카오톡을 확인하도록 안내', '카카오톡 알림톡 「웰다」로 시작 링크가 발송됩니다. 앱 설치를 위해 카카오톡을 확인하도록 안내해 주세요.', 'LuMessageCircle'], ['링크를 누르면 앱 설치 화면으로', '앱스토어의 웰다 설치 화면으로 이동합니다. 이미 설치되어 있으면 웰다 시작 화면으로 바로 이동합니다.', 'LuSmartphone'], ['알림톡이 안 보이면 다시 발송', '환자가 알림톡을 확인하지 못했다면 웰다 Pro에서 링크를 다시 보낼 수 있습니다.', 'LuSend']];
  st.forEach((t, i) => {
    const y = 2.05 + i * 1.1;
    ico(s, t[2], x0, y, 0.55);
    T(s, t[0], { x: x0 + 0.75, y: y - 0.02, w: w0 - 0.75, h: 0.32, fontSize: 15, bold: true, color: K.navy });
    T(s, t[1], { x: x0 + 0.75, y: y + 0.33, w: w0 - 0.75, h: 0.65, fontSize: 12.5, color: K.ink, lineSpacingMultiple: 1.2 });
  });
  const bp = shot(s, 's20_pro.png', x0 + 0.75, 5.35, 2.3, 1.3, { al: 'l', va: 't' });
  T(s, '웰다 Pro에서 링크 다시 발송', { x: bp.x + bp.w + 0.25, y: bp.y + bp.h - 0.3, w: 3.2, h: 0.3, fontSize: 11, color: K.sub });
}

function s21(pres) {
  const s = head(pres, S3, K3, '환자 앱 온보딩, 4단계로 진행합니다', '웰다 앱 설치부터 리브레 연동까지 환자가 거치는 순서입니다. 4단계 리브레 연동은 센서를 부착하는 환자만 진행합니다.');
  const st = [['웰다 앱 설치', 'QR 스캔 → 회원가입 → 사전 문진', 'LuSmartphone'], ['사전 설문', '4개 섹션 설문 · AI 코치 맞춤 조언', 'LuClipboardList'], ['목표 · 허리둘레 입력', '목표 설정 · 현재 허리둘레 기록', 'LuRuler'], ['리브레 설치 · 연동', '센서 부착 환자만 · 최대 15분 추가', 'LuActivity']];
  const top = 2.15, cw = (12.133 - 3 * 0.35) / 4;
  st.forEach((t, i) => {
    const x = MX + i * (cw + 0.35);
    card(s, x, top, cw, 2.1, i === 3 ? { fill: K.panel, line: K.violetMd } : {});
    hexNum(s, x + 0.3, top + 0.3, i + 1, 0.46);
    ico(s, t[2], x + cw - 0.85, top + 0.26, 0.55);
    T(s, t[0], { x: x + 0.3, y: top + 0.95, w: cw - 0.5, h: 0.36, fontSize: 16, bold: true, color: K.navy });
    T(s, t[1], { x: x + 0.3, y: top + 1.36, w: cw - 0.5, h: 0.55, fontSize: 12, color: K.ink, lineSpacingMultiple: 1.2 });
    if (i < 3) T(s, '›', { x: x + cw, y: top + 0.8, w: 0.35, h: 0.5, fontSize: 24, color: K.violetMd, align: 'center', valign: 'middle' });
  });
  const y2 = 4.65;
  T(s, '환자에게 함께 안내할 문의 채널', { x: MX, y: y2, w: 5, h: 0.3, fontSize: 12.5, fontFace: FONT_SB, color: K.violet });
  card(s, MX, y2 + 0.4, 12.133, 1.55, { fill: K.violetLt, line: false });
  T(s, paras(['이용 중 문의나 도움이 필요하면', '채널톡 「웰다」로 문의하도록 안내해 주세요']), { x: MX + 0.45, y: y2 + 0.4, w: 5.8, h: 1.55, fontSize: 17, bold: true, color: K.navy, valign: 'middle', lineSpacingMultiple: 1.3 });
  card(s, MX + 6.5, y2 + 0.55, 1.25, 1.25, { r: 0.08 });
  s.addImage({ path: A('qr_channel.png'), x: MX + 6.6, y: y2 + 0.65, w: 1.05, h: 1.05, altText: '채널톡 웰다 QR' });
  const hrs = [['운영 시간', '평일 08:30~17:30'], ['점심 시간', '12:00~13:00'], ['휴무일', '토요일 · 일요일 · 공휴일']];
  hrs.forEach((h, i) => {
    const y = y2 + 0.6 + i * 0.42;
    T(s, h[0], { x: MX + 8.2, y, w: 1.2, h: 0.36, fontSize: 13, fontFace: FONT_SB, color: K.violetDk, valign: 'middle' });
    T(s, h[1], { x: MX + 9.45, y, w: 2.6, h: 0.36, fontSize: 13, color: K.ink, valign: 'middle' });
  });
  source(s, GUIDE);
}

function s22(pres) {
  const s = head(pres, S3, K3, '웰다 앱 설치 · 회원가입', null);
  guideRow(s, [
    { img: 'g22_1.png', label: 'STEP 1', title: 'QR로 앱 설치', body: 'QR을 카메라로 스캔해 웰다 앱을 내려받습니다.' },
    { img: 'g22_2.png', label: 'STEP 2', title: '회원가입', body: '웰다 앱을 열고 회원가입합니다.', note: '파트너 코드가 있으면 회원가입 후 입력합니다.', nh: 0.62 },
    { img: 'g22_3.png', label: 'STEP 3', title: '사전 문진', body: '사전 문진을 진행합니다.' },
    { img: 'g22_4.png', label: 'STEP 4', title: '문진 완료', body: '문진이 끝나면 [계속하기]를 누릅니다.', note: '추가 확인이 필요하면 웰다에서 개별 안내합니다.', nh: 0.62 }
  ], 1.65, 3.35);
  source(s, GUIDE);
}

function s23(pres) {
  const s = head(pres, S3, K3, '사전 문진 미통과 기준',
    '다음에 해당하면 사전 문진을 통과하지 못합니다. 전문의 소견상 이용에 문제가 없으면 승인하고, 위험 요소가 있으면 미통과로 처리해 주세요.');
  const G = [
    ['대상 특성', ['임산부 또는 수유부', '성장기 청소년', '만 75세 이상 고령자']],
    ['당뇨병', ['1형 당뇨병', '2형 당뇨병(경구 혈당강하제 복용 중)', '2형 당뇨병(인슐린 제제 사용 중)']],
    ['선천성 대사 질환', ['페닐케톤뇨증', '글리코겐 저장병', '갈락토오스혈증', '유전성 과당 불내증', '단풍시럽뇨증(MSUD)', '기타 선천성 대사 질환']],
    ['피부', ['심각한 피부 감염 또는 접착제 알레르기(봉와직염, 농양 등)', '피부 질환으로 스테로이드 복용 중(프레드니손, 히드로코르티손 등)']],
    ['기타 질환', ['암(항암 치료 중)', '투석 중인 신장 질환', '의학적 식단이 필요한 경우(뇌전증 등)', '만성 폐쇄성 폐질환(COPD)', '관상동맥질환 또는 심장마비 병력', '뇌졸중(뇌혈관 사고) 병력']]
  ];
  const top = 2.15, colW = 3.3;
  const cols = [[0, 1, 3], [2, 4]];
  cols.forEach((c, ci) => {
    let y = top; const x = MX + ci * (colW + 0.25);
    c.forEach(gi => {
      const g = G[gi];
      T(s, g[0], { x, y, w: colW, h: 0.26, fontSize: 11, fontFace: FONT_SB, color: K.violet });
      y += 0.3;
      g[1].forEach(it => {
        const long = it.length > 22; const hh = long ? 0.46 : 0.27;
        T(s, [{ text: it, options: { bullet: { indent: 11 } } }], { x, y, w: colW, h: hh, fontSize: 11.5, color: K.ink, lineSpacingMultiple: 1.05 });
        y += hh + 0.02;
      });
      y += 0.14;
    });
  });
  const px = MX + 2 * colW + 0.75, pw = W - MX - px;
  const b = shot(s, 's23_pro.png', px, top, pw, 3.6, { va: 't' });
  hl(s, b, 's23_pro.png', [516, 428, 1409, 853], 1);
  T(s, rich('미통과 환자를 승인하려 하면 **경고 창이 한 번 더** 뜹니다. 확인 후 승인 여부를 정해 주세요.', { color: K.ink }), { x: b.x + 0.5, y: b.y + b.h + 0.2, w: b.w - 0.5, h: 0.6, fontSize: 12.5, lineSpacingMultiple: 1.2 });
  hexNum(s, b.x, b.y + b.h + 0.22, 1, 0.34);
}

function s24(pres) {
  const s = head(pres, S3, K3, '사전 설문 진행', null);
  guideRow(s, [
    { img: 'g24_1.png', label: 'STEP 1', title: '[체크 시작하기]', body: '웰다 앱에서 [체크 시작하기]를 눌러 사전 설문을 시작합니다.' },
    { img: 'g24_2.png', label: 'STEP 2', title: '4개 섹션 설문', body: '웰다 참여 목적 · 기본 정보 · 생활 습관 · 증상 체크 순서로 답합니다.', note: '응답을 바탕으로 AI 코치가 맞춤 조언을 하므로, 문항을 자세히 읽고 답하도록 안내합니다.', nh: 0.62 },
    { img: 'g24_3.png', label: 'STEP 3', title: '설문 완료', body: '[시작하기]를 눌러 다음 단계로 넘어갑니다.' }
  ], 1.65, 3.35);
  source(s, GUIDE);
}

function s25(pres) {
  const s = head(pres, S3, K3, '목표 · 현재 허리둘레 입력', null);
  guideRow(s, [
    { img: 'g25_1.png', label: 'STEP 1', title: '목표 정하기', body: '사전 설문을 마친 뒤 허리둘레 기반 목표를 정하기 위해 [계속하기]를 누릅니다.' },
    { img: 'g25_2.png', label: 'STEP 2', title: '허리둘레 입력', body: '허리둘레(cm) 또는 바지 사이즈(inch)를 입력하고 [저장]을 누릅니다.' },
    { img: 'g25_3.png', label: 'STEP 3', title: '응답 확인', body: '[변화 시작하기]를 누른 뒤 설문 응답을 확인하고 [완료하기]를 누릅니다.' }
  ], 1.65, 3.25);
  source(s, GUIDE);
}

function s26(pres) {
  const s = head(pres, S3, K3, '센서 연동 준비 (웰다 앱 안내)', null);
  guideRow(s, [
    { img: 'g26_1.png', label: 'STEP 1', title: '키트 받은 뒤 시작', body: '키트를 받았다면 [시작할게요]를 누릅니다.' },
    { img: 'g26_2.png', label: 'STEP 2', title: '안내 확인', body: '웰다 캐릭터 도당이가 설명하는 내용을 확인합니다.' },
    { img: 'g26_3.png', label: 'STEP 3-A', title: '여정 챕터에서 시작', body: '여정 챕터 1의 첫 가이드에서 [연속혈당기 계정 연결하기]를 선택합니다.' },
    { img: 'g26_4.png', label: 'STEP 3-B', title: '홈 화면에서 시작', body: '홈 화면의 [센서 연동하기]로도 시작할 수 있습니다.' }
  ], 1.65, 3.35);
  source(s, GUIDE);
}

function s27(pres) {
  const s = head(pres, S3, K3, '리브레 앱 설치 · 계정 생성', null);
  guideRow(s, [
    { img: 'g27_1.png', label: 'STEP 1', title: '리브레 앱 설치', body: '연동 화면의 [앱 설치하러 가기]로 FreeStyle LibreLink 앱을 설치합니다.' },
    { img: 'g27_2.png', label: 'STEP 2', title: '회원가입', body: '리브레 앱을 열고 회원가입합니다.' },
    { img: 'g27_3.png', label: 'STEP 3', title: '단위 설정', body: '가입이 끝나면 측정 단위와 탄수화물 단위를 설정합니다.' }
  ], 1.65, 2.65);
  const nw = (12.133 - 0.3) / 2;
  note(s, MX, 6.0, nw, 0.5, '비밀번호는 **12자 이상**, 숫자 · 대문자 · 소문자를 각 1개 이상 넣습니다.', 'info', 12);
  note(s, MX + nw + 0.3, 6.0, nw, 0.5, '측정 단위 **mg/dL**, 탄수화물 단위 **그램**으로 설정합니다.', 'info', 12);
  source(s, GUIDE, 6.62);
}

function s28(pres) {
  const s = head(pres, S3, K3, '웰다 앱에서 리브레 연동', null);
  guideRow(s, [
    { img: 'g28_1.png', label: 'STEP 1', title: '[연동 시작] · 동의', body: '웰다 앱에서 [연동 시작]을 누르고, 개인정보 및 데이터 공유 안내를 확인한 뒤 [동의]를 누릅니다.' },
    { img: 'g28_2.png', label: 'STEP 2', title: '리브레 로그인', body: '리브레 가입 이메일과 비밀번호로 로그인합니다.' },
    { img: 'g28_3.png', label: 'STEP 3', title: '데이터 공유 허용', body: '웰다 서비스를 만든 엠서클(MCircle)과의 데이터 공유를 허용하면 연동이 끝납니다.' }
  ], 1.65, 2.7);
  note(s, MX, 6.12, 12.133, 0.42, '리브레 가입 이메일이 기억나지 않으면 **리브레 앱 ☰ → 설정 → 계정 세부정보**에서 확인할 수 있습니다.', 'info', 12);
  source(s, GUIDE, 6.62);
}

function s29(pres) {
  const s = head(pres, S3, K3, '센서 부착하기', null);
  const bx = guideRow(s, [
    { img: 'g29_1.png', label: 'STEP 1', title: '부착 위치 확인', body: '살이 많고 말랑한 부위에 붙이도록 권장합니다.', bh: 0.5, note: '팔 뒤쪽, 어깨 삼각근 아래를 동봉된 알코올 스왑으로 닦고 충분히 말립니다.', nh: 0.8 },
    { img: 'g29_2.png', label: 'STEP 2', title: '삽입기 · 센서 팩 준비', body: '센서 팩 포장을 벗기고, 삽입기 뚜껑을 돌려 엽니다.' },
    { img: 'g29_3.png', label: 'STEP 3', title: '연결', body: '센서 팩과 삽입기의 **홈 위치를 맞추고**, 평평한 바닥에 대고 수직으로 눌러 연결합니다.', bh: 0.75, note: '연결 후 삽입기 내부를 만지거나 파란 부분을 누르지 마세요.', kind: 'warn', nh: 0.62 },
    { img: 'g29_4.png', label: 'STEP 4', title: '부착', body: '소독한 부위에 삽입기를 직각으로 대고 힘껏 누릅니다.' }
  ], 1.65, 2.25, { fs: 12 });
  source(s, GUIDE);
}

function s30(pres) {
  const s = head(pres, S3, K3, '센서 활성화 (안드로이드 · iOS)', null);
  const imgs = [['g30_1.png', '안드로이드', 'NFC를 켜고 NFC 모드를 기본 모드로 설정합니다. 휴대폰이 켜진 상태에서 휴대폰 뒷면을 센서 위로 움직여 태깅합니다.', 'NFC 칩 위치는 기종마다 다릅니다.'],
    ['g30_2.png', 'iOS', '리브레 앱에서 [센서 스캔]을 누른 뒤 휴대폰 위쪽을 센서에 태깅하고, 스캔 완료 화면을 확인합니다.', null],
    ['g30_3.png', '준비 완료', '진동이 두 번 울리면 센서 준비가 시작되고, 60분 뒤 활성화됩니다.', '웰다 앱 연동은 최대 15분 더 걸릴 수 있습니다.']];
  const H = 3.0, gap = 0.3; const ws = imgs.map(i => H * L.SIZES[i[0]][0] / L.SIZES[i[0]][1]);
  let x = MX + (12.133 - ws.reduce((a, b) => a + b) - 2 * gap) / 2;
  imgs.forEach((im, i) => {
    s.addShape('roundRect', { x, y: 1.65, w: i === 2 ? 1.3 : 1.45, h: 0.34, rectRadius: 0.17, fill: { color: i === 2 ? K.violetLt : K.violet }, line: { type: 'none' } });
    T(s, im[1], { x, y: 1.65, w: i === 2 ? 1.3 : 1.45, h: 0.34, fontSize: 12, fontFace: FONT_SB, color: i === 2 ? K.violetDk : K.white, align: 'center', valign: 'middle' });
    s.addImage({ path: A(im[0]), x, y: 2.12, w: ws[i], h: H, altText: im[1] });
    T(s, rich(im[2], { color: K.ink }), { x, y: 2.12 + H + 0.18, w: ws[i], h: 0.75, fontSize: 12, lineSpacingMultiple: 1.2 });
    if (im[3]) note(s, x, 2.12 + H + 0.98, ws[i], 0.42, im[3], 'info', 10.5);
    x += ws[i] + gap;
  });
  source(s, GUIDE);
}

function s31(pres) {
  const s = head(pres, S3, K3, '생활습관 기록 독려하기', '무엇을 얼마나 먹는지, 하루에 얼마나 움직이는지 기록하는 것이 생활습관 관리의 출발점입니다.');
  const top = 2.05;
  const b1 = shot(s, 's31_1.png', MX, top, 1.95, 4.2, { al: 'l', va: 't' });
  T(s, rich('**+ 버튼 하나로** 식사 · 운동 · 단식 · 증상 · 태그 · 신체를 기록하도록 안내해 주세요.', { color: K.ink }), { x: b1.x + b1.w + 0.3, y: top + 0.1, w: 2.4, h: 1.2, fontSize: 13, lineSpacingMultiple: 1.3 });
  shot(s, 's31_nutri.png', b1.x + b1.w + 0.3, top + 1.6, 2.5, 1.6);
  T(s, '식사를 기록하면 영양 성분이 함께 정리됩니다.', { x: b1.x + b1.w + 0.3, y: top + 3.35, w: 2.5, h: 0.6, fontSize: 11.5, color: K.sub, lineSpacingMultiple: 1.2 });
  const x3 = 7.15, pw = (W - MX - x3 - 2 * 0.2) / 3;
  const ph = pw * 990 / 466;
  ['s31_2.png', 's31_3.png', 's31_4.png'].forEach((p, i) => {
    const b = shot(s, p, x3 + i * (pw + 0.2), top, pw, ph, { va: 't' });
    if (i === 0) hl(s, b, p, [350, 875, 455, 980], 1, { badge: 'tl' });
  });
  card(s, x3, top + ph + 0.3, W - MX - x3, 0.95, { fill: K.violetLt, line: false });
  hexNum(s, x3 + 0.25, top + ph + 0.56, 1, 0.38);
  T(s, rich('식사 기록 화면 아래 **카메라 버튼**으로 음식 사진을 찍으면, 촬영 시간과 메뉴까지 간편하게 입력됩니다.', { color: K.ink }), { x: x3 + 0.8, y: top + ph + 0.3, w: W - MX - x3 - 1.0, h: 0.95, fontSize: 12.5, valign: 'middle', lineSpacingMultiple: 1.2 });
}

module.exports = { s14, s15, s16, s18, s19, s20, s21, s22, s23, s24, s25, s26, s27, s28, s29, s30, s31 };
