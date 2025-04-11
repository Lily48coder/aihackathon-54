
import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { DoctorInfo } from '@/types/medical';

interface AuthContextType {
  isAuthenticated: boolean;
  user: DoctorInfo | null;
  login: () => void;
  logout: () => void;
  setUserData: (data: DoctorInfo) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<DoctorInfo | null>(null);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const setUserData = (data: DoctorInfo) => {
    setUser(data);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
