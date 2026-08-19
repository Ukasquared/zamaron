import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile, UserRole } from '@/types';
import { mockCurrentUser } from '@/mock/data';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  role: UserRole;
  setRole: (role: UserRole) => void;
  login: (email: string, passkey?: string) => void;
  logout: () => void;
  walletConnected: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(mockCurrentUser);
  const [walletConnected, setWalletConnected] = useState<boolean>(true);

  // Load from local storage if available
  useEffect(() => {
    const savedRole = localStorage.getItem('zamoron_role') as UserRole;
    if (savedRole && user) {
      setUser({ ...user, role: savedRole });
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    if (user) {
      const updated = { ...user, role: newRole };
      setUser(updated);
      localStorage.setItem('zamoron_role', newRole);
    }
  };

  const login = (email: string) => {
    setUser({
      ...mockCurrentUser,
      email,
    });
  };

  const logout = () => {
    setUser(null);
    setWalletConnected(false);
  };

  const connectWallet = () => {
    setWalletConnected(true);
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        role: user?.role || 'CLIENT',
        setRole,
        login,
        logout,
        walletConnected,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
