// ===================================================
// auth.js - 認証・権限モデル（全ページ共通）
//   ロール: member（一般）/ editor（編集者）/ admin（管理者）
// ===================================================
import { onAuthStateChanged, signOut, sendEmailVerification } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import { auth, db } from './firebase-config.js';

export const ROLE_LABELS = {
  admin:  '管理者',
  editor: '編集者',
  member: '会員',
};

// ロール階層（数値が大きいほど上位）
const ROLE_LEVEL = { member: 1, editor: 2, admin: 3 };

// ── 権限判定 ─────────────────────────────────────────
// イベントの追加・編集・削除、役割割り当て、声かけ者設定 → editor 以上
export function canEdit(userData) {
  return !!userData && ROLE_LEVEL[userData.role] >= ROLE_LEVEL.editor;
}
// ユーザー管理・権限付与 → admin のみ
export function isAdmin(userData) {
  return !!userData && userData.role === 'admin';
}
// プロフィールの基本情報・志・事業内容を編集できるか（本人 or admin）
export function canEditProfile(userData, targetUid) {
  return !!userData && (userData.uid === targetUid || userData.role === 'admin');
}

// ── 認証ガード（各ページ冒頭で await する）──────────────
// 戻り値: { uid, email, ...usersドキュメント }
export function requireAuth() {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) { location.href = 'login.html'; return; }
      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        if (!snap.exists()) {
          showFatal('アカウントが登録されていません。事務局にご連絡ください。');
          return;
        }
        const data = snap.data();
        if (data.disabled) {
          showFatal('このアカウントは無効化されています。事務局にご連絡ください。');
          return;
        }
        // 自己登録者のみメール認証を必須にする（管理者招待・既存アカウントは対象外）
        if (data.selfRegistered === true && !user.emailVerified) {
          try { await user.reload(); } catch (_) {}
          if (!user.emailVerified) { showUnverified(user); return; }
        }
        if (data.status === 'pending') {
          showPending();
          return;
        }
        resolve({ uid: user.uid, email: user.email, ...data });
      } catch (e) {
        showFatal('認証情報の取得に失敗しました：' + e.message);
      }
    });
  });
}

export async function logout() {
  await signOut(auth);
  location.href = 'login.html';
}

// ── 共通トップバーを描画（各ページで renderTopbar(userData, 'events') 等）──
export function renderTopbar(userData, active) {
  const links = [
    { key: 'events',  label: 'イベント', href: 'index.html' },
    { key: 'members', label: '会員', href: 'members.html' },
  ];
  if (isAdmin(userData)) links.push({ key: 'admin', label: '会員管理', href: 'admin.html' });

  const nav = links.map(l =>
    `<a class="nav-link ${l.key === active ? 'active' : ''}" href="${l.href}">${l.label}</a>`
  ).join('');

  const bar = document.createElement('div');
  bar.className = 'topbar';
  bar.innerHTML = `
    <a href="index.html" class="topbar-brand">経営実践研究会 広島<span class="sub">会員 情報共有アプリ</span></a>
    ${nav}
    <div class="topbar-spacer"></div>
    <div class="topbar-user">
      <div><a href="profile.html?uid=${userData.uid}" style="font-weight:700;color:var(--ink)">${userData.name || userData.email}</a></div>
      <div class="role">${ROLE_LABELS[userData.role] || userData.role}</div>
    </div>
    <button class="btn-logout" id="__logout">ログアウト</button>`;
  document.body.insertBefore(bar, document.body.firstChild);
  document.getElementById('__logout').onclick = logout;
}

function gateShell(icon, title, message, buttonsHtml) {
  document.body.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:#F5F3EF;font-family:'Noto Sans JP',sans-serif;padding:20px;">
      <div style="background:#fff;border-radius:14px;border:1px solid #E5E0D8;padding:36px 32px;text-align:center;max-width:420px;box-shadow:0 4px 20px rgba(0,0,0,0.06);">
        <div style="font-size:34px;margin-bottom:14px;">${icon}</div>
        <div style="font-size:16px;font-weight:800;color:#3A342B;margin-bottom:10px;">${title}</div>
        <div style="font-size:13px;color:#6B6459;line-height:1.9;margin-bottom:22px;">${message}</div>
        ${buttonsHtml}
      </div>
    </div>`;
}

function showFatal(message) {
  gateShell('🔒', 'アクセスできません', message,
    `<button onclick="location.href='login.html'" style="padding:10px 24px;background:#B08D3F;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;">ログイン画面へ</button>`);
}

function showPending() {
  gateShell('⏳', '承認待ちです',
    'メール認証は完了しています。<br>現在、事務局の承認をお待ちいただいている状態です。<br>承認が完了しましたらご利用いただけます。',
    `<button id="__logout2" style="padding:10px 24px;background:#fff;border:1.5px solid #E5E0D8;color:#6B6459;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;">ログアウト</button>`);
  const b = document.getElementById('__logout2'); if (b) b.onclick = logout;
}

function showUnverified(user) {
  gateShell('📧', 'メール認証が未完了です',
    `<strong>${user.email}</strong> 宛の確認メールのリンクをクリックして、メール認証を完了してください。<br>認証後、この画面を再読み込みしてください。`,
    `<button id="__resend" style="padding:10px 24px;background:#B08D3F;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;margin-right:6px;">確認メールを再送</button>
     <button id="__reload" style="padding:10px 20px;background:#fff;border:1.5px solid #E5E0D8;color:#6B6459;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;">再読み込み</button>
     <div id="__resendMsg" style="font-size:12px;color:#3F7A54;margin-top:12px;"></div>
     <div style="margin-top:14px;"><a href="#" id="__logout3" style="font-size:12px;color:#9A9284;">ログアウト</a></div>`);
  document.getElementById('__reload').onclick = () => location.reload();
  document.getElementById('__logout3').onclick = (e) => { e.preventDefault(); logout(); };
  document.getElementById('__resend').onclick = async () => {
    try { await sendEmailVerification(user); document.getElementById('__resendMsg').textContent = '確認メールを再送しました'; }
    catch (e) { document.getElementById('__resendMsg').style.color = '#B5493F'; document.getElementById('__resendMsg').textContent = '再送に失敗しました：' + e.message; }
  };
}
