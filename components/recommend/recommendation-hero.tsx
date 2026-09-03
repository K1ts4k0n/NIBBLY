"use client";

import { Sparkles, ShieldCheck, Award, HeartHandshake } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";

export function RecommendationHero() {
  const { lang } = useLanguage();

  return (
    <div className="relative text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c79e] bg-[#FFF9E9]/90 px-4 py-1.5 text-xs font-bold text-[#354B2D] shadow-xs backdrop-blur-sm">
        <Sparkles size={14} className="text-[#FF718D]" />
        <span>{lang === "th" ? "NIBBLY HEALTHY SNACK MATCHER" : "NIBBLY HEALTHY SNACK MATCHER"}</span>
      </div>

      <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#354B2D] sm:text-5xl">
        {lang === "th" ? "เมนูแนะนำตามสุขภาพ: คุณเหมาะกับขนมอะไร?" : "Personalized Snack Matcher: What Should You Eat?"}
      </h1>

      <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#8B5E3C] sm:text-base">
        {lang === "th"
          ? "ไม่ว่าคุณจะอยากคุมน้ำหนัก เพิ่มโปรตีนดูแลกล้ามเนื้อ ปรับสมดุลลำไส้ หรือบำรุงสมองยามบ่าย ตอบคำถามสั้นๆ เพื่อให้เราคัดสรรขนมที่ตอบโจทย์ร่างกายของคุณที่สุด"
          : "Whether you want to manage weight, boost workout protein, nourish gut health, or sharpen focus, discover exactly which NIBBLY snack fuels your body best."}
      </p>

      {/* Highlights Bar */}
      <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#354B2D]/80">
        <div className="flex items-center gap-1.5 rounded-full bg-white/70 px-3.5 py-1.5 shadow-2xs backdrop-blur-xs">
          <ShieldCheck size={16} className="text-emerald-600" />
          <span>{lang === "th" ? "วิเคราะห์ตามหลักโภชนาการ" : "Nutrition-backed recommendations"}</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-white/70 px-3.5 py-1.5 shadow-2xs backdrop-blur-xs">
          <Award size={16} className="text-amber-500" />
          <span>{lang === "th" ? "วัตถุดิบธรรมชาติ 100%" : "100% Wholesome ingredients"}</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-white/70 px-3.5 py-1.5 shadow-2xs backdrop-blur-xs">
          <HeartHandshake size={16} className="text-pink-500" />
          <span>{lang === "th" ? "ตรงความต้องการเฉพาะบุคคล" : "Tailored to your body goals"}</span>
        </div>
      </div>
    </div>
  );
}
