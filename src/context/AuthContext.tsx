import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { UserProfile, UserRole } from '@/types';
import {
  authenticate,
  destroySession,
  registerOperator,
  restoreSession,
} from '@/services/authService';
import { canAccessPath, hasPermission, type Permission } from '@/auth/rbac';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: UserRole;
  login: (email: string, password?: string, requiredRole?: UserRole) => Promise<UserProfile>;
  register: (input: { name: string; email: string; password: string }) => Promise<UserProfile>;
  logout: () => void;
  walletConnected: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
  canAccess: (path: string) => boolean;
  hasPermission: (permission: Permission) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    restoreSession()
      .then((session) => {
        if (cancelled) return;
        if (session) {
          setUser(session.user);
          setWalletConnected(session.walletConnected);
        } else {
          setUser(null);
          setWalletConnected(false);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password?: string, requiredRole?: UserRole) => {
    const session = await authenticate({ email, password, requiredRole });
    setUser(session.user);
    setWalletConnected(session.walletConnected);
    return session.user;
  }, []);

  const register = useCallback(async (input: { name: string; email: string; password: string }) => {
    const session = await registerOperator(input);
    setUser(session.user);
    setWalletConnected(session.walletConnected);
    return session.user;
  }, []);

  const logout = useCallback(() => {
    destroySession();
    setUser(null);
    setWalletConnected(false);
  }, []);

  const connectWallet = useCallback(() => {
    setWalletConnected(true);
  }, []);

  const disconnectWallet = useCallback(() => {
    setWalletConnected(false);
  }, []);

  const role: UserRole = user?.role ?? 'CLIENT';

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      role,
      login,
      register,
      logout,
      walletConnected,
      connectWallet,
      disconnectWallet,
      canAccess: (path: string) => !!user && canAccessPath(user.role, path),
      hasPermission: (permission: Permission) => !!user && hasPermission(user.role, permission),
    }),
    [user, isLoading, role, login, register, logout, walletConnected, connectWallet, disconnectWallet]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
