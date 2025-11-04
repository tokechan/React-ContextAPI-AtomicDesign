// src/components/PrivateRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  // 認証状態の読み込み中
  if (loading) {
    return <div>読み込み中...</div>;
  }

  // 認証されていない場合はログインページにリダイレクト
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
