"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, Gift, Sparkles, ArrowRight, Compass, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { UserProfile } from "@/components/providers/auth-provider";
import { useLanguage } from "@/components/providers/language-provider";

interface WelcomeDialogProps {
  user: UserProfile;
  onClose?: () => void;
}

export function WelcomeDialog({ user, onClose }: WelcomeDialogProps) {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);

  const couponCode = user.welcomeCoupon || "NIBBLYWELCOME15";

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden rounded-[32px] border-2 border-[#FFD95A] bg-[#FFFDF5] p-6 shadow-2xl sm:p-8"
    >
      {/* Confetti-like ambient blobs */}
      <div className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-[#FF718D]/15 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 size-40 rounded-full bg-[#B9D84A]/20 blur-2xl" />

      <div className="relative text-center">
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-gradient-to-tr from-[#FFD95A] to-[#FFE6BC] text-4xl shadow-inner">
          {user.avatar || "🍓"}
        </div>

        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#354B2D] px-3.5 py-1 text-xs font-bold tracking-wide text-white">
          <Sparkles size={13} className="text-[#FFD95A]" />
          <span>{lang === "th" ? "สมาชิกใหม่ NIBBLY" : "Welcome New Member!"}</span>
        </div>

        <h3 className="mt-3 font-display text-3xl font-bold text-[#354B2D]">
          {lang === "th" ? `ยินดีต้อนรับคุณ ${user.name}!` : `Welcome, ${user.name}!`}
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm text-stone-600">
          {lang === "th"
            ? "สมัครสมาชิกสำเร็จเรียบร้อย! คุณได้รับโค้ดส่วนลด 15% พร้อมสิทธิ์รับขนมฟรีในเดือนเกิด"
            : "Your registration is complete! Enjoy your 15% discount code plus free snacks during your birthday month."}
        </p>

        {/* Member Digital Pass */}
        <div className="mx-auto mt-6 max-w-md rounded-2xl border border-[#d8c79e] bg-gradient-to-r from-[#FFF4DC] to-[#FFE8E8] p-4 text-left shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="grid size-10 place-items-center rounded-xl bg-white text-xl shadow-xs">
                {user.avatar}
              </span>
              <div>
                <p className="text-xs font-bold text-[#354B2D]">{user.name}</p>
                <p className="text-[11px] text-stone-500">{user.email}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 rounded-md bg-[#8BC34A]/25 px-2 py-0.5 text-[11px] font-bold text-[#354B2D]">
                <Gift size={12} /> {lang === "th" ? "สิทธิ์ขนมวันเกิด" : "Birthday Snack"}
              </span>
              <p className="mt-1 text-[10px] text-stone-500">{lang === "th" ? "สมาชิก NIBBLY" : "NIBBLY Member"}</p>
            </div>
          </div>
        </div>

        {/* Discount Coupon Box */}
        <div className="mx-auto mt-5 max-w-md rounded-2xl border-2 border-dashed border-[#FF718D] bg-[#FFF0F3] p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[#FF718D]">
            {lang === "th" ? "โค้ดส่วนลดต้อนรับ 15%" : "Your 15% Welcome Coupon"}
          </p>
          <div className="mt-2 flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-2.5 shadow-xs">
            <span className="font-mono text-base font-extrabold tracking-wider text-[#354B2D]">
              {couponCode}
            </span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded-lg bg-[#FF718D] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#c65752]"
            >
              {copied ? (
                <>
                  <Check size={14} /> {lang === "th" ? "คัดลอกแล้ว!" : "Copied!"}
                </>
              ) : (
                <>
                  <Copy size={14} /> {lang === "th" ? "คัดลอกโค้ด" : "Copy"}
                </>
              )}
            </button>
          </div>
          <p className="mt-1.5 text-[11px] text-stone-500">
            {lang === "th" ? "*ใช้ได้กับขนมทุกรายการในร้าน ไม่มีขั้นต่ำ" : "*Applicable on all snacks, no minimum order."}
          </p>
        </div>

        {/* Action CTAs */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/recommend"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#354B2D] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:scale-105 hover:bg-[#244A1A]"
          >
            <Compass size={17} className="text-[#FFD95A]" />
            <span>{lang === "th" ? "ไปค้นหาขนมที่เหมาะกับคุณ" : "Find Your Matching Snacks"}</span>
            <ArrowRight size={16} />
          </Link>

          <Link
            href="/shop"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#354B2D]/30 bg-white px-6 py-3.5 text-sm font-bold text-[#354B2D] shadow-sm transition hover:bg-[#FFF9E9]"
          >
            <ShoppingBag size={17} />
            <span>{lang === "th" ? "เริ่มเลือกซื้อขนมเลย" : "Start Shopping Now"}</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
