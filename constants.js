// ===================================================
// constants.js - 共通定義
// ===================================================

// イベント種別（追加・並べ替えはここを編集）
export const EVENT_TYPES = [
  '特別講演in広島',
  '定例会in広島',
  '交流会in広島',
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
