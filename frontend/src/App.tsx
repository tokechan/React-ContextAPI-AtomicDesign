import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MemoCreate from "./pages/MemoCreate";
import MemoEdit from "./pages/MemoEdit";
import MemoDetail from "./pages/MemoDetail";
import NotFound from "./pages/NotFound";
import { MemoProvider } from "./context/MemoContext";

function App() {
  return (
    <AuthProvider>
      <MemoProvider>
        <Router>
          <Routes>
            {/* 公開ルート */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* 保護されたルート */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/memo/new" element={<MemoCreate />} />
              <Route path="/memo/:id" element={<MemoDetail />} />
              <Route path="/memo/:id/edit" element={<MemoEdit />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </MemoProvider>
    </AuthProvider>
  );
}

export default App;
