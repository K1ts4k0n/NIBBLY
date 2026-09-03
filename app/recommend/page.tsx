"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Compass, LayoutGrid, Users, ArrowRight, CheckCircle2, ShieldCheck, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RecommendationHero } from "@/components/recommend/recommendation-hero";
import { HealthQuiz } from "@/components/recommend/health-quiz";
import { HealthMatrix } from "@/components/recommend/health-matrix";
import { LIFESTYLES, HEALTH_GOALS } from "@/data/health-recommendations";
import { products } from "@/data/products";
import { useLanguage } from "@/components/providers/language-provider";
import { useAuth } from "@/components/providers/auth-provider";

export default function RecommendPage() {
  const { lang } = useLanguage();
  const { isLoggedIn, user } = useAuth();
  const [activeTab, setActiveTab] = useState<"quiz" | "matrix" | "personas">("quiz");

  return (
    <main className="min-h-screen bg-[#F1E5CD] px-4 py-10 sm:px-6 lg:px-8">
      {/* Background organic glow elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 size-96 rounded-full bg-[#FFD95A]/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 size-96 rounded-full bg-[#8BC34A]/15 blur-3xl" />
        <div className="absolute bottom-10 left-1/4 size-96 rounded-full bg-[#FF718D]/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Hero Section */}
        <RecommendationHero />

        {/* Tab Navigation Pill */}
        <div className="mx-auto mt-8 max-w-xl">
          <div className="grid grid-cols-3 rounded-2xl border border-[#d8c79e] bg-[#FFF9E9]/90 p-1.5 shadow-sm backdrop-blur-sm">
            <button
              type="button"
              onClick={() => setActiveTab("quiz")}
              className={`flex items-center justify-center gap-1.5 rounded-xl py-3 text-xs font-bold transition sm:text-sm ${
                activeTab === "quiz"
                  ? "bg-[#354B2D] text-white shadow-sm"
                  : "text-[#354B2D]/70 hover:text-[#354B2D]"
              }`}
            >
              <Compass size={16} />
              <span>{lang === "th" ? "แบบทดสอบ (Quiz)" : "Smart Quiz"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("matrix")}
              className={`flex items-center justify-center gap-1.5 rounded-xl py-3 text-xs font-bold transition sm:text-sm ${
                activeTab === "matrix"
                  ? "bg-[#354B2D] text-white shadow-sm"
                  : "text-[#354B2D]/70 hover:text-[#354B2D]"
              }`}
            >
              <LayoutGrid size={16} />
              <span>{lang === "th" ? "เป้าหมายสุขภาพ" : "Health Goals"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("personas")}
              className={`flex items-center justify-center gap-1.5 rounded-xl py-3 text-xs font-bold transition sm:text-sm ${
                activeTab === "personas"
                  ? "bg-[#354B2D] text-white shadow-sm"
                  : "text-[#354B2D]/70 hover:text-[#354B2D]"
              }`}
            >
              <Users size={16} />
              <span>{lang === "th" ? "ใครเหมาะกับอะไร" : "By Persona"}</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {activeTab === "quiz" && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <HealthQuiz />
              </motion.div>
            )}

            {activeTab === "matrix" && (
              <motion.div
                key="matrix"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden rounded-[36px] border border-white/80 bg-[#FFFDF8] p-6 shadow-[0_20px_50px_rgba(82,67,22,0.08)] sm:p-10"
              >
                <div className="mb-6">
                  <h2 className="font-display text-2xl font-bold text-[#354B2D] sm:text-3xl">
                    {lang === "th"
                      ? "สำรวจขนมตามเป้าหมายสุขภาพที่คุณต้องการดูแล"
                      : "Explore Snacks by Specific Health Benefit"}
                  </h2>
                  <p className="mt-1 text-xs text-stone-500 sm:text-sm">
                    {lang === "th"
                      ? "คลิกเลือกหมวดสุขภาพด้านล่าง เพื่อดูเมนูที่ตรงกับเกณฑ์โภชนาการ และสารอาหารเด่น"
                      : "Select any health pillar below to view snacks matching criteria and key nutritional perks."}
                  </p>
                </div>
                <HealthMatrix />
              </motion.div>
            )}

            {activeTab === "personas" && (
              <motion.div
                key="personas"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="overflow-hidden rounded-[36px] border border-white/80 bg-[#FFFDF8] p-6 shadow-[0_20px_50px_rgba(82,67,22,0.08)] sm:p-10">
                  <div className="mb-8">
                    <span className="rounded-full bg-[#354B2D]/10 px-3 py-1 text-xs font-bold text-[#354B2D]">
                      {lang === "th" ? "คู่มือสรุปเร็ว" : "Quick Persona Guide"}
                    </span>
                    <h2 className="mt-2 font-display text-2xl font-bold text-[#354B2D] sm:text-3xl">
                      {lang === "th"
                        ? "สรุปชัดเจน: ใครเหมาะกับขนมอะไรที่สุด?"
                        : "Who is it for? Perfect snack match by lifestyle"}
                    </h2>
                    <p className="mt-1 text-xs text-stone-500 sm:text-sm">
                      {lang === "th"
                        ? "เลือกไลฟ์สไตล์ที่คุณเป็นเพื่อดูเหตุผลและสูตรขนมที่ออกแบบมาเพื่อคุณโดยเฉพาะ"
                        : "Find your daily vibe and get instant nutritionist-curated snack recommendations."}
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {LIFESTYLES.map((lifestyle) => {
                      const goal = HEALTH_GOALS.find((g) => g.id === lifestyle.defaultGoal);
                      const matchingProducts = products.filter(goal?.criteria || (() => false)).slice(0, 3);

                      return (
                        <div
                          key={lifestyle.id}
                          className="flex flex-col justify-between rounded-3xl border border-[#d8c79e]/60 bg-gradient-to-b from-[#FFF9E9] to-white p-6 shadow-sm transition hover:shadow-md hover:-translate-y-1"
                        >
                          <div>
                            <div className="flex items-center gap-3">
                              <span className="grid size-12 place-items-center rounded-2xl bg-white text-2xl shadow-xs">
                                {lifestyle.icon}
                              </span>
                              <div>
                                <h3 className="font-display text-lg font-bold text-[#354B2D]">
                                  {lang === "th" ? lifestyle.nameTh : lifestyle.nameEn}
                                </h3>
                                <span className="inline-block rounded-full bg-[#354B2D]/10 px-2 py-0.5 text-[10px] font-extrabold text-[#354B2D]">
                                  {goal?.icon} {lang === "th" ? goal?.titleTh : goal?.titleEn}
                                </span>
                              </div>
                            </div>

                            <p className="mt-3 text-xs leading-relaxed text-stone-600">
                              {lang === "th" ? lifestyle.descriptionTh : lifestyle.descriptionEn}
                            </p>

                            <div className="mt-4 border-t border-stone-200/80 pt-3">
                              <p className="text-[11px] font-bold text-[#8B5E3C]">
                                {lang === "th" ? "เมนูแนะนำยอดนิยม:" : "Top Recommended Treats:"}
                              </p>
                              <div className="mt-2 space-y-1.5">
                                {matchingProducts.map((p) => (
                                  <Link
                                    key={p.id}
                                    href={`/shop/${p.slug}`}
                                    className="flex items-center justify-between rounded-xl bg-white/90 px-3 py-1.5 text-xs text-[#354B2D] transition hover:bg-[#FFF2D6]"
                                  >
                                    <span className="font-semibold truncate max-w-[180px]">{p.name}</span>
                                    <span className="font-bold text-[#FF718D]">฿{p.price}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="mt-5 pt-2">
                            <button
                              onClick={() => {
                                setActiveTab("quiz");
                              }}
                              className="inline-flex w-full items-center justify-center gap-1.5 rounded-2xl bg-[#354B2D] py-2.5 text-xs font-bold text-white transition hover:bg-[#244A1A]"
                            >
                              <span>{lang === "th" ? "วิเคราะห์แบบละเอียด" : "Detailed Quiz"}</span>
                              <ArrowRight size={13} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Member Club CTA Banner */}
        <div className="mt-12 overflow-hidden rounded-[36px] bg-gradient-to-r from-[#354B2D] via-[#47653C] to-[#25391F] p-8 text-white shadow-xl sm:p-10">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold backdrop-blur-xs">
                <Sparkles size={14} className="text-[#FFD95A]" />
                <span>{lang === "th" ? "สิทธิพิเศษเมื่อสมัครสมาชิก NIBBLY" : "NIBBLY MEMBER PERKS"}</span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold sm:text-4xl">
                {lang === "th" ? "สมัครสมาชิกรับส่วนลด 15% & ขนมฟรีวันเกิด" : "Join Free for 15% Off & Free Birthday Snack"}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-white/80 sm:text-sm">
                {lang === "th"
                  ? "สมัครสมาชิกฟรีวันนี้ เพื่อบันทึกสูตรขนมที่คุณชอบ พร้อมรับโค้ดส่วนลด 15% และสิทธิ์รับขนมฟรี 1 ซองเต็มในเดือนเกิดของคุณ"
                  : "Sign up free today to save your personalized snack picks, get an instant 15% off coupon, and receive a free snack pouch on your birthday."}
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 sm:flex-row">
              {isLoggedIn ? (
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-full bg-[#FFD95A] px-6 py-3.5 text-sm font-extrabold text-[#354B2D] shadow-md transition hover:scale-105 hover:bg-[#FFE380]"
                >
                  <span>{lang === "th" ? "ดูโปรไฟล์ของคุณ" : "View Your Profile"}</span>
                  <ArrowRight size={16} />
                </Link>
              ) : (
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-full bg-[#FF718D] px-7 py-3.5 text-sm font-extrabold text-white shadow-md transition hover:scale-105 hover:bg-[#FF859F]"
                >
                  <Sparkles size={16} />
                  <span>{lang === "th" ? "สมัครสมาชิกฟรี" : "Sign Up Free"}</span>
                  <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
