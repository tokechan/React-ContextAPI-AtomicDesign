// src/pages/Login.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components";

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #f39c12;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #f39c12;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e67e22;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const RegisterLink = styled.div`
  text-align: center;
  margin-top: 20px;

  a {
    color: #f39c12;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const { login, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  // コンポーネントがアンマウントされる時にエラーをクリア
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    clearError();

    if (!email || !password) {
      setLocalError("メールアドレスとパスワードを入力してください");
      return;
    }

    try {
      await login(email, password);
      navigate("/");
    } catch (err: unknown) {
      // エラーはAuthContextで処理されるため、ここでは何もしない
      console.error("ログインエラー:", err);
    }
  };

  return (
    <LoginContainer>
      <Title>夫婦共有メモアプリ</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "ログイン中..." : "ログイン"}
        </Button>
        {(localError || error) && <ErrorMessage>{localError || error}</ErrorMessage>}
      </Form>
      <RegisterLink>
        アカウントをお持ちでない方は <Link to="/register">新規登録</Link>
      </RegisterLink>
    </LoginContainer>
  );
};

export default Login;
