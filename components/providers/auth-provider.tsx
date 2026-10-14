"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  avatar: string; // emoji e.g. "🍓" or "👑"
  role?: "admin" | "member";
  healthGoals: string[];
  allergens: string[];
  birthday?: string;
  berryPoints: number;
  welcomeCoupon?: string;
  joinedAt: string;
}

export const ADMIN_EMAIL = "atetfitqlpseo123@gmail.com";
export const ADMIN_PASSWORD = "admin123";

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (email: string, name?: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  register: (data: Omit<UserProfile, "berryPoints" | "joinedAt" | "welcomeCoupon">) => Promise<UserProfile>;
  logout: () => void;
  updatePreferences: (healthGoals: string[], allergens: string[]) => void;
}

const STORAGE_KEY = "nibbly_member_profile";

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  isAdmin: false,
  login: async () => ({ success: false }),
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

  const isAdmin = !!user && user.email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const login = async (
    email: string,
    name?: string,
    password?: string
  ): Promise<{ success: boolean; message?: string }> => {
    const cleanEmail = email.trim().toLowerCase();

    // Check Admin credentials
    if (cleanEmail === ADMIN_EMAIL.toLowerCase()) {
      if (password && password !== ADMIN_PASSWORD) {
        return { success: false, message: "รหัสผ่านแอดมินไม่ถูกต้อง (โปรดใช้ admin123)" };
      }
      const adminUser: UserProfile = {
        name: name || "Admin NIBBLY (ผู้ดูแลระบบ)",
        email: ADMIN_EMAIL,
        role: "admin",
        avatar: "👑",
        healthGoals: ["super-energy", "all-round"],
        allergens: [],
        berryPoints: 9999,
        welcomeCoupon: "NIBBLYWELCOME15",
        joinedAt: new Date().toLocaleDateString("th-TH"),
      };
      saveUser(adminUser);
      return { success: true };
    }

    // Regular member login
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: UserProfile = JSON.parse(stored);
        if (parsed.email.toLowerCase() === cleanEmail) {
          setUser(parsed);
          return { success: true };
        }
      }
    } catch {
      // Fall through
    }

    const defaultUser: UserProfile = {
      name: name || email.split("@")[0] || "สมาชิก NIBBLY",
      email: cleanEmail,
      role: "member",
      avatar: "🍓",
      healthGoals: ["weight-control", "gut-health"],
      allergens: [],
      berryPoints: 150,
      welcomeCoupon: "NIBBLYWELCOME15",
      joinedAt: new Date().toLocaleDateString("th-TH"),
    };
    saveUser(defaultUser);
    return { success: true };
  };

  const register = async (
    data: Omit<UserProfile, "berryPoints" | "joinedAt" | "welcomeCoupon">
  ): Promise<UserProfile> => {
    const isRegAdmin = data.email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
    const newUser: UserProfile = {
      ...data,
      role: isRegAdmin ? "admin" : "member",
      avatar: isRegAdmin ? "👑" : data.avatar || "🍓",
      berryPoints: isRegAdmin ? 9999 : 100,
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
        isAdmin,
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
