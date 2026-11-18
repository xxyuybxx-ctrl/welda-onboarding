const L = require('./lib');
const C1 = require('./ch1'), C23 = require('./ch23'), C45 = require('./ch45');
const { icon } = require('./icons');
let applyTheme = async () => {};
try { ({ applyTheme } = require(process.env.APPLY_THEME || '/root/.claude/skills/synced/d2754c4c-e08e-4051-960e-16da95af79bc_87a7912a-0de5-446e-9f6d-0d29ce33293a/pptx/scripts/apply_theme.js')); } catch (e) { }

const OUT = process.argv[2] || require('path').join(__dirname, 'welda_clinical.pptx');
(async () => {
  const { pres } = L.newDeck();
  const sec = t => pres.addSection({ title: t });
  sec('시작'); C1.cover(pres); C1.toc(pres);
  sec('Chapter 1 프로그램 개요');
  C1.divider(pres, 1, '프로그램 개요', ['웰다 소개 · 생활습관 기록 화면', '서울시 혈당캐치9988 · 권유 대상', '파트너 링크 환자 연결 · 환자와 의원이 얻는 것', '무료 도입 · 비만주사 이후 관리 · 프로그램 4단계']);
  C1.s04(pres); C1.s05(pres); C1.s43(pres); C1.s44(pres); C1.s06(pres); C1.s07(pres); C1.s08(pres); C1.s09(pres); C1.s10(pres); C1.s11(pres); C1.s12(pres);
  sec('Chapter 2 상담 개요');
  C1.divider(pres, 2, '상담 개요', ['프로그램 시작과 점검', '내원 주기 · 센서 부착 경로', '도입 6단계 · 오늘 정할 세 가지']);
  C23.s14(pres); C23.s15(pres); C23.s16(pres);
  sec('Chapter 3 첫방문 프로토콜');
  C1.divider(pres, 3, '첫방문 프로토콜', ['웰다 시작하기 · 파트너 링크 발송 · 알림톡', '앱 설치 · 사전 문진 · 사전 설문 · 허리둘레 입력', '리브레 연동 · 센서 부착 · 활성화', '생활습관 기록 독려']);
  C23.s18(pres); C23.s19(pres); C23.s20(pres); C23.s21(pres); C23.s22(pres); C23.s23(pres); C23.s24(pres); C23.s25(pres); C23.s26(pres); C23.s27(pres); C23.s28(pres); C23.s29(pres); C23.s30(pres); C23.s31(pres);
  sec('Chapter 4 재방문 프로토콜');
  C1.divider(pres, 4, '재방문 프로토콜', ['재방문 상담 3단계', '기록 성실도 · 혈당 지표 추이 · 식습관', '생활습관 교육 포인트', '증상 변화 · 스트레스 · 운동 · 수면']);
  C45.s33(pres); C45.s34(pres); C45.s35(pres); C45.s36(pres); C45.s37(pres); C45.s38(pres); C45.s39(pres);
  sec('Chapter 5 FAQ');
  C1.divider(pres, 5, 'FAQ', ['환자가 자주 묻는 질문과 안내 예시']);
  C45.s41(pres);
  sec('마무리'); C45.s42(pres);
  for (const [n, c] of L.iconsNeeded()) await icon(n, c);
  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, L.THEME);
  console.log('slides', pres.slides.length, OUT);
})().catch(e => { console.error(e); process.exit(1); });
