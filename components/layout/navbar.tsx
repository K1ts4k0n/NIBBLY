"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, Search, ShoppingBag, UserRound, X, Sparkles, LogOut, Compass, ChevronDown, UserCheck } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/components/providers/cart-provider";
import { useLanguage } from "@/components/providers/language-provider";
import { useAuth } from "@/components/providers/auth-provider";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { publicPath } from "@/lib/public-path";

export function Navbar() {
  const [mobile, setMobile] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { count, setOpen } = useCart();
  const { t, lang } = useLanguage();
  const { user, isLoggedIn, isAdmin, logout } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const nav = [
    { label: lang === "th" ? "หน้าแรก" : "Home", emoji: "🥣", href: "/" },
    { label: lang === "th" ? "ร้านขนม" : "Shop", emoji: "🍓", href: "/shop" },
    {
      label: lang === "th" ? "โปรโมชั่น" : "Deals",
      emoji: "🎀",
      href: "/promotions",
      badge: "HOT 🔥",
      special: true,
    },
    {
      label: lang === "th" ? "เล่นเกมลด 30%" : "Game 30% Off",
      emoji: "🎮",
      href: "/game",
      badge: "30% 🎁",
      isGame: true,
    },
    {
      label: lang === "th" ? "แนะนำขนมสุขภาพ" : "Snack Finder",
      emoji: "✨",
      href: "/recommend",
      highlight: true,
    },
    {
      label: lang === "th" ? "รับข่าวสาร" : "Newsletter",
      emoji: "💌",
      href: "/subscribe",
    },
    {
      label: lang === "th" ? "เรื่องของเรา" : "Our Story",
      emoji: "🥑",
      href: "/#about",
    },
    {
      label: lang === "th" ? "ทำไมต้อง NIBBLY" : "Why Us",
      emoji: "🌿",
      href: "/#why",
    },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[#E8DCB8] bg-[#FFF9ED]/95 shadow-xs backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-3 sm:px-5 lg:px-6">
        <Link href="/" aria-label="NIBBLY home" className="relative block h-[60px] w-[124px] shrink-0 overflow-hidden transition hover:scale-105">
          <Image
            src={`${publicPath}/nibbly-logo-crop.png`}
            alt="NIBBLY Healthy Treats"
            fill
            sizes="124px"
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav - Beautiful & Cute Horizontal Layout */}
        <nav className="hidden items-center gap-1 xl:gap-2 lg:flex">
          {nav.map((item) => {
            if (item.highlight) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-[#354B2D] via-[#436139] to-[#354B2D] px-3.5 py-1.5 text-xs font-black text-white shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md hover:from-[#FF718D] hover:to-[#A678FF]"
                >
                  <span className="text-sm transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125">{item.emoji}</span>
                  <span>{item.label}</span>
                </Link>
              );
            }

            if (item.special) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[#FFCCD8] bg-[#FFF0F4] px-3 py-1.5 text-xs font-bold text-[#D81159] shadow-2xs transition-all duration-200 hover:scale-105 hover:bg-[#FF718D] hover:text-white"
                >
                  <span className="text-sm transition-transform duration-200 group-hover:scale-125">{item.emoji}</span>
                  <span>{item.label}</span>
                  <span className="rounded-full bg-[#FF5722] px-1.5 py-0.5 text-[9px] font-black text-white shadow-xs">
                    {item.badge}
                  </span>
                </Link>
              );
            }

            if (item.isGame) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[#BCE1FF] bg-[#EBF6FF] px-3 py-1.5 text-xs font-black text-[#0066CC] shadow-2xs transition-all duration-200 hover:scale-105 hover:bg-[#2596FF] hover:text-white"
                >
                  <span className="text-sm transition-transform duration-200 group-hover:scale-125">{item.emoji}</span>
                  <span>{item.label}</span>
                  <span className="rounded-full bg-[#0066CC] group-hover:bg-[#FFD95A] group-hover:text-[#2D4125] px-1.5 py-0.5 text-[9px] font-black text-white shadow-xs">
                    {item.badge}
                  </span>
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-bold text-[#354B2D]/90 transition-all duration-200 hover:bg-white/80 hover:text-[#B24823] hover:shadow-2xs active:scale-95"
              >
                <span className="text-sm transition-transform duration-200 group-hover:scale-125">{item.emoji}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Admin badge button only visible when logged in as admin */}
          {isAdmin && (
            <Link
              href="/admin"
              className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#2D4125] px-3.5 py-1.5 text-xs font-black text-[#FFD95A] shadow-md transition-all duration-200 hover:scale-105 hover:bg-[#3D5A32]"
            >
              <span className="text-sm">👑</span>
              <span>{lang === "th" ? "ระบบหลังบ้าน" : "Admin"}</span>
            </Link>
          )}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1.5 text-[#354B2D]">
          <LanguageToggle />

          {/* User Account / Dropdown */}
          <div className="relative" ref={dropdownRef}>
            {isLoggedIn && user ? (
              <div>
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-1.5 rounded-full border border-[#d8c79e]/80 bg-white/90 px-3 py-1.5 text-xs font-bold text-[#354B2D] shadow-2xs transition hover:bg-white"
                >
                  <span className="text-base leading-none">{user.avatar || "🍓"}</span>
                  <span className="max-w-[100px] truncate">{isAdmin ? "Admin NIBBLY" : user.name}</span>
                  <ChevronDown size={14} className="text-stone-400" />
                </button>

                {/* Account Dropdown Menu */}
                <AnimatePresence>
                  {userDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-[#d8c79e] bg-white p-2 shadow-xl"
                    >
                      <div className="border-b border-stone-100 px-3 py-2">
                        <p className="text-xs font-bold text-[#354B2D]">{user.name}</p>
                        <p className="truncate text-[10px] text-stone-500">{user.email}</p>
                        <p className={`mt-1 inline-block rounded px-2 py-0.5 text-[10px] font-bold ${
                          isAdmin ? "bg-[#2D4125] text-[#FFD95A]" : "bg-[#FFF0F3] text-[#FF718D]"
                        }`}>
                          {isAdmin ? "👑 ผู้ดูแลระบบ (Admin)" : (lang === "th" ? "สมาชิก NIBBLY" : "NIBBLY Member")}
                        </p>
                      </div>

                      <div className="py-1">
                        {isAdmin && (
                          <Link
                            href="/admin"
                            onClick={() => setUserDropdown(false)}
                            className="flex items-center gap-2 rounded-xl bg-[#2D4125] px-3 py-2 text-xs font-bold text-[#FFD95A] transition hover:bg-[#3D5A32] mb-1"
                          >
                            <span>👑</span>
                            <span>{lang === "th" ? "จัดการระบบหลังบ้าน (Admin)" : "Admin Dashboard"}</span>
                          </Link>
                        )}

                        <Link
                          href="/register"
                          onClick={() => setUserDropdown(false)}
                          className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-[#354B2D] transition hover:bg-[#FFF9E9]"
                        >
                          <UserRound size={15} />
                          <span>{lang === "th" ? "ข้อมูลของฉัน & ส่วนลด" : "My Profile & Coupons"}</span>
                        </Link>

                        <Link
                          href="/recommend"
                          onClick={() => setUserDropdown(false)}
                          className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-[#354B2D] transition hover:bg-[#FFF9E9]"
                        >
                          <Compass size={15} />
                          <span>{lang === "th" ? "เมนูแนะนำขนมสุขภาพ" : "Snack Recommendations"}</span>
                        </Link>
                      </div>

                      <div className="border-t border-stone-100 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdown(false);
                          }}
                          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50"
                        >
                          <LogOut size={15} />
                          <span>{lang === "th" ? "ออกจากระบบ (Log Out)" : "Log Out"}</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/register"
                aria-label="Member Account"
                className="group flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[#FFCCD8] bg-[#FFF0F4]/90 px-3.5 py-1.5 text-xs font-black text-[#D81159] shadow-2xs transition-all duration-200 hover:scale-105 hover:bg-[#FF718D] hover:text-white"
              >
                <span className="text-sm transition-transform duration-200 group-hover:scale-125">🧸</span>
                <span>{lang === "th" ? "สมัครสมาชิก" : "Sign Up"}</span>
              </Link>
            )}
          </div>

          {/* Cart button */}
          <button
            aria-label="Open cart"
            onClick={() => setOpen(true)}
            className="relative rounded-full p-2 transition hover:text-[#c77725]"
          >
            <ShoppingBag size={21} />
            {count > 0 && (
              <span className="absolute right-0.5 top-0.5 grid size-4 place-items-center rounded-full bg-[#c65752] text-[9px] font-bold text-white shadow-xs">
                {count}
              </span>
            )}
          </button>

          {/* Mobile menu hamburger */}
          <button
            aria-label="Open menu"
            onClick={() => setMobile(!mobile)}
            className="p-2 lg:hidden"
          >
            {mobile ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobile && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-[#d8c79e] bg-[#f5ead2] px-6 py-4 lg:hidden"
          >
            {/* If logged in on mobile, show user header */}
            {isLoggedIn && user && (
              <div className="mb-4 flex items-center justify-between rounded-2xl bg-white p-3 shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{user.avatar}</span>
                  <div>
                    <p className="text-xs font-bold text-[#354B2D]">{user.name}</p>
                    <p className="text-[10px] text-stone-500">{lang === "th" ? "ข้อมูลของฉัน" : "My Profile"}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobile(false);
                  }}
                  className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600 hover:bg-red-100"
                >
                  <LogOut size={13} />
                  <span>{lang === "th" ? "ออกระบบ" : "Logout"}</span>
                </button>
              </div>
            )}

            <div className="space-y-2">
              {nav.map((item) => (
                <Link
                  onClick={() => setMobile(false)}
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-2xl p-3 text-sm font-bold transition ${
                    item.highlight
                      ? "bg-gradient-to-r from-[#354B2D] to-[#436139] text-white shadow-sm"
                      : item.special
                      ? "bg-[#FFF0F4] border border-[#FFCCD8] text-[#D81159]"
                      : "text-[#354B2D] hover:bg-[#F3E7D3]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{item.emoji}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span className="rounded-full bg-[#FF5722] px-2 py-0.5 text-[10px] font-black text-white">
                      {item.badge}
                    </span>
                  ) : item.highlight ? (
                    <Sparkles size={16} className="text-[#FFD95A]" />
                  ) : null}
                </Link>
              ))}

              {isLoggedIn && (
                <button
                  onClick={() => {
                    logout();
                    setMobile(false);
                  }}
                  className="flex w-full items-center justify-between rounded-xl bg-red-50 p-3 text-sm font-bold text-red-600 hover:bg-red-100"
                >
                  <span>{lang === "th" ? "ออกจากระบบ (Log Out)" : "Log Out"}</span>
                  <LogOut size={16} />
                </button>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
