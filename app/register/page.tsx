"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, UserCheck, LogOut, Compass, ShoppingBag, ArrowRight, Gift, Tag, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth, UserProfile } from "@/components/providers/auth-provider";
import { useLanguage } from "@/components/providers/language-provider";
import { RegisterForm } from "@/components/auth/register-form";
import { LoginForm } from "@/components/auth/login-form";
import { MembershipPerks } from "@/components/auth/membership-perks";
import { WelcomeDialog } from "@/components/auth/welcome-dialog";
import { HEALTH_GOALS } from "@/data/health-recommendations";

export default function RegisterPage() {
  const { user, isLoggedIn, logout } = useAuth();
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<"register" | "login">("register");
  const [showWelcome, setShowWelcome] = useState(false);
  const [newlyRegisteredUser, setNewlyRegisteredUser] = useState<UserProfile | null>(null);

  const handleRegisterSuccess = (newUser: UserProfile) => {
    setNewlyRegisteredUser(newUser);
    setShowWelcome(true);
  };

  const handleLoginSuccess = () => {
    // Successfully logged in
  };

  return (
    <main className="min-h-screen bg-[#F1E5CD] px-4 py-10 sm:px-6 lg:px-8">
      {/* Background playful organic blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 size-96 rounded-full bg-[#FFD95A]/20 blur-3xl" />
        <div className="absolute -left-20 top-1/3 size-96 rounded-full bg-[#FF718D]/15 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 size-96 rounded-full bg-[#B9D84A]/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c79e] bg-[#FFF9E9]/90 px-4 py-1.5 text-xs font-bold text-[#354B2D] shadow-xs backdrop-blur-sm">
            <Sparkles size={14} className="text-[#FF718D]" />
            <span>{lang === "th" ? "NIBBLY MEMBER CLUB" : "NIBBLY MEMBER CLUB"}</span>
          </div>

          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#354B2D] sm:text-5xl">
            {lang === "th" ? "ร่วมเป็นครอบครัว NIBBLY" : "Join the Happy Snack Club"}
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#8B5E3C] sm:text-base">
            {lang === "th"
              ? "สมัครสมาชิกฟรีวันนี้ รับสิทธิ์ส่วนลด 15% ทันที พร้อมขนมฟรีในเดือนเกิด และระบบแนะนำขนมสุขภาพส่วนตัว"
              : "Sign up free today for 15% off your first order, free birthday snacks, and personalized snack recommendations."}
          </p>
        </div>

        {/* If user is logged in, display Member Dashboard */}
        {isLoggedIn && user && !showWelcome ? (
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="overflow-hidden rounded-[36px] border border-white/80 bg-[#FFFDF8] p-6 shadow-[0_20px_50px_rgba(82,67,22,0.1)] sm:p-8">
              <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:gap-5">
                <div className="grid size-20 place-items-center rounded-3xl bg-gradient-to-tr from-[#FFD95A] to-[#FFE6BC] text-4xl shadow-sm">
                  {user.avatar || "🍓"}
                </div>
                <div className="mt-4 flex-1 sm:mt-0">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#354B2D]/10 px-3 py-0.5 text-xs font-bold text-[#354B2D]">
                    <UserCheck size={14} />
                    <span>{lang === "th" ? "สมาชิก NIBBLY" : "NIBBLY Member"}</span>
                  </div>
                  <h2 className="mt-1 font-display text-2xl font-bold text-[#354B2D]">
                    {user.name}
                  </h2>
                  <p className="text-xs text-stone-500">{user.email}</p>
                </div>

                {/* Primary Logout Button */}
                <button
                  onClick={logout}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-700 shadow-2xs transition hover:bg-red-600 hover:text-white sm:mt-0"
                >
                  <LogOut size={15} />
                  <span>{lang === "th" ? "ออกจากระบบ" : "Log out"}</span>
                </button>
              </div>

              {/* Member Benefits 2 Core Items Grid */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#FF718D]/30 bg-[#FFF0F3] p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#FF718D]">
                    <Tag size={16} />
                    <span>{lang === "th" ? "โค้ดส่วนลดแรกเข้า 15%" : "15% Welcome Coupon"}</span>
                  </div>
                  <p className="mt-2 font-mono text-lg font-bold text-[#354B2D]">
                    {user.welcomeCoupon || "NIBBLYWELCOME15"}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-1">
                    {lang === "th" ? "ใช้ลด 15% ทุกออเดอร์ ไม่มีขั้นต่ำ" : "15% off any snack item"}
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-300/50 bg-[#FFF9E9] p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#8B5E3C]">
                    <Gift size={16} />
                    <span>{lang === "th" ? "สิทธิ์ขนมฟรีวันเกิด 🎂" : "Free Birthday Snack"}</span>
                  </div>
                  <p className="mt-2 text-sm font-bold text-[#354B2D]">
                    {user.birthday ? (
                      lang === "th" ? `วันเกิด: ${user.birthday}` : `Birthday: ${user.birthday}`
                    ) : (
                      lang === "th" ? "รับฟรีในเดือนเกิดของคุณ" : "Available in your birth month"
                    )}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-1">
                    {lang === "th" ? "รับขนม 1 ซองส่งตรงถึงบ้าน" : "1 full snack pouch sent to you"}
                  </p>
                </div>
              </div>

              {/* User Health Goals */}
              <div className="mt-6 rounded-2xl border border-stone-200/80 bg-stone-50/70 p-4">
                <p className="text-xs font-bold text-stone-700">
                  {lang === "th" ? "เป้าหมายสุขภาพที่คุณบันทึกไว้:" : "Your Selected Health Goals:"}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {user.healthGoals?.length > 0 ? (
                    user.healthGoals.map((gId) => {
                      const goal = HEALTH_GOALS.find((g) => g.id === gId);
                      return (
                        <span
                          key={gId}
                          className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#354B2D] shadow-2xs"
                        >
                          <span>{goal?.icon || "🌱"}</span>
                          <span>{lang === "th" ? goal?.titleTh : goal?.titleEn}</span>
                        </span>
                      );
                    })
                  ) : (
                    <span className="text-xs text-stone-500">
                      {lang === "th" ? "ยังไม่ได้ระบุเป้าหมาย" : "No goals specified"}
                    </span>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/recommend"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#354B2D] py-3.5 text-sm font-bold text-white transition hover:bg-[#244A1A]"
                >
                  <Compass size={16} className="text-[#FFD95A]" />
                  <span>{lang === "th" ? "เมนูแนะนำขนมตามสุขภาพคุณ" : "View Snack Recommendations"}</span>
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-stone-300 bg-white py-3.5 text-sm font-bold text-[#354B2D] transition hover:bg-stone-50"
                >
                  <ShoppingBag size={16} />
                  <span>{lang === "th" ? "ไปเลือกช้อปขนม" : "Browse Shop"}</span>
                </Link>
              </div>
            </div>
          </div>
        ) : showWelcome && (newlyRegisteredUser || user) ? (
          <div className="mx-auto mt-10 max-w-xl">
            <WelcomeDialog
              user={newlyRegisteredUser || user!}
              onClose={() => setShowWelcome(false)}
            />
          </div>
        ) : (
          /* Sign Up / Sign In Form Grid */
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            {/* Left Column: Form Card */}
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-[36px] border border-white/80 bg-[#FFFDF8] p-6 shadow-[0_20px_50px_rgba(82,67,22,0.08)] sm:p-8">
                {/* Tab Switcher */}
                <div className="grid grid-cols-2 rounded-2xl bg-[#F4E9D0] p-1.5 text-xs font-bold text-[#354B2D]">
                  <button
                    type="button"
                    onClick={() => setActiveTab("register")}
                    className={`rounded-xl py-3 transition ${
                      activeTab === "register"
                        ? "bg-white text-[#354B2D] shadow-sm"
                        : "text-[#354B2D]/70 hover:text-[#354B2D]"
                    }`}
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      <Sparkles size={14} className="text-[#FF718D]" />
                      <span>{lang === "th" ? "สมัครสมาชิกใหม่" : "Sign Up"}</span>
                      <span className="hidden rounded-full bg-[#FF718D] px-2 py-0.5 text-[9px] font-extrabold text-white sm:inline">
                        -15%
                      </span>
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("login")}
                    className={`rounded-xl py-3 transition ${
                      activeTab === "login"
                        ? "bg-white text-[#354B2D] shadow-sm"
                        : "text-[#354B2D]/70 hover:text-[#354B2D]"
                    }`}
                  >
                    <span>{lang === "th" ? "เข้าสู่ระบบสมาชิก" : "Sign In"}</span>
                  </button>
                </div>

                <div className="mt-6">
                  <AnimatePresence mode="wait">
                    {activeTab === "register" ? (
                      <motion.div
                        key="register"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <RegisterForm
                          onSuccess={handleRegisterSuccess}
                          onSwitchToLogin={() => setActiveTab("login")}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="login"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <LoginForm
                          onSuccess={handleLoginSuccess}
                          onSwitchToRegister={() => setActiveTab("register")}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Right Column: Perks and Brand Showcase */}
            <div className="space-y-6 lg:col-span-5">
              <MembershipPerks />

              {/* Quick teaser to snack recommendation */}
              <div className="rounded-[32px] border border-white/60 bg-gradient-to-br from-[#EBF8E3] to-[#D5F0C2] p-6 text-[#354B2D] shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-2xl bg-white text-2xl shadow-xs">
                    🥗
                  </span>
                  <div>
                    <h4 className="font-display text-lg font-bold">
                      {lang === "th" ? "ยังไม่แน่ใจว่าเหมาะกับขนมอะไร?" : "Not sure which snack suits you?"}
                    </h4>
                    <p className="text-xs text-[#354B2D]/80">
                      {lang === "th"
                        ? "ทำแบบทดสอบสุขภาพ 1 นาที เพื่อรับเมนูแนะนำที่เหมาะกับคุณ"
                        : "Take our 1-min quiz for custom nutritionist snack recommendations."}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    href="/recommend"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#354B2D] px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-[#244A1A]"
                  >
                    <span>{lang === "th" ? "ไปลองทำแบบทดสอบสุขภาพ" : "Try Snack Matcher Quiz"}</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
