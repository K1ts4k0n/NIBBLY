"use client";

import { motion } from "framer-motion";
import { Gift, Tag, Users, Sparkles, Heart } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";

export function MembershipPerks() {
  const { lang } = useLanguage();

  const perks = [
    {
      icon: <Tag className="text-[#FF718D]" size={28} />,
      badge: lang === "th" ? "ลดทันที 15%" : "Instant 15% Off",
      badgeColor: "bg-[#FFE0E8] text-[#FF718D]",
      title: lang === "th" ? "ส่วนลด 15% เมื่อสมัครสมาชิก" : "15% Off Your First Order",
      desc:
        lang === "th"
          ? "รับโค้ดส่วนลด NIBBLYWELCOME15 ทันทีหลังสมัครสมาชิก ใช้ได้กับขนมทุกรายการ ไม่มีขั้นต่ำ"
          : "Receive code NIBBLYWELCOME15 right after signing up. Use on any snack with no minimum purchase.",
    },
    {
      icon: <Gift className="text-[#EBAF32]" size={28} />,
      badge: lang === "th" ? "ของขวัญฟรี" : "Free Birthday Gift",
      badgeColor: "bg-[#FFF2B4] text-[#8B5E3C]",
      title: lang === "th" ? "ขนมฟรีในเดือนเกิดของคุณ 🎂" : "Free Birthday Snack Box",
      desc:
        lang === "th"
          ? "รับฟรี ขนม NIBBLY 1 ซองเต็มในเดือนเกิดของคุณ ส่งความสุขให้คุณถึงบ้าน"
          : "Get 1 full pouch of delicious NIBBLY treats delivered completely free during your birthday month.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-white/60 bg-gradient-to-br from-[#FFF9E9] via-[#FFF3D6] to-[#FFE6BC] p-6 shadow-[0_16px_40px_rgba(82,67,22,0.08)] sm:p-8">
        <div className="flex items-center gap-3">
          <div className="grid size-12 place-items-center rounded-2xl bg-[#354B2D] text-[#FFD95A] shadow-md">
            <Sparkles size={24} />
          </div>
          <div>
            <span className="rounded-full bg-[#354B2D]/10 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-[#354B2D]">
              NIBBLY Member
            </span>
            <h3 className="font-display text-2xl text-[#354B2D]">
              {lang === "th" ? "สิทธิพิเศษเมื่อสมัครสมาชิก" : "Membership Benefits"}
            </h3>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-[#8B5E3C]">
          {lang === "th"
            ? "ร่วมเป็นครอบครัว NIBBLY วันนี้ สมัครฟรีใน 1 นาที รับสิทธิประโยชน์ 2 ต่อทันที"
            : "Join the NIBBLY family today. Free 1-minute sign up with 2 core member benefits."}
        </p>

        {/* 2 Focused Perks Cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-1">
          {perks.map((perk, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-3 rounded-2xl border border-white/90 bg-white/85 p-5 shadow-xs backdrop-blur-sm transition hover:bg-white sm:flex-row sm:items-start"
            >
              <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#FFF9EA] shadow-2xs">
                {perk.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-display text-lg font-bold text-[#354B2D]">
                    {perk.title}
                  </h4>
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-extrabold ${perk.badgeColor}`}>
                    {perk.badge}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-stone-600 sm:text-sm">
                  {perk.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Member community badge */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#d8c79e]/60 pt-4 text-xs text-[#354B2D]/80">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <span className="grid size-7 place-items-center rounded-full border-2 border-white bg-[#FFD95A] text-xs">🍓</span>
              <span className="grid size-7 place-items-center rounded-full border-2 border-white bg-[#B9D84A] text-xs">🥑</span>
              <span className="grid size-7 place-items-center rounded-full border-2 border-white bg-[#6EC8FF] text-xs">🥜</span>
              <span className="grid size-7 place-items-center rounded-full border-2 border-white bg-[#A678FF] text-xs">🍪</span>
            </div>
            <span className="font-semibold text-[#354B2D]">
              {lang === "th" ? "สมาชิกครอบครัวขนมสุขภาพ NIBBLY" : "Happy NIBBLY Members"}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 font-bold text-[#354B2D]">
            <Heart size={14} className="text-[#FF718D]" /> {lang === "th" ? "สมัครฟรี ไม่มีค่าใช้จ่าย" : "100% Free Signup"}
          </span>
        </div>
      </div>
    </div>
  );
}
