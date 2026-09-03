"use client";

import { useState } from "react";
import { Eye, EyeOff, Sparkles, Check, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth, UserProfile } from "@/components/providers/auth-provider";
import { useLanguage } from "@/components/providers/language-provider";
import { HEALTH_GOALS } from "@/data/health-recommendations";

interface RegisterFormProps {
  onSuccess: (user: UserProfile) => void;
  onSwitchToLogin: () => void;
}

const AVATARS = [
  { emoji: "🍓", label: "Berry" },
  { emoji: "🥑", label: "Avo" },
  { emoji: "🥜", label: "Nutty" },
  { emoji: "🍌", label: "Banana" },
  { emoji: "🍫", label: "Cocoa" },
  { emoji: "🥥", label: "Coconut" },
  { emoji: "🍯", label: "Honey" },
  { emoji: "🌿", label: "Matcha" },
];

const ALLERGEN_OPTIONS = [
  { id: "none", labelTh: "ไม่มีข้อจำกัด", labelEn: "None" },
  { id: "nuts", labelTh: "แพ้ถั่ว (Tree Nuts)", labelEn: "Tree Nuts" },
  { id: "peanuts", labelTh: "แพ้ลิสง (Peanuts)", labelEn: "Peanuts" },
  { id: "dairy", labelTh: "แพ้นมวัว (Dairy/Milk)", labelEn: "Dairy/Milk" },
  { id: "gluten", labelTh: "แพ้กลูเตน (Gluten)", labelEn: "Gluten" },
];

export function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const { register } = useAuth();
  const { lang } = useLanguage();

  const [avatar, setAvatar] = useState("🍓");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [birthday, setBirthday] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>(["weight-control"]);
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>(["none"]);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return { score: 0, textTh: "", textEn: "", color: "bg-stone-200" };
    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password) || /[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 1) return { score: 1, textTh: "ง่ายเกินไป", textEn: "Weak", color: "bg-red-400" };
    if (score === 2) return { score: 2, textTh: "ปานกลาง", textEn: "Medium", color: "bg-amber-400" };
    return { score: 3, textTh: "ปลอดภัยดีเยี่ยม", textEn: "Strong", color: "bg-emerald-500" };
  };

  const strength = getPasswordStrength();

  const toggleGoal = (goalId: string) => {
    if (selectedGoals.includes(goalId)) {
      if (selectedGoals.length > 1) {
        setSelectedGoals(selectedGoals.filter((g) => g !== goalId));
      }
    } else {
      setSelectedGoals([...selectedGoals, goalId]);
    }
  };

  const toggleAllergen = (allergenId: string) => {
    if (allergenId === "none") {
      setSelectedAllergens(["none"]);
      return;
    }
    const filtered = selectedAllergens.filter((a) => a !== "none");
    if (filtered.includes(allergenId)) {
      const next = filtered.filter((a) => a !== allergenId);
      setSelectedAllergens(next.length === 0 ? ["none"] : next);
    } else {
      setSelectedAllergens([...filtered, allergenId]);
    }
  };

  const handleQuickDemo = () => {
    setName("น้องแฮปปี้ สแน็กเกอร์");
    setEmail("happy.snacker@nibbly.com");
    setPhone("089-123-4567");
    setPassword("NibblyTreats2026!");
    setBirthday("1998-05-18");
    setSelectedGoals(["weight-control", "skin-glow"]);
    setAvatar("🍓");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError(lang === "th" ? "กรุณากรอกชื่อ-นามสกุล" : "Please enter your name");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError(lang === "th" ? "กรุณากรอกอีเมลที่ถูกต้อง" : "Please enter a valid email");
      return;
    }
    if (password.length < 6) {
      setError(lang === "th" ? "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" : "Password must be at least 6 characters");
      return;
    }
    if (!agreeTerms) {
      setError(lang === "th" ? "กรุณายอมรับเงื่อนไขการให้บริการ" : "Please agree to the terms");
      return;
    }

    setIsLoading(true);
    try {
      const user = await register({
        name,
        email,
        phone,
        avatar,
        healthGoals: selectedGoals,
        allergens: selectedAllergens,
        birthday,
      });
      onSuccess(user);
    } catch {
      setError(lang === "th" ? "เกิดข้อผิดพลาดในการสมัคร กรุณาลองใหม่อีกครั้ง" : "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Quick Demo Fill Pill */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#8B5E3C]">
          {lang === "th" ? "สร้างบัญชีใหม่เพื่อรับสิทธิพิเศษ" : "Create your account for member perks"}
        </span>
        <button
          type="button"
          onClick={handleQuickDemo}
          className="inline-flex items-center gap-1 rounded-full border border-[#d8c79e] bg-[#FFF9E9] px-2.5 py-1 text-[11px] font-bold text-[#354B2D] transition hover:bg-[#FFD95A]"
        >
          <Sparkles size={11} className="text-[#FF718D]" />
          {lang === "th" ? "กรอกข้อมูลทดสอบอัตโนมัติ" : "Fill Demo Data"}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Avatar Picker */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#354B2D]">
          {lang === "th" ? "1. เลือกไอคอนประจำตัวแสนน่ารัก" : "1. Choose Your Member Avatar"}
        </label>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {AVATARS.map((item) => (
            <button
              key={item.emoji}
              type="button"
              onClick={() => setAvatar(item.emoji)}
              className={`grid size-11 place-items-center rounded-2xl text-xl transition ${
                avatar === item.emoji
                  ? "scale-110 border-2 border-[#354B2D] bg-[#FFD95A] shadow-md"
                  : "border border-stone-200 bg-white hover:bg-stone-50"
              }`}
            >
              {item.emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Basic Info */}
      <div className="space-y-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#354B2D]">
          {lang === "th" ? "2. ข้อมูลส่วนตัวของคุณ" : "2. Your Personal Details"}
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-stone-600">
              {lang === "th" ? "ชื่อ - นามสกุล *" : "Full Name *"}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={lang === "th" ? "เช่น นภัสสร สุขภาพดี" : "e.g. Happy Snacker"}
              className="mt-1 w-full rounded-2xl border border-[#d8c79e] bg-white px-4 py-3 text-sm text-[#354B2D] shadow-xs outline-none transition focus:border-[#354B2D] focus:ring-2 focus:ring-[#354B2D]/10"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-600">
              {lang === "th" ? "เบอร์โทรศัพท์ (สำหรับแจ้งเตือนโปร)" : "Phone Number"}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08X-XXX-XXXX"
              className="mt-1 w-full rounded-2xl border border-[#d8c79e] bg-white px-4 py-3 text-sm text-[#354B2D] shadow-xs outline-none transition focus:border-[#354B2D] focus:ring-2 focus:ring-[#354B2D]/10"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-stone-600">
            {lang === "th" ? "อีเมล (ใช้เข้าสู่ระบบและรับโค้ด) *" : "Email Address *"}
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

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-stone-600">
                {lang === "th" ? "รหัสผ่าน *" : "Password *"}
              </label>
              {password && (
                <span className="text-[11px] font-bold text-stone-500">
                  {lang === "th" ? strength.textTh : strength.textEn}
                </span>
              )}
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
            {/* Strength Bar */}
            {password && (
              <div className="mt-1.5 flex h-1.5 gap-1 overflow-hidden rounded-full bg-stone-100">
                <div className={`h-full flex-1 transition-all ${strength.score >= 1 ? strength.color : "bg-stone-200"}`} />
                <div className={`h-full flex-1 transition-all ${strength.score >= 2 ? strength.color : "bg-stone-200"}`} />
                <div className={`h-full flex-1 transition-all ${strength.score >= 3 ? strength.color : "bg-stone-200"}`} />
              </div>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-600">
              {lang === "th" ? "วันเดือนปีเกิด (รับของขวัญวันเกิดฟรี! 🎂)" : "Birthday (Free snack gift!)"}
            </label>
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="mt-1 w-full rounded-2xl border border-[#d8c79e] bg-white px-4 py-3 text-sm text-[#354B2D] shadow-xs outline-none transition focus:border-[#354B2D] focus:ring-2 focus:ring-[#354B2D]/10"
            />
          </div>
        </div>
      </div>

      {/* Health Preferences Customization */}
      <div className="rounded-3xl border border-[#d8c79e]/80 bg-[#FFF9ED] p-4 sm:p-5">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#354B2D]">
          {lang === "th" ? "3. เป้าหมายสุขภาพที่คุณสนใจ (เลือกได้หลายข้อ)" : "3. Your Health Goals (Multi-select)"}
        </label>
        <p className="mt-1 text-xs text-stone-500">
          {lang === "th"
            ? "เราจะคัดสรรเมนูแนะนำและสูตรใหม่ให้ตรงกับความต้องการของคุณ"
            : "We'll tailor snack recommendations and recipes specifically for your health journey."}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {HEALTH_GOALS.map((goal) => {
            const isSelected = selectedGoals.includes(goal.id);
            return (
              <button
                key={goal.id}
                type="button"
                onClick={() => toggleGoal(goal.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  isSelected
                    ? "bg-[#354B2D] text-white shadow-sm"
                    : "border border-stone-200 bg-white text-stone-700 hover:border-[#354B2D]/40"
                }`}
              >
                <span>{goal.icon}</span>
                <span>{lang === "th" ? goal.titleTh : goal.titleEn}</span>
                {isSelected && <Check size={12} className="text-[#FFD95A]" />}
              </button>
            );
          })}
        </div>

        {/* Allergen Constraints */}
        <div className="mt-4 border-t border-[#d8c79e]/60 pt-3">
          <label className="block text-xs font-bold text-stone-700">
            {lang === "th" ? "สารก่อภูมิแพ้หรือสิ่งที่คุณต้องการหลีกเลี่ยง:" : "Food allergies or ingredients to avoid:"}
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {ALLERGEN_OPTIONS.map((item) => {
              const isSelected = selectedAllergens.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleAllergen(item.id)}
                  className={`rounded-full px-3 py-1 text-[11px] font-medium transition ${
                    isSelected
                      ? "bg-[#FF718D] text-white"
                      : "bg-white text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  {lang === "th" ? item.labelTh : item.labelEn}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Terms & Privacy */}
      <div className="flex items-start gap-2.5">
        <input
          type="checkbox"
          id="terms"
          checked={agreeTerms}
          onChange={(e) => setAgreeTerms(e.target.checked)}
          className="mt-1 size-4 rounded border-stone-300 text-[#354B2D] focus:ring-[#354B2D]"
        />
        <label htmlFor="terms" className="text-xs leading-relaxed text-stone-600">
          {lang === "th" ? (
            <>
              ฉันยอมรับ <span className="font-semibold text-[#354B2D] underline">เงื่อนไขการใช้บริการ</span> และ{" "}
              <span className="font-semibold text-[#354B2D] underline">นโยบายความเป็นส่วนตัว</span> ของ NIBBLY
              พร้อมยินยอมรับข่าวสารและสิทธิพิเศษทางอีเมล
            </>
          ) : (
            <>
              I agree to the <span className="font-semibold text-[#354B2D] underline">Terms of Service</span> and{" "}
              <span className="font-semibold text-[#354B2D] underline">Privacy Policy</span> of NIBBLY and consent to
              receiving special treats via email.
            </>
          )}
        </label>
      </div>

      {/* Submit CTA */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-2xl bg-gradient-to-r from-[#354B2D] via-[#2D5A27] to-[#1E3E1A] py-4 text-base font-bold text-white shadow-lg transition hover:scale-[1.01] hover:shadow-xl disabled:opacity-50"
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            {lang === "th" ? "กำลังสร้างบัญชี..." : "Creating Account..."}
          </span>
        ) : (
          <span className="inline-flex items-center gap-2">
            <Sparkles size={18} className="text-[#FFD95A]" />
            {lang === "th"
              ? "สมัครสมาชิก & รับโค้ดลด 15% ทันที"
              : "Sign Up & Get Instant 15% Off"}
          </span>
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
          {lang === "th" ? "มีบัญชีสมาชิก NIBBLY แล้วใช่ไหม? " : "Already have an account? "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-bold text-[#FF718D] underline hover:text-[#c65752]"
          >
            {lang === "th" ? "เข้าสู่ระบบที่นี่" : "Sign in here"}
          </button>
        </p>
      </div>
    </form>
  );
}
