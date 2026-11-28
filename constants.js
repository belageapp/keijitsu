// ===================================================
// constants.js - 共通定義
// ===================================================

// イベント種別（追加・並べ替えはここを編集）
export const EVENT_TYPES = [
  '特別講演in広島',
  '定例会in広島',
  '交流会in広島',
  'ランチMTGin広島',
  'フォローMTGin広島',
  '全体MTGin広島',
  '近未来in広島',
  'オリエンin広島',
  'シンポジウム',
  '近未来',
  '特別講演',
  '交流会',
  'オリエン',
  'グローアップ',
  'ベーシック',
  'CL',
  'トークライブ',
  '未来創造企業',
  '在り方塾',
  '視察実践研修',
  'リーダー',
  '世話人',
  'その他',
];

// 機能の表示スイッチ（2026-10-27 代表の指示で一時非表示。戻すときは true に）
//   apply      : 申込ボタン（一覧・詳細）
//   attendance : 出欠登録タブ・参加人数の表示・動員目標
//   members    : トップバーの「会員」タブ（会員名簿）
//   register   : 新規会員登録（register.html と各ページの登録リンク）
export const FEATURES = { apply: true, attendance: false, members: false, register: false };   // apply は 2026-10-27 に再表示（USER）

// イベントの分類（予定図の括り。文言は kj の正本 2026-11_予定図_文言_v2.1 に合わせる）
export const EVENT_CATEGORIES = [
  { key:'exchange', label:'① 交流・対話・仲間づくり', sub:'広島チームの会｜申込は調整さん', bg:'#E1F1E7', color:'#1F6E48' },
  { key:'learning', label:'② 学び・実践・伝播',       sub:'経実会のイベント｜申込は申込サイト', bg:'#DCEBFF', color:'#12508C' },
  { key:'online',   label:'③ 全国・オンライン',       sub:'他県・オンライン開催の経実会イベント｜申込は K-PORTAL', bg:'#EEE9FB', color:'#5A47A0' },
];
export function eventCategory(key) {
  return EVENT_CATEGORIES.find(c => c.key === key) || null;
}
export function eventCategoryOptionsInner() {
  return EVENT_CATEGORIES.map(c => `<option value="${c.key}">${c.label}（${c.sub.split('｜')[0]}）</option>`).join('');
}
export function eventCategoryBadge(key) {
  const c = eventCategory(key);
  if (!c) return '';
  return `<span style="display:inline-block;font-size:11px;font-weight:700;padding:2px 9px;border-radius:10px;background:${c.bg};color:${c.color}">${c.label}</span>`;
}

// 本部（経実会）のイベント一覧
export const HQ_EVENTS_URL = 'https://keijitsu.shikuminet.jp/events/';

// 申込URLの表示名（URLのドメインから判定）
export function applySiteName(url) {
  if (!url) return '';
  if (/chouseisan\.com/.test(url)) return '調整さん';
  if (/keijitsu\.shikuminet\.jp/.test(url)) return '経実会申込サイト';
  return '申込サイト';
}

// 動員目標・進捗バーを表示する種別（この4種別のみ。オリエンin広島は対象外）
export const MOBILIZATION_TYPES = ['特別講演in広島', '定例会in広島', '交流会in広島', '近未来in広島'];

// 種別セレクトの<option>群（in広島グループの後に区切り線を挿入）
export function eventTypeOptionsInner() {
  let html = '';
  EVENT_TYPES.forEach((t, i) => {
    html += `<option value="${t}">${t}</option>`;
    const next = EVENT_TYPES[i+1] || '';
    if (t.endsWith('in広島') && !next.endsWith('in広島')) {
      html += `<option disabled>──────────</option>`;
    }
  });
  return html;
}

// 種別バッジの色（未指定は既定色）
export const EVENT_TYPE_COLOR = {
  '特別講演in広島': { bg:'#DCEBFF', color:'#12508C' },
  '定例会in広島':   { bg:'#E1F1E7', color:'#1F6E48' },
  '交流会in広島':   { bg:'#FBEAD5', color:'#9C5F16' },
  'ランチMTGin広島': { bg:'#FFF3C9', color:'#8A6A00' },
  'フォローMTGin広島':{ bg:'#FBE4EC', color:'#A0365E' },
  '全体MTGin広島':{ bg:'#E3E8FB', color:'#3346A0' },
  '近未来in広島':   { bg:'#EFE1FB', color:'#6A2E93' },
  'オリエンin広島': { bg:'#E1F4F0', color:'#1E7A62' },
  '特別講演':   { bg:'#E4F1FB', color:'#1C6BA8' },
  'CL':         { bg:'#E7F1EA', color:'#2E7A54' },
  'シンポジウム':{ bg:'#F3E9FB', color:'#7A3FA0' },
  '近未来':     { bg:'#E1F4F6', color:'#1E7A8A' },
  'ベーシック': { bg:'#FBF0E1', color:'#B0742A' },
  '未来創造企業':{ bg:'#FDE9EC', color:'#B5493F' },
  '視察実践研修':{ bg:'#EAF0F6', color:'#3A5A7A' },
  'オリエン':   { bg:'#EFF3E7', color:'#5A7A2E' },
  'グローアップ':{ bg:'#FBEEF5', color:'#A03F70' },
  '交流会':     { bg:'#E7F1FB', color:'#2A6FB0' },
  '在り方塾':   { bg:'#F1EEE1', color:'#8A7A2A' },
  '世話人':     { bg:'#E9F1F0', color:'#3A7A70' },
  'リーダー':   { bg:'#FBEAE1', color:'#B0602A' },
  'トークライブ':{ bg:'#EEE9FB', color:'#5A47A0' },
  'その他':     { bg:'#EFEDE8', color:'#6B6459' },
};

export function eventTypeBadge(type) {
  if (!type) return '';
  const c = EVENT_TYPE_COLOR[type] || { bg:'#EFEDE8', color:'#6B6459' };
  return `<span style="display:inline-block;font-size:11px;font-weight:700;padding:2px 9px;border-radius:10px;background:${c.bg};color:${c.color}">${type}</span>`;
}

// 業種（一般的な区分。追加・並べ替えはここを編集）
export const INDUSTRIES = [
  '製造業',
  '建設業',
  '不動産業',
  '卸売・商社',
  '小売業',
  '飲食業',
  '宿泊・観光',
  '運輸・物流',
  '情報通信・IT',
  '金融・保険',
  '医療・ヘルスケア',
  '介護・福祉',
  '教育・学習支援',
  '農林水産業',
  'エネルギー・電気・ガス',
  '士業（法務・会計・労務等）',
  'コンサルティング',
  '広告・マーケティング',
  'デザイン・クリエイティブ',
  '美容・健康',
  '人材・派遣',
  '製薬・化学',
  'サービス業',
  'その他',
];

export function industryBadge(name) {
  if (!name) return '';
  return `<span style="display:inline-block;font-size:10px;font-weight:700;padding:2px 8px;border-radius:9px;background:#E4F1FB;color:#1C6BA8;border:1px solid #C7E0F2">${name}</span>`;
}

// 広島会員数（暫定。実数が確定したらここを更新）
export const HIROSHIMA_MEMBER_COUNT = 65;
// 動員目標＝会員数の2/3
export function mobilizationGoal(count = HIROSHIMA_MEMBER_COUNT) {
  return Math.ceil(count * 2 / 3);
}

// その他出席者の区分
export const OTHER_CATEGORIES = ['県外', '本部役員', '講演者', 'その他'];

// ── リーダーMT ダッシュボード（dashboard.html）────────────────
// K-PORTAL への掲載が要る広島の種別（ランチ・フォローMTGは調整さんなので対象外）
export const KPORTAL_TYPES = ['特別講演in広島', '定例会in広島', '近未来in広島', 'オリエンin広島', '全体MTGin広島'];
export function needsKportal(ev) {
  return ev.category === 'learning' || KPORTAL_TYPES.includes(ev.eventType) || !!(ev.kp && ev.kp.req);
}
// K-PORTAL に載ったか：申込URLが K-PORTAL（keijitsu.shikuminet.jp）なら掲載済みとみなす
export function isOnKportal(ev) {
  return /keijitsu\.shikuminet\.jp/.test(ev.applyUrl || '') || !!(ev.kp && ev.kp.pub);
}
// 新入会の方の段階（仮。段階の名前と順番は代表が決める）
export const NEW_MEMBER_STEPS = [
  { key:'interview', label:'面談' },
  { key:'fivestep',  label:'5STEP' },
  { key:'orien',     label:'オリエン' },
  { key:'growup',    label:'グローアップ' },
  { key:'basic',     label:'ベーシック' },
];
// テスト中は未ログインでも委員長・新入会のお名前・宿題を見せる（USER 2026-11-26）。
//   本運用で戻すときは false にし、firestore.rules の eventStaff・newMembers・mtTasks の read も戻す
export const DASHBOARD_OPEN = true;
// 「最近入会」とみなす期間（日）
export const NEW_MEMBER_DAYS = 183;   // マイページの「入会日：半年以内」に合わせる（2026-11-26）

// ── K-PORTAL 掲載依頼（request.html、USER 2026-11-26）────────────────
// 依頼の送り先：Messenger グループ「広島運営チーム」に @奥村大祐 を付けて送る（USER 2026-11-28）。
// グループの画面のリンク（messenger.com/t/… など）。空なら Messenger のトップを開く
export const OKUMURA_MESSENGER_URL = '';
export const REQUEST_MENTION = '@奥村大祐';
export const REQUEST_GROUP_NAME = '広島運営チーム';
export const MESSENGER_TOP_URL = 'https://www.messenger.com/';
// 依頼の画面で選ぶ種類。時間・会場・名前の初期値（会場は kj の依頼文 v0.3、USER 2026-11-25）
const HOLIS_3F = 'ホリスケアアカデミー 3F（広島市中区大手町3-1-7 ユナイテッドMKビル）';
const HOLIS_4F = 'ホリスケアアカデミー 4F（広島市中区大手町3-1-7 ユナイテッドMKビル）';
export const REQUEST_KINDS = [
  { key:'assembly', label:'全体MTG',            eventType:'全体MTGin広島', category:'exchange', title:'全体MTG → 懇親会', kpName:'全体MTG',           start:'18:00', end:'19:30', venue:HOLIS_3F },
  { key:'orien',    label:'オリエンテーション', eventType:'オリエンin広島', category:'learning', title:'オリエンテーション', kpName:'オリエンテーション', start:'15:00', end:'18:00', venue:HOLIS_3F },
  { key:'special',  label:'特別講演',           eventType:'特別講演in広島', category:'learning', title:'特別講演 → 懇親会', kpName:'特別講演',           start:'18:00', end:'',      venue:'' },
  { key:'other',    label:'そのほか',           eventType:'',               category:'learning', title:'',                 kpName:'',                 start:'',      end:'',      venue:'' },
];
export function requestKindOf(eventType) {
  return REQUEST_KINDS.find(k => k.eventType && k.eventType === eventType) || null;
}
