"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Timer,
  Tag,
  Copy,
  Check,
  Flame,
  Gift,
  ArrowRight,
  ShoppingBag,
  Zap,
  Percent,
  Truck,
  Award,
  ChevronRight,
  PartyPopper,
  RotateCcw,
} from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/components/providers/cart-provider";
import { publicPath } from "@/lib/public-path";

// Coupons data
const coupons = [
  {
    id: "c1",
    code: "WELCOMENIBBLY",
    discount: "10% OFF",
    title: "ส่วนลดต้อนรับเพื่อนใหม่",
    desc: "ไม่มีขั้นต่ำ ใช้ได้กับขนมทุกหมวดหมู่สำหรับออเดอร์แรก",
    expiry: "เหลือเวลา 14 วัน",
    badge: "ยอดนิยม ⭐",
    color: "from-[#FF718D] to-[#FF9F43]",
    bgLight: "bg-[#FFF2F4]",
    border: "border-[#FF718D]/30",
  },
  {
    id: "c2",
    code: "HEALTHY15",
    discount: "15% OFF",
    title: "สายตุนขนมคลีนสุดคุ้ม",
    desc: "เมื่อช้อปครบ 499 บาท ลดเพิ่มทันที 15%",
    expiry: "จำกัด 200 สิทธิ์แรก",
    badge: "คุ้มสุด 🔥",
    color: "from-[#8BC34A] to-[#2E7D32]",
    bgLight: "bg-[#F3FBE8]",
    border: "border-[#8BC34A]/30",
  },
  {
    id: "c3",
    code: "FREESHIP",
    discount: "FREE SHIP",
    title: "ส่งฟรีด่วนทั่วประเทศ",
    desc: "สั่งซื้อครบเพียง 399 บาท จัดส่งฟรีถึงหน้าบ้าน",
    expiry: "ตลอดเดือนนี้",
    badge: "ส่งฟรี 🚚",
    color: "from-[#6EC8FF] to-[#3B82F6]",
    bgLight: "bg-[#F0F8FF]",
    border: "border-[#6EC8FF]/30",
  },
  {
    id: "c4",
    code: "NIBBLYVIP50",
    discount: "฿50 OFF",
    title: "ส่วนลดพิเศษสมาชิก",
    desc: "ลดทันที 50 บาท เมื่อสั่งซื้อซ้ำครบ 350 บาท",
    expiry: "สมาชิก NIBBLY Club",
    badge: "VIP Only 👑",
    color: "from-[#A678FF] to-[#6366F1]",
    bgLight: "bg-[#F7F3FF]",
    border: "border-[#A678FF]/30",
  },
];

// Special bundle promotions
const promoBundles = [
  {
    id: "b1",
    title: "Morning Starter Pack 🥣",
    subtitle: "คู่หูมื้อเช้าพลังงานสะอาด กราโนล่าเบอร์รี่ + ช็อกโกโอ๊ต",
    badge: "ลด 20%",
    originalPrice: 288,
    price: 229,
    savings: 59,
    image: `${publicPath}/products/berry-granola.jpg`,
    tags: ["High Fibre", "No White Sugar", "Breakfast Hero"],
    productIds: [1, 8],
  },
  {
    id: "b2",
    title: "Office Work-Snack Trio ⚡",
    subtitle: "เซ็ตแก้ง่วงยามบ่าย บลูเบอร์รี่นัท + มิกซ์เบอร์รี่ไบต์ + ถั่วรวม",
    badge: "BEST DEAL 🔥",
    originalPrice: 403,
    price: 319,
    savings: 84,
    image: `${publicPath}/products/blueberry.jpg`,
    tags: ["Energy Boost", "Clean Protein", "No Crash"],
    productIds: [6, 10, 2],
  },
  {
    id: "b3",
    title: "Ultimate 4-Joy Festive Box 🎁",
    subtitle: "รวมดาว 4 รสชาติขายดีอันดับ 1 บรรจุกล่องของขวัญฟรีสติกเกอร์",
    badge: "HOT ITEM ⭐",
    originalPrice: 567,
    price: 439,
    savings: 128,
    image: `${publicPath}/products/super-mix.jpg`,
    tags: ["Gift Ready", "Free Sticker", "Best Seller"],
    productIds: [1, 6, 4, 20],
  },
];

// Mystery gifts for the mini game
const mysteryPrizes = [
  { code: "LUCKY20", title: "🎉 ยินดีด้วย! คุณได้รับส่วนลดลับ 20%", desc: "ใช้โค้ด LUCKY20 ลดเพิ่มทันที 20% (สั่งซื้อครบ 500.-)" },
  { code: "FREEBITES", title: "🎁 แจกฟรี! Banana Oat Bites 1 ซอง", desc: "ใช้โค้ด FREEBITES รับฟรีขนมไบต์เพิ่มในออเดอร์ถัดไป" },
  { code: "SHIPFREEVIP", title: "🚚 โค้ดส่งฟรี VIP ไม่มีขั้นต่ำ", desc: "ใช้โค้ด SHIPFREEVIP รับสิทธิ์ส่งฟรีทันทีทุกออเดอร์" },
  { code: "SUPERHEALTHY", title: "⭐ ลด 40 บาท ทันที", desc: "ใช้โค้ด SUPERHEALTHY เมื่อช้อปครบ 299 บาท" },
];

export default function PromotionsPage() {
  const { add } = useCart();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 18, minutes: 42, seconds: 35 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Copy code handler
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Lucky mystery box state
  const [isOpening, setIsOpening] = useState(false);
  const [revealedPrize, setRevealedPrize] = useState<(typeof mysteryPrizes)[0] | null>(null);

  const handleOpenMystery = () => {
    if (isOpening) return;
    setIsOpening(true);
    setRevealedPrize(null);
    setTimeout(() => {
      const random = mysteryPrizes[Math.floor(Math.random() * mysteryPrizes.length)];
      setRevealedPrize(random);
      setIsOpening(false);
    }, 1200);
  };

  // Add bundle to cart
  const handleAddBundle = (productIds: number[]) => {
    productIds.forEach((id) => {
      const prod = products.find((p) => p.id === id);
      if (prod) add(prod);
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF9ED] text-[#364A2F]">
      {/* Toast Notification */}
      <AnimatePresence>
        {copiedCode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 z-50 -translate-x-1/2 flex items-center gap-2 rounded-full bg-[#2F4527] px-6 py-3 text-sm font-bold text-white shadow-2xl"
          >
            <Check size={18} className="text-[#8BC34A]" />
            <span>คัดลอกโค้ด <b className="text-[#FFD95A] tracking-wider">{copiedCode}</b> สำเร็จแล้ว!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF0D4] via-[#FFF8E8] to-[#FFF9ED] px-5 pt-12 pb-16 lg:px-8">
        {/* Decorative Background Orbs */}
        <div className="pointer-events-none absolute -top-16 left-10 size-96 rounded-full bg-[#FF718D]/20 blur-3xl" />
        <div className="pointer-events-none absolute top-20 right-10 size-96 rounded-full bg-[#8BC34A]/25 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 size-72 rounded-full bg-[#FFD95A]/35 blur-3xl" />

        <div className="relative mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#E3CCA0] bg-white/80 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#B24823] shadow-xs backdrop-blur-md"
          >
            <Flame size={15} className="text-[#FF5722] animate-bounce" />
            <span>SUPER PROMO FESTIVAL • ดีลสุขภาพสุดเฟี้ยว</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#2D4125] leading-none"
          >
            อร่อยสุขภาพดี <span className="bg-gradient-to-r from-[#FF718D] via-[#FF9F43] to-[#8BC34A] bg-clip-text text-transparent">ลดจัดเต็ม</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-stone-600 font-medium"
          >
            รวมโค้ดส่วนลด โปรโมชั่นเซ็ตสุดคุ้ม และสิทธิพิเศษสำหรับคนรักขนมคลีน NIBBLY ยิ่งช้อป ยิ่งแฮปปี้ อบสดใหม่ไร้น้ำตาลทรายขาวทุกวัน 🥣🍓
          </motion.p>

          {/* Flash Sale Live Countdown Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-8 max-w-lg rounded-3xl border-2 border-[#E9D7B1] bg-white/90 p-5 shadow-xl shadow-black/5 backdrop-blur-md"
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <span className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#9A3412]">
                <Timer size={18} className="text-[#FF5722] animate-spin-slow" />
                <span>FLASH SALE ดีลจำกัดเวลา:</span>
              </span>
              <span className="rounded-full bg-[#FF5722]/10 px-2.5 py-0.5 text-xs font-black text-[#FF5722]">
                แจกโค้ดจำนวนจำกัด
              </span>
            </div>

            {/* Countdown Blocks */}
            <div className="mt-4 flex items-center justify-center gap-3 font-mono">
              <div className="flex flex-col items-center">
                <span className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-[#2D4125] text-2xl sm:text-3xl font-black text-[#FFD95A] shadow-md">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="mt-1 text-[11px] font-bold text-stone-500">ชั่วโมง</span>
              </div>
              <span className="text-2xl font-black text-[#2D4125]">:</span>
              <div className="flex flex-col items-center">
                <span className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-[#2D4125] text-2xl sm:text-3xl font-black text-[#FFD95A] shadow-md">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="mt-1 text-[11px] font-bold text-stone-500">นาที</span>
              </div>
              <span className="text-2xl font-black text-[#2D4125]">:</span>
              <div className="flex flex-col items-center">
                <span className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-[#FF718D] text-2xl sm:text-3xl font-black text-white shadow-md">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className="mt-1 text-[11px] font-bold text-[#FF718D]">วินาที</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8 space-y-20">
        {/* Section 1: Interactive Coupon Vault */}
        <section>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#B24823]">
                COUPON VAULT • กล่องรวมโค้ด
              </span>
              <h2 className="mt-1 font-display text-3xl sm:text-4xl font-extrabold text-[#263A20]">
                กดคัดลอกโค้ดไปช้อปได้เลย 🏷️
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#B24823] hover:underline"
            >
              <span>ไปหน้าช้อปปิ้งเลย</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coupons.map((coupon, idx) => (
              <motion.div
                key={coupon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className={`relative flex flex-col justify-between overflow-hidden rounded-3xl border ${coupon.border} ${coupon.bgLight} p-5 shadow-sm transition hover:-translate-y-1.5 hover:shadow-xl`}
              >
                {/* Decorative cutouts like a ticket */}
                <div className="absolute -left-3 top-1/2 size-6 -translate-y-1/2 rounded-full bg-[#FFF9ED] border-r border-[#D9C49A]" />
                <div className="absolute -right-3 top-1/2 size-6 -translate-y-1/2 rounded-full bg-[#FFF9ED] border-l border-[#D9C49A]" />

                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-black text-stone-700 shadow-xs">
                      {coupon.badge}
                    </span>
                    <span className="text-[10px] font-bold text-stone-500">{coupon.expiry}</span>
                  </div>

                  <div className="mt-4">
                    <span className={`inline-block font-display text-3xl font-black bg-gradient-to-r ${coupon.color} bg-clip-text text-transparent`}>
                      {coupon.discount}
                    </span>
                    <h3 className="mt-1 text-base font-bold text-[#2A3F23]">{coupon.title}</h3>
                    <p className="mt-1 text-xs text-stone-600 leading-relaxed">{coupon.desc}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-dashed border-stone-300">
                  <div className="flex items-center justify-between rounded-xl bg-white p-2 border border-stone-200">
                    <span className="font-mono text-xs font-black text-[#2A3F23] tracking-wider pl-1">
                      {coupon.code}
                    </span>
                    <button
                      onClick={() => handleCopy(coupon.code)}
                      className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                        copiedCode === coupon.code
                          ? "bg-[#2D4125] text-white"
                          : "bg-stone-100 text-stone-700 hover:bg-[#FFD95A]"
                      }`}
                    >
                      {copiedCode === coupon.code ? (
                        <>
                          <Check size={13} />
                          <span>คัดลอกแล้ว</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>คัดลอก</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 2: Super Promo Bundles (ซื้อคู่คุ้มกว่า) */}
        <section>
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-[#B24823]">
              BUNDLE PACKS • เซ็ตสุดคุ้ม
            </span>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl font-extrabold text-[#263A20]">
              จับคู่ขนมขายดี ประหยัดกว่าแยกชิ้น 📦✨
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              จัดเซ็ตความอร่อยให้คุณเติมพลังได้ทั้งสัปดาห์ คัดสรรรสชาติยอดนิยมที่ทุกคนหลงรัก
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {promoBundles.map((bundle, idx) => (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-[#E7D6B3] bg-white shadow-lg transition hover:-translate-y-2 hover:border-[#FF9F43] hover:shadow-2xl"
              >
                {/* Badge */}
                <div className="absolute top-4 right-4 z-10 rounded-full bg-[#FF5722] px-3 py-1 text-xs font-black text-white shadow-md">
                  {bundle.badge}
                </div>

                <div>
                  {/* Image Container */}
                  <div className="relative h-56 w-full overflow-hidden bg-[#FAF2E1]">
                    <Image
                      src={bundle.image}
                      alt={bundle.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                      {bundle.tags.map((t) => (
                        <span key={t} className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-[#2A3F23]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-[#2A3F23]">{bundle.title}</h3>
                    <p className="mt-1.5 text-xs text-stone-600 leading-relaxed">{bundle.subtitle}</p>

                    {/* Price and Savings */}
                    <div className="mt-5 flex items-baseline gap-3">
                      <span className="font-display text-3xl font-black text-[#B24823]">
                        ฿{bundle.price}
                      </span>
                      <span className="text-sm font-semibold text-stone-400 line-through">
                        ฿{bundle.originalPrice}
                      </span>
                      <span className="rounded-md bg-[#8BC34A]/20 px-2 py-0.5 text-xs font-bold text-[#2E7D32]">
                        ประหยัด ฿{bundle.savings}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Add to Cart Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleAddBundle(bundle.productIds)}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#2D4125] py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#FF718D] active:scale-95"
                  >
                    <ShoppingBag size={17} />
                    <span>ใส่ตะกร้าเซ็ตนี้ทันที</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 3: Interactive Mystery Gift Box (กิมมิกเฟี้ยวๆ สุ่มคูปองลับ) */}
        <section className="relative overflow-hidden rounded-3xl border-2 border-[#E7D6B3] bg-gradient-to-r from-[#FFF0DA] via-[#FFEADB] to-[#FFF5E6] p-8 sm:p-12 shadow-xl">
          <div className="absolute -right-10 -bottom-10 size-64 rounded-full bg-[#FF718D]/15 blur-2xl pointer-events-none" />

          <div className="relative mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1 text-xs font-black text-[#A678FF] shadow-xs">
              <Sparkles size={14} className="text-[#A678FF]" />
              <span>LUCKY SNACK BOX • กล่องสุ่มความสุข</span>
            </span>

            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-black text-[#2D4125]">
              สุ่มรับโค้ดส่วนลดลับพิเศษเฉพาะคุณ 🎁✨
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              กดปุ่มด้านล่างเพื่อเปิดกล่องสุ่มรับโค้ดลับ ของแถมฟรี หรือส่งฟรีทันที!
            </p>

            <div className="mt-8 flex flex-col items-center justify-center">
              <motion.div
                animate={isOpening ? { rotate: [0, -15, 15, -15, 0], scale: [1, 1.1, 1] } : {}}
                transition={{ repeat: isOpening ? Infinity : 0, duration: 0.3 }}
                className="grid size-24 sm:size-28 place-items-center rounded-3xl bg-white text-5xl sm:text-6xl shadow-xl border-2 border-[#FFD95A]"
              >
                {isOpening ? "✨" : revealedPrize ? "🎉" : "🎁"}
              </motion.div>

              {!revealedPrize ? (
                <button
                  onClick={handleOpenMystery}
                  disabled={isOpening}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#FF718D] px-8 py-4 text-base font-extrabold text-white shadow-lg shadow-[#FF718D]/30 transition hover:bg-[#A678FF] hover:-translate-y-1 active:scale-95 disabled:opacity-60"
                >
                  <PartyPopper size={18} />
                  <span>{isOpening ? "กำลังเปิดกล่อง..." : "แตะเพื่อสุ่มรับรางวัลลับ!"}</span>
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 w-full max-w-md rounded-2xl bg-white p-5 border-2 border-[#8BC34A] shadow-xl"
                >
                  <p className="font-display text-lg font-black text-[#2E7D32]">
                    {revealedPrize.title}
                  </p>
                  <p className="mt-1 text-xs text-stone-600">{revealedPrize.desc}</p>

                  <div className="mt-4 flex items-center justify-between rounded-xl bg-[#F4F9EC] p-3 border border-[#C5E1A5]">
                    <span className="font-mono text-base font-black text-[#2E7D32] tracking-wider">
                      {revealedPrize.code}
                    </span>
                    <button
                      onClick={() => handleCopy(revealedPrize.code)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#2E7D32] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#1B5E20]"
                    >
                      <Copy size={13} />
                      <span>คัดลอกโค้ดนี้</span>
                    </button>
                  </div>

                  <button
                    onClick={handleOpenMystery}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-stone-500 hover:text-stone-800"
                  >
                    <RotateCcw size={12} />
                    <span>ลองสุ่มใหม่อีกรอบ</span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Section 4: Privilege & Reward Card Integration */}
        <section className="rounded-3xl border border-[#E7D6B3] bg-white p-8 sm:p-10 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-3">
              <div className="grid size-12 place-items-center rounded-2xl bg-[#FFF2E2] text-[#FF9F43]">
                <Award size={26} />
              </div>
              <h3 className="font-display text-lg font-bold text-[#2A3F23]">
                สะสมแต้มแลกขนมฟรี (LINE Reward Card)
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                ทุกการสั่งซื้อสะสมแต้มผ่าน LINE Official Account ครบ 10 แต้ม แลกรับฟรี! กราโนล่า Choco Oat Crunch 1 ซอง
              </p>
            </div>

            <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-3">
              <div className="grid size-12 place-items-center rounded-2xl bg-[#E8F8FF] text-[#3B82F6]">
                <Truck size={26} />
              </div>
              <h3 className="font-display text-lg font-bold text-[#2A3F23]">
                ส่งฟรีเมื่อซื้อครบ 499 บาท
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                จัดส่งด่วนสดใหม่ทุกวันทั่วประเทศ คัดสรรแพ็กเกจอย่างดีเพื่อรักษาความกรอบและคุณประโยชน์สดใหม่
              </p>
            </div>

            <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-3">
              <div className="grid size-12 place-items-center rounded-2xl bg-[#F4FBE8] text-[#8BC34A]">
                <Gift size={26} />
              </div>
              <h3 className="font-display text-lg font-bold text-[#2A3F23]">
                รับของขวัญพิเศษในวันเกิด
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                สมาชิก NIBBLY Club รับคูปองส่วนลดพิเศษ 20% ในเดือนเกิดของคุณ พร้อมสติกเกอร์น้อง Nibbly สุดน่ารัก
              </p>
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <div className="rounded-3xl bg-[#2D4125] p-8 sm:p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="pointer-events-none absolute -right-10 -top-10 size-60 rounded-full bg-[#FF718D]/20 blur-3xl" />
          <h2 className="font-display text-3xl sm:text-5xl font-black">
            พร้อมเติมความอร่อยสุขภาพดีแล้วหรือยัง? 🥣✨
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-white/80">
            เลือกขนมคลีนที่ใช่ ใส่โค้ดส่วนลด แล้วรอรับความสดชื่นส่งตรงถึงหน้าบ้านได้เลย
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF718D] px-8 py-4 text-sm font-black text-white shadow-lg transition hover:bg-[#A678FF] hover:-translate-y-1"
            >
              <span>ไปช้อปขนมเลย</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/recommend"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-black text-white backdrop-blur-md transition hover:bg-white/20"
            >
              <Sparkles size={16} className="text-[#FFD95A]" />
              <span>ทำแบบทดสอบหาขนมที่ชอบ</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
