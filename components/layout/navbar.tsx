"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, Search, ShoppingBag, UserRound, X, Sparkles, LogOut, Compass, ChevronDown } from "lucide-react";
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
  const { user, isLoggedIn, logout } = useAuth();

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
    { label: t("home"), href: "/" },
    { label: t("shop"), href: "/shop" },
    {
      label: lang === "th" ? "แนะนำขนมสุขภาพ" : "Snack Finder",
      href: "/recommend",
      highlight: true,
    },
    {
      label: lang === "th" ? "สมัครสมาชิก" : "Sign Up",
      href: "/register",
    },
    { label: t("story"), href: "/#about" },
    { label: t("why"), href: "/#why" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[#d8c79e]/80 bg-[#f8efd9]/90 shadow-xs backdrop-blur-xl">
      <div className="mx-auto flex h-[82px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="NIBBLY home" className="relative block h-[68px] w-[138px] shrink-0 overflow-hidden">
          <Image
            src={`${publicPath}/nibbly-logo-crop.png`}
            alt="NIBBLY Healthy Treats"
            fill
            sizes="138px"
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => {
            if (item.highlight) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative inline-flex items-center gap-1.5 rounded-full bg-[#354B2D] px-3.5 py-1.5 text-xs font-extrabold text-white shadow-xs transition hover:scale-105 hover:bg-[#FF718D]"
                >
                  <Sparkles size={13} className="text-[#FFD95A] transition group-hover:rotate-12" />
                  <span>{item.label}</span>
                </Link>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[#354B2D]/85 transition hover:text-[#c77725]"
              >
                {item.label}
              </Link>
            );
          })}
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
                  <span className="max-w-[90px] truncate">{user.name.split(" ")[0]}</span>
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
                        <p className="mt-1 inline-block rounded bg-[#FFF0F3] px-2 py-0.5 text-[10px] font-bold text-[#FF718D]">
                          {user.welcomeCoupon ? "โค้ดลด 15% พร้อมใช้" : "สมาชิก NIBBLY"}
                        </p>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/register"
                          onClick={() => setUserDropdown(false)}
                          className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-[#354B2D] transition hover:bg-[#FFF9E9]"
                        >
                          <UserRound size={15} />
                          <span>{lang === "th" ? "โปรไฟล์สมาชิก & ส่วนลด" : "Member Profile"}</span>
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
                className="flex items-center gap-1.5 rounded-full border border-[#d8c79e]/70 bg-white/70 px-3 py-1.5 text-xs font-bold text-[#354B2D] transition hover:bg-white hover:text-[#c77725]"
              >
                <UserRound size={16} />
                <span>{lang === "th" ? "สมัคร / เข้าสู่ระบบ" : "Sign In"}</span>
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
                    <p className="text-[10px] text-stone-500">{user.email}</p>
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
                  className={`flex items-center justify-between rounded-xl p-3 text-sm font-bold ${
                    item.highlight
                      ? "bg-[#354B2D] text-white"
                      : "text-[#354B2D] hover:bg-[#eeddbb]"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.highlight && <Sparkles size={15} className="text-[#FFD95A]" />}
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
