// ===================================================
// firebase-config.js - Firebase 初期化（全ページ共通）
// ※ 新規 Firebase プロジェクト作成後、下記 config を差し替えてください
// ===================================================
import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js';

export const firebaseConfig = {
  apiKey: "AIzaSyD0cI14W4i4zjsPgEBYVDDL9GaTB-Mnw2I",
  authDomain: "keijitsu-8239e.firebaseapp.com",
  projectId: "keijitsu-8239e",
  storageBucket: "keijitsu-8239e.firebasestorage.app",
  messagingSenderId: "935116003723",
  appId: "1:935116003723:web:78e71b3bd275bdf772f78e",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(app);
// 認証メール（確認メール・パスワード再設定）を日本語で送信
auth.languageCode = 'ja';
export const db = getFirestore(app);
export const storage = getStorage(app);
