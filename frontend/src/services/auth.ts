// src/services/auth.ts
import axios from "axios";
import { API_URL } from "../config";

// ユーザー登録関数
export const register = async (name: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
    password_confirmation: password,
  });

  const { user, access_token } = response.data;

  // トークンをLocalStorageに保存
  localStorage.setItem("token", access_token);

  // 認証ヘッダーの設定
  setAuthHeader(access_token);

  return user;
};

// ログイン関数
export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });

  const { user, access_token } = response.data;

  // トークンをLocalStorageに保存
  localStorage.setItem("token", access_token);

  // 認証ヘッダーの設定
  setAuthHeader(access_token);

  return user;
};

// ログアウト関数
export const logout = async () => {
  try {
    // トークンが存在する場合のみAPIを呼び出す
    const token = localStorage.getItem("token");
    if (token) {
      await axios.post(`${API_URL}/logout`);
    }
  } catch (error) {
    console.error("ログアウト中にエラーが発生しました:", error);
  } finally {
    // LocalStorageからトークンを削除
    localStorage.removeItem("token");

    // 認証ヘッダーをクリア
    delete axios.defaults.headers.common["Authorization"];
  }
};

// 認証ヘッダーの設定
export const setAuthHeader = (token: string) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// アプリ起動時にLocalStorageからトークンを復元
export const initAuth = () => {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthHeader(token);
    return true;
  }
  return false;
};

// ユーザー情報取得関数
export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
  } catch (error) {
    // トークンが無効な場合はLocalStorageをクリア
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    throw error;
  }
};
