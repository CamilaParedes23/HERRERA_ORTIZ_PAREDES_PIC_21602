// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { login, register } from '../api/api';

interface AuthContextType {
  user: any | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: {
    nombres: string;
    apellidos: string;
    email: string;
    password: string;
    tipo_usuario: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);

  const handleLogin = async (credentials: { email: string; password: string }) => {
    const response = await login(credentials);
    setUser(response.data);
  };

  const handleRegister = async (userData: {
    nombres: string;
    apellidos: string;
    email: string;
    password: string;
    tipo_usuario: string;
  }) => {
    const response = await register(userData);
    setUser(response.data);
  };

  return (
    <AuthContext.Provider value={{ user, login: handleLogin, register: handleRegister }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 