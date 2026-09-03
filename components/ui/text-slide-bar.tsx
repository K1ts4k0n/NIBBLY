"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Heart, Star, Tag, Gift, Truck, ShieldCheck, Flame, Leaf } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";

interface MarqueeItem {
  icon?: string | React.ReactNode;
  text: string;
  badge?: string;
  badgeColor?: string;
  link?: string;
}

/**
 * Top slim announcement bar ticker
 */
export function AnnouncementMarquee() {
  const { lang } = useLanguage();

  const announcements = [
    {
      emoji: "🎉",
      text: lang === "th" ? "สมัครสมาชิกใหม่ รับส่วนลด 15% ทันที (โค้ด NIBBLYWELCOME15)" : "Sign up & get 15% off with code NIBBLYWELCOME15",
      link: "/register",
    },
    {
      emoji: "🚚",
      text: lang === "th" ? "ส่งฟรีทั่วประเทศ เมื่อช้อปครบ ฿500" : "Free Nationwide Delivery on orders over ฿500",
      link: "/shop",
    },
    {
      emoji: "🎂",
      text: lang === "th" ? "ของขวัญวันเกิด: รับฟรีขนม NIBBLY 1 ซองเต็มในเดือนเกิด" : "Birthday Perk: Free snack pouch on your birthday month",
      link: "/register",
    },
    {
      emoji: "🥗",
      text: lang === "th" ? "ไม่แน่ใจว่ากินอะไรดี? ลองใช้ระบบแนะนำขนมสุขภาพ Snack Matcher" : "Find your ideal health snacks with our 1-min Snack Matcher",
      link: "/recommend",
    },
    {
      emoji: "✨",
      text: lang === "th" ? "วัตถุดิบธรรมชาติ 100% ไม่ใส่น้ำตาลทรายขาว ไม่ทอด" : "100% Wholesome ingredients, zero refined sugar, baked not fried",
      link: "/shop",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#354B2D] via-[#45633A] to-[#25391F] py-2 text-white shadow-xs">
      <div className="flex animate-marquee items-center gap-10 whitespace-nowrap text-xs font-semibold">
        {[...announcements, ...announcements].map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-sm">{item.emoji}</span>
            {item.link ? (
              <Link href={item.link} className="transition hover:text-[#FFD95A] hover:underline">
                {item.text}
              </Link>
            ) : (
              <span>{item.text}</span>
            )}
            <span className="text-[#FFD95A]/60">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Large, high-energy vibrant Text Slide Bar ribbon for homepage
 */
export function RibbonMarquee() {
  const { lang } = useLanguage();

  const row1 = [
    { emoji: "🍓", text: "SNACK HAPPY", badge: "#100% REAL FRUIT", bg: "bg-[#FF718D] text-white" },
    { emoji: "🥣", text: "CRUNCHY GRANOLA", badge: "#NO REFINED SUGAR", bg: "bg-[#FFD95A] text-[#354B2D]" },
    { emoji: "💪", text: "HIGH PROTEIN", badge: "#CLEAN ENERGY", bg: "bg-[#6EC8FF] text-[#1E3A8A]" },
    { emoji: "🥑", text: "GUT HEALTH & FIBRE", badge: "#HAPPY DIGESTION", bg: "bg-[#8BC34A] text-[#1C3B14]" },
    { emoji: "✨", text: "ZERO BORING BITES", badge: "#BIG FLAVOUR", bg: "bg-[#A678FF] text-white" },
    { emoji: "🥜", text: "OVEN ROASTED NUTS", badge: "#HEART HEALTHY", bg: "bg-[#FF9F43] text-white" },
    { emoji: "🌱", text: "100% PLANT BASED", badge: "#VEGAN APPROVED", bg: "bg-[#62BFA1] text-white" },
  ];

  const row2 = [
    { emoji: "🏷️", text: lang === "th" ? "ลด 15% เมื่อสมัครสมาชิก" : "15% OFF FOR MEMBERS", badge: "NIBBLYWELCOME15", bg: "bg-[#FFF9EA] text-[#354B2D] border border-[#d8c79e]" },
    { emoji: "🎂", text: lang === "th" ? "ขนมฟรีในเดือนเกิด" : "FREE BIRTHDAY SNACK", badge: "SPECIAL GIFT", bg: "bg-[#FFE0E8] text-[#FF718D] border border-[#FFCCD8]" },
    { emoji: "🚚", text: lang === "th" ? "ส่งฟรีเมื่อสั่งครบ ฿500" : "FREE SHIPPING OVER ฿500", badge: "FAST EXPRESS", bg: "bg-[#EBF8FF] text-[#2B6CB0] border border-[#BEE3F8]" },
    { emoji: "🎯", text: lang === "th" ? "ระบบแนะนำขนมตามสุขภาพ" : "SMART SNACK MATCHER", badge: "1-MIN QUIZ", bg: "bg-[#F0FFF4] text-[#2F855A] border border-[#C6F6D5]" },
    { emoji: "🌈", text: lang === "th" ? "20 รสชาติสดใสไม่มีเบื่อ" : "20 BRIGHT FLAVOURS", badge: "COLOURFUL JOY", bg: "bg-[#FAF5FF] text-[#6B46C1] border border-[#E9D8FD]" },
  ];

  return (
    <section className="relative my-8 overflow-hidden py-6">
      {/* Top lane scrolling forward */}
      <div className="relative -rotate-1 scale-105 bg-[#354B2D] py-3.5 shadow-md">
        <div className="flex animate-marquee items-center gap-6 whitespace-nowrap">
          {[...row1, ...row1, ...row1].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-2xl">{item.emoji}</span>
              <span className="font-display text-lg font-bold tracking-wider text-white sm:text-xl">
                {item.text}
              </span>
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider ${item.bg}`}>
                {item.badge}
              </span>
              <span className="text-xl text-[#FFD95A]">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom lane scrolling in reverse */}
      <div className="relative mt-2 rotate-1 scale-105 bg-gradient-to-r from-[#FFD95A] via-[#FFE380] to-[#FFC53D] py-3.5 shadow-md">
        <div className="flex animate-marquee-reverse items-center gap-6 whitespace-nowrap">
          {[...row2, ...row2, ...row2].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-2xl">{item.emoji}</span>
              <span className="font-display text-lg font-bold tracking-wider text-[#354B2D] sm:text-xl">
                {item.text}
              </span>
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider ${item.bg}`}>
                {item.badge}
              </span>
              <span className="text-xl text-[#FF718D]">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Floating Ingredients Marquee
 */
export function IngredientSlideBar() {
  const ingredients = [
    { emoji: "🍓", name: "Real Strawberries", note: "Freeze-dried fresh" },
    { emoji: "🫐", name: "Wild Blueberries", note: "Antioxidant powerhouse" },
    { emoji: "🌾", name: "Rolled Oats", note: "High fibre goodness" },
    { emoji: "🥜", name: "Golden Almonds", note: "Slow dry-roasted" },
    { emoji: "🍯", name: "Wildflower Honey", note: "Natural sweetness" },
    { emoji: "🥥", name: "Toasted Coconut", note: "Tropical crunch" },
    { emoji: "🍌", name: "Sun-Dried Banana", note: "Potassium rich" },
    { emoji: "🍫", name: "Pure Cocoa", note: "Rich dark cacao" },
    { emoji: "🌿", name: "Matcha Powder", note: "Calm sustained energy" },
    { emoji: "🌱", name: "Chia & Flaxseeds", note: "Omega-3 plant fuel" },
  ];

  return (
    <div className="overflow-hidden py-4">
      <div className="flex animate-marquee-slow items-center gap-4 whitespace-nowrap">
        {[...ingredients, ...ingredients].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 rounded-full border border-white/80 bg-white/80 px-4 py-2 shadow-2xs backdrop-blur-xs transition hover:scale-105 hover:bg-white"
          >
            <span className="text-xl">{item.emoji}</span>
            <span className="text-xs font-bold text-[#354B2D]">{item.name}</span>
            <span className="text-[10px] text-stone-500">• {item.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
