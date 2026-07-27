// ===================================================
// constants.js - 共通定義
// ===================================================

// イベント種別（追加・並べ替えはここを編集）
export const EVENT_TYPES = [
  '特別講演',
  'CL',
  'シンポジウム',
  '近未来',
  'ベーシック',
  '未来創造企業',
  '視察実践研修',
  'オリエン',
  'その他',
  'グローアップ',
  '交流会',
  '在り方塾',
  '世話人',
  'リーダー',
  'トークライブ',
];

// 種別バッジの色（未指定は既定色）
export const EVENT_TYPE_COLOR = {
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
