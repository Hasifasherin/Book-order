"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../utils/baseUrl"; // make sure path is correct

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("authUser");

    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));

    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const res = await api.post("/login", { email: username, password });

      if (res.data.success) {
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("authUser", JSON.stringify(res.data.user));
        toast.success(res.data.message);
        return true;
      }

      toast.error(res.data.message || "Login failed");
      return false;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
    toast.info("Logged out successfully!");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
