"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  avatar: string; // emoji or icon id e.g. "🍓"
  healthGoals: string[];
  allergens: string[];
  birthday?: string;
  berryPoints: number;
  welcomeCoupon?: string;
  joinedAt: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (email: string, name?: string) => Promise<boolean>;
  register: (data: Omit<UserProfile, "berryPoints" | "joinedAt" | "welcomeCoupon">) => Promise<UserProfile>;
  logout: () => void;
  updatePreferences: (healthGoals: string[], allergens: string[]) => void;
}

const STORAGE_KEY = "nibbly_member_profile";

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  login: async () => false,
  register: async () => ({} as UserProfile),
  logout: () => {},
  updatePreferences: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // LocalStorage unavailable
    }
    setMounted(true);
  }, []);

  const saveUser = (newUser: UserProfile | null) => {
    setUser(newUser);
    try {
      if (newUser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // LocalStorage error
    }
  };

  const login = async (email: string, name?: string): Promise<boolean> => {
    // Check if we have an existing profile or create a default session
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: UserProfile = JSON.parse(stored);
        if (parsed.email.toLowerCase() === email.toLowerCase()) {
          setUser(parsed);
          return true;
        }
      }
    } catch {
      // Fall through
    }

    // Default member login demo
    const defaultUser: UserProfile = {
      name: name || email.split("@")[0] || "สมาชิก NIBBLY",
      email,
      avatar: "🍓",
      healthGoals: ["weight-control", "gut-health"],
      allergens: [],
      berryPoints: 150,
      welcomeCoupon: "NIBBLYWELCOME15",
      joinedAt: new Date().toLocaleDateString("th-TH"),
    };
    saveUser(defaultUser);
    return true;
  };

  const register = async (
    data: Omit<UserProfile, "berryPoints" | "joinedAt" | "welcomeCoupon">
  ): Promise<UserProfile> => {
    const newUser: UserProfile = {
      ...data,
      berryPoints: 100, // 100 welcome berry points
      welcomeCoupon: "NIBBLYWELCOME15",
      joinedAt: new Date().toLocaleDateString("th-TH"),
    };
    saveUser(newUser);
    return newUser;
  };

  const logout = () => {
    saveUser(null);
  };

  const updatePreferences = (healthGoals: string[], allergens: string[]) => {
    if (!user) return;
    const updated = { ...user, healthGoals, allergens };
    saveUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: mounted && !!user,
        login,
        register,
        logout,
        updatePreferences,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
