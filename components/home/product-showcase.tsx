"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Flame,
  Heart,
  Leaf,
  Plus,
  Minus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { products, type Product } from "@/data/products";
import { ProductArt } from "@/components/ui/product-art";
import { useCart } from "@/components/providers/cart-provider";
import { useLanguage } from "@/components/providers/language-provider";

interface SpotlightMood {
  id: string;
  titleTh: string;
  titleEn: string;
  icon: string;
  color: string;
  slugs: string[];
}

const SPOTLIGHT_MOODS: SpotlightMood[] = [
  {
    id: "bestsellers",
    titleTh: "🏆 ยอดนิยมตลอดกาล",
    titleEn: "All-Time Best Sellers",
    icon: "⭐",
    color: "from-[#FFD95A]/30 to-[#FF718D]/20",
    slugs: ["nibbly-berry-granola", "honey-almond-crunch", "strawberry-yogurt-bites", "nibbly-super-snack-mix"],
  },
  {
    id: "fitness",
    titleTh: "💪 เพิ่มโปรตีน & ฟิตหุ่น",
    titleEn: "High Protein & Fitness",
    icon: "⚡",
    color: "from-[#6EC8FF]/30 to-[#8BC34A]/20",
    slugs: ["peanut-butter-protein-bites", "dark-cocoa-nut-mix", "pumpkin-seed-crunch", "green-matcha-oat-bites"],
  },
  {
    id: "fibre",
    titleTh: "🥑 ไฟเบอร์สูง & ปรับสมดุล",
    titleEn: "High Fibre & Gut Health",
    icon: "🌱",
    color: "from-[#8BC34A]/30 to-[#FFD95A]/20",
    slugs: ["banana-oat-bites", "mixed-berry-energy-bites", "berry-oat-cookies", "tropical-fruit-mix"],
  },
  {
    id: "energy",
    titleTh: "🍫 เติมพลังบ่าย & คุมหิว",
    titleEn: "Afternoon Energy & Focus",
    icon: "✨",
    color: "from-[#FF9F43]/30 to-[#A678FF]/20",
    slugs: ["choco-oat-crunch", "cashew-honey-bites", "blueberry-nut-mix", "coconut-almond-granola"],
  },
];

export function InteractiveProductShowcase() {
  const { add } = useCart();
  const { lang } = useLanguage();
  const [activeMoodId, setActiveMoodId] = useState("bestsellers");
  const [selectedProductSlug, setSelectedProductSlug] = useState("nibbly-berry-granola");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const activeMood = SPOTLIGHT_MOODS.find((m) => m.id === activeMoodId) || SPOTLIGHT_MOODS[0];

  // Get current active mood products
  const moodProducts: Product[] = activeMood.slugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));

  // Current selected product
  const activeProduct =
    products.find((p) => p.slug === selectedProductSlug) ||
    moodProducts[0] ||
    products[0];

  const handleMoodChange = (moodId: string) => {
    setActiveMoodId(moodId);
    const targetMood = SPOTLIGHT_MOODS.find((m) => m.id === moodId);
    if (targetMood && targetMood.slugs.length > 0) {
      setSelectedProductSlug(targetMood.slugs[0]);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      add(activeProduct);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF8] via-[#FFF8E8] to-[#FFF3DC] py-24">
      {/* Dynamic Background Glow Blobs */}
      <div className="pointer-events-none absolute -left-20 top-20 size-[500px] rounded-full bg-[#FFD95A]/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 size-[500px] rounded-full bg-[#FF718D]/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/4 size-[400px] rounded-full bg-[#6EC8FF]/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c79e] bg-white/90 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#8B5E3C] shadow-xs backdrop-blur-xs">
            <Sparkles size={14} className="text-[#FF9F43]" />
            <span>NIBBLY TASTE STUDIO & SPOTLIGHT</span>
          </div>

          <h2 className="mt-4 font-display text-4xl font-extrabold text-[#354B2D] sm:text-6xl">
            สัมผัสรสชาติความสุข<br />
            <span className="bg-gradient-to-r from-[#FF718D] via-[#FF9F43] to-[#8BC34A] bg-clip-text text-transparent">
              คัดสรรเพื่อช่วงเวลาของคุณ
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base">
            เลือกอารมณ์และเป้าหมายสุขภาพ แล้วเปิดสัมผัสกับขนมสูตรพรีเมียม อบสดใหม่ ไม่ใส่น้ำตาลทรายขาว เต็มเปี่ยมไปด้วยสารอาหารธรรมชาติ
          </p>
        </div>

        {/* Mood Selector Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {SPOTLIGHT_MOODS.map((mood) => {
            const isActive = activeMoodId === mood.id;
            return (
              <button
                key={mood.id}
                onClick={() => handleMoodChange(mood.id)}
                className={`group relative inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                  isActive
                    ? "bg-[#354B2D] text-white shadow-lg shadow-[#354B2D]/20 scale-105"
                    : "border border-[#d8c79e]/70 bg-white/80 text-[#354B2D] hover:bg-white hover:border-[#354B2D]/40"
                }`}
              >
                <span>{mood.icon}</span>
                <span>{lang === "th" ? mood.titleTh : mood.titleEn}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeMoodPill"
                    className="absolute inset-0 -z-10 rounded-full bg-[#354B2D]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Showcase Box */}
        <div className="mt-12 overflow-hidden rounded-[40px] border-2 border-white bg-white/90 p-6 shadow-[0_30px_70px_rgba(53,75,45,0.14)] backdrop-blur-xl sm:p-10 lg:p-12">
          {/* Sub-Selector Chips (Snacks within this mood) */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 border-b border-stone-200/80">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400 shrink-0">
              {lang === "th" ? "เลือกรสชาติ:" : "Select Flavour:"}
            </span>
            <div className="flex gap-2">
              {moodProducts.map((prod) => {
                const isSelected = prod.slug === activeProduct.slug;
                return (
                  <button
                    key={prod.id}
                    onClick={() => {
                      setSelectedProductSlug(prod.slug);
                      setQuantity(1);
                    }}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition shrink-0 ${
                      isSelected
                        ? "bg-[#FF718D] text-white shadow-md scale-105"
                        : "border border-stone-200 bg-[#FFF9E9] text-[#354B2D] hover:bg-white"
                    }`}
                  >
                    <span>{prod.category === "Granola" ? "🥣" : prod.category === "Nut Mix" ? "🥜" : "⚡"}</span>
                    <span>{prod.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Product Spotlight Grid */}
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-12">
            {/* Left: Interactive 3D Card Artwork */}
            <div className="relative mx-auto w-full max-w-md lg:col-span-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct.slug}
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="relative overflow-hidden rounded-[36px] border-4 border-white bg-[#FAF7F0] p-6 shadow-2xl"
                >
                  {/* Badge */}
                  {activeProduct.badge && (
                    <span className="absolute left-6 top-6 z-20 rounded-full bg-[#FF718D] px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-md">
                      {activeProduct.badge}
                    </span>
                  )}

                  {/* Rating Pill */}
                  <div className="absolute right-6 top-6 z-20 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#FF9F43] shadow-sm backdrop-blur-xs">
                    <Star size={14} fill="currentColor" />
                    <span>{activeProduct.rating}</span>
                    <span className="text-[10px] text-stone-400">({activeProduct.reviews})</span>
                  </div>

                  {/* Large Product Art Box */}
                  <div className="relative my-4 aspect-square overflow-hidden rounded-[28px] shadow-inner">
                    <ProductArt
                      variant={activeProduct.art}
                      image={activeProduct.image}
                      alt={activeProduct.name}
                      priority
                      className="size-full"
                    />
                  </div>

                  {/* Floating Highlight Chips around Product Art */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-800 border border-emerald-200/60">
                      <Leaf size={12} /> 100% Real Food
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-900 border border-amber-200/60">
                      <Flame size={12} /> Slow Baked Not Fried
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-3 py-1 text-[11px] font-bold text-purple-800 border border-purple-200/60">
                      <ShieldCheck size={12} /> No Refined Sugar
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Rich Nutrition & Presentation Specs */}
            <div className="space-y-6 lg:col-span-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct.slug}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-5"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#FF718D]">
                      <Sparkles size={14} />
                      <span>{activeProduct.category} Collection</span>
                    </div>

                    <h3 className="mt-1 font-display text-3xl font-extrabold text-[#354B2D] sm:text-4xl">
                      {activeProduct.name}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base">
                      {activeProduct.description}
                    </p>
                  </div>

                  {/* Macro Nutrients Grid */}
                  <div className="rounded-3xl border border-stone-200/80 bg-[#FFFDF8] p-4 sm:p-5 shadow-xs">
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400">
                      ข้อมูลโภชนาการต่อ 1 หน่วยบริโภค (Nutrition Highlights)
                    </p>
                    <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                      {activeProduct.nutrition.map((item, idx) => {
                        const colors = [
                          { bg: "bg-[#FFF2B4]", label: "text-[#8B5E3C]", val: "text-[#354B2D]" },
                          { bg: "bg-[#DDF3FF]", label: "text-[#2B6CB0]", val: "text-[#1E3A8A]" },
                          { bg: "bg-[#DFF3C1]", label: "text-[#2F855A]", val: "text-[#1C3B14]" },
                          { bg: "bg-[#FFE0E8]", label: "text-[#C53030]", val: "text-[#9B2C2C]" },
                        ][idx % 4];
                        return (
                          <div key={item.label} className={`rounded-2xl ${colors.bg} p-2.5`}>
                            <p className={`text-[10px] font-bold ${colors.label}`}>{item.label}</p>
                            <p className={`font-display text-lg font-bold ${colors.val}`}>{item.value}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Wholesome Ingredients Pills */}
                  <div>
                    <p className="text-xs font-bold text-[#354B2D]">
                      {lang === "th" ? "ส่วนประกอบสำคัญจากธรรมชาติ:" : "Key Natural Ingredients:"}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {activeProduct.ingredients.map((ing, idx) => (
                        <span
                          key={idx}
                          className="rounded-full border border-[#d8c79e] bg-[#FFF9E9] px-3 py-1 text-xs font-semibold text-[#354B2D]"
                        >
                          ✦ {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Add to Bag CTA */}
                  <div className="border-t border-stone-200/80 pt-5">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-xs text-stone-400">{lang === "th" ? "ราคาต่อซอง" : "Price"}</p>
                        <div className="flex items-baseline gap-2">
                          <span className="font-display text-3xl font-extrabold text-[#354B2D]">
                            ฿{activeProduct.price}
                          </span>
                          <span className="text-xs text-stone-400 line-through">
                            ฿{Math.round(activeProduct.price * 1.2)}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center rounded-full border border-stone-300 bg-white px-3 py-1.5 shadow-xs">
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="p-1 text-stone-500 hover:text-black"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-[#354B2D]">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQuantity(quantity + 1)}
                          className="p-1 text-stone-500 hover:text-black"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={handleAddToCart}
                        className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#FF718D] py-4 text-sm font-extrabold text-white shadow-lg shadow-[#FF718D]/30 transition hover:scale-[1.02] hover:bg-[#FF859F]"
                      >
                        {isAdded ? (
                          <>
                            <Check size={18} strokeWidth={3} />
                            <span>{lang === "th" ? "เพิ่มลงตะกร้าแล้ว!" : "Added to Bag!"}</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={18} />
                            <span>{lang === "th" ? `เพิ่มลงตะกร้า (฿${activeProduct.price * quantity})` : `Add to Bag`}</span>
                          </>
                        )}
                      </button>

                      <Link
                        href={`/shop/${activeProduct.slug}`}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#354B2D] bg-white px-6 py-4 text-sm font-bold text-[#354B2D] shadow-xs transition hover:bg-[#FFF9E9]"
                      >
                        <span>{lang === "th" ? "ดูรายละเอียดรสนี้" : "View Details"}</span>
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 4-Pillar Quality Promise Cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[28px] border border-white/80 bg-white/70 p-5 shadow-xs backdrop-blur-xs">
            <span className="text-3xl">🌾</span>
            <h4 className="mt-3 font-display text-lg font-bold text-[#354B2D]">100% Whole Grains</h4>
            <p className="mt-1 text-xs text-stone-500">ข้าวโอ๊ตเต็มเมล็ดคัดพิเศษ ไฟเบอร์อิ่มนาน</p>
          </div>

          <div className="rounded-[28px] border border-white/80 bg-white/70 p-5 shadow-xs backdrop-blur-xs">
            <span className="text-3xl">🔥</span>
            <h4 className="mt-3 font-display text-lg font-bold text-[#354B2D]">Slow Oven-Baked</h4>
            <p className="mt-1 text-xs text-stone-500">อบความร้อนต่ำ ไม่ทอด ไร้น้ำมันทรานส์</p>
          </div>

          <div className="rounded-[28px] border border-white/80 bg-white/70 p-5 shadow-xs backdrop-blur-xs">
            <span className="text-3xl">🍯</span>
            <h4 className="mt-3 font-display text-lg font-bold text-[#354B2D]">Naturally Sweetened</h4>
            <p className="mt-1 text-xs text-stone-500">หวานพอดีจากน้ำผึ้งป่าและผลไม้แท้</p>
          </div>

          <div className="rounded-[28px] border border-white/80 bg-white/70 p-5 shadow-xs backdrop-blur-xs">
            <span className="text-3xl">📦</span>
            <h4 className="mt-3 font-display text-lg font-bold text-[#354B2D]">Ziplock Fresh Seal</h4>
            <p className="mt-1 text-xs text-stone-500">ซองซิปล็อคพกพาง่าย กรอบอร่อยทุกเวลา</p>
          </div>
        </div>
      </div>
    </section>
  );
}
