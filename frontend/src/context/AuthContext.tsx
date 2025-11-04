// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { isAxiosError } from "axios";
import {
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  initAuth,
  getCurrentUser,
} from "../services/auth";

// ユーザー型定義
interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

// 認証コンテキスト型定義
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // アプリ起動時に認証状態を復元
    const checkAuth = async () => {
      const hasToken = initAuth();

      if (hasToken) {
        try {
          // トークンが存在する場合、ユーザー情報を取得（実際のAPIを使用）
          const userData = await getCurrentUser();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (err: unknown) {
          console.error("認証エラー:", err);
          // エラーが発生した場合、認証状態をリセット
          await apiLogout();
          setIsAuthenticated(false);

          if (isAxiosError(err) && err.response?.data?.message) {
            setError(err.response.data.message);
          } else {
            setError("認証に失敗しました。再度ログインしてください。");
          }
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  // ユーザー登録
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const userData = await apiRegister(name, email, password);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (err: unknown) {
      if (isAxiosError(err) && err.response?.data?.errors) {
        // バリデーションエラーの処理
        const errorMessages = Object.values(err.response.data.errors).flat().join("\n");
        setError(errorMessages);
      } else if (isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("登録中にエラーが発生しました。");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ログイン
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const userData = await apiLogin(email, password);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (err: unknown) {
      if (isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("ログインに失敗しました。メールアドレスとパスワードを確認してください。");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ログアウト
  const logout = async () => {
    setLoading(true);

    try {
      await apiLogout();
    } catch (err: unknown) {
      console.error("ログアウト中にエラーが発生しました:", err);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  // エラーをクリア
  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        isAuthenticated,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
