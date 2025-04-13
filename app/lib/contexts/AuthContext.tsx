"use client";

import { createContext, useState, useEffect, useContext } from "react";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  signIn: (accessToken: string, refreshToken: string) => void;
  signOut: () => void;
  refreshAccessToken: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const res = await fetch("/api/auth/tokens", {
          method: "GET",
          credentials: "include", // ✅ crucial to send httpOnly cookies
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
      } catch (err) {
        setAccessToken(null);
        setRefreshToken(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  const signIn = async (accessToken: string, refreshToken: string) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken)
  }
  const signOut = async () => {
    await fetch("/api/auth/logout", {
      method: "DELETE",
      credentials: "include",
    });
  
    setAccessToken(null);
    setRefreshToken(null);
  };

  const refreshAccessToken = async () => {
    try {
      const res = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });
  
      if (!res.ok) {
        throw new Error("Refresh failed");
      }
  
      // Re-fetch tokens from /api/auth/tokens
      const me = await fetch("/api/auth/tokens", { credentials: "include" });
      const data = await me.json();
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
    } catch (err) {
      console.error("Token refresh error", err);
      signOut();
    }
  };

  const value: AuthContextType = {
    accessToken,
    refreshToken,
    loading,
    signIn,
    signOut,
    refreshAccessToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
