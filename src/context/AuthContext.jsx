import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Al cargar la web, buscamos si hay una sesión guardada en algún lado
    const savedUser = localStorage.getItem('cj_user_session') || sessionStorage.getItem('cj_user_session');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData, remember = false) => {
    setUser(userData);
    // 2. Si marcó "Recordarme", usamos localStorage (no expira al cerrar pestaña)
    // Si no, usamos sessionStorage (se borra al cerrar la pestaña)
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('cj_user_session', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cj_user_session');
    sessionStorage.removeItem('cj_user_session');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);