import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./src/features/auth/Login";
import Register from "./src/features/auth/Register"; // <- tambahkan ini
import MainDashboard from "./src/pages/MainDashboard";
import InsightDashboard from "./src/pages/InsightDashboard";

import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import { InsightProvider } from "./src/contexts/InsightContext";

const AppWrapper = () => {
  const { user } = useAuth();

  return (
    <InsightProvider userId={user?.id || null}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<MainDashboard />} />
        <Route path="/insight" element={<InsightDashboard />} />
      </Routes>
    </InsightProvider>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
