"use client";

import { useState } from "react";
import { Eye, EyeOff, Sparkles, AlertCircle, Check } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { useLanguage } from "@/components/providers/language-provider";

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToRegister: () => void;
}

export function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
  const { login } = useAuth();
  const { lang } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const handleQuickDemo = () => {
    setEmail("happy.snacker@nibbly.com");
    setPassword("NibblyTreats2026!");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !email.includes("@")) {
      setError(lang === "th" ? "กรุณากรอกอีเมลที่ถูกต้อง" : "Please enter a valid email");
      return;
    }
    if (!password) {
      setError(lang === "th" ? "กรุณากรอกรหัสผ่าน" : "Please enter your password");
      return;
    }

    setIsLoading(true);
    try {
      const ok = await login(email);
      if (ok) {
        onSuccess();
      } else {
        setError(lang === "th" ? "อีเมลหรือรหัสผ่านไม่ถูกต้อง" : "Invalid email or password");
      }
    } catch {
      setError(lang === "th" ? "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" : "Login error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      setError(lang === "th" ? "กรุณากรอกอีเมลเพื่อขอรับลิงก์รีเซ็ตรหัสผ่าน" : "Enter your email to receive a reset link");
      return;
    }
    setForgotSent(true);
    setTimeout(() => setForgotSent(false), 4000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#8B5E3C]">
          {lang === "th" ? "ยินดีต้อนรับกลับสู่ NIBBLY Club" : "Welcome back to NIBBLY Club"}
        </span>
        <button
          type="button"
          onClick={handleQuickDemo}
          className="inline-flex items-center gap-1 rounded-full border border-[#d8c79e] bg-[#FFF9E9] px-2.5 py-1 text-[11px] font-bold text-[#354B2D] transition hover:bg-[#FFD95A]"
        >
          <Sparkles size={11} className="text-[#FF718D]" />
          {lang === "th" ? "คลิกเดียวล็อกอินทดสอบ" : "1-Click Demo Login"}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {forgotSent && (
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-700">
          <Check size={16} className="shrink-0" />
          <span>
            {lang === "th"
              ? "ส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมลของคุณเรียบร้อยแล้ว!"
              : "Password reset link sent to your email!"}
          </span>
        </div>
      )}

      <div>
        <label className="text-xs font-semibold text-stone-600">
          {lang === "th" ? "อีเมลบัญชีสมาชิก *" : "Email Address *"}
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="youremail@example.com"
          className="mt-1 w-full rounded-2xl border border-[#d8c79e] bg-white px-4 py-3 text-sm text-[#354B2D] shadow-xs outline-none transition focus:border-[#354B2D] focus:ring-2 focus:ring-[#354B2D]/10"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-stone-600">
            {lang === "th" ? "รหัสผ่าน *" : "Password *"}
          </label>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-[11px] font-bold text-[#FF718D] hover:underline"
          >
            {lang === "th" ? "ลืมรหัสผ่าน?" : "Forgot password?"}
          </button>
        </div>
        <div className="relative mt-1">
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-2xl border border-[#d8c79e] bg-white px-4 py-3 pr-10 text-sm text-[#354B2D] shadow-xs outline-none transition focus:border-[#354B2D] focus:ring-2 focus:ring-[#354B2D]/10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-stone-400 hover:text-stone-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs text-stone-600">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="size-4 rounded border-stone-300 text-[#354B2D] focus:ring-[#354B2D]"
          />
          <span>{lang === "th" ? "จดจำการเข้าสู่ระบบ" : "Remember me"}</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-2xl bg-gradient-to-r from-[#354B2D] via-[#2D5A27] to-[#1E3E1A] py-4 text-base font-bold text-white shadow-lg transition hover:scale-[1.01] hover:shadow-xl disabled:opacity-50"
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            {lang === "th" ? "กำลังเข้าสู่ระบบ..." : "Signing in..."}
          </span>
        ) : (
          <span>{lang === "th" ? "เข้าสู่ระบบ NIBBLY Club" : "Sign In to NIBBLY Club"}</span>
        )}
      </button>

      {/* Social Logins */}
      <div className="pt-2 text-center">
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-[#FFFDF8] px-3 text-stone-400">
              {lang === "th" ? "หรือเข้าสู่ระบบด้วย" : "Or continue with"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={handleQuickDemo}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-stone-200 bg-white py-2.5 text-xs font-semibold text-stone-700 shadow-2xs hover:bg-stone-50"
          >
            <span className="text-emerald-500 font-bold">LINE</span>
          </button>
          <button
            type="button"
            onClick={handleQuickDemo}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-stone-200 bg-white py-2.5 text-xs font-semibold text-stone-700 shadow-2xs hover:bg-stone-50"
          >
            <span className="text-red-500 font-bold">Google</span>
          </button>
          <button
            type="button"
            onClick={handleQuickDemo}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-stone-200 bg-white py-2.5 text-xs font-semibold text-stone-700 shadow-2xs hover:bg-stone-50"
          >
            <span className="font-bold">Apple</span>
          </button>
        </div>

        <p className="mt-5 text-xs text-stone-600">
          {lang === "th" ? "ยังไม่มีบัญชีสมาชิกใช่ไหม? " : "Don't have an account yet? "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="font-bold text-[#FF718D] underline hover:text-[#c65752]"
          >
            {lang === "th" ? "สมัครสมาชิกที่นี่ (รับฟรีส่วนลด 15%)" : "Sign up here (15% off)"}
          </button>
        </p>
      </div>
    </form>
  );
}
