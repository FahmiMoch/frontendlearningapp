import React, { createContext, useContext, useState, useEffect } from "react";
import { logout as logoutService } from "../services/auth"; // pastikan path benar

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token }); 
    }
    setLoading(false);
  }, []);

  const login = (userData) => setUser(userData);

  const logout = () => {
    logoutService(); 
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
